import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, View, StyleSheet, Image, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
import { getById } from '../services/api.js'

// const EventoItem = ({ evento, onPress }) => (
//   <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
//     <Image source={{ uri: evento.Poster }} style={styles.imagen} />
//     <View style={styles.textContainer}>
//       <Text style={styles.name}>{evento.Title}</Text>
//       <Text style={styles.description}>{evento.Type}</Text>
//       <Text style={styles.start_date}>{evento.Year}</Text>
//     </View>
//   </TouchableOpacity>
// );

const UserGetById = ({ navigation }) => {
  const [search, setSearch] = useState(''); 
 // const [movies, setMovies] = useState([]);

  const obtenerUser = async () => {
    try {
      const response = await getById(search);
      if (response.Search) {
        getById(response.Search);  
      } else {
        Alert.alert('No se encontraron resultados');
        getById([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error al buscar películas');
    }
  };
}