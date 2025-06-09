
import { useState, useEffect } from 'react';
import { missionAPI, Mission } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export const useMissions = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Load missions on component mount
  useEffect(() => {
    loadMissions();
  }, []);

  const loadMissions = async () => {
    try {
      setLoading(true);
      const data = await missionAPI.getAllMissions();
      setMissions(data);
      setError(null);
    } catch (err) {
      setError('Failed to load missions');
      toast({
        title: "Error",
        description: "Failed to load missions from database",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createMission = async (missionData: Omit<Mission, '_id'>) => {
    try {
      const newMission = await missionAPI.createMission(missionData);
      setMissions(prev => [newMission, ...prev]);
      toast({
        title: "Success",
        description: "Mission created successfully",
      });
      return newMission;
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to create mission",
        variant: "destructive",
      });
      throw err;
    }
  };

  const updateMission = async (id: string, updates: Partial<Mission>) => {
    try {
      const updatedMission = await missionAPI.updateMission(id, updates);
      setMissions(prev => prev.map(mission => 
        mission._id === id ? updatedMission : mission
      ));
      toast({
        title: "Success",
        description: "Mission updated successfully",
      });
      return updatedMission;
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update mission",
        variant: "destructive",
      });
      throw err;
    }
  };

  const deleteMission = async (id: string) => {
    try {
      await missionAPI.deleteMission(id);
      setMissions(prev => prev.filter(mission => mission._id !== id));
      toast({
        title: "Success",
        description: "Mission deleted successfully",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete mission",
        variant: "destructive",
      });
      throw err;
    }
  };

  return {
    missions,
    loading,
    error,
    createMission,
    updateMission,
    deleteMission,
    refreshMissions: loadMissions
  };
};
