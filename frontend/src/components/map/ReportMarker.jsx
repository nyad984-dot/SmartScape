import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { PRIORITY_COLORS } from './MapConstants';

export default function ReportMarker({ report, isHovered, onMouseEnter, onMouseLeave }) {
  return (
    <AdvancedMarker
      position={report.position}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="group relative cursor-pointer">
        {/* Hit area: invisible larger circle to make hovering easier */}
        <div className="absolute -top-6 -left-6 h-12 w-12 rounded-full bg-transparent" />
        <Pin
          background={PRIORITY_COLORS[report.priority]?.pin || '#64748b'}
          borderColor={'#ffffff'}
          glyphColor={'#ffffff'}
          scale={isHovered ? 1.4 : 1.2}
        />
      </div>
    </AdvancedMarker>
  );
}
