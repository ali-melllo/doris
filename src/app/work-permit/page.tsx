"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  Briefcase,
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Clock,
  Users,
  Building2,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Bot,
  Globe,
  ChevronDown,
  Info,
  Download,
  Mail,
  Shield,
  Search,
  Calendar,
  UserCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { toast } from "sonner"

// Translations for multilingual support
const translations = {
  en: {
    title: "Work Permit (TWV) Application",
    subtitle: "Hire non-EU employees legally",
    startQuestion: "Do you want to hire a non-EU employee?",
    yes: "Yes",
    no: "No",
    back: "Back",
    next: "Next",
    complete: "Complete",
    beginApplication: "Begin TWV Application",
    applicationDescription: "Start the process to hire non-EU workers through UWV",
    loginEHerkenning: "Login with eHerkenning",
    loginDescription: "Secure login required for official applications",
    applicantType: "Are you applying yourself or via agency?",
    applicantSelf: "Applying myself",
    applicantAgency: "Via agency",
    uploadKetenmachtiging: "Upload Ketenmachtiging",
    ketenmachtigingDescription: "Upload authorization document for agency applications",
    gatherDocuments: "Gather Required Documents",
    documentsDescription: "Collect all necessary documents for your application",
    postVacancy: "Post Vacancy",
    vacancyDescription: "Post your job vacancy on Werk.nl or EURES",
    uploadDocuments: "Upload Documents and Submit",
    uploadDescription: "Upload all required documents to UWV",
    uwvCheck: "UWV Completeness Check",
    uwvCheckDescription: "UWV reviews your application for completeness",
    uwvProcess: "UWV Processing",
    uwvProcessDescription: "UWV processes your application (5 weeks)",
    applicationResult: "Application Result",
    resultDescription: "Was your TWV application approved?",
    approved: "Approved",
    rejected: "Rejected",
    permitGranted: "Work Permit Granted!",
    permitGrantedDescription: "Your TWV application has been approved",
    fileObjection: "File an Objection",
    objectionDescription: "You may file an objection against the decision",
    processing: "Processing...",
    success: "Success!",
    error: "Error occurred",
    helpTooltip: "Need help? Chat with Doris AI",
    pending: "Pending",
    // complete: "Complete",
    incomplete: "Incomplete",
    uploadFile: "Upload File",
    dragDrop: "Drag and drop files here, or click to select",
    fileUploaded: "File uploaded successfully",
    requiredDocuments: "Required Documents",
    documentChecklist: [
      "Valid passport copy",
      "Employment contract",
      "Job description",
      "Salary details",
      "Company registration",
      "Vacancy posting proof",
    ],
    openWerkNl: "Open Werk.nl",
    openEures: "Open EURES",
    submitToUwv: "Submit to UWV",
    uwvRequestInfo: "UWV will request missing information",
    timeline5Weeks: "Processing timeline: 5 weeks",
    contactHelp: "Contact Help",
    downloadPermit: "Download Work Permit",
    scheduleAppointment: "Schedule Appointment",
    viewStatus: "View Application Status",
  },
  nl: {
    title: "Tewerkstellingsvergunning (TWV) Aanvraag",
    subtitle: "Werknemers van buiten de EU legaal in dienst nemen",
    startQuestion: "Wilt u een werknemer van buiten de EU in dienst nemen?",
    yes: "Ja",
    no: "Nee",
    back: "Terug",
    next: "Volgende",
    complete: "Voltooien",
    beginApplication: "Begin TWV Aanvraag",
    applicationDescription: "Start het proces om werknemers van buiten de EU aan te nemen via UWV",
    loginEHerkenning: "Inloggen met eHerkenning",
    loginDescription: "Veilige inlog vereist voor officiële aanvragen",
    applicantType: "Vraagt u zelf aan of via een bureau?",
    applicantSelf: "Zelf aanvragen",
    applicantAgency: "Via bureau",
    uploadKetenmachtiging: "Upload Ketenmachtiging",
    ketenmachtigingDescription: "Upload machtigingsdocument voor bureau-aanvragen",
    gatherDocuments: "Verzamel Vereiste Documenten",
    documentsDescription: "Verzamel alle benodigde documenten voor uw aanvraag",
    postVacancy: "Plaats Vacature",
    vacancyDescription: "Plaats uw vacature op Werk.nl of EURES",
    uploadDocuments: "Upload Documenten en Verstuur",
    uploadDescription: "Upload alle vereiste documenten naar UWV",
    uwvCheck: "UWV Volledigheidscheck",
    uwvCheckDescription: "UWV controleert uw aanvraag op volledigheid",
    uwvProcess: "UWV Verwerking",
    uwvProcessDescription: "UWV verwerkt uw aanvraag (5 weken)",
    applicationResult: "Aanvraag Resultaat",
    resultDescription: "Is uw TWV aanvraag goedgekeurd?",
    approved: "Goedgekeurd",
    rejected: "Afgewezen",
    permitGranted: "Werkvergunning Verleend!",
    permitGrantedDescription: "Uw TWV aanvraag is goedgekeurd",
    fileObjection: "Bezwaar Indienen",
    objectionDescription: "U kunt bezwaar indienen tegen de beslissing",
    processing: "Verwerken...",
    success: "Succes!",
    error: "Er is een fout opgetreden",
    helpTooltip: "Hulp nodig? Chat met Doris AI",
    pending: "In behandeling",
    // complete: "Voltooid",
    incomplete: "Onvolledig",
    uploadFile: "Bestand Uploaden",
    dragDrop: "Sleep bestanden hierheen, of klik om te selecteren",
    fileUploaded: "Bestand succesvol geüpload",
    requiredDocuments: "Vereiste Documenten",
    documentChecklist: [
      "Geldige paspoort kopie",
      "Arbeidscontract",
      "Functiebeschrijving",
      "Salaris details",
      "Bedrijfsregistratie",
      "Bewijs vacatureplaatsing",
    ],
    openWerkNl: "Open Werk.nl",
    openEures: "Open EURES",
    submitToUwv: "Verstuur naar UWV",
    uwvRequestInfo: "UWV zal ontbrekende informatie opvragen",
    timeline5Weeks: "Verwerkingstijd: 5 weken",
    contactHelp: "Contact Hulp",
    downloadPermit: "Download Werkvergunning",
    scheduleAppointment: "Plan Afspraak",
    viewStatus: "Bekijk Aanvraag Status",
  },
  fr: {
    title: "Demande de Permis de Travail (TWV)",
    subtitle: "Embaucher légalement des employés non-UE",
    startQuestion: "Voulez-vous embaucher un employé non-UE ?",
    yes: "Oui",
    no: "Non",
    back: "Retour",
    next: "Suivant",
    complete: "Terminer",
    beginApplication: "Commencer la Demande TWV",
    applicationDescription: "Commencer le processus d'embauche de travailleurs non-UE via UWV",
    loginEHerkenning: "Connexion avec eHerkenning",
    loginDescription: "Connexion sécurisée requise pour les demandes officielles",
    applicantType: "Faites-vous la demande vous-même ou via une agence ?",
    applicantSelf: "Demande personnelle",
    applicantAgency: "Via agence",
    uploadKetenmachtiging: "Télécharger Ketenmachtiging",
    ketenmachtigingDescription: "Télécharger le document d'autorisation pour les demandes d'agence",
    gatherDocuments: "Rassembler les Documents Requis",
    documentsDescription: "Rassemblez tous les documents nécessaires pour votre demande",
    postVacancy: "Publier l'Offre d'Emploi",
    vacancyDescription: "Publiez votre offre d'emploi sur Werk.nl ou EURES",
    uploadDocuments: "Télécharger les Documents et Soumettre",
    uploadDescription: "Téléchargez tous les documents requis vers UWV",
    uwvCheck: "Vérification de Complétude UWV",
    uwvCheckDescription: "UWV examine votre demande pour sa complétude",
    uwvProcess: "Traitement UWV",
    uwvProcessDescription: "UWV traite votre demande (5 semaines)",
    applicationResult: "Résultat de la Demande",
    resultDescription: "Votre demande TWV a-t-elle été approuvée ?",
    approved: "Approuvé",
    rejected: "Rejeté",
    permitGranted: "Permis de Travail Accordé !",
    permitGrantedDescription: "Votre demande TWV a été approuvée",
    fileObjection: "Déposer une Objection",
    objectionDescription: "Vous pouvez déposer une objection contre la décision",
    processing: "Traitement...",
    success: "Succès !",
    error: "Une erreur s'est produite",
    helpTooltip: "Besoin d'aide ? Chattez avec Doris AI",
    pending: "En attente",
    // complete: "Terminé",
    incomplete: "Incomplet",
    uploadFile: "Télécharger le Fichier",
    dragDrop: "Glissez-déposez les fichiers ici, ou cliquez pour sélectionner",
    fileUploaded: "Fichier téléchargé avec succès",
    requiredDocuments: "Documents Requis",
    documentChecklist: [
      "Copie de passeport valide",
      "Contrat de travail",
      "Description du poste",
      "Détails du salaire",
      "Enregistrement de l'entreprise",
      "Preuve de publication d'offre",
    ],
    openWerkNl: "Ouvrir Werk.nl",
    openEures: "Ouvrir EURES",
    submitToUwv: "Soumettre à UWV",
    uwvRequestInfo: "UWV demandera les informations manquantes",
    timeline5Weeks: "Délai de traitement : 5 semaines",
    contactHelp: "Contacter l'Aide",
    downloadPermit: "Télécharger le Permis de Travail",
    scheduleAppointment: "Planifier un Rendez-vous",
    viewStatus: "Voir le Statut de la Demande",
  },
}

// Language detection
const detectLanguage = () => {
  if (typeof window !== "undefined") {
    const browserLang = navigator.language.split("-")[0]
    return translations[browserLang as keyof typeof translations] ? browserLang : "en"
  }
  return "en"
}

interface FormData {
  wantToHire: string
  applicantType: string
  ketenmachtigingFile: File | null
  documentsGathered: boolean
  vacancyPosted: boolean
  documentsUploaded: File[]
  uwvCheckComplete: string
  applicationApproved: string
}

export default function WorkPermitPage() {
  const router = useRouter()
  const isMobile = useMediaQuery("(max-width: 768px)")

  const [currentStep, setCurrentStep] = useState(1)
  const [language, setLanguage] = useState("en")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAssistant, setShowAssistant] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    wantToHire: "",
    applicantType: "",
    ketenmachtigingFile: null,
    documentsGathered: false,
    vacancyPosted: false,
    documentsUploaded: [],
    uwvCheckComplete: "",
    applicationApproved: "",
  })

  // Initialize language
  useEffect(() => {
    const detectedLang = detectLanguage()
    setLanguage(detectedLang)
  }, [])

  const t = translations[language as keyof typeof translations]

  // Step configuration with branching logic
  const getSteps = () => {
    const baseSteps = [{ id: 1, title: "Start", description: t.startQuestion, icon: Briefcase }]

    if (formData.wantToHire === "yes") {
      baseSteps.push(
        { id: 2, title: "Begin", description: t.beginApplication, icon: FileText },
        { id: 3, title: "Login", description: t.loginEHerkenning, icon: Shield },
        { id: 4, title: "Applicant", description: t.applicantType, icon: Users },
      )

      if (formData.applicantType === "agency") {
        baseSteps.push({ id: 5, title: "Authorization", description: t.uploadKetenmachtiging, icon: Upload })
      }

      baseSteps.push(
        { id: 6, title: "Documents", description: t.gatherDocuments, icon: FileText },
        { id: 7, title: "Vacancy", description: t.postVacancy, icon: Search },
        { id: 8, title: "Upload", description: t.uploadDocuments, icon: Upload },
        { id: 9, title: "UWV Check", description: t.uwvCheck, icon: CheckCircle },
        { id: 10, title: "Processing", description: t.uwvProcess, icon: Clock },
        { id: 11, title: "Result", description: t.applicationResult, icon: AlertCircle },
      )
    }

    return baseSteps
  }

  const steps = getSteps()
  const currentStepData = steps.find((step) => step.id === currentStep)

  // Navigation logic
  const getNextStep = () => {
    if (currentStep === 1 && formData.wantToHire === "no") {
      return null // End flow
    }
    if (currentStep === 4 && formData.applicantType === "agency") {
      return 5
    }
    if (currentStep === 4 && formData.applicantType === "self") {
      return 6
    }
    if (currentStep === 5) {
      return 6
    }

    const nextStepIndex = steps.findIndex((step) => step.id === currentStep) + 1
    return nextStepIndex < steps.length ? steps[nextStepIndex].id : null
  }

  const handleNext = () => {
    const nextStep = getNextStep()
    if (nextStep) {
      setCurrentStep(nextStep)
    } else {
      // End of flow
      toast(
       t.success
        )
    }
  }

  const handleBack = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep)
    if (currentIndex > 0) {
      // Handle special back navigation for branching
      if (currentStep === 6 && formData.applicantType === "agency") {
        setCurrentStep(5)
      } else if (currentStep === 6 && formData.applicantType === "self") {
        setCurrentStep(4)
      } else {
        setCurrentStep(steps[currentIndex - 1].id)
      }
    }
  }

  // File upload handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files)
      if (currentStep === 5) {
        setFormData((prev) => ({ ...prev, ketenmachtigingFile: files[0] }))
      } else {
        setFormData((prev) => ({
          ...prev,
          documentsUploaded: [...prev.documentsUploaded, ...files],
        }))
      }
      toast( t.success)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      if (currentStep === 5) {
        setFormData((prev) => ({ ...prev, ketenmachtigingFile: files[0] }))
      } else {
        setFormData((prev) => ({
          ...prev,
          documentsUploaded: [...prev.documentsUploaded, ...files],
        }))
      }
      toast(t.success)
    }
  }

  // Animated Background
  const AnimatedBackground = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="work-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-green-500/20"
              />
            </pattern>
            <linearGradient id="workGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.1" />
              <stop offset="50%" stopColor="rgb(59, 130, 246)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgb(147, 51, 234)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#work-grid)" />
          <rect width="100%" height="100%" fill="url(#workGradient)" />
        </svg>
      </div>

      {/* Floating Elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 blur-xl"
          style={{
            width: Math.random() * 200 + 100,
            height: Math.random() * 200 + 100,
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

  // Header with language switcher
  const Header = () => (
    <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border/50 p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">{t.title}</h1>
            <p className="text-sm text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center space-x-1">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">{language.toUpperCase()}</span>
              <ChevronDown className="w-4 h-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setLanguage("en")}>🇺🇸 English</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("nl")}>🇳🇱 Nederlands</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("fr")}>🇫🇷 Français</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Progress indicator */}
      <div className="max-w-4xl mx-auto mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Step {steps.findIndex((s) => s.id === currentStep) + 1} of {steps.length}
          </span>
          <Badge variant="secondary">
            {Math.round(((steps.findIndex((s) => s.id === currentStep) + 1) / steps.length) * 100)}% Complete
          </Badge>
        </div>
        <Progress value={((steps.findIndex((s) => s.id === currentStep) + 1) / steps.length) * 100} className="h-2" />
      </div>
    </div>
  )

  // Floating Assistant
  const FloatingAssistant = () => (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <Button
        size="icon"
        className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 shadow-2xl"
        onClick={() => setShowAssistant(!showAssistant)}
      >
        <Bot className="w-6 h-6 text-white" />
      </Button>

      <AnimatePresence>
        {showAssistant && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 w-80 bg-card/95 backdrop-blur-xl border border-border/50 rounded-lg shadow-2xl p-4"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Doris AI Assistant</h3>
                <p className="text-xs text-muted-foreground">How can I help you?</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{t.helpTooltip}</p>
            <Button size="sm" className="w-full">
              Start Chat
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative">
      <AnimatedBackground />
      <Header />
      <FloatingAssistant />

      <div className="relative z-10 max-w-4xl mx-auto p-4 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            <Card className="backdrop-blur-xl bg-card/90 border-border/50 shadow-2xl">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                    {currentStepData && React.createElement(currentStepData.icon, { className: "w-8 h-8 text-white" })}
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold">{currentStepData?.title}</CardTitle>
                <p className="text-muted-foreground">{currentStepData?.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Step 1: Start Question */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold mb-4">{t.startQuestion}</h3>
                    </div>

                    <RadioGroup
                      value={formData.wantToHire}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, wantToHire: value }))}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-3 p-6 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="yes" id="hire-yes" />
                        <Label htmlFor="hire-yes" className="flex-1 cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                            <div>
                              <p className="font-medium">{t.yes}</p>
                              <p className="text-sm text-muted-foreground">I want to hire a non-EU employee</p>
                            </div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 p-6 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="no" id="hire-no" />
                        <Label htmlFor="hire-no" className="flex-1 cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <AlertCircle className="w-6 h-6 text-red-600" />
                            <div>
                              <p className="font-medium">{t.no}</p>
                              <p className="text-sm text-muted-foreground">I don't need this service</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Step 2: Begin Application */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <div className="space-y-4 flex-1">
                          <div>
                            <h4 className="font-semibold mb-2">{t.beginApplication}</h4>
                            <p className="text-sm text-muted-foreground mb-4">{t.applicationDescription}</p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-background/50 rounded-lg border border-border/30">
                              <h5 className="font-medium mb-2">What is TWV?</h5>
                              <p className="text-sm text-muted-foreground">
                                Tewerkstellingsvergunning (TWV) is a work permit required to employ non-EU workers in
                                the Netherlands.
                              </p>
                            </div>
                            <div className="p-4 bg-background/50 rounded-lg border border-border/30">
                              <h5 className="font-medium mb-2">Processing Time</h5>
                              <p className="text-sm text-muted-foreground">
                                UWV typically processes TWV applications within 5 weeks of receiving complete
                                documentation.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Login with eHerkenning */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <Shield className="w-16 h-16 mx-auto text-blue-600" />
                      <h3 className="text-xl font-semibold">{t.loginEHerkenning}</h3>
                      <p className="text-muted-foreground">{t.loginDescription}</p>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div className="space-y-4 flex-1">
                          <div>
                            <h4 className="font-semibold mb-2">Secure Authentication Required</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                              eHerkenning provides secure access to government services for businesses
                            </p>
                          </div>
                          <Button
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                            onClick={() => window.open("https://eherkenning.nl", "_blank")}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Login with eHerkenning
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        You need eHerkenning Level 3 or higher to access UWV services for TWV applications.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                {/* Step 4: Applicant Type */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-semibold">{t.applicantType}</h3>
                    </div>

                    <RadioGroup
                      value={formData.applicantType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, applicantType: value }))}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-3 p-6 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="self" id="applicant-self" />
                        <Label htmlFor="applicant-self" className="flex-1 cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <UserCheck className="w-6 h-6 text-blue-600" />
                            <div>
                              <p className="font-medium">{t.applicantSelf}</p>
                              <p className="text-sm text-muted-foreground">Direct application by employer</p>
                            </div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 p-6 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="agency" id="applicant-agency" />
                        <Label htmlFor="applicant-agency" className="flex-1 cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <Building2 className="w-6 h-6 text-purple-600" />
                            <div>
                              <p className="font-medium">{t.applicantAgency}</p>
                              <p className="text-sm text-muted-foreground">Application through authorized agency</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Step 5: Upload Ketenmachtiging */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-semibold">{t.uploadKetenmachtiging}</h3>
                      <p className="text-muted-foreground">{t.ketenmachtigingDescription}</p>
                    </div>

                    <div
                      className={cn(
                        "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                        dragActive ? "border-blue-500 bg-blue-500/10" : "border-border/50 hover:border-border",
                      )}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg font-medium mb-2">{t.dragDrop}</p>
                      <input
                        type="file"
                        onChange={handleFileInput}
                        className="hidden"
                        id="ketenmachtiging-upload"
                        accept=".pdf,.doc,.docx"
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("ketenmachtiging-upload")?.click()}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {t.uploadFile}
                      </Button>
                    </div>

                    {formData.ketenmachtigingFile && (
                      <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium">File uploaded successfully</p>
                          <p className="text-sm text-muted-foreground">{formData.ketenmachtigingFile.name}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 6: Gather Documents */}
                {currentStep === 6 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <FileText className="w-16 h-16 mx-auto text-green-600" />
                      <h3 className="text-xl font-semibold">{t.gatherDocuments}</h3>
                      <p className="text-muted-foreground">{t.documentsDescription}</p>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                      <h4 className="font-semibold mb-4">{t.requiredDocuments}</h4>
                      <div className="space-y-3">
                        {t.documentChecklist.map((doc: string, index: number) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </div>
                            <span className="text-sm">{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="documents-gathered"
                        checked={formData.documentsGathered}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, documentsGathered: checked as boolean }))
                        }
                      />
                      <Label htmlFor="documents-gathered" className="text-sm">
                        I have gathered all required documents
                      </Label>
                    </div>
                  </div>
                )}

                {/* Step 7: Post Vacancy */}
                {currentStep === 7 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <Search className="w-16 h-16 mx-auto text-blue-600" />
                      <h3 className="text-xl font-semibold">{t.postVacancy}</h3>
                      <p className="text-muted-foreground">{t.vacancyDescription}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <Search className="w-8 h-8 text-blue-600" />
                          <div>
                            <h4 className="font-medium">Werk.nl</h4>
                            <p className="text-sm text-muted-foreground">Dutch national job portal</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full bg-transparent"
                          onClick={() => window.open("https://werk.nl", "_blank")}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {t.openWerkNl}
                        </Button>
                      </Card>

                      <Card className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <Globe className="w-8 h-8 text-purple-600" />
                          <div>
                            <h4 className="font-medium">EURES</h4>
                            <p className="text-sm text-muted-foreground">European job mobility portal</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full bg-transparent"
                          onClick={() => window.open("https://eures.europa.eu", "_blank")}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {t.openEures}
                        </Button>
                      </Card>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="vacancy-posted"
                        checked={formData.vacancyPosted}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, vacancyPosted: checked as boolean }))
                        }
                      />
                      <Label htmlFor="vacancy-posted" className="text-sm">
                        I have posted the vacancy on required platforms
                      </Label>
                    </div>
                  </div>
                )}

                {/* Step 8: Upload Documents */}
                {currentStep === 8 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <Upload className="w-16 h-16 mx-auto text-green-600" />
                      <h3 className="text-xl font-semibold">{t.uploadDocuments}</h3>
                      <p className="text-muted-foreground">{t.uploadDescription}</p>
                    </div>

                    <div
                      className={cn(
                        "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                        dragActive ? "border-green-500 bg-green-500/10" : "border-border/50 hover:border-border",
                      )}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg font-medium mb-2">{t.dragDrop}</p>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileInput}
                        className="hidden"
                        id="documents-upload"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                      <Button variant="outline" onClick={() => document.getElementById("documents-upload")?.click()}>
                        <Upload className="w-4 h-4 mr-2" />
                        {t.uploadFile}
                      </Button>
                    </div>

                    {formData.documentsUploaded.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Uploaded Documents:</h4>
                        {formData.documentsUploaded.map((file, index) => (
                          <div key={index} className="flex items-center space-x-2 p-2 bg-muted/50 rounded">
                            <FileText className="w-4 h-4" />
                            <span className="text-sm">{file.name}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <Button
                      className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                      disabled={formData.documentsUploaded.length === 0}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {t.submitToUwv}
                    </Button>
                  </div>
                )}

                {/* Step 9: UWV Check */}
                {currentStep === 9 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <CheckCircle className="w-16 h-16 mx-auto text-blue-600" />
                      <h3 className="text-xl font-semibold">{t.uwvCheck}</h3>
                      <p className="text-muted-foreground">{t.uwvCheckDescription}</p>
                    </div>

                    <RadioGroup
                      value={formData.uwvCheckComplete}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, uwvCheckComplete: value }))}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-3 p-6 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="complete" id="check-complete" />
                        <Label htmlFor="check-complete" className="flex-1 cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                            <div>
                              <p className="font-medium">complete</p>
                              <p className="text-sm text-muted-foreground">All documents are complete</p>
                            </div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 p-6 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="incomplete" id="check-incomplete" />
                        <Label htmlFor="check-incomplete" className="flex-1 cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <AlertCircle className="w-6 h-6 text-orange-600" />
                            <div>
                              <p className="font-medium">{t.incomplete}</p>
                              <p className="text-sm text-muted-foreground">Missing documents identified</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>

                    {formData.uwvCheckComplete === "incomplete" && (
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>{t.uwvRequestInfo}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}

                {/* Step 10: UWV Processing */}
                {currentStep === 10 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <Clock className="w-16 h-16 mx-auto text-purple-600" />
                      <h3 className="text-xl font-semibold">{t.uwvProcess}</h3>
                      <p className="text-muted-foreground">{t.uwvProcessDescription}</p>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
                      <div className="flex items-center space-x-4 mb-4">
                        <Clock className="w-8 h-8 text-purple-600" />
                        <div>
                          <h4 className="font-medium">{t.timeline5Weeks}</h4>
                          <p className="text-sm text-muted-foreground">
                            Standard processing time for complete applications
                          </p>
                        </div>
                      </div>

                      {/* Animated timeline */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Application submitted</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Completeness check passed</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                          <span className="text-sm">Under review by UWV</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                          <span className="text-sm text-muted-foreground">Decision pending</span>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full bg-transparent">
                      <Calendar className="w-4 h-4 mr-2" />
                      {t.viewStatus}
                    </Button>
                  </div>
                )}

                {/* Step 11: Application Result */}
                {currentStep === 11 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-semibold">{t.applicationResult}</h3>
                      <p className="text-muted-foreground">{t.resultDescription}</p>
                    </div>

                    <RadioGroup
                      value={formData.applicationApproved}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, applicationApproved: value }))}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-3 p-6 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="yes" id="approved-yes" />
                        <Label htmlFor="approved-yes" className="flex-1 cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                            <div>
                              <p className="font-medium">{t.approved}</p>
                              <p className="text-sm text-muted-foreground">TWV application approved</p>
                            </div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 p-6 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="no" id="approved-no" />
                        <Label htmlFor="approved-no" className="flex-1 cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <AlertCircle className="w-6 h-6 text-red-600" />
                            <div>
                              <p className="font-medium">{t.rejected}</p>
                              <p className="text-sm text-muted-foreground">Application was not approved</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>

                    {formData.applicationApproved === "yes" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-4 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20"
                      >
                        <CheckCircle className="w-16 h-16 mx-auto text-green-600" />
                        <h4 className="text-xl font-semibold text-green-700">{t.permitGranted}</h4>
                        <p className="text-muted-foreground">{t.permitGrantedDescription}</p>
                        <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
                          <Download className="w-4 h-4 mr-2" />
                          {t.downloadPermit}
                        </Button>
                      </motion.div>
                    )}

                    {formData.applicationApproved === "no" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-4 p-6 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg border border-red-500/20"
                      >
                        <AlertCircle className="w-16 h-16 mx-auto text-red-600" />
                        <h4 className="text-xl font-semibold text-red-700">{t.fileObjection}</h4>
                        <p className="text-muted-foreground">{t.objectionDescription}</p>
                        <Button
                          variant="outline"
                          className="border-red-500 text-red-600 hover:bg-red-50 bg-transparent"
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          {t.contactHelp}
                        </Button>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t border-border/50">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="px-8 bg-transparent"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t.back}
                  </Button>

                  <Button
                    onClick={handleNext}
                    disabled={
                      (currentStep === 1 && !formData.wantToHire) ||
                      (currentStep === 4 && !formData.applicantType) ||
                      (currentStep === 5 && !formData.ketenmachtigingFile) ||
                      (currentStep === 6 && !formData.documentsGathered) ||
                      (currentStep === 7 && !formData.vacancyPosted) ||
                      (currentStep === 8 && formData.documentsUploaded.length === 0) ||
                      (currentStep === 9 && !formData.uwvCheckComplete) ||
                      (currentStep === 11 && !formData.applicationApproved)
                    }
                    className="px-8 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                  >
                    {getNextStep() ? (
                      <>
                        {t.next}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    ) : (
                      t.complete
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
}
