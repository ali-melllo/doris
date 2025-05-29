"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  MessageCircle,
  Building2,
  Home,
  Briefcase,
  Users,
  Check,
  Globe,
  Smartphone,
  Brain,
  Shield,
  Zap,
  ChevronRight,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Bot,
  Sparkles,
  Database,
  Languages,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "@/components/mode-toggle"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const coreServices = [
    {
      icon: Building2,
      title: "Government Info",
      description: "Rights, benefits, legal status, health, taxes",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Home,
      title: "Housing Support",
      description: "How to find a home, rent subsidy, refugee shelters",
      color: "from-teal-500 to-teal-600",
    },
    {
      icon: Briefcase,
      title: "Jobs & Work",
      description: "CV help, jobs by city, work permits",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Users,
      title: "Social Matching",
      description: "Community events, language exchange, local help",
      color: "from-indigo-500 to-indigo-600",
    },
  ]

  const features = [
    { icon: Check, text: "Verified, accurate data" },
    { icon: Globe, text: "Multilingual support" },
    { icon: Smartphone, text: "Easy on mobile" },
    { icon: Brain, text: "Learns from your questions" },
    { icon: Shield, text: "Private and anonymous" },
    { icon: Zap, text: "Backed by AI + RAG technology" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              GlobalHelp
            </span>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <ModeToggle />
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              Sign In
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-xs md:text-sm px-3 md:px-4"
            >
              Launch Chat
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 md:pt-28 lg:pt-32 pb-8 md:pb-16 lg:pb-20 px-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-1/3 right-1/4 w-48 md:w-80 h-48 md:h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-40 md:w-72 h-40 md:h-72 bg-teal-500/10 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto text-center relative z-10">
          <motion.div initial="initial" animate="animate" variants={staggerContainer} className="max-w-6xl mx-auto">
            <motion.div variants={fadeInUp} className="mb-6 md:mb-8">
              <div className="relative inline-block">
                <Badge
                  variant="secondary"
                  className="px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-teal-500/20 animate-pulse"></div>
                  <span className="relative z-10">🚀 Now powered by GPT + Government Data</span>
                </Badge>
                {/* Border Beam Effect */}
                <div className="absolute inset-0 rounded-full opacity-75">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 opacity-75 blur-sm animate-spin-slow"></div>
                </div>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent leading-tight px-2"
            >
              Your AI Assistant for Life in the Netherlands
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed px-4"
            >
              Ask anything about jobs, housing, government support, or integration — in your own language
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 mb-8 md:mb-16"
            >
              <div className="relative group">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-sm md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden w-full sm:w-auto"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <MessageCircle className="w-4 md:w-5 h-4 md:h-5 mr-2 relative z-10" />
                  <span className="relative z-10">Launch the Chat</span>
                  <ChevronRight className="w-4 md:w-5 h-4 md:h-5 ml-2 relative z-10" />
                </Button>
                {/* Border Beam */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 p-[2px] animate-spin-slow">
                    <div className="w-full h-full rounded-xl bg-background"></div>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="lg"
                className="text-sm md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-xl relative group overflow-hidden w-full sm:w-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Watch Demo</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* 3D Hero Illustration with AI Flow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative max-w-7xl mx-auto perspective-1000"
          >
            {/* Main 3D Container */}
            <div className="relative transform-gpu preserve-3d">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-600/20 to-teal-500/20 rounded-3xl blur-3xl transform translate-z-[-50px] scale-110"></div>

              {/* Main Chat Interface Card */}
              <div className="relative">
                {/* Border Beam Container */}
                <div className="absolute inset-0 rounded-2xl md:rounded-3xl p-[2px] bg-gradient-to-r from-blue-500 via-purple-500 via-teal-500 to-blue-500 animate-spin-slow">
                  <div className="w-full h-full rounded-2xl md:rounded-3xl bg-card/80 backdrop-blur-xl"></div>
                </div>

                <Card className="relative backdrop-blur-xl bg-card/80 border-0 rounded-2xl md:rounded-3xl overflow-hidden transform-gpu hover:scale-105 transition-transform duration-500">
                  <CardContent className="p-4 md:p-8 lg:p-12">
                    {/* AI Flow Integration */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-8 items-center relative">
                      {/* Left Side - Chat Demo */}
                      <motion.div
                        className="lg:col-span-2 space-y-4 md:space-y-6 transform-gpu"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-2 md:w-3 h-2 md:h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                          <span className="text-xs md:text-sm text-muted-foreground font-medium">
                            AI Assistant Online
                          </span>
                        </div>

                        <div className="space-y-3 md:space-y-4">
                          <motion.div
                            className="text-left bg-gradient-to-r from-muted/80 to-muted/60 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 text-xs md:text-sm shadow-lg transform-gpu hover:scale-105 transition-transform duration-300"
                            whileHover={{ y: -2 }}
                          >
                            "How do I apply for housing benefit?"
                          </motion.div>
                          <motion.div
                            className="text-left bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 text-xs md:text-sm shadow-lg transform-gpu hover:scale-105 transition-transform duration-300"
                            whileHover={{ y: -2 }}
                          >
                            "I can help you with that! In the Netherlands, housing benefit (huurtoeslag) is available
                            if..."
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Center - AI Flow Visualization */}
                      <motion.div
                        className="lg:col-span-1 flex justify-center relative"
                        initial={{ scale: 0, rotateY: 180 }}
                        animate={{ scale: 1, rotateY: 0 }}
                        transition={{ delay: 0.8, duration: 1, type: "spring" }}
                      >
                        <div className="relative">
                          {/* AI Brain Core */}
                          <div className="relative w-20 md:w-24 lg:w-32 h-20 md:h-24 lg:h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/25 transform-gpu hover:scale-110 transition-transform duration-300">
                            <Bot className="w-8 md:w-10 lg:w-12 h-8 md:h-10 lg:h-12 text-white" />

                            {/* Pulsing Ring */}
                            <div className="absolute inset-0 rounded-full border-2 border-blue-400/50 animate-ping"></div>
                          </div>

                          {/* Data Flow Lines */}
                          <div className="absolute inset-0 pointer-events-none">
                            {/* Top Flow - Government Data */}
                            <div className="absolute -top-8 md:-top-12 left-1/2 transform -translate-x-1/2">
                              <div className="flex flex-col items-center space-y-2">
                                <div className="w-6 md:w-8 h-6 md:h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                  <Database className="w-3 md:w-4 h-3 md:h-4 text-white" />
                                </div>
                                <div className="w-0.5 h-4 md:h-6 bg-gradient-to-b from-green-500 to-transparent animate-pulse"></div>
                              </div>
                            </div>

                            {/* Right Flow - AI Processing */}
                            <div className="absolute top-1/2 -right-8 md:-right-12 transform -translate-y-1/2">
                              <div className="flex items-center space-x-2">
                                <div className="w-4 md:w-6 h-0.5 bg-gradient-to-r from-purple-500 to-transparent animate-pulse"></div>
                                <div className="w-6 md:w-8 h-6 md:h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                                  <Sparkles className="w-3 md:w-4 h-3 md:h-4 text-white" />
                                </div>
                              </div>
                            </div>

                            {/* Bottom Flow - Multilingual Output */}
                            <div className="absolute -bottom-8 md:-bottom-12 left-1/2 transform -translate-x-1/2">
                              <div className="flex flex-col items-center space-y-2">
                                <div className="w-0.5 h-4 md:h-6 bg-gradient-to-t from-teal-500 to-transparent animate-pulse"></div>
                                <div className="w-6 md:w-8 h-6 md:h-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
                                  <Languages className="w-3 md:w-4 h-3 md:h-4 text-white" />
                                </div>
                              </div>
                            </div>

                            {/* Left Flow - User Input */}
                            <div className="absolute top-1/2 -left-8 md:-left-12 transform -translate-y-1/2">
                              <div className="flex items-center space-x-2">
                                <div className="w-6 md:w-8 h-6 md:h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                  <MessageCircle className="w-3 md:w-4 h-3 md:h-4 text-white" />
                                </div>
                                <div className="w-4 md:w-6 h-0.5 bg-gradient-to-l from-blue-500 to-transparent animate-pulse"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Right Side - Language Support */}
                      <motion.div
                        className="lg:col-span-2 space-y-2 md:space-y-3"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                      >
                        {[
                          { flag: "🇳🇱", lang: "Dutch", delay: 0 },
                          { flag: "🇬🇧", lang: "English", delay: 0.1 },
                          { flag: "🇸🇦", lang: "Arabic", delay: 0.2 },
                          { flag: "🇫🇷", lang: "French", delay: 0.3 },
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1.2 + item.delay, duration: 0.5 }}
                          >
                            <Badge
                              variant="secondary"
                              className="w-full justify-start p-2 md:p-3 bg-gradient-to-r from-card/80 to-card/60 backdrop-blur-sm border border-border/50 hover:scale-105 transition-transform duration-300 shadow-lg text-xs md:text-sm"
                            >
                              <span className="text-sm md:text-lg mr-2">{item.flag}</span>
                              {item.lang}
                            </Badge>
                          </motion.div>
                        ))}
                        <motion.div
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 1.6, duration: 0.5 }}
                        >
                          <Badge
                            variant="secondary"
                            className="w-full justify-center p-2 md:p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 hover:scale-105 transition-transform duration-300 shadow-lg text-xs md:text-sm"
                          >
                            <span className="font-semibold">+ 10 more languages</span>
                          </Badge>
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Bottom Feature Cards */}
                    <motion.div
                      className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-8 md:mt-12"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.4, duration: 0.8 }}
                    >
                      {[
                        { icon: Building2, label: "Gov Info", color: "from-blue-500 to-blue-600" },
                        { icon: Home, label: "Housing", color: "from-teal-500 to-teal-600" },
                        { icon: Briefcase, label: "Jobs", color: "from-purple-500 to-purple-600" },
                        { icon: Users, label: "Social", color: "from-indigo-500 to-indigo-600" },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="group"
                          whileHover={{ y: -5, scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Card className="p-3 md:p-4 text-center backdrop-blur-sm bg-card/60 border border-border/50 hover:border-border transition-all duration-300 shadow-lg hover:shadow-xl">
                            <div
                              className={`w-8 md:w-12 h-8 md:h-12 mx-auto rounded-lg md:rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                            >
                              <item.icon className="w-4 md:w-6 h-4 md:h-6 text-white" />
                            </div>
                            <p className="text-xs md:text-sm font-medium">{item.label}</p>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-8 md:py-12 lg:py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-8 md:mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-6"
            >
              Four Core Services
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Everything you need to navigate life in the Netherlands, powered by AI and real government data
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {coreServices.map((service, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm bg-card/50 border-border/50 h-full">
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-12 md:w-16 h-12 md:h-16 mx-auto rounded-xl md:rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <service.icon className="w-6 md:w-8 h-6 md:h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg md:text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-sm md:text-base mb-4">{service.description}</CardDescription>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-xs md:text-sm"
                    >
                      Learn more
                      <ChevronRight className="w-3 md:w-4 h-3 md:h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Global Chatbot Section */}
      <section className="py-8 md:py-12 lg:py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-4 text-xs md:text-sm">
                🤖 Built with GPT + RAG
              </Badge>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-6">
                Smart GPT-powered chatbot with real government data
              </h2>
              <p className="text-sm md:text-lg lg:text-xl text-muted-foreground mb-4 md:mb-8">
                Get instant, accurate answers in Arabic, French, Dutch, English, and more. Our AI understands context
                and provides personalized guidance based on your situation.
              </p>
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm md:text-base">Real-time responses in 15+ languages</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm md:text-base">Updated government data and policies</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm md:text-base">Personalized recommendations</span>
                </div>
              </div>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-sm md:text-base px-6 md:px-8 py-4 md:py-6"
              >
                <MessageCircle className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                Chat Now
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl md:rounded-3xl blur-2xl"></div>
              <Card className="relative backdrop-blur-sm bg-card/80 border-border/50 rounded-2xl md:rounded-3xl overflow-hidden">
                <CardContent className="p-4 md:p-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 mb-4 md:mb-6">
                      <div className="w-6 md:w-8 h-6 md:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-3 md:w-4 h-3 md:h-4 text-white" />
                      </div>
                      <span className="font-semibold text-sm md:text-base">GlobalHelp AI</span>
                      <Badge variant="secondary" className="text-xs">
                        Online
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-muted/50 rounded-lg p-3 ml-4 md:ml-8">
                        <p className="text-xs md:text-sm">
                          {"I'm a refugee from Syria. How can I find housing in Amsterdam?"}
                        </p>
                      </div>
                      <div className="bg-blue-500/10 rounded-lg p-3 mr-4 md:mr-8">
                        <p className="text-xs md:text-sm">
                          {
                            "I understand you're looking for housing in Amsterdam as a refugee. Here are your options: 1) Contact your local municipality for social housing..."
                          }
                        </p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3 ml-4 md:ml-8">
                        <p className="text-xs md:text-sm">{"Can you explain this in Arabic?"}</p>
                      </div>
                      <div className="bg-blue-500/10 rounded-lg p-3 mr-4 md:mr-8">
                        <p className="text-xs md:text-sm">
                          {"بالطبع! كلاجئ في هولندا، يمكنك الحصول على السكن من خلال..."}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why GlobalHelp */}
      <section className="py-8 md:py-12 lg:py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-8 md:mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-6"
            >
              Why GlobalHelp?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Built specifically for migrants, refugees, and international residents in the Netherlands
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="group hover:shadow-lg transition-all duration-300 backdrop-blur-sm bg-card/50 border-border/50 h-full">
                  <CardContent className="p-4 md:p-6 flex items-center space-x-3 md:space-x-4">
                    <div className="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-5 md:w-6 h-5 md:h-6 text-white" />
                    </div>
                    <p className="font-medium text-sm md:text-lg">{feature.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section className="py-8 md:py-12 lg:py-20 px-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-teal-500/10">
        <div className="container mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-6"
            >
              Get early access to the full app experience
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 px-4">
              Join thousands of users already getting help with life in the Netherlands
            </motion.p>

            <motion.form
              variants={fadeInUp}
              onSubmit={handleWaitlistSubmit}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto px-4"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-10 md:h-12 rounded-lg md:rounded-xl text-sm md:text-base"
                required
              />
              <Button
                type="submit"
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 h-10 md:h-12 px-6 md:px-8 rounded-lg md:rounded-xl text-sm md:text-base"
                disabled={isSubmitted}
              >
                {isSubmitted ? (
                  <>
                    <Check className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                    Joined!
                  </>
                ) : (
                  <>
                    <Mail className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                    Join Waitlist
                  </>
                )}
              </Button>
            </motion.form>

            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl"
              >
                <p className="text-green-600 dark:text-green-400 text-sm md:text-base">
                  🎉 Welcome to the waitlist! We'll notify you when the full app is ready.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 px-4 border-t border-border/50 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  GlobalHelp
                </span>
              </div>
              <p className="text-muted-foreground text-sm md:text-base">
                Your AI assistant for life in the Netherlands. Built with ❤️ for migrants and refugees.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm md:text-base">Product</h4>
              <ul className="space-y-2 text-muted-foreground text-sm md:text-base">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Changelog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm md:text-base">Company</h4>
              <ul className="space-y-2 text-muted-foreground text-sm md:text-base">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm md:text-base">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Twitter className="w-4 md:w-5 h-4 md:h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="w-4 md:w-5 h-4 md:h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="w-4 md:w-5 h-4 md:h-5" />
                </a>
              </div>
              <div className="mt-4">
                <select className="bg-background border border-border rounded-lg px-3 py-2 text-xs md:text-sm w-full">
                  <option>🇬🇧 English</option>
                  <option>🇳🇱 Nederlands</option>
                  <option>🇸🇦 العربية</option>
                  <option>🇫🇷 Français</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground">
            <p className="text-xs md:text-sm">
              &copy; 2024 GlobalHelp. All rights reserved. Made with 💙 for everyone finding their way in the
              Netherlands.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
