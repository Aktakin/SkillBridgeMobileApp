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

interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  serviceCount: number;
}

const allCategories: ServiceCategory[] = [
  {
    id: '1',
    name: 'Cleaning Services',
    icon: '',
    color: '#4A90E2',
    description: 'Professional cleaning for homes and offices',
    serviceCount: 24,
  },
  {
    id: '2',
    name: 'Laundry Services',
    icon: '',
    color: '#4A90E2',
    description: 'Wash, dry, and fold laundry services',
    serviceCount: 12,
  },
  {
    id: '3',
    name: 'Plumbing Services',
    icon: '',
    color: '#4A90E2',
    description: 'Repairs, installations, and maintenance',
    serviceCount: 18,
  },
  {
    id: '4',
    name: 'Electrical Services',
    icon: '',
    color: '#4A90E2',
    description: 'Electrical repairs and installations',
    serviceCount: 15,
  },
  {
    id: '5',
    name: 'Carpentry Services',
    icon: '',
    color: '#4A90E2',
    description: 'Custom woodwork and furniture repair',
    serviceCount: 8,
  },
  {
    id: '6',
    name: 'Delivery Services',
    icon: '',
    color: '#4A90E2',
    description: 'Package and food delivery',
    serviceCount: 32,
  },
  {
    id: '7',
    name: 'Painting Services',
    icon: '',
    color: '#4A90E2',
    description: 'Interior and exterior painting',
    serviceCount: 14,
  },
  {
    id: '8',
    name: 'Gardening Services',
    icon: '',
    color: '#4A90E2',
    description: 'Landscaping and garden maintenance',
    serviceCount: 9,
  },
  {
    id: '9',
    name: 'Cooking Services',
    icon: '',
    color: '#4A90E2',
    description: 'Personal chef and catering',
    serviceCount: 16,
  },
  {
    id: '10',
    name: 'Tutoring Services',
    icon: '',
    color: '#4A90E2',
    description: 'Academic and skill tutoring',
    serviceCount: 21,
  },
  {
    id: '11',
    name: 'Photography Services',
    icon: '',
    color: '#4A90E2',
    description: 'Professional photography and videography',
    serviceCount: 13,
  },
  {
    id: '12',
    name: 'Pet Care Services',
    icon: '',
    color: '#4A90E2',
    description: 'Pet walking, grooming, and sitting',
    serviceCount: 7,
  },
  {
    id: '13',
    name: 'Beauty Services',
    icon: '',
    color: '#4A90E2',
    description: 'Hair, makeup, and beauty treatments',
    serviceCount: 19,
  },
  {
    id: '14',
    name: 'Fitness Services',
    icon: '',
    color: '#4A90E2',
    description: 'Personal training and fitness coaching',
    serviceCount: 11,
  },
  {
    id: '15',
    name: 'IT Services',
    icon: '',
    color: '#4A90E2',
    description: 'Computer repair and tech support',
    serviceCount: 6,
  },
  {
    id: '16',
    name: 'Moving Services',
    icon: '',
    color: '#4A90E2',
    description: 'Moving and relocation assistance',
    serviceCount: 10,
  },
];

interface AllCategoriesScreenProps {
  onBackPress: () => void;
  onCategoryPress: (category: ServiceCategory) => void;
  onBookingsPress: () => void;
  onMessagesPress: () => void;
  onProfilePress: () => void;
}

const AllCategoriesScreen: React.FC<AllCategoriesScreenProps> = ({
  onBackPress,
  onCategoryPress,
  onBookingsPress,
  onMessagesPress,
  onProfilePress,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = allCategories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCategoryCard = (category: ServiceCategory) => (
    <TouchableOpacity
      key={category.id}
      style={styles.categoryCard}
      onPress={() => onCategoryPress(category)}
    >
      <View style={styles.categoryHeader}>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryName}>{category.name}</Text>
          <Text style={styles.categoryDescription}>{category.description}</Text>
        </View>
        <View style={styles.serviceCountContainer}>
          <Text style={styles.serviceCount}>{category.serviceCount}</Text>
          <Text style={styles.serviceCountLabel}>services</Text>
        </View>
      </View>
      
      <View style={styles.categoryFooter}>
        <View style={styles.categoryStats}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>4.8</Text>
          <Text style={styles.reviewsText}>(120+ reviews)</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.7)" />
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
        <Text style={styles.headerTitle}>All Categories</Text>
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
            placeholder="Search categories..."
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="rgba(255, 255, 255, 0.7)" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{allCategories.length}</Text>
          <Text style={styles.statLabel}>Categories</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {allCategories.reduce((sum, cat) => sum + cat.serviceCount, 0)}
          </Text>
          <Text style={styles.statLabel}>Total Services</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>4.8</Text>
          <Text style={styles.statLabel}>Avg Rating</Text>
        </View>
      </View>

      {/* Categories List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredCategories.length > 0 ? (
          filteredCategories.map(renderCategoryCard)
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={64} color="rgba(255, 255, 255, 0.5)" />
            <Text style={styles.emptyTitle}>No Categories Found</Text>
            <Text style={styles.emptyDescription}>
              Try adjusting your search criteria
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  categoryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  categoryInfo: {
    flex: 1,
    marginRight: 15,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  categoryDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
  },
  serviceCountContainer: {
    alignItems: 'center',
  },
  serviceCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  serviceCountLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  categoryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryStats: {
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
});

export default AllCategoriesScreen;
