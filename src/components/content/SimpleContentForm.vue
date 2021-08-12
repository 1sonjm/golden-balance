<template>
	<div
		class="simpleContentForm"
		@click="moveToContent">
		<div class="thumbnail">
			<img :src="content.thumbnailURL">
		</div>
		<div
		class="contentInfo"
		:class="{ showDescription: isShowDescription }">
			<div class="detail">
				<p class="title">
					{{ content.name }}
				</p>
				<p
					class="description"
					@mouseover="overDescription(true)"
					@mouseleave="overDescription(false)">
					설명 {{ content.description }}
				</p>
				<p class="summary">
					<span class="updateDate"><font-awesome-icon icon="edit"/>{{ formatedDate }}</span>
					<span><font-awesome-icon icon="eye"/>{{ content.viewCount }}</span>
					<span><font-awesome-icon icon="trophy"/>{{ content.compareCount }}</span>
				</p>
			</div>
		</div>
		<div class="buttonGroup">
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
import dayjs from 'dayjs'

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

		const formatedDate = computed(() => dayjs(props.content.updateDate).format('YYYY.MM.DD hh:mm'))

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
			moveToContent,
			formatedDate,
			overDescription,
			isShowDescription,
		}
	},
})
</script>

<style lang="scss">
@import "@/scss/_mixin";

.simpleContentForm{
	padding: 1em;
	position: relative;
	background: $color-content-background;
	.thumbnail{
		img{
			aspect-ratio: 16 / 9;
			width: 100%;
			height: 100%;
		}
	}
	.contentInfo{
		.detail{
			position: relative;
			.title{
				font-weight: bold;
				font-size: 1.2em;
			}
			.description{
				overflow: hidden;
				text-overflow: ellipsis;
				line-break: loose;
				display: block;
				white-space: nowrap;
				width: 100%;
				padding-bottom: 0.5em;
			}
			.summary{
				padding-top: 0.5em;
				border-top: 1px solid #999;
				display: flex;
				span{
					flex: 1 1 0;
					&.updateDate{
						flex-basis: 5em;
					}
				}
			}
		}
		&.showDescription{
			.detail{
				.title{
					margin-bottom: 1.2em;
				}
				.description{
					position: absolute;
					left: -0.3em;
					top: 0;
					white-space: unset;
					z-index: 1;
					height: fit-content;
					border-radius: 5px;
					box-shadow: 0 0.3em 0.5em rgba(0, 0, 0, 0.2);
					animation: moveDown 0.2s;
					animation-fill-mode: forwards;
				}
				@keyframes moveDown {
					0% {}
					100% {
						background-color: rgb(230, 230, 230);
						padding: 0.4em;
					}
				}
			}
		}
	}
	.buttonGroup{
		position: absolute;
		right: 0;
		top: 0;
	}
}

@include tablet-inherit {
  .contentInfo{
    .summary{
      span{
				svg{
					display: block;
					margin: auto;
				}
      }
    }
  }
	.buttonGroup{
		position: relative;
		top: unset;
		right: unset;
	}
}
</style>
