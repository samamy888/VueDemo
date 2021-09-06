import { createApp } from 'vue'
import App from './App.vue'

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import router from './router'

createApp(App).use(router).use(VXETable).mount("#app");