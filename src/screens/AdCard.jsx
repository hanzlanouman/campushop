import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { Card, Title, Paragraph, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../Theme/colors';
import useFirestore from '../hooks/useFirestore'; // Import useFirestore hook

const AdCard = ({ ad, ownAd }) => {
  const navigation = useNavigation();
  const { updateAdStatus } = useFirestore();
  const [isActive, setIsActive] = useState(ad.isActive);

  useEffect(() => {
    setIsActive(ad.isActive);
  }, [ad.isActive]);

  const toggleIsActive = async () => {
    const newIsActive = !isActive;
    setIsActive(newIsActive);
    await updateAdStatus(ad.id, newIsActive);
  };
  return (
    <Pressable
      onPress={() => navigation.navigate('AdDetails', { ad })}
      style={styles.cardPressable}
    >
      <Card style={styles.adCard}>
        <Card.Cover source={{ uri: ad.images[0] }} style={styles.adCardCover} />
        <Card.Content>
          <Title style={styles.adTitle} numberOfLines={1} ellipsizeMode='tail'>
            {ad.title}
          </Title>
          {/* <Paragraph
            style={styles.adDescription}
            numberOfLines={2}
            ellipsizeMode='tail'
          >
            {ad.description}
          </Paragraph> */}
          <Paragraph style={styles.adPrice}>Rs. {ad.price}</Paragraph>
          <Paragraph style={styles.adLocation}>{ad.location}</Paragraph>
          <Paragraph style={styles.adDate}>
            {/* it  is a firebase date */}Posted on{' '}
            {new Date(ad.createdAt?.toDate()).toDateString()}
          </Paragraph>
        </Card.Content>
        {ownAd && (
          <Card.Actions style={styles.cardActions}>
            {/* A Line Divider */}

            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: isActive ? COLORS.secondary : '#777',
              }}
            >
              Active
            </Text>
            <Switch
              trackColor={{ false: '#767577', true: COLORS.primary }}
              thumbColor={isActive ? COLORS.secondary : '#f4f3f4'}
              onValueChange={toggleIsActive}
              value={isActive}
            />
          </Card.Actions>
        )}
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
  adCardCover: {
    borderRadius: 0,
  },
  adLocation: {
    // to the right most side
    position: 'absolute',
    right: 10,
    bottom: 0,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  searchbar: {
    borderRadius: 50,
    flex: 1,
    marginRight: 10,
  },
  adCard: {
    marginVertical: 3,
    borderRadius: 0,
    elevation: 0,
    backgroundColor: '#fff',
    // borderWidth: 1,
  },
  adTitle: {
    fontSize: 18,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  adsList: {
    flex: 1,
    paddingVertical: 10,
  },
  cardPressable: {
    marginBottom: 10,
  },
  cardActions: {
    justifyContent: 'flex-end',
    paddingRight: 10,
    marginTop: 20,
  },
  adDate: {
    // fontSize: 16,
    color: '#777',
  },
});

export default AdCard;
