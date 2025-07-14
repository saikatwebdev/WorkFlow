import React from "react";
import { ArrowRight, Play, Instagram, MessageCircle, Facebook, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-20 lg:py-32 bg-white overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 top-16">
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `
              linear-gradient(to right, #d1d5db 1px, transparent 1px),
              linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            mask: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            WebkitMask: 'radial-gradient(ellipse at center, black 30%, transparent 75%)'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
          <Zap className="w-4 h-4" />
          <span>AI-Powered Social Media Automation</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Transform Your Social Media with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-black-600">
            AI Automation
          </span>
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Streamline your Instagram, WhatsApp, and Facebook marketing with intelligent automation. 
          Save time, boost engagement, and grow your business with our powerful AI-driven platform.
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
    </section>
  );
};

export default HeroSection;