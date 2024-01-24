import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import useFirestore from '../../hooks/useFirestore';
import { useRoute } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../Theme/colors';

import AdCard from '../AdCard';

// Assuming getCategorizedAds is a method in useFirestore hook
const CategoryAdList = () => {
  const [ads, setAds] = useState([]);
  const { getCategorizedAds, loading } = useFirestore();
  const [refreshing, setRefreshing] = useState(false);

  // Category is in another navigator, so we need to use useRoute instead of useNavigation
  const route = useRoute();

  const fetchAds = async () => {
    setRefreshing(true);
    const category = route.params?.category || 'phones'; // Fallback to 'phones' if no category is specified
    const fetchedAds = await getCategorizedAds(category);
    setAds(fetchedAds);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchAds();
  }, [route.params?.category]);

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
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder='Search Ads'
        style={styles.searchbar}
        icon={() => (
          <Ionicons name='ios-search' size={25} color={COLORS.secondary} />
        )}
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={ads}
        ListHeaderComponent={() => (
          <Text style={styles.headerText}>
            {`Ads in ${
              route.params?.category[0].toUpperCase() +
              route.params?.category.slice(1)
            }`}
          </Text>
        )}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <AdCard ad={item} />}
        style={styles.adsList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchAds} />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,

    backgroundColor: '#fff',
    marginTop: 50,
  },
  adsList: {
    // Add your styles for FlatList
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default CategoryAdList;
