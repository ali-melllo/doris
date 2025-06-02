"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import {
  Bot,
  ChevronDown,
  Globe,
  LogIn,
  Menu,
  Moon,
  Sun,
  User,
  Home,
  Briefcase,
  Building2,
  Users,
  HelpCircle,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

// Language options
const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
]

// Navigation items
const navigationItems = [
//   { name: "Home", href: "/", icon: Home },
  { name: "Jobs", href: "/jobs", icon: Briefcase },
  { name: "Housing", href: "/houses", icon: Building2 },
  { name: "Chat", href: "/chat", icon: Users },
  { name: "Browse", href: "/map", icon: HelpCircle },
]

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState(languages[0])
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false) // For demo purposes
  const { theme, setTheme } = useTheme()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Toggle authentication (for demo purposes)
  const toggleAuth = () => {
    setIsAuthenticated(!isAuthenticated)
  }

  return (
    <motion.header
      className="fixed top-0 z-[1000] left-0 right-0  backdrop-blur-xl bg-card/95 transition-all duration-300 ease-in-out"
    >
      <motion.div
        className={cn(
          "mx-auto px-6 py-4 transition-all md:py-5 duration-500 ease-in-out",
          isScrolled
            ? "max-w-7xl md:mt-2 bg-background/95 backdrop-blur-lg shadow-lg border border-border/50 rounded-2xl"
            : "max-w-full",
        )}

        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-5 stroke-primary h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Doris AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex ml-14 items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 rounded-lg text-base text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center justify-end">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hidden !outline-none md:flex items-center space-x-1">
                  <Globe className="w-5 h-5" />
                  <ChevronDown className="w-4 h-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 mr-5 mt-5">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setCurrentLanguage(lang)}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.name}</span>
                    {currentLanguage.code === lang.code && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500"
                      />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="default"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative hidden md:block"
            >
              <Sun
                className={cn(
                  "w-5 h-5 absolute transition-all",
                  theme === "dark" ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100",
                )}
              />
              <Moon
                className={cn(
                  "w-5 h-5 transition-all",
                  theme === "dark" ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0",
                )}
              />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Authentication */}
            {isAuthenticated ? (
              <DropdownMenu open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="default" className="relative rounded-full">
                    <Avatar className="w-9 h-9">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-xs text-muted-foreground">john@example.com</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={toggleAuth}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                // onClick={toggleAuth}
                href="/login"
                className="bg-gradient-to-r flex items-center gap-2 rounded-lg px-3 py-2 from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm"
              >
                <LogIn className="w-4 h-4 mr-1" />
                Sign In
              </Link>
            )}

            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="w-5 h-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] sm:w-[350px] pr-0">
                <SheetHeader className="mb-6">
                  <SheetTitle className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Doris AI
                    </span>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col space-y-2 pr-6">
                  {navigationItems.map((item) => (
                    <SheetClose asChild key={item.name}>
                      <Link
                        href={item.href}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <item.icon className="w-5 h-5 text-muted-foreground" />
                        <span>{item.name}</span>
                      </Link>
                    </SheetClose>
                  ))}

                  <div className="pt-4 mt-4 border-t border-border">
                    <div className="flex items-center justify-between px-4 py-2">
                      <span className="text-sm text-muted-foreground">Language</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                            <span className="text-base">{currentLanguage.flag}</span>
                            <span className="text-sm">{currentLanguage.name}</span>
                            <ChevronDown className="w-4 h-4 opacity-50" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          {languages.map((lang) => (
                            <DropdownMenuItem
                              key={lang.code}
                              onClick={() => setCurrentLanguage(lang)}
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <span className="text-base">{lang.flag}</span>
                              <span>{lang.name}</span>
                              {currentLanguage.code === lang.code && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500"
                                />
                              )}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-center justify-between px-4 py-2">
                      <span className="text-sm text-muted-foreground">Theme</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="relative"
                      >
                        {theme === "dark" ? (
                          <div className="flex items-center">
                            <Moon className="w-4 h-4 mr-1" />
                            <span>Dark</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Sun className="w-4 h-4 mr-1" />
                            <span>Light</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-border">
                    {isAuthenticated ? (
                      <div className="px-4 py-2 space-y-3">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                              JD
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">John Doe</p>
                            <p className="text-xs text-muted-foreground">john@example.com</p>
                          </div>
                        </div>
                        <Button
                          onClick={toggleAuth}
                          variant="outline"
                          className="w-full flex items-center justify-center"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign out
                        </Button>
                      </div>
                    ) : (
                      <div className="px-4 py-2">
                        <Button
                          onClick={toggleAuth}
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                        >
                          <LogIn className="w-4 h-4 mr-2" />
                          Sign In
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.div>
    </motion.header>
  )
}
