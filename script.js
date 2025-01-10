const lowerCase = "abcdefghijklmnopqrtusvwxyz";
const upperCase = "ABCDEFGHIJKLMNOPQRTUSVWXYZ";
const numbers = "0123456789";
const specChars = "§~+!%=();_*?@&#<>[]";
const passwd = [];

// Generáló gomb működtetése:
document.getElementById("generateBtn").onclick = handleClick;

function handleClick() {
    const values = getInputValue();
    getReadyPasswd(values);
    console.log(values);
}
// Üzenetet küldő eljárás:
function sendMessage(message) {
    alert(message);
}

// Értékek kinyerése. Ha hiányzik érték az inputból, akkor üzenetet küldünk, input-ra helyezzük a fókszt, és null-t adunk vissza.
function getInputValue() {
    const inputElements = document.querySelectorAll("input");
    const values = {};
    if (inputElements.length > 0) {
        for (let index in inputElements) {
            if (inputElements[index].value === "") {
                sendMessage("Minden adat megadása szükséges!");
                inputElements[index].focus();
                return {};
            }
            //values.push(parseInt(input.value));
            values[inputElements[index].id] = inputElements[index].value;
        }
        return values;
    }
}

function createPasswdPart(count, collection) {
    for (let i = 0; i < count; i++) {
        passwd.push(collection[Math.floor(Math.random() * collection.length)]);
    }
    return passwd;
}

// A végső, kész jelszó készítése. Ám ez a function még csak listát ad vissza, ráadásul rendezett lista: számcsoport, kisbetűs csoport stb.
// Ezért a kész jelszót tároló listát meg kell keverni, és sztringgé kell alakítani. 
function getReadyPasswd(values) {
    const donePasswd = [];
    for (let key in values) {
        console.log(typeof key);
        switch (key) {
            case "numDigits":
                donePasswd.push(createPasswdPart(values[key], numbers));
                break;
            // Tovább kellene írni!!!
            default:
                break;
        }
    }
    
    console.log(donePasswd);
}

// Újabb gond!
// Mi van akkor, ha a felhasználó 12 karakterhosszú jelszót kért, de az álatal megadott adatok alapján a jelszó csak 8 karakternyi lesz? Ki kell tölteni pl. kisbetűkkel!
// Mi van akkor, ha túl rövid jelszót kér? Ne engedjük! 8 karakternél nem lehet kisebb a jelszó!
// Végül meg kell jeleníteni annyi jelszót, amennyit a felhasználó kért...