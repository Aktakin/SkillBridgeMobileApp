import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface PrivacyPolicyScreenProps {
  onBackPress: () => void;
}

const PrivacyPolicyScreen: React.FC<PrivacyPolicyScreenProps> = ({ onBackPress }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const privacySections = [
    {
      id: '1',
      title: 'Information We Collect',
      content: `We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.

Personal Information:
• Name, email address, phone number
• Profile information and photos
• Service listings and descriptions
• Payment information (processed securely)

Usage Information:
• How you use our app and services
• Device information and location data
• Communication preferences
• Transaction history`,
    },
    {
      id: '2',
      title: 'How We Use Your Information',
      content: `We use the information we collect to:

• Provide and improve our services
• Process transactions and payments
• Communicate with you about your account
• Send you important updates and notifications
• Provide customer support
• Ensure platform safety and security
• Comply with legal obligations

We may also use your information for:
• Analytics and service improvement
• Marketing communications (with your consent)
• Fraud prevention and security
• Legal compliance and enforcement`,
    },
    {
      id: '3',
      title: 'Information Sharing',
      content: `We do not sell your personal information. We may share your information in the following circumstances:

With Other Users:
• Your profile information with service providers/clients
• Service listings and reviews
• Communication through our platform

With Service Providers:
• Payment processors
• Cloud storage providers
• Analytics services
• Customer support tools

Legal Requirements:
• When required by law
• To protect our rights and safety
• In case of business transfers
• With your explicit consent`,
    },
    {
      id: '4',
      title: 'Data Security',
      content: `We implement appropriate security measures to protect your personal information:

Technical Safeguards:
• Encryption of data in transit and at rest
• Secure authentication systems
• Regular security audits and updates
• Access controls and monitoring

Operational Safeguards:
• Employee training on data protection
• Limited access to personal information
• Incident response procedures
• Regular backup and recovery systems

However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but strive to protect your information using industry-standard practices.`,
    },
    {
      id: '5',
      title: 'Your Rights and Choices',
      content: `You have the following rights regarding your personal information:

Access and Portability:
• View and download your personal data
• Request a copy of your information
• Transfer your data to another service

Correction and Updates:
• Update your profile information
• Correct inaccurate data
• Modify your preferences

Deletion and Restriction:
• Delete your account and data
• Restrict processing of your information
• Object to certain data processing

Communication Preferences:
• Opt-out of marketing communications
• Manage notification settings
• Control data sharing preferences

To exercise these rights, contact us at privacy@skillb.com`,
    },
    {
      id: '6',
      title: 'Cookies and Tracking',
      content: `We use cookies and similar technologies to enhance your experience:

Essential Cookies:
• Required for app functionality
• Authentication and security
• Basic service features

Analytics Cookies:
• Understand app usage patterns
• Improve service performance
• Optimize user experience

Marketing Cookies:
• Personalized content and ads
• Social media integration
• Third-party advertising (with consent)

You can control cookie preferences through your device settings or our app settings. Disabling certain cookies may affect app functionality.`,
    },
    {
      id: '7',
      title: 'Data Retention',
      content: `We retain your information for as long as necessary to provide our services:

Account Information:
• Active accounts: Until account deletion
• Inactive accounts: Up to 3 years
• Deleted accounts: 30 days (for recovery)

Transaction Data:
• Payment records: 7 years (legal requirement)
• Service history: 3 years
• Communication logs: 2 years

Marketing Data:
• Consent-based communications: Until withdrawn
• Analytics data: 2 years
• Cookies: As per cookie policy

We may retain certain information longer for legal compliance, dispute resolution, or security purposes.`,
    },
    {
      id: '8',
      title: 'Children\'s Privacy',
      content: `Our services are not intended for children under 13 years of age:

Age Restrictions:
• Users must be at least 13 years old
• Parental consent required for minors
• No collection of children's information

If we discover we have collected information from a child under 13, we will:
• Delete the information immediately
• Notify parents/guardians
• Implement additional safeguards

Parents and guardians can contact us to review, delete, or restrict their child's information.`,
    },
    {
      id: '9',
      title: 'International Transfers',
      content: `Your information may be transferred to and processed in countries other than your own:

Data Transfers:
• Cloud services may be hosted globally
• Service providers in different countries
• Cross-border data processing

Protection Measures:
• Standard contractual clauses
• Adequacy decisions by authorities
• Appropriate safeguards and controls

We ensure your information receives adequate protection regardless of where it is processed, in accordance with applicable data protection laws.`,
    },
    {
      id: '10',
      title: 'Changes to This Policy',
      content: `We may update this Privacy Policy from time to time:

Notification of Changes:
• Email notification for significant changes
• In-app notification for updates
• Updated policy posted on our website

Your Continued Use:
• Using our services after changes constitutes acceptance
• You can review the updated policy anytime
• Contact us if you disagree with changes

We encourage you to review this policy periodically to stay informed about how we protect your information.`,
    },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const renderSection = (section: any) => (
    <View key={section.id} style={styles.section}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => toggleSection(section.id)}
      >
        <Text style={styles.sectionTitle}>{section.title}</Text>
        <Ionicons 
          name={expandedSection === section.id ? "chevron-up" : "chevron-down"} 
          size={20} 
          color="rgba(255, 255, 255, 0.7)" 
        />
      </TouchableOpacity>
      {expandedSection === section.id && (
        <View style={styles.sectionContent}>
          <Text style={styles.sectionText}>{section.content}</Text>
        </View>
      )}
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
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={styles.placeholderIcon} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Introduction */}
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>Privacy Policy</Text>
          <Text style={styles.introSubtitle}>Last Updated: January 15, 2024</Text>
          <Text style={styles.introText}>
            At SkillB, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and services.
          </Text>
        </View>

        {/* Quick Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Quick Summary</Text>
          <View style={styles.summaryPoints}>
            <View style={styles.summaryPoint}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text style={styles.summaryPointText}>We don't sell your personal data</Text>
            </View>
            <View style={styles.summaryPoint}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text style={styles.summaryPointText}>You control your information</Text>
            </View>
            <View style={styles.summaryPoint}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text style={styles.summaryPointText}>We use industry-standard security</Text>
            </View>
            <View style={styles.summaryPoint}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text style={styles.summaryPointText}>Transparent data practices</Text>
            </View>
          </View>
        </View>

        {/* Privacy Sections */}
        <View style={styles.sectionsContainer}>
          <Text style={styles.sectionsTitle}>Privacy Policy Details</Text>
          {privacySections.map(renderSection)}
        </View>

        {/* Contact Information */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Questions About Privacy?</Text>
          <Text style={styles.contactDescription}>
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </Text>
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Ionicons name="mail-outline" size={20} color="#FFFFFF" />
              <Text style={styles.contactText}>privacy@skillb.com</Text>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="call-outline" size={20} color="#FFFFFF" />
              <Text style={styles.contactText}>+234 800 123 4567</Text>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="location-outline" size={20} color="#FFFFFF" />
              <Text style={styles.contactText}>Lagos, Nigeria</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            This Privacy Policy is effective as of January 15, 2024, and will remain in effect except with respect to any changes in its provisions in the future.
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
  placeholderIcon: {
    width: 24,
    height: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  introSection: {
    marginBottom: 25,
  },
  introTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  introSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 15,
  },
  introText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 24,
  },
  summaryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  summaryPoints: {
    gap: 10,
  },
  summaryPoint: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryPointText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginLeft: 10,
  },
  sectionsContainer: {
    marginBottom: 25,
  },
  sectionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 10,
  },
  sectionContent: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
  },
  contactSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  contactDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
    marginBottom: 15,
  },
  contactInfo: {
    gap: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  footer: {
    paddingVertical: 30,
    paddingBottom: 50,
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default PrivacyPolicyScreen;
