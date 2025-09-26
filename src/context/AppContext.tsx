import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppContextType {
  isFirstLaunch: boolean;
  setIsFirstLaunch: (value: boolean) => void;
  currentScreen: 'splash' | 'onboarding' | 'auth' | 'main' | 'services' | 'service-listing' | 'all-categories' | 'offer-skills' | 'service-detail' | 'bookings' | 'messages' | 'profile';
  setCurrentScreen: (screen: 'splash' | 'onboarding' | 'auth' | 'main' | 'services' | 'service-listing' | 'all-categories' | 'offer-skills' | 'service-detail' | 'bookings' | 'messages' | 'profile') => void;
  user: any | null;
  setUser: (user: any | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean>(true);
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'onboarding' | 'auth' | 'main' | 'services' | 'service-listing' | 'all-categories' | 'offer-skills' | 'service-detail' | 'bookings' | 'messages' | 'profile'>('splash');
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  const checkFirstLaunch = async () => {
    try {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      if (hasLaunched === null) {
        setIsFirstLaunch(true);
        await AsyncStorage.setItem('hasLaunched', 'true');
      } else {
        setIsFirstLaunch(false);
      }
    } catch (error) {
      console.error('Error checking first launch:', error);
    }
  };

  const value: AppContextType = {
    isFirstLaunch,
    setIsFirstLaunch,
    currentScreen,
    setCurrentScreen,
    user,
    setUser,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
