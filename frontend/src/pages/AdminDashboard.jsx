import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [homeVisits, setHomeVisits] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const headers = {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      };

      const API_URL = import.meta.env.VITE_API_URL || '';
      const [apptRes, hvRes] = await Promise.all([
        fetch(`${API_URL}/api/appointments`, { headers }),
        fetch(`${API_URL}/api/home-visits`, { headers })
      ]);

      if (apptRes.ok) {
        const apptData = await apptRes.json();
        setAppointments(apptData.data);
      }
      if (hvRes.ok) {
        const hvData = await hvRes.json();
        setHomeVisits(hvData.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user?.token) {
      fetchData();
    }
  }, [user]);

  const updateStatus = async (type, id, status) => {
    try {
      const endpoint = type === 'appointment' ? 'appointments' : 'home-visits';
      const API_URL = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_URL}/api/${endpoint}/${id}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        fetchData(); // Refresh data
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteRecord = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    
    try {
      const endpoint = type === 'appointment' ? 'appointments' : 'home-visits';
      const API_URL = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_URL}/api/${endpoint}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      if (response.ok) {
        fetchData(); // Refresh data
      }
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-darktext text-white p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-8 text-primary">Admin Panel</h2>
        <nav className="space-y-4">
          <button onClick={() => setActiveTab('overview')} className={`w-full text-left px-4 py-2 rounded ${activeTab === 'overview' ? 'bg-primary' : 'hover:bg-white/10'}`}>Overview</button>
          <button onClick={() => setActiveTab('appointments')} className={`w-full text-left px-4 py-2 rounded ${activeTab === 'appointments' ? 'bg-primary' : 'hover:bg-white/10'}`}>Appointments</button>
          <button onClick={() => setActiveTab('homevisits')} className={`w-full text-left px-4 py-2 rounded ${activeTab === 'homevisits' ? 'bg-primary' : 'hover:bg-white/10'}`}>Home Visits</button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 capitalize">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-medium">Dr. {user?.name}</span>
            <button onClick={handleLogout} className="bg-white px-4 py-2 rounded shadow text-sm font-medium text-gray-600 hover:bg-gray-50">Logout</button>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-500 text-sm font-medium">Total Appointments</p>
              <p className="text-3xl font-bold text-darktext mt-2">{appointments.length}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-500 text-sm font-medium">Appointments Today</p>
              <p className="text-3xl font-bold text-primary mt-2">
                {appointments.filter(a => new Date(a.preferredDate).toDateString() === new Date().toDateString()).length}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-500 text-sm font-medium">Pending Home Visits</p>
              <p className="text-3xl font-bold text-secondary mt-2">
                {homeVisits.filter(h => h.status === 'Pending').length}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {loading ? <p className="p-6">Loading...</p> : (
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600 border-b">
                  <tr>
                    <th className="py-3 px-6">Patient Name</th>
                    <th className="py-3 px-6">Phone</th>
                    <th className="py-3 px-6">Date & Time</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map(appt => (
                    <tr key={appt._id} className="border-b">
                      <td className="py-3 px-6 font-medium">{appt.patientName}</td>
                      <td className="py-3 px-6">{appt.mobileNumber}</td>
                      <td className="py-3 px-6">{new Date(appt.preferredDate).toLocaleDateString()} at {appt.preferredTime}</td>
                      <td className="py-3 px-6">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          appt.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          appt.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {appt.status}
                        </span>
                      </td>
                      <td className="py-3 px-6 flex gap-3 items-center">
                        {appt.status === 'Pending' && (
                          <button onClick={() => updateStatus('appointment', appt._id, 'Approved')} className="text-green-600 hover:underline">Approve</button>
                        )}
                        {appt.status !== 'Completed' && appt.status !== 'Cancelled' && (
                          <button onClick={() => updateStatus('appointment', appt._id, 'Completed')} className="text-blue-600 hover:underline">Complete</button>
                        )}
                        <button onClick={() => deleteRecord('appointment', appt._id)} className="text-red-500 hover:text-red-700 hover:underline text-sm font-medium">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {appointments.length === 0 && (
                    <tr>
                      <td colSpan="5" className="py-4 text-center text-gray-500">No appointments found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'homevisits' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {loading ? <p className="p-6">Loading...</p> : (
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600 border-b">
                  <tr>
                    <th className="py-3 px-6">Patient Name</th>
                    <th className="py-3 px-6">Phone</th>
                    <th className="py-3 px-6">Address</th>
                    <th className="py-3 px-6">Date & Time</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {homeVisits.map(hv => (
                    <tr key={hv._id} className="border-b">
                      <td className="py-3 px-6 font-medium">{hv.patientName}</td>
                      <td className="py-3 px-6">{hv.phoneNumber}</td>
                      <td className="py-3 px-6">{hv.address}, {hv.city}</td>
                      <td className="py-3 px-6">{new Date(hv.visitDate).toLocaleDateString()} at {hv.visitTime}</td>
                      <td className="py-3 px-6">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          hv.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          hv.status === 'Assigned' || hv.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          hv.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {hv.status}
                        </span>
                      </td>
                      <td className="py-3 px-6 flex flex-col gap-2">
                        {hv.status === 'Pending' && (
                          <button onClick={() => updateStatus('homeVisit', hv._id, 'Assigned')} className="text-blue-600 hover:underline self-start">Assign</button>
                        )}
                        {hv.status === 'Assigned' && (
                          <button onClick={() => updateStatus('homeVisit', hv._id, 'Completed')} className="text-green-600 hover:underline self-start">Complete</button>
                        )}
                        <button onClick={() => deleteRecord('homeVisit', hv._id)} className="text-red-500 hover:text-red-700 hover:underline text-sm font-medium self-start">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {homeVisits.length === 0 && (
                    <tr>
                      <td colSpan="6" className="py-4 text-center text-gray-500">No home visits found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
