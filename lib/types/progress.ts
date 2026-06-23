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
