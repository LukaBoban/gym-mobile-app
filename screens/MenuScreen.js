// /screens/MenuScreen.js

import React, { useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../App';

export default function MenuScreen({ navigation, currentUser }) {
  const { isDarkMode } = useContext(ThemeContext);

  const menuItems = [
    { title: 'Settings', screen: 'Settings' },
    { title: 'Saved Exercises', screen: 'Saved' },
    { title: 'Explore Exercises', screen: 'Explore' },
    { title: 'Feedback', screen: 'Feedback' },
    { title: 'Reminders', screen: 'Reminder' },
  ];

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <Text style={[styles.greeting, isDarkMode && styles.darkGreeting]}>
          Hi, {currentUser?.username}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
  <Ionicons name="person-circle-outline" size={36} color={isDarkMode ? '#fff' : '#333'} />
</TouchableOpacity>

      </View>

      <View style={styles.menu}>
        {menuItems.map(item => (
          <TouchableOpacity
            key={item.title}
            style={[styles.menuItem, isDarkMode && styles.darkMenuItem]}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Text style={[styles.menuText, isDarkMode && styles.darkMenuText]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20
  },
  darkContainer: {
    backgroundColor: '#222'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000'
  },
  darkGreeting: {
    color: '#fff'
  },
  menu: {
    flex: 1
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  darkMenuItem: {
    borderColor: '#555'
  },
  menuText: {
    fontSize: 18,
    color: '#000'
  },
  darkMenuText: {
    color: '#fff'
  }
});
