import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../utils/colors';
import { AuthContext } from '../../context/AuthContext';
import { db, firebase } from '../../config/firebaseConfig';

export default function KantorCabangScreen({ navigation }: any) {
  const { user } = useContext(AuthContext);
  const [queue, setQueue] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const fetchQueue = async () => {
    if (!user) return;
    try {
      const snapshot = await db.collection('queues')
        .where('uid', '==', user.uid)
        .where('type', '==', 'KantorCabang')
        .where('status', '==', 'active')
        .limit(1)
        .get();
        
      if (!snapshot.empty) {
        setQueue(snapshot.docs[0].data());
      } else {
        setQueue(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, [user]);

  const handleAmbilAntrean = async () => {
    if (!user) return;
    setCreating(true);
    try {
      await db.collection('queues').add({
        uid: user.uid,
        type: 'KantorCabang',
        nomor: 'A-' + Math.floor(100 + Math.random() * 900),
        lokasi: 'KANTOR CABANG',
        status: 'active',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Sukses', 'Berhasil mengambil antrean');
      fetchQueue();
    } catch (error: any) {
      Alert.alert('Gagal', error.message);
    } finally {
      setCreating(false);
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#3C73CD" />
      <LinearGradient
        colors={['#1CB5E0', '#000046']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Antrean Kantor Cabang</Text>
        <View style={{ width: 24 }} />
      </LinearGradient>

      <View style={styles.container}>
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#0055B8" />
          </View>
        ) : queue ? (
          <View style={styles.ticketCard}>
            <Text style={styles.ticketTitle}>Nomor Antrean Anda</Text>
            <Text style={styles.ticketNumber}>{queue.nomor}</Text>
            <Text style={styles.ticketSubtitle}>{queue.lokasi}</Text>
            
            <TouchableOpacity style={{ marginTop: 30 }} onPress={() => setQueue(null)}>
              <Text style={{ color: COLORS.error, fontWeight: 'bold' }}>Batalkan Antrean</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="magnify" size={100} color="#CFD8DC" style={styles.emptyIcon} />
            <Text style={styles.emptyText}>Saat ini Anda belum memiliki antrean yang</Text>
            <Text style={styles.emptyText}>terdaftar,</Text>
            <Text style={styles.emptyText}>Silakan ambil antrean untuk melanjutkan</Text>
            
            <TouchableOpacity style={{ marginTop: 30, width: 200 }} onPress={handleAmbilAntrean} disabled={creating}>
              <LinearGradient
                colors={['#29B6F6', '#0277BD']}
                style={styles.ambilAntreanBtn}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                {creating ? (
                  <ActivityIndicator color={COLORS.white} />
                ) : (
                  <Text style={styles.ambilAntreanText}>Ambil Antrean</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'android' ? 40 : 15,
    paddingBottom: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 15,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyIcon: {
    opacity: 0.8,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 14,
    color: '#78909C',
    textAlign: 'center',
    lineHeight: 22,
  },
  ambilAntreanBtn: {
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  ambilAntreanText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  ticketCard: {
    backgroundColor: COLORS.white,
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 20,
  },
  ticketTitle: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 10,
  },
  ticketNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#0055B8',
  },
  ticketSubtitle: {
    fontSize: 14,
    color: '#757575',
    marginTop: 10,
  }
});
