// /apps/mail.js

import { createWindow } from "../core/windowManager.js";

/* =========================
   DANE (tymczasowe)
========================= */

const MAILS = [
  {
    from: "Komisarz Nowak",
    subject: "RAPORT",
    body: `Sprawa została oficjalnie zamknięta.
Brak podstaw do dalszych czynności.

— K.N.`,
    unread: true
  },
  {
    from: "anonim",
    subject: "nie ufaj im",
    body: `Jeśli to czytasz, znaczy że ktoś popełnił błąd.

Nie wszystkie akta trafiły do archiwum.`,
    unread: true
  },
  {
    from: "system",
    subject: "Brak nowych wiadomości",
    body: `To konto nie było aktywne od 1998 roku.`,
    unread: false
  }
];

/* =========================
   PUBLIC API
========================= */

export function openMail() {
  const win = createWindow(
    "Poczta",
    renderMailLayout(),
    520,
    320
  );

  bindMailEvents(win);
}

/* =========================
   RENDER
========================= */

function renderMailLayout() {
  const list = MAILS.map((m, i) => `
    <div class="mail-item ${m.unread ? "unread" : ""}" data-index="${i}">
      <b>${m.from}</b><br>
      <small>${m.subject}</small>
    </div>
  `).join("");

  return `
    <div class="mail-container">
      <div class="mail-list">
        ${list}
      </div>
      <div class="mail-view">
        <i>Wybierz wiadomość…</i>
      </div>
    </div>
  `;
}

/* =========================
   EVENTS
========================= */

function bindMailEvents(win) {
  const items = win.querySelectorAll(".mail-item");
  const view = win.querySelector(".mail-view");

  items.forEach(item => {
    item.onclick = () => {
      const index = Number(item.dataset.index);
      const mail = MAILS[index];

      mail.unread = false;
      item.classList.remove("unread");

      view.innerHTML = `
        <b>Od:</b> ${mail.from}<br>
        <b>Temat:</b> ${mail.subject}
        <hr>
        <pre style="white-space:pre-wrap;font-family:inherit;">
${mail.body}
        </pre>
      `;
    };
  });
}
