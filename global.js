// global.js - The central brain
const SUPABASE_URL = 'https://edmakmpjcudrwdxpgbuc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkbWFrbXBqY3VkcndkeHBnYnVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NTAzNDMsImV4cCI6MjA4ODUyNjM0M30.efTUVrvQbKYBlDBv2B-SCXaKQYCRU84gJ9jP8CMwyUs';
window.activityLibrary = {
        "hl1": {
            title: "Half-Life",
            creator: "Valve Software",
            tags: "FPS / GoldSrc",
            desc: "Run, think, shoot.. live. Experience the original 1998 masterpiece directly in your browser. Since I can't host the data, find it on Internet Archive!",
            banner: "assets/images/HL1Thumbnail.jpg",
            engine: "xash3d",
            screenshots: ["assets/images/HL1Thumbnail.jpg"],
            config: { url: "https://x8bitrain.github.io/webXash/" }
        },
        "deltarune": {
            title: "Deltarune",
            creator: "Toby Fox",
            tags: "Adventure/2D/Indie",
            desc: "yes i somehow got the ENTIRE activity of deltarune on here 💔",
            banner: "assets/images/DeltaruneThumbnail.webp",
            engine: "HTML5",
            screenshots: ["assets/images/DeltaruneThumbnail.webp"],
            config: { url: "https://jimmyqrg.github.io/loader/?content=https%3A%2F%2Fjimmyqrg.github.io%2Fjqrg-activitys%2Factivitys%2Fdeltarune%2F" }
        },
        "bendy": {
            title: "Bendy and the Ink Machine",
            creator: "TheMeatly",
            tags: "Horror / Indie",
            desc: "bendy was a little devil thing (Hey, I am alive! Immortalized, You're the creator! You traitor!)",
            banner: "assets/images/BendyThumbnail.jpg",
            engine: "HTML5",
            screenshots: ["assets/images/BendyThumbnail.jpg"],
            config: { url: "https://moosejayraffe-alt.github.io/bendy-and-the-ink-machine/" }
        },

        "cuphead": {
            title: "Cuphead",
            creator: "Studio MDHR",
            tags: "2D Side-Scroller / Action",
            desc: "hey can someone play as mughead (no-one except me would get this reference)",
            banner: "assets/images/BendyThumbnail.jpg",
            engine: "HTML5",
            screenshots: ["assets/images/BendyThumbnail.jpg"],
            config: { url: "https://moosejayraffe-alt.github.io/cuphead/" }
        },

        "doom": {
            title: "Doom",
            creator: "ID Software",
            tags: "Horror / Action / Shooter",
            desc: "Can Jayraffe Complex run Doom? Try and find out. ",
            banner: "assets/images/DoomThumbnail.webp",
            engine: "JS-DOS",
            screenshots: ["assets/images/DoomThumbnail.webp"],
            config: { url: "https://v8.js-dos.com/bundles/doom.jsdos" }
        },
        "danganronpa": {
            title: "Danganronpa: Trigger Happy Havoc",
            creator: "Spike Chunsoft",
            tags: "Horror / Mystery",
            desc: "junko is so peak and btw i could fix her trust me guys 💔",
            banner: "assets/images/DanganronpaThumbnail.webp",
            engine: "HTML5",
            screenshots: ["assets/images/DanganronpaThumbnail.webp"],
            config: { url: "https://selenite.cc/resources/semag/danganronpa/g.html" }
        },
        "ultrakill": {
            title: "Ultrakill",
            creator: "New Blood Interactive",
            tags: "Combat / Action",
            desc: "judgement (that's the only thing ik about this activity except v1)",
            banner: "assets/images/UltrakillThumbnail.jpg",
            engine: "HTML5",
            screenshots: ["assets/images/UltrakillThumbnail.jpg"],
            config: { url: "https://moosejayraffe-alt.github.io/UK-web/" }
        },
        "hk": {
            title: "Hollow Knight",
            creator: "Unknown",
            tags: "2D Side-Scroller / Action",
            desc: "shaw (that's the only thing ik about this activity 😭)",
            banner: "assets/images/HollowKnightThumbnail.png",
            engine: "HTML5",
            screenshots: ["assets/images/HollowKnightThumbnail.png"],
            config: { url: "https://moosejayraffe-alt.github.io/hollow-knight/" }
        },
        "etc": {
            title: "Escaping the Complex",
            creator: "Puffballs United",
            tags: "Flash / THIS IS THE GREATEST PLANNNN",
            desc: "Relive the absolute peak that is Henry Stickmin. Powered by the Ruffle emulator.",
            banner: "assets/images/HenryStickminETCThumbnail.avif",
            engine: "Flash",
            screenshots: ["assets/images/HenryStickminETCThumbnail.avif"],
            config: { filename: "fleeingthecomplexng" }
        }
 };

// This is the ONLY place 'supabase' is declared
// Change this line in global.js
window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkAuthStatus() {
    // 1. Get the client from the window
    const client = window.supabaseClient;

    // 2. If it's not ready, wait and try again (The "Patient" Loop)
    if (!client) {
        setTimeout(checkAuthStatus, 100);
        return;
    }
    
    // 3. Use 'client' instead of 'supabase'
    const { data: { user } } = await client.auth.getUser();

    if (user) {
        const statusBtn = document.getElementById('user-status');
        const nameEl = document.getElementById('user-name');
        const rankEl = document.getElementById('user-rank');
        const avatarEl = document.getElementById('user-avatar');

        // Smart Pathing: Check if we are in a subfolder
        const isSub = window.location.pathname.includes('experience/') || window.location.pathname.includes('profile/');
        if (statusBtn) statusBtn.href = isSub ? "..profile/" : "profile/";

        if (nameEl) {
            nameEl.innerText = user.user_metadata.display_name || user.email.split('@')[0];
        }
        if (rankEl) rankEl.innerText = "Complex Citizen";
        
        if (avatarEl) {
            if (user.user_metadata.avatar_url) {
                avatarEl.innerHTML = `<img src="${user.user_metadata.avatar_url}" class="rounded-full w-full h-full object-cover border border-cyan-400">`;
            } else {
                const initial = (user.user_metadata.display_name || user.email).charAt(0).toUpperCase();
                avatarEl.innerHTML = `<span class="font-bold text-cyan-400">${initial}</span>`;
            }
        }
    }
}

async function handleSignOut() {
    if (window.supabaseClient) {
        await window.supabaseClient.auth.signOut();
        window.location.href = "..homepage/"; // This takes you back to home
    }
}

async function updateNavIdentity() {
    const client = window.supabaseClient;
    const { data: { user } } = await client.auth.getUser();

    if (user) {
        const { data: profile } = await client
            .from('profiles')
            .select('display_name')
            .eq('id', user.id)
            .single();

        const display = document.getElementById('nav-user-display');
        if (display && profile) {
            display.innerText = profile.display_name;
            display.classList.remove('text-white/40');
            display.classList.add('text-steam-yellow');
        }
    }
}

// --- GLOBAL UI SOUND SYSTEM ---

// Create the audio object (replace with your actual sound file path)
const uiClickSound1 = new Audio('assets/audio/buttonclickrelease.wav');
uiClickSound1.volume = 0.35; // Adjust volume so it's not too startling

function playClick() {
    // Reset the sound to the start in case it's clicked rapidly
    uiClickSound1.currentTime = 0;
    uiClickSound1.play().catch(e => console.log("Audio play blocked by browser. Interaction required."));
}

// Global Listener for all button/link interactions
document.addEventListener('click', (event) => {
    const target = event.target;

    // Check if the clicked element (or its parent) is a button or link
    const isInteractive = target.closest('button') || target.closest('a') || target.closest('.steam-btn');

    if (isInteractive) {
        playClick();
    }
}, true); // Using 'true' for capturing phase ensures it catches the click early

// Call this on load
window.addEventListener('load', updateNavIdentity);

// Check status whenever a page finishes loading
document.addEventListener('load', checkAuthStatus);