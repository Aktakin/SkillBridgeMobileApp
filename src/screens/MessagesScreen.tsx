import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface Message {
  id: string;
  senderName: string;
  senderAvatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  serviceTitle?: string;
}

const mockMessages: Message[] = [
  {
    id: '1',
    senderName: 'Sarah Johnson',
    senderAvatar: '👩',
    lastMessage: 'Hi! I can start the cleaning service tomorrow at 10 AM. Is that okay?',
    timestamp: '2 min ago',
    unreadCount: 2,
    isOnline: true,
    serviceTitle: 'House Cleaning',
  },
  {
    id: '2',
    senderName: 'Mike Wilson',
    senderAvatar: '👨',
    lastMessage: 'The plumbing issue has been fixed. Please confirm if everything is working properly.',
    timestamp: '1 hour ago',
    unreadCount: 0,
    isOnline: false,
    serviceTitle: 'Plumbing Repair',
  },
  {
    id: '3',
    senderName: 'David Brown',
    senderAvatar: '👨',
    lastMessage: 'Thank you for the great service! I\'ll definitely book again.',
    timestamp: '3 hours ago',
    unreadCount: 0,
    isOnline: true,
    serviceTitle: 'Electrical Work',
  },
  {
    id: '4',
    senderName: 'Emma Davis',
    senderAvatar: '👩',
    lastMessage: 'Can you provide a quote for painting my living room?',
    timestamp: '1 day ago',
    unreadCount: 1,
    isOnline: false,
    serviceTitle: 'Painting Service',
  },
];

interface MessagesScreenProps {
  onBackPress: () => void;
  onMessagePress: (message: Message) => void;
  onHomePress: () => void;
  onBookingsPress: () => void;
  onProfilePress: () => void;
}

const MessagesScreen: React.FC<MessagesScreenProps> = ({ onBackPress, onMessagePress, onHomePress, onBookingsPress, onProfilePress }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages = mockMessages.filter(message =>
    message.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.serviceTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderMessageCard = (message: Message) => (
    <TouchableOpacity
      key={message.id}
      style={styles.messageCard}
      onPress={() => onMessagePress(message)}
    >
      <View style={styles.avatarContainer}>
        <Text style={styles.avatar}>{message.senderAvatar}</Text>
        {message.isOnline && <View style={styles.onlineIndicator} />}
      </View>

      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <View style={styles.senderInfo}>
            <Text style={styles.senderName}>{message.senderName}</Text>
            {message.serviceTitle && (
              <Text style={styles.serviceTitle}>{message.serviceTitle}</Text>
            )}
          </View>
          <View style={styles.messageMeta}>
            <Text style={styles.timestamp}>{message.timestamp}</Text>
            {message.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>{message.unreadCount}</Text>
              </View>
            )}
          </View>
        </View>

        <Text style={styles.lastMessage} numberOfLines={2}>
          {message.lastMessage}
        </Text>
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
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="rgba(255, 255, 255, 0.7)" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations..."
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

      {/* Messages List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredMessages.length > 0 ? (
          filteredMessages.map(renderMessageCard)
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="chatbubbles-outline" size={64} color="rgba(255, 255, 255, 0.5)" />
            <Text style={styles.emptyTitle}>No Messages</Text>
            <Text style={styles.emptyDescription}>
              {searchQuery ? 'No conversations match your search.' : 'Messages will appear here once you accept to work with someone or when someone accepts your service offer.'}
            </Text>
            {!searchQuery && (
              <TouchableOpacity style={styles.exploreButton}>
                <Text style={styles.exploreButtonText}>Find Services</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={onHomePress}>
          <Ionicons name="home" size={24} color="rgba(255, 255, 255, 0.7)" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={onBookingsPress}>
          <Ionicons name="calendar-outline" size={24} color="rgba(255, 255, 255, 0.7)" />
          <Text style={styles.navText}>Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="mail-outline" size={24} color="#FFFFFF" />
          <Text style={[styles.navText, styles.activeNavText]}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={onProfilePress}>
          <Ionicons name="person-outline" size={24} color="rgba(255, 255, 255, 0.7)" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
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
  menuButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInputContainer: {
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messageCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    fontSize: 32,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    textAlign: 'center',
    lineHeight: 50,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  senderInfo: {
    flex: 1,
  },
  senderName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  serviceTitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  messageMeta: {
    alignItems: 'flex-end',
  },
  timestamp: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  unreadBadge: {
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  exploreButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  exploreButtonText: {
    fontSize: 16,
    color: '#667eea',
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
  },
  activeNavText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default MessagesScreen;
