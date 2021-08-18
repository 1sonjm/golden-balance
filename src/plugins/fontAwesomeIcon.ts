import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
	faEdit,
	faEye,
	faTimes,
	faTrash,
	faBalanceScale,
	faTrophy,
	faShareAlt,
	faChartPie,
	faTimesCircle,
} from '@fortawesome/free-solid-svg-icons'

library.add(
	faTimesCircle,
	faChartPie,
	faShareAlt,
	faTrophy,
	faBalanceScale,
	faTimes,
	faTrash,
	faEye,
	faEdit,
)

export default FontAwesomeIcon
