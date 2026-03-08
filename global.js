// global.js - The central brain
const SUPABASE_URL = 'https://edmakmpjcudrwdxpgbuc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkbWFrbXBqY3VkcndkeHBnYnVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NTAzNDMsImV4cCI6MjA4ODUyNjM0M30.efTUVrvQbKYBlDBv2B-SCXaKQYCRU84gJ9jP8CMwyUs';
window.activityLibrary = {
        "hl1": {
            title: "Half-Life",
            creator: "Valve Software",
            tags: "FPS / GoldSrc",
            desc: "Run, think, shoot.. live. Play the original 1998 masterpiece directly in your browser. Since I can't host the data, find it on Internet Archive!",
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
        "AceAttorney": {
            title: "Phoenix Wright: Ace Attorney",
            creator: "if i say i'll get cooked by their ninjas",
            tags: "objection",
            desc: "peaknix wright",
            banner: "assets/images/HoldIt.jpg",
            engine: "HTML5",
            screenshots: ["assets/images/HoldIt.jpg"],
            config: { url: "https://selenite.cc/loader.html?title=Ace%20Attorney%3A%20Pheonix%20Wright&dir=aceattorneyphoenixwright&img=logo.png&type=g" }
        },
        "bendy": {
            title: "Bendy and the Ink Machine",
            creator: "TheMeatly",
            tags: "Horror / Indie",
            desc: "bendy was a little devil thing (Hey, I am alive! Immortalized, You're the creator! You traitor!)",
            banner: "assets/images/BendyThumbnail.jpg",
            engine: "HTML5",
            screenshots: ["assets/images/BendyThumbnail.jpg"],
            config: { url: "https://selenite.cc/resources/semag/bendy/index.html" }
        },
        "doom": {
            title: "Doom",
            creator: "ID Software",
            tags: "Horror / Action / Shooter",
            desc: "In a port of the original 1993 classic, enjoy hacking and slashing your way through levels and become what the demons will call 'DOOM'. ",
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
            config: { url: "https://selenite.cc/resources/semag/ultrakill/index.html" }
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
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        // Find navbar elements
        const statusBtn = document.getElementById('user-status');
        const nameEl = document.getElementById('user-name');
        const rankEl = document.getElementById('user-rank');
        const avatarEl = document.getElementById('user-avatar');

        // Update Nav
        if (statusBtn) statusBtn.href = "profile/";
        if (nameEl) {
            nameEl.innerText = user.user_metadata.full_name || 
                               user.user_metadata.display_name || 
                               user.email.split('@')[0];
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
    await supabase.auth.signOut();
    window.location.href = "./";
}

// Check status whenever a page finishes loading
document.addEventListener('DOMContentLoaded', checkAuthStatus);