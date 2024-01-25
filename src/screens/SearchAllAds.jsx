import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import useFirestore from '../hooks/useFirestore';
import CustomSearchBar from '../components/CustomSearchBar';
import AdCard from './AdCard'; // Assuming you have an AdCard component styled similarly to the one in Home
import useAuth from '../hooks/useAuth';

const SearchAllAds = ({ route, navigation }) => {
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

  const { currentUser } = useAuth();
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <CustomSearchBar
          onSearch={(newQuery) => performSearch(newQuery, true)}
          initialValue={searchTerm}
        />
        <Pressable onPress={() => navigation.navigate('Profile')}>
          <Avatar.Image
            size={50}
            source={{ uri: currentUser?.profileImageUrl || undefined }}
          />
        </Pressable>
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
      {ads.length === 0 && !loading && (
        <>
          <Text style={styles.NoAdsFound}>
            No ads found
            <Text style={styles.NoAdsSuggestion}>
              {'\n'}Try searching for something else!
            </Text>
          </Text>
        </>
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  NoAdsFound: {
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 10,
    fontSize: 32,
  },
  NoAdsSuggestion: {
    textAlign: 'center',
    lineHeight: 40,
    fontSize: 20,
    fontWeight: 'normal',
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
