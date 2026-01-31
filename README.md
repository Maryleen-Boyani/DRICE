# DRICE Frontend (React + Vite)

This repository contains the frontend for Daystar University's DRICE (Directorate of Research, Innovation, Commercialization & Entrepreneurship) platform.

## Overview

The frontend is built with React and Vite, featuring:
- Contact form with Supabase backend integration
- Microsoft Forms redirection for various engagement types
- Responsive design with Tailwind CSS
- Client-side form validation
- Success/error handling with user feedback

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account and project
- Microsoft Forms URLs (for engagement features)

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd drice-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   VITE_DRICE_EMAIL=drice@daystar.ac.ke
   VITE_POSTER_FORM_URL=https://forms.office.com/r/your-link
   VITE_INNOVATION_FORM_URL=https://forms.office.com/r/your-link
   VITE_PROBLEM_FORM_URL=https://forms.office.com/r/your-link
   VITE_PARTNER_FORM_URL=https://forms.office.com/r/your-link
   VITE_CLINIC_FORM_URL=https://forms.office.com/r/your-link
   ```

4. **Set up Supabase**
   - Create a Supabase project
   - Run the database schema (see `Database Setup` section)
   - Enable Row Level Security
   - Set up Edge Function for email notifications (optional)

5. **Set up Microsoft Forms**
   - Create 5 separate forms for each engagement type
   - Get the shareable links for each form
   - Add links to your `.env` file

## Database Setup

Run this SQL in Supabase SQL Editor:

```sql
CREATE TABLE inquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  project_description TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX idx_inquiries_status ON inquiries(status);
```

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

- `src/components/` - React components
- `src/services/` - API and Supabase services
- `public/` - Static assets
- `.env` - Environment variables

## Key Features

### Contact Form
- Stores submissions in Supabase
- Client-side validation
- Success/error messaging
- Fallback to email client

### Engagement Pipeline
- Redirects to Microsoft Forms for:
  - Poster submissions
  - Problem proposals
  - Partnership requests
  - Clinic applications
  - Innovation adoption

### Content Sections
- Featured research projects
- Leadership team profiles
- Research events calendar
- About DRICE mission

## Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| VITE_SUPABASE_URL | Supabase project URL | Yes |
| VITE_SUPABASE_ANON_KEY | Supabase anonymous key | Yes |
| VITE_DRICE_EMAIL | Contact email address | Yes |
| VITE_*_FORM_URL | Microsoft Forms URLs | Yes (for engagement) |
| VITE_SITE_URL | Application URL | No |
| VITE_APP_ENV | Environment mode | No |

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify
1. Connect your repository
2. Set environment variables
3. Deploy automatically

### Manual Deployment
Upload the contents of the `dist` folder to your web server.

## Troubleshooting

**Forms not submitting:**
- Check Supabase connection
- Verify RLS policies
- Check console for errors

**Links not working:**
- Verify Microsoft Forms URLs in `.env`
- Check if forms are publicly accessible

**Build errors:**
- Ensure Node.js 18+ is installed
- Check for missing dependencies

## License

Copyright © Daystar University. All rights reserved.

## Contact

DRICE Team - drice@daystar.ac.ke  
Athi River Campus, Machakos County