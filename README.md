# NexusCRM - Modern Call Center Management System

NexusCRM is a comprehensive CRM system designed specifically for call centers, featuring role-based access control, client management, call tracking, and performance analytics.

## Features

### Role-Based Access Control
- **Admin**: Full access to manage clients, view reports, and monitor team performance
- **Supervisor**: Can assign and manage clients, but cannot delete them
- **Agent**: Limited to viewing assigned clients and recording calls

### Client Management
- Complete client database with filtering and search capabilities
- Client assignment system with role-based permissions
- Detailed client information tracking

### Call Tracking
- Call recording with status tracking (effective, hung-up, in-progress)
- Duration tracking and notes for each call
- Comprehensive call history with filtering options

### Dashboard & Analytics
- Interactive performance charts showing agent effectiveness
- Call distribution analytics
- Recent activity tracking
- Key metrics display (clients, calls, effectiveness rates)

### Team Management
- Add, edit, and remove team members
- Assign different roles (admin, supervisor, agent)
- Track team performance metrics

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **UI**: Tailwind CSS, shadcn/ui components
- **Charts**: Recharts
- **Forms**: React Hook Form, Zod validation
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/devmanagger/nexuscrm.git
cd nexuscrm
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Demo Credentials

- Email: admin@example.com
- Password: password123

## Deployment

The project is configured for easy deployment to GitHub Pages using GitHub Actions. Simply push to the main branch, and the workflow will automatically build and deploy the application.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Lucide Icons](https://lucide.dev/) for the icon set
- [Recharts](https://recharts.org/) for the data visualization



