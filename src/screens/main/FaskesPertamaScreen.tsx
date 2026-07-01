import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar, ScrollView, TextInput, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from '../../utils/colors';
import { AuthContext } from '../../context/AuthContext';
import { db, firebase } from '../../config/firebaseConfig';

export default function FaskesPertamaScreen({ navigation }: any) {
  const { user, userData } = useContext(AuthContext);
  const [keluhan, setKeluhan] = useState('');
  const [poli, setPoli] = useState('UMUM');
  const [jadwal, setJadwal] = useState('');
  const [tanggalDaftar, setTanggalDaftar] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setTanggalDaftar(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSimpan = async () => {
    if (!keluhan || !jadwal) {
      Alert.alert('Error', 'Harap lengkapi semua data');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'Anda belum login');
      return;
    }

    setLoading(true);
    try {
      await db.collection('queues').add({
        uid: user.uid,
        type: 'FaskesPertama',
        poli: poli,
        tanggal: formatDate(tanggalDaftar),
        jadwal: jadwal,
        keluhan,
        status: 'active',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Sukses', 'Antrean berhasil disimpan');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Gagal', error.message);
    } finally {
      setLoading(false);
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
        <Text style={styles.headerTitle}>Fasilitas Kesehatan Tingkat Pertama</Text>
        <View style={{ width: 24 }} />
      </LinearGradient>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Peserta</Text>
        <View style={styles.dropdown}>
          <Text style={styles.dropdownText}>
            {userData ? `${userData.nama} (${userData.nik})` : 'Memuat data peserta...'}
          </Text>
          <Ionicons name="caret-down-circle" size={20} color="#0084A3" />
        </View>

        <Text style={styles.sectionTitle}>Faskes Tingkat Pertama</Text>
        <View style={styles.faskesCardWrapper}>
          <View style={styles.faskesCard}>
            <Text style={styles.faskesName}>JENGGOT</Text>
            <View style={styles.divider} />
            <View style={styles.faskesInfoRow}>
              <View style={styles.faskesInfoLabel}>
                <Ionicons name="home" size={14} color={COLORS.error} />
                <Text style={styles.faskesLabelText}>Alamat</Text>
              </View>
              <Text style={styles.faskesValueText}>JL. PELITA 3 NO 1A</Text>
            </View>
            <View style={styles.faskesInfoRow}>
              <View style={styles.faskesInfoLabel}>
                <Ionicons name="call" size={14} color={COLORS.success} />
                <Text style={styles.faskesLabelText}>Telepon</Text>
              </View>
              <Text style={styles.faskesValueText}>0285-431635</Text>
            </View>
          </View>
          <Ionicons name="caret-down" size={20} color="#B0BEC5" style={{ marginLeft: 10 }} />
        </View>

        <Text style={styles.sectionTitle}>Pilih Poli</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={poli}
            onValueChange={(itemValue) => setPoli(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="POLI UMUM" value="UMUM" />
            <Picker.Item label="POLI GIGI" value="GIGI" />
            <Picker.Item label="KIA / KB" value="KIA" />
          </Picker>
        </View>

        <Text style={styles.sectionTitle}>Pilih Tanggal Daftar</Text>
        <TouchableOpacity style={styles.dropdown} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dropdownText}>Hari ini ( {formatDate(tanggalDaftar)} )</Text>
          <Ionicons name="calendar-outline" size={20} color="#0084A3" />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={tanggalDaftar}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        <Text style={styles.sectionTitle}>Pilih Jadwal</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={jadwal}
            onValueChange={(itemValue) => setJadwal(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Pilih Tenaga Medis" value="" color="#90A4AE" />
            <Picker.Item label="dr. ANDI (08:00 - 12:00)" value="dr. ANDI" />
            <Picker.Item label="dr. BUDI (13:00 - 17:00)" value="dr. BUDI" />
          </Picker>
        </View>

        <Text style={styles.sectionTitle}>Keluhan</Text>
        <TextInput 
          style={styles.textArea}
          placeholder="Silakan isi keluhan . . ."
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          value={keluhan}
          onChangeText={setKeluhan}
        />

        <TouchableOpacity style={{ marginTop: 20, marginBottom: 40 }} onPress={handleSimpan} disabled={loading}>
          <LinearGradient
            colors={['#29B6F6', '#0277BD']}
            style={styles.simpanBtn}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.simpanText}>Simpan</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.white },
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
  container: { flex: 1, padding: 15 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#0084A3', marginBottom: 8, marginTop: 15 },
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
  dropdownText: { fontSize: 14, color: COLORS.text },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#0084A3',
    borderRadius: 8,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  faskesCardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  faskesCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#0084A3',
    borderRadius: 8,
    padding: 12,
  },
  faskesName: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 8,
  },
  divider: { height: 1, backgroundColor: '#E0E0E0', marginBottom: 8 },
  faskesInfoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  faskesInfoLabel: { flexDirection: 'row', alignItems: 'center' },
  faskesLabelText: { fontSize: 12, color: COLORS.text, marginLeft: 5 },
  faskesValueText: { fontSize: 12, color: COLORS.text, fontWeight: '500' },
  textArea: {
    borderWidth: 1,
    borderColor: '#0084A3',
    borderRadius: 8,
    padding: 12,
    height: 100,
    fontSize: 14,
  },
  simpanBtn: {
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  simpanText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  }
});
