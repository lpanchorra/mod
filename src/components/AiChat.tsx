"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Sparkles, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI assistant. I can help you with creating artifacts, answering questions, or executing tasks. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        role: "assistant",
        content: "I understand your request. This is a demo response. In a production environment, this would connect to an AI backend service.",
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Floating button */}
      <motion.div
        className="fixed bottom-6 right-6 z-30"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full backdrop-blur-xl bg-white/[0.08] border border-white/[0.06] hover:bg-white/[0.12] shadow-[0_8px_24px_rgba(0,0,0,0.35)] relative"
        >
          <MessageCircle className="w-6 h-6" strokeWidth={1.5} />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-accent text-bg rounded-full">
            1
          </Badge>
        </Button>
      </motion.div>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full md:w-[420px] z-50"
            >
              <div className="h-full backdrop-blur-xl bg-[#0A0A0A]/98 border-l border-white/[0.06] shadow-[-8px_0_24px_rgba(0,0,0,0.35)] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" strokeWidth={1.5} />
                    <h2 style={{ fontFamily: "'Space Grotesk', sans-serif" }}>AI Assistant</h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 p-0 rounded-lg hover:bg-white/[0.08]"
                  >
                    <X className="w-4 h-4" strokeWidth={1.5} />
                  </Button>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="help" className="flex-1 flex flex-col min-h-0">
                  <TabsList className="mx-6 mt-4 grid w-auto grid-cols-3 bg-white/[0.04] rounded-xl p-1">
                    <TabsTrigger value="help" className="rounded-lg data-[state=active]:bg-white/[0.08]">
                      Help
                    </TabsTrigger>
                    <TabsTrigger value="prompts" className="rounded-lg data-[state=active]:bg-white/[0.08]">
                      Prompts
                    </TabsTrigger>
                    <TabsTrigger value="actions" className="rounded-lg data-[state=active]:bg-white/[0.08]">
                      Actions
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="help" className="flex-1 flex flex-col min-h-0 mt-4">
                    {/* Messages */}
                    <ScrollArea className="flex-1 px-6">
                      <div className="space-y-4 pb-4">
                        {messages.map((message, i) => (
                          <div
                            key={i}
                            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                                message.role === "user"
                                  ? "bg-white/[0.12] ml-auto"
                                  : "bg-white/[0.04]"
                              }`}
                            >
                              <p className="text-sm leading-relaxed">{message.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    {/* Input */}
                    <div className="p-6 border-t border-white/[0.06]">
                      <div className="flex gap-2">
                        <Input
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleSend()}
                          placeholder="Ask me anything..."
                          className="flex-1 bg-white/[0.04] border-white/[0.06] rounded-xl focus-visible:ring-white/[0.08]"
                        />
                        <Button
                          onClick={handleSend}
                          size="icon"
                          className="h-10 w-10 rounded-xl bg-white text-bg hover:bg-white/90"
                        >
                          <Send className="w-4 h-4" strokeWidth={1.5} />
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="prompts" className="flex-1 px-6 mt-4">
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">Saved prompt templates</p>
                      <div className="space-y-2">
                        {["Image generation", "Code scaffold", "Content outline"].map((prompt) => (
                          <Button
                            key={prompt}
                            variant="ghost"
                            className="w-full justify-start rounded-xl bg-white/[0.04] hover:bg-white/[0.08]"
                          >
                            {prompt}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="actions" className="flex-1 px-6 mt-4">
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">Quick actions</p>
                      <div className="space-y-2">
                        {["Create new artifact", "Export current work", "Share with team"].map((action) => (
                          <Button
                            key={action}
                            variant="ghost"
                            className="w-full justify-start gap-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08]"
                          >
                            <Zap className="w-4 h-4" strokeWidth={1.5} />
                            {action}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
