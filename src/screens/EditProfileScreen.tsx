import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface EditProfileScreenProps {
  onBackPress: () => void;
  onSavePress: (profileData: any) => void;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ onBackPress, onSavePress }) => {
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+234 801 234 5678',
    location: 'Lagos, Nigeria',
    bio: 'Professional service provider with 5+ years of experience in home services.',
    specialties: ['Cleaning', 'Plumbing', 'Electrical'],
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    onSavePress(profileData);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    onBackPress();
  };

  const updateField = (field: string, value: string) => {
    setProfileData({ ...profileData, [field]: value });
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
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Picture Section */}
        <View style={styles.profilePictureSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>
              {profileData.firstName[0]}{profileData.lastName[0]}
            </Text>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.changePhotoButton}>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
              style={styles.input}
              value={profileData.firstName}
              onChangeText={(text) => updateField('firstName', text)}
              editable={isEditing}
              placeholder="Enter first name"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={profileData.lastName}
              onChangeText={(text) => updateField('lastName', text)}
              editable={isEditing}
              placeholder="Enter last name"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={profileData.email}
              onChangeText={(text) => updateField('email', text)}
              editable={isEditing}
              placeholder="Enter email address"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={profileData.phone}
              onChangeText={(text) => updateField('phone', text)}
              editable={isEditing}
              placeholder="Enter phone number"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Location</Text>
            <TextInput
              style={styles.input}
              value={profileData.location}
              onChangeText={(text) => updateField('location', text)}
              editable={isEditing}
              placeholder="Enter location"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />
          </View>
        </View>

        {/* Professional Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Bio</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={profileData.bio}
              onChangeText={(text) => updateField('bio', text)}
              editable={isEditing}
              placeholder="Tell us about yourself and your services"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Specialties</Text>
            <View style={styles.specialtiesContainer}>
              {profileData.specialties.map((specialty, index) => (
                <View key={index} style={styles.specialtyTag}>
                  <Text style={styles.specialtyText}>{specialty}</Text>
                  {isEditing && (
                    <TouchableOpacity
                      onPress={() => {
                        const newSpecialties = profileData.specialties.filter((_, i) => i !== index);
                        setProfileData({ ...profileData, specialties: newSpecialties });
                      }}
                    >
                      <Ionicons name="close" size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
              {isEditing && (
                <TouchableOpacity style={styles.addSpecialtyButton}>
                  <Ionicons name="add" size={20} color="#FFFFFF" />
                  <Text style={styles.addSpecialtyText}>Add Specialty</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {!isEditing ? (
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Ionicons name="create-outline" size={20} color="#667eea" />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.editActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButtonAction} onPress={handleSave}>
                <Text style={styles.saveButtonActionText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="lock-closed-outline" size={20} color="#FFFFFF" />
              <Text style={styles.settingTitle}>Change Password</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.7)" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="shield-checkmark-outline" size={20} color="#FFFFFF" />
              <Text style={styles.settingTitle}>Account Verification</Text>
            </View>
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
              <Text style={[styles.settingTitle, styles.dangerText]}>Delete Account</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.7)" />
          </TouchableOpacity>
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
  saveButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profilePictureSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    textAlign: 'center',
    lineHeight: 100,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changePhotoButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  changePhotoText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  specialtyTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  specialtyText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  addSpecialtyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderStyle: 'dashed',
  },
  addSpecialtyText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  actionButtons: {
    marginBottom: 30,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  editButtonText: {
    fontSize: 16,
    color: '#667eea',
    fontWeight: '600',
    marginLeft: 8,
  },
  editActions: {
    flexDirection: 'row',
    gap: 15,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  saveButtonAction: {
    flex: 1,
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
  },
  saveButtonActionText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    marginLeft: 12,
  },
  dangerText: {
    color: '#FF6B6B',
  },
  verifiedBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  verifiedText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
});

export default EditProfileScreen;
