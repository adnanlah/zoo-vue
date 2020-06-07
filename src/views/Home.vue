<template>
  <div class="home">
    <ZooData/>
  </div>
</template>

<script>
// @ is an alias to /src
import ZooData from '@/components/ZooData.vue'

export default {
  name: 'Home',
  components: {
    ZooData
  }
};
</script>

<style>
	body {
		background: #10375c;
	}
</style>
