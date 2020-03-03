<template>
    <div>
      <!--面包屑导航-->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品参数</el-breadcrumb-item>
      </el-breadcrumb>
      <!--卡片-->
      <el-card>
        <!--提示标语-->
        <el-alert title="只允许为第三级分类设置参数！" type="warning" show-icon></el-alert>
        <!--options指定数据源-->
        <!--props指定配置对象-->
        选择商品分类:
        <el-cascader expand-trigger="hover" :options="parentCateList" :props="cascaderProps"
                     @change="handleCateChanged" v-model="selectedPids" clearable>
        </el-cascader>
        <!--标签-->
        <el-tabs v-model="activeName"  >.
          <el-tab-pane label="参数组" name="first">
            <!--按钮-->
            <el-button type="primary" @click="addParamsGroup">添加参数组</el-button>
            <!--表格-->
            <el-table :data="paramsGroupList" border stripe @row-click="rowClick">
              <el-table-column type="index"></el-table-column>
              <el-table-column label="参数组名" prop="name"></el-table-column>
              <el-table-column label="操作" >
                <template slot-scope="scope">
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click.stop="editGroup(scope.row)"></el-button>
                  <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUser(scope.row.id)"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="参数" name="second">
            <!--按钮-->
            <el-button type="primary" @click="addParam">添加参数</el-button>
            <!--表格-->
            <el-table :data="paramsList" border stripe >
              <el-table-column type="index"></el-table-column>
              <el-table-column label="参数名" prop="name"></el-table-column>
              <el-table-column label="操作" >
                <template slot-scope="scope">
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="editParam(scope.row)"></el-button>
                  <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUser(scope.row.id)"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!--参数组对话框-->
      <el-dialog :title="isEdit ? '修改参数组信息': '新增参数组'" :visible.sync="addGroupDialogVisible"
                 width="35%" @close="addDialogClosed" >
        <params-form :paramGroupList="paramGroupList" @close="DialogClosed"></params-form>
      </el-dialog>
      <!--参数对话框-->
      <el-dialog :title="isEdit ? '修改参数组信息': '新增参数组'" :visible.sync="addParamsDialogVisible"
                 width="35%" @close="addDialogClosed" >
        <params-form :paramList="paramList" @close="DialogClosed" :isEdit="isEdit" :isGroup="isGroup"></params-form>
      </el-dialog>
    </div>
</template>

<script>
    import getCateListTree from './CateListTree'
    import ParamsForm from "./ParamsForm";
    export default {
      components: {ParamsForm},
      name: "params",
      data(){
        return{
          isGroup: true, //是否为参数组
          isEdit: false, //是否修改
          paramsGroupList:[],// 参数组列表
          paramsList:[], // 参数列表
          // 参数组列表(传给子组件)
          paramGroupList:{},
          // 参数列表(传给子组件)
          paramList:{},
          activeName: 'first',
          // 父级分类列表
          parentCateList:[],
          cascaderProps:{
            value: 'id',
            label: 'name',
            children: 'children'
          },
          // 选中父级id
          selectedPids:[],
          addGroupDialogVisible: false, //参数组对话框
          addParamsDialogVisible: false,//参数对话框
        }
      },
      created(){
        this.getParamsGroupList()
      },
      methods:{
        getParamsGroupList(){
          this.$http.get('item/category/all')
            .then(res =>{
              this.parentCateList=getCateListTree(res)
            })
        },
        // 获取参数组列表
        handleCateChanged(){
          if(this.selectedPids != null){
            this.$http.get('item/spec/groups/'+this.selectedPids[2])
              .then(res =>{
                this.paramsGroupList=res.data
              })
          }
        },
        // 当某一行被点击时会触发该事件
        rowClick(row){
          this.$http.get('item/spec/params/',{params:{gid: row.id,cid: row.cid}})
            .then(res =>{
              this.paramsList=res.data
              this.activeName='second'
            })
        },
        addParamsGroup(){
          this.isEdit = false;
          this.addGroupDialogVisible = true;
        },
        //修改参数组
        editGroup(groupInfo){
          this.addGroupDialogVisible = true;
          this.isEdit = true;
          this.paramGroupList=groupInfo
        },
        // 添加标签关闭事件
        addDialogClosed(){
          this.paramGroupList={};
          this.paramList={}
        },
        DialogClosed(){
          this.addGroupDialogVisible=false
        },
        // 添加参数
        addParam(){
          this.isGroup = false;
          this.isEdit = false;
          this.addParamsDialogVisible = true;
        },
        // 修改参数
        editParam(paramInfo){
          this.isGroup = false;
          this.isEdit = false;
          this.addParamsDialogVisible = true;
          this.paramList=paramInfo
        }
      }
    }
</script>

<style lang="less" scoped>
.el-alert{
  margin-bottom: 20px;
}
</style>
