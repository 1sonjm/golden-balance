import { User } from '@/@types/user'

export type Content = {
  id: string
  name: string
  showResult: boolean
  updateDate: Date
  updateUser: User
  viewCount: number
  compareCount: number
  thumbnailURL: string
  entries: Entry
}

export type Entry = {
  name: string
  descrti: string
  references: References
}

export type References = {
  type: 'image' | 'video' | 'location'
  data: string
}