import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-slate-950 text-slate-50">
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-xl mb-4 text-sky-400">Dr. Helios</h3>
          <p className="text-sm text-slate-400">
            A next-generation healthcare SaaS platform for orthopedic and neurological rehabilitation.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-slate-200">Modules</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>Dynamic Services</li>
            <li>Booking System</li>
            <li>Pain Assessment</li>
            <li>Therapist Management</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-slate-200">Legal</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>HIPAA Compliance</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-slate-200">Contact</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-sky-400" /> Chitrel-Pullampeta Rd, AP</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-sky-400" /> +91 97055 06407</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-sky-400" /> admin@heliossaas.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
        © 2026 Dr. Helios SaaS Platform. All rights reserved.
      </div>
    </footer>
  );
}
