<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片-->
    <el-card>
      <el-row>
        <el-col :span="8">
          <!--搜索框-->
          <el-input placeholder="请输入内容" v-model="queryInfo.key" clearable >
            <el-button slot="append" icon="el-icon-search" ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!--表格-->
      <el-table :data="orders">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="订单编号" prop="number"></el-table-column>
        <el-table-column label="订单价格" prop="price"></el-table-column>
        <el-table-column label="是否付款" prop="status">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === true" type="success">已付款</el-tag>
            <el-tag v-if="scope.row.status === false" type="primary">未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="isSend">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.isSend === true" type="success">已发货</el-tag>
            <el-tag v-if="scope.row.isSend === false" type="primary">未发货</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="下单时间" prop="createdTime"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editBrand(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeItem(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->

    </el-card>
  </div>
</template>

<script>
    export default {
      name: "order",
      data(){
        return{
          queryInfo:{
            key:''
          },
          orders:[
            {number: '05462',price:486,status: true,isSend: true,createdTime:'2019-10-15 15:30:59'},
            {number: '05344',price:2345,status: false,isSend: true,createdTime:'2019-12-28 08:46:12'},
            {number: '07657',price:7678,status: false,isSend: true,createdTime:'2019-09-08 15:02:04'},
            {number: '24356',price:466,status: true,isSend: false,createdTime:'2019-04-01 13:45:32'},
            {number: '34535',price:76,status: false,isSend: false,createdTime:'2019-06-06 10:55:59'}
          ]
        }
      },
      created(){},
      methods:{}
    }
</script>

<style scoped>

</style>
