import { useLang } from "../../context/LanguageContext";
import { LangSwitch } from "../../components/UI/LangSwitch";
import { EditIcon, AlertIcon, UsersIcon } from "../../components/UI/Icons";
import { ProfileModal } from "../../modals/ProfileModal";
import { ManageDependentsModal } from "../../modals/ManageDependentsModal";

function ActivityLog({ isOutside, hasDependent, t }) {
  const activities = hasDependent 
    ? [
        { icon: isOutside ? "⚠️" : "✓", msg: isOutside ? t('outsideMsg') : t('insideMsg'), time: t('now'), type: isOutside ? "alert" : "normal" },
        { icon: "📍", msg: t('locUpdate'), time: `2 ${t('min')}`, type: "normal" },
        { icon: "🔍", msg: t('sysCheck'), time: `15 ${t('min')}`, type: "normal" }
      ]
    : [
        { icon: "📍", msg: t('locUpdate'), time: `2 ${t('min')}`, type: "normal" },
        { icon: "🔍", msg: t('sysCheck'), time: `15 ${t('min')}`, type: "normal" }
      ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {activities.map((act, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, background: act.type === "alert" ? "rgba(212,117,106,.08)" : "rgba(74,144,164,.05)", borderRadius: 10, border: `1px solid ${act.type === "alert" ? "rgba(212,117,106,.2)" : "rgba(74,144,164,.15)"}` }}>
          <span style={{ fontSize: 20 }}>{act.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: act.type === "alert" ? "var(--coral)" : "var(--ink)" }}>{act.msg}</div>
            <div style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 2 }}>{act.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function DashboardView({
  guardianData, dependentLocation, safeZoneCenter, onLogout, onViewMap, onCopyToken, 
  onEditSafeZone, onViewProfile, onManageDependents, isOutsideSafeZone, isUsingTestLocation,
  activeReportsCount, onViewReports, isDependentLocationHidden, showProfile, setShowProfile,
  showManageDependents, setShowManageDependents, updateGuardianData
}) {
  const { t } = useLang();
  const reportsCount = activeReportsCount !== undefined ? activeReportsCount : (guardianData.lostReports || []).filter(r => r.status === 'active').length;
  const effectiveOutside = isDependentLocationHidden || isOutsideSafeZone;

  return (
    <div style={{ minHeight: "100vh", background: "var(--ice-blue)", position: "relative", paddingBottom: 40 }}>
      <div className="mesh-bg" /><div className="texture-overlay" />
      <LangSwitch />
      {showProfile && <ProfileModal guardianData={guardianData} onClose={() => setShowProfile(false)} onUpdate={updateGuardianData} />}
      {showManageDependents && <ManageDependentsModal guardianData={guardianData} onClose={() => setShowManageDependents(false)} onUpdate={updateGuardianData} />}

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "16px 16px 0" }}>
        <div style={{ display: "flex", flexDirection: window.innerWidth <= 640 ? "column" : "row", justifyContent: "space-between", alignItems: window.innerWidth <= 640 ? "flex-start" : "center", marginBottom: window.innerWidth <= 640 ? 24 : 32, gap: window.innerWidth <= 640 ? 16 : 0 }}>
          <div>
            <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: window.innerWidth <= 480 ? 22 : 28, fontWeight: 600, marginBottom: 4 }}>{t('welcome')}, {guardianData.fullName.split(' ')[0]}</h1>
            <p style={{ fontSize: window.innerWidth <= 480 ? 13 : 14, color: "var(--ink-muted)" }}>{t('dash')}</p>
          </div>
          <div style={{ display: "flex", gap: window.innerWidth <= 480 ? 8 : 12, flexWrap: "wrap", width: window.innerWidth <= 640 ? "100%" : "auto" }}>
            <button onClick={onViewProfile} className="btn-primary btn-secondary" style={{ width: window.innerWidth <= 640 ? "auto" : "auto", padding: window.innerWidth <= 480 ? "8px 16px" : "10px 20px", fontSize: window.innerWidth <= 480 ? 13 : 14, flex: window.innerWidth <= 640 ? "1" : "none" }}>
              👤
            </button>
            <button onClick={onManageDependents} className="btn-primary btn-secondary" style={{ width: window.innerWidth <= 640 ? "auto" : "auto", padding: window.innerWidth <= 480 ? "8px 14px" : "10px 18px", fontSize: window.innerWidth <= 480 ? 13 : 14, flex: window.innerWidth <= 640 ? "1" : "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <UsersIcon />
            </button>
            <button onClick={onLogout} className="btn-primary btn-coral" style={{ width: window.innerWidth <= 640 ? "auto" : "auto", padding: window.innerWidth <= 480 ? "8px 16px" : "10px 20px", fontSize: window.innerWidth <= 480 ? 13 : 14, flex: window.innerWidth <= 640 ? "1" : "none" }}>
              {t('logout')}
            </button>
          </div>
        </div>

        {guardianData.dependent && (isOutsideSafeZone || isDependentLocationHidden) && (
          <div 
            className="fade-up alert-pulse" 
            style={{ 
              background: "linear-gradient(135deg, #dc2626, #b91c1c)", 
              color: "#fff", 
              padding: window.innerWidth <= 480 ? 16 : 24, 
              borderRadius: window.innerWidth <= 480 ? 12 : 16, 
              marginBottom: 24,
              boxShadow: "0 8px 32px rgba(220, 38, 38, 0.4)",
              border: "2px solid #fca5a5",
              cursor: "pointer"
            }}
            onClick={onViewMap}
          >
            <div style={{ display: "flex", alignItems: "center", gap: window.innerWidth <= 480 ? 12 : 16 }}>
              <div style={{ fontSize: window.innerWidth <= 480 ? 36 : 48 }}>🚨</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: window.innerWidth <= 480 ? 16 : 20, fontWeight: 700, marginBottom: 6 }}>
                  {isDependentLocationHidden ? t('dependentUntrackable') : t('alertTitle')}
                </h3>
                <p style={{ fontSize: window.innerWidth <= 480 ? 12 : 14, opacity: 0.95 }}>
                  {isDependentLocationHidden ? t('dependentMissingAlert') : t('alertSub')}
                </p>
              </div>
              <div style={{ fontSize: window.innerWidth <= 480 ? 20 : 28 }}>→</div>
            </div>
          </div>
        )}

        {isUsingTestLocation && (
          <div style={{ background: "var(--azure-pale)", color: "var(--azure-dark)", padding: 16, borderRadius: 12, marginBottom: 24, fontSize: 14, textAlign: "center" }}>
            ⚠️ {t('usingTestLoc')}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 24 }}>
          <div className="fade-up" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 16, padding: 24, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--ink-muted)", marginBottom: 16 }}>{t('patStatus')}</h3>
            {guardianData.dependent ? (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: effectiveOutside ? "var(--coral)" : "#4ade80", boxShadow: effectiveOutside ? "0 0 8px var(--coral)" : "0 0 8px #4ade80" }} />
                  <span style={{ fontSize: 18, fontWeight: 600, color: effectiveOutside ? "var(--coral)" : "#16a34a" }}>
                    {isDependentLocationHidden ? "⚠️ Untrackable" : (effectiveOutside ? t('outside') : t('inside'))}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: "var(--ink-light)" }}>
                  {isDependentLocationHidden ? "Dependent location is currently Unknown" : (effectiveOutside ? t('patOutside') : t('patInside'))}
                </p>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0", color: "var(--ink-muted)" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>⏳</div>
                <div style={{ fontSize: 13 }}>{t('noDependentLinked')}</div>
              </div>
            )}
          </div>
          <div className="fade-up fade-up-d1" style={{ background: reportsCount > 0 ? "linear-gradient(135deg, rgba(235,111,111,.12), rgba(235,111,111,.06))" : "rgba(0,0,0,.02)", borderRadius: 16, padding: 24, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>{reportsCount > 0 ? "🚨" : "📋"}</div>
            <p style={{ fontSize: 13, color: "var(--ink-muted)", marginBottom: 4 }}>{t('lostReports')}</p>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: reportsCount > 0 ? "var(--coral)" : "var(--ink)" }}>
              {reportsCount} {t('active')}
            </h3>
            <p style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 8 }}>
              {(guardianData.lostReports || []).length} {t('reportHistory')}
            </p>
          </div>
          <div className="fade-up fade-up-d1" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 16, padding: 24, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--ink-muted)", marginBottom: 16 }}>{t('patInfoTitle')}</h3>
            {guardianData.dependent ? (
              <div style={{ fontSize: 13, lineHeight: 1.8 }}>
                <div><strong>{t('nameLabel')}:</strong> {guardianData.dependent.fullName}</div>
                <div><strong>{t('email')}:</strong> {guardianData.dependent.email}</div>
                <div><strong>{t('phone')}:</strong> {guardianData.dependent.phone}</div>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0", color: "var(--ink-muted)" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>⏳</div>
                <div style={{ fontSize: 13 }}>{t('noDependentLinked')}</div>
              </div>
            )}
          </div>
        </div>

        <div className="fade-up fade-up-d2" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 16, padding: 24, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)", marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>{t('quickAct')}</h3>
          <div style={{ display: "grid", gap: 12 }}>
            <button className="btn-primary" onClick={onViewMap} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              🗺️ {t('viewMap')}
            </button>
            <button className="btn-primary btn-secondary" onClick={onEditSafeZone} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <EditIcon /> {t('editSafeZone')}
            </button>
            <button className="btn-primary btn-secondary" onClick={onCopyToken} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              📋 {t('copyLink')}
            </button>
            {(guardianData.lostReports || []).length > 0 && (
              <button className="btn-primary btn-danger" onClick={onViewReports}>
                <AlertIcon /> {t('viewReports')} ({(guardianData.lostReports || []).length})
              </button>
            )}
          </div>
        </div>

        <div className="fade-up fade-up-d3" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 16, padding: 24, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>{t('recent')}</h3>
          <ActivityLog isOutside={effectiveOutside} hasDependent={!!guardianData.dependent} t={t} />
        </div>
      </div>
    </div>
  );
}
