import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import useFirestore from '../hooks/useFirestore'; // Import your useFirestore hook
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../Theme/colors';
import AdCard from './AdCard';

const MyAds = () => {
  const [userAds, setUserAds] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { getUserAds, loading } = useFirestore(); // Assuming getUserAds is part of useFirestore

  useEffect(() => {
    fetchUserAds();
  }, []);

  const fetchUserAds = useCallback(async () => {
    setRefreshing(true);
    const fetchedAds = await getUserAds(); // Replace with your method to fetch user-specific ads
    setUserAds(fetchedAds);
    setRefreshing(false);
  }, [getUserAds]);

  const onRefresh = useCallback(() => {
    fetchUserAds();
  }, [fetchUserAds]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Ads</Text>
      <FlatList
        data={userAds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AdCard ad={item} />} // Assuming AdCard is a component you have
        style={styles.adsList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adsList: {
    marginTop: 10,
  },
  adImage: {
    borderRadius: 0,
  },
  adCard: {
    // Styles for your AdCard component
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.primary,
  },

  // Add other styles as needed
});

export default MyAds;
