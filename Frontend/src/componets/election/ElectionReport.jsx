import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12 },
  section: { marginBottom: 10 },
  table: { display: "table", width: "auto" },
  tableRow: { flexDirection: "row" },
  tableCol: { width: "25%", borderStyle: "solid", borderWidth: 1, borderColor: '#000' },
  tableCell: { margin: "auto", marginTop: 5, fontSize: 10 }
});

// Create a document component
const ElectionReport = ({ residents }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.section}>Registered Residents Report</Text>

      <View style={styles.table}>
        {/* Table header */}
        <View style={styles.tableRow}>
          <View style={styles.tableCol}><Text style={styles.tableCell}>NIC</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Full Name</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Voter Status</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Email</Text></View>
        </View>

        {/* Table rows */}
        {residents.map(resident => (
          <View style={styles.tableRow} key={resident.NIC}>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{resident.NIC}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{resident.FullName}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{resident.VoterStatus}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{resident.Email}</Text></View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

// PDF download button component
const ElectionReportButton = ({ residents }) => (
  <PDFDownloadLink
    document={<ElectionReport residents={residents} />}
    fileName="RegisteredResidentsReport.pdf"
  >
    {({ loading }) => (loading ? 'Generating PDF...' : 'Download Report')}
  </PDFDownloadLink>
);

export default ElectionReportButton;
