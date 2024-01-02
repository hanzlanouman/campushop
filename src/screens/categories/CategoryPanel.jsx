import React from 'react';
import { StyleSheet, View } from 'react-native';
import CategoryCard from '../../components/CategoryCard';
import { useNavigation } from '@react-navigation/native';

const CategoryPanel = () => {
  const navigation = useNavigation();
  const categories = [
    {
      id: 1,
      title: 'Phones',
      name: 'phones',
      icon: 'phone-portrait-outline',
    },
    {
      id: 2,
      title: 'Laptops',
      name: 'laptops',
      icon: 'laptop-outline',
    },
    {
      id: 3,
      title: 'Vehicles',
      name: 'Vehicles',
      icon: 'car-outline',
    },
    {
      id: 4,
      title: 'Books',
      name: 'books',
      icon: 'book-outline',
    },
    {
      id: 5,
      title: 'Gadgets',
      name: 'gadgets',
      icon: 'watch-outline',
    },
    {
      id: 6,
      title: 'Clothes',
      name: 'clothes',
      icon: 'shirt-outline',
    },
  ];

  const handlePress = (categoryName) => {
    console.log(categoryName);
    // Navigate with data to another navigator useRoute
    navigation.navigate('CategorizedAds', { category: categoryName });
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
