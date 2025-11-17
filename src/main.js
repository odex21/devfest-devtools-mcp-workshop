import "./main.css";

import homeMd from "./content/home.md?raw";
import gdgMd from "./content/gdg-devfest.md?raw";
import devtoolsMd from "./content/devtools-mcp.md?raw";
import howBuiltMd from "./content/how-built.md?raw";
import aboutMd from "./content/about.md?raw";
import { marked } from "marked";

function renderMarkdown(id, md) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = marked.parse(md);
}

function bootstrapContent() {
  renderMarkdown("home-intro-md", homeMd);
  renderMarkdown("gdg-md", gdgMd);
  renderMarkdown("devtools-md", devtoolsMd);
  renderMarkdown("how-built-md", howBuiltMd);
  renderMarkdown("about-md", aboutMd);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrapContent);
} else {
  bootstrapContent();
}
