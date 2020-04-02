//----------- FUNCTIONS ----------

// Says Goodbye
let bye = () => {
    alert(`Goodbye ${name}!`);
    setTimeout(500);
    return;
}

// Gets user input for the numbers to process
let getA = () => {
    a = prompt(`Here we go ${name}! Enter your first number:`);
        switch (a) {
            case '':
                getA();
                break;
            case (null):
               bye();
               break;
            default:
                a = parseFloat(a); // Found parseFloat on stackoverflow
                if(Number.isNaN(a)){ // how to check if this string is actually a number?? ....ahh, thank you Stack Overflow :D
                    getA();
                } else {
                    getB();
                }
        }
    return;
}

let getB = () => {
    b = prompt(`${a}. And the second number?`);
    switch (b) {
        case '':
            getB();
            break;
        case (null):
           bye();
           break;
        default:
            b = parseFloat(b);
            if(Number.isNaN(b)){ // how to check if this string is actually a number?? ....ahh, thank you Stack Overflow :D
                getB();
            } else {
                result(a,b);
            }
           
    }
    return;
}

// processes numbers and requests another round
let result = () => {
    x = prompt(`Okay ${a} and ${b}. Please type if you'd like to add, subtract, multiply, or divide:`);
    if ( x === null) {
        bye();
        return;
    }
    switch (x) {
        case 'add': // fall-through (found on stack overflow)
        case '+': 
        res = a + b;
        again = confirm(`${a} + ${b} = ${res}. Would you like to go again?`);
            break;

        case 'subtract': // fall-through
        case '-':
        res = a - b;
        again = confirm(`${a} - ${b} = ${res}. Would you like to go again?`);
            break; 

        case 'multiply': //fall-through
        case 'x': // fall-through
        case '*':
        res = a * b;
        again = confirm(`${a} * ${b} = ${res}. Would you like to go again?`);
            break;

        case 'divide': // fall-through
        case '/': 
        res = a / b;
        res = res.toPrecision(4);
        again = confirm(`${a} / ${b} = ${res}. Would you like to go again?`);
            break;

        default:
            if(confirm("Invalid value. Please try again.")) {
            result(a,b);
            } else {
            bye();
            break;
        }
    } 
    switch (again) {
        case (false):
            bye();
            return;
            break;
        case (true):
            getA();
            return;
            break;
    }
    return;
}





// ---------- MAIN THREAD ----------

let name = prompt("Hi! What's your name?");
if(name != null) {
    getA();
} 
else {
    alert('Okay bye...');
} 





