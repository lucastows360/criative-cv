/* Criative Comunicação Visual — scripts do site */
(function () {
  "use strict";

  /* ===== Configuração ===== */
  var WA_NUMERO = "5543996487663";                                  // WhatsApp com DDI + DDD
  var WA_LINK = "https://wa.me/message/IQM5HS4LX3RFI1";             // link oficial da bio do Instagram

  /* ===== Portfólio =====
     Para adicionar um trabalho novo: coloque a foto na pasta 
     e acrescente uma linha abaixo. Categorias: fachadas, letras,
     envelopamento, adesivos, banners. */
  var PROJETOS = [
    { src: "zayon.jpg", titulo: "Zayon Barbearia", cat: "fachadas" },
    { src: "hamburgueria.jpg", titulo: "Hamburgueria", cat: "letras" },
    { src: "sul-brasil.jpg", titulo: "Sul Brasil Auto Socorro", cat: "envelopamento" },
    { src: "ultradega.jpg", titulo: "Ultradega Conveniências", cat: "fachadas" },
    { src: "bruna-martins.jpg", titulo: "Bruna Martins Advocacia", cat: "letras" },
    { src: "parede-infantil.jpg", titulo: "Parede infantil adesivada", cat: "adesivos" },
    { src: "doce-nuvem-noite.jpg", titulo: "Doce Nuvem", cat: "letras" },
    { src: "surek.jpg", titulo: "Surek Audiovisual", cat: "envelopamento" },
    { src: "viviane-acosta.jpg", titulo: "Viviane Acosta Odontologia", cat: "fachadas" },
    { src: "alianca.jpg", titulo: "Grupo Aliança", cat: "letras" },
    { src: "varanda-elizeu.jpg", titulo: "Varanda do Elizeu", cat: "banners" },
    { src: "next-car.jpg", titulo: "Next Car", cat: "fachadas" },
    { src: "parana-malhas.jpg", titulo: "Paraná Malhas", cat: "envelopamento" },
    { src: "chama.jpg", titulo: "Chama Lounge Club", cat: "letras" },
    { src: "maua-clean.jpg", titulo: "Mauá Clean", cat: "fachadas" },
    { src: "mimo.jpg", titulo: "Mimô Beauty Studio", cat: "adesivos" },
    { src: "porto-belo.jpg", titulo: "Restaurante Porto Belo Grill", cat: "fachadas" },
    { src: "julia.jpg", titulo: "Julia Festas e Eventos", cat: "envelopamento" },
    { src: "girasol.jpg", titulo: "Espaço GiraSol", cat: "letras" },
    { src: "street-grill.jpg", titulo: "Street Grill", cat: "fachadas" },
    { src: "churrasco-grego.jpg", titulo: "Sr. & Sra. Churrasco Grego", cat: "envelopamento" },
    { src: "amanda-mendes.jpg", titulo: "Amanda Mendes Fashion Kids", cat: "letras" },
    { src: "lupilu.jpg", titulo: "Outlet Lupilu", cat: "fachadas" },
    { src: "fb-banner.jpg", titulo: "Banner de fachada", cat: "banners" },
    { src: "toro.jpg", titulo: "Picape comercial", cat: "envelopamento" },
    { src: "doce-nuvem.jpg", titulo: "Doce Nuvem", cat: "fachadas" },
    { src: "digistamp.jpg", titulo: "Digistamp", cat: "letras" },
    { src: "terra-nativa.jpg", titulo: "Terra Nativa", cat: "fachadas" },
    { src: "autoescola.jpg", titulo: "Instrutor Autônomo", cat: "envelopamento" },
    { src: "panela-mineira.jpg", titulo: "Panela Mineira", cat: "letras" },
    { src: "farma10.jpg", titulo: "Farma10", cat: "fachadas" },
    { src: "imperio.jpg", titulo: "Império — utilitário", cat: "envelopamento" },
    { src: "bcf.jpg", titulo: "BCF Agência de Viagens", cat: "letras" },
    { src: "republica-jeans.jpg", titulo: "República do Jeans", cat: "fachadas" },
    { src: "estetica-28.jpg", titulo: "28 Estética Automotiva", cat: "fachadas" },
    { src: "aessencias.jpg", titulo: "AEssências Aromas e Limpeza", cat: "fachadas" },
    { src: "marxfarma.jpg", titulo: "Marxfarma", cat: "fachadas" }
  ];
  var CATEGORIAS = [
    ["todos", "Todos"],
    ["fachadas", "Fachadas"],
    ["letras", "Letras caixa"],
    ["envelopamento", "Envelopamento"],
    ["adesivos", "Adesivos"],
    ["banners", "Banners e faixas"]
  ];
  var NOME_CAT = {};
  CATEGORIAS.forEach(function (c) { NOME_CAT[c[0]] = c[1]; });

  var $ = function (s, ctx) { return (ctx || document).querySelector(s); };
  var $$ = function (s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); };
  var reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var temGsap = !reduz && window.gsap && window.ScrollTrigger;

  function waTexto(texto) { return "https://wa.me/" + WA_NUMERO + "?text=" + encodeURIComponent(texto); }

  /* ===== Botões de orçamento por serviço ===== */
  $$(".svc-cta[data-servico]").forEach(function (a) {
    a.href = waTexto("Olá, Criative! Gostaria de um orçamento de " + a.getAttribute("data-servico") + ".");
  });

  /* ===== Ano no rodapé ===== */
  var ano = $("#ano"); if (ano) ano.textContent = new Date().getFullYear();

  /* ===== Cabeçalho ===== */
  var header = $(".site-header");
  function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ===== Menu mobile ===== */
  var menuBtn = $("#menuBtn");
  function setMenu(aberto) {
    document.body.classList.toggle("menu-open", aberto);
    menuBtn.setAttribute("aria-expanded", aberto ? "true" : "false");
    menuBtn.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    document.body.style.overflow = aberto ? "hidden" : "";
  }
  menuBtn.addEventListener("click", function () { setMenu(!document.body.classList.contains("menu-open")); });
  $$("#nav a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });

  /* ===== Parede de fotos da capa (loop contínuo) ===== */
  $$(".wall-row").forEach(function (row) {
    $$("img", row).forEach(function (img) { row.appendChild(img.cloneNode(true)); });
  });

  /* ===== Mapa =====
     Fora de moldura (site publicado), carrega o Google Maps incorporado. */
  var emMoldura = true;
  try { emMoldura = window.self !== window.top; } catch (e) { emMoldura = true; }
  if (!emMoldura) {
    var mapa = $("#map");
    var ifr = document.createElement("iframe");
    ifr.title = "Mapa: Criative Comunicação Visual, Av. Minas Gerais, 2186, Apucarana";
    ifr.loading = "lazy";
    ifr.referrerPolicy = "no-referrer-when-downgrade";
    ifr.src = "https://www.google.com/maps?q=" + encodeURIComponent("Avenida Minas Gerais, 2186, Apucarana - PR, 86812-285") + "&output=embed";
    mapa.appendChild(ifr);
  }

  /* ===== Portfólio: filtros + galeria ===== */
  var filtros = $("#filters"), galeria = $("#gallery");
  var atual = "todos", lista = PROJETOS.slice();

  CATEGORIAS.forEach(function (c) {
    var qtd = c[0] === "todos" ? PROJETOS.length : PROJETOS.filter(function (p) { return p.cat === c[0]; }).length;
    if (!qtd) return;
    var b = document.createElement("button");
    b.type = "button"; b.className = "filter"; b.dataset.cat = c[0];
    b.setAttribute("aria-pressed", c[0] === atual ? "true" : "false");
    b.innerHTML = c[1] + " <small>" + qtd + "</small>";
    b.addEventListener("click", function () { filtrar(c[0]); });
    filtros.appendChild(b);
  });

  function render(animar) {
    lista = atual === "todos" ? PROJETOS.slice() : PROJETOS.filter(function (p) { return p.cat === atual; });
    galeria.innerHTML = "";
    lista.forEach(function (p, i) {
      var fig = document.createElement("figure");
      fig.className = "g-item";
      var btn = document.createElement("button");
      btn.type = "button"; btn.className = "g-btn";
      btn.setAttribute("aria-label", "Ampliar foto: " + p.titulo);
      var img = document.createElement("img");
      img.src = p.src; img.alt = p.titulo + " — " + NOME_CAT[p.cat]; img.loading = "lazy"; img.decoding = "async";
      var cap = document.createElement("figcaption");
      cap.className = "g-cap";
      cap.innerHTML = "<span></span><strong></strong>";
      cap.firstChild.textContent = NOME_CAT[p.cat];
      cap.lastChild.textContent = p.titulo;
      btn.appendChild(img); btn.appendChild(cap); fig.appendChild(btn);
      btn.addEventListener("click", function () { abrirLB(i); });
      galeria.appendChild(fig);
    });
    if (temGsap && animar) {
      gsap.fromTo(".g-item", { opacity: 0, y: 30, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.03, ease: "power3.out" });
    }
    if (temGsap) ScrollTrigger.refresh();
  }
  function filtrar(cat) {
    atual = cat;
    $$(".filter", filtros).forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.cat === cat ? "true" : "false"); });
    render(true);
  }
  render(false);

  /* ===== Lightbox ===== */
  var lb = $("#lightbox"), lbImg = $("#lbImg"), lbTitle = $("#lbTitle"), lbCount = $("#lbCount");
  var idx = 0, ultimoFoco = null;
  function mostrar(i) {
    idx = (i + lista.length) % lista.length;
    var p = lista[idx];
    lbImg.src = p.src; lbImg.alt = p.titulo;
    lbTitle.innerHTML = "<span></span>";
    lbTitle.firstChild.textContent = NOME_CAT[p.cat];
    lbTitle.appendChild(document.createTextNode(p.titulo));
    lbCount.textContent = (idx + 1) + " / " + lista.length;
  }
  function abrirLB(i) {
    ultimoFoco = document.activeElement;
    mostrar(i); lb.hidden = false; document.body.style.overflow = "hidden";
    $("#lbClose").focus();
    if (temGsap) gsap.fromTo(lbImg, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" });
  }
  function fecharLB() { lb.hidden = true; document.body.style.overflow = ""; if (ultimoFoco) ultimoFoco.focus(); }
  $("#lbClose").addEventListener("click", fecharLB);
  $("#lbPrev").addEventListener("click", function () { mostrar(idx - 1); });
  $("#lbNext").addEventListener("click", function () { mostrar(idx + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb || e.target.classList.contains("lb-stage")) fecharLB(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { if (!lb.hidden) fecharLB(); else if (document.body.classList.contains("menu-open")) setMenu(false); }
    if (lb.hidden) return;
    if (e.key === "ArrowLeft") mostrar(idx - 1);
    if (e.key === "ArrowRight") mostrar(idx + 1);
    if (e.key === "Tab") {
      var f = $$("button", lb), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  var tx = null;
  lb.addEventListener("touchstart", function (e) { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (tx === null) return;
    var dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) mostrar(idx + (dx < 0 ? 1 : -1));
    tx = null;
  });

  /* ===== Formulário de orçamento ===== */
  var form = $("#quoteForm"), tel = $("#f-tel");
  tel.addEventListener("input", function () {
    var d = tel.value.replace(/\D/g, "").slice(0, 11), out = d;
    if (d.length > 2) out = "(" + d.slice(0, 2) + ") " + d.slice(2);
    if (d.length > 7) out = "(" + d.slice(0, 2) + ") " + d.slice(2, d.length - 4) + "-" + d.slice(-4);
    tel.value = out;
  });
  function erro(campo, idErro, msg) {
    var el = $("#" + idErro);
    el.textContent = msg || "";
    campo.closest(".field").classList.toggle("has-error", !!msg);
    campo.setAttribute("aria-invalid", msg ? "true" : "false");
    if (msg) campo.setAttribute("aria-describedby", idErro); else campo.removeAttribute("aria-describedby");
    return !msg;
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var nome = $("#f-nome"), serv = $("#f-servico"), msg = $("#f-msg");
    var ok = true;
    ok = erro(nome, "e-nome", nome.value.trim().length < 2 ? "Digite seu nome." : "") && ok;
    var dig = tel.value.replace(/\D/g, "");
    ok = erro(tel, "e-tel", dig.length < 10 ? "Digite um telefone com DDD, ex.: (43) 99999-9999." : "") && ok;
    ok = erro(serv, "e-servico", !serv.value ? "Escolha o serviço desejado." : "") && ok;
    ok = erro(msg, "e-msg", msg.value.trim().length < 5 ? "Conte um pouco sobre o que você precisa." : "") && ok;
    if (!ok) { var inv = $("[aria-invalid='true']", form); if (inv) inv.focus(); return; }

    var texto = "Olá, Criative! Gostaria de solicitar um orçamento.\n\n" +
      "*Nome:* " + nome.value.trim() + "\n" +
      "*Telefone:* " + tel.value + "\n" +
      "*Serviço:* " + serv.value + "\n" +
      "*Mensagem:* " + msg.value.trim();
    var url = waTexto(texto);
    $("#formOkLink").href = url;
    $("#formOk").hidden = false;
    try { window.open(url, "_blank"); } catch (err) { /* o botão abaixo cobre esse caso */ }
  });
  $$("input, select, textarea", form).forEach(function (c) {
    c.addEventListener("input", function () {
      if (c.getAttribute("aria-invalid") === "true") erro(c, c.getAttribute("aria-describedby"), "");
    });
  });

  /* ===== Animações (GSAP + ScrollTrigger) ===== */
  if (!temGsap) return;
  gsap.registerPlugin(ScrollTrigger);

  // Divide títulos em palavras para revelar linha a linha
  function dividir(el) {
    Array.prototype.slice.call(el.childNodes).forEach(function (n) {
      if (n.nodeType === 3) {
        var frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(function (parte) {
          if (!parte) return;
          if (/^\s+$/.test(parte)) { frag.appendChild(document.createTextNode(parte)); return; }
          var w = document.createElement("span"); w.className = "w";
          var wi = document.createElement("span"); wi.className = "wi"; wi.textContent = parte;
          w.appendChild(wi); frag.appendChild(w);
        });
        n.parentNode.replaceChild(frag, n);
      } else if (n.nodeType === 1) dividir(n);
    });
  }
  $$(".split").forEach(function (h) {
    dividir(h);
    gsap.from($$(".wi", h), {
      yPercent: 115, rotate: 4, duration: 1, ease: "power4.out", stagger: 0.06,
      scrollTrigger: { trigger: h, start: "top 88%" }
    });
  });

  // Capa: sequência de entrada
  var tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.from(".site-header", { y: -30, opacity: 0, duration: 0.8 })
    .from(".hero .eyebrow", { y: 24, opacity: 0, duration: 0.7 }, "-=0.4")
    .from(".hero h1 .l1", { y: 60, opacity: 0, duration: 0.9 }, "-=0.4")
    .from(".hero h1 .lit", { y: 60, scale: 0.94, duration: 1 }, "-=0.6")
    .from(".hero .lead", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
    .from(".hero .actions .btn", { y: 24, opacity: 0, stagger: 0.12, duration: 0.7 }, "-=0.5")
    .from(".faixa", { yPercent: 100, duration: 0.9 }, "-=0.6");

  // Capa: parallax do fundo, do texto e dos elementos gráficos
  gsap.to(".hero-bg", { yPercent: 16, scale: 1.08, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  gsap.to(".hero-inner", { y: -90, opacity: 0.2, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  $$(".mark").forEach(function (m, i) {
    gsap.to(m, { y: -80 - i * 50, rotation: i % 2 ? -120 : 120, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  });
  gsap.to(".glow-orb.o1", { x: -60, y: 40, duration: 6, yoyo: true, repeat: -1, ease: "sine.inOut" });
  gsap.to(".glow-orb.o2", { x: 80, y: -30, duration: 7, yoyo: true, repeat: -1, ease: "sine.inOut" });

  // Textos e blocos aparecendo na rolagem
  $$(".reveal").forEach(function (el) {
    gsap.from(el, { y: 50, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } });
  });
  $$(".from-right").forEach(function (el) {
    gsap.from(el, { x: 120, rotation: 10, opacity: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } });
  });

  // Revelação de imagem com zoom
  $$(".reveal-img").forEach(function (box) {
    var img = $("img", box);
    gsap.timeline({ scrollTrigger: { trigger: box, start: "top 85%" } })
      .fromTo(box, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.3, ease: "power4.inOut" })
      .fromTo(img, { scale: 1.35 }, { scale: 1, duration: 1.6, ease: "power3.out" }, 0);
  });

  // Serviços: rolagem horizontal fixada no desktop
  var mm = gsap.matchMedia();
  mm.add("(min-width: 900px)", function () {
    document.documentElement.classList.add("js-pin");
    var track = $("#svcTrack");
    var dist = function () { return Math.max(0, track.scrollWidth - window.innerWidth); };
    var mov = gsap.to(track, {
      x: function () { return -dist(); }, ease: "none",
      scrollTrigger: { trigger: ".svc-pin", start: "top top", end: function () { return "+=" + dist(); }, pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 }
    });
    $$(".svc").forEach(function (card) {
      gsap.fromTo($(".svc-media img", card), { xPercent: -7 }, {
        xPercent: 7, ease: "none",
        scrollTrigger: { trigger: card, containerAnimation: mov, start: "left right", end: "right left", scrub: true }
      });
      gsap.from(card, {
        y: 80, rotation: 2, opacity: 0.3, ease: "power2.out",
        scrollTrigger: { trigger: card, containerAnimation: mov, start: "left 95%", end: "left 55%", scrub: true }
      });
    });
    return function () { document.documentElement.classList.remove("js-pin"); };
  });
  mm.add("(max-width: 899px)", function () {
    $$(".svc").forEach(function (card, i) {
      gsap.from(card, { x: i % 2 ? 60 : -60, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 88%" } });
    });
  });

  // Sobre: transição de cor do fundo e texto vazado acompanhando a rolagem
  gsap.fromTo("#sobre", { backgroundColor: "#04060e" }, {
    backgroundColor: "#0a1a63", ease: "none",
    scrollTrigger: { trigger: "#sobre", start: "top 75%", end: "center center", scrub: true }
  });
  gsap.fromTo(".about-ghost", { xPercent: 0 }, { xPercent: -35, ease: "none", scrollTrigger: { trigger: "#sobre", start: "top bottom", end: "bottom top", scrub: true } });
  gsap.to(".about-media .float", { yPercent: -18, ease: "none", scrollTrigger: { trigger: "#sobre", start: "top bottom", end: "bottom top", scrub: true } });

  // Portfólio: entrada em lote
  gsap.set(".g-item", { opacity: 0, y: 60 });
  ScrollTrigger.batch(".g-item", {
    start: "top 92%",
    onEnter: function (b) { gsap.to(b, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out", overwrite: true }); }
  });

  // Diferenciais: ícones desenhados
  $$(".perk-icon svg").forEach(function (svg) {
    var paths = $$("path", svg);
    paths.forEach(function (p) { p.setAttribute("pathLength", "1"); });
    gsap.fromTo(paths, { strokeDasharray: 1, strokeDashoffset: 1 }, {
      strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut", stagger: 0.15,
      scrollTrigger: { trigger: svg, start: "top 90%" }
    });
  });

  // Chamada: parallax e zoom
  gsap.fromTo(".cta-bg", { yPercent: -10, scale: 1.15 }, { yPercent: 10, scale: 1, ease: "none", scrollTrigger: { trigger: ".cta", start: "top bottom", end: "bottom top", scrub: true } });

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
})();
