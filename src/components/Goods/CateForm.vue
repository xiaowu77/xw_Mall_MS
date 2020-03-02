<template>
    <div>
      <!--主体-->
      <el-form :model="cateForm" :rules="cateRuleForm" ref="RuleRef" label-width="70px" status-icon>
        <el-form-item label="分类名称" prop="name" >
          <el-input v-model="cateForm.name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类" >
          <!--options指定数据源-->
          <!--props指定配置对象-->
          <el-cascader expand-trigger="hover" :options="parentCateList" :props="cascaderProps"
           @change="handleCateChanged" v-model="selectedPids" clearable change-on-select>
          </el-cascader>
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
      name: "cate-form",
      props:{
        allCateList: {
          type: Array,
        },
      },
      data(){
        return{
          cateForm:{
            name:'',
            sort: 1,
            parentId: 0
          },
          // 添加表单验证
          cateRuleForm:{
          },
          // 父级分类列表
          parentCateList:this.allCateList,
          cascaderProps:{
            value: 'id',
            label: 'name',
            children: 'children'
          },
          // 选中父级id
          selectedPids:[]
        }
      },
      methods:{
        // 选择项发生变化
        handleCateChanged(){
          // 大于0，说明是二级父类
          if(this.selectedPids.length > 0){
            this.cateForm.parentId =this.selectedPids[this.selectedPids.length-1]
            this.cateForm.sort=this.selectedPids.length
            return
          }else {
            this.cateForm.parentId = 0;
            this.cateForm.sort = 1;
          }
          console.log(this.selectedPids)
        },
        reset(){
          this.$refs.RuleRef.resetFields();
          this.selectedPids=[];
          this.cateForm.parentId=0;
          this.cateForm.sort=1;
        },
        submit(){
          console.log(this.cateForm)
          this.$emit('close')
        }
      }
    }
</script>

<style lang="less" scoped>
.el-cascader{
  width: 100%
}
</style>
