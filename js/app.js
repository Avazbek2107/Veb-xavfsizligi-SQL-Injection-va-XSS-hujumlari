/* =========================================================
   Veb xavfsizligi — platforma mantig'i
   Marshrutlar: #/  #/dars/<id>  #/test  #/kodlar
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Yordamchilar ---------- */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;" }[c]));
  const DARSLAR = [];
  KURS.modullar.forEach((m, mi) => m.darslar.forEach((d) => DARSLAR.push(Object.assign(d, { modul: m, mi }))));
  const darsTop = (id) => DARSLAR.find((d) => d.id === id);
  const KODLAR = window.KODLAR || {};

  /* ---------- Holat (localStorage, xatoga chidamli) ---------- */
  const KEY = "vx_holat_v1";
  let holat = { done: {}, quiz: {}, final: null };
  try { holat = Object.assign(holat, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) { /* bo'sh */ }
  const saqla = () => { try { localStorage.setItem(KEY, JSON.stringify(holat)); } catch (e) { /* e'tiborsiz */ } };

  function progressYangila() {
    const n = DARSLAR.filter((d) => holat.done[d.id]).length;
    const p = Math.round((n / DARSLAR.length) * 100);
    $("#pbar").style.width = p + "%";
    $("#ptxt").textContent = `${n}/${DARSLAR.length} dars`;
  }

  /* ---------- Sintaksisni ranglash ---------- */
  const KW = {
    python: "and as assert async await break class continue def del elif else except False finally for from global if import in is lambda None nonlocal not or pass raise return True try while with yield",
    sql: "select from where and or not union all insert into values update set delete drop table create integer text primary key order by group having limit like null as join on if exists",
    javascript: "const let var function return if else for while new this typeof instanceof try catch finally throw class extends import export from of in true false null undefined async await",
    bash: "python cd ls echo",
    http: "GET POST HTTP Host Cookie Content-Type User-Agent"
  };
  const BI = "print len range open str int dict list set tuple enumerate sum max min isinstance super chr ord re html hashlib hmac os sys sqlite3 document location window console fetch JSON";
  function ranglash(code, lang) {
    lang = (lang || "text").toLowerCase();
    if (lang === "text") return esc(code);
    const kw = new Set((KW[lang] || "").split(" ").map((w) => (lang === "sql" ? w.toLowerCase() : w)));
    const bi = new Set(BI.split(" "));
    const com = lang === "python" || lang === "bash" ? /^#.*/ : lang === "sql" ? /^--.*/ : lang === "javascript" ? /^\/\/.*/ : null;
    let out = "", i = 0;
    while (i < code.length) {
      const rest = code.slice(i);
      let m;
      if (com && (m = rest.match(com))) { out += `<span class="tok-com">${esc(m[0])}</span>`; i += m[0].length; continue; }
      if ((m = rest.match(/^[rbfRBF]{0,2}("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`)/)) && lang !== "http") {
        out += `<span class="tok-str">${esc(m[0])}</span>`; i += m[0].length; continue;
      }
      if ((m = rest.match(/^\d[\d_]*(\.\d+)?/))) { out += `<span class="tok-num">${m[0]}</span>`; i += m[0].length; continue; }
      if ((m = rest.match(/^[A-Za-z_][\w-]*/))) {
        let w = m[0];
        if (lang !== "http" && w.includes("-")) w = w.split("-")[0];
        const k = lang === "sql" ? w.toLowerCase() : w;
        const next = code.slice(i + w.length).trimStart()[0];
        if (kw.has(k)) out += `<span class="tok-kw">${esc(w)}</span>`;
        else if (bi.has(w)) out += `<span class="tok-bi">${esc(w)}</span>`;
        else if (next === "(") out += `<span class="tok-fn">${esc(w)}</span>`;
        else out += esc(w);
        i += w.length; continue;
      }
      out += esc(code[i]); i++;
    }
    return out;
  }

  /* ---------- Bloklarni chizish ---------- */
  function kodBlok(b) {
    const code = b.file ? (KODLAR[b.file] || "# fayl topilmadi: " + b.file) : b.code;
    const title = b.file ? `📄 ${b.file}` : (b.title || "");
    const yuklash = b.file ? `<a class="btn sm light" href="python/${b.file}" download>⬇ Yuklab olish</a>` : "";
    const id = "c" + Math.random().toString(36).slice(2, 9);
    return `<div class="example ${b.kind || ""}">
      <div class="ex-title">${b.kind === "bad" || b.kind === "good" ? "Misol" : "Kod"}</div>
      ${title ? `<p>${esc(title)}</p>` : ""}
      <div class="codebox"><div class="code-head"><span class="lang">${esc(b.lang || "text")}</span>${yuklash}<button class="copy" data-copy="${id}">Nusxa olish</button></div>
      <pre id="${id}">${ranglash(code, b.lang)}</pre></div></div>`;
  }

  function blokHTML(b) {
    switch (b.t) {
      case "p": return `<p>${b.h}</p>`;
      case "h2": return `<h2>${b.h}</h2>`;
      case "h3": return `<h3>${b.h}</h3>`;
      case "list": return `<ul>${b.items.map((x) => `<li>${x}</li>`).join("")}</ul>`;
      case "img": return `<figure class="diagram"><img src="${b.src}" alt="${esc(b.cap)}" loading="lazy"><figcaption>${esc(b.cap)}</figcaption></figure>`;
      case "note": return `<div class="callout ${b.k}"><b>${b.title}</b>${b.h}</div>`;
      case "algo": return `<div class="algo"><div class="algo-head">⚙ Algoritm: ${b.title}</div><ol>${b.steps.map((s) => `<li>${s}</li>`).join("")}</ol></div>`;
      case "table": return `<table><thead><tr>${b.head.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
      case "code": return kodBlok(b);
      case "lab": return `<div class="lab" data-lab="${b.id}"></div>`;
      case "gloss": return `<div class="gloss">${b.items.map(([a, c]) => `<div><b>${a}</b><br>${c}</div>`).join("")}</div>`;
      default: return "";
    }
  }

  /* ---------- Test (dars oxirida va yakuniy) ---------- */
  function testHTML(savollar, nom) {
    return `<div class="quiz" data-quiz="${nom}"><h2>📝 ${nom === "final" ? "Yakuniy test" : "O'zingizni tekshiring"}</h2>
      ${savollar.map((s, i) => `<div class="q" data-a="${s.a}"><div class="q-text">${i + 1}. ${s.q}</div>
        ${s.o.map((o, j) => `<button class="opt" data-j="${j}">${String.fromCharCode(65 + j)}) ${esc(o)}</button>`).join("")}
        <div class="explain">💡 ${s.e}</div></div>`).join("")}
      <div class="quiz-score"></div></div>`;
  }
  function testUlash(root, onFinish) {
    const qs = $$(".q", root);
    const score = $(".quiz-score", root);
    let togri = 0, javob = 0;
    qs.forEach((q) => {
      $$(".opt", q).forEach((btn) => btn.addEventListener("click", () => {
        if (q.classList.contains("answered")) return;
        q.classList.add("answered");
        const a = +q.dataset.a, j = +btn.dataset.j;
        $$(".opt", q).forEach((b) => (b.disabled = true));
        $$(".opt", q)[a].classList.add("right");
        if (j !== a) btn.classList.add("wrong"); else togri++;
        javob++;
        score.textContent = `Natija: ${togri} / ${qs.length}` + (javob === qs.length ? (togri === qs.length ? " 🎉 A'lo!" : togri / qs.length >= 0.7 ? " 👍 Yaxshi!" : " 📖 Darsni qayta ko'rib chiqing") : "");
        if (javob === qs.length && onFinish) onFinish(togri, qs.length);
      }));
    });
  }

  /* ---------- Sahifalar ---------- */
  function sidebarHTML(aktiv) {
    return `<h4>Kurs mundarijasi</h4>` + KURS.modullar.map((m, mi) =>
      `<div class="nm-title">${m.icon} ${mi + 1}. ${m.toliq}</div>` +
      m.darslar.map((d) => `<a class="nav-lesson ${d.id === aktiv ? "active" : ""} ${holat.done[d.id] ? "done" : ""}" href="#/dars/${d.id}"><span class="dot"></span>${d.id} ${d.nomi}</a>`).join("")
    ).join("") +
    `<div class="nm-title">🎯 Yakunlash</div>
     <a class="nav-lesson ${aktiv === "kodlar" ? "active" : ""}" href="#/kodlar"><span class="dot"></span>Python kodlar</a>
     <a class="nav-lesson ${aktiv === "test" ? "active" : ""} ${holat.final != null ? "done" : ""}" href="#/test"><span class="dot"></span>Yakuniy test</a>`;
  }

  function subnavYangila(modulId) {
    $("#subnav").innerHTML = `<a href="#/" class="${modulId === "home" ? "active" : ""}">BOSH SAHIFA</a>` +
      KURS.modullar.map((m) => `<a href="#/dars/${m.darslar[0].id}" class="${m.id === modulId ? "active" : ""}">${m.nomi.toUpperCase()}</a>`).join("") +
      `<a href="#/kodlar" class="${modulId === "kodlar" ? "active" : ""}">PYTHON KODLAR</a><a href="#/test" class="${modulId === "test" ? "active" : ""}">YAKUNIY TEST</a>`;
  }

  const MUALLIF = "Rejabaliyeva Pokiza Qulmamatovna";
  const FOOTER = `<footer class="footer"><b>Veb xavfsizligi</b> — SQL Injection va XSS bo'yicha o'quv platformasi<br>Ishlab chiquvchi: <b>${MUALLIF}</b> · © ${new Date().getFullYear()}<br><small>Barcha misollar faqat ta'lim maqsadida va o'z kompyuteringizda sinash uchun.</small></footer>`;

  function layout(aktiv, ichki) {
    return `<div class="layout"><nav class="sidebar" id="sidebar">${sidebarHTML(aktiv)}</nav><main class="main">${ichki}</main></div>${FOOTER}`;
  }

  function bosh() {
    subnavYangila("home");
    const ranglar = ["green", "yellow", "pink", "gray"];
    const misollar = {
      kirish: { t: "Kiritish nuqtasi", c: "GET /search?q=kitob HTTP/1.1\nCookie: sessiya=a8f3c2e1d9", l: "http" },
      sqli: { t: "Zaif va xavfsiz so'rov", c: "# Zaif\nsql = f\"SELECT * FROM users WHERE id = {uid}\"\n\n# Xavfsiz\ncur.execute(\"SELECT * FROM users WHERE id = ?\", (uid,))", l: "python" },
      xss: { t: "Ekranlash", c: "import html\nizoh = \"<script>alert(1)</script>\"\nprint(html.escape(izoh))\n# &lt;script&gt;alert(1)&lt;/script&gt;", l: "python" },
      amaliyot: { t: "Mini-WAF", c: "qaror, ball, qoidalar = tahlil(\"1 OR 1=1\")\nprint(qaror)   # BLOKLASH", l: "python" }
    };
    const bands = KURS.modullar.map((m, i) => {
      const mis = misollar[m.id];
      const n = m.darslar.filter((d) => holat.done[d.id]).length;
      return `<section class="band ${ranglar[i % ranglar.length]}"><div class="band-inner">
        <div class="band-center">
          <h2>${m.nomi}</h2>
          <p class="lead">${m.tavsif}</p>
          <ul class="lessons">${m.darslar.map((d) => `<li><a href="#/dars/${d.id}">${holat.done[d.id] ? "✅" : "▫️"} ${d.id} ${d.nomi}</a></li>`).join("")}</ul>
          <div class="btns"><a class="btn" href="#/dars/${m.darslar[0].id}">${n ? "Davom ettirish" : `${m.nomi}ni o'rganish`}</a>
          <a class="btn dark" href="#/dars/${m.darslar[m.darslar.length - 1].id}">Amaliy misollar</a></div>
        </div>
        <div class="side-box"><h3>Misol: ${mis.t}</h3><div class="codebox"><pre>${ranglash(mis.c, mis.l)}</pre></div>
          <div style="margin-top:12px"><a class="btn sm" href="#/dars/${m.darslar[0].id}">Sinab ko'ring ❯</a></div></div>
      </div></section>`;
    }).join("");

    $("#app").innerHTML = `<main class="main full">
      <section class="hero">
        <h1>Veb <span>xavfsizligi</span></h1>
        <p>SQL Injection va XSS hujumlarini noldan o'rganing: tushunarli darslar, algoritmlar, chizmalar, Python kodlar va brauzerda ishlaydigan simulyatorlar.</p>
        <form class="hero-search" id="qidiruv" autocomplete="off"><input id="qinput" placeholder="Mavzu qidirish: masalan, UNION, CSP, blind..." aria-label="Qidirish"><button>🔍</button></form>
        <div class="search-results" id="qnatija"></div>
        <a class="btn" href="#/dars/1-1">Kursni boshlash ❯</a>
      </section>
      ${bands}
      <section class="band"><div style="max-width:1140px;margin:0 auto">
        <h2 style="text-align:center;font-size:38px;margin-bottom:24px">Kursda nimalar bor?</h2>
        <div class="features">
          <div class="feature"><div class="fi">📚</div><h4>${DARSLAR.length} ta dars</h4><p>4 modul: asoslar, SQL Injection, XSS va amaliyot.</p></div>
          <div class="feature"><div class="fi">⚙️</div><h4>Algoritmlar</h4><p>Har bir hujum va himoya bosqichma-bosqich algoritm sifatida.</p></div>
          <div class="feature"><div class="fi">🖼️</div><h4>11 ta chizma</h4><p>Arxitektura, ketma-ketlik va blok-sxemalar.</p></div>
          <div class="feature"><div class="fi">🐍</div><h4>8 ta Python dastur</h4><p>Ishga tushirsa bo'ladigan, izohli kodlar.</p></div>
          <div class="feature"><div class="fi">🧪</div><h4>4 ta simulyator</h4><p>SQLi, XSS, ekranlash va WAF brauzerda xavfsiz.</p></div>
          <div class="feature"><div class="fi">📝</div><h4>Testlar</h4><p>Har dars oxirida test va yakuniy imtihon.</p></div>
        </div></div></section>
      <section class="band dark band-center"><h2>Yakuniy test</h2><p class="lead">Kurs bo'yicha 15 ta tasodifiy savol. ${holat.final != null ? `Eng yaxshi natijangiz: <b>${holat.final}%</b>` : "Bilimingizni sinab ko'ring."}</p>
        <a class="btn" href="#/test">Testni boshlash ❯</a></section>
      <section class="band gray" id="muallif"><div class="band-inner">
        <div class="band-center"><h2>Muallif haqida</h2>
          <p class="lead">Ushbu o'quv platformasi <b>${MUALLIF}</b> tomonidan ishlab chiqilgan.</p>
          <p>Platforma "Veb xavfsizligi: SQL Injection va XSS hujumlari" mavzusini o'rganish uchun mo'ljallangan.</p></div>
        <div class="side-box author-card"><div class="avatar">RP</div><h3>${MUALLIF}</h3><p>Ishlab chiquvchi</p>
          <p style="font-size:14px;color:#5a6270;margin:0">HTML · CSS · JavaScript · Python</p></div>
      </div></section>
      ${FOOTER}
    </main>`;

    const inp = $("#qinput"), nat = $("#qnatija");
    const izla = () => {
      const q = inp.value.trim().toLowerCase();
      if (q.length < 2) { nat.innerHTML = ""; return; }
      const topildi = DARSLAR.filter((d) => (d.nomi + " " + JSON.stringify(d.bloklar)).toLowerCase().includes(q)).slice(0, 6);
      nat.innerHTML = topildi.length ? topildi.map((d) => `<a href="#/dars/${d.id}">${d.id} ${esc(d.nomi)} <small>· ${esc(d.modul.toliq)}</small></a>`).join("") : `<a>Hech narsa topilmadi</a>`;
    };
    inp.addEventListener("input", izla);
    $("#qidiruv").addEventListener("submit", (e) => { e.preventDefault(); const a = $("#qnatija a[href]"); if (a) location.hash = a.getAttribute("href"); });
  }

  function darsSahifa(id) {
    const d = darsTop(id);
    if (!d) return bosh();
    subnavYangila(d.modul.id);
    const i = DARSLAR.indexOf(d);
    const old = DARSLAR[i - 1], kel = DARSLAR[i + 1];
    const pager = `<div class="pager">
      <a class="btn ${old ? "" : "hidden"}" href="#/dars/${old ? old.id : ""}">❮ Oldingi</a>
      ${kel ? `<a class="btn" href="#/dars/${kel.id}">Keyingi ❯</a>` : `<a class="btn" href="#/test">Yakuniy test ❯</a>`}</div>`;
    const ichki = `
      <div class="lesson-head"><h1>${d.id.replace("-", ".")} <span>${d.nomi}</span></h1>
      <div class="meta"><span class="chip">${d.modul.icon} ${d.modul.toliq}</span><span class="chip">⏱ ${d.vaqt} daqiqa</span>${holat.done[d.id] ? '<span class="chip">✅ O\'qilgan</span>' : ""}</div></div>
      ${pager}<hr class="sep">
      <div class="goals"><h3>🎯 Dars maqsadlari</h3><ul>${d.maqsad.map((x) => `<li>${x}</li>`).join("")}</ul></div>
      <div class="content">${d.bloklar.map(blokHTML).join("")}</div>
      ${testHTML(d.test, d.id)}
      <div class="done-row"><button class="btn done-btn ${holat.done[d.id] ? "is-done" : ""}" id="doneBtn">${holat.done[d.id] ? "✓ Dars tugatilgan" : "Darsni tugatdim ✓"}</button></div>
      <hr class="sep">${pager}`;
    $("#app").innerHTML = layout(d.id, ichki);
    testUlash($(".quiz"), (t, n) => { holat.quiz[d.id] = Math.round((t / n) * 100); holat.done[d.id] = true; saqla(); progressYangila(); doneBtnYangila(); sidebarYangila(d.id); });
    const doneBtnYangila = () => { const b = $("#doneBtn"); b.classList.toggle("is-done", !!holat.done[d.id]); b.textContent = holat.done[d.id] ? "✓ Dars tugatilgan" : "Darsni tugatdim ✓"; };
    $("#doneBtn").addEventListener("click", () => { holat.done[d.id] = !holat.done[d.id]; saqla(); progressYangila(); doneBtnYangila(); sidebarYangila(d.id); });
    $$("[data-lab]").forEach((el) => LABS[el.dataset.lab] && LABS[el.dataset.lab](el));
  }
  function sidebarYangila(aktiv) { const s = $("#sidebar"); if (s) s.innerHTML = sidebarHTML(aktiv); }

  function yakuniyTest() {
    subnavYangila("test");
    const hammasi = DARSLAR.flatMap((d) => d.test);
    for (let i = hammasi.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [hammasi[i], hammasi[j]] = [hammasi[j], hammasi[i]]; }
    const tanlov = hammasi.slice(0, 15);
    $("#app").innerHTML = layout("test", `<div class="lesson-head"><h1>Yakuniy <span>test</span></h1>
      <div class="meta"><span class="chip">15 ta savol</span><span class="chip">Barcha modullardan</span>${holat.final != null ? `<span class="chip">Eng yaxshi natija: ${holat.final}%</span>` : ""}</div></div>
      <div class="callout info"><b>Qoidalar</b>Har bir savolga bitta javob. Javob tanlangach, to'g'ri variant va izoh ko'rsatiladi. Sahifani yangilasangiz, yangi savollar to'plami chiqadi.</div>
      ${testHTML(tanlov, "final")}<div class="pager"><a class="btn" href="#/test" id="qayta">↻ Qaytadan</a><a class="btn dark" href="#/">Bosh sahifa</a></div>`);
    testUlash($(".quiz"), (t, n) => { const p = Math.round((t / n) * 100); holat.final = Math.max(holat.final || 0, p); saqla(); sidebarYangila("test"); });
    $("#qayta").addEventListener("click", (e) => { e.preventDefault(); yakuniyTest(); window.scrollTo(0, 0); });
  }

  function kodlarSahifa() {
    subnavYangila("kodlar");
    const tavsif = {
      "01_sqli_zaif_login.py": "Zaif login va 5 xil SQLi hujumi (izoh, tautologiya, UNION).",
      "02_sqli_himoya.py": "Parametrlangan so'rov, validatsiya va parol xeshlash.",
      "03_blind_sqli_binar.py": "Boolean blind SQLi: binar qidiruv algoritmi.",
      "04_xss_ekranlash.py": "html.escape() bilan XSS'ni to'xtatish, zaif.html va xavfsiz.html.",
      "05_xss_mehmonlar_kitobi.py": "Stored XSS laboratoriyasi: lokal veb server, zaif va xavfsiz rejim.",
      "06_hujum_aniqlovchi.py": "Mini-WAF: normallashtirish va ballga asoslangan aniqlash.",
      "07_html_sanitizer.py": "Oq ro'yxatli HTML tozalovchi.",
      "08_xavfsizlik_sarlavhalari.py": "CSP va HttpOnly cookie sarlavhalari."
    };
    const fayllar = Object.keys(KODLAR);
    $("#app").innerHTML = layout("kodlar", `<div class="lesson-head"><h1>Python <span>kodlar</span></h1>
      <div class="meta"><span class="chip">${fayllar.length} ta dastur</span><span class="chip">Python 3.8+</span><span class="chip">Tashqi kutubxona shart emas</span></div></div>
      <div class="callout info"><b>Qanday ishga tushiriladi?</b>Fayllar <code>python/</code> papkasida. Terminalda shu papkaga o'tib: <code>python 01_sqli_zaif_login.py</code></div>
      <table class="content"><thead><tr><th>Fayl</th><th>Tavsif</th></tr></thead><tbody>${fayllar.map((f) => `<tr><td><a href="#k-${f}">${f}</a></td><td>${tavsif[f] || ""}</td></tr>`).join("")}</tbody></table>
      <div class="content">${fayllar.map((f) => `<h2 id="k-${f}">${f}</h2><p>${tavsif[f] || ""}</p>${kodBlok({ file: f, lang: "python" })}`).join("")}</div>`);
    $$('a[href^="#k-"]').forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); document.getElementById(a.getAttribute("href").slice(1)).scrollIntoView(); }));
  }

  /* =========================================================
     SIMULYATORLAR
     ========================================================= */
  const LABS = {};

  /* ---------- Mini SQL dvigatel (faqat SELECT, WHERE, UNION) ---------- */
  const JADVAL = { users: { cols: ["id", "login", "parol", "rol"], rows: [[1, "admin", "S3cr3t!", "administrator"], [2, "ali", "qwerty", "talaba"], [3, "vali", "12345", "talaba"]] } };
  function tokenlar(sql) {
    const t = []; let i = 0;
    while (i < sql.length) {
      const c = sql[i], r = sql.slice(i);
      if (/\s/.test(c)) { i++; continue; }
      if (r.startsWith("--") || c === "#") break;                     // izoh: qatorning qolgani
      if (r.startsWith("/*")) { const e = sql.indexOf("*/", i + 2); if (e < 0) break; i = e + 2; continue; }
      if (c === "'") {
        let j = i + 1, s = "";
        for (;;) {
          if (j >= sql.length) throw new Error(`unrecognized token: "${sql.slice(i, i + 20)}" (qo'shtirnoq yopilmagan)`);
          if (sql[j] === "'") { if (sql[j + 1] === "'") { s += "'"; j += 2; continue; } break; }
          s += sql[j++];
        }
        t.push({ k: "str", v: s }); i = j + 1; continue;
      }
      let m;
      if ((m = r.match(/^\d+(\.\d+)?/))) { t.push({ k: "num", v: +m[0] }); i += m[0].length; continue; }
      if ((m = r.match(/^[A-Za-z_]\w*/))) { t.push({ k: "id", v: m[0], u: m[0].toUpperCase() }); i += m[0].length; continue; }
      if ((m = r.match(/^(<>|!=|<=|>=|=|<|>|\(|\)|,|\*|;)/))) { t.push({ k: "op", v: m[0] }); i += m[0].length; continue; }
      throw new Error(`near "${c}": syntax error`);
    }
    return t;
  }
  function sqlBajar(sql) {
    const t = tokenlar(sql); let p = 0;
    const peek = () => t[p], kw = (w) => t[p] && t[p].k === "id" && t[p].u === w, op = (o) => t[p] && t[p].k === "op" && t[p].v === o;
    const kut = (w) => { if (!kw(w)) throw new Error(`near "${t[p] ? t[p].v : "oxir"}": syntax error (${w} kutilgan)`); p++; };
    function select() {
      kut("SELECT"); const cols = [];
      do { if (op("*")) { p++; cols.push({ star: true }); } else cols.push(ifoda()); } while (op(",") && ++p);
      let jad = null, where = null;
      if (kw("FROM")) { p++; const n = peek(); if (!n || n.k !== "id") throw new Error("jadval nomi kutilgan"); jad = JADVAL[n.v.toLowerCase()]; if (!jad) throw new Error(`no such table: ${n.v}`); p++; }
      if (kw("WHERE")) { p++; where = ifoda(); }
      const satrlar = jad ? jad.rows : [[]];
      const res = [];
      for (const r of satrlar) {
        const ctx = (nom) => { if (!jad) throw new Error(`no such column: ${nom}`); const k = jad.cols.indexOf(nom.toLowerCase()); if (k < 0) throw new Error(`no such column: ${nom}`); return r[k]; };
        if (where && !rost(where(ctx))) continue;
        const qator = [];
        cols.forEach((c) => { if (c.star) { if (!jad) throw new Error("FROM siz *"); qator.push(...r); } else qator.push(c(ctx)); });
        res.push(qator);
      }
      return res;
    }
    function ifoda() { let a = va(); while (kw("OR")) { p++; const x = a, y = va(); a = (c) => rost(x(c)) || rost(y(c)) ? 1 : 0; } return a; }
    function va() { let a = yoq(); while (kw("AND")) { p++; const x = a, y = yoq(); a = (c) => rost(x(c)) && rost(y(c)) ? 1 : 0; } return a; }
    function yoq() { if (kw("NOT")) { p++; const x = yoq(); return (c) => (rost(x(c)) ? 0 : 1); } return solish(); }
    function solish() {
      const a = asosiy();
      const o = peek();
      if (o && ((o.k === "op" && ["=", "<>", "!=", "<", ">", "<=", ">="].includes(o.v)) || (o.k === "id" && o.u === "LIKE"))) {
        p++; const b = asosiy(); const ov = o.k === "id" ? "LIKE" : o.v;
        return (c) => {
          let x = a(c), y = b(c);
          if (typeof x !== typeof y) { x = String(x); y = String(y); }
          switch (ov) {
            case "=": return x === y ? 1 : 0; case "<>": case "!=": return x !== y ? 1 : 0;
            case "<": return x < y ? 1 : 0; case ">": return x > y ? 1 : 0; case "<=": return x <= y ? 1 : 0; case ">=": return x >= y ? 1 : 0;
            case "LIKE": { const rx = new RegExp("^" + String(y).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/%/g, ".*").replace(/_/g, ".") + "$", "i"); return rx.test(String(x)) ? 1 : 0; }
          }
        };
      }
      return a;
    }
    function asosiy() {
      const n = peek();
      if (!n) throw new Error("incomplete input");
      if (n.k === "str" || n.k === "num") { p++; return () => n.v; }
      if (op("(")) { p++; const e = ifoda(); if (!op(")")) throw new Error("')' kutilgan"); p++; return e; }
      if (n.k === "id" && !["SELECT", "FROM", "WHERE", "AND", "OR", "UNION", "NOT"].includes(n.u)) {
        p++;
        if (n.u === "NULL") return () => null;
        return (c) => c(n.v);
      }
      throw new Error(`near "${n.v}": syntax error`);
    }
    let natija = select();
    while (kw("UNION")) {
      p++; if (kw("ALL")) p++;
      const b = select();
      if (natija.length && b.length && natija[0].length !== b[0].length) throw new Error("SELECTs to the left and right of UNION do not have the same number of result columns");
      natija = natija.concat(b);
    }
    if (op(";")) { p++; if (p < t.length) throw new Error("You can only execute one statement at a time (sqlite3 bir nechta so'rovni bajarmaydi)"); }
    if (p < t.length) throw new Error(`near "${t[p].v}": syntax error`);
    return natija;
  }
  function rost(v) { if (v === null) return false; if (typeof v === "number") return v !== 0; const n = parseFloat(v); return !isNaN(n) && n !== 0; }

  LABS.sqli = function (el) {
    let rejim = "zaif";
    el.innerHTML = `<div class="lab-head">🧪 Simulyator: Login forma va SQL so'rov</div><div class="lab-body">
      <div class="row"><span>Rejim:</span><div class="toggle"><button data-r="zaif" class="on">✗ Zaif (konkatenatsiya)</button><button data-r="xavfsiz">✓ Xavfsiz (parametr)</button></div></div>
      <label>Login</label><input type="text" id="sl" value="admin' --" spellcheck="false">
      <label>Parol</label><input type="text" id="sp" value="nimadir" spellcheck="false">
      <div class="row presets"><span style="font-size:13px;color:#5a6270">Tayyor yuklamalar:</span>
        <button data-l="ali" data-p="qwerty">ali / qwerty</button>
        <button data-l="admin' --" data-p="x">admin' --</button>
        <button data-l="' OR '1'='1" data-p="' OR '1'='1">' OR '1'='1</button>
        <button data-l="' OR 1=1 --" data-p="">' OR 1=1 --</button>
        <button data-l="' UNION SELECT id, login, parol FROM users --" data-p="">UNION SELECT</button>
        <button data-l="'" data-p="">'</button>
        <button data-l="'; DROP TABLE users; --" data-p="">DROP TABLE</button></div>
      <div class="out" id="sq"></div><div id="sr"></div></div>`;
    const L = $("#sl", el), P = $("#sp", el), Q = $("#sq", el), R = $("#sr", el);
    function yangila() {
      const l = L.value, pw = P.value;
      let sql, rows, xato = null;
      if (rejim === "zaif") {
        sql = "SELECT id, login, rol FROM users WHERE login = '" + l + "' AND parol = '" + pw + "'";
        Q.innerHTML = "SELECT id, login, rol FROM users WHERE login = '<span class='hl'>" + esc(l) + "</span>' AND parol = '<span class='hl'>" + esc(pw) + "</span>'";
        try { rows = sqlBajar(sql); } catch (e) { xato = e.message; }
      } else {
        Q.innerHTML = "SELECT id, login, rol FROM users WHERE login = ? AND parol = ?\n\nparametrlar = (<span class='param'>" + esc(JSON.stringify(l)) + "</span>, <span class='param'>" + esc(JSON.stringify(pw)) + "</span>)";
        rows = JADVAL.users.rows.filter((r) => r[1] === l && r[2] === pw).map((r) => [r[0], r[1], r[3]]);
      }
      if (xato) { R.innerHTML = `<div class="verdict bad">⚠ SQL xatosi: ${esc(xato)}</div><div style="font-size:13.5px;color:#5a6270">Xato xabari hujumchiga so'rov tuzilishini oshkor qiladi va zaiflik borligini tasdiqlaydi.</div>`; return; }
      const jad = rows.length ? `<table class="result-table"><tr><th>1-ustun</th><th>2-ustun</th><th>3-ustun</th></tr>${rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</table>` : "";
      const halol = JADVAL.users.rows.some((r) => r[1] === l && r[2] === pw);
      let v;
      if (!rows.length) v = `<div class="verdict good">Kirish rad etildi: login yoki parol noto'g'ri.</div>`;
      else if (halol) v = `<div class="verdict good">✓ To'g'ri login va parol: ${esc(rows[0][1])} tizimga kirdi.</div>`;
      else v = `<div class="verdict bad">✗ HUJUM MUVAFFAQIYATLI: parolsiz "${esc(rows[0][1])}" sifatida kirildi${rows.length > 1 ? `, so'rov ${rows.length} ta qator qaytardi` : ""}.</div>`;
      R.innerHTML = v + jad;
    }
    $$(".toggle button", el).forEach((b) => b.addEventListener("click", () => { rejim = b.dataset.r; $$(".toggle button", el).forEach((x) => x.classList.toggle("on", x === b)); yangila(); }));
    $$(".presets button", el).forEach((b) => b.addEventListener("click", () => { L.value = b.dataset.l; P.value = b.dataset.p; yangila(); }));
    L.addEventListener("input", yangila); P.addEventListener("input", yangila);
    yangila();
  };

  /* ---------- XSS simulyatori ---------- */
  LABS.xss = function (el) {
    let rejim = "zaif";
    el.innerHTML = `<div class="lab-head">🧪 Simulyator: Izohlar bo'limi</div><div class="lab-body">
      <div class="row"><span>Rejim:</span><div class="toggle"><button data-r="zaif" class="on">✗ Zaif (to'g'ridan-to'g'ri)</button><button data-r="xavfsiz">✓ Xavfsiz (html.escape)</button></div></div>
      <label>Izoh matni</label><textarea id="xi" rows="2" spellcheck="false"><b>Salom!</b> <img src=x onerror="alert(document.cookie)"></textarea>
      <div class="row presets"><span style="font-size:13px;color:#5a6270">Tayyor yuklamalar:</span>
        <button data-v="Ajoyib dars, rahmat!">oddiy matn</button>
        <button data-v="<b>Qalin</b> va <i>qiya</i>">&lt;b&gt;</button>
        <button data-v="<script>alert('XSS')</script>">&lt;script&gt;</button>
        <button data-v='<img src=x onerror="alert(document.cookie)">'>&lt;img onerror&gt;</button>
        <button data-v='<a href="javascript:alert(1)">Bosing</a>'>javascript: URL</button>
        <button data-v='<svg onload="alert(1)">'>&lt;svg onload&gt;</button></div>
      <label>Server qaytargan HTML kodi</label><div class="out" id="xo"></div>
      <label>Brauzerda ko'rinishi (xavfsiz sandbox ichida)</label><div class="preview-box"><iframe id="xf" sandbox="" style="width:100%;height:70px;border:0"></iframe></div>
      <div id="xv"></div></div>`;
    const I = $("#xi", el), O = $("#xo", el), F = $("#xf", el), V = $("#xv", el);
    function yangila() {
      const v = I.value;
      const tana = rejim === "zaif" ? v : esc(v);
      const htmlKod = `<div class="izoh">${tana}</div>`;
      O.innerHTML = rejim === "zaif" ? esc('<div class="izoh">') + `<span class="hl">${esc(tana)}</span>` + esc("</div>") : esc('<div class="izoh">') + `<span class="param">${esc(tana)}</span>` + esc("</div>");
      F.srcdoc = `<meta charset="utf-8"><style>body{font-family:Segoe UI,Arial;margin:6px;font-size:15px}</style>${htmlKod}`;
      const xavfli = [];
      let m;
      const rx1 = /<script\b[^>]*>([\s\S]*?)<\/script>/gi; while ((m = rx1.exec(v))) xavfli.push(["<script> tegi", m[1]]);
      const rx2 = /\s(on\w+)\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/gi; while ((m = rx2.exec(v))) xavfli.push([`${m[1]} hodisasi`, m[3] || m[4] || m[5]]);
      const rx3 = /(href|src)\s*=\s*["']?\s*javascript:([^"'>]*)/gi; while ((m = rx3.exec(v))) xavfli.push(["javascript: URL (bosilganda)", m[2]]);
      if (!xavfli.length) V.innerHTML = `<div class="verdict good">Bu kiritishda bajariladigan skript yo'q.</div>`;
      else if (rejim === "zaif") V.innerHTML = `<div class="verdict bad">✗ XSS! Haqiqiy saytda brauzer quyidagi kodni bajargan bo'lar edi:</div>` + xavfli.map(([t, k]) => `<div style="margin-top:6px"><span class="fake-alert">⚠ ${esc(t)}</span> <code>${esc(k)}</code></div>`).join("") + `<div style="font-size:13.5px;color:#5a6270;margin-top:6px">Masalan, <code>document.cookie</code> hujumchi serveriga yuborilishi mumkin edi.</div>`;
      else V.innerHTML = `<div class="verdict good">✓ Himoyalandi: ${xavfli.length} ta xavfli qism oddiy matnga aylantirildi, skript bajarilmaydi.</div>`;
    }
    $$(".toggle button", el).forEach((b) => b.addEventListener("click", () => { rejim = b.dataset.r; $$(".toggle button", el).forEach((x) => x.classList.toggle("on", x === b)); yangila(); }));
    $$(".presets button", el).forEach((b) => b.addEventListener("click", () => { I.value = b.dataset.v; yangila(); }));
    I.addEventListener("input", yangila);
    yangila();
  };

  /* ---------- Kontekstli ekranlash ---------- */
  LABS.escape = function (el) {
    el.innerHTML = `<div class="lab-head">🧪 Simulyator: Bir qiymat, turli kontekstlar</div><div class="lab-body">
      <label>Foydalanuvchi qiymati</label><input type="text" id="ei" value="&quot; onmouseover=&quot;alert(1)" spellcheck="false">
      <div class="row presets"><span style="font-size:13px;color:#5a6270">Sinab ko'ring:</span>
        <button data-v='" onmouseover="alert(1)'>" onmouseover=</button>
        <button data-v="</script><script>alert(1)</script>">&lt;/script&gt;</button>
        <button data-v="javascript:alert(1)">javascript:</button>
        <button data-v="Ali & Vali <3">Ali &amp; Vali &lt;3</button></div>
      <table class="result-table" id="et"></table></div>`;
    const I = $("#ei", el), T = $("#et", el);
    const yangila = () => {
      const v = I.value;
      const js = JSON.stringify(v).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");
      const sxema = /^\s*(https?:|mailto:|\/|#)/i.test(v) || !/^\s*[a-z][\w+.-]*:/i.test(v);
      const qatorlar = [
        ["HTML matni", "html.escape(x)", `&lt;p&gt;${esc(esc(v))}&lt;/p&gt;`],
        ["HTML atributi", "html.escape(x, quote=True)", `&lt;input value="${esc(esc(v))}"&gt;`],
        ["JavaScript", "json.dumps(x) + &lt; &gt; &amp; → \\u…", `let a = ${esc(js)};`],
        ["URL parametri", "urllib.parse.quote(x)", `/qidiruv?q=${esc(encodeURIComponent(v))}`],
        ["To'liq URL (href)", "sxemani tekshirish", sxema ? `<span style="color:#167a4c">✓ ruxsat</span> (keyin atribut sifatida ekranlanadi): ${esc(esc(v))}` : `<span style="color:#e5484d">✗ rad etildi: xavfli sxema</span> → <code>#</code>`]
      ];
      T.innerHTML = `<tr><th>Kontekst</th><th>Funksiya</th><th>Natija</th></tr>` + qatorlar.map((r) => `<tr><td><b>${r[0]}</b></td><td><code>${r[1]}</code></td><td style="font-family:Consolas,monospace">${r[2]}</td></tr>`).join("");
    };
    $$(".presets button", el).forEach((b) => b.addEventListener("click", () => { I.value = b.dataset.v; yangila(); }));
    I.addEventListener("input", yangila); yangila();
  };

  /* ---------- Mini-WAF ---------- */
  const QOIDALAR = [
    ["Izoh belgisi", "SQLi", /(--|#|\/\*)/, 2],
    ["Tautologiya OR 1=1", "SQLi", /\bor\b\s+['"]?\w+['"]?\s*=\s*['"]?\w+/, 4],
    ["UNION SELECT", "SQLi", /\bunion\b(\s+all)?\s+\bselect\b/, 5],
    ["Stacked query", "SQLi", /;\s*(drop|delete|insert|update|create)\b/, 5],
    ["Vaqt funksiyasi", "SQLi", /\b(sleep|benchmark|pg_sleep|waitfor)\b/, 4],
    ["Qo'shtirnoq yopilishi", "SQLi", /'\s*(or|and)\b/, 3],
    ["Qo'shtirnoq + izoh", "SQLi", /'\s*(--|#|\/\*)/, 3],
    ["<script> tegi", "XSS", /<\s*script\b/, 5],
    ["Hodisa atributi", "XSS", /\bon\w+\s*=/, 4],
    ["javascript: URL", "XSS", /javascript\s*:/, 4],
    ["Xavfli teglar", "XSS", /<\s*(iframe|svg|object|embed|img)\b/, 2]
  ];
  function entityDecode(s) {
    return s.replace(/&(#x[0-9a-f]+|#\d+|lt|gt|amp|quot|apos|#39);/gi, (m, e) => {
      e = e.toLowerCase();
      if (e[0] === "#") { const n = e[1] === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10); return isFinite(n) ? String.fromCodePoint(n) : m; }
      return { lt: "<", gt: ">", amp: "&", quot: '"', apos: "'" }[e] || m;
    });
  }
  function normallash(s) {
    let old = null, qadam = [];
    while (old !== s && qadam.length < 6) {
      old = s;
      try { s = decodeURIComponent(s.replace(/\+/g, " ")); } catch (e) { /* noto'g'ri kodlash */ }
      s = entityDecode(s);
      if (s !== old) qadam.push(s);
    }
    return { matn: s.replace(/\s+/g, " ").toLowerCase(), qadam };
  }
  LABS.waf = function (el) {
    el.innerHTML = `<div class="lab-head">🧪 Simulyator: Mini-WAF (chegara: 4 ball)</div><div class="lab-body">
      <label>Kiruvchi so'rov qiymati</label><input type="text" id="wi" value="%27%20UNION%20SELECT%20login%2Cparol%20FROM%20users--" spellcheck="false">
      <div class="row presets"><span style="font-size:13px;color:#5a6270">Namunalar:</span>
        ${["Toshkent shahri", "O'zbekiston", "admin' --", "1 OR 1=1", "%27%20UNION%20SELECT%20login%2Cparol%20FROM%20users--", "<ScRiPt>alert(1)</script>", "&lt;img src=x onerror=alert(1)&gt;", "1; DROP TABLE users", "<img> tegida onclick= nima qiladi?"].map((x) => `<button data-v="${esc(x)}">${esc(x.length > 26 ? x.slice(0, 24) + "…" : x)}</button>`).join("")}</div>
      <label>Normallashtirilgan matn</label><div class="out" id="wn"></div><div id="wr"></div></div>`;
    const I = $("#wi", el), N = $("#wn", el), R = $("#wr", el);
    const yangila = () => {
      const { matn, qadam } = normallash(I.value);
      N.textContent = matn + (qadam.length ? `\n(decode qadamlari: ${qadam.length})` : "");
      const top = QOIDALAR.filter((q) => q[2].test(matn));
      const ball = top.reduce((s, q) => s + q[3], 0);
      const blok = ball >= 4;
      R.innerHTML = `<div class="verdict ${blok ? "bad" : "good"}">${blok ? "⛔ BLOKLASH" : "✓ RUXSAT"} — jami ball: ${ball}</div>` +
        (top.length ? `<table class="result-table"><tr><th>Qoida</th><th>Turi</th><th>Ball</th></tr>${top.map((q) => `<tr><td>${esc(q[0])}</td><td>${q[1]}</td><td>+${q[3]}</td></tr>`).join("")}</table>` : `<div style="font-size:13.5px;color:#5a6270">Hech bir qoida ishlamadi.</div>`);
    };
    $$(".presets button", el).forEach((b) => b.addEventListener("click", () => { I.value = b.dataset.v; yangila(); }));
    I.addEventListener("input", yangila); yangila();
  };

  /* ---------- Marshrutizator ---------- */
  function yonalt() {
    const h = location.hash || "#/";
    const m = h.match(/^#\/dars\/([\w-]+)/);
    $("#sidebar") && $("#sidebar").classList.remove("open");
    if (m) darsSahifa(m[1]);
    else if (h.startsWith("#/test")) yakuniyTest();
    else if (h.startsWith("#/kodlar")) kodlarSahifa();
    else bosh();
    window.scrollTo(0, 0);
    progressYangila();
  }
  window.addEventListener("hashchange", yonalt);

  /* ---------- Umumiy hodisalar ---------- */
  document.addEventListener("click", (e) => {
    const c = e.target.closest("[data-copy]");
    if (c) {
      const txt = document.getElementById(c.dataset.copy).innerText;
      const ok = () => { c.textContent = "Nusxalandi ✓"; setTimeout(() => (c.textContent = "Nusxa olish"), 1500); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(txt).then(ok, () => eski(txt, ok));
      else eski(txt, ok);
    }
    if (e.target.closest("#menuBtn")) { const s = $("#sidebar"); if (s) s.classList.toggle("open"); }
  });
  function eski(txt, ok) { const t = document.createElement("textarea"); t.value = txt; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); ok(); } catch (e) { /* */ } t.remove(); }

  yonalt();
})();
