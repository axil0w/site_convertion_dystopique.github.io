binText = document.getElementById("bin");
hexText = document.getElementById("hex");
intText = document.getElementById("int");

active = null

convert_button = document.getElementById("convert_button");
convert_button.addEventListener("click", convert);


var price = document.getElementById("price");

if (localStorage.getItem('level') === null){
    localStorage.setItem('credit', 0);
    localStorage.setItem('level', 0);
} 
var credit = localStorage.getItem("credit");

(function(){

    var ConvertBase = function (num) {
        return {
            from : function (baseFrom) {
                return {
                    to : function (baseTo) {
                        return parseInt(num, baseFrom).toString(baseTo);
                    }
                };
            }
        };
    };
        
    // binary to decimal
    ConvertBase.bin2dec = function (num) {
        return ConvertBase(num).from(2).to(10);
    };
    
    // binary to hexadecimal
    ConvertBase.bin2hex = function (num) {
        return ConvertBase(num).from(2).to(16);
    };
    
    // decimal to binary
    ConvertBase.dec2bin = function (num) {
        return ConvertBase(num).from(10).to(2);
    };
    
    // decimal to hexadecimal
    ConvertBase.dec2hex = function (num) {
        return ConvertBase(num).from(10).to(16);
    };
    
    // hexadecimal to binary
    ConvertBase.hex2bin = function (num) {
        return ConvertBase(num).from(16).to(2);
    };
    
    // hexadecimal to decimal
    ConvertBase.hex2dec = function (num) {
        return ConvertBase(num).from(16).to(10);
    };
    
    this.ConvertBase = ConvertBase;
    
})(this);


function convert () {
    console.log(active)
    if (active != null){
        if (active.id == 'int'){
            activated = ConvertBase.dec2bin(active.value);
        }else if (active.id == "hex"){
            activated = ConvertBase.hex2bin(active.value);
            
        }else if (active.id == "bin"){
            activated = active.value;
        }
        document.getElementById("int").value = "";
        document.getElementById("hex").value = "";
        document.getElementById("bin").value = "";
        active = null;
        if (!isNaN(activated) && !isNaN(ConvertBase.bin2dec(activated)) && Number(credit) >= Number(price.innerHTML)){
            credit = Number(credit) - Number(price.innerHTML);
            localStorage.setItem("credit", credit);
            credits = document.getElementById("credits")
            credits.innerHTML = credit
            document.getElementById("int").placeholder = ConvertBase.bin2dec(activated);
            document.getElementById("hex").placeholder = ConvertBase.bin2hex(activated);
            document.getElementById("bin").placeholder = activated
        }
        
    }
       
}

document.addEventListener("keypress", logKey);

function logKey(e) {
  if (e.code == 'Enter'){
    convert()
  }
}
inputs = document.querySelectorAll("input[type=text]");

inputs.forEach(function(input) {
  input.addEventListener("keydown", function(e) {
    if (input.value.length <= 1 && e.keyCode == 8 ){
        active = null;
    }else {
        active = input;
        
    }
  });
  
  input.addEventListener("mouseover", function(e){
    if (active!=null){
        if (active.value == ""){
            active = null;
        }
        if (e.target != active && active != null){
            e.target.disabled = true;
        }else{
            e.target.disabled = false;
        }
    }else{
        e.target.disabled = false;
    }
  });
});

copy_button_bin = document.getElementById("copy_button_bin"); 
copy_button_hex = document.getElementById("copy_button_hex"); 
copy_button_int = document.getElementById("copy_button_int"); 

copy_button_bin.addEventListener("click", copy_bin);
copy_button_hex.addEventListener("click", copy_hex);
copy_button_int.addEventListener("click", copy_int);

function copy_int(){
    if (active==copy_button_int){
        navigator.clipboard.writeText(intText.value)
    }else{
        navigator.clipboard.writeText(intText.placeholder)
    }
    
}
function copy_hex(){
    if (active==copy_button_int){
        navigator.clipboard.writeText(hexText.value)
    }else{
        navigator.clipboard.writeText(hexText.placeholder)
    }
}
function copy_bin(){
    if (active==copy_button_int){
        navigator.clipboard.writeText(binText.value)
    }else{
        navigator.clipboard.writeText(binText.placeholder)
    }
}

function change_price(){
    let tprice = 0;
    if (active!=null){
        if (active.id == 'int'){
            tprice = ConvertBase.bin2dec(ConvertBase.dec2bin(active.value));
            console.log(tprice)
        }else if (active.id == "hex"){
            tprice = ConvertBase.hex2dec(active.value);
            
        }else if (active.id == "bin"){
            tprice = ConvertBase.bin2dec(active.value);
        }
        if (!isNaN(tprice)){
            price.innerHTML = tprice
        }else{
            price.innerHTML = 0;
        }
    } else{
        price.innerText = 0;
    }
}

credits = document.getElementById("credits")
credits.innerHTML = credit
console.log(credit)

window.setInterval(change_price,100)

