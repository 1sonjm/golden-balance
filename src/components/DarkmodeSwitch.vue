<template>
	<div id="darkModeSwitch">
		<input type="checkbox" name="isDarkMode" id="darkMode">
		<label
			for="darkMode"
			@click="toggleDarkMode">
			<div class="image">
				<i class="sun">해</i>
				<i class="moon">달</i>
				<!-- <div>달</div> -->
				<div class="lineBox">
					<div class="line"></div>
					<div class="line"></div>
				</div>
			</div>
		</label>
	</div>
</template>

<script lang="ts">
import {
	defineComponent, computed, ref,
} from 'vue'
import { useLogger } from 'vue-logger-plugin'
import store from '@/store'

export default defineComponent({
	name: 'darkModeSwitch',
	components: {
	},
	props: {
	},
	setup(props) {
		const log = useLogger()

		const toggleDarkMode = () => {
			store.commit('ToggleDarkMode')
			log.debug('dark mode', store.state.common.isDarkMode)
		}
		return {
			log,
			toggleDarkMode,
		}
	},
})
</script>

<style lang="scss" scoped>
@import "@/scss/_variables";

#darkModeSwitch{
	width: 2.5em;
	height: 100%;
	position: relative;
	[name="isDarkMode"]{
		display: none;
	}
	[name="isDarkMode"] + label{
		cursor: pointer;
		.sun{
			transition: 0.5s ease;
			transition-property: opacity top;
			opacity: 1;
			top: 0;
		}
		.moon{
			transition: 0.5s ease;
			transition-property: opacity top;
			opacity: 0;
			top: 20px;
		}
		.image{
			position: relative;
			width: 100%;
			height: 100%;
			i{
				display: block;
				position: absolute;
			}
			.lineBox{
				bottom: 0;
				position: absolute;
				width: 100%;
				background-color: $color-base-background;
				padding-bottom: 0.3em;
				.line{
					display: block;
					background: $color-base-border;
					height: 0.25em;
					border-radius: 1em;
					margin: auto;
					&:nth-child(1){
						width: 80%;
						margin-bottom: 0.25em;
					}
					&:nth-child(2){
						width: 40%;
					}
				}
			}
		}
	}
	[name="isDarkMode"]:checked + label{
		.sun{
			opacity: 0;
			top: 20px;
		}
		.moon{
			opacity: 1;
			top: 0;
		}
	}
}

</style>
