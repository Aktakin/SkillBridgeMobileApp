import React from 'react';
import { AppProvider, useApp } from './src/context/AppContext';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import AuthScreen from './src/screens/AuthScreen';
import MainScreen from './src/screens/MainScreen';
import ServiceDiscoveryScreen from './src/screens/ServiceDiscoveryScreen';
import OfferSkillsScreen from './src/screens/OfferSkillsScreen';
import ServiceDetailScreen from './src/screens/ServiceDetailScreen';

const AppContent: React.FC = () => {
  const { currentScreen, setCurrentScreen, isFirstLaunch } = useApp();
  const [selectedService, setSelectedService] = React.useState<any>(null);

  const handleSplashFinish = () => {
    if (isFirstLaunch) {
      setCurrentScreen('onboarding');
    } else {
      setCurrentScreen('auth');
    }
  };

  const handleOnboardingFinish = () => {
    setCurrentScreen('auth');
  };

  const handleAuthSuccess = () => {
    setCurrentScreen('main');
  };

  const handleLogout = () => {
    setCurrentScreen('auth');
  };

  const handleFindServices = () => {
    setCurrentScreen('services');
  };

  const handleBackToMain = () => {
    setCurrentScreen('main');
  };

  const handleCategoryPress = (category: any) => {
    console.log('Category pressed:', category);
    // Handle category selection
  };

  const handleSeeAllPress = () => {
    console.log('See all pressed');
    // Handle see all categories
  };

  const handleSearchPress = () => {
    console.log('Search pressed');
    // Handle search
  };

  const handleOfferSkills = () => {
    setCurrentScreen('offer-skills');
  };

  const handleServicePress = (service: any) => {
    setSelectedService(service);
    setCurrentScreen('service-detail');
  };

  const handleBackToOfferSkills = () => {
    setCurrentScreen('offer-skills');
  };

  const handleEditService = (service: any) => {
    console.log('Edit service:', service);
    // Handle service editing
  };

  const handleDeleteService = (serviceId: string) => {
    console.log('Delete service:', serviceId);
    // Handle service deletion
    setCurrentScreen('offer-skills');
  };

  switch (currentScreen) {
    case 'splash':
      return <SplashScreen onFinish={handleSplashFinish} />;
    case 'onboarding':
      return <OnboardingScreen onFinish={handleOnboardingFinish} />;
    case 'auth':
      return <AuthScreen onLogin={handleAuthSuccess} />;
    case 'main':
      return <MainScreen onLogout={handleLogout} onFindServices={handleFindServices} onOfferSkills={handleOfferSkills} />;
    case 'services':
      return (
        <ServiceDiscoveryScreen
          onCategoryPress={handleCategoryPress}
          onSeeAllPress={handleSeeAllPress}
          onSearchPress={handleSearchPress}
          onBackPress={handleBackToMain}
        />
      );
    case 'offer-skills':
      return (
        <OfferSkillsScreen
          onBackPress={handleBackToMain}
          onServicePress={handleServicePress}
        />
      );
    case 'service-detail':
      return (
        <ServiceDetailScreen
          service={selectedService}
          onBackPress={handleBackToOfferSkills}
          onEditPress={handleEditService}
          onDeletePress={handleDeleteService}
        />
      );
    default:
      return <SplashScreen onFinish={handleSplashFinish} />;
  }
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}