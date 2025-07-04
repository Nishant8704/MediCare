
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Pill, Clock, User, Plus, TrendingUp, AlertCircle } from "lucide-react";

const Dashboard = ({ user }) => {
  const [dashboardData, setDashboardData] = useState({
    upcomingAppointments: [],
    activePrescriptions: [],
    stats: {
      totalAppointments: 0,
      completedAppointments: 0,
      activePrescriptions: 0,
      upcomingAppointments: 0
    }
  });

  useEffect(() => {
    // Simulate loading dashboard data
    const loadDashboardData = () => {
      // Mock data for demonstration
      const mockData = {
        upcomingAppointments: [
          {
            id: 1,
            doctorName: "Dr. Sarah Johnson",
            appointmentDate: "2024-01-15T10:00:00",
            reason: "Regular Checkup",
            status: "scheduled"
          },
          {
            id: 2,
            doctorName: "Dr. Michael Chen",
            appointmentDate: "2024-01-18T14:30:00",
            reason: "Follow-up",
            status: "scheduled"
          }
        ],
        activePrescriptions: [
          {
            id: 1,
            medicineName: "Lisinopril",
            dosage: "10mg",
            frequency: "Once daily",
            startDate: "2024-01-01",
            endDate: "2024-02-01",
            status: "active"
          },
          {
            id: 2,
            medicineName: "Metformin",
            dosage: "500mg",
            frequency: "Twice daily",
            startDate: "2024-01-01",
            endDate: "2024-03-01",
            status: "active"
          }
        ],
        stats: {
          totalAppointments: 12,
          completedAppointments: 8,
          activePrescriptions: 3,
          upcomingAppointments: 2
        }
      };
      
      setDashboardData(mockData);
    };

    loadDashboardData();
  }, [user]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.firstName}!
        </h1>
        <p className="text-gray-600">
          Here's an overview of your health management
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Appointments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData.stats.totalAppointments}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {dashboardData.stats.completedAppointments}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Prescriptions</p>
                <p className="text-2xl font-bold text-purple-600">
                  {dashboardData.stats.activePrescriptions}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Pill className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Upcoming</p>
                <p className="text-2xl font-bold text-orange-600">
                  {dashboardData.stats.upcomingAppointments}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Appointments */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <h2 className="card-title">Upcoming Appointments</h2>
              <Link
                to="/appointments"
                className="btn btn-primary"
              >
                <Plus className="w-4 h-4 mr-2" />
                Book New
              </Link>
            </div>
          </div>
          <div className="card-content">
            {dashboardData.upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {dashboardData.upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">
                          {appointment.doctorName}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {appointment.reason}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(appointment.appointmentDate)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatTime(appointment.appointmentDate)}
                          </span>
                        </div>
                      </div>
                      <span className="status-badge status-scheduled">
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3>No upcoming appointments</h3>
                <p>Schedule your next appointment to stay on top of your health.</p>
                <Link to="/appointments" className="btn btn-primary">
                  Book Appointment
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Active Prescriptions */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <h2 className="card-title">Active Prescriptions</h2>
              <Link
                to="/prescriptions"
                className="btn btn-primary"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New
              </Link>
            </div>
          </div>
          <div className="card-content">
            {dashboardData.activePrescriptions.length > 0 ? (
              <div className="space-y-4">
                {dashboardData.activePrescriptions.map((prescription) => (
                  <div
                    key={prescription.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">
                          {prescription.medicineName}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {prescription.dosage} - {prescription.frequency}
                        </p>
                        <p className="text-xs text-gray-500">
                          Until {new Date(prescription.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="status-badge status-active">
                        {prescription.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <Pill className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3>No active prescriptions</h3>
                <p>Add your prescriptions to track your medications.</p>
                <Link to="/prescriptions" className="btn btn-primary">
                  Add Prescription
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Quick Actions</h2>
          </div>
          <div className="card-content">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/appointments"
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Book Appointment</h3>
                  <p className="text-sm text-gray-600">Schedule with your doctor</p>
                </div>
              </Link>

              <Link
                to="/prescriptions"
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-all"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Pill className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Add Prescription</h3>
                  <p className="text-sm text-gray-600">Track your medications</p>
                </div>
              </Link>

              <Link
                to="/profile"
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-all"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Update Profile</h3>
                  <p className="text-sm text-gray-600">Manage your information</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
