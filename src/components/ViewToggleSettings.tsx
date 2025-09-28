import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface ViewToggleSettingsProps {
  showAsProvider: boolean;
  showAsEmployer: boolean;
  onToggleProvider: () => void;
  onToggleEmployer: () => void;
}

const ViewToggleSettings: React.FC<ViewToggleSettingsProps> = ({
  showAsProvider,
  showAsEmployer,
  onToggleProvider,
  onToggleEmployer,
}) => {
  const handleProviderToggle = () => {
    if (!showAsEmployer) {
      Alert.alert(
        'Cannot Disable Provider View',
        'You must have at least one view enabled. Please enable Employer view first if you want to disable Provider view.',
        [{ text: 'OK' }]
      );
      return;
    }
    onToggleProvider();
  };

  const handleEmployerToggle = () => {
    if (!showAsProvider) {
      Alert.alert(
        'Cannot Disable Employer View',
        'You must have at least one view enabled. Please enable Provider view first if you want to disable Employer view.',
        [{ text: 'OK' }]
      );
      return;
    }
    onToggleEmployer();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>View Preferences</Text>
      <Text style={styles.sectionDescription}>
        Choose which views you want to see in the app. At least one view must be enabled.
      </Text>

      {/* Provider View Toggle */}
      <View style={styles.toggleItem}>
        <View style={styles.toggleInfo}>
          <View style={styles.toggleHeader}>
            <Ionicons name="briefcase-outline" size={24} color="#667eea" />
            <Text style={styles.toggleTitle}>Service Provider View</Text>
          </View>
          <Text style={styles.toggleDescription}>
            Show services you offer, manage your listings, and handle provider-related features
          </Text>
        </View>
        <Switch
          value={showAsProvider}
          onValueChange={handleProviderToggle}
          trackColor={{ false: '#E0E0E0', true: '#667eea' }}
          thumbColor={showAsProvider ? '#FFFFFF' : '#F4F3F4'}
          disabled={!showAsEmployer}
        />
      </View>

      {/* Employer View Toggle */}
      <View style={styles.toggleItem}>
        <View style={styles.toggleInfo}>
          <View style={styles.toggleHeader}>
            <Ionicons name="search-outline" size={24} color="#FF6B35" />
            <Text style={styles.toggleTitle}>Employer View</Text>
          </View>
          <Text style={styles.toggleDescription}>
            Browse and hire services, manage bookings, and handle employer-related features
          </Text>
        </View>
        <Switch
          value={showAsEmployer}
          onValueChange={handleEmployerToggle}
          trackColor={{ false: '#E0E0E0', true: '#FF6B35' }}
          thumbColor={showAsEmployer ? '#FFFFFF' : '#F4F3F4'}
          disabled={!showAsProvider}
        />
      </View>

      {/* Current Status */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusTitle}>Current View Status:</Text>
        <View style={styles.statusRow}>
          <View style={[styles.statusBadge, { backgroundColor: showAsProvider ? '#4CAF50' : '#9E9E9E' }]}>
            <Text style={styles.statusText}>
              {showAsProvider ? 'Provider Active' : 'Provider Disabled'}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: showAsEmployer ? '#4CAF50' : '#9E9E9E' }]}>
            <Text style={styles.statusText}>
              {showAsEmployer ? 'Employer Active' : 'Employer Disabled'}
            </Text>
          </View>
        </View>
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Ionicons name="information-circle-outline" size={20} color="#667eea" />
        <Text style={styles.infoText}>
          You can switch between views anytime. The app will remember your preferences and show the appropriate sections based on your selection.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
  },
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  toggleInfo: {
    flex: 1,
    marginRight: 16,
  },
  toggleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 12,
  },
  toggleDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  statusContainer: {
    backgroundColor: '#F0F8FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#B3D9FF',
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FFE0B2',
  },
  infoText: {
    fontSize: 14,
    color: '#E65100',
    lineHeight: 20,
    marginLeft: 12,
    flex: 1,
  },
});

export default ViewToggleSettings;
