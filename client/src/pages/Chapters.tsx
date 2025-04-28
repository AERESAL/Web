import { useEffect, useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Chapter } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Chapters = () => {
  const startSectionRef = useRef<HTMLDivElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Fetch chapters data
  const { 
    data: chapters = [], 
    isLoading 
  } = useQuery<Chapter[]>({ 
    queryKey: ['/api/chapters'],
  });

  // Scroll to "start chapter" section if URL has hash
  useEffect(() => {
    if (window.location.hash === '#start' && startSectionRef.current) {
      setTimeout(() => {
        const yOffset = -80; // Header height offset
        const y = startSectionRef.current!.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 100);
    }
  }, []);

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-heading font-bold text-dark mb-3">Our Chapters</h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">Find and connect with agricultural nonprofit chapters in your area or start a new one.</p>
        </div>
        
        <div className="overflow-x-auto bg-white rounded-lg shadow-md mb-16">
          {isLoading ? (
            <div className="p-6">
              <Skeleton className="h-12 w-full mb-4" />
              <Skeleton className="h-10 w-full mb-3" />
              <Skeleton className="h-10 w-full mb-3" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <table className="min-w-full">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="py-3 px-4 text-left font-accent">Chapter Name</th>
                  <th className="py-3 px-4 text-left font-accent">Location</th>
                  <th className="py-3 px-4 text-left font-accent">Contact</th>
                  <th className="py-3 px-4 text-left font-accent">Socials</th>
                  <th className="py-3 px-4 text-left font-accent">Volunteer</th>
                </tr>
              </thead>
              <tbody>
                {chapters.map((chapter) => (
                  <tr key={chapter.id} className="border-b hover:bg-neutral transition-colors">
                    <td className="py-3 px-4 font-medium">{chapter.name}</td>
                    <td className="py-3 px-4">{chapter.location}</td>
                    <td className="py-3 px-4">{chapter.email}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        {chapter.socials.facebook && (
                          <a href={chapter.socials.facebook} className="text-primary hover:text-primary/80">
                            <FaFacebook />
                          </a>
                        )}
                        {chapter.socials.instagram && (
                          <a href={chapter.socials.instagram} className="text-primary hover:text-primary/80">
                            <FaInstagram />
                          </a>
                        )}
                        {chapter.socials.twitter && (
                          <a href={chapter.socials.twitter} className="text-primary hover:text-primary/80">
                            <FaTwitter />
                          </a>
                        )}
                        {chapter.socials.youtube && (
                          <a href={chapter.socials.youtube} className="text-primary hover:text-primary/80">
                            <FaYoutube />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <a 
                        href={chapter.volunteerLink} 
                        className="text-white bg-secondary hover:bg-secondary/90 px-3 py-1 rounded text-sm inline-block transition-colors"
                      >
                        Join
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        <div id="start" ref={startSectionRef} className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-heading font-bold text-dark mb-3">Start a New Chapter</h2>
            <p className="text-gray-600">No chapter in your area? Complete the form below to start one!</p>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-4">
            <div className={`flex items-center justify-center h-96 ${!iframeLoaded ? "block" : "hidden"}`}>
              <Skeleton className="w-full h-full" />
            </div>
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLSfXA1TadS_3AkH89V5Nf5RO1gM3NPTkB0O0ILm3lxmwFRdTLQ/viewform?embedded=true" 
              width="100%" 
              height="960"
              className={`w-full h-96 ${!iframeLoaded ? "invisible" : "visible"}`}
              onLoad={() => setIframeLoaded(true)}
            >
              Loading form...
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chapters;
