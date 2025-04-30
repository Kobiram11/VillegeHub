import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// Define styles for the PDF report
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Helvetica',
    },
    sectionTitle: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    field: {
        marginBottom: 4,
    },
    membersList: {
        marginTop: 10,
    },
    memberCard: {
        marginBottom: 10,
        paddingBottom: 5,
        borderBottom: '1px solid #000',
    },
});

// PDF Document Component
const FamilyReport = ({ family }) => (
    <Document>
        <Page style={styles.page}>
            <Text style={styles.sectionTitle}>👪 Family Details Report</Text>
            <View>
                <Text style={styles.field}><Text style={{ fontWeight: 'bold' }}>Family Reference:</Text> {family.familyRef}</Text>
                <Text style={styles.field}><Text style={{ fontWeight: 'bold' }}>Number of Members:</Text> {family.noOfMembers}</Text>
                <Text style={styles.field}><Text style={{ fontWeight: 'bold' }}>Head of Household Name:</Text> {family.headOfHouseholdName}</Text>
                <Text style={styles.field}><Text style={{ fontWeight: 'bold' }}>Head of Household NIC:</Text> {family.headOfHouseholdNIC}</Text>
                <Text style={styles.field}><Text style={{ fontWeight: 'bold' }}>Head of Household Contact:</Text> {family.headOfHouseholdContact}</Text>
                <Text style={styles.field}><Text style={{ fontWeight: 'bold' }}>Head of Household Email:</Text> {family.headOfHouseholdEmail}</Text>
                <Text style={styles.field}><Text style={{ fontWeight: 'bold' }}>Remarks:</Text> {family.headOfHouseholdRemarks || 'None'}</Text>
            </View>

            <View style={styles.membersList}>
                <Text style={styles.sectionTitle}>Family Members</Text>
                {family.members.map((member) => (
                    <View key={member.memberId} style={styles.memberCard}>
                        <Text><Text style={{ fontWeight: 'bold' }}>Member ID:</Text> {member.memberId}</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>Full Name:</Text> {member.fullName}</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>Date of Birth:</Text> {new Date(member.dateOfBirth).toLocaleDateString()}</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>Age:</Text> {member.age}</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>Gender:</Text> {member.gender}</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>Educational Level:</Text> {member.educationalLevel}</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>NIC:</Text> {member.NIC || 'Not provided'}</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>Contact Number:</Text> {member.contactNumber}</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>Email:</Text> {member.email}</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>Voting Eligibility:</Text> {member.votingEligibility}</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>Job:</Text> {member.job || 'Not applicable'}</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>School Name:</Text> {member.schoolName || 'Not applicable'}</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>Net Income:</Text> {member.netIncome ? `$${member.netIncome}` : 'Not applicable'}</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>Remarks:</Text> {member.remarks || 'None'}</Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

// Component to generate the PDF download link
const ReportGenerator = ({ family }) => (
    <div className="report-generator">
        <PDFDownloadLink
            document={<FamilyReport family={family} />}
            fileName={`${family.familyRef}_Family_Report.pdf`}
            className="download-link"
        >
            {({ blob, url, loading, error }) =>
                loading ? 'Generating PDF...' : 'Download Family Report'
            }
        </PDFDownloadLink>
    </div>
);

export default ReportGenerator;
