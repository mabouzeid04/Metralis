import { api } from '@/lib/api'

export type ConversationSummary = {
  id: string
  title: string
  lastMessageAt: string
  lastMessagePreview: string | null
  machine?: {
    id: string
    name: string
    model?: string | null
  } | null
}

export type AiFeedbackValue = 'HELPFUL' | 'NOT_HELPFUL' | 'CORRECT_CAUSE'

export type StructuredAiResponse = {
  summary: string
  likelyCauses: Array<{
    title: string
    confidence: 'HIGH' | 'MEDIUM' | 'LOW'
    rationale: string
    citations: number[]
  }>
  recommendedSteps: Array<{
    title: string
    action: string
    citations: number[]
  }>
  references: Array<{
    id: number
    source: string
  }>
  needsMoreData: boolean
  missingDataNotes: string
}

export type ChatMessage = {
  id: string
  role: 'USER' | 'ASSISTANT'
  content: string
  createdAt: string
  citations?: Array<{
    documentId: string
    chunkId: string
    similarity: number
    documentTitle?: string
    source?: string
    workOrderId?: string | null
    machineId?: string | null
    machineType?: string | null
    language?: string | null
    version?: string | null
  }>
  structuredOutput?: StructuredAiResponse | null
  feedback?: AiFeedbackValue[]
}

export type ConversationDetail = {
  conversation: {
    id: string
    title: string
    machineId: string | null
    machine?: {
      id: string
      name: string
      model?: string | null
      manufacturer?: string | null
      line?: string | null
    } | null
  }
  messages: ChatMessage[]
}

export const fetchConversationList = async () => {
  const { data } = await api.get<{ data: ConversationSummary[] }>('/ai/conversations')
  return data.data
}

export const fetchConversationDetail = async (conversationId: string) => {
  const { data } = await api.get<{ data: ConversationDetail }>(`/ai/conversations/${conversationId}`)
  return data.data
}

export type SendMessageResponse = {
  conversationId: string
  conversationTitle: string
  machine?: ConversationDetail['conversation']['machine']
  userMessage: ChatMessage
  assistantMessage: ChatMessage
}

export const sendChatMessage = async ({
  message,
  machineId,
  conversationId,
}: {
  message: string
  machineId?: string
  conversationId?: string | null
}) => {
  const { data } = await api.post<{ data: SendMessageResponse }>('/ai/chat', {
    message,
    machineId,
    conversationId: conversationId ?? undefined,
  })
  return data.data
}

export const sendMessageFeedback = async (messageId: string, value: AiFeedbackValue) => {
  const { data } = await api.post<{ data: AiFeedbackValue[] }>(`/ai/messages/${messageId}/feedback`, { value })
  return data.data
}

