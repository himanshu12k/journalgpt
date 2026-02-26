import React, { useCallback, useMemo, useState } from 'react';
const makeId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};
const ChartBox = ({ children, className = '' }) => (
  <div className={`w-full h-full border border-[var(--border)] bg-[var(--surface)] ${className}`}>{children}</div>
);

const ResponsiveContainer = ({ children }) => <div className="w-full h-full">{children}</div>;
const AreaChart = ({ children }) => <ChartBox>{children}</ChartBox>;
const BarChart = ({ children }) => <ChartBox>{children}</ChartBox>;
const LineChart = ({ children }) => <ChartBox>{children}</ChartBox>;
const CartesianGrid = () => null;
const XAxis = () => null;
const YAxis = () => null;
const Tooltip = () => null;
const Area = () => (
  <div className="h-full w-full flex items-end p-3"><div className="w-full h-2/3 border-t border-[var(--accent)] bg-[rgba(45,184,125,0.07)]" /></div>
);
const Bar = ({ children }) => <div className="h-full w-full flex items-end gap-1 p-3">{children}</div>;
const Line = () => <div className="h-full w-full border-t border-[var(--blue)]" />;
const Cell = ({ fill = 'var(--muted)' }) => <div className="flex-1" style={{ background: fill, minHeight: '8px' }} />;

const sampleTrades = [
  { id: makeId(), import_batch: '', imported: false, date: '2026-01-03', time: '09:45', symbol: 'INFY', isin: '', exchange: 'NSE', product: 'CNC', delivery_type: 'D', side: 'LONG', qty: 300, entry_price: 1800, exit_price: 1842, stop_loss: 1788, take_profit: 1840, gross_value: 540000, commission: 220, total_charges: 340, stt: 120, stamp_duty: 30, net_amount: 12420, pnl: 12420, pnl_pct: 2.33, r_multiple: 3.5, status: 'WIN', broker: 'MANUAL', order_no: '', fills_count: 1, strategy: 'Breakout', setup_type: 'Breakout', timeframe: '15m', emotion: 'CALM', confidence: 8, grade: 'A', tags: ['#breakout'], notes: 'Clean breakout with volume confirmation.', lessons: 'Hold winners longer.', rule_violations: [] },
  { id: makeId(), import_batch: 'hdfc-b1', imported: true, date: '2026-01-05', time: '10:02', symbol: 'AU SMALL FINANCE BANK LIMITED', isin: '', exchange: 'NSE', product: 'MTF', delivery_type: 'D', side: 'LONG', qty: 600, entry_price: 963.87, exit_price: 958.2, stop_loss: 954, take_profit: 990, gross_value: 578322, commission: 590, total_charges: 880, stt: 188, stamp_duty: 42, net_amount: -1140, pnl: -1140, pnl_pct: -0.58, r_multiple: -0.6, status: 'LOSS', broker: 'HDFC', order_no: '1000000003623639', fills_count: 4, strategy: 'Pullback', setup_type: 'Pullback', timeframe: '5m', emotion: 'FOMO', confidence: 5, grade: 'C', tags: ['#FOMO', '#rule-break'], notes: 'Chased entry. Stopped out at LOD.', lessons: 'Wait for pullback confirmation.', rule_violations: ['Chased entry'] },
  { id: makeId(), import_batch: 'k-b1', imported: true, date: '2026-01-07', time: '11:10', symbol: 'Canara Bank', isin: 'INE476A01022', exchange: 'NSE', product: 'MIS', delivery_type: '', side: 'SHORT', qty: 1500, entry_price: 471.2, exit_price: 465.8, stop_loss: 474, take_profit: 464, gross_value: 706800, commission: 300, total_charges: 470, stt: 0, stamp_duty: 0, net_amount: 3200, pnl: 3200, pnl_pct: 1.15, r_multiple: 1.9, status: 'WIN', broker: 'KOTAK', order_no: '', fills_count: 2, strategy: 'Reversal', setup_type: 'Reversal', timeframe: '15m', emotion: 'FOCUSED', confidence: 7, grade: 'B+', tags: ['#banking'], notes: 'Weak open and failed retest.', lessons: 'Shorts work well on weak breadth.', rule_violations: [] },
  { id: makeId(), import_batch: '', imported: false, date: '2026-01-10', time: '13:30', symbol: 'Reliance', isin: '', exchange: 'NSE', product: 'CNC', delivery_type: 'D', side: 'LONG', qty: 100, entry_price: 2812, exit_price: 2798, stop_loss: 2795, take_profit: 2860, gross_value: 281200, commission: 140, total_charges: 220, stt: 80, stamp_duty: 18, net_amount: -1660, pnl: -1660, pnl_pct: -0.5, r_multiple: -0.8, status: 'LOSS', broker: 'MANUAL', order_no: '', fills_count: 1, strategy: 'News', setup_type: 'News', timeframe: '5m', emotion: 'NERVOUS', confidence: 4, grade: 'C-', tags: ['#news'], notes: 'Entered before confirmation candle.', lessons: 'Avoid anticipatory entries.', rule_violations: ['Ignored plan'] },
  { id: makeId(), import_batch: '', imported: false, date: '2026-01-12', time: '09:55', symbol: 'Nippon India Silver ETF', isin: '', exchange: 'NSE', product: 'CNC', delivery_type: 'D', side: 'LONG', qty: 1000, entry_price: 232.3, exit_price: 236.9, stop_loss: 229, take_profit: 238, gross_value: 232300, commission: 116, total_charges: 180.8, stt: 0, stamp_duty: 0, net_amount: 4260, pnl: 4260, pnl_pct: 1.98, r_multiple: 1.4, status: 'WIN', broker: 'KOTAK', order_no: '', fills_count: 1, strategy: 'Trend', setup_type: 'Trend', timeframe: '1h', emotion: 'CALM', confidence: 8, grade: 'A-', tags: ['#etf'], notes: 'Swing continuation.', lessons: 'Good risk definition.', rule_violations: [] },
  ...[
    ['AAPL','NASDAQ',220,225,100,'LONG','WIN',2500,2.27,1.8,'Breakout','CONFIDENT'],
    ['TSLA','NASDAQ',240,234,80,'LONG','LOSS',-1800,-2.5,-1.2,'Reversal','GREEDY'],
    ['NVDA','NASDAQ',690,710,40,'LONG','WIN',3200,2.9,2.1,'Trend','FOCUSED'],
    ['MSFT','NASDAQ',420,419,60,'LONG','BREAKEVEN',0,0,0,'Pullback','CALM'],
    ['SPY','NYSE',504,500,150,'SHORT','WIN',2100,0.8,1.2,'Scalp','CONFIDENT'],
    ['INFY','NSE',1810,1798,250,'LONG','LOSS',-2900,-0.66,-1.1,'Gap','FOMO'],
    ['Canara Bank','NSE',468,473,1200,'LONG','WIN',3900,1.06,1.6,'Breakout','CALM'],
    ['Reliance','NSE',2840,2865,90,'LONG','WIN',2200,0.88,1.1,'Pullback','FOCUSED'],
    ['AU Small Finance Bank','NSE',972,960,900,'LONG','LOSS',-4200,-1.3,-1.7,'Reversal','NERVOUS'],
    ['Nippon India Silver ETF','NSE',238,236,1800,'LONG','LOSS',-1800,-0.84,-0.9,'Trend','FEARFUL'],
    ['AAPL','NASDAQ',227,232,90,'LONG','WIN',1800,2.2,1.5,'News','CONFIDENT'],
    ['TSLA','NASDAQ',230,221,70,'SHORT','WIN',2600,3.1,2.3,'Breakout','FOCUSED'],
    ['NVDA','NASDAQ',715,705,30,'SHORT','WIN',2100,1.3,1.1,'Scalp','CALM'],
    ['MSFT','NASDAQ',422,418,55,'SHORT','WIN',1100,0.9,0.8,'Trend','CALM'],
    ['SPY','NYSE',498,501,200,'SHORT','LOSS',-1500,-0.6,-0.7,'Gap','IMPULSIVE'],
  ].map((t, i) => ({ id: makeId(), import_batch: i % 3 === 0 ? 'hdfc-s' : '', imported: i % 3 === 0, date: `2026-02-${String(i + 1).padStart(2, '0')}`, time: '10:15', symbol: t[0], isin: '', exchange: t[1], product: i % 2 ? 'CNC' : 'MTF', delivery_type: 'D', side: t[5], qty: t[4], entry_price: t[2], exit_price: t[3], stop_loss: t[5] === 'LONG' ? t[2] - 5 : t[2] + 5, take_profit: t[5] === 'LONG' ? t[2] + 12 : t[2] - 12, gross_value: t[2] * t[4], commission: 90, total_charges: 130, stt: 35, stamp_duty: 10, net_amount: t[7], pnl: t[7], pnl_pct: t[8], r_multiple: t[9], status: t[6], broker: i % 3 === 0 ? 'HDFC' : 'MANUAL', order_no: i % 3 === 0 ? `100000000${7000 + i}` : '', fills_count: i % 3 === 0 ? 3 : 1, strategy: t[10], setup_type: t[10], timeframe: '15m', emotion: t[11], confidence: 5 + (i % 5), grade: ['A','B+','B','C+','C'][i % 5], tags: ['#journal'], notes: 'Sample preload trade.', lessons: '', rule_violations: t[11] === 'FOMO' ? ['Chased entry'] : [] })),
];

const parseCSV = (text) => {
  const rows = [];
  let row = [];
  let cur = '';
  let q = false;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (ch === '"') {
      if (q && text[i + 1] === '"') { cur += '"'; i += 1; } else q = !q;
    } else if (ch === ',' && !q) {
      row.push(cur); cur = '';
    } else if ((ch === '\n' || ch === '\r') && !q) {
      if (cur !== '' || row.length) { row.push(cur); rows.push(row); row = []; cur = ''; }
    } else cur += ch;
  }
  if (cur !== '' || row.length) { row.push(cur); rows.push(row); }
  return rows;
};
const parseDDMMYYYY = (str) => { const [d, m, y] = str.split('/'); return `${y}-${m}-${d}`; };
const parseDDMonYYYY = (str) => { const M = {Jan:'01',Feb:'02',Mar:'03',Apr:'04',May:'05',Jun:'06',Jul:'07',Aug:'08',Sep:'09',Oct:'10',Nov:'11',Dec:'12'}; const [d, mon, y] = str.split('-'); return `${y}-${M[mon]}-${d}`; };
const stripFormulaWrap = (str) => str?.trim().replace(/^="(.+)"$/, '$1');
const detectBroker = (name, text) => {
  const t = `${name} ${text}`;
  if (t.includes('Market Rate') && t.includes('STT/CTT')) return 'KOTAK';
  if (name.endsWith('.xls') && t.includes('ScripName')) return 'HDFC';
  if (t.includes('T. Price') && t.includes('Comm/Fee')) return 'IBKR';
  if (t.toLowerCase().includes('trans code')) return 'ROBINHOOD';
  if (t.includes('Filled Qty')) return 'WEBULL';
  return 'GENERIC';
};
const aggregatePartials = (fills) => Object.values(fills.reduce((a, f) => {
  const k = f.order_no || `${f.symbol}-${f.date}`;
  if (!a[k]) a[k] = { ...f, qty: 0, gross_value: 0, commission: 0, total_charges: 0, net_amount: 0, fills_count: 0 };
  a[k].qty += f.qty; a[k].gross_value += f.gross_value || f.entry_price * f.qty; a[k].commission += f.commission || 0; a[k].total_charges += f.total_charges || 0; a[k].net_amount += f.net_amount || 0; a[k].fills_count += 1;
  a[k].entry_price = a[k].gross_value / a[k].qty;
  return a;
}, {}));
const matchTrades = (fills) => fills;
const calcPnL = (buys, sells) => sells.reduce((s, x) => s + x.net_amount, 0) + buys.reduce((s, x) => s + x.net_amount, 0);

function App() {
  const [tab, setTab] = useState('Dashboard');
  const [trades, setTrades] = useState(sampleTrades);
  const [notif, setNotif] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState('');
  const [selected, setSelected] = useState([]);
  const [filters, setFilters] = useState({ symbol: 'ALL', strategy: 'ALL', status: 'ALL', broker: 'ALL', q: '' });
  const [newTrade, setNewTrade] = useState({ date: '2026-02-26T10:00', symbol: 'INFY', side: 'LONG', entry_price: 1800, exit_price: 1837.5, qty: 100, stop_loss: 1782, take_profit: 1837.5, exchange: 'NSE', strategy: 'Breakout', setup_type: 'Breakout', timeframe: '15m', emotion: 'CALM', confidence: 7, product: 'CNC', tags: ['#breakout'], notes: '', lessons: '', rule_violations: [] });
  const [importState, setImportState] = useState({ broker: 'KOTAK', preview: [], history: [] });

  const inr = useMemo(() => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }), []);
  const usd = useMemo(() => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }), []);
  const fmtCur = useCallback((n, sym) => (['NSE', 'BSE'].includes(sym) ? inr.format(n) : usd.format(n)), [inr, usd]);
  const fmtPct = (n) => `${n > 0 ? '+' : ''}${n.toFixed(2)}%`;
  const fmtR = (n) => `${n > 0 ? '+' : ''}${n.toFixed(2)}R`;

  const derived = useMemo(() => {
    const pnl = trades.reduce((s, t) => s + t.pnl, 0);
    const wins = trades.filter((t) => t.status === 'WIN').length;
    const losses = trades.filter((t) => t.status === 'LOSS').length;
    const winRate = (wins / trades.length) * 100;
    const grossWin = trades.filter((t) => t.pnl > 0).reduce((s, t) => s + t.pnl, 0);
    const grossLoss = Math.abs(trades.filter((t) => t.pnl < 0).reduce((s, t) => s + t.pnl, 0));
    const profitFactor = grossLoss ? grossWin / grossLoss : 0;
    const equity = trades.slice().sort((a,b)=>a.date.localeCompare(b.date)).map((t, i, arr) => ({ date: t.date.slice(5), equity: arr.slice(0, i + 1).reduce((s, x) => s + x.pnl, 0) }));
    const monthly = Object.values(trades.reduce((a, t) => {
      const m = `${t.date.slice(0, 7)}`;
      if (!a[m]) a[m] = { month: m, trades: 0, pnl: 0, wins: 0 };
      a[m].trades += 1; a[m].pnl += t.pnl; if (t.status === 'WIN') a[m].wins += 1;
      return a;
    }, {}));
    const streak = (() => {
      let best = 0; let curr = 0;
      trades.forEach((t) => { curr = t.status === 'WIN' ? curr + 1 : 0; best = Math.max(best, curr); });
      return best;
    })();
    return { pnl, wins, losses, winRate, profitFactor, equity, monthly, streak };
  }, [trades]);

  const filteredTrades = useMemo(() => trades.filter((t) => (filters.symbol === 'ALL' || t.symbol === filters.symbol)
    && (filters.strategy === 'ALL' || t.strategy === filters.strategy)
    && (filters.status === 'ALL' || t.status === filters.status)
    && (filters.broker === 'ALL' || t.broker === filters.broker)
    && `${t.symbol} ${t.notes}`.toLowerCase().includes(filters.q.toLowerCase())), [trades, filters]);

  const paged = useMemo(() => filteredTrades.slice((page - 1) * pageSize, page * pageSize), [filteredTrades, page, pageSize]);

  const saveTrade = () => {
    const risk = Math.abs((newTrade.entry_price - newTrade.stop_loss) * newTrade.qty);
    const pnl = (newTrade.side === 'LONG' ? (newTrade.exit_price - newTrade.entry_price) : (newTrade.entry_price - newTrade.exit_price)) * newTrade.qty;
    const r = risk ? pnl / risk : 0;
    const rec = { ...newTrade, id: makeId(), import_batch: '', imported: false, date: newTrade.date.slice(0, 10), time: newTrade.date.slice(11, 16), isin: '', delivery_type: '', gross_value: newTrade.entry_price * newTrade.qty, commission: 0, total_charges: 0, stt: 0, stamp_duty: 0, net_amount: pnl, pnl, pnl_pct: (pnl / (newTrade.entry_price * newTrade.qty)) * 100, r_multiple: r, status: pnl > 0 ? 'WIN' : pnl < 0 ? 'LOSS' : 'BREAKEVEN', broker: 'MANUAL', order_no: '', fills_count: 1, grade: r > 2 ? 'A' : r > 1 ? 'B+' : 'C' };
    setTrades((p) => [rec, ...p]);
    setNotif('› Trade saved.');
    setTimeout(() => setNotif(''), 3000);
    setTab('Trade Log');
  };

  const parseKotak = useCallback((csvText) => {
    const text = csvText.replace(/^\uFEFF/, '');
    const rows = parseCSV(text);
    return rows.slice(1).filter((r) => r[3]?.trim() && r[8] !== '0').map((r) => ({ date: parseDDMMYYYY(r[0]), time: r[1], symbol: r[3].trim(), isin: r[4].trim(), exchange: r[5].trim(), side: r[7].trim() === 'Buy' ? 'LONG' : 'SHORT', qty: parseInt(r[8], 10), entry_price: parseFloat(r[9]), gross_value: parseFloat(r[10]), commission: parseFloat(r[12]) || 0, gst: parseFloat(r[11]) || 0, total_charges: parseFloat(r[14]) || 0, stt: parseFloat(r[15]) || 0, broker: 'KOTAK' }));
  }, []);

  const parseHDFC = useCallback((fileText) => {
    const doc = new DOMParser().parseFromString(fileText, 'text/html');
    const table = doc.querySelectorAll('table')[1];
    if (!table) return [];
    const rows = Array.from(table.querySelectorAll('tr')).slice(3);
    const clean = (v) => stripFormulaWrap(v.trim());
    const fillMap = {};
    rows.forEach((tr) => {
      const c = Array.from(tr.querySelectorAll('td')).map((td) => clean(td.textContent || ''));
      if (!c[0] || c[0].includes('Total')) return;
      const key = c[2];
      if (!fillMap[key]) fillMap[key] = [];
      fillMap[key].push({ date: parseDDMonYYYY(c[0]), time: c[6], symbol: c[8], exchange: c[3], side: c[9] === 'B' ? 'LONG' : 'SHORT', qty: parseInt(c[10], 10), mktVal: parseFloat(c[12]), brok: parseFloat(c[14]) || 0, gstBrok: parseFloat(c[15]) || 0, stamp: parseFloat(c[16]) || 0, txnChrg: parseFloat(c[17]) || 0, gstTxn: parseFloat(c[18]) || 0, stt: parseFloat(c[19]) || 0, sebi: parseFloat(c[20]) || 0, cess: parseFloat(c[22]) || 0, netAmt: parseFloat(c[24]), product: c[25], orderNo: key });
    });
    return Object.values(fillMap).map((fills) => {
      const f0 = fills[0];
      const tQty = fills.reduce((s, f) => s + f.qty, 0);
      const tVal = fills.reduce((s, f) => s + f.mktVal, 0);
      const tCom = fills.reduce((s, f) => s + f.brok + f.gstBrok + f.stamp + f.txnChrg + f.gstTxn + f.stt + f.sebi + f.cess, 0);
      return { date: f0.date, time: f0.time, symbol: f0.symbol, exchange: f0.exchange, side: f0.side, qty: tQty, entry_price: tVal / tQty, commission: tCom, net_amount: fills.reduce((s, f) => s + f.netAmt, 0), product: f0.product, order_no: f0.orderNo, fills_count: fills.length, broker: 'HDFC' };
    });
  }, []);

  const onImportFile = async (file) => {
    const txt = await file.text();
    const broker = detectBroker(file.name, txt);
    let parsed = [];
    if (broker === 'KOTAK') parsed = parseKotak(txt);
    else if (broker === 'HDFC') parsed = parseHDFC(txt);
    const batch = makeId();
    const normalized = parsed.map((p) => ({ ...newTrade, ...p, id: makeId(), import_batch: batch, imported: true, exit_price: p.entry_price, stop_loss: p.entry_price * 0.99, take_profit: p.entry_price * 1.02, pnl: p.net_amount || 0, pnl_pct: 0, r_multiple: 0, status: (p.net_amount || 0) > 0 ? 'WIN' : (p.net_amount || 0) < 0 ? 'LOSS' : 'BREAKEVEN', strategy: 'Imported', setup_type: 'Imported', timeframe: 'D', emotion: 'CALM', confidence: 5, grade: 'B', tags: ['#imported'], notes: 'Imported fill', lessons: '', rule_violations: [] }));
    setImportState((s) => ({ ...s, broker, preview: normalized.slice(0, 10), history: [{ batch, count: normalized.length, broker }, ...s.history] }));
    setTrades((p) => [...normalized, ...p]);
    setNotif(`› ${normalized.length} trades imported.`);
    setTimeout(() => setNotif(''), 3000);
  };

  const dailyLossHit = useMemo(() => trades.filter((t) => t.date === '2026-02-26').reduce((s, t) => s + t.pnl, 0) < -5000, [trades]);
  const consecutiveLosses = useMemo(() => {
    let c = 0;
    [...trades].sort((a,b)=>a.date.localeCompare(b.date)).reverse().forEach((t) => { if (c >= 3) return; if (t.status === 'LOSS') c += 1; else c = 0; });
    return c;
  }, [trades]);

  const nav = ['Dashboard', 'Trade Log', 'New Entry', 'Analytics', 'Psychology', 'Import', 'Settings'];

  return (
    <div className="min-h-screen text-[var(--text)] bg-[var(--bg)]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
:root{--bg:#0a0a0a;--surface:#111111;--s2:#161616;--border:#1f1f1f;--border2:#2e2e2e;--text:#e8e8e8;--muted:#555555;--accent:#E8612A;--green:#2db87d;--red:#e05252;--blue:#4d9fff;--yellow:#e0b84d}
input,select,textarea,button{border-radius:2px}
`}</style>
      <div className="md:flex">
        <aside className="md:fixed md:left-0 md:top-0 md:h-screen md:w-[220px] w-full bg-[var(--surface)] border-r border-[var(--border)] p-4">
          <div className="text-[var(--accent)] font-bold tracking-[2px]">TRADE.LOG</div>
          <div className="text-[10px] text-[var(--muted)]">v1.0.0</div>
          <div className="mt-6 flex md:block gap-2 overflow-auto">
            {nav.map((n) => <button key={n} onClick={() => setTab(n)} className={`w-full text-left px-2 py-2 border border-[var(--border)] mb-2 hover:border-[var(--border2)] ${tab === n ? 'bg-[var(--s2)] border-l-2 border-l-[var(--accent)]' : ''}`}>{tab === n ? '⟩ ' : '  '}{n}</button>)}
          </div>
          <div className="mt-6 border border-[var(--border)] p-3 text-sm">
            <div>┌──────────────────┐</div><div>│ BALANCE          │</div><div>│ ₹4,28,500.00     │</div><div>│ +12.4% this mo.  │</div><div>└──────────────────┘</div>
          </div>
        </aside>

        <main className="md:ml-[220px] p-6 md:p-10 w-full overflow-auto">
          {notif && <div className={`mb-3 ${notif.includes('⚠') ? 'text-[var(--red)]' : 'text-[var(--green)]'}`}>{notif}</div>}

          {tab === 'Dashboard' && <div>
            <h2 className="uppercase tracking-[3px] mb-4">⟩ DASHBOARD</h2>
            <div className="grid md:grid-cols-3 gap-3 text-sm mb-6">
              {[
                ['ALL-TIME P&L', inr.format(derived.pnl), '↑ since Jan 1'],
                ['WIN RATE', `${derived.winRate.toFixed(1)}%`, `${derived.wins}/${trades.length} trades`],
                ['PROFIT FACTOR', derived.profitFactor.toFixed(2), 'last 30 days'],
                ['R:R AVG', `${(trades.reduce((s,t)=>s+t.r_multiple,0)/trades.length).toFixed(1)}:1`, ''],
                ['STREAK', `${derived.streak}W ▲`, ''],
                ['MAX DRAWDOWN', '-8.2%', ''],
              ].map((k) => <div key={k[0]} className="border-b border-[var(--border)] pb-2"><div className="text-[var(--muted)] tracking-[2px] uppercase text-xs">{k[0]}</div><div className="text-lg">{k[1]}</div><div className="text-xs text-[var(--muted)]">{k[2]}</div></div>)}
            </div>
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-3 h-72">
                <div className="mb-2">⟩ EQUITY CURVE</div>
                <ResponsiveContainer width="100%" height="100%"><AreaChart data={derived.equity}><CartesianGrid stroke="rgba(255,255,255,0.03)" /><XAxis dataKey="date" stroke="var(--muted)" /><YAxis stroke="var(--muted)" /><Tooltip contentStyle={{ background: '#111', border: '1px solid #1f1f1f' }} /><Area type="monotone" dataKey="equity" stroke="var(--accent)" strokeWidth={1.5} fill="rgba(45,184,125,0.07)" /></AreaChart></ResponsiveContainer>
              </div>
              <div className="md:col-span-2">
                <div>⟩ MONTHLY P&L</div>
                <table className="w-full text-sm"><thead><tr className="text-[var(--muted)] uppercase tracking-[2px]"><th>Month</th><th>Trades</th><th>P&L</th><th>Win%</th></tr></thead><tbody>{derived.monthly.map((m)=><tr key={m.month} className="border-b border-[var(--border)]"><td>{m.month}</td><td>{m.trades}</td><td className={m.pnl>=0?'text-[var(--green)]':'text-[var(--red)]'}>{inr.format(m.pnl)}</td><td>{((m.wins/m.trades)*100).toFixed(0)}%</td></tr>)}</tbody></table>
              </div>
            </div>
          </div>}

          {tab === 'Trade Log' && <div>
            <h2 className="uppercase tracking-[3px] mb-4">⟩ TRADE LOG</h2>
            <div className="flex flex-wrap gap-2 mb-3">{['symbol','strategy','status','broker'].map((k)=><select key={k} className="bg-[var(--s2)] border border-[var(--border)] p-2 text-sm" onChange={(e)=>setFilters((f)=>({...f,[k]:e.target.value}))}><option>ALL</option>{[...new Set(trades.map((t)=>t[k]))].map((v)=><option key={v}>{v}</option>)}</select>)}<input className="bg-[var(--s2)] border border-[var(--border)] p-2" placeholder="search..." onChange={(e)=>setFilters((f)=>({...f,q:e.target.value}))} /></div>
            <div className="overflow-auto"><table className="w-full text-xs"><thead><tr className="uppercase tracking-[2px] text-[var(--muted)]">{['DATE','SYMBOL','SIDE','ENTRY','EXIT','QTY','P&L ₹','P&L %','R','SETUP','BROKER','STATUS','···'].map((h)=><th key={h} className="p-2">{h}</th>)}</tr></thead><tbody>{paged.map((t)=><React.Fragment key={t.id}><tr className="border-b border-[var(--border)] hover:bg-[var(--surface)]"><td>{t.date}</td><td>{t.symbol} {t.imported && <span className="text-[9px] text-[var(--muted)]">IMP</span>}</td><td className={t.side==='LONG'?'text-[var(--green)]':'text-[var(--red)]'}>{t.side}</td><td>{t.entry_price}</td><td>{t.exit_price}</td><td>{t.qty}</td><td className={t.pnl>=0?'text-[var(--green)]':'text-[var(--red)]'}>{inr.format(t.pnl)}</td><td>{fmtPct(t.pnl_pct)}</td><td>{fmtR(t.r_multiple)}</td><td>{t.setup_type}</td><td>{t.broker}</td><td>{t.status}</td><td><button onClick={()=>setExpanded(expanded===t.id?'':t.id)}>›</button></td></tr>
              {expanded===t.id && <tr><td colSpan={13} className="p-2"><div>┌─ NOTES ─────────────────────────────────────────────────────┐</div><textarea className="w-full bg-[var(--s2)] border border-[var(--border)] p-2" value={t.notes} onChange={(e)=>setTrades((p)=>p.map((x)=>x.id===t.id?{...x,notes:e.target.value}:x))} /><div className="text-[var(--muted)]">Tags: {t.tags.join('  ')}</div><div>Broker: {t.broker} Product: {t.product} Exchange: {t.exchange} Fills: {t.fills_count}</div><div>└─────────────────────────────────────────────────────────────┘</div></td></tr>}
              </React.Fragment>)}</tbody></table></div>
            <div className="flex gap-2 mt-3"><button className="border border-[var(--border)] px-2" onClick={()=>setTrades((p)=>p.filter((t)=>!selected.includes(t.id)))}>Bulk delete</button><button className="border border-[var(--border)] px-2" onClick={()=>{const csv='date,symbol,pnl\n'+trades.map((t)=>`${t.date},${t.symbol},${t.pnl}`).join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv]));a.download='trades.csv';a.click();}}>Export CSV</button><select className="bg-[var(--s2)] border border-[var(--border)]" value={pageSize} onChange={(e)=>setPageSize(Number(e.target.value))}><option>10</option><option>25</option><option>50</option></select></div>
          </div>}

          {tab === 'New Entry' && <div className="grid md:grid-cols-2 gap-6"><div><h2 className="uppercase tracking-[3px] mb-4">⟩ NEW ENTRY</h2>{['symbol','entry_price','exit_price','qty','stop_loss','take_profit'].map((k)=><input key={k} className="w-full mb-2 bg-[var(--s2)] border border-[var(--border)] p-2" value={newTrade[k]} onChange={(e)=>setNewTrade((p)=>({...p,[k]:['symbol'].includes(k)?e.target.value:Number(e.target.value)}))} />)}<textarea className="w-full bg-[var(--s2)] border border-[var(--border)] p-2" placeholder="Notes" onChange={(e)=>setNewTrade((p)=>({...p,notes:e.target.value}))} /><button className="w-full mt-3 border border-[var(--border)] p-2 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black" onClick={saveTrade}>› SAVE TRADE</button></div>
            <div><div>┌─ TRADE PREVIEW ──────────────────────────────┐</div><div className="border border-[var(--border)] p-3 bg-[var(--surface)]"> <div>Symbol : {newTrade.symbol}</div><div>Side : {newTrade.side}</div><div>P&L : {inr.format((newTrade.exit_price-newTrade.entry_price)*newTrade.qty)}</div><div>Risk ₹ : {inr.format(Math.abs((newTrade.entry_price-newTrade.stop_loss)*newTrade.qty))}</div><div>R:R : {(Math.abs(newTrade.take_profit-newTrade.entry_price)/Math.abs(newTrade.entry_price-newTrade.stop_loss||1)).toFixed(2)}:1</div><div>R-Multiple : {fmtR((newTrade.exit_price-newTrade.entry_price)/(Math.abs(newTrade.entry_price-newTrade.stop_loss)||1))}</div><div>Grade : B+</div><div>● Followed entry rules</div><div>○ Held to target</div></div><div>└───────────────────────────────────────────────┘</div></div></div>}

          {tab === 'Analytics' && <div><h2 className="uppercase tracking-[3px] mb-4">⟩ ANALYTICS</h2><div className="grid md:grid-cols-2 gap-6">{[['⟩ EQUITY CURVE','area'],['⟩ DAILY P&L','bar'],['⟩ R-MULTIPLE DIST.','bar'],['⟩ EMOTION vs WIN RATE','line']].map((c)=><div key={c[0]} className="h-64"><div>{c[0]}</div><ResponsiveContainer width="100%" height="100%">{c[1]==='area'?<AreaChart data={derived.equity}><CartesianGrid stroke="rgba(255,255,255,0.04)"/><XAxis dataKey="date" stroke="var(--muted)"/><YAxis stroke="var(--muted)"/><Area dataKey="equity" stroke="var(--accent)" fill="rgba(45,184,125,0.07)"/></AreaChart>:c[1]==='line'?<LineChart data={Object.values(trades.reduce((a,t)=>{if(!a[t.emotion])a[t.emotion]={emotion:t.emotion,wins:0,count:0};a[t.emotion].count+=1;if(t.status==='WIN')a[t.emotion].wins+=1;return a;},{})).map((x)=>({...x,wr:(x.wins/x.count)*100}))}><CartesianGrid stroke="rgba(255,255,255,0.04)"/><XAxis dataKey="emotion" stroke="var(--muted)"/><YAxis stroke="var(--muted)"/><Line dataKey="wr" stroke="var(--blue)"/></LineChart>:<BarChart data={trades.map((t,i)=>({i,pnl:t.pnl}))}><CartesianGrid stroke="rgba(255,255,255,0.04)"/><XAxis dataKey="i" stroke="var(--muted)"/><YAxis stroke="var(--muted)"/><Bar dataKey="pnl">{trades.map((t)=> <Cell key={t.id} fill={t.pnl>=0?'var(--green)':'var(--red)'} />)}</Bar></BarChart>}</ResponsiveContainer></div>)}</div>
            <div className="mt-4"><div>┌─ SYSTEM INSIGHTS ──────────────────────────────────────────┐</div><div className="border border-[var(--border)] p-3"><div>› Your best setup is {Object.entries(trades.reduce((a,t)=>{if(!a[t.setup_type])a[t.setup_type]={w:0,c:0};a[t.setup_type].c+=1;if(t.status==='WIN')a[t.setup_type].w+=1;return a;},{})).sort((a,b)=>(b[1].w/b[1].c)-(a[1].w/a[1].c))[0]?.[0]} with strong win rate</div><div>› You lose most on Fridays — avg -0.4R</div><div>› FOMO trades return {fmtR(trades.filter(t=>t.emotion==='FOMO').reduce((s,t)=>s+t.r_multiple,0)/(trades.filter(t=>t.emotion==='FOMO').length||1))} on average</div><div>› HDFC MTF trades outperform CNC by 0.6R average</div></div><div>└────────────────────────────────────────────────────────────┘</div></div>
          </div>}

          {tab === 'Psychology' && <div><h2 className="uppercase tracking-[3px] mb-4">⟩ PSYCHOLOGY</h2>{consecutiveLosses>=3 && <div className="bg-[#1a0a0a] border border-[var(--border)] border-l-[3px] border-l-[var(--red)] p-2 mb-3"><div>┌─ ⚠ TILT ALERT ──────────────────────────────────────────────┐</div><div>│ 3 consecutive losses. Consider stopping for today. │</div><div>└─────────────────────────────────────────────────────────────┘</div></div>}<div className="grid md:grid-cols-2 gap-6"><div><input className="w-full bg-[var(--s2)] border border-[var(--border)] p-2 mb-2" placeholder="Mood 1-10"/><textarea className="w-full bg-[var(--s2)] border border-[var(--border)] p-2" placeholder="Reflection"/></div><div className="h-64"><ResponsiveContainer width="100%" height="100%"><LineChart data={Array.from({length:30}).map((_,i)=>({day:i+1,mood:5+Math.sin(i/4)*2,avg:6}))}><CartesianGrid stroke="rgba(255,255,255,0.04)"/><XAxis dataKey="day" stroke="var(--muted)"/><YAxis stroke="var(--muted)"/><Line dataKey="mood" stroke="var(--accent)"/><Line dataKey="avg" stroke="var(--blue)"/></LineChart></ResponsiveContainer></div></div></div>}

          {tab === 'Import' && <div><h2 className="uppercase tracking-[3px] mb-4">⟩ BROKER IMPORT</h2><div className="grid md:grid-cols-4 gap-2">{['IBKR','TDA / TOS','SCHWAB','ROBINHOOD','WEBULL','ETRADE','TRADEZERO','GENERIC CSV','KOTAK ₹','HDFC ₹'].map((b)=><button key={b} onClick={()=>setImportState((s)=>({...s,broker:b.includes('KOTAK')?'KOTAK':b.includes('HDFC')?'HDFC':b}))} className={`border border-[var(--border)] p-2 text-left ${importState.broker===b||importState.broker===b.split(' ')[0]?'border-l-2 border-l-[var(--accent)] bg-[var(--s2)]':''}`}>{b}</button>)}</div><label className="block mt-4 border border-[var(--border)] p-6 text-center hover:border-[var(--accent)]">┌─ DROP FILE ───────────────────────────────────────────────┐<br/>drag & drop CSV / XLS / XLSX here<br/>└───────────────────────────────────────────────────────────┘<input type="file" className="hidden" accept=".csv,.xls,.xlsx,.txt" onChange={(e)=>e.target.files?.[0] && onImportFile(e.target.files[0])} /></label>{importState.preview.length>0&&<div className="mt-4"><div>┌─ PREVIEW — {importState.preview.length} TRADES DETECTED ────────────────────────────┐</div><table className="w-full text-sm"><tbody>{importState.preview.map((p)=><tr key={p.id} className="border-b border-[var(--border)]"><td>{p.date}</td><td>{p.symbol}</td><td>{p.side}</td><td>{p.qty}</td><td>{p.entry_price.toFixed(2)}</td><td>{p.exchange}</td></tr>)}</tbody></table><div>└────────────────────────────────────────────────────────────┘</div></div>}</div>}

          {tab === 'Settings' && <div><h2 className="uppercase tracking-[3px] mb-4">⟩ SETTINGS</h2><div className="grid md:grid-cols-2 gap-6"><div><input className="w-full bg-[var(--s2)] border border-[var(--border)] p-2 mb-2" defaultValue="428500"/><input className="w-full bg-[var(--s2)] border border-[var(--border)] p-2 mb-2" defaultValue="2000"/><input className="w-full bg-[var(--s2)] border border-[var(--border)] p-2 mb-2" defaultValue="5"/></div><div><div>┌─ MY TRADING RULES ──────────────────────────────────────────┐</div><div className="border border-[var(--border)] p-3"><div>1. Never add to a losing position</div><div>2. Always set stop loss before entry</div><div>3. No trades 9:15–9:45 IST</div><button className="mt-2 border border-[var(--border)] px-2">+ Add rule...</button></div><div>└─────────────────────────────────────────────────────────────┘</div></div></div><div className="mt-4"><button className="block">› Export all trades to CSV</button><button className="block text-[var(--red)]">› Clear all data</button></div></div>}

          {dailyLossHit && <div className="text-[var(--red)] mt-4">⚠ Daily loss limit hit.</div>}
        </main>
      </div>
    </div>
  );
}

export default App;
export { parseCSV, parseDDMMYYYY, parseDDMonYYYY, stripFormulaWrap, detectBroker, matchTrades, aggregatePartials, calcPnL };
