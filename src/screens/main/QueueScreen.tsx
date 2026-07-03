import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, Platform, SafeAreaView } from 'react-native';
import { db } from '../../config/firebaseConfig';
import { AuthContext } from '../../context/AuthContext';
import { COLORS } from '../../utils/colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function QueueScreen({ navigation }: any) {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [queues, setQueues] = useState<any[]>([]);

  const fetchQueues = React.useCallback(async () => {
    if (!user?.uid) return;
    
    try {
      const snapshot = await db.collection('queues')
        .where('uid', '==', user.uid)
        .get();
        
      if (!snapshot.empty) {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Urutkan data secara manual (client-side) berdasarkan createdAt menurun (descending)
        data.sort((a: any, b: any) => {
          const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
          const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
          return timeB - timeA;
        });
        setQueues(data);
      } else {
        setQueues([]);
      }
    } catch (error) {
      console.error("Error fetching queues:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchQueues();
    });
    return unsubscribe;
  }, [navigation, fetchQueues]);

  useEffect(() => {
    fetchQueues();
  }, [fetchQueues]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'FaskesPertama': return 'stethoscope';
      case 'KantorCabang': return 'office-building';
      case 'FaskesRujukan': return 'hospital-building';
      default: return 'file-document';
    }
  };

  const getTitle = (type: string) => {
    switch (type) {
      case 'FaskesPertama': return 'Faskes Tingkat Pertama';
      case 'KantorCabang': return 'Kantor Cabang';
      case 'FaskesRujukan': return 'Faskes Rujukan';
      default: return 'Layanan';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#1CB5E0', '#000046']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Info Riwayat Pelayanan</Text>
        <View style={{ width: 24 }} />
      </LinearGradient>

      <View style={styles.container}>
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#0055B8" />
          </View>
        ) : queues.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
            {queues.map((item) => (
              <View key={item.id} style={styles.queueCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardHeaderLeft}>
                    <MaterialCommunityIcons name={getIcon(item.type)} size={24} color="#0055B8" />
                    <Text style={styles.cardTitle}>{getTitle(item.type)}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: item.status === 'active' ? COLORS.success : COLORS.darkGray }]}>
                    <Text style={styles.statusText}>{item.status === 'active' ? 'Aktif' : 'Selesai'}</Text>
                  </View>
                </View>
                
                <View style={styles.divider} />
                
                <View style={styles.cardBody}>
                  {item.nomor ? (
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Nomor Antrean:</Text>
                      <Text style={styles.infoValueLarge}>{item.nomor}</Text>
                    </View>
                  ) : null}
                  
                  {item.tanggal ? (
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Tanggal:</Text>
                      <Text style={styles.infoValue}>{item.tanggal}</Text>
                    </View>
                  ) : null}

                  {item.poli ? (
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Poli:</Text>
                      <Text style={styles.infoValue}>{item.poli}</Text>
                    </View>
                  ) : null}
                  
                  {item.lokasi ? (
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Lokasi:</Text>
                      <Text style={styles.infoValue}>{item.lokasi}</Text>
                    </View>
                  ) : null}

                  {item.jadwal ? (
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Jadwal:</Text>
                      <Text style={styles.infoValue}>{item.jadwal}</Text>
                    </View>
                  ) : null}
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="text-box-search-outline" size={80} color="#CFD8DC" style={{ marginBottom: 15 }} />
            <Text style={styles.emptyText}>Belum ada riwayat pelayanan atau antrean.</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F0F4F8' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'android' ? 40 : 15,
    paddingBottom: 15,
  },
  backButton: { padding: 5 },
  headerTitle: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
  container: {
    flex: 1,
    padding: 15,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  queueCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#0055B8',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0055B8',
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 12,
  },
  cardBody: {},
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 13,
    color: '#757575',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.text,
    textAlign: 'right',
    flex: 1,
    marginLeft: 10,
  },
  infoValueLarge: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'right',
    flex: 1,
    marginLeft: 10,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 14,
    color: '#78909C',
    textAlign: 'center',
  }
});
