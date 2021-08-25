export enum Locale {
	ko = 'ko_kr',
	en = 'en_us',
}
export type Location = {
	latitude: number,
	longitude: number,
}
export type Common = {
	loading:{
		isOn: boolean
		message: string | undefined
	}
	locale: Locale
	location: Location
	isDarkMode: boolean
}

export const state: Common = {
	loading: {
		isOn: false,
		message: undefined,
	},
	locale: Locale.ko,
	location: {
		latitude: 37.566280592758005,
		longitude: 126.97797791533893,
	},
	isDarkMode: false,
}
