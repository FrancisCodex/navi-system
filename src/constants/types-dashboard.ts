export interface StartupProfile {
    id: number;
    startup_name: string;
    industry: string;
    leader_id: number;
    date_registered_dti: string | null;
    date_registered_bir: string | null;
    startup_founded: string;
    startup_description: string;
    status: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Leader {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    role: string;
  }
  
  export interface Member {
    id: number;
    name: string;
    role: string;
    course: string;
    startup_profile_id: number;
    created_at: string;
    updated_at: string;
  }
  
  export interface Appointment {
    id: number;
    mentor_id: string;
    leader_id: number;
    date: string;
    status: string;
    created_at: string;
    updated_at: string;
    mentorName: string;
  }
  
  export interface Submission {
    submission_id: number;
    activity_id: number;
    activity_name: string;
    module: string;
    TBI: string;
    due_date: string;
    submitted_at: string;
    graded: boolean;
    submission_file: string;
    leader_name: string;
  }
  
  export interface Activity {
    id: number;
    created_at: string;
    updated_at: string;
    activity_name: string;
    module: string;
    session: string;
    activity_description: string;
    speaker_name: string;
    TBI: string;
    due_date: string;
    activityFile_path: string;
  }

  export interface Mentor {
    id: number;
    mentorName: string;
    email: string;
    phoneNumber: string;
    organization: string;
    expertise: string;
    yearsOfExperience: number;
  }
  
  export interface DashboardData {
    startup_profile: StartupProfile;
    leader: Leader;
    members: Member[];
    activities: Activity[];
    submissions: Submission[];
    appointments: Appointment[];
    mentors: Mentor[];
  }