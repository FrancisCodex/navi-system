import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FileText, Plus, Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Document } from '@/constants/types'
import { useDocuments } from '@/hooks/use-documents'

interface DocumentProps {
  documents: Document[];
  startupProfileId: string;
}

export function DocumentCardTabs({ documents, startupProfileId }: DocumentProps): JSX.Element {
  const { createDocument, deleteDocument } = useDocuments()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)
  const [documentToDelete, setDocumentToDelete] = useState<Document | null>(null)
  const [dtiFile, setDtiFile] = useState<File | null>(null)
  const [birFile, setBirFile] = useState<File | null>(null)
  const [secFile, setSecFile] = useState<File | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<{ dti: boolean, bir: boolean, sec: boolean }>({ dti: false, bir: false, sec: false })

  useEffect(() => {
    const uploaded = {
      dti: documents.some(doc => doc.files.some(file => file.file_type === 'DTI Registration')),
      bir: documents.some(doc => doc.files.some(file => file.file_type === 'BIR Registration')),
      sec: documents.some(doc => doc.files.some(file => file.file_type === 'SEC Registration'))
    }
    setUploadedFiles(uploaded)
  }, [documents])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0])
    }
  }

  const handleSubmit = async () => {
    const formData = new FormData()
    if (dtiFile) formData.append('dti_registration', dtiFile)
    if (birFile) formData.append('bir_registration', birFile)
    if (secFile) formData.append('sec_registration', secFile)

    await createDocument(startupProfileId, formData)
    setIsDialogOpen(false)
    window.location.reload()
  }

  const handleDeleteClick = (document: Document) => {
    setDocumentToDelete(document)
    setIsAlertDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (documentToDelete) {
      await deleteDocument(documentToDelete.id)
      setIsAlertDialogOpen(false)
      setDocumentToDelete(null)
      window.location.reload()
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Documents</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Upload Documents</DialogTitle>
              <DialogDescription>
                Upload the required documents for your startup.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="dti_registration">DTI Registration</Label>
                <Input
                  id="dti_registration"
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, setDtiFile)}
                  disabled={uploadedFiles.dti}
                />
              </div>
              <div>
                <Label htmlFor="bir_registration">BIR Registration</Label>
                <Input
                  id="bir_registration"
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, setBirFile)}
                  disabled={uploadedFiles.bir}
                />
              </div>
              <div>
                <Label htmlFor="sec_registration">SEC Registration</Label>
                <Input
                  id="sec_registration"
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, setSecFile)}
                  disabled={uploadedFiles.sec}
                />
              </div>
              <Button
                onClick={handleSubmit}
                disabled={!dtiFile && !birFile && !secFile}
              >
                Upload Documents
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-4">
        {documents.length === 0 ? (
          <p className="text-sm text-muted-foreground">No Documents</p>
        ) : (
          documents.map((document) => (
            document.files.map((file) => (
              <Card key={file.file_path}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">{file.file_name}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{file.file_type}</span>
                          <span>•</span>
                          <span>{(file.file_size / 1024).toFixed(2)} KB</span>
                          <span>•</span>
                          <span>Uploaded: {new Date().toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(document)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                          <span className="sr-only">Delete document</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the document.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))
          ))
        )}
      </div>
    </div>
  )
}