import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, SafeAreaView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import { auth } from '../../config/firebaseConfig';
import { COLORS } from '../../utils/colors';

export default function LoginScreen({ navigation }: any) {
  const [nik, setNik] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  const handleLogin = async () => {
    if (!nik || !password || !captchaInput) {
      Alert.alert('Error', 'Harap isi NIK, Password, dan Captcha');
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
      await auth.signInWithEmailAndPassword(dummyEmail, password);
    } catch (error: any) {
      Alert.alert('Login Gagal', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricAuth = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        Alert.alert('Error', 'Perangkat tidak mendukung atau sidik jari belum terdaftar');
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login dengan Sidik Jari',
        fallbackLabel: 'Gunakan Password',
      });

      if (result.success) {
        Alert.alert('Sukses', 'Login biometrik berhasil. (Membutuhkan Secure Store untuk implementasi penuh)');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LinearGradient
      colors={['#1e3c72', '#2a5298', '#d38312', '#a83279']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={28} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>mabile</Text>
            <Text style={styles.logoTextBold}>JKN</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Nomor Induk Kependudukan (NIK)</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="16 Digit Nomor Induk Kependud..."
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={nik}
              onChangeText={setNik}
            />
          </View>

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Password Mobile JKN"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye" : "eye-off"} size={22} color="#999" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Captcha</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Captcha"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={captchaInput}
              onChangeText={setCaptchaInput}
            />
            <View style={styles.captchaBox}>
              <Text style={styles.captchaText}>{generatedCaptcha}</Text>
            </View>
            <TouchableOpacity onPress={generateCaptcha}>
              <Ionicons name="refresh" size={24} color="#E65100" />
            </TouchableOpacity>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
              <LinearGradient
                colors={['#29B6F6', '#0277BD']}
                style={styles.loginGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                {loading ? (
                  <ActivityIndicator color={COLORS.white} />
                ) : (
                  <Text style={styles.loginText}>Masuk</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.fingerprintButton} onPress={handleBiometricAuth}>
              <Ionicons name="finger-print" size={28} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotText}>Lupa Kata Sandi</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
            <Text style={[styles.forgotText, { marginTop: 20 }]}>Belum punya akun? Daftar di sini</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  headerRow: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    padding: 5,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  logoBox: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  logoText: {
    color: '#0055B8',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: -5,
  },
  logoTextBold: {
    color: '#0055B8',
    fontSize: 32,
    fontWeight: 'bold',
  },
  formContainer: {
    paddingHorizontal: 30,
  },
  label: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
  },
  captchaBox: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  captchaText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#333',
    letterSpacing: 3,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButton: {
    flex: 1,
    marginRight: 15,
  },
  loginGradient: {
    height: 55,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  fingerprintButton: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: '#0288D1',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4FC3F7',
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 25,
  },
  forgotText: {
    color: '#4FC3F7',
    fontSize: 15,
    fontWeight: 'bold',
  },
  registerLink: {
    alignItems: 'center',
  }
});
