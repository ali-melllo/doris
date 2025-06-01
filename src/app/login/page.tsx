"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useRouter } from "next/navigation"
import {
    Bot,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    ArrowLeft,
    Check,
    Building2,
    Home,
    Briefcase,
    Users,
    Sparkles,
    Loader2,
    Globe,
    MessageCircle,
    ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { FlickeringGrid } from "@/components/magicui/flickering-grid"

// Country data with flags
const countries = [
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
    { code: "AU", name: "Australia", flag: "🇦🇺" },
    { code: "DE", name: "Germany", flag: "🇩🇪" },
    { code: "FR", name: "France", flag: "🇫🇷" },
    { code: "ES", name: "Spain", flag: "🇪🇸" },
    { code: "IT", name: "Italy", flag: "🇮🇹" },
    { code: "NL", name: "Netherlands", flag: "🇳🇱" },
    { code: "SE", name: "Sweden", flag: "🇸🇪" },
    { code: "NO", name: "Norway", flag: "🇳🇴" },
    { code: "DK", name: "Denmark", flag: "🇩🇰" },
    { code: "CH", name: "Switzerland", flag: "🇨🇭" },
    { code: "AT", name: "Austria", flag: "🇦🇹" },
    { code: "BE", name: "Belgium", flag: "🇧🇪" },
    { code: "IE", name: "Ireland", flag: "🇮🇪" },
    { code: "PT", name: "Portugal", flag: "🇵🇹" },
    { code: "FI", name: "Finland", flag: "🇫🇮" },
    { code: "JP", name: "Japan", flag: "🇯🇵" },
    { code: "KR", name: "South Korea", flag: "🇰🇷" },
    { code: "SG", name: "Singapore", flag: "🇸🇬" },
    { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
    { code: "BR", name: "Brazil", flag: "🇧🇷" },
    { code: "MX", name: "Mexico", flag: "🇲🇽" },
    { code: "AR", name: "Argentina", flag: "🇦🇷" },
    { code: "CL", name: "Chile", flag: "🇨🇱" },
    { code: "IN", name: "India", flag: "🇮🇳" },
    { code: "CN", name: "China", flag: "🇨🇳" },
    { code: "TH", name: "Thailand", flag: "🇹🇭" },
    { code: "MY", name: "Malaysia", flag: "🇲🇾" },
    { code: "PH", name: "Philippines", flag: "🇵🇭" },
    { code: "ID", name: "Indonesia", flag: "🇮🇩" },
    { code: "VN", name: "Vietnam", flag: "🇻🇳" },
    { code: "ZA", name: "South Africa", flag: "🇿🇦" },
    { code: "EG", name: "Egypt", flag: "🇪🇬" },
    { code: "MA", name: "Morocco", flag: "🇲🇦" },
    { code: "NG", name: "Nigeria", flag: "🇳🇬" },
    { code: "KE", name: "Kenya", flag: "🇰🇪" },
    { code: "GH", name: "Ghana", flag: "🇬🇭" },
    { code: "TR", name: "Turkey", flag: "🇹🇷" },
    { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
    { code: "AE", name: "UAE", flag: "🇦🇪" },
    { code: "IL", name: "Israel", flag: "🇮🇱" },
    { code: "IR", name: "Iran", flag: "🇮🇷" },
    { code: "IQ", name: "Iraq", flag: "🇮🇶" },
    { code: "SY", name: "Syria", flag: "🇸🇾" },
    { code: "LB", name: "Lebanon", flag: "🇱🇧" },
    { code: "JO", name: "Jordan", flag: "🇯🇴" },
    { code: "RU", name: "Russia", flag: "🇷🇺" },
    { code: "UA", name: "Ukraine", flag: "🇺🇦" },
    { code: "PL", name: "Poland", flag: "🇵🇱" },
    { code: "CZ", name: "Czech Republic", flag: "🇨🇿" },
    { code: "HU", name: "Hungary", flag: "🇭🇺" },
    { code: "RO", name: "Romania", flag: "🇷🇴" },
    { code: "BG", name: "Bulgaria", flag: "🇧🇬" },
    { code: "HR", name: "Croatia", flag: "🇭🇷" },
    { code: "SI", name: "Slovenia", flag: "🇸🇮" },
    { code: "SK", name: "Slovakia", flag: "🇸🇰" },
    { code: "LT", name: "Lithuania", flag: "🇱🇹" },
    { code: "LV", name: "Latvia", flag: "🇱🇻" },
    { code: "EE", name: "Estonia", flag: "🇪🇪" },
]

// Language data
const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "nl", name: "Nederlands", flag: "🇳🇱" },
    { code: "sv", name: "Svenska", flag: "🇸🇪" },
    { code: "no", name: "Norsk", flag: "🇳🇴" },
    { code: "da", name: "Dansk", flag: "🇩🇰" },
    { code: "fi", name: "Suomi", flag: "🇫🇮" },
    { code: "pl", name: "Polski", flag: "🇵🇱" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "ko", name: "한국어", flag: "🇰🇷" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
    { code: "th", name: "ไทย", flag: "🇹🇭" },
    { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
    { code: "fa", name: "فارسی", flag: "🇮🇷" },
    { code: "he", name: "עברית", flag: "🇮🇱" },
    { code: "uk", name: "Українська", flag: "🇺🇦" },
]

// User goals/intents
const userGoals = [
    {
        id: "housing",
        title: "Housing",
        description: "Find your perfect home",
        icon: Home,
        color: "from-emerald-500 to-emerald-600",
        bgColor: "bg-emerald-500/10",
        borderColor: "border-emerald-500/30",
        textColor: "text-emerald-600",
    },
    {
        id: "jobs",
        title: "Job Opportunities",
        description: "Discover career paths",
        icon: Briefcase,
        color: "from-purple-500 to-purple-600",
        bgColor: "bg-purple-500/10",
        borderColor: "border-purple-500/30",
        textColor: "text-purple-600",
    },
    {
        id: "government",
        title: "Government Help",
        description: "Navigate bureaucracy",
        icon: Building2,
        color: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/30",
        textColor: "text-blue-600",
    },
    {
        id: "social",
        title: "Social Matching",
        description: "Connect with community",
        icon: Users,
        color: "from-pink-500 to-pink-600",
        bgColor: "bg-pink-500/10",
        borderColor: "border-pink-500/30",
        textColor: "text-pink-600",
    },
    {
        id: "ai-chat",
        title: "AI Chat Support",
        description: "24/7 intelligent assistance",
        icon: Bot,
        color: "from-indigo-500 to-indigo-600",
        bgColor: "bg-indigo-500/10",
        borderColor: "border-indigo-500/30",
        textColor: "text-indigo-600",
    },
]

interface FormData {
    email: string
    password: string
    rememberMe: boolean
    nationality: string
    language: string
    goals: string[]
}

const steps = [
    { id: 1, title: "Welcome", description: "Sign in to continue", icon: MessageCircle },
    { id: 2, title: "Origin", description: "Where are you from?", icon: Globe },
    { id: 3, title: "Language", description: "Preferred language", icon: MessageCircle },
    { id: 4, title: "Goals", description: "What do you need?", icon: Sparkles },
]

export default function OnboardingPage() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1)
    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showCountryDropdown, setShowCountryDropdown] = useState(false)
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
        rememberMe: false,
        nationality: "",
        language: "",
        goals: [],
    })

    const footerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: footerRef,
        offset: ["start end", "end end"],
    })

    const footerTextOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
    const footerTextScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])


    // Form validation
    const isStep1Valid = formData.email && formData.password && formData.email.includes("@")
    const isStep2Valid = formData.nationality
    const isStep3Valid = formData.language
    const isStep4Valid = formData.goals.length > 0

    const canProceed = () => {
        switch (currentStep) {
            case 1:
                return isStep1Valid
            case 2:
                return isStep2Valid
            case 3:
                return isStep3Valid
            case 4:
                return isStep4Valid
            default:
                return false
        }
    }

    const handleNext = () => {
        if (canProceed() && currentStep < 4) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleGoalToggle = (goalId: string) => {
        setFormData((prev) => ({
            ...prev,
            goals: prev.goals.includes(goalId) ? prev.goals.filter((g) => g !== goalId) : [...prev.goals, goalId],
        }))
    }

    const handleSubmit = async () => {
        if (!isStep4Valid) return

        setIsSubmitting(true)
        await new Promise((resolve) => setTimeout(resolve, 2500))
        router.push("/")
    }

    const handleGoogleLogin = () => {
        console.log("Google login clicked")
    }

    // Animated Grid Background
    const AnimatedGrid = () => {
        return (
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 opacity-30 dark:opacity-20">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                                <path
                                    d="M 60 0 L 0 0 0 60"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    className="text-blue-500/20"
                                />
                            </pattern>
                            <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.1" />
                                <stop offset="50%" stopColor="rgb(147, 51, 234)" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="rgb(236, 72, 153)" stopOpacity="0.1" />
                            </linearGradient>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                        <rect width="100%" height="100%" fill="url(#gridGradient)" />
                    </svg>
                </div>

                {/* Floating Orbs */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl"
                        style={{
                            width: Math.random() * 300 + 100,
                            height: Math.random() * 300 + 100,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            x: [0, Math.random() * 100 - 50],
                            y: [0, Math.random() * 100 - 50],
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 8 + Math.random() * 4,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>
        )
    }

    // Step Indicator Component
    const StepIndicator = () => {
        return (
            <div className="flex items-center justify-center mb-1">
                <div className="flex items-center ">
                    {steps.map((step, index) => (
                        <div key={step.id} className="flex items-center">
                            <motion.div
                                className={cn(
                                    "relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300",
                                    currentStep >= step.id
                                        ? "bg-gradient-to-r from-blue-500 to-purple-600 border-transparent text-white shadow-lg"
                                        : "border-muted-foreground/30 text-muted-foreground bg-background/50 backdrop-blur-sm",
                                )}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {currentStep > step.id ? (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
                                        <Check className="w-5 h-5" />
                                    </motion.div>
                                ) : (
                                    <step.icon className="w-5 h-5" />
                                )}

                                {currentStep === step.id && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-30"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                    />
                                )}
                            </motion.div>

                            {index < steps.length - 1 && (
                                <div className="w-12 md:w-16 h-0.5 md:mx-4 bg-muted-foreground/20 relative overflow-hidden">
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: currentStep > step.id ? 1 : 0 }}
                                        transition={{ duration: 0.5 }}
                                        style={{ transformOrigin: "left" }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="h-[100dvh] pt-10 bg-gradient-to-br from-background via-background to-muted/20 relative ">
            {/* Animated Grid Background */}
            <AnimatedGrid />

            {/* Theme Toggle */}
            <div className="absolute top-4 right-5 z-50">
                <ModeToggle />
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center mt-7">
                <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4">
            
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
             Welcome To Doris AI
            </h1>
          </div>
        </motion.div>


               

                {/* Step Indicator */}
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
                    <StepIndicator />
                </motion.div>

                {/* Form Container */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="w-full max-w-lg p-4"
                >
                    <Card className="backdrop-blur-xl  bg-card/90 border-border shadow-2xl min-h-[500px] relative overflow-hidden">
                        {/* Card Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />

                        <CardContent className="px-5 py-3 md:p-8 relative z-10">
                            {/* Step Header */}
                            <motion.div
                                key={`header-${currentStep}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-center mb-4"
                            >
                                <h2 className="text-2xl font-bold mb-2">{steps[currentStep - 1].title}</h2>
                                <p className="text-muted-foreground">{steps[currentStep - 1].description}</p>
                            </motion.div>

                            {/* Form Content */}
                            <div className=" flex flex-col justify-center">
                                <AnimatePresence mode="wait">
                                    {/* Step 1: Login Form */}
                                    {currentStep === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-5 md:space-y-8"
                                        >
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Email</Label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            placeholder="Enter your email"
                                                            value={formData.email}
                                                            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                                            className="pl-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-blue-500/50 transition-colors"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="password">Password</Label>
                                                    <div className="relative">
                                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                                        <Input
                                                            id="password"
                                                            type={showPassword ? "text" : "password"}
                                                            placeholder="Enter your password"
                                                            value={formData.password}
                                                            onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                                                            className="pl-10 pr-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-blue-500/50 transition-colors"
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                        >
                                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id="remember"
                                                        checked={formData.rememberMe}
                                                        onCheckedChange={(checked) =>
                                                            setFormData((prev) => ({ ...prev, rememberMe: checked as boolean }))
                                                        }
                                                    />
                                                    <Label htmlFor="remember" className="text-sm">
                                                        Remember me
                                                    </Label>
                                                </div>
                                                <Button variant="link" className="text-sm p-0 h-auto">
                                                    Forgot password?
                                                </Button>
                                            </div>

                                            <Button
                                                onClick={handleGoogleLogin}
                                                variant="outline"
                                                className="w-full bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background/80"
                                            >
                                                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                                                    <path
                                                        fill="currentColor"
                                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                    />
                                                    <path
                                                        fill="currentColor"
                                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                    />
                                                    <path
                                                        fill="currentColor"
                                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                    />
                                                    <path
                                                        fill="currentColor"
                                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                    />
                                                </svg>
                                                Continue with Google
                                            </Button>
                                        </motion.div>
                                    )}

                                    {/* Step 2: Nationality Selection */}
                                    {currentStep === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6"
                                        >
                                            <div className="space-y-2">
                                                <Label>Select your nationality</Label>
                                                <div className="relative">
                                                    <Button
                                                        variant="outline"
                                                        className="w-full justify-between bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background/80"
                                                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                                    >
                                                        {formData.nationality ? (
                                                            <div className="flex items-center space-x-2">
                                                                <span className="text-lg">
                                                                    {countries.find((c) => c.code === formData.nationality)?.flag}
                                                                </span>
                                                                <span>{countries.find((c) => c.code === formData.nationality)?.name}</span>
                                                            </div>
                                                        ) : (
                                                            "Choose your country"
                                                        )}
                                                        <ChevronDown className="w-4 h-4" />
                                                    </Button>

                                                    <AnimatePresence>
                                                        {showCountryDropdown && (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: -10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -10 }}
                                                                className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-xl border border-border/50 rounded-lg shadow-2xl z-50 max-h-60 overflow-y-auto"
                                                            >
                                                                {countries.map((country) => (
                                                                    <button
                                                                        key={country.code}
                                                                        className="w-full flex items-center space-x-3 p-3 hover:bg-muted/50 transition-colors text-left"
                                                                        onClick={() => {
                                                                            setFormData((prev) => ({ ...prev, nationality: country.code }))
                                                                            setShowCountryDropdown(false)
                                                                        }}
                                                                    >
                                                                        <span className="text-lg">{country.flag}</span>
                                                                        <span>{country.name}</span>
                                                                    </button>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>

                                            {formData.nationality && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20"
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <span className="text-2xl">
                                                            {countries.find((c) => c.code === formData.nationality)?.flag}
                                                        </span>
                                                        <div>
                                                            <p className="font-medium">
                                                                {countries.find((c) => c.code === formData.nationality)?.name}
                                                            </p>
                                                            <p className="text-sm text-muted-foreground">Perfect! We'll customize your experience.</p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    )}

                                    {/* Step 3: Language Selection */}
                                    {currentStep === 3 && (
                                        <motion.div
                                            key="step3"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6"
                                        >
                                            <div className="space-y-2">
                                                <Label>Choose your preferred language</Label>
                                                <div className="relative">
                                                    <Button
                                                        variant="outline"
                                                        className="w-full justify-between bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background/80"
                                                        onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                                                    >
                                                        {formData.language ? (
                                                            <div className="flex items-center space-x-2">
                                                                <span className="text-lg">
                                                                    {languages.find((l) => l.code === formData.language)?.flag}
                                                                </span>
                                                                <span>{languages.find((l) => l.code === formData.language)?.name}</span>
                                                            </div>
                                                        ) : (
                                                            "Select your language"
                                                        )}
                                                        <ChevronDown className="w-4 h-4" />
                                                    </Button>

                                                    <AnimatePresence>
                                                        {showLanguageDropdown && (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: -10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -10 }}
                                                                className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-xl border border-border/50 rounded-lg shadow-2xl z-50 max-h-60 overflow-y-auto"
                                                            >
                                                                {languages.map((language) => (
                                                                    <button
                                                                        key={language.code}
                                                                        className="w-full flex items-center space-x-3 p-3 hover:bg-muted/50 transition-colors text-left"
                                                                        onClick={() => {
                                                                            setFormData((prev) => ({ ...prev, language: language.code }))
                                                                            setShowLanguageDropdown(false)
                                                                        }}
                                                                    >
                                                                        <span className="text-lg">{language.flag}</span>
                                                                        <span>{language.name}</span>
                                                                    </button>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>

                                            {formData.language && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20"
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <span className="text-2xl">
                                                            {languages.find((l) => l.code === formData.language)?.flag}
                                                        </span>
                                                        <div>
                                                            <p className="font-medium">{languages.find((l) => l.code === formData.language)?.name}</p>
                                                            <p className="text-sm text-muted-foreground">
                                                                Excellent! Doris AI will speak your language.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    )}

                                    {/* Step 4: User Goals */}
                                    {currentStep === 4 && (
                                        <motion.div
                                            key="step4"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6 overflow-y-scroll"
                                        >
                                            <div className="grid grid-cols-1 gap-3">
                                                {userGoals.map((goal, index) => (
                                                    <motion.div
                                                        key={goal.id}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className="cursor-pointer"
                                                        onClick={() => handleGoalToggle(goal.id)}
                                                    >
                                                        <Card
                                                            className={cn(
                                                                "p-4 transition-all duration-300 border-2",
                                                                formData.goals.includes(goal.id)
                                                                    ? `${goal.bgColor} ${goal.borderColor} shadow-lg`
                                                                    : "bg-background/50 backdrop-blur-sm border-border/50 hover:border-border",
                                                            )}
                                                        >
                                                            <div className="flex items-center space-x-3">
                                                                <div
                                                                    className={cn(
                                                                        "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300",
                                                                        formData.goals.includes(goal.id)
                                                                            ? `bg-gradient-to-br ${goal.color} text-white shadow-lg`
                                                                            : "bg-muted text-muted-foreground",
                                                                    )}
                                                                >
                                                                    <goal.icon className="w-5 h-5" />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <h3 className="font-semibold">{goal.title}</h3>
                                                                    <p className="text-sm text-muted-foreground">{goal.description}</p>
                                                                </div>
                                                                {formData.goals.includes(goal.id) && (
                                                                    <motion.div
                                                                        initial={{ scale: 0 }}
                                                                        animate={{ scale: 1 }}
                                                                        className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                                                                    >
                                                                        <Check className="w-4 h-4 text-white" />
                                                                    </motion.div>
                                                                )}
                                                            </div>
                                                        </Card>
                                                    </motion.div>
                                                ))}
                                            </div>

                                            {formData.goals.length > 0 && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20"
                                                >
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        <Sparkles className="w-4 h-4 text-green-600" />
                                                        <p className="font-medium text-green-600">Selected Goals</p>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {formData.goals.map((goalId) => {
                                                            const goal = userGoals.find((g) => g.id === goalId)
                                                            return (
                                                                <Badge key={goalId} variant="secondary" className="bg-green-500/20 text-green-700">
                                                                    {goal?.title}
                                                                </Badge>
                                                            )
                                                        })}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex space-x-3 mt-8">
                                {currentStep > 1 && (
                                    <Button
                                        onClick={handleBack}
                                        variant="outline"
                                        className="flex-1 bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background/80"
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Back
                                    </Button>
                                )}

                                <Button
                                    onClick={currentStep === 4 ? handleSubmit : handleNext}
                                    disabled={!canProceed() || isSubmitting}
                                    className={cn(
                                        "transition-all duration-300 shadow-lg hover:shadow-xl",
                                        currentStep === 1 ? "w-full" : "flex-1",
                                        currentStep === 4
                                            ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                                            : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
                                    )}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Setting up...
                                        </>
                                    ) : currentStep === 4 ? (
                                        <>
                                            <Sparkles className="w-4 h-4 mr-2" />
                                            Complete Setup
                                        </>
                                    ) : (
                                        <>
                                            Continue
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Loading Overlay */}
            <AnimatePresence>
                {isSubmitting && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-background/90 backdrop-blur-lg z-50 flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="text-center space-y-8"
                        >
                            <div className="relative">
                                <motion.div
                                    className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-2xl"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                >
                                    <Bot className="w-12 h-12 text-white" />
                                </motion.div>
                                <motion.div
                                    className="absolute inset-0 rounded-full border-4 border-blue-500/30"
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                />
                            </div>

                            <div className="space-y-4">
                                <motion.h3
                                    className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                >
                                    Setting up your Doris AI
                                </motion.h3>
                                <p className="text-muted-foreground text-lg">Personalizing your experience...</p>
                            </div>

                            <div className="flex justify-center space-x-2">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                                        animate={{
                                            scale: [1, 1.5, 1],
                                            opacity: [0.3, 1, 0.3],
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Number.POSITIVE_INFINITY,
                                            delay: i * 0.2,
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
