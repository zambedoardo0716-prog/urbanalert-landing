"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, Bell, Building2, CalendarDays, Camera, Check, CheckCircle2, CircleDot,
  Droplets, Eye, FileClock, HardHat, History, LampDesk, Layers3, Map, MapPin, Menu,
  MessageSquareMore, PhoneCall, Route, Send, ShieldCheck, Sparkles,
  Trees, TriangleAlert, UserRound, Users, Wrench, X, Zap,
} from "lucide-react";
import { useState } from "react";

const issues = [
  { name: "Buca stradale", icon: CircleDot, color: "amber", place: "Via Roma, 42" },
  { name: "Lampione spento", icon: LampDesk, color: "blue", place: "Piazza Garibaldi" },
  { name: "Albero caduto", icon: Trees, color: "green", place: "Viale della Libertà" },
  { name: "Allagamento", icon: Droplets, color: "cyan", place: "Via delle Rose" },
];

const reports = [
  { id: "UA-184", title: "Lampione spento", place: "Piazza Garibaldi", category: "Illuminazione", status: "Presa in carico", priority: "Media", duplicate: 3, color: "blue", date: "08 giu 2026", office: "Ufficio illuminazione" },
  { id: "UA-183", title: "Buca sul manto stradale", place: "Via Roma, 42", category: "Strade", status: "Ricevuta", priority: "Alta", duplicate: 0, color: "amber", date: "08 giu 2026", office: "Ufficio manutenzioni" },
  { id: "UA-181", title: "Ramo caduto sul marciapiede", place: "Viale della Libertà", category: "Verde", status: "Risolta", priority: "Media", duplicate: 2, color: "green", date: "07 giu 2026", office: "Ufficio verde pubblico" },
  { id: "UA-179", title: "Caditoia ostruita", place: "Via delle Rose", category: "Acqua", status: "Presa in carico", priority: "Alta", duplicate: 0, color: "cyan", date: "06 giu 2026", office: "Ufficio manutenzioni" },
];

const dailyProblems = [
  ["Lo stesso problema viene segnalato più volte", Layers3, "Richieste simili arrivano da cittadini diversi e devono essere riconosciute e riunite."],
  ["Le segnalazioni arrivano da canali diversi", MessageSquareMore, "Telefonate, email, WhatsApp e social rendono difficile avere un quadro completo."],
  ["I cittadini telefonano per chiedere aggiornamenti", PhoneCall, "Senza uno stato consultabile, gli uffici devono rispondere più volte alla stessa domanda."],
  ["È difficile distinguere pratiche aperte e risolte", History, "Gli aggiornamenti possono perdersi e lo storico degli interventi resta frammentato."],
  ["Manca una visione condivisa tra gli uffici", Users, "Ogni settore può avere informazioni diverse sulla stessa situazione."],
];

const presentationMailto = "mailto:INSERISCI_EMAIL?subject=Richiesta%20presentazione%20UrbanAlert";

const audiences = [
  ["Cittadini", UserRound, "Segnalano e seguono gli interventi."],
  ["Uffici tecnici", Wrench, "Ricevono richieste complete e ordinate."],
  ["Amministrazioni", Building2, "Hanno una visione chiara del territorio."],
  ["Manutenzioni", HardHat, "Intervengono con priorità e posizione precise."],
  ["Polizia locale", ShieldCheck, "Condivide informazioni utili e tracciabili."],
];

const citizenBenefits = [
  ["Problemi già visibili sulla mappa", Map, "Prima di inviare, il cittadino può verificare se il problema è già stato segnalato."],
  ["Aggiornamenti automatici", Bell, "Ogni cambio di stato può diventare una comunicazione chiara e tempestiva."],
  ["Stato sempre consultabile", Eye, "La segnalazione resta accessibile dal momento dell’invio fino alla risoluzione."],
  ["Più trasparenza", Route, "Il cittadino sa se la richiesta è ricevuta, presa in carico o risolta."],
];

const municipalityBenefits = [
  ["Meno richieste duplicate", Layers3, "La mappa e il rilevamento dei duplicati aiutano a riunire segnalazioni simili."],
  ["Gestione centralizzata", Building2, "Telefonate, email e messaggi lasciano spazio a un unico flusso condiviso."],
  ["Priorità più chiare", TriangleAlert, "Categorie, stato e posizione aiutano a organizzare gli interventi."],
  ["Storico consultabile", FileClock, "Segnalazioni e aggiornamenti restano disponibili per analisi e verifiche."],
];

const channels = [
  ["Telefonate", PhoneCall, "-translate-x-10 -rotate-3"],
  ["Email", MessageSquareMore, "translate-x-8 rotate-2"],
  ["WhatsApp", MessageSquareMore, "-translate-x-2 rotate-3"],
  ["Messaggi Facebook", MessageSquareMore, "translate-x-12 -rotate-2"],
  ["Segnalazioni doppie", Layers3, "-translate-x-8 rotate-2"],
  ["Stato difficile da seguire", Eye, "translate-x-5 -rotate-1"],
];

const reveal = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.55 } };

function Logo() {
  return <a href="#" className="flex items-center gap-2.5 font-display text-[19px] font-extrabold tracking-tight text-navy"><span className="grid size-9 place-items-center rounded-xl bg-navy text-white shadow-lg shadow-navy/15"><MapPin size={18} strokeWidth={2.6} /></span>UrbanAlert</a>;
}

function Button({ children, secondary = false, onClick }: { children: React.ReactNode; secondary?: boolean; onClick?: () => void }) {
  return <button onClick={onClick} className={secondary ? "button button-secondary" : "button button-primary"}>{children}</button>;
}

function ContactLink({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <a href={presentationMailto} className={light ? "button button-light" : "button button-secondary"}>{children}</a>;
}

function MiniMap({ large = false }: { large?: boolean }) {
  return (
    <div className={`map-grid relative overflow-hidden ${large ? "h-full min-h-[430px]" : "h-40 rounded-2xl"}`}>
      <div className="map-road road-one" /><div className="map-road road-two" /><div className="map-road road-three" />
      {[
        ["left-[26%] top-[28%]", "bg-amber-500"], ["left-[63%] top-[19%]", "bg-blue-500"],
        ["left-[72%] top-[62%]", "bg-cyan-500"], ["left-[38%] top-[70%]", "bg-emerald-500"],
      ].map(([pos, color], i) => <motion.span key={i} initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: .2 + i * .1, type: "spring" }} className={`absolute ${pos} grid size-7 place-items-center rounded-full border-[3px] border-white ${color} shadow-lg`}><span className="size-1.5 rounded-full bg-white" /></motion.span>)}
      {large && <div className="absolute left-4 top-4 rounded-xl border border-white/80 bg-white/90 px-3 py-2 text-[11px] font-semibold text-slate-600 shadow-sm backdrop-blur"><MapPin className="mr-1 inline text-green" size={13} /> 8 segnalazioni nella vista</div>}
    </div>
  );
}

function Dashboard({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(1);
  const [filter, setFilter] = useState("Tutte");
  const [dashboardReports, setDashboardReports] = useState(reports);
  const [success, setSuccess] = useState(false);
  const visible = dashboardReports.filter((r) => filter === "Tutte" || r.category === filter);
  const selected = dashboardReports[active];
  const newlyClosed = dashboardReports.filter((report, index) => report.status === "Risolta" && reports[index].status !== "Risolta").length;
  const openReports = 24 - newlyClosed;
  const statusSteps = selected.status === "Risolta" ? ["Ricevuta", "Presa in carico", "Risolta"] : selected.status === "Presa in carico" ? ["Ricevuta", "Presa in carico"] : ["Ricevuta"];
  const notificationText = selected.status === "Risolta" ? `La segnalazione ${selected.id} è stata risolta.` : selected.status === "Presa in carico" ? `La segnalazione ${selected.id} è stata assegnata a ${selected.office.toLowerCase()}.` : `La segnalazione ${selected.id} è stata ricevuta dal Comune.`;
  const resolveSelected = () => {
    if (selected.status === "Risolta") return;
    setDashboardReports((current) => current.map((report, index) => index === active ? { ...report, status: "Risolta" } : report));
    setSuccess(true);
    window.setTimeout(() => setSuccess(false), 3200);
  };
  return (
    <div className={`dashboard-shell ${compact ? "pointer-events-none select-none" : ""}`}>
      <AnimatePresence>{success && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="absolute right-3 top-14 z-20 flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-3 py-2 text-[9px] font-bold text-emerald-700 shadow-lg"><CheckCircle2 size={13} /> Segnalazione chiusa e cittadino aggiornato</motion.div>}</AnimatePresence>
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <Logo /><div className="flex items-center gap-2"><span className="hidden text-xs font-semibold text-slate-500 sm:block">Comune di Bellavista</span><div className="grid size-8 place-items-center rounded-full bg-navy text-[10px] font-bold text-white">UT</div></div>
      </div>
      <div className="grid flex-1 lg:grid-cols-[.9fr_1.1fr]">
        <MiniMap large />
        <div className="border-l border-slate-200 bg-white">
          <div className="border-b border-slate-200 p-4">
            <div className="mb-3 flex items-center justify-between"><div><p className="text-[11px] font-bold uppercase tracking-[.13em] text-green">Ufficio tecnico</p><h3 className="font-display text-lg font-extrabold text-navy">Segnalazioni</h3></div><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">{openReports} aperte</span></div>
            <div className="flex gap-2 overflow-x-auto pb-1">{["Tutte", "Strade", "Illuminazione", "Verde", "Acqua"].map((item) => <button key={item} onClick={() => setFilter(item)} className={`filter-chip ${filter === item ? "filter-active" : ""}`}>{item}</button>)}</div>
          </div>
          <div className="max-h-[350px] space-y-2 overflow-auto p-3">
            {visible.map((report) => <button key={report.id} onClick={() => { setActive(dashboardReports.indexOf(report)); setSuccess(false); }} className={`report-row ${selected.id === report.id ? "report-active" : ""}`}>
              <span className={`issue-dot dot-${report.color}`} /><span className="min-w-0 flex-1 text-left"><span className="block truncate text-xs font-bold text-navy">{report.title}</span><span className="block truncate text-[10px] text-slate-500">{report.id} · {report.place}</span></span><span className={`status status-${report.status.replaceAll(" ", "-").toLowerCase()}`}>{report.status}</span>
            </button>)}
          </div>
          <AnimatePresence mode="wait"><motion.div key={selected.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="m-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-3 flex items-start justify-between"><div><span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{selected.id}</span><h4 className="font-display text-sm font-extrabold text-navy">{selected.title}</h4></div><span className={`priority priority-${selected.priority.toLowerCase()}`}>{selected.priority}</span></div>
            {selected.duplicate > 0 && <div className="mb-3 flex items-center gap-2 rounded-lg bg-violet-50 px-3 py-2 text-[10px] font-semibold text-violet-700"><Layers3 size={13} /> Possibile duplicato: {selected.duplicate} segnalazioni vicine</div>}
            {!compact && <div className="mb-3 grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-2"><span className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-wider text-slate-400"><CalendarDays size={10} /> Data</span><b className="mt-1 block text-[9px] text-navy">{selected.date}</b></div>
              <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-2"><span className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-wider text-slate-400"><Building2 size={10} /> Assegnata a</span><b className="mt-1 block truncate text-[9px] text-navy">{selected.office}</b></div>
              <div className="col-span-2 rounded-lg border border-slate-200 bg-white px-2.5 py-2"><span className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-wider text-slate-400"><History size={10} /> Storico stato</span><div className="mt-2 flex items-center gap-1.5 text-[8px] font-semibold text-slate-500">{statusSteps.map((status, index) => <div key={status} className="contents"><span className={`size-1.5 rounded-full ${status === "Risolta" ? "bg-emerald-500" : status === "Presa in carico" ? "bg-blue-500" : "bg-green"}`} /><span>{status}</span>{index < statusSteps.length - 1 && <span className="h-px flex-1 bg-slate-200" />}</div>)}</div></div>
              <div className="col-span-2 flex items-start gap-2 rounded-lg bg-emerald-50 px-2.5 py-2 text-[8px] leading-relaxed text-emerald-800"><Send className="mt-0.5 flex-none" size={11} /><span><b className="block">Anteprima notifica al cittadino</b>{notificationText}</span></div>
            </div>}
            <button disabled={selected.status === "Risolta"} onClick={resolveSelected} className={`flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold transition ${selected.status === "Risolta" ? "cursor-default bg-emerald-100 text-emerald-700" : "bg-navy text-white hover:bg-navy-light"}`}>{selected.status === "Risolta" ? <><Check size={15} /> Già risolta</> : <><CheckCircle2 size={15} /> Segna come risolta</>}</button>
          </motion.div></AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export function LandingPage() {
  const [menu, setMenu] = useState(false);
  const [issue, setIssue] = useState(0);
  const [step, setStep] = useState(0);
  const selected = issues[issue];
  const goDemo = () => document.getElementById("demo-cittadino")?.scrollIntoView({ behavior: "smooth" });
  return (
    <main className="overflow-hidden">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/70 bg-white/80 backdrop-blur-xl">
        <div className="container flex h-[70px] items-center justify-between"><Logo /><nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex"><a href="#perche-serve">Perché serve</a><a href="#per-chi">Per chi</a><a href="#demo-cittadino">Demo cittadino</a><a href="#benefici">Benefici</a></nav><div className="hidden md:block"><Button onClick={goDemo}>Scopri il prototipo <ArrowRight size={15} /></Button></div><button className="md:hidden" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button></div>
        {menu && <div className="border-t bg-white px-5 py-4 md:hidden"><div className="flex flex-col gap-4 text-sm font-semibold"><a href="#perche-serve">Perché serve</a><a href="#per-chi">Per chi</a><a href="#demo-cittadino">Demo cittadino</a><a href="#benefici">Benefici</a></div></div>}
      </header>

      <section className="hero-section relative pt-[140px]">
        <div className="hero-glow" /><div className="container relative z-10 grid items-center gap-16 pb-24 lg:grid-cols-[.9fr_1.1fr] lg:pb-32">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
            <div className="eyebrow"><ShieldCheck size={14} /> Gestione digitale delle segnalazioni urbane</div>
            <h1 className="mt-6 max-w-3xl font-display text-5xl font-extrabold leading-[1.05] tracking-[-.045em] text-navy md:text-7xl">Segnalare è più semplice. <span className="text-green">Rispondere è più ordinato.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">UrbanAlert collega cittadini e Comune in un unico spazio: per segnalare un problema, evitare duplicati, seguire l’intervento e sapere quando viene risolto.</p>
            <div className="mt-7 grid max-w-xl gap-2 sm:grid-cols-2">{["Segnalazione rapida e guidata", "Problemi già visibili sulla mappa", "Stato dell’intervento consultabile", "Aggiornamenti fino alla risoluzione"].map((item) => <span key={item} className="hero-value"><Check size={13} /> {item}</span>)}</div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button onClick={goDemo}>Valuta il prototipo <ArrowRight size={16} /></Button><ContactLink>Richiedi una presentazione</ContactLink></div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-slate-500"><span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-green" /> Per cittadini e amministrazioni</span><span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-green" /> Prototipo dimostrativo</span><span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-green" /> Pensato per enti locali</span></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40, rotate: 1 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ duration: .75, delay: .15 }} className="relative"><div className="dashboard-halo" /><Dashboard compact /><motion.div animate={{ y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="floating-card left-[-18px] top-[18%]"><span className="grid size-8 place-items-center rounded-lg bg-emerald-50 text-green"><CheckCircle2 size={17} /></span><span><b>Segnalazione aggiornata</b><small>Il cittadino riceve una notifica</small></span></motion.div></motion.div>
        </div>
      </section>

      <section id="perche-serve" className="section bg-navy text-white">
        <div className="container"><motion.div {...reveal} className="section-heading"><span className="section-kicker text-emerald-300">Perché serve</span><h2>Oggi una segnalazione può perdersi tra troppi canali.</h2><p className="text-slate-300">Telefonate, email e messaggi rendono difficile capire cosa è già stato segnalato, chi sta intervenendo e quando il problema sarà risolto. UrbanAlert centralizza ogni richiesta in un unico punto, consultabile da cittadini e uffici.</p></motion.div>
          <div className="mt-14 grid items-center gap-12 lg:grid-cols-[.8fr_.2fr_1fr]">
            <div className="space-y-3">{channels.map(([name, Icon, transform], i) => <motion.div key={name as string} initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * .1 }} className={`channel-card ${transform}`}><Icon size={17} /><span>{name as string}</span><span className="ml-auto size-2 rounded-full bg-rose-400" /></motion.div>)}</div>
            <motion.div whileInView={{ x: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 2.4 }} className="hidden justify-center lg:flex"><ArrowRight className="text-emerald-300" size={38} /></motion.div>
            <motion.div {...reveal} className="rounded-[28px] bg-white p-3 text-navy shadow-2xl shadow-black/25"><Dashboard compact /></motion.div>
          </div>
        </div>
      </section>

      <section className="section bg-[#f5f8f7]">
        <div className="container"><motion.div {...reveal} className="section-heading centered"><span className="section-kicker">Situazioni concrete</span><h2>Problemi quotidiani che UrbanAlert aiuta a gestire.</h2><p>Una gestione più ordinata parte da difficoltà operative semplici, ricorrenti e riconoscibili per ogni amministrazione.</p></motion.div>
          <div className="audience-grid mt-12">{dailyProblems.map(([title, Icon, text], i) => <motion.div key={title as string} {...reveal} transition={{ delay: i * .06 }} className="audience-card"><span className="benefit-icon"><Icon size={20} /></span><h3>{title as string}</h3><p>{text as string}</p></motion.div>)}</div>
        </div>
      </section>

      <section id="per-chi" className="section">
        <div className="container"><motion.div {...reveal} className="section-heading centered"><span className="section-kicker">Per chi è pensato</span><h2>Un punto di incontro per chi vive e gestisce il territorio.</h2><p>UrbanAlert organizza lo stesso flusso informativo per ruoli diversi, mantenendo chiari responsabilità, aggiornamenti e stato degli interventi.</p></motion.div>
          <div className="audience-grid mt-12">{audiences.map(([title, Icon, text], i) => <motion.div key={title as string} {...reveal} transition={{ delay: i * .06 }} className="audience-card"><span className="benefit-icon"><Icon size={20} /></span><h3>{title as string}</h3><p>{text as string}</p></motion.div>)}</div>
        </div>
      </section>

      <section id="demo-cittadino" className="section bg-[#f5f8f7]">
        <div className="container"><motion.div {...reveal} className="section-heading centered"><span className="section-kicker">Un percorso semplice per il cittadino</span><h2>Segnalare richiede pochi passaggi.</h2><p>Prova il flusso: scegli un problema e completa la mini segnalazione.</p></motion.div>
          <div className="mt-12 grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
            <motion.div {...reveal} className="grid grid-cols-2 gap-3">{issues.map((item, i) => <button key={item.name} onClick={() => { setIssue(i); setStep(0); }} className={`issue-card ${issue === i ? "issue-selected" : ""}`}><span className={`issue-icon icon-${item.color}`}><item.icon size={22} /></span><span className="mt-5 block text-left font-display text-sm font-extrabold text-navy">{item.name}</span><span className="mt-1 block text-left text-xs leading-relaxed text-slate-500">{item.place}</span>{issue === i && <motion.span layoutId="issue-check" className="absolute right-3 top-3 grid size-5 place-items-center rounded-full bg-green text-white"><Check size={12} /></motion.span>}</button>)}</motion.div>
            <motion.div {...reveal} className="demo-phone"><div className="flex items-center justify-between border-b border-slate-200 pb-4"><div><span className="text-[10px] font-bold uppercase tracking-[.18em] text-green">Nuova segnalazione</span><h3 className="font-display text-xl font-extrabold text-navy">{selected.name}</h3></div><span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500">{step + 1} di 4</span></div>
              <div className="my-5 flex items-center">{["Categoria", "Posizione", "Foto", "Invio"].map((label, i) => <div key={label} className="flex flex-1 items-center last:flex-none"><button onClick={() => setStep(i)} className={`step-dot ${i <= step ? "step-active" : ""}`}>{i < step ? <Check size={12} /> : i + 1}</button>{i < 3 && <span className={`h-px flex-1 ${i < step ? "bg-green" : "bg-slate-200"}`} />}</div>)}</div>
              <AnimatePresence mode="wait"><motion.div key={`${issue}-${step}`} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} className="min-h-[230px]">
                {step === 0 && <div><p className="demo-label">Categoria selezionata</p><div className="selected-answer"><span className={`issue-icon icon-${selected.color}`}><selected.icon size={20} /></span><span><b>{selected.name}</b><small>La categoria aiuta l&apos;assegnazione all&apos;ufficio corretto.</small></span><CheckCircle2 className="ml-auto text-green" size={20} /></div></div>}
                {step === 1 && <div><p className="demo-label">Posizione rilevata</p><MiniMap /><div className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-600"><MapPin size={14} className="text-green" /> {selected.place}, Bellavista</div></div>}
                {step === 2 && <div><p className="demo-label">Aggiungi una foto</p><div className="grid h-40 place-items-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-center"><div><Camera className="mx-auto mb-2 text-green" /><b className="block text-sm text-navy">Foto del problema</b><small className="text-xs text-slate-400">Aiuta l&apos;ufficio a valutare l&apos;intervento</small></div></div></div>}
                {step === 3 && <div className="grid min-h-[210px] place-items-center text-center"><motion.div initial={{ scale: .7 }} animate={{ scale: 1 }}><span className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-emerald-100 text-green"><CheckCircle2 size={28} /></span><h4 className="font-display text-lg font-extrabold text-navy">Pronta per l&apos;invio</h4><p className="mt-2 max-w-sm text-xs leading-relaxed text-slate-500">Il cittadino potrà seguire lo stato della segnalazione senza telefonare all&apos;ufficio.</p></motion.div></div>}
              </motion.div></AnimatePresence>
              <button onClick={() => step < 3 ? setStep(step + 1) : setStep(0)} className="button button-primary w-full">{step < 3 ? <>Continua <ArrowRight size={15} /></> : <>Invia segnalazione <Check size={15} /></>}</button>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="dashboard" className="section">
        <div className="container"><motion.div {...reveal} className="mb-12 grid gap-6 lg:grid-cols-2"><div><span className="section-kicker">Una scrivania digitale per gli uffici</span><h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-navy md:text-5xl">Ogni segnalazione ha un posto, uno stato e una priorità.</h2></div><p className="self-end text-base leading-relaxed text-slate-600">La dashboard riunisce mappa, filtri e pratiche operative. Prova a cambiare categoria, seleziona una segnalazione o segnala la pratica come risolta.</p></motion.div><motion.div {...reveal} className="rounded-[28px] bg-slate-100 p-2 shadow-2xl shadow-navy/15 md:p-4"><Dashboard /></motion.div></div>
      </section>

      <section id="benefici" className="section bg-[#f5f8f7]"><div className="container"><motion.div {...reveal} className="section-heading centered"><span className="section-kicker">Benefici per entrambe le parti</span><h2>Più trasparenza per il cittadino. Più ordine per il Comune.</h2><p>Lo stesso sistema migliora l’esperienza di chi segnala e rende più gestibile il lavoro di chi deve rispondere.</p></motion.div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <motion.div {...reveal} className="benefit-group benefit-group-citizen"><div className="benefit-group-head"><span className="benefit-icon"><UserRound size={20} /></span><div><span>Per il cittadino</span><h3>Una segnalazione che non scompare.</h3></div></div><div className="space-y-3">{citizenBenefits.map(([title, Icon, text]) => <div key={title as string} className="compact-benefit"><Icon size={17} /><div><b>{title as string}</b><p>{text as string}</p></div></div>)}</div></motion.div>
          <motion.div {...reveal} className="benefit-group benefit-group-municipality"><div className="benefit-group-head"><span className="benefit-icon"><Building2 size={20} /></span><div><span>Per il Comune</span><h3>Un processo più leggibile e coordinato.</h3></div></div><div className="space-y-3">{municipalityBenefits.map(([title, Icon, text]) => <div key={title as string} className="compact-benefit"><Icon size={17} /><div><b>{title as string}</b><p>{text as string}</p></div></div>)}</div></motion.div>
        </div>
      </div></section>

      <section className="section"><div className="container"><motion.div {...reveal} className="section-heading centered"><span className="section-kicker">Prima e dopo</span><h2>Stesse richieste. Un metodo più chiaro.</h2></motion.div><div className="mt-12 grid gap-5 lg:grid-cols-2"><motion.div {...reveal} className="compare-card compare-before"><div className="compare-title"><span>Prima</span><small>Informazioni frammentate</small></div><div className="scattered-items"><span className="-rotate-3"><MessageSquareMore /> Email da rileggere</span><span className="translate-x-10 rotate-2"><PhoneCall /> Telefonate senza storico</span><span className="-translate-x-5 rotate-1"><FileClock /> Fogli sparsi</span></div></motion.div><motion.div {...reveal} className="compare-card compare-after"><div className="compare-title"><span>Dopo</span><small>Una vista condivisa</small></div><div className="grid grid-cols-2 gap-3">{[[Map, "Mappa"], [CheckCircle2, "Stati"], [TriangleAlert, "Priorità"], [Bell, "Notifiche"]].map(([Icon, label]) => <div key={label as string} className="after-item"><Icon size={18} /><b>{label as string}</b><Check className="ml-auto text-green" size={14} /></div>)}</div></motion.div></div></div></section>

      <section id="progetto" className="section bg-[#f5f8f7]"><div className="container"><motion.div {...reveal} className="credibility-panel"><div><span className="section-kicker">Il progetto UrbanAlert</span><h2>Un prototipo per rendere più chiaro il dialogo sul territorio.</h2><p>UrbanAlert nasce dall’osservazione di un problema concreto: le segnalazioni urbane arrivano spesso attraverso canali diversi, difficili da coordinare e da seguire nel tempo.</p><p>Il progetto esplora un possibile sistema digitale condiviso, pensato per semplificare la partecipazione dei cittadini e supportare il lavoro operativo delle amministrazioni locali, senza sostituire responsabilità e procedure dell’ente.</p></div><div className="credibility-points"><span><ShieldCheck size={18} /><b>Tono istituzionale</b><small>Informazioni comprensibili e verificabili.</small></span><span><Users size={18} /><b>Valore condiviso</b><small>Un servizio utile a cittadini e uffici.</small></span><span><Sparkles size={18} /><b>Progetto dimostrativo</b><small>Una base concreta da valutare e presentare.</small></span></div></motion.div></div></section>

      <section className="section"><div className="container"><motion.div {...reveal} className="credibility-panel"><div><span className="section-kicker">Pensato anche per piccoli Comuni</span><h2>Più chiarezza operativa, senza sostituire ciò che già funziona.</h2><p>UrbanAlert non nasce per sostituire i sistemi, le procedure o le responsabilità già presenti nell’ente. L’obiettivo è offrire un flusso più chiaro e organizzato per raccogliere, condividere e seguire le segnalazioni dei cittadini.</p><p>Il prototipo è pensato anche per amministrazioni con strutture snelle, dove le stesse persone seguono più attività e una visione condivisa può semplificare il lavoro quotidiano.</p></div><div className="credibility-points"><span><CheckCircle2 size={18} /><b>Si affianca ai processi esistenti</b><small>Senza imporre un nuovo modello organizzativo.</small></span><span><Users size={18} /><b>Adatto a gruppi di lavoro ridotti</b><small>Informazioni essenziali e accessibili in un unico punto.</small></span><span><Route size={18} /><b>Flusso semplice e leggibile</b><small>Dalla ricezione della segnalazione alla chiusura.</small></span></div></motion.div></div></section>

      <section className="pb-10 pt-10"><div className="container"><motion.div {...reveal} className="cta-panel"><div className="cta-grid" /><div className="relative z-10 max-w-3xl"><span className="eyebrow eyebrow-light"><Sparkles size={14} /> Scopri UrbanAlert in modo concreto</span><h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">Scopri come potrebbe adattarsi al tuo Comune.</h2><p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">Esamina il prototipo e approfondisci con una presentazione dedicata come un flusso più chiaro potrebbe supportare cittadini e uffici.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button onClick={goDemo}>Valuta il prototipo <ArrowRight size={16} /></Button><ContactLink light>Richiedi una presentazione</ContactLink></div></div><Zap className="absolute bottom-[-35px] right-8 text-white/5" size={250} /></motion.div></div></section>

      <footer className="border-t border-slate-200 py-9"><div className="container flex flex-col gap-5 text-xs text-slate-500 md:flex-row md:items-center md:justify-between"><Logo /><p className="max-w-2xl leading-relaxed">Progetto dimostrativo sviluppato per presentare un possibile sistema digitale di gestione delle segnalazioni urbane.</p><span>© 2026 UrbanAlert</span></div></footer>
    </main>
  );
}
