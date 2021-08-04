export type User = {
	id: string,
	name: string
	loginExpire: Date | undefined
}

export const state: User = {
	id: 'test',
	name: 'abc',
	loginExpire: undefined,
}
