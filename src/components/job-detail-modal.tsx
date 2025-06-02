"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { MapPin, Calendar, Euro, Clock, Users, Building2, Star, Share2, Bookmark, ExternalLink } from "lucide-react"

interface Job {
  id: number
  title: string
  company: string
  logo: string
  location: string
  remote: boolean
  salary: string
  type: string
  postedDate: string
  category: string[]
  description?: string
  requirements?: string[]
  benefits?: string[]
  companyDescription?: string
  teamSize?: string
  experience?: string
}

interface JobDetailModalProps {
  job: Job | null
  isOpen: boolean
  onClose: () => void
}

export function JobDetailModal({ job, isOpen, onClose }: JobDetailModalProps) {
  const [isSaved, setIsSaved] = useState(false)

  if (!job) return null

  const handleApply = () => {
    // Handle job application
    console.log("Applying to job:", job.id)
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
  }

  const handleShare = () => {
    // Handle sharing
    navigator.clipboard.writeText(`Check out this job: ${job.title} at ${job.company}`)
  }

  // Mock detailed job data
  const jobDetails = {
    ...job,
    description: `We are looking for a talented ${job.title} to join our dynamic team at ${job.company}. This is an exciting opportunity to work on cutting-edge projects and make a real impact in a fast-growing company.

As a ${job.title}, you will be responsible for developing and maintaining high-quality applications, collaborating with cross-functional teams, and contributing to our technical architecture decisions.

We offer a collaborative work environment, opportunities for professional growth, and the chance to work with the latest technologies in the industry.`,
    requirements: [
      "3+ years of experience in relevant technologies",
      "Strong problem-solving skills",
      "Experience with modern development frameworks",
      "Excellent communication skills",
      "Bachelor's degree in Computer Science or related field",
      "Experience with agile development methodologies",
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health insurance",
      "Flexible working hours",
      "Remote work options",
      "Professional development budget",
      "Modern office with great amenities",
      "Team building events and company retreats",
    ],
    companyDescription: `${job.company} is a leading technology company focused on innovation and excellence. We're building the future of digital solutions and are looking for passionate individuals to join our mission.`,
    teamSize: "15-20 people",
    experience: "3-5 years",
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[70vh] p-0 overflow-y-scroll">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="p-6 pb-4 border-b border-border/50">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={jobDetails.logo || "/placeholder.svg"} alt={jobDetails.company} />
                  <AvatarFallback className="text-lg font-semibold">
                    {jobDetails.company}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <DialogTitle className="text-2xl font-bold mb-2">{jobDetails.title}</DialogTitle>
                  <DialogDescription className="text-lg font-medium text-foreground">
                    {jobDetails.company}
                  </DialogDescription>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {jobDetails.location} {jobDetails.remote && "• Remote available"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Posted {jobDetails.postedDate}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleSave} className={isSaved ? "text-yellow-500" : ""}>
                  <Bookmark className="w-4 h-4" fill={isSaved ? "currentColor" : "none"} />
                </Button>
              </div>
            </div>
          </DialogHeader>

          {/* Content */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-8">
              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <Euro className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <div className="font-semibold">{jobDetails.salary}</div>
                  <div className="text-sm text-muted-foreground">Salary</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <div className="font-semibold">{jobDetails.type}</div>
                  <div className="text-sm text-muted-foreground">Type</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <Users className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                  <div className="font-semibold">{jobDetails.teamSize}</div>
                  <div className="text-sm text-muted-foreground">Team Size</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <Star className="w-6 h-6 mx-auto mb-2 text-orange-600" />
                  <div className="font-semibold">{jobDetails.experience}</div>
                  <div className="text-sm text-muted-foreground">Experience</div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {jobDetails.category.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Job Description */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Job Description</h3>
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  {jobDetails.description.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {jobDetails.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Benefits & Perks</h3>
                <ul className="space-y-2">
                  {jobDetails.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              {/* Company Info */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                  <Building2 className="w-5 h-5" />
                  <span>About {jobDetails.company}</span>
                </h3>
                <p className="text-muted-foreground leading-relaxed">{jobDetails.companyDescription}</p>
              </div>
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="p-6 pt-4 border-t border-border/50 bg-muted/20">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Posted {jobDetails.postedDate} • {Math.floor(Math.random() * 50 + 10)} applicants
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                <Button
                  onClick={handleApply}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Apply Now
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
