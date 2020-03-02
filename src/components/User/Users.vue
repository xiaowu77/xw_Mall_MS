<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片-->
    <el-card>
      <!--搜索-->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.key" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUser">添加用户</el-button>
        </el-col>
      </el-row>
      <!--表格-->
      <el-table :data="userList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="角色" prop="rolename"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope" >
            <el-switch v-model="scope.row.mgstate" @change="userStateChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="rolename">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editUser(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUser(scope.row.id)"></el-button>
            <el-tooltip effect="dark" content="设置" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="queryInfo.row"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalPage">
        </el-pagination>
      </div>
    </el-card>
    <!--添加用户对话框-->
    <el-dialog :title="isEdit ? '修改用户信息': '新增用户'" :visible.sync="addDialogVisible" width="35%" >
      <user-form :isEdit="isEdit" :oldUserInfo="oldUserInfo" @close="DialogClosed"></user-form>
    </el-dialog>
  </div>
</template>

<script>
    import UserForm from "./UserForm";

    export default {
      components: {UserForm},
      name: "users",
      data(){
          return{
            isEdit: false,//是否为修改
            oldUserInfo: {},//即将被修改的信息
            //添加数据
            addForm:{
              // username:'',
              // password:'',
              // phone:''
            },
            //添加表单验证

            addDialogVisible: false,//对话框是否显示
            queryInfo:{
              key:'',
              page: 1,
              rows: 5
            },
            totalPage: 10,//总页数
            userList:[
              {
                username: '王小虎',
                phone: '18678956489',
                rolename: '管理员',
                mgstate: true
              }, {
                username: '王大虎',
                phone: '18678956489',
                rolename: '管理员',
                mgstate: true
              }, {
                username: '王中虎',
                phone: '18678956489',
                rolename: '管理员',
                mgstate: false
              }, {
                username: '王虎虎',
                phone: '18678956489',
                rolename: '管理员',
                mgstate: true
            }]
          }
      },
      created(){
        this.getUserList()
      },
      methods:{
        getUserList(){
          this.$http.get('/users',{params:this.queryInfo})
            .then(res=>{
              this.userList=res
              if(res.status !==200) return this.$message.error("查询用户列表失败！")

            })
        },
        handleSizeChange(newSize){
          this.queryInfo.row=newSize
          this.getUserList()
        },
        handleCurrentChange(newPage){
          this.queryInfo.page=newPage
          this.getUserList()
        },
        // 监听switch开关状态
        userStateChange(userInfo){
          console.log(userInfo)
        },
        //监听对话框关闭重置数据
        DialogClosed(){
          this.addDialogVisible = false
          this.getUserList()
        },
        //添加用户
        addUser(){
          this.isEdit= false;
          this.addDialogVisible = true;
          this.oldUserInfo=null;
        },
        // 编辑用户
        editUser(oldUserInfo){
          // 修改标记
          this.isEdit = true;
          // 控制弹窗可见：
          this.addDialogVisible = true;
          //通过用户id查询用户信息
          this.oldUserInfo=oldUserInfo
          this.$http.get('user'+ this.oldUserInfo.id)
            .then(res =>{
              this.oldUserInfo=res.data
            })
        },
        // 根据用户id删除用户
        removeUser(id){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'}).then(res =>{
              if(res === 'confirm'){
                this.$http.delete('user/'+ id).then(resp=>{
                  if(resp.status===200){
                    this.$message.success('删除用户成功')
                    this.getUserList()
                  }
                  return this.$message.error('删除用户失败')
                })
              }
            }).catch()
        }
      }
    }
</script>

<style lang="less" scoped>

</style>
