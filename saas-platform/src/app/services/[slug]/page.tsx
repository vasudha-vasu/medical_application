import { notFound } from 'next/navigation';
import { Clock, IndianRupee, CheckCircle2 } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import Link from 'next/link';

interface Props {
  params: {
    slug: string;
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const service = await prisma.service.findUnique({
    where: { slug: params.slug },
  });

  if (!service) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="bg-white rounded-3xl shadow-sm border p-8 md:p-12 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-700 font-medium text-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-sky-500"></span> Active Service Module
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{service.title}</h1>
        
        <p className="text-xl text-slate-600 mb-8 leading-relaxed">
          {service.shortDescription}
        </p>

        <div className="flex flex-wrap items-center gap-6 mb-10 pb-10 border-b">
          <div className="flex items-center gap-2 text-slate-700">
            <Clock className="text-sky-500" />
            <span className="font-semibold">{service.duration} Minutes Session</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <IndianRupee className="text-sky-500" />
            <span className="font-semibold">{service.price} Base Price</span>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Treatment Overview</h3>
            <p className="text-slate-600 leading-relaxed">
              {service.detailedDescription}
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Expected Outcomes</h3>
            <ul className="space-y-3">
              {[
                'Reduced pain and inflammation',
                'Improved range of motion and flexibility',
                'Enhanced muscle strength and endurance',
                'Better posture and biomechanics'
              ].map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-600">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-[0_-10px_40px_rgba(0,0,0,0.05)] md:relative md:bg-transparent md:border-0 md:shadow-none md:p-0">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900 text-white p-6 md:p-8 rounded-2xl">
          <div>
            <h4 className="text-xl font-bold mb-1">Ready to start recovery?</h4>
            <p className="text-slate-400 text-sm">Book an appointment online with our verified therapists.</p>
          </div>
          <Link href={`/book?service=${service.id}`} className={buttonVariants({ size: "lg", className: "w-full md:w-auto bg-sky-500 hover:bg-sky-400 text-white rounded-xl" })}>
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}
