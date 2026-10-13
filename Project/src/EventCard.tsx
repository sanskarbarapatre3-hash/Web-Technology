import React from 'react';
import { EventItem } from './types';

interface EventCardProps {
  event: EventItem;
  isAdmin: boolean;
  onRegisterClick: (event: EventItem) => void;
  onDeleteClick: (id: number) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  isAdmin,
  onRegisterClick,
  onDeleteClick,
}) => {
  return (
    <div className="event-card">
      <div>
        <h3 style={{ margin: '0 0 6px 0', fontSize: '1.15rem' }}>{event.title}</h3>
        <span style={{ fontSize: '0.8rem', background: '#e0e7ff', color: '#3730a3', padding: '2px 8px', borderRadius: '4px' }}>
          {event.department}
        </span>
        <div className="event-meta">
          <p style={{ margin: '6px 0 2px 0' }}><strong>Date:</strong> {event.date}</p>
          <p style={{ margin: '2px 0' }}><strong>Venue:</strong> {event.venue}</p>
          <p style={{ margin: '2px 0' }}><strong>Registrations:</strong> {event.registeredCount}</p>
        </div>
      </div>

      {isAdmin ? (
        <button className="btn-danger" onClick={() => onDeleteClick(event.id)}>
          Delete Event
        </button>
      ) : (
        <button className="btn-primary" onClick={() => onRegisterClick(event)}>
          Register
        </button>
      )}
    </div>
  );
};