import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useMentor } from "@/hooks/create-mentor"
import type { Mentor } from "@/constants/types"

interface MentorsFormProps {
  onSuccess: () => void
}

export default function MentorsForm({ onSuccess }: MentorsFormProps) {
  const { createMentor } = useMentor()
  const [formData, setFormData] = useState<Mentor>({
    firstName: "",
    lastName: "",
    organization: "",
    expertise: "",
    yearsOfExperience: 0,
    email: "",
    phoneNumber: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleExpertiseChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, expertise: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createMentor(formData)
    setFormData({ firstName: "", lastName: "", organization: "", expertise: "", yearsOfExperience: 0, email: "", phoneNumber: "" })
    onSuccess() // Call the onSuccess callback to close the dialog and refresh the mentor list
  }

  return (
    <div className="w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between gap-5">
            <div className="w-full">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
            </div>
            <div className="w-full">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="organization">Organization</Label>
            <Input
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expertise">Expertise</Label>
            <Input id="expertise" name="expertise" value={formData.expertise} onChange={handleInputChange} required/>
            {/* <Select onValueChange={handleExpertiseChange} value={formData.expertise}>
              <SelectTrigger>
                <SelectValue placeholder="Select expertise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="frontend">Frontend Development</SelectItem>
                <SelectItem value="backend">Backend Development</SelectItem>
                <SelectItem value="fullstack">Full Stack Development</SelectItem>
                <SelectItem value="design">UI/UX Design</SelectItem>
                <SelectItem value="devops">DevOps</SelectItem>
                <SelectItem value="fintech">FinTech</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select> */}
          </div>
          <div className="space-y-2">
            <Label htmlFor="yearsOfExperience">Years of Experience</Label>
            <Input
              id="yearsOfExperience"
              name="yearsOfExperience"
              type="number"
              min="0"
              value={formData.yearsOfExperience}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Add Mentor
          </Button>
        </form>
    </div>
  )
}