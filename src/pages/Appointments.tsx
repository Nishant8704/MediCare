
import { useState, useEffect } from "react";
import { Calendar, Clock, User, Plus, X, Search, Filter } from "lucide-react";
import { toast } from "sonner";

const Appointments = ({ user }) => {
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    doctorName: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
    notes: ""
  });

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    // Mock data for demonstration
    const mockAppointments = [
      {
        id: 1,
        doctorName: "Dr. Sarah Johnson",
        appointmentDate: "2024-01-15T10:00:00",
        reason: "Regular Checkup",
        status: "scheduled",
        notes: "Annual physical examination"
      },
      {
        id: 2,
        doctorName: "Dr. Michael Chen",
        appointmentDate: "2024-01-18T14:30:00",
        reason: "Follow-up",
        status: "scheduled",
        notes: "Blood pressure monitoring"
      },
      {
        id: 3,
        doctorName: "Dr. Emily Davis",
        appointmentDate: "2024-01-10T09:00:00",
        reason: "Consultation",
        status: "completed",
        notes: "Migraine treatment discussion"
      },
      {
        id: 4,
        doctorName: "Dr. Robert Wilson",
        appointmentDate: "2024-01-12T11:15:00",
        reason: "Emergency Visit",
        status: "cancelled",
        notes: "Rescheduled due to emergency"
      }
    ];
    
    setAppointments(mockAppointments);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newAppointment = {
        id: Date.now(),
        doctorName: formData.doctorName,
        appointmentDate: `${formData.appointmentDate}T${formData.appointmentTime}:00`,
        reason: formData.reason,
        status: "scheduled",
        notes: formData.notes
      };

      setAppointments(prev => [...prev, newAppointment]);
      setIsModalOpen(false);
      setFormData({
        doctorName: "",
        appointmentDate: "",
        appointmentTime: "",
        reason: "",
        notes: ""
      });
      toast.success("Appointment booked successfully!");
    } catch (error) {
      toast.error("Failed to book appointment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelAppointment = async (id) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      setAppointments(prev =>
        prev.map(appointment =>
          appointment.id === id
            ? { ...appointment, status: "cancelled" }
            : appointment
        )
      );
      toast.success("Appointment cancelled successfully!");
    } catch (error) {
      toast.error("Failed to cancel appointment.");
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || appointment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled": return "status-scheduled";
      case "completed": return "status-completed";
      case "cancelled": return "status-cancelled";
      default: return "status-scheduled";
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointments</h1>
          <p className="text-gray-600">Manage your healthcare appointments</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Book Appointment
        </button>
      </div>

      {/* Search and Filter */}
      <div className="card mb-6">
        <div className="card-content">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="min-w-[150px]"
              >
                <option value="all">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="grid gap-6">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => {
            const { date, time } = formatDateTime(appointment.appointmentDate);
            return (
              <div key={appointment.id} className="card">
                <div className="card-content">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {appointment.doctorName}
                          </h3>
                          <p className="text-gray-600 mb-2">{appointment.reason}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {time}
                            </span>
                          </div>
                          {appointment.notes && (
                            <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                              {appointment.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`status-badge ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                      {appointment.status === "scheduled" && (
                        <button
                          onClick={() => handleCancelAppointment(appointment.id)}
                          className="btn btn-danger btn-sm"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="card">
            <div className="card-content">
              <div className="empty-state">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3>No appointments found</h3>
                <p>
                  {searchTerm || filterStatus !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "Book your first appointment to get started."}
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="btn btn-primary mt-4"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Book New Appointment</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="form-group">
                <label htmlFor="doctorName">Doctor Name</label>
                <input
                  type="text"
                  id="doctorName"
                  name="doctorName"
                  required
                  value={formData.doctorName}
                  onChange={handleInputChange}
                  placeholder="Dr. John Smith"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="appointmentDate">Date</label>
                  <input
                    type="date"
                    id="appointmentDate"
                    name="appointmentDate"
                    required
                    value={formData.appointmentDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="appointmentTime">Time</label>
                  <input
                    type="time"
                    id="appointmentTime"
                    name="appointmentTime"
                    required
                    value={formData.appointmentTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reason">Reason for Visit</label>
                <select
                  id="reason"
                  name="reason"
                  required
                  value={formData.reason}
                  onChange={handleInputChange}
                >
                  <option value="">Select reason</option>
                  <option value="Regular Checkup">Regular Checkup</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Consultation">Consultation</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Vaccination">Vaccination</option>
                  <option value="Lab Results">Lab Results</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="notes">Additional Notes (Optional)</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Any additional information..."
                  rows={3}
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary flex-1"
                >
                  {isLoading ? (
                    <>
                      <div className="loading mr-2"></div>
                      Booking...
                    </>
                  ) : (
                    "Book Appointment"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
