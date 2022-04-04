const typingSpeed = 10;
const desiredResult = "bean";

const typedCharacters = [];

const charsets = {
    speedy: [0x61, 0x6E],
    easy: [0x61, 0x7A],
    cheap: [0x41, 0x7A],
    simple: [36, 126],
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
    else
    {
        typedCharacters.splice(0, typedCharacters.length);
    }
}

let charCounter = 0;

function startTyping()
{
    const typingArea = document.querySelector('#typing-area');
    const charset = document.querySelector("#charset").value;
    const nav = document.querySelector("#nav");

    nav.style.display = "none";

    const randChar = getRandomCharacter(charsets[charset][0], charsets[charset][1]);
    console.log(typedCharacters)

    typingArea.innerText += randChar;
    charCounter++;
    addToTyped(randChar);

    if(checkForResult())
    {
        typingArea.innerHTML = typingArea.innerHTML.substring(0, typingArea.innerHTML.length - desiredResult.length);

        typingArea.innerHTML += `<span class='correct'>${desiredResult}</span>`;
        winner();
        return;
    }
    else
    {
        setTimeout(startTyping, typingSpeed);
    }
}

function winner()
{
    const winnerPopup = document.querySelector(".winner");
    const resultText = document.querySelector("#result");
    const charset = document.querySelector("#charset").value;
    const settings = document.querySelector("#settings");

    winnerPopup.style.display = "block";
    resultText.innerHTML = `You got "bean" after <b>${charCounter}</b> characters!`
    settings.innerHTML = `Character set: ${charset}<br>Chance: 1 in ${(charsets[charset][1] - charsets[charset][0] + 1) ** desiredResult.length}`;
}

function pageScroll() {
    window.scrollBy(0,1);
    scrolldelay = setTimeout(pageScroll,2);
}

function writeChance() {
    const charset = document.querySelector("#charset").value;
    const chanceText = document.querySelector("#chance");

    let chance = (charsets[charset][1] - charsets[charset][0] + 1) ** desiredResult.length;

    chanceText.innerHTML = `1 in <b>${chance}</b> chance`;
}

window.onload = writeChance;
pageScroll();