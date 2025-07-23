import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface OrganizationData {
  name: string;
  location: string;
  employees: string;
}

interface OrganizationDetailsProps {
  onComplete: (data: OrganizationData) => void;
}

const OrganizationDetails: React.FC<OrganizationDetailsProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<OrganizationData>({
    name: '',
    location: '',
    employees: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onComplete(formData);
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (field: keyof OrganizationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-green-600 mb-6">
            Organization Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-medium text-gray-700">
                Organization Name
              </Label>
              <Input
                id="name"
                placeholder="Enter organization name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="h-12 text-base"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location" className="text-base font-medium text-gray-700">
                Location
              </Label>
              <Select onValueChange={(value) => handleInputChange('location', value)} required>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                  <SelectItem value="in">India</SelectItem>
                  <SelectItem value="jp">Japan</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="employees" className="text-base font-medium text-gray-700">
                Number of Employees
              </Label>
              <Input
                id="employees"
                type="number"
                placeholder="Enter number of employees"
                value={formData.employees}
                onChange={(e) => handleInputChange('employees', e.target.value)}
                className="h-12 text-base"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium text-base mt-8"
              disabled={isLoading}
            >
              {isLoading ? 'Setting up...' : 'Submit'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationDetails;