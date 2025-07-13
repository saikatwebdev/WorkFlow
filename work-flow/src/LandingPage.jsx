import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  CheckCircle,
  Star,
  Zap,
  Calendar,
  BarChart3,
  Users,
  ArrowRight,
  Menu,
  X,
  Instagram,
  MessageCircle,
  Facebook,
  Play,
  TrendingUp,
  Shield,
  Clock,
} from "lucide-react";

const WorkflowLanding = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  //Sign in and Log in Modal and form validation
  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = () => {
    if (!validateForm()) return;
    //Simulate login success
    setShowModal(false);
    navigate("/dashboard");
  };

  //end of Sign in and Log in Modal and form validation

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("pro");

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

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechStart Inc.",
      content:
        "Workflow transformed our social media strategy. We saw 300% increase in engagement within the first month.",
      rating: 5,
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "E-commerce Owner",
      company: "Fashion Forward",
      content:
        "The automation features saved us 20 hours per week. Our Instagram sales increased by 150% using Workflow.",
      rating: 5,
      avatar: "MC",
    },
    {
      name: "Emma Rodriguez",
      role: "Social Media Manager",
      company: "Creative Agency",
      content:
        "Managing multiple client accounts became effortless. The analytics insights are incredibly valuable.",
      rating: 5,
      avatar: "ER",
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for small businesses and startups",
      features: [
        "Up to 3 social accounts",
        "Basic automation workflows",
        "Standard analytics",
        "Email support",
        "Monthly strategy calls",
      ],
      popular: false,
    },
    {
      name: "Pro",
      price: "$79",
      period: "/month",
      description: "Ideal for growing businesses and agencies",
      features: [
        "Up to 10 social accounts",
        "Advanced automation & AI",
        "Comprehensive analytics",
        "Priority support",
        "Weekly strategy calls",
        "Custom integrations",
        "Team collaboration",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      description: "For large organizations with complex needs",
      features: [
        "Unlimited social accounts",
        "Full automation suite",
        "Advanced AI insights",
        "24/7 dedicated support",
        "Daily strategy calls",
        "Custom development",
        "White-label options",
        "API access",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">
                  Workflow
                </span>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a
                  href="#features"
                  className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Pricing
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Reviews
                </a>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
                  onClick={() => setShowModal(true)}
                >
                  Get Started
                </button>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-900 hover:text-blue-600 focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#features"
                className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600"
              >
                Reviews
              </a>
              <button
                className="w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                onClick={() => setShowModal(true)}
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Modal for Sign In / Log In */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 backdrop-blur-lg z-50 animate-fadeIn">
          <div className="relative bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-xl p-8 rounded-2xl w-full max-w-md shadow-2xl border border-white/20 animate-slideUp">
            {/* Animated background elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-xl opacity-20 animate-pulse delay-1000"></div>

            <div className="relative z-10">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2 animate-slideDown">
                  {isLogin ? "Welcome Back" : "Join Workflow"}
                </h2>
                <p className="text-gray-600 text-sm animate-slideDown delay-100">
                  {isLogin ? "Sign in to your account" : "Create your account"}
                </p>
              </div>

              <div className="space-y-4">
                <div className="animate-slideUp delay-200">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors({ ...errors, email: "" });
                    }}
                    className="block w-full bg-white/80 backdrop-blur-sm border border-gray-200 p-3 rounded-xl 
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 
                         focus:border-transparent transition-all duration-300 hover:bg-white/90
                         focus:scale-[1.02] transform"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 animate-slideDown">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="animate-slideUp delay-300">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors({ ...errors, password: "" });
                    }}
                    className="block w-full bg-white/80 backdrop-blur-sm border border-gray-200 p-3 rounded-xl 
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 
                         focus:border-transparent transition-all duration-300 hover:bg-white/90
                         focus:scale-[1.02] transform"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1 animate-slideDown">
                      {errors.password}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl 
                       font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 
                       transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] animate-slideUp delay-400
                       relative overflow-hidden group"
                >
                  <span className="relative z-10">
                    {isLogin ? "Sign In" : "Create Account"}
                  </span>
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 
                            group-hover:opacity-100 transition-opacity duration-300"
                  ></div>
                </button>

                <div className="text-center animate-slideUp delay-500">
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sm text-gray-600 hover:text-purple-600 transition-colors duration-300 
                         hover:underline underline-offset-4"
                  >
                    {isLogin
                      ? "Don't have an account? Sign Up"
                      : "Already have an account? Sign In"}
                  </button>
                </div>

                <button
                  onClick={() => {
                    setShowModal(false);
                    setEmail("");
                    setPassword("");
                    setErrors({});
                  }}
                  className="w-full text-gray-500 hover:text-gray-700 transition-all duration-300 
                       py-2 rounded-xl hover:bg-gray-100/50 animate-slideUp delay-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Zap className="w-4 h-4" />
              <span>AI-Powered Social Media Automation</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Transform Your Social Media with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}
                AI Automation
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Streamline your Instagram, WhatsApp, and Facebook marketing with
              intelligent automation. Save time, boost engagement, and grow your
              business with our powerful AI-driven platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2 group">
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            <div className="flex justify-center items-center space-x-8 text-gray-500 text-sm">
              <div className="flex items-center space-x-2">
                <Instagram className="w-5 h-5" />
                <span>Instagram</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </div>
              <div className="flex items-center space-x-2">
                <Facebook className="w-5 h-5" />
                <span>Facebook</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gray-600 mb-8">
              Trusted by 10,000+ businesses worldwide
            </p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="bg-gray-200 h-12 w-32 rounded flex items-center justify-center text-gray-500 font-semibold">
                BRAND
              </div>
              <div className="bg-gray-200 h-12 w-32 rounded flex items-center justify-center text-gray-500 font-semibold">
                COMPANY
              </div>
              <div className="bg-gray-200 h-12 w-32 rounded flex items-center justify-center text-gray-500 font-semibold">
                STARTUP
              </div>
              <div className="bg-gray-200 h-12 w-32 rounded flex items-center justify-center text-gray-500 font-semibold">
                AGENCY
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">300%</div>
              <p className="text-gray-600">Average engagement increase</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                20hrs
              </div>
              <p className="text-gray-600">Weekly time savings</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                150%
              </div>
              <p className="text-gray-600">Revenue growth</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
                <div className="mb-6 group-hover:scale-110 transition-transform">
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

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied customers who've transformed their
              social media strategy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 relative"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-20 bg-gradient-to-br from-slate-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600">
              Start free and scale as you grow. No hidden fees, cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-8 relative ${
                  plan.popular ? "ring-2 ring-blue-500 shadow-xl" : "shadow-lg"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {plan.price}
                    <span className="text-lg font-normal text-gray-600">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Social Media?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using Workflow to automate
            their social media success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2 group">
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Schedule Demo
            </button>
          </div>
          <p className="text-sm text-blue-100 mt-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Workflow</span>
              </div>
              <p className="text-gray-400">
                AI-powered social media automation for modern businesses.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Workflow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WorkflowLanding;
