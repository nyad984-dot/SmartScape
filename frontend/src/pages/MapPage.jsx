import { useState } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { useReports } from '../hooks/useReports';
import Card from '../components/ui/Card';
import { AlertCircle } from 'lucide-react';
import { 
  ReportMarker, 
  ReportInfoWindow, 
  MapLegend, 
  DARK_THEME, 
  ALMATY_CENTER, 
  DEFAULT_ZOOM, 
  MAP_ID 
} from '../components/map';

export default function MapPage() {
  const { reports } = useReports();
  const [hoveredReport, setHoveredReport] = useState(null);
  const [leaveTimeout, setLeaveTimeout] = useState(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const handleMouseEnter = (report) => {
    if (leaveTimeout) {
      clearTimeout(leaveTimeout);
      setLeaveTimeout(null);
    }
    setHoveredReport(report);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredReport(null);
    }, 300);
    setLeaveTimeout(timeout);
  };

  const clearHoverTimeout = () => {
    if (leaveTimeout) {
      clearTimeout(leaveTimeout);
      setLeaveTimeout(null);
    }
  };

  if (!apiKey) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center p-4">
        <Card className="max-w-md text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-rose-500" />
          <h2 className="mt-4 text-xl font-bold text-white">API Key Missing</h2>
          <p className="mt-2 text-slate-400">
            Please add your Google Maps API Key to the <code>.env</code> file.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100vh-64px)] w-full">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={ALMATY_CENTER}
          defaultZoom={DEFAULT_ZOOM}
          mapId={MAP_ID}
          styles={DARK_THEME}
          disableDefaultUI={true}
          zoomControl={true}
          className="h-full w-full"
        >
          {reports.map((report) => (
            <ReportMarker
              key={report.id}
              report={report}
              isHovered={hoveredReport?.id === report.id}
              onMouseEnter={() => handleMouseEnter(report)}
              onMouseLeave={handleMouseLeave}
            />
          ))}

          {hoveredReport && (
            <ReportInfoWindow
              report={hoveredReport}
              onMouseEnter={clearHoverTimeout}
              onMouseLeave={handleMouseLeave}
              onClose={() => setHoveredReport(null)}
            />
          )}
        </Map>
      </APIProvider>

      <MapLegend />
    </div>
  );
}
