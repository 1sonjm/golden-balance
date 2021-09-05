<template>
	<div id="home">
		<img alt="Vue logo" src="../assets/logo.png">
		<div class="ani">
			<i class="boxSide back"></i>
			<i
				class="cat">
			</i>
			<i class="boxSide left"></i>
			<i class="boxSide right"></i>
			<i class="boxSide front"></i>
			<i class="boxTop"></i>
		</div>
		{{ t('hello') }}<br>
		{{ t('test') }}
		<HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
		<HelloWorld msg="Welcome to Your Vue.js + 2222 App"/>
		<HelloWorld msg="Welcome to Your Vue.js + 333 App"/>
		<HelloWorld msg="Welcome to Your Vue.js + 444 App"/>
	</div>
</template>

<script lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'

import {
	defineComponent, ref,
} from 'vue'
import { useLogger } from 'vue-logger-plugin'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'

export default defineComponent({
	name: 'Home',
	components: {
		HelloWorld,
	},
	setup() {
		const log = useLogger()
		const { t } = useI18n()
		const now = ref(dayjs())

		return {
			log,
			t,
			now,
		}
	},
})
</script>

<style lang="scss">
$box-color: rgb(150, 117, 55);
	.ani{
		display: block;
		height: 100px;
		width: 100px;
		perspective: 500px;
		perspective-origin: 50% 50%;
		.boxTop{
			position: absolute;
			left: -10px;
			top: 0;
			display: none;
			width: 120px;
			height: 20px;
			background: rgb(150, 117, 55)
		}
		.boxSide{
			position: absolute;
			left: 0;
			top: 0;
			width: 100px;
			height: 40px;
			background: rgb(150, 117, 55);
			&.left{
				background: darken($box-color, 10%);
				transform: translateX(-50px) rotateY(90deg) rotateZ(-10deg);
			}
			&.right{
				background: darken($box-color, 10%);
				transform: translateX(50px) rotateY(-90deg) rotateZ(10deg);
			}
			&.back{
				background: darken($box-color, 20%);
				transform: translateY(-8px) translateZ(-50px);
			}
			&.front{
				transform: translateY(8px) translateZ(50px);
			}
		}
		.cat{
			position: absolute;
			left: 0;
			top: 0;
			width: 60px;
			height: 100px;
			background: rgba(1, 1, 1, 1);
			animation: swirl-out-bck 5s ease both infinite;
			@keyframes swirl-out-bck {
				0% {transform: translateY(0);}
				60% {transform: translateY(0);}
				80% {transform: translateY(-100px);}
				100% {transform: translateY(0);}
			}
		}
	}
</style>
