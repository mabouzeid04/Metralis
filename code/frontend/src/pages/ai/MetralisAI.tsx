import { useEffect, useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { useAIChat } from '@/contexts/AIChatContext'
import { api } from '@/lib/api'
import type { ConversationSummary, StructuredAiResponse, AiFeedbackValue, ChatMessage } from '@/lib/aiClient'
import { History, Loader2, Send, X, Sparkles, Bot as BotIcon, AlertTriangle, ClipboardCheck, Target, ThumbsUp, ThumbsDown, Lightbulb, ChevronDown, Search, Check } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import type { LucideIcon } from 'lucide-react'

type MachineOption = {
  id: string
  name: string
  model?: string | null
}

const formatMachineLabel = (machine: { name: string; model?: string | null }) => {
  const name = machine.name?.trim()
  const model = machine.model?.trim()
  if (name && model && model.toLowerCase() !== name.toLowerCase()) {
    return `${name} • ${model}`
  }
  return name
}

const MetralisAI = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('ai')
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
  const [machineSearch, setMachineSearch] = useState('')
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
        setError(t('error'))
      } finally {
        setLoadingMachines(false)
      }
    }
    load()
    fetchConversations()
  }, [fetchConversations, t])

  const activeMachineId = useMemo(() => currentConversation?.machineId ?? currentConversation?.machine?.id ?? '', [currentConversation])

  const selectedMachineId = activeMachineId || machineId

  const selectedMachine = useMemo(() => machines.find((m) => m.id === selectedMachineId), [machines, selectedMachineId])

  const filteredMachines = useMemo(() => {
    if (!machineSearch) return machines
    const lower = machineSearch.toLowerCase()
    return machines.filter((m) => m.name.toLowerCase().includes(lower) || m.model?.toLowerCase().includes(lower))
  }, [machines, machineSearch])

  const handleSend = async () => {
    if (!input.trim()) return
    setError(null)
    const messageToSend = input
    setInput('')
    try {
      await sendMessage({
        message: messageToSend,
        machineId: activeMachineId || machineId || undefined,
      })
    } catch (err) {
      console.error(err)
      // Optional: restore text so the user can retry
      setInput(messageToSend)
      setError(t('error'))
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
    { value: 'HELPFUL', label: t('feedback.helpful', { defaultValue: 'Helpful' }), Icon: ThumbsUp },
    { value: 'NOT_HELPFUL', label: t('feedback.needsWork', { defaultValue: 'Needs work' }), Icon: ThumbsDown },
  ]

  const renderMarkdown = (content: string) => {
    // Remove citations like [1], [2], [1, 2] from the text
    const cleanContent = content.replace(/ ?\[\d+(?:,\s*\d+)*\]/g, '')

    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        className="space-y-2 text-sm leading-relaxed"
        components={{
          p: ({ node, ...props }) => <p className="whitespace-pre-wrap leading-relaxed" {...props} />,
          strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
          em: ({ node, ...props }) => <em className="italic" {...props} />,
          ul: ({ node, ...props }) => <ul className="ml-5 list-disc space-y-1" {...props} />,
          ol: ({ node, ...props }) => <ol className="ml-5 list-decimal space-y-1" {...props} />,
          li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
          a: ({ node, ...props }) => (
            <a className="text-primary underline" target="_blank" rel="noreferrer" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-2 border-muted-foreground/40 pl-3 italic text-muted-foreground" {...props} />
          ),
          code: ({ node, ...props }) => {
            const text = String(props.children ?? '')
            const isInline = !text.includes('\n')

            return isInline ? (
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs" {...props} />
            ) : (
              <code className="block rounded bg-muted p-3 font-mono text-xs" {...props} />
            )
          },
        }}
      >
        {cleanContent}
      </ReactMarkdown>
    )
  }

  const handleFeedback = async (messageId: string, value: AiFeedbackValue) => {
    setFeedbackErrors((prev) => ({ ...prev, [messageId]: null }))
    setFeedbackSubmitting((prev) => ({ ...prev, [messageId]: true }))
    try {
      await submitFeedback(messageId, value)
    } catch (err) {
      console.error(err)
      setFeedbackErrors((prev) => ({ ...prev, [messageId]: t('feedback.error') }))
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
    return (
      <span className="text-[11px] uppercase text-muted-foreground">
        {t('citations.docLabel')} {citations.join(', ')}
      </span>
    )
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
      return renderMarkdown(message.content)
    }

    const structured = message.structuredOutput

    return (
      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground">{t('structured.summaryTitle')}</p>
          <p className="text-sm">{structured.summary || t('structured.summaryFallback')}</p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold flex items-center gap-2">
            <Target className="h-4 w-4" /> {t('structured.causesTitle')}
          </p>
          {structured.likelyCauses.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t('structured.causesEmpty')}</p>
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
            <ClipboardCheck className="h-4 w-4" /> {t('structured.stepsTitle')}
          </p>
          {structured.recommendedSteps.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t('structured.stepsEmpty')}</p>
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
              <p className="font-semibold">{t('structured.moreDataTitle')}</p>
              <p>{structured.missingDataNotes || t('structured.moreDataBody')}</p>
            </div>
          </div>
        )}

        {structured.references.length > 0 && (
          <div>
            <p className="text-sm font-semibold">{t('structured.referencesTitle')}</p>
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
            {t('structured.createWorkOrder')}
          </Button>
          <Button size="sm" variant="ghost" onClick={handleViewMachineShortcut} disabled={!selectedMachineId}>
            {t('structured.viewMachine')}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => navigate('/work-orders')}>
            {t('structured.logRepair')}
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
      <div className="mt-3">
        <div className="flex flex-wrap gap-2">
          {feedbackOptions.map(({ value, label, Icon }) => {
            const alreadySent = sent.includes(value)
            return (
              <Button
                key={value}
                size="icon"
                title={label}
                variant={alreadySent ? 'secondary' : 'ghost'}
                disabled={alreadySent || Boolean(feedbackSubmitting[message.id])}
                className="h-8 w-8"
                onClick={() => handleFeedback(message.id, value)}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">{label}</span>
              </Button>
            )
          })}
        </div>
        {feedbackErrors[message.id] && <p className="text-xs text-destructive">{feedbackErrors[message.id]}</p>}
      </div>
    )
  }

  const tips = useMemo(() => t('active.tips', { returnObjects: true }) as string[], [t])

  return (
    <div className="relative flex h-[calc(100vh-6rem)] flex-col gap-4">
      {showHistory && (
        <div className="absolute right-0 top-14 z-20 w-full max-w-sm rounded-xl border bg-background shadow-2xl animate-in slide-in-from-right-10 fade-in duration-200">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div>
              <p className="text-sm font-semibold">{t('historyPanel.title')}</p>
              <p className="text-xs text-muted-foreground">{t('historyPanel.subtitle')}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowHistory(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="max-h-[420px] divide-y overflow-y-auto">
            {historyLoading && (
              <div className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                {t('historyPanel.loading')}
              </div>
            )}
            {!historyLoading && conversations.length === 0 && (
              <div className="px-4 py-6 text-sm text-muted-foreground">{t('historyPanel.empty')}</div>
            )}
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                className="w-full px-4 py-3 text-left hover:bg-muted/60 transition-colors"
                onClick={() => handleSelectConversation(conversation)}
              >
                <p className="text-sm font-medium text-foreground">{conversation.title}</p>
                {conversation.machine ? (
                  <p className="text-xs text-muted-foreground">{formatMachineLabel(conversation.machine)}</p>
                ) : (
                  <p className="text-xs text-muted-foreground">{t('historyPanel.noMachine')}</p>
                )}
                <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                  {conversation.lastMessagePreview ?? t('historyPanel.noMessages')}
                </p>
              </button>
            ))}
          </div>
          <div className="border-t px-4 py-3 bg-muted/20">
            <Button className="w-full" variant="outline" onClick={handleStartNew}>
              {t('historyPanel.startNew')}
            </Button>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pb-1">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="sm:relative flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary/80 mb-1 sm:absolute sm:bottom-full sm:left-0 sm:mb-0 sm:whitespace-nowrap">{t('title')}</p>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{t('subtitle')}</h1>
          </div>

          {/* Vertical Divider */}
          <div className="hidden h-8 w-px bg-border sm:block" />

          {/* Modern Machine Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-[280px] justify-between text-left font-normal"
                disabled={machineDisabled || loadingMachines}
              >
                {selectedMachine ? (
                  <span className="truncate">{formatMachineLabel(selectedMachine)}</span>
                ) : (
                  <span className="text-muted-foreground">{t('selectMachine', { defaultValue: 'Select context (optional)' })}</span>
                )}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[280px] p-0" align="start">
              <div className="flex items-center border-b px-3">
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <Input
                  className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-0 focus-visible:ring-0 px-0 shadow-none"
                  placeholder="Search machines..."
                  value={machineSearch}
                  onChange={(e) => setMachineSearch(e.target.value)}
                />
              </div>
              <div className="max-h-[300px] overflow-y-auto p-1">
                <DropdownMenuItem onSelect={() => setMachineId('')} className="cursor-pointer">
                  <span className="font-medium text-muted-foreground">No machine context</span>
                </DropdownMenuItem>
                {filteredMachines.map((machine) => (
                  <DropdownMenuItem
                    key={machine.id}
                    onSelect={() => setMachineId(machine.id)}
                    className="cursor-pointer"
                  >
                    <span>{formatMachineLabel(machine)}</span>
                    {selectedMachineId === machine.id && <Check className="ml-auto h-4 w-4 opacity-50" />}
                  </DropdownMenuItem>
                ))}
                {filteredMachines.length === 0 && (
                  <div className="p-4 text-center text-sm text-muted-foreground">{t('noMachinesFound')}</div>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleStartNew}>
            <Sparkles className="mr-2 h-3.5 w-3.5 text-amber-500" />
            {t('newChat', { defaultValue: 'New Chat' })}
          </Button>
          <Button
            variant={showHistory ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setShowHistory((prev) => !prev)}
          >
            <History className="mr-2 h-3.5 w-3.5" />
            {t('history', { defaultValue: 'History' })}
          </Button>
        </div>
      </div>

      <div className="grid flex-1 gap-6 overflow-hidden lg:grid-cols-[1fr_280px]">
        {/* Chat Area */}
        <Card className="flex flex-col overflow-hidden shadow-sm border-border">
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 scroll-smooth bg-muted/10">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-6">
                  <Sparkles className="h-10 w-10 text-amber-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{t('welcomeTitle', { defaultValue: 'How can I help you?' })}</h3>

                {/* Quick suggestions could go here */}
                {!selectedMachineId && (
                  <div className="text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full border border-border/50">
                    {t('machineTip')}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-8 pb-4">
                {messages.map((message) => {
                  const isAssistant = message.role === 'ASSISTANT'
                  return (
                    <div key={message.id} className={`flex w-full ${isAssistant ? 'justify-start' : 'justify-end'}`}>
                      {isAssistant ? (
                        <div className="w-full max-w-4xl pr-4 text-sm">
                          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground/60 uppercase tracking-widest">
                            <BotIcon className="h-3 w-3" /> {t('assistantLabel')}
                          </div>
                          <div className="leading-7 text-foreground">
                            {renderStructuredMessage(message)}
                          </div>

                          {message.citations && message.citations.length > 0 && (
                            <div className="mt-4 border-t border-border/40 pt-3 text-xs opacity-80">
                              <p className="font-semibold mb-1.5 text-muted-foreground">{t('citations.label')}</p>
                              <ul className="space-y-1.5">
                                {message.citations.map((citation) => {
                                  const href =
                                    citation.source === 'INCIDENT'
                                      ? `/work-orders/${citation.workOrderId ?? citation.documentId}`
                                      : `/documents/${citation.documentId}`;
                                  return (
                                    <li key={citation.chunkId} className="flex items-start gap-1.5">
                                      <span className="mt-0.5">•</span>
                                      <span>
                                        <a href={href} className="text-primary underline decoration-primary/30 hover:decoration-primary underline-offset-2 transition-all">
                                          {citation.documentTitle ?? citation.documentId}
                                        </a>{' '}
                                        <span className="text-muted-foreground">({(citation.similarity * 100).toFixed(0)}%)</span>
                                      </span>
                                    </li>
                                  )
                                })}
                              </ul>
                            </div>
                          )}
                          {renderFeedbackButtons(message)}
                        </div>
                      ) : (
                        <div className="max-w-[85%] sm:max-w-[75%] rounded-3xl bg-muted/80 px-5 py-3 text-sm text-foreground backdrop-blur-sm">
                          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div className="p-4 pt-1">
            <div className="relative rounded-xl border bg-muted/30 shadow-sm focus-within:ring-1 focus-within:ring-ring">
              {error && (
                <div className="absolute -top-10 left-0 right-0 flex items-center gap-2 rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  <AlertTriangle className="h-4 w-4" />
                  {error}
                </div>
              )}
              <Textarea
                placeholder={t('inputPlaceholder')}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                className="min-h-[60px] w-full resize-none border-0 bg-transparent px-4 py-3 focus-visible:ring-0 shadow-none text-base sm:text-sm"
                rows={1}
              />
              <div className="flex justify-between items-center px-2 pb-2">
                <div className="text-xs text-muted-foreground px-2">
                  {/* Optional helper text */}
                </div>
                <Button
                  onClick={handleSend}
                  disabled={isSending || !input.trim()}
                  size="sm"
                  className="rounded-lg h-8 px-3"
                >
                  {isSending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  <span className="sr-only">{t('send')}</span>
                </Button>
              </div>
            </div>
            <p className="mt-2 text-center text-[10px] text-muted-foreground">
              {t('disclaimer')}
            </p>
          </div>
        </Card>

        {/* Tips Sidebar - Hidden on mobile */}
        <div className="hidden lg:flex flex-col gap-4">
          <Card className="h-fit w-full p-0 overflow-hidden border-border bg-muted/40">
            <div className="border-b border-border bg-muted/60 px-4 py-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-amber-500 fill-amber-500/20" />
                <p className="text-sm font-semibold">{t('active.tipsTitle')}</p>
              </div>
            </div>
            <div className="p-4">
              <ul className="ml-4 list-disc space-y-3 text-sm text-muted-foreground">
                {tips.map((tip, idx) => (
                  <li key={idx} className="leading-relaxed pl-1">{tip}</li>
                ))}
              </ul>
            </div>
          </Card>

          {selectedMachine && (
            <Card className="p-4 border-muted">
              <div className="text-xs font-medium uppercase text-muted-foreground mb-2">Context</div>
              <div className="font-medium">{selectedMachine.name}</div>
              {selectedMachine.model && <div className="text-sm text-muted-foreground">{selectedMachine.model}</div>}
              <Button
                variant="link"
                className="px-0 h-auto mt-2 text-xs"
                onClick={handleViewMachineShortcut}
              >
                View Machine Details &rarr;
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default MetralisAI

