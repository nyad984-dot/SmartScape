export const userProfile = {
  name: 'Aida Karimova',
  email: 'aida.karimova@city.ai',
  role: 'CITIZEN',
  avatar: 'AK',
  district: 'Medeu District',
  stats: [
    { label: 'Reports filed', value: 18 },
    { label: 'Resolved', value: 14 },
    { label: 'Impact score', value: 92 },
  ],
}

export const reports = [
  {
    id: 'RPT-1048',
    title: 'Traffic light outage on Abay Avenue',
    description:
      'Main intersection lights are blinking yellow and cars are backing up during peak traffic.',
    status: 'Open',
    priority: 'High',
    date: '2026-06-10',
    location: 'Abay Ave and Dostyk Ave',
    category: 'Traffic',
    department: 'Transport Department',
    image:
      'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&w=900&q=80',
    timeline: [
      'Report submitted by resident',
      'AI classified as Traffic Infrastructure',
      'Transport Department notified',
    ],
    comments: ['Dispatch team scheduled inspection for this afternoon.'],
  },
  {
    id: 'RPT-1047',
    title: 'Large pothole near school entrance',
    description:
      'A deep pothole is forcing cars into the pedestrian lane near the school gate.',
    status: 'In Progress',
    priority: 'Critical',
    date: '2026-06-09',
    location: 'Satpaev Street 42',
    category: 'Road Damage',
    department: 'Road Maintenance',
    image:
      'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=900&q=80',
    timeline: ['Report submitted', 'Emergency risk detected', 'Repair crew assigned'],
    comments: ['Temporary cones have been placed around the damaged area.'],
  },
  {
    id: 'RPT-1046',
    title: 'Garbage accumulation beside market',
    description:
      'Overflowing bins have blocked the sidewalk and created a sanitation concern.',
    status: 'Resolved',
    priority: 'Medium',
    date: '2026-06-08',
    location: 'Green Bazaar service lane',
    category: 'Garbage',
    department: 'Sanitation Department',
    image:
      'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=900&q=80',
    timeline: ['Report submitted', 'Sanitation routed', 'Cleanup completed'],
    comments: ['Resolved and added to increased pickup schedule.'],
  },
  {
    id: 'RPT-1045',
    title: 'Street lights broken in park walkway',
    description:
      'Three consecutive street lights are off, making the walkway unsafe after dark.',
    status: 'Open',
    priority: 'High',
    date: '2026-06-07',
    location: 'Central Park north path',
    category: 'Lighting',
    department: 'Energy Services',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    timeline: ['Report submitted', 'AI confirmed lighting issue'],
    comments: ['Awaiting technician route confirmation.'],
  },
]

export const dashboardData = {
  summary: [
    { label: 'Total Reports', value: '1,248', trend: '+12%', tone: 'sky' },
    { label: 'Open Reports', value: '214', trend: '-8%', tone: 'amber' },
    { label: 'Resolved Reports', value: '934', trend: '+18%', tone: 'emerald' },
    { label: 'Critical Incidents', value: '17', trend: '+3', tone: 'rose' },
  ],
  byCategory: [
    { name: 'Traffic', value: 320 },
    { name: 'Road Damage', value: 248 },
    { name: 'Lighting', value: 176 },
    { name: 'Garbage', value: 210 },
    { name: 'Emergency', value: 74 },
  ],
  byStatus: [
    { name: 'Open', value: 214 },
    { name: 'In Progress', value: 100 },
    { name: 'Resolved', value: 934 },
  ],
  perDay: [
    { day: 'Mon', reports: 54 },
    { day: 'Tue', reports: 68 },
    { day: 'Wed', reports: 74 },
    { day: 'Thu', reports: 91 },
    { day: 'Fri', reports: 83 },
    { day: 'Sat', reports: 47 },
    { day: 'Sun', reports: 39 },
  ],
  departments: [
    { name: 'Transport', response: '3.8m', resolution: '92%' },
    { name: 'Sanitation', response: '5.2m', resolution: '89%' },
    { name: 'Energy', response: '6.5m', resolution: '84%' },
  ],
  critical: ['School zone pothole', 'Traffic signal outage', 'Flooded underpass'],
}

export const mapMarkers = [
  { id: 1, category: 'Road Damage', title: 'Pothole', position: [43.241, 76.91], priority: 'Critical' },
  { id: 2, category: 'Traffic', title: 'Signal outage', position: [43.236, 76.895], priority: 'High' },
  { id: 3, category: 'Lighting', title: 'Dark walkway', position: [43.25, 76.87], priority: 'High' },
  { id: 4, category: 'Garbage', title: 'Overflowing bins', position: [43.227, 76.88], priority: 'Medium' },
  { id: 5, category: 'Emergency', title: 'Road hazard', position: [43.245, 76.935], priority: 'Critical' },
]

export const initialChatMessages = [
  {
    id: 1,
    role: 'assistant',
    content:
      'Hi, I can help classify an incident, draft a report, or explain dashboard trends.',
  },
]
