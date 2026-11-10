
function enterUniverse() {
    document.querySelector(".landing").style.display = "none";

    const birthdayScreen = document.getElementById("birthdayScreen");
    birthdayScreen.style.display = "flex";

    window.scrollTo(0, 0);
}


function celebrate() {
    const message = document.getElementById("birthdayMessage");
    const hint = document.getElementById("cakeHint");

    message.style.display = "block";

    message.innerHTML = `
         I hope this new chapter of your life brings you endless happiness, beautiful memories, countless reasons to smile, and everything your heart has ever wished for

I hope you never stop chasing your dreams, never lose that beautiful smile, and never forget how special you are to me You deserve all the love, peace and happiness this universe has to offer

And whenever life feels a little dark, I hope you remember that somewhere in this endless universe, there's a Sun that will always shine for its Moon.

Happy Birthday, my favourite person May your world always be filled with love and everything you deserve and i promise to give you all and beautiful little moments. ❤️
        I Love You My Sandhiya
    `;

    hint.style.display = "none";
    document.getElementById("continueBtn").classList.add("show");

    launchConfetti();

    document.querySelector(".cake-container").onclick = null;
}


function launchConfetti() {
    const colors = ["#ffd889", "#e9c8ff", "#ff9ecb", "#ffffff"];

    for (let i = 0; i < 80; i++) {
        const particle = document.createElement("div");

        particle.style.position = "fixed";
        particle.style.left = Math.random() * 100 + "vw";
        particle.style.top = "-10px";
        particle.style.width = "7px";
        particle.style.height = "7px";
        particle.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        particle.style.borderRadius = "50%";
        particle.style.pointerEvents = "none";
        particle.style.zIndex = "1000";

        document.body.appendChild(particle);

        const duration = 2000 + Math.random() * 2000;

        particle.animate([
            { transform: "translateY(0) rotate(0deg)", opacity: 1 },
            { transform: "translateY(110vh) rotate(720deg)", opacity: 0 }
        ], {
            duration: duration,
            easing: "ease-out"
        });

        setTimeout(() => particle.remove(), duration);
    }
}


// Show the final screen
function showFinalScreen() {
    document.getElementById("birthdayScreen").style.display = "none";

    const finalScreen = document.getElementById("finalScreen");
    finalScreen.style.display = "flex";

    window.scrollTo(0, 0);
}


// Temporary navigation for testing

function showUniverse() {
    const landing = document.querySelector(".landing");
    const birthdayScreen = document.getElementById("birthdayScreen");
    const finalScreen = document.getElementById("finalScreen");
    const universeHub = document.getElementById("universeHub");

    if (landing) landing.style.display = "none";
    if (birthdayScreen) birthdayScreen.style.display = "none";
    if (finalScreen) finalScreen.style.display = "none";

    universeHub.style.display = "flex";

    document.body.style.overflowY = "auto";
    window.scrollTo(0, 0);
}

const destinations = {

    story: {
        number: "01 / OUR STORY",
        title: "Choose Our",
        subtitle: "Love Story",
        description: "Every choice leads to a different little moment. Explore the story of two people who found their way into each other's universe.",
        name: "Begin Our Story"
    },

    treasure: {
        number: "02 / THE MYSTERY",
        title: "The Birthday",
        subtitle: "Treasure Hunt",
        description: "Somewhere in this universe, a secret is waiting. Follow the clues, solve the mysteries and discover what I've hidden for you.",
        name: "Find the Treasure"
    },

    game: {
        number: "03 / A LITTLE ADVENTURE",
        title: "A Tiny Game",
        subtitle: "Made for You",
        description: "A little adventure created especially for you. Collect, explore and unlock something special.",
        name: "Let's Play"
    },

    sky: {
        number: "04 / THE CONSTELLATIONS",
        title: "A Sky Full",
        subtitle: "of Reasons",
        description: "Look up at the stars. Every little light holds a reason why you mean so much to me.",
        name: "Explore the Stars"
    },

    moon: {
        number: "05 / MY MOON",
        title: "Every Moon",
        subtitle: "Reminds Me of You",
        description: "Different phases, countless nights, and one person who always comes to mind whenever I look at the Moon.",
        name: "Visit the Moon"
    },

    distance: {
        number: "06 / TWO WORLDS",
        title: "The Distance",
        subtitle: "Between Us",
        description: "Two different places, two separate worlds, but one connection that distance could never measure.",
        name: "Discover Our Distance"
    },

    together: {
        number: "07 / IMAGINE",
        title: "If I Were",
        subtitle: "With You Right Now",
        description: "Imagine all the little moments we could share. Choose a moment and let me show you what I'd do if I were beside you.",
        name: "Imagine With Me"
    },

    sunmoon: {
        number: "08 / THE TWO OF US",
        title: "The Sun",
        subtitle: "and The Moon",
        description: "I am your Sun. You are my Moon. Two different lights, belonging to the same universe. This little world is inspired by our special gifts.",
        name: "Discover Our Story"
    },

    letters: {
        number: "09 / SOMETHING FOR YOU",
        title: "Open",
        subtitle: "When...",
        description: "A few letters from me, waiting for different moments. Open one whenever you need a little reminder of how special you are.",
        name: "Open Your Letters"
    }

};


let selectedDestination = null;


function selectDestination(id) {

    const destination = destinations[id];

    if (!destination) return;

    selectedDestination = id;

    document.querySelectorAll(".star-point").forEach(star => {
        star.classList.remove("active");
    });
        
    const selectedStar = document.querySelector(
        `.star-point[onclick="selectDestination('${id}')"]`
    );

    if (selectedStar) {
        selectedStar.classList.add("active");
    }

    document.getElementById("panelNumber").textContent =
        destination.number;

    document.getElementById("panelTitle").innerHTML =
        `${destination.title}<span>${destination.subtitle}</span>`;

    document.getElementById("panelDescription").textContent =
        destination.description;

    const enterButton = document.getElementById("panelEnter");

    enterButton.disabled = false;

    enterButton.innerHTML =
        `${destination.name} <span>→</span>`;

    const panel = document.getElementById("destinationPanel");

    panel.classList.remove("panel-update");

    void panel.offsetWidth;

    panel.classList.add("panel-update");

}


function closeDestination() {

    selectedDestination = null;

    document.querySelectorAll(".star-point").forEach(star => {
        star.classList.remove("active");
    });

    document.getElementById("panelNumber").textContent =
        "THE CELESTIAL ATLAS";

    document.getElementById("panelTitle").innerHTML =
        'Nine little worlds.<span>One universe.</span>';

    document.getElementById("panelDescription").textContent =
        "Every star has a story. Every destination holds something I made especially for you. Choose a constellation and let's begin.";

    const enterButton = document.getElementById("panelEnter");

    enterButton.disabled = true;

    enterButton.innerHTML =
        'Select a constellation <span>→</span>';

}

function enterDestination() {

    if (!selectedDestination) return;
    // OPEN THE OPEN WHEN EXPERIENCE
if (selectedDestination === "letters") {
    window.location.href = "open/open.html";
    return;
}
    if (selectedDestination === "sunmoon") {
    window.location.href = "us/us.html";
    return;
}
        // OPEN THE IMAGINE EXPERIENCE
    if (selectedDestination === "together") {
        window.location.href = "imagine/imagine.html";
        return;
    }

    if (selectedDestination === "story") {


        document.getElementById("universeHub").style.display = "none";

        document.getElementById("multiverseIntro").style.display = "block";

        window.scrollTo(0, 0);
        return;
    }

    if (selectedDestination === "treasure") {
    startTreasureHunt();
    return;
}
if (selectedDestination === "game") {
    window.location.href = "game/game.html";
    return;
}
if (selectedDestination === "sky") {
    startStarExplorer();
    return;
}
if (selectedDestination === "moon") {
    window.location.href = "moon/moon.html";
    return;
}
if (selectedDestination === "earth") {
    window.location.href = "earth/earth.html";
    return;
}
if (selectedDestination === "distance") {
    window.location.href = "earth/earth.html";
    return;
}
    const destination = destinations[selectedDestination];

    alert(destination.name + " — Our next adventure begins here!");
}
// ========================================
// THE LAST TRAIN HOME — STORY ENGINE
// ========================================

let storyHistory = [];
let storyChoices = {};

const storyScenes = {

    platform: {
        number: 1,
        label: "THE FIRST ENCOUNTER",
        title: "The Empty Platform",
        location: "PLATFORM 04 · 11:47 PM",

        image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1600&q=85",

        narrative: `The rain hadn't stopped for almost an hour.

Sandhiya sat on a metal bench, staring at the train schedule above the platform.

DELAYED — EXPECTED ARRIVAL: 12:30 AM.

"Perfect," she whispered.

She checked her phone. 8% battery.

A boy carrying a backpack approached the bench. He looked at the empty space beside her, then at the rain.

He seemed to be deciding whether to ask.`,

        dialogue: `"Is this seat taken?

I promise I'm not planning to steal it."`,

        choices: [
            {
                text: "A. \"It's a public bench.\" She looks back at her phone.",
                next: "cold",
                flag: "distant"
            },
            {
                text: "B. \"Depends. Are you always this annoying?\"",
                next: "playful",
                flag: "playful"
            },
            {
                text: "C. She moves her bag. \"No, go ahead.\"",
                next: "polite",
                flag: "kind"
            },
            {
                text: "D. \"Why? Is the rest of the station haunted?\"",
                next: "curious",
                flag: "funny"
            }
        ]
    },

    cold: {
        number: 2,
        label: "A DIFFICULT BEGINNING",
        title: "The Unfriendly Stranger",
        location: "PLATFORM 04 · 11:53 PM",

        image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1600&q=85",

        narrative: `Jiten sat down, leaving a considerable amount of space between them.

He took out his phone, checked the battery, and sighed.

For several minutes, neither spoke.

Then the station lights flickered.

Jiten looked at her phone.

"Eight percent? That's a dangerous situation."

He smiled slightly.`,

        dialogue: `"Don't worry. I won't talk to you if you don't want me to."`,

        choices: [
            {
                text: "A. \"Good. We understand each other.\"",
                next: "train",
                flag: "distant"
            },
            {
                text: "B. \"You talk a lot for someone who promised not to.\"",
                next: "train",
                flag: "playful"
            }
        ]
    },

    playful: {
        number: 2,
        label: "A LITTLE SPARK",
        title: "Not a Bad First Impression",
        location: "PLATFORM 04 · 11:53 PM",

        image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1600&q=85",

        narrative: `Jiten laughed.

Not a polite laugh. An actual one.

"Only when someone gives me a good opening."

He sat down and placed his backpack beside him.

For a moment, the two strangers looked at the rain falling beyond the platform.`,

        dialogue: `"I'm Jiten, by the way. Since we're apparently sharing this extremely luxurious bench."`,

        choices: [
            {
                text: "A. \"Sandhiya. And don't get too comfortable.\"",
                next: "train",
                flag: "playful"
            },
            {
                text: "B. \"Nice to meet you, I guess.\"",
                next: "train",
                flag: "kind"
            }
        ]
    },

    polite: {
        number: 2,
        label: "A QUIET BEGINNING",
        title: "A Seat Beside a Stranger",
        location: "PLATFORM 04 · 11:53 PM",

        image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1600&q=85",

        narrative: `Jiten thanked her and sat down.

He noticed the rainwater dripping from her umbrella.

"Long journey?"

Sandhiya nodded.

He smiled.

"Same here. Looks like we're both going to be here for a while."`,

        dialogue: `"I'm Jiten, by the way."`,

        choices: [
            {
                text: "A. \"I'm Sandhiya.\"",
                next: "train",
                flag: "kind"
            },
            {
                text: "B. She simply nods and smiles.",
                next: "train",
                flag: "quiet"
            }
        ]
    },

    curious: {
        number: 2,
        label: "THE FIRST LAUGH",
        title: "The Haunted Station",
        location: "PLATFORM 04 · 11:53 PM",

        image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1600&q=85",

        narrative: `Jiten looked around dramatically.

"Honestly? I've been wondering the same thing."

He pointed towards a flickering light at the end of the platform.

"If something appears from there, I'm leaving you behind."

Sandhiya laughed before she could stop herself.`,

        dialogue: `"I'm Jiten, by the way. Your temporary survival partner."`,

        choices: [
            {
                text: "A. \"Sandhiya. And I'm not saving you.\"",
                next: "train",
                flag: "funny"
            },
            {
                text: "B. \"Nice to meet you, survival partner.\"",
                next: "train",
                flag: "kind"
            }
        ]
    },

    train: {
        number: 3,
        label: "THE JOURNEY BEGINS",
        title: "The Delayed Train",
        location: "PLATFORM 04 · 12:28 AM",

        image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1600&q=85",

        narrative: `A distant horn interrupted their conversation.

The train was finally arriving.

Its headlights appeared through the rain, growing brighter with every passing second.

Jiten stood up and picked up his backpack.

He glanced at Sandhiya's ticket.

"Wait. You're going to the same destination?"

For the first time that night, they looked genuinely surprised.`,

        dialogue: `"Looks like our journeys aren't so different after all."`,

        choices: [
            {
                text: "A. \"Apparently. What a coincidence.\"",
                next: "journey",
                flag: "quiet"
            },
            {
                text: "B. \"Don't tell me you're sitting next to me again.\"",
                next: "journey",
                flag: "playful"
            }
        ]
    },

    journey: {
        number: 4,
        label: "SOMEWHERE BETWEEN STATIONS",
        title: "Two Tickets, One Journey",
        location: "TRAIN COACH · 12:45 AM",

        image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1600&q=85",

        narrative: `The train slowly moved away from the station.

Rain streaked across the windows. The lights inside the coach were dim.

By some strange coincidence, their seats were next to each other.

Jiten placed his backpack above the seat.

He noticed Sandhiya looking outside.

"So, Sandhiya. Tell me something."

He paused, thinking.`,

        dialogue: `"If you could be anywhere in the world right now, where would you go?"`,

        choices: [
            {
                text: "A. \"Somewhere near the ocean.\"",
                next: "ocean",
                flag: "dreamer"
            },
            {
                text: "B. \"Somewhere with people I actually like.\"",
                next: "people",
                flag: "warm"
            },
            {
                text: "C. \"Honestly? My bed.\"",
                next: "bed",
                flag: "funny"
            }
        ]
    },

    ocean: {
        number: 5,
        label: "A SHARED DREAM",
        title: "The Sound of Waves",
        location: "TRAIN COACH · 01:20 AM",

        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85",

        narrative: `Jiten smiled.

"The ocean? That's a good choice."

He told her how he once wanted to watch the sunrise beside the sea, with absolutely no plans for the rest of the day.

For a little while, they imagined a place neither had visited.

The train rocked gently as the night continued.`,

        dialogue: `"Maybe someday you'll get that ocean sunrise."`,

        choices: [
            {
                text: "A. \"Maybe. Some dreams take time.\"",
                next: "stop",
                flag: "dreamer"
            },
            {
                text: "B. \"Only if the company is good.\"",
                next: "stop",
                flag: "romantic"
            }
        ]
    },

    people: {
        number: 5,
        label: "AN UNEXPECTED CONNECTION",
        title: "The Right Company",
        location: "TRAIN COACH · 01:20 AM",

        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85",

        narrative: `Jiten looked at her and laughed softly.

"That's actually a pretty good answer."

They started talking about the people who mattered to them, the little things that made them happy, and the things they rarely told strangers.

Somehow, the conversation became easier.

The silence no longer felt awkward.`,

        dialogue: `"I think the people make the place, don't you?"`,

        choices: [
            {
                text: "A. \"Definitely. The right people change everything.\"",
                next: "stop",
                flag: "romantic"
            },
            {
                text: "B. \"Sometimes being alone is better.\"",
                next: "stop",
                flag: "independent"
            }
        ]
    },

    bed: {
        number: 5,
        label: "A MOMENT OF LAUGHTER",
        title: "The Honest Answer",
        location: "TRAIN COACH · 01:20 AM",

        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85",

        narrative: `Jiten burst out laughing.

"Finally! Someone with realistic ambitions."

He admitted that he had almost missed his train because he had been too comfortable at home.

They laughed, trying not to disturb the sleeping passengers.

For the first time, Sandhiya forgot to check her phone.`,

        dialogue: `"I have a feeling you're much funnier than you look."`,

        choices: [
            {
                text: "A. \"And I have a feeling you're very annoying.\"",
                next: "stop",
                flag: "playful"
            },
            {
                text: "B. \"You haven't seen anything yet.\"",
                next: "stop",
                flag: "funny"
            }
        ]
    },

    stop: {
        number: 6,
        label: "THE UNEXPECTED STOP",
        title: "A Town Without a Name",
        location: "UNKNOWN STATION · 02:10 AM",

        image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1600&q=85",

        narrative: `The train suddenly slowed down.

A voice announced an unexpected stop due to a technical issue.

Passengers began looking out of the windows.

Jiten checked his phone.

No signal.

Sandhiya looked at the small station outside. Its name was barely visible through the rain.

Jiten turned towards her.`,

        dialogue: `"Well, this is unexpected. Want to explore the platform, or should we stay here?"`,

        choices: [
            {
                text: "A. \"Let's get off. We have time.\"",
                next: "platformWalk",
                flag: "adventurous"
            },
            {
                text: "B. \"Let's stay. I don't trust this train anymore.\"",
                next: "stay",
                flag: "careful"
            }
        ]
    },

    platformWalk: {
        number: 7,
        label: "A NIGHT TO REMEMBER",
        title: "Under the Station Lights",
        location: "UNKNOWN STATION · 02:25 AM",

        image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1600&q=85",

        narrative: `They stepped onto the quiet platform.

The rain had softened into a gentle drizzle.

There was a tiny tea stall at the far end. Jiten bought two cups of tea.

They stood beneath the station lights, talking about childhood memories, silly fears, and dreams they hadn't told anyone.

Sandhiya looked at the clock.

For some reason, she didn't want the night to end.`,

        dialogue: `"You know, I didn't expect tonight to be this interesting."`,

        choices: [
            {
                text: "A. \"Neither did I.\"",
                next: "sunrise",
                flag: "romantic"
            },
            {
                text: "B. \"Maybe you're just lucky you met me.\"",
                next: "sunrise",
                flag: "playful"
            }
        ]
    },

    stay: {
        number: 7,
        label: "A QUIET MOMENT",
        title: "The World Outside",
        location: "TRAIN COACH · 02:25 AM",

        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85",

        narrative: `They stayed inside the train.

The coach was almost silent now.

Jiten offered her the last biscuit from his bag.

She accepted.

Outside, the little station slowly disappeared behind the rain.

They continued talking, discovering that two people could feel strangely comfortable despite meeting only hours ago.`,

        dialogue: `"I'm glad I sat beside you tonight."`,

        choices: [
            {
                text: "A. \"I'm glad you did too.\"",
                next: "sunrise",
                flag: "romantic"
            },
            {
                text: "B. \"Don't make me regret letting you sit there.\"",
                next: "sunrise",
                flag: "playful"
            }
        ]
    },

    sunrise: {
        number: 8,
        label: "BEFORE THE GOODBYE",
        title: "The First Light",
        location: "TRAIN WINDOW · 05:12 AM",

        image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=85",

        narrative: `The sky slowly changed colour.

The first light of morning entered through the train window.

Their destination was getting closer.

Jiten looked at Sandhiya.

He had spent the entire night talking to someone who had been a complete stranger just hours ago.

He knew he might never get another chance to see her.

He took a breath.`,

        dialogue: `"Sandhiya, before we reach... can I ask you something?"`,

        choices: [
            {
                text: "A. \"Go ahead. I'm listening.\"",
                next: "ending",
                flag: "open"
            },
            {
                text: "B. \"You look unusually serious. Should I be worried?\"",
                next: "ending",
                flag: "playful"
            }
        ]
    },

    ending: {
        number: 8,
        label: "THE LAST GOODBYE",
        title: "One Last Question",
        location: "THE FINAL STATION · 06:00 AM",

        image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1600&q=85",

        narrative: `The train finally reached its destination.

People began collecting their bags.

Jiten stood beside Sandhiya, holding his backpack.

He looked at her for a moment before speaking.

"Last night was unexpected. But I think it was the best part of this journey."

He smiled.

"Would it be strange if I asked to see you again?"`,

        dialogue: `"I don't really want this to be the last time we meet."`,

        choices: [
            {
                text: "A. \"Give me your number. We'll see where this goes.\"",
                next: "endingTogether",
                flag: "together"
            },
            {
                text: "B. \"Some meetings are beautiful because they're unexpected.\"",
                next: "endingGoodbye",
                flag: "goodbye"
            },
            {
                text: "C. \"Only if you promise to take me for that ocean sunrise.\"",
                next: "endingSecret",
                flag: "secret"
            }
        ]
    },

    endingTogether: {
        number: "ENDING 01",
        label: "THE BEGINNING",
        title: "Not Just a Journey",
        location: "A NEW BEGINNING",

        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85",

        narrative: `Sandhiya smiled and handed him her phone.

Jiten saved his number.

Neither knew exactly what would happen next.

Maybe they would meet again. Maybe they would become something neither expected.

But as they walked away from the station, both looked back once.

And both were smiling.

Sometimes, the best stories begin with a stranger asking for a seat.`,

        dialogue: `"I'll text you when I get home."`,

        choices: [
            { text: "Return to the story", next: "restart" }
        ]
    },

    endingGoodbye: {
        number: "ENDING 02",
        label: "THE MISSED CONNECTION",
        title: "A Beautiful Goodbye",
        location: "THE FINAL STATION",

        image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1600&q=85",

        narrative: `Sandhiya smiled.

They said goodbye and walked in opposite directions.

There were no exchanged numbers. No promises.

Only a memory of a rainy night, a delayed train, and a stranger who made the journey feel shorter.

Some people enter our lives for a moment.

And sometimes, that moment stays with us for years.`,

        dialogue: `"Take care, Sandhiya."`,

        choices: [
            { text: "Return to the story", next: "restart" }
        ]
    },

    endingSecret: {
        number: "SECRET ENDING",
        label: "ONE MORE JOURNEY",
        title: "One More Station",
        location: "SOMEWHERE BY THE OCEAN",

        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85",

        narrative: `Jiten laughed.

"That's a promise."

He saved her number, and they made plans for the weekend.

A few weeks later, they stood together beside the ocean, watching the sunrise.

The same two strangers.

The same two people who had once shared a bench at an almost empty railway station.

Only this time, neither wanted the journey to end.`,

        dialogue: `"I think we should miss a few more trains together."`,

        choices: [
            { text: "Return to the story", next: "restart" }
        ]
    }
};

// ========================================
// UNIVERSE 02 — UNDER THE SAME RAIN
// ========================================

const rainScenes = {

    rain_cafe: {
        number: 1,
        label: "AN UNEXPECTED ENCOUNTER",
        title: "The Girl Outside the Café",
        location: "LITTLE CORNER CAFÉ · 06:18 PM",

        image: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=1600&q=85",

        narrative: `The rain had started without warning.

Sandhiya stood outside a little café, watching the streets disappear behind the falling water.

She checked her phone. No messages. No umbrella. And absolutely no intention of getting drenched.

A few steps away, a boy stood beneath the café's awning, holding a dark umbrella.

He noticed her looking at the rain.

Then he glanced at her, smiled, and walked closer.

He stopped at a comfortable distance.`,

        dialogue: `"You know, I was planning to walk home alone. But the weather seems to have other plans."`,

        choices: [
            {
                text: 'A. "And how exactly is that my problem?"',
                next: "rain_tease",
                flag: "teasing"
            },
            {
                text: 'B. "Are you offering to share that umbrella?"',
                next: "rain_umbrella",
                flag: "direct"
            },
                        
            {
                text: 'C. "I\'m perfectly fine waiting here."',
                next: "rain_wait",
                flag: "reserved"
                       }
        ]
    },

    rain_tease: {
        number: 2,
        label: "A LITTLE ATTITUDE",
        title: "A Rather Confident Stranger",
        location: "OUTSIDE THE CAFÉ · 06:21 PM",

        image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1600&q=85",

        narrative: `Jiten laughed.

"Fair enough. I suppose I should introduce myself before asking you to share my umbrella."

He tilted his head slightly.

"I'm Jiten."

He looked at the rain and then back at her.

"And I promise I'm much less annoying when it's sunny."`,

        dialogue: `"So, do I get to know the name of the person judging my umbrella-sharing skills?"`,

        choices: [
            {
                text: 'A. "Sandhiya. And your skills are still under review."',
                next: "rain_walk",
                flag: "playful"
            },
            {
                text: `B. "Maybe. First prove you're trustworthy."`,
                next: "rain_walk",
                flag: "cautious"
            }
        ]
    },

    rain_umbrella: {
        number: 2,
        label: "A SMALL GESTURE",
        title: "Room for Two",
        location: "OUTSIDE THE CAFÉ · 06:21 PM",

        image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1600&q=85",

        narrative: `Jiten opened the umbrella a little wider.

"That depends. Are you going somewhere nearby?"

He stepped aside, leaving enough room for her.

The rain continued falling against the pavement.

For a moment, neither of them moved.

Then he smiled.

"Well, we can't stand here until tomorrow."`,

        dialogue: `"I'm Jiten, by the way. Nice to meet you, stranger."`,

        choices: [
            {
                text: 'A. "Sandhiya. And thank you for the umbrella."',
                next: "rain_walk",
                flag: "kind"
            },
            {
               text: `B. "You really enjoy talking to strangers, don't you?"`,
               next: "rain_walk",
               flag: "teasing"
            }
        ]
    },

    rain_wait: {
        number: 2,
        label: "A QUIET BEGINNING",
        title: "The Long Wait",
        location: "CAFÉ AWNING · 06:25 PM",

        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=85",

        narrative: `Jiten nodded.

"That's fair."

He returned to his place beneath the awning.

A few minutes passed.

The rain grew heavier, and the café owner began bringing the outdoor chairs inside.

Jiten glanced at her.

"There's a small tea shop just around the corner. We could wait there instead of standing in the rain."`,

        dialogue: `"Unless you'd rather wait here. Your decision."`,

        choices: [
            {
                text: 'A. "Tea actually sounds nice."',
                next: "rain_cafe_talk",
                flag: "open"
            },
            {
                text: `B. "I think I'll take my chances with the rain."`,
                next: "rain_cafe_talk",
                flag: "independent"
            }
        ]
    },

    rain_walk: {
        number: 3,
        label: "UNDER ONE UMBRELLA",
        title: "A Shared Little World",
        location: "OLD CITY STREET · 06:35 PM",

        image: "https://images.unsplash.com/photo-1516496636080-14fb876e029d?auto=format&fit=crop&w=1600&q=85",

        narrative: `They began walking.

The umbrella was barely large enough for two people.

Every few steps, their shoulders brushed.

Jiten noticed that she was walking closer to the edge of the pavement.

He quietly shifted the umbrella towards her side.

A little of the rain fell on his own shoulder.

He didn't seem to mind.

The city around them glowed beneath the streetlights.`,

        dialogue: `"So, Sandhiya. Are you always this adventurous, or is today a special occasion?"`,

        choices: [
            {
                text: 'A. "Only when the company is interesting."',
                next: "rain_conversation",
                flag: "flirty"
            },
            {
                text: 'B. "I was just trying to get home, actually."',
                next: "rain_conversation",
                flag: "honest"
            },
            {
                text: 'C. "Why? Are you always this curious?"',
                next: "rain_conversation",
                flag: "playful"
            }
        ]
    },

    rain_cafe_talk: {
        number: 3,
        label: "A WARM LITTLE PAUSE",
        title: "Two Cups of Tea",
        location: "A SMALL TEA SHOP · 06:40 PM",

        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1600&q=85",

        narrative: `They found a tiny tea shop around the corner.

The place was warm, quiet, and smelled of freshly brewed tea.

Jiten ordered two cups.

They sat near the window, watching the rain.

For a while, they spoke about ordinary things: the weather, the city, and how unpredictable evenings could be.

It was strange how comfortable the conversation felt.`,

        dialogue: `"I have to admit, this is a much better evening than I expected."`,

        choices: [
            {
                text: `A. "Maybe the rain wasn't so bad after all."`,
                next: "rain_conversation",
                flag: "warm"
            },
            {
                text: `B. "Don't get too comfortable. It might stop raining."`,
                next: "rain_conversation",
                flag: "teasing"
            }
        ]
    },

    rain_conversation: {
        number: 4,
        label: "SOMEWHERE BETWEEN STRANGERS",
        title: "Things We Don't Tell Everyone",
        location: "THE CITY · 07:05 PM",

        image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1600&q=85",

        narrative: `The conversation slowly moved beyond the weather.

They talked about their favourite places, childhood memories, little dreams, and the things that made an ordinary day special.

Jiten listened more than he spoke.

At one point, he looked at her and smiled.

"It's funny. We were complete strangers half an hour ago."

The rain had begun to soften.

Neither seemed particularly eager for the evening to end.`,

        dialogue: `"Can I ask you something? What makes you feel at home, even when you're nowhere near home?"`,

        choices: [
            {
                text: 'A. "The people I`m comfortable being myself around."',
                next: "rain_question",
                flag: "emotional"
            },
            {
                text: 'B. "A quiet place, good food, and absolutely no responsibilities."',
                next: "rain_question",
                flag: "funny"
            },
            {
                text: `C. "I haven't really figured that out yet."`,
                next: "rain_question",
                flag: "thoughtful"
            }
        ]
    },

    rain_question: {
        number: 5,
        label: "THE MOMENT BEFORE GOODBYE",
        title: "When the Rain Slows Down",
        location: "CITY CROSSROADS · 07:30 PM",

        image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1600&q=85",

        narrative: `The rain finally stopped.

The streets were still wet, reflecting the golden lights of the city.

They reached a crossroads.

Sandhiya's way was to the left. Jiten's was to the right.

He stopped walking.

For a moment, he looked like he wanted to say something but couldn't quite find the words.

Then he smiled.`,

        dialogue: `"I know this might sound strange, but I don't really want this evening to end just yet."`,

        choices: [
            {
                text: `A. "Then maybe we don't have to say goodbye yet."`,
                next: "rain_together",
                flag: "together"
            },
            {
                text: 'B. "You know, you were actually pretty good company."',
                next: "rain_number",
                flag: "warm"
            },
            {
                text: `C. "Some evenings are nice because they're unexpected."`,
                next: "rain_goodbye",
                flag: "distant"
            }
        ]
    },

    rain_together: {
        number: 6,
        label: "ONE MORE MOMENT",
        title: "A Longer Walk",
        location: "THE QUIET STREETS · 07:42 PM",

        image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1600&q=85",

        narrative: `Jiten smiled.

"Then let's take the longer way."

They walked without worrying about where they were going.

The streets were quieter now.

They stopped at a small roadside stall and shared something sweet.

Neither had planned this evening.

Neither had expected to meet anyone.

But somehow, walking beside a stranger no longer felt strange.`,

        dialogue: `"I hope this isn't the last time I get to walk with you, Sandhiya."`,

        choices: [
            {
                text: 'A. "Then you should probably ask for my number."',
                next: "rain_ending_together",
                flag: "romantic"
            },
            {
                text: `B. "Maybe we'll let the universe decide."`,
                next: "rain_ending_secret",
                flag: "mysterious"
            }
        ]
    },

    rain_number: {
        number: 6,
        label: "A LITTLE COURAGE",
        title: "Before We Part",
        location: "CITY CROSSROADS · 07:35 PM",

        image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1600&q=85",

        narrative: `Jiten laughed.

"Pretty good? I'll take that as a compliment."

He reached for his phone.

"Would it be too forward if I asked for your number?"

He paused.

"Only if you're comfortable with it. No pressure."

For once, he seemed a little nervous.`,

        dialogue: `"I'd like to talk to you again."`,

        choices: [
            {
                text: 'A. "Alright. Give me your phone."',
                next: "rain_ending_together",
                flag: "together"
            },
            {
                text: 'B. "Maybe next time, if we happen to meet again."',
                next: "rain_goodbye",
                flag: "distant"
            }
        ]
    },

    rain_goodbye: {
        number: 6,
        label: "A BEAUTIFUL EVENING",
        title: "Until the Next Rain",
        location: "CITY CROSSROADS · 07:35 PM",

        image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1600&q=85",

        narrative: `Jiten nodded.

"You're right. Some evenings are special just because they happen."

They exchanged a smile.

Sandhiya walked towards her street.

Jiten watched for a moment before turning the other way.

The rain had stopped, but the memory of that evening stayed.

Two strangers had shared an umbrella.

And for a little while, the world had felt smaller.`,

        dialogue: `"Take care, Sandhiya. I'm glad our paths crossed."`,

        choices: [
            {
                text: "Read how this universe ends",
                next: "rain_ending_goodbye"
            }
        ]
    },

    rain_ending_together: {
        number: "ENDING 01",
        label: "A NEW BEGINNING",
        title: "More Than a Rainy Evening",
        location: "SOMEWHERE IN THE CITY",

        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85",

        narrative: `Sandhiya handed him her phone.

Jiten saved his number.

"Now I have a reason to hope it rains again," he joked.

She laughed.

They said goodbye, but this time it didn't feel like the end.

A few days later, they met again.

Then again.

The rain that had once brought two strangers under one umbrella had given them something neither had expected.

A beginning.`,

        dialogue: `"Next time, I'll bring a bigger umbrella. Just in case we need to walk a little longer."`,

        choices: [
            {
                text: "Return to this universe",
                next: "rain_restart"
            }
        ]
    },

    rain_ending_secret: {
        number: "ENDING 02",
        label: "A LITTLE MAGIC",
        title: "If the Universe Allows",
        location: "THE CITY · AFTER THE RAIN",

        image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1600&q=85",

        narrative: `Jiten smiled.

"Then I hope the universe is feeling generous."

They parted ways without exchanging numbers.

But the next time it rained, both found themselves looking towards the same little café.

Wondering whether the other person might be there.

Some beginnings don't happen all at once.

Sometimes, they wait for another rainy evening.`,

        dialogue: `"Maybe we'll meet again. Somewhere between the rain and the sunshine."`,

        choices: [
            {
                text: "Return to this universe",
                next: "rain_restart"
            }
        ]
    },

    rain_ending_goodbye: {
        number: "ENDING 03",
        label: "A MEMORY TO KEEP",
        title: "The Stranger in the Rain",
        location: "THE QUIET CITY",

        image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1600&q=85",

        narrative: `They went their separate ways.

There was no phone number.

No promise to meet again.

Only the memory of a stranger who had shared his umbrella, listened to her stories, and made an ordinary rainy evening feel extraordinary.

Perhaps that was enough.

At least for that universe.`,

        dialogue: `"Some people are only part of one evening. But that doesn't make the evening any less beautiful."`,

        choices: [
            {
                text: "Return to this universe",
                next: "rain_restart"
            }
        ]
    }

};


// START STORY
function startStory() {

    document.getElementById("multiverseIntro").style.display = "none";
    document.getElementById("universeChoices").style.display = "none";
    document.getElementById("storyScreen").style.display = "block";

    activeStory = "train";

    storyHistory = [];
    storyChoices = {};

    showStoryScene("platform");

    window.scrollTo(0, 0);
}
// DISPLAY SCENE
// DISPLAY SCENE

function showStoryScene(sceneId) {
    

    // Handle restarting either story
    
if (sceneId === "restart" || sceneId === "rain_restart") {
    if (activeStory === "rain") {
    startRainStory();
}
else if (activeStory === "city") {
    startCityStory();
}
else if (activeStory === "sunmoon") {
    startSunMoonStory();
}
else {
    startStory();
}
}

    // Select the correct story

    
let scene;

if (activeStory === "rain") {
    scene = rainScenes[sceneId];
}
else if (activeStory === "city") {
    scene = cityScenes[sceneId];
}
else if (activeStory === "sunmoon") {
    scene = sunMoonScenes[sceneId];
}
else {
    scene = storyScenes[sceneId];
}

    

    if (!scene) {
        console.error("Scene not found:", sceneId);
        return;
    }

    // Add scene to history
    if (
        storyHistory.length === 0 ||
        storyHistory[storyHistory.length - 1] !== sceneId
    ) {
        storyHistory.push(sceneId);
    }

    // Previous button
    const previousButton = document.getElementById("storyPrevious");

if (previousButton) {
    previousButton.style.display =
        storyHistory.length > 1 ? "inline-block" : "none";
}

    // Scene progress
    document.getElementById("storyProgress").textContent =
        typeof scene.number === "number"
            ? `SCENE ${String(scene.number).padStart(2, "0")} / 08`
            : scene.number;

    document.getElementById("storyLocation").textContent = scene.location;
    document.getElementById("storySceneLabel").textContent = scene.label;
    document.getElementById("storyTitle").textContent = scene.title;
    document.getElementById("storyNarrative").textContent = scene.narrative;
    document.getElementById("storyDialogue").textContent = scene.dialogue;

    document.getElementById("storyImage").style.backgroundImage =
        `linear-gradient(to top, rgba(4, 8, 17, 0.85), transparent 65%), url("${scene.image}")`;

    // Display choices
    const choiceContainer = document.getElementById("storyChoices");

    choiceContainer.innerHTML = "";

    document.getElementById("choiceHeading").textContent =
        sceneId.startsWith("ending") ||
sceneId.startsWith("rain_ending") ||
sceneId.startsWith("city_ending") ||
sceneId.startsWith("ending_")
            ? "YOUR JOURNEY"
            : "WHAT WILL SANDHIYA DO?";

    scene.choices.forEach((choice) => {

        const button = document.createElement("button");

        button.className = "story-choice";
        button.textContent = choice.text;

        button.onclick = () => {

            if (choice.flag) {
                storyChoices[sceneId] = choice.flag;
            }

            showStoryScene(choice.next);
        };

        choiceContainer.appendChild(button);

    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    // Save progress
    localStorage.setItem(
        activeStory === "rain" ? "rainStory" : "lastTrainStory",
        JSON.stringify({
            history: storyHistory,
            choices: storyChoices
        })
    );
}

const cityScenes = {

    city_arrival: {
        
        number: 1,
        location: "THE UNKNOWN CITY",
        label: "A STRANGE BEGINNING",
        title: "A City Without a Map",
        narrative: "The train doors opened. Jiten and Sandhiya stepped into a city neither of them had ever seen. The streets glowed beneath golden lights, music drifted through the air, and somehow, every sign pointed in a different direction.",
        dialogue: `Sandhiya: "Umm... Jiten? Where exactly are we?"
Jiten: "I was hoping you knew."
Sandhiya: "YOU brought me here!"
Jiten: "And yet, somehow, we're both lost."`,
        choices: [
            {
                text: `A. "Don't worry. Getting lost with you sounds fun."`,
                next: "city_street",
                flag: "romantic"
            },
            {
                text: `B. "Okay, let's find someone who knows this place."`,
                next: "city_stranger",
                flag: "practical"
            }
        ]
    },

    city_street: {
        number: 2,
        location: "THE LANTERN STREET",
        label: "FOLLOW THE LIGHTS",
        title: "Where the Roads Lead",
        narrative: "You walk beneath hundreds of floating lanterns. The street seems endless, but neither of you is in a hurry.",
        dialogue: `Sandhiya: "You know, this place is actually beautiful."
Jiten: "Not as beautiful as the person walking beside me."`,
        choices: [
            {
                text: `A. "I meant the city, idiot!"`,
                next: "city_market",
                flag: "teasing"
            },
            {
                text: `B. "Say that again. I want to hear it."`,
                next: "city_market",
                flag: "sweet"
            }
        ]
    },

    city_stranger: {
        number: 2,
        location: "THE OLD BOOKSHOP",
        label: "A MYSTERIOUS GUIDE",
        title: "The Stranger's Warning",
        narrative: "An old shopkeeper looks at the two of you and smiles. He hands you a small folded map, but there is something strange about it. It shows only one destination.",
        dialogue: `Shopkeeper: "This city gives everyone a different path. But two people who travel together must choose the same destination."`,
        choices: [
            {
                text: `A. "Let's trust him and follow the map."`,
                next: "city_market",
                flag: "trusting"
            },
            {
                text: `B. "This is suspicious. Let's explore ourselves."`,
                next: "city_market",
                flag: "curious"
            }
        ]
    },

    city_market: {
        number: 3,
        location: "THE MIDNIGHT MARKET",
        label: "LITTLE DISCOVERIES",
        title: "Two Tickets, One Wish",
        narrative: "You reach a beautiful night market. Among the glowing stalls, a tiny booth offers handwritten wishes. The seller gives you two blank cards.",
        dialogue: `Seller: "Write down one wish each. Don't show them to one another just yet."`,
        choices: [
            {
                text: "A. Write a wish about your future together.",
                next: "city_bridge",
                flag: "future"
            },
            {
                text: "B. Write a wish about making her happy today.",
                next: "city_bridge",
                flag: "present"
            }
        ]
    },

    city_bridge: {
        number: 4,
        location: "THE STARLIGHT BRIDGE",
        label: "A QUIET MOMENT",
        title: "Under a Thousand Stars",
        narrative: "The market fades behind you. Ahead is a bridge overlooking the entire city. You stop in the middle, watching the lights shimmer on the river.",
        dialogue: `Sandhiya: "If we could stay anywhere forever, would you choose this place?"
Jiten: "I'd choose anywhere, as long as you're there."`,
        choices: [
            {
                text: "A. Hold her hand and look at the city.",
                next: "city_lost",
                flag: "close"
            },
            {
                text: "B. Ask her what her dream place looks like.",
                next: "city_lost",
                flag: "dream"
            }
        ]
    },

    city_lost: {
        number: 5,
        location: "THE EMPTY CROSSROAD",
        label: "THE CITY CHANGES",
        title: "One Road, Two Choices",
        narrative: "Suddenly, the lights go out. When they return, the bridge is gone. Three unfamiliar roads stretch before you. The map has changed, too.",
        dialogue: `Sandhiya: "Jiten... I think we're actually lost now."
Jiten: "Then let's figure it out together."`,
        choices: [
            {
                text: "A. Take the road with the warm golden lights.",
                next: "city_rooftop",
                flag: "hope"
            },
            {
                text: "B. Take the road with the music.",
                next: "city_rooftop",
                flag: "adventure"
            }
        ]
    },

    city_rooftop: {
        number: 6,
        location: "THE HIGHEST ROOFTOP",
        label: "THE CITY BELOW",
        title: "A View Worth Remembering",
        narrative: "You finally reach the highest rooftop in the city. From here, every road, every lantern, and every little corner is visible. The city doesn't feel strange anymore.",
        dialogue: `Sandhiya: "I don't think I want this night to end."
Jiten: "Then let's make this moment last a little longer."`,
        choices: [
            {
                text: "A. Tell her what this journey means to you.",
                next: "city_final",
                flag: "honest"
            },
            {
                text: "B. Ask her to make one promise.",
                next: "city_final",
                flag: "promise"
            }
        ]
    },

    city_final: {
        number: 7,
        location: "THE CITY'S LAST LIGHT",
        label: "THE FINAL DESTINATION",
        title: "We Were Never Lost",
        narrative: "The first sunlight appears. The city slowly begins to disappear, but the memories remain. You finally understand why every road kept changing.",
        dialogue: `Sandhiya: "So... did we ever find our way?"
Jiten: "I think we did. We just weren't looking for a place."`,
        choices: [
            {
                text: `A. "My favourite destination will always be you."`,
                next: "city_ending_together"
            },
            {
                text: `B. "Let's get lost in another city someday."`,
                next: "city_ending_secret"
            }
        ]
    },

    city_ending_together: {
        number: "ENDING 01",
        location: "THE CITY WE FOUND",
        label: "A HAPPY ENDING",
        title: "Home Is Wherever You Are",
        narrative: "The city disappears completely. But you don't need its streets anymore. You have found something much more important: a person you want beside you, wherever life takes you.",
        dialogue: `Jiten: "Maybe we were never lost. Maybe we were just finding our way to each other."`,
        choices: [
            {
                text: "↻ Explore This City Again",
                next: "restart"
            }
        ]
    },

    city_ending_secret: {
        number: "ENDING 02",
        location: "BEYOND THE CITY",
        label: "A NEW ADVENTURE",
        title: "To Be Continued...",
        narrative: "A new map appears in your hands. This time, it shows a city even stranger than the last. You both smile. The next adventure is waiting.",
        dialogue: `Sandhiya: "Promise me we'll do this again?"
Jiten: "Every time, without hesitation."`,
        choices: [
            {
                text: "↻ Explore This City Again",
                next: "restart"
            }
        ]
    }
};



// GO BACK TO PREVIOUS SCENE
function goBackStory() {

    if (storyHistory.length <= 1) return;

    // Remove current scene
    storyHistory.pop();

    // Find previous scene
    const previousScene =
        storyHistory[storyHistory.length - 1];

    // Remove the choice that led away from this scene
    delete storyChoices[previousScene];

    // Display previous scene without adding it twice
    showStoryScene(previousScene);
}
// EXIT STORY

function exitStory() {

    document.getElementById("storyScreen").style.display = "none";
    document.getElementById("universeHub").style.display = "flex";

    window.scrollTo(0, 0);
}
function showUniverseChoices() {
    document.getElementById("multiverseIntro").style.display = "none";

    document.getElementById("universeChoices").style.display = "block";

    window.scrollTo(0, 0);
}

function chooseUniverse(universe) {
    document.getElementById("universeChoices").style.display = "none";

    if (universe === "train") {
        startStory();
    }
    else if (universe === "rain") {
        startRainStory();
    }
    else if (universe === "city") {
        startCityStory();
    }
    else if (universe === "sunmoon") {
        startSunMoonStory();
    }
    else {
        alert("This universe is still waiting to be created!");
        document.getElementById("universeChoices").style.display = "block";
    }
}

// START UNDER THE SAME RAIN

function startRainStory() {

    document.getElementById("multiverseIntro").style.display = "none";
    document.getElementById("universeChoices").style.display = "none";
    document.getElementById("storyScreen").style.display = "block";

    activeStory = "rain";

    storyHistory = [];
    storyChoices = {};

    showStoryScene("rain_cafe");

    window.scrollTo(0, 0);

    
}

function startCityStory() {
    document.getElementById("multiverseIntro").style.display = "none";
    document.getElementById("universeChoices").style.display = "none";
    document.getElementById("storyScreen").style.display = "block";

    activeStory = "city";
    storyHistory = [];
    storyChoices = {};

    showStoryScene("city_arrival");
    window.scrollTo(0, 0);
}
// ===================================
// UNIVERSE 04 — THE SUN WHO GUARDED THE MOON
// ===================================


const sunMoonScenes = {

    royal_arrival: {
        title: "The Princess and Her Guard",
        location: "The Royal Palace",
        image: "",
        narrative: "Princess Sandhiya had never liked being told what to do. Unfortunately, being born into royalty meant that everyone seemed to have an opinion about her life. And today, her father had assigned her a new personal bodyguard.",
        dialogue: "Jiten: \"Your Highness. From today onwards, I am responsible for your safety.\"\nSandhiya: \"How unfortunate for you.\"",
        choices: [
            { text: "And who said I needed a bodyguard?", next: "first_impression" },
            { text: "You look terribly serious. Do you ever smile?", next: "first_impression" },
            { text: "I hope you know how to follow orders.", next: "first_impression" }
        ]
    },

    first_impression: {
        title: "Rules Are Meant to Be Broken",
        location: "The Palace Corridor",
        image: "",
        narrative: "Jiten followed her through the corridor, maintaining the perfect distance. Sandhiya suddenly stopped and turned around, almost making him walk straight into her.",
        dialogue: "Sandhiya: \"Rule number one. Stop following me so closely.\"\nJiten: \"Rule number one for me is keeping you alive, Your Highness.\"\nSandhiya: \"God, you're annoying.\"\nJiten: \"The feeling is mutual.\"",
        choices: [
            { text: "Challenge him with a mischievous smile.", next: "garden_escape" },
            { text: "Tell him he's not allowed to speak to you like that.", next: "garden_escape" }
        ]
    },

    garden_escape: {
        title: "A Little Escape",
        location: "The Royal Gardens",
        image: "",
        narrative: "That evening, Sandhiya sneaked out of the palace to escape another boring royal gathering. She thought she had finally managed to lose her guard. Then a familiar voice came from behind a marble statue.",
        dialogue: "Jiten: \"Enjoying your little escape?\"\nSandhiya: \"Are you secretly a ghost?\"\nJiten: \"No. Just the unfortunate man assigned to you.\"",
        choices: [
            { text: "Invite him to walk with you.", next: "midnight_walk" },
            { text: "Dare him to catch you.", next: "midnight_walk" },
            { text: "Ask why he takes his job so seriously.", next: "midnight_walk" }
        ]
    },

    midnight_walk: {
        title: "After Midnight",
        location: "The Palace Gardens",
        image: "",
        narrative: "The palace grew quiet. For once, Sandhiya wasn't surrounded by advisors, servants or royal expectations. Just the night breeze and the man who never seemed to leave her side.",
        dialogue: "Sandhiya: \"Do you ever have a life outside protecting me?\"\nJiten: \"I do.\"\nSandhiya: \"And what is it?\"\nJiten: \"Currently? Preventing a princess from getting herself into trouble.\"",
        choices: [
            { text: "Laugh and ask him about his past.", next: "the_ball" },
            { text: "Tease him about being obsessed with his princess.", next: "the_ball" }
        ]
    },

    the_ball: {
        title: "The Royal Ball",
        location: "The Grand Ballroom",
        image: "",
        narrative: "The palace hosted a grand ball. Sandhiya entered wearing a beautiful gown. Jiten stood near the entrance in his black uniform. His expression remained professional, but for a moment, he forgot what he was supposed to be watching.",
        dialogue: "Sandhiya: \"Well? Nothing to say?\"\nJiten: \"You look... appropriate for the occasion, Your Highness.\"\nSandhiya: \"Appropriate? That's all?\"\nJiten: \"I'm working, Princess.\"\nSandhiya: \"Of course you are.\"",
        choices: [
            { text: "Ask him to dance, just once.", next: "jealousy" },
            { text: "Dance with another royal and watch his reaction.", next: "jealousy" },
            { text: "Whisper that he looks handsome tonight.", next: "jealousy" }
        ]
    },

    jealousy: {
        title: "Something in His Eyes",
        location: "The Ballroom Balcony",
        image: "",
        narrative: "A young prince had spent most of the evening asking Sandhiya for dances. Jiten said nothing, but his jaw tightened every time the prince touched her hand. Later, Sandhiya found him alone on the balcony.",
        dialogue: "Sandhiya: \"You look upset.\"\nJiten: \"I'm perfectly fine.\"\nSandhiya: \"You're a terrible liar.\"\nJiten: \"And you're a terrible princess when it comes to following instructions.\"",
        choices: [
            { text: "Ask if he's jealous.", next: "the_confession" },
            { text: "Step closer and tell him to look at you.", next: "the_confession" }
        ]
    },

    the_confession: {
        title: "Behind Closed Doors",
        location: "The Palace Library",
        image: "",
        narrative: "A few days later, a storm trapped them in the palace library after a late security inspection. The silence between them felt different now. Neither could pretend that something hadn't changed.",
        dialogue: "Sandhiya: \"Tell me something, Jiten. Do you ever forget that I'm a princess?\"\nJiten: \"Every time you look at me like that.\"\nSandhiya: \"And what do you see then?\"\nJiten: \"Someone I should never fall for.\"",
        choices: [
            { text: "Tell him you feel the same.", next: "forbidden_choice" },
            { text: "Ask him why he keeps holding back.", next: "forbidden_choice" },
            { text: "Tease him: 'Who said you were allowed to fall for me?'", next: "forbidden_choice" }
        ]
    },

    forbidden_choice: {
        title: "The Promise",
        location: "The Palace Balcony",
        image: "",
        narrative: "Jiten finally admitted what he had been trying to hide. But he also knew the rules. A princess and her personal guard were never supposed to become something more. His duty, his reputation and her future stood between them.",
        dialogue: "Jiten: \"I was hired to protect you. Not to want you.\"\nSandhiya: \"Then perhaps you should stop looking at me like you do.\"\nJiten: \"Believe me, Princess. I've been trying.\"",
        choices: [
            { text: "Choose love and take his hand.", next: "ending_together" },
            { text: "Ask him to keep their feelings secret.", next: "ending_secret" },
            { text: "Step away and protect his career.", next: "ending_goodbye" }
        ]
    },

    ending_together: {
        title: "The Princess's Choice",
        location: "The Royal Palace",
        image: "",
        narrative: "Sandhiya refused to let a royal title decide who she could love. Jiten had spent his life standing behind her, protecting her from the world. This time, she stood beside him. Their relationship would not be easy, but for the first time, they chose their own future.",
        dialogue: "Sandhiya: \"You don't have to stand behind me anymore.\"\nJiten: \"Then where should I stand?\"\nSandhiya: \"Right beside me, idiot.\"",
        choices: [
            { text: "Begin their next chapter.", next: "restart" }
        ]
    },

    ending_secret: {
        title: "A Love in Secret",
        location: "The Palace Gardens",
        image: "",
        narrative: "They agreed to keep their feelings hidden. In public, he remained her bodyguard. In quiet corridors and moonlit gardens, he became the person she could trust with everything. Their story continued in stolen moments.",
        dialogue: "Jiten: \"You make this job impossible, Princess.\"\nSandhiya: \"And yet you never leave.\"\nJiten: \"Not when it comes to you.\"",
        choices: [
            { text: "Try their story again.", next: "restart" }
        ]
    },

    ending_goodbye: {
        title: "The Duty of a Guard",
        location: "The Palace Gates",
        image: "",
        narrative: "Jiten chose his duty, and Sandhiya chose her future. They never spoke about that night again. He continued protecting her, but something in their silence would always remain.",
        dialogue: "Jiten: \"Take care of yourself, Your Highness.\"\nSandhiya: \"You too, Jiten.\"",
        choices: [
            { text: "Return to the beginning.", next: "restart" }
        ]
    }

};
function startSunMoonStory() {

    document.getElementById("multiverseIntro").style.display = "none";
    document.getElementById("universeChoices").style.display = "none";
    document.getElementById("storyScreen").style.display = "block";

    activeStory = "sunmoon";

    storyHistory = [];
    storyChoices = {};

    showStoryScene("royal_arrival");

    window.scrollTo(0, 0);
}

/* ==========================================
   THE SEVEN KEYS — TREASURE HUNT
========================================== */

const treasureClues = [
    {
        title: "The First Mystery",
        question: "I start with a “p” and end with “o-r-n.” I’m a major player in the film industry. What am I??",
        answers: ["Popcorn","popcorn"]
    },
    {
        title: "The Second Mystery",
        question: "What’s white, sticky, and better to spit than to swallow??",
        answers: ["Toothpaste","toothpaste"]
    },
    {
        title: "The Third Mystery",
        question: "What’s most useful when it’s long and hard?",
        answers: ["education","Education"]
    },
    {
        title: "The Fourth Mystery",
        question: "I am always hard when dry but smooth and soft when wet. What am I?",
        answers: ["sponge","Sponge"]
    },
    {
        title: "The Fifth Mystery",
        question: "What does a bride get on her wedding day that’s long and sometimes hard?",
        answers: ["new surname","New surname"]
    },
    {
        title: "The Sixth Mystery",
        question: "You put me in your mouth and have endless fun blowing me. What am I?",
        answers: ["chewing gum","Chewing gum"]
    },
    {
        title: "The Final Mystery",
        question: "What is mine but only you can have?",
        answers: ["My heart","my heart"]
    }
];

let currentTreasureClue = 0;
let collectedTreasureKeys = 0;


function startTreasureHunt() {

    document.getElementById("universeHub").style.display = "none";
    document.getElementById("treasureScreen").style.display = "block";

    currentTreasureClue = 0;
    collectedTreasureKeys = 0;

    document.getElementById("treasureClue").style.display = "block";
    document.getElementById("treasureComplete").style.display = "none";
    document.getElementById("marriageCertificate").style.display = "none";

    document.getElementById("clueAnswer").value = "";
    document.getElementById("clueFeedback").textContent = "";

    renderTreasureProgress();
    renderTreasureClue();

    window.scrollTo(0, 0);
}


function renderTreasureClue() {

    const clue = treasureClues[currentTreasureClue];

    document.getElementById("clueNumber").textContent =
        `MYSTERY ${String(currentTreasureClue + 1).padStart(2, "0")} OF 07`;

    document.getElementById("clueTitle").textContent = clue.title;
    document.getElementById("clueQuestion").textContent = clue.question;

    document.getElementById("clueAnswer").value = "";
    document.getElementById("clueFeedback").textContent = "";

    document.getElementById("clueAnswer").focus();
}


function renderTreasureProgress() {

    document.getElementById("keysCollected").textContent =
        `${collectedTreasureKeys} / 7 KEYS`;

    document.getElementById("treasureProgressBar").style.width =
        `${(collectedTreasureKeys / 7) * 100}%`;

    const keyContainer = document.getElementById("treasureKeys");

    keyContainer.innerHTML = "";

    for (let i = 0; i < 7; i++) {

        const key = document.createElement("span");

        if (i < collectedTreasureKeys) {
            key.className = "treasure-key unlocked";
            key.textContent = "✦";
        } else {
            key.className = "treasure-key locked";
            key.textContent = "?";
        }

        keyContainer.appendChild(key);
    }
}


function checkTreasureAnswer(event) {

    event.preventDefault();

    const answer = document.getElementById("clueAnswer")
        .value.trim().toLowerCase();

    const clue = treasureClues[currentTreasureClue];

    if (!answer) {
        document.getElementById("clueFeedback").textContent =
            "Enter an answer before unlocking the key.";
        return;
    }

    const correct = clue.answers.some(
        acceptedAnswer => answer === acceptedAnswer
    );

    const feedback = document.getElementById("clueFeedback");

    if (!correct) {
        feedback.textContent =
            "Not quite, my Moon. Think again. You can do it!";

        document.getElementById("clueAnswer").select();
        return;
    }

    collectedTreasureKeys++;

    renderTreasureProgress();

    feedback.textContent = "✦ Correct! A golden key is yours.";

    if (collectedTreasureKeys === 7) {

        setTimeout(() => {

            document.getElementById("treasureClue").style.display = "none";
            document.getElementById("treasureComplete").style.display = "block";

            window.scrollTo({ top: 0, behavior: "smooth" });

        }, 900);

        return;
    }

    currentTreasureClue++;

    setTimeout(() => {
        renderTreasureClue();
    }, 1100);
}


function revealMarriageCertificate() {

    document.getElementById("treasureComplete").style.display = "none";

    document.getElementById("marriageCertificate").style.display = "block";

    window.scrollTo({ top: 0, behavior: "smooth" });
}


function exitTreasureHunt() {

    document.getElementById("treasureScreen").style.display = "none";
    document.getElementById("universeHub").style.display = "flex";

    window.scrollTo(0, 0);
}


function restartTreasureHunt() {
    startTreasureHunt();
}


// Connect the answer form
document.getElementById("treasureAnswerForm").addEventListener(
    "submit",
    checkTreasureAnswer
);
function openUniverseFromGameReturn() {
    if (window.location.hash === "#universeHub") {
        showUniverse();
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", openUniverseFromGameReturn);
} else {
    openUniverseFromGameReturn();
}
function openUniverseFromGameReturn() {
    if (window.location.hash === "#universeHub") {

        const birthdayScreen = document.getElementById("birthdayScreen");
        const finalScreen = document.getElementById("finalScreen");
        const universeHub = document.getElementById("universeHub");

        if (birthdayScreen) {
            birthdayScreen.style.display = "none";
        }

        if (finalScreen) {
            finalScreen.style.display = "none";
        }

        if (universeHub) {
            universeHub.style.display = "flex";
        }

        document.body.style.overflowY = "auto";
        window.scrollTo(0, 0);
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", openUniverseFromGameReturn);
} else {
    openUniverseFromGameReturn();
}
if (window.location.hash === "#universeHub") {
    window.addEventListener("DOMContentLoaded", function () {
        showUniverse();
    });
}

/* ==========================================
   STAR EXPLORER — REALISTIC NIGHT SKY
========================================== */

// 80 little reasons why I love you

const starMessages = [

    "Because your smile can change my entire mood.",
    "Because you're effortlessly cute without even trying.",
    "Because your kindness makes you special.",
    "Because I love the way you see the world.",
    "Because you have a personality I could never get tired of.",
    "Because even your silly side makes me happy.",
    "Because you're stronger than you realise.",
    "Because you make ordinary moments feel special.",
    "Because you're genuinely one of a kind.",
    "Because being yourself is your greatest charm.",

    "Because I love hearing your voice.",
    "Because your laugh is one of my favourite sounds.",
    "Because I love the way you talk.",
    "Because even your random messages make my day.",
    "Because I smile whenever I see your name on my phone.",
    "Because I love listening to you talk about anything.",
    "Because your little habits are adorable.",
    "Because I love your sleepy side.",
    "Because even your smallest reactions make me smile.",
    "Because I notice the little things about you.",

    "Because you make me feel lucky.",
    "Because talking to you makes a bad day better.",
    "Because you make distance feel a little smaller.",
    "Because I can be myself around you.",
    "Because you make me feel understood.",
    "Because you bring peace to my chaos.",
    "Because you make me excited about tomorrow.",
    "Because I feel happier with you in my life.",
    "Because you make my heart feel at home.",
    "Because you're my favourite notification.",

    "Because I love our random conversations.",
    "Because I love making memories with you.",
    "Because even silence feels comfortable with you.",
    "Because I love learning new things about you.",
    "Because we have our own little world.",
    "Because I love our inside jokes.",
    "Because every conversation with you feels worth having.",
    "Because I never run out of things to say to you.",
    "Because I love discovering new sides of you.",
    "Because I want to keep growing alongside you.",

    "Because I admire your courage.",
    "Because I admire how you handle difficult days.",
    "Because you deserve every beautiful thing life has to offer.",
    "Because I love how passionate you can be.",
    "Because your dreams matter to me.",
    "Because I believe in you.",
    "Because I admire your determination.",
    "Because you inspire me to become better.",
    "Because I want to celebrate your every little achievement.",
    "Because I love seeing you happy.",

    "Because if I could choose again, I'd still choose you.",
    "Because I want to make countless memories with you.",
    "Because I want to see you achieve everything you dream of.",
    "Because I want to be there for your happiest and hardest days.",
    "Because I want to keep choosing you, every single day.",
    "Because I want to explore the world with you.",
    "Because I want to experience all the little adventures with you.",
    "Because no distance changes how much you mean to me.",
    "Because I can't wait to create more chapters of our story.",
    "Because my favourite future is one where you're in it.",

    "Because you're Sandhiya, and nobody could ever replace you.",
    "Because I don't need a special occasion to appreciate you.",
    "Because loving you is one of my favourite parts of life.",
    "Because there are a thousand reasons, and I'm still discovering more.",

    "Because your happiness matters to me.",
    "Because I love the way your eyes light up when you're excited.",
    "Because I want to hear about even the most boring parts of your day.",
    "Because I love how you make me forget about time.",
    "Because you make even an ordinary day feel worth remembering.",
    "Because I want to be your biggest supporter.",
    "Because I love the thought of growing old with you.",
    "Because every little memory with you is precious to me.",
    "Because I want to hold your hand through every chapter of life.",
    "Because you make my world feel a little more beautiful.",
    "Because I love seeing the world through your eyes.",
    "Because I want to keep surprising you with little things.",
    "Because you make me believe in beautiful coincidences.",
    "Because I would choose another thousand conversations with you.",
    "Because I want to be part of all your new beginnings.",
    "Because even the smallest moment with you can become my favourite memory.",
    "Because somehow, you make my world feel a little more beautiful.",
    "Because I wish I could pause time during our happiest moments.",
    "Because your happiness genuinely matters to me.",
    "Because I love the little world we've created together.",
    "Because even an ordinary day becomes memorable with you.",
    "Because I want to know every version of you.",
    "Because your presence means more than you probably realise.",
    "Because I love the way you make me laugh.",
    "Because I could listen to your stories for hours.",
    "Because your happiness is never a small thing to me.",

    "Because I want to be the person you can always talk to.",
    "Because I want to hear about your day, even the boring parts.",
    "Because I love knowing what makes you excited.",
    "Because I want to understand even the things you struggle to explain.",
    "Because I want to remember all your little preferences.",
    "Because I love the way your mind works.",
    "Because your opinions matter to me.",
    "Because I want to keep learning how to love you better.",
    "Because I never want you to feel alone in your difficult moments.",
    "Because I want to be someone you can count on.",

    "Because I wish I could see your smile whenever I miss you.",
    "Because I want more random pictures of your day.",
    "Because even a simple good morning from you feels special.",
    "Because I love when we forget about time while talking.",
    "Because I wish every long conversation could last a little longer.",
    "Because I secretly love seeing you excited about something.",
    "Because I love the little surprises you bring into my life.",
    "Because I want to collect memories with you, not just photographs.",
    "Because I want to know what you're thinking when you go quiet.",
    "Because I love the comfort of knowing you're there.",

    "Because you deserve someone who celebrates your smallest wins.",
    "Because I see so much potential in you.",
    "Because I hope you never stop believing in yourself.",
    "Because I want to remind you how capable you are.",
    "Because I admire the person you're becoming.",
    "Because you don't have to be perfect to be precious to me.",
    "Because your imperfections are part of what makes you you.",
    "Because I want to support the dreams that make your eyes shine.",
    "Because I hope you always make time for your own happiness.",
    "Because I am proud of you, even on the days you doubt yourself.",

    "Because I want to laugh with you over the most ridiculous things.",
    "Because I want to make silly memories that we'll talk about years later.",
    "Because I want to get lost in conversations with you.",
    "Because I want to discover our favourite places together.",
    "Because I want to watch sunsets beside you someday.",
    "Because I want to share little celebrations with you.",
    "Because I want to experience new things with you.",
    "Because I want our story to have a million unexpected chapters.",
    "Because I want to make even the simplest plans exciting with you.",
    "Because I want to look back one day and smile at everything we've experienced.",

    "Because I love that you're your own person.",
    "Because you have a way of making things interesting.",
    "Because your energy can brighten an entire conversation.",
    "Because I love your expressions, even the dramatic ones.",
    "Because your random thoughts are some of my favourite things.",
    "Because I love how you can be serious one moment and silly the next.",
    "Because there are still so many things I want to discover about you.",
    "Because your little quirks make me smile.",
    "Because I love the way you get excited about things you enjoy.",
    "Because being around your personality never feels boring.",

    "Because I want to make you feel appreciated.",
    "Because you deserve patience, honesty and kindness.",
    "Because I want to understand you instead of assuming things.",
    "Because I want us to keep choosing communication over silence.",
    "Because I want us to grow without losing what makes us special.",
    "Because I want to celebrate your individuality.",
    "Because I want to make space for both our dreams.",
    "Because I want us to keep finding reasons to smile together.",
    "Because I want to build something meaningful with you.",
    "Because I want our bond to become stronger with time.",

    "Because I wish I could give you a hug whenever you need one.",
    "Because I want to hold your hand during our little adventures.",
    "Because I want to see your reactions to all the places we visit.",
    "Because I want to share my favourite songs with you.",
    "Because I want to make playlists that remind me of you.",
    "Because I want to take countless pictures with you.",
    "Because I want to share food and argue about who gets the last bite.",
    "Because I want to experience a thousand ordinary evenings with you.",
    "Because I want to make birthdays feel magical for you.",
    "Because I want to make you feel special even on random Tuesdays.",

    "Because meeting you added a beautiful chapter to my life.",
    "Because I love that our story is uniquely ours.",
    "Because I want to keep making memories worth remembering.",
    "Because I don't need everything to be perfect to enjoy being with you.",
    "Because even the smallest moments with you can mean so much.",
    "Because I want to keep discovering new reasons to love you.",
    "Because I hope life gives you more happiness than you can imagine.",
    "Because I want to see you accomplish the things you once only dreamed about.",
    "Because the thought of a future filled with shared memories makes me smile.",
    "Because out of all the stars in this universe, my favourite one is you."
];


// ==========================================
// STAR EXPLORER VARIABLES
// ==========================================

let explorerCanvas = null;
let explorerContext = null;
let explorerStars = [];
let explorerAnimation = null;
let explorerInitialized = false;


// ==========================================
// OPEN STAR EXPLORER
// ==========================================

function startStarExplorer() {

    const explorer = document.getElementById("starExplorer");
    const hub = document.getElementById("universeHub");

    if (!explorer || !hub) {
        console.error("Star Explorer HTML section is missing.");
        return;
    }

    explorerCanvas = document.getElementById("spaceCanvas");

    if (!explorerCanvas) {
        console.error("Space canvas is missing.");
        return;
    }

    explorerContext = explorerCanvas.getContext("2d");

    hub.style.display = "none";
    explorer.style.display = "block";

    document.body.style.overflow = "hidden";

    if (!explorerInitialized) {
        explorerCanvas.addEventListener("click", handleStarClick);
        window.addEventListener("resize", resizeStarCanvas);
        explorerInitialized = true;
    }

    resizeStarCanvas();
    createExplorerStars();

    if (explorerAnimation) {
        cancelAnimationFrame(explorerAnimation);
    }

    animateExplorerStars();

    window.scrollTo(0, 0);
}


// ==========================================
// CANVAS SIZE
// ==========================================

function resizeStarCanvas() {

    if (!explorerCanvas || !explorerContext) return;

    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    explorerCanvas.width = window.innerWidth * ratio;
    explorerCanvas.height = window.innerHeight * ratio;

    explorerCanvas.style.width = window.innerWidth + "px";
    explorerCanvas.style.height = window.innerHeight + "px";

    explorerContext.setTransform(ratio, 0, 0, ratio, 0, 0);

    if (explorerStars.length > 0) {
        createExplorerStars();
    }
}


// ==========================================
// CREATE REALISTIC STAR FIELD
// ==========================================
function createExplorerStars() {
    explorerStars = [];

    const width = explorerCanvas.clientWidth;
    const height = explorerCanvas.clientHeight;

    // Dense realistic background stars
    for (let i = 0; i < 2000; i++) {
        explorerStars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 0.8 + 0.15,
            brightness: Math.random() * 0.6 + 0.15,
            phase: Math.random() * Math.PI * 2,
            twinkleSpeed: Math.random() * 0.6 + 0.1,
            clickable: false
        });
    }

    // PASTE THE INTERACTIVE STAR LOOP HERE
    starMessages.forEach((message, index) => {
        explorerStars.push({
            x: 25 + Math.random() * Math.max(1, width - 50),
            y: 25 + Math.random() * Math.max(1, height - 50),
            radius: Math.random() * 0.9 + 1.1,
            brightness: 0.9,
            phase: Math.random() * Math.PI * 2,
            twinkleSpeed: Math.random() * 0.5 + 0.2,
            clickable: true,
            messageIndex: index
        });
    });
}

// ==========================================
// DRAW AND ANIMATE THE NIGHT SKY
// ==========================================

function animateExplorerStars() {

    if (!explorerContext || !explorerCanvas) return;

    const ctx = explorerContext;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const time = performance.now() * 0.001;

    ctx.clearRect(0, 0, width, height);


    // Deep space background

    const background = ctx.createLinearGradient(
        0, 0, width, height
    );

    background.addColorStop(0, "#02030a");
    background.addColorStop(0.5, "#070b18");
    background.addColorStop(1, "#02040c");

    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);


    // Very subtle Milky Way haze

    const galaxy = ctx.createLinearGradient(
        0, height * 0.75,
        width, height * 0.15
    );

    galaxy.addColorStop(0, "rgba(100,115,165,0)");
    galaxy.addColorStop(0.35, "rgba(110,125,175,0.045)");
    galaxy.addColorStop(0.55, "rgba(150,155,205,0.075)");
    galaxy.addColorStop(0.75, "rgba(100,115,165,0.035)");
    galaxy.addColorStop(1, "rgba(100,115,165,0)");

    ctx.fillStyle = galaxy;
    ctx.fillRect(0, 0, width, height);


    // Draw every star

    explorerStars.forEach(star => {

        const twinkle = 0.78 +
            Math.sin(
                time * star.twinkleSpeed + star.phase
            ) * 0.22;

        const opacity = star.brightness * twinkle;

        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
        );
        // Make stars glow
ctx.shadowBlur = star.clickable ? 25 : 8;

ctx.shadowColor = star.clickable
    ? "rgba(190, 150, 255, 1)"
    : "rgba(180, 200, 255, 0.7)";

ctx.fillStyle = star.clickable
    ? `rgba(255, 235, 190, ${opacity})`
    : `rgba(210, 220, 255, ${opacity})`;

ctx.fill();

ctx.shadowBlur = 0;


        // Very subtle highlight on message stars

        if (star.clickable) {

            ctx.beginPath();

            ctx.arc(
                star.x,
                star.y,
                star.radius * 2.1,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(220,225,255,${opacity * 0.12})`;

            ctx.fill();
        }
    });


    explorerAnimation =
        requestAnimationFrame(animateExplorerStars);
}


// ==========================================
// CLICK INTERACTIVE STARS
// ==========================================

function handleStarClick(event) {

    const rect = explorerCanvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    let closestStar = null;
    let closestDistance = 22;

    explorerStars.forEach(star => {

        if (!star.clickable) return;

        const dx = mouseX - star.x;
        const dy = mouseY - star.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < closestDistance) {

            closestDistance = distance;
            closestStar = star;
        }
    });

    if (closestStar) {
        showStarMessage(closestStar.messageIndex);
    }
}


// ==========================================
// SHOW LOVE MESSAGE
// ==========================================

function showStarMessage(index) {

    const popup = document.getElementById("starMessage");

    const number = document.getElementById("starMessageNumber");

    const message = document.getElementById("starMessageText");

    if (!popup || !number || !message) return;

    number.textContent = "A LITTLE REASON";

    message.textContent = starMessages[index];

    popup.style.display = "block";
}


// ==========================================
// CLOSE LOVE MESSAGE
// ==========================================

function closeStarMessage() {

    const popup = document.getElementById("starMessage");

    if (popup) {
        popup.style.display = "none";
    }
}


// ==========================================
// RETURN TO CELESTIAL ATLAS
// ==========================================

function exitStarExplorer() {

    const explorer = document.getElementById("starExplorer");

    const hub = document.getElementById("universeHub");

    if (explorer) explorer.style.display = "none";

    if (hub) hub.style.display = "flex";

    if (explorerAnimation) {
        cancelAnimationFrame(explorerAnimation);
        explorerAnimation = null;
    }

    closeStarMessage();

    document.body.style.overflow = "auto";

    window.scrollTo(0, 0);
}
