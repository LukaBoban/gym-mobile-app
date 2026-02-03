import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../App';

import MenuScreen from './MenuScreen';
import ExploreExercisesScreen from './ExploreExercisesScreen';
import SavedExercisesScreen from './SavedExercisesScreen';
import SettingsScreen from './SettingsScreen';
import ReminderScreen from './ReminderScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs({
  savedExercises,
  setSavedExercises,
  users,
  setUsers,
  currentUser,
  setCurrentUser
}) {
  const { isDarkMode } = useContext(ThemeContext);

  const backgroundColor = isDarkMode ? '#000' : '#fff';     // Tab bar & header bg
  const activeColor = '#007bff';                            // Always blue
  const inactiveColor = 'gray';                             // Always gray
  const headerTextColor = isDarkMode ? '#fff' : '#000';     // Back button + header title

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Explore':
              iconName = 'search-outline';
              break;
            case 'Saved':
              iconName = 'bookmark-outline';
              break;
            case 'Reminder':
              iconName = 'alarm-outline';
              break;
            case 'Settings':
              iconName = 'settings-outline';
              break;
          }

          const iconColor = focused ? activeColor : inactiveColor;
          return <Ionicons name={iconName} size={24} color={iconColor} />;
        },
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: {
          backgroundColor: backgroundColor,
          height: 60,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: backgroundColor,
        },
        headerTintColor: headerTextColor,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Home">
        {props => <MenuScreen {...props} currentUser={currentUser} />}
      </Tab.Screen>
      <Tab.Screen name="Explore">
        {props => (
          <ExploreExercisesScreen
            {...props}
            savedExercises={savedExercises}
            setSavedExercises={setSavedExercises}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Saved">
        {props => (
          <SavedExercisesScreen
            {...props}
            savedExercises={savedExercises}
            setSavedExercises={setSavedExercises}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Reminder" component={ReminderScreen} />
      <Tab.Screen name="Settings">
        {props => (
          <SettingsScreen
            {...props}
            users={users}
            setUsers={setUsers}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
