import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/ko'

import { ref } from 'vue'
import store from '@/store'

export default function forrmatDate(
	inputDate: Dayjs | Date | string,
): string {
	const convertDate = ref(dayjs(inputDate))

	const { locale } = store.state.common
	return convertDate.value.locale(locale).format('YYYY-MM-DD')
}
