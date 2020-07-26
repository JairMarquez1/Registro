let res = ['_','_','_','_','_','_','_','_','_'];

function start(){
    let container = document.getElementById("text");
    container.innerHTML = res.join("\xa0\xa0");
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

window.addEventListener("load",start,false);