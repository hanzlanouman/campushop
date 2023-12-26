import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AdDetails = ({ navigation, route }) => {
  const { ad } = route.params;
  return (
    <View>
      <Text>Ad Details</Text>
      <Text>{ad.title}</Text>
      <Text>{ad.description}</Text>
      <Text>{ad.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AdDetails;
