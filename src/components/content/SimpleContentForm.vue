<template>
	<div class="simpleContentForm">
		<section @click="moveToContent">
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
		</section>
		<section class="buttonGroup">
			<button @click="share">
				<font-awesome-icon icon="share-alt"/>
				<span>공유</span>
			</button>
			<button @click="showResult">
				<font-awesome-icon icon="chart-pie"/>
				<span>결과</span>
			</button>
		</section>
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
			router.push({
				name: 'ContentViewer',
				query: { id: props.content.id },
				params: { contentType: props.content.type },
			})
		}

		const showResult = () => {
			router.push({
				name: 'ContentResult',
				query: { id: props.content.id },
				params: { contentType: props.content.type },
			})
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
			showResult,
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
	.thumbnail{
		position: relative;
		img{
			aspect-ratio: 16 / 9;
			width: 100%;
			height: 100%;
			border-radius: 0.5em;
			border: 1px solid $color-base-border;
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
					svg{
						margin: 0 0.2em 0 0;
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
		button{
			border: none;
			border-radius: 0.3em;
			width: 2em;
			height: 1.7em;
			background-color: lighten($color-reverse-light, 30%);
			color: $color-base-light;
			&:not(:last-child){
				margin-right: 0.2em;
			}
			span{
				display: none;
			}
		}
	}
}
#appWrap{
	&.lightMode{
		.simpleContentForm{
			@include brightness-light;
		}
	}
	&.darkMode{
		.simpleContentForm{
			@include brightness-dark;
		}
	}
}
@include tablet-inherit {
  .contentInfo{
    .summary{
      span{
				svg{
					display: block;
					margin: auto !important;
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
