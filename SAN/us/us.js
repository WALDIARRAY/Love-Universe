
// =====================================
// CREATE THE STARRY BACKGROUND
// =====================================

const starsContainer = document.getElementById("stars");

for (let i = 0; i < 140; i++) {
    const star = document.createElement("div");

    star.className = "star";

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

    star.style.animationDelay = Math.random() * 4 + "s";
    star.style.animationDuration = (2 + Math.random() * 4) + "s";

    const size = Math.random() * 2 + 1;

    star.style.width = size + "px";
    star.style.height = size + "px";

    starsContainer.appendChild(star);
}


// =====================================
// INTRO STORY ANIMATION
// =====================================

const storyLines = document.querySelectorAll(".story-line");

let currentLine = 0;

function showNextStoryLine() {

    storyLines[currentLine].classList.remove("active");

    currentLine++;

    if (currentLine >= storyLines.length) {
        currentLine = 0;
    }

    storyLines[currentLine].classList.add("active");
}

const storyInterval = setInterval(showNextStoryLine, 4000);


// =====================================
// ENTER OUR UNIVERSE
// =====================================

const enterButton = document.getElementById("enterButton");

const intro = document.getElementById("intro");

const ourWorld = document.getElementById("ourWorld");

enterButton.addEventListener("click", function () {

    clearInterval(storyInterval);

    intro.classList.add("hidden");

    ourWorld.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
