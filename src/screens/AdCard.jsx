import React, { useState, useEffect } from 'react';
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
          <Title style={styles.adTitle} numberOfLines={1} ellipsizeMode='tail'>
            {ad.title}
          </Title>
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
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  searchbar: {
    borderRadius: 50,
    flex: 1,
    marginRight: 10,
  },
  adCard: {
    marginVertical: 10,
  },
  adTitle: {
    fontSize: 20,
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

export default AdCard;
