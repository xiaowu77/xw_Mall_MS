<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片-->
    <el-card>
      <el-button type="primary" @click="showDialog">添加分类</el-button>
      <!--表格-->
      <tree-table class="treeTable" :data="cateList" :columns="columns"
      :selection-type="false" :expand-type="false"
      show-index index-text="#" border
      :show-row-hover="false">
        <!--排序-->
        <template slot="sort" slot-scope="scope">
          <el-tag v-if="scope.row.sort === 1" type="success">一级</el-tag>
          <el-tag v-if="scope.row.sort === 2" type="primary">二级</el-tag>
          <el-tag v-if="scope.row.sort === 3" type="danger">三级</el-tag>
        </template>
        <template slot="opt" slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editUser(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUser(scope.row.id)"></el-button>
        </template>
      </tree-table>
      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.row"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage">
      </el-pagination>
    </el-card>
    <!--添加分类对话框-->
    <el-dialog :title="isEdit ? '修改用户信息': '新增用户'" :visible.sync="addDialogVisible" width="35%" >
      <cate-form :allCateList="allCateList" @close="DialogClosed"></cate-form>
    </el-dialog>
  </div>
</template>

<script>
    import getCateListTree from './CateListTree'
    import CateForm from "./CateForm";

    export default {
      components: {CateForm},
      name: "cate",
      data(){
        return {
          queryInfo: {
            type: 3,
            page: 1,
            row: 5,
          },
          isEdit:false,
          addDialogVisible:false,
          totalPage: 1,
          cateList: [],
          allCateList: [],
          // table指定列
          columns: [
            {
              label: '分类名称',
              prop: 'name',
            },
            {
              label: '排序',
              type: 'template',
              template: 'sort',
            },
            {
              label: '操作',
              type: 'template',
              template: 'opt',
            },
          ]
        }
      },
      created(){
        this.getCateList()
      },
      methods: {
        getCateList(){
          this.$http.get('item/category/all').then(res =>{
            this.totalPage=getCateListTree(res).length
            this.allCateList = getCateListTree(res)
            this.cateList = getCateListTree(res).slice(this.queryInfo.row*(this.queryInfo.page-1),this.queryInfo.row*this.queryInfo.page)
          })

        },
        handleSizeChange(newSize){
          this.queryInfo.row=newSize
          this.getCateList()
        },
        handleCurrentChange(newPage){
          this.queryInfo.page=newPage
          this.getCateList()
        },
        showDialog(){
          // 先获取父级列表数据再展示对话框
          this.getParentCateList();
          this.isEdit= false;
          this.addDialogVisible = true;
          this.oldUserInfo=null;
        },
        //获取父级分类列表
        getParentCateList(){
          this.$http.get('',{params:{pid:2}})
        },
        DialogClosed(){
          this.addDialogVisible = false;
        }
      }
    }
</script>

<style scoped>
.treeTable{
  margin-top: 20px;
}
</style>
