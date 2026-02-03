import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import CryptoJS from 'crypto-js';
import { ThemeContext } from '../App';

export default function RegisterScreen({ navigation, users, setUsers, setCurrentUser }) {
  const { isDarkMode } = useContext(ThemeContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const encryptPassword = pwd => CryptoJS.SHA256(pwd).toString();

  const handleRegister = () => {
    setErrorMessage('');

    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (users.find(u => u.username === username)) {
      setErrorMessage('Username already exists.');
      return;
    }

    const encrypted = encryptPassword(password);
    const newUser = { username, password: encrypted };

    setUsers([...users, newUser]);
    setCurrentUser(newUser); // ✅ Log them in immediately after registering
    navigation.navigate('GetStarted');
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkTitle]}>
        Register
      </Text>

      <TextInput
        placeholder="Username"
        placeholderTextColor={isDarkMode ? '#ccc' : '#888'}
        style={[styles.input, isDarkMode && styles.darkInput]}
        value={username}
        onChangeText={text => {
          setUsername(text);
          setErrorMessage('');
        }}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor={isDarkMode ? '#ccc' : '#888'}
        secureTextEntry
        style={[styles.input, isDarkMode && styles.darkInput]}
        value={password}
        onChangeText={text => {
          setPassword(text);
          setErrorMessage('');
        }}
      />

      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor={isDarkMode ? '#ccc' : '#888'}
        secureTextEntry
        style={[styles.input, isDarkMode && styles.darkInput]}
        value={confirmPassword}
        onChangeText={text => {
          setConfirmPassword(text);
          setErrorMessage('');
        }}
      />

      {errorMessage !== '' && (
        <Text style={[styles.errorText, isDarkMode && styles.darkErrorText]}>
          {errorMessage}
        </Text>
      )}

      <TouchableOpacity
        style={[styles.button, isDarkMode && styles.darkButton]}
        onPress={handleRegister}
      >
        <Text style={[styles.buttonText, isDarkMode && styles.darkButtonText]}>
          Register
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.linkText, isDarkMode && styles.darkLinkText]}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    padding: 20, backgroundColor: '#fff'
  },
  darkContainer: {
    backgroundColor: '#222'
  },
  title: {
    fontSize: 28, fontWeight: 'bold',
    marginBottom: 40, color: '#000'
  },
  darkTitle: {
    color: '#fff'
  },
  input: {
    width: '100%', borderWidth: 1, borderColor: '#aaa',
    borderRadius: 8, padding: 12, marginBottom: 15,
    backgroundColor: '#fff', color: '#000'
  },
  darkInput: {
    backgroundColor: '#333',
    borderColor: '#555',
    color: '#fff'
  },
  errorText: {
    color: 'red', alignSelf: 'flex-start', marginBottom: 10
  },
  darkErrorText: {
    color: '#ff8888'
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12, paddingHorizontal: 30,
    borderRadius: 8, marginTop: 10, marginBottom: 20
  },
  darkButton: {
    backgroundColor: '#0056b3'
  },
  buttonText: {
    color: '#fff', fontWeight: 'bold'
  },
  darkButtonText: {
    color: '#fff'
  },
  linkText: {
    color: '#007bff', marginTop: 10
  },
  darkLinkText: {
    color: '#66b0ff'
  }
});
