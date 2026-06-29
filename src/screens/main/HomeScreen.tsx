import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { COLORS } from '../../utils/colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }: any) {
  const { userData } = useContext(AuthContext);

  const menuItems = [
    { id: 1, title: 'Info Peserta', icon: 'card-account-details-outline', lib: 'MaterialCommunityIcons', route: 'CardTab' },
    { id: 2, title: 'Pendaftaran Antrean', icon: 'hospital-building', lib: 'MaterialCommunityIcons', route: 'QueueTab' },
    { id: 3, title: 'Tagihan', icon: 'receipt', lib: 'Ionicons', route: null },
    { id: 4, title: 'Info JKN', icon: 'information-circle-outline', lib: 'Ionicons', route: null },
    { id: 5, title: 'Konsultasi Dokter', icon: 'stethoscope', lib: 'MaterialCommunityIcons', route: null },
    { id: 6, title: 'Riwayat Pelayanan', icon: 'history', lib: 'MaterialCommunityIcons', route: null },
  ];

  return (
    <View style={styles.container}>
      {/* Header Profile */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Halo,</Text>
            <Text style={styles.name}>{userData?.nama || 'Peserta JKN'}</Text>
            <Text style={styles.noBpjs}>{userData?.noBpjs || '-'}</Text>
          </View>
          <View style={styles.profileIcon}>
            <Ionicons name="person" size={24} color={COLORS.primary} />
          </View>
        </View>
      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
        {/* Banner / Notice */}
        <View style={styles.banner}>
          <MaterialCommunityIcons name="bullhorn-outline" size={24} color={COLORS.white} />
          <Text style={styles.bannerText}>
            Status kepesertaan Anda AKTIF. Selalu jaga kesehatan Anda.
          </Text>
        </View>

        {/* Menu Grid */}
        <View style={styles.gridContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.gridItem}
              onPress={() => {
                if (item.route) {
                  navigation.navigate(item.route);
                }
              }}
            >
              <View style={styles.iconContainer}>
                {item.lib === 'Ionicons' ? (
                  <Ionicons name={item.icon as any} size={30} color={COLORS.primary} />
                ) : (
                  <MaterialCommunityIcons name={item.icon as any} size={30} color={COLORS.primary} />
                )}
              </View>
              <Text style={styles.menuText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    color: COLORS.white,
    fontSize: 16,
  },
  name: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 5,
  },
  noBpjs: {
    color: COLORS.white,
    fontSize: 14,
    marginTop: 5,
    opacity: 0.8,
  },
  profileIcon: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 20,
  },
  body: {
    flex: 1,
    marginTop: -20,
  },
  bodyContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  banner: {
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  bannerText: {
    color: COLORS.white,
    marginLeft: 10,
    flex: 1,
    fontSize: 13,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '30%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    marginBottom: 10,
  },
  menuText: {
    fontSize: 12,
    textAlign: 'center',
    color: COLORS.text,
  },
});
