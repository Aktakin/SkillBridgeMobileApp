import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ViewToggleSettings from '../components/ViewToggleSettings';
import { useApp } from '../context/AppContext';

interface SettingsOption {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  type: 'toggle' | 'navigation' | 'action';
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
}

interface SettingsScreenProps {
  onBackPress: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBackPress }) => {
  const { showAsProvider, showAsEmployer, toggleViewPreference } = useApp();
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    locationServices: true,
    biometricLogin: false,
    autoBackup: true,
    darkMode: false,
    soundEffects: true,
    vibration: true,
    dataSaver: false,
    analytics: true,
    marketingEmails: false,
  });

  const updateSetting = (key: string, value: boolean) => {
    setSettings({ ...settings, [key]: value });
  };

  const generalSettings: SettingsOption[] = [
    {
      id: '1',
      title: 'Account Settings',
      subtitle: 'Manage your account preferences',
      icon: 'person-circle-outline',
      type: 'navigation',
      onPress: () => Alert.alert('Account Settings', 'Navigate to account settings'),
    },
    {
      id: '2',
      title: 'Privacy Settings',
      subtitle: 'Control your privacy and data',
      icon: 'shield-checkmark-outline',
      type: 'navigation',
      onPress: () => Alert.alert('Privacy Settings', 'Navigate to privacy settings'),
    },
    {
      id: '3',
      title: 'Security Settings',
      subtitle: 'Manage security and authentication',
      icon: 'lock-closed-outline',
      type: 'navigation',
      onPress: () => Alert.alert('Security Settings', 'Navigate to security settings'),
    },
    {
      id: '4',
      title: 'Language',
      subtitle: 'English (US)',
      icon: 'language-outline',
      type: 'navigation',
      onPress: () => Alert.alert('Language', 'Select your preferred language'),
    },
    {
      id: '5',
      title: 'Currency',
      subtitle: 'Nigerian Naira (₦)',
      icon: 'cash-outline',
      type: 'navigation',
      onPress: () => Alert.alert('Currency', 'Select your preferred currency'),
    },
  ];

  const notificationSettings: SettingsOption[] = [
    {
      id: '6',
      title: 'Push Notifications',
      subtitle: 'Receive push notifications',
      icon: 'notifications-outline',
      type: 'toggle',
      value: settings.pushNotifications,
      onToggle: (value) => updateSetting('pushNotifications', value),
    },
    {
      id: '7',
      title: 'Email Notifications',
      subtitle: 'Receive email updates',
      icon: 'mail-outline',
      type: 'toggle',
      value: settings.emailNotifications,
      onToggle: (value) => updateSetting('emailNotifications', value),
    },
    {
      id: '8',
      title: 'SMS Notifications',
      subtitle: 'Receive SMS alerts',
      icon: 'chatbubble-outline',
      type: 'toggle',
      value: settings.smsNotifications,
      onToggle: (value) => updateSetting('smsNotifications', value),
    },
    {
      id: '9',
      title: 'Booking Reminders',
      subtitle: 'Get reminded about upcoming bookings',
      icon: 'calendar-outline',
      type: 'toggle',
      value: true,
      onToggle: () => {},
    },
    {
      id: '10',
      title: 'Payment Alerts',
      subtitle: 'Notifications for payments',
      icon: 'card-outline',
      type: 'toggle',
      value: true,
      onToggle: () => {},
    },
  ];

  const appSettings: SettingsOption[] = [
    {
      id: '11',
      title: 'Location Services',
      subtitle: 'Allow location access for better service matching',
      icon: 'location-outline',
      type: 'toggle',
      value: settings.locationServices,
      onToggle: (value) => updateSetting('locationServices', value),
    },
    {
      id: '12',
      title: 'Biometric Login',
      subtitle: 'Use fingerprint or face recognition',
      icon: 'finger-print-outline',
      type: 'toggle',
      value: settings.biometricLogin,
      onToggle: (value) => updateSetting('biometricLogin', value),
    },
    {
      id: '13',
      title: 'Auto Backup',
      subtitle: 'Automatically backup your data',
      icon: 'cloud-upload-outline',
      type: 'toggle',
      value: settings.autoBackup,
      onToggle: (value) => updateSetting('autoBackup', value),
    },
    {
      id: '14',
      title: 'Dark Mode',
      subtitle: 'Use dark theme',
      icon: 'moon-outline',
      type: 'toggle',
      value: settings.darkMode,
      onToggle: (value) => updateSetting('darkMode', value),
    },
    {
      id: '15',
      title: 'Sound Effects',
      subtitle: 'Play sound effects',
      icon: 'volume-high-outline',
      type: 'toggle',
      value: settings.soundEffects,
      onToggle: (value) => updateSetting('soundEffects', value),
    },
    {
      id: '16',
      title: 'Vibration',
      subtitle: 'Enable haptic feedback',
      icon: 'phone-portrait-outline',
      type: 'toggle',
      value: settings.vibration,
      onToggle: (value) => updateSetting('vibration', value),
    },
    {
      id: '17',
      title: 'Data Saver',
      subtitle: 'Reduce data usage',
      icon: 'cellular-outline',
      type: 'toggle',
      value: settings.dataSaver,
      onToggle: (value) => updateSetting('dataSaver', value),
    },
  ];

  const dataSettings: SettingsOption[] = [
    {
      id: '18',
      title: 'Analytics',
      subtitle: 'Help improve the app with usage data',
      icon: 'analytics-outline',
      type: 'toggle',
      value: settings.analytics,
      onToggle: (value) => updateSetting('analytics', value),
    },
    {
      id: '19',
      title: 'Marketing Emails',
      subtitle: 'Receive promotional content',
      icon: 'megaphone-outline',
      type: 'toggle',
      value: settings.marketingEmails,
      onToggle: (value) => updateSetting('marketingEmails', value),
    },
    {
      id: '20',
      title: 'Clear Cache',
      subtitle: 'Free up storage space',
      icon: 'trash-outline',
      type: 'action',
      onPress: () => {
        Alert.alert(
          'Clear Cache',
          'This will clear all cached data. Are you sure?',
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Clear', 
              style: 'destructive',
              onPress: () => Alert.alert('Success', 'Cache cleared successfully!')
            },
          ]
        );
      },
    },
    {
      id: '21',
      title: 'Export Data',
      subtitle: 'Download your data',
      icon: 'download-outline',
      type: 'action',
      onPress: () => Alert.alert('Export Data', 'Your data will be exported and sent to your email'),
    },
  ];

  const renderSettingItem = (setting: SettingsOption) => (
    <TouchableOpacity
      key={setting.id}
      style={styles.settingItem}
      onPress={setting.type === 'navigation' || setting.type === 'action' ? setting.onPress : undefined}
    >
      <View style={styles.settingLeft}>
        <View style={styles.settingIconContainer}>
          <Ionicons name={setting.icon as any} size={20} color="#667eea" />
        </View>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>{setting.title}</Text>
          {setting.subtitle && (
            <Text style={styles.settingSubtitle}>{setting.subtitle}</Text>
          )}
        </View>
      </View>
      
      <View style={styles.settingRight}>
        {setting.type === 'toggle' && (
          <Switch
            value={setting.value}
            onValueChange={setting.onToggle}
            trackColor={{ false: 'rgba(255, 255, 255, 0.3)', true: '#667eea' }}
            thumbColor={setting.value ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)'}
            ios_backgroundColor="rgba(255, 255, 255, 0.3)"
          />
        )}
        {setting.type === 'navigation' && (
          <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.7)" />
        )}
        {setting.type === 'action' && (
          <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.7)" />
        )}
      </View>
    </TouchableOpacity>
  );

  const renderSettingsSection = (title: string, settings: SettingsOption[]) => (
    <View style={styles.settingsSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.settingsContainer}>
        {settings.map(renderSettingItem)}
      </View>
    </View>
  );

  const resetSettings = () => {
    Alert.alert(
      'Reset Settings',
      'This will reset all settings to their default values. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setSettings({
              pushNotifications: true,
              emailNotifications: true,
              smsNotifications: false,
              locationServices: true,
              biometricLogin: false,
              autoBackup: true,
              darkMode: false,
              soundEffects: true,
              vibration: true,
              dataSaver: false,
              analytics: true,
              marketingEmails: false,
            });
            Alert.alert('Success', 'Settings have been reset to defaults');
          },
        },
      ]
    );
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
        <Text style={styles.headerTitle}>Settings</Text>
        <TouchableOpacity style={styles.resetButton} onPress={resetSettings}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard}>
              <Ionicons name="sync-outline" size={24} color="#FFFFFF" />
              <Text style={styles.quickActionText}>Sync Data</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Ionicons name="shield-checkmark-outline" size={24} color="#FFFFFF" />
              <Text style={styles.quickActionText}>Security</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Ionicons name="help-circle-outline" size={24} color="#FFFFFF" />
              <Text style={styles.quickActionText}>Help</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Ionicons name="information-circle-outline" size={24} color="#FFFFFF" />
              <Text style={styles.quickActionText}>About</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* View Preferences */}
        <View style={styles.viewPreferencesSection}>
          <View style={styles.viewPreferencesCard}>
            <ViewToggleSettings
              showAsProvider={showAsProvider}
              showAsEmployer={showAsEmployer}
              onToggleProvider={() => toggleViewPreference('provider')}
              onToggleEmployer={() => toggleViewPreference('employer')}
            />
          </View>
        </View>

        {/* Settings Sections */}
        {renderSettingsSection('General', generalSettings)}
        {renderSettingsSection('Notifications', notificationSettings)}
        {renderSettingsSection('App Preferences', appSettings)}
        {renderSettingsSection('Data & Privacy', dataSettings)}

        {/* App Information */}
        <View style={styles.appInfoSection}>
          <Text style={styles.sectionTitle}>App Information</Text>
          <View style={styles.appInfoCard}>
            <View style={styles.appInfoItem}>
              <Text style={styles.appInfoLabel}>Version</Text>
              <Text style={styles.appInfoValue}>1.0.0</Text>
            </View>
            <View style={styles.appInfoItem}>
              <Text style={styles.appInfoLabel}>Build</Text>
              <Text style={styles.appInfoValue}>2024.01.15</Text>
            </View>
            <View style={styles.appInfoItem}>
              <Text style={styles.appInfoLabel}>Storage Used</Text>
              <Text style={styles.appInfoValue}>45.2 MB</Text>
            </View>
            <View style={styles.appInfoItem}>
              <Text style={styles.appInfoLabel}>Last Updated</Text>
              <Text style={styles.appInfoValue}>Jan 15, 2024</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            SkillB App - Your trusted skills marketplace
          </Text>
          <Text style={styles.footerSubtext}>
            © 2024 SkillB. All rights reserved.
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
  resetButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  quickActionsSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 8,
  },
  viewPreferencesSection: {
    marginBottom: 25,
  },
  viewPreferencesCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
  },
  settingsSection: {
    marginBottom: 25,
  },
  settingsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  settingRight: {
    marginLeft: 10,
  },
  appInfoSection: {
    marginBottom: 25,
  },
  appInfoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  appInfoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  appInfoLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  appInfoValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingBottom: 50,
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 5,
  },
  footerSubtext: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
});

export default SettingsScreen;
