import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../utils/colors';
import { AuthContext } from '../../context/AuthContext';

export default function FaskesRujukanScreen({ navigation }: any) {
  const { userData } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#3C73CD" />
      {/* Custom Header */}
      <LinearGradient
        colors={['#1CB5E0', '#000046']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Faskes Rujukan Tingkat Lanjut</Text>
        <View style={{ width: 24 }} />
      </LinearGradient>

      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Peserta</Text>
        <View style={styles.dropdown}>
          <Text style={styles.dropdownText}>
            {userData ? `${userData.nama} (${userData.nik})` : 'Memuat data peserta...'}
          </Text>
          <Ionicons name="caret-down-circle" size={20} color="#0084A3" />
        </View>

        <View style={styles.emptyState}>
          <MaterialCommunityIcons name="magnify" size={100} color="#CFD8DC" style={styles.emptyIcon} />
          <Text style={styles.emptyText}>Anda belum memiliki rujukan</Text>
          <Text style={styles.emptyText}>atau surat kontrol.</Text>
        </View>
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0084A3',
    marginBottom: 10,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#0084A3',
    borderRadius: 8,
    padding: 12,
  },
  dropdownText: {
    fontSize: 14,
    color: COLORS.text,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});
