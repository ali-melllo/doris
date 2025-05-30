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
  User,
  Map,
  ArrowRight,
  Play,
  Heart,
  Star,
  MapIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "@/components/mode-toggle"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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

const testimonials = [
  {
    name: "Maria Rodriguez",
    location: "Madrid → Amsterdam",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    quote: "Doris AI helped me find housing and understand Dutch bureaucracy in just 2 weeks. Incredible!",
  },
  {
    name: "Ahmed Hassan",
    location: "Cairo → Berlin",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    quote: "The job matching feature connected me with opportunities I never would have found on my own.",
  },
  {
    name: "Priya Patel",
    location: "Mumbai → Toronto",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    quote: "Moving to a new country felt overwhelming until I found Doris AI. Now I feel confident and supported.",
  },
  {
    name: "Jean-Luc Dubois",
    location: "Paris → New York",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    quote: "The social matching helped me build a network of friends before I even arrived. Amazing technology!",
  },
  {
    name: "Sofia Chen",
    location: "Beijing → London",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    quote: "Doris AI's government help feature saved me countless hours of confusion and paperwork.",
  },
  {
    name: "Carlos Silva",
    location: "São Paulo → Sydney",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    quote: "The AI assistant feels like having a local friend who knows everything about the city.",
  },
]

const howItWorksSteps = [
  {
    step: "01",
    title: "Tell Doris About You",
    description: "Share your destination, goals, and preferences. Doris learns what matters most to you.",
    icon: MessageCircle,
  },
  {
    step: "02",
    title: "Get Personalized Guidance",
    description: "Receive tailored recommendations for housing, jobs, and local services based on your profile.",
    icon: Sparkles,
  },
  {
    step: "03",
    title: "Connect & Thrive",
    description: "Join your new community with confidence. Doris continues supporting your journey.",
    icon: Heart,
  },
]

const mainFeatures = [
  {
    href:"/",
    icon: Building2,
    title: "Government Help",
    description: "Navigate bureaucracy with ease",
    color: "from-blue-500 to-blue-600",
    gradient: "from-blue-500/20 to-blue-600/20",
  },
  {
    href:"/houses",
    icon: Home,
    title: "Housing Solutions",
    description: "Find your perfect home",
    color: "from-emerald-500 to-emerald-600",
    gradient: "from-emerald-500/20 to-emerald-600/20",
  },
  {
    href:"/jobs",
    icon: Briefcase,
    title: "Job Discovery",
    description: "Land your dream career",
    color: "from-purple-500 to-purple-600",
    gradient: "from-purple-500/20 to-purple-600/20",
  },
  {
    href:"/map",
    icon: Users,
    title: "Social Matching",
    description: "Connect with your community",
    color: "from-pink-500 to-pink-600",
    gradient: "from-pink-500/20 to-pink-600/20",
  },
  {
    href:"/chat",
    icon: Bot,
    title: "Global AI Assistant",
    description: "24/7 intelligent support",
    color: "from-indigo-500 to-indigo-600",
    gradient: "from-indigo-500/20 to-indigo-600/20",
  },
]

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
              Doris AI
            </span>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <ModeToggle />
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              Sign In
            </Button>
            <Link
              href="/chat"
              className="bg-gradient-to-r flex items-center gap-2 py-2 rounded-lg from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-xs md:text-sm px-3 md:px-4"
            >
              Login
              <User size={15} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="md:container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div initial="initial" animate="animate" variants={staggerContainer} className="space-y-4 md:space-y-8 -mt-5">
              <motion.div variants={fadeInUp}>
                <Badge
                  variant="secondary"
                  className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30 mb-6"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI-Powered Migration Assistant
                </Badge>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-3xl  md:text-5xl lg:text-6xl font-bold leading-tight">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Doris AI
                </span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-sm md:text-xl text-muted-foreground leading-relaxed">
                Your trusted companion for housing, jobs, and local help — wherever you land. Navigate your new life
                with confidence and AI-powered guidance.
              </motion.p>

              {/* Feature Pills */}
              <motion.div variants={fadeInUp} className="space-y-4">
                <h3 className="text-lg font-semibold text-muted-foreground">What Doris AI helps with:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {mainFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="group"
                    >
                      <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50 hover:border-border transition-all duration-300 cursor-pointer group-hover:shadow-lg">
                        <Link href={feature.href} className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                          >
                            <feature.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm">{feature.title}</h4>
                            <p className="text-xs text-muted-foreground">{feature.description}</p>
                          </div>
                        </Link>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 text-white to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Link href={"/chat"} className="flex items-center gap-1">

                    Get Started with Doris AI

                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-xl group">
                  <Link href={"/map"} className="flex items-center gap-1">
                    <MapIcon className="w-5 h-5 mr-2" />
                    Browse On Map
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Side - Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              {/* Glass Card Overlay */}
              <div className="relative">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-600/20 to-pink-500/20 rounded-3xl blur-3xl scale-110"></div>

                {/* Main Interface Card */}
                <Card className="relative backdrop-blur-xl bg-card/80 border-border/50 rounded-3xl overflow-hidden shadow-2xl">
                  <CardContent className="p-8">
                    {/* Chat Interface Preview */}
                    <div className="space-y-6">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <Bot className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Doris AI</h3>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-muted-foreground">Online & Ready to Help</span>
                          </div>
                        </div>
                      </div>

                      {/* Sample Conversation */}
                      <div className="space-y-4">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1 }}
                          className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-4"
                        >
                          <p className="text-sm">
                            "Hi! I'm moving to Amsterdam next month. Can you help me find housing and understand the
                            visa process?"
                          </p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.3 }}
                          className="bg-muted/50 rounded-2xl p-4"
                        >
                          <p className="text-sm mb-3">
                            I'd love to help you with your move to Amsterdam. Let me create a personalized plan for you:
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            <Badge variant="outline" className="justify-center">
                              🏠 Housing Search
                            </Badge>
                            <Badge variant="outline" className="justify-center">
                              📋 Visa Guidance
                            </Badge>
                            <Badge variant="outline" className="justify-center">
                              🏛️ City Registration
                            </Badge>
                            <Badge variant="outline" className="justify-center">
                              🤝 Local Community
                            </Badge>
                          </div>
                        </motion.div>
                      </div>

                      {/* Feature Cards Preview */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6 }}
                        className="grid grid-cols-2 gap-3"
                      >
                        <Card className="p-3 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-500/20">
                          <div className="flex items-center space-x-2">
                            <Home className="w-4 h-4 text-emerald-500" />
                            <span className="text-xs font-medium">3 Houses Found</span>
                          </div>
                        </Card>
                        <Card className="p-3 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
                          <div className="flex items-center space-x-2">
                            <Briefcase className="w-4 h-4 text-purple-500" />
                            <span className="text-xs font-medium">12 Jobs Match</span>
                          </div>
                        </Card>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
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


  {/* Testimonials */}
  <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Trusted by{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                100,000+
              </span>{" "}
              Newcomers
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real stories from people who found their new home with Doris AI
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={testimonial.name} transition={{ delay: index * 0.1 }}>
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                        <AvatarFallback>
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </div>
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
