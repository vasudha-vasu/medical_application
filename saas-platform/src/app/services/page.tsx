import Link from 'next/link';
import { Sparkles, Clock, IndianRupee } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Our Services | Dr. Helios SaaS',
};

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { status: 'ACTIVE' },
  });

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Rehabilitation Services</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Comprehensive healthcare modules designed for scale, efficiency, and optimal patient recovery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <Card key={service.id} className="hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 bg-white">
            <CardHeader>
              <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center mb-4 text-sky-500 group-hover:scale-110 transition-transform">
                <Sparkles className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">{service.title}</CardTitle>
              <CardDescription className="h-12 line-clamp-2">{service.shortDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {service.duration} mins
                </div>
                <div className="flex items-center gap-1">
                  <IndianRupee className="h-4 w-4" /> {service.price}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/services/${service.slug}`} className={buttonVariants({ className: "w-full bg-sky-500 hover:bg-sky-600" })}>
                Learn More &rarr;
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
