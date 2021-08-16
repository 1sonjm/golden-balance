import { Entry } from '@/@types/content'
import { RouteLocationNormalized } from 'vue-router'

/*
TODO 컨탠츠 생성시 wildcardable이 true 일때,
최대 라운드에 부족한 수만큰 wildcard 로 설정
14 entry일때, 4round 최대인 16(2 ** 4) etnry의
최대 항목에서 남는 2 entry를 2 wildcard로 설정
*/
export const getPairedRoundTotal = (entries: Array<Entry>): Array<Array<number>> => {
	const shuffledEntries = entries.slice().sort(() => Math.random() - 0.5)
	const resultIndex = [] as Array<Array<number>>

	const entriesLength = entries.length
	let maxRound = 1
	while (entriesLength / (2 ** maxRound) > 0.5) {
		resultIndex.push([] as Array<number>)
		maxRound += 1
	}

	const maxEntryCount = (resultIndex.length + 1) * 2
	console.log(maxEntryCount)
	for (let index = 0; index < maxEntryCount; index += 1) {
		const entry = shuffledEntries[index] as Entry
		if (entry !== undefined && entry.index !== undefined) {
			resultIndex[0].push(entry.index)
		} else {
			resultIndex[0].push(-1)
		}
	}

	resultIndex.push([] as Array<number>)
	return resultIndex
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
