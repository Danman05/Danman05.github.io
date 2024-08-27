const secretSequence = "party";
let keyArr = [];
let timeoutId;

const body = document.getElementsByTagName('body')[0];

function party (event) {
    keyArr.push(event.key);
    
    if (keyArr.join("") === secretSequence) {
        body.className = "party";
    } 

    clearTimeout(timeoutId); 
    timeoutId = setTimeout(() => {
        keyArr = [];
        body.className = "";
    }, 2000);
}

document.addEventListener('keypress', party );