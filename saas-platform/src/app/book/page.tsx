import { BookingForm } from '@/components/BookingForm';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Book Appointment | Dr. Helios SaaS',
};

export default async function BookPage() {
  const services = await prisma.service.findMany({
    where: { status: 'ACTIVE' },
    select: { id: true, title: true }
  });

  return (
    <div className="container mx-auto px-4 py-16 bg-slate-50 min-h-screen">
      <BookingForm services={services} />
    </div>
  );
}
