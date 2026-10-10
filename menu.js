/* Menu de cima do Radar Numérico: abre/fecha (celular e toque) e marca a página atual.
 * Sem JavaScript o menu continua funcionando: no computador abre ao passar o mouse; no celular aparece aberto. */
(function () {
  "use strict";
  function iniciar() {
    const topo = document.querySelector(".rn-topo");
    if (!topo) return;
    topo.classList.add("rn-js");
    const abrir = topo.querySelector(".rn-abrir");
    const grupos = [...topo.querySelectorAll(".rn-g")];
    const fecharGrupos = (exceto) => grupos.forEach((g) => { if (g !== exceto) { g.classList.remove("aberto"); const b = g.querySelector("button.rn-t"); if (b) b.setAttribute("aria-expanded", "false"); } });
    if (abrir) abrir.addEventListener("click", () => {
      const ab = topo.classList.toggle("rn-aberto");
      abrir.setAttribute("aria-expanded", String(ab));
      if (ab) { const at = topo.querySelector(".rn-g.rn-atual"); if (at && window.innerWidth < 900) { at.classList.add("aberto"); at.querySelector("button.rn-t") && at.querySelector("button.rn-t").setAttribute("aria-expanded", "true"); } }
    });
    grupos.forEach((g) => {
      const b = g.querySelector("button.rn-t");
      if (!b) return;
      b.addEventListener("click", () => {
        const ab = !g.classList.contains("aberto");
        fecharGrupos(g);
        g.classList.toggle("aberto", ab); b.setAttribute("aria-expanded", String(ab));
      });
      g.addEventListener("mouseleave", () => { if (window.innerWidth >= 900) { g.classList.remove("aberto"); b.setAttribute("aria-expanded", "false"); b.blur(); } });
    });
    document.addEventListener("click", (ev) => { if (!topo.contains(ev.target)) { fecharGrupos(); if (topo.classList.contains("rn-aberto")) { topo.classList.remove("rn-aberto"); abrir && abrir.setAttribute("aria-expanded", "false"); } } });
    document.addEventListener("keydown", (ev) => { if (ev.key === "Escape") { fecharGrupos(); topo.classList.remove("rn-aberto"); abrir && abrir.setAttribute("aria-expanded", "false"); } });
    marcar();
  }

  // marca o link da página atual (o mais específico) e o grupo dele
  const limpa = (p) => p.replace(/index\.html$/, "").replace(/\/?$/, "/").replace(/\/([^/]+\.html)\/$/, "/$1");
  function marcar() {
    const topo = document.querySelector(".rn-topo");
    if (!topo) return;
    const aqui = new URL(location.href), qa = aqui.searchParams;
    let melhor = null, pontos = -1;
    topo.querySelectorAll(".rn-menu a[href]").forEach((a) => {
      a.removeAttribute("aria-current");
      const u = new URL(a.getAttribute("href"), location.href);
      if (limpa(u.pathname) !== limpa(aqui.pathname)) return;
      let ok = true, n = 0;
      u.searchParams.forEach((v, k) => { n++; if (qa.get(k) !== v) ok = false; });
      if (u.pathname.startsWith("/eleicoes/") && !u.searchParams.has("turno") && qa.get("turno") === "2") ok = false;
      if (ok && n > pontos) { melhor = a; pontos = n; }
    });
    topo.querySelectorAll(".rn-g").forEach((g) => g.classList.remove("rn-atual"));
    if (melhor) { melhor.setAttribute("aria-current", "page"); const g = melhor.closest(".rn-g"); if (g) g.classList.add("rn-atual"); }
  }
  window.RNMenu = { marcar };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar); else iniciar();
})();
