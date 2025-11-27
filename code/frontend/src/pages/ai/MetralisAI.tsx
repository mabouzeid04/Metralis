import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useAIChat } from '@/contexts/AIChatContext'
import { api } from '@/lib/api'
import type { ConversationSummary } from '@/lib/aiClient'
import { History, Loader2, Send, X, Sparkles, User as UserIcon, Bot as BotIcon } from 'lucide-react'

type MachineOption = {
  id: string
  name: string
  model?: string | null
}

const MetralisAI = () => {
  const {
    conversations,
    messages,
    currentConversation,
    fetchConversations,
    selectConversation,
    startNewConversation,
    sendMessage,
    isSending,
    historyLoading,
  } = useAIChat()

  const [machines, setMachines] = useState<MachineOption[]>([])
  const [loadingMachines, setLoadingMachines] = useState(false)
  const [machineId, setMachineId] = useState('')
  const [input, setInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [showHistory, setShowHistory] = useState(false)

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

            <div className="rounded-lg border bg-muted/30 p-3 text-xs text-muted-foreground">
              <p className="font-medium text-foreground">Tip</p>
              <p>Add relevant symptoms, error codes, and recent repairs so Metralis AI can anchor its reasoning.</p>
            </div>

            <div className="flex flex-col gap-4 rounded-lg border bg-background/70 p-4">
              <div className="flex-1 space-y-4 overflow-y-auto">
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-muted/40 p-6 text-center text-sm text-muted-foreground">
                    <Sparkles className="mb-2 h-5 w-5" />
                    Ask a question to get started. Metralis AI will cite specific manual sections and past incidents.
                  </div>
                )}
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === 'ASSISTANT' ? 'justify-start' : 'justify-end'}`}>
                    <div
                      className={`max-w-[85%] rounded-xl border p-3 text-sm shadow-sm ${
                        message.role === 'ASSISTANT' ? 'bg-background' : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide">
                        {message.role === 'ASSISTANT' ? (
                          <>
                            <BotIcon className="h-4 w-4" /> Metralis AI
                          </>
                        ) : (
                          <>
                            <UserIcon className="h-4 w-4" /> You
                          </>
                        )}
                      </div>
                      <p className="whitespace-pre-wrap text-sm">{message.content}</p>
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
                    </div>
                  </div>
                ))}
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

