<template>
	<div
		id="footer"
		:class="isDarkMode ? 'lightMode' : 'darkMode'">
		<p>설명1</p>
		<p>설명2</p>
		<p>설명3</p>
		<p class="selectLocale">
			언어:
			<span @click="changeLocale('ko')">한국어</span> /
			<span @click="changeLocale('en')">English</span>
		</p>
	</div>
</template>

<script lang="ts">
import {
	defineComponent, computed,
} from 'vue'
import { useLogger } from 'vue-logger-plugin'
import { useI18n } from 'vue-i18n'
import store from '@/store'

export default defineComponent({
	name: 'Footer',
	components: {
	},
	props: {
	},
	setup() {
		const log = useLogger()
		const isDarkMode = computed(() => store.state.common.isDarkMode)
		const { t, locale } = useI18n()

		const changeLocale = (target:string) => {
			log.info('changeLocale', target)
			locale.value = target
		}

		return {
			log,
			isDarkMode,
			changeLocale,
		}
	},
})
</script>

<style lang="scss">
@import "@/scss/_mixin";

#footer{
	@include brightness-toggle;
	.selectLocale{
		span{
			cursor: pointer;
		}
	}
}
</style>
