
import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

interface PrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (prescription: any) => void;
}

const PrescriptionModal = ({ isOpen, onClose, onSubmit }: PrescriptionModalProps) => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

      onSubmit(newPrescription);
      onClose();
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Add New Prescription</h2>
          <button
            onClick={onClose}
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
              onClick={onClose}
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
  );
};

export default PrescriptionModal;
