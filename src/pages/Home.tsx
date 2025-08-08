
import { Award, Clock, Shield, Users, CheckCircle, ArrowRight, Star, TrendingUp } from 'lucide-react';
const Home = () => {
     const features = [
    {
      icon: <Award className="w-6 h-6 text-blue-600" />,
      title: "Comprehensive Assessment",
      description: "3-step progressive evaluation from A1 to C2 levels with 22 core competencies"
    },
    {
      icon: <Clock className="w-6 h-6 text-green-600" />,
      title: "Timed Evaluations",
      description: "Smart timer system with auto-submit functionality ensures fair assessment"
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-600" />,
      title: "Secure Environment",
      description: "Safe Exam Browser integration with video recording for exam integrity"
    },
    {
      icon: <Users className="w-6 h-6 text-orange-600" />,
      title: "Multi-Role Support",
      description: "Tailored dashboards for students, supervisors, and administrators"
    }
  ];

  const assessmentLevels = [
    {
      step: "Step 1",
      levels: "A1 & A2",
      description: "Foundation digital literacy skills",
      requirements: "≥75% to proceed to Step 2",
      badge: "beginner"
    },
    {
      step: "Step 2", 
      levels: "B1 & B2",
      description: "Intermediate digital competencies",
      requirements: "≥75% to proceed to Step 3",
      badge: "intermediate"
    },
    {
      step: "Step 3",
      levels: "C1 & C2",
      description: "Advanced digital mastery",
      requirements: "≥50% for C2 certification",
      badge: "advanced"
    }
  ];

  const stats = [
    { value: "10,000+", label: "Students Certified", icon: <Users className="w-5 h-5" /> },
    { value: "95%", label: "Success Rate", icon: <TrendingUp className="w-5 h-5" /> },
    { value: "22", label: "Core Competencies", icon: <Award className="w-5 h-5" /> },
    { value: "6", label: "Certification Levels", icon: <Star className="w-5 h-5" /> }
  ];
   return (
      <div>
         
      </div>
   );
};

export default Home;