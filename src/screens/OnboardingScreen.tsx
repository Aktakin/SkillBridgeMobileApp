import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { OnboardingSlide } from '../types';

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
  onFinish: () => void;
}

const onboardingData: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Find Skilled Professionals',
    description: 'Discover talented professionals in your area for any service you need - from home repairs to creative work.',
    image: '👨‍🔧',
  },
  {
    id: 2,
    title: 'Offer Your Skills',
    description: 'Showcase your expertise and connect with people who need your services. Turn your skills into income.',
    image: '💼',
  },
  {
    id: 3,
    title: 'Secure & Reliable',
    description: 'All transactions are secure with built-in payment protection and verified professional profiles.',
    image: '🔒',
  },
  {
    id: 4,
    title: 'Get Started Today',
    description: 'Join thousands of professionals and clients who trust SkillB for their service needs.',
    image: '🚀',
  },
];

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const scrollToNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      onFinish();
    }
  };

  const scrollToPrevious = () => {
    if (currentIndex > 0) {
      slidesRef.current?.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <View style={styles.slide}>
      <View style={styles.imageContainer}>
        <Text style={styles.emoji}>{item.image}</Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  const renderPagination = () => {
    return (
      <View style={styles.pagination}>
        {onboardingData.map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.paginationDot,
              {
                backgroundColor: index === currentIndex ? '#FFFFFF' : 'rgba(255, 255, 255, 0.3)',
                width: index === currentIndex ? 20 : 8,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <StatusBar style="light" />
      
      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={onFinish} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={slidesRef}
        data={onboardingData}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={32}
      />

      {renderPagination()}

      <View style={styles.buttonContainer}>
        {currentIndex > 0 && (
          <TouchableOpacity onPress={scrollToPrevious} style={styles.previousButton}>
            <Text style={styles.previousButtonText}>Previous</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity onPress={scrollToNext} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>
            {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipContainer: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
  },
  skipButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  skipText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  emoji: {
    fontSize: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 26,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 50,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  previousButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  previousButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    flex: 1,
    marginLeft: 20,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OnboardingScreen;
