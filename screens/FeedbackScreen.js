// /screens/FeedbackScreen.js

import React, { useState, useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../App';

export default function FeedbackScreen({ navigation }) {
  const { isDarkMode } = useContext(ThemeContext);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    // you can replace this with whatever submission logic you like
    Alert.alert(
      'Feedback Submitted',
      `You rated ${rating} star${rating !== 1 ? 's' : ''}` +
      (comment ? `\n\nComments:\n${comment}` : '')
    );
    // reset state if desired
    setRating(0);
    setComment('');
    // optionally navigate away:
    // navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkTitle]}>Feedback</Text>

      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map(i => (
          <TouchableOpacity key={i} onPress={() => setRating(i)}>
            <Ionicons
              name={i <= rating ? 'star' : 'star-outline'}
              size={36}
              color={isDarkMode ? '#ffd700' : '#f1c40f'}
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={[styles.textInput, isDarkMode && styles.darkTextInput]}
        placeholder="Additional comments..."
        placeholderTextColor={isDarkMode ? '#ccc' : '#888'}
        multiline
        numberOfLines={4}
        value={comment}
        onChangeText={setComment}
      />

      <TouchableOpacity
        style={[styles.button, isDarkMode && styles.darkButton]}
        onPress={handleSubmit}
      >
        <Text style={[styles.buttonText, isDarkMode && styles.darkButtonText]}>
          Submit
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  darkContainer: {
    backgroundColor: '#222'
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    color: '#000'
  },
  darkTitle: {
    color: '#fff'
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
  star: {
    marginHorizontal: 8
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    color: '#000',
    textAlignVertical: 'top',
    marginBottom: 20
  },
  darkTextInput: {
    borderColor: '#555',
    backgroundColor: '#333',
    color: '#fff'
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  darkButton: {
    backgroundColor: '#0056b3'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  darkButtonText: {
    color: '#fff'
  }
});
