import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import BargainModal from '../components/BargainModal';
import { Service, BargainingOffer } from '../types';

interface ServiceDetailScreenProps {
  service: Service;
  isOwnService?: boolean;
  currentUserId?: string;
  currentUserType?: 'provider' | 'seeker';
  onBackPress: () => void;
  onEditPress: (service: Service) => void;
  onDeletePress: (serviceId: string) => void;
  onContactPress: (service: Service) => void;
  onBookNowPress: (service: Service) => void;
  onBargainPress?: (service: Service) => void;
  onSendBargainOffer?: (serviceId: string, offer: Omit<BargainingOffer, 'id' | 'timestamp'>) => void;
  onAcceptBargainOffer?: (serviceId: string, offerId: string) => void;
  onRejectBargainOffer?: (serviceId: string, offerId: string) => void;
}

const ServiceDetailScreen: React.FC<ServiceDetailScreenProps> = ({
  service,
  isOwnService = false,
  currentUserId,
  currentUserType = 'seeker',
  onBackPress,
  onEditPress,
  onDeletePress,
  onContactPress,
  onBookNowPress,
  onBargainPress,
  onSendBargainOffer,
  onAcceptBargainOffer,
  onRejectBargainOffer,
}) => {
  const [showBargainModal, setShowBargainModal] = useState(false);
  const handleEdit = () => {
    onEditPress(service);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Service',
      'Are you sure you want to delete this service?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => onDeletePress(service.id)
        },
      ]
    );
  };

  const handleShare = () => {
    Alert.alert('Share Service', 'Service sharing functionality would be implemented here');
  };

  const handleContact = () => {
    Alert.alert(
      'Contact Service Provider',
      'This will open an in-app message to contact the service provider directly.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Send Message', 
          onPress: () => onContactPress(service)
        },
      ]
    );
  };

  const handleBookNow = () => {
    const currentPrice = service.currentPrice || service.price;
    Alert.alert(
      'Book Service',
      `Are you ready to book "${service.title}" for $${currentPrice}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Send Request', 
          onPress: () => onBookNowPress(service)
        },
      ]
    );
  };

  const handleBargainPress = () => {
    if (onBargainPress) {
      onBargainPress(service);
    } else {
      setShowBargainModal(true);
    }
  };

  const handleSendOffer = (offer: Omit<BargainingOffer, 'id' | 'timestamp'>) => {
    if (onSendBargainOffer) {
      onSendBargainOffer(service.id, offer);
    }
    setShowBargainModal(false);
  };

  const handleAcceptOffer = (offerId: string) => {
    if (onAcceptBargainOffer) {
      onAcceptBargainOffer(service.id, offerId);
    }
  };

  const handleRejectOffer = (offerId: string) => {
    if (onRejectBargainOffer) {
      onRejectBargainOffer(service.id, offerId);
    }
  };

  const getBargainingButtonText = () => {
    if (service.bargainingStatus === 'none' || !service.bargainingStatus) {
      return currentUserType === 'seeker' ? 'Set Price & Bargain' : 'Bargaining Not Available';
    }
    if (service.bargainingStatus === 'pending') {
      return 'Bargaining Pending';
    }
    if (service.bargainingStatus === 'in_progress') {
      return 'Continue Bargaining';
    }
    if (service.bargainingStatus === 'accepted') {
      return 'Price Agreed';
    }
    return 'Bargaining Rejected';
  };

  const canBargain = () => {
    return (service.bargainingStatus === 'none' || !service.bargainingStatus) && currentUserType === 'seeker' ||
           service.bargainingStatus === 'in_progress' ||
           service.bargainingStatus === 'pending';
  };

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
        <Text style={styles.headerTitle}>Service Details</Text>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Ionicons name="share-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Service Card */}
        <View style={styles.serviceCard}>
          <View style={styles.serviceHeader}>
            <Text style={styles.serviceTitle}>{service.title}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>
                {service.bargainingStatus && service.bargainingStatus !== 'none' ? 'Current Price' : 'Price'}
              </Text>
              <Text style={styles.priceValue}>
                ${service.currentPrice || service.price}
              </Text>
              {service.bargainingStatus && service.bargainingStatus !== 'none' && service.initialPrice && (
                <Text style={styles.originalPrice}>
                  Original: ${service.initialPrice}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.categoryContainer}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{service.category}</Text>
            </View>
            {service.rating && (
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{service.rating.toFixed(1)}</Text>
                <Text style={styles.reviewsText}>({service.reviews || 0} reviews)</Text>
              </View>
            )}
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{service.description}</Text>
          </View>

          {service.createdAt && (
            <View style={styles.dateContainer}>
              <Ionicons name="calendar-outline" size={16} color="rgba(255, 255, 255, 0.7)" />
              <Text style={styles.dateText}>
                Created on {service.createdAt.toLocaleDateString()}
              </Text>
            </View>
          )}
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Service Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Views</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Inquiries</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Bookings</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Service Features</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
              <Text style={styles.featureText}>Professional Service</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
              <Text style={styles.featureText}>Quality Guaranteed</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
              <Text style={styles.featureText}>Flexible Scheduling</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
              <Text style={styles.featureText}>Customer Support</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons - Show different buttons based on context */}
        {!isOwnService ? (
          /* Customer Actions - Contact, Bargain, and Book Now */
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.contactButton} onPress={handleContact}>
              <Ionicons name="chatbubble-outline" size={20} color="#FFFFFF" />
              <Text style={styles.contactButtonText}>Contact</Text>
            </TouchableOpacity>
            
            {canBargain() && (
              <TouchableOpacity style={styles.bargainButton} onPress={handleBargainPress}>
                <Ionicons name="swap-horizontal-outline" size={20} color="#FFFFFF" />
                <Text style={styles.bargainButtonText}>{getBargainingButtonText()}</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
              <Ionicons name="calendar-outline" size={20} color="#FFFFFF" />
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* Provider Actions - Edit and Delete */
          <View style={styles.providerActions}>
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Ionicons name="create-outline" size={20} color="#667eea" />
              <Text style={styles.editButtonText}>Edit Service</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <Ionicons name="trash-outline" size={20} color="#FFFFFF" />
              <Text style={styles.deleteButtonText}>Delete Service</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Tips to Get More Bookings</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipText}>• Add high-quality photos to showcase your work</Text>
            <Text style={styles.tipText}>• Keep your availability updated regularly</Text>
            <Text style={styles.tipText}>• Respond quickly to customer inquiries</Text>
            <Text style={styles.tipText}>• Ask satisfied customers for reviews</Text>
            <Text style={styles.tipText}>• Offer competitive pricing for your area</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bargain Modal */}
      <BargainModal
        visible={showBargainModal}
        service={service}
        currentUserId={currentUserId || ''}
        currentUserType={currentUserType}
        onClose={() => setShowBargainModal(false)}
        onSendOffer={handleSendOffer}
        onAcceptOffer={handleAcceptOffer}
        onRejectOffer={handleRejectOffer}
      />
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
  shareButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  serviceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 25,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  serviceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 15,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  originalPrice: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
    textDecorationLine: 'line-through',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  categoryText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
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
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 24,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginLeft: 8,
  },
  statsSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  featuresSection: {
    marginBottom: 25,
  },
  featuresList: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 12,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
    flexWrap: 'wrap',
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  contactButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  bargainButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9C27B0',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    minWidth: 140,
  },
  bargainButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
    textAlign: 'center',
  },
  bookButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  bookButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  providerActions: {
    flexDirection: 'row',
    marginBottom: 25,
    gap: 15,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  editButtonText: {
    fontSize: 16,
    color: '#667eea',
    fontWeight: '600',
    marginLeft: 8,
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 59, 48, 0.8)',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  tipsSection: {
    marginBottom: 30,
  },
  tipsList: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
  },
  tipText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 22,
    marginBottom: 8,
  },
});

export default ServiceDetailScreen;
