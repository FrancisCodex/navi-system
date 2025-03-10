export interface Mentor {
    id?: string; // id is optional when creating a new mentor
    firstName: string;
    lastName: string;
    organization: string;
    expertise: string;
    yearsOfExperience: number;
    email: string;
    phoneNumber?: string; // phoneNumber is optional
  }

export interface Achievement {
    id: string;
    competition_name: string;
    organized_by: string;
    prize_amount: number;
    category?: string;
    description?: string;
    event_location?: string;
    article_link?: string;
    photos?: string[];
}

export interface Activity {
    id: string;
    activity_name: string;
    module: string;
    session: string;
    activity_description: string;
    speaker_name: string;
    TBI: string;
    due_date: Date;
    file?: File;
  }

export interface Appointment {
    id: string;
    incubateeName: string;
    mentorName: string;
    mentor_expertise: string;
    date: string;
    requestedAt: string;
    status: "pending" | "accepted" | "declined" | "completed" | "cancelled";
  }

export interface DashboardData {
    totalStartupProfiles: number;
    pendingAppointments: number;
    totalAppointments: number;
    loading: boolean;
  }

export interface Document {
    id: string;
    dti_registration: File;
    bir_registration: File;
    sec_registration: File;
}

export interface Incubatees{
    id: string;
    name: string;
    email: string;
    role: string;
}

export interface Members {
    id: string;
    name: string;
    role: string;
    course: string;
    startup_profile_id: string;
}

export interface StartupProfile {
    id: string;
    startup_name: string;
    startup_description: string;
    leader_id: string;
    date_registered_dti?: Date | null;
    date_registered_bir?: Date | null;
    startup_founded: Date;
    status: "Active" | "Inactive";
    industry: string;
    total_members?: string;
    leader_name?: string;
}

export interface Submission {
    id: string;
    activity_id: string;
    submissionDate: Date;
    file: File;
  }

export interface StartupGroup {
    id: string;
    startup_name: string;
    startup_description: string;
    leader_id: string;
    date_registered_dti?: Date | null;
    date_registered_bir?: Date | null;
    startup_founded: Date;
    status: "Active" | "Inactive";
    industry: string;
    total_members?: string;
    leader_name?: string;
}