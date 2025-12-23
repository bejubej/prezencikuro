/* ===== KONFIGURACJA I ZMIENNE GLOBALNE ===== */
const PASSWORD = "luna";
let lastClickTime = 0;
let lastClickedIcon = null;
let zIndex = 1000;
let dragElement = null;
let dragOffsetX = 0;
let dragOffsetY = 0;
let draggedIcon = null;
let iconDragOffsetX = 0;
let iconDragOffsetY = 0;
let selectedWallpaper = 'teal';

// Dane tekstowe plików
const fileContent = {
    akta: "RAPORT KOŃCOWY - SPRAWA #4782\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nData: 15.03.1998\nDetektyw: [REDACTED]\n\nPodsumowanie: Sprawa zamknięta. Brakuje kluczowego nazwiska.",
    notatki: "PRYWATNE NOTATKI\n━━━━━━━━━━━━━━━━\n❌ NIE UFAĆ raportowi! Sprawdź zdjęcie nr 3.",
    lista: "LISTA ZAKUPÓW\n━━━━━━━━━━━━━\n☐ Kawa (!!)\n☐ Baterie do latarki",
    dziennik: "DZIENNIK\n━━━━━━━━\n16.03.1998: Ktoś przeszukał moje biurko. Przenoszę się do domu."
};

/* ===== INICJALIZACJA SYSTEMU ===== */
window.onload = () => {
    updateClock();
    setInterval(updateClock, 1000);
    loadSettings();
    initEventListeners();
};

/* ===== LOGOWANIE ===== */
function login() {
    const passwordInput = document.getElementById("password");
    if (passwordInput.value === PASSWORD) {
        document.getElementById("login").style.display = "none";
        document.getElementById("desktop").style.display = "block";
    } else {
        passwordInput.value = "";
        passwordInput.style.background = '#ffcccc';
        setTimeout(() => passwordInput.style.background = '', 300);
    }
}

/* ===== OBSŁUGA OKIEN I IKON ===== */
function openItem(type) {
    const existing = document.querySelector(`[data-window="${type}"]`);
    if (existing) {
        existing.style.display = 'block';
        existing.style.zIndex = ++zIndex;
        return;
    }

    // Specyficzne akcje dla typów
    if (type === "music") {
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        return;
    }

    // Logika tworzenia okna (uproszczona)
    createWindow(type);
}

function createWindow(type) {
    const win = document.createElement("div");
    win.className = "window active";
    win.dataset.window = type;
    win.style.top = "100px";
    win.style.left = "150px";
    win.style.zIndex = ++zIndex;

    const title = type.charAt(0).toUpperCase() + type.slice(1) + ".txt";
    const bodyText = fileContent[type] || "Brak treści.";

    win.innerHTML = `
        <div class="titlebar">
            <div class="titlebar-text"><span>📄</span><span>${title}</span></div>
            <div class="titlebar-buttons">
                <div class="titlebar-button close">×</div>
            </div>
        </div>
        <div class="content">
            <textarea readonly>${bodyText}</textarea>
        </div>
    `;

    document.getElementById("desktop").appendChild(win);
    setupWindowEvents(win, type);
}

/* ===== MECHANIZM DRAG & DROP ===== */
function setupWindowEvents(win, type) {
    win.querySelector('.close').addEventListener('click', () => win.remove());
    
    const titlebar = win.querySelector('.titlebar');
    titlebar.onmousedown = (e) => {
        dragElement = win;
        dragOffsetX = e.clientX - win.offsetLeft;
        dragOffsetY = e.clientY - win.offsetTop;
        win.style.zIndex = ++zIndex;
    };
}

/* ===== ZEGAR I USTAWIENIA ===== */
function updateClock() {
    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ":" + 
                    now.getMinutes().toString().padStart(2, '0');
    const clockEl = document.getElementById('clock');
    if(clockEl) clockEl.textContent = timeStr;
}

function loadSettings() {
    const saved = localStorage.getItem('desktopSettings');
    if (saved) {
        // Logika przywracania pozycji ikon i tapety
    }
}

/* ===== EVENT LISTENERS ===== */
function initEventListeners() {
    // Hasło po kliknięciu Enter
    document.getElementById("password").addEventListener("keydown", e => {
        if (e.key === "Enter") login();
    });

    // Obsługa ikon na pulpicie
    document.querySelectorAll(".icon").forEach(icon => {
        icon.onclick = (e) => {
            const now = Date.now();
            if (now - lastClickTime < 400) openItem(icon.dataset.file);
            lastClickTime = now;
        };
    });

    // Przeciąganie globalne
    document.onmousemove = (e) => {
        if (dragElement) {
            dragElement.style.left = (e.clientX - dragOffsetX) + 'px';
            dragElement.style.top = (e.clientY - dragOffsetY) + 'px';
        }
    };

    document.onmouseup = () => {
        dragElement = null;
    };
}