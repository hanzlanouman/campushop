import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { COLORS } from '../Theme/colors';

const CustomSearchBar = ({ onSearch, initialValue = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchPress = () => {
    onSearch(searchQuery);
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder='Search...'
        placeholderTextColor='#000' // Placeholder text color
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearchPress}
        returnKeyLabel='Search'
        returnKeyType='search'
      />
      <TouchableOpacity
        style={styles.searchIconContainer}
        onPress={handleSearchPress}
      >
        {/* You can replace this Image with an icon from a library like react-native-vector-icons if you prefer */}
        <Ionicons
          name='ios-search'
          size={30}
          color={COLORS.primary} // Icon color
          style={styles.searchIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5', // Light grey background
    borderRadius: 100,
    alignItems: 'center',
    paddingHorizontal: 0,
    marginLeft: 20,
    marginRight: 30,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent', 
    paddingVertical: 13,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#000',
  },
  searchIconContainer: {
    borderRadius: 50,
    padding: 10,
  },
});

export default CustomSearchBar;
