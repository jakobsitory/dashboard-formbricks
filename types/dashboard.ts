export interface DashboardMetric {
  id: string;
  name: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
}

export interface ChartData {
  date: string;
  value: number;
}

export interface DashboardStats {
  metrics: DashboardMetric[];
  chartData: ChartData[];
}
