export enum Locale {
	ko = 'ko_kr',
	en = 'en_us',
}
export type Location = {
	latitude: number,
	longitude: number,
}
export type Common = {
	isLoading: boolean,
	locale: Locale,
	location: Location,
}

export const state: Common = {
	isLoading: false,
	locale: Locale.ko,
	location: {
		latitude: 37.566280592758005,
		longitude: 126.97797791533893,
	},
}
