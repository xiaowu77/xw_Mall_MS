<template>
  <div>
    <!--主体-->
    <el-form :model="addForm" :rules="addRuleForm" ref="RuleRef" label-width="70px" status-icon>
      <el-form-item label="用户名" prop="username" >
        <el-input v-model="addForm.username" :disabled="isEdit ? true : false"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="rolename">
        <el-input v-model="addForm.rolename"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="addForm.phone" ></el-input>
      </el-form-item>
      <!--底部-->
      <el-form-item>
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
      name: "user-form",
      props:{
        isEdit: {//修改或新增
          type: Boolean,
          default: false
        },
        oldUserInfo:{
          type: Object
        }
      },
      data(){
        var checkPhone = (rule, value, callback) => {//验证手机号正则表达式
          const regPhone=/^1(3|4|5|7|8)\d{9}$/;
          if(regPhone.test(value)){
            return callback()
          }
          callback(new Error('请输入合法的手机号'))
        }
        return{
          //添加数据
          addForm:{
            username:'',
            mgstate:'',
            phone:''
          },
          addRuleForm:{
            username:[
              {required: true, message: '请输入用户名', trigger: 'blur'},
              {min: 3, max:10, message: '长度在 3 到 5 个字符', trigger: 'blur'}
            ],
            rolename:[
              {required: true, message: '请输入角色', trigger: 'blur'}
            ],
            phone:[
              {required: true, message: '请输入手机号码', trigger: 'blur'},
              {validator: checkPhone, trigger: 'blur'}
            ]
          },
        }
      },
      methods:{
        submit(){
          this.$refs.addRuleRef.validate(val =>{
            console.log(val)
            if(!val) return
            this.$http({
              method: this.isEdit ? 'put' : 'post',
              url: 'user',
              data: this.addForm
            }).then(res=>{
                if(res.status !==200) return this.$message.error('添加用户失败')
                this.$message.success('添加用户失败')
                //关闭对话框
                this.$emit('DialogClosed')
                // 重新加载数据
                this.getUserList()
              })
          })
        },
        //表单重置
        reset(){
          if(!this.isEdit) return
          this.$refs.RuleRef.resetFields();
        }
      },
      watch: {
        oldUserInfo: {// 监控oldUserInfo的变化
          handler(val) {
            if (val) {
              console.log(val)
              // 注意不要直接复制，否则这边的修改会影响到父组件的数据，copy属性即可
              this.addForm = Object.assign({}, val);
            } else {
              // 为空，初始化brand
              this.addForm = {
                username:'',
                rolename:'',
                phone:''
              }
            }
          },
          immediate: true,
        }
      }
    }
</script>

<style scoped>

</style>
