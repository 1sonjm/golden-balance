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
  type: Array<number>
}
export interface ContentDetail extends Content {
  entries: Array<Entry>
}

export interface ContentType {
  type:[
    { code: 1, name: 'Tournament' }
    | { code: 2, name: 'LastStand' }
    | { code: 3, name: 'SimpleBalance' }
    | { code: 4, name: 'DetailBalance' }
  ]
}

export interface Entry {
  index: number
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
