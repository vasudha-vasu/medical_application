import React from 'react';
import { Phone, Navigation, Globe, Bookmark, Share2 } from 'lucide-react';

const QuickActions = () => {
  const handleShare = async (e) => {
    e.preventDefault();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Dr. Helios Ortho & Neuro Rehabilitation',
          text: 'Check out this amazing rehabilitation center!',
          url: window.location.origin,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that do not support the Web Share API
      navigator.clipboard.writeText(window.location.origin);
      alert("Link copied to clipboard!");
    }
  };

  const actions = [
    { icon: <Phone size={20} />, label: 'Call', href: 'tel:+919705506407' },
    { icon: <Navigation size={20} />, label: 'Directions', href: 'https://maps.google.com/?q=Pullampeta+Andhra+Pradesh' },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle">
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
      ), 
      label: 'WhatsApp', 
      href: 'https://wa.me/919705506407?text=Hello%20Doctor,%20I%20would%20like%20to%20book%20an%20appointment.',
      target: '_blank'
    },
    { icon: <Globe size={20} />, label: 'Website', href: '/' },
    { icon: <Share2 size={20} />, label: 'Share', href: '#', onClick: handleShare },
  ];

  return (
    <div className="bg-[#202124] py-3 px-4 flex justify-between items-center overflow-x-auto gap-4 sm:justify-center rounded-2xl mx-auto max-w-fit shadow-lg my-4 border border-gray-700">
      {actions.map((action, index) => {
        const handleClick = (e) => {
          if (action.onClick) {
            action.onClick(e);
          }
        };

        return (
          <a 
            key={index} 
            href={action.href}
            onClick={handleClick}
            target={action.target || "_self"}
            rel={action.target === "_blank" ? "noopener noreferrer" : undefined}
            className="flex flex-col items-center gap-1.5 min-w-[64px] group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full border border-[#8ab4f8] flex items-center justify-center text-[#8ab4f8] group-hover:bg-[#8ab4f8]/10 transition-colors">
              {action.icon}
            </div>
            <span className="text-[#8ab4f8] text-xs font-medium">
              {action.label}
            </span>
          </a>
        );
      })}
    </div>
  );
};

export default QuickActions;
