import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import useFirestore from '../hooks/useFirestore';
import CustomSearchBar from '../components/CustomSearchBar';
import AdCard from './AdCard'; // Assuming you have an AdCard component styled similarly to the one in Home

const SearchAllAds = ({ route }) => {
  const [ads, setAds] = useState([]);
  const { searchAds, loading } = useFirestore();
  const { searchTerm } = route.params;

  useEffect(() => {
    performSearch(searchTerm);
  }, [searchTerm]);

  const performSearch = async (term, newSearch = false) => {
    const fetchedAds = await searchAds(term, newSearch);
    if (newSearch) {
      setAds(fetchedAds);
    } else {
      setAds((prevAds) => [...prevAds, ...fetchedAds]);
    }
  };

  const handleEndReached = () => {
    if (!loading) {
      performSearch(searchTerm);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchbarContainer}>
        <CustomSearchBar
          onSearch={(newQuery) => performSearch(newQuery, true)}
          initialValue={searchTerm}
        />
      </View>
      <FlatList
        data={ads}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AdCard ad={item} />}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => performSearch(searchTerm, true)}
          />
        }
        contentContainerStyle={styles.adsList}
        showsVerticalScrollIndicator={false}
      />
      {loading && !ads.length && (
        <ActivityIndicator size='large' style={styles.activityIndicator} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  adsList: {
    paddingVertical: 10,
  },
  searchbarContainer: {
    marginBottom: 10,
    paddingHorizontal: -20,
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchAllAds;
