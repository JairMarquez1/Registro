let res = ['_','_','_','_','_','_','_','_','_'];
let quantity = localStorage.getItem('quantity');

function start(){
    let container = document.getElementById("text");
    container.innerHTML = res.join("\xa0\xa0");
    let quantity = localStorage.getItem('quantity');
    if (quantity)
    document.querySelector('.botonenviar span').textContent = quantity;
    document.getElementById("display").innerHTML = localStorage.getItem("results") + "\n";
    document.getElementById("total").innerHTML = "Total: $" + quantity*25 +"\n";
}

function selection(element){
    if (!element.style.backgroundColor){
        validation(element);
        element.style.backgroundColor = "rgba(19, 15, 83, 0.979)"
        let index = parseInt(element.id.slice(1)) - 1;
        res[index] = element.id.slice(0,1);
        let container = document.getElementById("text");
        container.innerHTML = res.join("\xa0\xa0");
   }
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
        }

function result(){
    results = localStorage.getItem("results");
    if (results){
        /*localStorage.setItem('results', results + "%0D" + res.join("%20%20"));*/
        localStorage.setItem('results', results + "\n" + res.join("\xa0\xa0"));
        }
        else
            localStorage.setItem('results', res.join("\xa0\xa0"));}

function send(){
    if (!quantity)
        save();
    else{
    let whatsapptext = res.join("%20%20")
    whatsapptext = encodeURI(localStorage.getItem("results"));
    console.log(whatsapptext);
    window.location.href = "https://wa.me/523318325850?text="+whatsapptext;}
}

function save(){
    if (res.join("\xa0\xa0").includes("_"))
        alert("Debes llenar todas las casillas");
    else{
        number();
        result();
        updatedisplay();}
}

function deleteall(){
    if(confirm("Se borrará todo"))
        {localStorage.clear();
        location.reload();}
}

function updatedisplay(){
    /*document.getElementById("display").innerHTML += (quantity + "- " + res.join("\xa0\xa0"));*/
    document.getElementById("display").innerHTML += res.join("\xa0\xa0") + "\n";
    document.getElementById("total").innerHTML = "Total: $" + quantity*25;
}


window.addEventListener("load",start,false);