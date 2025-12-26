// /core/startMenu.js


import { getDesktopApps, openNode } from "./filesystem.js";


const startBtn = document.getElementById("startBtn");
const menu = document.getElementById("startMenu");

/* =========================
   INIT
========================= */

renderMenu();

/* =========================
   EVENTS
========================= */

startBtn.onclick = () => {
  menu.hidden = !menu.hidden;
};

document.addEventListener("click", e => {
  if (!menu.contains(e.target) && e.target !== startBtn) {
    menu.hidden = true;
  }
});

/* =========================
   RENDER
========================= */

function renderMenu() {
  const apps = getDesktopApps();

  menu.innerHTML = `
    <ul>
      ${apps.map(app => `
        <li data-app="${app.app}">
          ${app.name}
        </li>
      `).join("")}
    </ul>
  `;

  menu.querySelectorAll("li").forEach(li => {
    li.onclick = () => {
      const app = apps.find(a => a.app === li.dataset.app);
      if (app) openNode(app);
      menu.hidden = true;
    };
  });
}

