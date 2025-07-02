"use client"
import { motion } from "framer-motion"
import { CheckCircle, Download, Calendar, MessageCircle, ArrowRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function OnboardingCompletePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="success-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-green-500/20"
                />
              </pattern>
              <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.1" />
                <stop offset="50%" stopColor="rgb(59, 130, 246)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="rgb(147, 51, 234)" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#success-grid)" />
            <rect width="100%" height="100%" fill="url(#successGradient)" />
          </svg>
        </div>

        {/* Floating Success Elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 blur-xl"
            style={{
              width: Math.random() * 150 + 80,
              height: Math.random() * 150 + 80,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Onboarding Complete!
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Congratulations! You have successfully completed the immigration onboarding process. Our team will review
              your information and contact you within 24-48 hours.
            </p>
          </motion.div>

          {/* Status Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            <Card className="backdrop-blur-xl bg-card/90 border-border/50 shadow-xl">
              <CardHeader className="text-center pb-3">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Application Submitted</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Your immigration application has been successfully submitted and is being processed.
                </p>
                <Badge variant="secondary" className="mt-2">
                  Status: Processing
                </Badge>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-card/90 border-border/50 shadow-xl">
              <CardHeader className="text-center pb-3">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Appointment Scheduled</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Your appointment has been scheduled. You will receive a confirmation email shortly.
                </p>
                <Badge variant="secondary" className="mt-2">
                  Confirmed
                </Badge>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-card/90 border-border/50 shadow-xl">
              <CardHeader className="text-center pb-3">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MessageCircle className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Support Available</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Our immigration experts are available 24/7 to answer any questions you may have.
                </p>
                <Badge variant="secondary" className="mt-2">
                  Active
                </Badge>
              </CardContent>
            </Card>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12"
          >
            <Card className="backdrop-blur-xl bg-card/90 border-border/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-center text-2xl">What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Immediate Actions</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Email Confirmation</p>
                          <p className="text-sm text-muted-foreground">
                            Check your email for confirmation and reference number
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Download className="w-3 h-3 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Download Documents</p>
                          <p className="text-sm text-muted-foreground">Save your application summary and checklist</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Within 48 Hours</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <MessageCircle className="w-3 h-3 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">Expert Review</p>
                          <p className="text-sm text-muted-foreground">
                            Our immigration team will review your application
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Calendar className="w-3 h-3 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-medium">Appointment Details</p>
                          <p className="text-sm text-muted-foreground">
                            Receive detailed appointment information and preparation guide
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border/50">
                  <Button className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
                    <Download className="w-4 h-4 mr-2" />
                    Download Application Summary
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          >
            <Link href="/immigration-onboarding">
              <Button variant="outline" size="lg" className="px-8 bg-transparent">
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                Start New Application
              </Button>
            </Link>
            <Link href="/">
              <Button
                size="lg"
                className="px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Home className="w-4 h-4 mr-2" />
                Return to Home
              </Button>
            </Link>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 p-6 bg-muted/50 rounded-lg border border-border/50"
          >
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Our immigration support team is here to help you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-blue-600" />
                <span>support@immigration-help.nl</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-green-600" />
                <span>+31 20 123 4567</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
