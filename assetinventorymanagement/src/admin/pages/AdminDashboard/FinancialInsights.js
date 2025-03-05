import React from 'react';
import { Card, ProgressBar, Row, Col } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip, Legend);

const FinancialInsights = ({ assets }) => {
  const departments = [...new Set(assets.map(a => a.assignedTo ? 'Assigned' : 'Unassigned'))];
  const budgetUtilization = departments.map(dep => ({
    name: dep,
    used: assets.filter(a => (a.assignedTo ? 'Assigned' : 'Unassigned') === dep).reduce((sum, a) => sum + (a.cost || 0), 0),
    total: 10000, // Mock total budget per department
  }));

  const topExpensive = [...assets].sort((a, b) => b.cost - a.cost).slice(0, 5);

  // Simulate monthly expense trends (mock data)
  const monthlyData = {
    labels: ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06'],
    datasets: [
      {
        label: 'New Assets',
        data: assets.reduce((acc, asset) => {
          const month = asset.purchaseDate.slice(0, 7);
          acc[month] = (acc[month] || 0) + (asset.cost || 0);
          return acc;
        }, {}),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
      {
        label: 'Repairs',
        data: {
          '2025-01': 500,
          '2025-02': 300,
          '2025-03': 400,
          '2025-04': 200,
          '2025-05': 600,
          '2025-06': 350,
        },
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      },
    ],
  };

  // Transform data for Chart.js
  const chartData = {
    labels: monthlyData.labels,
    datasets: monthlyData.datasets.map(dataset => ({
      ...dataset,
      data: monthlyData.labels.map(label => dataset.data[label] || 0),
    })),
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: { unit: 'month' },
        title: { display: true, text: 'Month' },
      },
      y: {
        title: { display: true, text: 'Cost ($)' },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Monthly Expense Trends' },
    },
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Financial Insights</Card.Title>
        <h6>Budget Utilization</h6>
        {budgetUtilization.map((dep, i) => (
          <div key={i} className="mb-3">
            <small>{dep.name}: ${dep.used} / ${dep.total}</small>
            <ProgressBar now={(dep.used / dep.total) * 100} variant="success" />
          </div>
        ))}
        <h6 className="mt-4">Top 5 Expensive Assets</h6>
        <ul>
          {topExpensive.map(a => (
            <li key={a.id}>{a.name} - ${a.cost}</li>
          ))}
        </ul>
        <h6 className="mt-4">Monthly Expense Trends</h6>
        <div style={{ height: '300px' }}>
          <Line data={chartData} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default FinancialInsights;
