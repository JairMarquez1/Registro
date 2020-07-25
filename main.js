let L = [1,2,3,4,5,6,7,8,9];
let E = [1,2,3,4,5,6,7,8,9];
let V = [1,2,3,4,5,6,7,8,9];
let res = ['','','','','','','','',''];

function start(){
    for (var i = 1; i < 10 ; i++){
        L[i] = document.getElementById("L"+i);
        E[i] = document.getElementById("E"+i);
        V[i] = document.getElementById("V"+i);
    }
}

function selection(element){
    if (!element.style.backgroundColor){
        element.style.backgroundColor = "rgba(19, 15, 83, 0.979)"
        let index = parseInt(element.id.slice(1)) - 1;
        res[index] = element.id.slice(0,1);
        console.log(res);
    }
    else
    element.style.backgroundColor = null;
}

window.addEventListener("load",start,false);