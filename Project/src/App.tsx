import React, { useState } from 'react';
import './App.css';
import { EventItem, StudentRegistration } from './types';
import { EventCard } from './EventCard';

export const App: React.FC = () => {
  // 1. Initial State
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [events, setEvents] = useState<EventItem[]>([
    {
      id: 1,
      title: 'TechnoSpark Hackathon',
      date: '2026-10-25',
      venue: 'Auditorium Hall',
      department: 'Computer Tech',
      registeredCount: 42,
    },
    {
      id: 2,
      title: 'Web Dev Workshop',
      date: '2026-11-02',
      venue: 'Lab 3',
      department: 'IT',
      registeredCount: 28,
    },
  ]);

  // Admin New Event Form State
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDate, setNewDate] = useState<string>('');
  const [newVenue, setNewVenue] = useState<string>('');
  const [newDept, setNewDept] = useState<string>('');

  // Student Modal & Confirmation State
  const [activeEvent, setActiveEvent] = useState<EventItem | null>(null);
  const [student, setStudent] = useState<StudentRegistration>({ name: '', email: '', rollNo: '' });
  const [confirmationMsg, setConfirmationMsg] = useState<string | null>(null);

  // Admin: Add Event
  const handleAddEvent = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!newTitle.trim() || !newDate || !newVenue.trim()) return;

    const newEvent: EventItem = {
      id: Date.now(),
      title: newTitle.trim(),
      date: newDate,
      venue: newVenue.trim(),
      department: newDept.trim() || 'General',
      registeredCount: 0,
    };

    setEvents((prev) => [...prev, newEvent]);
    setNewTitle('');
    setNewDate('');
    setNewVenue('');
    setNewDept('');
  };

  // Admin: Delete Event
  const handleDeleteEvent = (id: number): void => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  };

  // Student: Register Submit
  const handleStudentRegister = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!activeEvent || !student.name.trim() || !student.rollNo.trim()) return;

    // Increment registration count
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === activeEvent.id ? { ...ev, registeredCount: ev.registeredCount + 1 } : ev
      )
    );

    setConfirmationMsg(
      `Registration Confirmed! ${student.name} (${student.rollNo}) registered for "${activeEvent.title}".`
    );

    // Reset modal state
    setActiveEvent(null);
    setStudent({ name: '', email: '', rollNo: '' });
  };

  return (
    <div className="portal-container">
      {/* Header */}
      <header className="portal-header">
        <div>
          <h1 style={{ margin: 0, fontSize: '1.6rem' }}>College Event Portal</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
            Current Mode: <strong>{isAdmin ? 'Admin View' : 'Student View'}</strong>
          </p>
        </div>
        <button className="toggle-btn" onClick={() => setIsAdmin(!isAdmin)}>
          Switch to {isAdmin ? 'Student Mode' : 'Admin Mode'}
        </button>
      </header>

      {/* Confirmation Alert */}
      {confirmationMsg && (
        <div className="confirmation-box">
          {confirmationMsg}
          <button
            onClick={() => setConfirmationMsg(null)}
            style={{ float: 'right', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Admin Panel: Add New Event */}
      {isAdmin && (
        <div className="card-box">
          <h2 style={{ fontSize: '1.1rem', marginTop: 0 }}>Create New College Event</h2>
          <form className="form-grid" onSubmit={handleAddEvent}>
            <input
              type="text"
              placeholder="Event Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Venue"
              value={newVenue}
              onChange={(e) => setNewVenue(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Department"
              value={newDept}
              onChange={(e) => setNewDept(e.target.value)}
            />
            <button type="submit" className="btn-primary">Add Event</button>
          </form>
        </div>
      )}

      {/* Events List */}
      <h2 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Upcoming Campus Events</h2>
      {events.length === 0 ? (
        <p style={{ color: '#94a3b8' }}>No events listed currently.</p>
      ) : (
        <div className="event-grid">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isAdmin={isAdmin}
              onRegisterClick={(selected) => {
                setConfirmationMsg(null);
                setActiveEvent(selected);
              }}
              onDeleteClick={handleDeleteEvent}
            />
          ))}
        </div>
      )}

      {/* Student Registration Modal */}
      {activeEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ marginTop: 0 }}>Register: {activeEvent.title}</h3>
            <form onSubmit={handleStudentRegister} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="text"
                placeholder="Full Name"
                value={student.name}
                onChange={(e) => setStudent({ ...student, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Roll Number"
                value={student.rollNo}
                onChange={(e) => setStudent({ ...student, rollNo: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="College Email"
                value={student.email}
                onChange={(e) => setStudent({ ...student, email: e.target.value })}
                required
              />
              <div className="modal-buttons">
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Confirm</button>
                <button type="button" className="btn-secondary" onClick={() => setActiveEvent(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;