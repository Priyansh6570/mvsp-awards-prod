"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    if (username === "veerbharat2420" && password === "VeerBharat@2420") {
      sessionStorage.setItem("admin_auth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("उपयोगकर्ता नाम या पासवर्ड गलत है।");
    }
    setLoading(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        .al-root { font-family:'Inter',sans-serif; }
        @keyframes al-fade { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .al-card { animation: al-fade 0.4s ease forwards; }
        @keyframes al-shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-5px)} 40%,80%{transform:translateX(5px)} }
        .al-shake { animation: al-shake 0.4s ease forwards; }
        .al-input {
          width:100%; background:#fff; border:1.5px solid #e2e8f0; color:#1e293b;
          border-radius:10px; padding:11px 14px; font-size:14px; font-family:'Inter',sans-serif;
          outline:none; transition:all 0.2s;
        }
        .al-input::placeholder { color:#94a3b8; }
        .al-input:focus { border-color:#6366f1; box-shadow:0 0 0 3px rgba(99,102,241,0.1); }
        .al-input.err { border-color:#f87171; box-shadow:0 0 0 3px rgba(248,113,113,0.1); }
        .al-btn {
          width:100%; padding:12px; border-radius:10px; font-size:14px; font-weight:600;
          font-family:'Inter',sans-serif; cursor:pointer; border:none;
          background:linear-gradient(135deg,#6366f1,#8b5cf6); color:white;
          transition:all 0.2s; box-shadow:0 4px 16px rgba(99,102,241,0.28);
        }
        .al-btn:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 6px 24px rgba(99,102,241,0.38); }
        .al-btn:disabled { opacity:0.55; cursor:not-allowed; }
      `}</style>

      <div className="al-root min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(160deg,#f8faff 0%,#f0f4ff 100%)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 30% 20%,rgba(99,102,241,0.06) 0%,transparent 50%),radial-gradient(circle at 80% 80%,rgba(139,92,246,0.05) 0%,transparent 50%)' }} />

        <div className="al-card relative w-full max-w-sm">
          <div style={{ background:'#fff', borderRadius:20, boxShadow:'0 8px 48px rgba(0,0,0,0.1)', border:'1px solid rgba(99,102,241,0.1)', padding:'36px 32px' }}>

            <div className="text-center mb-8">
              <div className="relative inline-block mb-4">
                <div style={{ width:72, height:72, borderRadius:'50%', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', padding:3, display:'inline-block' }}>
                  <div style={{ width:'100%', height:'100%', borderRadius:'50%', background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
                    <img src="/vikram-coin.png" alt="Vikramaditya" style={{ width:60, height:60, objectFit:'contain' }} />
                  </div>
                </div>
              </div>
              <h1 style={{ fontSize:20, fontWeight:700, color:'#1e293b', margin:0 }}>Admin Portal</h1>
              <p style={{ fontSize:12, color:'#94a3b8', marginTop:5 }}>Samrat Vikramaditya Samman</p>
            </div>

            <form onSubmit={handleLogin} style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <div>
                <label style={{ display:'block', fontSize:12, fontWeight:600, color:'#475569', letterSpacing:'0.04em', textTransform:'uppercase', marginBottom:6 }}>Username</label>
                <input type="text" className={`al-input${error?' err':''}`} placeholder="Enter username" value={username} onChange={e=>{setUsername(e.target.value);setError("");}} autoComplete="username" spellCheck={false} />
              </div>

              <div>
                <label style={{ display:'block', fontSize:12, fontWeight:600, color:'#475569', letterSpacing:'0.04em', textTransform:'uppercase', marginBottom:6 }}>Password</label>
                <div style={{ position:'relative' }}>
                  <input type={showPass?"text":"password"} className={`al-input${error?' err':''}`} placeholder="Enter password" value={password} onChange={e=>{setPassword(e.target.value);setError("");}} style={{ paddingRight:42 }} autoComplete="current-password" />
                  <button type="button" onClick={()=>setShowPass(p=>!p)} style={{ position:'absolute', right:13, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'#94a3b8', padding:0, display:'flex', alignItems:'center' }}>
                    {showPass
                      ? <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round"/></svg>
                      : <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }
                  </button>
                </div>
              </div>

              {error && (
                <div className="al-shake" style={{ background:'#fef2f2', border:'1px solid #fca5a5', borderRadius:8, padding:'9px 12px', display:'flex', alignItems:'center', gap:8 }}>
                  <svg width="14" height="14" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  <span style={{ color:'#dc2626', fontSize:13 }}>{error}</span>
                </div>
              )}

              <button type="submit" className="al-btn" disabled={loading||!username||!password}>
                {loading
                  ? <span style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                      <svg className="animate-spin" width="15" height="15" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      Verifying…
                    </span>
                  : 'Sign In'
                }
              </button>
            </form>

            <p style={{ textAlign:'center', color:'#cbd5e1', fontSize:11, marginTop:24 }}>Restricted access · Authorised personnel only</p>
          </div>
        </div>
      </div>
    </>
  );
}