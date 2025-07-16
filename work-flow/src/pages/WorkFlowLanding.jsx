import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/LandingPage/Navbar";
import Auth from "../components/LandingPage/AuthModal";
import HeroSection from "../components/LandingPage/Hero";
import SocialProof from "../components/LandingPage/SocialProof";
import Features from "../components/LandingPage/Features";
import Testimonials from "../components/LandingPage/Testimonials";
import Pricing from "../components/LandingPage/Pricing";
import CTA from "../components/LandingPage/CTA";
import Footer from "../components/LandingPage/Footer";
import TextHoverEffect from "../components/LandingPage/TextHoverEffect";
import RevealOnScroll from "../components/animations/RevealAnimation";


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

    <RevealOnScroll>
      <HeroSection />
    </RevealOnScroll>
      
      {/* <SocialProof /> */}
      <div className="w-full bg-white ">
        <TextHoverEffect text="WorkFlow"  duration={0.5} />
      </div>
      <RevealOnScroll delay={0.1}>
      <Features />
      </RevealOnScroll>
      <RevealOnScroll delay={0.2}>
      <Testimonials />
      </RevealOnScroll>
      <RevealOnScroll delay={0.3}>
      <Pricing />
      </RevealOnScroll>
      
      {/* Call to Action Section */}
      <RevealOnScroll delay={0.4}>
        <CTA />
      </RevealOnScroll>
      <Footer />
    </div>
  );
};

export default WorkflowLanding;
