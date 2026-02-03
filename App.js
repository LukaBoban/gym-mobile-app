import React, { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import GetStartedScreen from './screens/GetStartedScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import MainTabs from './screens/MainTabs';
import ProfileScreen from './screens/ProfileScreen';
import { StatusBar } from 'react-native';


export const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

const Stack = createNativeStackNavigator();

export default function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [savedExercises, setSavedExercises] = useState([]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
    <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Register">
          {/* 🔐 Login */}
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
          >
            {props => (
              <LoginScreen
                {...props}
                users={users}
                setCurrentUser={setCurrentUser}
              />
            )}
          </Stack.Screen>

          {/* 📝 Register */}
          <Stack.Screen
            name="Register"
            options={{ headerShown: false }}
          >
            {props => (
              <RegisterScreen
                {...props}
                users={users}
                setUsers={setUsers}
                setCurrentUser={setCurrentUser}
              />
            )}
          </Stack.Screen>

          {/* 🚀 Get Started Screen */}
          <Stack.Screen
            name="GetStarted"
            component={GetStartedScreen}
            options={{ headerShown: false }}
          />

          {/* 🧭 Main Tabs (Explore, Saved, Settings, etc.) */}
          <Stack.Screen
            name="MainTabs"
            options={{ headerShown: false }}
          >
            {props => (
              <MainTabs
                {...props}
                savedExercises={savedExercises}
                setSavedExercises={setSavedExercises}
                users={users}
                setUsers={setUsers}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            )}
          </Stack.Screen>

          {/* 💬 Feedback */}
          <Stack.Screen
            name="Feedback"
            component={FeedbackScreen}
            options={{
              title: 'Feedback',
              headerStyle: {
                backgroundColor: isDarkMode ? '#000' : '#fff',
              },
              headerTintColor: isDarkMode ? '#fff' : '#000',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />

          {/* 👤 Profile */}
          <Stack.Screen
            name="Profile"
            options={{
              title: 'Your Profile',
              headerStyle: {
                backgroundColor: isDarkMode ? '#000' : '#fff',
              },
              headerTintColor: isDarkMode ? '#fff' : '#000',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            {props => (
              <ProfileScreen
                {...props}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
