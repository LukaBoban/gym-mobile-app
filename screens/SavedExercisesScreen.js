import React, { useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { ThemeContext } from '../App';
import { Ionicons } from '@expo/vector-icons';

export default function SavedExercisesScreen({ savedExercises, setSavedExercises }) {
  const { isDarkMode } = useContext(ThemeContext);

  const handleClearAll = () => {
    setSavedExercises([]);
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <Text style={[styles.title, isDarkMode && styles.darkText]}>
          Saved Exercises
        </Text>
        {savedExercises.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={handleClearAll}>
            <Ionicons name="trash-outline" size={20} color={isDarkMode ? '#fff' : '#000'} />
            <Text style={[styles.clearText, isDarkMode && styles.darkText]}>
              Clear All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {savedExercises.length === 0 ? (
        <Text style={[styles.emptyText, isDarkMode && styles.darkText]}>
          No saved exercises yet.
        </Text>
      ) : (
        <FlatList
          data={savedExercises}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={[styles.itemContainer, isDarkMode && styles.darkItemContainer]}>
              <Text style={[styles.itemText, isDarkMode && styles.darkText]}>
                {item.name}
              </Text>
              {item.gifUrl && (
                <Image source={{ uri: item.gifUrl }} style={styles.itemImage} />
              )}
            </View>
          )}
        />
      )}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: '600'
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  clearText: {
    marginLeft: 5,
    fontSize: 16
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#555'
  },
  darkText: {
    color: '#fff'
  },
  list: {
    paddingBottom: 20
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  darkItemContainer: {
    borderColor: '#555'
  },
  itemText: {
    fontSize: 18,
    color: '#000'
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginLeft: 10
  }
});
