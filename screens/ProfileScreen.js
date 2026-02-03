import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { ThemeContext } from '../App';

export default function ProfileScreen({ navigation, currentUser, setCurrentUser }) {
  const { isDarkMode } = useContext(ThemeContext);

  const [age, setAge] = useState(currentUser?.age || '');
  const [height, setHeight] = useState(currentUser?.height || '');
  const [weight, setWeight] = useState(currentUser?.weight || '');

  useEffect(() => {
    if (!currentUser) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }]
      });
    }
  }, [currentUser]);

  if (!currentUser) return null;

  const handleSave = () => {
    if (!age.trim() || !height.trim() || !weight.trim()) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setCurrentUser({
      ...currentUser,
      age,
      height,
      weight
    });

    Alert.alert('Success', 'Profile updated!');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.container, isDarkMode && styles.darkContainer]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.title, isDarkMode && styles.darkTitle]}>
          Profile
        </Text>

        <TextInput
          placeholder="Age"
          placeholderTextColor={isDarkMode ? '#ccc' : '#888'}
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
          style={[styles.input, isDarkMode && styles.darkInput]}
        />
        <TextInput
          placeholder="Height (cm)"
          placeholderTextColor={isDarkMode ? '#ccc' : '#888'}
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
          style={[styles.input, isDarkMode && styles.darkInput]}
        />
        <TextInput
          placeholder="Weight (kg)"
          placeholderTextColor={isDarkMode ? '#ccc' : '#888'}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
          style={[styles.input, isDarkMode && styles.darkInput]}
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  darkContainer: {
    backgroundColor: '#222'
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#000'
  },
  darkTitle: {
    color: '#fff'
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    color: '#000' // ✅ Always readable text
  },
  darkInput: {
    backgroundColor: '#333',
    borderColor: '#555',
    color: '#fff' // ✅ Dark mode text color
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
