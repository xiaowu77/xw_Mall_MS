<template>
  <!--头部-->
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/1.jpeg" />
        <span>小伍商城</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!--页面主体-->
    <el-container>
      <!--左侧栏-->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <el-button type="inisCollapse ?fo" @click="toggleCollapse">
          <i :class="isCollapse ? 'el-icon-right' : 'el-icon-back'"></i>
        </el-button>
        <!--侧边栏菜单-->
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router :default-active="this.$route.path">
          <!--一级菜单-->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </template>
            <!--二级菜单-->
            <el-menu-item index="/users">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>用户管理</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-grid"></i>
              <span>权限管理</span>
            </template>
            <!--二级菜单-->
            <el-menu-item index="/roles">
              <template slot="title">
                <i class="roles"></i>
                <span>角色管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/rights">
              <template slot="title">
                <i class="roles"></i>
                <span>权限管理</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <!--二级菜单-->
            <el-menu-item index="/itemList">
              <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>商品列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/categoryList">
              <template slot="title">
                <i class="el-icon-box"></i>
                <span>商品分类</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/parameter">
              <template slot="title">
                <i class="el-icon-date"></i>
                <span>商品参数</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-shopping-cart-full"></i>
              <span>订单管理</span>
            </template>
            <!--二级菜单-->
            <el-menu-item index="/orderList">
              <template slot="title">
                <i class="el-icon-shopping-cart-2"></i>
                <span>订单列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-chat-line-square"></i>
              <span>数据统计</span>
            </template>
            <!--二级菜单-->
            <el-menu-item index="/report">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>数据报表</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--右侧主体内容-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "home",
    data() {
      return{
        isCollapse: false
      }
    },
    methods: {
      logout() {
        window.sessionStorage.clear()
        this.$router.push('/login')
      },
      // 点击切换左侧栏折叠展开
      toggleCollapse(){
        this.isCollapse = !this.isCollapse
        return console.log(this.$route.path)
      }
    }
  }
</script>

<style lang="less" scoped>
  .home-container{
    height: 100%;
  }
  .el-header{
    background-color: #666666;
    display: flex;
    justify-content: space-between;

    align-items: center;
    color: #fff;
    font-size: 20px;
    div{
      display: flex;
      align-items: center;
      span{
        margin-left: 10px;
      }
    }
    img{
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .el-aside{
    background-color: rgb(84, 92, 100);
    .el-button{
      position: relative;
      left: 50%;
      transform: translate(-50%);
      background-color: rgb(84, 92, 100);
      border:0;
      color: #fff;
    }
  }
  .el-main{
    background-color: #eaedf1;
  }
  .el-menu{
    border-right: 0;

  }
</style>
