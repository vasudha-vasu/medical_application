import Link from 'next/link';
import { ArrowRight, CheckCircle2, Star } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-sky-900 z-0 opacity-50"></div>
        <div className="container relative z-10 mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 font-medium text-sm mb-6 border border-sky-500/30">
              <Star className="w-4 h-4" /> Next-Gen Healthcare Platform
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Rehabilitate. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Recover.</span><br/>
              Thrive.
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-lg leading-relaxed">
              Experience world-class orthopedic and neurological rehabilitation powered by an intelligent SaaS platform designed for your optimal recovery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book" className={buttonVariants({ size: "lg", className: "bg-sky-500 hover:bg-sky-400 text-white h-12 px-8 text-base font-semibold" })}>
                Book Consultation
              </Link>
              <Link href="/services" className={buttonVariants({ size: "lg", variant: "outline", className: "border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white h-12 px-8 text-base font-semibold" })}>
                View Services
              </Link>
            </div>
          </div>
          <div className="relative">
             <div className="aspect-square bg-slate-800 rounded-3xl border border-slate-700 shadow-2xl flex items-center justify-center p-8 overflow-hidden relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 to-transparent"></div>
               {/* Decorative Dashboard UI Mockup */}
               <div className="w-full h-full bg-slate-900 rounded-xl border border-slate-700 shadow-inner p-6 flex flex-col gap-4">
                 <div className="h-8 w-1/3 bg-slate-800 rounded"></div>
                 <div className="flex gap-4">
                   <div className="h-24 flex-1 bg-sky-500/20 rounded-lg border border-sky-500/30"></div>
                   <div className="h-24 flex-1 bg-emerald-500/20 rounded-lg border border-emerald-500/30"></div>
                 </div>
                 <div className="h-full bg-slate-800 rounded-lg mt-2"></div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="border-b bg-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
          <div>
            <div className="text-3xl font-bold text-slate-900 mb-1">5,000+</div>
            <div className="text-sm text-slate-500 font-medium">Patients Recovered</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 mb-1">98%</div>
            <div className="text-sm text-slate-500 font-medium">Success Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 mb-1">15+</div>
            <div className="text-sm text-slate-500 font-medium">Expert Therapists</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 mb-1">24/7</div>
            <div className="text-sm text-slate-500 font-medium">Digital Support</div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-slate-600">We blend expert clinical care with advanced technology to streamline your rehabilitation journey.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { title: 'Intelligent Booking', desc: 'Book clinic visits, home visits, or online consultations seamlessly.' },
               { title: 'Pain Tracking', desc: 'Interactive pain assessment modules to track recovery in real-time.' },
               { title: 'Patient Dashboard', desc: 'Access medical records, exercise plans, and appointment history.' }
             ].map((feature, i) => (
               <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                 <CheckCircle2 className="w-8 h-8 text-sky-500 mb-4" />
                 <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                 <p className="text-slate-600">{feature.desc}</p>
               </div>
             ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/services" className={buttonVariants({ variant: "link", className: "text-sky-600" })}>
              Explore All Features <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
