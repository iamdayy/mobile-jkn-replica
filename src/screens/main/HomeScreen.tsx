import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image, Platform, Modal } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { COLORS } from '../../utils/colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({ navigation }: any) {
  const { userData } = useContext(AuthContext);
  const [isQueueModalVisible, setQueueModalVisible] = useState(false);

  const menuItems = [
    { id: 1, title: 'Info Program\nJKN', icon: 'bullhorn', lib: 'MaterialCommunityIcons', color: COLORS.secondary, bg: '#E8F5E9' },
    { id: 2, title: 'Telehealth', icon: 'hospital', lib: 'MaterialCommunityIcons', color: COLORS.primary, bg: '#E3F2FD' },
    { id: 3, title: 'Info Riwayat\nPelayanan', icon: 'heart-pulse', lib: 'MaterialCommunityIcons', color: COLORS.red, bg: '#FCE4EC' },
    { id: 4, title: 'Bugar', icon: 'run', lib: 'MaterialCommunityIcons', color: '#FF9800', bg: '#FFF3E0' },
    { id: 5, title: 'NEW Rehab\n(Cicilan)', icon: 'refresh-circle', lib: 'Ionicons', color: COLORS.primary, bg: '#E3F2FD', badge: 'Baru' },
    { id: 6, title: 'Penambahan\nPeserta', icon: 'account-multiple-plus', lib: 'MaterialCommunityIcons', color: COLORS.primary, bg: '#E3F2FD' },
    { id: 7, title: 'Info Peserta', icon: 'account-group', lib: 'MaterialCommunityIcons', color: COLORS.primary, bg: '#E3F2FD' },
    { id: 8, title: 'SOS', icon: 'alert-circle', lib: 'MaterialCommunityIcons', color: COLORS.red, bg: '#FCE4EC' },
    { id: 9, title: 'Info Lokasi\nFaskes', icon: 'map-marker-radius', lib: 'MaterialCommunityIcons', color: COLORS.secondary, bg: '#E8F5E9' },
    { id: 10, title: 'Perubahan\nData Peserta', icon: 'file-document-edit', lib: 'MaterialCommunityIcons', color: COLORS.primary, bg: '#E3F2FD' },
    { id: 11, title: 'Pengaduan\nLayanan JKN', icon: 'headset', lib: 'MaterialCommunityIcons', color: COLORS.primary, bg: '#E3F2FD' },
    { id: 12, title: 'Menu Lainnya', icon: 'view-grid', lib: 'MaterialCommunityIcons', color: COLORS.primary, bg: '#E3F2FD' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Header Gradient */}
        <LinearGradient
          colors={COLORS.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerBackground}
        >
          <View style={styles.headerTop}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>Mobile</Text>
              <Text style={styles.logoTextBold}>JKN</Text>
            </View>

            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color={COLORS.text} style={styles.searchIcon} />
              <TextInput
                placeholder="Info Peserta, Info Iuran..."
                placeholderTextColor={COLORS.textLight}
                style={styles.searchInput}
              />
            </View>

            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={24} color={COLORS.white} />
            </TouchableOpacity>

            <View style={styles.profileAvatar}>
              <Ionicons name="person" size={20} color={COLORS.darkGray} />
            </View>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {/* User Status Section */}
          <View style={styles.userStatusContainer}>
            <View>
              <View style={styles.greetingRow}>
                <Text style={styles.greetingText}>Hi, {userData?.nama ? userData.nama.toUpperCase() : 'PESERTA'}</Text>
                <MaterialCommunityIcons name="check-circle" size={18} color={COLORS.secondary} style={{ marginLeft: 5 }} />
              </View>
              <Text style={styles.statusText}>Semua Keluarga Anda Terlindungi</Text>
              <Text style={styles.statusText}>(Aktif)</Text>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <Text style={styles.versionText}>v4.18.0</Text>
            </View>
          </View>

          {/* Antrean Online Banner */}
          <View style={styles.antreanCard}>
            <Text style={styles.antreanTitle}>Antrean Online</Text>
            <View style={styles.antreanBody}>
              <View style={styles.antreanImagePlaceholder}>
                <MaterialCommunityIcons name="doctor" size={50} color={COLORS.secondary} />
              </View>
              <View style={styles.antreanTextContainer}>
                <Text style={styles.antreanDesc}>
                  Untuk kunjungan lebih efisien tanpa harus menunggu lama.
                </Text>
                <View style={styles.divider} />
                <TouchableOpacity onPress={() => setQueueModalVisible(true)}>
                  <LinearGradient
                    colors={COLORS.blueGradient}
                    style={styles.ambilAntreanBtn}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.ambilAntreanText}>Ambil Antrean</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Grid Menu */}
          <View style={styles.gridContainer}>
            {menuItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.gridItem}>
                <View style={[styles.iconWrapper, { backgroundColor: item.bg }]}>
                  {item.lib === 'Ionicons' ? (
                    <Ionicons name={item.icon as any} size={28} color={item.color} />
                  ) : (
                    <MaterialCommunityIcons name={item.icon as any} size={28} color={item.color} />
                  )}
                  {item.badge && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{item.badge}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.menuText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Bottom Banner Image Placeholder */}
          <View style={styles.bottomBanner}>
            <Text style={styles.bottomBannerTitle}>JANJI LAYANAN</Text>
            <Text style={styles.bottomBannerSubtitle}>JAMINAN KESEHATAN NASIONAL (JKN)</Text>
            <Text style={styles.bottomBannerSmallText}>(di Fasilitas Kesehatan Rujukan Tingkat Lanjutan)</Text>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.bannerListItem}>1. Menerima NIK/KTP/KIS Digital untuk pendaftaran pelayanan</Text>
              <Text style={styles.bannerListItem}>2. Tidak meminta dokumen fotokopi kepada Peserta sebagai syarat pendaftaran pelayanan</Text>
              <Text style={styles.bannerListItem}>3. Memberikan pelayanan tanpa biaya tambahan di luar ketentuan</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Queue Selection Modal */}
      <Modal
        visible={isQueueModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setQueueModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setQueueModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Pilih Jenis Antrean</Text>

            <TouchableOpacity
              style={styles.modalOptionCard}
              onPress={() => {
                setQueueModalVisible(false);
                navigation.navigate('FaskesPertama');
              }}
            >
              <View style={[styles.modalIconBox, { backgroundColor: '#F5F5F5' }]}>
                <MaterialCommunityIcons name="stethoscope" size={32} color="#0055B8" />
              </View>
              <Text style={styles.modalOptionText}>Faskes Tingkat Pertama</Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.darkGray} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalOptionCard}
              onPress={() => {
                setQueueModalVisible(false);
                navigation.navigate('FaskesRujukan');
              }}
            >
              <View style={[styles.modalIconBox, { backgroundColor: '#F5F5F5' }]}>
                <MaterialCommunityIcons name="hospital-building" size={32} color="#00BCD4" />
              </View>
              <Text style={styles.modalOptionText}>Faskes Rujukan Tingkat Lanjut</Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.darkGray} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalOptionCard}
              onPress={() => {
                setQueueModalVisible(false);
                navigation.navigate('KantorCabang');
              }}
            >
              <View style={[styles.modalIconBox, { backgroundColor: '#F5F5F5' }]}>
                <MaterialCommunityIcons name="office-building" size={32} color="#00A651" />
              </View>
              <Text style={styles.modalOptionText}>Kantor Cabang</Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.darkGray} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerBackground: {
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    marginRight: 10,
    alignItems: 'center',
  },
  logoText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: -4,
  },
  logoTextBold: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 36,
    marginHorizontal: 10,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: COLORS.text,
  },
  iconButton: {
    padding: 5,
  },
  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  content: {
    paddingHorizontal: 15,
    marginTop: 15,
  },
  userStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  greetingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  statusText: {
    fontSize: 13,
    color: COLORS.textLight,
  },
  versionText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  antreanCard: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  antreanTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryLight,
    textAlign: 'center',
    marginBottom: 10,
  },
  antreanBody: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  antreanImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  antreanTextContainer: {
    flex: 1,
  },
  antreanDesc: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  ambilAntreanBtn: {
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  ambilAntreanText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: 'bold',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  gridItem: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconWrapper: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: COLORS.error,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: 'bold',
  },
  menuText: {
    fontSize: 11,
    textAlign: 'center',
    color: COLORS.text,
    lineHeight: 14,
  },
  bottomBanner: {
    backgroundColor: '#E3F2FD',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  bottomBannerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1565C0',
  },
  bottomBannerSubtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1565C0',
  },
  bottomBannerSmallText: {
    fontSize: 11,
    color: '#1565C0',
    fontStyle: 'italic',
  },
  bannerListItem: {
    fontSize: 11,
    color: COLORS.text,
    marginBottom: 5,
    lineHeight: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 25,
    paddingBottom: 40,
    paddingTop: 15,
    alignItems: 'center',
  },
  modalHandle: {
    width: 50,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0084A3', // Matched color from screenshot
    marginBottom: 25,
  },
  modalOptionCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  modalIconBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  modalOptionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.text,
  }
});
