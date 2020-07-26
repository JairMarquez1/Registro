let res = ['_','_','_','_','_','_','_','_','_'];
let quantity = localStorage.getItem('quantity');
let name;
let combinations = false;

function start(){
    console.log(document.querySelector(".quiniela").style.width);
    let container = document.getElementById("text");
    container.innerHTML = res.join("\xa0\xa0");
    let quantity = localStorage.getItem('quantity');
    name = localStorage.getItem("alias");
    if (quantity)
    document.querySelector('.botonenviar span').textContent = quantity;
    let results = localStorage.getItem("results");
    if (results){
        results = results.split("*");
        for (var i = 0; i < quantity; i++){
            if (results[i]){
                document.getElementById("display").innerHTML += `<div>`+ results[i] +`</div>`;} 
            else
                break;
    }
    document.getElementById("total").innerHTML = "Total: $" + quantity*25 +"\n";
}  }

function selection(element){
    if (!element.style.backgroundColor){
        let index = parseInt(element.id.slice(1)) - 1;
        let container = document.getElementById("text");
        if (!combinations){
            validation(element);
            res[index] = element.id.slice(0,1);
            }
        else{
            res[index] += element.id.slice(0,1);
            res[index] = res[index].split('_').join('');
        }
        element.style.backgroundColor = "rgba(19, 15, 83, 0.979)";
        container.innerHTML = res.join("\xa0\xa0");}
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
        console.log(quantity);
    document.querySelector('.botonenviar span').textContent = quantity;
    localStorage.setItem('alias', name);
}

function result(){
    results = localStorage.getItem("results");
    name = document.getElementById("nombre").value;
    if (results){
        /*localStorage.setItem('results', results + "%0D" + res.join("%20%20"));*/
        localStorage.setItem('results', results + "\n" + name + "\xa0\xa0" + res.join("\xa0\xa0") + "*");
        }
        else
            localStorage.setItem('results',name + "\xa0\xa0" + res.join("\xa0\xa0") + "*");
}

function send(){
    if (!quantity)
        save();
    else{
    let whatsapptext = res.join("%20%20")
    whatsapptext = encodeURI(localStorage.getItem("results"));
    whatsapptext = whatsapptext.split('*').join('%0D%0A');
    console.log(whatsapptext);
    window.location.href = "https://wa.me/523318325850?text="+whatsapptext;}
}

function save(){
    if (res.join("\xa0\xa0").includes("_"))
        alert("Debes llenar todas las casillas");
    else{
        if (combinations)
            calculate();
        else
            number();
        result();
        updatedisplay();}
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
}

function updatedisplay(){
    /*document.getElementById("display").innerHTML += (quantity + "- " + res.join("\xa0\xa0"));*/
    document.getElementById("display").innerHTML += `<div>` +  name + "\xa0\xa0" + res.join("\xa0\xa0") + "*\xa0\xa0" + `</div>`;
    console.log(name);
    document.getElementById("total").innerHTML = "Total: $" + quantity*25;
}

function recovername(){
    name = localStorage.getItem("alias");
    document.getElementById("nombre").value = name;
}

function allowcombination(){
    combinations=!combinations;
}

function calculate(){
    let aux = 1;
    for (var i=0;i<9;i++){
        aux*= res[i].length;
    }
    quantity = localStorage.getItem("quantity");
    if (quantity)
        localStorage.setItem('quantity', parseInt(quantity)+aux);
    else{
        localStorage.setItem('quantity', aux);
        quantity = localStorage.getItem("quantity");}
    document.querySelector('.botonenviar span').textContent = quantity;
    localStorage.setItem('alias', name);
}

window.addEventListener("load",start,false);