import Vue from 'vue'
import { Form, FormItem, Message, Input,
  Button, Container ,Header, Aside,
  Breadcrumb, BreadcrumbItem, Main, Menu,
  Submenu, MenuItem, Card, Row,
  Col, Table, TableColumn, Switch,
  Tooltip, Pagination, Dialog, MessageBox,
  Tag, Cascader, Alert, Tabs,
  TabPane, Step, Steps, Select,
  Option, Upload} from 'element-ui'

Vue.use(Option)
Vue.use(Steps)
Vue.use(Step)
Vue.use(TabPane)
Vue.use(Tabs)
Vue.use(Alert)
Vue.use(Cascader)
Vue.use(Select)
Vue.use(Tag)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(Tooltip)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Row)
Vue.use(Table)
Vue.use(BreadcrumbItem)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Upload)
Vue.prototype.$message=Message
Vue.prototype.$confirm=MessageBox.confirm
