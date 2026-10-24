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
    botaoCompartilhar(topo);
  }

  // botão "Compartilhar" no topo (entre a marca e o Menu): Copiar link ou WhatsApp
  const ICO_COMP = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5.5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="18.5" r="2.6"/><path d="M8.3 10.8 15.7 6.7M8.3 13.2l7.4 4.1" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
  const ICO_LINK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3.2-3.2a4.5 4.5 0 0 0-6.4-6.4l-1.1 1.1M14 10a4.5 4.5 0 0 0-6.4 0l-3.2 3.2a4.5 4.5 0 0 0 6.4 6.4l1.1-1.1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  const ICO_WA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9.1 7.9c.3-.3.7-.3.9 0l.9 1.6c.1.3.1.6-.1.8l-.5.6c.6 1.2 1.6 2.2 2.8 2.8l.6-.5c.2-.2.5-.2.8-.1l1.6.9c.3.2.3.6 0 .9l-.6.7c-.5.5-1.3.6-2 .3a9.5 9.5 0 0 1-4.9-4.9c-.3-.7-.2-1.5.3-2z" fill="currentColor"/></svg>';
  function linkLimpo() { const u = new URL(location.href); u.hash = ""; ["sim", "semente", "src"].forEach((k) => u.searchParams.delete(k)); return u.toString(); }
  function textoWhats() {
    const p = location.pathname;
    if (/\/apuracao2026\//.test(p)) return "Acompanhe a apuração das Eleições 2026 ao vivo no Radar Numérico 👇";
    if (/\/eleicoes\//.test(p)) return "Resultados das eleições cidade por cidade no Radar Numérico 👇";
    if (/\/futebol\/brasileirao\//.test(p)) return "Chances de título, Libertadores e rebaixamento do Brasileirão 2026, time a time, no Radar Numérico 👇";
    if (/\/futebol\/libertadores\//.test(p)) return "Chances de título, finais mais prováveis e chaveamento da Libertadores 2026 no Radar Numérico 👇";
    if (/\/futebol\/copa-do-brasil\//.test(p)) return "Chances de título, finais mais prováveis e chaveamento da Copa do Brasil 2026 no Radar Numérico 👇";
    if (/\/futebol\/sul-americana\//.test(p)) return "Chances de título, finais mais prováveis e chaveamento da Sul-Americana 2026 no Radar Numérico 👇";
    if (/\/futebol\/serie-b\//.test(p)) return "Chances de acesso, título e rebaixamento da Série B 2026, time a time, no Radar Numérico 👇";
    if (/\/futebol\/champions-league\//.test(p)) return "Chances de título de cada time na Champions League 2026/27 no Radar Numérico 👇";
    if (/\/futebol\/(premier-league|la-liga|bundesliga|serie-a-italiana)\//.test(p)) return "Chances de título, vaga na Champions e rebaixamento, time a time, no Radar Numérico 👇";
    if (/\/futebol\/(fa-cup|copa-da-liga-inglesa|copa-do-rei|copa-da-alemanha|copa-da-italia)\//.test(p)) return "Chances de título, chaveamento e finais mais prováveis da copa no Radar Numérico 👇";
    if (/\/futebol\/intercontinental-2026\//.test(p)) return "Chance de cada time ser campeão do Mundial de Clubes 2026 (Intercontinental), no Radar Numérico 👇";
    if (/\/futebol\/ranking-mundial\//.test(p)) return "Ranking mundial dos times de futebol pela força de cada um, no Radar Numérico 👇";
    if (/\/blog\//.test(p)) return "Leia no blog do Radar Numérico 👇";
    return "Veja no Radar Numérico 👇";
  }
  function botaoCompartilhar(topo) {
    if (topo.querySelector(".rn-comp")) return;
    const marca = topo.querySelector(".rn-marca"); if (!marca) return;
    const w = document.createElement("div"); w.className = "rn-comp";
    w.innerHTML = `<button type="button" class="rn-comp-b" aria-expanded="false" aria-controls="rn-comp-m" aria-label="Compartilhar esta página">${ICO_COMP}<span>Compartilhar</span></button>` +
      `<div class="rn-comp-m" id="rn-comp-m" hidden><button type="button" data-m="copiar">${ICO_LINK}<span>Copiar link</span></button><a data-m="whatsapp" target="_blank" rel="noopener">${ICO_WA}<span>Enviar no WhatsApp</span></a></div>`;
    marca.after(w);
    const b = w.querySelector(".rn-comp-b"), m = w.querySelector(".rn-comp-m"), wa = m.querySelector("[data-m=whatsapp]"), cp = m.querySelector("[data-m=copiar]");
    const fechar = () => { m.hidden = true; b.setAttribute("aria-expanded", "false"); };
    const ga = (metodo) => { try { window.gtag && gtag("event", "share", { method: metodo, content_type: "topo", item_id: location.pathname }); } catch (e) {} };
    b.addEventListener("click", (ev) => {
      ev.stopPropagation();
      const ab = m.hidden; m.hidden = !ab; b.setAttribute("aria-expanded", String(ab));
      if (ab) { wa.href = "https://wa.me/?text=" + encodeURIComponent(textoWhats() + "\n" + linkLimpo()); cp.querySelector("span").textContent = "Copiar link"; topo.classList.remove("rn-aberto"); }
    });
    cp.addEventListener("click", async (ev) => {
      ev.stopPropagation(); ga("copiar");
      try { await navigator.clipboard.writeText(linkLimpo()); cp.querySelector("span").textContent = "Link copiado ✓"; setTimeout(fechar, 1100); }
      catch (e) { window.prompt("Copie o link:", linkLimpo()); fechar(); }
    });
    wa.addEventListener("click", () => { ga("whatsapp"); fechar(); });
    document.addEventListener("click", (ev) => { if (!w.contains(ev.target)) fechar(); });
    document.addEventListener("keydown", (ev) => { if (ev.key === "Escape") fechar(); });
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
