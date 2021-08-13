<template>
	<div id="contentResult">
		<section id="result">
			<div id="chartArea">
				<DoughnutChart :chartData="testData"/>
			</div>
			<div>
				<div>
					<span>컨텐츠 명</span>
					<span>*선택카운트 222</span>
				</div>
				<div>댓글?</div>
			</div>
		</section>
		<section>
			추천 항목
		</section>
	</div>
</template>

<script lang="ts">
import {
	defineComponent, computed, ref,
} from 'vue'
import { useLogger } from 'vue-logger-plugin'
import { DoughnutChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default defineComponent({
	name: 'template',
	components: {
		DoughnutChart,
	},
	props: {
	},
	setup(props) {
		const log = useLogger()

		const testData = {
			labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
			datasets: [
				{
					data: [30, 40, 60, 70, 5],
					backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
				},
			],
		}
		return {
			log,
			testData,
		}
	},
})
</script>

<style lang="scss">
@import "@/scss/_mixin";

#result{
	display: flex;
	#chartArea{
		max-width: 20em;
	}
}
</style>
