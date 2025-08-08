import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Clock, Shield, Users, CheckCircle, ArrowRight, Star, TrendingUp } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const Home: React.FC = () => {
  const navigate = useNavigate();

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="info" size="lg" className="mb-6">
              🎓 Digital Competency Assessment Platform
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Master Your Digital
              <span className="text-blue-600 block">Competencies</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Take your digital skills to the next level with our comprehensive 3-step assessment platform. 
              Get certified from A1 to C2 levels through secure, timed evaluations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                onClick={() => navigate('/register')}
                icon={<ArrowRight size={20} />}
                className="px-8 py-4"
              >
                Start Assessment
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/login')}
                className="px-8 py-4"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment Levels */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              3-Step Assessment Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Progress through our structured evaluation system designed to accurately assess 
              and certify your digital competency levels.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {assessmentLevels.map((level, index) => (
              <Card key={index} className="text-center relative" hover>
                <div className="mb-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>
                  <Badge 
                    variant={index === 0 ? 'info' : index === 1 ? 'warning' : 'success'}
                    className="mb-2"
                  >
                    {level.badge}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{level.step}</h3>
                <div className="text-2xl font-bold text-blue-600 mb-3">{level.levels}</div>
                <p className="text-gray-600 mb-4">{level.description}</p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700 font-medium">{level.requirements}</p>
                </div>
                
                {index < assessmentLevels.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Test_School?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with proven assessment methodologies 
              to deliver accurate, secure, and comprehensive digital competency evaluations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center" hover>
                <div className="mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Certified?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who have validated their digital skills 
            through our comprehensive assessment platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              variant="secondary"
              onClick={() => navigate('/register')}
              className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4"
            >
              Get Started Today
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/about')}
              className="border-white text-white hover:bg-blue-700 px-8 py-4"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;