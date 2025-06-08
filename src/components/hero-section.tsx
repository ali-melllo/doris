"use client"
import { motion } from "framer-motion"
import type React from "react"
import {
    Sparkles
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { HeroAnimatedBeam } from "./hero-animated-beams"
import { AnimatedShinyText } from "./magicui/animated-shiny-text"
import { AnimatedGradientText } from "./magicui/animated-greadient-text"

// Clean desktop constellation hero
const DesktopHero = () => {

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            <div className="container mx-auto px-4 text-center relative z-10">
                {/* Header content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-10 md:mb-16 space-y-3 md:space-y-4"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    >
                        <Badge
                            variant="secondary"
                            className="md:px-8 flex justify-center w-9/12 md:w-4/12 mx-auto items-center py-2  rounded-3xl text-xs md:text-base font-medium bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
                        >
                            <AnimatedShinyText>AI-Powered Migration Platform</AnimatedShinyText>
                        </Badge>
                    </motion.div>

                    <motion.h1
                        className="text-5xl md:text-8xl font-extrabold tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <AnimatedGradientText
                            speed={1.5}
                            colorFrom="#2563eb"
                            colorTo="#db2777"
                            className="tracking-[1px]"
                        >
                            Doris AI
                        </AnimatedGradientText>

                        <br />
                        <span className="hidden md:block text-muted-foreground text-2xl font-semibold md:text-5xl">Your Journey Starts Here</span>
                    </motion.h1>

                    <motion.p
                        className=" text-xs md:text-lg md:text-nowrap text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        Explore our constellation of services designed to make your migration seamless and successful.
                    </motion.p>
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <HeroAnimatedBeam />
                </motion.div>

            </div>
        </section>
    )
}


// Main Hero Section component
export const HeroSection = () => {
    const isMobile = useMediaQuery("(max-width: 768px)")

    return <div className="relative">{<DesktopHero />}</div>
}
