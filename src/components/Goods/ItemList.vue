<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片-->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <!--搜索框-->
          <el-input placeholder="请输入内容" v-model="queryInfo.key" clearable >
            <el-button slot="append" icon="el-icon-search" @click="getItemListInfo"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <!--按钮-->
          <el-button type="primary" @click="addItem">添加商品</el-button>
        </el-col>
      </el-row>
      <el-tabs v-model="queryInfo.saleable" @tab-click="handleClick">
        <el-tab-pane label="全部" name=""></el-tab-pane>
        <el-tab-pane label="上架" name="true"></el-tab-pane>
        <el-tab-pane label="下架" name="false"></el-tab-pane>
      </el-tabs>
      <!--表格-->
      <el-table :data="itemList" stripe @sort-change="changeTableSort">
        <el-table-column label="Id" prop="id" sortable="custom" width="60"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="商品分类" prop="cname"></el-table-column>
        <el-table-column label="品牌" prop="bname"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.saleable === true" type="success" @click="downShelf(scope.row)">下架</el-tag>
            <el-tag v-else type="primary" @click="upShelf(scope.row)">上架</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editItem(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeItem(scope.row.id)"></el-button>
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
          :page-size="queryInfo.rows"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalPage">
        </el-pagination>
      </div>
    </el-card>
    <!--对话框-->
    <el-dialog :visible.sync="addItemDialogVisible" width="70%">
      <item-list-form :isEdit="isEdit" :oldGoods="oldGoods"></item-list-form>
    </el-dialog>
  </div>
</template>

<script>
    import ItemListForm from "./ItemListForm";

    export default {
      components: {ItemListForm},
      name: "item-list",
      data(){
        return{
          isEdit: false,//是否为编辑
          oldGoods: {}, // 即将被编辑的商品信息
          totalPage: 0,
          queryInfo:{
            key:'',
            saleable: 'true',
            page: 1,
            rows: 5,
            sortBy: '',
            desc: false,
          },
          itemList:[],//商品列表
          addItemDialogVisible: false,//是否显示对话框
        }
      },
      created(){
        this.getItemList();
      },
      methods:{
        getItemList(){
          this.$http.get('/item/goods/spu/page',{
            params:{
              key: this.queryInfo.key, // 搜索条件
              saleable: this.queryInfo.saleable === 0 ? null : this.queryInfo.saleable, // 上下架
              valid: true,
              page: this.queryInfo.page,// 当前页
              sortBy: this.queryInfo.sortBy,// 排序字段
              desc: this.queryInfo.desc,// 是否降序
              rows: this.queryInfo.rows,// 每页大小
            }
          }).then(res => {

            this.itemList=res.data.items
            this.totalPage=res.data.total
          })
        },
        // 为id字段添加排序
        changeTableSort(column){
          this.queryInfo.sortBy=column.prop
          if(column.order=='descending') {
             this.queryInfo.desc=true
          }else{
             this.queryInfo.desc=false;
          }
          this.getItemList()
        },
        // 点击切换上下架
        handleClick(tab) {
          this.queryInfo.saleable=tab.name
          this.getItemList()
        },
        // 每页几行
        handleSizeChange(newSize){
          this.queryInfo.rows=newSize
          this.getItemList()
        },
        // 第几页
        handleCurrentChange(newPage){
          this.queryInfo.page=newPage
          this.getItemList()
        },
        // 下架
        downShelf(itemInfo){
          this.$http.post('item/goods/down/'+ itemInfo.id)
            .then(res => {
              if(res.status !==201){
                this.$message.error("服务器出错！")
              }
              this.getItemList()
            })
        },
        // 上架
        upShelf(itemInfo){
          this.$http.post('item/goods/up/'+ itemInfo.id)
            .then(res => {
              if(res.status !==201){
                this.$message.error("服务器出错！")
              }
              this.getItemList()
            })
        },
        // 搜索获取商品信息
        getItemListInfo(){
          this.getItemList()
        },
        // 添加商品
        addItem(){
          this.addItemDialogVisible=true;
          this.isEdit=false
          this.oldGoods = {};
        },
        // 修改商品
        async editItem(info){
          // 发起请求，查询商品详情和skus
          const {data: res1}= await this.$http.get("/item/goods/spu/detail/" + info.id);
          const {data: res2}= await this.$http.get("/item/goods/sku/list?id=" + info.id);
          info.spuDetail=res1;
          info.skus=res2;
          // 修改标记
          this.isEdit = true;
          // 控制弹窗可见：
          this.addItemDialogVisible=true;
          // 获取要编辑的goods
          this.oldGoods = info;
          console.log(this.oldGoods)

        }
      }
    }
</script>

<style lang="less" scoped>
</style>
