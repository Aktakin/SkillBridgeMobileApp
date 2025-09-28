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

interface TermsOfServiceScreenProps {
  onBackPress: () => void;
}

const TermsOfServiceScreen: React.FC<TermsOfServiceScreenProps> = ({ onBackPress }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const termsSections = [
    {
      id: '1',
      title: 'Acceptance of Terms',
      content: `By accessing and using the SkillB mobile application and services, you accept and agree to be bound by the terms and provision of this agreement.

Your Agreement:
• You agree to use the service in compliance with these terms
• You acknowledge that you have read and understood the terms
• You agree to be legally bound by these terms
• You represent that you have the legal capacity to enter into this agreement

If you do not agree to abide by the above, please do not use this service.`,
    },
    {
      id: '2',
      title: 'Description of Service',
      content: `SkillB is a mobile application that connects service providers with clients seeking various services.

Our Platform Provides:
• Service listing and discovery
• Booking and scheduling system
• Payment processing and management
• Communication tools between users
• Review and rating system
• User profile management

Service Categories Include:
• Home services (cleaning, plumbing, electrical)
• Professional services (tutoring, photography)
• Personal services (beauty, fitness)
• Delivery and transportation services
• And other skill-based services

We reserve the right to modify, suspend, or discontinue any aspect of the service at any time.`,
    },
    {
      id: '3',
      title: 'User Accounts and Registration',
      content: `To use our services, you must create an account and provide accurate information.

Account Requirements:
• Provide accurate and complete information
• Maintain the security of your account credentials
• Notify us immediately of any unauthorized use
• You are responsible for all activities under your account

Account Types:
• Service Providers: Users who offer services
• Service Seekers: Users who book services
• Both: Users who can offer and seek services

We reserve the right to refuse service, terminate accounts, or remove content at our sole discretion.`,
    },
    {
      id: '4',
      title: 'User Responsibilities',
      content: `All users must comply with the following responsibilities:

Service Providers Must:
• Provide accurate service descriptions
• Complete booked services as agreed
• Maintain professional standards
• Respond to client communications promptly
• Honor pricing and scheduling commitments

Service Seekers Must:
• Provide accurate booking information
• Pay for services as agreed
• Treat service providers with respect
• Provide honest reviews and feedback
• Communicate clearly about requirements

General Responsibilities:
• Comply with all applicable laws and regulations
• Respect other users' rights and privacy
• Report any violations or safety concerns
• Maintain appropriate insurance coverage (for providers)`,
    },
    {
      id: '5',
      title: 'Prohibited Activities',
      content: `The following activities are strictly prohibited on our platform:

Illegal Activities:
• Any illegal or fraudulent activities
• Violation of local, state, or federal laws
• Money laundering or financial crimes
• Identity theft or impersonation

Harmful Content:
• Harassment, threats, or intimidation
• Discriminatory or hateful content
• Spam or unsolicited communications
• Malicious software or viruses

Platform Abuse:
• Creating multiple accounts to circumvent restrictions
• Manipulating ratings or reviews
• Attempting to hack or compromise the platform
• Violating intellectual property rights

Commercial Restrictions:
• Selling services outside the platform
• Soliciting users for other platforms
• Unauthorized commercial use of the platform
• Price manipulation or unfair competition`,
    },
    {
      id: '6',
      title: 'Payment Terms',
      content: `Payment processing and financial terms for our services:

Payment Methods:
• Credit and debit cards
• Bank transfers
• Mobile money services
• Digital wallets

Payment Processing:
• Payments are processed securely through third-party providers
• We may hold funds temporarily for security purposes
• Refunds are subject to our refund policy
• Service fees are clearly disclosed before booking

Service Provider Payments:
• Payments are released after service completion
• Processing time may vary by payment method
• Tax obligations are the responsibility of service providers
• We may withhold payments for policy violations

Disputes and Chargebacks:
• Users must attempt to resolve disputes directly first
• We provide dispute resolution assistance
• Chargebacks may result in account restrictions
• False chargebacks are prohibited`,
    },
    {
      id: '7',
      title: 'Cancellation and Refund Policy',
      content: `Our cancellation and refund policies ensure fair treatment for all users:

Cancellation Timeframes:
• Free cancellation up to 24 hours before service
• Cancellation fees may apply for last-minute cancellations
• Emergency cancellations are handled case-by-case
• No-show policies apply to both parties

Refund Eligibility:
• Service not provided as described
• Provider fails to show up
• Safety or quality concerns
• Technical issues preventing service delivery

Refund Process:
• Refunds are processed within 5-7 business days
• Original payment method is used for refunds
• Processing fees may not be refundable
• Disputed refunds require investigation

Provider Cancellations:
• Providers must give reasonable notice
• Repeated cancellations may result in account restrictions
• Emergency situations are handled with understanding
• Alternative providers may be suggested`,
    },
    {
      id: '8',
      title: 'Intellectual Property Rights',
      content: `Intellectual property rights and content ownership:

Platform Content:
• SkillB owns all platform design, code, and functionality
• Users retain ownership of their content and services
• We may use anonymized data for platform improvement
• Trademark and copyright protections apply

User Content:
• Users grant us license to display their content
• Users are responsible for content they upload
• We may remove content that violates our policies
• Users must have rights to any content they share

Service Listings:
• Service descriptions must be original or properly licensed
• Images must be owned by the user or properly licensed
• False or misleading content is prohibited
• Intellectual property violations will result in content removal

Protection of Rights:
• We respect intellectual property rights
• Users must respect others' intellectual property
• Reporting mechanisms are available for violations
• Legal action may be taken for serious violations`,
    },
    {
      id: '9',
      title: 'Privacy and Data Protection',
      content: `We are committed to protecting your privacy and personal data:

Data Collection:
• We collect only necessary information for service provision
• User consent is required for data collection
• Data is used in accordance with our Privacy Policy
• Users can control their privacy settings

Data Security:
• Industry-standard security measures are implemented
• Personal data is encrypted and protected
• Regular security audits are conducted
• Breach notification procedures are in place

Data Sharing:
• Data is not sold to third parties
• Limited sharing with service providers as necessary
• Legal compliance may require data disclosure
• Users can request data deletion or modification

Cookies and Tracking:
• Essential cookies are required for functionality
• Optional cookies require user consent
• Users can manage cookie preferences
• Analytics help improve our services`,
    },
    {
      id: '10',
      title: 'Limitation of Liability',
      content: `Our liability is limited as follows:

Service Availability:
• We do not guarantee uninterrupted service
• Technical issues may occur
• Maintenance may require temporary service suspension
• We are not liable for third-party service failures

User Interactions:
• We facilitate connections but do not control user behavior
• Users are responsible for their own actions
• We are not liable for disputes between users
• Background checks are not performed on all users

Financial Limitations:
• Our liability is limited to the amount paid for services
• We are not liable for indirect or consequential damages
• Force majeure events may limit our liability
• Insurance coverage may be required for certain services

Disclaimers:
• Services are provided "as is" without warranties
• We do not guarantee service quality or outcomes
• Users assume risks associated with service provision
• Professional advice should be sought when appropriate`,
    },
    {
      id: '11',
      title: 'Termination',
      content: `Account termination policies and procedures:

Termination by Users:
• Users can terminate their accounts at any time
• Account deletion removes personal data
• Some data may be retained for legal compliance
• Outstanding obligations must be fulfilled

Termination by SkillB:
• We may terminate accounts for policy violations
• Repeated violations may result in permanent bans
• Safety concerns may result in immediate termination
• Users will be notified of termination reasons

Consequences of Termination:
• Access to the platform will be revoked
• Outstanding payments will be processed
• User content may be removed
• Legal obligations remain in effect

Appeal Process:
• Users can appeal termination decisions
• Appeals must be submitted within 30 days
• We will review appeals fairly and promptly
• Final decisions are binding`,
    },
    {
      id: '12',
      title: 'Governing Law and Disputes',
      content: `Legal framework and dispute resolution:

Governing Law:
• These terms are governed by Nigerian law
• Local laws may also apply
• International users are subject to applicable laws
• Jurisdiction is in Lagos, Nigeria

Dispute Resolution:
• Users should attempt direct resolution first
• We provide mediation services
• Arbitration may be required for certain disputes
• Legal action should be a last resort

Class Action Waiver:
• Users waive the right to class action lawsuits
• Disputes must be resolved individually
• This does not affect consumer protection rights
• Legal representation is allowed

Enforcement:
• We reserve the right to enforce these terms
• Legal action may be taken for violations
• Injunctive relief may be sought
• Costs and fees may be recoverable`,
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
        <Text style={styles.headerTitle}>Terms of Service</Text>
        <View style={styles.placeholderIcon} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Introduction */}
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>Terms of Service</Text>
          <Text style={styles.introSubtitle}>Last Updated: January 15, 2024</Text>
          <Text style={styles.introText}>
            These Terms of Service ("Terms") govern your use of the SkillB mobile application and services. By using our platform, you agree to these terms and our Privacy Policy.
          </Text>
        </View>

        {/* Quick Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Key Points</Text>
          <View style={styles.summaryPoints}>
            <View style={styles.summaryPoint}>
              <Ionicons name="shield-checkmark" size={16} color="#4CAF50" />
              <Text style={styles.summaryPointText}>Safe and secure platform</Text>
            </View>
            <View style={styles.summaryPoint}>
              <Ionicons name="people" size={16} color="#4CAF50" />
              <Text style={styles.summaryPointText}>Fair treatment for all users</Text>
            </View>
            <View style={styles.summaryPoint}>
              <Ionicons name="card" size={16} color="#4CAF50" />
              <Text style={styles.summaryPointText}>Secure payment processing</Text>
            </View>
            <View style={styles.summaryPoint}>
              <Ionicons name="handshake" size={16} color="#4CAF50" />
              <Text style={styles.summaryPointText}>Clear dispute resolution</Text>
            </View>
          </View>
        </View>

        {/* Terms Sections */}
        <View style={styles.sectionsContainer}>
          <Text style={styles.sectionsTitle}>Terms of Service Details</Text>
          {termsSections.map(renderSection)}
        </View>

        {/* Contact Information */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Questions About Terms?</Text>
          <Text style={styles.contactDescription}>
            If you have any questions about these Terms of Service, please contact us:
          </Text>
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Ionicons name="mail-outline" size={20} color="#FFFFFF" />
              <Text style={styles.contactText}>legal@skillb.com</Text>
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

        {/* Agreement */}
        <View style={styles.agreementSection}>
          <Text style={styles.agreementTitle}>Agreement</Text>
          <Text style={styles.agreementText}>
            By using SkillB, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            These Terms of Service are effective as of January 15, 2024, and will remain in effect until modified or terminated.
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
  agreementSection: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.3)',
  },
  agreementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  agreementText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
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

export default TermsOfServiceScreen;
