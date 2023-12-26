// src/components/Home.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Pressable } from 'react-native';
import useAuth from '../hooks/useAuth';
import { Card, Searchbar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Avatar, Title, Paragraph } from 'react-native-paper';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [ads, setAds] = useState([
    {
      id: '1',
      title: 'iPhone 11 Pro',
      description: 'Brand new iPhone 12 Pro Max',
      price: 2000,
      images: [
        'https://images.unsplash.com/photo-1606784887872-4d4b7e9a2b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
      ],
    },
    {
      id: '2',
      title: 'iPhone 12 Pro Max',
      description: 'Brand new iPhone 12 Pro Max',
      price: 2000,
      images: [
        'https://images.unsplash.com/photo-1606784887872-4d4b7e9a2b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
      ],
    },
    {
      id: '3',
      title: 'iPhone X Pro Max',
      description: 'Brand new iPhone 12 Pro Max',
      price: 2000,
      images: [
        'https://images.unsplash.com/photo-1606784887872-4d4b7e9a2b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
      ],
    },
    {
      id: '4',
      title: 'iPhone 14 Pro Max',
      description: 'Brand new iPhone 12 Pro Max',
      price: 2000,
      images: [
        // add picsum images
        'https://images.unsplash.com/photo-1606784887872-4d4b7e9a2jb0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
      ],
    },
    {
      id: '5',
      title: 'iPhone 13 Pro Max',
      description: 'Brand new iPhone 12 Pro Max',
      price: 2000,
      images: [
        'https://images.unsplash.com/photo-1606784887872-4d4b7e9a2b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
      ],
    },
  ]);

  const filterSearch = (text) => {
    const newData = ads.filter((item) => {
      const itemData = item.title.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setAds(newData);
  };

  return (
    <View style={styles.container}>
      <View>
        <Searchbar
          placeholder='Search Ads'
          style={styles.searchbar}
          icon={() => <Ionicons name='ios-search' size={25} color='#7a29ff' />}
          onIconPress={() => console.log('Pressed')}
          rippleColor={'#7a29ff'}
          elevation={3}
          inputStyle={{ fontSize: 18 }}
          onChangeText={(text) => filterSearch(text)}
        />
      </View>
      <FlatList
        data={ads}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AdCard ad={item} />}
        style={styles.adsList}
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
        <Card.Cover source={{ uri: ad.images[0] }} />
        <Card.Content>
          <Title>{ad.title}</Title>
          <Paragraph>{ad.description}</Paragraph>
          <Paragraph style={styles.adPrice}>${ad.price}</Paragraph>
        </Card.Content>
        <Card.Actions></Card.Actions>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  searchbar: {
    borderRadius: 50,
  },
  adCard: {
    marginVertical: 10,
  },
  adTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  adDescription: {
    fontSize: 16,
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
