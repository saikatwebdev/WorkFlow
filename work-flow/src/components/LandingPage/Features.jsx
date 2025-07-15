import React from "react";
import {
  Zap,
  Calendar,
  BarChart3,
  TrendingUp,
  Shield,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: <Zap className="w-8 h-8 text-blue-500" />,
    title: "Multi-Platform Integration",
    description:
      "Connect Instagram, WhatsApp, and Facebook in one unified dashboard. Manage all your social presence from a single interface.",
  },
  {
    icon: <Calendar className="w-8 h-8 text-green-500" />,
    title: "Smart Scheduling",
    description:
      "AI-powered optimal posting times based on your audience engagement patterns. Never miss the perfect moment to connect.",
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-purple-500" />,
    title: "Campaign Automation",
    description:
      "Create intelligent workflows that respond to user interactions, automate responses, and nurture leads across all platforms.",
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-orange-500" />,
    title: "Advanced Analytics",
    description:
      "Deep insights into your social media performance with AI-driven recommendations for growth and engagement optimization.",
  },
  {
    icon: <Shield className="w-8 h-8 text-red-500" />,
    title: "User-Friendly Setup",
    description:
      "Get started in minutes with our intuitive onboarding process. No technical expertise required to unleash powerful automation.",
  },
  {
    icon: <Clock className="w-8 h-8 text-indigo-500" />,
    title: "24/7 Monitoring",
    description:
      "Continuous monitoring and automatic adjustments ensure your campaigns run smoothly around the clock.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="py-20 bg-gradient-to-br from-blue-50 to-purple-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Businesses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to automate, optimize, and scale your social
            media presence across all major platforms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className="mb-6  transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
