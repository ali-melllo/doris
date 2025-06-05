"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
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
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"


const mainFeatures = [
    {
      href: "/",
      icon: Building2,
      title: "Government Help",
      description: "Navigate bureaucracy with ease",
      color: "from-blue-500 to-blue-600",
      gradient: "from-blue-500/20 to-blue-600/20",
    },
    {
      href: "/houses",
      icon: Home,
      title: "Housing Solutions",
      description: "Find your perfect home",
      color: "from-emerald-500 to-emerald-600",
      gradient: "from-emerald-500/20 to-emerald-600/20",
    },
    {
      href: "/jobs",
      icon: Briefcase,
      title: "Job Discovery",
      description: "Land your dream career",
      color: "from-purple-500 to-purple-600",
      gradient: "from-purple-500/20 to-purple-600/20",
    },
    {
      href: "/map",
      icon: Users,
      title: "Social Matching",
      description: "Connect with your community",
      color: "from-pink-500 to-pink-600",
      gradient: "from-pink-500/20 to-pink-600/20",
    },
    {
      href: "/chat",
      icon: Bot,
      title: "Global AI Assistant",
      description: "24/7 intelligent support",
      color: "from-indigo-500 to-indigo-600",
      gradient: "from-indigo-500/20 to-indigo-600/20",
    },
  ]
  
export default function HeroSectionV1() {

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
      

    return (
        <>
            <div className="md:container mx-auto md:mt-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Content */}
                    <motion.div initial="initial" animate="animate" variants={staggerContainer} className="space-y-4 md:space-y-8 -mt-5">
                        <motion.div variants={fadeInUp}>
                            <Badge
                                variant="secondary"
                                className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30 md:mb-6"
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

                        <motion.p variants={fadeInUp} className="text-xs md:text-xl text-muted-foreground leading-relaxed">
                            Your trusted companion for housing, jobs, and local help — wherever you land. Navigate your new life
                            with confidence and AI-powered guidance.
                        </motion.p>

                        {/* Feature Pills */}
                        <motion.div variants={fadeInUp} className="space-y-4">
                            <h3 className="text-lg font-semibold text-muted-foreground hidden md:block">What Doris AI helps with:</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {mainFeatures.map((feature, index) => (
                                    <motion.div
                                        key={feature.title}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                        className="group"
                                    >
                                        <Card className="p-2 md:p-4 bg-card/50 backdrop-blur-sm border-border/50 hover:border-border transition-all duration-300 cursor-pointer group-hover:shadow-lg">
                                            <Link href={feature.href} className="flex flex-col md:flex-row items-center gap-3 space-x-3">
                                                <div
                                                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                                                >
                                                    <feature.icon className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-sm">{feature.title}</h4>
                                                    <p className="text-xs text-muted-foreground hidden md:block">{feature.description}</p>
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
                                                className="bg-gradient-to-r rounded-tr-none from-blue-500/20 to-purple-500/20 rounded-[40px] p-4"
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
                                                className="bg-muted/50 rounded-tl-none rounded-[40px] p-4"
                                            >
                                                <p className="text-sm mb-3">
                                                    I'd love to help you with your move to Amsterdam. Let me create a personalized plan for you:
                                                </p>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <Badge variant="outline" className="justify-center p-3 cursor-pointer">
                                                        🏠 Housing Search
                                                    </Badge>
                                                    <Badge variant="outline" className="justify-center p-3 cursor-pointer">
                                                        📋 Visa Guidance
                                                    </Badge>
                                                    <Badge variant="outline" className="justify-center p-3 cursor-pointer">
                                                        🏛️ City Registration
                                                    </Badge>
                                                    <Badge variant="outline" className="justify-center p-3 cursor-pointer">
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
        </>
    )
}
