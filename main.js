// main.js

import { initDesktop } from "./core/desktop.js";
import "./core/taskbar.js";
import "./core/startMenu.js";


function bootSystem() {
  console.log("System startuje...");
  initDesktop();
}

bootSystem();
