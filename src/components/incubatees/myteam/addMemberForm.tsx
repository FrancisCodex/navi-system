import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import { useMembers } from "@/hooks/use-members"
import type { Members } from "@/constants/types"

interface AddMemberFormProps {
  startupProfileId: string;
  onSuccess: () => void;
}

export const AddMemberForm = ({ startupProfileId, onSuccess }: AddMemberFormProps): JSX.Element => {
  const { createMember } = useMembers()
  const [member, setMember] = useState<Omit<Members, 'id'>>({
    name: "",
    role: "",
    course: "",
    startup_profile_id: startupProfileId,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setMember((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    await createMember(startupProfileId, member)
    onSuccess()
  }

  return (
    <div>
      <div className="grid gap-4">
        <Input
          id="name"
          name="name"
          value={member.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <Input
          id="role"
          name="role"
          value={member.role}
          onChange={handleChange}
          placeholder="Role"
        />
        <Input
          id="course"
          name="course"
          value={member.course}
          onChange={handleChange}
          placeholder="Course"
        />
      </div>
      <div className="flex justify-end mt-4">
        <Button onClick={handleSubmit}>Add Member</Button>
      </div>
    </div>
  )
}