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

export default function LoginScreen({ navigation, users, setCurrentUser }) {
  const { isDarkMode } = useContext(ThemeContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const encryptPassword = pwd => CryptoJS.SHA256(pwd).toString();

  const handleLogin = () => {
    setErrorMessage('');
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please fill in both fields.');
      return;
    }

    const encrypted = encryptPassword(password);
    const userFound = users.find(
      u => u.username === username && u.password === encrypted
    );

    if (!userFound) {
      setErrorMessage('Invalid username or password.');
      return;
    }

    setCurrentUser(userFound);
    navigation.navigate('GetStarted'); // ✅ Goes straight to GetStarted after login
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkTitle]}>
        Login
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

      {errorMessage !== '' && (
        <Text style={[styles.errorText, isDarkMode && styles.darkErrorText]}>
          {errorMessage}
        </Text>
      )}

      <TouchableOpacity
        style={[styles.button, isDarkMode && styles.darkButton]}
        onPress={handleLogin}
      >
        <Text style={[styles.buttonText, isDarkMode && styles.darkButtonText]}>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={[styles.linkText, isDarkMode && styles.darkLinkText]}>
          Don’t have an account? Register
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center',
    alignItems: 'center', padding: 20,
    backgroundColor: '#fff'
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
    width: '100%', borderWidth: 1,
    borderColor: '#aaa', borderRadius: 8,
    padding: 12, marginBottom: 15,
    backgroundColor: '#fff', color: '#000'
  },
  darkInput: {
    backgroundColor: '#333',
    borderColor: '#555',
    color: '#fff'
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 10
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
    color: '#007bff',
    marginTop: 10
  },
  darkLinkText: {
    color: '#66b0ff'
  }
});
