
import { Pill, Clock, AlertTriangle, Trash2, Edit } from "lucide-react";
import { getDaysRemaining, getPrescriptionStatus, getStatusColor, getStatusText } from "../utils/prescriptionUtils";

interface PrescriptionCardProps {
  prescription: any;
  onEdit?: (prescription: any) => void;
  onDelete: (id: number) => void;
  showActions?: boolean;
}

const PrescriptionCard = ({ prescription, onEdit, onDelete, showActions = true }: PrescriptionCardProps) => {
  const daysRemaining = getDaysRemaining(prescription.endDate);
  const status = getPrescriptionStatus(prescription);

  return (
    <div className="card">
      <div className="card-content">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Pill className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex items-center gap-2">
            {status === "expiring" && (
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
            )}
            <span className={`status-badge ${getStatusColor(prescription)}`}>
              {getStatusText(prescription)}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          {prescription.medicineName}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Dosage:</span>
            <span className="font-medium">{prescription.dosage}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Frequency:</span>
            <span className="font-medium">{prescription.frequency}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Doctor:</span>
            <span className="font-medium">{prescription.doctorName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">End Date:</span>
            <span className="font-medium">
              {new Date(prescription.endDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        {prescription.instructions && (
          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <p className="text-sm text-gray-700">
              <strong>Instructions:</strong> {prescription.instructions}
            </p>
          </div>
        )}

        {status === "expiring" && daysRemaining > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg mb-4">
            <div className="flex items-center gap-2 text-yellow-800">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">
                Expires in {daysRemaining} days - Consider renewal
              </span>
            </div>
          </div>
        )}

        {showActions && (
          <div className="flex gap-2">
            {onEdit && (
              <button
                onClick={() => onEdit(prescription)}
                className="btn btn-secondary flex-1 text-sm flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(prescription.id)}
                className="btn btn-danger text-sm flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionCard;
