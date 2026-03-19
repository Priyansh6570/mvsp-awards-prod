"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

function LineChart({ data }) {
  if (!data || data.length === 0) return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 160, fontSize: 13, color: "#94a3b8" }}>No visitor data yet</div>;
  const show = data.slice(-30);
  const max = Math.max(...show.map((d) => d.count), 1);
  const W = 800,
    H = 160,
    PAD = 16;
  const pts = show.map((d, i) => [PAD + (i / (show.length - 1 || 1)) * (W - PAD * 2), PAD + (1 - d.count / max) * (H - PAD * 2)]);
  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]},${p[1]}`).join(" ");
  const areaD = `${pathD} L ${pts[pts.length - 1][0]},${H} L ${pts[0][0]},${H} Z`;
  return (
    <div style={{ position: "relative", width: "100%", height: 160 }}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="lcg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill="url(#lcg)" />
        <path d={pathD} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {pts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="#6366f1" />
        ))}
      </svg>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", justifyContent: "space-between", padding: "0 4px" }}>
        {[show[0], show[Math.floor(show.length / 2)], show[show.length - 1]].filter(Boolean).map((d, i) => (
          <span key={i} style={{ fontSize: 10, color: "#94a3b8" }}>
            {d.date?.slice(5)}
          </span>
        ))}
      </div>
    </div>
  );
}

function StatCard({ title, value, sub, icon, color = "#6366f1" }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, padding: "18px 20px", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: "#64748b", letterSpacing: "0.07em", textTransform: "uppercase" }}>{title}</p>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
      </div>
      <p style={{ fontSize: 26, fontWeight: 700, color: "#1e293b", lineHeight: 1, marginBottom: 5 }}>{value}</p>
      {sub && <p style={{ fontSize: 12, color: "#94a3b8" }}>{sub}</p>}
    </div>
  );
}

const awardColors = { International: { bg: "#fef9c3", text: "#92400e", border: "#fde68a" }, National: { bg: "#ede9fe", text: "#5b21b6", border: "#c4b5fd" }, Shikhar: { bg: "#d1fae5", text: "#065f46", border: "#6ee7b7" } };
const nomTypeColors = { Self: { bg: "#dbeafe", text: "#1e40af", border: "#93c5fd" }, Other: { bg: "#fce7f3", text: "#9d174d", border: "#f9a8d4" }, Institution: { bg: "#ffedd5", text: "#9a3412", border: "#fdba74" } };

function Badge({ value, map }) {
  const c = map[value] || { bg: "#f1f5f9", text: "#64748b", border: "#cbd5e1" };
  return <span style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}`, fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 5 }}>{value}</span>;
}

function getFileType(url) {
  if (!url) return "unknown";
  const lower = url.toLowerCase();
  if (lower.includes(".pdf") || lower.includes("/pdf")) return "pdf";
  if (lower.match(/\.(jpg|jpeg|png|gif|webp)/)) return "image";
  if (lower.includes("image/upload")) return "image";
  return "file";
}

function DocItem({ label, url }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  if (!url) return null;
  const type = getFileType(url);
  const filename = url.split("/").pop()?.split("?")[0] || "document";

  if (type === "image" && !imgError) {
    return (
      <div style={{ border: "1px solid #e2e8f0", borderRadius: 10, overflow: "hidden", background: "#f8fafc" }}>
        <div style={{ padding: "8px 12px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</span>
          <a href={url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: "#6366f1", textDecoration: "none", fontWeight: 500 }}>
            Open ↗
          </a>
        </div>
        <div style={{ position: "relative", minHeight: 80, background: "#f8fafc" }}>
          {!imgLoaded && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg className="animate-spin" width="20" height="20" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#6366f1" strokeWidth="4" />
                <path className="opacity-75" fill="#6366f1" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          )}
          <img src={url} alt={label} onLoad={() => setImgLoaded(true)} onError={() => setImgError(true)} style={{ width: "100%", maxHeight: 280, objectFit: "contain", display: imgLoaded ? "block" : "block", opacity: imgLoaded ? 1 : 0, transition: "opacity 0.2s", padding: 8 }} />
        </div>
      </div>
    );
  }

  if (type === "pdf") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", border: "1px solid #e2e8f0", borderRadius: 10, background: "#fff", textDecoration: "none", transition: "all 0.15s", cursor: "pointer" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#6366f1";
          e.currentTarget.style.background = "#f5f3ff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#e2e8f0";
          e.currentTarget.style.background = "#fff";
        }}
      >
        <div style={{ width: 40, height: 40, borderRadius: 8, background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <text x="5" y="19" style={{ font: "bold 5px sans-serif", fill: "#ef4444", stroke: "none" }}>
              PDF
            </text>
          </svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "#1e293b", marginBottom: 2 }}>{label}</p>
          <p style={{ fontSize: 11, color: "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{filename}</p>
        </div>
        <span style={{ fontSize: 11, color: "#6366f1", fontWeight: 500, flexShrink: 0 }}>Click to view ↗</span>
      </a>
    );
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", border: "1px solid #e2e8f0", borderRadius: 10, background: "#fff", textDecoration: "none" }}>
      <div style={{ width: 40, height: 40, borderRadius: 8, background: "#e0f2fe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="18" height="18" fill="none" stroke="#0284c7" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: "#1e293b" }}>{label}</p>
        <p style={{ fontSize: 11, color: "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{filename}</p>
      </div>
      <span style={{ fontSize: 11, color: "#6366f1", fontWeight: 500, flexShrink: 0 }}>View ↗</span>
    </a>
  );
}

function NomDetail({ nom, onClose }) {
  if (!nom) return null;
  const SEC = "fontSize:10,fontWeight:700,letterSpacing:0.1em,textTransform:uppercase,color:#64748b,marginBottom:12,paddingBottom:8,borderBottom:1px solid #f1f5f9";
  const Section = ({ title, children }) => (
    <div style={{ marginBottom: 24 }}>
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid #f1f5f9" }}>{title}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>{children}</div>
    </div>
  );
  const Field = ({ label, value, full }) => (
    <div style={full ? { gridColumn: "1/-1" } : {}}>
      <p style={{ fontSize: 10, color: "#94a3b8", fontWeight: 500, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</p>
      {value ? <p style={{ fontSize: 13, color: "#334155", lineHeight: 1.55 }}>{value}</p> : <p style={{ fontSize: 12, color: "#cbd5e1", fontStyle: "italic" }}>Not provided</p>}
    </div>
  );
  const TextArea = ({ label, value }) => (
    <div style={{ gridColumn: "1/-1" }}>
      <p style={{ fontSize: 10, color: "#94a3b8", fontWeight: 500, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</p>
      {value ? <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "12px 14px", fontSize: 13, color: "#475569", lineHeight: 1.75, whiteSpace: "pre-wrap" }}>{value}</div> : <p style={{ fontSize: 12, color: "#cbd5e1", fontStyle: "italic" }}>Not provided</p>}
    </div>
  );

  const fullName = [nom.firstName, nom.middleName, nom.lastName].filter(Boolean).join(" ");
  const nominatorName = nom.nominator ? [nom.nominator.firstName, nom.nominator.middleName, nom.nominator.lastName].filter(Boolean).join(" ") : null;
  const docs = nom.documents || {};
  const proofList = Array.isArray(docs.proofOfWork) ? docs.proofOfWork : docs.proofOfWork ? [docs.proofOfWork] : [];
  const hasAnyDoc = docs.photograph || proofList.length || docs.recommendationLetter || docs.mediaCoverage || docs.awardsCertificates;

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, background: "rgba(15,23,42,0.5)", backdropFilter: "blur(6px)" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 760, maxHeight: "92vh", overflowY: "auto", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 20, boxShadow: "0 32px 80px rgba(0,0,0,0.18)", fontFamily: "Inter,sans-serif" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid #f1f5f9", position: "sticky", top: 0, background: "#fff", zIndex: 10 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: 0 }}>{fullName}</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
              <Badge value={nom.awardType} map={awardColors} />
              <Badge value={nom.nominationType} map={nomTypeColors} />
              <span style={{ fontSize: 11, color: "#cbd5e1" }}>{nom._id}</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "#f1f5f9", border: "none", cursor: "pointer", color: "#64748b", width: 34, height: 34, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginLeft: 12 }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div style={{ padding: 24 }}>
          <Section title="Personal Information">
            <Field label="Full Name" value={fullName} />
            <Field label="Gender" value={nom.gender} />
            <Field label="Date of Birth" value={nom.dateOfBirth ? new Date(nom.dateOfBirth).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : null} />
            <Field label="Nationality" value={nom.nationality} />
            <Field label="Preferred Language" value={nom.preferredLanguage} />
          </Section>

          {/* <Section title="Contact Details">
            <Field label="Mobile" value={nom.mobileNumber} />
            <Field label="Alt. Mobile" value={nom.alternateMobileNumber} />
            <Field label="Email" value={nom.emailId} />
            <Field label="Address" full value={[nom.address, nom.city, nom.district, nom.state, nom.pincode, nom.country].filter(Boolean).join(", ")} />
          </Section> */}

          <Section title="Professional Details">
            <Field label="Work Type" value={nom.workAffiliationType} />
            <Field label="Organisation" value={nom.organizationName} />
            <Field label="Occupation / Designation" value={nom.occupationDesignation} />
            <Field label="Category / Domain" value={nom.categoryDomain} />
            <Field label="Field of Excellence" value={nom.fieldOfExcellence} />
            <Field label="Years of Experience" value={nom.experienceYears ? `${nom.experienceYears} years` : null} />
            <Field label="Impact Level" value={nom.impactLevel} />
            <Field label="Beneficiaries Count" value={nom.beneficiariesCount?.toLocaleString()} />
            <TextArea label="Work Description" value={nom.workDescription} />
          </Section>

          {nom.keySuccesses?.filter(Boolean).length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 10, paddingBottom: 8, borderBottom: "1px solid #f1f5f9" }}>Key Successes</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {nom.keySuccesses.filter(Boolean).map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 22, height: 22, borderRadius: 6, background: "#ede9fe", color: "#7c3aed", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                    <span style={{ fontSize: 13, color: "#475569", lineHeight: 1.6 }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {nom.awardsReceivedList?.filter(Boolean).length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 10, paddingBottom: 8, borderBottom: "1px solid #f1f5f9" }}>Awards Received</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {nom.awardsReceivedList.filter(Boolean).map((a, i) => (
                  <span key={i} style={{ background: "#fef9c3", color: "#92400e", border: "1px solid #fde68a", fontSize: 12, padding: "4px 10px", borderRadius: 6 }}>
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 10, paddingBottom: 8, borderBottom: "1px solid #f1f5f9" }}>Basis for Honour</p>
            <div style={{ background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: 12, padding: "14px 16px", fontSize: 13, color: "#4c1d95", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{nom.mainBasisForRespect}</div>
          </div>

          {nom.innovationDescription && (
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 10, paddingBottom: 8, borderBottom: "1px solid #f1f5f9" }}>Innovation</p>
              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "12px 14px", fontSize: 13, color: "#475569", lineHeight: 1.75, whiteSpace: "pre-wrap" }}>{nom.innovationDescription}</div>
            </div>
          )}

          {nom.nominator?.mobile && (
            <Section title="Nominator Details">
              <Field label="Name" value={nominatorName} />
              {/* <Field label="Mobile" value={nom.nominator.mobile} />
              <Field label="Email" value={nom.nominator.email} />
              <TextArea label="Address" value={nom.nominator.address} /> */}
              <TextArea label="Recommendation Note" value={nom.nominator.recommendationNote} />
            </Section>
          )}

          {hasAnyDoc && (
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid #f1f5f9" }}>Documents</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {docs.photograph && <DocItem label="Photograph" url={docs.photograph} />}
                {proofList.map((url, i) => (
                  <DocItem key={i} label={`Proof of Work${proofList.length > 1 ? ` ${i + 1}` : ""}`} url={url} />
                ))}
                {docs.recommendationLetter && <DocItem label="Recommendation Letter" url={docs.recommendationLetter} />}
                {docs.mediaCoverage && <DocItem label="Media Coverage" url={docs.mediaCoverage} />}
                {docs.awardsCertificates && <DocItem label="Awards Certificates" url={docs.awardsCertificates} />}
              </div>
            </div>
          )}

          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: "12px 16px", display: "flex", flexWrap: "wrap", gap: 20 }}>
            <div>
              <p style={{ fontSize: 10, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>Submitted</p>
              <p style={{ fontSize: 13, color: "#475569" }}>{new Date(nom.createdAt).toLocaleString("en-IN")}</p>
            </div>
            <div>
              <p style={{ fontSize: 10, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>Digital Signature</p>
              <p style={{ fontSize: 15, color: "#1e293b", fontStyle: "italic", fontFamily: "Georgia,serif" }}>{nom.digitalSignature}</p>
            </div>
            <div>
              <p style={{ fontSize: 10, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>Consent</p>
              <p style={{ fontSize: 13, color: nom.consentCheckbox ? "#059669" : "#dc2626", fontWeight: 500 }}>{nom.consentCheckbox ? "✓ Agreed" : "✗ Not agreed"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const SL = { fontSize: 11, fontWeight: 500, color: "#64748b", display: "block", marginBottom: 5, letterSpacing: "0.04em" };

export default function AdminDashboard() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [stats, setStats] = useState(null);
  const [nominations, setNominations] = useState([]);
  const [nomTotal, setNomTotal] = useState(0);
  const [nomPage, setNomPage] = useState(1);
  const [nomPages, setNomPages] = useState(1);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingNoms, setLoadingNoms] = useState(false);
  const [selectedNom, setSelectedNom] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const [filters, setFilters] = useState({ awardType: "", nominationType: "", gender: "", workAffiliationType: "", impactLevel: "", state: "", country: "", dateFrom: "", dateTo: "" });
  const [activeTab, setActiveTab] = useState("overview");
  const searchTimerRef = useRef(null);

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") !== "true") {
      router.replace("/admin");
      return;
    }
    setAuthed(true);
  }, []);

  useEffect(() => {
    if (!authed) return;
    setLoadingStats(true);
    fetch("/api/admin/dashboard?type=stats")
      .then((r) => r.json())
      .then(setStats)
      .finally(() => setLoadingStats(false));
  }, [authed]);

  const fetchNominations = useCallback(() => {
    if (!authed) return;
    setLoadingNoms(true);
    const p = new URLSearchParams({ type: "nominations", page: nomPage, limit: 20 });
    Object.entries(filters).forEach(([k, v]) => {
      if (v) p.set(k, v);
    });
    fetch(`/api/admin/dashboard?${p}`)
      .then((r) => r.json())
      .then((d) => {
        setNominations(d.nominations || []);
        setNomTotal(d.total || 0);
        setNomPages(d.pages || 1);
      })
      .finally(() => setLoadingNoms(false));
  }, [authed, filters, nomPage]);

  useEffect(() => {
    if (activeTab === "nominations") fetchNominations();
  }, [fetchNominations, activeTab]);

  const handleSearch = (q) => {
    setSearchQ(q);
    clearTimeout(searchTimerRef.current);
    if (!q.trim()) {
      setSearchResults(null);
      return;
    }
    searchTimerRef.current = setTimeout(() => {
      setSearching(true);
      fetch(`/api/admin/dashboard?type=search&q=${encodeURIComponent(q)}`)
        .then((r) => r.json())
        .then((d) => setSearchResults(d.results || []))
        .finally(() => setSearching(false));
    }, 350);
  };

  const openNomination = async (id) => {
    setLoadingDetail(true);
    const res = await fetch(`/api/admin/dashboard?type=nomination&id=${id}`);
    const data = await res.json();
    setSelectedNom(data.nomination);
    setLoadingDetail(false);
  };

  const logout = () => {
    sessionStorage.removeItem("admin_auth");
    router.replace("/admin");
  };
  const resetFilters = () => {
    setFilters({ awardType: "", nominationType: "", gender: "", workAffiliationType: "", impactLevel: "", state: "", country: "", dateFrom: "", dateTo: "" });
    setNomPage(1);
  };

  if (!authed) return null;

  const inputStyle = { background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, color: "#1e293b", fontSize: 12, padding: "7px 10px", fontFamily: "Inter,sans-serif", outline: "none", width: "100%", transition: "border-color 0.15s" };
  const selectStyle = { ...inputStyle, cursor: "pointer" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        .dash { font-family:'Inter',sans-serif; }
        .dash-row:hover { background:#f8fafc; }
        .dash-tab { padding:7px 14px; border-radius:8px; font-size:13px; font-weight:500; cursor:pointer; border:none; font-family:'Inter',sans-serif; transition:all 0.15s; }
        .dash-tab.on { background:#ede9fe; color:#6d28d9; }
        .dash-tab:not(.on) { background:none; color:#64748b; }
        .dash-tab:not(.on):hover { background:#f1f5f9; color:#334155; }
        input[type=date]::-webkit-calendar-picker-indicator { opacity:0.5; cursor:pointer; }
        ::-webkit-scrollbar{width:5px;height:5px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:#e2e8f0;border-radius:3px}
        select option { background:#fff; color:#1e293b; }
      `}</style>

      <div className="dash min-h-screen" style={{ background: "#f8fafc", color: "#1e293b" }}>
        <nav style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 24px", height: 54, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 40, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, padding: 2, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              <img src="/vikram-coin.png" alt="logo" style={{ width: 28, height: 28, objectFit: "contain", borderRadius: 8 }} />
            </div>
            {/* <span style={{ fontSize:15, fontWeight:700, color:'#0f172a' }}>Admin Dashboard</span> */}
            {/* <span style={{ fontSize:12, color:'#94a3b8' }}>Vikramaditya Samman</span> */}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {stats && (
              <span style={{ fontSize: 12, color: "#64748b" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block", marginRight: 5, verticalAlign: "middle" }} /> {stats.currentActive} online
              </span>
            )}
            <button onClick={logout} style={{ background: "#fef2f2", border: "1px solid #fca5a5", color: "#dc2626", fontSize: 12, fontWeight: 500, padding: "5px 12px", borderRadius: 8, cursor: "pointer", fontFamily: "Inter,sans-serif" }}>
              Sign Out
            </button>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div style={{ display: "inline-flex", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 4, gap: 2, marginBottom: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            {[
              { id: "overview", label: "Overview" },
              { id: "nominations", label: "Nominations" },
              { id: "search", label: "Search" },
            ].map((t) => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} className={`dash-tab ${activeTab === t.id ? "on" : ""}`}>
                {t.label}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <div>
              {loadingStats ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
                  {[...Array(4)].map((_, i) => (
                    <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, height: 104 }} />
                  ))}
                </div>
              ) : (
                stats && (
                  <>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14, marginBottom: 20 }} className="lg:grid-cols-4">
                      <StatCard
                        title="Total Nominations"
                        value={stats.totalNominations}
                        sub="All time"
                        color="#6366f1"
                        icon={
                          <svg width="15" height="15" fill="none" stroke="#6366f1" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeLinecap="round" />
                          </svg>
                        }
                      />
                      <StatCard
                        title="Today's Visitors"
                        value={stats.todayVisitors}
                        sub="Unique sessions"
                        color="#10b981"
                        icon={
                          <svg width="15" height="15" fill="none" stroke="#10b981" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" />
                            <circle cx="9" cy="7" r="4" />
                          </svg>
                        }
                      />
                      <StatCard
                        title="Total Visitors"
                        value={stats.totalVisitors?.toLocaleString()}
                        sub="Since launch"
                        color="#f59e0b"
                        icon={
                          <svg width="15" height="15" fill="none" stroke="#f59e0b" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M2 12h20M12 2a15.3 15.3 0 010 20" strokeLinecap="round" />
                          </svg>
                        }
                      />
                      <StatCard
                        title="Active Now"
                        value={stats.currentActive}
                        sub="Live sessions"
                        color="#ef4444"
                        icon={
                          <svg width="15" height="15" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M2 12h3M19 12h3M12 2v3M12 19v3" strokeLinecap="round" />
                          </svg>
                        }
                      />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]" style={{ gap:16, marginBottom:16 }}>
  <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:14, padding:20, boxShadow:'0 1px 6px rgba(0,0,0,0.04)' }}>
    <p style={{ fontSize:11, fontWeight:600, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:16 }}>Daily Visitors — Last 30 days</p>
    <LineChart data={stats.visitorHistory}/>
  </div>
  <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:14, padding:20, boxShadow:'0 1px 6px rgba(0,0,0,0.04)' }}>

                      <p style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>By Award Type</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                          {["International", "National", "Shikhar"].map((type) => {
                            const found = stats.awardTypeCounts?.find((a) => a._id === type);
                            const count = found?.count || 0;
                            const pct = Math.round((count / (stats.totalNominations || 1)) * 100);
                            const c = awardColors[type];
                            return (
                              <div key={type}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                  <span style={{ fontSize: 12, color: "#475569", fontWeight: 500 }}>{type}</span>
                                  <span style={{ fontSize: 12, color: "#94a3b8" }}>
                                    {count} ({pct}%)
                                  </span>
                                </div>
                                <div style={{ height: 6, background: "#f1f5f9", borderRadius: 3, overflow: "hidden" }}>
                                  <div style={{ height: "100%", width: `${pct}%`, background: c?.text || "#6366f1", borderRadius: 3, transition: "width 0.6s ease" }} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <p style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.07em", marginTop: 22, marginBottom: 10 }}>By Gender</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          {stats.genderCounts?.map((g) => (
                            <div key={g._id} style={{ display: "flex", justifyContent: "space-between" }}>
                              <span style={{ fontSize: 12, color: "#475569", textTransform: "capitalize" }}>{g._id}</span>
                              <span style={{ fontSize: 12, color: "#94a3b8" }}>{g.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
                      <div style={{ padding: "14px 20px", borderBottom: "1px solid #f1f5f9" }}>
                        <p style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.07em" }}>Recent Nominations</p>
                      </div>
                      <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                          <tbody>
                            {stats.recentNominations?.map((n) => (
                              <tr key={n._id} className="dash-row" style={{ borderBottom: "1px solid #f8fafc", cursor: "pointer" }} onClick={() => openNomination(n._id)}>
                                <td style={{ padding: "12px 20px" }}>
                                  <p style={{ fontSize: 13, fontWeight: 500, color: "#1e293b" }}>{[n.firstName, n.lastName].join(" ")}</p>
                                  <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>
                                    {n.city}, {n.state}
                                  </p>
                                </td>
                                <td style={{ padding: "12px 20px" }}>
                                  <Badge value={n.awardType} map={awardColors} />
                                </td>
                                <td style={{ padding: "12px 20px", fontSize: 11, color: "#94a3b8" }}>{new Date(n.createdAt).toLocaleDateString("en-IN")}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )
              )}
            </div>
          )}

          {activeTab === "nominations" && (
            <div>
              <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, padding: 16, marginBottom: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: "#64748b", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 12 }}>Filters</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }} className="sm:grid-cols-3 lg:grid-cols-5">
                  {[
                    { key: "awardType", label: "Award Type", opts: ["International", "National", "Shikhar"] },
                    { key: "nominationType", label: "Nom. Type", opts: ["Self", "Other", "Institution"] },
                    { key: "gender", label: "Gender", opts: ["male", "female", "other"] },
                    { key: "workAffiliationType", label: "Work Type", opts: ["Individual", "Organisation"] },
                    { key: "impactLevel", label: "Impact Level", opts: ["District", "State", "National", "International"] },
                  ].map((f) => (
                    <div key={f.key}>
                      <label style={SL}>{f.label}</label>
                      <select
                        value={filters[f.key]}
                        onChange={(e) => {
                          setFilters((p) => ({ ...p, [f.key]: e.target.value }));
                          setNomPage(1);
                        }}
                        style={selectStyle}
                      >
                        <option value="">All</option>
                        {f.opts.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                  <div>
                    <label style={SL}>State</label>
                    <input
                      style={inputStyle}
                      placeholder="e.g. MP"
                      value={filters.state}
                      onChange={(e) => {
                        setFilters((p) => ({ ...p, state: e.target.value }));
                        setNomPage(1);
                      }}
                    />
                  </div>
                  <div>
                    <label style={SL}>Country</label>
                    <input
                      style={inputStyle}
                      placeholder="e.g. India"
                      value={filters.country}
                      onChange={(e) => {
                        setFilters((p) => ({ ...p, country: e.target.value }));
                        setNomPage(1);
                      }}
                    />
                  </div>
                  <div>
                    <label style={SL}>From Date</label>
                    <input
                      type="date"
                      style={inputStyle}
                      value={filters.dateFrom}
                      onChange={(e) => {
                        setFilters((p) => ({ ...p, dateFrom: e.target.value }));
                        setNomPage(1);
                      }}
                    />
                  </div>
                  <div>
                    <label style={SL}>To Date</label>
                    <input
                      type="date"
                      style={inputStyle}
                      value={filters.dateTo}
                      onChange={(e) => {
                        setFilters((p) => ({ ...p, dateTo: e.target.value }));
                        setNomPage(1);
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <button onClick={resetFilters} style={{ background: "#fef2f2", border: "1px solid #fca5a5", color: "#dc2626", fontSize: 12, padding: "7px 14px", borderRadius: 8, cursor: "pointer", fontFamily: "Inter,sans-serif", width: "100%", fontWeight: 500 }}>
                      Clear All
                    </button>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <p style={{ fontSize: 13, color: "#64748b" }}>{loadingNoms ? "Loading…" : `${nomTotal} result${nomTotal !== 1 ? "s" : ""}`}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button
                    onClick={() => setNomPage((p) => Math.max(1, p - 1))}
                    disabled={nomPage === 1}
                    style={{ background: "#fff", border: "1px solid #e2e8f0", color: nomPage === 1 ? "#cbd5e1" : "#64748b", padding: "5px 12px", borderRadius: 8, cursor: nomPage === 1 ? "not-allowed" : "pointer", fontSize: 12, fontFamily: "Inter,sans-serif" }}
                  >
                    ← Prev
                  </button>
                  <span style={{ fontSize: 12, color: "#94a3b8" }}>
                    {nomPage} / {nomPages}
                  </span>
                  <button
                    onClick={() => setNomPage((p) => Math.min(nomPages, p + 1))}
                    disabled={nomPage === nomPages}
                    style={{ background: "#fff", border: "1px solid #e2e8f0", color: nomPage === nomPages ? "#cbd5e1" : "#64748b", padding: "5px 12px", borderRadius: 8, cursor: nomPage === nomPages ? "not-allowed" : "pointer", fontSize: 12, fontFamily: "Inter,sans-serif" }}
                  >
                    Next →
                  </button>
                </div>
              </div>

              <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 680 }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid #f1f5f9", background: "#f8fafc" }}>
                        {["Name", "Award", "Type", "Domain", "Location", "Date"].map((h) => (
                          <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {loadingNoms
                        ? [...Array(5)].map((_, i) => (
                            <tr key={i} style={{ borderBottom: "1px solid #f8fafc" }}>
                              {[...Array(6)].map((__, j) => (
                                <td key={j} style={{ padding: "14px 16px" }}>
                                  <div style={{ height: 11, background: "#f1f5f9", borderRadius: 4 }} />
                                </td>
                              ))}
                            </tr>
                          ))
                        : nominations.map((n) => (
                            <tr key={n._id} className="dash-row" style={{ borderBottom: "1px solid #f8fafc", cursor: "pointer" }} onClick={() => openNomination(n._id)}>
                              <td style={{ padding: "12px 16px" }}>
                                <p style={{ fontSize: 13, fontWeight: 500, color: "#1e293b" }}>{[n.firstName, n.middleName, n.lastName].filter(Boolean).join(" ")}</p>
                                <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{n.emailId}</p>
                              </td>
                              <td style={{ padding: "12px 16px" }}>
                                <Badge value={n.awardType} map={awardColors} />
                              </td>
                              <td style={{ padding: "12px 16px" }}>
                                <Badge value={n.nominationType} map={nomTypeColors} />
                              </td>
                              <td style={{ padding: "12px 16px", fontSize: 12, color: "#64748b" }}>{n.categoryDomain}</td>
                              <td style={{ padding: "12px 16px", fontSize: 12, color: "#64748b" }}>{[n.city, n.state].filter(Boolean).join(", ")}</td>
                              <td style={{ padding: "12px 16px", fontSize: 11, color: "#94a3b8" }}>{new Date(n.createdAt).toLocaleDateString("en-IN")}</td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "search" && (
            <div>
              <div style={{ position: "relative", marginBottom: 20 }}>
                <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>
                  {searching ? (
                    <svg className="animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#6366f1" strokeWidth="4" />
                      <path className="opacity-75" fill="#6366f1" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
                <input
                  style={{ width: "100%", background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 12, color: "#1e293b", fontSize: 14, padding: "12px 14px 12px 42px", fontFamily: "Inter,sans-serif", outline: "none", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", transition: "border-color 0.15s" }}
                  placeholder="Search by name, email, phone, city… (e.g. 'Priyansh 9876543210')"
                  value={searchQ}
                  onChange={(e) => handleSearch(e.target.value)}
                  autoFocus
                  onFocus={(e) => {
                    e.target.style.borderColor = "#6366f1";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                  }}
                />
                {searchQ && (
                  <button
                    onClick={() => {
                      setSearchQ("");
                      setSearchResults(null);
                    }}
                    style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: 4, display: "flex", alignItems: "center" }}
                  >
                    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {!searchQ && (
                <div style={{ textAlign: "center", padding: "64px 20px", color: "#94a3b8" }}>
                  <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ margin: "0 auto 16px", display: "block", color: "#cbd5e1" }}>
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" strokeLinecap="round" />
                  </svg>
                  <p style={{ fontSize: 15, color: "#475569", marginBottom: 6, fontWeight: 500 }}>Search nominations</p>
                  <p style={{ fontSize: 13 }}>Type a name, phone, email, or combine multiple terms</p>
                </div>
              )}

              {searchResults && (
                <div>
                  <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 12 }}>
                    {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
                  </p>
                  {searchResults.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "48px 20px", color: "#94a3b8", fontSize: 14 }}>No matching nominations found.</div>
                  ) : (
                    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                      {searchResults.map((n, i) => (
                        <div key={n._id} className="dash-row" style={{ padding: "14px 20px", borderBottom: i < searchResults.length - 1 ? "1px solid #f8fafc" : "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }} onClick={() => openNomination(n._id)}>
                          <div style={{ width: 40, height: 40, borderRadius: 12, background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", color: "#7c3aed", fontSize: 15, fontWeight: 700, flexShrink: 0 }}>{n.firstName?.[0]?.toUpperCase()}</div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                              <p style={{ fontSize: 14, fontWeight: 500, color: "#1e293b" }}>{[n.firstName, n.middleName, n.lastName].filter(Boolean).join(" ")}</p>
                              <Badge value={n.awardType} map={awardColors} />
                              <Badge value={n.nominationType} map={nomTypeColors} />
                            </div>
                            <div style={{ display: "flex", gap: 12, marginTop: 3, flexWrap: "wrap" }}>
                              {/* <span style={{ fontSize: 12, color: "#64748b" }}>{n.mobileNumber}</span>
                              <span style={{ fontSize: 12, color: "#94a3b8" }}>{n.emailId}</span> */}
                              <span style={{ fontSize: 12, color: "#94a3b8" }}>{[n.city, n.state].filter(Boolean).join(", ")}</span>
                            </div>
                          </div>
                          <div style={{ textAlign: "right", flexShrink: 0 }}>
                            <p style={{ fontSize: 12, color: "#64748b" }}>{n.categoryDomain}</p>
                            <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{new Date(n.createdAt).toLocaleDateString("en-IN")}</p>
                          </div>
                          <svg width="14" height="14" fill="none" stroke="#94a3b8" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {loadingDetail && (
          <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(15,23,42,0.4)", backdropFilter: "blur(4px)" }}>
            <div style={{ background: "#fff", borderRadius: 14, padding: "18px 24px", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }}>
              <svg className="animate-spin" width="18" height="18" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#6366f1" strokeWidth="4" />
                <path className="opacity-75" fill="#6366f1" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span style={{ fontSize: 14, color: "#475569", fontFamily: "Inter,sans-serif" }}>Loading nomination…</span>
            </div>
          </div>
        )}
        {selectedNom && <NomDetail nom={selectedNom} onClose={() => setSelectedNom(null)} />}
      </div>
    </>
  );
}
