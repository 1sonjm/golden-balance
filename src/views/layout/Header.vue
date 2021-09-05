<template>
	<header
		id="header"
		class="contentWidthLimit">
		<section class="menu">
			<Navigation/>

			<router-link to="/" class="logo"></router-link>

			<div class="darkSwitch">
				<DarkmodeSwitch/>
			</div>
		</section>
		<hr class="menuLine">
	</header>
</template>

<script lang="ts">
import Navigation from '@/components/Navigation.vue'
import DarkmodeSwitch from '@/components/DarkmodeSwitch.vue'

import {
	defineComponent,
} from 'vue'
import { useLogger } from 'vue-logger-plugin'

export default defineComponent({
	name: 'Header',
	components: {
		Navigation,
		DarkmodeSwitch,
	},
	props: {
	},
	setup() {
		const log = useLogger()

		return {
			log,
		}
	},
})
</script>

<style lang="scss">
@import "@/scss/_mixin";

#header{
	width: 100%;
	height: $size-header-height;
	position: relative;
	.menu{
		display: flex;
		justify-content: center;
		padding-top: 0.2em;
		.logo{
			background: url('~@/assets/logo.png') no-repeat center center;
			display: block;
			width: 30%;
			height: 3rem;
			cursor: pointer;
			margin: auto;
		}
		.darkSwitch{
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 1em;
		}
	}
	.menuLine{
		width: calc(100% - 2em);
		margin-top: 0.2em;
	}
}
</style>
