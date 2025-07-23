import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  ClipboardList, 
  Target, 
  BarChart3, 
  FileText, 
  Brain,
  LogOut
} from 'lucide-react';

interface User {
  email: string;
  name: string;
}

interface OrganizationData {
  name: string;
  location: string;
  employees: string;
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

const ESGPortal: React.FC<ESGPortalProps> = ({ user, organization, onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  
  const [goals] = useState<Goal[]>([
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

  const activeGoals = goals.filter(g => g.status === 'Active').length;
  const initiatives = 8;
  const activeTasks = 24;
  const overallPerformance = Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length);

  const handleGoalClick = (goalId: string) => {
    setSelectedGoalId(goalId);
    setActiveTab('implementation');
  };

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
                        <div 
                          key={goal.id} 
                          className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => handleGoalClick(goal.id)}
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-blue-600 hover:text-blue-800">{goal.title}</h3>
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
                <Card>
                  <CardHeader>
                    <CardTitle>Planning Dashboard</CardTitle>
                    <CardDescription>Plan and organize your ESG initiatives</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <ClipboardList className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Planning Tools</h3>
                      <p className="text-gray-600">Access planning tools and resources here.</p>
                    </div>
                  </CardContent>
                </Card>
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
                        <div 
                          key={goal.id} 
                          className={`flex items-center justify-between p-6 border rounded-lg ${
                            selectedGoalId === goal.id ? 'border-green-500 bg-green-50' : ''
                          }`}
                        >
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
                <Card>
                  <CardHeader>
                    <CardTitle>Monitoring Dashboard</CardTitle>
                    <CardDescription>Monitor your ESG performance and metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Monitoring Tools</h3>
                      <p className="text-gray-600">Access monitoring dashboards and analytics here.</p>
                    </div>
                  </CardContent>
                </Card>
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