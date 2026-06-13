import Card from '../ui/Card.jsx';
import { PRIORITY_COLORS } from './MapConstants.js';

export default function MapLegend() {
  return (
    <div className="absolute top-4 left-4 z-10 hidden md:block">
      <Card className="w-64 bg-slate-950/90 backdrop-blur-md">
        <h2 className="text-lg font-bold text-white">Live Map</h2>
        <p className="text-xs text-slate-400 mt-1">
          Real-time incident monitoring across the city.
        </p>
        <div className="mt-4 space-y-2">
          {Object.entries(PRIORITY_COLORS).map(([label, colors]) => (
            <div key={label} className="flex items-center gap-2 text-xs">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: colors.pin }}></div>
              <span className="text-slate-300">{label} Priority</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
