let res = ['_','_','_','_','_','_','_','_','_'];
let quantity = localStorage.getItem('quantity');
let name = localStorage.getItem("alias");
let combinations = false;
var aux;

function start(){
    recovername();
    display = document.getElementById("display");
    let width = document.getElementsByClassName('quiniela')[0].offsetWidth;
    document.getElementById("quiniela").style.height = width*0.9375 + "px";
    let container = document.getElementById("text");
    container.innerHTML = res.join("\xa0\xa0");
    if (quantity)
        document.querySelector('.botonenviar span').textContent = quantity;
    let results = localStorage.getItem("results");
    if (results){
        results = results.split("*");
        for (var i = 0; i < quantity; i++){
            if (results[i] && results[i] != undefined){
                display.innerHTML += `<div>`+ results[i] + `</div>`;} 
            else
                break;
    }
    document.getElementById("total").innerHTML = "Total: $" + quantity*25 +"\n";
    display.lastElementChild.innerHTML += `<button id="undo" onclick="remove()"><ion-icon name="arrow-undo-outline"></ion-icon></button>`;
}  
}

function selection(element){
    let index = parseInt(element.id.slice(1)) - 1;
    let container = document.getElementById("text");
    if (!element.style.backgroundColor){
        if (!combinations){
            validation(element);
            res[index] = element.id.slice(0,1);
            }
        else{
            res[index] += element.id.slice(0,1);
            res[index] = res[index].split('_').join('');
        }
        element.style.backgroundColor = "rgb(168, 32, 22)";
    }
    else{
        if(combinations){
        element.style.backgroundColor = "";
        console.log(res[index].length);
        if (res[index] != "_" && res[index].length>1)
            res[index] = res[index].split(element.id.slice(0,1)).join('');
        else    
            res[index] = "_";
        }
    }
    costoactual();
    container.innerHTML = res.join("\xa0\xa0");
}

function validation(element){
    let index = parseInt(element.id.slice(1));
    document.getElementById("L"+index).style.backgroundColor = null;
    document.getElementById("E"+index).style.backgroundColor = null;
    document.getElementById("V"+index).style.backgroundColor = null;
}

function number(){
    quantity = localStorage.getItem("quantity");
    if (quantity)
        localStorage.setItem('quantity', ++quantity);
    else{
        localStorage.setItem('quantity', 1);
        quantity = localStorage.getItem("quantity");}
    document.querySelector('.botonenviar span').textContent = quantity;
    localStorage.setItem('alias', name);
}

function result(){
    results = localStorage.getItem("results");
    name = document.getElementById("nombre").value;
    name  = name.split('*').join('');
    if (results){
        /*localStorage.setItem('results', results + "%0D" + res.join("%20%20"));*/
        if (aux > 1)
        localStorage.setItem('results', results + "\n" + res.join("\xa0\xa0") + "\xa0\xa0" + name + " (" + aux + ")" + "*");
        else
            localStorage.setItem('results', results + "\n" + res.join("\xa0\xa0") + "\xa0\xa0" + name + "*");
        }
        else
        {
            if (aux > 1)
            localStorage.setItem('results',res.join("\xa0\xa0") + "\xa0\xa0" + name + " (" + aux + ")" +  "*");
            else    
                localStorage.setItem('results',res.join("\xa0\xa0") + "\xa0\xa0" + name+ "*");}       
}

function send(){
    if (!quantity || quantity < 1)
        save();
    if (quantity > 0){
    let whatsapptext = res.join("%20%20")
    whatsapptext = encodeURI(localStorage.getItem("results"));
    whatsapptext = whatsapptext.split('*').join('%0D');
    window.location.href = "https://wa.me/523317816346?text="+whatsapptext;}
}

function save(){
    name = document.getElementById("nombre").value;
    if (res.join("\xa0\xa0").includes("_"))
        alert("Debes llenar todas las casillas");
    else if (!name){
        alert("Debes elegir un nombre");
        return 0;}
    else{
        if (combinations)
            calculate();
        else
            number();

        result();
        updatedisplay();
        clean();}
}

function deleteall(){
    if(confirm("Se borrará todo"))
        {localStorage.clear();
        location.reload();}
}

function clean(){
    res = ['_','_','_','_','_','_','_','_','_']
    let container = document.getElementById("text");
    container.innerHTML = res.join("\xa0\xa0");
    spans = document.querySelectorAll(".quiniela span");
    for (var i=0; i<27;i++)
        spans[i].style.backgroundColor = "";
    document.getElementById("costo").innerHTML = "Costo: $0";
    document.getElementById("numquinielas").innerHTML = "0 Quiniela(s)";
}

function updatedisplay(){
    let display = document.getElementById("display");
    if (quantity > 1)
    display.lastElementChild.removeChild(display.lastElementChild.lastElementChild);
    if (aux > 1)
        display.innerHTML += `<div>` +  res.join("\xa0\xa0") + "\xa0\xa0" + name + " (" + aux + ")" + "*\xa0\xa0" + `</div>`;
    else
    display.innerHTML += `<div>` +  res.join("\xa0\xa0") + "\xa0\xa0" + name + "*\xa0\xa0" + `</div>`;
    document.getElementById("total").innerHTML = "Total: $" + quantity*25;
    display.lastElementChild.innerHTML += `<button id="undo" onclick="remove()"><ion-icon name="arrow-undo-outline"></ion-icon></button>`;
    aux = 1;
}

function recovername(){
    name = localStorage.getItem("alias");
    if (name !=  null && name !="null")
        document.getElementById("nombre").value = name;
}

function clearname(){
    document.getElementById("nombre").value = "";
}

function allowcombination(){
    if (!combinations) 
        combinations = confirm("¿Desea registrar quinielas multiples?");
    else
        combinations= false;
    document.getElementById("checkcombinaciones").checked = combinations;
    clean();
}

function calculate(){
    aux = 1;
    for (var i=0;i<9;i++){
        aux*= res[i].length;
    }
    quantity = localStorage.getItem("quantity");
    if (quantity){
        localStorage.setItem('quantity', parseInt(quantity)+aux);
        quantity = localStorage.getItem('quantity');}
    else{
        localStorage.setItem('quantity', aux);
        quantity = localStorage.getItem("quantity");}
    document.querySelector('.botonenviar span').textContent = quantity;
    localStorage.setItem('alias', name);
}

function random(){
    clean();
    let container = document.getElementById("text");
    let partidos = document.getElementsByClassName("partido");
    for (var i = 0; i < 9; i++){
        var r = getRandomInt(0,2);
        partidos[i].getElementsByTagName("span")[r].style.backgroundColor = "rgb(168, 32, 22)";
        res[i] = ["L","E","V"][r];
    }
    container.innerHTML = res.join("\xa0\xa0");
    costoactual();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function costoactual(){
    if (!res.join("\xa0\xa0").includes("_")){
        let aux2 = 1;
        for (var i=0;i<9;i++){
             aux2*= res[i].length;
        }
        document.getElementById("costo").innerHTML = "Costo: $" + aux2*25;
        document.getElementById("numquinielas").innerHTML = aux2 + " Quiniela(s)"
    }
}
function remove(){
    if (quantity > 0){
        x = localStorage.getItem("results");
        x = removeLastLine(x);
        localStorage.setItem("results", x);

        let display = document.getElementById('display');
        last = display.lastElementChild.textContent;
        last = last.split("\xa0\xa0");
        last [0] = last[0].split('\n').join('');

        let aux3 = 1;
        for (var i=0;i<9;i++){
            aux3*= last[i].length;
            }
        if (quantity == 1)
            localStorage.setItem("results","");
        quantity -= aux3;
    
        display.removeChild(display.lastElementChild);

        let container = document.getElementById("text");
        container.innerHTML = res.join("\xa0\xa0");

        let results = localStorage.getItem("results");
        results = results.split("*");

        document.querySelector('.botonenviar span').textContent = quantity;
        document.getElementById("total").innerHTML = "Total: $" + quantity*25 +"\n";

        localStorage.setItem('quantity', quantity);

        if (display.lastElementChild != null)
            display.lastElementChild.innerHTML += `<button id="undo" onclick="remove()"><ion-icon name="arrow-undo-outline"></ion-icon></button>`;
}
}

function removeLastLine(){
    if(x.lastIndexOf("\n")>0) {
        return x.substring(0, x.lastIndexOf("\n"));
    } else {
        return x;
    }
}

window.addEventListener("load",start,false);