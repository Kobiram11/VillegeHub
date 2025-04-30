// src/components/ReportGenerator.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// Define the styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 4,
  },
});

// Create a document for PDF rendering
const HouseReport = ({ house }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>House Details Report</Text>
        <Text style={styles.text}>House Number: {house.houseNumber}</Text>
        <Text style={styles.text}>Village ID: {house.villageID}</Text>
        <Text style={styles.text}>Address: {house.address}</Text>
        <Text style={styles.text}>Land Size: {house.landsize} sq ft</Text>
        <Text style={styles.text}>Owner Name: {house.ownerName}</Text>
        <Text style={styles.text}>Owner Contact: {house.ownerContact}</Text>
        <Text style={styles.text}>Owner Email: {house.ownerEmail}</Text>
        <Text style={styles.text}>Landline Telephone: {house.landlineTelephone || 'N/A'}</Text>
        <Text style={styles.text}>Remarks: {house.remarks || 'No remarks'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Families</Text>
        {house.families.length > 0 ? (
          house.families.map((family, index) => (
            <View key={index} style={styles.section}>
              <Text style={styles.text}>Family {index + 1} (Ref: {family.familyRef})</Text>
              <Text style={styles.text}>Head of Household: {family.headOfHouseholdName}</Text>
              <Text style={styles.text}>Head of Household NIC: {family.headOfHouseholdNIC}</Text>
              <Text style={styles.text}>Head of Household Contact: {family.headOfHouseholdContact}</Text>
              <Text style={styles.text}>Members:</Text>
              {family.members.length > 0 ? (
                family.members.map((member, i) => (
                  <Text key={i} style={styles.text}>
                    - {member.fullName}, Age: {member.age}, Gender: {member.gender}
                  </Text>
                ))
              ) : (
                <Text style={styles.text}>No members found for this family.</Text>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.text}>No families found for this house.</Text>
        )}
      </View>
    </Page>
  </Document>
);

// Component for generating the PDF link
const ReportGenerator = ({ house }) => {
  return (
    <div className="report-generator">
      <PDFDownloadLink
        document={<HouseReport house={house} />}
        fileName={`house_report_${house.houseNumber}.pdf`}
      >
        {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF Report')}
      </PDFDownloadLink>
    </div>
  );
};

export default ReportGenerator;
