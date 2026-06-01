import { useState, useRef, useEffect } from "react";

const producers = [
{ id: 1, name: "Codru Organic Farm", location: "Orhei, Moldova", verified: true, products: ["Organic Walnuts", "Dried Plums", "Sunflower Oil"], certifications: ["EU Organic", "HACCP"], minOrder: "500kg", rating: 4.9, reviews: 12, image: "🌾", description: "Family-owned farm operating since 1994. 200 hectares of certified organic land in the Codru forest zone.", priceRange: "€2.10–€4.80/kg" },
{ id: 2, name: "Chateau Purcari Estate", location: "Purcari, Stefan Voda", verified: true, products: ["Cabernet Sauvignon", "Negru de Purcari", "Rosé"], certifications: ["ISO 22000", "EU Organic"], minOrder: "200 bottles", rating: 5.0, reviews: 28, image: "🍷", description: "Historic winery founded in 1827. Award-winning wines exported to 40+ countries.", priceRange: "€3.50–€12.00/bottle" },
{ id: 3, name: "ApiMold Honey Collective", location: "Hincesti, Moldova", verified: true, products: ["Acacia Honey", "Wildflower Honey", "Beeswax"], certifications: ["EU Organic", "Fair Trade"], minOrder: "200kg", rating: 4.8, reviews: 9, image: "🍯", description: "Cooperative of 34 beekeepers. Pure Moldovan honey with full traceability from hive to export.", priceRange: "€3.80–€7.20/kg" },
{ id: 4, name: "Nistru Berry Farm", location: "Rezina, Moldova", verified: false, products: ["Frozen Blueberries", "Raspberries", "Sea Buckthorn"], certifications: ["HACCP"], minOrder: "1000kg", rating: 4.6, reviews: 4, image: "🫐", description: "Largest berry producer in northern Moldova. IQF freezing facility on-site for year-round supply.", priceRange: "€1.20–€3.40/kg" },
{ id: 5, name: "SunGold Sunflower Co.", location: "Causeni, Moldova", verified: true, products: ["Cold-Pressed Sunflower Oil", "Sunflower Seeds", "Pumpkin Oil"], certifications: ["EU Organic", "HACCP", "Kosher"], minOrder: "1000L", rating: 4.7, reviews: 17, image: "🌻", description: "Cold-press extraction facility. No additives, no preservatives. Exported to Germany, France and Benelux.", priceRange: "€1.80–€4.50/L" },
{ id: 6, name: "Floresti Lavender Fields", location: "Floresti, Moldova", verified: true, products: ["Lavender Essential Oil", "Dried Lavender", "Lavender Honey"], certifications: ["EU Organic", "ECOCERT"], minOrder: "50kg", rating: 4.9, reviews: 6, image: "💜", description: "40 hectares of Provençal lavender grown in Moldovan soil. Distillery producing pharmaceutical-grade essential oil.", priceRange: "€18–€45/kg" },
];

const categories = ["All", "Organic Produce", "Wine & Spirits", "Honey & Apiary", "Berries & Fruit", "Oils & Seeds", "Botanicals"];

const stats = [
{ value: "340+", label: "Verified Producers" },
{ value: "€28M", label: "GMV This Year" },
{ value: "42", label: "EU Countries Reached" },
{ value: "98%", label: "Buyer Satisfaction" },
];

const T = {
en: {
tagline: "MOLDOVA × EU TRADE BRIDGE",
hero1: "Europe's Best Kept",
hero2: "Agricultural Secret.",
heroSub: "The verified marketplace connecting EU buyers with Moldova's certified agricultural producers. Cut the middleman. Build lasting supply chains.",
browseBtn: "Browse Producers →",
listBtn: "List Your Farm",
whyTitle: "Why Moldova?",
whySub: "A hidden gem on Europe's agricultural map.",
navLabels: ["Home", "Marketplace", "How It Works", "Contact"],
forBuyers: "FOR EU BUYERS",
forProducers: "FOR MOLDOVAN PRODUCERS",
commissionTitle: "Our Commission Model",
commissionText: "We charge a 5% platform fee on completed transactions — paid by the buyer. Producers list and transact for free. No subscription, no hidden fees. We only make money when you do.",
marketTitle: "Producer Marketplace",
marketSub: "Verified Moldovan producers ready to supply EU markets.",
howTitle: "How It Works",
howSub: "Simple. Secure. Transparent.",
contactTitle: "Contact Us",
contactSub: "Our AI assistant is available 24/7 in any language.",
getAccess: "Get Access →",
chatWelcome: "Hello! I'm the MoldovaExport assistant. I can help with questions about exporting to the EU, listing your farm, sourcing Moldovan products, certifications, and more. How can I help you today?",
chatPlaceholder: "Ask anything about exporting, listing your farm, or sourcing from Moldova...",
verified: "✓ VERIFIED",
priceRange: "PRICE RANGE",
minOrder: "MIN. ORDER",
sendInquiry: "Send Inquiry →",
inquirySent: "✓ Inquiry sent!",
footer: "Moldova × EU Agricultural Trade Platform · Founded by Luiza Alexei",
buyerSteps: [
{ n: "01", title: "Browse & Discover", desc: "Search verified producers by product category, certification, minimum order, and price range." },
{ n: "02", title: "Send an Inquiry", desc: "Contact producers directly through our platform. Request samples, discuss specifications, negotiate terms." },
{ n: "03", title: "Secure Payment", desc: "Pay through our escrow system. Funds are only released when you confirm delivery and quality." },
{ n: "04", title: "Build Long-term Supply", desc: "Rate your producer, lock in recurring orders, and build a reliable Eastern European supply chain." },
],
producerSteps: [
{ n: "01", title: "Apply & Verify", desc: "Submit your business registration, certifications, and product details. Our team reviews within 5 business days." },
{ n: "02", title: "Build Your Profile", desc: "Showcase your products, farm story, certifications, and pricing. Photos and video welcomed." },
{ n: "03", title: "Receive Inquiries", desc: "EU buyers contact you directly. No cold outreach needed — your products find the market." },
{ n: "04", title: "Get Paid Securely", desc: "Receive payment via escrow upon confirmed delivery. We handle currency conversion at competitive rates." },
],
whyCards: [
{ icon: "🌍", title: "EU DCFTA Access", desc: "Moldova holds a Deep and Comprehensive Free Trade Agreement with the EU — zero tariffs on certified exports." },
{ icon: "🌱", title: "Organic Tradition", desc: "Decades of low-chemical farming mean easy organic certification and genuine terroir products." },
{ icon: "💶", title: "30–60% Cost Advantage", desc: "Comparable EU-certified products at significantly lower prices due to local production costs." },
{ icon: "🔒", title: "Full Traceability", desc: "Every producer on our platform is verified, documented, and audited. Know exactly where your goods come from." },
],
},
ro: {
tagline: "PODUL COMERCIAL MOLDOVA × UE",
hero1: "Cel Mai Bine Păstrat Secret",
hero2: "Agricol al Europei.",
heroSub: "Platforma verificată care conectează cumpărătorii din UE cu producătorii agricoli certificați din Moldova. Eliminați intermediarul. Construiți lanțuri de aprovizionare durabile.",
browseBtn: "Vezi Producătorii →",
listBtn: "Înregistrează Ferma",
whyTitle: "De ce Moldova?",
whySub: "O comoară ascunsă pe harta agricolă a Europei.",
navLabels: ["Acasă", "Piață", "Cum Funcționează", "Contact"],
forBuyers: "PENTRU CUMPĂRĂTORI DIN UE",
forProducers: "PENTRU PRODUCĂTORII MOLDOVENI",
commissionTitle: "Modelul Nostru de Comision",
commissionText: "Percepem un comision de 5% pe tranzacțiile finalizate — plătit de cumpărător. Producătorii listează și tranzacționează gratuit. Fără abonament, fără taxe ascunse.",
marketTitle: "Piața Producătorilor",
marketSub: "Producători moldoveni verificați, pregătiți să aprovizioneze piețele UE.",
howTitle: "Cum Funcționează",
howSub: "Simplu. Sigur. Transparent.",
contactTitle: "Contactați-ne",
contactSub: "Asistentul nostru AI este disponibil 24/7 în orice limbă.",
getAccess: "Obține Acces →",
chatWelcome: "Bună ziua! Sunt asistentul MoldovaExport. Vă pot ajuta cu întrebări despre export în UE, listarea fermei, aprovizionarea cu produse moldovenești, certificări și multe altele. Cum vă pot ajuta?",
chatPlaceholder: "Întrebați orice despre export, listarea fermei sau aprovizionarea din Moldova...",
verified: "✓ VERIFICAT",
priceRange: "INTERVAL PREȚ",
minOrder: "COMANDĂ MIN.",
sendInquiry: "Trimite Cerere →",
inquirySent: "✓ Cerere trimisă!",
footer: "Platforma Comercială Agricolă Moldova × UE · Fondată de Luiza Alexei",
buyerSteps: [
{ n: "01", title: "Explorați și Descoperiți", desc: "Căutați producători verificați după categorie, certificare, comandă minimă și interval de preț." },
{ n: "02", title: "Trimiteți o Cerere", desc: "Contactați producătorii direct. Solicitați mostre, discutați specificații, negociați termeni." },
{ n: "03", title: "Plată Sigură", desc: "Plătiți prin sistemul nostru escrow. Fondurile sunt eliberate doar când confirmați livrarea și calitatea." },
{ n: "04", title: "Construiți Parteneriate", desc: "Evaluați producătorul, blocați comenzi recurente și construiți un lanț de aprovizionare de încredere." },
],
producerSteps: [
{ n: "01", title: "Aplicați și Verificați", desc: "Trimiteți înregistrarea afacerii, certificările și detaliile produsului. Echipa noastră verifică în 5 zile lucrătoare." },
{ n: "02", title: "Construiți Profilul", desc: "Prezentați produsele, povestea fermei, certificările și prețurile. Fotografii și video sunt binevenite." },
{ n: "03", title: "Primiți Cereri", desc: "Cumpărătorii din UE vă contactează direct. Nu aveți nevoie de outreach — produsele dvs. găsesc piața." },
{ n: "04", title: "Fiți Plătit Sigur", desc: "Primiți plata prin escrow la livrare confirmată. Ne ocupăm de conversia valutară la rate competitive." },
],
whyCards: [
{ icon: "🌍", title: "Acces DCFTA UE", desc: "Moldova deține un Acord de Liber Schimb Aprofundat cu UE — zero tarife la exporturile certificate." },
{ icon: "🌱", title: "Tradiție Organică", desc: "Decenii de agricultură cu chimicale reduse înseamnă certificare organică ușoară și produse autentice de terroir." },
{ icon: "💶", title: "Avantaj de Cost 30–60%", desc: "Produse certificate UE comparabile la prețuri semnificativ mai mici datorită costurilor locale de producție." },
{ icon: "🔒", title: "Trasabilitate Completă", desc: "Fiecare producător de pe platforma noastră este verificat, documentat și auditat. Știți exact de unde vin produsele." },
],
},
fr: {
tagline: "PONT COMMERCIAL MOLDAVIE × UE",
hero1: "Le Secret Agricole",
hero2: "le Mieux Gardé d'Europe.",
heroSub: "La marketplace vérifiée connectant les acheteurs européens aux producteurs agricoles certifiés de Moldavie. Supprimez les intermédiaires. Construisez des chaînes d'approvisionnement durables.",
browseBtn: "Voir les Producteurs →",
listBtn: "Lister votre Ferme",
whyTitle: "Pourquoi la Moldavie?",
whySub: "Un joyau caché sur la carte agricole européenne.",
navLabels: ["Accueil", "Marché", "Comment ça Marche", "Contact"],
forBuyers: "POUR LES ACHETEURS UE",
forProducers: "POUR LES PRODUCTEURS MOLDAVES",
commissionTitle: "Notre Modèle de Commission",
commissionText: "Nous facturons des frais de 5% sur les transactions complétées — payés par l'acheteur. Les producteurs listent et transactent gratuitement. Sans abonnement, sans frais cachés.",
marketTitle: "Marché des Producteurs",
marketSub: "Producteurs moldaves vérifiés prêts à approvisionner les marchés européens.",
howTitle: "Comment ça Marche",
howSub: "Simple. Sécurisé. Transparent.",
contactTitle: "Contactez-nous",
contactSub: "Notre assistant IA est disponible 24h/24 dans toutes les langues.",
getAccess: "Obtenir l'Accès →",
chatWelcome: "Bonjour! Je suis l'assistant MoldovaExport. Je peux vous aider avec des questions sur l'exportation vers l'UE, l'inscription de votre ferme, l'approvisionnement en produits moldaves, les certifications et plus encore.",
chatPlaceholder: "Posez des questions sur l'exportation, l'inscription ou l'approvisionnement en Moldavie...",
verified: "✓ VÉRIFIÉ",
priceRange: "GAMME DE PRIX",
minOrder: "COMMANDE MIN.",
sendInquiry: "Envoyer la Demande →",
inquirySent: "✓ Demande envoyée!",
footer: "Plateforme Commerciale Agricole Moldavie × UE · Fondée par Luiza Alexei",
buyerSteps: [
{ n: "01", title: "Parcourir et Découvrir", desc: "Recherchez des producteurs vérifiés par catégorie, certification, commande minimale et gamme de prix." },
{ n: "02", title: "Envoyer une Demande", desc: "Contactez les producteurs directement via notre plateforme. Demandez des échantillons, discutez des spécifications." },
{ n: "03", title: "Paiement Sécurisé", desc: "Payez via notre système d'entiercement. Les fonds ne sont libérés que lorsque vous confirmez la livraison." },
{ n: "04", title: "Construire un Approvisionnement", desc: "Évaluez votre producteur, bloquez des commandes récurrentes et construisez une chaîne d'approvisionnement fiable." },
],
producerSteps: [
{ n: "01", title: "Postuler et Vérifier", desc: "Soumettez votre enregistrement commercial, certifications et détails des produits. Notre équipe examine en 5 jours." },
{ n: "02", title: "Créer votre Profil", desc: "Présentez vos produits, l'histoire de votre ferme, vos certifications et vos prix." },
{ n: "03", title: "Recevoir des Demandes", desc: "Les acheteurs européens vous contactent directement. Vos produits trouvent le marché sans prospection." },
{ n: "04", title: "Être Payé en Toute Sécurité", desc: "Recevez le paiement via entiercement à la livraison confirmée. Nous gérons la conversion des devises." },
],
whyCards: [
{ icon: "🌍", title: "Accès DCFTA UE", desc: "La Moldavie détient un Accord de libre-échange approfondi avec l'UE — zéro tarif sur les exportations certifiées." },
{ icon: "🌱", title: "Tradition Biologique", desc: "Des décennies d'agriculture à faibles intrants chimiques signifient une certification bio facile et des produits authentiques." },
{ icon: "💶", title: "Avantage de Coût 30–60%", desc: "Produits certifiés UE comparables à des prix nettement inférieurs grâce aux coûts de production locaux." },
{ icon: "🔒", title: "Traçabilité Complète", desc: "Chaque producteur sur notre plateforme est vérifié, documenté et audité. Sachez exactement d'où viennent vos produits." },
],
},
};

function AIChat({ t }) {
const [messages, setMessages] = useState([{ role: "assistant", content: t.chatWelcome }]);
const [input, setInput] = useState("");
const [loading, setLoading] = useState(false);
const bottomRef = useRef(null);

useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

const send = async () => {
if (!input.trim() || loading) return;
const userMsg = input.trim();
setInput("");
setMessages(prev => [...prev, { role: "user", content: userMsg }]);
setLoading(true);
try {
const response = await fetch("https://api.anthropic.com/v1/messages", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
model: "claude-sonnet-4-20250514",
max_tokens: 1000,
system: `You are the helpful AI assistant for MoldovaExport, a platform connecting Moldovan agricultural producers with EU buyers. Founded by Luiza Alexei.

You help with:
- How to list a farm or product on the platform (free to list, submit business registration + certifications, reviewed in 5 days)
- EU export from Moldova: DCFTA agreement, certifications (EU Organic, HACCP, EUR.1 documents, phytosanitary certificates)
- How EU buyers can source products from Moldova
- Platform fees: 5% commission on completed sales only, free to list
- What products Moldova exports: walnuts, honey, wine, berries, sunflower oil, lavender, and more
- Verification process and requirements

Contact if needed: luizaalexei3@gmail.com or WhatsApp: wa.me/37368935511

Be warm, concise, and helpful. Detect the user's language and always respond in the same language they write in.`,
messages: [...messages, { role: "user", content: userMsg }],
}),
});
const data = await response.json();
const reply = data.content?.[0]?.text || "Sorry, I couldn't process that. Please email luizaalexei3@gmail.com for help.";
setMessages(prev => [...prev, { role: "assistant", content: reply }]);
} catch {
setMessages(prev => [...prev, { role: "assistant", content: "Sorry, something went wrong. Please email luizaalexei3@gmail.com or WhatsApp us at wa.me/37368935511" }]);
}
setLoading(false);
};

return (
<div style={{ maxWidth: 680, margin: "0 auto", padding: "64px 24px" }}>
<h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-1px", marginBottom: 8 }}>{t.contactTitle}</h2>
<p style={{ color: "#7a6a5a", fontStyle: "italic", marginBottom: 32 }}>{t.contactSub}</p>
<div style={{ background: "#13120e", border: "1px solid #2a2620", borderRadius: 16, overflow: "hidden" }}>
<div style={{ padding: "14px 20px", borderBottom: "1px solid #2a2620", display: "flex", alignItems: "center", gap: 10 }}>
<div style={{ width: 9, height: 9, borderRadius: "50%", background: "#4caf7d" }} />
<span style={{ fontSize: 12, color: "#7a6a5a", fontFamily: "monospace" }}>MoldovaExport AI Assistant · Online 24/7</span>
</div>
<div style={{ height: 400, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 14 }}>
{messages.map((m, i) => (
<div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
<div style={{
maxWidth: "80%", padding: "11px 15px", borderRadius: 12,
background: m.role === "user" ? "#c8a96e" : "#1a1810",
color: m.role === "user" ? "#0f0e0b" : "#f0ebe0",
fontSize: 14, lineHeight: 1.6,
borderBottomRightRadius: m.role === "user" ? 3 : 12,
borderBottomLeftRadius: m.role === "assistant" ? 3 : 12,
}}>{m.content}</div>
</div>
))}
{loading && (
<div style={{ display: "flex" }}>
<div style={{ background: "#1a1810", padding: "11px 15px", borderRadius: 12, borderBottomLeftRadius: 3, color: "#c8a96e", fontSize: 18, letterSpacing: 4 }}>···</div>
</div>
)}
<div ref={bottomRef} />
</div>
<div style={{ padding: "14px 20px", borderTop: "1px solid #2a2620", display: "flex", gap: 10 }}>
<input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
placeholder={t.chatPlaceholder}
style={{ flex: 1, background: "#0f0e0b", border: "1px solid #2a2620", borderRadius: 8, padding: "10px 14px", color: "#f0ebe0", fontSize: 13, fontFamily: "inherit", outline: "none" }} />
<button onClick={send} disabled={loading} style={{ background: "#c8a96e", color: "#0f0e0b", border: "none", padding: "10px 18px", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 16, opacity: loading ? 0.6 : 1 }}>→</button>
</div>
</div>
<div style={{ marginTop: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
<a href="mailto:luizaalexei3@gmail.com" style={{ display: "flex", alignItems: "center", gap: 8, background: "#13120e", border: "1px solid #2a2620", borderRadius: 8, padding: "9px 14px", color: "#9a8878", textDecoration: "none", fontSize: 12, fontFamily: "monospace" }}>✉ luizaalexei3@gmail.com</a>
<a href="https://wa.me/37368935511" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, background: "#13120e", border: "1px solid #2a2620", borderRadius: 8, padding: "9px 14px", color: "#9a8878", textDecoration: "none", fontSize: 12, fontFamily: "monospace" }}>💬 WhatsApp</a>
</div>
</div>
);
}

export default function App() {
const [tab, setTab] = useState("home");
const [lang, setLang] = useState("en");
const [cat, setCat] = useState("All");
const [producer, setProducer] = useState(null);
const [form, setForm] = useState({ name: "", company: "", email: "", quantity: "", message: "" });
const [sent, setSent] = useState(false);
const [joinTab, setJoinTab] = useState("buyer");

const t = T[lang];

const filtered = cat === "All" ? producers : producers.filter(p =>
p.products.some(pr => pr.toLowerCase().includes(cat.toLowerCase().split(" ")[0]))
);

const sendInquiry = () => {
if (form.name && form.email) {
setSent(true);
setTimeout(() => { setSent(false); setProducer(null); }, 2500);
}
};

const navIds = ["home", "marketplace", "how", "contact"];

return (
<div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#0f0e0b", minHeight: "100vh", color: "#f0ebe0" }}>

{/* NAV */}
<nav style={{ background: "rgba(15,14,11,0.96)", borderBottom: "1px solid #2a2620", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 62, position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(12px)" }}>
<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
<span style={{ fontSize: 20 }}>🌿</span>
<span style={{ fontSize: 17, fontWeight: 700, color: "#c8a96e", letterSpacing: "-0.5px" }}>MoldovaExport</span>
<span style={{ fontSize: 9, background: "#c8a96e20", color: "#c8a96e", border: "1px solid #c8a96e40", borderRadius: 4, padding: "2px 6px", letterSpacing: 1, fontFamily: "monospace" }}>BETA</span>
</div>
<div style={{ display: "flex", alignItems: "center", gap: 2 }}>
{navIds.map((id, i) => (
<button key={id} onClick={() => setTab(id)} style={{ background: tab === id ? "#c8a96e15" : "transparent", border: "none", color: tab === id ? "#c8a96e" : "#908070", padding: "7px 11px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>{t.navLabels[i]}</button>
))}
<div style={{ display: "flex", gap: 2, marginLeft: 8, borderLeft: "1px solid #2a2620", paddingLeft: 10 }}>
{["en", "ro", "fr"].map(l => (
<button key={l} onClick={() => setLang(l)} style={{ background: lang === l ? "#c8a96e" : "transparent", color: lang === l ? "#0f0e0b" : "#5a4a3a", border: "none", padding: "4px 7px", borderRadius: 4, cursor: "pointer", fontSize: 10, fontFamily: "monospace", fontWeight: 700 }}>{l.toUpperCase()}</button>
))}
</div>
<button onClick={() => setTab("join")} style={{ background: "#c8a96e", color: "#0f0e0b", border: "none", padding: "7px 14px", borderRadius: 6, cursor: "pointer", fontWeight: 700, fontSize: 11, fontFamily: "inherit", marginLeft: 8 }}>{t.getAccess}</button>
</div>
</nav>

{/* HOME */}
{tab === "home" && (
<div>
<div style={{ minHeight: "88vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "60px 24px", position: "relative" }}>
<div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 40%, #1a1508 0%, #0f0e0b 100%)" }} />
<div style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
<div style={{ display: "inline-block", background: "#c8a96e15", border: "1px solid #c8a96e30", color: "#c8a96e", borderRadius: 20, padding: "5px 16px", fontSize: 11, letterSpacing: 2, fontFamily: "monospace", marginBottom: 28 }}>{t.tagline}</div>
<h1 style={{ fontSize: "clamp(34px, 6vw, 70px)", fontWeight: 700, lineHeight: 1.1, margin: "0 0 22px", letterSpacing: "-2px" }}>
{t.hero1}<br /><span style={{ color: "#c8a96e" }}>{t.hero2}</span>
</h1>
<p style={{ fontSize: 16, color: "#9a8878", lineHeight: 1.7, maxWidth: 540, margin: "0 auto 36px", fontStyle: "italic" }}>{t.heroSub}</p>
<div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
<button onClick={() => setTab("marketplace")} style={{ background: "#c8a96e", color: "#0f0e0b", border: "none", padding: "13px 28px", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 14, fontFamily: "inherit" }}>{t.browseBtn}</button>
<button onClick={() => setTab("join")} style={{ background: "transparent", color: "#c8a96e", border: "1px solid #c8a96e40", padding: "13px 28px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontFamily: "inherit" }}>{t.listBtn}</button>
</div>
</div>
</div>
<div style={{ borderTop: "1px solid #2a2620", borderBottom: "1px solid #2a2620", background: "#13120e", padding: "36px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", maxWidth: 860, margin: "0 auto" }}>
{stats.map((s, i) => (
<div key={i} style={{ textAlign: "center", padding: "16px", borderRight: i < 3 ? "1px solid #2a2620" : "none" }}>
<div style={{ fontSize: 30, fontWeight: 700, color: "#c8a96e", letterSpacing: "-1px" }}>{s.value}</div>
<div style={{ fontSize: 10, color: "#6a5a4a", marginTop: 5, letterSpacing: 1, fontFamily: "monospace" }}>{s.label.toUpperCase()}</div>
</div>
))}
</div>
<div style={{ maxWidth: 860, margin: "0 auto", padding: "72px 24px" }}>
<h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-1px", marginBottom: 10 }}>{t.whyTitle}</h2>
<p style={{ color: "#7a6a5a", marginBottom: 40, fontStyle: "italic" }}>{t.whySub}</p>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
{t.whyCards.map((c, i) => (
<div key={i} style={{ background: "#13120e", border: "1px solid #2a2620", borderRadius: 12, padding: "22px" }}>
<div style={{ fontSize: 24, marginBottom: 10 }}>{c.icon}</div>
<div style={{ fontWeight: 700, fontSize: 14, marginBottom: 7 }}>{c.title}</div>
<div style={{ color: "#7a6a5a", fontSize: 13, lineHeight: 1.6 }}>{c.desc}</div>
</div>
))}
</div>
</div>
</div>
)}

{/* MARKETPLACE */}
{tab === "marketplace" && (
<div style={{ maxWidth: 1080, margin: "0 auto", padding: "44px 24px" }}>
<h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-1px", marginBottom: 6 }}>{t.marketTitle}</h2>
<p style={{ color: "#7a6a5a", fontStyle: "italic", marginBottom: 28 }}>{t.marketSub}</p>
<div style={{ display: "flex", gap: 7, marginBottom: 26, flexWrap: "wrap" }}>
{categories.map(c => (
<button key={c} onClick={() => setCat(c)} style={{ background: cat === c ? "#c8a96e" : "#1a1810", color: cat === c ? "#0f0e0b" : "#7a6a5a", border: cat === c ? "none" : "1px solid #2a2620", padding: "6px 14px", borderRadius: 20, cursor: "pointer", fontSize: 12, fontFamily: "inherit", fontWeight: cat === c ? 700 : 400 }}>{c}</button>
))}
</div>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 16 }}>
{filtered.map(p => (
<div key={p.id} style={{ background: "#13120e", border: "1px solid #2a2620", borderRadius: 12, padding: "20px", cursor: "pointer", transition: "border-color 0.2s" }}
onMouseEnter={e => e.currentTarget.style.borderColor = "#c8a96e50"}
onMouseLeave={e => e.currentTarget.style.borderColor = "#2a2620"}
onClick={() => setProducer(p)}>
<div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
<span style={{ fontSize: 34 }}>{p.image}</span>
<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}>
{p.verified && <span style={{ background: "#1a3020", color: "#4caf7d", border: "1px solid #2a4a30", borderRadius: 4, padding: "2px 7px", fontSize: 10, fontFamily: "monospace" }}>{t.verified}</span>}
<span style={{ color: "#c8a96e", fontSize: 12 }}>★ {p.rating} ({p.reviews})</span>
</div>
</div>
<div style={{ fontWeight: 700, fontSize: 15, marginBottom: 3 }}>{p.name}</div>
<div style={{ color: "#6a5a4a", fontSize: 11, marginBottom: 11, fontFamily: "monospace" }}>📍 {p.location}</div>
<div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 13 }}>
{p.products.map(pr => <span key={pr} style={{ background: "#1a1810", border: "1px solid #2a2620", color: "#9a8878", borderRadius: 4, padding: "2px 7px", fontSize: 11 }}>{pr}</span>)}
</div>
<div style={{ display: "flex", justifyContent: "space-between" }}>
<span style={{ fontSize: 11, color: "#6a5a4a" }}>Min: <span style={{ color: "#c8a96e" }}>{p.minOrder}</span></span>
<span style={{ fontSize: 11, color: "#c8a96e", fontWeight: 700 }}>{p.priceRange}</span>
</div>
</div>
))}
</div>
</div>
)}

{/* HOW IT WORKS */}
{tab === "how" && (
<div style={{ maxWidth: 760, margin: "0 auto", padding: "60px 24px" }}>
<h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-1px", marginBottom: 10 }}>{t.howTitle}</h2>
<p style={{ color: "#7a6a5a", fontStyle: "italic", marginBottom: 48 }}>{t.howSub}</p>
<div style={{ marginBottom: 48 }}>
<div style={{ fontSize: 10, letterSpacing: 3, color: "#c8a96e", fontFamily: "monospace", marginBottom: 18 }}>{t.forBuyers}</div>
{t.buyerSteps.map((s, i) => (
<div key={i} style={{ display: "flex", gap: 18, padding: "18px 0", borderBottom: i < 3 ? "1px solid #1a1810" : "none" }}>
<div style={{ fontSize: 26, fontWeight: 700, color: "#2a2620", minWidth: 40, fontFamily: "monospace" }}>{s.n}</div>
<div><div style={{ fontWeight: 700, fontSize: 15, marginBottom: 5 }}>{s.title}</div><div style={{ color: "#7a6a5a", lineHeight: 1.6, fontSize: 13 }}>{s.desc}</div></div>
</div>
))}
</div>
<div>
<div style={{ fontSize: 10, letterSpacing: 3, color: "#c8a96e", fontFamily: "monospace", marginBottom: 18 }}>{t.forProducers}</div>
{t.producerSteps.map((s, i) => (
<div key={i} style={{ display: "flex", gap: 18, padding: "18px 0", borderBottom: i < 3 ? "1px solid #1a1810" : "none" }}>
<div style={{ fontSize: 26, fontWeight: 700, color: "#2a2620", minWidth: 40, fontFamily: "monospace" }}>{s.n}</div>
<div><div style={{ fontWeight: 700, fontSize: 15, marginBottom: 5 }}>{s.title}</div><div style={{ color: "#7a6a5a", lineHeight: 1.6, fontSize: 13 }}>{s.desc}</div></div>
</div>
))}
</div>
<div style={{ background: "#13120e", border: "1px solid #c8a96e30", borderRadius: 12, padding: "22px", marginTop: 36 }}>
<div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8, color: "#c8a96e" }}>{t.commissionTitle}</div>
<p style={{ color: "#7a6a5a", lineHeight: 1.7, margin: 0, fontSize: 13 }}>{t.commissionText}</p>
</div>
</div>
)}

{/* CONTACT */}
{tab === "contact" && <AIChat t={t} />}

{/* JOIN */}
{tab === "join" && (
<div style={{ maxWidth: 520, margin: "0 auto", padding: "60px 24px" }}>
<h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-1px", marginBottom: 6 }}>{t.getAccess}</h2>
<p style={{ color: "#7a6a5a", fontStyle: "italic", marginBottom: 28 }}>We're in early access. Join now and get priority onboarding.</p>
<div style={{ display: "flex", gap: 7, marginBottom: 24 }}>
{["buyer", "producer"].map(jt => (
<button key={jt} onClick={() => setJoinTab(jt)} style={{ flex: 1, background: joinTab === jt ? "#c8a96e" : "#13120e", color: joinTab === jt ? "#0f0e0b" : "#7a6a5a", border: joinTab === jt ? "none" : "1px solid #2a2620", padding: "10px", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 13, fontFamily: "inherit" }}>
{jt === "buyer" ? "🇪🇺 EU Buyer" : "🌾 Producer"}
</button>
))}
</div>
<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
{[
{ label: "Full Name", ph: "Your name" },
{ label: "Company / Farm", ph: joinTab === "buyer" ? "Your company" : "Your farm name" },
{ label: "Email", ph: "your@email.com" },
{ label: joinTab === "buyer" ? "Country" : "Location in Moldova", ph: joinTab === "buyer" ? "Germany, France..." : "Orhei, Hincesti..." },
{ label: joinTab === "buyer" ? "Products You Source" : "Products You Produce", ph: joinTab === "buyer" ? "Walnuts, wine, honey..." : "What do you grow?" },
].map((f, i) => (
<div key={i}>
<label style={{ fontSize: 10, color: "#6a5a4a", display: "block", marginBottom: 5, letterSpacing: 0.5, fontFamily: "monospace" }}>{f.label.toUpperCase()}</label>
<input placeholder={f.ph} style={{ width: "100%", background: "#13120e", border: "1px solid #2a2620", borderRadius: 7, padding: "10px 13px", color: "#f0ebe0", fontSize: 13, fontFamily: "inherit", boxSizing: "border-box", outline: "none" }} />
</div>
))}
<button style={{ background: "#c8a96e", color: "#0f0e0b", border: "none", padding: "13px", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 13, fontFamily: "inherit", marginTop: 4 }}>
{joinTab === "buyer" ? "Request Buyer Access →" : "Apply as Producer →"}
</button>
<p style={{ color: "#4a3a2a", fontSize: 11, textAlign: "center", margin: 0 }}>We review all applications within 5 business days.</p>
</div>
</div>
)}

{/* PRODUCER MODAL */}
{producer && (
<div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.87)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
onClick={() => { setProducer(null); setSent(false); }}>
<div style={{ background: "#13120e", border: "1px solid #2a2620", borderRadius: 16, padding: "28px", maxWidth: 500, width: "100%", maxHeight: "85vh", overflowY: "auto" }}
onClick={e => e.stopPropagation()}>
<div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
<div>
<div style={{ fontSize: 34, marginBottom: 7 }}>{producer.image}</div>
<h3 style={{ margin: 0, fontSize: 19, fontWeight: 700 }}>{producer.name}</h3>
<div style={{ color: "#6a5a4a", fontFamily: "monospace", fontSize: 11, marginTop: 3 }}>📍 {producer.location}</div>
</div>
<button onClick={() => setProducer(null)} style={{ background: "transparent", border: "none", color: "#6a5a4a", fontSize: 20, cursor: "pointer" }}>✕</button>
</div>
<p style={{ color: "#9a8878", lineHeight: 1.7, marginBottom: 16, fontSize: 13 }}>{producer.description}</p>
<div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 16 }}>
{producer.certifications.map(c => <span key={c} style={{ background: "#1a3020", color: "#4caf7d", border: "1px solid #2a4a30", borderRadius: 4, padding: "2px 8px", fontSize: 11, fontFamily: "monospace" }}>✓ {c}</span>)}
</div>
<div style={{ background: "#0f0e0b", borderRadius: 8, padding: "13px 16px", marginBottom: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
<div><div style={{ fontSize: 9, color: "#4a3a2a", fontFamily: "monospace", marginBottom: 3 }}>{t.priceRange}</div><div style={{ color: "#c8a96e", fontWeight: 700, fontSize: 13 }}>{producer.priceRange}</div></div>
<div><div style={{ fontSize: 9, color: "#4a3a2a", fontFamily: "monospace", marginBottom: 3 }}>{t.minOrder}</div><div style={{ color: "#c8a96e", fontWeight: 700, fontSize: 13 }}>{producer.minOrder}</div></div>
</div>
{sent ? (
<div style={{ background: "#1a3020", border: "1px solid #2a4a30", borderRadius: 8, padding: "16px", textAlign: "center", color: "#4caf7d", fontSize: 14 }}>{t.inquirySent} {producer.name} will respond within 48 hours.</div>
) : (
<div>
<div style={{ fontWeight: 700, marginBottom: 12, fontSize: 13 }}>Send an Inquiry</div>
<div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
{[{ k: "name", ph: "Full name" }, { k: "company", ph: "Your company" }, { k: "email", ph: "your@email.com" }, { k: "quantity", ph: "e.g. 2000kg monthly" }].map(f => (
<input key={f.k} placeholder={f.ph} value={form[f.k]} onChange={e => setForm({ ...form, [f.k]: e.target.value })}
style={{ background: "#0f0e0b", border: "1px solid #2a2620", borderRadius: 6, padding: "8px 12px", color: "#f0ebe0", fontSize: 13, fontFamily: "inherit", outline: "none", width: "100%", boxSizing: "border-box" }} />
))}
<textarea placeholder="Message..." rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
style={{ background: "#0f0e0b", border: "1px solid #2a2620", borderRadius: 6, padding: "8px 12px", color: "#f0ebe0", fontSize: 13, fontFamily: "inherit", outline: "none", width: "100%", boxSizing: "border-box", resize: "vertical" }} />
<button onClick={sendInquiry} style={{ background: "#c8a96e", color: "#0f0e0b", border: "none", padding: "11px", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 13, fontFamily: "inherit" }}>{t.sendInquiry}</button>
</div>
</div>
)}
</div>
</div>
)}

<footer style={{ borderTop: "1px solid #1a1810", padding: "24px", textAlign: "center", color: "#3a2a1a", fontSize: 11, marginTop: 40 }}>
<div style={{ color: "#c8a96e", marginBottom: 5 }}>🌿 MoldovaExport</div>
{t.footer} · 2026
</footer>
</div>
);
}
