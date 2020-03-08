<template>
    <div>
      <!--面包屑导航-->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>品牌管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!--卡片-->
      <el-card>
        <el-row :gutter="20">
          <el-col :span="8">
            <!--搜索框-->
            <el-input placeholder="请输入内容" v-model="queryInfo.key" clearable >
              <el-button slot="append" icon="el-icon-search" @click="queryBrand"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <!--按钮-->
            <el-button type="primary" @click="addBrand">添加品牌</el-button>
          </el-col>
        </el-row>
        <!--表格-->
        <el-table :data="brands" @sort-change="changeTableSort" >
          <el-table-column label="id" prop="id" sortable="custom"></el-table-column>
          <el-table-column label="名称" prop="name"></el-table-column>
          <el-table-column label="LOGO" prop="image">
            <template slot-scope="scope">
              <img :src="scope.row.image" alt="" width="110px" height="40px">
            </template>
          </el-table-column>
          <el-table-column label="首字母" prop="letter"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="editBrand(scope.row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeItem(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="queryInfo.rows"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalPage">
        </el-pagination>
      </el-card>
      <!--添加分类对话框-->
      <el-dialog :title="isEdit ? '修改品牌信息': '新增品牌'" :visible.sync="addDialogVisible" width="35%" >
        <brand-form :isEdit="isEdit" :oldBrand="oldBrand" @close="closeDialog"></brand-form>
      </el-dialog>
    </div>
</template>

<script>
    import BrandForm from "./BrandForm";

    export default {
      components: {BrandForm},
      name: "brand",
      data(){
        return{
          isEdit: false,//是否为编辑
          addDialogVisible: false,//是否显示对话框
          //查询信息
          queryInfo:{
            key: '',
            page: 1,
            rows: 5,
            sortBy: '',
            desc: false
          },
          //品牌tableData
          brands: [],
          totalPage: 0,
          oldBrand:{}
        }
      },
      created(){
        this.getBrandInfo();
      },
      methods:{
        getBrandInfo(){
          this.$http.get('item/brand/page',{
            params:{
              key: this.queryInfo.key,
              page: this.queryInfo.page,
              rows: this.queryInfo.rows,
              sortBy: this.queryInfo.sortBy,
              desc: this.queryInfo.desc
            }
          }).then(res =>{
            this.brands=res.data.items;
            this.totalPage=res.data.total;
          })
        },
        // 为id字段添加排序
        changeTableSort(column){
          this.queryInfo.sortBy=column.prop
          if(column.order === 'descending') {
            this.queryInfo.desc=true
          }else{
            this.queryInfo.desc=false;
          }
          this.getBrandInfo()
        },
        // 每页几行
        handleSizeChange(newSize){
          this.queryInfo.rows=newSize
          this.getBrandInfo()
        },
        // 第几页
        handleCurrentChange(newPage){
          this.queryInfo.page=newPage
          this.getBrandInfo()
        },
        // 通过搜索查询品牌
        queryBrand(){
          this.getBrandInfo()
        },
        // 新增品牌
        addBrand(){
          this.isEdit= false;
          this.addDialogVisible =true;
          this.oldBrand={}
        },
        // 修改品牌
        editBrand(info){
          this.isEdit= true;
          this.addDialogVisible =true;
          this.$http.get('item/category/'+info.id)
            .then(res =>{
              this.oldBrand=info;
              this.oldBrand.selectedPids=[74,75,76];
              console.log(this.oldBrand)
            })
        },
        //关闭窗口
        closeDialog(){
          this.addDialogVisible =false;
        }
      }
    }
</script>
<style scoped>

</style>
