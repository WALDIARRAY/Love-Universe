
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const message = document.getElementById("game-message");

const screens = {
    start: document.getElementById("start-screen"),
    pause: document.getElementById("pause-screen"),
    over: document.getElementById("game-over-screen"),
    ending: document.getElementById("ending-screen")
};

const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const TARGET_SCORE = 100;

const GRAVITY = 0.62;
const MOVE_SPEED = 4.2;
const JUMP_POWER = -13.5;

let running = false;
let paused = false;
let gameOver = false;
let finished = false;
let score = 0;
let lives = 3;
let cameraX = 0;
let animationId = null;
let lastTime = 0;
let gameTime = 0;
let finishMode = false;
let jitenX = null;
let hugProgress = 0;
let particles = [];
let floatingTexts = [];
let stars = [];
let platforms = [];
let hazards = [];
let nextWorldX = 0;
let checkpointX = 70;

const input = {
    left: false,
    right: false
};

const player = {
    x: 70,
    y: 395,
    width: 36,
    height: 65,
    vx: 0,
    vy: 0,
    grounded: false,
    facing: 1,
    invulnerable: 0,
    damageFlash: 0,
    runFrame: 0
};

// ------------------------------
// GAME RESET
// ------------------------------

function resetGame() {
    score = 0;
    lives = 3;
    cameraX = 0;
    gameTime = 0;
    finishMode = false;
    finished = false;
    gameOver = false;
    paused = false;
    jitenX = null;
    hugProgress = 0;
    particles = [];
    floatingTexts = [];
    stars = [];
    platforms = [];
    hazards = [];
    nextWorldX = 0;
    checkpointX = 70;

    player.x = 70;
    player.y = 395;
    player.vx = 0;
    player.vy = 0;
    player.grounded = false;
    player.facing = 1;
    player.invulnerable = 0;
    player.damageFlash = 0;
    player.runFrame = 0;

    // Starting platform
    platforms.push({
        x: 0,
        y: 460,
        width: 650,
        height: 100
    });

    nextWorldX = 650;

    // Initial world generation
    while (nextWorldX < 1800) {
        generatePlatform();
    }

    updateHUD();
}

// ------------------------------
// HUD
// ------------------------------

function updateHUD() {
    scoreDisplay.textContent = `⭐ ${score} / ${TARGET_SCORE}`;

    livesDisplay.textContent =
        "❤️ ".repeat(lives) + "🖤 ".repeat(3 - lives);

    livesDisplay.setAttribute(
        "aria-label",
        `${lives} lives remaining`
    );
}

// ------------------------------
// INFINITE WORLD GENERATION
// ------------------------------

function generatePlatform() {
    const previous = platforms[platforms.length - 1];

    const gap = 65 + Math.random() * 45;
    const width = 240 + Math.random() * 150;

    let y = previous.y + (Math.random() * 100 - 50);
    y = Math.max(350, Math.min(455, y));

    const x = nextWorldX + gap;

    const platform = {
        x,
        y,
        width,
        height: 100
    };

    platforms.push(platform);

    // Add stars above the platform.
    const starCount = Math.random() < 0.35 ? 2 : 3;

    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: x + 45 + i * ((width - 90) / starCount),
            y: y - 65 - (i % 2) * 15,
            collected: false,
            rotation: Math.random() * Math.PI
        });
    }

    // Add an occasional obstacle.
    if (Math.random() < 0.24) {
        hazards.push({
            x: x + width * 0.65,
            y: y - 26,
            width: 24,
            height: 26,
            active: true
        });
    }

    nextWorldX = x + width;
}

function maintainWorld() {
    const worldAhead = cameraX + WIDTH + 1000;

    while (nextWorldX < worldAhead) {
        generatePlatform();
    }

    // Remove old objects to keep the game lightweight.
    platforms = platforms.filter(
        platform => platform.x + platform.width > cameraX - 300
    );

    stars = stars.filter(
        star => star.x > cameraX - 300 && !star.collected
    );

    hazards = hazards.filter(
        hazard => hazard.x > cameraX - 300 && hazard.active
    );
}

// ------------------------------
// INPUT
// ------------------------------

document.addEventListener("keydown", event => {
    const key = event.key.toLowerCase();

    if (["arrowleft", "arrowright", "arrowup", " "].includes(key)) {
        event.preventDefault();
    }

    if (key === "arrowleft" || key === "a") {
        input.left = true;
    }

    if (key === "arrowright" || key === "d") {
        input.right = true;
    }

    if (
        key === "arrowup" ||
        key === "w" ||
        key === " "
    ) {
        jump();
    }

    if (key === "escape" && running && !finished && !gameOver) {
        togglePause();
    }
});

document.addEventListener("keyup", event => {
    const key = event.key.toLowerCase();

    if (key === "arrowleft" || key === "a") {
        input.left = false;
    }

    if (key === "arrowright" || key === "d") {
        input.right = false;
    }
});

function bindHoldButton(id, direction) {
    const button = document.getElementById(id);

    button.addEventListener("pointerdown", event => {
        event.preventDefault();
        input[direction] = true;

        if (button.setPointerCapture) {
            button.setPointerCapture(event.pointerId);
        }
    });

    ["pointerup", "pointercancel", "lostpointercapture"].forEach(type => {
        button.addEventListener(type, () => {
            input[direction] = false;
        });
    });
}

bindHoldButton("left-btn", "left");
bindHoldButton("right-btn", "right");

document.getElementById("jump-btn").addEventListener(
    "pointerdown",
    event => {
        event.preventDefault();
        jump();
    }
);

function jump() {
    if (
        running &&
        !paused &&
        !gameOver &&
        !finished &&
        player.grounded
    ) {
        player.vy = JUMP_POWER;
        player.grounded = false;

        createParticles(
            player.x + player.width / 2,
            player.y + player.height,
            7,
            "#d9b5ff"
        );
    }
}

// ------------------------------
// PAUSE / START / RESTART
// ------------------------------

function startGame() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }

    resetGame();

    Object.values(screens).forEach(screen => {
        screen.classList.add("hidden");
    });

    running = true;
    lastTime = performance.now();

    message.textContent = "Collect 100 stars and find Jiten! ❤️";

    animationId = requestAnimationFrame(gameLoop);
}

function togglePause() {
    if (!running || finished || gameOver) return;

    paused = !paused;

    screens.pause.classList.toggle("hidden", !paused);

    if (!paused) {
        lastTime = performance.now();
        animationId = requestAnimationFrame(gameLoop);
    }
}

document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("retry-btn").addEventListener("click", startGame);
document.getElementById("restart-btn").addEventListener("click", startGame);
document.getElementById("resume-btn").addEventListener("click", togglePause);

document.getElementById("pause-btn").addEventListener("click", togglePause);

// ------------------------------
// BACKGROUND
// ------------------------------

function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);

    gradient.addColorStop(0, "#100b2a");
    gradient.addColorStop(0.55, "#29164d");
    gradient.addColorStop(1, "#4b286d");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Distant glowing nebulae
    for (let i = 0; i < 5; i++) {
        const x = ((i * 250 - cameraX * 0.12) % (WIDTH + 300)) - 100;

        const glow = ctx.createRadialGradient(
            x, 200, 5, x, 200, 180
        );

        glow.addColorStop(0, "#a76de533");
        glow.addColorStop(1, "#a76de500");

        ctx.fillStyle = glow;
        ctx.fillRect(x - 180, 20, 360, 360);
    }

    // Twinkling stars
    for (let i = 0; i < 110; i++) {
        let x = (i * 137 - cameraX * 0.18) % WIDTH;
        if (x < 0) x += WIDTH;

        const y = (i * 73) % 330;
        const pulse = 0.4 + (Math.sin(gameTime * 0.002 + i) + 1) * 0.3;

        ctx.globalAlpha = pulse;
        ctx.fillStyle = i % 5 === 0 ? "#ffe4a8" : "#e8d7ff";

        ctx.beginPath();
        ctx.arc(x, y, i % 5 === 0 ? 2 : 1.2, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.globalAlpha = 1;

    // Distant floating hills
    ctx.fillStyle = "#251541";

    for (let i = 0; i < 6; i++) {
        const x = ((i * 270 - cameraX * 0.35) % (WIDTH + 300)) - 100;

        ctx.beginPath();
        ctx.ellipse(x, 455, 190, 100, 0, Math.PI, Math.PI * 2);
        ctx.fill();
    }

    // Crescent moon
    ctx.fillStyle = "#ffe8b1";
    ctx.beginPath();
    ctx.arc(790, 115, 33, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#181034";
    ctx.beginPath();
    ctx.arc(807, 101, 30, 0, Math.PI * 2);
    ctx.fill();
}

// ------------------------------
// PLATFORM DRAWING
// ------------------------------

function drawPlatforms() {
    platforms.forEach(platform => {
        const x = platform.x - cameraX;

        if (x + platform.width < -20 || x > WIDTH + 20) return;

        ctx.fillStyle = "#392451";
        ctx.fillRect(x, platform.y, platform.width, platform.height);

        ctx.fillStyle = "#9570bd";
        ctx.fillRect(x, platform.y, platform.width, 8);

        ctx.fillStyle = "#b9a0d6";
        ctx.fillRect(x, platform.y, platform.width, 2);

        for (let i = 15; i < platform.width; i += 42) {
            ctx.fillStyle = "#54396d";
            ctx.fillRect(x + i, platform.y + 24, 22, 8);
            ctx.fillRect(x + i + 15, platform.y + 53, 15, 7);
        }

        // Tiny grass and glowing details
        ctx.fillStyle = "#a6c17b";

        for (let i = 10; i < platform.width; i += 35) {
            ctx.fillRect(x + i, platform.y - 5, 3, 5);
        }

        ctx.fillStyle = "#d6b4f1";
        ctx.globalAlpha = 0.4;
        ctx.fillRect(x + 20, platform.y + 12, 30, 2);
        ctx.globalAlpha = 1;
    });
}

// ------------------------------
// STARS
// ------------------------------

function drawStarShape(x, y, radius, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    ctx.beginPath();

    for (let i = 0; i < 10; i++) {
        const r = i % 2 === 0 ? radius : radius * 0.45;
        const angle = i * Math.PI / 5 - Math.PI / 2;

        const px = Math.cos(angle) * r;
        const py = Math.sin(angle) * r;

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }

    ctx.closePath();

    ctx.shadowColor = "#ffdf73";
    ctx.shadowBlur = 18;
    ctx.fillStyle = "#ffdf73";
    ctx.fill();

    ctx.restore();
}

function drawStars() {
    stars.forEach(star => {
        if (star.collected) return;

        const x = star.x - cameraX;

        if (x < -30 || x > WIDTH + 30) return;

        const rotation = gameTime * 0.0015 + star.rotation;
        const pulse = 1 + Math.sin(gameTime * 0.006 + star.x) * 0.12;

        drawStarShape(x, star.y, 12 * pulse, rotation);

        ctx.fillStyle = "#fff4c8";
        ctx.globalAlpha = 0.65;

        ctx.beginPath();
        ctx.arc(x, star.y, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 1;
    });
}

// ------------------------------
// HAZARDS
// ------------------------------

function drawHazards() {
    hazards.forEach(hazard => {
        if (!hazard.active) return;

        const x = hazard.x - cameraX;

        if (x < -30 || x > WIDTH + 30) return;

        ctx.save();

        ctx.shadowColor = "#f06bbf";
        ctx.shadowBlur = 16;

        ctx.fillStyle = "#b95baf";
        ctx.beginPath();
        ctx.moveTo(x, hazard.y + hazard.height);
        ctx.lineTo(x + hazard.width / 2, hazard.y);
        ctx.lineTo(x + hazard.width, hazard.y + hazard.height);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#f4b5ec";
        ctx.fillRect(x + 9, hazard.y + 15, 6, 3);

        ctx.restore();
    });
}

// ------------------------------
// CHARACTER DRAWING
// ------------------------------

function drawCharacter(x, y, type, options = {}) {
    const {
        frame = 0,
        jumping = false,
        hugging = false,
        facing = 1,
        flash = false,
        alpha = 1
    } = options;

    ctx.save();
    ctx.globalAlpha = alpha;

    // Flip character according to direction
    ctx.translate(x + 20, y);
    ctx.scale(facing, 1);

    const isJiten = type === "jiten";
    const bob = jumping ? 0 : Math.sin(frame * 0.18) * 1.5;

    ctx.translate(-20, bob);

    // Shadow
    ctx.fillStyle = "#10091c77";
    ctx.beginPath();
    ctx.ellipse(20, 65, 19, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hair behind the head
    ctx.fillStyle = "#19131d";

    if (!isJiten) {
        ctx.beginPath();
        ctx.moveTo(6, 12);
        ctx.quadraticCurveTo(-4, 23, 2, 51);
        ctx.lineTo(10, 55);
        ctx.lineTo(13, 22);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(31, 12);
        ctx.quadraticCurveTo(44, 28, 36, 54);
        ctx.lineTo(29, 54);
        ctx.lineTo(28, 23);
        ctx.fill();
    }

    // Face
    ctx.fillStyle = isJiten ? "#d49a78" : "#92583e";

    ctx.beginPath();
    ctx.ellipse(20, 19, 14, 16, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hair cap
    ctx.fillStyle = "#19131d";

    ctx.beginPath();
    ctx.moveTo(6, 17);
    ctx.quadraticCurveTo(3, -3, 20, 2);
    ctx.quadraticCurveTo(39, -2, 35, 20);
    ctx.quadraticCurveTo(27, 8, 20, 13);
    ctx.quadraticCurveTo(13, 8, 6, 17);
    ctx.fill();

    // Jiten's fringe
    if (isJiten) {
        ctx.beginPath();
        ctx.moveTo(7, 12);
        ctx.quadraticCurveTo(12, 3, 19, 9);
        ctx.quadraticCurveTo(26, 2, 34, 12);
        ctx.lineTo(31, 19);
        ctx.quadraticCurveTo(20, 13, 9, 19);
        ctx.fill();
    } else {
        // Sandhiya's long hair and side part
        ctx.beginPath();
        ctx.moveTo(8, 13);
        ctx.quadraticCurveTo(13, 5, 24, 10);
        ctx.quadraticCurveTo(32, 8, 34, 16);
        ctx.lineTo(29, 22);
        ctx.quadraticCurveTo(20, 14, 10, 19);
        ctx.fill();
    }

    // Eyes
    ctx.fillStyle = "#211622";
    ctx.beginPath();
    ctx.ellipse(15, 20, 1.8, 2.5, 0, 0, Math.PI * 2);
    ctx.ellipse(25, 20, 1.8, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Smile
    ctx.strokeStyle = "#633b37";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(20, 26, 4, 0.15, Math.PI - 0.15);
    ctx.stroke();

    // Neck
    ctx.fillStyle = isJiten ? "#d49a78" : "#92583e";
    ctx.fillRect(16, 31, 8, 7);

    // Body
    if (isJiten) {
        // Brown hoodie
        ctx.fillStyle = "#70432f";
        ctx.beginPath();
        ctx.roundRect(5, 35, 30, 27, 8);
        ctx.fill();

        // Hoodie front
        ctx.fillStyle = "#89583e";
        ctx.beginPath();
        ctx.moveTo(13, 36);
        ctx.lineTo(20, 46);
        ctx.lineTo(27, 36);
        ctx.fill();

        // Hoodie strings
        ctx.strokeStyle = "#d6b48c";
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(16, 40);
        ctx.lineTo(15, 49);
        ctx.moveTo(24, 40);
        ctx.lineTo(25, 49);
        ctx.stroke();

        // Hoodie pocket
        ctx.strokeStyle = "#a67555";
        ctx.strokeRect(11, 51, 18, 7);
    } else {
        // Maroon blouse
        ctx.fillStyle = "#713347";
        ctx.beginPath();
        ctx.roundRect(7, 35, 26, 19, 5);
        ctx.fill();

        // White saree
        ctx.fillStyle = "#fff0d8";
        ctx.beginPath();
        ctx.moveTo(8, 43);
        ctx.lineTo(32, 43);
        ctx.lineTo(38, 64);
        ctx.lineTo(2, 64);
        ctx.closePath();
        ctx.fill();

        // Golden saree border
        ctx.strokeStyle = "#c99d4e";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(8, 42);
        ctx.lineTo(34, 61);
        ctx.stroke();

        // Gold blouse detail
        ctx.strokeStyle = "#d6a956";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(8, 39);
        ctx.lineTo(32, 39);
        ctx.stroke();

        // Necklace
        ctx.strokeStyle = "#e3c27a";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(20, 36, 7, 0.1, Math.PI - 0.1);
        ctx.stroke();

        // Earrings
        ctx.fillStyle = "#e6c47c";
        ctx.beginPath();
        ctx.arc(6, 23, 2, 0, Math.PI * 2);
        ctx.arc(34, 23, 2, 0, Math.PI * 2);
        ctx.fill();
    }

    // Arms
    ctx.strokeStyle = isJiten ? "#70432f" : "#92583e";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";

    const armSwing = hugging ? 0 : Math.sin(frame * 0.2) * 5;

    ctx.beginPath();

    if (hugging) {
        ctx.moveTo(7, 40);
        ctx.quadraticCurveTo(-2, 31, -8, 37);
        ctx.moveTo(32, 40);
        ctx.quadraticCurveTo(42, 31, 48, 37);
    } else {
        ctx.moveTo(8, 41);
        ctx.lineTo(3 + armSwing, 51);
        ctx.moveTo(32, 41);
        ctx.lineTo(37 - armSwing, 51);
    }

    ctx.stroke();

    // Legs
    ctx.strokeStyle = "#29223b";
    ctx.lineWidth = 7;

    const legSwing = jumping ? 0 : Math.sin(frame * 0.2) * 4;

    ctx.beginPath();
    ctx.moveTo(13, 61);
    ctx.lineTo(11 + legSwing, 67);
    ctx.moveTo(27, 61);
    ctx.lineTo(29 - legSwing, 67);
    ctx.stroke();

    // Shoes
    ctx.fillStyle = "#30233b";
    ctx.beginPath();
    ctx.ellipse(10 + legSwing, 67, 6, 3, 0, 0, Math.PI * 2);
    ctx.ellipse(30 - legSwing, 67, 6, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    if (flash) {
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, 40, 68);
    }

    ctx.restore();
}

// ------------------------------
// CHARACTER NAME LABELS
// ------------------------------

function drawNameLabel(x, y, name, color) {
    ctx.save();

    ctx.font = "bold 11px 'DM Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "#130b24";
    ctx.fillText(name, x + 1, y - 9 + 1);

    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 9;
    ctx.fillText(name, x, y - 9);

    ctx.restore();
}

// ------------------------------
// PARTICLES AND FLOATING TEXT
// ------------------------------

function createParticles(x, y, count, color) {
    for (let i = 0; i < count; i++) {
        particles.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 5,
            vy: (Math.random() - 0.5) * 5 - 2,
            life: 35 + Math.random() * 20,
            color,
            size: 2 + Math.random() * 4
        });
    }
}

function addFloatingText(x, y, text, color = "#ffe6a0") {
    floatingTexts.push({
        x,
        y,
        text,
        color,
        life: 50
    });
}

function updateEffects() {
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08;
        p.life--;
    });

    particles = particles.filter(p => p.life > 0);

    floatingTexts.forEach(t => {
        t.y -= 0.7;
        t.life--;
    });

    floatingTexts = floatingTexts.filter(t => t.life > 0);
}

function drawEffects() {
    particles.forEach(p => {
        ctx.globalAlpha = Math.max(0, p.life / 50);
        ctx.fillStyle = p.color;

        ctx.beginPath();
        ctx.arc(p.x - cameraX, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });

    floatingTexts.forEach(t => {
        ctx.globalAlpha = Math.min(1, t.life / 25);
        ctx.fillStyle = t.color;
        ctx.font = "bold 17px 'DM Sans', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(t.text, t.x - cameraX, t.y);
    });

    ctx.globalAlpha = 1;
}

// ------------------------------
// STAR COLLECTION
// ------------------------------

function collectStars() {
    stars.forEach(star => {
        if (star.collected) return;

        const dx = player.x + player.width / 2 - star.x;
        const dy = player.y + player.height / 2 - star.y;

        if (Math.hypot(dx, dy) < 28) {
            star.collected = true;
            score += 10;

            updateHUD();

            createParticles(star.x, star.y, 12, "#ffdc73");
            addFloatingText(star.x, star.y - 15, "+10 ⭐");

            message.textContent = score >= TARGET_SCORE
                ? "100 stars collected! Jiten is waiting ahead! ❤️"
                : "Beautiful! Keep collecting stars! ✨";

            if (score >= TARGET_SCORE && !finishMode) {
                activateFinish();
            }
        }
    });
}

// ------------------------------
// DAMAGE AND HEARTS
// ------------------------------

function takeDamage() {
    if (player.invulnerable > 0 || finished || gameOver) return;

    lives--;
    updateHUD();

    player.invulnerable = 115;
    player.damageFlash = 30;
    player.vy = -6;

    createParticles(
        player.x + 18,
        player.y + 25,
        18,
        "#ff8db5"
    );

    addFloatingText(
        player.x + 20,
        player.y - 5,
        "-1 HEART",
        "#ff9fba"
    );

    if (lives <= 0) {
        endGame();
    } else {
        message.textContent = "Careful! You lost a heart. ❤️";
    }
}

function endGame() {
    gameOver = true;
    running = false;
    input.left = false;
    input.right = false;

    screens.over.classList.remove("hidden");
}

// ------------------------------
// PLAYER PHYSICS
// ------------------------------

function updatePlayer(delta) {
    const oldBottom = player.y + player.height;

    if (input.left) {
        player.vx = -MOVE_SPEED;
        player.facing = -1;
    } else if (input.right) {
        player.vx = MOVE_SPEED;
        player.facing = 1;
    } else {
        player.vx = 0;
    }

    player.x += player.vx * delta;

    player.vy += GRAVITY * delta;
    player.y += player.vy * delta;

    player.grounded = false;

    platforms.forEach(platform => {
        const overlaps =
            player.x + player.width > platform.x &&
            player.x < platform.x + platform.width;

        const newBottom = player.y + player.height;

        if (
            overlaps &&
            player.vy >= 0 &&
            oldBottom <= platform.y + 8 &&
            newBottom >= platform.y
        ) {
            player.y = platform.y - player.height;
            player.vy = 0;
            player.grounded = true;
        }
    });

    if (player.vx !== 0 && player.grounded) {
        player.runFrame += delta * 1.8;
    }

    if (player.invulnerable > 0) {
        player.invulnerable -= delta;
    }

    if (player.damageFlash > 0) {
        player.damageFlash -= delta;
    }

    // Collectibles
    collectStars();

    // Obstacles
    hazards.forEach(hazard => {
        if (!hazard.active) return;

        const hit =
            player.x + player.width > hazard.x &&
            player.x < hazard.x + hazard.width &&
            player.y + player.height > hazard.y &&
            player.y < hazard.y + hazard.height;

        if (hit) {
            hazard.active = false;
            takeDamage();
        }
    });

    // Falling off the level
    if (player.y > HEIGHT + 80) {
        takeDamage();

        if (!gameOver) {
            player.x = Math.max(checkpointX, player.x - 150);
            player.y = 280;
            player.vy = 0;
        }
    }

    // Keep a safe checkpoint as the player moves.
    if (player.grounded && player.x > checkpointX + 250) {
        checkpointX = player.x - 100;
    }

    // Camera follows the player.
    cameraX = Math.max(0, player.x - 300);

    // Remove expired old effects.
    updateEffects();

    // Finish journey.
    if (finishMode && jitenX !== null) {
        if (player.x >= jitenX - 90) {
            beginHug();
        }
    }
}

// ------------------------------
// JITEN APPEARS AT 100 POINTS
// ------------------------------

function activateFinish() {
    finishMode = true;

    // Place Jiten ahead of Sandhiya.
    jitenX = player.x + 950;

    // Ensure platforms exist up to his position.
    while (nextWorldX < jitenX + 500) {
        generatePlatform();
    }

    message.textContent = "Look ahead... someone is waiting for you. ❤️";

    createParticles(
        player.x + 20,
        player.y + 10,
        30,
        "#ffe2a2"
    );
}

function drawJiten() {
    if (!finishMode || jitenX === null) return;

    const screenX = jitenX - cameraX;

    if (screenX < -100 || screenX > WIDTH + 100) return;

    const ground = findGroundAt(jitenX);

    const y = ground - 65;

    // Glowing platform marker
    ctx.save();
    ctx.shadowColor = "#e6b7ff";
    ctx.shadowBlur = 25;
    ctx.fillStyle = "#d4a8f5";
    ctx.beginPath();
    ctx.ellipse(screenX + 20, ground - 3, 30, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    drawCharacter(screenX, y, "jiten", {
        frame: gameTime,
        facing: -1
    });

    drawNameLabel(screenX + 20, y, "JITEN", "#f3d18e");

    ctx.fillStyle = "#f6dcae";
    ctx.font = "italic 15px Georgia";
    ctx.textAlign = "center";
    ctx.fillText("I'm waiting for you ❤️", screenX + 20, y - 28);
}

function findGroundAt(x) {
    const platform = platforms.find(p =>
        x >= p.x && x <= p.x + p.width
    );

    return platform ? platform.y : 460;
}

// ------------------------------
// FINISH BANNER
// ------------------------------

function drawFinishBanner() {
    if (!finishMode || jitenX === null) return;

    const x = jitenX - cameraX - 160;

    ctx.fillStyle = "#b58bdb";
    ctx.fillRect(x, 320, 5, 140);

    ctx.fillStyle = "#67417e";
    ctx.fillRect(x + 5, 325, 115, 48);

    ctx.fillStyle = "#ffe2a7";
    ctx.font = "bold 13px 'DM Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("THE REUNION", x + 62, 354);
}

// ------------------------------
// HUG SEQUENCE
// ------------------------------

function beginHug() {
    if (finished) return;

    finished = true;
    running = false;
    input.left = false;
    input.right = false;

    message.textContent = "And finally... together. ❤️";

    const startX = player.x;
    const startY = player.y;
    const hugDuration = 2800;
    const startTime = performance.now();

    function animateHug(now) {
        const progress = Math.min(
            (now - startTime) / hugDuration,
            1
        );

        hugProgress = progress;

        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        drawBackground();
        drawPlatforms();

        const center = WIDTH / 2;
        const separation = 85 * (1 - progress);

        const girlX = center - separation / 2 - 20;
        const boyX = center + separation / 2 - 20;

        const y = 370 - Math.sin(progress * Math.PI) * 10;

        drawCharacter(girlX, y, "sandhiya", {
            frame: gameTime,
            facing: 1,
            hugging: progress > 0.72
        });

        drawCharacter(boyX, y, "jiten", {
            frame: gameTime,
            facing: -1,
            hugging: progress > 0.72
        });

        drawNameLabel(girlX + 20, y, "SANDHIYA", "#f5d9ff");
        drawNameLabel(boyX + 20, y, "JITEN", "#f3d18e");

        if (progress > 0.35) {
            for (let i = 0; i < 8; i++) {
                const angle = gameTime * 0.002 + i * Math.PI / 4;
                const x = center + Math.cos(angle) * 90;
                const py = y - 35 + Math.sin(angle) * 55;

                ctx.fillStyle = i % 2 === 0 ? "#ff9ec9" : "#ffe4a1";
                ctx.font = "23px Georgia";
                ctx.fillText("♥", x, py);
            }
        }

        if (progress > 0.72) {
            ctx.fillStyle = "#ffe5b5";
            ctx.textAlign = "center";
            ctx.font = "italic 30px 'Playfair Display', Georgia";
            ctx.fillText("At last, together.", center, 260);
        }

        if (progress < 1) {
            requestAnimationFrame(animateHug);
        } else {
            screens.ending.classList.remove("hidden");
        }
    }

    requestAnimationFrame(animateHug);
}

// ------------------------------
// DRAW PLAYER
// ------------------------------

function drawPlayer() {
    const screenX = player.x - cameraX;

    // Flash while taking damage.
    const flash = player.damageFlash > 0 &&
        Math.floor(player.damageFlash / 4) % 2 === 0;

    const visible = player.invulnerable <= 0 ||
        Math.floor(player.invulnerable / 6) % 2 === 0;

    if (!visible) return;

    drawCharacter(screenX, player.y, "sandhiya", {
        frame: player.runFrame,
        jumping: !player.grounded,
        facing: player.facing,
        flash
    });

    drawNameLabel(
        screenX + 20,
        player.y,
        "SANDHIYA",
        "#f3d9ff"
    );
}

// ------------------------------
// GAME RENDERING
// ------------------------------

function drawGame() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    drawBackground();
    drawPlatforms();
    drawStars();
    drawHazards();
    drawFinishBanner();
    drawJiten();
    drawPlayer();
    drawEffects();
}

// ------------------------------
// MAIN GAME LOOP
// ------------------------------

function gameLoop(now) {
    if (!running || paused || gameOver || finished) return;

    let delta = (now - lastTime) / 16.67;
    delta = Math.min(delta, 2);

    lastTime = now;
    gameTime += delta * 16.67;

    maintainWorld();
    updatePlayer(delta);
    drawGame();

    if (running && !paused && !gameOver && !finished) {
        animationId = requestAnimationFrame(gameLoop);
    }
}
document.getElementById("back-btn").addEventListener("click", () => {
    window.location.href = "../index.html#universeHub";
});