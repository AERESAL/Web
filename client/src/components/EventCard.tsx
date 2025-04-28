import { Event } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { FaEnvelope } from 'react-icons/fa';

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className="bg-neutral rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
            {event.state}
          </span>
          <span className="text-sm text-gray-500">
            {formatDate(event.date)}
          </span>
        </div>
        <h3 className="text-xl font-heading font-bold mb-2">{event.name}</h3>
        <p className="text-gray-600 mb-4">
          Learn about the latest techniques in sustainable agriculture from industry experts.
        </p>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <FaEnvelope className="mr-2" />
          <span>{event.email}</span>
        </div>
        <a 
          href={event.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full bg-secondary hover:bg-secondary/90 text-white text-center py-2 rounded-md font-accent transition-colors"
        >
          Register Now
        </a>
      </div>
    </div>
  );
};

export default EventCard;
