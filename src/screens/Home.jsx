// src/components/Home.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  RefreshControl,
} from 'react-native';
import useAuth from '../hooks/useAuth';
import { ActivityIndicator, Card, Searchbar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Avatar, Title, Paragraph } from 'react-native-paper';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useFirestore from '../hooks/useFirestore';
import { useCallback } from 'react';
import CategoryPanel from './categories/CategoryPanel';
import { COLORS } from '../Theme/colors';

const Home = () => {
  const [ads, setAds] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { getAllAds, loading } = useFirestore();
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = useCallback(async () => {
    setRefreshing(true);
    const fetchedAds = await getAllAds();
    setAds(fetchedAds);
    setRefreshing(false);
  }, [getAllAds]);

  const onRefresh = useCallback(() => {
    fetchAds();
  }, [fetchAds]);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!query) {
      fetchAds();
    } else {
      const filteredAds = ads.filter((ad) =>
        ad.title.toLowerCase().includes(query.toLowerCase())
      );

      setAds(filteredAds);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Searchbar
          placeholder='Search Ads'
          style={styles.searchbar}
          icon={() => (
            <Ionicons name='ios-search' size={25} color={COLORS.secondary} />
          )}
          value={searchQuery}
          onChangeText={handleSearch}
          // set close icon visible only when search query is not empty
        />
        <Pressable onPress={() => navigation.navigate('Profile')}>
          <Avatar.Image
            size={50}
            source={{ uri: currentUser?.profileImageUrl || undefined }}
          />
        </Pressable>
      </View>
      <FlatList
        ListHeaderComponent={
          <>
            <CategoryPanel />
            {/* Make it disappear on scroll */}

            <Text style={styles.headerText}>Latest Ads</Text>
          </>
        }
        data={ads}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.adCard}>
            <AdCard ad={item} />
          </View>
        )}
        style={styles.adsList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const AdCard = ({ ad }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate('AdDetails', { ad })}
      style={{ marginBottom: 10 }}
    >
      <Card style={styles.adCard}>
        <Card.Cover source={{ uri: ad.images[0] }} style={styles.adCardCover} />
        <Card.Content>
          <Title style={styles.adTitle} numberOfLines={1} ellipsizeMode='tail'>
            {ad.title}
          </Title>
          <Paragraph
            style={styles.adDescription}
            numberOfLines={2}
            ellipsizeMode='tail'
          >
            {ad.description}
          </Paragraph>
          <Paragraph style={styles.adPrice}>Rs. {ad.price}</Paragraph>
        </Card.Content>
        <Card.Actions>
          {/* <Button title='View Details' onPress={() => {}} /> */}
        </Card.Actions>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  adCardCover: {
    borderRadius: 0,
  },
  searchbar: {
    borderRadius: 50,
    flex: 1,
    marginRight: 10,
  },
  adCard: {
    marginVertical: 3,
    borderRadius: 0,
    elevation: 0,
    // borderWidth: 1,
  },
  adTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  adDescription: {
    fontSize: 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  adPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  adsList: {
    flex: 1,
    paddingVertical: 10,
  },
});

export default Home;
