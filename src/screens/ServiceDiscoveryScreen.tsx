import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const serviceCategories: ServiceCategory[] = [
  {
    id: '1',
    name: 'Cleaning Services',
    icon: '',
    color: '#4A90E2',
  },
  {
    id: '2',
    name: 'Laundry Services',
    icon: '',
    color: '#4A90E2',
  },
  {
    id: '3',
    name: 'Plumbing Services',
    icon: '',
    color: '#4A90E2',
  },
  {
    id: '4',
    name: 'Electrical Services',
    icon: '',
    color: '#4A90E2',
  },
  {
    id: '5',
    name: 'Carpentry Services',
    icon: '',
    color: '#4A90E2',
  },
  {
    id: '6',
    name: 'Delivery Services',
    icon: '',
    color: '#4A90E2',
  },
];

interface ServiceDiscoveryScreenProps {
  onCategoryPress: (category: ServiceCategory) => void;
  onSeeAllPress: () => void;
  onSearchPress: () => void;
  onBackPress: () => void;
  onBookingsPress: () => void;
  onMessagesPress: () => void;
  onProfilePress: () => void;
}

const ServiceDiscoveryScreen: React.FC<ServiceDiscoveryScreenProps> = ({
  onCategoryPress,
  onSeeAllPress,
  onSearchPress,
  onBackPress,
  onBookingsPress,
  onMessagesPress,
  onProfilePress,
}) => {
  const renderCategoryCard = (category: ServiceCategory) => (
    <TouchableOpacity
      key={category.id}
      style={styles.categoryCard}
      onPress={() => onCategoryPress(category)}
    >
      <Text style={styles.categoryName}>{category.name}</Text>
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
        <TouchableOpacity style={styles.menuButton} onPress={onBackPress}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Location */}
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>Lagos, Nigeria</Text>
        <TouchableOpacity>
          <Text style={styles.changeLocationText}>Change location</Text>
        </TouchableOpacity>
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <Text style={styles.searchTitle}>What service are you providing today?</Text>
        <TouchableOpacity style={styles.searchContainer} onPress={onSearchPress}>
          <Ionicons name="search" size={20} color="rgba(255, 255, 255, 0.7)" style={styles.searchIcon} />
          <Text style={styles.searchPlaceholder}>Search skills, services...</Text>
        </TouchableOpacity>
      </View>

      {/* Popular Categories */}
      <View style={styles.categoriesSection}>
        <View style={styles.categoriesHeader}>
          <Text style={styles.categoriesTitle}>Popular Category</Text>
          <TouchableOpacity onPress={onSeeAllPress}>
            <Text style={styles.seeAllButton}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.categoriesGrid}>
          {serviceCategories.map(renderCategoryCard)}
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#FFFFFF" />
          <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
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
  menuButton: {
    padding: 8,
  },
  notificationButton: {
    padding: 8,
  },
  locationContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  locationText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  changeLocationText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  searchTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  searchContainer: {
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
  searchPlaceholder: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    flex: 1,
  },
  categoriesSection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  seeAllButton: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  categoryIconContainer: {
    marginBottom: 10,
  },
  categoryIcon: {
    fontSize: 32,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
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
  activeNavText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default ServiceDiscoveryScreen;