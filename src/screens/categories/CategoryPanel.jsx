import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
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
      <Text style={styles.headerText}>Browse Categories</Text>

      <FlatList
        data={categories}
        style={styles.categoriesList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CategoryCard
            key={item.id}
            color={item.id}
            category={item.title}
            icon={item.icon}
            onPress={() => handlePress(item.name)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CategoryPanel;

const styles = StyleSheet.create({
  categoriesContainer: {
    marginVertical: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 5,
  },
});
