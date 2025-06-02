"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Save,
  X,
  Camera,
  Activity,
  FileText,
  Eye,
  MessageSquare,
  Star,
  Building2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Mock user data
const userData = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+31 6 12345678",
  position: "CEO",
  bio: "Experienced property manager with over 10 years in the Amsterdam real estate market. Passionate about helping people find their perfect home.",
  location: "Amsterdam, Netherlands",
  joinDate: "2023-01-15",
  profilePhoto: "/placeholder.svg?height=120&width=120",
  businessName: "Amsterdam Properties",
  businessType: "Property Management",
  website: "https://amsterdamproperties.com",
  verified: true,
}

// Mock activity data
const activityData = [
  {
    id: "1",
    type: "listing",
    title: "Posted new apartment listing",
    description: "Modern 2-bedroom apartment in Jordaan",
    date: "2024-01-15",
    status: "active",
    views: 245,
    inquiries: 12,
  },
  {
    id: "2",
    type: "review",
    title: "Received new review",
    description: "5-star review from Maria Rodriguez",
    date: "2024-01-14",
    rating: 5,
  },
  {
    id: "3",
    type: "message",
    title: "New inquiry received",
    description: "Question about apartment availability",
    date: "2024-01-13",
    status: "unread",
  },
  {
    id: "4",
    type: "listing",
    title: "Updated listing photos",
    description: "Added new photos to Canal View Studio",
    date: "2024-01-12",
    status: "active",
    views: 189,
    inquiries: 8,
  },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState(userData)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    // Here you would typically save to an API
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedData(userData)
    setIsEditing(false)
  }

  const handlePhotoUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setEditedData((prev) => ({ ...prev, profilePhoto: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "listing":
        return FileText
      case "review":
        return Star
      case "message":
        return MessageSquare
      default:
        return Activity
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "listing":
        return "text-blue-500"
      case "review":
        return "text-yellow-500"
      case "message":
        return "text-green-500"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your personal information and account settings</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center">
                  {/* Profile Photo */}
                  <div className="relative inline-block mb-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage
                        src={editedData.profilePhoto || "/placeholder.svg"}
                        alt={`${editedData.firstName} ${editedData.lastName}`}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl">
                        {editedData.firstName[0]}
                        {editedData.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                        onClick={handlePhotoUpload}
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <h2 className="text-xl font-bold">
                        {editedData.firstName} {editedData.lastName}
                      </h2>
                      {editedData.verified && (
                        <Badge variant="secondary" className="bg-green-500/20 text-green-700 border-green-500/30">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground">{editedData.position}</p>
                    <p className="text-sm text-muted-foreground flex items-center justify-center">
                      <Building2 className="w-4 h-4 mr-1" />
                      {editedData.businessName}
                    </p>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span>{editedData.email}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>{editedData.phone}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{editedData.location}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {new Date(editedData.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {!isEditing ? (
                    <Button onClick={handleEdit} className="w-full">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button onClick={handleSave} className="flex-1">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={handleCancel} variant="outline" className="flex-1">
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal">Personal Information</TabsTrigger>
                <TabsTrigger value="activity">Activity & History</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                  <CardHeader>
                    <CardTitle>Personal Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={editedData.firstName}
                          onChange={(e) => setEditedData((prev) => ({ ...prev, firstName: e.target.value }))}
                          disabled={!isEditing}
                          className={cn(!isEditing && "bg-muted/50")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={editedData.lastName}
                          onChange={(e) => setEditedData((prev) => ({ ...prev, lastName: e.target.value }))}
                          disabled={!isEditing}
                          className={cn(!isEditing && "bg-muted/50")}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editedData.email}
                          onChange={(e) => setEditedData((prev) => ({ ...prev, email: e.target.value }))}
                          disabled={!isEditing}
                          className={cn(!isEditing && "bg-muted/50")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={editedData.phone}
                          onChange={(e) => setEditedData((prev) => ({ ...prev, phone: e.target.value }))}
                          disabled={!isEditing}
                          className={cn(!isEditing && "bg-muted/50")}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Input
                        id="position"
                        value={editedData.position}
                        onChange={(e) => setEditedData((prev) => ({ ...prev, position: e.target.value }))}
                        disabled={!isEditing}
                        className={cn(!isEditing && "bg-muted/50")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={editedData.bio}
                        onChange={(e) => setEditedData((prev) => ({ ...prev, bio: e.target.value }))}
                        disabled={!isEditing}
                        className={cn("min-h-[100px]", !isEditing && "bg-muted/50")}
                        placeholder="Tell us about yourself and your business..."
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                  <CardHeader>
                    <CardTitle>Business Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input
                          id="businessName"
                          value={editedData.businessName}
                          onChange={(e) => setEditedData((prev) => ({ ...prev, businessName: e.target.value }))}
                          disabled={!isEditing}
                          className={cn(!isEditing && "bg-muted/50")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="businessType">Business Type</Label>
                        <Input id="businessType" value={editedData.businessType} disabled className="bg-muted/50" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={editedData.website}
                        onChange={(e) => setEditedData((prev) => ({ ...prev, website: e.target.value }))}
                        disabled={!isEditing}
                        className={cn(!isEditing && "bg-muted/50")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={editedData.location}
                        onChange={(e) => setEditedData((prev) => ({ ...prev, location: e.target.value }))}
                        disabled={!isEditing}
                        className={cn(!isEditing && "bg-muted/50")}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activityData.map((activity, index) => {
                        const IconComponent = getActivityIcon(activity.type)
                        const iconColor = getActivityColor(activity.type)

                        return (
                          <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                          >
                            <div
                              className={cn(
                                "w-10 h-10 rounded-full bg-background flex items-center justify-center",
                                iconColor,
                              )}
                            >
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{activity.title}</h4>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(activity.date).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>

                              {activity.type === "listing" && (
                                <div className="flex items-center space-x-4 mt-2">
                                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                    <Eye className="w-3 h-3" />
                                    <span>{activity.views} views</span>
                                  </div>
                                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                    <MessageSquare className="w-3 h-3" />
                                    <span>{activity.inquiries} inquiries</span>
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    {activity.status}
                                  </Badge>
                                </div>
                              )}

                              {activity.type === "review" && activity.rating && (
                                <div className="flex items-center space-x-1 mt-2">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={cn(
                                        "w-4 h-4",
                                        i < activity.rating! ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
                                      )}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FileText className="w-6 h-6 text-blue-500" />
                      </div>
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-sm text-muted-foreground">Active Listings</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Eye className="w-6 h-6 text-green-500" />
                      </div>
                      <div className="text-2xl font-bold">1,234</div>
                      <div className="text-sm text-muted-foreground">Total Views</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Star className="w-6 h-6 text-yellow-500" />
                      </div>
                      <div className="text-2xl font-bold">4.8</div>
                      <div className="text-sm text-muted-foreground">Average Rating</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
