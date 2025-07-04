
import { useState, useEffect } from "react";
import { Pill, Plus, X, Search, Filter, Clock, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const Prescriptions = ({ user }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    medicineName: "",
    dosage: "",
    frequency: "",
    startDate: "",
    endDate: "",
    doctorName: "",
    instructions: ""
  });

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

      const newPrescription = {
        id: Date.now(),
        ...formData,
        status: "active"
      };

      setPrescriptions(prev => [...prev, newPrescription]);
      setIsModalOpen(false);
      setFormData({
        medicineName: "",
        dosage: "",
        frequency: "",
        startDate: "",
        endDate: "",
        doctorName: "",
        instructions: ""
      });
      toast.success("Prescription added successfully!");
    } catch (error) {
      toast.error("Failed to add prescription. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePrescription = async (id) => {
    if (!confirm("Are you sure you want to delete this prescription?")) return;

    try {
      setPrescriptions(prev => prev.filter(prescription => prescription.id !== id));
      toast.success("Prescription deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete prescription.");
    }
  };

  const getDaysRemaining = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPrescriptionStatus = (prescription) => {
    const daysRemaining = getDaysRemaining(prescription.endDate);
    if (daysRemaining < 0) return "expired";
    if (daysRemaining <= 7) return "expiring";
    return "active";
  };

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = prescription.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    const status = getPrescriptionStatus(prescription);
    const matchesFilter = filterStatus === "all" || status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (prescription) => {
    const status = getPrescriptionStatus(prescription);
    switch (status) {
      case "active": return "status-active";
      case "expiring": return "status-badge bg-yellow-100 text-yellow-800";
      case "expired": return "status-expired";
      default: return "status-active";
    }
  };

  const getStatusText = (prescription) => {
    const status = getPrescriptionStatus(prescription);
    const daysRemaining = getDaysRemaining(prescription.endDate);
    
    switch (status) {
      case "active": return "Active";
      case "expiring": return `${daysRemaining} days left`;
      case "expired": return "Expired";
      default: return "Active";
    }
  };

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

      {/* Search and Filter */}
      <div className="card mb-6">
        <div className="card-content">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search prescriptions..."
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
                <option value="active">Active</option>
                <option value="expiring">Expiring Soon</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Prescriptions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrescriptions.length > 0 ? (
          filteredPrescriptions.map((prescription) => {
            const daysRemaining = getDaysRemaining(prescription.endDate);
            const status = getPrescriptionStatus(prescription);
            
            return (
              <div key={prescription.id} className="card">
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

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
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

                  <div className="flex gap-2">
                    <button className="btn btn-secondary flex-1 text-sm">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePrescription(prescription.id)}
                      className="btn btn-danger text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
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
                    onClick={() => setIsModalOpen(true)}
                    className="btn btn-primary mt-4"
                  >
                    Add Prescription
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Prescription Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Add New Prescription</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="form-group">
                <label htmlFor="medicineName">Medicine Name</label>
                <input
                  type="text"
                  id="medicineName"
                  name="medicineName"
                  required
                  value={formData.medicineName}
                  onChange={handleInputChange}
                  placeholder="e.g., Lisinopril"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="dosage">Dosage</label>
                  <input
                    type="text"
                    id="dosage"
                    name="dosage"
                    required
                    value={formData.dosage}
                    onChange={handleInputChange}
                    placeholder="e.g., 10mg"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="frequency">Frequency</label>
                  <select
                    id="frequency"
                    name="frequency"
                    required
                    value={formData.frequency}
                    onChange={handleInputChange}
                  >
                    <option value="">Select frequency</option>
                    <option value="Once daily">Once daily</option>
                    <option value="Twice daily">Twice daily</option>
                    <option value="Three times daily">Three times daily</option>
                    <option value="Four times daily">Four times daily</option>
                    <option value="As needed">As needed</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="startDate">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    required
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="endDate">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    required
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="doctorName">Prescribing Doctor</label>
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

              <div className="form-group">
                <label htmlFor="instructions">Instructions (Optional)</label>
                <textarea
                  id="instructions"
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleInputChange}
                  placeholder="Special instructions for taking this medication..."
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
                      Adding...
                    </>
                  ) : (
                    "Add Prescription"
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

export default Prescriptions;
