import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useState } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await apiRequest('POST', '/api/subscribe', { email });
      toast({
        title: "Subscribed!",
        description: "You've successfully subscribed to our newsletter.",
      });
      setEmail('');
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <footer className="bg-dark text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <h4 className="text-xl font-heading font-bold mb-4">Contact Us</h4>
            <address className="not-italic mb-4">
              <p className="mb-2">123 Farm Road</p>
              <p className="mb-2">Greenville, CA 95000</p>
              <p className="mb-2">United States</p>
            </address>
            <p className="mb-2 flex items-center">
              <FaEnvelope className="mr-2" /> info@agriculturalnonprofit.org
            </p>
            <p className="flex items-center">
              <FaPhone className="mr-2" /> (555) 123-4567
            </p>
          </div>
          
          <div>
            <h4 className="text-xl font-heading font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-accent transition-colors">Home</a></li>
              <li><a href="#events" className="hover:text-accent transition-colors">Events</a></li>
              <li><a href="#stories" className="hover:text-accent transition-colors">Stories</a></li>
              <li><a href="/chapters" className="hover:text-accent transition-colors">Chapters</a></li>
              <li><a href="#donate" className="hover:text-accent transition-colors">Donate</a></li>
              <li><a href="#volunteer" className="hover:text-accent transition-colors">Volunteer</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-heading font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-accent transition-colors">Farmer Resources</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Educational Materials</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Reports & Publications</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Farming Guides</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Policy Initiatives</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-heading font-bold mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="bg-white bg-opacity-20 hover:bg-opacity-30 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="bg-white bg-opacity-20 hover:bg-opacity-30 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="bg-white bg-opacity-20 hover:bg-opacity-30 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="bg-white bg-opacity-20 hover:bg-opacity-30 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <FaYoutube />
              </a>
            </div>
            <p className="text-sm">Subscribe to our newsletter for updates on our work and upcoming events.</p>
            <form className="mt-3 flex" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white bg-opacity-10 text-white rounded-l-md px-4 py-2 focus:outline-none focus:bg-opacity-20 flex-grow" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                type="submit" 
                className="bg-accent text-dark font-accent font-medium px-4 rounded-r-md hover:bg-accent/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white border-opacity-20 pt-6 text-center text-sm text-white text-opacity-70">
          <p>&copy; {new Date().getFullYear()} Agricultural Nonprofit Organization. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
