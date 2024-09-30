import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, FlatList } from 'react-native';
import { getEventById, getParticipants, subscribeToEvent, unsubscribeFromEvent } from '../services/EventServices'; 
import moment from 'moment';
import { useAuth } from '../AuthContext';

const EventDetailScreen = ({ route }) => {
  const { eventId } = route.params;
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = user ? user.token : null;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(eventId);

        if (data.success) {
          setEvent(data.response);
          // Verifica si el evento ya ocurrió
          if (moment(data.response.start_date).isBefore(moment())) {
            const participantsData = await getParticipants(eventId);
            setParticipants(participantsData);
          }
          // Aquí podrías verificar si el usuario ya está inscrito
          setIsSubscribed(data.response.user_is_subscribed); // Supone que la API retorna esto
        } else {
          Alert.alert('Error', 'Failed to load event details');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleSubscribe = async () => {
    try {
      await subscribeToEvent(eventId, token);
      setIsSubscribed(true);
      Alert.alert('Success', 'You have successfully subscribed to the event.');
    } catch (error) {
      Alert.alert('Error', 'Failed to subscribe to the event.');
    }
  };

  const handleUnsubscribe = async () => {
    try {
        await unsubscribeFromEvent(eventId, token);
      setIsSubscribed(false);
      Alert.alert('Success', 'You have successfully unsubscribed from the event.');
    } catch (error) {
      Alert.alert('Error', 'Failed to unsubscribe from the event.');
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!event) {
    return <Text>Event not found</Text>;
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

      {moment(event.start_date).isBefore(moment()) ? (
        <View>
          <Text style={styles.participantHeader}>Participantes:</Text>
          <FlatList
            data={participants}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.participantItem}>
                <Text>{item.name} - Asistió: {item.attended ? 'Sí' : 'No'}</Text>
              </View>
            )}
          />
        </View>
      ) : (
        <View>
          {isSubscribed ? (
            <Button title="Desuscribirse" onPress={handleUnsubscribe} />
          ) : (
            <Button title="Inscribirse" onPress={handleSubscribe} />
          )}
        </View>
      )}
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
  participantHeader: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
  participantItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default EventDetailScreen;
