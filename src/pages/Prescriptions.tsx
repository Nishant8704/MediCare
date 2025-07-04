
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import PrescriptionFilters from "../components/PrescriptionFilters";
import PrescriptionGrid from "../components/PrescriptionGrid";
import PrescriptionModal from "../components/PrescriptionModal";
import { getPrescriptionStatus } from "../utils/prescriptionUtils";

const Prescriptions = ({ user }: { user: any }) => {
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    loadPrescriptions();
  }, []);

  const loadPrescriptions = () => {
    // Mock data for demonstration
    const mockPrescriptions = [
      {
        id: 1,
        medicineName: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        startDate: "2024-01-01",
        endDate: "2024-02-01",
        doctorName: "Dr. Sarah Johnson",
        status: "active",
        instructions: "Take with food in the morning"
      },
      {
        id: 2,
        medicineName: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        startDate: "2024-01-01",
        endDate: "2024-03-01",
        doctorName: "Dr. Michael Chen",
        status: "active",
        instructions: "Take with meals"
      },
      {
        id: 3,
        medicineName: "Ibuprofen",
        dosage: "400mg",
        frequency: "As needed",
        startDate: "2023-12-15",
        endDate: "2024-01-15",
        doctorName: "Dr. Emily Davis",
        status: "expired",
        instructions: "For pain relief, max 3 times daily"
      },
      {
        id: 4,
        medicineName: "Vitamin D3",
        dosage: "1000 IU",
        frequency: "Once daily",
        startDate: "2024-01-01",
        endDate: "2024-06-01",
        doctorName: "Dr. Robert Wilson",
        status: "active",
        instructions: "Take with breakfast"
      }
    ];
    
    setPrescriptions(mockPrescriptions);
  };

  const handleAddPrescription = (newPrescription: any) => {
    setPrescriptions(prev => [...prev, newPrescription]);
  };

  const handleDeletePrescription = async (id: number) => {
    if (!confirm("Are you sure you want to delete this prescription?")) return;

    try {
      setPrescriptions(prev => prev.filter(prescription => prescription.id !== id));
      toast.success("Prescription deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete prescription.");
    }
  };

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = prescription.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    const status = getPrescriptionStatus(prescription);
    const matchesFilter = filterStatus === "all" || status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Prescriptions</h1>
          <p className="text-gray-600">Track and manage your medications</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Prescription
        </button>
      </div>

      <PrescriptionFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PrescriptionGrid
          prescriptions={filteredPrescriptions}
          onDelete={handleDeletePrescription}
          onAddNew={() => setIsModalOpen(true)}
          searchTerm={searchTerm}
          filterStatus={filterStatus}
        />
      </div>

      <PrescriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddPrescription}
      />
    </div>
  );
};

export default Prescriptions;
