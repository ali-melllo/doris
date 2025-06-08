"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Minimize2, Maximize2, LogIn, PersonStandingIcon, Globe, Flag, Smile, Mic, Paperclip, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { TypingAnimation } from "./magicui/text-animation"
import { Badge } from "./ui/badge"
import Image from "next/image"

// Messages for each step in different languages
const stepMessages: Record<string, string[]> = {
  en: [
    "Welcome! Let's start by choosing your language.",
    "Great! Now let's sign in to get started.",
    "Tell me where you're from so I can personalize your experience.",
    "What are you looking for help with? Select your goals.",
  ],
  es: [
    "¡Bienvenido! Comencemos eligiendo tu idioma.",
    "¡Genial! Ahora inicia sesión para comenzar.",
    "Dime de dónde eres para personalizar tu experiencia.",
    "¿Con qué necesitas ayuda? Selecciona tus objetivos.",
  ],
  fr: [
    "Bienvenue ! Commençons par choisir votre langue.",
    "Parfait ! Maintenant, connectez-vous pour commencer.",
    "Dites-moi d'où vous venez pour personnaliser votre expérience.",
    "Avec quoi avez-vous besoin d'aide ? Sélectionnez vos objectifs.",
  ],
  de: [
    "Willkommen! Lassen Sie uns mit der Auswahl Ihrer Sprache beginnen.",
    "Großartig! Melden Sie sich jetzt an, um zu beginnen.",
    "Sagen Sie mir, woher Sie kommen, damit ich Ihre Erfahrung personalisieren kann.",
    "Wobei benötigen Sie Hilfe? Wählen Sie Ihre Ziele aus.",
  ],
  zh: [
    "欢迎！让我们先选择您的语言。",
    "太好了！现在请登录以开始。",
    "告诉我您来自哪里，以便我个性化您的体验。",
    "您需要什么帮助？选择您的目标。",
  ],
}

// Default to English if language not found
const getStepMessage = (step: number, language: string) => {
  const messages = stepMessages[language] || stepMessages.en
  return messages[step - 1] || messages[0]
}

// Enhanced Message Bubble Component
function MessageBubble({
  message,
  isVisible,
  position = "bottom",
  isMobile = false,
}: {
  message: string
  isVisible: boolean
  position?: "top" | "bottom" | "left" | "right"
  isMobile?: boolean
}) {
  const bubbleVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: position === "bottom" ? 10 : position === "top" ? -10 : 0,
      x: position === "left" ? 10 : position === "right" ? -10 : 0,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: position === "bottom" ? -10 : position === "top" ? 10 : 0,
      x: position === "left" ? -10 : position === "right" ? 10 : 0,
      filter: "blur(2px)",
      transition: {
        duration: 0.2,
      },
    },
  }

  const positionClasses = {
    top: "bottom-full mb-3",
    bottom: "top-full mt-3",
    left: "right-full mr-3",
    right: "left-full ml-3",
  }

  return (
    <div>
      {isVisible && (
        <motion.div
          variants={bubbleVariants}
          // initial="hidden"
          // animate="visible"
          // exit="exit"
          className={cn("absolute z-10 min-w-48 md:min-w-72", positionClasses[position], isMobile ? "" : "")}
        >
          <Card className="!rounded-tl-none md:ml-5 rounded-3xl bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] border-2 border-blue-200/60 dark:border-blue-700/60 shadow-xl backdrop-blur-md">
            <CardContent className={cn("relative", isMobile ? "p-2.5" : "p-3")}>
              <div
                className={cn(
                  "font-medium text-gray-700 dark:text-gray-200 leading-relaxed",
                  isMobile ? "text-xs" : "text-sm",
                )}
              >
                <TypingAnimation className="text-xs font-medium md:text-sm">{message}</TypingAnimation>
              </div>

              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-lg -z-10 blur-sm" />
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

// Chat Interface Component
function ChatInterface({
  isOpen,
  onClose,
  language = "en",
  currentStep,
  userSoFar,
  page
}: {
  isOpen: boolean
  onClose: () => void
  language?: string
  currentStep: number;
  userSoFar: any;
  page: string;
}) {

  const [messages, setMessages] = useState([{
    role: "assistant",
    content: "Hi there! I'm Doris, your AI migration assistant. How can I help you today?",
  }])

  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const newMessage = {
      role: "user" as const,
      content: inputValue,
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")
    setIsTyping(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/prompt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: inputValue, currentStep: currentStep, currentPage: page }),
      });
      const data = await response.json();
      const formattedBotResponse = {
        role: "assistant" as const,
        content:
          data.data.response,
      }

      setMessages((prev) => [...prev, formattedBotResponse])
      setIsTyping(false)
    } catch (err) {
      setIsTyping(false)
    }
  }

  return (
    <div className="flex flex-col h-full ">
      {/* Chat Header */}
      <div className="flex items-center p-3  justify-between border-b border-border/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold">Doris AI</h3>
            <p className="text-sm text-muted-foreground">Your personal assistant</p>
          </div>
        </div>

      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 pb-32">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
            >
              <Card
                className={cn(
                  "max-w-[80%] p-3 shadow-md rounded-3xl",
                  message.role === "user"
                    ? "bg-gradient-to-br from-blue-500 rounded-tr-none to-purple-600 text-white border-0"
                    : "bg-background rounded-tl-none [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
                )}
              >
                {(index === messages.length - 1 && message.role === "assistant") ?
                  <TypingAnimation duration={20} className="text-sm leading-relaxed">{message.content}</TypingAnimation> :
                  <p className="text-sm leading-relaxed">{message.content}</p>
                }
              </Card>
            </motion.div>
          ))}

          {/* Enhanced Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex justify-start"
              >
                <Card className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-3 shadow-md">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-200"></div>
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce delay-300"></div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Enhanced Input Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute w-full bottom-0  backdrop-blur-md rounded-t-3xl pl-0 md:pl-4 shadow border bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] flex p-4"
      >
        <div className=" mx-auto w-full">
          <div className="flex items-start space-x-3">
            {/* Quick Actions */}


            {/* Input Field */}
            <div className="flex-1 relative">
              <div className="relative pl-3 md:pl-0">
                <Input
                  autoFocus
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything ..."
                  className="pr-20 w-full py-6 text-base rounded-2xl border-border/50 bg-background backdrop-blur-sm !outline-none focus:bg-background transition-all duration-200"
                />

                {/* Input Actions */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                    <Smile className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                    <Mic className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Quick Service Buttons */}
              <div className="md:flex hidden flex-wrap gap-2 mt-3">
                {[
                  { icon: LogIn, label: "Login", color: "from-teal-500 to-teal-600" },
                  { icon: PersonStandingIcon, label: "Sign Up", color: "from-blue-500 to-blue-600" },
                  { icon: Globe, label: "Language", color: "from-purple-500 to-purple-600" },
                  { icon: Flag, label: "Nationality", color: "from-indigo-500 to-indigo-600" },
                ].map((service, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:scale-105 transition-transform duration-200 bg-muted/50 hover:bg-muted/80"
                    onClick={() => setInputValue(`Tell me about ${service.label.toLowerCase()} services`)}
                  >
                    <service.icon className="w-3 h-3 mr-1" />
                    {service.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Send Button */}
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="size-6 stroke-white" />
            </Button>
          </div>
        </div>
      </motion.div>

    </div>
  )
}

// Main Fixed AI Assistant Component
interface FixedAIAssistantProps {
  currentStep?: number
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  className?: string
  language?: string
  showBubble?: boolean;
  userSoFar?: any;
  page?: any;
}

const stepEmotions: Array<"neutral" | "happy" | "thinking" | "excited" | "greeting"> = [
  "greeting",
  "thinking",
  "happy",
  "excited",
]

export function FixedAIAssistant({
  currentStep,
  position = "top-left",
  className,
  showBubble = true,
  language = "en",
  userSoFar,
  page,
}: FixedAIAssistantProps) {
  const [isActive, setIsActive] = useState(false)
  const [showMessage, setShowMessage] = useState(true)
  const [currentMessage, setCurrentMessage] = useState("")
  const [isChatOpen, setIsChatOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    // Trigger animation when step changes
    setIsActive(true)
    setShowMessage(false)

    const timer1 = setTimeout(() => {
      setCurrentMessage(getStepMessage(currentStep || 0, language))
      setShowMessage(true)
    }, 300)

    const timer2 = setTimeout(() => {
      setIsActive(false)
    }, 60000)

    const timer3 = setTimeout(() => {
      setShowMessage(false)
    }, 60000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [currentStep, language])

  const messagePosition = position.includes("left") ? "right" : "left"

  return (
    <>
      {/* Fixed Assistant */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "z-50 transition-all duration-300",
          className,
        )}
      >
        <div className="relative">
          {/* Enhanced Message Bubble */}
          {showBubble && <MessageBubble
            message={currentMessage}
            isVisible={showMessage}
            position={messagePosition}
            isMobile={isMobile}
          />}

          {/* Avatar Container */}
          <motion.div
            className="relative cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsChatOpen(true)}
          >
            <Card className="bg-transparent shadow-none rounded-2xl overflow">
              <CardContent className="p-0 bg-transparent shadow-none">
                <div
                  className={cn(
                    "transition-all duration-300 bg- rounded-2xl flex items-center justify-center ",
                    isMobile ? "size-16" : "size-20",
                  )}>
                  <Image
                    alt={'Doris'}
                    src={'/doris-1.webp'}
                    width={300}
                    height={300}
                    className="rounded-b-3xl"
                  />
                </div>

                {/* Status indicator */}
                {isActive && (
                  <motion.div
                    className="absolute -top-2 -right-2 rounded-full flex justify-center items-center shadow-lg "
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Sparkles className="stroke-primary fill-primary/75 size-5" />
                  </motion.div>
                )}
              </CardContent>
            </Card>

          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Chat Sheet */}
      <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
        <SheetContent
          side={isMobile ? "bottom" : "right"}
          className={cn(
            "bg-gradient-to-br h-auto min-h-[50dvh] z-[1000] from-background/98 p-0 to-muted/30 backdrop-blur-xl border-border/60 shadow-2xl",
            isMobile ? " rounded-t-3xl" : "w-[420px]",
          )}
        >
          <SheetHeader className="sr-only ">
            <SheetTitle>Chat with Doris AI</SheetTitle>
          </SheetHeader>
          <ChatInterface page={page} userSoFar={userSoFar} isOpen={isChatOpen} currentStep={currentStep || 0} onClose={() => setIsChatOpen(false)} language={language} />
        </SheetContent>
      </Sheet>

      {/* Accessibility */}
      <div className="sr-only" aria-live="polite">
        AI Assistant: {currentMessage}
      </div>
    </>
  )
}
