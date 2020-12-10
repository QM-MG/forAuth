<template>
	<div id="app">
			<div class="aside left" :class="[isCollapse?'close-left':'open-left']">
				<left-menu :isCollapse="isCollapse"></left-menu>
			</div>
			<div class="aside main" :style="{marginLeft:(isCollapse?'54px':'205px')}">
		<el-button @click="aaa">aaa</el-button>
				<router-view></router-view>
			</div>
	</div>
</template>
<script>
import leftMenu from '@/components/leftMenu.vue';
export default {
    data() {
        return {
			isCollapse: true
		};
	},
	components: {
		leftMenu
	},
    mounted() {
    },
    methods: {
		aaa() {
			this.isCollapse = !this.isCollapse
		}
	}
};
</script>
</script>
<style lang="less">
html, body,#app {
	height: 100%;
}
#app {
	.aside.left{
		-webkit-transition: width .28s;
		transition: width .28s;
		width: 205px;
		background-color: #304156;
		height: 100%;
		position: fixed;
		font-size: 0;
		top: 0;
		bottom: 0;
		left: 0;
		z-index: 1001;
		overflow: hidden;
	}
	.aside.main{
		min-height: 100%;
		-webkit-transition: margin-left .28s;
		transition: margin-left .28s;
		margin-left: 205px;
		position: relative;
		background-color: antiquewhite;
	}
	.aside {
		height:600px;
	}
	.open-left {
		width: 205px !important;
	}
	.close-left {
		width: 54px !important;
	}
}
</style>
