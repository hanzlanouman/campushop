import React from 'react';
import { StyleSheet, View } from 'react-native';
import CategoryCard from '../../components/CategoryCard';
import { useNavigation } from '@react-navigation/native';

const CategoryPanel = () => {
  const navigation = useNavigation();
  const categories = [
    {
      id: 1,
      name: 'Phones',
      icon: 'phone-portrait-outline',
    },
    {
      id: 2,
      name: 'Laptops',
      icon: 'laptop-outline',
    },
    {
      id: 3,
      name: 'Vehicles',
      icon: 'car-outline',
    },
    {
      id: 4,
      name: 'Books',
      icon: 'book-outline',
    },
    {
      id: 5,
      name: 'Gadgets',
      icon: 'watch-outline',
    },
    {
      id: 6,
      name: 'Clothes',
      icon: 'shirt-outline',
    },
  ];

  const handlePress = (categoryName) => {
    console.log(categoryName);
    navigation.navigate('CategorizedAds', { categoryName });
    // Here you can handle the press event, e.g., navigate to a category-specific page
  };

  return (
    <View style={styles.categoriesContainer}>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category.name}
          icon={category.icon}
          onPress={() => handlePress(category.name)}
        />
      ))}
    </View>
  );
};

export default CategoryPanel;

const styles = StyleSheet.create({
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
});
