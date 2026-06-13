import { InfoWindow } from '@vis.gl/react-google-maps';
import { MapPin, AlertCircle } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { PRIORITY_COLORS, STATUS_ICONS } from './MapConstants';

export default function ReportInfoWindow({ report, onMouseEnter, onMouseLeave, onClose }) {
  const StatusIcon = STATUS_ICONS[report.status] || AlertCircle;
  const colors = PRIORITY_COLORS[report.priority];

  return (
    <InfoWindow
      position={report.position}
      onCloseClick={onClose}
      headerDisabled={true}
      pixelOffset={[0, -45]}
    >
      <div 
        className="max-w-xs overflow-hidden rounded-lg bg-slate-900 p-0 text-slate-200 shadow-xl ring-1 ring-slate-800 pointer-events-auto"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {report.image && (
          <img
            src={report.image}
            alt={report.title}
            className="h-32 w-full object-cover"
          />
        )}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-500">
                {report.category}
              </span>
              <h3 className="font-bold text-white leading-tight mt-0.5">
                {report.title}
              </h3>
            </div>
            <Badge
              className={`${colors?.bg} ${colors?.text} ${colors?.border} shrink-0`}
            >
              {report.priority}
            </Badge>
          </div>
          
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
            <MapPin className="h-3.5 w-3.5" />
            <span>{report.location}</span>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3">
            <div className="flex items-center gap-2">
              <StatusIcon className="h-4 w-4 text-sky-400" />
              <span className="text-sm font-medium">{report.status}</span>
            </div>
            <Button
              to={`/reports/${report.id}`}
              variant="ghost"
              className="h-8 px-2 text-xs"
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </InfoWindow>
  );
}
