export interface User {
	id: string
	name: string
	loginExpire: Date | undefined
	gender: Gender
}

export type Gender = 'M' | 'W'