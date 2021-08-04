import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
	faEdit,
	faEye,
	faTimes,
	faTrash,
} from '@fortawesome/free-solid-svg-icons'

library.add(
	faEye,
	faTrash,
	faEdit,
	faTimes,
)

export default FontAwesomeIcon
