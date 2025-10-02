import type { JobCard, Train } from './types';

export function exportToCSV(jobCards: JobCard[], trains: Train[]) {
  const headers = ['Job Card ID', 'Train ID', 'Task Type', 'Priority', 'Deadline', 'Status', 'Description'];

  const rows = jobCards.map(jobCard => [
    jobCard.jobCardId,
    jobCard.trainId,
    jobCard.taskType,
    jobCard.priority,
    jobCard.deadline,
    jobCard.status,
    jobCard.description,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `job-cards-report-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToPDF(jobCards: JobCard[], trains: Train[]) {
  const printWindow = window.open('', '_blank');

  if (!printWindow) {
    alert('Please allow popups to export PDF');
    return;
  }

  const statusData = [
    {
      name: 'Run',
      value: trains.filter(t => t.status === 'Run').length,
    },
    {
      name: 'Standby',
      value: trains.filter(t => t.status === 'Standby').length,
    },
    {
      name: 'Maintenance',
      value: trains.filter(t => t.status === 'Maintenance').length,
    },
  ];

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Metro Train Report</title>
      <style>
        @page {
          size: A4;
          margin: 20mm;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          background: #fff;
        }

        .header {
          text-align: center;
          padding: 20px 0;
          border-bottom: 3px solid #4D96FF;
          margin-bottom: 30px;
        }

        .header h1 {
          color: #4D96FF;
          font-size: 28px;
          margin-bottom: 5px;
        }

        .header p {
          color: #666;
          font-size: 14px;
        }

        .date {
          text-align: right;
          color: #666;
          margin-bottom: 20px;
          font-size: 12px;
        }

        .summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-bottom: 30px;
        }

        .summary-card {
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          padding: 15px;
          text-align: center;
        }

        .summary-card h3 {
          font-size: 14px;
          color: #666;
          margin-bottom: 5px;
        }

        .summary-card p {
          font-size: 24px;
          font-weight: bold;
        }

        .summary-card.run p { color: #38B000; }
        .summary-card.standby p { color: #FFD60A; }
        .summary-card.maintenance p { color: #FF4747; }

        h2 {
          color: #4D96FF;
          font-size: 20px;
          margin: 30px 0 15px;
          padding-bottom: 10px;
          border-bottom: 2px solid #e0e0e0;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 30px;
          font-size: 12px;
        }

        thead {
          background: #4D96FF;
          color: white;
        }

        th, td {
          padding: 10px;
          text-align: left;
          border: 1px solid #ddd;
        }

        tbody tr:nth-child(even) {
          background: #f9f9f9;
        }

        tbody tr:hover {
          background: #f0f0f0;
        }

        .badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: bold;
        }

        .badge.high { background: #FFE5E5; color: #FF4747; }
        .badge.medium { background: #FFF9E5; color: #FFD60A; }
        .badge.low { background: #E5F9E5; color: #38B000; }
        .badge.completed { background: #E5F9E5; color: #38B000; }
        .badge.in-progress { background: #FFF9E5; color: #FFD60A; }
        .badge.pending { background: #FFE5E5; color: #FF4747; }

        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #e0e0e0;
          color: #666;
          font-size: 12px;
        }

        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🚇 Metro Train Management Report</h1>
        <p>Comprehensive Job Card Timeline & Fleet Status</p>
      </div>

      <div class="date">
        Generated on: ${new Date().toLocaleString()}
      </div>

      <div class="summary">
        <div class="summary-card run">
          <h3>Running Trains</h3>
          <p>${statusData[0].value}</p>
        </div>
        <div class="summary-card standby">
          <h3>Standby Trains</h3>
          <p>${statusData[1].value}</p>
        </div>
        <div class="summary-card maintenance">
          <h3>In Maintenance</h3>
          <p>${statusData[2].value}</p>
        </div>
      </div>

      <h2>Job Card Timeline (${jobCards.length} Active Tasks)</h2>
      <table>
        <thead>
          <tr>
            <th>Job Card ID</th>
            <th>Train ID</th>
            <th>Task Type</th>
            <th>Priority</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          ${jobCards.map(jobCard => `
            <tr>
              <td><strong>${jobCard.jobCardId}</strong></td>
              <td>${jobCard.trainId}</td>
              <td>${jobCard.taskType}</td>
              <td><span class="badge ${jobCard.priority.toLowerCase()}">${jobCard.priority}</span></td>
              <td>${new Date(jobCard.deadline).toLocaleDateString()}</td>
              <td><span class="badge ${jobCard.status.toLowerCase().replace(' ', '-')}">${jobCard.status}</span></td>
              <td>${jobCard.description}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <h2>Train Fleet Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Train ID</th>
            <th>Status</th>
            <th>Mileage (km)</th>
            <th>Fitness</th>
            <th>Cleaning</th>
            <th>Branding</th>
          </tr>
        </thead>
        <tbody>
          ${trains.map(train => `
            <tr>
              <td><strong>${train.trainId}</strong></td>
              <td><span class="badge ${train.status.toLowerCase()}">${train.status}</span></td>
              <td>${train.mileage.toLocaleString()}</td>
              <td>${train.fitnessStatus}</td>
              <td>${train.cleaningStatus}</td>
              <td>${train.brandingStatus}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="footer">
        <p>Metro Train Management System © ${new Date().getFullYear()}</p>
        <p>This report contains confidential information. Handle with care.</p>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 500);
        };

        window.onafterprint = function() {
          window.close();
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
