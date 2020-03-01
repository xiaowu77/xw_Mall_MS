<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片-->
    <el-card>
      <el-table :data="rightsList">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'" type="success">一级</el-tag>
            <el-tag v-if="scope.row.level === '1'" type="primary">二级</el-tag>
            <el-tag v-if="scope.row.level === '2'" type="danger">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  import rights from './rights';
    export default {
      name: "rights",
      data(){
        return{
          rightsList:[]
        }
      },
      created(){
        this.rightsList=rights
        this.getRightsList()
      },
      methods:{
        getRightsList(){
          this.$http.get('rights/list')
            .then(res =>{
              if(res.status!==200){
                return this.$message.error("获取权限列表失败！")
              }
              return this.$message.success("获取权限列表成功！")
            })
        }
      }
    }
</script>

<style lang="less" scoped>
  .el-breadcrumb{
    font-size: 14px;
    margin-bottom: 15px;
  }
  .el-table{
    margin-top: 15px;
    font-size: 12px;
  }
</style>
