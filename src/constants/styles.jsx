export const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&family=Tajawal:wght@300;400;500;700&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{--ice-blue:#e8f4f8;--sky-white:#f0f9ff;--ink:#1a1a1a;--ink-light:#5a5550;--ink-muted:#8a857e;--azure:#4a90a4;--azure-light:#6db4c7;--azure-dark:#2d6b7d;--azure-pale:#e3f2f7;--coral:#d4756a;--coral-light:#e8948b;--cyan:#3d9db5;--cyan-pale:#daf2f7;--card-bg:rgba(255,255,255,0.72);--shadow:0 2px 24px rgba(26,26,26,0.07);--shadow-hover:0 6px 32px rgba(26,26,26,0.13)}
    body{font-family:'DM Sans',system-ui,sans-serif;background:var(--ice-blue);color:var(--ink);min-height:100vh;-webkit-font-smoothing:antialiased}
    [lang="ar"] body{font-family:'Tajawal','DM Sans',system-ui,sans-serif}
    ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#b8d4dc;border-radius:3px}
    .texture-overlay{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");opacity:.6}
    .mesh-bg{position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(ellipse 70% 50% at 10% 20%,rgba(74,144,164,.12) 0%,transparent 70%),radial-gradient(ellipse 60% 60% at 90% 80%,rgba(61,157,181,.10) 0%,transparent 70%),radial-gradient(ellipse 50% 40% at 50% 50%,rgba(109,180,199,.08) 0%,transparent 70%)}
    .input-base{width:100%;background:rgba(255,255,255,.8);border:1.5px solid #d4e8ef;border-radius:10px;padding:13px 16px;font-family:inherit;font-size:14px;color:var(--ink);transition:border-color .25s,box-shadow .25s,background .25s;outline:none}
    .input-base::placeholder{color:var(--ink-muted)}
    .input-base:focus{border-color:var(--azure);box-shadow:0 0 0 3px rgba(74,144,164,.15);background:#fff}
    .input-base.err{border-color:var(--coral)}
    .btn-primary{width:100%;background:var(--azure);color:#fff;border:none;border-radius:10px;padding:14px;font-family:inherit;font-size:15px;font-weight:600;letter-spacing:.02em;cursor:pointer;transition:background .2s,transform .15s,box-shadow .2s;position:relative;overflow:hidden}
    .btn-primary:hover{background:var(--azure-dark);box-shadow:0 4px 16px rgba(74,144,164,.3);transform:translateY(-1px)}
    .btn-primary:active{transform:translateY(0)}
    .btn-primary:disabled{background:#b5b0a8;cursor:not-allowed;transform:none;box-shadow:none}
    .btn-coral{background:var(--coral)!important}.btn-coral:hover{background:#c0635a!important;box-shadow:0 4px 16px rgba(212,117,106,.35)!important}
    .btn-secondary{background:#fff;color:var(--ink);border:1.5px solid #d4e8ef}
    .btn-secondary:hover{border-color:var(--azure);background:var(--azure-pale)}
    @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
    .btn-primary:not(:disabled)::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,.15) 50%,transparent 100%);background-size:200% 100%;animation:shimmer 2.5s infinite linear}
    @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
    .fade-up{animation:fadeUp .45s cubic-bezier(.22,1,.36,1) both}
    .fade-up-d1{animation-delay:.08s}.fade-up-d2{animation-delay:.16s}.fade-up-d3{animation-delay:.24s}.fade-up-d4{animation-delay:.32s}.fade-up-d5{animation-delay:.40s}
    @keyframes toastSlide{from{opacity:0;transform:translateX(100px)}to{opacity:1;transform:translateX(0)}}
    .toast{position:fixed;top:24px;right:24px;z-index:9999;background:var(--ink);color:#fff;padding:14px 22px;border-radius:12px;font-size:14px;font-weight:500;box-shadow:0 8px 32px rgba(0,0,0,.2);animation:toastSlide .35s cubic-bezier(.22,1,.36,1) both;max-width:320px;display:flex;align-items:center;gap:10px}
    [dir="rtl"] .toast{right:auto;left:24px}
    .modal-backdrop{position:fixed;inset:0;background:rgba(26,26,26,.45);backdrop-filter:blur(6px);z-index:800;display:flex;align-items:center;justify-content:center;padding:20px}
    @keyframes modalPop{from{opacity:0;transform:scale(.94) translateY(12px)}to{opacity:1;transform:scale(1) translateY(0)}}
    .modal-card{background:#fff;border-radius:22px;box-shadow:0 24px 60px rgba(0,0,0,.18);animation:modalPop .3s cubic-bezier(.22,1,.36,1) both;max-width:520px;width:100%;max-height:90vh;overflow-y:auto}
    .leaflet-container{border-radius:12px;font-family:inherit!important;z-index:1}
    .leaflet-control-zoom{margin:8px!important}
    .leaflet-popup-content-wrapper{border-radius:10px;font-family:inherit}
    @keyframes alertPulse{0%,100%{opacity:1}50%{opacity:.7}}
    .alert-pulse{animation:alertPulse 1.5s ease-in-out infinite}
    .role-card{background:var(--card-bg);backdrop-filter:blur(20px);border-radius:16px;padding:24px;border:2px solid rgba(255,255,255,.6);cursor:pointer;transition:all .25s;text-align:center}
    .role-card:hover{border-color:var(--azure);box-shadow:var(--shadow-hover);transform:translateY(-2px)}
    .role-card.selected{border-color:var(--azure);background:var(--azure-pale);box-shadow:0 0 0 3px rgba(74,144,164,.15)}
    .location-search{position:absolute;top:16px;left:50%;transform:translateX(-50%);z-index:1000;width:90%;max-width:400px}
    [dir="rtl"] .location-search{left:auto;right:50%;transform:translateX(50%)}
    .toggle-switch {
  position: relative; display: inline-block; width: 52px; height: 28px;
}
.toggle-switch input {
  opacity: 0; width: 0; height: 0;
}
.toggle-slider {
  position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
  background-color: #ccc; transition: .4s; border-radius: 28px;
}
.toggle-slider:before {
  position: absolute; content: ""; height: 20px; width: 20px; left: 4px; bottom: 4px;
  background-color: white; transition: .4s; border-radius: 50%;
}
input:checked + .toggle-slider {
  background-color: var(--sage);
}
input:checked + .toggle-slider:before {
  transform: translateX(24px);
}
input:disabled + .toggle-slider {
  background-color: #999; cursor: not-allowed; opacity: 0.6;
}
.photo-preview {
  width: 120px; height: 120px; border-radius: 12px; object-fit: cover;
  border: 2px solid rgba(74,144,164,.2); box-shadow: 0 2px 12px rgba(0,0,0,.08);
}
.report-card {
  background: var(--card-bg); border-radius: 12px; padding: 16px; margin-bottom: 12px;
  border-left: 4px solid var(--azure); box-shadow: var(--shadow);
}
.report-card.retrieved {
  border-left-color: var(--sage); opacity: 0.7;
}
.btn-danger {
  background: linear-gradient(135deg, var(--coral), #d45d5d); color: #fff;
  box-shadow: 0 2px 12px rgba(235,111,111,.25);
}
.btn-danger:hover { box-shadow: 0 4px 20px rgba(235,111,111,.35); }
    
    @media (max-width: 768px) {
      .toast{top:12px;right:12px;left:12px;max-width:none;font-size:13px;padding:12px 16px}
      [dir="rtl"] .toast{left:12px;right:12px}
      .modal-backdrop{padding:12px}
      .modal-card{max-width:100%;border-radius:16px;max-height:95vh}
      .location-search{width:calc(100% - 24px);top:12px}
      .btn-primary{padding:12px;font-size:14px}
      .input-base{padding:11px 14px;font-size:13px}
    }
    
    @media (max-width: 480px) {
      .toast{font-size:12px;padding:10px 14px}
      .modal-card{border-radius:12px}
      .btn-primary{font-size:13px}
    }
  `}</style>
);
