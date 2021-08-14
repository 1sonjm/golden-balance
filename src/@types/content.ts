import { User } from '@/@types/user'

export interface Content {
  id: string
  name: string
  showResult: boolean
  updateDate: Date
  updateUser: User
  viewCount: number
  compareCount: number
  thumbnailURL: string
  wildcard: number
}
export interface ContentDetail extends Entry {
  entries: Array<Entry>
}

export interface Entry {
  index?: number
  name: string
  descrti: string
  references: References
}

export interface References {
  type: 'image' | 'video' | 'location'
  data: string
}

export interface EntryPair {
  a: Entry
  b: Entry
}