import { useLang } from "../context/LanguageContext";
import { LangSwitch } from "../components/UI/LangSwitch";
import { lostReportsDB } from "../utils/dataStore";

export default function LostReportsViewer({ guardianData, onBack, onUpdateGuardian }) {
  const { t } = useLang();
  
  // Enrich reports with data from lostReportsDB if missing
  const enrichReport = (report) => {
    // Try to find the full report in lostReportsDB
    const fullReport = lostReportsDB.find(r => r.id === report.id);
    if (fullReport) {
      return {
        ...report,
        image: fullReport.image || report.image,
        deviceInfo: fullReport.deviceInfo || report.deviceInfo
      };
    }
    return report;
  };
  
  const reports = (guardianData.lostReports || []).map(enrichReport);

  const handleToggleRetrieved = (reportId) => {
    const reportIndex = guardianData.lostReports.findIndex(r => r.id === reportId);
    if (reportIndex === -1) return;

    const report = guardianData.lostReports[reportIndex];
    if (report.status === 'retrieved') return;

    const updatedReports = [...guardianData.lostReports];
    updatedReports[reportIndex] = {
      ...report,
      status: 'retrieved',
      retrievedAt: new Date().toISOString()
    };

    const updatedGuardian = {
      ...guardianData,
      lostReports: updatedReports
    };

    // Update in localStorage
    const accounts = JSON.parse(localStorage.getItem("sanad-accounts")) || [];
    const guardianIndex = accounts.findIndex(acc => acc.email === guardianData.email);
    if (guardianIndex !== -1) {
      accounts[guardianIndex] = updatedGuardian;
      localStorage.setItem("sanad-accounts", JSON.stringify(accounts));
    }

    onUpdateGuardian(updatedGuardian);
  };

  const formatDuration = (reportedAt, retrievedAt) => {
    const start = new Date(reportedAt);
    const end = retrievedAt ? new Date(retrievedAt) : new Date();
    const diffMs = end - start;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays}d ${diffHours % 24}h`;
    if (diffHours > 0) return `${diffHours}h ${diffMins % 60}m`;
    return `${diffMins}m`;
  };

  return (
    <div style={{ minHeight: "100vh", padding: 24, position: "relative" }}>
      <div className="mesh-bg" /><div className="texture-overlay" />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto" }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,.9)", border: "1px solid rgba(0,0,0,.1)", borderRadius: 12, padding: "10px 20px", marginBottom: 20, cursor: "pointer", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
          ← {t('backDash')}
        </button>

        <div style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 20, padding: 32, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
          <h2 style={{ fontSize: 24, marginBottom: 24 }}>{t('lostReports')}</h2>

          {reports.length === 0 ? (
            <p style={{ color: "var(--ink-muted)", textAlign: "center", padding: 40 }}>{t('noReports')}</p>
          ) : (
            <div>
              {reports.map((report) => (
                <div key={report.id} className={`report-card ${report.status === 'retrieved' ? 'retrieved' : ''}`}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
                    <div>
                      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{report.dependentName}</h3>
                      <p style={{ fontSize: 13, color: "var(--ink-muted)" }}>ID: {report.dependentId}</p>
                    </div>
                    <span style={{ 
                      padding: "4px 12px", 
                      borderRadius: 8, 
                      fontSize: 12, 
                      fontWeight: 600,
                      background: report.status === 'retrieved' ? '#4ade80' : 'var(--coral)',
                      color: '#fff'
                    }}>
                      {report.status === 'retrieved' ? t('retrieved') : t('active')}
                    </span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16, fontSize: 14 }}>
                    <div>
                      <strong>{t('reportedAt')}:</strong><br />
                      {new Date(report.reportedAt).toLocaleString()}
                    </div>
                    <div>
                      <strong>{t('duration')}:</strong><br />
                      {formatDuration(report.reportedAt, report.retrievedAt)}
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <strong>{t('lastSeenLocation')}:</strong><br />
                      {report.location.lat.toFixed(6)}, {report.location.lng.toFixed(6)}
                    </div>
                  </div>

                  {report.image && (
                    <div style={{ marginBottom: 16 }}>
                      <img src={report.image} alt="Report" className="photo-preview" />
                    </div>
                  )}

                  {report.deviceInfo && (
                    <details style={{ marginBottom: 16, fontSize: 13 }}>
                      <summary style={{ cursor: "pointer", fontWeight: 600, marginBottom: 8 }}>{t('deviceInfo')}</summary>
                      <div style={{ background: "rgba(0,0,0,.03)", padding: 12, borderRadius: 8, fontSize: 12, fontFamily: "monospace" }}>
                        <div><strong>{t('platform')}:</strong> {report.deviceInfo.platform || 'Unknown'}</div>
                        <div><strong>{t('browser')}:</strong> {report.deviceInfo.browser || 'Unknown'}</div>
                        <div><strong>Screen:</strong> {report.deviceInfo.screenResolution || 'Unknown'}</div>
                      </div>
                    </details>
                  )}

                  {report.retrievedAt && (
                    <div style={{ marginBottom: 16, padding: 12, background: "rgba(74, 222, 128, 0.1)", borderRadius: 8, fontSize: 14 }}>
                      <strong>{t('retrievedAt')}:</strong> {new Date(report.retrievedAt).toLocaleString()}
                    </div>
                  )}

                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={report.status === 'retrieved'}
                        onChange={() => handleToggleRetrieved(report.id)}
                        disabled={report.status === 'retrieved'}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                    <span style={{ fontSize: 14, fontWeight: 600, color: report.status === 'retrieved' ? '#4ade80' : 'var(--ink)' }}>
                      {report.status === 'retrieved' ? t('retrieved') : t('markRetrieved')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
