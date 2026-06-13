import api from './api'

// Helper to fetch and cache tickets for a short duration to avoid redundant parallel requests
let ticketsCache = null;
let lastFetch = 0;

async function fetchTickets() {
  const now = Date.now();
  if (ticketsCache && now - lastFetch < 2000) {
    return ticketsCache;
  }
  const response = await api.get('/api/ticket');
  ticketsCache = response.data || [];
  lastFetch = now;
  return ticketsCache;
}

export const dashboardService = {
  async getStats() {
    const tickets = await fetchTickets();
    return {
      totalReports: tickets.length,
      openReports: tickets.filter(t => t.status === 'OPEN').length,
      resolvedReports: tickets.filter(t => t.status === 'RESOLVED').length,
      criticalIncidents: Math.floor(tickets.length * 0.1) // Mocking 10% as critical
    };
  },

  async getCategories() {
    const tickets = await fetchTickets();
    const counts = {};
    tickets.forEach(t => {
      const cat = t.boardName || 'General';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return Object.entries(counts).map(([category, count]) => ({ category, count }));
  },

  async getStatuses() {
    const tickets = await fetchTickets();
    const counts = {};
    tickets.forEach(t => {
      const status = t.status || 'OPEN';
      counts[status] = (counts[status] || 0) + 1;
    });
    return Object.entries(counts).map(([status, count]) => ({ status, count }));
  },

  async getDaily() {
    const tickets = await fetchTickets();
    const total = tickets.length;
    const daily = [];
    for(let i=6; i>=0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      daily.push({
        date: d.toLocaleDateString('en-US', { weekday: 'short' }),
        count: Math.floor(total / 7) + Math.floor(Math.random() * 3) // Mock distributed trend
      });
    }
    return daily;
  },

  async getRecentReports() {
    const tickets = await fetchTickets();
    // Sort logic placeholder if ID is sequential
    const sorted = [...tickets].sort((a, b) => b.id - a.id);
    return sorted.slice(0, 10).map(t => ({
      id: t.id,
      title: t.title,
      category: t.boardName || 'General',
      priority: 'Medium', // mock priority
      status: t.status,
      department: 'City Operations', // mock dept
      createdAt: new Date().toISOString().split('T')[0] // mock date
    }));
  },

  async getCriticalIncidents() {
    const tickets = await fetchTickets();
    return tickets.slice(0, 5).map(t => ({
      id: t.id,
      title: t.title,
      location: 'City Center', // mock location
      priority: 'Critical',
      status: t.status,
      createdAt: new Date().toISOString()
    }));
  },

  async getDepartments() {
    return [
      { name: 'Roads & Infrastructure', casesHandled: 45, resolvedCases: 30, responseTime: '2h 15m' },
      { name: 'Public Utilities', casesHandled: 32, resolvedCases: 28, responseTime: '1h 45m' },
      { name: 'Law Enforcement', casesHandled: 18, resolvedCases: 15, responseTime: '45m' },
      { name: 'Sanitation', casesHandled: 24, resolvedCases: 22, responseTime: '4h 30m' }
    ];
  },

  async getAiInsights() {
    return {
      weeklyTrend: '+12.5%',
      mostCommonIssue: 'Potholes on Main St',
      highestRiskArea: 'Downtown District',
      recommendation: 'Deploy additional repair crews to Downtown District due to increasing reports of road damage.'
    };
  }
}
