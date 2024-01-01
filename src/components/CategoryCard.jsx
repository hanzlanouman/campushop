import React from 'react';
import { StyleSheet, View, TouchableOpacity, Pressable } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const CategoryCard = ({ category, icon, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Card style={styles.card}>
        <View style={styles.cardImage}>
          <Ionicons name={icon} size={50} color='#7a29ff' />
        </View>
        <Title style={styles.cardTitleText}>{category}</Title>
      </Card>
    </Pressable>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    width: 100,
    height: 110,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 3,
  },
  cardImage: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
});
