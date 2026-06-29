import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { collection, addDoc, query, where, getDocs, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { AuthContext } from '../../context/AuthContext';
import { COLORS } from '../../utils/colors';
import { Ionicons } from '@expo/vector-icons';

export default function QueueScreen() {
  const { userData } = useContext(AuthContext);
  const [selectedPoli, setSelectedPoli] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [antreanKu, setAntreanKu] = useState<any>(null);

  const poliklinik = [
    { id: 'umum', name: 'Poli Umum', icon: 'medical' },
    { id: 'gigi', name: 'Poli Gigi', icon: 'pulse' },
  ];

  const fetchMyQueue = React.useCallback(async () => {
    if (!userData?.uid) return;
    
    // Simplification: just get the latest active queue for today
    const hariIni = new Date().toISOString().split('T')[0];
    
    try {
      const q = query(
        collection(db, 'antrean'),
        where('userId', '==', userData.uid),
        where('tanggalStr', '==', hariIni),
        orderBy('createdAt', 'desc'),
        limit(1)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        setAntreanKu(snapshot.docs[0].data());
      }
    } catch (error) {
      console.error("Error fetching queue:", error);
    }
  }, [userData]);

  useEffect(() => {
    fetchMyQueue();
  }, [fetchMyQueue]);

  const handleDaftar = async () => {
    if (!selectedPoli) {
      Alert.alert('Peringatan', 'Silakan pilih Poli terlebih dahulu');
      return;
    }

    if (antreanKu) {
      Alert.alert('Peringatan', 'Anda sudah memiliki antrean hari ini.');
      return;
    }

    setLoading(true);
    try {
      const hariIni = new Date().toISOString().split('T')[0];
      
      // Get the last queue number for today and the selected poli
      const q = query(
        collection(db, 'antrean'),
        where('tanggalStr', '==', hariIni),
        where('poli', '==', selectedPoli),
        orderBy('nomorAntrean', 'desc'),
        limit(1)
      );
      
      const snapshot = await getDocs(q);
      let nextNumber = 1;
      
      if (!snapshot.empty) {
        nextNumber = snapshot.docs[0].data().nomorAntrean + 1;
      }

      const queueData = {
        userId: userData?.uid,
        poli: selectedPoli,
        nomorAntrean: nextNumber,
        tanggalStr: hariIni,
        status: 'Menunggu',
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'antrean'), queueData);
      Alert.alert('Sukses', 'Berhasil mendaftar antrean!');
      fetchMyQueue();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Pendaftaran Antrean</Text>

      {antreanKu ? (
        <View style={styles.ticketCard}>
          <Text style={styles.ticketTitle}>Tiket Antrean Anda</Text>
          <Text style={styles.ticketDate}>{antreanKu.tanggalStr}</Text>
          <Text style={styles.poliName}>
            {antreanKu.poli === 'umum' ? 'Poli Umum' : 'Poli Gigi'}
          </Text>
          
          <View style={styles.numberContainer}>
            <Text style={styles.queuePrefix}>
              {antreanKu.poli === 'umum' ? 'A' : 'B'}
            </Text>
            <Text style={styles.queueNumber}>
              {antreanKu.nomorAntrean < 10 ? `0${antreanKu.nomorAntrean}` : antreanKu.nomorAntrean}
            </Text>
          </View>
          
          <Text style={styles.faskesText}>{userData?.faskes}</Text>
          
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{antreanKu.status}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.formCard}>
          <Text style={styles.label}>Pilih Poliklinik:</Text>
          <View style={styles.poliContainer}>
            {poliklinik.map((poli) => (
              <TouchableOpacity
                key={poli.id}
                style={[
                  styles.poliCard,
                  selectedPoli === poli.id && styles.poliCardActive
                ]}
                onPress={() => setSelectedPoli(poli.id)}
              >
                <Ionicons 
                  name={poli.icon as any} 
                  size={32} 
                  color={selectedPoli === poli.id ? COLORS.white : COLORS.primary} 
                />
                <Text style={[
                  styles.poliText,
                  selectedPoli === poli.id && styles.poliTextActive
                ]}>{poli.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.labelInfo}>
            Faskes Anda: {userData?.faskes || '-'}
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleDaftar} disabled={loading}>
            {loading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.buttonText}>Daftar Antrean</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray,
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20,
  },
  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  poliContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  poliCard: {
    width: '48%',
    borderWidth: 2,
    borderColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  poliCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  poliText: {
    marginTop: 10,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  poliTextActive: {
    color: COLORS.white,
  },
  labelInfo: {
    fontSize: 14,
    color: COLORS.darkGray,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  ticketCard: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 4,
    borderTopWidth: 5,
    borderTopColor: COLORS.primary,
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  ticketDate: {
    fontSize: 14,
    color: COLORS.darkGray,
    marginTop: 5,
  },
  poliName: {
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginTop: 15,
  },
  numberContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 20,
  },
  queuePrefix: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  queueNumber: {
    fontSize: 60,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  faskesText: {
    fontSize: 14,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 15,
  },
  statusBadge: {
    backgroundColor: COLORS.success,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  statusText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
