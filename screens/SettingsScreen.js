import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Switch,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import CryptoJS from 'crypto-js';
import { ThemeContext } from '../App';

export default function SettingsScreen({
  navigation,
  users,
  setUsers,
  currentUser,
  setCurrentUser
}) {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (!currentUser) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }]
      });
    }
  }, [currentUser]);

  if (!currentUser) return null;

  const [showPwdForm, setShowPwdForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const encryptPassword = pwd => CryptoJS.SHA256(pwd).toString();

  const handleChangePassword = () => {
    setErrorMessage('');
    if (!newPassword.trim() || !confirmPassword.trim()) {
      setErrorMessage('Please fill in both password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    const encrypted = encryptPassword(newPassword);
    const updatedUsers = users.map(u =>
      u.email === currentUser.email ? { ...u, password: encrypted } : u
    );

    setUsers(updatedUsers);
    setShowPwdForm(false);
    setNewPassword('');
    setConfirmPassword('');
    Alert.alert('Success', 'Password changed.');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => {
          setCurrentUser(null);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
          });
        }}
      ]
    );
  };

  const handleDeleteAccount = () => {
    const filtered = users.filter(u => u.email !== currentUser.email);
    setUsers(filtered);
    setCurrentUser(null);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }]
    });
  };

  const confirmDeleteAccount = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete your account? This cannot be undone.',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', style: 'destructive', onPress: handleDeleteAccount }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      {/* Theme Toggle */}
      <View style={styles.row}>
        <Text style={[styles.label, isDarkMode && styles.darkLabel]}>
          Dark Mode
        </Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>

      {/* Email */}
      <View style={styles.section}>
      <Text style={[styles.sectionLabel, isDarkMode && styles.darkLabel]}>
      Username
      </Text>
      <Text style={[styles.emailText, isDarkMode && styles.darkText]}>
      {currentUser.username}
      </Text>
      </View>


      {/* Change Password */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setShowPwdForm(v => !v);
            setErrorMessage('');
          }}
        >
          <Text style={styles.buttonText}>
            {showPwdForm ? 'Cancel' : 'Change Password'}
          </Text>
        </TouchableOpacity>

        {showPwdForm && (
          <View style={styles.form}>
            <TextInput
              placeholder="New Password"
              secureTextEntry
              style={[styles.input, isDarkMode && styles.darkInput]}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry
              style={[styles.input, isDarkMode && styles.darkInput]}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            {errorMessage !== '' && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={handleChangePassword}
            >
              <Text style={styles.buttonText}>Save Password</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Logout */}
      <View style={styles.section}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#e67e22' }]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Delete Account */}
      <View style={styles.section}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#e74c3c' }]}
          onPress={confirmDeleteAccount}
        >
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  darkContainer: { backgroundColor: '#333' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15
  },
  label: { fontSize: 18, color: '#000' },
  darkLabel: { color: '#fff' },
  section: { marginVertical: 20 },
  sectionLabel: { fontSize: 16, marginBottom: 8 },
  emailText: { fontSize: 18, fontWeight: '500', color: '#000' },
  darkText: { color: '#ddd' },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignSelf: 'flex-start'
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  form: { marginTop: 15, width: '100%' },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
    color: '#000'
  },
  darkInput: {
    backgroundColor: '#555',
    borderColor: '#777',
    color: '#fff'
  },
  errorText: { color: 'red', marginBottom: 10 }
});
