<template>
	<div id="darkModeSwitch">
		<input type="checkbox" name="isDarkMode" id="darkMode">
		<label
			for="darkMode"
			@click="toggleDarkMode">
			<div class="image">
				<i class="sun">
					<img src="@/assets/icon/svg/sun.svg"/>
				</i>
				<i class="moon">
					<img src="@/assets/icon/svg/moon.svg"/>
				</i>
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
	defineComponent,
} from 'vue'
import { useLogger } from 'vue-logger-plugin'
import store from '@/store'

export default defineComponent({
	name: 'darkModeSwitch',
	components: {
	},
	props: {
	},
	setup() {
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

@mixin up {
	opacity: 1;
	top: 2px;
}
@mixin down {
	opacity: 0;
	top: 15px;
}

#darkModeSwitch{
	width: 2.5em;
	height: 100%;
	max-height: 2.5em;
	position: relative;
	[name="isDarkMode"]{
		display: none;
	}
	[name="isDarkMode"] + label{
		cursor: pointer;
		width: 100%;
		height: 100%;
		.sun{
			transition: 0.5s ease;
			transition-property: opacity top;
			@include up
		}
		.moon{
			transition: 0.5s ease;
			transition-property: opacity top;
			@include down
		}
		.image{
			position: relative;
			width: 100%;
			height: 100%;
			i{
				display: block;
				position: absolute;
				width: 100%;
				&.sun{
					filter: invert(.5) sepia(1) saturate(5) hue-rotate(0deg);
					img{
						width: 57%;
					}
				}
				&.moon{
					filter: invert(.5) sepia(1) saturate(4) hue-rotate(175deg);
					img{
						width: 47%;
					}
				}
			}
			.lineBox{
				bottom: 0;
				position: absolute;
				width: 100%;
				z-index: 1;
				padding-bottom: 0.3em;
				.line{
					display: block;
					background: $color-point-secondary;
					height: 2px;
					border-radius: 5px;
					margin: auto;
					&:nth-child(1){
						width: 70%;
						margin-bottom: 3px;
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
			@include down
		}
		.moon{
			@include up
		}
	}
}
.darkMode{
}

</style>
