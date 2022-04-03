const typingArea = document.querySelector('#typing-area');
const typingSpeed = 10;
const desiredResult = "bean";

const typedCharacters = [];

const charsets = {
    simple: [36, 127],
    difficult: [0x00, 0xff],
    extended: [0x00, 0xffff],
    unicode: [0x00, 0x10ffff]
}

function getRandomCharacter(min, max) {
    return String.fromCharCode(Math.floor(Math.random() * (max - min + 1)) + min);
}

function checkForResult()
{
    return typedCharacters.join('') === desiredResult;
}

function addToTyped(char)
{
    if(desiredResult[typedCharacters.length] === char)
    {
        typedCharacters.push(char);
    }
}

function type()
{
    const randChar = getRandomCharacter(charsets.simple[0], charsets.simple[1]);

    typingArea.innerText += randChar;
    addToTyped(randChar);

    if(checkForResult())
    {
        typingArea.innerHTML = typingArea.innerHTML.substring(0, typingArea.innerHTML.length - desiredResult.length);

        typingArea.innerHTML += `<span class='correct'>${desiredResult}</span>`;
        return;
    }
    else
    {
        setTimeout(type, typingSpeed);
    }
}

window.onload = type;