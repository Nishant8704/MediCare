
// API service for backend communication
// In a real application, replace the mock implementations with actual API calls

const API_BASE_URL = "http://localhost:8080/api";

// Mock delay function to simulate API calls
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Auth Service
export const authService = {
  async login(credentials) {
    await delay(1000);
    
    // Mock login validation
    if (credentials.email && credentials.password) {
      return {
        success: true,
        user: {
          id: 1,
          email: credentials.email,
          firstName: "John",
          lastName: "Doe",
          phone: "+1234567890"
        },
        token: "mock-jwt-token"
      };
    }
    
    throw new Error("Invalid credentials");
  },

  async register(userData) {
    await delay(1500);
    
    // Mock registration
    return {
      success: true,
      user: {
        id: Date.now(),
        ...userData
      },
      token: "mock-jwt-token"
    };
  },

  async logout() {
    await delay(500);
    return { success: true };
  }
};

// Appointment Service
export const appointmentService = {
  async getAppointments(userId) {
    await delay(800);
    
    // Mock appointments data
    return [
      {
        id: 1,
        userId: userId,
        doctorName: "Dr. Sarah Johnson",
        appointmentDate: "2024-01-15T10:00:00",
        reason: "Regular Checkup",
        status: "scheduled",
        notes: "Annual physical examination"
      },
      {
        id: 2,
        userId: userId,
        doctorName: "Dr. Michael Chen",
        appointmentDate: "2024-01-18T14:30:00",
        reason: "Follow-up",
        status: "scheduled",
        notes: "Blood pressure monitoring"
      }
    ];
  },

  async bookAppointment(appointmentData) {
    await delay(1000);
    
    return {
      success: true,
      appointment: {
        id: Date.now(),
        ...appointmentData,
        status: "scheduled"
      }
    };
  },

  async cancelAppointment(appointmentId) {
    await delay(800);
    
    return {
      success: true,
      message: "Appointment cancelled successfully"
    };
  },

  async updateAppointment(appointmentId, updateData) {
    await delay(1000);
    
    return {
      success: true,
      appointment: {
        id: appointmentId,
        ...updateData
      }
    };
  }
};

// Prescription Service
export const prescriptionService = {
  async getPrescriptions(userId) {
    await delay(800);
    
    // Mock prescriptions data
    return [
      {
        id: 1,
        userId: userId,
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
        userId: userId,
        medicineName: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        startDate: "2024-01-01",
        endDate: "2024-03-01",
        doctorName: "Dr. Michael Chen",
        status: "active",
        instructions: "Take with meals"
      }
    ];
  },

  async addPrescription(prescriptionData) {
    await delay(1000);
    
    return {
      success: true,
      prescription: {
        id: Date.now(),
        ...prescriptionData,
        status: "active"
      }
    };
  },

  async updatePrescription(prescriptionId, updateData) {
    await delay(1000);
    
    return {
      success: true,
      prescription: {
        id: prescriptionId,
        ...updateData
      }
    };
  },

  async deletePrescription(prescriptionId) {
    await delay(800);
    
    return {
      success: true,
      message: "Prescription deleted successfully"
    };
  }
};

// User Service
export const userService = {
  async getUserProfile(userId) {
    await delay(600);
    
    return {
      id: userId,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      dateOfBirth: "1990-01-01",
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "ST",
        zipCode: "12345"
      }
    };
  },

  async updateUserProfile(userId, updateData) {
    await delay(1000);
    
    return {
      success: true,
      user: {
        id: userId,
        ...updateData
      }
    };
  }
};

// Dashboard Service
export const dashboardService = {
  async getDashboardData(userId) {
    await delay(1000);
    
    const appointments = await appointmentService.getAppointments(userId);
    const prescriptions = await prescriptionService.getPrescriptions(userId);
    
    return {
      upcomingAppointments: appointments.filter(apt => 
        new Date(apt.appointmentDate) > new Date() && apt.status === "scheduled"
      ).slice(0, 3),
      activePrescriptions: prescriptions.filter(pres => 
        pres.status === "active"
      ).slice(0, 3),
      stats: {
        totalAppointments: appointments.length,
        completedAppointments: appointments.filter(apt => apt.status === "completed").length,
        activePrescriptions: prescriptions.filter(pres => pres.status === "active").length,
        upcomingAppointments: appointments.filter(apt => 
          new Date(apt.appointmentDate) > new Date() && apt.status === "scheduled"
        ).length
      }
    };
  }
};

// HTTP utilities for real API integration
export const httpClient = {
  async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.getToken()}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  async post(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.getToken()}`
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  async put(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.getToken()}`
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  async delete(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.getToken()}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  getToken() {
    return localStorage.getItem("authToken") || "";
  },

  setToken(token) {
    localStorage.setItem("authToken", token);
  },

  removeToken() {
    localStorage.removeItem("authToken");
  }
};
