import { useState } from 'react'
import useStored from './useStored.js'
import { createTrackerExcel } from './trackerExcel.js'
import {
  tracks, ideas, phases, approvalFields, approvalChecks, criteria,
} from './data.js'

const sections = [
  ['overview', 'Overview'],
  ['timeline', 'Timeline'],
  ['ideas', 'Ideas bank'],
  ['checklist', 'Checklist'],
  ['approval', 'Approval form'],
  ['evaluation', 'Evaluation'],
  ['tracker', 'Tracker'],
]

export default function App() {
  const [tab, setTab] = useState('overview')
  return (
    <div className="app">
      <header className="top">
        <div className="top-inner">
          <div>
            <h1>Internship Project Hub</h1>
            <p className="muted">Checklist and timeline plan for 1-month and 4-month internships</p>
          </div>
          <nav aria-label="Sections">
            {sections.map(([id, label]) => (
              <button key={id} className={tab === id ? 'tab active' : 'tab'} onClick={() => setTab(id)}>
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main>
        {tab === 'overview' && <Overview go={setTab} />}
        {tab === 'timeline' && <Timeline />}
        {tab === 'ideas' && <Ideas />}
        {tab === 'checklist' && <Checklist />}
        {tab === 'approval' && <Approval />}
        {tab === 'evaluation' && <Evaluation />}
        {tab === 'tracker' && <Tracker />}
      </main>
      <footer>Your ticks and entries are saved in this browser only.</footer>
    </div>
  )
}

function Overview({ go }) {
  return (
    <section>
      <h2>Overview</h2>
      <p>Both internship tracks use one system: a fixed number of days per project, a clear source (trainer or student), and the same checklist for every project.</p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Track</th><th>Duration</th><th>Total projects</th><th>Trainer-given</th><th>Student-chosen</th><th>Days per project</th></tr>
          </thead>
          <tbody>
            <tr><td>1-Month Internship</td><td>30 days</td><td>3</td><td>2</td><td>1</td><td>10</td></tr>
            <tr><td>4-Month Internship</td><td>120 days</td><td>5</td><td>3</td><td>2</td><td>24</td></tr>
          </tbody>
        </table>
      </div>
      <p className="note">Assumption: 4 months is counted as 120 days, split equally into 5 projects of 24 days. If you count working days only (for example 6 days a week), change the day numbers and the proportions stay the same.</p>
      <div className="cards">
        {sections.slice(1).map(([id, label]) => (
          <button key={id} className="card link" onClick={() => go(id)}>{label} <span aria-hidden>→</span></button>
        ))}
      </div>
    </section>
  )
}

function TrackSwitch({ value, onChange }) {
  return (
    <div className="switch" role="group" aria-label="Track">
      {Object.entries(tracks).map(([k, t]) => (
        <button key={k} className={value === k ? 'on' : ''} onClick={() => onChange(k)}>{t.label}</button>
      ))}
    </div>
  )
}

function Timeline() {
  const [track, setTrack] = useStored('ih.track', '1')
  const [done, setDone] = useStored('ih.dates', {})
  const t = tracks[track]
  return (
    <section>
      <h2>Timeline</h2>
      <TrackSwitch value={track} onChange={setTrack} />
      <h3>{t.label}: {t.projects.length} projects, {t.perProject} days each</h3>
      <p>{t.summary}</p>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Project</th><th>Source</th><th>Days</th><th>Day range</th><th>Level</th><th>Key rule</th></tr></thead>
          <tbody>
            {t.projects.map(p => (
              <tr key={p.no}>
                <td>Project {p.no}</td>
                <td><span className={p.source.startsWith('Trainer') ? 'pill trainer' : 'pill student'}>{p.source}</span></td>
                <td>{p.days}</td><td>{p.range}</td><td>{p.level}</td><td>{p.rule}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3>Key dates for the trainer</h3>
      <ul className="checks">
        {t.dates.map(([d, text]) => {
          const id = `${track}:${d}`
          return (
            <li key={id}>
              <label>
                <input type="checkbox" checked={!!done[id]} onChange={() => setDone({ ...done, [id]: !done[id] })} />
                <span><strong>{d}:</strong> {text}</span>
              </label>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function Ideas() {
  const [q, setQ] = useState('')
  const [level, setLevel] = useState('All')
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']
  const list = ideas.filter(i =>
    (level === 'All' || i.level.toLowerCase().includes(level.toLowerCase())) &&
    (i.type + ' ' + i.examples).toLowerCase().includes(q.toLowerCase()))
  return (
    <section>
      <h2>Project ideas bank</h2>
      <p>Pick trainer projects from this list, and share it with students who need ideas for their own project. Level shows the suggested slot.</p>
      <div className="filters">
        <input type="search" placeholder="Search ideas (e.g. clinic, quiz)" value={q} onChange={e => setQ(e.target.value)} />
        <select value={level} onChange={e => setLevel(e.target.value)} aria-label="Level">
          {levels.map(l => <option key={l}>{l}</option>)}
        </select>
      </div>
      <div className="cards grid">
        {list.map(i => (
          <article key={i.type} className="card">
            <h3>{i.type}</h3>
            <p>{i.examples}</p>
            <p className="meta"><span className="pill">{i.level}</span> <span className="muted">{i.slot}</span></p>
          </article>
        ))}
        {list.length === 0 && <p className="muted">No ideas match.</p>}
      </div>
    </section>
  )
}

function Checklist() {
  const [days, setDays] = useStored('ih.cl.len', 10)
  const [ticks, setTicks] = useStored('ih.cl.ticks', {})
  const [proj, setProj] = useStored('ih.cl.proj', 'My project')
  const key = k => `${proj}|${k}`
  const all = phases.flatMap(p => p.items.map(i => key(p.key + i)))
  const count = all.filter(k => ticks[k]).length
  const pct = Math.round((count / all.length) * 100)
  return (
    <section>
      <h2>Standard project checklist</h2>
      <p>The same six phases apply to any project type. Only the number of days changes. Type a project name to keep a separate progress list for each project.</p>
      <div className="filters">
        <input value={proj} onChange={e => setProj(e.target.value)} placeholder="Project name" aria-label="Project name" />
        <div className="switch">
          <button className={days === 10 ? 'on' : ''} onClick={() => setDays(10)}>10-day project</button>
          <button className={days === 24 ? 'on' : ''} onClick={() => setDays(24)}>24-day project</button>
        </div>
      </div>
      <div className="progress" role="progressbar" aria-valuenow={pct} aria-valuemin="0" aria-valuemax="100">
        <div style={{ width: pct + '%' }} />
        <span>{count} of {all.length} done · {pct}%</span>
      </div>
      {phases.map(p => (
        <div key={p.key} className="phase">
          <h3>{p.title} <span className="pill">{days === 10 ? p.d10 : p.d24}</span></h3>
          <ul className="checks">
            {p.items.map(i => {
              const k = key(p.key + i)
              return (
                <li key={k}>
                  <label>
                    <input type="checkbox" checked={!!ticks[k]} onChange={() => setTicks({ ...ticks, [k]: !ticks[k] })} />
                    <span>{i}</span>
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </section>
  )
}

function Approval() {
  const [form, setForm] = useStored('ih.approval', {})
  const [checks, setChecks] = useStored('ih.approval.checks', {})
  const [result, setResult] = useStored('ih.approval.result', { status: '', date: '' })
  const set = (k, v) => setForm({ ...form, [k]: v })
  const clear = () => { if (confirm('Clear the whole form?')) { setForm({}); setChecks({}); setResult({ status: '', date: '' }) } }
  return (
    <section>
      <h2>Student-chosen project approval form</h2>
      <p>Every student fills this form for their own project. The trainer approves it before the project starts.</p>
      <div className="form">
        {approvalFields.map(([k, label]) => (
          <label key={k} className="field">
            <span>{label}</span>
            {['problem', 'features'].includes(k)
              ? <textarea rows="3" value={form[k] || ''} onChange={e => set(k, e.target.value)} />
              : <input value={form[k] || ''} onChange={e => set(k, e.target.value)} />}
          </label>
        ))}
      </div>
      <h3>Trainer approval checks</h3>
      <ul className="checks">
        {approvalChecks.map(c => (
          <li key={c}><label>
            <input type="checkbox" checked={!!checks[c]} onChange={() => setChecks({ ...checks, [c]: !checks[c] })} />
            <span>{c}</span>
          </label></li>
        ))}
      </ul>
      <div className="filters">
        <select value={result.status} onChange={e => setResult({ ...result, status: e.target.value })} aria-label="Result">
          <option value="">Result…</option>
          <option>Approved</option><option>Changes needed</option><option>Rejected</option>
        </select>
        <input type="date" value={result.date} onChange={e => setResult({ ...result, date: e.target.value })} aria-label="Result date" />
      </div>
      <div className="actions no-print">
        <button className="primary" onClick={() => window.print()}>Print / save as PDF</button>
        <button onClick={clear}>Clear form</button>
      </div>
    </section>
  )
}

function Evaluation() {
  const [scores, setScores] = useState({})
  const [late, setLate] = useState(0)
  const raw = criteria.reduce((s, [n]) => s + (Number(scores[n]) || 0), 0)
  const total = Math.max(0, raw - late * 5)
  return (
    <section>
      <h2>Evaluation and tracking</h2>
      <p>Each project is marked out of 100. Trainer and student projects use the same scale.</p>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Criteria</th><th>Max</th><th>Marks given</th></tr></thead>
          <tbody>
            {criteria.map(([n, m]) => (
              <tr key={n}>
                <td>{n}</td><td>{m}</td>
                <td><input className="num" type="number" min="0" max={m} value={scores[n] ?? ''}
                  onChange={e => setScores({ ...scores, [n]: Math.min(m, Math.max(0, Number(e.target.value))) })} /></td>
              </tr>
            ))}
            <tr>
              <td>Days late (−5 marks per day)</td><td>—</td>
              <td><input className="num" type="number" min="0" value={late} onChange={e => setLate(Math.max(0, Number(e.target.value)))} /></td>
            </tr>
          </tbody>
          <tfoot><tr><th>Total</th><th>100</th><th>{total}</th></tr></tfoot>
        </table>
      </div>
      <p className="note"><strong>Submission rules:</strong> finish on the last day of the project slot, submit the live link, GitHub link and README, and give a 5-minute demo. Late submission loses 5 marks per day.</p>
    </section>
  )
}

const cols = ['Student', 'Track', 'Project no.', 'Source', 'Start date', 'End date', 'Status', 'Marks', 'Submitted at']

function Tracker() {
  const blank = () => Array(cols.length).fill('')
  const [rows, setRows] = useStored('ih.tracker', [blank(), blank(), blank(), blank()])
  const normalizedRows = rows.map(row => cols.map((_, i) => row[i] ?? ''))
  const edit = (r, c, v) => setRows(normalizedRows.map((row, i) => (
    i === r ? row.map((x, j) => (j === c ? v : x)) : row
  )))
  const updateStatus = (r, status) => setRows(normalizedRows.map((row, i) => {
    if (i !== r) return row
    const updated = [...row]
    updated[6] = status
    if (status === 'Submitted' && row[6] !== 'Submitted') {
      updated[8] = new Date().toISOString()
    }
    return updated
  }))
  const exportExcel = () => {
    const exportRows = normalizedRows.map(row => row.map((value, i) => (
      i === 8 && value ? new Date(value).toLocaleString() : value
    )))
    const blob = new Blob([createTrackerExcel(cols, exportRows)], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'student-tracking-sheet.xlsx'
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 0)
  }
  return (
    <section>
      <h2>Student tracking sheet</h2>
      <p>Enter student details and change the status to Submitted to record the submission time.</p>
      <div className="table-wrap">
        <table className="sheet">
          <thead><tr>{cols.map(c => <th key={c}>{c}</th>)}</tr></thead>
          <tbody>
            {normalizedRows.map((row, r) => (
              <tr key={r}>
                {row.map((v, c) => (
                  <td key={c}>
                    {c === 6
                      ? <select value={v} onChange={e => updateStatus(r, e.target.value)}><option value=""></option><option>Not started</option><option>In progress</option><option>Submitted</option><option>Reviewed</option></select>
                      : c === 8
                        ? v ? new Date(v).toLocaleString() : ''
                      : <input aria-label={cols[c]} value={v} onChange={e => edit(r, c, e.target.value)} />}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="actions">
        <button onClick={() => setRows([...rows, blank()])}>Add row</button>
        <button className="primary" onClick={exportExcel}>Download Excel sheet</button>
      </div>
    </section>
  )
}
