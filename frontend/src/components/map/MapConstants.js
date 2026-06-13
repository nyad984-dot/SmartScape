import { AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

export const DARK_THEME = [
  { elementType: 'geometry', stylers: [{ color: '#020617' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#020617' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#cbd5e1' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#7dd3fc' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#0f172a' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#4ade80' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#1e293b' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#334155' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#64748b' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#334155' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1e293b' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#0c4a6e' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#0ea5e9' }],
  },
];

export const PRIORITY_COLORS = {
  Critical: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/50', pin: '#f43f5e' },
  High: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/50', pin: '#f59e0b' },
  Medium: { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/50', pin: '#0ea5e9' },
  Low: { bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/50', pin: '#64748b' },
};

export const STATUS_ICONS = {
  Open: AlertCircle,
  'In Progress': Clock,
  Resolved: CheckCircle2,
};

export const ALMATY_CENTER = { lat: 43.2389, lng: 76.9455 };
export const DEFAULT_ZOOM = 13;
export const MAP_ID = 'bf51a910020fa2a6';
