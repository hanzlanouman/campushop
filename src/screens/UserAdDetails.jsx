import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import { Divider } from 'react-native-paper';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

const UserAdDetails = ({ route }) => {
  const { ad } = route.params;
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const imageScrollViewRef = useRef(null);

  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={imageScrollViewRef}
        >
          {ad.images.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedImage(item);
                setModalVisible(true);
              }}
            >
              <Image source={{ uri: item }} style={styles.image} />
              <Text style={{ textAlign: 'center' }}>{index + 1}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <Text>This is your ad</Text>
        <Text style={styles.title}>{ad.title}</Text>
        <Divider style={styles.divider} />
        <Text style={styles.description}>{ad.description}</Text>
        <Text style={styles.price}>{`Price: ${ad.price}`}</Text>
        <Text style={styles.location}>{`Location: ${ad.location}`}</Text>
        <Pressable
          onPress={() => navigation.navigate('EditAd', { ad })}
          style={styles.EditBtn}
        >
          <Text style={styles.EditTxt}>Edit Ad</Text>
        </Pressable>
      </View>

      <Modal
        visible={isModalVisible}
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setModalVisible(false)}
        >
          <Image source={{ uri: selectedImage }} style={styles.fullImage} />
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: 300, // Adjust this based on your image aspect ratio
  },
  image: {
    width: Dimensions.get('window').width,
    height: 300, // Adjust this based on your image aspect ratio
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  divider: {
    backgroundColor: '#000',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: '#444',
    marginTop: 10,
  },
  price: {
    fontSize: 20,
    color: 'green',
    marginTop: 10,
  },
  location: {
    fontSize: 18,
    color: '#333',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  fullImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UserAdDetails;
