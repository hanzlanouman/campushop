import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Divider } from 'react-native-paper';
import Modal from 'react-native-modal';

const AdDetails = ({ route }) => {
  const { ad } = route.params;
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
        <Text style={styles.title}>{ad.title}</Text>
        <Divider style={styles.divider} />
        <Text style={styles.price}>{`Rs. ${ad.price}`}</Text>
        <Text style={styles.location}>{`Location: ${ad.location}`}</Text>

        <Text style={styles.description}>
          {ad.description} Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. Quam sapiente praesentium enim qui sint, sequi at dolore ex
          ducimus esse ipsa similique id officiis cumque quibusdam in laborum,
          harum, inventore consequuntur! Aperiam veritatis velit dignissimos
          quibusdam delectus nihil quas eos ad a voluptates dolorem repellat,
          libero iste veniam exercitationem. Repellendus commodi recusandae
          libero deserunt fuga, dicta totam et beatae cupiditate sequi, nobis
          quaerat culpa. Animi tempora neque eius quo numquam ea, mollitia hic
          nihil modi. Dicta maiores architecto deleniti at quia eligendi,
          explicabo illo nemo hic dolorum, placeat exercitationem! Laboriosam
          quae, molestias necessitatibus quas illum pariatur corrupti vero
          doloribus maiores?
        </Text>
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
    fontSize: 25,
    color: 'green',
    marginTop: 10,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 18,
    color: '#222',
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

export default AdDetails;
