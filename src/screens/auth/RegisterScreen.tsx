import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator, SafeAreaView, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { auth, db } from '../../config/firebaseConfig';
import { COLORS } from '../../utils/colors';

export default function RegisterScreen({ navigation }: any) {
  const [nik, setNik] = useState('');
  const [nama, setNama] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [password, setPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');
  const [loading, setLoading] = useState(false);

  const generateCaptcha = () => {
    const random = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedCaptcha(random);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleRegister = async () => {
    if (!nik || !nama || !password || !captchaInput) {
      Alert.alert('Error', 'Harap lengkapi NIK, Nama, Password, dan Captcha');
      return;
    }

    if (captchaInput !== generatedCaptcha) {
      Alert.alert('Error', 'Captcha tidak sesuai');
      generateCaptcha();
      setCaptchaInput('');
      return;
    }

    setLoading(true);
    try {
      const dummyEmail = `${nik}@mobilejkn.local`;
      const userCredential = await auth.createUserWithEmailAndPassword(dummyEmail, password);
      const uid = userCredential.user?.uid;

      if (uid) {
        await db.collection('users').doc(uid).set({
          uid,
          nik,
          nama,
          tanggalLahir,
        });
      }
    } catch (error: any) {
      Alert.alert('Registrasi Gagal', error.message);
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
        <Text style={styles.headerTitle}>Pendaftaran Pengguna Mobile</Text>
        <View style={{ width: 24 }} />
      </LinearGradient>

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>mabile</Text>
            <Text style={styles.logoTextBold}>JKN</Text>
          </View>
          <Text style={styles.welcomeTitle}>Selamat Datang di Mobile JKN</Text>
          <Text style={styles.welcomeSubtitle}>Silakan isi data diri Anda dengan sesuai.</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Nomor Induk Kependudukan (NIK)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={nik}
            onChangeText={setNik}
            maxLength={16}
          />
          <Text style={styles.charCount}>{nik.length}/16</Text>

          <Text style={styles.label}>Nama Lengkap</Text>
          <TextInput
            style={styles.input}
            value={nama}
            onChangeText={setNama}
          />

          <Text style={styles.label}>Tanggal Lahir</Text>
          <TextInput
            style={styles.input}
            value={tanggalLahir}
            onChangeText={setTanggalLahir}
            placeholder="DD-MM-YYYY"
          />
          
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <View style={styles.labelRow}>
            <Text style={styles.label}>Kode Referral (Opsional)</Text>
            <Ionicons name="information-circle-outline" size={16} color="#0084A3" style={{ marginLeft: 5 }} />
          </View>
          <View style={styles.inputWithIcon}>
            <TextInput style={styles.inputFlex} />
            <MaterialCommunityIcons name="qrcode-scan" size={24} color="#0084A3" />
          </View>

          <Text style={styles.label}>Captcha</Text>
          <View style={styles.inputWithIcon}>
            <TextInput 
              style={styles.inputFlex} 
              value={captchaInput}
              onChangeText={setCaptchaInput}
              keyboardType="numeric"
            />
            <View style={styles.captchaBox}>
              <Text style={styles.captchaText}>{generatedCaptcha}</Text>
            </View>
            <TouchableOpacity onPress={generateCaptcha}>
              <Ionicons name="refresh" size={24} color="#E65100" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
            <LinearGradient
              colors={['#29B6F6', '#0277BD']}
              style={styles.registerGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <Text style={styles.registerText}>Verifikasi Data</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    backgroundColor: COLORS.white,
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 20,
  },
  logoBox: {
    width: 60,
    height: 60,
    backgroundColor: '#0070BA',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  logoText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '600',
    marginBottom: -3,
  },
  logoTextBold: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0084A3',
    marginBottom: 5,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#455A64',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 14,
    color: '#0084A3',
    marginBottom: 8,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#4DD0E1',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: COLORS.white,
    marginBottom: 5,
  },
  charCount: {
    textAlign: 'right',
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 15,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4DD0E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 20,
    backgroundColor: COLORS.white,
  },
  inputFlex: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
  },
  captchaBox: {
    marginRight: 10,
  },
  captchaText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#33691E',
    letterSpacing: 2,
  },
  registerButton: {
    marginTop: 10,
    borderRadius: 25,
    overflow: 'hidden',
  },
  registerGradient: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  }
});
