import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12 },
  section: { marginBottom: 10 },
  table: { display: "table", width: "auto" },
  tableRow: { flexDirection: "row" },
  tableCol: { width: "50%", borderStyle: "solid", borderWidth: 1, borderColor: '#000' },
  tableCell: { margin: "auto", marginTop: 5, fontSize: 10 }
});

// Create a document component
const ProceduresReport = ({ procedures }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.section}>Procedures Report</Text>

      <View style={styles.table}>
        {/* Table header */}
        <View style={styles.tableRow}>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Service Name</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Service Detail</Text></View>
        </View>

        {/* Table rows */}
        {procedures.map(procedure => (
          <View style={styles.tableRow} key={procedure._id}>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{procedure.ServiceName}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{procedure.ServiceDetail}</Text></View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

// PDF download button component
const ProceduresReportButton = ({ procedures }) => (
  <PDFDownloadLink
    document={<ProceduresReport procedures={procedures} />}
    fileName="ProceduresReport.pdf"
  >
    {({ loading }) => (loading ? 'Generating PDF...' : 'Download Report')}
  </PDFDownloadLink>
);

export default ProceduresReportButton;
