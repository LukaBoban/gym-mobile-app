import React, { useState, useContext, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import { ThemeContext } from '../App';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function ReminderScreen() {
  const { isDarkMode } = useContext(ThemeContext);
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Notification permissions not granted!');
      }
    };
    requestPermissions();
  }, []);

  const scheduleReminder = async () => {
    const now = new Date();
    const selected = new Date(now);
    selected.setHours(time.getHours());
    selected.setMinutes(time.getMinutes());
    selected.setSeconds(0);

    if (selected <= now) {
      selected.setDate(selected.getDate() + 1);
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '⏰ Workout Reminder',
        body: 'Don’t forget to do your workout today!',
      },
      trigger: selected,
    });

    Alert.alert('Reminder Set!', `Reminder will go off at ${selected.toLocaleTimeString()}`);
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkText]}>
        Set Workout Reminder (One-Time)
      </Text>

      <TouchableOpacity
        style={[styles.button, isDarkMode && styles.darkButton]}
        onPress={() => setShowPicker(true)}
      >
        <Text style={[styles.buttonText, isDarkMode && styles.darkButtonText]}>
          Choose Time: {time.toLocaleTimeString()}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <View style={styles.pickerWrapper}>
          <DateTimePicker
            value={time}
            mode="time"
            is24Hour={true}
            display={Platform.OS === 'ios' ? 'compact' : 'default'}
            onChange={(event, selectedTime) => {
              if (event.type === 'set') {
                setTime(selectedTime || time);
              }
              setShowPicker(false);
            }}
            style={styles.pickerStyle}
          />
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, isDarkMode && styles.darkButton]}
        onPress={scheduleReminder}
      >
        <Text style={[styles.buttonText, isDarkMode && styles.darkButtonText]}>
          Set Reminder
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  darkContainer: { backgroundColor: '#222' },
  title: { fontSize: 24, marginBottom: 40, color: '#000' },
  darkText: { color: '#fff' },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20
  },
  darkButton: { backgroundColor: '#0056b3' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  darkButtonText: { color: '#fff' },
  pickerWrapper: {
    width: 200,                 // ✅ Keeps the preview box centered
    alignSelf: 'center',        // ✅ Makes sure it's in the center of the screen
    marginVertical: 20
  },
  pickerStyle: {
    alignSelf: 'center',        // ✅ Extra safety for the picker itself
    width: 150                  // ✅ Tweak width if needed
  }
});
