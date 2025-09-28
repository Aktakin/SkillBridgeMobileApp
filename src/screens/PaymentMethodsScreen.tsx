import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'mobile';
  name: string;
  details: string;
  isDefault: boolean;
  isVerified: boolean;
}

interface PaymentMethodsScreenProps {
  onBackPress: () => void;
  onAddMethod: () => void;
}

const PaymentMethodsScreen: React.FC<PaymentMethodsScreenProps> = ({ onBackPress, onAddMethod }) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      name: 'Visa Card',
      details: '**** **** **** 1234',
      isDefault: true,
      isVerified: true,
    },
    {
      id: '2',
      type: 'bank',
      name: 'GTBank',
      details: 'Account: 0123456789',
      isDefault: false,
      isVerified: true,
    },
    {
      id: '3',
      type: 'mobile',
      name: 'Paystack',
      details: 'john.doe@example.com',
      isDefault: false,
      isVerified: false,
    },
  ]);

  const [showAddMethod, setShowAddMethod] = useState(false);
  const [newMethod, setNewMethod] = useState({
    type: 'card' as 'card' | 'bank' | 'mobile',
    name: '',
    details: '',
  });

  const getMethodIcon = (type: string) => {
    switch (type) {
      case 'card': return 'card-outline';
      case 'bank': return 'business-outline';
      case 'mobile': return 'phone-portrait-outline';
      default: return 'card-outline';
    }
  };

  const getMethodColor = (type: string) => {
    switch (type) {
      case 'card': return '#4CAF50';
      case 'bank': return '#2196F3';
      case 'mobile': return '#FF9800';
      default: return '#9E9E9E';
    }
  };

  const setDefaultMethod = (methodId: string) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === methodId,
      }))
    );
    Alert.alert('Success', 'Default payment method updated!');
  };

  const deleteMethod = (methodId: string) => {
    Alert.alert(
      'Delete Payment Method',
      'Are you sure you want to delete this payment method?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setPaymentMethods(methods => methods.filter(method => method.id !== methodId));
            Alert.alert('Success', 'Payment method deleted successfully!');
          },
        },
      ]
    );
  };

  const addNewMethod = () => {
    if (!newMethod.name || !newMethod.details) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const method: PaymentMethod = {
      id: String(paymentMethods.length + 1),
      type: newMethod.type,
      name: newMethod.name,
      details: newMethod.details,
      isDefault: paymentMethods.length === 0,
      isVerified: false,
    };

    setPaymentMethods([...paymentMethods, method]);
    setNewMethod({ type: 'card', name: '', details: '' });
    setShowAddMethod(false);
    Alert.alert('Success', 'Payment method added successfully!');
  };

  const renderPaymentMethod = (method: PaymentMethod) => (
    <View key={method.id} style={styles.methodCard}>
      <View style={styles.methodHeader}>
        <View style={styles.methodInfo}>
          <View style={styles.methodIconContainer}>
            <Ionicons 
              name={getMethodIcon(method.type) as any} 
              size={24} 
              color={getMethodColor(method.type)} 
            />
          </View>
          <View style={styles.methodDetails}>
            <Text style={styles.methodName}>{method.name}</Text>
            <Text style={styles.methodDetailsText}>{method.details}</Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => {
            Alert.alert(
              'Payment Method Options',
              'What would you like to do?',
              [
                { text: 'Cancel', style: 'cancel' },
                { 
                  text: 'Set as Default', 
                  onPress: () => setDefaultMethod(method.id),
                  disabled: method.isDefault
                },
                { text: 'Delete', style: 'destructive', onPress: () => deleteMethod(method.id) },
              ]
            );
          }}
        >
          <Ionicons name="ellipsis-vertical" size={20} color="rgba(255, 255, 255, 0.7)" />
        </TouchableOpacity>
      </View>

      <View style={styles.methodFooter}>
        <View style={styles.methodStatus}>
          {method.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultText}>DEFAULT</Text>
            </View>
          )}
          {method.isVerified ? (
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          ) : (
            <View style={styles.pendingBadge}>
              <Ionicons name="time-outline" size={16} color="#FF9800" />
              <Text style={styles.pendingText}>Pending Verification</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  const renderAddMethodForm = () => (
    <View style={styles.addMethodCard}>
      <Text style={styles.addMethodTitle}>Add New Payment Method</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Payment Type</Text>
        <View style={styles.typeSelector}>
          {[
            { type: 'card', label: 'Card', icon: 'card-outline' },
            { type: 'bank', label: 'Bank Account', icon: 'business-outline' },
            { type: 'mobile', label: 'Mobile Money', icon: 'phone-portrait-outline' },
          ].map((option) => (
            <TouchableOpacity
              key={option.type}
              style={[
                styles.typeOption,
                newMethod.type === option.type && styles.selectedTypeOption,
              ]}
              onPress={() => setNewMethod({ ...newMethod, type: option.type as any })}
            >
              <Ionicons 
                name={option.icon as any} 
                size={20} 
                color={newMethod.type === option.type ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)'} 
              />
              <Text style={[
                styles.typeOptionText,
                newMethod.type === option.type && styles.selectedTypeOptionText,
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
          style={styles.input}
          value={newMethod.name}
          onChangeText={(text) => setNewMethod({ ...newMethod, name: text })}
          placeholder="Enter payment method name"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Details</Text>
        <TextInput
          style={styles.input}
          value={newMethod.details}
          onChangeText={(text) => setNewMethod({ ...newMethod, details: text })}
          placeholder={
            newMethod.type === 'card' ? 'Enter card number' :
            newMethod.type === 'bank' ? 'Enter account number' :
            'Enter phone number or email'
          }
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
        />
      </View>

      <View style={styles.addMethodActions}>
        <TouchableOpacity 
          style={styles.cancelButton} 
          onPress={() => setShowAddMethod(false)}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={addNewMethod}>
          <Text style={styles.addButtonText}>Add Method</Text>
        </TouchableOpacity>
      </View>
    </View>
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
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => setShowAddMethod(!showAddMethod)}
        >
          <Ionicons name={showAddMethod ? "close" : "add"} size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Payment Summary</Text>
          <View style={styles.summaryStats}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>{paymentMethods.length}</Text>
              <Text style={styles.summaryLabel}>Total Methods</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>
                {paymentMethods.filter(m => m.isVerified).length}
              </Text>
              <Text style={styles.summaryLabel}>Verified</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>
                {paymentMethods.filter(m => m.isDefault).length}
              </Text>
              <Text style={styles.summaryLabel}>Default</Text>
            </View>
          </View>
        </View>

        {/* Add Method Form */}
        {showAddMethod && renderAddMethodForm()}

        {/* Payment Methods */}
        <View style={styles.methodsSection}>
          <Text style={styles.sectionTitle}>Your Payment Methods</Text>
          {paymentMethods.length > 0 ? (
            paymentMethods.map(renderPaymentMethod)
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="card-outline" size={64} color="rgba(255, 255, 255, 0.5)" />
              <Text style={styles.emptyTitle}>No Payment Methods</Text>
              <Text style={styles.emptyDescription}>
                Add a payment method to start receiving payments
              </Text>
              <TouchableOpacity 
                style={styles.addFirstButton} 
                onPress={() => setShowAddMethod(true)}
              >
                <Ionicons name="add" size={20} color="#FFFFFF" />
                <Text style={styles.addFirstButtonText}>Add Payment Method</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Security Notice */}
        <View style={styles.securityNotice}>
          <Ionicons name="shield-checkmark" size={20} color="#4CAF50" />
          <Text style={styles.securityText}>
            Your payment information is encrypted and secure
          </Text>
        </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  summaryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  addMethodCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  addMethodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 10,
  },
  typeOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    gap: 8,
  },
  selectedTypeOption: {
    backgroundColor: '#667eea',
  },
  typeOptionText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
  },
  selectedTypeOptionText: {
    color: '#FFFFFF',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  addMethodActions: {
    flexDirection: 'row',
    gap: 15,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  addButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  methodsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  methodCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  methodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  methodIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  methodDetails: {
    flex: 1,
  },
  methodName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  methodDetailsText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  moreButton: {
    padding: 5,
  },
  methodFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  methodStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  defaultBadge: {
    backgroundColor: '#667eea',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  defaultText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  verifiedText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  pendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 152, 0, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  pendingText: {
    fontSize: 12,
    color: '#FF9800',
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 15,
    marginBottom: 10,
  },
  emptyDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  addFirstButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
  },
  addFirstButtonText: {
    fontSize: 16,
    color: '#667eea',
    fontWeight: '600',
    marginLeft: 8,
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    gap: 10,
  },
  securityText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
    flex: 1,
  },
});

export default PaymentMethodsScreen;
