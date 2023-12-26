import React from 'react';
import { Button, Image, StyleSheet } from 'react-native';
import { OnboardFlow } from 'react-native-onboard';
import { useNavigation } from '@react-navigation/native';

const OnBoarding = () => {
  const navigation = useNavigation();

  // Style for the pages
  const pageStyle = StyleSheet.create({
    titleStyle: {
      color: '#7923d3',
      fontSize: 24,
      fontWeight: 'bold',
    },
    subtitleStyle: {
      color: '#999',
      fontSize: 18,
    },
    buttonStyle: {
      backgroundColor: '#7923d3',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
    },
  });

  // Custom secondary button component
  const SignUpButton = () => (
    <Button title='Sign Up' onPress={() => navigation.navigate('Signup')} />
  );

  return (
    <OnboardFlow
      pages={[
        {
          backgroundColor: '#fff',
          imageUri: Image.resolveAssetSource(
            require('../../../assets/post1.jpg')
          ).uri,
          title: 'Welcome to Socialize',
          subtitle: 'Connect with your society members',
          primaryButtonTitle: 'Next',
          type: '',
          titleStyle: pageStyle.titleStyle,
          subtitleStyle: pageStyle.subtitleStyle,
          primaryButtonStyle: pageStyle.buttonStyle,
          primaryButtonTextStyle: pageStyle.buttonText,
        },
        {
          backgroundColor: '#fff',
          imageUri: Image.resolveAssetSource(
            require('../../../assets/profile.jpg')
          ).uri,
          title: 'Explore Features',
          primaryButtonTitle: 'Next',
          subtitle: 'Discover all the amazing things you can do in Societies',
          titleStyle: pageStyle.titleStyle,
          subtitleStyle: pageStyle.subtitleStyle,
          primaryButtonStyle: pageStyle.buttonStyle,
          primaryButtonTextStyle: pageStyle.buttonText,
        },
        {
          backgroundColor: '#fff',
          imageUri: Image.resolveAssetSource(
            require('../../../assets/user3.jpg')
          ).uri,
          title: 'Stay Connected',
          subtitle: 'Never miss out on events',
          primaryButtonTitle: 'Sign Up',
          secondaryButtonTitle: 'Skip',
          titleStyle: pageStyle.titleStyle,
          subtitleStyle: { ...pageStyle.subtitleStyle, color: '#999' },
          primaryButtonStyle: pageStyle.buttonStyle,
          primaryButtonTextStyle: pageStyle.buttonText,
        },
      ]}
      type='fullscreen'
      onDone={() => navigation.navigate('Signup')}
      SecondaryButtonComponent={SignUpButton}
      showDismissButton={true}
      dismissButtonStyle={{ marginTop: -25 }}
      autoPlay={true}
    />
  );
};

export default OnBoarding;
