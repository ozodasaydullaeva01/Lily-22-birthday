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

        setTimeout(() => candy.remove(), 7000);
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

    setTimeout(() => audio.close(), 1500);
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

// Birthday melody afterward
setTimeout(() => {
    const song = document.getElementById("birthdaySong");

    song.currentTime = 0;
    song.play().catch(error => {
        console.log("Audio playback failed:", error);
    });
}, 1500);

    // Rainbow candies
    createCandies();

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