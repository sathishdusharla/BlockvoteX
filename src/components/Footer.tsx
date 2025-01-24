import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-blue-600/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">BlockvoteX</h3>
            <p className="text-gray-400">
              Revolutionizing democratic participation through secure blockchain technology.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <FooterLink text="About Us" href="/about" />
              <FooterLink text="How It Works" href="#" />
              <FooterLink text="Security" href="#" />
              <FooterLink text="FAQ" href="#" />
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <FooterLink text="Privacy Policy" href="/privacy-policy" />
              <FooterLink text="Terms of Service" href="#" />
              <FooterLink text="Cookie Policy" href="#" />
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
            <div className="flex space-x-4">
              <SocialIcon icon={<Github />} href="https://github.com/sathishdusharla" />
              <SocialIcon icon={<Twitter />} href="https://x.com/thedusharla" />
              <SocialIcon icon={<Linkedin />} href="https://www.linkedin.com/in/sathish-dusharla-176374314/" />
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} BlockVoteX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ text, href }: { text: string, href: string }) => (
  <li>
    <a href={href} className="text-gray-400 hover:text-blue-500 transition-colors duration-200">
      {text}
    </a>
  </li>
);

const SocialIcon = ({ icon, href }: { icon: React.ReactNode, href: string }) => (
  <a
    href={href}
    className="p-2 rounded-full bg-slate-800 text-gray-400 hover:text-blue-500 hover:bg-slate-700 transition-all duration-200"
  >
    {icon}
  </a>
);

export default Footer;
