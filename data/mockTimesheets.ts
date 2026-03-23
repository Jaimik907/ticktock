export const mockWeeks = [
  { id: "w1", weekNumber: 1, startDate: "2024-01-01", endDate: "2024-01-05", status: "Completed" },
  { id: "w2", weekNumber: 2, startDate: "2024-01-08", endDate: "2024-01-12", status: "Completed" },
  { id: "w3", weekNumber: 3, startDate: "2024-01-15", endDate: "2024-01-19", status: "Incomplete" },
  { id: "w4", weekNumber: 4, startDate: "2024-01-22", endDate: "2024-01-26", status: "Completed" },
  { id: "w5", weekNumber: 5, startDate: "2024-01-28", endDate: "2024-02-01", status: "Missing" },
  { id: "w6", weekNumber: 6, startDate: "2026-03-03", endDate: "2026-03-07", status: "Completed" },
  { id: "w7", weekNumber: 7, startDate: "2026-03-10", endDate: "2026-03-14", status: "Incomplete" },
  { id: "w8", weekNumber: 8, startDate: "2026-03-17", endDate: "2026-03-21", status: "Missing" },
]

export const mockEntries = [
  { id: "e1", weekId: "w1", date: "2024-01-01", hours: 8, description: "Homepage Development", project: "Ticktock", workType: "Feature" },
  { id: "e2", weekId: "w1", date: "2024-01-01", hours: 4, description: "Component Library Setup", project: "Ticktock", workType: "Feature" },
  { id: "e3", weekId: "w1", date: "2024-01-02", hours: 6, description: "API Integration", project: "Ticktock", workType: "Feature" },
  { id: "e4", weekId: "w1", date: "2024-01-03", hours: 8, description: "Dashboard Layout", project: "Ticktock", workType: "Feature" },
  { id: "e5", weekId: "w1", date: "2024-01-04", hours: 7, description: "Unit Testing", project: "Ticktock", workType: "Testing" },
  { id: "e6", weekId: "w1", date: "2024-01-05", hours: 7, description: "Bug Fixes", project: "Ticktock", workType: "Bug fixes" },

  { id: "e7",  weekId: "w2", date: "2024-01-08", hours: 8, description: "Code Review", project: "Ticktock", workType: "Code Review" },
  { id: "e8",  weekId: "w2", date: "2024-01-08", hours: 4, description: "Sprint Planning", project: "Internal", workType: "Feature" },
  { id: "e9",  weekId: "w2", date: "2024-01-09", hours: 8, description: "Auth Module", project: "Ticktock", workType: "Feature" },
  { id: "e10", weekId: "w2", date: "2024-01-10", hours: 6, description: "Middleware Setup", project: "Ticktock", workType: "Feature" },
  { id: "e11", weekId: "w2", date: "2024-01-11", hours: 7, description: "E2E Testing", project: "Ticktock", workType: "Testing" },
  { id: "e12", weekId: "w2", date: "2024-01-12", hours: 7, description: "Performance Fixes", project: "Ticktock", workType: "Bug fixes" },

  { id: "e13", weekId: "w3", date: "2024-01-15", hours: 6, description: "Timesheet Table", project: "Ticktock", workType: "Feature" },
  { id: "e14", weekId: "w3", date: "2024-01-16", hours: 5, description: "Modal Development", project: "Ticktock", workType: "Feature" },
  { id: "e15", weekId: "w3", date: "2024-01-17", hours: 4, description: "Form Validation", project: "Ticktock", workType: "Bug fixes" },

  { id: "e16", weekId: "w4", date: "2024-01-22", hours: 8, description: "Homepage Development", project: "Ticktock", workType: "Feature" },
  { id: "e17", weekId: "w4", date: "2024-01-22", hours: 4, description: "Design Review", project: "Internal", workType: "Code Review" },
  { id: "e18", weekId: "w4", date: "2024-01-23", hours: 8, description: "API Endpoints", project: "Ticktock", workType: "Feature" },
  { id: "e19", weekId: "w4", date: "2024-01-24", hours: 8, description: "Database Schema", project: "Ticktock", workType: "Feature" },
  { id: "e20", weekId: "w4", date: "2024-01-25", hours: 6, description: "Integration Tests", project: "Ticktock", workType: "Testing" },
  { id: "e21", weekId: "w4", date: "2024-01-26", hours: 6, description: "Deployment Setup", project: "Ticktock", workType: "Feature" },

  { id: "e22", weekId: "w6", date: "2026-03-03", hours: 8, description: "Dashboard Development", project: "Ticktock", workType: "Feature" },
  { id: "e23", weekId: "w6", date: "2026-03-04", hours: 7, description: "Auth Integration", project: "Ticktock", workType: "Feature" },
  { id: "e24", weekId: "w6", date: "2026-03-05", hours: 6, description: "Code Review", project: "Ticktock", workType: "Code Review" },
  { id: "e25", weekId: "w6", date: "2026-03-06", hours: 8, description: "Unit Tests", project: "Ticktock", workType: "Testing" },
  { id: "e26", weekId: "w6", date: "2026-03-07", hours: 7, description: "Bug Fixes", project: "Ticktock", workType: "Bug fixes" },

  { id: "e27", weekId: "w7", date: "2026-03-10", hours: 5, description: "Timesheet Module", project: "Ticktock", workType: "Feature" },
  { id: "e28", weekId: "w7", date: "2026-03-11", hours: 4, description: "API Routes", project: "Ticktock", workType: "Feature" },
  { id: "e29", weekId: "w7", date: "2026-03-12", hours: 3, description: "Form Fixes", project: "Ticktock", workType: "Bug fixes" },
]