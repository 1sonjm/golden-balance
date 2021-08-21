import { Entry } from '@/@types/content'
import { RouteLocationNormalized } from 'vue-router'

export const getTournamentEntrySet = (entries: Array<Entry>): Array<Array<number>> => {
	const shuffledEntries = entries.slice().sort(() => Math.random() - 0.5)
	const result = [] as Array<Array<number>>

	const entriesLength = entries.length
	let maxRound = 1
	while (entriesLength / (2 ** maxRound) > 0.5) {
		result.push([] as Array<number>)
		maxRound += 1
	}

	const maxEntryCount = (result.length + 1) * 2
	for (let index = 0; index < maxEntryCount; index += 1) {
		const entry = shuffledEntries[index] as Entry
		if (entry !== undefined && entry.index !== undefined) {
			result[0].push(entry.index)
		} else {
			result[0].push(-1)
		}
	}

	result.push([] as Array<number>)
	return result
}
export const getLastStandEntrySet = (entries: Array<Entry>) => {
	const result = [] as Array<Array<number>>
	return result
}
export const getSimpleBalanceEntrySet = (entries: Array<Entry>) => {
	const sortedEntries = entries.slice()
		.sort((a:Entry, b: Entry) => b.selectedCount - a.selectedCount)
	const result = [] as Array<Array<number>>

	result.push([] as Array<number>)
	result[0].push(sortedEntries[0].index)
	result[0].push(sortedEntries[1].index)

	result.push([] as Array<number>)
	return result
}
export const getDetailBalanceEntrySet = (entries: Array<Entry>) => {
	const result = [] as Array<Array<number>>
	return result
}

export const findEntryByIndex = (entries: Array<Entry>, targetIndex: number): Entry => {
	const result = entries.find((entry: Entry) => entry.index === targetIndex)
	if (result === undefined || result === null) {
		throw new TypeError(`can't find entry(index:${targetIndex}) in entries`)
	}

	return result
}

export const getParsedDataFromRouteParams = (route: RouteLocationNormalized) => {
	let finishEntryIndex = -1
	if (Array.isArray(route.params.finishEntryIndex)) {
		throw	new TypeError('finishEntryIndex type is wrong')
	} else {
		finishEntryIndex = Number.parseInt(route.params.finishEntryIndex, 10)
		if (Number.isNaN(finishEntryIndex)) {
			finishEntryIndex = -1
		}
	}
	return { finishEntryIndex }
}

export const delay = (millisecond: number) => new Promise((res) => setTimeout(res, millisecond))
