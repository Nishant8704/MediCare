
import { Calendar, Clock, User, X } from "lucide-react";

const AppointmentCard = ({ appointment, onCancel, showActions = true }) => {
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

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled": return "status-scheduled";
      case "completed": return "status-completed";
      case "cancelled": return "status-cancelled";
      default: return "status-scheduled";
    }
  };

  const { date, time } = formatDateTime(appointment.appointmentDate);

  return (
    <div className="card">
      <div className="card-content">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
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
          <div className="flex items-center gap-3">
            <span className={`status-badge ${getStatusColor(appointment.status)}`}>
              {appointment.status}
            </span>
            {showActions && appointment.status === "scheduled" && onCancel && (
              <button
                onClick={() => onCancel(appointment.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Cancel appointment"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
