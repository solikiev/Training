# Training Tracker

A comprehensive training tracker web application built with Next.js, TypeScript, and Tailwind CSS. Track your fitness training sessions with a color-coded calendar, detailed history, and customizable targets.

## Features

### 🗓️ Calendar View
- Monthly calendar showing all training days
- Color-coded days based on training duration vs. targets:
  - **GREEN**: Training duration within target range
  - **YELLOW**: Training duration below target minimum
  - **RED**: Training duration above target maximum
- Click on any day to view/add training details

### 📝 Training Entry Form
- Date and time picker
- Training description (e.g., "chest(main)+delts and biceps")
- Duration in minutes
- Support for multiple training sessions per day
- Easy-to-use save functionality

### 📊 Training History
- List view of all training sessions
- Grouped by date (most recent first)
- Each entry shows: date, time, description, duration
- Edit and delete buttons for each entry

### ⚙️ Target Settings
- Configurable training duration targets
- Minimum target (default: 70 minutes)
- Maximum target (default: 90 minutes)
- Settings page to adjust values

### 💾 Data Persistence
- Uses localStorage to save all training data
- Uses localStorage to save target settings
- Data persists across browser sessions

### 📱 Mobile-First Design
- Responsive layout optimized for mobile devices
- Touch-friendly buttons and inputs
- Progressive Web App (PWA) support
- Full-screen mode without browser bars when installed
- Can be installed on phone home screen

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Date Management**: date-fns
- **PWA**: Custom service worker implementation

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/solikiev/Training.git
cd Training
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Deployment to Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/solikiev/Training)

### Manual Deployment

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to complete deployment

### GitHub Integration

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Click "Deploy"

Vercel will automatically:
- Build your Next.js application
- Deploy to a production URL
- Set up continuous deployment for future pushes

## Installing as PWA on Mobile

### iOS (iPhone/iPad)

1. Open the app in Safari
2. Tap the Share button (square with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add" in the top right
5. The app will now appear on your home screen

### Android

1. Open the app in Chrome
2. Tap the menu (three dots)
3. Tap "Add to Home screen" or "Install app"
4. Tap "Add" or "Install"
5. The app will now appear on your home screen

## Usage Examples

### Example Training Entry

**Saturday 8:00 AM**
- Description: "chest(main)+delts and biceps"
- Duration: 90 minutes

**Saturday 8:00 PM**
- Description: "cardio+abs"
- Duration: 40 minutes

### Setting Targets

1. Click the Settings (⚙️) button in the header
2. Adjust minimum and maximum training duration
3. Click "Save Settings"
4. Calendar will update colors based on new targets

## Development

### Project Structure

```
Training/
├── app/
│   ├── components/       # React components
│   │   ├── Calendar.tsx
│   │   ├── TrainingForm.tsx
│   │   ├── TrainingHistory.tsx
│   │   └── PWARegistration.tsx
│   ├── lib/             # Utility functions
│   │   └── storage.ts
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   ├── settings/        # Settings page
│   │   └── page.tsx
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── public/              # Static assets
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── manifest.json
│   └── sw.js
├── next.config.ts       # Next.js configuration
├── tailwind.config.ts   # Tailwind configuration
└── package.json
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

