import { Story } from '@/lib/types';
import { FaUser, FaCalendar, FaArrowRight } from 'react-icons/fa';

interface StoryCardProps {
  story: Story;
}

const StoryCard = ({ story }: StoryCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        <img 
          src={story.imageUrl} 
          alt={story.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback image on error
            e.currentTarget.src = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
          }}
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-heading font-bold mb-2">{story.title}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span className="mr-3">
            <FaUser className="inline mr-1" /> {story.author}
          </span>
          <span>
            <FaCalendar className="inline mr-1" /> {new Date(story.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
        <p className="text-gray-600 mb-4 flex-grow">{story.description}</p>
        <a 
          href={story.sourceLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 font-accent font-medium inline-flex items-center transition-colors mt-auto"
        >
          Read Full Story <FaArrowRight className="ml-2" />
        </a>
      </div>
    </div>
  );
};

export default StoryCard;
