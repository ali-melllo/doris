"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Globe, ArrowRight, Check, Star, Users, Sparkles, Languages } from "lucide-react"
import { cn } from "@/lib/utils"

// Language data with enhanced information
const languages = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
    popularity: 95,
    speakers: "1.5B",
    difficulty: "Easy",
    region: "Global",
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    popularity: 88,
    speakers: "500M",
    difficulty: "Easy",
    region: "Americas, Europe",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    popularity: 75,
    speakers: "280M",
    difficulty: "Medium",
    region: "Europe, Africa",
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    popularity: 70,
    speakers: "100M",
    difficulty: "Hard",
    region: "Central Europe",
  },
  {
    code: "it",
    name: "Italian",
    nativeName: "Italiano",
    flag: "🇮🇹",
    popularity: 65,
    speakers: "65M",
    difficulty: "Medium",
    region: "Southern Europe",
  },
  {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
    flag: "🇵🇹",
    popularity: 72,
    speakers: "260M",
    difficulty: "Medium",
    region: "Americas, Europe",
  },
  {
    code: "nl",
    name: "Dutch",
    nativeName: "Nederlands",
    flag: "🇳🇱",
    popularity: 60,
    speakers: "24M",
    difficulty: "Medium",
    region: "Western Europe",
  },
  {
    code: "sv",
    name: "Swedish",
    nativeName: "Svenska",
    flag: "🇸🇪",
    popularity: 55,
    speakers: "10M",
    difficulty: "Medium",
    region: "Scandinavia",
  },
  {
    code: "no",
    name: "Norwegian",
    nativeName: "Norsk",
    flag: "🇳🇴",
    popularity: 52,
    speakers: "5M",
    difficulty: "Medium",
    region: "Scandinavia",
  },
  {
    code: "da",
    name: "Danish",
    nativeName: "Dansk",
    flag: "🇩🇰",
    popularity: 50,
    speakers: "6M",
    difficulty: "Medium",
    region: "Scandinavia",
  },
  {
    code: "fi",
    name: "Finnish",
    nativeName: "Suomi",
    flag: "🇫🇮",
    popularity: 45,
    speakers: "5M",
    difficulty: "Hard",
    region: "Northern Europe",
  },
  {
    code: "pl",
    name: "Polish",
    nativeName: "Polski",
    flag: "🇵🇱",
    popularity: 68,
    speakers: "45M",
    difficulty: "Hard",
    region: "Eastern Europe",
  },
  {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
    flag: "🇷🇺",
    popularity: 80,
    speakers: "260M",
    difficulty: "Hard",
    region: "Eastern Europe, Asia",
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇸🇦",
    popularity: 85,
    speakers: "420M",
    difficulty: "Hard",
    region: "Middle East, Africa",
  },
  {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    flag: "🇨🇳",
    popularity: 90,
    speakers: "1.1B",
    difficulty: "Hard",
    region: "East Asia",
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
    popularity: 78,
    speakers: "125M",
    difficulty: "Hard",
    region: "East Asia",
  },
  {
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
    flag: "🇰🇷",
    popularity: 75,
    speakers: "77M",
    difficulty: "Hard",
    region: "East Asia",
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    flag: "🇮🇳",
    popularity: 82,
    speakers: "600M",
    difficulty: "Medium",
    region: "South Asia",
  },
  {
    code: "th",
    name: "Thai",
    nativeName: "ไทย",
    flag: "🇹🇭",
    popularity: 65,
    speakers: "60M",
    difficulty: "Hard",
    region: "Southeast Asia",
  },
  {
    code: "vi",
    name: "Vietnamese",
    nativeName: "Tiếng Việt",
    flag: "🇻🇳",
    popularity: 70,
    speakers: "95M",
    difficulty: "Hard",
    region: "Southeast Asia",
  },
]

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.6, 0.2, 0.6],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 6 + Math.random() * 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Language Card Component
const LanguageCard = ({
  language,
  isSelected,
  onClick,
  index,
}: {
  language: (typeof languages)[0]
  isSelected: boolean
  onClick: () => void
  index: number
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600 bg-green-100 dark:bg-green-900/30"
      case "Medium":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30"
      case "Hard":
        return "text-red-600 bg-red-100 dark:bg-red-900/30"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/30"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -30 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        className={cn(
          "cursor-pointer transition-all duration-300 border-2 overflow-hidden group relative",
          isSelected
            ? "border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 shadow-xl shadow-blue-500/25"
            : "border-border/50 hover:border-border bg-card/50 backdrop-blur-sm hover:shadow-lg",
        )}
        onClick={onClick}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <motion.div
                className="text-4xl"
                animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
                transition={{ duration: 0.5 }}
              >
                {language.flag}
              </motion.div>
              <div>
                <h3 className="font-bold text-lg">{language.name}</h3>
                <p className="text-sm text-muted-foreground">{language.nativeName}</p>
              </div>
            </div>

            <AnimatePresence>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-3">
            {/* Popularity Bar */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Popularity</span>
                <span className="text-xs font-medium">{language.popularity}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${language.popularity}%` }}
                  transition={{ duration: 1, delay: index * 0.05 }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3 text-muted-foreground" />
                <span className="text-muted-foreground">{language.speakers}</span>
              </div>
              <Badge variant="secondary" className={cn("text-xs px-2 py-1", getDifficultyColor(language.difficulty))}>
                {language.difficulty}
              </Badge>
            </div>

            {/* Region */}
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Globe className="w-3 h-3" />
              <span>{language.region}</span>
            </div>
          </div>

          {/* Hover Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0 }}
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Main Language Selection Page
export default function LanguageSelectionPage() {
  const router = useRouter()
  const [selectedLanguage, setSelectedLanguage] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredLanguages, setFilteredLanguages] = useState(languages)

  useEffect(() => {
    const filtered = languages.filter(
      (lang) =>
        lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredLanguages(filtered)
  }, [searchQuery])

  const handleContinue = () => {
    if (selectedLanguage) {
      router.push("/login")
    }
  }

  const popularLanguages = languages.filter((lang) => lang.popularity >= 75)

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950 relative overflow-hidden">
      {/* Background Effects */}
      <FloatingParticles />

      {/* Header */}
      <div className="relative z-10 pt-8 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            {/* Logo */}
            <motion.div className="flex items-center justify-center space-x-3" whileHover={{ scale: 1.05 }}>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Languages className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Choose Your Language
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Select your preferred language to personalize your Doris AI experience
            </motion.p>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Badge
                variant="secondary"
                className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                20+ Languages Supported
              </Badge>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pb-20">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-md mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search languages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg bg-background/80 backdrop-blur-sm border-border/50 focus:border-blue-500/50 rounded-2xl shadow-lg"
              />
            </div>
          </motion.div>

          {/* Popular Languages Section */}
          {!searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-12"
            >
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Star className="w-5 h-5 text-yellow-500" />
                <h2 className="text-2xl font-bold text-center">Most Popular</h2>
                <Star className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {popularLanguages.map((language, index) => (
                  <LanguageCard
                    key={language.code}
                    language={language}
                    isSelected={selectedLanguage === language.code}
                    onClick={() => setSelectedLanguage(language.code)}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* All Languages Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-center mb-8">
              {searchQuery ? `Search Results (${filteredLanguages.length})` : "All Languages"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredLanguages.map((language, index) => (
                <LanguageCard
                  key={language.code}
                  language={language}
                  isSelected={selectedLanguage === language.code}
                  onClick={() => setSelectedLanguage(language.code)}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          {/* No Results */}
          {searchQuery && filteredLanguages.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No languages found</h3>
              <p className="text-muted-foreground">Try searching with a different term</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Fixed Bottom Action */}
      <AnimatePresence>
        {selectedLanguage && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 p-6 bg-background/90 backdrop-blur-xl border-t border-border/50 z-50"
          >
            <div className="container mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{languages.find((l) => l.code === selectedLanguage)?.flag}</div>
                  <div>
                    <p className="font-semibold">{languages.find((l) => l.code === selectedLanguage)?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {languages.find((l) => l.code === selectedLanguage)?.nativeName}
                    </p>
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleContinue}
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-xl px-8 py-6 text-lg"
                  >
                    Continue
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
