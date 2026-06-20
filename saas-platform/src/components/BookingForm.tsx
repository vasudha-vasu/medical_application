"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  serviceId: z.string().min(1, "Please select a service"),
  type: z.enum(['CLINIC', 'HOME_VISIT', 'ONLINE']),
  date: z.string().min(1, "Date is required"),
  timeSlot: z.string().min(1, "Time slot is required"),
  address: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export function BookingForm({ services }: { services: { id: string, title: string }[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      type: 'CLINIC',
    }
  });

  const selectedType = watch('type');

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    // Simulate API call to create appointment
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Appointment Booked:", data);
    setIsSuccess(true);
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <Card className="max-w-xl mx-auto text-center py-12">
        <CardHeader>
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
          <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
          <CardDescription>Your appointment has been successfully scheduled. We will send you an SMS confirmation shortly.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto shadow-lg border-slate-200">
      <CardHeader className="bg-slate-50 border-b">
        <CardTitle className="text-2xl text-slate-900">Schedule an Appointment</CardTitle>
        <CardDescription>Fill out the details below to book your session.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" {...register('name')} className={errors.name ? 'border-red-500' : ''} />
              {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="+91 98765 43210" {...register('phone')} className={errors.phone ? 'border-red-500' : ''} />
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Service Required</Label>
            <Select onValueChange={(val) => setValue('serviceId', val)}>
              <SelectTrigger className={errors.serviceId ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map(s => (
                  <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.serviceId && <p className="text-red-500 text-xs">{errors.serviceId.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Consultation Type</Label>
            <Select onValueChange={(val: any) => setValue('type', val)} defaultValue="CLINIC">
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CLINIC">In-Clinic Visit</SelectItem>
                <SelectItem value="HOME_VISIT">Home Visit</SelectItem>
                <SelectItem value="ONLINE">Online Consultation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedType === 'HOME_VISIT' && (
            <div className="space-y-2">
              <Label htmlFor="address">Home Address</Label>
              <Input id="address" placeholder="Full residential address" {...register('address')} />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="date">Preferred Date</Label>
              <Input id="date" type="date" {...register('date')} className={errors.date ? 'border-red-500' : ''} />
              {errors.date && <p className="text-red-500 text-xs">{errors.date.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeSlot">Preferred Time</Label>
              <Select onValueChange={(val) => setValue('timeSlot', val)}>
                <SelectTrigger className={errors.timeSlot ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select a time slot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00 AM">09:00 AM</SelectItem>
                  <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                  <SelectItem value="02:00 PM">02:00 PM</SelectItem>
                  <SelectItem value="04:00 PM">04:00 PM</SelectItem>
                </SelectContent>
              </Select>
              {errors.timeSlot && <p className="text-red-500 text-xs">{errors.timeSlot.message}</p>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-slate-50 border-t py-4 justify-end">
          <Button type="submit" disabled={isSubmitting} className="bg-sky-500 hover:bg-sky-600 px-8">
            {isSubmitting ? 'Processing...' : 'Confirm Booking'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
