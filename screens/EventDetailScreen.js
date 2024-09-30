import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { getEventById } from '../services/EventServices'; 

const EventDetailScreen = ({ route }) => {
  const { eventId } = route.params;
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(eventId);
        console.log('ESTE ES EL DETALLE DEL EVENTO', data);
        
        // Ajusta el acceso a los datos
        if (data.success) {
          setEvent(data.response); // Ahora accedemos a data.response
        } else {
          Alert.alert('Error', 'Failed to load event details');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load event details');
      }
    };

    fetchEvent();
  }, [eventId]);

  if (!event) {
    return <Text>Bancame...</Text>; // Loader o mensaje de espera
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.name}</Text>
      <Text style={styles.description}>{event.description}</Text>
      <Text>Fecha: {event.start_date}</Text>
      <Text>Duración: {event.duration_in_minutes} minutos</Text>
      <Text>Precio: ${event.price}</Text>
      <Text>Máximo de Asistentes: {event.max_assistance}</Text>
      <Text>Creador: {event.creator_user.first_name} {event.creator_user.last_name}</Text>
      <Text>Ubicación: {event.event_location.name}</Text>
      <Text>Dirección: {event.event_location.full_address}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    marginVertical: 10,
    fontSize: 16,
  },
});

export default EventDetailScreen;
