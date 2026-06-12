export const assistantService = {
  async sendMessage(message) {
    const lower = message.toLowerCase()
    if (lower.includes('priority') || lower.includes('critical')) {
      return 'I would mark incidents as Critical when there is immediate danger, blocked emergency access, or a school-zone safety risk.'
    }
    if (lower.includes('dashboard')) {
      return 'The dashboard shows open work is trending down while resolved reports are up, with traffic and road damage leading volume.'
    }
    return 'I can draft that report, classify the likely department, and suggest a priority based on location, risk, and urgency.'
  },
}
