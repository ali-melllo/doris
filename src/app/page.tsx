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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Doris AI
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Launch Chat
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div initial="initial" animate="animate" variants={staggerContainer} className="max-w-4xl mx-auto">
            <motion.div variants={fadeInUp}>
              <Badge variant="secondary" className="mb-6 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] px-4 py-2 text-sm">
                🚀 Now powered by GPT + Government Data
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent leading-tight"
            >
              Your AI Assistant for Life in the Netherlands
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-4"
            >
              Ask anything about jobs, housing, government support, or integration — in your own language
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Launch the Chat
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-xl">
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16"
          >
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
              <Card className="relative backdrop-blur-sm bg-card/50 border-border/50 rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-center">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-muted-foreground">AI Assistant Online</span>
                      </div>
                      <div className="space-y-2">
                        <div className="text-left bg-muted/50 rounded-lg p-3 text-sm">
                          "How do I apply for housing benefit?"
                        </div>
                        <div className="text-left bg-blue-500/10 rounded-lg p-3 text-sm">
                          "I can help you with that! In the Netherlands, housing benefit (huurtoeslag) is available
                          if..."
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-16 h-16 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="secondary" className="w-fit">
                        🇳🇱 Dutch
                      </Badge>
                      <Badge variant="secondary" className="w-fit">
                        🇬🇧 English
                      </Badge>
                      <Badge variant="secondary" className="w-fit">
                        🇸🇦 Arabic
                      </Badge>
                      <Badge variant="secondary" className="w-fit">
                        🇫🇷 French
                      </Badge>
                      <Badge variant="secondary" className="w-fit">
                        + 10 more
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-12 md:py-16 lg:py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6"
            >
              Four Core Services
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
                      className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-base mb-4">{service.description}</CardDescription>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      Learn more
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Global Chatbot Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-4">
                🤖 Built with GPT + RAG
              </Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                Smart GPT-powered chatbot with real government data
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8">
                Get instant, accurate answers in Arabic, French, Dutch, English, and more. Our AI understands context
                and provides personalized guidance based on your situation.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Real-time responses in 15+ languages</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Updated government data and policies</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Personalized recommendations</span>
                </div>
              </div>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
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
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl blur-2xl"></div>
              <Card className="relative backdrop-blur-sm bg-card/80 border-border/50 rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-semibold">GlobalHelp AI</span>
                      <Badge variant="secondary">
                        Online
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-muted/50 rounded-lg p-3 ml-8">
                        <p className="text-sm">{"I'm a refugee from Syria. How can I find housing in Amsterdam?"}</p>
                      </div>
                      <div className="bg-blue-500/10 rounded-lg p-3 mr-8">
                        <p className="text-sm">
                          {
                            "I understand you're looking for housing in Amsterdam as a refugee. Here are your options: 1) Contact your local municipality for social housing..."
                          }
                        </p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3 ml-8">
                        <p className="text-sm">{"Can you explain this in Arabic?"}</p>
                      </div>
                      <div className="bg-blue-500/10 rounded-lg p-3 mr-8">
                        <p className="text-sm">{"بالطبع! كلاجئ في هولندا، يمكنك الحصول على السكن من خلال..."}</p>
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
      <section className="py-12 md:py-16 lg:py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6"
            >
              Why GlobalHelp?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-medium text-lg">{feature.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section className="py-12 md:py-16 lg:py-20 px-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-teal-500/10">
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
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6"
            >
              Get early access to the full app experience
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground mb-8">
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
                className="flex-1 h-12 rounded-xl"
                required
              />
              <Button
                type="submit"
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 h-12 px-8 rounded-xl"
                disabled={isSubmitted}
              >
                {isSubmitted ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Joined!
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5 mr-2" />
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
                <p className="text-green-600 dark:text-green-400">
                  🎉 Welcome to the waitlist! We'll notify you when the full app is ready.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  GlobalHelp
                </span>
              </div>
              <p className="text-muted-foreground">
                Your AI assistant for life in the Netherlands. Built with ❤️ for migrants and refugees.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
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
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
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
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
              <div className="mt-4">
                <select className="bg-background border border-border rounded-lg px-3 py-2 text-sm">
                  <option>🇬🇧 English</option>
                  <option>🇳🇱 Nederlands</option>
                  <option>🇸🇦 العربية</option>
                  <option>🇫🇷 Français</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground">
            <p>
              &copy; 2024 GlobalHelp. All rights reserved. Made with 💙 for everyone finding their way in the
              Netherlands.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
