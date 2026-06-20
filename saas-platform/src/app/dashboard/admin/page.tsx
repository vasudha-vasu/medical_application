import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import prisma from '@/lib/prisma';
import { Users, Calendar, Activity, DollarSign } from 'lucide-react';

export const metadata = {
  title: 'Admin Dashboard | Dr. Helios SaaS',
};

export default async function AdminDashboardPage() {
  const servicesCount = await prisma.service.count();
  // We mock the rest for the skeleton structure
  const activeAppointments = 12;
  const totalRevenue = 45000;
  const newPatients = 8;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <div className="flex gap-4">
          <Button variant="outline">Manage Services</Button>
          <Button className="bg-sky-500 hover:bg-sky-600">Export Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Active Services</p>
              <h3 className="text-2xl font-bold text-slate-900">{servicesCount}</h3>
            </div>
            <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center text-sky-600">
              <Activity className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Appointments Today</p>
              <h3 className="text-2xl font-bold text-slate-900">{activeAppointments}</h3>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
              <Calendar className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">New Patients</p>
              <h3 className="text-2xl font-bold text-slate-900">{newPatients}</h3>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
              <Users className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Monthly Revenue</p>
              <h3 className="text-2xl font-bold text-slate-900">₹{totalRevenue}</h3>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
              <DollarSign className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Mocked data for structure visualization */}
              {[
                { name: 'Rahul Sharma', service: 'Neuro Rehab', date: 'Oct 24, 10:00 AM', status: 'CONFIRMED' },
                { name: 'Priya Desai', service: 'Home Visit', date: 'Oct 24, 02:00 PM', status: 'PENDING' },
                { name: 'Amit Patel', service: 'Sports Rehab', date: 'Oct 25, 11:30 AM', status: 'CONFIRMED' },
              ].map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell>{row.service}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {row.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
