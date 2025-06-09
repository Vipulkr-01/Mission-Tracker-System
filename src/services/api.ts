
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Mission {
  _id?: string;
  name: string;
  status: string;
  progress: number;
  priority: string;
  startDate: string;
  estimatedCompletion: string;
  description: string;
  teamMembers: number;
  location: string;
}

export const missionAPI = {
  // Get all missions
  getAllMissions: async (): Promise<Mission[]> => {
    const response = await api.get('/missions');
    return response.data;
  },

  // Get single mission
  getMission: async (id: string): Promise<Mission> => {
    const response = await api.get(`/missions/${id}`);
    return response.data;
  },

  // Create new mission
  createMission: async (mission: Omit<Mission, '_id'>): Promise<Mission> => {
    const response = await api.post('/missions', mission);
    return response.data;
  },

  // Update mission
  updateMission: async (id: string, mission: Partial<Mission>): Promise<Mission> => {
    const response = await api.put(`/missions/${id}`, mission);
    return response.data;
  },

  // Delete mission
  deleteMission: async (id: string): Promise<void> => {
    await api.delete(`/missions/${id}`);
  },
};
