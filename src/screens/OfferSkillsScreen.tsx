import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Alert,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  images: string[];
}

const skillCategories: SkillCategory[] = [
  { id: '1', name: 'Cleaning', icon: '', color: '#4A90E2' },
  { id: '2', name: 'Plumbing', icon: '', color: '#4A90E2' },
  { id: '3', name: 'Electrical', icon: '', color: '#4A90E2' },
  { id: '4', name: 'Carpentry', icon: '', color: '#4A90E2' },
  { id: '5', name: 'Painting', icon: '', color: '#4A90E2' },
  { id: '6', name: 'Gardening', icon: '', color: '#4A90E2' },
  { id: '7', name: 'Cooking', icon: '', color: '#4A90E2' },
  { id: '8', name: 'Tutoring', icon: '', color: '#4A90E2' },
  { id: '9', name: 'Photography', icon: '', color: '#4A90E2' },
  { id: '10', name: 'Delivery', icon: '', color: '#4A90E2' },
  { id: '11', name: 'Pet Care', icon: '', color: '#4A90E2' },
  { id: '12', name: 'Other', icon: '', color: '#4A90E2' },
];

interface OfferSkillsScreenProps {
  onBackPress: () => void;
  onServicePress: (service: Service) => void;
}

const OfferSkillsScreen: React.FC<OfferSkillsScreenProps> = ({
  onBackPress,
  onServicePress,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [userServices, setUserServices] = useState<Service[]>([]);
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
  });

  const filteredCategories = skillCategories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddService = () => {
    if (!newService.title || !newService.description || !newService.price || !newService.category) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const service: Service = {
      id: Date.now().toString(),
      title: newService.title,
      description: newService.description,
      price: newService.price,
      category: newService.category,
      images: [],
    };

    setUserServices([...userServices, service]);
    setNewService({ title: '', description: '', price: '', category: '' });
    setShowAddService(false);
    Alert.alert('Success', 'Service added successfully!');
  };

  const renderCategoryCard = (category: SkillCategory) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryCard,
        selectedCategory === category.id && styles.selectedCategoryCard,
      ]}
      onPress={() => setSelectedCategory(category.id)}
    >
      <Text style={[
        styles.categoryName,
        selectedCategory === category.id && styles.selectedCategoryName,
      ]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  const renderServiceCard = (service: Service) => (
    <TouchableOpacity
      key={service.id}
      style={styles.serviceCard}
      onPress={() => onServicePress(service)}
    >
      <View style={styles.serviceHeader}>
        <Text style={styles.serviceTitle}>{service.title}</Text>
        <Text style={styles.servicePrice}>${service.price}</Text>
      </View>
      <Text style={styles.serviceDescription} numberOfLines={2}>
        {service.description}
      </Text>
      <View style={styles.serviceFooter}>
        <Text style={styles.serviceCategory}>{service.category}</Text>
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
        <Text style={styles.headerTitle}>Offer Your Skills</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddService(true)}>
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search skills..."
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* My Services Section */}
        {userServices.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>My Services</Text>
            {userServices.map(renderServiceCard)}
          </View>
        )}

        {/* Categories Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Your Skills</Text>
          <View style={styles.categoriesGrid}>
            {filteredCategories.map(renderCategoryCard)}
          </View>
        </View>

        {/* Quick Add Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Add Service</Text>
          <TouchableOpacity
            style={styles.quickAddButton}
            onPress={() => setShowAddService(true)}
          >
            <Ionicons name="add-circle-outline" size={24} color="#FFFFFF" />
            <Text style={styles.quickAddText}>Add a new service</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{userServices.length}</Text>
            <Text style={styles.statLabel}>Services Offered</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Completed Jobs</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>
      </ScrollView>

      {/* Add Service Modal */}
      {showAddService && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Service</Text>
              <TouchableOpacity onPress={() => setShowAddService(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Service Title</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="e.g., House Cleaning"
                  value={newService.title}
                  onChangeText={(text) => setNewService({...newService, title: text})}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput
                  style={[styles.modalInput, styles.textArea]}
                  placeholder="Describe your service..."
                  multiline
                  numberOfLines={4}
                  value={newService.description}
                  onChangeText={(text) => setNewService({...newService, description: text})}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Price (per hour/job)</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="e.g., 25"
                  keyboardType="numeric"
                  value={newService.price}
                  onChangeText={(text) => setNewService({...newService, price: text})}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Category</Text>
                <View style={styles.categorySelector}>
                  {skillCategories.slice(0, 6).map(category => (
                    <TouchableOpacity
                      key={category.id}
                      style={[
                        styles.categoryOption,
                        newService.category === category.name && styles.selectedCategoryOption,
                      ]}
                      onPress={() => setNewService({...newService, category: category.name})}
                    >
                      <Text style={styles.categoryOptionText}>{category.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowAddService(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleAddService}
              >
                <Text style={styles.saveButtonText}>Add Service</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
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
  searchSection: {
    marginTop: 20,
    marginBottom: 30,
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
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '30%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    minHeight: 50,
  },
  selectedCategoryCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  selectedCategoryName: {
    color: '#667eea',
  },
  serviceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  serviceDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 10,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceCategory: {
    fontSize: 12,
    color: '#667eea',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  quickAddButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderStyle: 'dashed',
  },
  quickAddText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
    fontWeight: '500',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
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
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalBody: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  modalInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  categorySelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedCategoryOption: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  categoryOptionText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  selectedCategoryOptionText: {
    color: '#FFFFFF',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#667eea',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: 10,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default OfferSkillsScreen;
