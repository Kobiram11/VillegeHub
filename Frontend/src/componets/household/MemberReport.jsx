// MemberReport.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Define PDF styles
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  title: { fontSize: 20, marginBottom: 20, textAlign: 'center' },
  section: { marginBottom: 10 },
  label: { fontWeight: 'bold' },
});

// PDF Document Component
const MemberReport = ({ member }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Member Details Report</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Full Name:</Text>
        <Text>{member.fullName || 'N/A'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Member ID:</Text>
        <Text>{member.memberId || 'N/A'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Date of Birth:</Text>
        <Text>{member.dateOfBirth ? new Date(member.dateOfBirth).toLocaleDateString() : 'N/A'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Gender:</Text>
        <Text>{member.gender || 'N/A'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Email:</Text>
        <Text>{member.email || 'N/A'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Contact Number:</Text>
        <Text>{member.contactNumber || 'N/A'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Educational Level:</Text>
        <Text>{member.educationalLevel || 'N/A'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Voting Eligibility:</Text>
        <Text>{member.votingEligibility || 'N/A'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Remarks:</Text>
        <Text>{member.remarks || 'No remarks'}</Text>
      </View>
    </Page>
  </Document>
);

export default MemberReport;
