import { useState } from 'react'
import { Plus, Search, Filter, FileText, Download, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Mock Data
const documentsData = [
  { 
    id: '1', 
    title: 'Filler 01 Operation Manual', 
    type: 'Manual', 
    file_type: 'PDF',
    size: '4.2 MB',
    machine: 'Filler 01',
    uploaded_by: 'Admin',
    date: '2023-05-12'
  },
  { 
    id: '2', 
    title: 'Lube Schedule 2023', 
    type: 'SOP', 
    file_type: 'PDF',
    size: '1.5 MB',
    machine: 'All',
    uploaded_by: 'Manager',
    date: '2023-01-10'
  },
  { 
    id: '3', 
    title: 'Krones Electrical Schematic', 
    type: 'Schematic', 
    file_type: 'DWG',
    size: '12.8 MB',
    machine: 'Filler 01',
    uploaded_by: 'Tech Lead',
    date: '2023-06-20'
  },
  { 
    id: '4', 
    title: 'Pump Troubleshooting Guide', 
    type: 'Guide', 
    file_type: 'DOCX',
    size: '0.8 MB',
    machine: 'Pumps',
    uploaded_by: 'Admin',
    date: '2023-08-15'
  },
  { 
    id: '5', 
    title: 'Safety Procedures v2', 
    type: 'Policy', 
    file_type: 'PDF',
    size: '2.1 MB',
    machine: 'Plant',
    uploaded_by: 'Safety Officer',
    date: '2023-09-01'
  },
]

export default function DocumentsList() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredDocs = documentsData.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.machine.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Documents</h2>
          <p className="text-muted-foreground">Centralized library for manuals, SOPs, and diagrams.</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Upload Document
        </Button>
      </div>

      <Card>
        <CardHeader className="p-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30px]"></TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead className="hidden md:table-cell">Machine</TableHead>
                <TableHead className="hidden lg:table-cell">Date</TableHead>
                <TableHead className="hidden lg:table-cell">Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocs.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                        <span>{doc.title}</span>
                        <span className="text-xs text-muted-foreground md:hidden">{doc.type} • {doc.size}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">{doc.type}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{doc.machine}</TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">
                    {doc.date}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">{doc.size}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" title="View">
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Download">
                            <Download className="h-4 w-4" />
                        </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

