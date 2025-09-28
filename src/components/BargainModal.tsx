import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Service, BargainingOffer } from '../types';

interface BargainModalProps {
  visible: boolean;
  service: Service;
  currentUserId: string;
  currentUserType: 'provider' | 'seeker';
  onClose: () => void;
  onSendOffer: (offer: Omit<BargainingOffer, 'id' | 'timestamp'>) => void;
  onAcceptOffer: (offerId: string) => void;
  onRejectOffer: (offerId: string) => void;
}

const BargainModal: React.FC<BargainModalProps> = ({
  visible,
  service,
  currentUserId,
  currentUserType,
  onClose,
  onSendOffer,
  onAcceptOffer,
  onRejectOffer,
}) => {
  const [offerPrice, setOfferPrice] = useState('');
  const [offerMessage, setOfferMessage] = useState('');

  const handleSendOffer = () => {
    const price = parseFloat(offerPrice);
    if (isNaN(price) || price <= 0) {
      Alert.alert('Invalid Price', 'Please enter a valid price amount.');
      return;
    }

    onSendOffer({
      userId: currentUserId,
      userName: currentUserType === 'provider' ? 'Service Provider' : 'You',
      userType: currentUserType,
      price: price,
      message: offerMessage.trim() || undefined,
      status: 'pending',
    });

    setOfferPrice('');
    setOfferMessage('');
  };

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const getBargainingStatusText = () => {
    switch (service.bargainingStatus) {
      case 'pending':
        return 'Bargaining Request Pending';
      case 'in_progress':
        return 'Bargaining in Progress';
      case 'accepted':
        return 'Price Agreed';
      case 'rejected':
        return 'Bargaining Rejected';
      default:
        return 'No Bargaining';
    }
  };

  const getBargainingStatusColor = () => {
    switch (service.bargainingStatus) {
      case 'pending':
        return '#FFA500';
      case 'in_progress':
        return '#2196F3';
      case 'accepted':
        return '#4CAF50';
      case 'rejected':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const canMakeOffer = () => {
    return service.bargainingStatus === 'in_progress' || 
           (service.bargainingStatus === 'none' && currentUserType === 'seeker');
  };

  const renderOffer = (offer: BargainingOffer, index: number) => (
    <View key={offer.id} style={styles.offerCard}>
      <View style={styles.offerHeader}>
        <View style={styles.offerUserInfo}>
          <Ionicons 
            name={offer.userType === 'provider' ? 'person' : 'person-outline'} 
            size={20} 
            color="#FFFFFF" 
          />
          <Text style={styles.offerUserName}>{offer.userName}</Text>
          <Text style={styles.offerTimestamp}>
            {offer.timestamp.toLocaleTimeString()}
          </Text>
        </View>
        <Text style={styles.offerPrice}>{formatPrice(offer.price)}</Text>
      </View>
      
      {offer.message && (
        <Text style={styles.offerMessage}>{offer.message}</Text>
      )}
      
      <View style={styles.offerStatus}>
        <View style={[
          styles.statusBadge, 
          { backgroundColor: offer.status === 'accepted' ? '#4CAF50' : 
                           offer.status === 'rejected' ? '#F44336' : '#FFA500' }
        ]}>
          <Text style={styles.statusText}>
            {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
          </Text>
        </View>
        
        {offer.status === 'pending' && offer.userId !== currentUserId && (
          <View style={styles.offerActions}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.acceptButton]}
              onPress={() => onAcceptOffer(offer.id)}
            >
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.rejectButton]}
              onPress={() => onRejectOffer(offer.id)}
            >
              <Ionicons name="close" size={16} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Reject</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.container}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Price Negotiation</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Service Info */}
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <View style={styles.priceInfo}>
                <Text style={styles.originalPrice}>
                  Original: {formatPrice(service.initialPrice || service.price)}
                </Text>
                <Text style={styles.currentPrice}>
                  Current: {formatPrice(service.currentPrice || service.price)}
                </Text>
              </View>
              <View style={[styles.statusContainer, { backgroundColor: getBargainingStatusColor() }]}>
                <Text style={styles.statusText}>{getBargainingStatusText()}</Text>
              </View>
            </View>

            {/* Bargaining History */}
            {service.bargainingHistory && service.bargainingHistory.length > 0 && (
              <View style={styles.historySection}>
                <Text style={styles.sectionTitle}>Negotiation History</Text>
                {service.bargainingHistory.map((offer, index) => renderOffer(offer, index))}
              </View>
            )}

            {/* Make Offer Section */}
            {canMakeOffer() && (
              <View style={styles.offerSection}>
                <Text style={styles.sectionTitle}>
                  {service.bargainingStatus === 'none' ? 'Set Your Price' : 'Make an Offer'}
                </Text>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Price ($)</Text>
                  <TextInput
                    style={styles.priceInput}
                    placeholder="Enter your price"
                    value={offerPrice}
                    onChangeText={setOfferPrice}
                    keyboardType="numeric"
                    placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Message (Optional)</Text>
                  <TextInput
                    style={styles.messageInput}
                    placeholder="Add a message to your offer..."
                    value={offerMessage}
                    onChangeText={setOfferMessage}
                    multiline
                    numberOfLines={3}
                    placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  />
                </View>

                <TouchableOpacity style={styles.sendButton} onPress={handleSendOffer}>
                  <Ionicons name="send" size={20} color="#FFFFFF" />
                  <Text style={styles.sendButtonText}>
                    {service.bargainingStatus === 'none' ? 'Set Price & Start Bargaining' : 'Send Offer'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Info Section */}
            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>How it works:</Text>
              <Text style={styles.infoText}>
                • Only the person looking to hire can set the initial price
              </Text>
              <Text style={styles.infoText}>
                • Both parties can then negotiate and make counter-offers
              </Text>
              <Text style={styles.infoText}>
                • Once an offer is accepted, the price is locked in
              </Text>
              <Text style={styles.infoText}>
                • You can reject offers and continue negotiating
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
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
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  serviceInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  priceInfo: {
    marginBottom: 15,
  },
  originalPrice: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 5,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statusContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  historySection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  offerCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  offerUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  offerUserName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
    marginRight: 8,
  },
  offerTimestamp: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  offerPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  offerMessage: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  offerStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  offerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
  },
  rejectButton: {
    backgroundColor: '#F44336',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  offerSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  priceInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  messageInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    textAlignVertical: 'top',
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  infoSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
    marginBottom: 5,
  },
});

export default BargainModal;
