export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: 'provider' | 'seeker';
  profileImage?: string;
  location?: string;
  rating?: number;
  joinedDate: Date;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  provider: User;
  images: string[];
  location: string;
  rating: number;
  reviews: Review[];
  availability: string[];
  createdAt: Date;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Booking {
  id: string;
  serviceId: string;
  seekerId: string;
  providerId: string;
  date: Date;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
  notes?: string;
}

export interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  image: string;
}
