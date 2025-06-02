"use client"

import { useCallback, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
    Languages,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { FixedAIAssistant } from "@/components/fixed-ai-assistant"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { ModeToggle } from "@/components/mode-toggle"

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
    { code: "ru", name: "Русский", flag: "🇷���" },
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

// Translations for different languages
const translations: Record<string, any> = {
    en: {
        steps: [
            { id: 1, title: "Language", description: "Choose your language", icon: Languages },
            { id: 2, title: "Welcome", description: "Sign in to continue", icon: MessageCircle },
            { id: 3, title: "Origin", description: "Where are you from?", icon: Globe },
            { id: 4, title: "Goals", description: "What do you need?", icon: Sparkles },
        ],
        welcome: "Welcome to Doris AI",
        email: "Email",
        emailPlaceholder: "Enter your email",
        password: "Password",
        passwordPlaceholder: "Enter your password",
        rememberMe: "Remember me",
        forgotPassword: "Forgot password?",
        continueWithGoogle: "Continue with Google",
        selectNationality: "Select your nationality",
        chooseCountry: "Choose your country",
        customizeExperience: "Perfect! We'll customize your experience.",
        selectLanguage: "Choose your preferred language",
        dorisWillSpeak: "Excellent! Doris AI will speak your language.",
        selectedGoals: "Selected Goals",
        back: "Back",
        continue: "Continue",
        completeSetup: "Complete Setup",
        settingUp: "Setting up...",
        settingUpDoris: "Setting up your Doris AI",
        personalizing: "Personalizing your experience...",
        userGoals: [
            {
                id: "housing",
                title: "Housing",
                description: "Find your perfect home",
            },
            {
                id: "jobs",
                title: "Job Opportunities",
                description: "Discover career paths",
            },
            {
                id: "government",
                title: "Government Help",
                description: "Navigate bureaucracy",
            },
            {
                id: "social",
                title: "Social Matching",
                description: "Connect with community",
            },
            {
                id: "ai-chat",
                title: "AI Chat Support",
                description: "24/7 intelligent assistance",
            },
        ],
    },
    es: {
        steps: [
            { id: 1, title: "Idioma", description: "Elige tu idioma", icon: Languages },
            { id: 2, title: "Bienvenido", description: "Inicia sesión para continuar", icon: MessageCircle },
            { id: 3, title: "Origen", description: "¿De dónde eres?", icon: Globe },
            { id: 4, title: "Objetivos", description: "¿Qué necesitas?", icon: Sparkles },
        ],
        welcome: "Bienvenido a Doris AI",
        email: "Correo electrónico",
        emailPlaceholder: "Introduce tu correo electrónico",
        password: "Contraseña",
        passwordPlaceholder: "Introduce tu contraseña",
        rememberMe: "Recuérdame",
        forgotPassword: "¿Olvidaste tu contraseña?",
        continueWithGoogle: "Continuar con Google",
        selectNationality: "Selecciona tu nacionalidad",
        chooseCountry: "Elige tu país",
        customizeExperience: "¡Perfecto! Personalizaremos tu experiencia.",
        selectLanguage: "Elige tu idioma preferido",
        dorisWillSpeak: "¡Excelente! Doris AI hablará tu idioma.",
        selectedGoals: "Objetivos Seleccionados",
        back: "Atrás",
        continue: "Continuar",
        completeSetup: "Completar Configuración",
        settingUp: "Configurando...",
        settingUpDoris: "Configurando tu Doris AI",
        personalizing: "Personalizando tu experiencia...",
        userGoals: [
            {
                id: "housing",
                title: "Vivienda",
                description: "Encuentra tu hogar perfecto",
            },
            {
                id: "jobs",
                title: "Oportunidades Laborales",
                description: "Descubre trayectorias profesionales",
            },
            {
                id: "government",
                title: "Ayuda Gubernamental",
                description: "Navega por la burocracia",
            },
            {
                id: "social",
                title: "Conexión Social",
                description: "Conéctate con la comunidad",
            },
            {
                id: "ai-chat",
                title: "Soporte de IA",
                description: "Asistencia inteligente 24/7",
            },
        ],
    },
    fr: {
        steps: [
            { id: 1, title: "Langue", description: "Choisissez votre langue", icon: Languages },
            { id: 2, title: "Bienvenue", description: "Connectez-vous pour continuer", icon: MessageCircle },
            { id: 3, title: "Origine", description: "D'où venez-vous ?", icon: Globe },
            { id: 4, title: "Objectifs", description: "De quoi avez-vous besoin ?", icon: Sparkles },
        ],
        welcome: "Bienvenue sur Doris AI",
        email: "Email",
        emailPlaceholder: "Entrez votre email",
        password: "Mot de passe",
        passwordPlaceholder: "Entrez votre mot de passe",
        rememberMe: "Se souvenir de moi",
        forgotPassword: "Mot de passe oublié ?",
        continueWithGoogle: "Continuer avec Google",
        selectNationality: "Sélectionnez votre nationalité",
        chooseCountry: "Choisissez votre pays",
        customizeExperience: "Parfait ! Nous personnaliserons votre expérience.",
        selectLanguage: "Choisissez votre langue préférée",
        dorisWillSpeak: "Excellent ! Doris AI parlera votre langue.",
        selectedGoals: "Objectifs Sélectionnés",
        back: "Retour",
        continue: "Continuer",
        completeSetup: "Terminer la Configuration",
        settingUp: "Configuration en cours...",
        settingUpDoris: "Configuration de votre Doris AI",
        personalizing: "Personnalisation de votre expérience...",
        userGoals: [
            {
                id: "housing",
                title: "Logement",
                description: "Trouvez votre maison parfaite",
            },
            {
                id: "jobs",
                title: "Opportunités d'Emploi",
                description: "Découvrez des parcours professionnels",
            },
            {
                id: "government",
                title: "Aide Gouvernementale",
                description: "Naviguez dans la bureaucratie",
            },
            {
                id: "social",
                title: "Mise en Relation Sociale",
                description: "Connectez-vous avec la communauté",
            },
            {
                id: "ai-chat",
                title: "Support IA",
                description: "Assistance intelligente 24/7",
            },
        ],
    },
    de: {
        steps: [
            { id: 1, title: "Sprache", description: "Wählen Sie Ihre Sprache", icon: Languages },
            { id: 2, title: "Willkommen", description: "Melden Sie sich an, um fortzufahren", icon: MessageCircle },
            { id: 3, title: "Herkunft", description: "Woher kommen Sie?", icon: Globe },
            { id: 4, title: "Ziele", description: "Was brauchen Sie?", icon: Sparkles },
        ],
        welcome: "Willkommen bei Doris AI",
        email: "E-Mail",
        emailPlaceholder: "Geben Sie Ihre E-Mail ein",
        password: "Passwort",
        passwordPlaceholder: "Geben Sie Ihr Passwort ein",
        rememberMe: "Angemeldet bleiben",
        forgotPassword: "Passwort vergessen?",
        continueWithGoogle: "Mit Google fortfahren",
        selectNationality: "Wählen Sie Ihre Nationalität",
        chooseCountry: "Wählen Sie Ihr Land",
        customizeExperience: "Perfekt! Wir werden Ihre Erfahrung personalisieren.",
        selectLanguage: "Wählen Sie Ihre bevorzugte Sprache",
        dorisWillSpeak: "Ausgezeichnet! Doris AI wird Ihre Sprache sprechen.",
        selectedGoals: "Ausgewählte Ziele",
        back: "Zurück",
        continue: "Weiter",
        completeSetup: "Einrichtung abschließen",
        settingUp: "Einrichtung läuft...",
        settingUpDoris: "Einrichtung Ihrer Doris AI",
        personalizing: "Personalisierung Ihrer Erfahrung...",
        userGoals: [
            {
                id: "housing",
                title: "Wohnen",
                description: "Finden Sie Ihr perfektes Zuhause",
            },
            {
                id: "jobs",
                title: "Berufliche Möglichkeiten",
                description: "Entdecken Sie Karrierewege",
            },
            {
                id: "government",
                title: "Behördenhilfe",
                description: "Navigieren Sie durch die Bürokratie",
            },
            {
                id: "social",
                title: "Soziale Vernetzung",
                description: "Verbinden Sie sich mit der Gemeinschaft",
            },
            {
                id: "ai-chat",
                title: "KI-Unterstützung",
                description: "Intelligente Unterstützung rund um die Uhr",
            },
        ],
    },
    zh: {
        steps: [
            { id: 1, title: "语言", description: "选择您的语言", icon: Languages },
            { id: 2, title: "欢迎", description: "登录以继续", icon: MessageCircle },
            { id: 3, title: "来源", description: "您来自哪里？", icon: Globe },
            { id: 4, title: "目标", description: "您需要什么？", icon: Sparkles },
        ],
        welcome: "欢迎使用 Doris AI",
        email: "电子邮件",
        emailPlaceholder: "输入您的电子邮件",
        password: "密码",
        passwordPlaceholder: "输入您的密码",
        rememberMe: "记住我",
        forgotPassword: "忘记密码？",
        continueWithGoogle: "使用 Google 继续",
        selectNationality: "选择您的国籍",
        chooseCountry: "选择您的国家",
        customizeExperience: "太好了！我们将为您定制体验。",
        selectLanguage: "选择您的首选语言",
        dorisWillSpeak: "太棒了！Doris AI 将使用您的语言。",
        selectedGoals: "已选目标",
        back: "返回",
        continue: "继续",
        completeSetup: "完成设置",
        settingUp: "设置中...",
        settingUpDoris: "设置您的 Doris AI",
        personalizing: "个性化您的体验...",
        userGoals: [
            {
                id: "housing",
                title: "住房",
                description: "找到您的理想住所",
            },
            {
                id: "jobs",
                title: "就业机会",
                description: "探索职业道路",
            },
            {
                id: "government",
                title: "政府帮助",
                description: "应对官僚程序",
            },
            {
                id: "social",
                title: "社交匹配",
                description: "与社区建立联系",
            },
            {
                id: "ai-chat",
                title: "AI 聊天支持",
                description: "全天候智能协助",
            },
        ],
    },
}

// Default to English if a language doesn't have translations
const getTranslation = (langCode: string) => {
    return translations[langCode] || translations.en
}

// User goals/intents with icons
const userGoalsIcons = {
    housing: Home,
    jobs: Briefcase,
    government: Building2,
    social: Users,
    "ai-chat": Bot,
}

const goalColors = {
    housing: {
        color: "from-emerald-500 to-emerald-600",
        bgColor: "bg-emerald-500/10",
        borderColor: "border-emerald-500/30",
        textColor: "text-emerald-600",
    },
    jobs: {
        color: "from-purple-500 to-purple-600",
        bgColor: "bg-purple-500/10",
        borderColor: "border-purple-500/30",
        textColor: "text-purple-600",
    },
    government: {
        color: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/30",
        textColor: "text-blue-600",
    },
    social: {
        color: "from-pink-500 to-pink-600",
        bgColor: "bg-pink-500/10",
        borderColor: "border-pink-500/30",
        textColor: "text-pink-600",
    },
    "ai-chat": {
        color: "from-indigo-500 to-indigo-600",
        bgColor: "bg-indigo-500/10",
        borderColor: "border-indigo-500/30",
        textColor: "text-indigo-600",
    },
}

interface FormData {
    email: string
    password: string
    rememberMe: boolean
    nationality: string
    language: string
    goals: string[]
}

export default function OnboardingPage() {
    const router = useRouter()
    const isMobile = useMediaQuery("(max-width: 768px)")
    const isTablet = useMediaQuery("(max-width: 1024px)")
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
        language: "en", // Default to English
        goals: [],
    })

    // Get translations based on selected language
    const t = getTranslation(formData.language)

    // Form validation
    const isStep1Valid = formData.language
    const isStep2Valid = formData.email && formData.password && formData.email.includes("@")
    const isStep3Valid = formData.nationality
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

    // Responsive Step Indicator Component
    const StepIndicator = useCallback(() => {
        return (
            <div className="flex items-center w-full justify-center mb-6 md:mb-8 px-4">
                <div className={cn("flex items-center")}>
                    {t.steps.map((step: any, index: number) => (
                        <div key={step.id} className="flex items-center">
                            <motion.div
                                className={cn(
                                    "relative flex items-center justify-center rounded-full border-2 transition-all duration-300",
                                    isMobile ? "w-8 h-8" : "w-10 h-10 md:w-12 md:h-12",
                                    currentStep >= step.id
                                        ? "bg-primary border-transparent text-white shadow-lg"
                                        : "border-muted-foreground/30 text-muted-foreground bg-background/50 backdrop-blur-sm",
                                )}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {currentStep > step.id ? (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
                                        <Check className={cn("w-3 h-3", !isMobile && "md:w-5 md:h-5")} />
                                    </motion.div>
                                ) : (
                                    <step.icon className={cn("w-3 h-3", !isMobile && "md:w-5 md:h-5")} />
                                )}

                                {currentStep === step.id && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-30"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                    />
                                )}
                            </motion.div>

                            {/* Step Labels - Hidden on mobile */}
                            {!isMobile && (
                                <div className="ml-3 hidden sm:block">
                                    <p className="text-sm font-medium">{step.title}</p>
                                    <p className="text-xs text-muted-foreground">{step.description}</p>
                                </div>
                            )}

                            {/* Progress Line */}
                            {index < t.steps.length - 1 && (
                                <div
                                    className={cn(
                                        "bg-muted-foreground/20 w-6 md:w-12 relative h-0.5 overflow-hidden mx-2 md:mx-4",
                                    )}
                                >
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
    }, [currentStep])

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
            {/* Animated Grid Background */}
            <AnimatedGrid />

            <div className="flex fixed top-0 items-center backdrop-blur-lg w-full h-20 z-50">
                <FixedAIAssistant currentStep={currentStep} position="top-left" language={formData.language} />

                {/* Theme Toggle */}
                <div className="absolute top-4 right-4 md:top-6 md:right-6 z-40">
                    <ModeToggle />
                </div>
            </div>
            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 md:p-6 lg:p-8">


                {/* Step Indicator */}
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
                    <StepIndicator />
                </motion.div>

                {/* Form Container */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="w-full max-w-md md:max-w-lg"
                >
                    <Card className="backdrop-blur-xl bg-card/90 border-border/50 shadow-2xl md:min-h-[500px] relative ">
                        {/* Card Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />

                        <CardContent className={cn("relative z-10", isMobile ? "p-6" : "p-8")}>
                            {/* Step Header */}
                            <motion.div
                                key={`header-${currentStep}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-center mb-0 md:mb-8"
                            >
                                <h2 className={cn("font-bold mb-1", isMobile ? "text-xl" : "text-2xl")}>
                                    {t.steps[currentStep - 1].title}
                                </h2>
                                <p className="text-muted-foreground text-sm md:text-base">{t.steps[currentStep - 1].description}</p>
                            </motion.div>

                            {/* Form Content */}
                            <div className="min-h-[280px] flex flex-col justify-center">
                                <AnimatePresence mode="wait">
                                    {/* Step 1: Language Selection */}
                                    {currentStep === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6"
                                        >
                                            <div className="space-y-2">
                                                <Label className="text-sm md:text-base">{t.selectLanguage}</Label>
                                                <div className="relative">
                                                    <Button
                                                        variant="outline"
                                                        className="w-full justify-between bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background/80 h-12"
                                                        onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                                                    >
                                                        {formData.language ? (
                                                            <div className="flex items-center space-x-2">
                                                                <span className="text-lg">
                                                                    {languages.find((l) => l.code === formData.language)?.flag}
                                                                </span>
                                                                <span className="text-sm md:text-base">
                                                                    {languages.find((l) => l.code === formData.language)?.name}
                                                                </span>
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
                                                                        <span className="text-sm md:text-base">{language.name}</span>
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
                                                            <p className="font-medium text-sm md:text-base">
                                                                {languages.find((l) => l.code === formData.language)?.name}
                                                            </p>
                                                            <p className="text-xs md:text-sm text-muted-foreground">{t.dorisWillSpeak}</p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    )}

                                    {/* Step 2: Login Form */}
                                    {currentStep === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6"
                                        >
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="email" className="text-sm md:text-base">
                                                        {t.email}
                                                    </Label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            placeholder={t.emailPlaceholder}
                                                            value={formData.email}
                                                            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                                            className="pl-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-blue-500/50 transition-colors h-12"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="password" className="text-sm md:text-base">
                                                        {t.password}
                                                    </Label>
                                                    <div className="relative">
                                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                                        <Input
                                                            id="password"
                                                            type={showPassword ? "text" : "password"}
                                                            placeholder={t.passwordPlaceholder}
                                                            value={formData.password}
                                                            onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                                                            className="pl-10 pr-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-blue-500/50 transition-colors h-12"
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
                                                    <Label htmlFor="remember" className="text-xs md:text-sm">
                                                        {t.rememberMe}
                                                    </Label>
                                                </div>
                                                <Button variant="link" className="text-xs md:text-sm p-0 h-auto">
                                                    {t.forgotPassword}
                                                </Button>
                                            </div>

                                            <Button
                                                onClick={handleGoogleLogin}
                                                variant="outline"
                                                className="w-full bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background/80 h-12"
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
                                                <span className="text-sm md:text-base">{t.continueWithGoogle}</span>
                                            </Button>
                                        </motion.div>
                                    )}

                                    {/* Step 3: Nationality Selection */}
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
                                                <Label className="text-sm md:text-base">{t.selectNationality}</Label>
                                                <div className="relative">
                                                    <Button
                                                        variant="outline"
                                                        className="w-full justify-between bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background/80 h-12"
                                                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                                    >
                                                        {formData.nationality ? (
                                                            <div className="flex items-center space-x-2">
                                                                <span className="text-lg">
                                                                    {countries.find((c) => c.code === formData.nationality)?.flag}
                                                                </span>
                                                                <span className="text-sm md:text-base">
                                                                    {countries.find((c) => c.code === formData.nationality)?.name}
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            t.chooseCountry
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
                                                                        <span className="text-sm md:text-base">{country.name}</span>
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
                                                            <p className="font-medium text-sm md:text-base">
                                                                {countries.find((c) => c.code === formData.nationality)?.name}
                                                            </p>
                                                            <p className="text-xs md:text-sm text-muted-foreground">{t.customizeExperience}</p>
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
                                            className="space-y-6"
                                        >
                                            <div className="grid grid-cols-1 gap-3">
                                                {t.userGoals.map((goal: any, index: number) => {
                                                    const IconComponent = userGoalsIcons[goal.id as keyof typeof userGoalsIcons]
                                                    const colors = goalColors[goal.id as keyof typeof goalColors]

                                                    return (
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
                                                                    "p-3 md:p-4 transition-all duration-300 border-2",
                                                                    formData.goals.includes(goal.id)
                                                                        ? `${colors.bgColor} ${colors.borderColor} shadow-lg`
                                                                        : "bg-background/50 backdrop-blur-sm border-border/50 hover:border-border",
                                                                )}
                                                            >
                                                                <div className="flex items-center space-x-3">
                                                                    <div
                                                                        className={cn(
                                                                            "rounded-lg flex items-center justify-center transition-all duration-300",
                                                                            isMobile ? "w-8 h-8" : "w-10 h-10",
                                                                            formData.goals.includes(goal.id)
                                                                                ? `bg-gradient-to-br ${colors.color} text-white shadow-lg`
                                                                                : "bg-muted text-muted-foreground",
                                                                        )}
                                                                    >
                                                                        <IconComponent className={cn(isMobile ? "w-4 h-4" : "w-5 h-5")} />
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <h3 className={cn("font-semibold", isMobile ? "text-sm" : "text-base")}>
                                                                            {goal.title}
                                                                        </h3>
                                                                        <p className={cn("text-muted-foreground", isMobile ? "text-xs" : "text-sm")}>
                                                                            {goal.description}
                                                                        </p>
                                                                    </div>
                                                                    {formData.goals.includes(goal.id) && (
                                                                        <motion.div
                                                                            initial={{ scale: 0 }}
                                                                            animate={{ scale: 1 }}
                                                                            className={cn(
                                                                                "bg-green-500 rounded-full flex items-center justify-center shadow-lg",
                                                                                isMobile ? "w-5 h-5" : "w-6 h-6",
                                                                            )}
                                                                        >
                                                                            <Check className={cn("text-white", isMobile ? "w-3 h-3" : "w-4 h-4")} />
                                                                        </motion.div>
                                                                    )}
                                                                </div>
                                                            </Card>
                                                        </motion.div>
                                                    )
                                                })}
                                            </div>

                                            {formData.goals.length > 0 && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20"
                                                >
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        <Sparkles className="w-4 h-4 text-green-600" />
                                                        <p className={cn("font-medium text-green-600", isMobile ? "text-sm" : "text-base")}>
                                                            {t.selectedGoals}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {formData.goals.map((goalId) => {
                                                            const goal = t.userGoals.find((g: any) => g.id === goalId)
                                                            return (
                                                                <Badge
                                                                    key={goalId}
                                                                    variant="secondary"
                                                                    className={cn("bg-green-500/20 text-green-700", isMobile ? "text-xs" : "text-sm")}
                                                                >
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
                            <div className={cn("flex mt-6 md:mt-8", isMobile ? "space-x-2" : "space-x-3")}>
                                {currentStep > 1 && (
                                    <Button
                                        onClick={handleBack}
                                        variant="outline"
                                        className={cn(
                                            "flex-1 bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background/80",
                                            isMobile ? "h-10 text-sm" : "h-12",
                                        )}
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        {t.back}
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
                                        isMobile ? "h-10 text-sm" : "h-12",
                                    )}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            {t.settingUp}
                                        </>
                                    ) : currentStep === 4 ? (
                                        <>
                                            <Sparkles className="w-4 h-4 mr-2" />
                                            {t.completeSetup}
                                        </>
                                    ) : (
                                        <>
                                            {t.continue}
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
                            className="text-center space-y-6 md:space-y-8 px-4"
                        >
                            <div className="relative">
                                <motion.div
                                    className={cn(
                                        "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-2xl",
                                        isMobile ? "w-20 h-20" : "w-24 h-24",
                                    )}
                                    animate={{ rotate: 360, scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                >
                                    <Bot className={cn("text-white", isMobile ? "w-10 h-10" : "w-12 h-12")} />
                                </motion.div>

                            </div>

                            <div className="space-y-4">
                                <motion.h3
                                    className={cn(
                                        "font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",
                                        isMobile ? "text-2xl" : "text-3xl",
                                    )}
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                >
                                    {t.settingUpDoris}
                                </motion.h3>
                                <p className={cn("text-muted-foreground", isMobile ? "text-base" : "text-lg")}>{t.personalizing}</p>
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
