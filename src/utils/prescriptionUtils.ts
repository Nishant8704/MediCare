
export const getDaysRemaining = (endDate: string): number => {
  const today = new Date();
  const end = new Date(endDate);
  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const getPrescriptionStatus = (prescription: any): string => {
  const daysRemaining = getDaysRemaining(prescription.endDate);
  if (daysRemaining < 0) return "expired";
  if (daysRemaining <= 7) return "expiring";
  return "active";
};

export const getStatusColor = (prescription: any): string => {
  const status = getPrescriptionStatus(prescription);
  switch (status) {
    case "active": return "status-active";
    case "expiring": return "status-badge bg-yellow-100 text-yellow-800";
    case "expired": return "status-expired";
    default: return "status-active";
  }
};

export const getStatusText = (prescription: any): string => {
  const status = getPrescriptionStatus(prescription);
  const daysRemaining = getDaysRemaining(prescription.endDate);
  
  switch (status) {
    case "active": return "Active";
    case "expiring": return `${daysRemaining} days left`;
    case "expired": return "Expired";
    default: return "Active";
  }
};
