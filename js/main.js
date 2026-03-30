/* ============================================================
   main.js — Entrypoint da aplicação
   ============================================================ */

import { initCursor }           from './cursor.js';
import { initScrollAnimations } from './animations.js';
import { renderPage }           from './render.js';

document.addEventListener('DOMContentLoaded', async () => {
  await renderPage();        // 1. renderiza conteúdo do JSON
  initCursor();              // 2. ativa cursor customizado
  initScrollAnimations();    // 3. ativa animações de scroll
});
