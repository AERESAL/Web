import { useEffect, useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import EventCard from '@/components/EventCard';
import StoryCard from '@/components/StoryCard';
import { Event, Story } from '@/lib/types';
import { FaSeedling, FaHandsHelping, FaLeaf, FaHeart, FaUsers, FaLightbulb, FaCheckCircle, FaCalendarAlt, FaArrowRight, FaEnvelope } from 'react-icons/fa';
import { Link } from 'wouter';

const Home = () => {
  const eventSectionRef = useRef<HTMLElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Fetch events data
  const { 
    data: events = [], 
    isLoading: isLoadingEvents 
  } = useQuery<Event[]>({ 
    queryKey: ['/api/events'],
  });

  // Fetch stories data
  const { 
    data: stories = [], 
    isLoading: isLoadingStories 
  } = useQuery<Story[]>({ 
    queryKey: ['/api/stories'],
  });

  // Scroll to section if URL has hash
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          const yOffset = -80; // Header height offset
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section id="home" className="pt-28 pb-10 bg-gradient-to-b from-primary/10 to-neutral">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-dark text-center mb-8">
            Growing Communities, <span className="text-primary">Sustaining Futures</span>
          </h1>
          
          {/* Google Slides Carousel */}
          <div className="relative bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto mb-8 h-[400px]">
            <div className={`absolute inset-0 flex items-center justify-center ${!iframeLoaded ? "block" : "hidden"}`}>
              <Skeleton className="w-full h-full" />
            </div>
            <iframe 
              src="https://docs.google.com/presentation/d/e/2PACX-1vRCMbGlF2bYe01kBlBD8oRujGlPTIytJ-3GNxvkRX98QKzXF9aKyLYPHRu0UC0c3JpnDmLEEnJeOh3e/embed?start=true&loop=true&delayms=3000" 
              width="100%" 
              height="400"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className={`w-full h-full ${!iframeLoaded ? "invisible" : "visible"}`}
              onLoad={() => setIframeLoaded(true)}
            ></iframe>
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => {
                if (eventSectionRef.current) {
                  const yOffset = -80;
                  const y = eventSectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              className="inline-block bg-primary hover:bg-primary/90 text-white font-accent font-medium py-3 px-6 rounded-full shadow-md transition-all transform hover:scale-105"
            >
              <FaCalendarAlt className="inline mr-2" /> Upcoming Events
            </button>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" ref={eventSectionRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-dark mb-3">Upcoming Events</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join us at our upcoming events to learn more about sustainable agriculture and connect with your local farming community.
            </p>
          </div>
          
          {isLoadingEvents ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-neutral rounded-lg shadow-md overflow-hidden">
                  <div className="p-5">
                    <Skeleton className="h-4 w-20 mb-3" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-32 mb-4" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-10">
            <button className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white font-accent font-medium py-2 px-6 rounded-md transition-colors">
              View All Events
            </button>
          </div>
        </div>
      </section>
      
      {/* Stories Section */}
      <section id="stories" className="py-16 bg-neutral">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-dark mb-3">Stories From The Field</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore the latest news and success stories from our community.</p>
          </div>
          
          {isLoadingStories ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-5">
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-32 mb-3" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-10">
            <button className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white font-accent font-medium py-2 px-6 rounded-md transition-colors">
              View All Stories
            </button>
          </div>
        </div>
      </section>
      
      {/* Donate Section */}
      <section id="donate" className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold mb-4">Support Our Mission</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-lg mb-8">
              Your contribution helps us promote sustainable agriculture, support local farmers, 
              and build resilient food systems for future generations.
            </p>
            
            <div className="bg-white text-dark rounded-lg shadow-lg p-8 mb-8">
              <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                <div className="text-left">
                  <h3 className="text-2xl font-heading font-bold mb-3">Your Donation Makes a Difference</h3>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <FaSeedling className="text-primary mt-1 mr-3" />
                      <span>Fund sustainable farming education programs</span>
                    </li>
                    <li className="flex items-start">
                      <FaHandsHelping className="text-primary mt-1 mr-3" />
                      <span>Support beginning farmers with resources and mentorship</span>
                    </li>
                    <li className="flex items-start">
                      <FaLeaf className="text-primary mt-1 mr-3" />
                      <span>Promote environmental stewardship in agriculture</span>
                    </li>
                  </ul>
                </div>
                
                <div className="w-full md:w-auto">
                  <a 
                    href="https://www.gofundme.com" 
                    target="_blank" 
                    className="block bg-accent hover:bg-accent/90 text-dark font-accent font-semibold py-4 px-8 rounded-lg shadow-md transition-all transform hover:scale-105 text-center"
                  >
                    <FaHeart className="inline mr-2" /> Donate Now
                  </a>
                </div>
              </div>
            </div>
            
            <p className="text-sm opacity-80">
              Your donation may be tax-deductible. We are a registered 501(c)(3) nonprofit organization.
            </p>
          </div>
        </div>
      </section>
      
      {/* Volunteer Section */}
      <section id="volunteer" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-dark mb-3">Volunteer With Us</h2>
              <div className="w-24 h-1 bg-accent mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join our community of volunteers dedicated to supporting sustainable agriculture and food security.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-neutral rounded-lg shadow-md p-6">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaUsers className="text-primary text-2xl" />
                  </div>
                  <h3 className="text-xl font-heading font-bold">Join a Local Chapter</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Connect with volunteers in your area and participate in local initiatives, 
                  from community gardens to educational workshops.
                </p>
                <Link 
                  href="/chapters"
                  className="block w-full bg-primary hover:bg-primary/90 text-white text-center py-3 rounded-md font-accent transition-colors"
                >
                  Find Your Chapter
                </Link>
              </div>
              
              <div className="bg-neutral rounded-lg shadow-md p-6">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaLightbulb className="text-primary text-2xl" />
                  </div>
                  <h3 className="text-xl font-heading font-bold">Start a New Chapter</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Don't see a chapter in your area? Lead the way by starting a new chapter 
                  and making an impact in your local community.
                </p>
                <Link 
                  href="/chapters#start"
                  className="block w-full bg-secondary hover:bg-secondary/90 text-white text-center py-3 rounded-md font-accent transition-colors"
                >
                  Start a Chapter
                </Link>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-6">Have questions about volunteering? We're here to help!</p>
              <a 
                href="mailto:volunteer@example.org" 
                className="inline-flex items-center text-primary hover:text-primary/80 font-accent font-medium transition-colors"
              >
                <FaEnvelope className="mr-2" /> Contact Our Volunteer Coordinator
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-16 bg-neutral">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-dark mb-3">About Us</h2>
              <div className="w-24 h-1 bg-accent mx-auto mb-4"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">Our Mission</h3>
                <p className="text-gray-600 mb-6">
                  We are dedicated to promoting sustainable agricultural practices that 
                  protect our environment, support local farmers, and ensure food security for future generations.
                </p>
                
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">Our Vision</h3>
                <p className="text-gray-600 mb-6">
                  We envision a world where agriculture works in harmony with nature, 
                  where farmers are supported and valued, and where everyone has access to healthy, sustainably-grown food.
                </p>
                
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">Our Values</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-secondary mt-1 mr-3" />
                    <span><strong>Sustainability:</strong> We promote farming practices that protect and enhance our natural resources.</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-secondary mt-1 mr-3" />
                    <span><strong>Community:</strong> We believe in the power of local action and inclusive collaboration.</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-secondary mt-1 mr-3" />
                    <span><strong>Education:</strong> We share knowledge and provide resources to empower farmers and communities.</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-secondary mt-1 mr-3" />
                    <span><strong>Innovation:</strong> We embrace creative solutions and adaptive approaches to agricultural challenges.</span>
                  </li>
                </ul>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="bg-white p-2 rounded-lg shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1594761051656-97121c6e3d9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Farmers working in a field" 
                    className="rounded-md w-full h-auto"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <button className="inline-block bg-primary hover:bg-primary/90 text-white font-accent font-medium py-3 px-6 rounded-full shadow-md transition-all transform hover:scale-105">
                Learn More About Our Work
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
