// AppointmentReport.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles for the PDF
const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontSize: 12,
    },
    section: {
        marginBottom: 20,
    },
    header: {
        fontSize: 18,
        marginBottom: 10,
    },
    item: {
        marginBottom: 5,
    },
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderColor: '#ddd',
    },
    tableCell: {
        width: '25%',
        borderRightWidth: 1,
        borderRightStyle: 'solid',
        borderColor: '#ddd',
        padding: 5,
    },
    tableCellLast: {
        borderRightWidth: 0,
    },
});

const AppointmentReport = ({ appointments, date }) => (
    <Document>
        <Page style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.header}>Appointments for {date}</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableCell, styles.tableCellLast]}>ID</Text>
                        <Text style={[styles.tableCell, styles.tableCellLast]}>Name</Text>
                        <Text style={[styles.tableCell, styles.tableCellLast]}>Purpose</Text>
                        <Text style={[styles.tableCell, styles.tableCellLast]}>Contact</Text>
                    </View>
                    {appointments.map(appoint => (
                        <View key={appoint._id} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{appoint.appointmentId}</Text>
                            <Text style={styles.tableCell}>{appoint.name}</Text>
                            <Text style={styles.tableCell}>{appoint.purpose}</Text>
                            <Text style={styles.tableCell}>{appoint.contact}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </Page>
    </Document>
);

export default AppointmentReport;
