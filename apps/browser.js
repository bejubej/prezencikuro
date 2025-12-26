// /apps/browser.js

import { createWindow } from "../core/windowManager.js";

/* =========================
   PAGES (kontrolowane)
========================= */

const PAGES = {
  home: {
    title: "Intranet Policji",
    html: `
      <h3>Wewnętrzna sieć – 1998</h3>
      <ul>
        <li><a href="#" data-page="case">Sprawa 17/98</a></li>
        <li><a href="#" data-page="persons">Osoby powiązane</a></li>
        <li><a href="#" data-page="archive">Archiwum</a></li>
        <li><a href="#" data-page="notice">Komunikat</a></li>
      </ul>
    `
  },

  case: {
    title: "Sprawa 17/98",
    html: `
      <p>Brak dostępu do pełnej dokumentacji.</p>
      <p>Status: <b>zamknięta</b></p>
      <a href="#" data-page="home">← Wróć</a>
    `
  },

  persons: {
    title: "Osoby powiązane",
    html: `
      <ul>
        <li>[USUNIĘTO]</li>
        <li>Jan K.</li>
        <li>[USUNIĘTO]</li>
      </ul>
      <a href="#" data-page="home">← Wróć</a>
    `
  },

  archive: {
    title: "Archiwum",
    html: `
      <p>Dostęp tylko z autoryzacją.</p>
      <a href="#" data-page="home">← Wróć</a>
    `
  },

  notice: {
    title: "Komunikat",
    html: `
      <p>Nie wszystkie dane zostały przeniesione do nowego systemu.</p>
      <p><i>Administrator</i></p>
      <a href="#" data-page="home">← Wróć</a>
    `
  }
};

/* =========================
   PUBLIC API
========================= */

export function openBrowser() {
  const win = createWindow(
    "Przeglądarka",
    renderPage("home"),
    520,
    360
  );

  bindLinks(win);
}

/* =========================
   RENDER
========================= */

function renderPage(pageKey) {
  const page = PAGES[pageKey];

  if (!page) {
    return "<p>404 – Strona nie istnieje</p>";
  }

  return `
    <div class="browser-page">
      <div class="browser-header">
        ${page.title}
      </div>
      <div class="browser-content">
        ${page.html}
      </div>
    </div>
  `;
}

/* =========================
   EVENTS
========================= */

function bindLinks(win) {
  win.addEventListener("click", e => {
    const link = e.target.closest("a[data-page]");
    if (!link) return;

    e.preventDefault();
    const pageKey = link.dataset.page;

    const content = win.querySelector(".content");
    content.innerHTML = renderPage(pageKey);
  });
}
