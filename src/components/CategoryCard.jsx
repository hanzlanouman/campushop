import React from 'react';
import { StyleSheet, View, TouchableOpacity, Pressable } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../Theme/colors';

const CategoryCard = ({ category, icon, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.cardImage}>
          <Ionicons
            name={icon}
            size={40}
            color={
              COLORS.random[Math.floor(Math.random() * COLORS.random.length)]
            }
          />
        </View>
      </View>
      <Title style={styles.cardTitleText}>{category}</Title>
    </Pressable>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 10,
    // width: 100,
    // height: 110,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    elevation: 3,
  },
  cardImage: {
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitleText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#555',
    textAlign: 'center',
    marginBottom: 5,
  },
});
