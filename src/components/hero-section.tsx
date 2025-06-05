"use client"
import { motion, useTransform, useScroll } from "framer-motion"
import type React from "react"
import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import {
    ArrowRight,
    Bot,
    Home,
    Briefcase,
    Building2,
    MessageCircle,
    Sparkles,
    Play,
    Languages,
    Users,
    ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { FixedAIAssistant } from "./fixed-ai-assistant"

// Service constellation data
const services = [
    {
        id: "housing",
        icon: Home,
        title: "Smart Housing",
        description: "AI-powered home search",
        color: "from-emerald-400 to-emerald-600",
        position: { x: 0, y: -140, z: 20 },
        mobileOrder: 1,
    },
    {
        id: "jobs",
        icon: Briefcase,
        title: "Career Hub",
        description: "Find your dream job",
        color: "from-purple-400 to-purple-600",
        position: { x: 120, y: -70, z: 40 },
        mobileOrder: 2,
    },
    {
        id: "government",
        icon: Building2,
        title: "Gov Services",
        description: "Navigate bureaucracy",
        color: "from-blue-400 to-blue-600",
        position: { x: 120, y: 70, z: 30 },
        mobileOrder: 3,
    },
    {
        id: "community",
        icon: Users,
        title: "Community",
        description: "Connect with people",
        color: "from-pink-400 to-pink-600",
        position: { x: 0, y: 140, z: 25 },
        mobileOrder: 4,
    },
    {
        id: "support",
        icon: MessageCircle,
        title: "AI Support",
        description: "24/7 assistance",
        color: "from-indigo-400 to-indigo-600",
        position: { x: -120, y: 70, z: 35 },
        mobileOrder: 5,
    },
    {
        id: "translate",
        icon: Languages,
        title: "Translation",
        description: "Multi-language support",
        color: "from-orange-400 to-orange-600",
        position: { x: -120, y: -70, z: 15 },
        mobileOrder: 6,
    },
]

// Simple floating particles component
const FloatingParticles = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 30 }, (_, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    initial={{
                        opacity: 0,
                        scale: 0,
                    }}
                    animate={{
                        opacity: [0, 0.6, 0],
                        scale: [0, 1, 0],
                        y: [0, -200, -400],
                    }}
                    transition={{
                        duration: 6 + Math.random() * 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: Math.random() * 4,
                        ease: "easeInOut",
                    }}
                >
                    <div
                        className={cn(
                            "w-1 h-1 rounded-full bg-gradient-to-r",
                            i % 3 === 0 && "from-blue-400 to-cyan-400",
                            i % 3 === 1 && "from-purple-400 to-pink-400",
                            i % 3 === 2 && "from-emerald-400 to-blue-400",
                        )}
                        style={{
                            boxShadow: "0 0 10px rgba(59, 130, 246, 0.3)",
                        }}
                    />
                </motion.div>
            ))}
        </div>
    )
}

// Clean animated beam component
const AnimatedBeam = ({
    fromRef,
    toRef,
    className,
    delay = 0,
}: {
    fromRef: React.RefObject<HTMLElement>
    toRef: React.RefObject<HTMLElement>
    className?: string
    delay?: number
}) => {
    const [pathData, setPathData] = useState("")
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const updatePath = () => {
            if (fromRef.current && toRef.current) {
                const fromRect = fromRef.current.getBoundingClientRect()
                const toRect = toRef.current.getBoundingClientRect()

                const fromX = fromRect.left + fromRect.width / 2
                const fromY = fromRect.top + fromRect.height / 2
                const toX = toRect.left + toRect.width / 2
                const toY = toRect.top + toRect.height / 2

                // Simple curved path
                const midX = (fromX + toX) / 2
                const midY = (fromY + toY) / 2 - 20
                const path = `M ${fromX} ${fromY} Q ${midX} ${midY} ${toX} ${toY}`
                setPathData(path)
                setIsVisible(true)
            }
        }

        const timer = setTimeout(() => {
            updatePath()
            window.addEventListener("resize", updatePath)
        }, delay)

        return () => {
            clearTimeout(timer)
            window.removeEventListener("resize", updatePath)
        }
    }, [fromRef, toRef, delay])

    if (!isVisible) return null

    return (
        <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
            <defs>
                <linearGradient id={`beam-gradient-${delay}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
                    <stop offset="50%" stopColor="rgb(147, 51, 234)" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="rgb(236, 72, 153)" stopOpacity="0" />
                </linearGradient>
            </defs>
            <motion.path
                d={pathData}
                stroke={`url(#beam-gradient-${delay})`}
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut", delay: delay / 1000 }}
                className={className}
            />
        </svg>
    )
}

// Clean service node component
const ServiceNode = ({
    service,
    isCenter = false,
    onClick,
    isActive = false,
    nodeRef,
    index = 0,
}: {
    service: (typeof services)[0]
    isCenter?: boolean
    onClick?: () => void
    isActive?: boolean
    nodeRef?: React.RefObject<HTMLDivElement>
    index?: number
}) => {
    const [showTooltip, setShowTooltip] = useState(false)
    const isMobile = useMediaQuery("(max-width: 768px)")

    return (
        <motion.div
            ref={nodeRef}
            className={cn("absolute cursor-pointer group", isCenter ? "w-28 h-28 " : "w-20 h-20")}
            style={
                !isCenter
                    ? {
                        left: `calc(50% + ${service.position.x}px - ${isCenter ? 56 : 40}px)`,
                        top: `calc(50% + ${service.position.y}px - ${isCenter ? 56 : 40}px)`,
                    }
                    : {
                        left: "calc(50% - 56px)",
                        top: "calc(50% - 56px)",
                    }
            }
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                duration: 0.6,
                delay: isCenter ? 0.2 : 0.4 + index * 0.1,
                type: "spring",
                stiffness: 120,
                damping: 15,
            }}
            
            onClick={() => {
               
            }}
        >
            <div
                className={cn(
                    "w-full h-full rounded-full flex items-center justify-center relative overflow- transition-all duration-300",
                    isCenter
                        ? "bg-transparent "
                        : `bg-gradient-to-br ${service.color} shadow-lg`,
                    isActive && "ring-4 ring-white/30 ring-offset-2 hover:scale-105 ring-offset-transparent",
                )}
                style={{
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 0 20px rgba(59, 130, 246, 0.1)",
                }}
            >
                {/* Simple background gradient */}
                <div className={`absolute inset-0 ${isCenter ? "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]" : "bg-gradient-to-br from-white/20 to-transparent "} rounded-full `} />

                {/* Icon */}
                <div className="relative z-10">
                    {isCenter ?
                            <FixedAIAssistant showBubble={false} currentStep={0} />
                    
                        : <service.icon className="w-8 h-8 text-white" />}
                </div>

                {/* Simple pulse effect for active state */}
                {isActive && (
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-white/40"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                )}
            </div>

            {/* Clean tooltip/popover */}
            {showTooltip && !isCenter && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute min-w-48 top-full left-1/2 transform -translate-x-1/2 mt-3 z-20"
                >
                    <div className="px-3 py-2 bg-black/90 backdrop-blur-md text-white text-sm rounded-lg border border-white/10 shadow-xl">
                        {isMobile ? (
                            <div className="text-center font-medium">{service.title.split(" ")[0]}</div>
                        ) : (
                            <>
                                <div className="font-medium text-center">{service.title}</div>
                                <div className="text-xs opacity-80 text-center mt-1">{service.description}</div>
                            </>
                        )}
                        {/* Simple arrow */}
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45" />
                    </div>
                </motion.div>
            )}
        </motion.div>
    )
}

// Clean mobile service card
const MobileServiceCard = ({
    service,
    index,
    isActive,
    onClick,
}: {
    service: (typeof services)[0]
    index: number
    isActive: boolean
    onClick: () => void
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            className="w-full"
        >
            <Card
                className={cn(
                    "cursor-pointer transition-all duration-300 border-2 overflow-hidden backdrop-blur-sm",
                    isActive
                        ? "border-blue-500 shadow-lg shadow-blue-500/20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50"
                        : "border-border/50 hover:border-border bg-card/50",
                )}
                onClick={onClick}
            >
                <CardContent className="px-5 py-1">
                    <div className="flex items-center space-x-4">
                        <motion.div
                            className={cn(
                                "w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br shadow-lg relative overflow-hidden",
                                service.color,
                            )}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                            <service.icon className="w-7 h-7 text-white relative z-10" />
                        </motion.div>

                        <div className="flex-1">
                            <h3 className="font-semibold text-lg">{service.title}</h3>
                            <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>

                        <motion.div animate={{ rotate: isActive ? 90 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </motion.div>
                    </div>

                    {/* Smooth expanded content */}
                    <motion.div
                        initial={false}
                        animate={{
                            height: isActive ? "auto" : 0,
                            opacity: isActive ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 border-t border-border/50 mt-4">
                            <p className="text-sm text-muted-foreground mb-4">
                                Discover how our AI-powered {service.title.toLowerCase()} can transform your migration experience.
                            </p>
                            <Button size="sm" className="w-full">
                                Explore {service.title}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

// Clean desktop constellation hero
const DesktopHero = () => {
    const router = useRouter()
    const [activeService, setActiveService] = useState<string | null>(null)
    const centerRef = useRef<HTMLDivElement>(null)
    const serviceRefs = useRef<Record<string, React.RefObject<HTMLDivElement>>>({})

    const { scrollY } = useScroll()
    const y1 = useTransform(scrollY, [0, 300], [0, -30])

    // Initialize refs
    useEffect(() => {
        services.forEach((service) => {
            if (!serviceRefs.current[service.id]) {
                serviceRefs.current[service.id] = { current: null }
            }
        })
    }, [])

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">




            <div className="container mx-auto px-4 text-center relative z-10">
                {/* Header content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-20 space-y-3 md:space-y-5"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    >
                        <Badge
                            variant="secondary"
                            className="md:px-8 flex justify-center w-auto md:w-4/12 mx-auto items-center py-2  rounded-3xl text-xs md:text-base font-medium bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
                        >
                            <Sparkles className="w-5 h-5 mr-3" />
                            AI-Powered Migration Platform
                        </Badge>
                    </motion.div>

                    <motion.h1
                        className="text-5xl md:text-8xl font-bold tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Doris AI
                        </span>
                        <br />
                        <span className="text-muted-foreground text-2xl md:text-7xl">Your Journey Starts Here</span>
                    </motion.h1>

                    <motion.p
                        className="hidden md:block text-lg text-nowrap text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        Explore our constellation of services designed to make your migration seamless and successful.
                    </motion.p>
                </motion.div>

                {/* Service constellation */}
                <motion.div
                    className="relative w-full max-w-3xl mx-auto -mt-28 md:-mt-20 h-[500px]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    {/* Center node (Doris AI) */}
                    <ServiceNode
                        service={services[0]}
                        isCenter
                        nodeRef={centerRef}
                        onClick={() => setActiveService(activeService ? null : "center")}
                        isActive={activeService === "center"}
                    />

                    {/* Service nodes */}
                    {services.map((service, index) => {
                        if (!serviceRefs.current[service.id]) {
                            serviceRefs.current[service.id] = { current: null }
                        }

                        return (
                            <ServiceNode
                                key={service.id}
                                service={service}
                                nodeRef={serviceRefs.current[service.id]}
                                onClick={() => setActiveService(activeService === service.id ? null : service.id)}
                                isActive={activeService === service.id}
                                index={index}
                            />
                        )
                    })}

                    {/* Clean animated beams */}
                    {services.map((service, index) => {
                        if (!serviceRefs.current[service.id] || !centerRef.current) {
                            return null
                        }

                        return (
                            <AnimatedBeam
                                key={`beam-${service.id}`}
                                fromRef={centerRef}
                                toRef={serviceRefs.current[service.id]}
                                delay={index * 150}
                                className={cn(
                                    "transition-opacity duration-300",
                                    activeService && activeService !== service.id && activeService !== "center"
                                        ? "opacity-30"
                                        : "opacity-70",
                                )}
                            />
                        )
                    })}
                </motion.div>

            </div>
        </section>
    )
}

// Clean mobile hero
const MobileHero = () => {
    const router = useRouter()
    const [activeService, setActiveService] = useState<string | null>(null)

    return (
        <section className="relative  min-h-screen flex flex-col justify-center px-4 overflow-hidden">

            <div className="relative z-10 bg-transparent space-y-3 ">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-3"
                >


                    <motion.h1
                        className="text-4xl md:text-6xl font-bold tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block">
                            Migration
                        </span>
                        <span className="text-foreground block">Made Simple</span>
                    </motion.h1>

                    <motion.p
                        className="md:text-xl text-muted-foreground"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        Tap any service below to discover how we can help transform your journey.
                    </motion.p>
                </motion.div>

                {/* Service cards */}
                <div className="space-y-3">
                    {services.map((service, index) => (
                        <MobileServiceCard
                            key={service.id}
                            service={service}
                            index={index}
                            isActive={activeService === service.id}
                            onClick={() => setActiveService(activeService === service.id ? null : service.id)}
                        />
                    ))}
                </div>

            </div>
        </section>
    )
}

// Main Hero Section component
export const HeroSection = () => {
    const isMobile = useMediaQuery("(max-width: 768px)")

    return <div className="relative">{<DesktopHero />}</div>
}
