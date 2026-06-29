import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { AuthContext } from '../../context/AuthContext';
import { COLORS } from '../../utils/colors';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { userData } = useContext(AuthContext);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const InfoRow = ({ label, value }: { label: string, value: string }) => (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImage}>
          <Ionicons name="person" size={50} color={COLORS.primary} />
        </View>
        <Text style={styles.name}>{userData?.nama || 'Pengguna'}</Text>
        <Text style={styles.noBpjs}>{userData?.noBpjs || '-'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Diri</Text>
        <View style={styles.card}>
          <InfoRow label="NIK" value={userData?.nik || '-'} />
          <InfoRow label="Nama Lengkap" value={userData?.nama || '-'} />
          <InfoRow label="Nomor BPJS" value={userData?.noBpjs || '-'} />
          <InfoRow label="Faskes Tk. 1" value={userData?.faskes || '-'} />
          <InfoRow label="Kelas Rawat" value={userData?.kelasRawat || '-'} />
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
        <Ionicons name="log-out-outline" size={24} color={COLORS.error} />
        <Text style={styles.logoutText}>Keluar (Sign Out)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 80,
    paddingBottom: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.white,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  name: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
  noBpjs: {
    color: COLORS.white,
    fontSize: 14,
    marginTop: 5,
    opacity: 0.8,
  },
  section: {
    padding: 20,
    marginTop: -20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
    marginLeft: 5,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  infoLabel: {
    color: COLORS.darkGray,
    fontSize: 14,
    flex: 1,
  },
  infoValue: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  logoutText: {
    color: COLORS.error,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
});
