
import { Pill } from "lucide-react";
import PrescriptionCard from "./PrescriptionCard";

interface PrescriptionGridProps {
  prescriptions: any[];
  onEdit?: (prescription: any) => void;
  onDelete: (id: number) => void;
  onAddNew: () => void;
  searchTerm: string;
  filterStatus: string;
}

const PrescriptionGrid = ({ 
  prescriptions, 
  onEdit, 
  onDelete, 
  onAddNew, 
  searchTerm, 
  filterStatus 
}: PrescriptionGridProps) => {
  if (prescriptions.length === 0) {
    return (
      <div className="col-span-full">
        <div className="card">
          <div className="card-content">
            <div className="empty-state">
              <Pill className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3>No prescriptions found</h3>
              <p>
                {searchTerm || filterStatus !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Add your first prescription to start tracking your medications."}
              </p>
              <button
                onClick={onAddNew}
                className="btn btn-primary mt-4"
              >
                Add Prescription
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {prescriptions.map((prescription) => (
        <PrescriptionCard
          key={prescription.id}
          prescription={prescription}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};

export default PrescriptionGrid;
