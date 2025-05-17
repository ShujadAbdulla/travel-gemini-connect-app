
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  buttonText?: string;
  navigateTo?: string;
  className?: string;
  buttonColor?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  buttonText = "Learn More",
  navigateTo = "/services",
  className = "",
  buttonColor = "careblue-600"
}) => {
  const navigate = useNavigate();
  
  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${className}`}>
      <CardHeader className="pb-2">
        {icon && <div className="mb-2 text-careblue-600">{icon}</div>}
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600 min-h-[80px]">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className={`w-full border-${buttonColor} text-${buttonColor} hover:bg-${buttonColor.replace('600', '50')}`}
          onClick={() => navigate(navigateTo)}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
