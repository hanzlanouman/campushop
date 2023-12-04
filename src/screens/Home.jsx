import React from 'react';
import { View, Text, Button } from 'react-native';
import { Searchbar } from 'react-native-paper';
const Home = () => {
  return (
    <View>
      <Searchbar placeholder='Search' />

      <View>
        {/* Display all Ads here */}
        <Text>Ads</Text>
      </View>
    </View>
  );
};

export default Home;
