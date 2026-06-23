export type QualityLevel = 'hd' | 'auto' | 'data-saver'

export interface SlideQuestion {
  text: string
  isOpenEnded: boolean
}

export interface Slide {
  id: string
  title: string
  content: string
  type: 'content' | 'question' | 'assignment'
  imageUrl?: string
  question?: SlideQuestion
}

export interface LectureSession {
  id: string
  channel: 'free' | 'paid'
  is_live: boolean
  daily_room_url: string | null
  recording_active: boolean
  streaming_active: boolean
  youtube_rtmp_key: string | null
  youtube_replay_url: string | null
  current_slide_index: number
  slides: Slide[]
  created_at: string
  updated_at: string
}

export interface SlideChangeEvent {
  slideIndex: number
}
