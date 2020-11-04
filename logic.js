
window.onload = start;
let intents = 0;


function maxLength(allInputs,option){
    if(option.value == "Binary"){   
        allInputs.setAttribute("maxlength","20");
    }
    else if(option.value == "Decimal"){
        allInputs.setAttribute("maxlength","7");
    }
    else if(option.value == "Hexadecimal"){
        allInputs.setAttribute("maxlength","18");
    }
}
//Controlador
function start(){
    let button = document.getElementById("convert");
    let option = document.getElementById("from");
    let to = document.getElementById("to");
    let input = document.getElementById("textFrom");
    let allInputs = document.querySelector("input");
    let body = document.querySelector("body");
    let change = document.getElementsByClassName("switch");
    
    localStorage.pColor = "#1a1b1e"; //negro
    localStorage.auxColor = "teal"; //azul
    change[0].addEventListener("change",()=>{
        let colorAux = localStorage.pColor; //negro
        localStorage.pColor = localStorage.auxColor;
        body.setAttribute("style", `background-color: ${localStorage.pColor};`); //azul
        localStorage.auxColor = colorAux; //negro
    });
    
    if(localStorage.From){
        option.value = localStorage.From;
    }
    if(localStorage.To){
        to.value = localStorage.To;
    }
    option.addEventListener("change", ()=>{
        input.value = "";
        maxLength(allInputs,option);
        localStorage.From = option.value;
    });
    maxLength(allInputs,option);
    to.addEventListener("change", ()=>{
        localStorage.To = to.value;
    });
    input.addEventListener("keydown", function(event) {
        keyRestrict(event,option,input);
    });
    button.addEventListener("click",Convert);
}

function keyRestrict(event,option,input){
    if (event.key == 'Enter') {
        Convert();
    }

    //validacion binario
    if(option.value == "Binary"){
        if(event.key != '1' && event.key != '0' && event.key!= 'F5' && event.key != 'Backspace' && event.key!=' ' && event.key!='ArrowLeft' && event.key!='ArrowRight'){
            event.preventDefault();
        }
    }

    //validacion decimal
    else if(option.value == "Decimal"){
        switch(event.key){
            case 'ArrowLeft': break;
            case 'ArrowRight': break;
            case '1': break;
            case '2': break;
            case '3': break;
            case '4': break;
            case '5': break;
            case '6': break;
            case '7': break;
            case '8': break;
            case '9': break;
            case '0': break;
            case 'Backspace': break;
            case 'F5': break;
            default:
                event.preventDefault();
                break;
        }
    }

    //validacion hexadecimal
    else if(option.value == "Hexadecimal"){
        if(event.key == 'a' || event.key == 'b' || event.key == 'c' || event.key == 'd' || event.key == 'e' || event.key == 'f'){
            setTimeout(() => { input.value = (input.value).toUpperCase();
            }, 20);  
        }
        else{
            switch(event.key){
                case 'ArrowLeft': break;
                case 'ArrowRight': break;
                case 'CapsLock': break;
                case '1': break;
                case '2': break;
                case '3': break;
                case '4': break;
                case '5': break;
                case '6': break;
                case '7': break;
                case '8': break;
                case '9': break;
                case '0': break;
                case 'A': break;
                case 'B': break;
                case 'C': break;
                case 'D': break;
                case 'E': break;
                case 'F': break;
                case 'Backspace': break;
                case 'F5': break;
                default: event.preventDefault(); break;
            }
        }
    }
}

function Convert(){    
    let from = document.getElementById("textFrom");
    let result = document.getElementById("result");
    result.innerHTML = "";  
    if(from.value == ""){
        if(intents > 1){
            setTimeout(() => {
                result.innerHTML = "<h2> Ok stupid, stop. <h2/> "     
            }, 500);
            intents++;
        }
        else{
            setTimeout(() => {
                result.innerHTML = "<h2> The data is empty, try again. <h2/> "     
            }, 500);
            intents++;
        }       
    }
    else{
        Calculate();
    }
}



function Calculate(){
    let result = document.getElementById("result"); //Campo de resultado
    let from = document.getElementById("from").value;//Selector from
    let to = document.getElementById("to").value; //Selector to
    let input = document.getElementById("textFrom").value.split(' ').join(''); //Dato ingresado, sin espacios
    
    function binarytoDec(binNum){ //binNum es un array
        let counter = 1;
        let total = 0;
        //Empieza desde el final para ir aumentando la potencia
        //hacia la izquierda
        for(let i = binNum.length-1;i>=0;i--){
            total += binNum[i]*counter;
            counter = counter * 2;
        }
        return total;
    }

    function dectoBin(decNum){ //decNum es un numero decimal
        let arrayAux = [];      
        if(decNum/1 == 0){
            arrayAux.push(0);
        }
        else{
            while(decNum != 0){
                arrayAux.unshift(decNum%2);
                decNum = Math.floor(decNum / 2);
            }
        }
        //retorna un string equivalente en binario
        return arrayAux.toString().split(',').join('');
    }

    if(from == "Binary"){
        if(to == "Binary"){
            result.innerHTML = `<h2>${input}<h2/>`;
        }
        if(to == "Decimal"){
            let total = binarytoDec(Array.from(input));
            result.innerHTML = `<h2>${total}<h2/>`;
        }
        if(to == "Hexadecimal"){
            let array = Array.from(input);
            let total = "";
            
            //Agrega los 0s necesarios para dejarlo preparado para convertir 
            while((array.length) % 4 != 0){
                array.unshift(0);
            }

            let size = array.length;
            for(let i=0;i<size;i+=4){
                let aux = binarytoDec(array.splice(0,4));
                if(aux>9){
                    switch(aux){
                        case 10:
                            aux = "A";
                        break;
                        case 11:
                            aux = "B";
                        break;
                        case 12:
                            aux = "C";
                        break;
                        case 13:
                            aux = "D";
                        break;
                        case 14:
                            aux = "E";
                        break;
                        case 15:
                            aux = "F";
                        break;
                    }
                }
                total += aux;
            }
            
            result.innerHTML = `<h2>${total}<h2/>`;
        }
    }

    if(from == "Decimal"){
        if(to == "Binary"){
            let resultAux = dectoBin(input);
            result.innerHTML = `<h2>${resultAux}<h2/>`;
        }
        if(to == "Decimal"){
            result.innerHTML = `<h2>${input/1}<h2/>`;
        }
        if(to == "Hexadecimal"){
            let arrayAux = [];
                
            if(input/1 == 0){
                arrayAux.push(0);
            }
            else{
                while(input != 0){
                    let element = input%16;
                    if(element > 9){
                        switch(element){
                            case 10:
                                element = "A";
                            break;
                            case 11:
                                element = "B";
                            break;
                            case 12:
                                element = "C";
                            break;
                            case 13:
                                element = "D";
                            break;
                            case 14:
                                element = "E";
                            break;
                            case 15:
                                element = "F";
                            break;
                        }
                    }
                    arrayAux.unshift(element);
                    input = Math.floor(input / 16);
                }
            }
            arrayAux = arrayAux.toString().split(',').join('');
            result.innerHTML = `<h2>${arrayAux}<h2/>`;
        }
    }

    if(from == "Hexadecimal"){
        if(to == "Binary"){
            let total = "";
            let arrayAux = Array.from(input);
            for(let element of arrayAux){
                //Convierte cada letra a su equivalente numerico
                switch(element){
                    case "A":
                        element = 10;
                    break;
                    case "B":
                        element = 11;
                    break;
                    case "C":
                        element = 12;
                    break;
                    case "D":
                        element = 13;
                    break;
                    case "E":
                        element = 14;
                    break;
                    case "F":
                        element = 15;
                    break;      
                }
                
                let totalAux = Array.from(dectoBin(element));
                while(totalAux.length % 4 != 0){
                    totalAux.unshift("0");
                }
                totalAux.unshift(" ");
                total += totalAux.toString().split(',').join('');
            }
    
            result.innerHTML = `<h2>${total}<h2/>`;
        }

        if(to == "Decimal"){
            let hexaNum = Array.from(input);
            let counter = 1;
            let total = 0;
            //Empieza desde el final para ir aumentando la potencia
            //hacia la izquierda
            for(let i = hexaNum.length-1;i>=0;i--){
                //Convierte una letra a su equivalente numerico
                switch(hexaNum[i]){
                    case "A":
                        hexaNum[i] = 10;
                    break;
                    case "B":
                        hexaNum[i] = 11;
                    break;
                    case "C":
                        hexaNum[i] = 12;
                    break;
                    case "D":
                        hexaNum[i] = 13;
                    break;
                    case "E":
                        hexaNum[i] = 14;
                    break;
                    case "F":
                        hexaNum[i] = 15;
                    break;   
                }
                total += hexaNum[i]*counter;
                counter = counter * 16;
            }

            result.innerHTML = `<h2>${total}<h2/>`;
        }

        if(to == "Hexadecimal"){
            result.innerHTML = `<h2>${input}<h2/>`;
        }
    }
}