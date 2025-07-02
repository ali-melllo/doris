"use client"

import React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  Globe,
  Play,
  FileText,
  HelpCircle,
  Stethoscope,
  Scale,
  Home,
  Building2,
  MapPin,
  Calendar,
  Check,
  MessageCircle,
  Bot,
  ChevronDown,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { toast } from "sonner"

// Countries data with flags - including USA, France, Netherlands
const countries = [
  { code: "US", name: "United States", flag: "🇺🇸", languages: ["en"] },
  { code: "FR", name: "France", flag: "🇫🇷", languages: ["fr"] },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", languages: ["nl", "en"] },
  { code: "AF", name: "Afghanistan", flag: "🇦🇫", languages: ["fa", "ps"] },
  { code: "SY", name: "Syria", flag: "🇸🇾", languages: ["ar"] },
  { code: "IQ", name: "Iraq", flag: "🇮🇶", languages: ["ar", "ku"] },
  { code: "IR", name: "Iran", flag: "🇮🇷", languages: ["fa"] },
  { code: "SO", name: "Somalia", flag: "🇸🇴", languages: ["so", "ar"] },
  { code: "ER", name: "Eritrea", flag: "🇪🇷", languages: ["ti", "ar"] },
  { code: "ET", name: "Ethiopia", flag: "🇪🇹", languages: ["am", "en"] },
  { code: "SD", name: "Sudan", flag: "🇸🇩", languages: ["ar"] },
  { code: "YE", name: "Yemen", flag: "🇾🇪", languages: ["ar"] },
  { code: "LB", name: "Lebanon", flag: "🇱🇧", languages: ["ar", "fr"] },
  { code: "JO", name: "Jordan", flag: "🇯🇴", languages: ["ar"] },
  { code: "EG", name: "Egypt", flag: "🇪🇬", languages: ["ar"] },
  { code: "MA", name: "Morocco", flag: "🇲🇦", languages: ["ar", "fr"] },
  { code: "DZ", name: "Algeria", flag: "🇩🇿", languages: ["ar", "fr"] },
  { code: "TN", name: "Tunisia", flag: "🇹🇳", languages: ["ar", "fr"] },
  { code: "LY", name: "Libya", flag: "🇱🇾", languages: ["ar"] },
  { code: "TR", name: "Turkey", flag: "🇹🇷", languages: ["tr"] },
  { code: "PK", name: "Pakistan", flag: "🇵🇰", languages: ["ur", "en"] },
  { code: "BD", name: "Bangladesh", flag: "🇧🇩", languages: ["bn", "en"] },
  { code: "MM", name: "Myanmar", flag: "🇲🇲", languages: ["my", "en"] },
  { code: "VE", name: "Venezuela", flag: "🇻🇪", languages: ["es"] },
  { code: "CO", name: "Colombia", flag: "🇨🇴", languages: ["es"] },
  { code: "HN", name: "Honduras", flag: "🇭🇳", languages: ["es"] },
  { code: "GT", name: "Guatemala", flag: "🇬🇹", languages: ["es"] },
  { code: "SV", name: "El Salvador", flag: "🇸🇻", languages: ["es"] },
  { code: "NI", name: "Nicaragua", flag: "🇳🇮", languages: ["es"] },
  { code: "CU", name: "Cuba", flag: "🇨🇺", languages: ["es"] },
  { code: "HT", name: "Haiti", flag: "🇭🇹", languages: ["ht", "fr"] },
  { code: "UA", name: "Ukraine", flag: "🇺🇦", languages: ["uk", "ru"] },
  { code: "BY", name: "Belarus", flag: "🇧🇾", languages: ["be", "ru"] },
  { code: "RU", name: "Russia", flag: "🇷🇺", languages: ["ru"] },
  { code: "CN", name: "China", flag: "🇨🇳", languages: ["zh"] },
  { code: "KP", name: "North Korea", flag: "🇰🇵", languages: ["ko"] },
  { code: "VN", name: "Vietnam", flag: "🇻🇳", languages: ["vi"] },
  { code: "LA", name: "Laos", flag: "🇱🇦", languages: ["lo"] },
  { code: "KH", name: "Cambodia", flag: "🇰🇭", languages: ["km"] },
  { code: "TH", name: "Thailand", flag: "🇹🇭", languages: ["th"] },
  { code: "IN", name: "India", flag: "🇮🇳", languages: ["hi", "en"] },
  { code: "LK", name: "Sri Lanka", flag: "🇱🇰", languages: ["si", "ta"] },
  { code: "NP", name: "Nepal", flag: "🇳🇵", languages: ["ne"] },
  { code: "BT", name: "Bhutan", flag: "🇧🇹", languages: ["dz"] },
]

// Dutch cities
const dutchCities = [
  "Amsterdam",
  "Rotterdam",
  "The Hague",
  "Utrecht",
  "Eindhoven",
  "Groningen",
  "Tilburg",
  "Almere",
  "Breda",
  "Nijmegen",
  "Enschede",
  "Haarlem",
  "Arnhem",
  "Zaanstad",
  "Amersfoort",
  "Apeldoorn",
  "Hoofddorp",
  "Maastricht",
  "Leiden",
  "Dordrecht",
  "Zoetermeer",
  "Zwolle",
  "Deventer",
  "Delft",
  "Alkmaar",
  "Leeuwarden",
]

// Time slots
const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
]

// Translations - Added French and Dutch
const translations: Record<string, any> = {
  en: {
    steps: [
      { id: 1, title: "Origin", description: "Where are you from?", icon: Globe },
      { id: 2, title: "Introduction", description: "Watch introduction video", icon: Play },
      { id: 3, title: "IND Registration", description: "Start your registration", icon: FileText },
      { id: 4, title: "Questions", description: "Ask about IND process", icon: HelpCircle },
      { id: 5, title: "Medical Exam", description: "Medical examination status", icon: Stethoscope },
      { id: 6, title: "Legal Help", description: "Request lawyer assistance", icon: Scale },
      { id: 7, title: "Housing", description: "Do you have a place to live?", icon: Home },
      { id: 8, title: "COA Request", description: "Submit COA request", icon: Building2 },
      { id: 9, title: "City Selection", description: "Choose your city", icon: MapPin },
      { id: 10, title: "Appointment", description: "Select date and time", icon: Calendar },
    ],
    welcome: "Welcome to Netherlands Immigration Support",
    selectCountry: "Select your country of origin",
    searchCountry: "Search countries...",
    noCountryFound: "No country found.",
    introVideo: "Introduction Video",
    videoDescription: "Learn about the immigration process in the Netherlands",
    watchVideo: "Watch Introduction Video",
    indRegistration: "IND Registration",
    indDescription:
      "The Immigration and Naturalisation Service (IND) handles all residence permit applications in the Netherlands.",
    startRegistration: "Start IND Registration",
    questionsTitle: "Questions about IND Registration",
    questionsPlaceholder:
      "Type your questions about the IND registration process, required documents, or any concerns you may have...",
    questionsHelper: "Our immigration experts will review your questions and provide personalized guidance.",
    medicalExam: "Medical Examination",
    medicalDescription: "Have you completed your medical examination?",
    medicalYes: "Yes, completed",
    medicalNo: "No, not yet",
    medicalNotYet: "Scheduled but not completed",
    legalHelp: "Request Legal Assistance",
    legalDescription: "Get professional legal help with your immigration case",
    legalBenefits: [
      "Expert guidance on immigration law",
      "Document preparation assistance",
      "Representation in legal proceedings",
      "24/7 support during your case",
    ],
    requestLawyer: "Request Legal Help",
    housingTitle: "Housing Situation",
    housingDescription: "Do you have a place to live in the Netherlands?",
    housingYes: "Yes, I have housing",
    housingNo: "No, I need housing assistance",
    housingAddress: "Enter your address (optional)",
    coaRequest: "COA Request",
    coaDescription: "The Central Agency for the Reception of Asylum Seekers (COA) provides accommodation and support.",
    submitCOA: "Submit Request to COA",
    coaConfirm: "I understand and want to submit my COA request",
    citySelection: "Select Your City",
    cityDescription: "Choose the city where you want to live or have your appointment",
    searchCity: "Search cities...",
    noCityFound: "No city found.",
    appointmentTitle: "Schedule Appointment",
    appointmentDescription: "Select your preferred date and time for your appointment",
    selectDate: "Select Date",
    selectTime: "Select Time",
    confirmAppointment: "Confirm Appointment",
    back: "Back",
    next: "Next",
    complete: "Complete",
    skip: "Skip",
    optional: "Optional",
    required: "Required",
    processing: "Processing...",
    success: "Success!",
    error: "Error occurred",
    helpTooltip: "Need help? Click here to chat with our assistant",
  },
  fr: {
    steps: [
      { id: 1, title: "Origine", description: "D'où venez-vous ?", icon: Globe },
      { id: 2, title: "Introduction", description: "Regarder la vidéo d'introduction", icon: Play },
      { id: 3, title: "Inscription IND", description: "Commencer votre inscription", icon: FileText },
      { id: 4, title: "Questions", description: "Poser des questions sur le processus IND", icon: HelpCircle },
      { id: 5, title: "Examen médical", description: "Statut de l'examen médical", icon: Stethoscope },
      { id: 6, title: "Aide juridique", description: "Demander l'assistance d'un avocat", icon: Scale },
      { id: 7, title: "Logement", description: "Avez-vous un endroit où vivre ?", icon: Home },
      { id: 8, title: "Demande COA", description: "Soumettre une demande COA", icon: Building2 },
      { id: 9, title: "Sélection de ville", description: "Choisissez votre ville", icon: MapPin },
      { id: 10, title: "Rendez-vous", description: "Sélectionner la date et l'heure", icon: Calendar },
    ],
    welcome: "Bienvenue au Support d'Immigration des Pays-Bas",
    selectCountry: "Sélectionnez votre pays d'origine",
    searchCountry: "Rechercher des pays...",
    noCountryFound: "Aucun pays trouvé.",
    introVideo: "Vidéo d'Introduction",
    videoDescription: "Apprenez sur le processus d'immigration aux Pays-Bas",
    watchVideo: "Regarder la Vidéo d'Introduction",
    indRegistration: "Inscription IND",
    indDescription:
      "Le Service d'Immigration et de Naturalisation (IND) traite toutes les demandes de permis de séjour aux Pays-Bas.",
    startRegistration: "Commencer l'Inscription IND",
    questionsTitle: "Questions sur l'Inscription IND",
    questionsPlaceholder:
      "Tapez vos questions sur le processus d'inscription IND, les documents requis, ou toute préoccupation que vous pourriez avoir...",
    questionsHelper: "Nos experts en immigration examineront vos questions et fourniront des conseils personnalisés.",
    medicalExam: "Examen Médical",
    medicalDescription: "Avez-vous terminé votre examen médical ?",
    medicalYes: "Oui, terminé",
    medicalNo: "Non, pas encore",
    medicalNotYet: "Programmé mais pas terminé",
    legalHelp: "Demander une Assistance Juridique",
    legalDescription: "Obtenez une aide juridique professionnelle pour votre cas d'immigration",
    legalBenefits: [
      "Conseils d'experts en droit de l'immigration",
      "Assistance à la préparation de documents",
      "Représentation dans les procédures juridiques",
      "Support 24/7 pendant votre cas",
    ],
    requestLawyer: "Demander une Aide Juridique",
    housingTitle: "Situation de Logement",
    housingDescription: "Avez-vous un endroit où vivre aux Pays-Bas ?",
    housingYes: "Oui, j'ai un logement",
    housingNo: "Non, j'ai besoin d'aide pour le logement",
    housingAddress: "Entrez votre adresse (optionnel)",
    coaRequest: "Demande COA",
    coaDescription:
      "L'Agence Centrale pour l'Accueil des Demandeurs d'Asile (COA) fournit l'hébergement et le soutien.",
    submitCOA: "Soumettre une Demande au COA",
    coaConfirm: "Je comprends et veux soumettre ma demande COA",
    citySelection: "Sélectionner Votre Ville",
    cityDescription: "Choisissez la ville où vous voulez vivre ou avoir votre rendez-vous",
    searchCity: "Rechercher des villes...",
    noCityFound: "Aucune ville trouvée.",
    appointmentTitle: "Programmer un Rendez-vous",
    appointmentDescription: "Sélectionnez votre date et heure préférées pour votre rendez-vous",
    selectDate: "Sélectionner la Date",
    selectTime: "Sélectionner l'Heure",
    confirmAppointment: "Confirmer le Rendez-vous",
    back: "Retour",
    next: "Suivant",
    complete: "Terminer",
    skip: "Passer",
    optional: "Optionnel",
    required: "Requis",
    processing: "Traitement en cours...",
    success: "Succès !",
    error: "Une erreur s'est produite",
    helpTooltip: "Besoin d'aide ? Cliquez ici pour discuter avec notre assistant",
  },
  nl: {
    steps: [
      { id: 1, title: "Herkomst", description: "Waar kom je vandaan?", icon: Globe },
      { id: 2, title: "Introductie", description: "Bekijk introductievideo", icon: Play },
      { id: 3, title: "IND Registratie", description: "Start je registratie", icon: FileText },
      { id: 4, title: "Vragen", description: "Stel vragen over het IND proces", icon: HelpCircle },
      { id: 5, title: "Medisch Onderzoek", description: "Status medisch onderzoek", icon: Stethoscope },
      { id: 6, title: "Juridische Hulp", description: "Vraag advocaat assistentie", icon: Scale },
      { id: 7, title: "Huisvesting", description: "Heb je een plek om te wonen?", icon: Home },
      { id: 8, title: "COA Aanvraag", description: "Dien COA aanvraag in", icon: Building2 },
      { id: 9, title: "Stad Selectie", description: "Kies je stad", icon: MapPin },
      { id: 10, title: "Afspraak", description: "Selecteer datum en tijd", icon: Calendar },
    ],
    welcome: "Welkom bij Nederlandse Immigratie Ondersteuning",
    selectCountry: "Selecteer je land van herkomst",
    searchCountry: "Zoek landen...",
    noCountryFound: "Geen land gevonden.",
    introVideo: "Introductie Video",
    videoDescription: "Leer over het immigratieproces in Nederland",
    watchVideo: "Bekijk Introductie Video",
    indRegistration: "IND Registratie",
    indDescription:
      "De Immigratie- en Naturalisatiedienst (IND) behandelt alle verblijfsvergunningaanvragen in Nederland.",
    startRegistration: "Start IND Registratie",
    questionsTitle: "Vragen over IND Registratie",
    questionsPlaceholder:
      "Type je vragen over het IND registratieproces, vereiste documenten, of zorgen die je hebt...",
    questionsHelper: "Onze immigratie-experts zullen je vragen bekijken en gepersonaliseerde begeleiding bieden.",
    medicalExam: "Medisch Onderzoek",
    medicalDescription: "Heb je je medisch onderzoek voltooid?",
    medicalYes: "Ja, voltooid",
    medicalNo: "Nee, nog niet",
    medicalNotYet: "Gepland maar niet voltooid",
    legalHelp: "Vraag Juridische Assistentie",
    legalDescription: "Krijg professionele juridische hulp bij je immigratiezaak",
    legalBenefits: [
      "Expert begeleiding in immigratierecht",
      "Hulp bij documentvoorbereiding",
      "Vertegenwoordiging in juridische procedures",
      "24/7 ondersteuning tijdens je zaak",
    ],
    requestLawyer: "Vraag Juridische Hulp",
    housingTitle: "Huisvestingssituatie",
    housingDescription: "Heb je een plek om te wonen in Nederland?",
    housingYes: "Ja, ik heb huisvesting",
    housingNo: "Nee, ik heb huisvestingshulp nodig",
    housingAddress: "Voer je adres in (optioneel)",
    coaRequest: "COA Aanvraag",
    coaDescription: "Het Centraal Orgaan opvang Asielzoekers (COA) biedt accommodatie en ondersteuning.",
    submitCOA: "Dien Aanvraag in bij COA",
    coaConfirm: "Ik begrijp het en wil mijn COA aanvraag indienen",
    citySelection: "Selecteer Je Stad",
    cityDescription: "Kies de stad waar je wilt wonen of je afspraak wilt hebben",
    searchCity: "Zoek steden...",
    noCityFound: "Geen stad gevonden.",
    appointmentTitle: "Plan Afspraak",
    appointmentDescription: "Selecteer je gewenste datum en tijd voor je afspraak",
    selectDate: "Selecteer Datum",
    selectTime: "Selecteer Tijd",
    confirmAppointment: "Bevestig Afspraak",
    back: "Terug",
    next: "Volgende",
    complete: "Voltooien",
    skip: "Overslaan",
    optional: "Optioneel",
    required: "Vereist",
    processing: "Verwerken...",
    success: "Succes!",
    error: "Er is een fout opgetreden",
    helpTooltip: "Hulp nodig? Klik hier om te chatten met onze assistent",
  },
  fa: {
    steps: [
      { id: 1, title: "مبدأ", description: "شما از کجا هستید؟", icon: Globe },
      { id: 2, title: "معرفی", description: "ویدیو معرفی را تماشا کنید", icon: Play },
      { id: 3, title: "ثبت نام IND", description: "ثبت نام خود را شروع کنید", icon: FileText },
      { id: 4, title: "سوالات", description: "در مورد فرآیند IND بپرسید", icon: HelpCircle },
      { id: 5, title: "معاینه پزشکی", description: "وضعیت معاینه پزشکی", icon: Stethoscope },
      { id: 6, title: "کمک حقوقی", description: "درخواست کمک وکیل", icon: Scale },
      { id: 7, title: "مسکن", description: "آیا جایی برای زندگی دارید؟", icon: Home },
      { id: 8, title: "درخواست COA", description: "ارسال درخواست COA", icon: Building2 },
      { id: 9, title: "انتخاب شهر", description: "شهر خود را انتخاب کنید", icon: MapPin },
      { id: 10, title: "قرار ملاقات", description: "تاریخ و زمان را انتخاب کنید", icon: Calendar },
    ],
    welcome: "به پشتیبانی مهاجرت هلند خوش آمدید",
    selectCountry: "کشور مبدأ خود را انتخاب کنید",
    searchCountry: "جستجوی کشورها...",
    noCountryFound: "کشوری یافت نشد.",
    introVideo: "ویدیو معرفی",
    videoDescription: "در مورد فرآیند مهاجرت در هلند بیاموزید",
    watchVideo: "تماشای ویدیو معرفی",
    indRegistration: "ثبت نام IND",
    indDescription: "سرویس مهاجرت و تابعیت (IND) تمام درخواست‌های مجوز اقامت در هلند را بررسی می‌کند.",
    startRegistration: "شروع ثبت نام IND",
    questionsTitle: "سوالات در مورد ثبت نام IND",
    questionsPlaceholder: "سوالات خود را در مورد فرآیند ثبت نام IND، مدارک مورد نیاز، یا هر نگرانی که دارید بنویسید...",
    questionsHelper: "متخصصان مهاجرت ما سوالات شما را بررسی کرده و راهنمایی شخصی ارائه خواهند داد.",
    medicalExam: "معاینه پزشکی",
    medicalDescription: "آیا معاینه پزشکی خود را تکمیل کرده‌اید؟",
    medicalYes: "بله، تکمیل شده",
    medicalNo: "خیر، هنوز نه",
    medicalNotYet: "برنامه‌ریزی شده اما تکمیل نشده",
    legalHelp: "درخواست کمک حقوقی",
    legalDescription: "کمک حقوقی حرفه‌ای برای پرونده مهاجرت خود دریافت کنید",
    legalBenefits: [
      "راهنمایی متخصص در قانون مهاجرت",
      "کمک در تهیه مدارک",
      "نمایندگی در روند حقوقی",
      "پشتیبانی ۲۴/۷ در طول پرونده",
    ],
    requestLawyer: "درخواست کمک حقوقی",
    housingTitle: "وضعیت مسکن",
    housingDescription: "آیا در هلند جایی برای زندگی دارید؟",
    housingYes: "بله، مسکن دارم",
    housingNo: "خیر، به کمک مسکن نیاز دارم",
    housingAddress: "آدرس خود را وارد کنید (اختیاری)",
    coaRequest: "درخواست COA",
    coaDescription: "آژانس مرکزی پذیرش پناهندگان (COA) اسکان و پشتیبانی فراهم می‌کند.",
    submitCOA: "ارسال درخواست به COA",
    coaConfirm: "من متوجه هستم و می‌خواهم درخواست COA خود را ارسال کنم",
    citySelection: "انتخاب شهر",
    cityDescription: "شهری را که می‌خواهید در آن زندگی کنید یا قرار ملاقات داشته باشید انتخاب کنید",
    searchCity: "جستجوی شهرها...",
    noCityFound: "شهری یافت نشد.",
    appointmentTitle: "تعیین قرار ملاقات",
    appointmentDescription: "تاریخ و زمان مورد نظر خود را برای قرار ملاقات انتخاب کنید",
    selectDate: "انتخاب تاریخ",
    selectTime: "انتخاب زمان",
    confirmAppointment: "تأیید قرار ملاقات",
    back: "بازگشت",
    next: "بعدی",
    complete: "تکمیل",
    skip: "رد کردن",
    optional: "اختیاری",
    required: "الزامی",
    processing: "در حال پردازش...",
    success: "موفق!",
    error: "خطا رخ داد",
    helpTooltip: "نیاز به کمک دارید؟ اینجا کلیک کنید تا با دستیار ما چت کنید",
  },
  ar: {
    steps: [
      { id: 1, title: "الأصل", description: "من أين أنت؟", icon: Globe },
      { id: 2, title: "مقدمة", description: "شاهد فيديو التعريف", icon: Play },
      { id: 3, title: "تسجيل IND", description: "ابدأ تسجيلك", icon: FileText },
      { id: 4, title: "أسئلة", description: "اسأل عن عملية IND", icon: HelpCircle },
      { id: 5, title: "فحص طبي", description: "حالة الفحص الطبي", icon: Stethoscope },
      { id: 6, title: "مساعدة قانونية", description: "طلب مساعدة محامي", icon: Scale },
      { id: 7, title: "السكن", description: "هل لديك مكان للعيش؟", icon: Home },
      { id: 8, title: "طلب COA", description: "إرسال طلب COA", icon: Building2 },
      { id: 9, title: "اختيار المدينة", description: "اختر مدينتك", icon: MapPin },
      { id: 10, title: "موعد", description: "اختر التاريخ والوقت", icon: Calendar },
    ],
    welcome: "مرحباً بك في دعم الهجرة الهولندية",
    selectCountry: "اختر بلد المنشأ",
    searchCountry: "البحث في البلدان...",
    noCountryFound: "لم يتم العثور على بلد.",
    introVideo: "فيديو تعريفي",
    videoDescription: "تعلم عن عملية الهجرة في هولندا",
    watchVideo: "شاهد الفيديو التعريفي",
    indRegistration: "تسجيل IND",
    indDescription: "تتعامل دائرة الهجرة والتجنس (IND) مع جميع طلبات تصاريح الإقامة في هولندا.",
    startRegistration: "ابدأ تسجيل IND",
    questionsTitle: "أسئلة حول تسجيل IND",
    questionsPlaceholder: "اكتب أسئلتك حول عملية تسجيل IND، الوثائق المطلوبة، أو أي مخاوف لديك...",
    questionsHelper: "سيراجع خبراء الهجرة لدينا أسئلتك ويقدمون إرشادات شخصية.",
    medicalExam: "الفحص الطبي",
    medicalDescription: "هل أكملت فحصك الطبي؟",
    medicalYes: "نعم، مكتمل",
    medicalNo: "لا، ليس بعد",
    medicalNotYet: "مجدول لكن غير مكتمل",
    legalHelp: "طلب المساعدة القانونية",
    legalDescription: "احصل على مساعدة قانونية مهنية لقضية الهجرة الخاصة بك",
    legalBenefits: [
      "إرشاد خبير في قانون الهجرة",
      "مساعدة في إعداد الوثائق",
      "التمثيل في الإجراءات القانونية",
      "دعم على مدار الساعة أثناء قضيتك",
    ],
    requestLawyer: "طلب مساعدة قانونية",
    housingTitle: "وضع السكن",
    housingDescription: "هل لديك مكان للعيش في هولندا؟",
    housingYes: "نعم، لدي سكن",
    housingNo: "لا، أحتاج مساعدة في السكن",
    housingAddress: "أدخل عنوانك (اختياري)",
    coaRequest: "طلب COA",
    coaDescription: "تقدم الوكالة المركزية لاستقبال طالبي اللجوء (COA) الإقامة والدعم.",
    submitCOA: "إرسال طلب إلى COA",
    coaConfirm: "أفهم وأريد إرسال طلب COA الخاص بي",
    citySelection: "اختيار المدينة",
    cityDescription: "اختر المدينة التي تريد العيش فيها أو إجراء موعدك",
    searchCity: "البحث في المدن...",
    noCityFound: "لم يتم العثور على مدينة.",
    appointmentTitle: "جدولة موعد",
    appointmentDescription: "اختر التاريخ والوقت المفضل لموعدك",
    selectDate: "اختر التاريخ",
    selectTime: "اختر الوقت",
    confirmAppointment: "تأكيد الموعد",
    back: "رجوع",
    next: "التالي",
    complete: "إكمال",
    skip: "تخطي",
    optional: "اختياري",
    required: "مطلوب",
    processing: "جاري المعالجة...",
    success: "نجح!",
    error: "حدث خطأ",
    helpTooltip: "تحتاج مساعدة؟ انقر هنا للدردشة مع مساعدنا",
  },
  es: {
    steps: [
      { id: 1, title: "Origen", description: "¿De dónde eres?", icon: Globe },
      { id: 2, title: "Introducción", description: "Ver video de introducción", icon: Play },
      { id: 3, title: "Registro IND", description: "Iniciar tu registro", icon: FileText },
      { id: 4, title: "Preguntas", description: "Preguntar sobre el proceso IND", icon: HelpCircle },
      { id: 5, title: "Examen médico", description: "Estado del examen médico", icon: Stethoscope },
      { id: 6, title: "Ayuda legal", description: "Solicitar asistencia de abogado", icon: Scale },
      { id: 7, title: "Vivienda", description: "¿Tienes un lugar donde vivir?", icon: Home },
      { id: 8, title: "Solicitud COA", description: "Enviar solicitud COA", icon: Building2 },
      { id: 9, title: "Selección de ciudad", description: "Elige tu ciudad", icon: MapPin },
      { id: 10, title: "Cita", description: "Seleccionar fecha y hora", icon: Calendar },
    ],
    welcome: "Bienvenido al Apoyo de Inmigración de los Países Bajos",
    selectCountry: "Selecciona tu país de origen",
    searchCountry: "Buscar países...",
    noCountryFound: "No se encontró país.",
    introVideo: "Video de Introducción",
    videoDescription: "Aprende sobre el proceso de inmigración en los Países Bajos",
    watchVideo: "Ver Video de Introducción",
    indRegistration: "Registro IND",
    indDescription:
      "El Servicio de Inmigración y Naturalización (IND) maneja todas las solicitudes de permisos de residencia en los Países Bajos.",
    startRegistration: "Iniciar Registro IND",
    questionsTitle: "Preguntas sobre el Registro IND",
    questionsPlaceholder:
      "Escribe tus preguntas sobre el proceso de registro IND, documentos requeridos, o cualquier preocupación que tengas...",
    questionsHelper:
      "Nuestros expertos en inmigración revisarán tus preguntas y proporcionarán orientación personalizada.",
    medicalExam: "Examen Médico",
    medicalDescription: "¿Has completado tu examen médico?",
    medicalYes: "Sí, completado",
    medicalNo: "No, aún no",
    medicalNotYet: "Programado pero no completado",
    legalHelp: "Solicitar Asistencia Legal",
    legalDescription: "Obtén ayuda legal profesional con tu caso de inmigración",
    legalBenefits: [
      "Orientación experta en ley de inmigración",
      "Asistencia en preparación de documentos",
      "Representación en procedimientos legales",
      "Apoyo 24/7 durante tu caso",
    ],
    requestLawyer: "Solicitar Ayuda Legal",
    housingTitle: "Situación de Vivienda",
    housingDescription: "¿Tienes un lugar donde vivir en los Países Bajos?",
    housingYes: "Sí, tengo vivienda",
    housingNo: "No, necesito asistencia de vivienda",
    housingAddress: "Ingresa tu dirección (opcional)",
    coaRequest: "Solicitud COA",
    coaDescription:
      "La Agencia Central para la Recepción de Solicitantes de Asilo (COA) proporciona alojamiento y apoyo.",
    submitCOA: "Enviar Solicitud a COA",
    coaConfirm: "Entiendo y quiero enviar mi solicitud COA",
    citySelection: "Seleccionar Tu Ciudad",
    cityDescription: "Elige la ciudad donde quieres vivir o tener tu cita",
    searchCity: "Buscar ciudades...",
    noCityFound: "No se encontró ciudad.",
    appointmentTitle: "Programar Cita",
    appointmentDescription: "Selecciona tu fecha y hora preferida para tu cita",
    selectDate: "Seleccionar Fecha",
    selectTime: "Seleccionar Hora",
    confirmAppointment: "Confirmar Cita",
    back: "Atrás",
    next: "Siguiente",
    complete: "Completar",
    skip: "Omitir",
    optional: "Opcional",
    required: "Requerido",
    processing: "Procesando...",
    success: "¡Éxito!",
    error: "Ocurrió un error",
    helpTooltip: "¿Necesitas ayuda? Haz clic aquí para chatear con nuestro asistente",
  },
}

// Default to English if language not found
const getTranslation = (langCode: string) => {
  return translations[langCode] || translations.en
}

// Detect browser language
const detectLanguage = () => {
  if (typeof window !== "undefined") {
    const browserLang = navigator.language.split("-")[0]
    return translations[browserLang] ? browserLang : "en"
  }
  return "en"
}

interface FormData {
  country: string
  videoWatched: boolean
  indStarted: boolean
  questions: string
  medicalExam: string
  lawyerRequested: boolean
  hasHousing: string
  housingAddress: string
  coaRequested: boolean
  city: string
  appointmentDate: Date | undefined
  appointmentTime: string
}

export default function ImmigrationOnboardingPage() {
  const router = useRouter()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  const [currentStep, setCurrentStep] = useState(1)
  const [language, setLanguage] = useState("en")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [showCityDropdown, setShowCityDropdown] = useState(false)
  const [countrySearch, setCountrySearch] = useState("")
  const [citySearch, setCitySearch] = useState("")
  const [showAssistant, setShowAssistant] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    country: "",
    videoWatched: false,
    indStarted: false,
    questions: "",
    medicalExam: "",
    lawyerRequested: false,
    hasHousing: "",
    housingAddress: "",
    coaRequested: false,
    city: "",
    appointmentDate: undefined,
    appointmentTime: "",
  })

  // Initialize language on mount
  useEffect(() => {
    const detectedLang = detectLanguage()
    setLanguage(detectedLang)
  }, [])

  // Update language based on selected country
  useEffect(() => {
    if (formData.country) {
      const selectedCountry = countries.find((c) => c.code === formData.country)
      if (selectedCountry && selectedCountry.languages.length > 0) {
        const primaryLang = selectedCountry.languages[0]
        if (translations[primaryLang]) {
          setLanguage(primaryLang)
        }
      }
    }
  }, [formData.country])

  const t = getTranslation(language)

  // Validation functions
  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.country !== ""
      case 2:
        return true // Video is optional
      case 3:
        return true // IND registration is optional
      case 4:
        return true // Questions are optional
      case 5:
        return formData.medicalExam !== ""
      case 6:
        return true // Lawyer request is optional
      case 7:
        return formData.hasHousing !== ""
      case 8:
        return true // COA request is optional
      case 9:
        return formData.city !== ""
      case 10:
        return formData.appointmentDate && formData.appointmentTime !== ""
      default:
        return false
    }
  }

  const handleNext = () => {
    if (isStepValid(currentStep) && currentStep < 10) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast(t.success)

    setIsSubmitting(false)
    router.push("/onboarding/complete")
  }

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase()),
  )

  const filteredCities = dutchCities.filter((city) => city.toLowerCase().includes(citySearch.toLowerCase()))

  // Animated Background
  const AnimatedBackground = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="immigration-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-blue-500/20"
              />
            </pattern>
            <linearGradient id="immigrationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.1" />
              <stop offset="50%" stopColor="rgb(147, 51, 234)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgb(236, 72, 153)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#immigration-grid)" />
          <rect width="100%" height="100%" fill="url(#immigrationGradient)" />
        </svg>
      </div>

      {/* Floating Elements */}
      {[...Array(8)].map((_, i) => (
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

  // Progress Indicator
  const ProgressIndicator = () => (
    <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border/50 p-4 mt-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">{t.welcome}</h1>
              <p className="text-sm text-muted-foreground">
                Step {currentStep} of 10: {t.steps[currentStep - 1].title}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="hidden sm:flex">
            {Math.round((currentStep / 10) * 100)}% Complete
          </Badge>
        </div>

        <div className="space-y-2">
          <Progress value={(currentStep / 10) * 100} className="h-2" />

          {/* Step indicators for desktop */}
          {!isMobile && (
            <div className="flex justify-between">
              {t.steps.map((step: any, index: number) => (
                <div
                  key={step.id}
                  className={cn(
                    "flex flex-col items-center space-y-1 text-xs",
                    currentStep >= step.id ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors",
                      currentStep >= step.id
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-muted-foreground/30",
                    )}
                  >
                    {currentStep > step.id ? <Check className="w-3 h-3" /> : <step.icon className="w-3 h-3" />}
                  </div>
                  <span className="max-w-16 text-center leading-tight">{step.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
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
                <h3 className="font-semibold">Immigration Assistant</h3>
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
      <ProgressIndicator />
      {/* <FloatingAssistant /> */}

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
                    {React.createElement(t.steps[currentStep - 1].icon, { className: "w-8 h-8 text-white" })}
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold">{t.steps[currentStep - 1].title}</CardTitle>
                <p className="text-muted-foreground">{t.steps[currentStep - 1].description}</p>
              </CardHeader>

              <CardContent className="space-y-6 p-5">
                {/* Step 1: Country Selection */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <Label className="text-base font-medium">{t.selectCountry}</Label>
                    <Popover open={showCountryDropdown} onOpenChange={setShowCountryDropdown}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={showCountryDropdown}
                          className="w-full justify-between h-12 bg-background/50 backdrop-blur-sm"
                        >
                          {formData.country ? (
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">
                                {countries.find((c) => c.code === formData.country)?.flag}
                              </span>
                              <span>{countries.find((c) => c.code === formData.country)?.name}</span>
                            </div>
                          ) : (
                            t.selectCountry
                          )}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command>
                          <CommandInput
                            placeholder={t.searchCountry}
                            value={countrySearch}
                            onValueChange={setCountrySearch}
                          />
                          <CommandList>
                            <CommandEmpty>{t.noCountryFound}</CommandEmpty>
                            <CommandGroup>
                              {filteredCountries.map((country) => (
                                <CommandItem
                                  key={country.code}
                                  value={country.name}
                                  onSelect={() => {
                                    setFormData((prev) => ({ ...prev, country: country.code }))
                                    setShowCountryDropdown(false)
                                    setCountrySearch("")
                                  }}
                                >
                                  <div className="flex items-center space-x-3">
                                    <span className="text-lg">{country.flag}</span>
                                    <span>{country.name}</span>
                                  </div>
                                  <Check
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      formData.country === country.code ? "opacity-100" : "opacity-0",
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    {formData.country && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{countries.find((c) => c.code === formData.country)?.flag}</span>
                          <div>
                            <p className="font-medium">{countries.find((c) => c.code === formData.country)?.name}</p>
                            <p className="text-sm text-muted-foreground">Selected as your country of origin</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Step 2: Introduction Video */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-semibold">{t.introVideo}</h3>
                      <p className="text-muted-foreground">{t.videoDescription}</p>
                    </div>

                    <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-border/50">
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                        <div>
                          <h4 className="font-semibold">
                            Immigration Guide for {countries.find((c) => c.code === formData.country)?.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">Duration: 5 minutes</p>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => setFormData((prev) => ({ ...prev, videoWatched: true }))}
                      className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {t.watchVideo}
                    </Button>

                    {formData.videoWatched && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center space-x-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-green-700 font-medium">Video completed!</span>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Step 3: IND Registration */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-semibold">{t.indRegistration}</h3>
                      <p className="text-muted-foreground">{t.indDescription}</p>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div className="space-y-4 flex-1">
                          <div>
                            <h4 className="font-semibold mb-2">Required Documents:</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Valid passport</li>
                              <li>• Birth certificate</li>
                              <li>• Proof of income or sponsorship</li>
                              <li>• Medical examination results</li>
                              <li>• Housing contract (if available)</li>
                            </ul>
                          </div>
                          <Button
                            onClick={() => setFormData((prev) => ({ ...prev, indStarted: true }))}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            {t.startRegistration}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {formData.indStarted && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center space-x-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-green-700 font-medium">IND registration initiated!</span>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Step 4: Questions */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-semibold">{t.questionsTitle}</h3>
                      <p className="text-muted-foreground">{t.questionsHelper}</p>
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="questions" className="text-base font-medium">
                        Your Questions{" "}
                        <Badge variant="secondary" className="ml-2">
                          {t.optional}
                        </Badge>
                      </Label>
                      <Textarea
                        id="questions"
                        placeholder={t.questionsPlaceholder}
                        value={formData.questions}
                        onChange={(e) => setFormData((prev) => ({ ...prev, questions: e.target.value }))}
                        className="min-h-32 bg-background/50 backdrop-blur-sm"
                      />
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Info className="w-4 h-4" />
                        <span>Our immigration experts will review your questions within 24 hours</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Medical Examination */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-semibold">{t.medicalExam}</h3>
                      <p className="text-muted-foreground">{t.medicalDescription}</p>
                    </div>

                    <RadioGroup
                      value={formData.medicalExam}
                      onValueChange={(value : any) => setFormData((prev) => ({ ...prev, medicalExam: value }))}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-3 p-4 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="completed" id="completed" />
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <Label htmlFor="completed" className="flex-1 cursor-pointer">
                            <div className="font-medium">{t.medicalYes}</div>
                            <div className="text-sm text-muted-foreground">Medical examination completed</div>
                          </Label>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-4 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="not-completed" id="not-completed" />
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                          </div>
                          <Label htmlFor="not-completed" className="flex-1 cursor-pointer">
                            <div className="font-medium">{t.medicalNo}</div>
                            <div className="text-sm text-muted-foreground">Need to schedule medical examination</div>
                          </Label>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-4 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="scheduled" id="scheduled" />
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                            <Clock className="w-5 h-5 text-yellow-600" />
                          </div>
                          <Label htmlFor="scheduled" className="flex-1 cursor-pointer">
                            <div className="font-medium">{t.medicalNotYet}</div>
                            <div className="text-sm text-muted-foreground">Appointment scheduled but not completed</div>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Step 6: Legal Help */}
                {currentStep === 6 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-semibold">{t.legalHelp}</h3>
                      <p className="text-muted-foreground">{t.legalDescription}</p>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Scale className="w-6 h-6 text-white" />
                        </div>
                        <div className="space-y-4 flex-1">
                          <div>
                            <h4 className="font-semibold mb-3">Legal Assistance Benefits:</h4>
                            <ul className="space-y-2">
                              {t.legalBenefits.map((benefit: string, index: number) => (
                                <li key={index} className="flex items-center space-x-2 text-sm">
                                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <Button
                            onClick={() => setFormData((prev) => ({ ...prev, lawyerRequested: true }))}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                          >
                            <Scale className="w-4 h-4 mr-2" />
                            {t.requestLawyer}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {formData.lawyerRequested && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center space-x-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-green-700 font-medium">Legal assistance requested!</span>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Step 7: Housing */}
                {currentStep === 7 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-semibold">{t.housingTitle}</h3>
                      <p className="text-muted-foreground">{t.housingDescription}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button
                        variant={formData.hasHousing === "yes" ? "default" : "outline"}
                        onClick={() => setFormData((prev) => ({ ...prev, hasHousing: "yes" }))}
                        className="h-20 flex-col space-y-2"
                      >
                        <Home className="w-6 h-6" />
                        <span>{t.housingYes}</span>
                      </Button>

                      <Button
                        variant={formData.hasHousing === "no" ? "default" : "outline"}
                        onClick={() => setFormData((prev) => ({ ...prev, hasHousing: "no" }))}
                        className="h-20 flex-col space-y-2"
                      >
                        <HelpCircle className="w-6 h-6" />
                        <span>{t.housingNo}</span>
                      </Button>
                    </div>

                    {formData.hasHousing === "yes" && (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                        <Label htmlFor="address" className="text-base font-medium">
                          {t.housingAddress}
                        </Label>
                        <Input
                          id="address"
                          placeholder="Enter your address..."
                          value={formData.housingAddress}
                          onChange={(e) => setFormData((prev) => ({ ...prev, housingAddress: e.target.value }))}
                          className="bg-background/50 backdrop-blur-sm"
                        />
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Step 8: COA Request */}
                {currentStep === 8 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-semibold">{t.coaRequest}</h3>
                      <p className="text-muted-foreground">{t.coaDescription}</p>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div className="space-y-4 flex-1">
                          <div>
                            <h4 className="font-semibold mb-2">COA Services Include:</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Temporary accommodation</li>
                              <li>• Basic necessities and meals</li>
                              <li>• Medical care access</li>
                              <li>• Legal guidance and support</li>
                              <li>• Integration programs</li>
                            </ul>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="coa-confirm"
                              checked={formData.coaRequested}
                              onCheckedChange={(checked) =>
                                setFormData((prev) => ({ ...prev, coaRequested: checked as boolean }))
                              }
                            />
                            <Label htmlFor="coa-confirm" className="text-sm">
                              {t.coaConfirm}
                            </Label>
                          </div>

                          <Button
                            disabled={!formData.coaRequested}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50"
                          >
                            <Building2 className="w-4 h-4 mr-2" />
                            {t.submitCOA}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 9: City Selection */}
                {currentStep === 9 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-semibold">{t.citySelection}</h3>
                      <p className="text-muted-foreground">{t.cityDescription}</p>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-base font-medium">Select City</Label>
                      <Popover open={showCityDropdown} onOpenChange={setShowCityDropdown}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={showCityDropdown}
                            className="w-full justify-between h-12 bg-background/50 backdrop-blur-sm"
                          >
                            {formData.city || "Select a city..."}
                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                          <Command>
                            <CommandInput placeholder={t.searchCity} value={citySearch} onValueChange={setCitySearch} />
                            <CommandList>
                              <CommandEmpty>{t.noCityFound}</CommandEmpty>
                              <CommandGroup>
                                {filteredCities.map((city) => (
                                  <CommandItem
                                    key={city}
                                    value={city}
                                    onSelect={() => {
                                      setFormData((prev) => ({ ...prev, city }))
                                      setShowCityDropdown(false)
                                      setCitySearch("")
                                    }}
                                  >
                                    <MapPin className="w-4 h-4 mr-2" />
                                    {city}
                                    <Check
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        formData.city === city ? "opacity-100" : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      {formData.city && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20"
                        >
                          <div className="flex items-center space-x-3">
                            <MapPin className="w-5 h-5 text-blue-600" />
                            <div>
                              <p className="font-medium">{formData.city}</p>
                              <p className="text-sm text-muted-foreground">Selected city</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 10: Appointment */}
                {currentStep === 10 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-semibold">{t.appointmentTitle}</h3>
                      <p className="text-muted-foreground">{t.appointmentDescription}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <Label className="text-base font-medium">{t.selectDate}</Label>
                        <div className="p-4 border border-border/50 rounded-lg bg-background/50 backdrop-blur-sm">
                          <input
                            type="date"
                            value={formData.appointmentDate ? formData.appointmentDate.toISOString().split("T")[0] : ""}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                appointmentDate: e.target.value ? new Date(e.target.value) : undefined,
                              }))
                            }
                            className="w-full bg-transparent border-none outline-none"
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label className="text-base font-medium">{t.selectTime}</Label>
                        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                          {timeSlots.map((time) => (
                            <Button
                              key={time}
                              variant={formData.appointmentTime === time ? "default" : "outline"}
                              size="sm"
                              onClick={() => setFormData((prev) => ({ ...prev, appointmentTime: time }))}
                              className="justify-center"
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {formData.appointmentDate && formData.appointmentTime && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20"
                      >
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-medium">Appointment Scheduled</p>
                            <p className="text-sm text-muted-foreground">
                              {formData.appointmentDate.toLocaleDateString()} at {formData.appointmentTime}
                            </p>
                          </div>
                        </div>
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
                    {t.back}
                  </Button>

                  {currentStep < 10 ? (
                    <Button
                      onClick={handleNext}
                      disabled={!isStepValid(currentStep)}
                      className="px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      {t.next}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleComplete}
                      disabled={!isStepValid(currentStep) || isSubmitting}
                      className="px-8 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                    >
                      {isSubmitting ? t.processing : t.complete}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
