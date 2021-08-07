<template>
	<div
		class="simpleContentForm"
		@click="moveToContent">
		<div>
			썸네일
		</div>
		<div
		class="contentInfo"
		:class="{ showDescription: isShowDescription }">
			<p>{{ content.name }}</p>
			<div class="detail">
				<p class="title"></p>
				<p
					class="description"
					@mouseover="overDescription(true)"
					@mouseleave="overDescription(false)">
					설명 {{ content.description }}
				</p>
				<p>
					<span>수정일 {{ content.updateDate }}</span>
					<span>뷰카운트{{ content.viewCount }}</span>
				</p>
			</div>
		</div>
		<div>
			<button>공유</button>
			<button v-if="content.showResult">결과</button>
		</div>
	</div>
</template>

<script lang="ts">

import {
	defineComponent, PropType, computed, ref,
} from 'vue'
import { useLogger } from 'vue-logger-plugin'
import { useRouter } from 'vue-router'
import { Content } from '@/@types/content'

export default defineComponent({
	name: 'SimpleContentForm',
	components: {},
	props: {
		content: {
			type: Object as PropType<Content>,
			required: true,
		},
	},
	setup(props) {
		const log = useLogger()
		const router = useRouter()
		const moveToContent = () => {
			router.push({ path: '/list/content', query: { id: 111 } })
		}

		// 설명항목 확장 on / off
		const isShowDescription = ref(false)
		const descriptionTimer = ref()
		const overDescription = (isHover:boolean) => {
			if (isHover) {
				descriptionTimer.value = setTimeout(() => {
					if (isHover) {
						isShowDescription.value = true
					}
				}, 1000)
			} else {
				isShowDescription.value = false
				clearTimeout(descriptionTimer.value)
			}
		}
		return {
			log,
			overDescription,
			isShowDescription,
		}
	},
})
</script>

<style lang="scss">
.simpleContentForm{
	.contentInfo{
		.detail{
			position: relative;
			.description{
				overflow: hidden;
				text-overflow: ellipsis;
				line-break: loose;
				display: block;
				white-space: nowrap;
				width: 100%;
			}
		}
		&.showDescription{
			.detail{
				.title{
					margin-bottom: 1.2em;
				}
				.description{
					position: absolute;
					left: 0;
					top: -1.2em;
					white-space: unset;
					z-index: 1;
					height: fit-content;
					border-radius: 5px;
					box-shadow: 0.2em 0.4em 0.5em rgba(0, 0, 0, 0.1);
					animation: moveDown 0.2s;
					animation-fill-mode: forwards;
				}
				@keyframes moveDown {
					0% {}
					100% {
						background-color: rgb(230, 230, 230);
						padding: 0.5em;
					}
				}
			}
		}
	}
}
</style>
