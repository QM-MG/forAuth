<template>
	<div id="app">
		<div class="aside left">
			<left-menu></left-menu>
		</div>
		<div class="aside main">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
import leftMenu from '@/components/leftMenu.vue';
export default {
    data() {
        return {};
	},
	components: {
		leftMenu
	},
    mounted() {
    },
    methods: {}
};
</script>
</script>
<style lang="less">
html, body,#app {
	height: 100%;
}
#app {
	.aside.left{
		height: 100%;
    	background-color: #304156;
		position:absolute;
		width:250px;
		top:0px;
		left:0px;
	}
	.aside.main{
		margin-top: 10px;
    	margin-left:260px;
	}
	.aside {
		height:600px;
	}
}
</style>
