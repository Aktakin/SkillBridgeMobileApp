import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Service, BargainingOffer } from '../types';

type ScreenType = 'splash' | 'onboarding' | 'auth' | 'main' | 'services' | 'service-listing' | 'all-categories' | 'offer-skills' | 'service-detail' | 'bookings' | 'messages' | 'profile' | 'edit-profile' | 'my-services' | 'payment-methods' | 'help-support' | 'privacy-policy' | 'terms-of-service' | 'settings';

interface AppContextType {
  isFirstLaunch: boolean;
  setIsFirstLaunch: (value: boolean) => void;
  currentScreen: ScreenType;
  setCurrentScreen: (screen: ScreenType) => void;
  navigationHistory: ScreenType[];
  setNavigationHistory: (history: ScreenType[]) => void;
  user: any | null;
  setUser: (user: any | null) => void;
  // Bargaining state
  services: Service[];
  setServices: (services: Service[]) => void;
  sendBargainOffer: (serviceId: string, offer: Omit<BargainingOffer, 'id' | 'timestamp'>) => void;
  acceptBargainOffer: (serviceId: string, offerId: string) => void;
  rejectBargainOffer: (serviceId: string, offerId: string) => void;
  startBargaining: (serviceId: string, employerId: string, initialPrice: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean>(true);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');
  const [navigationHistory, setNavigationHistory] = useState<ScreenType[]>(['splash']);
  const [user, setUser] = useState<any | null>(null);
  const [services, setServices] = useState<Service[]>([]);

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

  // Bargaining functions
  const sendBargainOffer = (serviceId: string, offer: Omit<BargainingOffer, 'id' | 'timestamp'>) => {
    const newOffer: BargainingOffer = {
      ...offer,
      id: Date.now().toString(),
      timestamp: new Date(),
    };

    setServices(prevServices => 
      prevServices.map(service => 
        service.id === serviceId 
          ? {
              ...service,
              bargainingHistory: [...(service.bargainingHistory || []), newOffer],
              currentPrice: offer.price,
              bargainingStatus: 'in_progress' as const,
            }
          : service
      )
    );
  };

  const acceptBargainOffer = (serviceId: string, offerId: string) => {
    setServices(prevServices => 
      prevServices.map(service => 
        service.id === serviceId 
          ? {
              ...service,
              bargainingHistory: service.bargainingHistory?.map(offer => 
                offer.id === offerId 
                  ? { ...offer, status: 'accepted' as const }
                  : offer
              ),
              bargainingStatus: 'accepted' as const,
            }
          : service
      )
    );
  };

  const rejectBargainOffer = (serviceId: string, offerId: string) => {
    setServices(prevServices => 
      prevServices.map(service => 
        service.id === serviceId 
          ? {
              ...service,
              bargainingHistory: service.bargainingHistory?.map(offer => 
                offer.id === offerId 
                  ? { ...offer, status: 'rejected' as const }
                  : offer
              ),
            }
          : service
      )
    );
  };

  const startBargaining = (serviceId: string, employerId: string, initialPrice: number) => {
    setServices(prevServices => 
      prevServices.map(service => 
        service.id === serviceId 
          ? {
              ...service,
              initialPrice: service.price,
              currentPrice: initialPrice,
              bargainingStatus: 'pending' as const,
              employerId: employerId,
              bargainingHistory: [],
            }
          : service
      )
    );
  };

  const value: AppContextType = {
    isFirstLaunch,
    setIsFirstLaunch,
    currentScreen,
    setCurrentScreen,
    navigationHistory,
    setNavigationHistory,
    user,
    setUser,
    services,
    setServices,
    sendBargainOffer,
    acceptBargainOffer,
    rejectBargainOffer,
    startBargaining,
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
