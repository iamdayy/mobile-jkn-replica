import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { auth, db } from '../../config/firebaseConfig';
import { COLORS } from '../../utils/colors';

export default function RegisterScreen({ navigation }: any) {
  const [nik, setNik] = useState('');
  const [noBpjs, setNoBpjs] = useState('');
  const [nama, setNama] = useState('');
  const [password, setPassword] = useState('');
  const [faskes, setFaskes] = useState('');
  const [kelasRawat, setKelasRawat] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nik || !noBpjs || !nama || !password || !faskes || !kelasRawat) {
      Alert.alert('Error', 'Harap lengkapi semua data');
      return;
    }

    setLoading(true);
    try {
      // Simulate NIK based auth using a dummy email
      const dummyEmail = `${nik}@mobilejkn.local`;
      const userCredential = await auth.createUserWithEmailAndPassword(dummyEmail, password);
      const uid = userCredential.user?.uid;

      if (uid) {
        // Save additional user info to Firestore
        await db.collection('users').doc(uid).set({
          uid,
          nik,
          noBpjs,
          nama,
          faskes,
          kelasRawat,
        });
      }

      // Navigation will be handled by AppNavigator automatically
    } catch (error: any) {
      Alert.alert('Registrasi Gagal', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Daftar</Text>
        <Text style={styles.subtitle}>Buat akun Mobile JKN Anda</Text>
      </View>

      <ScrollView style={styles.form} contentContainerStyle={{ paddingBottom: 40 }}>
        <TextInput
          style={styles.input}
          placeholder="Nomor Induk Kependudukan (NIK)"
          keyboardType="numeric"
          value={nik}
          onChangeText={setNik}
        />
        <TextInput
          style={styles.input}
          placeholder="Nomor Kartu BPJS"
          keyboardType="numeric"
          value={noBpjs}
          onChangeText={setNoBpjs}
        />
        <TextInput
          style={styles.input}
          placeholder="Nama Lengkap"
          value={nama}
          onChangeText={setNama}
        />
        <TextInput
          style={styles.input}
          placeholder="Fasilitas Kesehatan (Faskes Tk 1)"
          value={faskes}
          onChangeText={setFaskes}
        />
        <TextInput
          style={styles.input}
          placeholder="Kelas Rawat (misal: Kelas 1)"
          value={kelasRawat}
          onChangeText={setKelasRawat}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.goBack()}>
          <Text style={styles.linkText}>Sudah punya akun? Masuk</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 30,
    paddingTop: 80,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: COLORS.white,
    fontSize: 14,
    marginTop: 5,
  },
  form: {
    padding: 20,
    marginTop: 10,
  },
  input: {
    backgroundColor: COLORS.gray,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});
