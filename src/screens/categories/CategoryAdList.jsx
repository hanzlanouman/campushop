import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const CategoryAdList = ({ route }) => {
  console.log('CategoryAdList');
  console.log(route.params);
  return (
    <View>
      <Text>This is the List of Ads According to the category selected</Text>
    </View>
  );
};

export default CategoryAdList;

const styles = StyleSheet.create({});
