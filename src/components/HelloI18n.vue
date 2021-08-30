<template>
  <p>{{ t('hello') }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createI18n } from 'vue-i18n'

export default defineComponent({
	name: 'HelloI18n',
	setup() {
		const t = createI18n({
			inheritLocale: true,
			useScope: 'local',
		})

		// Something todo ..

		return { t }
	},
})
</script>
