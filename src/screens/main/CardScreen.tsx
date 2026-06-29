import React, { useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { COLORS } from '../../utils/colors';

const { width } = Dimensions.get('window');

export default function CardScreen() {
  const { userData } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Kartu KIS Digital</Text>
      
      <View style={styles.cardContainer}>
        {/* We use a solid color background, but ideally it could be an ImageBackground with texture */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.logoText}>BPJS Kesehatan</Text>
            <Text style={styles.logoSubtext}>Kartu Indonesia Sehat</Text>
          </View>
          
          <View style={styles.cardBody}>
            <Text style={styles.label}>Nomor Kartu</Text>
            <Text style={styles.cardNumber}>{userData?.noBpjs || '0000 0000 0000 0000'}</Text>
            
            <Text style={styles.label}>Nama</Text>
            <Text style={styles.value}>{userData?.nama?.toUpperCase() || 'NAMA PESERTA'}</Text>
            
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>Faskes Tk. 1</Text>
                <Text style={styles.value}>{userData?.faskes || '-'}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>NIK</Text>
                <Text style={styles.value}>{userData?.nik || '-'}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.cardFooter}>
            <Text style={styles.footerText}>
              Bawalah kartu ini (fisik/digital) setiap kali berobat.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray,
    padding: 20,
    alignItems: 'center',
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 30,
    alignSelf: 'flex-start',
  },
  cardContainer: {
    width: width - 40,
    height: (width - 40) * 0.65,
    borderRadius: 15,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    backgroundColor: COLORS.white,
  },
  card: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: COLORS.primaryLight,
  },
  cardHeader: {
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.primary,
  },
  logoText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  logoSubtext: {
    color: COLORS.text,
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardBody: {
    padding: 15,
    flex: 1,
  },
  label: {
    color: COLORS.white,
    fontSize: 10,
    marginTop: 8,
    opacity: 0.8,
  },
  cardNumber: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginTop: 2,
  },
  value: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-between',
  },
  col: {
    flex: 1,
  },
  cardFooter: {
    backgroundColor: COLORS.secondary,
    padding: 8,
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.white,
    fontSize: 9,
  },
});
