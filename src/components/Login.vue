<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像-->
      <div class="avatar_box">
        <img src="../assets/logo.png"/>
      </div>
      <!--表单-->
      <el-form label-width="0px" ref="loginRef" :model="loginFrom" :rules="loginRules" class="login_form">
        <!--用户名-->
        <el-form-item prop="username">
          <el-input
            placeholder="请输入用户名"
            prefix-icon="iconfont iconyonghu"
            v-model="loginFrom.username">
          </el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            prefix-icon="iconfont iconmima"
            v-model="loginFrom.password">
          </el-input>
        </el-form-item>
        <!--按钮-->
        <el-form-item class="btn">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="loginReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data(){
    return{
      loginFrom:{
        username:'dsads',
        password:'dsads'
      },
      loginRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max:10, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ]
      }
    }
  },
  methods:{
    loginReset(){
      //console.log(this)
      this.$refs.loginRef.resetFields()
    },
    login(){
      this.$refs.loginRef.validate(res => {
        console.log(res)
        if(!res) this.$message.error('登录失败')
        else this.$message.success('登录成功')
        // this.$http.post('query',this.loginFrom)
        //   .then(data=>{
        //     if(data.status !==200) return this.$message.error('登录失败')
        //     console.log("登录成功")
        //     this.$message.success('登录成功')
        //token值存入网站的sessionStorage中
        //window.sessionStorage.setItem("token",data.token)
        this.$router.push('/home')
        //   }
        // )
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .login_container{
    background-color: #2b4b6b;
    height: 100%;
  }
  .login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    .avatar_box{
      height: 130px;
      width: 130px;
      border:1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
  }
  .login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .btn{
    display: flex;
    justify-content: flex-end;
  }
</style>
