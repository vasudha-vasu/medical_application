import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const WhatsAppQRCodeCard = ({ 
  phoneNumber = "919705506407", 
  message = "Hello Doctor, I would like to book an appointment.",
  clinicName = "Dr Helios Ortho & Neuro R"
}) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-[#20b468] w-full min-h-[600px] relative font-sans">
      <div className="relative bg-white rounded-[24px] shadow-2xl p-8 pt-14 pb-12 flex flex-col items-center max-w-[340px] w-full mt-8 mb-8 z-10">
        
        {/* Floating Logo */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-white rounded-full p-2 shadow-sm flex items-center justify-center">
          <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-white border border-gray-100">
             <img src="/clinic-logo.png" alt="Clinic Logo" className="w-[80%] h-[80%] object-contain" />
          </div>
        </div>

        {/* Text Area */}
        <h3 className="text-[22px] leading-tight font-bold text-gray-900 text-center mb-1">{clinicName}</h3>
        <p className="text-gray-500 text-sm text-center mb-8 font-medium">WhatsApp contact</p>

        {/* QR Code */}
        <div className="mb-2">
          <QRCodeSVG 
            value={whatsappUrl} 
            size={220}
            level={"H"}
            imageSettings={{
              src: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
              x: undefined,
              y: undefined,
              height: 48,
              width: 48,
              excavate: true,
            }}
          />
        </div>
      </div>
      
      {/* Bottom Text */}
      <p className="text-white text-center text-lg max-w-[280px] font-medium leading-snug z-10">
        Scan this code using the WhatsApp camera to get my number
      </p>
    </div>
  );
};

export default WhatsAppQRCodeCard;
