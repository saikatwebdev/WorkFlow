import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Auth from "../components/AuthModal";
import HeroSection from "../components/Hero";
import SocialProof from "../components/SocialProof";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <Navbar
        onOpenModal={() => setShowModal(true)}
        isMenuOpen={isMenuOpen}
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
      />

      {/* Modal for Sign In / Log In */}
      <Auth
        showModal={showModal}
        setShowModal={setShowModal}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        errors={errors}
        setErrors={setErrors}
        handleSubmit={handleSubmit}
      />
      <HeroSection />
      <SocialProof />
      <Features />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
};

export default WorkflowLanding;
