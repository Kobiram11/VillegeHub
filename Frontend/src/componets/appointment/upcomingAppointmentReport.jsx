// File: src/upcomingAppointmentReport.js

import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// Styles for the PDF
const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    section: {
        marginBottom: 20,
    },
    header: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 12,
        marginBottom: 4,
    },
    appointment: {
        marginBottom: 10,
        padding: 8,
        borderBottom: '1px solid black',
    },
});

// Component to generate the PDF document
const UpcomingAppointmentReport = ({ appointments, selectedDate }) => (
    <Document>
        <Page style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.header}>Upcoming Appointments Report</Text>
                <Text>Date: {new Date(selectedDate).toDateString()}</Text>
            </View>

            {appointments.length > 0 ? (
                appointments.map((appointment) => (
                    <View key={appointment.appointmentId} style={styles.appointment}>
                        <Text style={styles.text}>ID: {appointment.appointmentId}</Text>
                        <Text style={styles.text}>Name: {appointment.name}</Text>
                        <Text style={styles.text}>Time: {appointment.time}</Text>
                        <Text style={styles.text}>Purpose: {appointment.purpose}</Text>
                        <Text style={styles.text}>Email: {appointment.email}</Text>
                        <Text style={styles.text}>Status: {appointment.status}</Text>
                    </View>
                ))
            ) : (
                <Text>No appointments available for this date.</Text>
            )}
        </Page>
    </Document>
);

// PDFDownloadLink component for generating download button
const AppointmentPDFDownload = ({ appointments, selectedDate }) => (
    <PDFDownloadLink
        document={<UpcomingAppointmentReport appointments={appointments} selectedDate={selectedDate} />}
        fileName={`upcoming_appointments_${selectedDate}.pdf`}
    >
        {({ loading }) => (loading ? 'Generating PDF...' : 'Download Report')}
    </PDFDownloadLink>
);

export default AppointmentPDFDownload;
