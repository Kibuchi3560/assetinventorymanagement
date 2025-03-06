import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Reports = () => {
  // eslint-disable-next-line no-unused-vars
  const { assets, requests } = useSelector((state) => ({
    assets: state.assets.items,
    requests: state.requests.items,
  }));

  const handleExport = async (format, reportType) => {
    try {
      const response = await axios.get('/api/reporting-export', {
        withCredentials: true,
        responseType: 'blob', // For file download
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${reportType}.${format.toLowerCase()}`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(`Error exporting ${reportType} to ${format}:`, error);
    }
  };

  const reports = [
    { title: 'Asset Depreciation', description: 'Depreciation status of all assets' },
    { title: 'Request Analysis', description: 'Department-wise request summary' },
    { title: 'Maintenance Trends', description: 'Trends in maintenance costs' },
  ];

  return (
    <div className="container my-4">
      <h1>Reports & Analytics</h1>
      <p>Generate reports and view analytics for asset usage, pending requests, and overall performance.</p>
      <div className="row">
        {reports.map((report, index) => (
          <div key={index} className="col-md-4 mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{report.title}</Card.Title>
                <Card.Text>{report.description}</Card.Text>
                <Button variant="primary" className="me-2" onClick={() => handleExport('CSV', report.title)}>
                  Export CSV
                </Button>
                <Button variant="secondary" onClick={() => handleExport('PDF', report.title)}>
                  Export PDF
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;