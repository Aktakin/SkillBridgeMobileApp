import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface Service {
  id: string;
  title: string;
  provider: string;
  rating: number;
  reviews: number;
  price: string;
  location: string;
  description: string;
  image?: string;
}

interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const mockServices: Service[] = [
  {
    id: '1',
    title: 'Professional House Cleaning',
    provider: 'Sarah Johnson',
    rating: 4.8,
    reviews: 24,
    price: '$50/hr',
    location: 'Lagos, Nigeria',
    description: 'Thorough cleaning of all rooms, kitchen, and bathrooms. Eco-friendly products used.',
  },
  {
    id: '2',
    title: 'Deep Carpet Cleaning',
    provider: 'Mike Wilson',
    rating: 4.6,
    reviews: 18,
    price: '$75/job',
    location: 'Lagos, Nigeria',
    description: 'Professional carpet cleaning with steam extraction. Removes tough stains and odors.',
  },
  {
    id: '3',
    title: 'Office Cleaning Service',
    provider: 'Emma Davis',
    rating: 4.9,
    reviews: 32,
    price: '$40/hr',
    location: 'Lagos, Nigeria',
    description: 'Regular office cleaning including desks, floors, and restrooms. Flexible scheduling.',
  },
  {
    id: '4',
    title: 'Window Cleaning',
    provider: 'David Brown',
    rating: 4.7,
    reviews: 15,
    price: '$30/hr',
    location: 'Lagos, Nigeria',
    description: 'Interior and exterior window cleaning. Streak-free results guaranteed.',
  },
];

interface ServiceListingScreenProps {
  category: ServiceCategory;
  onBackPress: () => void;
  onServicePress: (service: Service) => void;
  onBookingsPress: () => void;
  onMessagesPress: () => void;
  onProfilePress: () => void;
}

const ServiceListingScreen: React.FC<ServiceListingScreenProps> = ({
  category,
  onBackPress,
  onServicePress,
  onBookingsPress,
  onMessagesPress,
  onProfilePress,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'reviews'>('rating');

  const filteredServices = mockServices.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price':
        return parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, ''));
      case 'reviews':
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });

  const renderServiceCard = (service: Service) => (
    <TouchableOpacity
      key={service.id}
      style={styles.serviceCard}
      onPress={() => onServicePress(service)}
    >
      <View style={styles.serviceHeader}>
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceTitle}>{service.title}</Text>
          <Text style={styles.serviceProvider}>by {service.provider}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.servicePrice}>
            ${service.currentPrice || service.price}
          </Text>
          {service.bargainingStatus && service.bargainingStatus !== 'none' && (
            <View style={styles.bargainingBadge}>
              <Text style={styles.bargainingText}>
                {service.bargainingStatus === 'pending' ? 'Bargaining Pending' :
                 service.bargainingStatus === 'in_progress' ? 'Negotiating' :
                 service.bargainingStatus === 'accepted' ? 'Price Agreed' :
                 'Bargaining Rejected'}
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.serviceDetails}>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{service.rating}</Text>
          <Text style={styles.reviewsText}>({service.reviews} reviews)</Text>
        </View>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color="rgba(255, 255, 255, 0.7)" />
          <Text style={styles.locationText}>{service.location}</Text>
        </View>
      </View>

      <Text style={styles.serviceDescription} numberOfLines={2}>
        {service.description}
      </Text>

      <View style={styles.serviceActions}>
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category.name}</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="rgba(255, 255, 255, 0.7)" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search services..."
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <View style={styles.sortButtons}>
          <TouchableOpacity
            style={[styles.sortButton, sortBy === 'rating' && styles.activeSortButton]}
            onPress={() => setSortBy('rating')}
          >
            <Text style={[styles.sortButtonText, sortBy === 'rating' && styles.activeSortButtonText]}>
              Rating
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sortButton, sortBy === 'price' && styles.activeSortButton]}
            onPress={() => setSortBy('price')}
          >
            <Text style={[styles.sortButtonText, sortBy === 'price' && styles.activeSortButtonText]}>
              Price
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sortButton, sortBy === 'reviews' && styles.activeSortButton]}
            onPress={() => setSortBy('reviews')}
          >
            <Text style={[styles.sortButtonText, sortBy === 'reviews' && styles.activeSortButtonText]}>
              Reviews
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Services List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {sortedServices.length > 0 ? (
          sortedServices.map(renderServiceCard)
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={64} color="rgba(255, 255, 255, 0.5)" />
            <Text style={styles.emptyTitle}>No Services Found</Text>
            <Text style={styles.emptyDescription}>
              Try adjusting your search or filter criteria
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={onBackPress}>
          <Ionicons name="home" size={24} color="rgba(255, 255, 255, 0.7)" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={onBookingsPress}>
          <Ionicons name="calendar-outline" size={24} color="rgba(255, 255, 255, 0.7)" />
          <Text style={styles.navText}>Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={onMessagesPress}>
          <Ionicons name="mail-outline" size={24} color="rgba(255, 255, 255, 0.7)" />
          <Text style={styles.navText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={onProfilePress}>
          <Ionicons name="person-outline" size={24} color="rgba(255, 255, 255, 0.7)" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  filterButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sortLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    marginRight: 15,
  },
  sortButtons: {
    flexDirection: 'row',
    flex: 1,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  activeSortButton: {
    backgroundColor: '#FFFFFF',
  },
  sortButtonText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  activeSortButtonText: {
    color: '#667eea',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  serviceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  serviceProvider: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  servicePrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  serviceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
    marginBottom: 15,
  },
  serviceActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  contactButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  bookButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginLeft: 10,
  },
  bookButtonText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
  },
  bargainingBadge: {
    backgroundColor: 'rgba(156, 39, 176, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  bargainingText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default ServiceListingScreen;
