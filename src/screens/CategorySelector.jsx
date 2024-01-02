// CategorySelector.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  { id: 1, name: 'Phones', icon: 'phone-portrait-outline' },
  { id: 2, name: 'Laptops', icon: 'laptop-outline' },
  { id: 3, name: 'Vehicles', icon: 'car-outline' },
  { id: 4, name: 'Books', icon: 'book-outline' },
  { id: 5, name: 'Gadgets', icon: 'watch-outline' },
  { id: 6, name: 'Clothes', icon: 'shirt-outline' },
];

const CategorySelector = ({ selectedCategory, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.selector}
      >
        <Text style={styles.selectedText}>
          {selectedCategory || 'Select Category'}
        </Text>
        <Ionicons name='arrow-down' size={24} color='#7a29ff' />
      </TouchableOpacity>
      <Modal transparent={true} visible={modalVisible} animationType='slide'>
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    onSelect(item.name);
                    setModalVisible(false);
                  }}
                >
                  <Ionicons name={item.icon} size={24} color='#7a29ff' />
                  <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  selector: {
    borderWidth: 1,
    borderColor: '#7a29ff',
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedText: {
    color: '#7a29ff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemText: {
    marginLeft: 10,
    color: '#7a29ff',
  },
});

export default CategorySelector;
