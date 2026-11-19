# mobile-jkn-replica

Replika aplikasi **Mobile JKN** (Jaminan Kesehatan Nasional / BPJS Kesehatan) berbasis React Native / Expo.

> **Catatan:** ini replika untuk latihan — **bukan aplikasi resmi BPJS Kesehatan**.

## Fitur

- Login dengan CAPTCHA dan biometrik
- Antrean layanan
- Riwayat layanan
- Navigasi antar layar layanan kesehatan

## Tech Stack

Expo SDK 54, React Native 0.81.5, React 19.1, React Navigation 7 (native-stack + bottom-tabs), Firebase 8.10.0 (Firestore untuk data antrean), `expo-local-authentication` (biometrik), TypeScript.

## Cara Menjalankan

```bash
npm install
npm start        # expo start
npm run android  # expo start --android
npm run ios      # expo start --ios
npm run web      # expo start --web
```

## Struktur

```
App.tsx       # Entry point aplikasi
src/          # Kode sumber aplikasi
app.json      # Konfigurasi Expo (nama: mobile-jkn)
```

## Status

Terakhir disentuh 3 Juli 2026. Tidak ada demo live.
