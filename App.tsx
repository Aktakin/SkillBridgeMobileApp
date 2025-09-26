import React from 'react';
import { AppProvider, useApp } from './src/context/AppContext';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import AuthScreen from './src/screens/AuthScreen';
import MainScreen from './src/screens/MainScreen';
import ServiceDiscoveryScreen from './src/screens/ServiceDiscoveryScreen';
import ServiceListingScreen from './src/screens/ServiceListingScreen';
import AllCategoriesScreen from './src/screens/AllCategoriesScreen';
import OfferSkillsScreen from './src/screens/OfferSkillsScreen';
import ServiceDetailScreen from './src/screens/ServiceDetailScreen';
import BookingsScreen from './src/screens/BookingsScreen';
import MessagesScreen from './src/screens/MessagesScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const AppContent: React.FC = () => {
  const { currentScreen, setCurrentScreen, isFirstLaunch } = useApp();
  const [selectedService, setSelectedService] = React.useState<any>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<any>(null);

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
    setSelectedCategory(category);
    setCurrentScreen('service-listing');
  };

  const handleBackToServices = () => {
    setCurrentScreen('services');
  };

  const handleServicePress = (service: any) => {
    console.log('Service pressed:', service);
    // Handle service selection
  };

  const handleSeeAllPress = () => {
    setCurrentScreen('all-categories');
  };

  const handleSearchPress = () => {
    console.log('Search pressed');
    // Handle search
  };

  const handleOfferSkills = () => {
    setCurrentScreen('offer-skills');
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

  const handleBookingsPress = () => {
    setCurrentScreen('bookings');
  };

  const handleMessagesPress = () => {
    setCurrentScreen('messages');
  };

  const handleProfilePress = () => {
    setCurrentScreen('profile');
  };

  const handleBookingPress = (booking: any) => {
    console.log('Booking pressed:', booking);
    // Handle booking details
  };

  const handleMessagePress = (message: any) => {
    console.log('Message pressed:', message);
    // Handle message details
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
          onBookingsPress={handleBookingsPress}
          onMessagesPress={handleMessagesPress}
          onProfilePress={handleProfilePress}
        />
      );
    case 'service-listing':
      return (
        <ServiceListingScreen
          category={selectedCategory}
          onBackPress={handleBackToServices}
          onServicePress={handleServicePress}
          onBookingsPress={handleBookingsPress}
          onMessagesPress={handleMessagesPress}
          onProfilePress={handleProfilePress}
        />
      );
    case 'all-categories':
      return (
        <AllCategoriesScreen
          onBackPress={handleBackToServices}
          onCategoryPress={handleCategoryPress}
          onBookingsPress={handleBookingsPress}
          onMessagesPress={handleMessagesPress}
          onProfilePress={handleProfilePress}
        />
      );
    case 'offer-skills':
      return (
        <OfferSkillsScreen
          onBackPress={handleBackToMain}
          onServicePress={handleServicePress}
          onExploreSkills={handleFindServices}
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
    case 'bookings':
      return (
        <BookingsScreen
          onBackPress={handleBackToServices}
          onBookingPress={handleBookingPress}
          onHomePress={handleFindServices}
          onMessagesPress={handleMessagesPress}
          onProfilePress={handleProfilePress}
        />
      );
    case 'messages':
      return (
        <MessagesScreen
          onBackPress={handleBackToServices}
          onMessagePress={handleMessagePress}
          onHomePress={handleFindServices}
          onBookingsPress={handleBookingsPress}
          onProfilePress={handleProfilePress}
        />
      );
    case 'profile':
      return (
        <ProfileScreen
          onBackPress={handleBackToServices}
          onLogout={handleLogout}
          onHomePress={handleFindServices}
          onBookingsPress={handleBookingsPress}
          onMessagesPress={handleMessagesPress}
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