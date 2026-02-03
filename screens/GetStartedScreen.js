// /screens/GetStartedScreen.js

import React, { useContext } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import { ThemeContext } from '../App';

export default function GetStartedScreen({ navigation }) {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Image
        source={require('../assets/fitsync.png')}
        style={styles.logo}
      />
      <TouchableOpacity
        style={[styles.button, isDarkMode && styles.darkButton]}
        onPress={() => navigation.navigate('MainTabs')}
      >
        <Text style={[styles.buttonText, isDarkMode && styles.darkButtonText]}>
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#fff'
  },
  darkContainer: {
    backgroundColor: '#222'
  },
  logo: {
    width: 200, height: 200, marginBottom: 40, resizeMode: 'contain'
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15, paddingHorizontal: 60,
    borderRadius: 8
  },
  darkButton: {
    backgroundColor: '#0056b3'
  },
  buttonText: {
    color: '#fff', fontSize: 16, fontWeight: 'bold'
  },
  darkButtonText: {
    color: '#fff'
  }
});
