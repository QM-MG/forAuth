import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import '@/components/directive/drag';
import '@/components/directive/foucs';
import '@/components/directive/loadmore';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'vx-easyui/dist/themes/default/easyui.css';
import 'vx-easyui/dist/themes/icon.css';
import 'vx-easyui/dist/themes/vue.css';
import EasyUI from 'vx-easyui';
import plTable from 'pl-table'
import 'pl-table/themes/index.css' // 引入样式（必须引入)，请查看webpack是否配置了url-loader对woff，ttf文件的引用,不配置会报错哦
import 'pl-table/themes/plTableStyle.css' // 默认表格样式很丑 引入这个样式就可以好看啦（如果你不喜欢这个样式，就不要引入，不引入就跟ele表格样式一样）
// Vue.use(EasyUI);
Vue.use(ElementUI);
Vue.use(plTable);


// import {Table, TableColumn} from 'element-ui';
// Vue.use(Table, TableColumn);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
