<template>
	<header
		id="header"
		class="contentWidthLimit">
		<section class="menu">
			<div class="dropdown">
				<input type="checkbox" id="dropdown">
				<label class="dropdown__face" for="dropdown">
					<div class="dropdown__arrow"></div>
				</label>

				<div class="dropdown__items search">
					<SearchBar/>
				</div>

				<ul class="dropdown__items menuList">
					<li><router-link to="/">Home</router-link></li>
					<li><router-link to="/list">list</router-link></li>
					<li><router-link to="/about">About2</router-link></li>
					<li><router-link to="/about">About3</router-link></li>
					<li><router-link to="/about">About4</router-link></li>
					<li><router-link to="/about">About5</router-link></li>
					<li><router-link to="/about">About6</router-link></li>
					<li><router-link to="/about">About7</router-link></li>
					<li><router-link to="/about">About8</router-link></li>
					<li><router-link to="/about">About9</router-link></li>
				</ul>

				<svg>
					<filter id="goo">
						<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
						<feColorMatrix in="blur" type="matrix"
							values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
						<feBlend in="SourceGraphic" in2="goo" />
					</filter>
				</svg>
			</div>

			<router-link to="/" class="logo"></router-link>

			<div class="darkSwitch">
				<DarkmodeSwitch/>
			</div>
		</section>
		<hr class="menuLine">
	</header>
</template>

<script lang="ts">
import SearchBar from '@/components/SearchBar.vue'
import DarkmodeSwitch from '@/components/DarkmodeSwitch.vue'

import {
	defineComponent, computed, ref,
} from 'vue'
import { useLogger } from 'vue-logger-plugin'

export default defineComponent({
	name: 'template',
	components: {
		SearchBar,
		DarkmodeSwitch,
	},
	props: {
	},
	setup(props) {
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

	.dropdown {
		z-index: 1;
		width: 80px;
		left: 0;
		top: 0;
		filter: url(#goo);

		&__face,
		&__items {
			background-color: #fff;
			padding: 20px;
			border-radius: 25px;
		}

		&__face {
			display: block;
			position: relative;
			padding: 5px;
			height: 28px;
			width: 28px;
			left: 20px;
			top: 5px;
		}

		&__items {
			margin: 0;
			position: absolute;
			left: 10px;
			top: 50%;
			width: 100%;
			column-count: 5;
			list-style: none;
			list-style-type: none;
			justify-content: space-between;
			visibility: hidden;
			z-index: -1;
			opacity: 0;
			transition: all 0.3s cubic-bezier(0.93, 0.88, 0.1, 0.8);

			&::before {
				content: "";
				background-color: #fff;
				position: absolute;
				bottom: 100%;
				left: 8%;
				height: 18px;
				width: 15px;
			}
		}

		&__arrow {
			border-bottom: 2px solid #000;
			border-right: 2px solid #000;
			position: absolute;
			top: 50%;
			right: 50%;
			width: 10px;
			height: 10px;
			transform: rotate(45deg) translateY(-50%);
			transform-origin: right;
		}

		input[type="checkbox"] {
			display: none;

			&:checked ~ .dropdown__items {
				visibility: visible;
				opacity: 1;
				&.search{
					top: calc(100% + 25px);
					width: 300px;
				}
				&.menuList{
					top: calc(100% + 110px);
					width: 500px;
					li{
						a{
							font-weight: bold;
							color: #2c3e50;
							&.router-link-exact-active {
								color: #42b983;
							}
						}
					}
				}
			}
		}
		svg {
			display: none;
		}
	}
}
</style>
