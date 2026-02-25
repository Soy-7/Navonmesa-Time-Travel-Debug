import { useState, useRef } from 'react';
import { useToast } from '../utils/ToastProvider';
import Footer from '../components/Footer';

const CPM_MAP = { Gaming: 2, Education: 5, Music: 1.5, Comedy: 3, Travel: 4, Sports: 2.5, Health: 3.5 };

export default function Upload() {
  const addToast = useToast();
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('Education');
  const [chapters, setChapters] = useState([{ time: '0:00', label: 'Intro' }]);
  const [views, setViews] = useState(10000);
  const [publishing, setPublishing] = useState(false);

  const handleFile = (file) => {
    if (!file?.type.startsWith('video/')) { addToast('⚠️ Please upload a video file'); return; }
    setPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const addChapter = () => setChapters(prev => [...prev, { time: '', label: '' }]);
  const removeChapter = (i) => setChapters(prev => prev.filter((_, idx) => idx !== i));
  const updateChapter = (i, field, val) => setChapters(prev => prev.map((ch, idx) => idx === i ? { ...ch, [field]: val } : ch));

  const handlePublish = (e) => {
    e.preventDefault();
    if (!title.trim()) { addToast('⚠️ Please enter a title'); return; }
    setPublishing(true);
    setTimeout(() => {
      setPublishing(false);
      addToast('🎉 Video published successfully!');
      setTitle(''); setDesc(''); setTags(''); setPreview(null); setChapters([{ time: '0:00', label: 'Intro' }]);
    }, 1500);
  };

  const cpm = CPM_MAP[category] || 2;
  const estimatedRevenue = ((views / 1000) * cpm).toFixed(2);

  return (
    <div className="app-main">
      <div className="page-container">
        <h1 style={{ fontFamily: 'var(--font-title)', fontSize: 32, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
          🎬 Upload Video
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 32 }}>
          Share your content with the world — all processing happens in your browser
        </p>

        {!preview ? (
          <div
            className={`upload-zone${dragging ? ' drag-over' : ''}`}
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label="Upload video file"
          >
            <div className="upload-icon">📤</div>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: 8 }}>Drag & drop your video here</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>or click to browse files</p>
            <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 8 }}>Supports: MP4, WebM, MOV, AVI · Max 4GB</p>
            <input ref={fileInputRef} type="file" accept="video/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
          </div>
        ) : (
          <div className="grid-2" style={{ marginBottom: 32 }}>
            {/* Video preview */}
            <div>
              <video
                src={preview}
                controls
                style={{ width: '100%', borderRadius: 'var(--radius)', background: '#000', maxHeight: 320 }}
                aria-label="Video preview"
              />
              <button
                onClick={() => setPreview(null)}
                style={{ marginTop: 8, background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 13 }}
              >
                ✕ Remove video
              </button>
            </div>

            {/* Form */}
            <form className="upload-form" onSubmit={handlePublish}>
              <div className="form-group">
                <label className="form-label">Title *</label>
                <input className="form-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="Add a catchy title..." required aria-required="true" />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-input" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Tell viewers about your video..." />
              </div>
              <div className="form-group">
                <label className="form-label">Tags (comma-separated)</label>
                <input className="form-input" value={tags} onChange={e => setTags(e.target.value)} placeholder="tutorial, python, beginner..." />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-input" value={category} onChange={e => setCategory(e.target.value)} aria-label="Category">
                  {Object.keys(CPM_MAP).map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <button type="submit" className="submit-btn" disabled={publishing} aria-disabled={publishing}>
                {publishing ? '⏳ Publishing...' : '🚀 Publish Video'}
              </button>
            </form>
          </div>
        )}

        {/* Chapter editor */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: 20, marginBottom: 16, color: 'var(--text-primary)' }}>📋 Chapter Editor</h2>
          <div className="chapter-editor">
            {chapters.map((ch, i) => (
              <div key={i} className="chapter-row">
                <input
                  className="form-input"
                  style={{ width: 90 }}
                  value={ch.time}
                  onChange={e => updateChapter(i, 'time', e.target.value)}
                  placeholder="0:00"
                  aria-label={`Chapter ${i + 1} timestamp`}
                />
                <input
                  className="form-input"
                  style={{ flex: 1 }}
                  value={ch.label}
                  onChange={e => updateChapter(i, 'label', e.target.value)}
                  placeholder="Chapter label..."
                  aria-label={`Chapter ${i + 1} label`}
                />
                {chapters.length > 1 && (
                  <button onClick={() => removeChapter(i)} style={{ background: 'transparent', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: 18, padding: '0 4px' }} aria-label="Remove chapter">✕</button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addChapter}
              className="action-btn"
              style={{ marginTop: 8 }}
            >
              + Add Chapter
            </button>
          </div>

          {/* Chapter preview bar */}
          <div className="chapter-preview" style={{ marginTop: 16 }}>
            {chapters.filter(ch => ch.time).map((ch, i) => (
              <div
                key={i}
                className="chapter-tick"
                style={{ left: `${(i / Math.max(chapters.length - 1, 1)) * 100}%`, background: 'var(--accent)' }}
                title={ch.label}
              />
            ))}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>Preview of chapter markers on progress bar</div>
        </div>

        {/* Revenue widget */}
        <div className="revenue-widget">
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: 20, marginBottom: 16, color: 'var(--text-primary)' }}>💰 Revenue Estimator</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end' }}>
            <div className="form-group" style={{ flex: 1, minWidth: 200 }}>
              <label className="form-label">Estimated Views</label>
              <input type="number" className="form-input" value={views} onChange={e => setViews(Number(e.target.value))} min={0} aria-label="Estimated views" />
            </div>
            <div className="form-group" style={{ flex: 1, minWidth: 160 }}>
              <label className="form-label">CPM for {category}</label>
              <input className="form-input" value={`$${cpm}`} disabled style={{ cursor: 'not-allowed' }} aria-label="CPM rate" />
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 6 }}>Estimated Ad Revenue</div>
            <div className="revenue-amount">${estimatedRevenue}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
              Formula: ({views.toLocaleString()} views ÷ 1,000) × ${cpm} CPM
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
