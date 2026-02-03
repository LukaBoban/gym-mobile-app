import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Alert,
  Image
} from 'react-native';
import { ThemeContext } from '../App';

export default function ExploreExercisesScreen({ savedExercises, setSavedExercises }) {
  const { isDarkMode } = useContext(ThemeContext);
  const [bodyParts, setBodyParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState('');
  const [exercises, setExercises] = useState([]);
  const [loadingParts, setLoadingParts] = useState(true);
  const [loadingExercises, setLoadingExercises] = useState(false);
  const [error, setError] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const API_KEY = '5d131e528amsh6f1ce6d48e957dfp1a54fbjsn9697e4405801';
  const HOST = 'exercisedb.p.rapidapi.com';

  useEffect(() => {
    const fetchBodyParts = async () => {
      try {
        const res = await fetch(`https://${HOST}/exercises/bodyPartList`, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': HOST
          }
        });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setBodyParts(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoadingParts(false);
      }
    };
    fetchBodyParts();
  }, []);

  useEffect(() => {
    if (!selectedPart) return;
    setLoadingExercises(true);
    setError('');
    setSelectedExercise(null);

    const fetchExercises = async () => {
      try {
        const res = await fetch(`https://${HOST}/exercises/bodyPart/${selectedPart}?limit=10&offset=0`, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': HOST
          }
        });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        setExercises(await res.json());
      } catch (e) {
        setError(e.message);
      } finally {
        setLoadingExercises(false);
      }
    };
    fetchExercises();
  }, [selectedPart]);

  const handleSave = () => {
    if (!selectedExercise) return;
    if (savedExercises.some(e => e.id === selectedExercise.id)) {
      Alert.alert('Already saved');
      return;
    }
    setSavedExercises([...savedExercises, selectedExercise]);
    Alert.alert('Saved!', `${selectedExercise.name} added to favorites.`);
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <TouchableOpacity
        style={[styles.dropdownButton, isDarkMode && styles.darkDropdownButton]}
        onPress={() => setShowModal(true)}
      >
        <Text style={[styles.dropdownButtonText, isDarkMode && styles.darkText]}>
          {selectedPart ? selectedPart : 'Select Body Part'}
        </Text>
      </TouchableOpacity>

      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, isDarkMode && styles.darkModalContent]}>
            <Text style={[styles.modalTitle, isDarkMode && styles.darkText]}>
              Choose Body Part
            </Text>
            <FlatList
              data={bodyParts}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedPart(item);
                    setShowModal(false);
                  }}
                >
                  <Text style={[styles.modalItemText, isDarkMode && styles.darkText]}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {selectedPart ? (
        loadingExercises ? (
          <Text style={[styles.loadingText, isDarkMode && styles.darkText]}>Loading exercises...</Text>
        ) : error ? (
          <Text style={[styles.errorText, isDarkMode && styles.darkError]}>{error}</Text>
        ) : (
          <FlatList
            data={exercises}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.card, isDarkMode && styles.darkCard]}
                onPress={() => setSelectedExercise(item)}
              >
                {item.gifUrl && (
                  <Image
                    source={{ uri: item.gifUrl }}
                    style={styles.itemImage}
                    resizeMode="contain"                      // ✅ Fixed here!
                  />
                )}
                <Text style={[styles.name, isDarkMode && styles.darkText]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        )
      ) : null}

      {selectedExercise && (
        <View style={[styles.detailContainer, isDarkMode && styles.darkDetail]}>
          <Text style={[styles.detailTitle, isDarkMode && styles.darkText]}>
            {selectedExercise.name}
          </Text>
          <Text style={[styles.detailText, isDarkMode && styles.darkText]}>
            Body Part: {selectedExercise.bodyPart}
          </Text>
          <Text style={[styles.detailText, isDarkMode && styles.darkText]}>
            Target: {selectedExercise.target}
          </Text>
          <Text style={[styles.detailText, isDarkMode && styles.darkText]}>
            Equipment: {selectedExercise.equipment}
          </Text>
          <TouchableOpacity
            style={[styles.saveButton, isDarkMode && styles.darkSaveButton]}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>
              {savedExercises.some(e => e.id === selectedExercise.id) ? 'Saved' : 'Save Exercise'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  darkContainer: { backgroundColor: '#222' },
  dropdownButton: {
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
    margin: 10,
  },
  darkDropdownButton: { backgroundColor: '#0056b3' },
  dropdownButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  darkModalContent: { backgroundColor: '#333' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  modalItem: { paddingVertical: 12, borderBottomWidth: 1, borderColor: '#ccc' },
  modalItemText: { fontSize: 16 },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#e74c3c',
    borderRadius: 8,
  },
  closeButtonText: { color: '#fff', fontWeight: 'bold' },
  list: { padding: 10 },
  card: { marginBottom: 15, padding: 10, borderRadius: 8, backgroundColor: '#f9f9f9' },
  darkCard: { backgroundColor: '#333' },
  itemImage: {
    width: 150,                      // ✅ Width adjusted for contain
    height: 150,                     // ✅ Height adjusted for contain
    borderRadius: 6,
    marginBottom: 8,
    alignSelf: 'center'              // ✅ Keep image centered
  },
  name: { fontSize: 16, fontWeight: '600', color: '#000' },
  darkText: { color: '#fff' },
  detailContainer: { padding: 15, borderTopWidth: 1, borderColor: '#ccc' },
  darkDetail: { borderColor: '#555' },
  detailTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 5, color: '#000' },
  detailText: { fontSize: 16, marginBottom: 3, color: '#000' },
  saveButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center'
  },
  darkSaveButton: { backgroundColor: '#0056b3' },
  saveButtonText: { color: '#fff', fontWeight: 'bold' },
  errorText: { color: 'red', textAlign: 'center', marginTop: 20 },
  darkError: { color: '#ff8888' },
  loadingText: { textAlign: 'center', marginTop: 20 }
});
