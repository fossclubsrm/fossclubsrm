Goal is to create an dynamic forms builder, with 4 simple type inputs atm... mcq /single choice / text / file upload...

There will be two major parts

- Admin Panel where users can create forms, view responses, general clicks on the link, views and other misc metrics
- Public form page where the user can fill the form and submit it... the theme must have the below colors only.

Primary Colors
FOSS Mint
#08B74F
Libre White
#FFFFFF
Secondary Colors
Pixel Blue
#2E90FA
Flame Red
#F04438
Code Night
#1A1A1A
Byte Yellow
#FEC84B
Open Gray
#1E1E1E

Feel free to use nuxt/ui components for easy and quick building and store everything in supabase.

# Plan

## Setup & Configuration

- [x] Configure Supabase integration
- [x] Set up database schema for forms, responses, and metrics
- [x] Configure Nuxt UI components
- [x] Set up color theme variables

## Database Schema

- [x] Create forms table (id, title, description, fields, created_at, updated_at)
- [x] Create form_responses table (id, form_id, data, submitted_at)
- [x] Create form_metrics table (id, form_id, view_count, click_count, etc.)

## Admin Panel

- [x] Create admin layout with navigation
- [x] Form builder interface with drag-and-drop functionality
- [x] Field type components (MCQ, Single Choice, Text, File Upload)
- [x] Form preview functionality
- [ ] Form management (create, edit, delete, duplicate)
- [ ] Response viewer with data visualization
- [ ] Analytics dashboard with metrics

## Public Form Page

- [x] Dynamic form renderer
- [x] Form submission handling
- [x] File upload functionality
- [x] Success/error feedback
- [x] Responsive design with FOSS theme

## Features & Polish

- [ ] Form sharing functionality
- [ ] Analytics tracking (views, clicks, submissions)
- [ ] Form validation
- [ ] Error handling
- [ ] Loading states
- [ ] Mobile responsiveness
