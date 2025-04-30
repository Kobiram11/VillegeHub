import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Styles/FrontFvisit.css';

function FrontFvisit() {
  const [visits, setVisits] = useState([]);
  const [newVisit, setNewVisit] = useState({ date: '', location: '', purpose: '', notes: '' });
  const [highlightedDates, setHighlightedDates] = useState([]);
  const [editVisit, setEditVisit] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    fetchFieldVisits();
  }, []);

  const fetchFieldVisits = async () => {
    try {
      const response = await axios.get('http://localhost:8070/field/get');
      setVisits(response.data);
      const dates = response.data.map((visit) => new Date(visit.date));
      setHighlightedDates(dates);
    } catch (error) {
      console.error('Error fetching field visits:', error);
      toast.error('Failed to load field visits!');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVisit({ ...newVisit, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8070/field/add', newVisit);
      toast.success('Field visit added successfully!');
      fetchFieldVisits();
      setNewVisit({ date: '', location: '', purpose: '', notes: '' });
    } catch (error) {
      console.error('Error submitting field visit:', error);
      toast.error('Error submitting field visit!');
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8070/field/update/${editVisit._id}`, editVisit);
      toast.success('Field visit updated successfully!');
      setShowUpdateModal(false);
      setEditVisit(null);
      fetchFieldVisits();
    } catch (error) {
      console.error('Error updating field visit:', error);
      toast.error('Error updating field visit!');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/field/delete/${id}`);
      toast.success('Field visit deleted successfully!');
      fetchFieldVisits();
    } catch (error) {
      console.error('Error deleting field visit:', error);
      toast.error('Error deleting field visit!');
    }
  };

  const handleEditClick = (visit) => {
    setEditVisit(visit);
    setShowUpdateModal(true);
  };

  const handleModalClose = () => {
    setShowUpdateModal(false);
    setEditVisit(null);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditVisit({ ...editVisit, [name]: value });
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (highlightedDates.some((d) => d.toDateString() === date.toDateString())) {
        return 'front-fvisit-highlight';
      }
    }
    return null;
  };

  useEffect(() => {
    const deleteOldVisits = async () => {
      const now = new Date();
      for (const visit of visits) {
        const visitDate = new Date(visit.date);
        const hoursDifference = (now - visitDate) / (1000 * 60 * 60);
        if (hoursDifference >= 5) {
          await handleDelete(visit._id);
        }
      }
    };

    const interval = setInterval(() => {
      deleteOldVisits();
    }, 10000);

    return () => clearInterval(interval);
  }, [visits]);

  return (
    <div className="front-fvisit-container">
      <h1 className="front-fvisit-heading">Field Visits</h1>

      <div className="front-fvisit-form-calendar">
        <div className="front-fvisit-calendar">
          <Calendar tileClassName={tileClassName} className="front-fvisit-calendar-custom" />
        </div>

        <div className="front-fvisit-form">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formDate" className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={newVisit.date}
                min={new Date().toISOString().split("T")[0]}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formLocation" className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                placeholder="Enter location"
                value={newVisit.location}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPurpose" className="mb-3">
              <Form.Label>Purpose</Form.Label>
              <Form.Select
                name="purpose"
                value={newVisit.purpose}
                onChange={handleInputChange}
                required
              >
                <option value="">Select purpose</option>
                <option value="Subsides">Subsides</option>
                <option value="Register Member">Register Member</option>
                <option value="Training Session">Training Session</option>
                <option value="Client Meeting">Client Meeting</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formNotes" className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                type="text"
                name="notes"
                placeholder="Enter notes (optional)"
                value={newVisit.notes}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Visit
            </Button>
          </Form>
        </div>
      </div>

      <Modal show={showUpdateModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Field Visit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateSubmit}>
            <Form.Group controlId="formDate" className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={editVisit?.date || ''}
                onChange={handleEditInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formLocation" className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                placeholder="Enter location"
                value={editVisit?.location || ''}
                onChange={handleEditInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPurpose" className="mb-3">
              <Form.Label>Purpose</Form.Label>
              <Form.Select
                name="purpose"
                value={editVisit?.purpose || ''}
                onChange={handleEditInputChange}
                required
              >
                <option value="">Select purpose</option>
                <option value="Subsides">Subsides</option>
                <option value="Register Member">Register Member</option>
                <option value="Training Session">Training Session</option>
                <option value="Client Meeting">Client Meeting</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formNotes" className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                type="text"
                name="notes"
                placeholder="Enter notes (optional)"
                value={editVisit?.notes || ''}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Visit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <ul className="front-fvisit-visit-list">
        {visits.map((visit) => (
          <li key={visit._id} className="front-fvisit-visit-item">
            <div className="front-fvisit-visit-details">
              <p><strong>Date:</strong> {new Date(visit.date).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {visit.location}</p>
              <p><strong>Purpose:</strong> {visit.purpose}</p>
              <p><strong>Notes:</strong> {visit.notes}</p>
            </div>
            <div className="front-fvisit-button-group">
              <Button variant="info" onClick={() => handleEditClick(visit)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDelete(visit._id)}>
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

export default FrontFvisit;