import { useState } from "react";

const producers = [
{
id: 1,
name: "Codru Organic Farm",
location: "Orhei, Moldova",
verified: true,
products: ["Organic Walnuts", "Dried Plums", "Sunflower Oil"],
certifications: ["EU Organic", "HACCP"],
minOrder: "500kg",
rating: 4.9,
reviews: 12,
image: "🌾",
description: "Family-owned farm operating since 1994. 200 hectares of certified organic land in the Codru forest zone.",
priceRange: "€2.10–€4.80/kg",
},
{
id: 2,
name: "Chateau Purcari Estate",
location: "Purcari, Stefan Voda",
verified: true,
products: ["Cabernet Sauvignon", "Negru de Purcari", "Rosé"],
certifications: ["ISO 22000", "EU Organic"],
minOrder: "200 bottles",
rating: 5.0,
reviews: 28,
image: "🍷",
description: "Historic winery founded in 1827. Award-winning wines exported to 40+ countries.",
priceRange: "€3.50–€12.00/bottle",
},
{
id: 3,
name: "ApiMold Honey Collective",
location: "Hincesti, Moldova",
verified: true,
products: ["Acacia Honey", "Wildflower Honey", "Beeswax"],
certifications: ["EU Organic", "Fair Trade"],
minOrder: "200kg",
rating: 4.8,
reviews: 9,
image: "🍯",
description: "Cooperative of 34 beekeepers. Pure Moldovan honey with full traceability from hive to export.",
priceRange: "€3.80–€7.20/kg",
},
{
id: 4,
name: "Nistru Berry Farm",
location: "Rezina, Moldova",
verified: false,
products: ["Frozen Blueberries", "Raspberries", "Sea Buckthorn"],
certifications: ["HACCP"],
minOrder: "1000kg",
rating: 4.6,
reviews: 4,
image: "🫐",
description: "Largest berry producer in northern Moldova. IQF freezing facility on-site for year-round supply.",
priceRange: "€1.20–€3.40/kg",
},
{
id: 5,
name: "SunGold Sunflower Co.",
location: "Causeni, Moldova",
verified: true,
products: ["Cold-Pressed Sunflower Oil", "Sunflower Seeds", "Pumpkin Oil"],
certifications: ["EU Organic", "HACCP", "Kosher"],
minOrder: "1000L",
rating: 4.7,
reviews: 17,
image: "🌻",
description: "Cold-press extraction facility. No additives, no preservatives. Exported to Germany, France and Benelux.",
priceRange: "€1.80–€4.50/L",
},
{
id: 6,
name: "Floresti Lavender Fields",
location: "Floresti, Moldova",
verified: true,
products: ["Lavender Essential Oil", "Dried Lavender", "Lavender Honey"],
certifications: ["EU Organic", "ECOCERT"],
minOrder: "50kg",
rating: 4.9,
reviews: 6,
image: "🪻",
description: "40 hectares of Provençal lavender grown in Moldovan soil. Distillery producing pharmaceutical-grade essential oil.",
priceRange: "€18–€45/kg",
},
];

const categories = ["All", "Organic Produce", "Wine & Spirits", "Honey & Apiary", "Berries & Fruit", "Oils & Seeds", "Botanicals"];

const stats = [
{ value: "340+", label: "Verified Producers" },
{ value: "€28M", label: "GMV This Year" },
{ value: "42", label: "EU Countries Reached" },
{ value: "98%", label: "Buyer Satisfaction" },
];

export default function App() {
const [activeTab, setActiveTab] = useState("home");
const [selectedCategory, setSelectedCategory] = useState("All");
const [selectedProducer, setSelectedProducer] = useState(null);
const [inquiryForm, setInquiryForm] = useState({ name: "", company: "", email: "", quantity: "", message: "" });
const [inquirySent, setInquirySent] = useState(false);
const [joinTab, setJoinTab] = useState("buyer");

const filtered = selectedCategory === "All" ? producers : producers.filter(p =>
p.products.some(prod => prod.toLowerCase().includes(selectedCategory.toLowerCase().split(" ")[0]))
);

const sendInquiry = () => {
if (inquiryForm.name && inquiryForm.email) {
setInquirySent(true);
setTimeout(() => { setInquirySent(false); setSelectedProducer(null); }, 2500);
}
};

return (
<div style={{
fontFamily: "'Georgia', 'Times New Roman', serif",
background: "#0f0e0b",
minHeight: "100vh",
color: "#f0ebe0",
}}>
<nav style={{
background: "rgba(15,14,11,0.95)",
borderBottom: "1px solid #2a2620",
padding: "0 32px",
display: "flex",
alignItems: "center",
justifyContent: "space-between",
height: 64,
position: "sticky",
top: 0,
zIndex: 100,
backdropFilter: "blur(12px)",
}}>
<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
<span style={{ fontSize: 22 }}>🌿</span>
<span style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px", color: "#c8a96e" }}>MoldovaExport</span>
<span style={{
fontSize: 10, background: "#c8a96e22", color: "#c8a96e",
border: "1px solid #c8a96e44", borderRadius: 4, padding: "2px 7px",
letterSpacing: 1, fontFamily: "monospace", marginLeft: 4,
}}>BETA</span>
</div>
<div style={{ display: "flex", gap: 4 }}>
{[{ id: "home", label: "Home" }, { id: "marketplace", label: "Marketplace" }, { id: "how", label: "How It Works" }, { id: "join", label: "Join" }].map(tab => (
<button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
background: activeTab === tab.id ? "#c8a96e15" : "transparent",
border: "none",
color: activeTab === tab.id ? "#c8a96e" : "#a09080",
padding: "8px 16px", borderRadius: 6, cursor: "pointer",
fontSize: 14, fontFamily: "inherit", transition: "all 0.2s",
}}>{tab.label}</button>
))}
</div>
<button onClick={() => setActiveTab("join")} style={{
background: "#c8a96e", color: "#0f0e0b", border: "none",
padding: "9px 20px", borderRadius: 6, cursor: "pointer",
fontWeight: 700, fontSize: 13, fontFamily: "inherit",
}}>Get Access →</button>
</nav>

{activeTab === "home" && (
<div>
<div style={{
minHeight: "88vh", display: "flex", flexDirection: "column",
alignItems: "center", justifyContent: "center",
textAlign: "center", padding: "60px 24px", position: "relative", overflow: "hidden",
}}>
<div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 40%, #1a1508 0%, #0f0e0b 100%)", zIndex: 0 }} />
<div style={{ position: "relative", zIndex: 2, maxWidth: 780 }}>
<div style={{
display: "inline-block", background: "#c8a96e18", border: "1px solid #c8a96e30",
color: "#c8a96e", borderRadius: 20, padding: "6px 18px",
fontSize: 12, letterSpacing: 2, fontFamily: "monospace", marginBottom: 32,
}}>MOLDOVA × EU TRADE BRIDGE</div>
<h1 style={{ fontSize: "clamp(38px, 7vw, 80px)", fontWeight: 700, lineHeight: 1.1, margin: "0 0 24px", color: "#f0ebe0", letterSpacing: "-2px" }}>
Europe's finest produce,<br /><span style={{ color: "#c8a96e" }}>direct from Moldova.</span>
</h1>
<p style={{ fontSize: 18, color: "#9a8878", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 40px", fontStyle: "italic" }}>
The verified marketplace connecting EU buyers with Moldova's certified agricultural producers. Cut the middleman. Build lasting supply chains.
</p>
<div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
<button onClick={() => setActiveTab("marketplace")} style={{
background: "#c8a96e", color: "#0f0e0b", border: "none",
padding: "14px 32px", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 15, fontFamily: "inherit",
}}>Browse Producers →</button>
<button onClick={() => setActiveTab("join")} style={{
background: "transparent", color: "#c8a96e", border: "1px solid #c8a96e40",
padding: "14px 32px", borderRadius: 8, cursor: "pointer", fontSize: 15, fontFamily: "inherit",
}}>List Your Farm</button>
</div>
</div>
</div>
<div style={{
borderTop: "1px solid #2a2620", borderBottom: "1px solid #2a2620",
background: "#13120e", padding: "40px 24px",
display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
maxWidth: 900, margin: "0 auto",
}}>
{stats.map((s, i) => (
<div key={i} style={{ textAlign: "center", padding: "20px 24px", borderRight: i < stats.length - 1 ? "1px solid #2a2620" : "none" }}>
<div style={{ fontSize: 36, fontWeight: 700, color: "#c8a96e", letterSpacing: "-1px" }}>{s.value}</div>
<div style={{ fontSize: 12, color: "#6a5a4a", marginTop: 6, letterSpacing: 1, fontFamily: "monospace" }}>{s.label.toUpperCase()}</div>
</div>
))}
</div>
<div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px" }}>
<h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-1px", marginBottom: 12 }}>Why Moldova?</h2>
<p style={{ color: "#7a6a5a", fontSize: 16, marginBottom: 48, fontStyle: "italic" }}>A hidden gem on Europe's agricultural map.</p>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
{[
{ icon: "🌍", title: "EU DCFTA Access", desc: "Moldova holds a Deep and Comprehensive Free Trade Agreement with the EU — zero tariffs on certified exports." },
{ icon: "🌱", title: "Organic Tradition", desc: "Decades of low-chemical farming mean easy organic certification and genuine terroir products." },
{ icon: "💶", title: "30–60% Cost Advantage", desc: "Comparable EU-certified products at significantly lower prices due to local production costs." },
{ icon: "🔒", title: "Full Traceability", desc: "Every producer on our platform is verified, documented, and audited. Know exactly where your goods come from." },
].map((card, i) => (
<div key={i} style={{ background: "#13120e", border: "1px solid #2a2620", borderRadius: 12, padding: "28px 24px" }}>
<div style={{ fontSize: 28, marginBottom: 14 }}>{card.icon}</div>
<div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>{card.title}</div>
<div style={{ color: "#7a6a5a", fontSize: 14, lineHeight: 1.6 }}>{card.desc}</div>
</div>
))}
</div>
</div>
</div>
)}

{activeTab === "marketplace" && (
<div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
<div style={{ marginBottom: 36 }}>
<h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-1px", marginBottom: 8 }}>Producer Marketplace</h2>
<p style={{ color: "#7a6a5a", fontStyle: "italic" }}>Verified Moldovan producers ready to supply EU markets.</p>
</div>
<div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
{categories.map(cat => (
<button key={cat} onClick={() => setSelectedCategory(cat)} style={{
background: selectedCategory === cat ? "#c8a96e" : "#1a1810",
color: selectedCategory === cat ? "#0f0e0b" : "#7a6a5a",
border: selectedCategory === cat ? "none" : "1px solid #2a2620",
padding: "7px 16px", borderRadius: 20, cursor: "pointer",
fontSize: 13, fontFamily: "inherit", fontWeight: selectedCategory === cat ? 700 : 400,
}}>{cat}</button>
))}
</div>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
{filtered.map(producer => (
<div key={producer.id} style={{
background: "#13120e", border: "1px solid #2a2620", borderRadius: 12,
padding: "24px", cursor: "pointer", transition: "border-color 0.2s",
}}
onMouseEnter={e => e.currentTarget.style.borderColor = "#c8a96e50"}
onMouseLeave={e => e.currentTarget.style.borderColor = "#2a2620"}
onClick={() => setSelectedProducer(producer)}
>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
<div style={{ fontSize: 40 }}>{producer.image}</div>
<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
{producer.verified && (
<span style={{ background: "#1a3020", color: "#4caf7d", border: "1px solid #2a4a30", borderRadius: 4, padding: "3px 9px", fontSize: 11, fontFamily: "monospace", letterSpacing: 1 }}>✓ VERIFIED</span>
)}
<span style={{ color: "#c8a96e", fontSize: 13 }}>★ {producer.rating} ({producer.reviews})</span>
</div>
</div>
<div style={{ fontWeight: 700, fontSize: 17, marginBottom: 4 }}>{producer.name}</div>
<div style={{ color: "#6a5a4a", fontSize: 13, marginBottom: 14, fontFamily: "monospace" }}>📍 {producer.location}</div>
<div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
{producer.products.map(p => (
<span key={p} style={{ background: "#1a1810", border: "1px solid #2a2620", color: "#9a8878", borderRadius: 4, padding: "3px 9px", fontSize: 12 }}>{p}</span>
))}
</div>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
<div style={{ fontSize: 13, color: "#6a5a4a" }}>Min. order: <span style={{ color: "#c8a96e" }}>{producer.minOrder}</span></div>
<div style={{ fontSize: 13, color: "#c8a96e", fontWeight: 700 }}>{producer.priceRange}</div>
</div>
</div>
))}
</div>
</div>
)}

{activeTab === "how" && (
<div style={{ maxWidth: 800, margin: "0 auto", padding: "64px 24px" }}>
<h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-1px", marginBottom: 12 }}>How It Works</h2>
<p style={{ color: "#7a6a5a", fontSize: 16, marginBottom: 60, fontStyle: "italic" }}>Simple. Secure. Transparent.</p>
<div style={{ marginBottom: 64 }}>
<div style={{ fontSize: 11, letterSpacing: 3, color: "#c8a96e", fontFamily: "monospace", marginBottom: 24 }}>FOR EU BUYERS</div>
{[
{ n: "01", title: "Browse & Discover", desc: "Search verified producers by product category, certification, minimum order, and price range." },
{ n: "02", title: "Send an Inquiry", desc: "Contact producers directly through our platform. Request samples, discuss specifications, negotiate terms." },
{ n: "03", title: "Secure Payment", desc: "Pay through our escrow system. Funds are only released when you confirm delivery and quality." },
{ n: "04", title: "Build Long-term Supply", desc: "Rate your producer, lock in recurring orders, and build a reliable Eastern European supply chain." },
].map((step, i) => (
<div key={i} style={{ display: "flex", gap: 24, padding: "24px 0", borderBottom: i < 3 ? "1px solid #1a1810" : "none" }}>
<div style={{ fontSize: 32, fontWeight: 700, color: "#2a2620", minWidth: 48, fontFamily: "monospace" }}>{step.n}</div>
<div>
<div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{step.title}</div>
<div style={{ color: "#7a6a5a", lineHeight: 1.6 }}>{step.desc}</div>
</div>
</div>
))}
</div>
<div>
<div style={{ fontSize: 11, letterSpacing: 3, color: "#c8a96e", fontFamily: "monospace", marginBottom: 24 }}>FOR MOLDOVAN PRODUCERS</div>
{[
{ n: "01", title: "Apply & Verify", desc: "Submit your business registration, certifications, and product details. Our team reviews within 5 business days." },
{ n: "02", title: "Build Your Profile", desc: "Showcase your products, farm story, certifications, and pricing. Photos and video welcomed." },
{ n: "03", title: "Receive Inquiries", desc: "EU buyers contact you directly. No cold outreach needed — your products find the market." },
{ n: "04", title: "Get Paid Securely", desc: "Receive payment via escrow upon confirmed delivery. We handle currency conversion at competitive rates." },
].map((step, i) => (
<div key={i} style={{ display: "flex", gap: 24, padding: "24px 0", borderBottom: i < 3 ? "1px solid #1a1810" : "none" }}>
<div style={{ fontSize: 32, fontWeight: 700, color: "#2a2620", minWidth: 48, fontFamily: "monospace" }}>{step.n}</div>
<div>
<div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{step.title}</div>
<div style={{ color: "#7a6a5a", lineHeight: 1.6 }}>{step.desc}</div>
</div>
</div>
))}
</div>
<div style={{ background: "#13120e", border: "1px solid #c8a96e30", borderRadius: 12, padding: "28px 24px", marginTop: 48 }}>
<div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12, color: "#c8a96e" }}>Our Commission Model</div>
<p style={{ color: "#7a6a5a", lineHeight: 1.7, margin: 0 }}>
We charge a <strong style={{ color: "#f0ebe0" }}>5% platform fee</strong> on completed transactions — paid by the buyer. Producers list and transact for free. No subscription, no hidden fees. We only make money when you do.
</p>
</div>
</div>
)}

{activeTab === "join" && (
<div style={{ maxWidth: 600, margin: "0 auto", padding: "64px 24px" }}>
<h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-1px", marginBottom: 8 }}>Get Access</h2>
<p style={{ color: "#7a6a5a", fontStyle: "italic", marginBottom: 36 }}>We're in early access. Join now and get priority onboarding.</p>
<div style={{ display: "flex", gap: 8, marginBottom: 36 }}>
{["buyer", "producer"].map(t => (
<button key={t} onClick={() => setJoinTab(t)} style={{
flex: 1, background: joinTab === t ? "#c8a96e" : "#13120e",
color: joinTab === t ? "#0f0e0b" : "#7a6a5a",
border: joinTab === t ? "none" : "1px solid #2a2620",
padding: "12px", borderRadius: 8, cursor: "pointer",
fontWeight: 700, fontSize: 14, fontFamily: "inherit",
}}>{t === "buyer" ? "🇪🇺 I'm an EU Buyer" : "🌾 I'm a Producer"}</button>
))}
</div>
<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
{[
{ label: "Full Name", placeholder: "Your name" },
{ label: "Company / Farm Name", placeholder: joinTab === "buyer" ? "Your company" : "Your farm name" },
{ label: "Email Address", placeholder: "your@email.com" },
{ label: joinTab === "buyer" ? "Country" : "Location in Moldova", placeholder: joinTab === "buyer" ? "Germany, France..." : "Orhei, Hincesti..." },
{ label: joinTab === "buyer" ? "Products You Source" : "Products You Produce", placeholder: joinTab === "buyer" ? "Walnuts, wine, honey..." : "What do you grow?" },
].map((field, i) => (
<div key={i}>
<label style={{ fontSize: 12, color: "#6a5a4a", display: "block", marginBottom: 8, letterSpacing: 0.5, fontFamily: "monospace" }}>{field.label.toUpperCase()}</label>
<input placeholder={field.placeholder} style={{
width: "100%", background: "#13120e", border: "1px solid #2a2620",
borderRadius: 8, padding: "12px 16px", color: "#f0ebe0",
fontSize: 15, fontFamily: "inherit", boxSizing: "border-box", outline: "none",
}} />
</div>
))}
<button style={{
background: "#c8a96e", color: "#0f0e0b", border: "none",
padding: "15px", borderRadius: 8, cursor: "pointer",
fontWeight: 700, fontSize: 15, fontFamily: "inherit", marginTop: 8,
}}>{joinTab === "buyer" ? "Request Buyer Access →" : "Apply as Producer →"}</button>
<p style={{ color: "#4a3a2a", fontSize: 12, textAlign: "center", margin: 0 }}>We review all applications within 5 business days.</p>
</div>
</div>
)}

{selectedProducer && (
<div style={{
position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
}} onClick={() => { setSelectedProducer(null); setInquirySent(false); }}>
<div style={{
background: "#13120e", border: "1px solid #2a2620", borderRadius: 16,
padding: "36px", maxWidth: 560, width: "100%", maxHeight: "85vh", overflowY: "auto",
}} onClick={e => e.stopPropagation()}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
<div>
<div style={{ fontSize: 40, marginBottom: 10 }}>{selectedProducer.image}</div>
<h3 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>{selectedProducer.name}</h3>
<div style={{ color: "#6a5a4a", fontFamily: "monospace", fontSize: 13, marginTop: 4 }}>📍 {selectedProducer.location}</div>
</div>
<button onClick={() => setSelectedProducer(null)} style={{ background: "transparent", border: "none", color: "#6a5a4a", fontSize: 22, cursor: "pointer" }}>✕</button>
</div>
<p style={{ color: "#9a8878", lineHeight: 1.7, marginBottom: 20 }}>{selectedProducer.description}</p>
<div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
{selectedProducer.certifications.map(c => (
<span key={c} style={{ background: "#1a3020", color: "#4caf7d", border: "1px solid #2a4a30", borderRadius: 4, padding: "4px 10px", fontSize: 12, fontFamily: "monospace" }}>✓ {c}</span>
))}
</div>
<div style={{ background: "#0f0e0b", borderRadius: 8, padding: "16px 20px", marginBottom: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
<div>
<div style={{ fontSize: 11, color: "#4a3a2a", fontFamily: "monospace", marginBottom: 4 }}>PRICE RANGE</div>
<div style={{ color: "#c8a96e", fontWeight: 700 }}>{selectedProducer.priceRange}</div>
</div>
<div>
<div style={{ fontSize: 11, color: "#4a3a2a", fontFamily: "monospace", marginBottom: 4 }}>MIN. ORDER</div>
<div style={{ color: "#c8a96e", fontWeight: 700 }}>{selectedProducer.minOrder}</div>
</div>
</div>
{inquirySent ? (
<div style={{ background: "#1a3020", border: "1px solid #2a4a30", borderRadius: 8, padding: "20px", textAlign: "center", color: "#4caf7d" }}>
✓ Inquiry sent! {selectedProducer.name} will respond within 48 hours.
</div>
) : (
<div>
<div style={{ fontWeight: 700, marginBottom: 16, fontSize: 15 }}>Send an Inquiry</div>
<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
{[
{ key: "name", label: "Your Name", placeholder: "Full name" },
{ key: "company", label: "Company", placeholder: "Your company" },
{ key: "email", label: "Email", placeholder: "your@email.com" },
{ key: "quantity", label: "Quantity Needed", placeholder: "e.g. 2000kg monthly" },
].map(f => (
<input key={f.key} placeholder={f.placeholder}
value={inquiryForm[f.key]}
onChange={e => setInquiryForm({ ...inquiryForm, [f.key]: e.target.value })}
style={{
background: "#0f0e0b", border: "1px solid #2a2620", borderRadius: 6,
padding: "10px 14px", color: "#f0ebe0", fontSize: 14,
fontFamily: "inherit", outline: "none", width: "100%", boxSizing: "border-box",
}} />
))}
<textarea placeholder="Message to producer..." rows={3}
value={inquiryForm.message}
onChange={e => setInquiryForm({ ...inquiryForm, message: e.target.value })}
style={{
background: "#0f0e0b", border: "1px solid #2a2620", borderRadius: 6,
padding: "10px 14px", color: "#f0ebe0", fontSize: 14,
fontFamily: "inherit", outline: "none", width: "100%", boxSizing: "border-box", resize: "vertical",
}} />
<button onClick={sendInquiry} style={{
background: "#c8a96e", color: "#0f0e0b", border: "none",
padding: "13px", borderRadius: 8, cursor: "pointer",
fontWeight: 700, fontSize: 14, fontFamily: "inherit",
}}>Send Inquiry →</button>
</div>
</div>
)}
</div>
</div>
)}

<footer style={{ borderTop: "1px solid #1a1810", padding: "32px 24px", textAlign: "center", color: "#3a2a1a", fontSize: 13, marginTop: 40 }}>
<div style={{ color: "#c8a96e", marginBottom: 8 }}>🌿 MoldovaExport</div>
Moldova × EU Agricultural Trade Platform · Early Access Beta · 2026
</footer>
</div>
);
}
