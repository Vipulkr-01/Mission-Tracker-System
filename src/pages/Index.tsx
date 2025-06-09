
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Globe, 
  Lock, 
  Satellite, 
  Target,
  Users,
  Zap,
  Plus,
  Eye
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [missions, setMissions] = useState([
    {
      id: 1,
      name: "Operation Aurora",
      status: "active",
      progress: 75,
      priority: "high",
      startDate: "2024-06-01",
      estimatedCompletion: "2024-06-15",
      description: "Critical satellite deployment mission with time-sensitive objectives",
      teamMembers: 8,
      location: "Pacific Ocean"
    },
    {
      id: 2,
      name: "Project Zenith",
      status: "completed",
      progress: 100,
      priority: "medium",
      startDate: "2024-05-15",
      estimatedCompletion: "2024-05-30",
      description: "Deep space communication array maintenance and upgrades",
      teamMembers: 12,
      location: "Antarctica Base"
    },
    {
      id: 3,
      name: "Mission Catalyst",
      status: "active",
      progress: 45,
      priority: "critical",
      startDate: "2024-06-08",
      estimatedCompletion: "2024-06-20",
      description: "Emergency response protocol for orbital debris tracking",
      teamMembers: 6,
      location: "Houston Control"
    }
  ]);

  const [newMission, setNewMission] = useState({
    name: '',
    description: '',
    priority: '',
    estimatedDays: '',
    teamSize: '',
    location: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === 'admin' && loginForm.password === 'mission123') {
      setIsAuthenticated(true);
      toast({
        title: "Access Granted",
        description: "Welcome to Mission Control Dashboard",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  const handleCreateMission = () => {
    if (!newMission.name || !newMission.description || !newMission.priority) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const mission = {
      id: missions.length + 1,
      name: newMission.name,
      status: "active",
      progress: 0,
      priority: newMission.priority,
      startDate: new Date().toISOString().split('T')[0],
      estimatedCompletion: new Date(Date.now() + parseInt(newMission.estimatedDays) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: newMission.description,
      teamMembers: parseInt(newMission.teamSize) || 1,
      location: newMission.location
    };

    setMissions([...missions, mission]);
    setNewMission({ name: '', description: '', priority: '', estimatedDays: '', teamSize: '', location: '' });
    toast({
      title: "Mission Created",
      description: `${mission.name} has been added to mission control`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'secondary';
      case 'medium': return 'outline';
      default: return 'outline';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJzdGFycyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgPGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjAuNSIgZmlsbD0iIzMzNzNkYyIgb3BhY2l0eT0iMC4zIi8+CiAgICA8L3BhdHRlcm4+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjc3RhcnMpIi8+Cjwvc3ZnPg==')] opacity-20"></div>
        
        <Card className="w-full max-w-md bg-slate-800/90 border-slate-700 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-blue-500/20 rounded-full w-fit">
              <Lock className="h-8 w-8 text-blue-400" />
            </div>
            <CardTitle className="text-2xl text-white">Mission Control Access</CardTitle>
            <CardDescription className="text-slate-300">
              Secure authentication required for mission operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-200">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                <Zap className="mr-2 h-4 w-4" />
                Access Mission Control
              </Button>
              <div className="text-xs text-slate-400 text-center mt-4">
                Demo credentials: admin / mission123
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJzdGFycyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgPGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjAuNSIgZmlsbD0iIzMzNzNkYyIgb3BhY2l0eT0iMC4zIi8+CiAgICA8L3BhdHRlcm4+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjc3RhcnMpIi8+Cjwvc3ZnPg==')] opacity-20"></div>
      
      <div className="relative z-10 p-6">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Satellite className="h-8 w-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Mission Control Dashboard
                </h1>
                <p className="text-slate-300">Central Command & Operations Center</p>
              </div>
            </div>
            <Button 
              onClick={() => setIsAuthenticated(false)}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Lock className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-600">
              <Activity className="mr-2 h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="missions" className="data-[state=active]:bg-blue-600">
              <Target className="mr-2 h-4 w-4" />
              Missions
            </TabsTrigger>
            <TabsTrigger value="create" className="data-[state=active]:bg-blue-600">
              <Plus className="mr-2 h-4 w-4" />
              Create Mission
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Active Missions</p>
                      <p className="text-2xl font-bold text-blue-400">
                        {missions.filter(m => m.status === 'active').length}
                      </p>
                    </div>
                    <Activity className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Completed</p>
                      <p className="text-2xl font-bold text-green-400">
                        {missions.filter(m => m.status === 'completed').length}
                      </p>
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Critical Priority</p>
                      <p className="text-2xl font-bold text-red-400">
                        {missions.filter(m => m.priority === 'critical').length}
                      </p>
                    </div>
                    <AlertCircle className="h-8 w-8 text-red-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Personnel</p>
                      <p className="text-2xl font-bold text-cyan-400">
                        {missions.reduce((sum, m) => sum + m.teamMembers, 0)}
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-cyan-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Target className="mr-2 h-5 w-5 text-blue-400" />
                    Active Mission Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {missions.filter(m => m.status === 'active').map((mission) => (
                    <div key={mission.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">{mission.name}</span>
                        <Badge variant={getPriorityColor(mission.priority)}>
                          {mission.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <Progress value={mission.progress} className="h-2" />
                      <div className="flex justify-between text-sm text-slate-400">
                        <span>{mission.progress}% Complete</span>
                        <span>Due: {mission.estimatedCompletion}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Globe className="mr-2 h-5 w-5 text-cyan-400" />
                    Mission Locations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {missions.map((mission) => (
                    <div key={mission.id} className="flex items-center justify-between py-2">
                      <div>
                        <span className="text-white font-medium">{mission.name}</span>
                        <p className="text-slate-400 text-sm">{mission.location}</p>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(mission.status)}`}></div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="missions">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {missions.map((mission) => (
                <Card key={mission.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white">{mission.name}</CardTitle>
                        <CardDescription className="text-slate-300">
                          Started: {mission.startDate}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getPriorityColor(mission.priority)}>
                          {mission.priority}
                        </Badge>
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(mission.status)}`}></div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-300 text-sm">{mission.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Progress</span>
                        <span className="text-white">{mission.progress}%</span>
                      </div>
                      <Progress value={mission.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-slate-300">
                        <Users className="mr-2 h-4 w-4" />
                        {mission.teamMembers} members
                      </div>
                      <div className="flex items-center text-slate-300">
                        <Globe className="mr-2 h-4 w-4" />
                        {mission.location}
                      </div>
                      <div className="flex items-center text-slate-300 col-span-2">
                        <Clock className="mr-2 h-4 w-4" />
                        Due: {mission.estimatedCompletion}
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-slate-800 border-slate-700 text-white">
                        <DialogHeader>
                          <DialogTitle>{mission.name}</DialogTitle>
                          <DialogDescription className="text-slate-300">
                            Mission Control Detailed View
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-blue-400">Mission Description</h4>
                            <p className="text-slate-300">{mission.description}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-blue-400">Status</h4>
                              <Badge variant={getPriorityColor(mission.priority)}>
                                {mission.status.toUpperCase()}
                              </Badge>
                            </div>
                            <div>
                              <h4 className="font-semibold text-blue-400">Priority</h4>
                              <Badge variant={getPriorityColor(mission.priority)}>
                                {mission.priority.toUpperCase()}
                              </Badge>
                            </div>
                            <div>
                              <h4 className="font-semibold text-blue-400">Team Size</h4>
                              <p className="text-slate-300">{mission.teamMembers} members</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-blue-400">Location</h4>
                              <p className="text-slate-300">{mission.location}</p>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-blue-400">Timeline</h4>
                            <div className="space-y-1 text-sm text-slate-300">
                              <p>Started: {mission.startDate}</p>
                              <p>Expected Completion: {mission.estimatedCompletion}</p>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-blue-400">Progress</h4>
                            <Progress value={mission.progress} className="h-2 mt-2" />
                            <p className="text-sm text-slate-300 mt-1">{mission.progress}% Complete</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create">
            <Card className="max-w-2xl mx-auto bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Create New Mission</CardTitle>
                <CardDescription className="text-slate-300">
                  Initialize a new mission in the control system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mission-name" className="text-slate-200">Mission Name *</Label>
                    <Input
                      id="mission-name"
                      placeholder="e.g., Operation Phoenix"
                      value={newMission.name}
                      onChange={(e) => setNewMission({...newMission, name: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority" className="text-slate-200">Priority Level *</Label>
                    <Select onValueChange={(value) => setNewMission({...newMission, priority: value})}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-slate-200">Mission Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Detailed description of mission objectives..."
                    value={newMission.description}
                    onChange={(e) => setNewMission({...newMission, description: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-slate-200">Duration (days)</Label>
                    <Input
                      id="duration"
                      type="number"
                      placeholder="14"
                      value={newMission.estimatedDays}
                      onChange={(e) => setNewMission({...newMission, estimatedDays: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team-size" className="text-slate-200">Team Size</Label>
                    <Input
                      id="team-size"
                      type="number"
                      placeholder="6"
                      value={newMission.teamSize}
                      onChange={(e) => setNewMission({...newMission, teamSize: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-slate-200">Location</Label>
                    <Input
                      id="location"
                      placeholder="Mission Site"
                      value={newMission.location}
                      onChange={(e) => setNewMission({...newMission, location: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleCreateMission}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Initialize Mission
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
