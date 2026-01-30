import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Check, ChevronDown, Search, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { api } from '@/lib/api'

export interface UserOption {
  id: string
  name: string
  email: string
  role: string
}

interface UserPickerProps {
  value?: string | null
  onChange: (userId: string | null) => void
  label?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  className?: string
  allowClear?: boolean
}

export function UserPicker({
  value,
  onChange,
  label,
  placeholder,
  disabled = false,
  error,
  className = '',
  allowClear = true,
}: UserPickerProps) {
  const { t } = useTranslation('common')
  const [users, setUsers] = useState<UserOption[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users/list')
        setUsers(response.data.data || [])
      } catch (err) {
        console.error('Failed to load users:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const selectedUser = users.find((u) => u.id === value)

  const filteredUsers = users.filter((u) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      u.name.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query) ||
      u.role.toLowerCase().includes(query)
    )
  })

  const handleSelect = (userId: string | null) => {
    onChange(userId)
    setIsOpen(false)
    setSearchQuery('')
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(null)
  }

  return (
    <div className={className}>
      {label && <Label className="mb-2 block">{label}</Label>}
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={`w-full justify-between font-normal ${!value && 'text-muted-foreground'}`}
            disabled={disabled || isLoading}
          >
            <span className="truncate">
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t('loading', 'Loading...')}
                </span>
              ) : selectedUser ? (
                selectedUser.name
              ) : (
                placeholder || t('selectUser', 'Select user')
              )}
            </span>
            <div className="flex items-center gap-1">
              {allowClear && value && !disabled && (
                <span
                  role="button"
                  className="rounded p-0.5 hover:bg-muted"
                  onClick={handleClear}
                >
                  <X className="h-3 w-3" />
                </span>
              )}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[300px]" align="start">
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('searchUsers', 'Search users...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <div className="max-h-[200px] overflow-y-auto">
            {allowClear && (
              <DropdownMenuItem onSelect={() => handleSelect(null)}>
                <span className="text-muted-foreground">
                  {t('unassigned', 'Unassigned')}
                </span>
              </DropdownMenuItem>
            )}
            {filteredUsers.length === 0 ? (
              <div className="py-4 text-center text-sm text-muted-foreground">
                {searchQuery
                  ? t('noUsersMatchSearch', 'No users match your search')
                  : t('noUsersAvailable', 'No users available')}
              </div>
            ) : (
              filteredUsers.map((user) => (
                <DropdownMenuItem
                  key={user.id}
                  onSelect={() => handleSelect(user.id)}
                  className="flex items-center justify-between"
                >
                  <div className="flex flex-col">
                    <span>{user.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {user.role}
                    </span>
                  </div>
                  {value === user.id && <Check className="h-4 w-4 opacity-50" />}
                </DropdownMenuItem>
              ))
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  )
}

export default UserPicker
