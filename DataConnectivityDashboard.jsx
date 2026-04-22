/**
 * DataConnectivityDashboard
 * React + @tabler/icons-react only — zero component libraries
 * Design system: Datavant DS v1.2.0
 *
 * Install: npm install @tabler/icons-react
 */

import React, { useState, useMemo, useEffect, createContext, useContext } from 'react';
import { SimpleGrid, Paper, Text, SegmentedControl, Popover, Select, Switch } from '@mantine/core';
import { AreaChart } from '@mantine/charts';
import {
  IconLayoutDashboard,
  IconDatabase,
  IconClock,         // Tokenization jobs
  IconChartBar,
  IconKey,           // Token schemas
  IconShield,        // Access policies
  IconFileDownload,  // Export report
  IconPlus,
  IconSearch,
  IconBell,
  IconSun,
  IconMoon,
  IconPalette,
  IconDots,
} from '@tabler/icons-react';

// ─── Tokens (verified against datavant-tokens.json v1.2.0) ───────────────────
const C = {
  // semantic.primary
  primary:       '#2945F0',   // blue.600
  primaryHover:  '#102CD5',   // blue.700  (primary.darker)
  // semantic.text
  textPrimary:   '#020202',   // gray.900
  textSecondary: '#6D7888',   // semantic.text.secondary
  textTertiary:  '#8C94A1',   // gray.500 — slightly darker than semantic tertiary for readability
  // backgrounds
  bg:            '#FFFFFF',   // semantic.background.primary
  pageBg:        '#F9F9FB',   // gray.50
  fillPrimary:   '#FFFFFF',   // semantic.fill.primaryOpacity100 — white text on dark surfaces
  // gray scale
  gray100:       '#F2F3F8',   // gray.100  — table header, row hover
  gray200:       '#E4E6EB',   // gray.200  — borders, progress track
  gray300:       '#C7CCD4',   // gray.300  — chip borders, idle badge border
  gray400:       '#ACB3BD',   // gray.400  — nav item default text/icon on dark
  gray500:       '#8C94A1',   // gray.500  — section labels on dark surfaces
  gray800:       '#1D2024',   // gray.800  — dark sidebar background
  // semantic status
  successBg:     '#EEFBF2',   // semantic.success.background
  successText:   '#265949',   // semantic.success.text
  warningBg:     '#FDFAED',   // semantic.warning.background
  warningText:   '#735F08',   // semantic.warning.text
  errorBg:       '#FFEFEF',   // semantic.error.background
  errorText:     '#CC0000',   // semantic.error.text
  infoBg:        '#ECEEFE',   // semantic.info.bg2
  infoText:      '#091877',   // semantic.info.text2
  neutralBg:     '#F0EFEA',   // semantic.neutral.background
  neutralText:   '#020202',   // semantic.neutral.text (gray.900)
  // data viz
  green600:      '#008545',   // green.600 — complete healthy bars
};

// Flat panel border — opacity reduced to 0.08 (vs 0.15 elevated style)
const PANEL_BORDER = '0.5px solid rgba(2,2,2,0.08)';

// shadow-sm from datavant-tokens.json
const SHADOW_SM = '0px 1px 3px 0px rgba(0,0,0,0.05), 0px 10px 15px -5px rgba(0,0,0,0.05), 0px 7px 7px -5px rgba(0,0,0,0.04)';

// Dark-mode surface tokens
const D = {
  pageBg:        '#0F1117',
  bg:            '#1A1D23',
  border:        'rgba(255,255,255,0.08)',
  textPrimary:   '#F4F4F6',
  textSecondary: '#8C94A1',
  textTertiary:  '#555D6B',
  inputBg:       '#222529',
  subtleBg:      'rgba(255,255,255,0.06)',
  hoverBg:       'rgba(255,255,255,0.04)',
};

const ACCENT_MAP = {
  blue:   { hex: '#2945F0', rgb: '41,69,240'   },
  violet:    { hex: '#932BC4', rgb: '147,43,196'  },  // violet.600
  indigo:    { hex: '#142592', rgb: '20,37,146'   },  // blue.800
  green:     { hex: '#008545', rgb: '0,133,69'    },  // green.600
  lightBlue: { hex: '#007BC7', rgb: '0,123,199'   },  // lightBlue.600
  teal:      { hex: '#0D9488', rgb: '13,148,136'  },
  slate:     { hex: '#475569', rgb: '71,85,105'   },
};

const ThemeCtx = createContext({ ...ACCENT_MAP.blue, darkMode: false });

// ─── Mock data ────────────────────────────────────────────────────────────────
const KPI_CARDS = [
  { label: 'Connected sources', value: '142',   sub: '+3 this week',          trend: 'up',      compare: 'vs. 139 last period' },
  { label: 'Tokens generated',  value: '9.4M',  sub: '+0.7M this period',     trend: 'up',      compare: 'vs. 8.7M last period' },
  { label: 'Avg match rate',    value: '94.1%', sub: '↑ 1.2% improvement',    trend: 'up',      compare: 'vs. 92.9% last period' },
  { label: 'At-risk sources',   value: '7',     sub: '↓ 2 since last week',   trend: 'down',    compare: 'vs. 5 last period', warning: true },
];

const TREND_STYLE = {
  up:      { bg: C.successBg, text: C.successText },
  down:    { bg: C.errorBg,   text: C.errorText   },
  neutral: { bg: C.neutralBg, text: C.neutralText },
};

const SOURCES = [
  { id: 'DS-00471-A', records: '1,204,338', status: 'Active',  match: '97.2%' },
  { id: 'DS-00839-B', records: '883,012',   status: 'Syncing', match: '91.4%' },
  { id: 'DS-01122-C', records: '2,341,009', status: 'Active',  match: '98.1%' },
  { id: 'DS-01447-D', records: '446,201',   status: 'Risk',    match: '72.3%' },
  { id: 'DS-01558-E', records: '119,887',   status: 'Idle',    match: '88.6%' },
  { id: 'DS-01763-F', records: '3,012,445', status: 'Active',  match: '96.8%' },
  { id: 'DS-02091-G', records: '78,334',    status: 'Risk',    match: '68.9%' },
  { id: 'DS-02204-H', records: '560,772',   status: 'Syncing', match: '89.3%' },
  { id: 'DS-02387-I', records: '1,891,203', status: 'Active',  match: '95.5%' },
  { id: 'DS-02561-J', records: '304,119',   status: 'Risk',    match: '71.8%' },
  { id: 'DS-02748-K', records: '672,540',   status: 'Active',  match: '96.2%' },
  { id: 'DS-02915-L', records: '2,108,776', status: 'Syncing', match: '90.7%' },
  { id: 'DS-03104-M', records: '489,331',   status: 'Idle',    match: '85.4%' },
  { id: 'DS-03267-N', records: '134,092',   status: 'Risk',    match: '69.1%' },
  { id: 'DS-03451-O', records: '3,445,201', status: 'Active',  match: '97.8%' },
  { id: 'DS-03618-P', records: '921,447',   status: 'Syncing', match: '92.3%' },
  { id: 'DS-03802-Q', records: '255,680',   status: 'Risk',    match: '74.5%' },
];

const JOBS = [
  { id: 'DS-00471-A', pct: 100, state: 'complete_healthy' },
  { id: 'DS-00839-B', pct: 82,  state: 'in_progress'      },
  { id: 'DS-01122-C', pct: 100, state: 'complete_healthy' },
  { id: 'DS-01447-D', pct: 57,  state: 'complete_risk'    },
  { id: 'DS-01558-E', pct: 21,  state: 'in_progress'      },
  { id: 'DS-01763-F', pct: 94,  state: 'complete_risk'    },
];

const MATCH_STATS = [
  { label: 'Overlap score',        value: '87.3%',  sub: '↑ 0.8% vs last run',      delta: 'positive' },
  { label: 'Token collision rate', value: '0.04%',  sub: '↓ 0.01% improvement',     delta: 'positive' },
  { label: 'Unmatched tokens',     value: '128K',   sub: '↑ 3.2K since yesterday',  delta: 'warning'  },
  { label: 'Last sync',            value: '2h 14m', sub: 'ago — 04:47 UTC',         delta: 'neutral'  },
];

const MATCH_DIST_SEGMENTS = [
  { label: 'High Match', sub: '>95%',    count: 98 },
  { label: 'Med Match',  sub: '90–95%',  count: 31 },
  { label: 'Low Match',  sub: '<90%',    count: 13 },
];
const MATCH_DIST_TOTAL = 142;

const NAV_GROUPS = [
  {
    section: 'Workspace',
    items: [
      { label: 'Dashboard',         Icon: IconLayoutDashboard, active: true  },
      { label: 'Source catalog',    Icon: IconDatabase,        active: false },
      { label: 'Tokenization jobs', Icon: IconClock,           active: false },
      { label: 'Match analytics',   Icon: IconChartBar,        active: false },
    ],
  },
  {
    section: 'Config',
    items: [
      { label: 'Token schemas',   Icon: IconKey,    active: false },
      { label: 'Access policies', Icon: IconShield, active: false },
    ],
  },
];

const STATUS_STYLE = {
  Active:  { bg: C.successBg, text: C.successText },
  Syncing: { bg: C.infoBg,    text: C.infoText     },
  Risk:    { bg: C.warningBg, text: C.warningText  },
  Idle:    { bg: C.neutralBg, text: C.neutralText },
};

const BAR_COLOR = {
  complete_healthy: 'rgba(41,69,240,1.0)',   // full primary — #2945F0
  in_progress:      'rgba(41,69,240,0.55)',  // mid blue
  complete_risk:    'rgba(41,69,240,0.30)',  // light blue
};

const ACTIVE_DAYS = [
  { day: 'Mon', value: 58  },
  { day: 'Tue', value: 91  },
  { day: 'Wed', value: 134 },
  { day: 'Thu', value: 107 },
  { day: 'Fri', value: 96  },
  { day: 'Sat', value: 41  },
  { day: 'Sun', value: 29  },
];

const DELTA_TO_TREND = { positive: 'up', warning: 'down', neutral: 'neutral' };

// ─── Throughput chart helpers ────────────────────────────────────────────────

function pseudoRand(seed) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function generateThroughputData(days) {
  const result = [];
  const now = new Date(2026, 3, 21);
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dow = d.getDay();
    const base    = dow === 0 || dow === 6 ? 330000 : 560000;
    const trend   = Math.sin((i / days) * Math.PI * 4) * 130000;
    const noise   = (pseudoRand(i + days * 3) - 0.5) * 100000;
    const tokens  = Math.round(Math.max(200000, Math.min(800000, base + trend + noise)));
    const label   = days <= 90
      ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      : d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    result.push({ date: label, tokens });
  }
  return result;
}

function formatTokens(v) {
  if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
  return `${(v / 1000).toFixed(1)}K`;
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── Root layout ──────────────────────────────────────────────────────────── */
  .dvd {
    display: flex;
    height: 100vh;
    overflow: hidden;
    background: ${C.pageBg};
    font-family: 'Geist', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .dvd-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-width: 0;
  }
  .dvd-body {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  /* ── Sidebar (220px, dark) ───────────────────────────────────────────────── */
  .dvd-sb {
    width: 220px;
    min-width: 220px;
    height: 100vh;
    background: ${C.gray800};
    border-right: 1px solid rgba(255,255,255,0.08);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    overflow: hidden;
  }
  .dvd-sb-logo {
    display: flex;
    align-items: center;
    height: 55px;
    padding: 0 24px;
    flex-shrink: 0;
  }
  .dvd-hr { height: 1px; background: rgba(255,255,255,0.08); }
  .dvd-nav {
    flex: 1;
    padding: 32px 12px 16px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  /* spacing-xl (24px) between nav sections */
  .dvd-nav > div + div { margin-top: 24px; }
  .dvd-nav-group-label {
    font-size: 10px;
    line-height: 14px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${C.gray500};
    font-family: 'Geist', system-ui, sans-serif;
    padding: 0 8px;
    margin-bottom: 8px;
  }
  .dvd-nav-items {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .dvd-nav-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${C.gray400};
    cursor: pointer;
    transition: background 0.12s, color 0.12s;
  }
  .dvd-nav-item:hover                          { background: rgba(255,255,255,0.06); color: #FFFFFF; }
  .dvd-nav-item.is-active                      { background: rgba(255,255,255,0.10); color: #FFFFFF; }
  .dvd-nav-item.is-active:hover                { background: rgba(255,255,255,0.10); }
  .dvd-nav-item-label {
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    color: ${C.fillPrimary};
    font-family: 'Geist', system-ui, sans-serif;
  }
  .dvd-nav-item.is-active .dvd-nav-item-label  { font-weight: 500; }
  .dvd-sb-footer {
    padding: 16px 24px;
    border-top: 1px solid rgba(255,255,255,0.08);
  }

  /* ── Light sidebar override ─────────────────────────────────────────────── */
  .dvd-sb.is-light {
    background: ${C.bg};
    border-right: 1px solid ${C.gray200};
  }
  .dvd-sb.is-light .dvd-hr { background: ${C.gray200}; }
  .dvd-sb.is-light .dvd-sb-footer { border-top-color: ${C.gray200}; }
  .dvd-sb.is-light .dvd-nav-group-label { color: ${C.textTertiary}; }
  .dvd-sb.is-light .dvd-nav-item { color: ${C.textSecondary}; }
  .dvd-sb.is-light .dvd-nav-item-label { color: ${C.textPrimary}; }
  .dvd-sb.is-light .dvd-nav-item:hover { background: ${C.gray100}; color: ${C.textPrimary}; }
  .dvd-sb.is-light .dvd-nav-item.is-active { background: ${C.gray100}; color: ${C.textPrimary}; }
  .dvd-sb.is-light .dvd-nav-item.is-active:hover { background: ${C.gray100}; }
  .dvd-sb-user { display: flex; align-items: center; gap: 8px; }
  .dvd-user-pill {
    height: 28px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 10px 0 4px;
    border-radius: 24px;
    border: 1px solid ${C.gray200};
    background: ${C.bg};
    flex-shrink: 0;
    transition: border-color 0.12s;
  }
  .dvd-user-pill:hover { border-color: ${C.gray300}; }
  .dvd-avatar {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${C.infoBg};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 8px;
    font-weight: 500;
    color: ${C.infoText};
    font-family: 'Geist', system-ui, sans-serif;
    line-height: 1;
  }
  .dvd-user-email {
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    color: ${C.textSecondary};
    font-family: 'Geist', system-ui, sans-serif;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* ── ① Top bar ────────────────────────────────────────────────────────────── */
  .dvd-topbar {
    display: flex;
    align-items: center;
    height: 55px;
    padding: 0 24px;
    background: ${C.bg};
    border-bottom: 1px solid ${C.gray200};
    flex-shrink: 0;
  }
  /* heading-2xl medium: 20px / 28px / 500 — page title above KPI row */
  .dvd-page-title {
    font-size: 28px;
    line-height: 36px;
    font-weight: 500;
    color: ${C.textPrimary};
    font-family: 'Geist', system-ui, sans-serif;
  }
  .dvd-page-subtitle {
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    color: ${C.textSecondary};
    font-family: 'Geist', system-ui, sans-serif;
    margin-top: 2px;
  }
  /* Search box — left slot of topbar */
  .dvd-search {
    display: flex;
    align-items: center;
    color: ${C.textTertiary};
    gap: 8px;
    height: 36px;
    padding: 0 12px;
    border: 1px solid ${C.gray200};
    border-radius: 8px;
    background: ${C.pageBg};
    width: 320px;
    flex-shrink: 0;
  }
  .dvd-search input {
    border: none;
    outline: none;
    background: transparent;
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    font-family: 'Geist', system-ui, sans-serif;
    color: ${C.textPrimary};
    width: 100%;
  }
  .dvd-search input::placeholder { color: ${C.textTertiary}; }
  .dvd-search:focus-within {
    border-color: ${C.primary};
    background: ${C.bg};
  }
  /* Circular icon button — matches avatar dimensions (28px) */
  .dvd-icon-btn {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: ${C.bg};
    border: 1px solid ${C.gray200};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.12s, border-color 0.12s;
    color: ${C.textSecondary};
  }
  .dvd-icon-btn:hover {
    background: ${C.pageBg};
    border-color: ${C.gray300};
  }

  .dvd-topbar-chips {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .dvd-chip {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 8px;
    border: 1px solid ${C.gray300};
    background: ${C.gray100};
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    color: ${C.textSecondary};
    font-family: 'Geist', system-ui, sans-serif;
    white-space: nowrap;
  }
  .dvd-topbar-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  /* ── Buttons (height 36px) ────────────────────────────────────────────────── */
  .dvd-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0 12px;
    height: 36px;
    border-radius: 8px;
    font-size: 12px;
    line-height: 16px;
    font-weight: 500;
    font-family: 'Geist', system-ui, sans-serif;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.12s;
    outline: none;
  }
  .dvd-btn-subtle      { border: none; background: ${C.gray100}; color: ${C.textSecondary}; }
  .dvd-btn-subtle:hover { background: ${C.gray200}; color: ${C.textPrimary}; }
  .dvd-btn-ghost {
    border: 1px solid ${C.gray200};
    background: transparent;
    color: ${C.textPrimary};
  }
  .dvd-btn-ghost:hover  { background: ${C.pageBg}; }
  .dvd-btn-primary      { border: none; background: ${C.primary}; color: #FFFFFF; }
  .dvd-btn-primary:hover { background: ${C.primaryHover}; }

  /* ── ② KPI row — flat style, gray.50 bg, radius-md ──────────────────────── */
  .dvd-kpi-row { display: flex; gap: 16px; }
  .dvd-kpi-card {
    flex: 1;
    padding: 24px;
    border-radius: 8px;
    border: ${PANEL_BORDER};
    background: ${C.bg};
    box-shadow: ${SHADOW_SM};
  }
  .dvd-kpi-label {
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    color: ${C.textPrimary};
    font-family: 'Geist', system-ui, sans-serif;
    margin-bottom: 8px;
  }
  /* heading-2xl medium: 20px / 28px / 500 */
  .dvd-kpi-value {
    font-size: 20px;
    line-height: 28px;
    font-weight: 500;
    color: ${C.textPrimary};
    font-family: 'Geist', system-ui, sans-serif;
    margin-bottom: 4px;
  }
  .dvd-kpi-value.warn { color: ${C.warningText}; }
  /* body-xs: 10px / 14px / 400 — comparison sub text */
  .dvd-kpi-sub {
    font-size: 10px;
    line-height: 14px;
    font-weight: 400;
    color: ${C.textTertiary};
    font-family: 'Geist', system-ui, sans-serif;
    margin-top: 4px;
  }
  /* Trend badge — pill next to the KPI value */
  .dvd-kpi-badge {
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    border-radius: 32px;
    font-size: 10px;
    line-height: 14px;
    font-weight: 500;
    font-family: 'Geist', system-ui, sans-serif;
    white-space: nowrap;
  }

  /* ── Content row (zones ③ ④ ⑤) ───────────────────────────────────────────── */
  .dvd-content-row    { display: flex; gap: 24px; align-items: flex-start; }
  .dvd-col-left       { flex: 3; min-width: 0; display: flex; flex-direction: column; gap: 16px; }
  .dvd-col-right      { flex: 2; min-width: 0; display: flex; flex-direction: column; gap: 16px; }

  /* ── Panel shell — flat style, radius-md ─────────────────────────────────── */
  .dvd-panel {
    border-radius: 8px;
    border: ${PANEL_BORDER};
    background: ${C.bg};
    box-shadow: ${SHADOW_SM};
    overflow: hidden;
  }
  /* body-md medium: 14px / 20px / 500 — section label, not page heading */
  .dvd-panel-title {
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    color: ${C.textPrimary};
    font-family: 'Geist', system-ui, sans-serif;
  }
  .dvd-panel-head {
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  /* 3-dot menu button */
  .dvd-dots-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    border-radius: 4px;
    cursor: pointer;
    color: ${C.textTertiary};
    flex-shrink: 0;
    transition: background 0.12s, color 0.12s;
    padding: 0;
  }
  .dvd-dots-btn:hover { background: ${C.gray100}; color: ${C.textPrimary}; }
  .dvd-panel-body   { padding: 24px; }
  .dvd-panel-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 24px;
    border-top: 1px solid ${C.gray200};
  }

  /* ── ③ Source table ───────────────────────────────────────────────────────── */
  .dvd-panel.has-table  { display: flex; flex-direction: column; }
  .dvd-table-wrap       { overflow-x: auto; }
  .dvd-table            { width: 100%; border-collapse: collapse; table-layout: fixed; }

  /* body-xs uppercase medium: 10px / 14px / 500 / uppercase */
  .dvd-th {
    padding: 8px 16px;
    text-align: left;
    background: ${C.bg};
    font-size: 10px;
    line-height: 14px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${C.textSecondary};
    font-family: 'Geist', system-ui, sans-serif;
    border-bottom: 1px solid ${C.gray200};
  }
  .dvd-th.right      { text-align: right; }

  /* padding 12px top/bottom → row height ≥ 40px */
  .dvd-td {
    padding: 12px 16px;
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    color: ${C.textSecondary};
    font-family: 'Geist', system-ui, sans-serif;
    border-bottom: 1px solid ${C.gray100};
  }
  .dvd-td.primary { color: ${C.textPrimary}; }
  .dvd-td.mono    { font-family: monospace; color: ${C.textPrimary}; }
  .dvd-td.right   { text-align: right; }

  /* Hover only — no alternating rows */
  .dvd-table tbody tr:hover td { background: ${C.gray100}; }

  /* Status pills: radius-xxl (32px), 11px, letter-spacing 0.02em */
  .dvd-status-pill {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 32px;
    font-size: 11px;
    line-height: 14px;
    font-weight: 500;
    letter-spacing: 0.02em;
    font-family: 'Geist', system-ui, sans-serif;
    white-space: nowrap;
  }

  /* ── ④ Tokenization progress ──────────────────────────────────────────────── */
  .dvd-jobs    { display: flex; flex-direction: column; gap: 12px; }
  .dvd-job-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
  .dvd-job-id {
    font-family: monospace;
    font-size: 12px;
    line-height: 16px;
    color: ${C.textPrimary};
  }
  .dvd-job-pct {
    font-size: 10px;
    line-height: 14px;
    font-weight: 500;
    font-family: 'Geist', system-ui, sans-serif;
    color: ${C.textPrimary};
  }
  /* Track: gray.200 bg, 8px tall, radius-sm (4px) */
  .dvd-bar-track {
    width: 100%;
    height: 8px;
    border-radius: 4px;
    background: ${C.gray200};
    overflow: hidden;
  }
  /* Fill: rounded ends (radius-sm 4px), color set inline per state */
  .dvd-bar-fill {
    height: 100%;
    border-radius: 4px;
  }

  /* ── Throughput chart card ───────────────────────────────────────────────── */
  .dvd-throughput-card {
    border-radius: 8px;
    border: ${PANEL_BORDER};
    background: ${C.bg};
    box-shadow: ${SHADOW_SM};
    padding: 24px;
    min-height: 280px;
  }
  .dvd-throughput-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 12px;
  }
  .dvd-throughput-live {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
  }
  /* heading-2xl medium: 20px / 28px / 500 */
  .dvd-throughput-value {
    font-size: 20px;
    line-height: 28px;
    font-weight: 500;
    color: ${C.textPrimary};
    font-family: 'Geist', system-ui, sans-serif;
  }
  .dvd-throughput-head [data-active],
  .dvd-theme-pop [data-active] {
    color: #FFFFFF !important;
  }
  .dvd-throughput-card .recharts-surface {
    position: relative;
    top: 7px;
    left: 14px;
    outline: none;
  }
  .dvd-throughput-card .recharts-tooltip-wrapper {
    z-index: 10;
  }
  /* Custom tooltip */
  .dvd-chart-tooltip {
    background: ${C.textPrimary};
    border-radius: 8px;
    padding: 8px 12px;
    min-width: 140px;
  }
  .dvd-chart-tooltip-date {
    font-family: monospace;
    font-size: 10px;
    line-height: 14px;
    color: ${C.gray500};
    margin-bottom: 4px;
  }
  .dvd-chart-tooltip-value {
    font-size: 12px;
    line-height: 16px;
    font-weight: 500;
    font-family: 'Geist', system-ui, sans-serif;
    color: ${C.fillPrimary};
  }

  /* ── Bar chart ───────────────────────────────────────────────────────────── */
  .dvd-chart {
    display: flex;
    gap: 8px;
    height: 140px;
    margin-top: 16px;
    align-items: stretch;
  }
  .dvd-bar-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
  /* Value label — in-flow, always reserves 20px so bars never overlap it */
  .dvd-bar-tip {
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    line-height: 14px;
    font-weight: 500;
    font-family: 'Geist', system-ui, sans-serif;
    color: ${C.textPrimary};
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.12s;
    flex-shrink: 0;
  }
  .dvd-bar-col:hover .dvd-bar-tip { opacity: 1; }
  .dvd-bar-tip.is-max { opacity: 1; }
  .dvd-bar-inner {
    flex: 1;
    width: 100%;
    display: flex;
    align-items: flex-end;
  }
  .dvd-bar-fill-v {
    width: 100%;
    border-radius: 4px 4px 0 0;
    transition: opacity 0.12s;
  }
  .dvd-bar-col:hover .dvd-bar-fill-v { opacity: 0.75; }
  .dvd-bar-day {
    font-size: 10px;
    line-height: 14px;
    font-weight: 400;
    color: ${C.textTertiary};
    font-family: 'Geist', system-ui, sans-serif;
    margin-top: 4px;
    flex-shrink: 0;
  }

  /* ── ⑤ Match analytics — stat cards rendered by Mantine ─────────────────── */

  /* ── Global dark mode ────────────────────────────────────────────────────── */
  .dvd.is-dark .dvd-main        { background: ${D.pageBg}; }
  .dvd.is-dark .dvd-body        { background: ${D.pageBg}; }
  .dvd.is-dark .dvd-topbar      { background: ${D.bg}; border-bottom: 1px solid ${D.border}; }
  .dvd.is-dark .dvd-search      { background: ${D.inputBg}; border-color: ${D.border}; }
  .dvd.is-dark .dvd-search input { color: ${D.textPrimary}; }
  .dvd.is-dark .dvd-search input::placeholder { color: ${D.textTertiary}; }
  .dvd.is-dark .dvd-icon-btn    { background: ${D.bg}; border-color: ${D.border}; color: ${D.textSecondary}; }
  .dvd.is-dark .dvd-icon-btn:hover { background: ${D.inputBg}; }
  .dvd.is-dark .dvd-user-pill   { background: ${D.bg}; border-color: ${D.border}; }
  .dvd.is-dark .dvd-user-email  { color: ${D.textSecondary}; }
  .dvd.is-dark .dvd-page-title  { color: ${D.textPrimary}; }
  .dvd.is-dark .dvd-page-subtitle { color: ${D.textSecondary}; }
  .dvd.is-dark .dvd-kpi-card    { background: ${D.bg}; border-color: ${D.border}; box-shadow: none; }
  .dvd.is-dark .dvd-kpi-label   { color: ${D.textSecondary}; }
  .dvd.is-dark .dvd-kpi-value   { color: ${D.textPrimary}; }
  .dvd.is-dark .dvd-kpi-sub     { color: ${D.textTertiary}; }
  .dvd.is-dark .dvd-panel       { background: ${D.bg}; border-color: ${D.border}; box-shadow: none; }
  .dvd.is-dark .dvd-panel-title { color: ${D.textPrimary}; }
  .dvd.is-dark .dvd-panel-footer { border-top-color: ${D.border}; }
  .dvd.is-dark .dvd-throughput-card { background: ${D.bg}; border-color: ${D.border}; box-shadow: none; }
  .dvd.is-dark .dvd-throughput-value { color: ${D.textPrimary}; }
  .dvd.is-dark .dvd-th          { color: ${D.textSecondary}; border-bottom-color: ${D.border}; }
  .dvd.is-dark .dvd-td          { color: ${D.textPrimary}; border-bottom-color: rgba(255,255,255,0.05); }
  .dvd.is-dark .dvd-td.mono     { color: ${D.textPrimary}; }
  .dvd.is-dark .dvd-table-wrap tr:hover .dvd-td { background: ${D.hoverBg}; }
  .dvd.is-dark .dvd-bar-track   { background: rgba(255,255,255,0.08); }
  .dvd.is-dark .dvd-bar-day     { color: ${D.textSecondary}; }
  .dvd.is-dark .dvd-bar-tip     { color: ${D.textSecondary}; }
  .dvd.is-dark .dvd-bar-tip.is-max { color: ${D.textPrimary}; }
  .dvd.is-dark .dvd-job-id      { color: ${D.textPrimary}; }
  .dvd.is-dark .dvd-job-pct     { color: ${D.textPrimary}; }
  .dvd.is-dark .dvd-btn-ghost   { background: ${D.bg}; border-color: ${D.border}; color: ${D.textSecondary}; }
  .dvd.is-dark .dvd-btn-ghost:hover { background: ${D.inputBg}; color: ${D.textPrimary}; }
  .dvd.is-dark .dvd-btn-subtle  { background: ${D.subtleBg}; color: ${D.textSecondary}; }
  .dvd.is-dark .dvd-btn-subtle:hover { background: rgba(255,255,255,0.10); color: ${D.textPrimary}; }
  .dvd.is-dark .dvd-dots-btn    { color: ${D.textTertiary}; }
  .dvd.is-dark .dvd-dots-btn:hover { background: rgba(255,255,255,0.08); color: ${D.textPrimary}; }
  .dvd.is-dark .dvd-chip        { background: rgba(255,255,255,0.08); color: ${D.textSecondary}; }
  .dvd.is-dark .dvd-content-row { background: ${D.pageBg}; }

  /* ── Card shadows toggle ─────────────────────────────────────────────────── */
  .dvd.no-shadows .dvd-kpi-card,
  .dvd.no-shadows .dvd-panel,
  .dvd.no-shadows .dvd-throughput-card { box-shadow: none; }
`;

// ─── Primitives ───────────────────────────────────────────────────────────────

function DotsBtn() {
  return (
    <button className="dvd-dots-btn" aria-label="More options">
      <IconDots size={16} style={{ color: 'currentColor' }} />
    </button>
  );
}

function PanelHeader({ title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
      <div className="dvd-panel-title">{title}</div>
      <DotsBtn />
    </div>
  );
}

function Btn({ children, variant = 'ghost', icon }) {
  return (
    <button className={`dvd-btn ${variant === 'primary' ? 'dvd-btn-primary' : variant === 'subtle' ? 'dvd-btn-subtle' : 'dvd-btn-ghost'}`}>
      {icon}{children}
    </button>
  );
}

function StatusPill({ status }) {
  const s = STATUS_STYLE[status] || STATUS_STYLE.Idle;
  return (
    <span
      className="dvd-status-pill"
      style={{ background: s.bg, color: s.text }}
    >
      {status}
    </span>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const POPOVER_LABEL_STYLE = {
  fontSize: 12, fontWeight: 500, color: C.textSecondary,
  fontFamily: 'Geist, system-ui, sans-serif', marginBottom: 8,
};

const THEME_SEG_STYLES = {
  root:      { background: C.gray100, border: 'none', borderRadius: 8, padding: 2 },
  indicator: { background: C.primary, borderRadius: 4, boxShadow: 'none' },
  label:     { fontFamily: 'Geist, system-ui, sans-serif', fontSize: '12px', fontWeight: 400, color: C.textSecondary },
};

function Sidebar({ colorScheme, setColorScheme, darkMode, cardShadows, setCardShadows }) {
  const [popOpen, setPopOpen]           = useState(false);
  const [sidebarTheme, setSidebarTheme] = useState('light');

  // Global toggle overrides and resets sidebar theme
  useEffect(() => {
    setSidebarTheme(darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const effectiveTheme = darkMode ? 'dark' : sidebarTheme;
  const isLight = effectiveTheme === 'light';
  return (
    <aside className={`dvd-sb${isLight ? ' is-light' : ''}`}>
      <div className="dvd-sb-logo">
        <img
          src={isLight ? '/datavant-ds/logo-black.svg' : '/datavant-ds/logo-white.svg'}
          alt="Datavant"
          style={{ height: '20px', width: 'auto', display: 'block' }}
        />
      </div>

      <div className="dvd-hr" />

      <nav className="dvd-nav">
        {NAV_GROUPS.map(({ section, items }) => (
          <div key={section}>
            <div className="dvd-nav-group-label">{section}</div>
            <div className="dvd-nav-items">
              {items.map(({ label, Icon, active }) => (
                <div key={label} className={`dvd-nav-item${active ? ' is-active' : ''}`}>
                  <Icon size={16} style={{ color: 'currentColor', flexShrink: 0 }} />
                  <span className="dvd-nav-item-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="dvd-hr" />
      <div className="dvd-sb-footer">
        <Popover
          opened={popOpen}
          onChange={setPopOpen}
          position="right-end"
          offset={12}
          withArrow={false}
          shadow="md"
          radius={8}
          classNames={{ dropdown: 'dvd-theme-pop' }}
        >
          <Popover.Target>
            <div
              className="dvd-nav-item"
              style={{ borderRadius: 8, cursor: 'pointer' }}
              onClick={() => setPopOpen(o => !o)}
            >
              <IconPalette size={16} style={{ color: 'currentColor', flexShrink: 0 }} />
              <span className="dvd-nav-item-label">Theme options</span>
            </div>
          </Popover.Target>
          <Popover.Dropdown style={{
            background: C.bg, border: PANEL_BORDER,
            borderRadius: 8, padding: 16, minWidth: 220,
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <div style={POPOVER_LABEL_STYLE}>Sidebar</div>
                <SegmentedControl
                  value={effectiveTheme}
                  onChange={setSidebarTheme}
                  data={[{ label: 'Light', value: 'light' }, { label: 'Dark', value: 'dark' }]}
                  fullWidth
                  size="xs"
                  styles={THEME_SEG_STYLES}
                />
              </div>
              <div>
                <div style={POPOVER_LABEL_STYLE}>Color scheme</div>
                <Select
                  value={colorScheme}
                  onChange={setColorScheme}
                  data={[
                    { value: 'blue',      label: 'Blue'       },
                    { value: 'violet',    label: 'Violet'     },
                    { value: 'indigo',    label: 'Indigo'     },
                    { value: 'green',     label: 'Green'      },
                    { value: 'lightBlue', label: 'Light Blue' },
                  ]}
                  size="xs"
                  styles={{
                    input:  { fontFamily: 'Geist, system-ui, sans-serif', fontSize: 12, borderColor: C.gray200, borderRadius: 8 },
                    option: { fontFamily: 'Geist, system-ui, sans-serif', fontSize: 12 },
                  }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={POPOVER_LABEL_STYLE}>Card shadows</div>
                <Switch
                  checked={cardShadows}
                  onChange={(e) => setCardShadows(e.currentTarget.checked)}
                  size="xs"
                  styles={{
                    track: { cursor: 'pointer' },
                    label: { fontFamily: 'Geist, system-ui, sans-serif', fontSize: 12, cursor: 'pointer' },
                  }}
                />
              </div>
            </div>
          </Popover.Dropdown>
        </Popover>
      </div>

    </aside>
  );
}

// ─── ① Top bar ────────────────────────────────────────────────────────────────

function TopBar({ onToggleDark }) {
  const { darkMode } = useContext(ThemeCtx);
  return (
    <header className="dvd-topbar">
      <div className="dvd-search">
        <IconSearch size={16} style={{ color: 'currentColor', flexShrink: 0 }} />
        <input placeholder="Search…" />
      </div>

      <div style={{ flex: 1 }} />

      <div className="dvd-sb-user">
        <div className="dvd-user-pill">
          <div className="dvd-avatar">FA</div>
          <span className="dvd-user-email">faustino@atomic.health</span>
        </div>
        <button className="dvd-icon-btn" aria-label="Notifications">
          <IconBell size={16} style={{ color: 'currentColor' }} />
        </button>
        <button className="dvd-icon-btn" aria-label="Toggle theme" onClick={onToggleDark}>
          {darkMode
            ? <IconSun  size={16} style={{ color: 'currentColor' }} />
            : <IconMoon size={16} style={{ color: 'currentColor' }} />}
        </button>
      </div>
    </header>
  );
}

// ─── ② KPI row ────────────────────────────────────────────────────────────────

function KpiRow() {
  return (
    <div className="dvd-kpi-row">
      {KPI_CARDS.map(({ label, value, sub, trend, compare, warning }) => {
        const t = TREND_STYLE[trend] || TREND_STYLE.neutral;
        return (
          <div key={label} className="dvd-kpi-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div className="dvd-kpi-label" style={{ marginBottom: 0 }}>{label}</div>
              <DotsBtn />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <div className="dvd-kpi-value">{value}</div>
              <span className="dvd-kpi-badge" style={{ background: t.bg, color: t.text }}>{sub}</span>
            </div>
            <div className="dvd-kpi-sub">{compare}</div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Throughput chart ─────────────────────────────────────────────────────────

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="dvd-chart-tooltip">
      <div className="dvd-chart-tooltip-date">{label}</div>
      <div className="dvd-chart-tooltip-value">{formatTokens(payload[0].value)} tokens/s</div>
    </div>
  );
}

function ThroughputChart() {
  const { darkMode, ...accent } = useContext(ThemeCtx);
  const [period, setPeriod] = useState('30D');
  const days = period === '30D' ? 30 : period === '90D' ? 90 : 365;
  const data  = useMemo(() => generateThroughputData(days), [days]);
  const live  = data[data.length - 1]?.tokens ?? 0;
  // interval = show 1 label every N ticks — gives ~6 evenly spaced labels per view
  const xInterval = period === '12M' ? 30 : period === '90D' ? 14 : 5;

  return (
    <div className="dvd-throughput-card">
      <div className="dvd-throughput-head">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="dvd-panel-title">Tokenization Throughput</div>
            <DotsBtn />
          </div>
          <div className="dvd-throughput-live">
            <span className="dvd-throughput-value">{formatTokens(live)} tokens/s</span>
            <span className="dvd-kpi-badge" style={{ background: C.successBg, color: C.successText }}>
              +12% MoM
            </span>
          </div>
        </div>
        <SegmentedControl
          value={period}
          onChange={setPeriod}
          data={['30D', '90D', '12M']}
          size="xs"
          withItemsBorders={false}
          styles={{
            root:      { background: 'transparent', border: 'none', padding: 0, gap: 2 },
            indicator: { background: accent.hex, borderRadius: 8, boxShadow: 'none' },
            label:     {
              fontFamily: 'Geist, system-ui, sans-serif',
              fontSize: '12px',
              fontWeight: 400,
              color: C.textSecondary,
              '&[data-active]': { color: '#FFFFFF' },
            },
          }}
        />
      </div>

      <AreaChart
        h={180}
        data={data}
        dataKey="date"
        areaChartProps={{ margin: { top: 5, right: 45, left: 0, bottom: 5 } }}
        style={{ marginLeft: '-16px', width: 'calc(100% + 16px)' }}
        series={[{ name: 'tokens', color: accent.hex, label: 'Tokens/sec' }]}
        curveType="monotone"
        withGradient
        fillOpacity={0.12}
        withDots={false}
        strokeWidth={2}
        gridColor={darkMode ? D.border : C.gray100}
        yAxisProps={{
          width: 40,
          tickFormatter: (v) => `${(v / 1000).toFixed(0)}K`,
          tickCount: 5,
          domain: [150000, 850000],
          tick: { fontFamily: 'monospace', fontSize: 10, fill: C.textTertiary },
          axisLine: false,
          tickLine: false,
        }}
        xAxisProps={{
          tick: { fontFamily: 'monospace', fontSize: 10, fill: C.textTertiary },
          interval: xInterval,
          axisLine: false,
          tickLine: false,
        }}
        tooltipProps={{ content: (props) => <ChartTooltip {...props} /> }}
        withXAxis
        withYAxis
      />
    </div>
  );
}

// ─── ③ Source management table ───────────────────────────────────────────────

function SourceTable() {
  return (
    <div className="dvd-panel has-table">
      <div className="dvd-panel-head">
        <span className="dvd-panel-title">Source management</span>
        <DotsBtn />
      </div>

      <div className="dvd-table-wrap">
        <table className="dvd-table">
          <colgroup>
            <col style={{ width: '32%' }} />
            <col style={{ width: '16%' }} />
            <col style={{ width: '32%' }} />
            <col style={{ width: '20%' }} />
          </colgroup>
          <thead>
            <tr>
              <th className="dvd-th">Dataset ID</th>
              <th className="dvd-th right">Records</th>
              <th className="dvd-th">Status</th>
              <th className="dvd-th right">Match %</th>
            </tr>
          </thead>
          <tbody>
            {SOURCES.map((row) => (
              <tr key={row.id}>
                <td className="dvd-td mono">{row.id}</td>
                <td className="dvd-td right">{row.records}</td>
                <td className="dvd-td"><StatusPill status={row.status} /></td>
                <td className="dvd-td primary right">{row.match}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dvd-panel-footer">
        <Btn icon={<IconPlus size={20} />}>Add source</Btn>
        <Btn>Request access</Btn>
      </div>
    </div>
  );
}

// ─── Match Rate Distribution card ────────────────────────────────────────────

function MatchRateDistributionCard() {
  const { darkMode, rgb } = useContext(ThemeCtx);
  const textPrimary   = darkMode ? D.textPrimary   : C.textPrimary;
  const textSecondary = darkMode ? D.textSecondary : C.textSecondary;
  const textTertiary  = darkMode ? D.textTertiary  : C.textTertiary;
  const trackColor     = darkMode ? D.bg            : C.bg;
  const connectorColor = darkMode ? D.border        : C.gray300;

  const colors = [
    `rgba(${rgb},1.0)`,
    `rgba(${rgb},0.55)`,
    `rgba(${rgb},0.22)`,
  ];

  // SVG donut geometry
  const r = 56, strokeW = 18, vCx = 80, vCy = 80;
  const circ = 2 * Math.PI * r;
  const gap  = 4;
  const effectiveArc = circ - MATCH_DIST_SEGMENTS.length * gap;

  let cumStart = 0;
  const arcs = MATCH_DIST_SEGMENTS.map((seg, i) => {
    const arcLen = effectiveArc * (seg.count / MATCH_DIST_TOTAL);
    const result = { ...seg, arcLen, start: cumStart, color: colors[i] };
    cumStart += arcLen + gap;
    return result;
  });

  return (
    <div className="dvd-panel">
      <div className="dvd-panel-body">
        <PanelHeader title="Match Rate Distribution (Datasets)" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'center' }}>

          {/* Left: donut SVG */}
          <svg viewBox="0 0 160 160" width="100%" style={{ maxWidth: 160, margin: '0 auto', display: 'block' }}>
            {/* Background track ring */}
            <circle cx={vCx} cy={vCy} r={r} fill="none" stroke={trackColor} strokeWidth={strokeW} />
            {/* Colored segments */}
            {arcs.map((arc) => (
              <circle
                key={arc.label}
                cx={vCx} cy={vCy} r={r}
                fill="none"
                stroke={arc.color}
                strokeWidth={strokeW}
                strokeDasharray={`${arc.arcLen} ${circ}`}
                strokeDashoffset={-arc.start}
                strokeLinecap="butt"
                style={{ transform: 'rotate(-90deg)', transformOrigin: `${vCx}px ${vCy}px` }}
              />
            ))}
            {/* Center: total count */}
            <text
              x={vCx} y={vCy - 7}
              textAnchor="middle"
              fill={textPrimary}
              style={{ fontSize: 22, fontWeight: 500, fontFamily: 'Geist, system-ui, sans-serif' }}
            >
              {MATCH_DIST_TOTAL}
            </text>
            {/* Center: label */}
            <text
              x={vCx} y={vCy + 10}
              textAnchor="middle"
              fill={textTertiary}
              style={{ fontSize: 9, fontFamily: 'Geist, system-ui, sans-serif' }}
            >
              Total Datasets
            </text>
          </svg>

          {/* Right: metric + legend */}
          <div>
            {/* Main metric */}
            <div style={{ marginBottom: 16 }}>
              <div style={{
                fontSize: 28, lineHeight: '32px', fontWeight: 500,
                color: textPrimary, fontFamily: 'Geist, system-ui, sans-serif',
              }}>
                94.1%
              </div>
              <span
                className="dvd-kpi-badge"
                style={{ background: C.errorBg, color: C.errorText, marginTop: 4 }}
              >
                ↓ -1.2% from prev. sync
              </span>
            </div>

            {/* Legend rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {arcs.map((arc) => (
                <div key={arc.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: arc.color, flexShrink: 0,
                  }} />
                  <span style={{
                    fontSize: 11, lineHeight: '14px', fontWeight: 400,
                    color: textSecondary, fontFamily: 'Geist, system-ui, sans-serif',
                    flex: 1, minWidth: 0,
                  }}>
                    {arc.label}
                    <span style={{ color: textTertiary, marginLeft: 3, fontSize: 10 }}>{arc.sub}</span>
                  </span>
                  <div style={{ flex: '0 1 16px', minWidth: 8, borderTop: `1px dashed ${connectorColor}` }} />
                  <span style={{
                    fontSize: 11, lineHeight: '14px', fontWeight: 500,
                    color: textPrimary, fontFamily: 'Geist, system-ui, sans-serif',
                    textAlign: 'right', minWidth: 18, flexShrink: 0,
                  }}>
                    {arc.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── Most active day chart ────────────────────────────────────────────────────

function MostActiveDayChart() {
  const accent = useContext(ThemeCtx);
  const max = Math.max(...ACTIVE_DAYS.map(d => d.value));
  return (
    <div className="dvd-panel">
      <div className="dvd-panel-body">
        <PanelHeader title="Most active day" />
        <div className="dvd-chart">
          {ACTIVE_DAYS.map(({ day, value }) => {
            const isMax = value === max;
            const ratio = value / max;
            const heightPct = Math.round(ratio * 100);
            const opacity = 0.2 + ratio * 0.8;
            const barColor = `rgba(${accent.rgb},${opacity.toFixed(2)})`;
            return (
              <div key={day} className="dvd-bar-col">
                <div className={`dvd-bar-tip${isMax ? ' is-max' : ''}`}>{value}</div>
                <div className="dvd-bar-inner">
                  <div
                    className="dvd-bar-fill-v"
                    style={{ height: `${heightPct}%`, background: barColor }}
                  />
                </div>
                <div className="dvd-bar-day">{day}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── ④ Tokenization progress ─────────────────────────────────────────────────

function TokenizationPanel() {
  const accent = useContext(ThemeCtx);
  const barColor = {
    complete_healthy: `rgba(${accent.rgb},1.0)`,
    in_progress:      `rgba(${accent.rgb},0.55)`,
    complete_risk:    `rgba(${accent.rgb},0.30)`,
  };
  return (
    <div className="dvd-panel">
      <div className="dvd-panel-body">
        <PanelHeader title="Tokenization progress" />
        <div className="dvd-jobs">
          {JOBS.map(({ id, pct, state }) => (
            <div key={id}>
              <div className="dvd-job-header">
                <span className="dvd-job-id">{id}</span>
                <span className="dvd-job-pct">{pct}%</span>
              </div>
              <div className="dvd-bar-track">
                <div className="dvd-bar-fill" style={{ width: `${pct}%`, background: barColor[state] }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ⑤ Match analytics ───────────────────────────────────────────────────────

function MatchAnalyticsPanel() {
  const { darkMode } = useContext(ThemeCtx);
  return (
    <div className="dvd-panel">
      <div className="dvd-panel-body">
        <PanelHeader title="Match analytics" />
        <SimpleGrid cols={2} spacing={12} mt={16}>
          {MATCH_STATS.map(({ label, value, sub, delta }) => (
            <Paper
              key={label}
              p="md"
              radius="md"
              style={{
                background: darkMode ? D.inputBg : C.pageBg,
              }}
            >
              <Text
                size="xs"
                fw={400}
                c={darkMode ? D.textSecondary : C.textSecondary}
                mb={8}
                style={{ fontFamily: 'Geist, system-ui, sans-serif' }}
              >
                {label}
              </Text>
              <Text
                size="xl"
                fw={500}
                c={darkMode ? D.textPrimary : C.textPrimary}
                mb={4}
                style={{ fontFamily: 'Geist, system-ui, sans-serif', fontSize: 20, lineHeight: '28px' }}
              >
                {value}
              </Text>
              <span
                className="dvd-kpi-badge"
                style={{ background: TREND_STYLE[DELTA_TO_TREND[delta]].bg, color: TREND_STYLE[DELTA_TO_TREND[delta]].text }}
              >
                {sub}
              </span>
            </Paper>
          ))}
        </SimpleGrid>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function DataConnectivityDashboard() {
  const [colorScheme, setColorScheme] = useState('blue');
  const [darkMode, setDarkMode]       = useState(false);
  const [cardShadows, setCardShadows] = useState(true);
  const accent = ACCENT_MAP[colorScheme] ?? ACCENT_MAP.blue;
  const rootClass = ['dvd', darkMode ? 'is-dark' : '', !cardShadows ? 'no-shadows' : ''].filter(Boolean).join(' ');
  return (
    <ThemeCtx.Provider value={{ ...accent, darkMode }}>
      <style>{CSS}</style>
      <div className={rootClass}>
        <Sidebar
          colorScheme={colorScheme} setColorScheme={setColorScheme}
          darkMode={darkMode}
          cardShadows={cardShadows} setCardShadows={setCardShadows}
        />

        <div className="dvd-main">
          <TopBar onToggleDark={() => setDarkMode(d => !d)} />
          <main className="dvd-body">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <div className="dvd-page-title">Data Connectivity Dashboard</div>
                <div className="dvd-page-subtitle">Monitor source connections, tokenization jobs, and match quality across your data network.</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                <Btn variant="subtle" icon={<IconFileDownload size={20} />}>Export report</Btn>
                <Btn variant="primary" icon={<IconPlus size={20} />}>Connect source</Btn>
              </div>
            </div>
            <KpiRow />
            <div className="dvd-content-row">
              <div className="dvd-col-left">
                <ThroughputChart />
                <SourceTable />
              </div>
              <div className="dvd-col-right">
                <MatchRateDistributionCard />
                <MostActiveDayChart />
                <TokenizationPanel />
                <MatchAnalyticsPanel />
              </div>
            </div>
          </main>
        </div>
      </div>
    </ThemeCtx.Provider>
  );
}
