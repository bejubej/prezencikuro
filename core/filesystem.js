// /core/filesystem.js


import { FILESYSTEM } from "../data/filesystemData.js";
import { createWindow } from "./windowManager.js";
import { openSnake } from "../apps/snake.js";
import { openMail } from "../apps/mail.js";
import { openBrowser } from "../apps/browser.js";
import { openTxtFile } from "../apps/txtViewer.js";
import { openTrash } from "../apps/trash.js";
import { openImage } from "../apps/imageViewer.js";

//import { renderDesktop } from "./desktop.js";

//let trashNode = null;

//export function initFilesystem(data) {
//  trashNode = data.find(n => n.type === "trash");
//}


/*HELPERS
========================= */

function findNodeByType(node, type) {
  if (node.type === type) return node;

  if (node.children) {
    for (const child of node.children) {
      const found = findNodeByType(child, type);
      if (found) return found;
    }
  }

  return null;
}

/* =========================
   PUBLIC API
========================= */

export function openNode(node) {
  if (!node || !node.type) return;

  switch (node.type) {
    case "txt":
      openTxt(node);
      break;

    case "folder":
      openFolder(node);
      break;

    case "image":
      openImage(node);
      break;

    case "mp3":
      openMp3(node);
      break;

    case "app":
      openApp(node);
      break;

    case "trash":
      openTrash(node);
      break;

    default:
      alert("Nieznany typ pliku");
  }
}
//handlers
function openTxt(node) {
  createWindow(
    node.name,
    `<pre style="white-space:pre-wrap;font-family:Courier New;font-size:11px;">
${node.content}
</pre>`,
    420
  );
}


export function getDesktopNode() {
  return findNodeByType(FILESYSTEM, "desktop");
}

export function getDesktopApps() {
  const desktop = getDesktopNode();
  if (!desktop) return [];
  return desktop.children.filter(n => n.type === "app");
}

function openFolder(node) {
  const items = node.children || [];

  const html = items.map(child => `
    <div class="folder-item" data-name="${child.name}">
      📄 ${child.name}
    </div>
  `).join("");

  createWindow(
    node.name,
    `<div class="folder-view">${html || "Folder jest pusty."}</div>`,
    360
  );

  const win = document.querySelector(".window:last-child");

  win.querySelectorAll(".folder-item").forEach(el => {
    el.ondblclick = () => {
      const name = el.dataset.name;
      const target = items.find(i => i.name === name);
      if (target) openNode(target);
    };
  });
}



function openFile(node) {
  switch (node.fileType) {
    case "txt":
      openTxtFile(node);
      break;

    case "image":
      openImage(node);
      break;

    case "mp3":
      openMp3(node);
      break;

    default:
      console.warn("Nieznany typ pliku:", node.fileType);
  }
}


function openMp3(node) {
  if (!node.youtube) {
    console.warn("MP3 bez linku YouTube:", node.name);
    return;
  }

  window.open(node.youtube, "_blank");
}





function openApp(node) {
  switch (node.app) {
    case "snake":
      openSnake();
      break;

    case "mail":
      openMail();
      break;

    case "browser":
      openBrowser();
      break;

    default:
      alert("Nieznana aplikacja");
  }
}



  /*const html = `
    <div>
      ${items.length === 0 ? "Kosz jest pusty." : ""}
      ${items.map(i => `<div>🗑 ${i.name}</div>`).join("")}
      <hr>
      <button id="emptyTrash">Opróżnij kosz</button>
    </div>
  `;

  createWindow("Kosz", html, 300);

  const win = document.querySelector(".window:last-child");
  win.querySelector("#emptyTrash").onclick = () => {
    node.children.length = 0;
    win.remove();
  };
*/
