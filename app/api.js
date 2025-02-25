const dashboards = [
	{
	  id: 1,
	  name: "Analytics Overview",
	  description: "Key metrics and performance indicators",
	  status: "error",
	  lastUpdated: "2h ago",
	  type: "Analytics",
	},
	{
	  id: 2,
	  name: "Sales Dashboard",
	  description: "Revenue tracking and sales metrics",
	  status: "error",
	  lastUpdated: "1h ago",
	  type: "Sales",
	},
	{
	  id: 3,
	  name: "Marketing Campaign",
	  description: "Campaign performance and ROI tracking",
	  status: "error",
	  lastUpdated: "30m ago",
	  type: "Marketing",
	},
	{
	  id: 4,
	  name: "Customer Insights",
	  description: "User behavior and engagement metrics",
	  status: "error",
	  lastUpdated: "45m ago",
	  type: "Customer",
	},
	{
	  id: 5,
	  name: "Product Performance",
	  description: "Product usage and feedback metrics",
	  status: "error",
	  lastUpdated: "15m ago",
	  type: "Product",
	},
	{
	  id: 6,
	  name: "Team Productivity",
	  description: "Team performance and task completion",
	  status: "error",
	  lastUpdated: "1h ago",
	  type: "Team",
	},
  ]

const api = {
	getDashboards: () => {
		return dashboards;
	},
	getDashboard(_id) {
		return dashboards.find(({ id }) => id === _id)
	},
}

export default api;
