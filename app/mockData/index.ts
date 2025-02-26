
// Chart types and interfaces
export type ChartType = "pie" | "bar" | "line"
export type TimeFrame = "day" | "week" | "month" | "year" | "total"
export type SortOrder = "asc" | "desc"

export interface ChartSettings {
  title: string
  dataSource: "surveys" | "responses"
  selectedItems: Array<{ id: number; type: "survey" | "question" }>
  chartType: ChartType
  timeFrame: TimeFrame
  sortOrder: SortOrder
}

export interface Chart extends ChartSettings {
  id: string
}

// Mock surveys data
export const mockSurveys = [
  {
    id: 1,
    name: "Survey 1",
    questions: [
      { id: 1, text: "This is a question regarding our product", type: "rating" },
      { id: 2, text: "Multi-Select question on our product", type: "multi" },
      { id: 3, text: "Multi-Select question on our product", type: "multi" },
    ],
  },
  {
    id: 2,
    name: "Survey 2",
    questions: [{ id: 4, text: "Command Item Text", type: "text" }],
  },
];

// Mock chart data
export const mockChartData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

// Mock dashboard data
export const mockDashboardData = {
  title: "Untitled Dashboard",
  charts: [
    {
      id: "chart1",
      title: "Response Distribution",
      dataSource: "responses",
      selectedItems: [{ id: 1, type: "question" }],
      chartType: "pie",
      timeFrame: "month",
      sortOrder: "desc"
    },
    {
      id: "chart2",
      title: "Monthly Trends",
      dataSource: "surveys",
      selectedItems: [{ id: 2, type: "question" }],
      chartType: "line",
      timeFrame: "year",
      sortOrder: "asc"
    }
  ] as Chart[]
};

// Default initial chart settings
export const defaultChartSettings: ChartSettings = {
  title: "Chart Title",
  dataSource: "surveys",
  selectedItems: [],
  chartType: "pie",
  timeFrame: "month",
  sortOrder: "desc",
};

// Navigation data
export const navigationItems = [
  { name: "Surveys", href: "/surveys", icon: "ClipboardList" },
  { name: "Dashboards", href: "/dashboards", icon: "LayoutDashboard" },
  { name: "Contacts", href: "/contacts", icon: "Users2" },
  { name: "Actions", href: "/actions", icon: "ListTodo" },
  { name: "Integrations", href: "/integrations", icon: "FolderKanban" },
  { name: "Configuration", href: "/configuration", icon: "Settings" },
];

// User profile data
export const mockUserProfile = {
  initials: "JD",
  name: "John Doe",
  email: "john@example.com"
};
