/*nous avons choisit de ne pas utiliser la convertion a trou de l'enoncé car
celui ne correspondait tout simplement pas a notre utilisation de celui-ci.
Le voici:
function conversion()
{
    nous n'avons tout simplement pas compris le but de cette fonction(absence de docstring)
}    
function conversionDecimal()
{
    hexadecimal.value = (decimal.value-0).toString (16);
    binaire.value = (decimal.value-0).toString(2);
}
function conversionBinaire()
{
    decimal.value = parseInt(binaire.value,2);
    conversionDecimal();
}
function conversionHexadecimal()
{
    decimal.value = parseInt(hexadecimal.value,16);
    conversionDecimal();
} */

const taskList = document.getElementById("taskList");

var credit = localStorage.getItem('credit');
var level = localStorage.getItem('level');

var nombre_out = "";
var inputs = document.querySelectorAll("input[type=text]");

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

function newTask(){
    credit = localStorage.getItem('credit');
    console.log(level)
    let task = document.createElement("div");
    task.setAttribute("class","task");
    let text = document.createElement("p");
    text.setAttribute("class","task");
    let nombre = Math.floor(Math.random() * level);
    
    let conv_in = '';
    let nombre_in = nombre;
    let choice = Math.floor(Math.random() * 3);
    if (choice == 0){
        conv_in = "binaire";
        nombre_in = ConvertBase.dec2bin(nombre);
    }else if (choice == 1){
        conv_in = "hexadecimal";
        nombre_in = ConvertBase.dec2hex(nombre);
    }else{
        conv_in = "decimal";
    }

    let conv_out = nombre;
    nombre_out = nombre;
    while (true) {
        choice = Math.floor(Math.random() * 3)
        if (choice == 0){
            conv_out  = "binaire";
            nombre_out = ConvertBase.dec2bin(nombre);
        }else if (choice == 1){
            conv_out = "hexadecimal";
            nombre_out = ConvertBase.dec2hex(nombre);
        }else{
            conv_out = "decimal";
        }
        if (conv_in!=conv_out){
            break;
        }
    }

    let node = document.createTextNode("il faut convertir le nombre " + nombre_in + " (" + conv_in + ") en " + conv_out);
    let input = document.createElement("input");
    input.setAttribute("type","text");
    text.appendChild(node);
    node = document.createTextNode(Number(nombre)*3 + " coins");
    let coins = document.createElement("p");
    coins.appendChild(node);
    coins.setAttribute("class","task");
    task.appendChild(text);
    task.appendChild(input);
    task.appendChild(coins);
    taskList.appendChild(task);
    taskList.setAttribute("num",nombre);
    taskList.setAttribute("conv",conv_out);
    level = localStorage.getItem('level');
    
    input.addEventListener("keydown", function(e) {

        if (e.code == 'Enter'){
            if (input.value == nombre_out){
                console.log(nombre_out)
                input.parentNode.remove()
                localStorage.setItem('level', Number(level) + 1);
                localStorage.setItem('credit', Number(credit) + Number(nombre)*3);
                credit = localStorage.getItem('credit');
                level = localStorage.getItem('level');
                credits = document.getElementById("credits")
                credits.innerHTML = credit
                newTask();
            }
        }
      });
}

newTask();


console.log(inputs)
inputs.forEach(function(input) {
  
});

credits = document.getElementById("credits")
credits.innerHTML = credit
