"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  Building2,
  User,
  Upload,
  Check,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Camera,
  Users,
  Briefcase,
  Home,
  Wrench,
  Sparkles,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

// Flickering Grid Background Component
const FlickeringGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute inset-0">
            {[...Array(15)].map((_, j) => (
              <motion.div
                key={j}
                className="absolute w-px h-full bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"
                style={{ left: `${(j / 14) * 100}%` }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scaleY: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}
            {[...Array(10)].map((_, k) => (
              <motion.div
                key={k}
                className="absolute w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
                style={{ top: `${(k / 9) * 100}%` }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scaleX: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// Business types with icons
const businessTypes = [
  {
    id: "property",
    name: "Property Management",
    icon: Home,
    color: "from-emerald-500 to-emerald-600",
    description: "Rent out properties, manage tenants",
  },
  {
    id: "recruitment",
    name: "Recruitment Agency",
    icon: Users,
    color: "from-blue-500 to-blue-600",
    description: "Post jobs, find candidates",
  },
  {
    id: "services",
    name: "Service Provider",
    icon: Wrench,
    color: "from-purple-500 to-purple-600",
    description: "Offer professional services",
  },
  {
    id: "consulting",
    name: "Consulting",
    icon: Briefcase,
    color: "from-orange-500 to-orange-600",
    description: "Business consulting services",
  },
]

// Countries for business registration
const countries = [
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
]

interface FormData {
  // Step 1: Business Type
  businessType: string

  // Step 2: Business Info
  businessName: string
  businessDescription: string
  website: string
  foundedYear: string
  employeeCount: string

  // Step 3: Contact Info
  firstName: string
  lastName: string
  email: string
  phone: string
  position: string

  // Step 4: Location
  country: string
  city: string
  address: string
  postalCode: string

  // Step 5: Account Setup
  password: string
  confirmPassword: string
  agreeToTerms: boolean
  marketingEmails: boolean

  // Profile photo
  profilePhoto: string | null
  businessLogo: string | null
}

const steps = [
  { id: 1, title: "Business Type", description: "What type of business are you?" },
  { id: 2, title: "Business Details", description: "Tell us about your company" },
  { id: 3, title: "Contact Information", description: "Your personal details" },
  { id: 4, title: "Location", description: "Where is your business located?" },
  { id: 5, title: "Account Setup", description: "Create your account" },
]

export default function BusinessRegisterPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const logoInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState<FormData>({
    businessType: "",
    businessName: "",
    businessDescription: "",
    website: "",
    foundedYear: "",
    employeeCount: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    marketingEmails: false,
    profilePhoto: null,
    businessLogo: null,
  })

  // Validation functions
  const isStep1Valid = () => formData.businessType !== ""
  const isStep2Valid = () => formData.businessName && formData.businessDescription
  const isStep3Valid = () => formData.firstName && formData.lastName && formData.email && formData.phone
  const isStep4Valid = () => formData.country && formData.city && formData.address
  const isStep5Valid = () =>
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword &&
    formData.agreeToTerms

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return isStep1Valid()
      case 2:
        return isStep2Valid()
      case 3:
        return isStep3Valid()
      case 4:
        return isStep4Valid()
      case 5:
        return isStep5Valid()
      default:
        return false
    }
  }

  const handleNext = () => {
    if (canProceed() && currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!isStep5Valid()) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))
    router.push("/business/dashboard")
  }

  const handleFileUpload = (type: "profile" | "logo") => {
    const input = type === "profile" ? fileInputRef.current : logoInputRef.current
    if (input) {
      input.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "profile" | "logo") => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        if (type === "profile") {
          setFormData((prev) => ({ ...prev, profilePhoto: result }))
        } else {
          setFormData((prev) => ({ ...prev, businessLogo: result }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Header with Flickering Grid */}
      <div className="relative h-32 overflow-hidden">
        <FlickeringGrid />
        <div className="relative z-10 container mx-auto px-4 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Join as a Business Partner
            </h1>
            <p className="text-muted-foreground">Start posting your listings and connect with customers</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Bar */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  className={cn(
                    "w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all duration-300",
                    currentStep >= step.id
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 border-transparent text-white shadow-lg"
                      : "border-muted-foreground/30 text-muted-foreground bg-background",
                  )}
                  whileHover={{ scale: 1.05 }}
                >
                  {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                </motion.div>
                {index < steps.length - 1 && (
                  <div className="w-16 h-0.5 mx-2 bg-muted-foreground/20 relative overflow-hidden">
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
          <Progress value={progress} className="h-2" />
        </motion.div>

        {/* Form Container */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="backdrop-blur-xl bg-card/95 border-border/50 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold">{steps[currentStep - 1].title}</CardTitle>
              <p className="text-muted-foreground">{steps[currentStep - 1].description}</p>
            </CardHeader>

            <CardContent className="p-8">
              <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                  {/* Step 1: Business Type */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {businessTypes.map((type, index) => (
                          <motion.div
                            key={type.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="cursor-pointer"
                            onClick={() => setFormData((prev) => ({ ...prev, businessType: type.id }))}
                          >
                            <Card
                              className={cn(
                                "p-6 transition-all duration-300 border-2",
                                formData.businessType === type.id
                                  ? "border-blue-500 bg-blue-500/10 shadow-lg"
                                  : "border-border hover:border-border/80 hover:shadow-md",
                              )}
                            >
                              <div className="flex items-start space-x-4">
                                <div
                                  className={cn(
                                    "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br",
                                    type.color,
                                    "text-white shadow-lg",
                                  )}
                                >
                                  <type.icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-lg mb-1">{type.name}</h3>
                                  <p className="text-sm text-muted-foreground">{type.description}</p>
                                </div>
                                {formData.businessType === type.id && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                                  >
                                    <Check className="w-4 h-4 text-white" />
                                  </motion.div>
                                )}
                              </div>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Business Details */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="businessName">Business Name *</Label>
                          <Input
                            id="businessName"
                            placeholder="Enter your business name"
                            value={formData.businessName}
                            onChange={(e) => setFormData((prev) => ({ ...prev, businessName: e.target.value }))}
                            className="bg-background/50"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            placeholder="https://yourwebsite.com"
                            value={formData.website}
                            onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                            className="bg-background/50"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="businessDescription">Business Description *</Label>
                        <Textarea
                          id="businessDescription"
                          placeholder="Describe what your business does, your services, and what makes you unique..."
                          value={formData.businessDescription}
                          onChange={(e) => setFormData((prev) => ({ ...prev, businessDescription: e.target.value }))}
                          className="bg-background/50 min-h-[120px]"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="foundedYear">Founded Year</Label>
                          <Select
                            value={formData.foundedYear}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, foundedYear: value }))}
                          >
                            <SelectTrigger className="bg-background/50">
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="employeeCount">Number of Employees</Label>
                          <Select
                            value={formData.employeeCount}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, employeeCount: value }))}
                          >
                            <SelectTrigger className="bg-background/50">
                              <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Just me</SelectItem>
                              <SelectItem value="2-10">2-10 employees</SelectItem>
                              <SelectItem value="11-50">11-50 employees</SelectItem>
                              <SelectItem value="51-200">51-200 employees</SelectItem>
                              <SelectItem value="200+">200+ employees</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Business Logo Upload */}
                      <div className="space-y-2">
                        <Label>Business Logo</Label>
                        <div className="flex items-center space-x-4">
                          <div className="w-20 h-20 rounded-xl border-2 border-dashed border-border flex items-center justify-center bg-muted/50">
                            {formData.businessLogo ? (
                              <img
                                src={formData.businessLogo || "/placeholder.svg"}
                                alt="Logo"
                                className="w-full h-full object-cover rounded-xl"
                              />
                            ) : (
                              <Building2 className="w-8 h-8 text-muted-foreground" />
                            )}
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleFileUpload("logo")}
                            className="flex items-center space-x-2"
                          >
                            <Upload className="w-4 h-4" />
                            <span>Upload Logo</span>
                          </Button>
                        </div>
                        <input
                          ref={logoInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, "logo")}
                          className="hidden"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Contact Information */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Profile Photo Upload */}
                      <div className="flex justify-center mb-6">
                        <div className="relative">
                          <Avatar className="w-24 h-24">
                            <AvatarImage src={formData.profilePhoto || ""} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl">
                              {formData.firstName?.[0] || <User className="w-8 h-8" />}
                            </AvatarFallback>
                          </Avatar>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                            onClick={() => handleFileUpload("profile")}
                          >
                            <Camera className="w-4 h-4" />
                          </Button>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, "profile")}
                          className="hidden"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            placeholder="Enter your first name"
                            value={formData.firstName}
                            onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                            className="bg-background/50"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            placeholder="Enter your last name"
                            value={formData.lastName}
                            onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                            className="bg-background/50"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                            className="bg-background/50"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            placeholder="+31 6 12345678"
                            value={formData.phone}
                            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                            className="bg-background/50"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="position">Your Position</Label>
                        <Input
                          id="position"
                          placeholder="e.g., CEO, Manager, Owner"
                          value={formData.position}
                          onChange={(e) => setFormData((prev) => ({ ...prev, position: e.target.value }))}
                          className="bg-background/50"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Location */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="country">Country *</Label>
                          <Select
                            value={formData.country}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, country: value }))}
                          >
                            <SelectTrigger className="bg-background/50">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              {countries.map((country) => (
                                <SelectItem key={country.code} value={country.code}>
                                  <div className="flex items-center space-x-2">
                                    <span>{country.flag}</span>
                                    <span>{country.name}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            placeholder="Enter your city"
                            value={formData.city}
                            onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                            className="bg-background/50"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address *</Label>
                        <Input
                          id="address"
                          placeholder="Enter your business address"
                          value={formData.address}
                          onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                          className="bg-background/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          placeholder="Enter postal code"
                          value={formData.postalCode}
                          onChange={(e) => setFormData((prev) => ({ ...prev, postalCode: e.target.value }))}
                          className="bg-background/50"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 5: Account Setup */}
                  {currentStep === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="password">Password *</Label>
                          <div className="relative">
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Create a strong password"
                              value={formData.password}
                              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                              className="bg-background/50 pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm Password *</Label>
                          <div className="relative">
                            <Input
                              id="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm your password"
                              value={formData.confirmPassword}
                              onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                              className="bg-background/50 pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>
                      </div>

                      {formData.password &&
                        formData.confirmPassword &&
                        formData.password !== formData.confirmPassword && (
                          <p className="text-red-500 text-sm">Passwords do not match</p>
                        )}

                      <div className="space-y-4">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onCheckedChange={(checked) =>
                              setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))
                            }
                          />
                          <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
                            I agree to the{" "}
                            <a href="#" className="text-blue-600 hover:underline">
                              Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-blue-600 hover:underline">
                              Privacy Policy
                            </a>
                          </Label>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="marketingEmails"
                            checked={formData.marketingEmails}
                            onCheckedChange={(checked) =>
                              setFormData((prev) => ({ ...prev, marketingEmails: checked as boolean }))
                            }
                          />
                          <Label htmlFor="marketingEmails" className="text-sm leading-relaxed">
                            I would like to receive marketing emails about new features and opportunities
                          </Label>
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h3 className="font-semibold mb-2">Registration Summary</h3>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>
                            <span className="font-medium">Business:</span> {formData.businessName}
                          </p>
                          <p>
                            <span className="font-medium">Type:</span>{" "}
                            {businessTypes.find((t) => t.id === formData.businessType)?.name}
                          </p>
                          <p>
                            <span className="font-medium">Contact:</span> {formData.firstName} {formData.lastName}
                          </p>
                          <p>
                            <span className="font-medium">Location:</span> {formData.city},{" "}
                            {countries.find((c) => c.code === formData.country)?.name}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  disabled={currentStep === 1}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </Button>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    Step {currentStep} of {steps.length}
                  </span>

                  {currentStep === 5 ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={!canProceed() || isSubmitting}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex items-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Creating Account...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Create Account</span>
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex items-center space-x-2"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
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
              className="text-center space-y-6"
            >
              <div className="relative">
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-2xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Building2 className="w-10 h-10 text-white" />
                </motion.div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Setting up your business account</h3>
                <p className="text-muted-foreground">This will only take a moment...</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
