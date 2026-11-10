const moonPhases = [
    {
        name: "New Moon",
        subtitle: "Even when I cannot see you...",
        kicker: "PHASE 01 · THE BEGINNING",
        message: "You are still there, just like the Moon on its darkest night. Even when distance or silence gets in the way, you never leave my thoughts."
    },
    {
        name: "Waxing Crescent",
        subtitle: "A little light changes everything.",
        kicker: "PHASE 02 · THE FIRST LIGHT",
        message: "Your presence brings light into the smallest corners of my life. You do not have to do anything extraordinary. Being you is already enough."
    },
    {
        name: "First Quarter",
        subtitle: "A reminder to keep choosing us.",
        kicker: "PHASE 03 · GROWING TOGETHER",
        message: "Not every day will be perfect, but I want to keep showing up, keep understanding you, and keep choosing what we are building together."
    },
    {
        name: "Waxing Gibbous",
        subtitle: "The closer I look, the more I adore.",
        kicker: "PHASE 04 · ALMOST FULL",
        message: "The more I get to know you, the more little things I find to love: your expressions, your habits, your laughter, and all the details that make you Sandhiya."
    },
    {
        name: "Full Moon",
        subtitle: "Some beauty is impossible to ignore.",
        kicker: "PHASE 05 · THE BRIGHTEST NIGHT",
        message: "When the Moon is full, the whole sky seems to notice. That is how you feel to me: someone whose smile can make an ordinary moment feel unforgettable."
    },
    {
        name: "Waning Gibbous",
        subtitle: "Even after the brightest moments...",
        kicker: "PHASE 06 · WHAT REMAINS",
        message: "The best moments do not disappear when they end. They stay with me—in memories, in random smiles, and in the little things that remind me of you."
    },
    {
        name: "Last Quarter",
        subtitle: "Love is also patience and understanding.",
        kicker: "PHASE 07 · THROUGH EVERY CHANGE",
        message: "The Moon changes, and so will life. I cannot promise every day will be easy, but I can promise to listen, learn, and never take what we have for granted."
    },
    {
        name: "Waning Crescent",
        subtitle: "And then, the cycle begins again.",
        kicker: "PHASE 08 · ALWAYS",
        message: "Even when only a sliver of light remains, the Moon is still the Moon. And through every season, every distance, and every change, you will remain someone very special to me."
    }
];

let activePhase = 0;

const phaseGrid = document.getElementById("phaseGrid");
const phaseKicker = document.getElementById("phaseKicker");
const cardMoon = document.getElementById("cardMoon");
const phaseTitle = document.getElementById("phaseTitle");
const phaseSubtitle = document.getElementById("phaseSubtitle");
const phaseMessage = document.getElementById("phaseMessage");
const phaseCount = document.getElementById("phaseCount");

function renderPhaseButtons() {
    phaseGrid.innerHTML = "";

    moonPhases.forEach((phase, index) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "phase-choice";

        button.innerHTML = `
            <span class="phase-icon"></span>
            <span>${phase.name}</span>
        `;

        button.addEventListener("click", () => {
            showPhase(index);
        });

        phaseGrid.appendChild(button);
    });
}

function showPhase(index) {
    activePhase = (index + moonPhases.length) % moonPhases.length;

    const phase = moonPhases[activePhase];

    phaseKicker.textContent = phase.kicker;
    cardMoon.className = `card-moon phase-${activePhase}`;
    phaseTitle.textContent = phase.name;
    phaseSubtitle.textContent = phase.subtitle;
    phaseMessage.textContent = phase.message;

    phaseCount.textContent =
        `${String(activePhase + 1).padStart(2, "0")} / 08`;

    [...phaseGrid.children].forEach((button, i) => {
        button.classList.toggle("active", i === activePhase);
    });
}

document.getElementById("previousPhase").addEventListener("click", () => {
    showPhase(activePhase - 1);
});

document.getElementById("nextPhase").addEventListener("click", () => {
    showPhase(activePhase + 1);
});


// RETURN TO CELESTIAL ATLAS

function returnToAtlas() {
    window.location.href = "../index.html#universeHub";
}

document.getElementById("backButton").addEventListener("click", returnToAtlas);

document.getElementById("closingBack").addEventListener("click", returnToAtlas);


// START

renderPhaseButtons();
showPhase(0);

console.log("Moon experience loaded successfully!");