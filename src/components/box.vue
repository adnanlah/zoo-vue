<template>
	<div class="box">
		<span class="text">
			<slot name="name"></slot>
		</span>
		<slot name="button"></slot>
	</div>
</template>

<script>
export default {
  name: 'box',
  props: {
  	
  },
};
</script>

<style lang="scss" scoped>
.box {
	display: flex;
	
	justify-content: space-between;
	padding: 5px;
	box-shadow: 1px 1px 2px darkgrey;
	border-radius: 5px;
}
</style>