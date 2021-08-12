import { User } from '@/@types/user'

export type Content = {
  id: string
  name: string
  showResult: boolean
  updateDate: Date
  updateUser: User
  entryCount: number
  compareCount: number
  thumbnailURL: string
}