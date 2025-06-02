"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  BarChart3,
  Edit3,
  Eye,
  Home,
  MessageSquare,
  Plus,
  Search,
  Settings,
  Star,
  TrendingUp,
  Upload,
  MoreHorizontal,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// Mock data
const businessData = {
  name: "Amsterdam Properties",
  type: "Property Management",
  logo: "/placeholder.svg?height=60&width=60",
  coverImage: "/placeholder.svg?height=200&width=800",
  description: "Premium property management services in Amsterdam and surrounding areas.",
  stats: {
    totalListings: 24,
    activeListings: 18,
    totalViews: 12450,
    totalInquiries: 342,
    averageRating: 4.8,
    responseRate: 95,
  },
  recentActivity: [
    { id: 1, type: "inquiry", message: "New inquiry for Canal View Apartment", time: "2 hours ago" },
    { id: 2, type: "listing", message: "Apartment listing approved", time: "4 hours ago" },
    { id: 3, type: "review", message: "New 5-star review received", time: "1 day ago" },
  ],
}

const listings = [
  {
    id: 1,
    title: "Modern Canal View Apartment",
    type: "Apartment",
    price: "€1,800/month",
    location: "Jordaan, Amsterdam",
    status: "active",
    views: 245,
    inquiries: 12,
    image: "/placeholder.svg?height=100&width=150",
    datePosted: "2024-01-10",
  },
  {
    id: 2,
    title: "Cozy Studio in City Center",
    type: "Studio",
    price: "€1,200/month",
    location: "Centrum, Amsterdam",
    status: "active",
    views: 189,
    inquiries: 8,
    image: "/placeholder.svg?height=100&width=150",
    datePosted: "2024-01-08",
  },
  {
    id: 3,
    title: "Spacious Family House",
    type: "House",
    price: "€2,500/month",
    location: "Amstelveen",
    status: "pending",
    views: 156,
    inquiries: 15,
    image: "/placeholder.svg?height=100&width=150",
    datePosted: "2024-01-05",
  },
]

const sidebarItems = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "listings", label: "Listings", icon: Home },
  { id: "inquiries", label: "Inquiries", icon: MessageSquare },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
  { id: "settings", label: "Settings", icon: Settings },
]

export default function BusinessDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || listing.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-700 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-700 border-yellow-500/30"
      case "inactive":
        return "bg-gray-500/20 text-gray-700 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-700 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="flex">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-64 min-h-screen bg-card/50 backdrop-blur-sm border-r border-border/50 p-6"
        >
          {/* Business Info */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={businessData.logo || "/placeholder.svg"} alt={businessData.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">AP</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{businessData.name}</h2>
                <p className="text-sm text-muted-foreground">{businessData.type}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors",
                  activeTab === item.id
                    ? "bg-blue-500/20 text-blue-700 border border-blue-500/30"
                    : "hover:bg-muted/50 text-muted-foreground hover:text-foreground",
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Business Dashboard</h1>
                <p className="text-muted-foreground">Manage your listings and track performance</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                New Listing
              </Button>
            </div>

            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Listings</p>
                          <p className="text-2xl font-bold">{businessData.stats.totalListings}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <Home className="w-6 h-6 text-blue-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Views</p>
                          <p className="text-2xl font-bold">{businessData.stats.totalViews.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                          <Eye className="w-6 h-6 text-green-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Inquiries</p>
                          <p className="text-2xl font-bold">{businessData.stats.totalInquiries}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                          <MessageSquare className="w-6 h-6 text-purple-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Avg. Rating</p>
                          <p className="text-2xl font-bold">{businessData.stats.averageRating}</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                          <Star className="w-6 h-6 text-yellow-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Business Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                    <CardHeader>
                      <CardTitle>Business Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="relative h-32 rounded-lg overflow-hidden">
                        <img
                          src={businessData.coverImage || "/placeholder.svg"}
                          alt="Business cover"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Change Cover
                        </Button>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{businessData.name}</h3>
                        <p className="text-muted-foreground">{businessData.description}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{businessData.type}</Badge>
                        <Button variant="ghost" size="sm">
                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {businessData.recentActivity.map((activity) => (
                          <div key={activity.id} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                            <div className="flex-1">
                              <p className="text-sm">{activity.message}</p>
                              <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "listings" && (
              <div className="space-y-6">
                {/* Filters and Search */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Search listings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Listing
                    </Button>
                  </div>
                </div>

                {/* Listings Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredListings.map((listing, index) => (
                    <motion.div
                      key={listing.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                        <div className="relative">
                          <img
                            src={listing.image || "/placeholder.svg"}
                            alt={listing.title}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <Badge className={cn("absolute top-2 left-2", getStatusColor(listing.status))}>
                            {listing.status}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit3 className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div>
                              <h3 className="font-semibold line-clamp-1">{listing.title}</h3>
                              <p className="text-sm text-muted-foreground">{listing.location}</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-lg text-blue-600">{listing.price}</span>
                              <Badge variant="outline">{listing.type}</Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                  <Eye className="w-4 h-4" />
                                  <span>{listing.views}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MessageSquare className="w-4 h-4" />
                                  <span>{listing.inquiries}</span>
                                </div>
                              </div>
                              <span>{new Date(listing.datePosted).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {filteredListings.length === 0 && (
                  <div className="text-center py-12">
                    <Home className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No listings found</h3>
                    <p className="text-muted-foreground mb-6">
                      {searchTerm || filterStatus !== "all"
                        ? "Try adjusting your search or filters"
                        : "Create your first listing to get started"}
                    </p>
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Listing
                    </Button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "inquiries" && (
              <div className="space-y-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                  <CardHeader>
                    <CardTitle>Recent Inquiries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No inquiries yet</h3>
                      <p className="text-muted-foreground">Inquiries from potential customers will appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="space-y-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                  <CardHeader>
                    <CardTitle>Analytics Dashboard</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Analytics Coming Soon</h3>
                      <p className="text-muted-foreground">Detailed analytics and insights will be available here</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                  <CardHeader>
                    <CardTitle>Business Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Settings Panel</h3>
                      <p className="text-muted-foreground">Business configuration options will be available here</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
