import React from 'react';
import { Alert } from 'react-native';
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
import EditProfileScreen from './src/screens/EditProfileScreen';
import MyServicesScreen from './src/screens/MyServicesScreen';
import PaymentMethodsScreen from './src/screens/PaymentMethodsScreen';
import HelpSupportScreen from './src/screens/HelpSupportScreen';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicyScreen';
import TermsOfServiceScreen from './src/screens/TermsOfServiceScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const AppContent: React.FC = () => {
  const { currentScreen, setCurrentScreen, isFirstLaunch, navigationHistory, setNavigationHistory } = useApp();
  const [selectedService, setSelectedService] = React.useState<any>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<any>(null);
  const [isOwnService, setIsOwnService] = React.useState<boolean>(false);

  // Navigation helper functions
  const navigateToScreen = (screen: any) => {
    setNavigationHistory([...navigationHistory, currentScreen]);
    setCurrentScreen(screen);
  };

  const navigateBack = () => {
    if (navigationHistory.length > 0) {
      const previousScreen = navigationHistory[navigationHistory.length - 1];
      setNavigationHistory(navigationHistory.slice(0, -1));
      setCurrentScreen(previousScreen);
    }
  };

  const handleSplashFinish = () => {
    if (isFirstLaunch) {
      navigateToScreen('onboarding');
    } else {
      navigateToScreen('auth');
    }
  };

  const handleOnboardingFinish = () => {
    navigateToScreen('auth');
  };

  const handleAuthSuccess = () => {
    navigateToScreen('main');
  };

  const handleLogout = () => {
    navigateToScreen('auth');
  };

  const handleFindServices = () => {
    navigateToScreen('services');
  };

  const handleBackToMain = () => {
    navigateToScreen('main');
  };

  const handleCategoryPress = (category: any) => {
    setSelectedCategory(category);
    navigateToScreen('service-listing');
  };

  const handleBackToServices = () => {
    navigateToScreen('services');
  };

  const handleServicePress = (service: any, isOwn: boolean = false) => {
    setSelectedService(service);
    setIsOwnService(isOwn);
    navigateToScreen('service-detail');
  };

  const handleSeeAllPress = () => {
    navigateToScreen('all-categories');
  };

  const handleSearchPress = () => {
    console.log('Search pressed');
    // Handle search
  };

  const handleOfferSkills = () => {
    navigateToScreen('offer-skills');
  };

  const handleBackToOfferSkills = () => {
    navigateToScreen('offer-skills');
  };

  const handleEditService = (service: any) => {
    console.log('Edit service:', service);
    // Handle service editing
  };

  const handleDeleteService = (serviceId: string) => {
    console.log('Delete service:', serviceId);
    // Handle service deletion
    navigateToScreen('offer-skills');
  };

  const handleContactService = (service: any) => {
    console.log('Contact service provider:', service);
    // Navigate to messages screen or create new conversation
    navigateToScreen('messages');
  };

  const handleBookService = (service: any) => {
    console.log('Book service:', service);
    // Create booking request and navigate to bookings
    Alert.alert('Booking Request Sent', `Your request for "${service.title}" has been sent to the provider.`);
    navigateToScreen('bookings');
  };

  const handleBookingsPress = () => {
    navigateToScreen('bookings');
  };

  const handleMessagesPress = () => {
    navigateToScreen('messages');
  };

  const handleProfilePress = () => {
    navigateToScreen('profile');
  };

  const handleBookingPress = (booking: any) => {
    console.log('Booking pressed:', booking);
    // Handle booking details
  };

  const handleMessagePress = (message: any) => {
    console.log('Message pressed:', message);
    // Handle message details
  };

  const handleEditProfile = () => {
    navigateToScreen('edit-profile');
  };

  const handleMyServices = () => {
    navigateToScreen('my-services');
  };

  const handlePaymentMethods = () => {
    navigateToScreen('payment-methods');
  };

  const handleSaveProfile = (profileData: any) => {
    console.log('Profile saved:', profileData);
    // Handle profile saving
  };

  const handleAddService = () => {
    navigateToScreen('offer-skills');
  };

  const handleAddPaymentMethod = () => {
    console.log('Add payment method');
    // Handle adding payment method
  };

  const handleHelpSupport = () => {
    navigateToScreen('help-support');
  };

  const handlePrivacyPolicy = () => {
    navigateToScreen('privacy-policy');
  };

  const handleTermsOfService = () => {
    navigateToScreen('terms-of-service');
  };

  const handleSettings = () => {
    navigateToScreen('settings');
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
          onBackPress={navigateBack}
          onBackToHome={handleBackToMain}
          onBookingsPress={handleBookingsPress}
          onMessagesPress={handleMessagesPress}
          onProfilePress={handleProfilePress}
        />
      );
    case 'service-listing':
      return (
        <ServiceListingScreen
          category={selectedCategory}
          onBackPress={navigateBack}
          onServicePress={(service) => handleServicePress(service, false)}
          onBookingsPress={handleBookingsPress}
          onMessagesPress={handleMessagesPress}
          onProfilePress={handleProfilePress}
        />
      );
    case 'all-categories':
      return (
        <AllCategoriesScreen
          onBackPress={navigateBack}
          onCategoryPress={handleCategoryPress}
          onBookingsPress={handleBookingsPress}
          onMessagesPress={handleMessagesPress}
          onProfilePress={handleProfilePress}
        />
      );
    case 'offer-skills':
      return (
        <OfferSkillsScreen
          onBackPress={navigateBack}
          onServicePress={(service) => handleServicePress(service, true)}
          onExploreSkills={handleFindServices}
        />
      );
    case 'service-detail':
      return (
        <ServiceDetailScreen
          service={selectedService}
          isOwnService={isOwnService}
          onBackPress={navigateBack}
          onEditPress={handleEditService}
          onDeletePress={handleDeleteService}
          onContactPress={handleContactService}
          onBookNowPress={handleBookService}
        />
      );
    case 'bookings':
      return (
        <BookingsScreen
          onBackPress={navigateBack}
          onBookingPress={handleBookingPress}
          onHomePress={handleFindServices}
          onMessagesPress={handleMessagesPress}
          onProfilePress={handleProfilePress}
        />
      );
    case 'messages':
      return (
        <MessagesScreen
          onBackPress={navigateBack}
          onMessagePress={handleMessagePress}
          onHomePress={handleFindServices}
          onBookingsPress={handleBookingsPress}
          onProfilePress={handleProfilePress}
        />
      );
    case 'profile':
      return (
        <ProfileScreen
          onBackPress={navigateBack}
          onLogout={handleLogout}
          onHomePress={handleFindServices}
          onBookingsPress={handleBookingsPress}
          onMessagesPress={handleMessagesPress}
          onEditProfile={handleEditProfile}
          onMyServices={handleMyServices}
          onPaymentMethods={handlePaymentMethods}
          onHelpSupport={handleHelpSupport}
          onPrivacyPolicy={handlePrivacyPolicy}
          onTermsOfService={handleTermsOfService}
          onSettings={handleSettings}
        />
      );
    case 'edit-profile':
      return (
        <EditProfileScreen
          onBackPress={navigateBack}
          onSavePress={handleSaveProfile}
        />
      );
    case 'my-services':
      return (
        <MyServicesScreen
          onBackPress={navigateBack}
          onServicePress={(service) => handleServicePress(service, true)}
          onAddService={handleAddService}
        />
      );
    case 'payment-methods':
      return (
        <PaymentMethodsScreen
          onBackPress={navigateBack}
          onAddMethod={handleAddPaymentMethod}
        />
      );
    case 'help-support':
      return (
        <HelpSupportScreen
          onBackPress={navigateBack}
        />
      );
    case 'privacy-policy':
      return (
        <PrivacyPolicyScreen
          onBackPress={navigateBack}
        />
      );
    case 'terms-of-service':
      return (
        <TermsOfServiceScreen
          onBackPress={navigateBack}
        />
      );
    case 'settings':
      return (
        <SettingsScreen
          onBackPress={navigateBack}
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