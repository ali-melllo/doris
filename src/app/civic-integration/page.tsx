"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  GraduationCap,
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  BookOpen,
  Calendar,
  Users,
  Award,
  Clock,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Bot,
  Globe,
  ChevronDown,
  Info,
  Download,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
    title: "Civic Integration Process",
    subtitle: "Get your Inburgeringsdiploma",
    startQuestion: "Do you need to get an Inburgeringsdiploma?",
    yes: "Yes",
    no: "No",
    back: "Back",
    next: "Next",
    complete: "Complete",
    register: "Register via Mijn Inburgering / DUO",
    registerDescription: "Start your civic integration journey through the official portal",
    exemptionQuestion: "Do you qualify for exemption or dispensation?",
    exemptionDescription: "Some people may be exempt from civic integration requirements",
    uploadDocuments: "Upload Supporting Documents",
    uploadDescription: "Upload documents that prove your exemption eligibility",
    notes: "Additional Notes",
    notesPlaceholder: "Add any additional information about your exemption request...",
    followUp: "Follow up with municipality/DUO",
    followUpDescription: "Contact your local municipality or DUO for status updates",
    duoLetter: "You will receive a letter from DUO",
    duoLetterDescription: "DUO will send you information about your appointment and next steps",
    pipOverview: "PIP Plan Overview",
    pipDescription: "Your Personal Integration Plan details",
    chooseLearningTrack: "Choose Your Learning Track",
    trackB1: "B1 Dutch Language",
    trackEducation: "Education Track",
    trackSelfReliance: "Self-Reliance Track",
    prepareExams: "Prepare for Exams",
    prepareDescription: "You have maximum 3 years to complete all requirements",
    studyResources: "Study Resources",
    registerExams: "Register for Exams",
    takeExams: "Take Required Exams",
    examReading: "Reading",
    examListening: "Listening",
    examWriting: "Writing",
    examSpeaking: "Speaking",
    examKNM: "Knowledge of Dutch Society (KNM)",
    examONA: "Orientation on the Dutch Labor Market (ONA)",
    passedAll: "Did you pass all exam parts?",
    diplomaIssued: "Congratulations! Your diploma has been issued",
    retakeExams: "Retake Failed Sections",
    selectRetake: "Select which sections you need to retake",
    processing: "Processing...",
    success: "Success!",
    error: "Error occurred",
    helpTooltip: "Need help? Chat with Doris AI",
    approved: "Approved",
    pending: "Pending",
    rejected: "Rejected",
    uploadFile: "Upload File",
    dragDrop: "Drag and drop files here, or click to select",
    fileUploaded: "File uploaded successfully",
    contactMunicipality: "Contact Municipality",
    contactDUO: "Contact DUO",
    viewResources: "View Study Resources",
    scheduleAppointment: "Schedule Appointment",
    downloadCertificate: "Download Certificate",
  },
  nl: {
    title: "Inburgeringsproces",
    subtitle: "Haal je Inburgeringsdiploma",
    startQuestion: "Moet je een Inburgeringsdiploma halen?",
    yes: "Ja",
    no: "Nee",
    back: "Terug",
    next: "Volgende",
    complete: "Voltooien",
    register: "Registreer via Mijn Inburgering / DUO",
    registerDescription: "Begin je inburgeringstraject via het officiële portaal",
    exemptionQuestion: "Kom je in aanmerking voor vrijstelling of ontheffing?",
    exemptionDescription: "Sommige mensen kunnen vrijgesteld zijn van inburgeringseisen",
    uploadDocuments: "Upload Ondersteunende Documenten",
    uploadDescription: "Upload documenten die je vrijstellingsaanvraag ondersteunen",
    notes: "Aanvullende Opmerkingen",
    notesPlaceholder: "Voeg aanvullende informatie toe over je vrijstellingsverzoek...",
    followUp: "Volg op met gemeente/DUO",
    followUpDescription: "Neem contact op met je gemeente of DUO voor statusupdates",
    duoLetter: "Je ontvangt een brief van DUO",
    duoLetterDescription: "DUO stuurt je informatie over je afspraak en volgende stappen",
    pipOverview: "PIP Plan Overzicht",
    pipDescription: "Details van je Persoonlijk Integratieplan",
    chooseLearningTrack: "Kies Je Leerroute",
    trackB1: "B1 Nederlandse Taal",
    trackEducation: "Onderwijsroute",
    trackSelfReliance: "Zelfredzaamheidsroute",
    prepareExams: "Bereid Je Voor op Examens",
    prepareDescription: "Je hebt maximaal 3 jaar om alle eisen te voltooien",
    studyResources: "Studiemateriaal",
    registerExams: "Registreer voor Examens",
    takeExams: "Doe Vereiste Examens",
    examReading: "Lezen",
    examListening: "Luisteren",
    examWriting: "Schrijven",
    examSpeaking: "Spreken",
    examKNM: "Kennis van de Nederlandse Maatschappij (KNM)",
    examONA: "Oriëntatie op de Nederlandse Arbeidsmarkt (ONA)",
    passedAll: "Ben je voor alle examendelen geslaagd?",
    diplomaIssued: "Gefeliciteerd! Je diploma is uitgereikt",
    retakeExams: "Herdoe Gefaalde Onderdelen",
    selectRetake: "Selecteer welke onderdelen je opnieuw moet doen",
    processing: "Verwerken...",
    success: "Succes!",
    error: "Er is een fout opgetreden",
    helpTooltip: "Hulp nodig? Chat met Doris AI",
    approved: "Goedgekeurd",
    pending: "In behandeling",
    rejected: "Afgewezen",
    uploadFile: "Bestand Uploaden",
    dragDrop: "Sleep bestanden hierheen, of klik om te selecteren",
    fileUploaded: "Bestand succesvol geüpload",
    contactMunicipality: "Contact Gemeente",
    contactDUO: "Contact DUO",
    viewResources: "Bekijk Studiemateriaal",
    scheduleAppointment: "Plan Afspraak",
    downloadCertificate: "Download Certificaat",
  },
  fr: {
    title: "Processus d'Intégration Civique",
    subtitle: "Obtenez votre diplôme d'intégration",
    startQuestion: "Avez-vous besoin d'obtenir un diplôme d'intégration ?",
    yes: "Oui",
    no: "Non",
    back: "Retour",
    next: "Suivant",
    complete: "Terminer",
    register: "S'inscrire via Mijn Inburgering / DUO",
    registerDescription: "Commencez votre parcours d'intégration via le portail officiel",
    exemptionQuestion: "Êtes-vous éligible à une exemption ou dispense ?",
    exemptionDescription: "Certaines personnes peuvent être exemptées des exigences d'intégration",
    uploadDocuments: "Télécharger les Documents Justificatifs",
    uploadDescription: "Téléchargez les documents qui prouvent votre éligibilité à l'exemption",
    notes: "Notes Supplémentaires",
    notesPlaceholder: "Ajoutez des informations supplémentaires sur votre demande d'exemption...",
    followUp: "Suivi avec la municipalité/DUO",
    followUpDescription: "Contactez votre municipalité locale ou DUO pour les mises à jour",
    duoLetter: "Vous recevrez une lettre de DUO",
    duoLetterDescription: "DUO vous enverra des informations sur votre rendez-vous et les prochaines étapes",
    pipOverview: "Aperçu du Plan PIP",
    pipDescription: "Détails de votre Plan d'Intégration Personnel",
    chooseLearningTrack: "Choisissez Votre Parcours d'Apprentissage",
    trackB1: "Langue Néerlandaise B1",
    trackEducation: "Parcours Éducatif",
    trackSelfReliance: "Parcours d'Autonomie",
    prepareExams: "Préparez-vous aux Examens",
    prepareDescription: "Vous avez maximum 3 ans pour compléter toutes les exigences",
    studyResources: "Ressources d'Étude",
    registerExams: "S'inscrire aux Examens",
    takeExams: "Passer les Examens Requis",
    examReading: "Lecture",
    examListening: "Écoute",
    examWriting: "Écriture",
    examSpeaking: "Expression Orale",
    examKNM: "Connaissance de la Société Néerlandaise (KNM)",
    examONA: "Orientation sur le Marché du Travail Néerlandais (ONA)",
    passedAll: "Avez-vous réussi toutes les parties de l'examen ?",
    diplomaIssued: "Félicitations ! Votre diplôme a été délivré",
    retakeExams: "Repasser les Sections Échouées",
    selectRetake: "Sélectionnez les sections que vous devez repasser",
    processing: "Traitement...",
    success: "Succès !",
    error: "Une erreur s'est produite",
    helpTooltip: "Besoin d'aide ? Chattez avec Doris AI",
    approved: "Approuvé",
    pending: "En attente",
    rejected: "Rejeté",
    uploadFile: "Télécharger le Fichier",
    dragDrop: "Glissez-déposez les fichiers ici, ou cliquez pour sélectionner",
    fileUploaded: "Fichier téléchargé avec succès",
    contactMunicipality: "Contacter la Municipalité",
    contactDUO: "Contacter DUO",
    viewResources: "Voir les Ressources d'Étude",
    scheduleAppointment: "Planifier un Rendez-vous",
    downloadCertificate: "Télécharger le Certificat",
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
  needsDiploma: string
  hasExemption: string
  exemptionDocuments: File[]
  exemptionNotes: string
  learningTrack: string
  examsPassed: string[]
  allExamsPassed: string
  retakeExams: string[]
}

export default function CivicIntegrationPage() {
  const router = useRouter()
  const isMobile = useMediaQuery("(max-width: 768px)")

  const [currentStep, setCurrentStep] = useState(1)
  const [language, setLanguage] = useState("en")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAssistant, setShowAssistant] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    needsDiploma: "",
    hasExemption: "",
    exemptionDocuments: [],
    exemptionNotes: "",
    learningTrack: "",
    examsPassed: [],
    allExamsPassed: "",
    retakeExams: [],
  })

  // Initialize language
  useEffect(() => {
    const detectedLang = detectLanguage()
    setLanguage(detectedLang)
  }, [])

  const t = translations[language as keyof typeof translations]

  // Step configuration with branching logic
  const getSteps = () => {
    const baseSteps = [{ id: 1, title: "Start", description: t.startQuestion, icon: GraduationCap }]

    if (formData.needsDiploma === "yes") {
      baseSteps.push(
        { id: 2, title: "Register", description: t.register, icon: FileText },
        { id: 3, title: "Exemption", description: t.exemptionQuestion, icon: AlertCircle },
      )

      if (formData.hasExemption === "yes") {
        baseSteps.push(
          { id: 4, title: "Documents", description: t.uploadDocuments, icon: Upload },
          { id: 5, title: "Follow Up", description: t.followUp, icon: Mail },
        )
      } else if (formData.hasExemption === "no") {
        baseSteps.push(
          { id: 6, title: "DUO Letter", description: t.duoLetter, icon: Mail },
          { id: 7, title: "PIP Plan", description: t.pipOverview, icon: FileText },
          { id: 8, title: "Learning Track", description: t.chooseLearningTrack, icon: BookOpen },
          { id: 9, title: "Prepare", description: t.prepareExams, icon: Clock },
          { id: 10, title: "Register Exams", description: t.registerExams, icon: Calendar },
          { id: 11, title: "Take Exams", description: t.takeExams, icon: Award },
          { id: 12, title: "Results", description: t.passedAll, icon: CheckCircle },
        )

        if (formData.allExamsPassed === "no") {
          baseSteps.push({ id: 13, title: "Retake", description: t.retakeExams, icon: AlertCircle })
        }
      }
    }

    return baseSteps
  }

  const steps = getSteps()
  const currentStepData = steps.find((step) => step.id === currentStep)

  // Navigation logic
  const getNextStep = () => {
    if (currentStep === 1 && formData.needsDiploma === "no") {
      return null // End flow
    }
    if (currentStep === 3 && formData.hasExemption === "yes") {
      return 4
    }
    if (currentStep === 3 && formData.hasExemption === "no") {
      return 6
    }
    if (currentStep === 5) {
      return null // End exemption flow
    }
    if (currentStep === 12 && formData.allExamsPassed === "yes") {
      return null // End successful flow
    }
    if (currentStep === 12 && formData.allExamsPassed === "no") {
      return 13
    }

    const nextStepIndex = steps.findIndex((step) => step.id === currentStep) + 1
    return nextStepIndex < steps.length ? steps[nextStepIndex].id : null
  }

  const handleNext = () => {
    const nextStep = getNextStep()
    if (nextStep) {
      setCurrentStep(nextStep)
    } else {
      toast("Process completed successfully!")
    }
  }

  const handleBack = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id)
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
      setFormData((prev) => ({
        ...prev,
        exemptionDocuments: [...prev.exemptionDocuments, ...files],
      }))
      toast(t.success)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setFormData((prev) => ({
        ...prev,
        exemptionDocuments: [...prev.exemptionDocuments, ...files],
      }))
      toast(t.success)
    }
  }

  // Animated Background
  const AnimatedBackground = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="civic-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-blue-500/20"
              />
            </pattern>
            <linearGradient id="civicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.1" />
              <stop offset="50%" stopColor="rgb(147, 51, 234)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgb(236, 72, 153)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#civic-grid)" />
          <rect width="100%" height="100%" fill="url(#civicGradient)" />
        </svg>
      </div>

      {/* Floating Elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl"
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
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-white" />
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
        className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-2xl"
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
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
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
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
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
                      value={formData.needsDiploma}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, needsDiploma: value }))}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-3 p-6 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="yes" id="yes" />
                        <Label htmlFor="yes" className="flex-1 cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                            <div>
                              <p className="font-medium">{t.yes}</p>
                              <p className="text-sm text-muted-foreground">I need to get my diploma</p>
                            </div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 p-6 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="no" id="no" />
                        <Label htmlFor="no" className="flex-1 cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <AlertCircle className="w-6 h-6 text-red-600" />
                            <div>
                              <p className="font-medium">{t.no}</p>
                              <p className="text-sm text-muted-foreground">I don't need this diploma</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Step 2: Register */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div className="space-y-4 flex-1">
                          <div>
                            <h4 className="font-semibold mb-2">{t.register}</h4>
                            <p className="text-sm text-muted-foreground mb-4">{t.registerDescription}</p>
                          </div>
                          <Button
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                            onClick={() => window.open("https://mijn.inburgering.nl", "_blank")}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Open Mijn Inburgering
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Exemption Question */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-semibold">{t.exemptionQuestion}</h3>
                      <p className="text-muted-foreground">{t.exemptionDescription}</p>
                    </div>

                    <RadioGroup
                      value={formData.hasExemption}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, hasExemption: value }))}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-3 p-6 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="yes" id="exemption-yes" />
                        <Label htmlFor="exemption-yes" className="flex-1 cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                            <div>
                              <p className="font-medium">{t.yes}</p>
                              <p className="text-sm text-muted-foreground">I qualify for exemption</p>
                            </div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 p-6 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="no" id="exemption-no" />
                        <Label htmlFor="exemption-no" className="flex-1 cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <AlertCircle className="w-6 h-6 text-orange-600" />
                            <div>
                              <p className="font-medium">{t.no}</p>
                              <p className="text-sm text-muted-foreground">I need to complete the process</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Step 4: Upload Documents */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-semibold">{t.uploadDocuments}</h3>
                      <p className="text-muted-foreground">{t.uploadDescription}</p>
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
                        multiple
                        onChange={handleFileInput}
                        className="hidden"
                        id="file-upload"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                      <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                        <Upload className="w-4 h-4 mr-2" />
                        {t.uploadFile}
                      </Button>
                    </div>

                    {formData.exemptionDocuments.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Uploaded Files:</h4>
                        {formData.exemptionDocuments.map((file, index) => (
                          <div key={index} className="flex items-center space-x-2 p-2 bg-muted/50 rounded">
                            <FileText className="w-4 h-4" />
                            <span className="text-sm">{file.name}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="space-y-4">
                      <Label htmlFor="notes" className="text-base font-medium">
                        {t.notes}
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder={t.notesPlaceholder}
                        value={formData.exemptionNotes}
                        onChange={(e) => setFormData((prev) => ({ ...prev, exemptionNotes: e.target.value }))}
                        className="min-h-24 bg-background/50 backdrop-blur-sm"
                      />
                    </div>
                  </div>
                )}

                {/* Step 5: Follow Up */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <CheckCircle className="w-16 h-16 mx-auto text-green-600" />
                      <h3 className="text-xl font-semibold">{t.followUp}</h3>
                      <p className="text-muted-foreground">{t.followUpDescription}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <MapPin className="w-5 h-5 text-blue-600" />
                          <h4 className="font-medium">{t.contactMunicipality}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Contact your local municipality for status updates
                        </p>
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          <Phone className="w-4 h-4 mr-2" />
                          Contact
                        </Button>
                      </Card>

                      <Card className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <FileText className="w-5 h-5 text-purple-600" />
                          <h4 className="font-medium">{t.contactDUO}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Contact DUO for application status</p>
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          <Mail className="w-4 h-4 mr-2" />
                          Contact DUO
                        </Button>
                      </Card>
                    </div>
                  </div>
                )}

                {/* Step 6: DUO Letter */}
                {currentStep === 6 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <Mail className="w-16 h-16 mx-auto text-blue-600" />
                      <h3 className="text-xl font-semibold">{t.duoLetter}</h3>
                      <p className="text-muted-foreground">{t.duoLetterDescription}</p>
                    </div>

                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        You will receive important information about your appointment and next steps via mail. Keep an
                        eye on your mailbox and email.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                {/* Step 7: PIP Plan Overview */}
                {currentStep === 7 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-semibold">{t.pipOverview}</h3>
                      <p className="text-muted-foreground">{t.pipDescription}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="p-4 text-center">
                        <FileText className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                        <h4 className="font-medium mb-1">PIP Plan</h4>
                        <p className="text-sm text-muted-foreground">Personal Integration Plan</p>
                        <Badge className="mt-2" variant="secondary">
                          {t.approved}
                        </Badge>
                      </Card>

                      <Card className="p-4 text-center">
                        <BookOpen className="w-8 h-8 mx-auto mb-2 text-green-600" />
                        <h4 className="font-medium mb-1">Learning Track</h4>
                        <p className="text-sm text-muted-foreground">To be selected</p>
                        <Badge className="mt-2" variant="outline">
                          {t.pending}
                        </Badge>
                      </Card>

                      <Card className="p-4 text-center">
                        <Calendar className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                        <h4 className="font-medium mb-1">Start Date</h4>
                        <p className="text-sm text-muted-foreground">Within 2 weeks</p>
                        <Badge className="mt-2" variant="secondary">
                          {t.pending}
                        </Badge>
                      </Card>
                    </div>
                  </div>
                )}

                {/* Step 8: Choose Learning Track */}
                {currentStep === 8 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-semibold">{t.chooseLearningTrack}</h3>
                    </div>

                    <RadioGroup
                      value={formData.learningTrack}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, learningTrack: value }))}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-3 p-6 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="b1" id="track-b1" />
                        <Label htmlFor="track-b1" className="flex-1 cursor-pointer">
                          <div className="flex items-center space-x-4">
                            <BookOpen className="w-8 h-8 text-blue-600" />
                            <div>
                              <p className="font-medium">{t.trackB1}</p>
                              <p className="text-sm text-muted-foreground">Focus on Dutch language skills</p>
                            </div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 p-6 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="education" id="track-education" />
                        <Label htmlFor="track-education" className="flex-1 cursor-pointer">
                          <div className="flex items-center space-x-4">
                            <GraduationCap className="w-8 h-8 text-green-600" />
                            <div>
                              <p className="font-medium">{t.trackEducation}</p>
                              <p className="text-sm text-muted-foreground">Educational pathway</p>
                            </div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 p-6 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="self-reliance" id="track-self-reliance" />
                        <Label htmlFor="track-self-reliance" className="flex-1 cursor-pointer">
                          <div className="flex items-center space-x-4">
                            <Users className="w-8 h-8 text-purple-600" />
                            <div>
                              <p className="font-medium">{t.trackSelfReliance}</p>
                              <p className="text-sm text-muted-foreground">Focus on independence and participation</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Step 9: Prepare for Exams */}
                {currentStep === 9 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <Clock className="w-16 h-16 mx-auto text-blue-600" />
                      <h3 className="text-xl font-semibold">{t.prepareExams}</h3>
                      <p className="text-muted-foreground">{t.prepareDescription}</p>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                      <h4 className="font-semibold mb-4">{t.studyResources}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
                          <BookOpen className="w-5 h-5 mr-3" />
                          <div className="text-left">
                            <p className="font-medium">Online Courses</p>
                            <p className="text-sm text-muted-foreground">Interactive learning modules</p>
                          </div>
                        </Button>

                        <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
                          <Download className="w-5 h-5 mr-3" />
                          <div className="text-left">
                            <p className="font-medium">Study Materials</p>
                            <p className="text-sm text-muted-foreground">Download practice tests</p>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 10: Register for Exams */}
                {currentStep === 10 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <Calendar className="w-16 h-16 mx-auto text-green-600" />
                      <h3 className="text-xl font-semibold">{t.registerExams}</h3>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div className="space-y-4 flex-1">
                          <div>
                            <h4 className="font-semibold mb-2">Register on DUO Portal</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                              Schedule your exams through the official DUO portal
                            </p>
                          </div>
                          <Button
                            className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                            onClick={() => window.open("https://duo.nl", "_blank")}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Open DUO Portal
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 11: Take Exams */}
                {currentStep === 11 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <Award className="w-16 h-16 mx-auto text-purple-600" />
                      <h3 className="text-xl font-semibold">{t.takeExams}</h3>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Required Exams:</h4>
                      {[
                        { id: "reading", label: t.examReading, icon: BookOpen },
                        { id: "listening", label: t.examListening, icon: Users },
                        { id: "writing", label: t.examWriting, icon: FileText },
                        { id: "speaking", label: t.examSpeaking, icon: MessageCircle },
                        { id: "knm", label: t.examKNM, icon: GraduationCap },
                        { id: "ona", label: t.examONA, icon: Users },
                      ].map((exam) => (
                        <div
                          key={exam.id}
                          className="flex items-center space-x-3 p-4 rounded-lg border border-border/50"
                        >
                          <Checkbox
                            id={exam.id}
                            checked={formData.examsPassed.includes(exam.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData((prev) => ({
                                  ...prev,
                                  examsPassed: [...prev.examsPassed, exam.id],
                                }))
                              } else {
                                setFormData((prev) => ({
                                  ...prev,
                                  examsPassed: prev.examsPassed.filter((id) => id !== exam.id),
                                }))
                              }
                            }}
                          />
                          <exam.icon className="w-5 h-5 text-muted-foreground" />
                          <Label htmlFor={exam.id} className="flex-1 cursor-pointer">
                            {exam.label}
                          </Label>
                          {formData.examsPassed.includes(exam.id) && <CheckCircle className="w-5 h-5 text-green-600" />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 12: Results */}
                {currentStep === 12 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-semibold">{t.passedAll}</h3>
                    </div>

                    <RadioGroup
                      value={formData.allExamsPassed}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, allExamsPassed: value }))}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-3 p-6 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="yes" id="passed-yes" />
                        <Label htmlFor="passed-yes" className="flex-1 cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                            <div>
                              <p className="font-medium">{t.yes}</p>
                              <p className="text-sm text-muted-foreground">All exams passed!</p>
                            </div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 p-6 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="no" id="passed-no" />
                        <Label htmlFor="passed-no" className="flex-1 cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <AlertCircle className="w-6 h-6 text-orange-600" />
                            <div>
                              <p className="font-medium">{t.no}</p>
                              <p className="text-sm text-muted-foreground">Need to retake some parts</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>

                    {formData.allExamsPassed === "yes" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-4 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20"
                      >
                        <Award className="w-16 h-16 mx-auto text-green-600" />
                        <h4 className="text-xl font-semibold text-green-700">{t.diplomaIssued}</h4>
                        <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
                          <Download className="w-4 h-4 mr-2" />
                          {t.downloadCertificate}
                        </Button>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Step 13: Retake Exams */}
                {currentStep === 13 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <AlertCircle className="w-16 h-16 mx-auto text-orange-600" />
                      <h3 className="text-xl font-semibold">{t.retakeExams}</h3>
                      <p className="text-muted-foreground">{t.selectRetake}</p>
                    </div>

                    <div className="space-y-4">
                      {[
                        { id: "reading", label: t.examReading, icon: BookOpen },
                        { id: "listening", label: t.examListening, icon: Users },
                        { id: "writing", label: t.examWriting, icon: FileText },
                        { id: "speaking", label: t.examSpeaking, icon: MessageCircle },
                        { id: "knm", label: t.examKNM, icon: GraduationCap },
                        { id: "ona", label: t.examONA, icon: Users },
                      ].map((exam) => (
                        <div
                          key={exam.id}
                          className="flex items-center space-x-3 p-4 rounded-lg border border-border/50"
                        >
                          <Checkbox
                            id={`retake-${exam.id}`}
                            checked={formData.retakeExams.includes(exam.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData((prev) => ({
                                  ...prev,
                                  retakeExams: [...prev.retakeExams, exam.id],
                                }))
                              } else {
                                setFormData((prev) => ({
                                  ...prev,
                                  retakeExams: prev.retakeExams.filter((id) => id !== exam.id),
                                }))
                              }
                            }}
                          />
                          <exam.icon className="w-5 h-5 text-muted-foreground" />
                          <Label htmlFor={`retake-${exam.id}`} className="flex-1 cursor-pointer">
                            {exam.label}
                          </Label>
                        </div>
                      ))}
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                      disabled={formData.retakeExams.length === 0}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      {t.scheduleAppointment}
                    </Button>
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
                      (currentStep === 1 && !formData.needsDiploma) ||
                      (currentStep === 3 && !formData.hasExemption) ||
                      (currentStep === 8 && !formData.learningTrack) ||
                      (currentStep === 12 && !formData.allExamsPassed)
                    }
                    className="px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
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
