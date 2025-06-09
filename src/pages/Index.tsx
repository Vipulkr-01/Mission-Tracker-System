import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { useMissions } from "@/hooks/useMissions";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const { missions, loading, createMission, updateMission, deleteMission } = useMissions();
  
  const [newMission, setNewMission] = useState({
    name: '',
    description: '',
    priority: '',
    estimatedDays: '',
    teamSize: '',
    location: ''
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const handleCreateMission = async () => {
    console.log('Creating mission with data:', newMission);
    
    if (!newMission.name || !newMission.description || !newMission.priority) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Name, Description, Priority)",
        variant: "destructive",
      });
      return;
    }

    try {
      // Handle estimated days - default to 7 days if not provided or invalid
      const estimatedDays = parseInt(newMission.estimatedDays) || 7;
      const currentDate = new Date();
      const estimatedCompletionDate = new Date(currentDate.getTime() + estimatedDays * 24 * 60 * 60 * 1000);

      const missionData = {
        name: newMission.name,
        status: "active",
        progress: 0,
        priority: newMission.priority,
        startDate: currentDate.toISOString().split('T')[0],
        estimatedCompletion: estimatedCompletionDate.toISOString().split('T')[0],
        description: newMission.description,
        teamMembers: parseInt(newMission.teamSize) || 1,
        location: newMission.location || 'Mission Site'
      };

      await createMission(missionData);
      setNewMission({ name: '', description: '', priority: '', estimatedDays: '', teamSize: '', location: '' });
    } catch (error) {
      console.error('Error creating mission:', error);
    }
  };

  const handleProgressUpdate = async (missionId: string, newProgress: number) => {
    try {
      await updateMission(missionId, { progress: newProgress });
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const handleStatusChange = async (missionId: string, newStatus: string) => {
    try {
      await updateMission(missionId, { status: newStatus });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="flex items-center space-x-2 text-white">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading missions...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Mission Control Dashboard
          </h1>
          <p className="text-xl text-blue-200">Central Command for Strategic Operations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-400 text-lg">Active Missions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {missions.filter(m => m.status === 'active').length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-400 text-lg">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {missions.filter(m => m.status === 'completed').length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-purple-400 text-lg">Total Operations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{missions.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-blue-400">Initialize New Mission</CardTitle>
              <CardDescription className="text-slate-300">
                Deploy strategic operations with precision
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mission-name" className="text-slate-200">Mission Name</Label>
                  <Input
                    id="mission-name"
                    placeholder="Operation Codename"
                    className="bg-slate-700 border-slate-600 text-white"
                    value={newMission.name}
                    onChange={(e) => setNewMission({...newMission, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority" className="text-slate-200">Priority Level</Label>
                  <select
                    id="priority"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                    value={newMission.priority}
                    onChange={(e) => setNewMission({...newMission, priority: e.target.value})}
                  >
                    <option value="">Select Priority</option>
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description" className="text-slate-200">Mission Description</Label>
                <textarea
                  id="description"
                  placeholder="Detailed mission briefing..."
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white min-h-[100px]"
                  value={newMission.description}
                  onChange={(e) => setNewMission({...newMission, description: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-slate-200">Duration (days)</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="7"
                    className="bg-slate-700 border-slate-600 text-white"
                    value={newMission.estimatedDays}
                    onChange={(e) => setNewMission({...newMission, estimatedDays: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="team-size" className="text-slate-200">Team Size</Label>
                  <Input
                    id="team-size"
                    type="number"
                    placeholder="4"
                    className="bg-slate-700 border-slate-600 text-white"
                    value={newMission.teamSize}
                    onChange={(e) => setNewMission({...newMission, teamSize: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-slate-200">Location</Label>
                  <Input
                    id="location"
                    placeholder="Mission Site"
                    className="bg-slate-700 border-slate-600 text-white"
                    value={newMission.location}
                    onChange={(e) => setNewMission({...newMission, location: e.target.value})}
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleCreateMission}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Initialize Mission
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-blue-400">Active Operations</CardTitle>
              <CardDescription className="text-slate-300">
                Current mission status and progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {missions.filter(m => m.status === 'active').map((mission) => (
                  <div key={mission._id} className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-white">{mission.name}</h3>
                        <p className="text-sm text-slate-300">{mission.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={`${getPriorityColor(mission.priority)} text-white`}>
                          {mission.priority}
                        </Badge>
                        <Badge className={`${getStatusColor(mission.status)} text-white`}>
                          {mission.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">Progress</span>
                        <span className="text-white">{mission.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${mission.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-3 text-sm text-slate-300">
                      <div>Start: {mission.startDate}</div>
                      <div>ETA: {mission.estimatedCompletion}</div>
                      <div>Team: {mission.teamMembers} members</div>
                      <div>Location: {mission.location}</div>
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <Button 
                        size="sm" 
                        onClick={() => handleProgressUpdate(mission._id!, Math.min(mission.progress + 10, 100))}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        +10%
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => handleStatusChange(mission._id!, 'completed')}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Complete
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => deleteMission(mission._id!)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
                
                {missions.filter(m => m.status === 'active').length === 0 && (
                  <Alert className="bg-slate-700/50 border-slate-600">
                    <AlertDescription className="text-slate-300">
                      No active missions. Initialize a new operation to get started.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {missions.length > 0 && (
          <Card className="bg-slate-800/50 border-slate-700 mt-8">
            <CardHeader>
              <CardTitle className="text-blue-400">Mission Archive</CardTitle>
              <CardDescription className="text-slate-300">
                Complete operational history and records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {missions.map((mission) => (
                  <AccordionItem key={mission._id} value={mission._id!} className="border-slate-600">
                    <AccordionTrigger className="text-white hover:text-blue-400">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-blue-600 text-white text-xs">
                            {mission.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span>{mission.name}</span>
                        <Badge className={`${getStatusColor(mission.status)} text-white ml-2`}>
                          {mission.status}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-300">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        <div>
                          <h4 className="font-semibold text-white mb-2">Mission Details</h4>
                          <p className="text-sm mb-2">{mission.description}</p>
                          <div className="space-y-1 text-sm">
                            <div>Priority: <Badge className={`${getPriorityColor(mission.priority)} text-white ml-1`}>{mission.priority}</Badge></div>
                            <div>Progress: {mission.progress}%</div>
                            <div>Team Size: {mission.teamMembers} members</div>
                            <div>Location: {mission.location}</div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-2">Timeline</h4>
                          <div className="space-y-1 text-sm">
                            <div>Started: {mission.startDate}</div>
                            <div>Estimated Completion: {mission.estimatedCompletion}</div>
                            <div>Status: {mission.status}</div>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
