"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Building2,
  FileText,
  Calculator,
  MapPin,
  Languages,
  ChevronRight,
  CheckCircle,
  Clock,
  AlertCircle,
  ExternalLink,
  MessageCircle,
  ArrowRight,
  Shield,
  Home,
  HelpCircle,
  ArrowLeft,
  Download,
  Calendar,
  DollarSign,
  Star,
  Info,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// Enhanced service categories data with more details
const serviceCategories = [
  {
    id: "business",
    icon: Building2,
    title: "Business Registration Guide",
    description:
      "Complete step-by-step assistance for registering your business, obtaining permits, licenses, and understanding all legal requirements for successful business operations.",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/10",
    steps: 6,
    estimatedTime: "2-4 weeks",
    difficulty: "Medium",
    cost: "$200-800",
    popularity: 95,
    requirements: ["Valid ID", "Business Plan", "Address Proof", "Initial Capital"],
  },
  {
    id: "legal",
    icon: Shield,
    title: "Legal Assistance & Rights",
    description:
      "Navigate complex legal requirements, understand your rights and protections, find qualified legal professionals, and get guidance on legal procedures and documentation.",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-500/10",
    steps: 4,
    estimatedTime: "1-3 weeks",
    difficulty: "High",
    cost: "$150-500",
    popularity: 78,
    requirements: ["Legal Documents", "Case Details", "ID Verification", "Legal History"],
  },
  {
    id: "residency",
    icon: Home,
    title: "Nationality & Residency",
    description:
      "Comprehensive guide for residency applications, citizenship processes, visa extensions, immigration support, and all documentation required for legal status changes.",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-500/10",
    steps: 8,
    estimatedTime: "3-12 months",
    difficulty: "High",
    cost: "$500-2000",
    popularity: 89,
    requirements: ["Passport", "Birth Certificate", "Police Clearance", "Medical Records", "Sponsor Documents"],
  },
  {
    id: "tax",
    icon: Calculator,
    title: "Tax & Finance Procedures",
    description:
      "Understand tax obligations, set up proper banking, manage financial requirements, learn about deductions, and ensure compliance with all financial regulations.",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-500/10",
    steps: 5,
    estimatedTime: "1-3 weeks",
    difficulty: "Medium",
    cost: "$100-400",
    popularity: 92,
    requirements: ["Income Records", "Bank Statements", "Business Registration", "Previous Tax Returns"],
  },
  {
    id: "services",
    icon: MapPin,
    title: "Public Services Directory",
    description:
      "Find government offices, public services, essential contact information, office hours, required documents, and step-by-step guidance for accessing public services.",
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-500/10",
    steps: 3,
    estimatedTime: "Immediate",
    difficulty: "Easy",
    cost: "Free",
    popularity: 85,
    requirements: ["Valid ID", "Service Request Form", "Supporting Documents"],
  },
  {
    id: "documents",
    icon: Languages,
    title: "Document Translation & Notarization",
    description:
      "Professional help with document translation, notarization services, official certification processes, apostille services, and legal document authentication.",
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-500/10",
    steps: 4,
    estimatedTime: "1-2 weeks",
    difficulty: "Easy",
    cost: "$50-300",
    popularity: 73,
    requirements: ["Original Documents", "Translation Request", "Certification Forms", "Payment"],
  },
]

// Enhanced step-by-step guidance data with more details
const stepGuidance = {
  business: [
    {
      title: "Choose Your Business Structure",
      description:
        "Select the most suitable business structure based on your needs, liability preferences, and tax implications.",
      detailedDescription:
        "This is a crucial decision that affects your personal liability, tax obligations, and business operations. Consider factors like the number of owners, investment needs, and long-term goals.",
      documents: ["Government ID", "Address Proof", "Business Plan Draft", "Financial Projections"],
      estimatedTime: "2-3 days",
      cost: "$0-50",
      tips: ["Consult with a business advisor", "Research tax implications", "Consider future expansion plans"],
      commonMistakes: ["Not considering liability protection", "Ignoring tax consequences"],
      status: "required",
    },
    {
      title: "Register Your Business Name",
      description:
        "Check name availability and officially register your chosen business name with the appropriate authorities.",
      detailedDescription:
        "Your business name is your brand identity. Ensure it's unique, memorable, and complies with naming regulations. Check trademark databases and domain availability.",
      documents: [
        "Name Application Form",
        "Alternative Name Options",
        "Fee Payment Receipt",
        "Business Structure Documents",
      ],
      estimatedTime: "3-5 days",
      cost: "$50-150",
      tips: ["Have 3-5 backup names ready", "Check domain availability", "Avoid trademark conflicts"],
      commonMistakes: ["Not checking trademark databases", "Choosing names too similar to existing businesses"],
      status: "required",
    },
    {
      title: "Obtain Tax Identification Number",
      description: "Apply for your business tax identification number (EIN/TIN) for tax purposes and business banking.",
      detailedDescription:
        "This unique identifier is essential for tax filing, opening business bank accounts, and hiring employees. The process is usually free through official government channels.",
      documents: ["Business Registration Certificate", "Business Structure Documents", "Responsible Party Information"],
      estimatedTime: "1-2 days",
      cost: "Free",
      tips: [
        "Apply directly through official government websites",
        "Keep your EIN secure",
        "Update records if business structure changes",
      ],
      commonMistakes: ["Using third-party services that charge fees", "Not updating information when business changes"],
      status: "required",
    },
    {
      title: "Open Business Bank Account",
      description:
        "Establish dedicated business banking to separate personal and business finances for better financial management.",
      detailedDescription:
        "A business bank account is essential for financial organization, tax preparation, and establishing business credit. Shop around for the best terms and fees.",
      documents: ["Business Registration", "Tax ID Number", "Operating Agreement", "Initial Deposit"],
      estimatedTime: "1-2 days",
      cost: "$0-200",
      tips: ["Compare fees and services", "Consider online banking options", "Ask about business credit cards"],
      commonMistakes: ["Mixing personal and business expenses", "Not reading fee structures carefully"],
      status: "recommended",
    },
    {
      title: "Apply for Business Licenses & Permits",
      description:
        "Obtain all necessary licenses and permits specific to your industry and location to operate legally.",
      detailedDescription:
        "Requirements vary by industry, location, and business type. Research federal, state, and local requirements. Some permits may require inspections or ongoing compliance.",
      documents: [
        "Business License Application",
        "Zoning Permits",
        "Health Department Permits",
        "Professional Licenses",
      ],
      estimatedTime: "1-4 weeks",
      cost: "$100-500",
      tips: ["Start early as some permits take time", "Check renewal requirements", "Keep all permits current"],
      commonMistakes: ["Operating without proper permits", "Missing renewal deadlines"],
      status: "conditional",
    },
    {
      title: "Set Up Business Insurance & Compliance",
      description:
        "Protect your business with appropriate insurance coverage and ensure ongoing regulatory compliance.",
      detailedDescription:
        "Business insurance protects against various risks including liability, property damage, and business interruption. Compliance includes ongoing reporting and record-keeping requirements.",
      documents: ["Insurance Applications", "Compliance Checklists", "Employee Documentation", "Safety Protocols"],
      estimatedTime: "1-2 weeks",
      cost: "$200-1000",
      tips: ["Get multiple insurance quotes", "Understand your coverage needs", "Set up compliance calendar"],
      commonMistakes: ["Underinsuring the business", "Ignoring ongoing compliance requirements"],
      status: "recommended",
    },
  ],
  legal: [
    {
      title: "Understand Your Legal Rights & Protections",
      description:
        "Learn about your fundamental legal rights, protections available to you, and how to exercise them effectively.",
      detailedDescription:
        "Knowledge of your rights is the foundation of legal protection. This includes constitutional rights, consumer protections, employment rights, and civil liberties.",
      documents: [
        "Legal Rights Guide",
        "Constitutional Protections",
        "Consumer Rights Documentation",
        "Employment Law Overview",
      ],
      estimatedTime: "3-5 days",
      cost: "Free",
      tips: [
        "Keep documentation of all interactions",
        "Know when to seek legal help",
        "Understand statute of limitations",
      ],
      commonMistakes: ["Not documenting incidents", "Waiting too long to seek help"],
      status: "required",
    },
    {
      title: "Find Qualified Legal Representation",
      description:
        "Connect with experienced lawyers, legal aid services, and understand how to choose the right legal professional for your needs.",
      detailedDescription:
        "The right legal representation can make a significant difference in your case outcome. Consider specialization, experience, fees, and communication style.",
      documents: ["Bar Association Directory", "Legal Aid Applications", "Attorney Credentials", "Fee Agreements"],
      estimatedTime: "1-2 weeks",
      cost: "$150-500/hour",
      tips: ["Get referrals from trusted sources", "Interview multiple attorneys", "Understand fee structures"],
      commonMistakes: ["Choosing based on price alone", "Not checking credentials"],
      status: "recommended",
    },
    {
      title: "Prepare Legal Documentation",
      description:
        "Organize and prepare all necessary legal documents, evidence, and supporting materials for your case or legal matter.",
      detailedDescription:
        "Proper documentation is crucial for legal success. This includes gathering evidence, organizing chronologically, and ensuring all documents are authentic and complete.",
      documents: ["Case Files", "Evidence Collection", "Witness Statements", "Communication Records", "Legal Notices"],
      estimatedTime: "1-3 weeks",
      cost: "$100-300",
      tips: ["Keep originals safe", "Make multiple copies", "Organize chronologically"],
      commonMistakes: ["Losing important documents", "Not keeping detailed records"],
      status: "required",
    },
    {
      title: "Navigate Legal Procedures & Follow-up",
      description:
        "Understand court procedures, filing requirements, deadlines, and maintain ongoing communication with legal professionals.",
      detailedDescription:
        "Legal procedures have strict timelines and requirements. Missing deadlines or improper filing can seriously impact your case. Stay organized and communicate regularly with your attorney.",
      documents: ["Court Filings", "Procedure Manuals", "Deadline Calendars", "Communication Logs"],
      estimatedTime: "Ongoing",
      cost: "Variable",
      tips: ["Never miss deadlines", "Keep detailed communication records", "Follow court etiquette"],
      commonMistakes: ["Missing filing deadlines", "Poor communication with attorney"],
      status: "required",
    },
  ],
  residency: [
    {
      title: "Determine Eligibility & Requirements",
      description:
        "Assess your eligibility for residency or citizenship and understand all specific requirements for your situation.",
      detailedDescription:
        "Eligibility criteria vary based on your current status, country of origin, family situation, and intended residency type. Understanding requirements upfront prevents delays and rejections.",
      documents: ["Eligibility Checklist", "Requirements Guide", "Status Documentation", "Family Records"],
      estimatedTime: "1-2 weeks",
      cost: "Free",
      tips: [
        "Research thoroughly before applying",
        "Consider consulting an immigration attorney",
        "Check for recent policy changes",
      ],
      commonMistakes: ["Applying without meeting requirements", "Not understanding the process"],
      status: "required",
    },
    {
      title: "Gather Required Documentation",
      description:
        "Collect all necessary paperwork including personal documents, financial records, and supporting evidence for your application.",
      detailedDescription:
        "Document requirements are extensive and specific. Some documents may need translation, notarization, or apostille certification. Start early as obtaining some documents can take time.",
      documents: [
        "Passport & Travel Documents",
        "Birth Certificate",
        "Marriage Certificate",
        "Police Clearance",
        "Medical Records",
        "Financial Statements",
        "Sponsor Documents",
      ],
      estimatedTime: "4-8 weeks",
      cost: "$200-500",
      tips: ["Get certified translations", "Obtain multiple copies", "Check expiration dates"],
      commonMistakes: ["Using expired documents", "Not getting proper translations"],
      status: "required",
    },
    {
      title: "Submit Initial Application",
      description:
        "Complete and file your residency or citizenship application with all required supporting documents and fees.",
      detailedDescription:
        "Application submission is a critical step that requires attention to detail. Incomplete applications cause delays. Double-check all information and ensure all required documents are included.",
      documents: ["Completed Application Form", "Supporting Documents", "Application Fees", "Submission Receipt"],
      estimatedTime: "1-2 weeks",
      cost: "$500-1500",
      tips: ["Review application multiple times", "Keep copies of everything", "Pay fees through official channels"],
      commonMistakes: ["Incomplete applications", "Missing signatures or dates"],
      status: "required",
    },
    {
      title: "Attend Biometrics & Medical Appointments",
      description:
        "Complete required biometric data collection and medical examinations as part of the application process.",
      detailedDescription:
        "Biometrics and medical exams are standard requirements. Schedule appointments promptly when notified. Bring all required documents and arrive early.",
      documents: ["Appointment Letters", "Medical Forms", "Vaccination Records", "ID Documents"],
      estimatedTime: "2-4 weeks",
      cost: "$100-400",
      tips: ["Schedule appointments quickly", "Bring all required documents", "Follow pre-appointment instructions"],
      commonMistakes: ["Missing appointments", "Not bringing required documents"],
      status: "required",
    },
    {
      title: "Language & Civics Testing (if required)",
      description:
        "Prepare for and take required language proficiency and civics knowledge tests as part of the citizenship process.",
      detailedDescription:
        "Language and civics tests assess your ability to communicate and knowledge of the country's history and government. Preparation is key to success.",
      documents: ["Test Registration", "Study Materials", "Practice Tests", "Test Results"],
      estimatedTime: "2-6 months",
      cost: "$50-200",
      tips: ["Start studying early", "Use official study materials", "Take practice tests"],
      commonMistakes: ["Inadequate preparation", "Not using official study materials"],
      status: "conditional",
    },
    {
      title: "Interview & Final Review",
      description:
        "Attend your citizenship or residency interview and final application review with immigration officials.",
      detailedDescription:
        "The interview is your opportunity to demonstrate eligibility and answer questions about your application. Be honest, prepared, and bring all requested documents.",
      documents: ["Interview Notice", "All Original Documents", "Updated Information", "Legal Representation"],
      estimatedTime: "1-3 months",
      cost: "$0-500",
      tips: ["Review your application thoroughly", "Practice common questions", "Bring a translator if needed"],
      commonMistakes: ["Being unprepared", "Not bringing required documents"],
      status: "required",
    },
    {
      title: "Oath Ceremony & Certificate",
      description:
        "Attend the citizenship oath ceremony and receive your official residency or citizenship certificate.",
      detailedDescription:
        "The oath ceremony is the final step in becoming a citizen. It's a formal ceremony where you pledge allegiance and receive your certificate of citizenship.",
      documents: ["Ceremony Invitation", "Current Documents", "Oath Administration", "Certificate Receipt"],
      estimatedTime: "1-6 months",
      cost: "Free",
      tips: ["Arrive early to ceremony", "Bring family for photos", "Keep certificate safe"],
      commonMistakes: ["Missing ceremony", "Not updating other documents"],
      status: "final",
    },
    {
      title: "Update Official Records & Documents",
      description:
        "Update your passport, social security, voter registration, and other official documents with your new status.",
      detailedDescription:
        "After receiving citizenship, update all official records and documents. This includes passport, driver's license, social security records, and voter registration.",
      documents: ["New Passport Application", "Updated ID", "Voter Registration", "Social Security Update"],
      estimatedTime: "2-4 weeks",
      cost: "$100-300",
      tips: ["Update documents promptly", "Keep old documents as backup", "Register to vote"],
      commonMistakes: ["Delaying updates", "Not registering to vote"],
      status: "completion",
    },
  ],
  tax: [
    {
      title: "Understand Tax Obligations",
      description:
        "Learn about your tax responsibilities, filing requirements, deadlines, and applicable tax laws for your situation.",
      detailedDescription:
        "Tax obligations vary based on income, residency status, business ownership, and other factors. Understanding your responsibilities helps avoid penalties and ensures compliance.",
      documents: ["Tax Guide", "Income Records", "Residency Documentation", "Previous Returns"],
      estimatedTime: "1-2 weeks",
      cost: "Free",
      tips: ["Keep detailed records", "Understand filing deadlines", "Know available deductions"],
      commonMistakes: ["Not understanding obligations", "Missing deadlines"],
      status: "required",
    },
    {
      title: "Set Up Proper Record Keeping",
      description:
        "Establish a system for tracking income, expenses, receipts, and other tax-related documents throughout the year.",
      detailedDescription:
        "Good record keeping is essential for accurate tax filing and audit protection. Use digital tools or physical filing systems to organize all tax-related documents.",
      documents: ["Income Statements", "Expense Receipts", "Bank Statements", "Investment Records"],
      estimatedTime: "2-3 days",
      cost: "$0-100",
      tips: ["Use accounting software", "Keep receipts organized", "Track business expenses separately"],
      commonMistakes: ["Poor record keeping", "Mixing personal and business expenses"],
      status: "required",
    },
    {
      title: "Open Business Banking (if applicable)",
      description:
        "Separate business and personal finances by opening dedicated business bank accounts and credit cards.",
      detailedDescription:
        "Business banking separation is crucial for tax purposes and business credibility. It simplifies bookkeeping and provides clear financial records for tax filing.",
      documents: ["Business Registration", "Tax ID Number", "Operating Agreement", "Initial Deposit"],
      estimatedTime: "1-2 days",
      cost: "$0-200",
      tips: ["Compare bank fees", "Consider online banking", "Get business credit card"],
      commonMistakes: ["Using personal accounts for business", "Not comparing bank options"],
      status: "conditional",
    },
    {
      title: "Learn About Deductions & Credits",
      description:
        "Identify all available tax deductions and credits that apply to your personal or business situation.",
      detailedDescription:
        "Tax deductions and credits can significantly reduce your tax liability. Common deductions include business expenses, home office, education, and charitable contributions.",
      documents: ["Deduction Checklists", "Expense Records", "Credit Documentation", "Professional Advice"],
      estimatedTime: "1-2 weeks",
      cost: "$0-300",
      tips: ["Keep detailed expense records", "Consult tax professional", "Don't miss common deductions"],
      commonMistakes: ["Not claiming eligible deductions", "Poor documentation"],
      status: "recommended",
    },
    {
      title: "File Tax Returns & Maintain Compliance",
      description:
        "Prepare and file accurate tax returns on time, make required payments, and maintain ongoing tax compliance.",
      detailedDescription:
        "Accurate and timely tax filing is essential. Consider using tax software or professional help for complex situations. Keep copies of all filed returns and supporting documents.",
      documents: ["Tax Returns", "Payment Records", "Filing Confirmations", "Compliance Documentation"],
      estimatedTime: "1-4 weeks",
      cost: "$100-500",
      tips: ["File early", "Keep copies of everything", "Set up payment plans if needed"],
      commonMistakes: ["Filing late", "Not keeping records"],
      status: "required",
    },
  ],
  services: [
    {
      title: "Identify Required Services",
      description: "Determine which government services you need and understand the requirements for accessing them.",
      detailedDescription:
        "Government services range from basic documentation to specialized programs. Understanding what's available and eligibility requirements helps you access the right services efficiently.",
      documents: ["Service Directory", "Eligibility Requirements", "Application Forms", "ID Documents"],
      estimatedTime: "1-2 days",
      cost: "Free",
      tips: ["Research online first", "Call ahead to confirm requirements", "Bring extra documentation"],
      commonMistakes: ["Not checking requirements", "Going to wrong office"],
      status: "required",
    },
    {
      title: "Locate Service Offices & Contact Information",
      description:
        "Find the correct government offices, their locations, hours of operation, and contact information for your needed services.",
      detailedDescription:
        "Government services are often provided at specific locations with limited hours. Some services may be available online or by appointment only.",
      documents: ["Office Directory", "Contact Lists", "Hours of Operation", "Online Service Portals"],
      estimatedTime: "1 day",
      cost: "Free",
      tips: ["Check online services first", "Confirm hours before visiting", "Make appointments when possible"],
      commonMistakes: ["Not checking hours", "Going to wrong location"],
      status: "required",
    },
    {
      title: "Access Services & Complete Procedures",
      description:
        "Visit offices, complete applications, submit required documents, and follow through with all necessary procedures.",
      detailedDescription:
        "Government service procedures vary in complexity. Some can be completed online, while others require in-person visits. Follow all instructions carefully and keep records of all interactions.",
      documents: ["Completed Applications", "Required Documents", "Service Receipts", "Follow-up Information"],
      estimatedTime: "1-5 days",
      cost: "Variable",
      tips: ["Bring all required documents", "Ask questions if unclear", "Keep all receipts and confirmations"],
      commonMistakes: ["Incomplete applications", "Not following up"],
      status: "required",
    },
  ],
  documents: [
    {
      title: "Identify Translation & Notarization Needs",
      description:
        "Determine which documents require translation, notarization, or apostille certification for your specific purpose.",
      detailedDescription:
        "Different purposes require different levels of document certification. Understanding requirements upfront prevents delays and additional costs.",
      documents: ["Document List", "Certification Requirements", "Purpose Documentation", "Original Documents"],
      estimatedTime: "1-2 days",
      cost: "Free",
      tips: ["Check specific requirements", "Get multiple copies if needed", "Verify translator qualifications"],
      commonMistakes: ["Wrong type of certification", "Using unqualified translators"],
      status: "required",
    },
    {
      title: "Find Certified Translators & Notaries",
      description:
        "Locate qualified, certified translators and notary services that meet official requirements for your documents.",
      detailedDescription:
        "Official translations must be done by certified translators. Notarization must be done by licensed notaries. Some documents may require both services.",
      documents: ["Translator Credentials", "Notary Licenses", "Service Quotes", "Turnaround Times"],
      estimatedTime: "2-3 days",
      cost: "$50-200",
      tips: ["Verify credentials", "Get quotes from multiple providers", "Check turnaround times"],
      commonMistakes: ["Using uncertified translators", "Not verifying notary licenses"],
      status: "required",
    },
    {
      title: "Complete Translation & Certification Process",
      description:
        "Submit documents for translation and notarization, review completed work, and obtain all necessary certifications.",
      detailedDescription:
        "The translation and certification process requires careful review to ensure accuracy and completeness. Keep originals safe and get multiple certified copies.",
      documents: [
        "Translated Documents",
        "Notarized Certificates",
        "Translator Certifications",
        "Apostille (if required)",
      ],
      estimatedTime: "1-2 weeks",
      cost: "$100-500",
      tips: ["Review translations carefully", "Get multiple certified copies", "Keep originals safe"],
      commonMistakes: ["Not reviewing translations", "Not getting enough copies"],
      status: "required",
    },
    {
      title: "Submit & Follow Up on Document Usage",
      description:
        "Submit your translated and certified documents to the appropriate authorities and follow up on processing status.",
      detailedDescription:
        "After obtaining certified documents, submit them according to specific instructions. Keep tracking information and follow up on processing status.",
      documents: ["Submission Receipts", "Tracking Information", "Processing Updates", "Final Approvals"],
      estimatedTime: "1-4 weeks",
      cost: "Variable",
      tips: ["Keep submission receipts", "Track processing status", "Follow up if delayed"],
      commonMistakes: ["Not tracking submissions", "Not following up"],
      status: "required",
    },
  ],
}

// Enhanced Service Category Card Component
const ServiceCard = ({ service, onClick }: { service: (typeof serviceCategories)[0]; onClick: () => void }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600 bg-green-100 dark:bg-green-900/20"
      case "Medium":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
      case "High":
        return "text-red-600 bg-red-100 dark:bg-red-900/20"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full cursor-pointer group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-border bg-card/50 backdrop-blur-sm">
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div
              className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110",
                service.bgColor,
              )}
            >
              <div
                className={cn("w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center", service.color)}
              >
                <service.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{service.popularity}%</span>
            </div>
          </div>

          <div>
            <CardTitle className="text-xl group-hover:text-primary transition-colors mb-2">{service.title}</CardTitle>
            <CardDescription className="text-sm leading-relaxed">{service.description}</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-0 space-y-4">
          {/* Key Info Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{service.estimatedTime}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{service.cost}</span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {service.steps} steps
            </Badge>
            <Badge className={cn("text-xs", getDifficultyColor(service.difficulty))}>{service.difficulty}</Badge>
          </div>

          {/* Requirements Preview */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Key Requirements:</p>
            <div className="flex flex-wrap gap-1">
              {service.requirements.slice(0, 2).map((req, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {req}
                </Badge>
              ))}
              {service.requirements.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{service.requirements.length - 2} more
                </Badge>
              )}
            </div>
          </div>

          <Button onClick={onClick} className="w-full group-hover:bg-primary/90 transition-colors">
            Get Started
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Enhanced Step Guidance Component
const StepGuidance = ({ serviceId, onBack }: { serviceId: string; onBack: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const steps = stepGuidance[serviceId as keyof typeof stepGuidance] || []
  const service = serviceCategories.find((s) => s.id === serviceId)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "required":
        return "text-red-600 bg-red-100 dark:bg-red-900/20 border-red-200"
      case "recommended":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 border-yellow-200"
      case "conditional":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/20 border-blue-200"
      case "final":
        return "text-purple-600 bg-purple-100 dark:bg-purple-900/20 border-purple-200"
      case "completion":
        return "text-green-600 bg-green-100 dark:bg-green-900/20 border-green-200"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "required":
        return <AlertCircle className="w-4 h-4" />
      case "recommended":
        return <CheckCircle className="w-4 h-4" />
      case "conditional":
        return <HelpCircle className="w-4 h-4" />
      case "final":
        return <Star className="w-4 h-4" />
      case "completion":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Info className="w-4 h-4" />
    }
  }

  const toggleStepCompletion = (stepIndex: number) => {
    setCompletedSteps((prev) => (prev.includes(stepIndex) ? prev.filter((i) => i !== stepIndex) : [...prev, stepIndex]))
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header - Fully Responsive */}
      <div className="space-y-4">
        <Button variant="ghost" onClick={onBack} className="p-0 h-auto text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Categories
        </Button>

        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
            {service && (
              <div
                className={cn(
                  "w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0",
                  service.bgColor,
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br flex items-center justify-center",
                    service.color,
                  )}
                >
                  <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">{service?.title}</h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">Complete step-by-step guidance</p>
            </div>
          </div>

          <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-6 lg:flex-col lg:items-end lg:space-x-0 lg:space-y-2">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{service?.estimatedTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <DollarSign className="w-4 h-4" />
                <span>{service?.cost}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Progress value={(completedSteps.length / steps.length) * 100} className="w-24 sm:w-32 h-2" />
              <span className="text-sm font-medium whitespace-nowrap">
                {completedSteps.length}/{steps.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Steps - Fully Responsive */}
      <div className="space-y-4 md:space-y-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={cn(
                "cursor-pointer transition-all duration-300 border-border/50",
                currentStep === index ? "border-primary shadow-lg" : "hover:border-border",
                completedSteps.includes(index) && "bg-green-50/50 dark:bg-green-900/10 border-green-200",
              )}
              onClick={() => setCurrentStep(currentStep === index ? -1 : index)}
            >
              <CardHeader className="pb-3 md:pb-4">
                <div className="space-y-3 md:space-y-0">
                  {/* Mobile Layout - Stacked */}
                  <div className="flex md:hidden items-start space-x-3">
                    <div className="flex flex-col items-center space-y-2 flex-shrink-0">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-colors",
                          completedSteps.includes(index) ? "bg-green-500 text-white" : "bg-primary/10 text-primary",
                        )}
                      >
                        {completedSteps.includes(index) ? <CheckCircle className="w-4 h-4" /> : index + 1}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0 pr-2">
                          <CardTitle className="text-base sm:text-lg leading-tight">{step.title}</CardTitle>
                          <CardDescription className="text-sm mt-1 leading-relaxed">{step.description}</CardDescription>
                        </div>
                        <ChevronRight
                          className={cn(
                            "w-5 h-5 transition-transform flex-shrink-0",
                            currentStep === index && "rotate-90",
                          )}
                        />
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={cn("text-xs", getStatusColor(step.status))}>
                          {getStatusIcon(step.status)}
                          <span className="ml-1 capitalize">{step.status}</span>
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleStepCompletion(index)
                          }}
                          className="text-xs h-6 px-2"
                        >
                          {completedSteps.includes(index) ? "Undo" : "Done"}
                        </Button>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{step.estimatedTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-3 h-3" />
                          <span>{step.cost}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout - Side by Side */}
                  <div className="hidden md:flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="flex flex-col items-center space-y-2">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors",
                            completedSteps.includes(index) ? "bg-green-500 text-white" : "bg-primary/10 text-primary",
                          )}
                        >
                          {completedSteps.includes(index) ? <CheckCircle className="w-5 h-5" /> : index + 1}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleStepCompletion(index)
                          }}
                          className="text-xs"
                        >
                          {completedSteps.includes(index) ? "Undo" : "Mark Done"}
                        </Button>
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{step.title}</CardTitle>
                            <CardDescription className="text-sm mt-1">{step.description}</CardDescription>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <Badge className={cn("text-xs", getStatusColor(step.status))}>
                              {getStatusIcon(step.status)}
                              <span className="ml-1 capitalize">{step.status}</span>
                            </Badge>
                            <ChevronRight
                              className={cn("w-4 h-4 transition-transform", currentStep === index && "rotate-90")}
                            />
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{step.estimatedTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-4 h-4" />
                            <span>{step.cost}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <AnimatePresence>
                {currentStep === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <CardContent className="pt-0 space-y-4 md:space-y-6">
                      <Separator />

                      {/* Detailed Description */}
                      <div className="space-y-2 md:space-y-3">
                        <h4 className="font-semibold text-sm md:text-base">Detailed Information</h4>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                          {step.detailedDescription}
                        </p>
                      </div>

                      {/* Required Documents - Responsive Grid */}
                      <div className="space-y-2 md:space-y-3">
                        <h4 className="font-semibold text-sm md:text-base flex items-center">
                          <FileText className="w-4 h-4 mr-2" />
                          Required Documents
                        </h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-3">
                          {step.documents.map((doc, docIndex) => (
                            <div
                              key={docIndex}
                              className="flex items-center space-x-2 md:space-x-3 p-2 md:p-3 bg-muted/50 rounded-lg border"
                            >
                              <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                              <span className="text-xs md:text-sm font-medium leading-tight">{doc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tips - Responsive */}
                      <div className="space-y-2 md:space-y-3">
                        <h4 className="font-semibold text-sm md:text-base flex items-center">
                          <Sparkles className="w-4 h-4 mr-2" />
                          Pro Tips
                        </h4>
                        <div className="space-y-2">
                          {step.tips.map((tip, tipIndex) => (
                            <div
                              key={tipIndex}
                              className="flex items-start space-x-2 p-2 md:p-3 bg-blue-50/50 dark:bg-blue-900/10 rounded-lg"
                            >
                              <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span className="text-xs md:text-sm leading-relaxed">{tip}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Common Mistakes - Responsive */}
                      <div className="space-y-2 md:space-y-3">
                        <h4 className="font-semibold text-sm md:text-base flex items-center">
                          <AlertCircle className="w-4 h-4 mr-2" />
                          Common Mistakes to Avoid
                        </h4>
                        <div className="space-y-2">
                          {step.commonMistakes.map((mistake, mistakeIndex) => (
                            <div
                              key={mistakeIndex}
                              className="flex items-start space-x-2 p-2 md:p-3 bg-red-50/50 dark:bg-red-900/10 rounded-lg"
                            >
                              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                              <span className="text-xs md:text-sm leading-relaxed">{mistake}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons - Responsive Stack */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 pt-2">
                        <Button size="sm" variant="outline" className="justify-start">
                          <Download className="w-4 h-4 mr-2" />
                          <span className="truncate">Download Checklist</span>
                        </Button>
                        <Button size="sm" variant="outline" className="justify-start">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          <span className="truncate">Official Guide</span>
                        </Button>
                        <Button size="sm" variant="outline" className="justify-start">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          <span className="truncate">Get Help</span>
                        </Button>
                        <Button size="sm" variant="outline" className="justify-start">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="truncate">Schedule</span>
                        </Button>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Summary Card - Responsive */}
      <Card className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200/50">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div>
              <h3 className="font-semibold text-base md:text-lg">Progress Summary</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                You've completed {completedSteps.length} out of {steps.length} steps
              </p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-xl md:text-2xl font-bold text-primary">
                {Math.round((completedSteps.length / steps.length) * 100)}%
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">Complete</p>
            </div>
          </div>
          <Progress value={(completedSteps.length / steps.length) * 100} className="mt-4 h-2 md:h-3" />
        </CardContent>
      </Card>
    </div>
  )
}

// Main Government Page Component
export default function GovernmentPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background pt-14 md:pt-24">
      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!selectedService ? (
            <motion.div
              key="categories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Service Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceCategories.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ServiceCard service={service} onClick={() => setSelectedService(service.id)} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="steps"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <StepGuidance serviceId={selectedService} onBack={() => setSelectedService(null)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
