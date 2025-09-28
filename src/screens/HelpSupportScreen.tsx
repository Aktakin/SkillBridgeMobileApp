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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface HelpSupportScreenProps {
  onBackPress: () => void;
}

const HelpSupportScreen: React.FC<HelpSupportScreenProps> = ({ onBackPress }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqData: FAQItem[] = [
    {
      id: '1',
      question: 'How do I create a service listing?',
      answer: 'To create a service listing, go to the "Offer Skills" section from the main screen, tap the "+" button, and fill in your service details including title, description, price, and category.',
      category: 'Getting Started',
    },
    {
      id: '2',
      question: 'How do I book a service?',
      answer: 'Browse services in the "Find Services" section, select a category, choose a service provider, and tap "Book Now" to send a booking request.',
      category: 'Booking',
    },
    {
      id: '3',
      question: 'How do I contact a service provider?',
      answer: 'You can contact service providers by tapping the "Contact" button on their service details page. This will open a chat conversation.',
      category: 'Communication',
    },
    {
      id: '4',
      question: 'How do I get paid for my services?',
      answer: 'Set up your payment methods in the Profile section under "Payment Methods". You can add bank accounts, cards, or mobile money options.',
      category: 'Payments',
    },
    {
      id: '5',
      question: 'How do I cancel a booking?',
      answer: 'Go to your Bookings section, find the booking you want to cancel, and tap the "Cancel" button. Note that cancellation policies may apply.',
      category: 'Booking',
    },
    {
      id: '6',
      question: 'How do I rate and review a service?',
      answer: 'After completing a service, you can rate and review it in your Bookings section. Tap on the completed booking and select "Rate & Review".',
      category: 'Reviews',
    },
    {
      id: '7',
      question: 'What if I have a dispute with a service provider?',
      answer: 'Contact our support team immediately. We have a dispute resolution process to help resolve conflicts between users and service providers.',
      category: 'Support',
    },
    {
      id: '8',
      question: 'How do I update my profile information?',
      answer: 'Go to Profile > Edit Profile to update your personal information, bio, specialties, and other profile details.',
      category: 'Profile',
    },
  ];

  const categories = ['all', 'Getting Started', 'Booking', 'Communication', 'Payments', 'Reviews', 'Support', 'Profile'];

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const renderFAQItem = (faq: FAQItem) => (
    <TouchableOpacity
      key={faq.id}
      style={styles.faqItem}
      onPress={() => toggleFAQ(faq.id)}
    >
      <View style={styles.faqHeader}>
        <Text style={styles.faqQuestion}>{faq.question}</Text>
        <Ionicons 
          name={expandedFAQ === faq.id ? "chevron-up" : "chevron-down"} 
          size={20} 
          color="rgba(255, 255, 255, 0.7)" 
        />
      </View>
      {expandedFAQ === faq.id && (
        <View style={styles.faqAnswer}>
          <Text style={styles.faqAnswerText}>{faq.answer}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderCategoryButton = (category: string) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryButton,
        selectedCategory === category && styles.activeCategoryButton,
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text style={[
        styles.categoryButtonText,
        selectedCategory === category && styles.activeCategoryButtonText,
      ]}>
        {category === 'all' ? 'All' : category}
      </Text>
    </TouchableOpacity>
  );

  const contactSupport = () => {
    Alert.alert(
      'Contact Support',
      'Choose how you\'d like to contact our support team:',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Email Support', onPress: () => Alert.alert('Email', 'support@skillb.com') },
        { text: 'Phone Support', onPress: () => Alert.alert('Phone', '+234 800 123 4567') },
        { text: 'Live Chat', onPress: () => Alert.alert('Live Chat', 'Live chat feature coming soon!') },
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
        <Text style={styles.headerTitle}>Help & Support</Text>
        <TouchableOpacity style={styles.supportButton} onPress={contactSupport}>
          <Ionicons name="headset-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="rgba(255, 255, 255, 0.7)" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search help topics..."
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="rgba(255, 255, 255, 0.7)" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Quick Help Cards */}
        <View style={styles.quickHelpSection}>
          <Text style={styles.sectionTitle}>Quick Help</Text>
          <View style={styles.quickHelpGrid}>
            <TouchableOpacity style={styles.quickHelpCard}>
              <Ionicons name="play-circle-outline" size={32} color="#FFFFFF" />
              <Text style={styles.quickHelpTitle}>Getting Started</Text>
              <Text style={styles.quickHelpDescription}>Learn the basics</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickHelpCard}>
              <Ionicons name="card-outline" size={32} color="#FFFFFF" />
              <Text style={styles.quickHelpTitle}>Payments</Text>
              <Text style={styles.quickHelpDescription}>Payment guide</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickHelpCard}>
              <Ionicons name="shield-checkmark-outline" size={32} color="#FFFFFF" />
              <Text style={styles.quickHelpTitle}>Safety</Text>
              <Text style={styles.quickHelpDescription}>Stay safe</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickHelpCard}>
              <Ionicons name="settings-outline" size={32} color="#FFFFFF" />
              <Text style={styles.quickHelpTitle}>Account</Text>
              <Text style={styles.quickHelpDescription}>Manage account</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Browse by Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {categories.map(renderCategoryButton)}
          </ScrollView>
        </View>

        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>
            Frequently Asked Questions ({filteredFAQs.length})
          </Text>
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map(renderFAQItem)
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={48} color="rgba(255, 255, 255, 0.5)" />
              <Text style={styles.emptyTitle}>No Results Found</Text>
              <Text style={styles.emptyDescription}>
                Try adjusting your search or browse different categories
              </Text>
            </View>
          )}
        </View>

        {/* Contact Support */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Still Need Help?</Text>
          <View style={styles.contactCard}>
            <View style={styles.contactInfo}>
              <Ionicons name="headset" size={24} color="#FFFFFF" />
              <View style={styles.contactDetails}>
                <Text style={styles.contactTitle}>Contact Support</Text>
                <Text style={styles.contactDescription}>
                  Our support team is here to help you 24/7
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.contactButton} onPress={contactSupport}>
              <Text style={styles.contactButtonText}>Get Help</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfoSection}>
          <Text style={styles.appInfoTitle}>SkillB App</Text>
          <Text style={styles.appInfoVersion}>Version 1.0.0</Text>
          <Text style={styles.appInfoDescription}>
            Your trusted skills marketplace connecting service providers with clients
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
  supportButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchSection: {
    marginBottom: 25,
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
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  quickHelpSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  quickHelpGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickHelpCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  quickHelpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
    marginBottom: 5,
  },
  quickHelpDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  categoriesSection: {
    marginBottom: 25,
  },
  categoriesScroll: {
    flexDirection: 'row',
  },
  categoryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  activeCategoryButton: {
    backgroundColor: '#FFFFFF',
  },
  categoryButtonText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  activeCategoryButtonText: {
    color: '#667eea',
  },
  faqSection: {
    marginBottom: 25,
  },
  faqItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 10,
  },
  faqAnswer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  faqAnswerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 15,
    marginBottom: 10,
  },
  emptyDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 20,
  },
  contactSection: {
    marginBottom: 25,
  },
  contactCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactDetails: {
    marginLeft: 15,
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  contactDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  contactButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  contactButtonText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
  appInfoSection: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingBottom: 50,
  },
  appInfoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  appInfoVersion: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 10,
  },
  appInfoDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
});

export default HelpSupportScreen;
