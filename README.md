# AI-Driven Train Induction Planner

**Smart India Hackathon 2025 | Team Garuda**

A comprehensive web-based solution for Kochi Metro Rail Limited (KMRL) to intelligently manage train induction, maintenance scheduling, and real-time operations using AI-driven recommendations.

## Features

### 🚄 Train Fleet Management
- Real-time train status monitoring (Run, Standby, Maintenance)
- Detailed train information including mileage, fitness status, cleaning status, and branding
- Interactive train cards with expandable details
- Status badges with visual indicators

### 📋 Job Card Management
- Create, view, and manage maintenance job cards
- Priority-based task tracking (High, Medium, Low)
- Task type categorization (Maintenance, Cleaning, Branding)
- Status tracking (Pending, In Progress, Completed)
- Deadline monitoring with urgent task alerts

### 🤖 AI Allocation Planner
- Intelligent train status recommendations based on:
  - Current mileage
  - Fitness status
  - Cleaning requirements
  - Branding completion
- Confidence scoring for each recommendation
- Visual comparison of current vs. suggested status

### 🔮 What-If Simulator
- Test different scenarios before making decisions
- Simulate fitness failures, cleaning delays, and job card changes
- Real-time AI recommendations based on simulated conditions
- Easy reset to actual conditions

### 📊 Reports & Analytics
- Comprehensive job card timeline view
- Interactive charts:
  - Train mileage distribution
  - Status distribution pie chart
  - AI suggested vs. actual status comparison
- Export functionality (CSV & PDF)
- Advanced filtering by train, task type, and priority
- Urgent deadline alerts

### 🎨 Premium UI/UX
- Modern metro-themed design with gradient aesthetics
- Smooth animations powered by Framer Motion
- Fully responsive layout (mobile to desktop)
- Icon-rich interface with Lucide React icons
- Dark/light theme support
- Real-time visual feedback

## Tech Stack

- **Framework**: Next.js 13.5 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Form Handling**: React Hook Form + Zod validation

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kerala-metro
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── page.tsx              # Login page
│   ├── dashboard/page.tsx    # Main dashboard
│   ├── reports/page.tsx      # Reports & analytics
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── dashboard/            # Dashboard components
│   ├── reports/              # Reports components
│   └── ui/                   # Reusable UI components
├── lib/
│   ├── types.ts              # TypeScript types
│   ├── mock-data.ts          # Sample data
│   ├── utils.ts              # Utility functions
│   └── export-utils.ts       # Export functionality
└── hooks/                    # Custom React hooks
```

## Demo Credentials

- **Username**: supervisor
- **Password**: 12345

## Key Features for SIH 2025

1. **AI-Powered Decision Making**: Intelligent recommendations based on multiple train parameters
2. **Real-Time Monitoring**: Live status updates and alerts for critical conditions
3. **Scenario Planning**: What-if simulator for testing decisions before implementation
4. **Comprehensive Reporting**: Export capabilities for documentation and analysis
5. **User-Friendly Interface**: Intuitive design suitable for metro operations staff
6. **Scalable Architecture**: Built with modern tech stack for easy maintenance and scaling

## Future Enhancements

- Integration with actual metro systems via APIs
- Predictive maintenance using machine learning models
- Multi-user roles and permissions
- SMS/Email notifications for urgent tasks
- Mobile app version for on-the-go monitoring
- Historical data analytics and trends

## Team

**Team Garuda** - Smart India Hackathon 2025

## License

This project is developed for Smart India Hackathon 2025.

---

Built with ❤️ for Kochi Metro Rail Limited (KMRL)
