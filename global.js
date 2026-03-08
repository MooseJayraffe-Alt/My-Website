// global.js - The central brain
const SUPABASE_URL = 'https://edmakmpjcudrwdxpgbuc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkbWFrbXBqY3VkcndkeHBnYnVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NTAzNDMsImV4cCI6MjA4ODUyNjM0M30.efTUVrvQbKYBlDBv2B-SCXaKQYCRU84gJ9jP8CMwyUs';

// This is the ONLY place 'supabase' is declared
window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkAuthStatus() {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        // Find navbar elements
        const statusBtn = document.getElementById('user-status');
        const nameEl = document.getElementById('user-name');
        const rankEl = document.getElementById('user-rank');
        const avatarEl = document.getElementById('user-avatar');

        // Update Nav
        if (statusBtn) statusBtn.href = "profile.html";
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
    window.location.href = "index.html";
}

// Check status whenever a page finishes loading
document.addEventListener('DOMContentLoaded', checkAuthStatus);