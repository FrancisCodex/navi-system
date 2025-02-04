import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface Mentors {
  firstName: string
  lastName: string
  organization: string
  expertise: string
  email: string
  phone: string
  yearsOfExperience: string
}

export default function MentorsForm() {
  const [Mentorss, setMentorss] = useState<Mentors[]>([])
  const [formData, setFormData] = useState<Mentors>({
    firstName: "",
    lastName: "",
    organization: "",
    expertise: "",
    yearsOfExperience: "",
    email: "",
    phone: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleExpertiseChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, expertise: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMentorss((prevMentorss) => [...prevMentorss, formData])
    setFormData({ firstName: "", lastName: "", organization: "", expertise: "", yearsOfExperience: "", email: "", phone: "" })
  }

  return (
    <div className="w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between gap-5">
            <div className="w-full">
            <Label htmlFor="name">First Name</Label>
            <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
            </div>
            <div className="w-full">
            <Label htmlFor="name">Last Name</Label>
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
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
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
            <Select onValueChange={handleExpertiseChange} value={formData.expertise}>
              <SelectTrigger>
                <SelectValue placeholder="Select expertise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="frontend">Frontend Development</SelectItem>
                <SelectItem value="backend">Backend Development</SelectItem>
                <SelectItem value="fullstack">Full Stack Development</SelectItem>
                <SelectItem value="design">UI/UX Design</SelectItem>
                <SelectItem value="devops">DevOps</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
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
            Add Mentors
          </Button>
        </form>
    </div>
  )
}

