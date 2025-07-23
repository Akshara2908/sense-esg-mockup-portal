import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { 
  Home, 
  ClipboardList, 
  Target, 
  BarChart3, 
  FileText, 
  Brain,
  LogOut,
  Download,
  Plus,
  Trash2
} from 'lucide-react';

interface User {
  email: string;
  name: string;
}

interface OrganizationData {
  name: string;
  industry: string;
  size: string;
  location: string;
  description: string;
}

interface ESGPortalProps {
  user: User;
  organization: OrganizationData;
  onLogout: () => void;
}

interface Goal {
  id: string;
  title: string;
  category: 'Environmental' | 'Social' | 'Governance';
  progress: number;
  target: string;
  deadline: string;
  status: 'Active' | 'Completed' | 'Pending';
}

interface Parameter {
  id: string;
  name: string;
  category: string;
  mandatory: boolean;
  selected: boolean;
}

const ESGPortal: React.FC<ESGPortalProps> = ({ user, organization, onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Reduce Carbon Emissions',
      category: 'Environmental',
      progress: 75,
      target: '50% reduction by 2025',
      deadline: '2025-12-31',
      status: 'Active'
    },
    {
      id: '2',
      title: 'Employee Diversity Program',
      category: 'Social',
      progress: 60,
      target: '40% diverse workforce',
      deadline: '2024-12-31',
      status: 'Active'
    },
    {
      id: '3',
      title: 'Board Independence',
      category: 'Governance',
      progress: 90,
      target: '75% independent directors',
      deadline: '2024-06-30',
      status: 'Active'
    }
  ]);

  const [parameters, setParameters] = useState<Parameter[]>([
    { id: '1', name: 'GHG Emissions Scope 1', category: 'Environmental', mandatory: true, selected: true },
    { id: '2', name: 'GHG Emissions Scope 2', category: 'Environmental', mandatory: true, selected: true },
    { id: '3', name: 'Water Consumption', category: 'Environmental', mandatory: false, selected: false },
    { id: '4', name: 'Employee Turnover Rate', category: 'Social', mandatory: true, selected: true },
    { id: '5', name: 'Gender Pay Gap', category: 'Social', mandatory: false, selected: true },
    { id: '6', name: 'Board Diversity', category: 'Governance', mandatory: true, selected: true },
  ]);

  const [newGoal, setNewGoal] = useState({
    title: '',
    category: '' as 'Environmental' | 'Social' | 'Governance',
    target: '',
    deadline: ''
  });

  const [showSelectedOnly, setShowSelectedOnly] = useState(false);

  const handleParameterToggle = (id: string) => {
    setParameters(prev => 
      prev.map(param => 
        param.id === id ? { ...param, selected: !param.selected } : param
      )
    );
  };

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.category && newGoal.target && newGoal.deadline) {
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.title,
        category: newGoal.category,
        progress: 0,
        target: newGoal.target,
        deadline: newGoal.deadline,
        status: 'Active'
      };
      setGoals(prev => [...prev, goal]);
      setNewGoal({ title: '', category: '' as any, target: '', deadline: '' });
    }
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const exportSelectedParameters = () => {
    const selectedParams = parameters.filter(p => p.selected);
    const csvContent = [
      ['Parameter Name', 'Category', 'Type'],
      ...selectedParams.map(p => [p.name, p.category, p.mandatory ? 'Mandatory' : 'Voluntary'])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'selected-esg-parameters.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const activeGoals = goals.filter(g => g.status === 'Active').length;
  const initiatives = 8; // Mock data
  const activeTasks = 24; // Mock data
  const overallPerformance = Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length);

  const displayedParameters = showSelectedOnly ? parameters.filter(p => p.selected) : parameters;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3">
                <span className="text-green-600 font-bold">🌱</span>
              </div>
              <h1 className="text-xl font-bold">Helix Sense</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">Admin User</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onLogout}
                className="text-white hover:bg-green-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 bg-transparent h-auto p-0">
              <TabsTrigger 
                value="home" 
                className="flex items-center space-x-2 py-4 data-[state=active]:bg-green-50 data-[state=active]:text-green-600 data-[state=active]:border-b-2 data-[state=active]:border-green-600"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </TabsTrigger>
              <TabsTrigger 
                value="planning" 
                className="flex items-center space-x-2 py-4 data-[state=active]:bg-green-50 data-[state=active]:text-green-600 data-[state=active]:border-b-2 data-[state=active]:border-green-600"
              >
                <ClipboardList className="w-4 h-4" />
                <span>Planning</span>
              </TabsTrigger>
              <TabsTrigger 
                value="implementation" 
                className="flex items-center space-x-2 py-4 data-[state=active]:bg-green-50 data-[state=active]:text-green-600 data-[state=active]:border-b-2 data-[state=active]:border-green-600"
              >
                <Target className="w-4 h-4" />
                <span>Implementation</span>
              </TabsTrigger>
              <TabsTrigger 
                value="monitoring" 
                className="flex items-center space-x-2 py-4 data-[state=active]:bg-green-50 data-[state=active]:text-green-600 data-[state=active]:border-b-2 data-[state=active]:border-green-600"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Monitoring</span>
              </TabsTrigger>
              <TabsTrigger 
                value="reporting" 
                className="flex items-center space-x-2 py-4 data-[state=active]:bg-green-50 data-[state=active]:text-green-600 data-[state=active]:border-b-2 data-[state=active]:border-green-600"
              >
                <FileText className="w-4 h-4" />
                <span>Reporting</span>
              </TabsTrigger>
              <TabsTrigger 
                value="esg-ai" 
                className="flex items-center space-x-2 py-4 data-[state=active]:bg-green-50 data-[state=active]:text-green-600 data-[state=active]:border-b-2 data-[state=active]:border-green-600"
              >
                <Brain className="w-4 h-4" />
                <span>ESG AI</span>
              </TabsTrigger>
            </TabsList>

            {/* Home Tab */}
            <TabsContent value="home" className="mt-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100 text-sm font-medium">Active Goals</p>
                          <p className="text-3xl font-bold">{activeGoals}</p>
                        </div>
                        <Target className="w-8 h-8 text-green-200" />
                      </div>
                      <Progress value={75} className="mt-3 bg-green-400" />
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100 text-sm font-medium">Initiatives</p>
                          <p className="text-3xl font-bold">{initiatives}</p>
                        </div>
                        <ClipboardList className="w-8 h-8 text-blue-200" />
                      </div>
                      <Progress value={65} className="mt-3 bg-blue-400" />
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100 text-sm font-medium">Active Tasks</p>
                          <p className="text-3xl font-bold">{activeTasks}</p>
                        </div>
                        <BarChart3 className="w-8 h-8 text-purple-200" />
                      </div>
                      <Progress value={80} className="mt-3 bg-purple-400" />
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100 text-sm font-medium">Overall Performance</p>
                          <p className="text-3xl font-bold">{overallPerformance}%</p>
                        </div>
                        <Target className="w-8 h-8 text-orange-200" />
                      </div>
                      <Progress value={overallPerformance} className="mt-3 bg-orange-400" />
                    </CardContent>
                  </Card>
                </div>

                {/* Goals Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Goals Overview</CardTitle>
                    <CardDescription>Track progress across all ESG goals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {goals.map((goal) => (
                        <div key={goal.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold">{goal.title}</h3>
                              <Badge variant={goal.category === 'Environmental' ? 'default' : goal.category === 'Social' ? 'secondary' : 'outline'}>
                                {goal.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{goal.target}</p>
                            <div className="flex items-center space-x-4">
                              <Progress value={goal.progress} className="flex-1" />
                              <span className="text-sm font-medium">{goal.progress}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Planning Tab */}
            <TabsContent value="planning" className="mt-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <Tabs defaultValue="parameters" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="parameters">Select Parameters</TabsTrigger>
                    <TabsTrigger value="goals">Goal Setting</TabsTrigger>
                  </TabsList>

                  <TabsContent value="parameters" className="mt-6">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle>ESG Parameters Selection</CardTitle>
                            <CardDescription>Choose mandatory and voluntary parameters for your ESG reporting</CardDescription>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              onClick={() => setShowSelectedOnly(!showSelectedOnly)}
                            >
                              {showSelectedOnly ? 'View All' : 'View Selected'}
                            </Button>
                            <Button onClick={exportSelectedParameters}>
                              <Download className="w-4 h-4 mr-2" />
                              Export CSV
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {['Environmental', 'Social', 'Governance'].map(category => {
                            const categoryParams = displayedParameters.filter(p => p.category === category);
                            if (categoryParams.length === 0) return null;
                            
                            return (
                              <div key={category}>
                                <h3 className="font-semibold text-lg mb-3">{category}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {categoryParams.map(param => (
                                    <div key={param.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                                      <Checkbox
                                        checked={param.selected}
                                        onCheckedChange={() => handleParameterToggle(param.id)}
                                        disabled={param.mandatory}
                                      />
                                      <div className="flex-1">
                                        <p className="font-medium">{param.name}</p>
                                        <Badge variant={param.mandatory ? 'default' : 'secondary'} className="text-xs">
                                          {param.mandatory ? 'Mandatory' : 'Voluntary'}
                                        </Badge>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <Separator className="mt-4" />
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="goals" className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Add Goal Form */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Add New Goal</CardTitle>
                          <CardDescription>Create a new ESG goal for your organization</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label htmlFor="goal-title">Goal Title</Label>
                            <Input
                              id="goal-title"
                              placeholder="Enter goal title"
                              value={newGoal.title}
                              onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="goal-category">Category</Label>
                            <Select onValueChange={(value: any) => setNewGoal(prev => ({ ...prev, category: value }))}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Environmental">Environmental</SelectItem>
                                <SelectItem value="Social">Social</SelectItem>
                                <SelectItem value="Governance">Governance</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="goal-target">Target</Label>
                            <Textarea
                              id="goal-target"
                              placeholder="Describe the target outcome"
                              value={newGoal.target}
                              onChange={(e) => setNewGoal(prev => ({ ...prev, target: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="goal-deadline">Deadline</Label>
                            <Input
                              id="goal-deadline"
                              type="date"
                              value={newGoal.deadline}
                              onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                            />
                          </div>
                          <Button onClick={handleAddGoal} className="w-full">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Goal
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Existing Goals */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Current Goals</CardTitle>
                          <CardDescription>Manage your existing ESG goals</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {goals.map(goal => (
                              <div key={goal.id} className="p-4 border rounded-lg">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-semibold">{goal.title}</h4>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteGoal(goal.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                                <Badge variant="outline" className="mb-2">{goal.category}</Badge>
                                <p className="text-sm text-gray-600 mb-2">{goal.target}</p>
                                <div className="flex items-center space-x-2">
                                  <Progress value={goal.progress} className="flex-1" />
                                  <span className="text-sm">{goal.progress}%</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>

            {/* Implementation Tab */}
            <TabsContent value="implementation" className="mt-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Implementation Progress</CardTitle>
                    <CardDescription>Track the implementation status of your ESG goals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {goals.map(goal => (
                        <div key={goal.id} className="flex items-center justify-between p-6 border rounded-lg">
                          <div className="flex-1 mr-6">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-lg">{goal.title}</h3>
                              <Badge variant={goal.category === 'Environmental' ? 'default' : goal.category === 'Social' ? 'secondary' : 'outline'}>
                                {goal.category}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-3">{goal.target}</p>
                            <p className="text-sm text-gray-500">Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
                          </div>
                          <div className="w-48">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Progress</span>
                              <span className="text-sm font-bold">{goal.progress}%</span>
                            </div>
                            <Progress value={goal.progress} className="h-3" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Monitoring Tab */}
            <TabsContent value="monitoring" className="mt-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Sidebar */}
                  <div className="lg:col-span-1">
                    <Card>
                      <CardHeader>
                        <CardTitle>ESG Categories</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Button variant="ghost" className="w-full justify-start">
                            Environmental
                          </Button>
                          <Button variant="ghost" className="w-full justify-start">
                            Social
                          </Button>
                          <Button variant="ghost" className="w-full justify-start">
                            Governance
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Main Content */}
                  <div className="lg:col-span-3">
                    <Card>
                      <CardHeader>
                        <CardTitle>Monitoring Dashboard</CardTitle>
                        <CardDescription>Real-time monitoring of ESG metrics and performance</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {goals.map(goal => (
                            <div key={goal.id} className="p-4 border rounded-lg">
                              <h4 className="font-semibold mb-2">{goal.title}</h4>
                              <Badge variant="outline" className="mb-3">{goal.category}</Badge>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Current Progress</span>
                                  <span>{goal.progress}%</span>
                                </div>
                                <Progress value={goal.progress} />
                                <p className="text-xs text-gray-500 mt-2">{goal.target}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Reporting Tab */}
            <TabsContent value="reporting" className="mt-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>ESG Reporting</CardTitle>
                    <CardDescription>Generate comprehensive ESG reports and analytics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Reporting Dashboard</h3>
                      <p className="text-gray-600">Generate and manage your ESG reports here.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* ESG AI Tab */}
            <TabsContent value="esg-ai" className="mt-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>ESG AI Assistant</CardTitle>
                    <CardDescription>AI-powered insights and recommendations for your ESG initiatives</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Brain className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">AI Assistant</h3>
                      <p className="text-gray-600">Get AI-powered insights for your ESG strategy.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ESGPortal;