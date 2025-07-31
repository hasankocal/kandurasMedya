import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL ve Anon Key environment değişkenlerinde tanımlanmalıdır.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database tipleri
export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  created_at: string
  status: 'new' | 'read' | 'replied'
}

export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  image_url: string
  category: string
  published: boolean
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  title: string
  description: string
  image_url: string
  category: string
  client: string
  completed_at: string
  created_at: string
} 