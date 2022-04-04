const typingSpeed = 10;
const desiredResult = "bean";

const typedCharacters = [];

const charsets = {
    speedy:    [0x000061, 0x00006E],
    easy:      [0x000061, 0x00007A],
    cheap:     [0x000041, 0x00007A],
    simple:    [0x000024, 0x00007E],
    difficult: [0x000000, 0x0000ff],
    extended:  [0x000000, 0x00ffff],
    unicode:   [0x000000, 0x10ffff]
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

    let formatedRange01 = "";
    let formatedRange02 = "";

    for(let i = 0; i < 6; i++)
    {
        if(6 - i > charsets[charset][0].toString(16).length)
        {
            formatedRange01 += "0";
        }
        else
        {
            formatedRange01 += charsets[charset][0].toString(16)[i - (6 - charsets[charset][0].toString(16).length)];
        }
    }

    for(let i = 0; i < 6; i++)
    {
        if(6 - i > charsets[charset][1].toString(16).length)
        {
            formatedRange02 += "0";
        }
        else
        {
            formatedRange02 += charsets[charset][1].toString(16)[i - (6 - charsets[charset][1].toString(16).length)];
        }
    }

    winnerPopup.style.display = "block";
    resultText.innerHTML = `You got "bean" after <b>${charCounter}</b> characters!`
    settings.innerHTML = `Character set: ${charset}<br>Chance: 1 in ${(charsets[charset][1] - charsets[charset][0] + 1) ** desiredResult.length}<br>Range: U+${formatedRange01} - U+${formatedRange02}`;
}

function pageScroll() {
    window.scrollBy(0,1);
    scrolldelay = setTimeout(pageScroll,2);
}

function writeChance() {
    const charset = document.querySelector("#charset").value;
    const chanceText = document.querySelector("#chance");
    const rangeText = document.querySelector("#range");

    let chance = (charsets[charset][1] - charsets[charset][0] + 1) ** desiredResult.length;

    let formatedRange01 = "";
    let formatedRange02 = "";

    for(let i = 0; i < 6; i++)
    {
        if(6 - i > charsets[charset][0].toString(16).length)
        {
            formatedRange01 += "0";
        }
        else
        {
            formatedRange01 += charsets[charset][0].toString(16)[i - (6 - charsets[charset][0].toString(16).length)];
        }
    }

    for(let i = 0; i < 6; i++)
    {
        if(6 - i > charsets[charset][1].toString(16).length)
        {
            formatedRange02 += "0";
        }
        else
        {
            formatedRange02 += charsets[charset][1].toString(16)[i - (6 - charsets[charset][1].toString(16).length)];
        }
    }


    chanceText.innerHTML = `1 in <b>${chance}</b> chance`;
    rangeText.innerHTML = `Range: U+${formatedRange01} - U+${formatedRange02}`;
}

window.onload = writeChance;
pageScroll();