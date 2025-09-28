import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  status: 'active' | 'inactive' | 'pending';
  views: number;
  bookings: number;
  rating: number;
  reviews: number;
  createdAt: string;
}

interface MyServicesScreenProps {
  onBackPress: () => void;
  onServicePress: (service: Service) => void;
  onAddService: () => void;
}

const MyServicesScreen: React.FC<MyServicesScreenProps> = ({ onBackPress, onServicePress, onAddService }) => {
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      title: 'Professional House Cleaning',
      description: 'Thorough cleaning of all rooms, kitchen, and bathrooms. Eco-friendly products used.',
      price: '$50/hr',
      category: 'Cleaning',
      status: 'active',
      views: 124,
      bookings: 8,
      rating: 4.8,
      reviews: 12,
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      title: 'Deep Carpet Cleaning',
      description: 'Professional carpet cleaning with steam extraction method.',
      price: '$75/job',
      category: 'Cleaning',
      status: 'active',
      views: 89,
      bookings: 5,
      rating: 4.6,
      reviews: 8,
      createdAt: '2024-01-20',
    },
    {
      id: '3',
      title: 'Plumbing Repair Service',
      description: 'Fix leaks, unclog drains, and general plumbing maintenance.',
      price: '$40/hr',
      category: 'Plumbing',
      status: 'pending',
      views: 45,
      bookings: 0,
      rating: 0,
      reviews: 0,
      createdAt: '2024-02-01',
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');

  const filteredServices = services.filter(service => {
    if (filter === 'all') return true;
    return service.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#4CAF50';
      case 'inactive': return '#FF9800';
      case 'pending': return '#2196F3';
      default: return '#9E9E9E';
    }
  };

  const toggleServiceStatus = (serviceId: string) => {
    setServices(services.map(service => 
      service.id === serviceId 
        ? { ...service, status: service.status === 'active' ? 'inactive' : 'active' }
        : service
    ));
  };

  const deleteService = (serviceId: string) => {
    Alert.alert(
      'Delete Service',
      'Are you sure you want to delete this service? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setServices(services.filter(service => service.id !== serviceId));
            Alert.alert('Success', 'Service deleted successfully!');
          },
        },
      ]
    );
  };

  const renderServiceCard = (service: Service) => (
    <TouchableOpacity
      key={service.id}
      style={styles.serviceCard}
      onPress={() => onServicePress(service)}
    >
      <View style={styles.serviceHeader}>
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceTitle}>{service.title}</Text>
          <View style={styles.serviceMeta}>
            <Text style={styles.servicePrice}>
              ${service.currentPrice || service.price}
            </Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(service.status) }]}>
              <Text style={styles.statusText}>{service.status.toUpperCase()}</Text>
            </View>
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
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => {
            Alert.alert(
              'Service Options',
              'What would you like to do?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Edit Service', onPress: () => onServicePress(service) },
                { 
                  text: service.status === 'active' ? 'Deactivate' : 'Activate', 
                  onPress: () => toggleServiceStatus(service.id) 
                },
                { text: 'Delete', style: 'destructive', onPress: () => deleteService(service.id) },
              ]
            );
          }}
        >
          <Ionicons name="ellipsis-vertical" size={20} color="rgba(255, 255, 255, 0.7)" />
        </TouchableOpacity>
      </View>

      <Text style={styles.serviceDescription} numberOfLines={2}>
        {service.description}
      </Text>

      <View style={styles.serviceStats}>
        <View style={styles.statItem}>
          <Ionicons name="eye-outline" size={16} color="rgba(255, 255, 255, 0.7)" />
          <Text style={styles.statText}>{service.views}</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="calendar-outline" size={16} color="rgba(255, 255, 255, 0.7)" />
          <Text style={styles.statText}>{service.bookings}</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="star-outline" size={16} color="rgba(255, 255, 255, 0.7)" />
          <Text style={styles.statText}>{service.rating > 0 ? service.rating.toFixed(1) : 'N/A'}</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="chatbubble-outline" size={16} color="rgba(255, 255, 255, 0.7)" />
          <Text style={styles.statText}>{service.reviews}</Text>
        </View>
      </View>

      <View style={styles.serviceFooter}>
        <Text style={styles.categoryText}>{service.category}</Text>
        <Text style={styles.createdText}>Created: {service.createdAt}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderFilterButton = (filterType: typeof filter, label: string, count: number) => (
    <TouchableOpacity
      style={[styles.filterButton, filter === filterType && styles.activeFilterButton]}
      onPress={() => setFilter(filterType)}
    >
      <Text style={[styles.filterText, filter === filterType && styles.activeFilterText]}>
        {label} ({count})
      </Text>
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
        <Text style={styles.headerTitle}>My Services</Text>
        <TouchableOpacity style={styles.addButton} onPress={onAddService}>
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Stats Summary */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{services.length}</Text>
          <Text style={styles.statLabel}>Total Services</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{services.filter(s => s.status === 'active').length}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{services.reduce((sum, s) => sum + s.bookings, 0)}</Text>
          <Text style={styles.statLabel}>Total Bookings</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {services.reduce((sum, s) => sum + s.views, 0)}
          </Text>
          <Text style={styles.statLabel}>Total Views</Text>
        </View>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {renderFilterButton('all', 'All', services.length)}
        {renderFilterButton('active', 'Active', services.filter(s => s.status === 'active').length)}
        {renderFilterButton('pending', 'Pending', services.filter(s => s.status === 'pending').length)}
        {renderFilterButton('inactive', 'Inactive', services.filter(s => s.status === 'inactive').length)}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredServices.length > 0 ? (
          filteredServices.map(renderServiceCard)
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="briefcase-outline" size={64} color="rgba(255, 255, 255, 0.5)" />
            <Text style={styles.emptyTitle}>No Services Found</Text>
            <Text style={styles.emptyDescription}>
              {filter === 'all' 
                ? "You haven't created any services yet."
                : `No ${filter} services found.`
              }
            </Text>
            {filter === 'all' && (
              <TouchableOpacity style={styles.createButton} onPress={onAddService}>
                <Ionicons name="add" size={20} color="#FFFFFF" />
                <Text style={styles.createButtonText}>Create Your First Service</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
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
  addButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
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
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  filterButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  activeFilterButton: {
    backgroundColor: '#FFFFFF',
  },
  filterText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#667eea',
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
    marginRight: 10,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  serviceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statusBadge: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  moreButton: {
    padding: 5,
  },
  serviceDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
    marginBottom: 15,
  },
  serviceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 12,
    color: '#667eea',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  createdText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
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
    marginBottom: 20,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
  },
  createButtonText: {
    fontSize: 16,
    color: '#667eea',
    fontWeight: '600',
    marginLeft: 8,
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

export default MyServicesScreen;
