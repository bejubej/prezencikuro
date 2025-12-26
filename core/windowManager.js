// /core/windowManager.js

/* =========================
   STATE
========================= */
let windowIdCounter = 1;
let zIndexCounter = 100;
let dragTarget = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

/* =========================
   PUBLIC API
========================= */

export function createWindow(title, contentHTML, width = 400, height = 300) {
  const win = document.createElement("div");
  win.className = "window";
  win.style.width = width + "px";
  win.style.height = height + "px";
  win.style.left = "120px";
  win.style.top = "80px";
  win.style.zIndex = ++zIndexCounter;

  win.innerHTML = `
    <div class="titlebar">
      <span class="title">${title}</span>
      <button class="close">✕</button>
    </div>
    <div class="content">
      ${contentHTML}
    </div>
  `;

  document.getElementById("desktop").appendChild(win);

  // focus
  win.addEventListener("mousedown", () => bringToFront(win));

  // close
  win.querySelector(".close").onclick = () => win.remove();

  // drag
  const titlebar = win.querySelector(".titlebar");
  titlebar.addEventListener("mousedown", e => startDrag(e, win));

  return win;
}

/* =========================
   INTERNALS
========================= */

function bringToFront(win) {
  win.style.zIndex = ++zIndexCounter;
}

function startDrag(e, win) {
  dragTarget = win;
  dragOffsetX = e.clientX - win.offsetLeft;
  dragOffsetY = e.clientY - win.offsetTop;

  bringToFront(win);
}

document.addEventListener("mousemove", e => {
  if (!dragTarget) return;

  dragTarget.style.left = e.clientX - dragOffsetX + "px";
  dragTarget.style.top = e.clientY - dragOffsetY + "px";
});

document.addEventListener("mouseup", () => {
  dragTarget = null;
});
