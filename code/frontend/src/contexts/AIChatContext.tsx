import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  type ChatMessage,
  type ConversationDetail,
  type ConversationSummary,
  type AiFeedbackValue,
  fetchConversationDetail,
  fetchConversationList,
  sendChatMessage,
  sendMessageFeedback,
} from '@/lib/aiClient'

type AIChatContextValue = {
  conversations: ConversationSummary[]
  messages: ChatMessage[]
  currentConversation?: ConversationDetail['conversation'] | null
  currentConversationId?: string | null
  isSending: boolean
  historyLoading: boolean
  fetchConversations: () => Promise<void>
  selectConversation: (conversationId: string) => Promise<void>
  startNewConversation: () => void
  sendMessage: (input: { message: string; machineId?: string }) => Promise<void>
  submitFeedback: (messageId: string, value: AiFeedbackValue) => Promise<void>
}

const AIChatContext = createContext<AIChatContextValue | undefined>(undefined)

export const AIChatProvider = ({ children }: { children: ReactNode }) => {
  const [conversations, setConversations] = useState<ConversationSummary[]>([])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [currentConversation, setCurrentConversation] = useState<ConversationDetail['conversation'] | null>(null)
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false)
  const [historyLoading, setHistoryLoading] = useState(false)

  const fetchConversations = useCallback(async () => {
    setHistoryLoading(true)
    try {
      const data = await fetchConversationList()
      setConversations(data)
    } finally {
      setHistoryLoading(false)
    }
  }, [])

  const selectConversation = useCallback(async (conversationId: string) => {
    const detail = await fetchConversationDetail(conversationId)
    setCurrentConversationId(conversationId)
    setCurrentConversation(detail.conversation)
    setMessages(detail.messages)
    if (!conversations.find((c) => c.id === conversationId)) {
      await fetchConversations()
    }
  }, [conversations, fetchConversations])

  const startNewConversation = useCallback(() => {
    setCurrentConversationId(null)
    setCurrentConversation(null)
    setMessages([])
  }, [])

  const sendMessage = useCallback(
    async ({ message, machineId }: { message: string; machineId?: string }) => {
      if (!message.trim()) {
        return
      }
      const tempId = `temp-${Date.now()}`
      const optimisticMessage: ChatMessage = {
        id: tempId,
        role: 'USER',
        content: message,
        createdAt: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, optimisticMessage])
      setIsSending(true)
      try {
        const response = await sendChatMessage({
          message,
          machineId: machineId || undefined,
          conversationId: currentConversationId,
        })
        setCurrentConversationId(response.conversationId)
        setCurrentConversation((prev) => ({
          ...(prev ?? { id: response.conversationId, machineId: response.machine?.id ?? null }),
          id: response.conversationId,
          title: response.conversationTitle,
          machine: response.machine ?? prev?.machine ?? null,
          machineId: response.machine?.id ?? prev?.machineId ?? null,
        }))
        setMessages((prev) => [
          ...prev.filter((msg) => msg.id !== tempId),
          response.userMessage,
          response.assistantMessage,
        ])
        await fetchConversations()
      } catch (error) {
        setMessages((prev) => prev.filter((msg) => msg.id !== tempId))
        throw error
      } finally {
        setIsSending(false)
      }
    },
    [currentConversationId, fetchConversations],
  )

  const submitFeedback = useCallback(async (messageId: string, value: AiFeedbackValue) => {
    const feedback = await sendMessageFeedback(messageId, value)
    setMessages((prev) =>
      prev.map((message) =>
        message.id === messageId
          ? {
              ...message,
              feedback,
            }
          : message,
      ),
    )
  }, [])

  const value = useMemo<AIChatContextValue>(
    () => ({
      conversations,
      messages,
      currentConversation,
      currentConversationId,
      isSending,
      historyLoading,
      fetchConversations,
      selectConversation,
      startNewConversation,
      sendMessage,
      submitFeedback,
    }),
    [
      conversations,
      messages,
      currentConversation,
      currentConversationId,
      isSending,
      historyLoading,
      fetchConversations,
      selectConversation,
      startNewConversation,
      sendMessage,
      submitFeedback,
    ],
  )

  return <AIChatContext.Provider value={value}>{children}</AIChatContext.Provider>
}

export const useAIChat = () => {
  const ctx = useContext(AIChatContext)
  if (!ctx) {
    throw new Error('useAIChat must be used within an AIChatProvider')
  }
  return ctx
}

