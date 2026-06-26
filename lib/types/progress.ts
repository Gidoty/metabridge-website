export interface StudentRegistration {
  id: string
  full_name: string
  email: string
  whatsapp: string
  course: string
  status: 'pending' | 'approved' | 'rejected'
  submitted_at: string
  approved_at: string | null
}

export interface CapstoneSubmission {
  id: string
  user_id: string | null
  channel: string
  student_name: string
  student_email: string
  drive_url: string
  approved: boolean
  approved_at: string | null
  submitted_at: string
}
