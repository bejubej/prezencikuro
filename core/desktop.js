// /core/desktop.js

import { FILESYSTEM } from "../data/filesystemData.js";
import { openNode } from "./filesystem.js";

/* =========================
   CONFIG
========================= */

const ICON_SIZE = 80;
const ICON_MARGIN = 20;
const START_X = 20;
const START_Y = 20;
const MAX_HEIGHT = window.innerHeight - 60;

/* =========================
   INIT
========================= */

export function initDesktop() {
  const desktopNode = findDesktopNode(FILESYSTEM);
  if (!desktopNode) {
    console.error("Brak pulpitu w filesystemData");
    return;
  }

  renderIcons(desktopNode.children);
}

/* =========================
   FIND DESKTOP
========================= */

function findDesktopNode(root) {
  if (root.type === "desktop") return root;
  if (!root.children) return null;

  for (const child of root.children) {
    const found = findDesktopNode(child);
    if (found) return found;
  }
  return null;
}

/* =========================
   RENDER ICONS
========================= */

function renderIcons(nodes) {
  const container = document.getElementById("icons");
  container.innerHTML = "";

  let x = START_X;
  let y = START_Y;

  nodes.forEach(node => {
    const icon = createIcon(node);
    icon.style.left = x + "px";
    icon.style.top = y + "px";
    container.appendChild(icon);

    y += ICON_SIZE + ICON_MARGIN;
    if (y > MAX_HEIGHT) {
      y = START_Y;
      x += ICON_SIZE + ICON_MARGIN;
    }
  });
}

/* =========================
   CREATE ICON
========================= */

function createIcon(node) {
  const el = document.createElement("div");
  el.className = "icon";

  el.innerHTML = `
    <div class="icon-image">${getIconEmoji(node)}</div>
    <div class="icon-label">${node.name}</div>
  `;

  el.ondblclick = () => openNode(node);

  return el;
}

/* =========================
   ICON LOOKUP
========================= */

function getIconEmoji(node) {
  switch (node.type) {
    case "folder": return "📁";
    case "txt": return "📄";
    case "image": return "🖼️";
    case "mp3": return "🎵";
    case "trash": return "🗑️";
    case "app": return "🖥️";
    default: return "❓";
  }
}
