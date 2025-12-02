import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { useAIChat } from '@/contexts/AIChatContext'
import { api } from '@/lib/api'
import type { ConversationSummary, StructuredAiResponse, AiFeedbackValue, ChatMessage } from '@/lib/aiClient'
import { History, Loader2, Send, X, Sparkles, User as UserIcon, Bot as BotIcon, AlertTriangle, ClipboardCheck, Target, ThumbsUp, Frown, CheckCircle2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type MachineOption = {
  id: string
  name: string
  model?: string | null
}

const MetralisAI = () => {
  const navigate = useNavigate()
  const {
    conversations,
    messages,
    currentConversation,
    fetchConversations,
    selectConversation,
    startNewConversation,
    sendMessage,
    submitFeedback,
    isSending,
    historyLoading,
  } = useAIChat()

  const [machines, setMachines] = useState<MachineOption[]>([])
  const [loadingMachines, setLoadingMachines] = useState(false)
  const [machineId, setMachineId] = useState('')
  const [input, setInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [showHistory, setShowHistory] = useState(false)
  const [feedbackSubmitting, setFeedbackSubmitting] = useState<Record<string, boolean>>({})
  const [feedbackErrors, setFeedbackErrors] = useState<Record<string, string | null>>({})

  useEffect(() => {
    const load = async () => {
      setLoadingMachines(true)
      try {
        const { data } = await api.get<{ data: MachineOption[] }>('/machines')
        setMachines(data.data)
      } catch (err) {
        console.error(err)
        setError('Unable to load machines right now.')
      } finally {
        setLoadingMachines(false)
      }
    }
    load()
    fetchConversations()
  }, [fetchConversations])

  const activeMachineId = useMemo(() => currentConversation?.machineId ?? currentConversation?.machine?.id ?? '', [currentConversation])

  const selectedMachineId = activeMachineId || machineId

  const selectedMachine = useMemo(() => machines.find((m) => m.id === selectedMachineId), [machines, selectedMachineId])

  const handleSend = async () => {
    if (!input.trim()) return
    setError(null)
    try {
      await sendMessage({
        message: input,
        machineId: activeMachineId || machineId || undefined,
      })
      setInput('')
    } catch (err) {
      console.error(err)
      setError('Unable to send message. Please try again.')
    }
  }

  const handleSelectConversation = async (conversation: ConversationSummary) => {
    await selectConversation(conversation.id)
    setShowHistory(false)
    setMachineId('')
  }

  const handleStartNew = () => {
    startNewConversation()
    setMachineId('')
    setShowHistory(false)
    setInput('')
  }

  const machineDisabled = Boolean(activeMachineId)

  const feedbackOptions: Array<{ value: AiFeedbackValue; label: string; Icon: LucideIcon }> = [
    { value: 'HELPFUL', label: 'Helpful', Icon: ThumbsUp },
    { value: 'NOT_HELPFUL', label: 'Needs work', Icon: Frown },
    { value: 'CORRECT_CAUSE', label: 'Correct cause', Icon: CheckCircle2 },
  ]

  const handleFeedback = async (messageId: string, value: AiFeedbackValue) => {
    setFeedbackErrors((prev) => ({ ...prev, [messageId]: null }))
    setFeedbackSubmitting((prev) => ({ ...prev, [messageId]: true }))
    try {
      await submitFeedback(messageId, value)
    } catch (err) {
      console.error(err)
      setFeedbackErrors((prev) => ({ ...prev, [messageId]: 'Unable to send feedback. Please try again.' }))
    } finally {
      setFeedbackSubmitting((prev) => ({ ...prev, [messageId]: false }))
    }
  }

  const handleCreateWorkOrderShortcut = () => {
    if (selectedMachineId) {
      navigate(`/work-orders/new?machine=${selectedMachineId}`)
    } else {
      navigate('/work-orders/new')
    }
  }

  const handleViewMachineShortcut = () => {
    if (selectedMachineId) {
      navigate(`/machines/${selectedMachineId}`)
    }
  }

  const renderCitationBadge = (citations?: number[]) => {
    if (!citations || citations.length === 0) {
      return null
    }
    return <span className="text-[11px] uppercase text-muted-foreground">Docs {citations.join(', ')}</span>
  }

  const renderConfidenceBadge = (confidence: StructuredAiResponse['likelyCauses'][number]['confidence']) => {
    const styles: Record<StructuredAiResponse['likelyCauses'][number]['confidence'], string> = {
      HIGH: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      MEDIUM: 'bg-amber-50 text-amber-700 border-amber-200',
      LOW: 'bg-slate-100 text-slate-600 border-slate-300',
    }
    return (
      <Badge variant="outline" className={styles[confidence]}>
        {confidence}
      </Badge>
    )
  }

  const renderStructuredMessage = (message: ChatMessage) => {
    if (!message.structuredOutput) {
      return <p className="whitespace-pre-wrap text-sm">{message.content}</p>
    }

    const structured = message.structuredOutput

    return (
      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground">Summary</p>
          <p className="text-sm">{structured.summary || 'No summary available.'}</p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold flex items-center gap-2">
            <Target className="h-4 w-4" /> Likely Causes
          </p>
          {structured.likelyCauses.length === 0 ? (
            <p className="text-sm text-muted-foreground">No ranked causes yet.</p>
          ) : (
            structured.likelyCauses.map((cause, index) => (
              <div key={`${cause.title}-${index}`} className="rounded-md border p-3 text-sm space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{cause.title || `Hypothesis ${index + 1}`}</span>
                  {renderConfidenceBadge(cause.confidence)}
                </div>
                <p className="text-muted-foreground">{cause.rationale}</p>
                {renderCitationBadge(cause.citations)}
              </div>
            ))
          )}
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4" /> Recommended Steps
          </p>
          {structured.recommendedSteps.length === 0 ? (
            <p className="text-sm text-muted-foreground">No actions proposed.</p>
          ) : (
            structured.recommendedSteps.map((step, index) => (
              <div key={`${step.title}-${index}`} className="rounded-md border p-3 text-sm space-y-1">
                <span className="font-medium">{step.title || `Step ${index + 1}`}</span>
                <p className="text-muted-foreground">{step.action}</p>
                {renderCitationBadge(step.citations)}
              </div>
            ))
          )}
        </div>

        {structured.needsMoreData && (
          <div className="flex gap-3 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
            <AlertTriangle className="h-4 w-4" />
            <div>
              <p className="font-semibold">More data required</p>
              <p>{structured.missingDataNotes || 'Provide additional context before taking action.'}</p>
            </div>
          </div>
        )}

        {structured.references.length > 0 && (
          <div>
            <p className="text-sm font-semibold">References</p>
            <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
              {structured.references.map((reference) => (
                <li key={reference.id}>
                  ({reference.id}) {reference.source}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={handleCreateWorkOrderShortcut}>
            Create Work Order
          </Button>
          <Button size="sm" variant="ghost" onClick={handleViewMachineShortcut} disabled={!selectedMachineId}>
            View Machine
          </Button>
          <Button size="sm" variant="ghost" onClick={() => navigate('/work-orders')}>
            Log Repair
          </Button>
        </div>
      </div>
    )
  }

  const renderFeedbackButtons = (message: ChatMessage) => {
    if (message.role !== 'ASSISTANT') {
      return null
    }

    const sent = message.feedback ?? []
    return (
      <div className="mt-4 space-y-1">
        <p className="text-xs font-semibold text-muted-foreground">Was this response helpful?</p>
        <div className="flex flex-wrap gap-2">
          {feedbackOptions.map(({ value, label, Icon }) => {
            const alreadySent = sent.includes(value)
            return (
              <Button
                key={value}
                size="sm"
                variant={alreadySent ? 'secondary' : 'ghost'}
                disabled={alreadySent || Boolean(feedbackSubmitting[message.id])}
                className="text-xs"
                onClick={() => handleFeedback(message.id, value)}
              >
                <Icon className="mr-1 h-3 w-3" /> {label}
              </Button>
            )
          })}
        </div>
        {feedbackErrors[message.id] && <p className="text-xs text-destructive">{feedbackErrors[message.id]}</p>}
      </div>
    )
  }

  return (
    <div className="relative space-y-6">
      {showHistory && (
        <div className="absolute right-0 top-0 z-20 w-full max-w-sm rounded-xl border bg-background shadow-2xl">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div>
              <p className="text-sm font-semibold">Conversation History</p>
              <p className="text-xs text-muted-foreground">Select a chat to resume or start a new one</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowHistory(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="max-h-[420px] divide-y overflow-y-auto">
            {historyLoading && (
              <div className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading history...
              </div>
            )}
            {!historyLoading && conversations.length === 0 && (
              <div className="px-4 py-6 text-sm text-muted-foreground">No previous conversations yet.</div>
            )}
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                className="w-full px-4 py-3 text-left hover:bg-muted/60"
                onClick={() => handleSelectConversation(conversation)}
              >
                <p className="text-sm font-medium">{conversation.title}</p>
                {conversation.machine ? (
                  <p className="text-xs text-muted-foreground">
                    {conversation.machine.name}
                    {conversation.machine.model ? ` · ${conversation.machine.model}` : ''}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">No machine selected</p>
                )}
                <p className="text-xs text-muted-foreground line-clamp-1">{conversation.lastMessagePreview ?? 'No messages yet'}</p>
              </button>
            ))}
          </div>
          <div className="border-t px-4 py-3">
            <Button className="w-full" variant="outline" onClick={handleStartNew}>
              Start new chat
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-primary">Metralis AI</p>
          <h1 className="text-3xl font-semibold tracking-tight">Maintenance Copilot</h1>
          <p className="text-sm text-muted-foreground">Ask troubleshooting questions, reference manuals, and capture learnings.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleStartNew}>
            New Chat
          </Button>
          <Button variant="ghost" onClick={() => setShowHistory((prev) => !prev)}>
            <History className="mr-2 h-4 w-4" />
            History
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card className="p-4 sm:p-6">
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Machine Context</label>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                <select
                  className="w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1"
                  disabled={machineDisabled || loadingMachines}
                  value={selectedMachineId}
                  onChange={(event) => setMachineId(event.target.value)}
                >
                  <option value="">Select a machine (optional)</option>
                  {machines.map((machine) => (
                    <option key={machine.id} value={machine.id}>
                      {machine.name} {machine.model ? `• ${machine.model}` : ''}
                    </option>
                  ))}
                </select>
                {selectedMachine && (
                  <span className="text-xs text-muted-foreground">
                    Bound to {selectedMachine.name}
                    {selectedMachine.model ? ` · ${selectedMachine.model}` : ''}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-lg border bg-background/70 p-4">
              <div className="flex-1 space-y-4 overflow-y-auto">
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-muted/40 p-6 text-center text-sm text-muted-foreground">
                    <Sparkles className="mb-2 h-5 w-5" />
                    Ask a question to get started. Metralis AI will cite specific manual sections and past incidents.
                  </div>
                )}
                {messages.map((message) => {
                  const isAssistant = message.role === 'ASSISTANT'
                  return (
                    <div key={message.id} className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}>
                      <div
                        className={`max-w-[85%] rounded-xl border p-3 text-sm shadow-sm ${
                          isAssistant ? 'bg-background' : 'bg-primary text-primary-foreground'
                        }`}
                      >
                        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide">
                          {isAssistant ? (
                            <>
                              <BotIcon className="h-4 w-4" /> Metralis AI
                            </>
                          ) : (
                            <>
                              <UserIcon className="h-4 w-4" /> You
                            </>
                          )}
                        </div>
                        {isAssistant ? (
                          renderStructuredMessage(message)
                        ) : (
                          <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                        )}
                        {message.citations && message.citations.length > 0 && (
                          <div className="mt-3 border-t pt-2 text-xs">
                            <p className="font-semibold">Citations</p>
                            <ul className="mt-1 space-y-1 text-muted-foreground">
                              {message.citations.map((citation) => (
                                <li key={citation.chunkId}>
                                  • {citation.documentTitle ?? citation.documentId} (score {(citation.similarity * 100).toFixed(1)}%)
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {isAssistant && renderFeedbackButtons(message)}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="space-y-3">
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Textarea
                  placeholder="Describe the issue, alarm code, or maintenance question..."
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  rows={4}
                />
                <div className="flex justify-end">
                  <Button onClick={handleSend} disabled={isSending || !input.trim()}>
                    {isSending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Thinking
                      </>
                    ) : (
                      <>
                        Send
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active conversation</p>
              <h2 className="text-xl font-semibold">{currentConversation?.title ?? 'New Metralis AI chat'}</h2>
              <p className="text-sm text-muted-foreground">
                {currentConversation ? `Conversation ID • ${currentConversation.id.slice(0, 8)}…` : 'No messages yet'}
              </p>
            </div>

            <div className="rounded-lg border bg-muted/30 p-3 text-sm">
              <p className="font-medium">Bound machine</p>
              <p className="text-muted-foreground">
                {selectedMachine
                  ? `${selectedMachine.name}${selectedMachine.model ? ` • ${selectedMachine.model}` : ''}`
                  : 'Not specified'}
              </p>
            </div>

            <div className="rounded-lg border bg-muted/30 p-3 text-sm">
              <p className="font-medium">Conversation tips</p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-muted-foreground">
                <li>Reference error codes, sensor readings, or symptoms.</li>
                <li>Metralis AI cites manuals and SOPs automatically.</li>
                <li>Use the History tab to revisit earlier chats.</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default MetralisAI

