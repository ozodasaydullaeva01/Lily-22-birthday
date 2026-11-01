// const candlesContainer = document.getElementById("candles");
// const blowButton = document.getElementById("blowButton");
// const message = document.getElementById("message");

// // Positions of our 22 candles
// const positions = [
//     [20, 27], [30, 24], [40, 22],
//     [50, 20], [60, 22], [70, 24], [80, 27],

//     [25, 37], [35, 34], [45, 32],
//     [55, 32], [65, 34], [75, 37],

//     [30, 46], [40, 43], [50, 41],
//     [60, 43], [70, 46],

//     [40, 52], [47, 50], [53, 50], [60, 52]
// ];

// // Create 22 candles
// positions.forEach(([x, y]) => {
//     const candle = document.createElement("div");

//     candle.className = "candle";
//     candle.style.left = x + "%";
//     candle.style.top = y + "%";

//     const flame = document.createElement("div");
//     flame.className = "flame";

//     candle.appendChild(flame);
//     candlesContainer.appendChild(candle);
// });

// // Blow out all candles
// blowButton.addEventListener("click", () => {

//     document.querySelectorAll(".flame").forEach(flame => {
//         flame.style.display = "none";
//     });

//     message.textContent = "Happy 22nd Birthday, Lily! ♡";

//     blowButton.textContent = "Make a wish! 💗";
// });

const candlesContainer = document.getElementById("candles");
const blowButton = document.getElementById("blowButton");
const message = document.getElementById("message");
const candyRain = document.getElementById("candyRain");
// Supabase connection
const supabaseClient = window.supabase.createClient(
    "https://vwidjxztwlfeuhxepihu.supabase.co",
    "sb_publishable_MbIjJ6q0nHuob4vYaYiZuQ_UmOQ3RxE"
);

let blown = false;

// 22 candle positions
const positions = [
    [20, 27], [30, 24], [40, 22],
    [50, 20], [60, 22], [70, 24], [80, 27],
    [25, 37], [35, 34], [45, 32],
    [55, 32], [65, 34], [75, 37],
    [30, 46], [40, 43], [50, 41],
    [60, 43], [70, 46],
    [40, 52], [47, 50], [53, 50], [60, 52]
];

// Create candles
positions.forEach(([x, y]) => {
    const candle = document.createElement("div");

    candle.className = "candle";
    candle.style.left = x + "%";
    candle.style.top = y + "%";

    const flame = document.createElement("div");
    flame.className = "flame";

    candle.appendChild(flame);
    candlesContainer.appendChild(candle);
});

// Birthday sound using Web Audio API
function playBirthdaySound() {

    const audio = new (window.AudioContext || window.webkitAudioContext)();

    const notes = [
        523.25, 659.25, 783.99,
        1046.50, 783.99, 1046.50
    ];

    notes.forEach((frequency, index) => {

        const oscillator = audio.createOscillator();
        const gain = audio.createGain();

        oscillator.connect(gain);
        gain.connect(audio.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = "sine";

        const start = audio.currentTime + index * 0.22;

        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(0.2, start + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.35);

        oscillator.start(start);
        oscillator.stop(start + 0.4);
    });
}

// Rainbow candy explosion
function createCandies() {
    const colors = [
        "#ff4f81",
        "#ffb347",
        "#ffe066",
        "#7ed957",
        "#5bc0eb",
        "#a78bfa",
        "#ff8fab",
        "#ffffff"
    ];

    for (let i = 0; i < 100; i++) {

        const candy = document.createElement("div");

        candy.className = "candy";

        candy.style.left = Math.random() * 100 + "%";
        candy.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        candy.style.animationDuration =
            (2 + Math.random() * 3) + "s";

        candy.style.animationDelay =
            Math.random() * 1.5 + "s";

        candy.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        candyRain.appendChild(candy);

        setTimeout(() => candy.remove(), 40000);
    }
}
// Colorful falling star confetti
function createStars() {
    const starContainer = document.getElementById("starConfetti");

    const colors = [
        "#ff69b4", "#ffd700", "#87cefa",
        "#da70d6", "#98fb98", "#ff8c69", "#ffffff"
    ];

    for (let i = 0; i < 120; i++) {
        const star = document.createElement("div");

        star.className = "star";
        star.textContent = "★";
        star.style.left = Math.random() * 100 + "vw";
        star.style.color = colors[Math.floor(Math.random() * colors.length)];
        star.style.fontSize = (12 + Math.random() * 22) + "px";
        star.style.animationDuration = (3 + Math.random() * 5) + "s";
        star.style.animationDelay = Math.random() * 2 + "s";

        starContainer.appendChild(star);

        setTimeout(() => star.remove(), 55000);
    }
}
// Falling red heart confetti ❤️
function createHearts() {
    const heartContainer = document.getElementById("candyRain");

    for (let i = 0; i < 70; i++) {
        const heart = document.createElement("div");

        heart.className = "heart-confetti";
        heart.textContent = "♥";

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (14 + Math.random() * 25) + "px";
        heart.style.animationDuration = (4 + Math.random() * 5) + "s";
        heart.style.animationDelay = Math.random() * 3 + "s";

        heartContainer.appendChild(heart);

        setTimeout(() => heart.remove(), 60000);
    }
}
// Realistic candle blowing sound
function playBlowSound() {

    const audio = new (window.AudioContext || window.webkitAudioContext)();

    // Generate white noise
    const bufferSize = audio.sampleRate * 1.2;
    const buffer = audio.createBuffer(
        1,
        bufferSize,
        audio.sampleRate
    );

    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    const noise = audio.createBufferSource();
    noise.buffer = buffer;

    // Make the sound softer and airy
    const filter = audio.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1200;

    // Volume envelope
    const volume = audio.createGain();

    volume.gain.setValueAtTime(0.001, audio.currentTime);
    volume.gain.linearRampToValueAtTime(
        0.35,
        audio.currentTime + 0.08
    );

    volume.gain.exponentialRampToValueAtTime(
        0.001,
        audio.currentTime + 1.1
    );

    noise.connect(filter);
    filter.connect(volume);
    volume.connect(audio.destination);

    noise.start();
    noise.stop(audio.currentTime + 1.2);

}

// Birthday melody — plays three times
const song = document.getElementById("birthdaySong");

let playCount = 0;

function playBirthdaySong() {
    song.loop = false;
    song.currentTime = 0;
    playCount = 1;

    song.play().catch(error => {
        console.log("Music playback was blocked:", error);
    });

    song.onended = () => {
        if (playCount < 3) {
            playCount++;
            song.currentTime = 0;

            song.play().catch(error => {
                console.log("Music playback was blocked:", error);
            });
        }
    };
}

// Birthday celebration
blowButton.addEventListener("click", () => {

    if (blown) return;

    blown = true;

    // Extinguish candles
    document.querySelectorAll(".flame").forEach(flame => {
        flame.style.display = "none";
    });

    // Blow out sound first
playBlowSound();
// Birthday melody
playBirthdaySong();



// Birthday celebration effects
createCandies();
createStars();
createHearts();
loadBirthdayWishes();

    // Birthday message
    message.innerHTML = `
        <div class="birthday-wish">

            💗 Happy 22nd Birthday, Lily! 💗

            <br><br>

            May this year bring you the courage
            to pursue your biggest dreams,
            the freedom to choose your own path,
            and the happiness you never have to
            beg anyone for.

            <br><br>

            May you discover beautiful places,
            meet wonderful people, achieve things
            you're proud of, and become the woman
            you've always wanted to be.

            <br><br>

            You deserve a life that feels like yours.

            <br><br>

            With love, a little birthday wish just for you. 🎀

        </div>
    `;

    blowButton.textContent = "Your wish is on its way! 💕";

});
// Birthday countdown — Uzbekistan time (UTC+5)
const birthdayDate = new Date("2026-11-07T00:00:00+05:00").getTime();

const countdown = document.getElementById("countdown");

function updateCountdown() {
    const now = Date.now();
    const difference = birthdayDate - now;

    if (difference <= 0) {
        countdown.style.display = "none";
        clearInterval(countdownInterval);
        return;
    }

    document.getElementById("days").textContent =
        String(Math.floor(difference / 86400000)).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(Math.floor(difference / 3600000) % 24).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(Math.floor(difference / 60000) % 60).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(Math.floor(difference / 1000) % 60).padStart(2, "0");
}

updateCountdown();

const countdownInterval = setInterval(updateCountdown, 1000);
// Submit birthday wishes to Supabase
const wishForm = document.getElementById("wishForm");
const wishConfirmation = document.getElementById("wishConfirmation");

wishForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const senderName = document.getElementById("senderName").value.trim();
    const wishText = document.getElementById("wishText").value.trim();

    const submitButton = wishForm.querySelector("button");

    if (!senderName || !wishText) {
        wishConfirmation.textContent = "Please fill in both fields. ♡";
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
        const { error } = await supabaseClient
            .from("birthday_wishes")
            .insert([
                {
                    sender_name: senderName,
                    wish_message: wishText
                }
            ]);

        if (error) {
            throw error;
        }

        wishConfirmation.textContent =
            "Your wish has been delivered! Thank you. 💗";

        wishForm.reset();

    } catch (error) {
        console.error("Wish submission error:", error);

        wishConfirmation.textContent =
            "Something went wrong. Please try again.";

    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Send Wish ♡";
    }
});
// Reveal birthday wishes after blowing out the candles
async function loadBirthdayWishes() {
    const section = document.getElementById("publicWishes");
    const list = document.getElementById("publicWishesList");

    section.hidden = false;
    list.textContent = "Collecting all your birthday wishes... 💗";

    const { data, error } = await supabaseClient
        .from("birthday_wishes")
        .select("sender_name, wish_message, created_at")
        .order("created_at", { ascending: true });

    if (error) {
        console.error("Could not load birthday wishes:", error);
        list.textContent = "Your wishes couldn't load. Please try again.";
        return;
    }

    list.replaceChildren();

    if (data.length === 0) {
        list.textContent = "Your birthday mailbox is waiting for its first wishes. ♡";
        return;
    }

    data.forEach((wish, index) => {
        const card = document.createElement("article");
        card.className = "public-wish-card";

        const name = document.createElement("h3");
        name.textContent = "💗 " + wish.sender_name;

        const message = document.createElement("p");
        message.textContent = wish.wish_message;

        const date = document.createElement("small");
        date.textContent = new Date(wish.created_at).toLocaleDateString();

        card.append(name, message, date);
        list.appendChild(card);

        setTimeout(() => {
            card.classList.add("show");
        }, index * 250);
    });
}