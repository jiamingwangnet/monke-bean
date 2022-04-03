const typingSpeed = 10;
const desiredResult = "bean";

const typedCharacters = [];

const charsets = {
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

function startTyping()
{
    const typingArea = document.querySelector('#typing-area');
    const charset = document.querySelector("#charset").value;
    const nav = document.querySelector("#nav");

    nav.style.display = "none";

    const randChar = getRandomCharacter(charsets[charset][0], charsets[charset][1]);
    console.log(typedCharacters)

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
        setTimeout(startTyping, typingSpeed);
    }
}

function pageScroll() {
    window.scrollBy(0,1);
    scrolldelay = setTimeout(pageScroll,2);
}

pageScroll();