# SkillB - Skills Marketplace Mobile App

A React Native mobile application built with Expo for connecting skilled professionals with clients who need their services.

## Features

- **Splash Screen**: Beautiful animated splash screen with SkillB branding
- **Onboarding**: Interactive onboarding flow explaining the app's features
- **Authentication**: Login and signup screens with form validation
- **Main Dashboard**: Feature overview and navigation to core functionality
- **Responsive Design**: Optimized for both iOS and Android devices
- **Expo Compatible**: Fully compatible with Expo Go for easy testing

## Getting Started

### Prerequisites

- Node.js (v20.3.1 or higher recommended)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app on your mobile device

### Installation

1. Navigate to the project directory:
   ```bash
   cd SkillBApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Scan the QR code with Expo Go app on your mobile device

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator (macOS only)
- `npm run web` - Run in web browser

## App Flow

1. **Splash Screen**: Shows for 3 seconds with animated logo
2. **Onboarding**: First-time users see 4 slides explaining features
3. **Authentication**: Login/signup screen with form validation
4. **Main Dashboard**: Overview of app features and navigation

## Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React Context for state management
├── navigation/         # Navigation configuration
├── screens/            # Screen components
│   ├── SplashScreen.tsx
│   ├── OnboardingScreen.tsx
│   ├── AuthScreen.tsx
│   └── MainScreen.tsx
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Technologies Used

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **TypeScript**: Type-safe JavaScript
- **React Navigation**: Navigation library
- **Expo Linear Gradient**: Gradient backgrounds
- **AsyncStorage**: Local data persistence
- **React Native Paper**: Material Design components

## Customization

### Colors
The app uses a purple gradient theme. To change colors, update the gradient colors in:
- `SplashScreen.tsx`
- `OnboardingScreen.tsx`
- `AuthScreen.tsx`
- `MainScreen.tsx`

### Branding
Update the logo text "SkillB" in all screen files to match your brand.

### Features
Add new screens in the `src/screens/` directory and update the navigation flow in `App.tsx`.

## Testing with Expo Go

1. Install Expo Go on your mobile device
2. Run `npm start` in the project directory
3. Scan the QR code with Expo Go
4. The app will load directly on your device

## Next Steps

This is the foundation of your skills marketplace app. Future enhancements could include:

- Service listing and browsing
- User profiles and portfolios
- Booking and scheduling system
- Payment integration
- Real-time messaging
- Push notifications
- Location-based services
- Rating and review system

## Support

For issues or questions, check the Expo documentation or React Native documentation.
