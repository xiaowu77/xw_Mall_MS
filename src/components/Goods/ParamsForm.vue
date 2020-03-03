<template>
  <div>
    <!--主体-->
    <el-form :model="groupForm" :rules="groupRuleForm" ref="groupRuleRef" label-width="70px" status-icon>
      <el-form-item :label="isGroup ? '参数组名' : '参数名'" prop="name" >
        <el-input v-model="groupForm.name"></el-input>
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
      name: "params-form",
      props:{
        isEdit:{
          default: false,
          type: Boolean
        },
        paramList:{
          type: Object
        },
        paramGroupList:{
          type: Object
        },
        isGroup:{
          default: true,
          type: Boolean
        }
      },
      data(){
        return{
          groupForm:{},
        }
      },
      created(){

      },
      methods:{
        submit(){
          this.$http({
            method: this.isEdit ? 'put' : 'post',
            url: 'item/spec',
            data: this.groupForm
            }.then(res =>{
              if(res.status == 200){
                this.$emit('close')
              }else{
                this.$message.error('提交失败！')
              }

            })
          )
        },
        reset(){
          this.groupForm.name=''
        }
      },
      watch: {
        paramGroupList: {// 监控paramsGroupList的变化
          handler(val) {
            if (val) {
              console.log(val)
              // 注意不要直接复制，否则这边的修改会影响到父组件的数据，copy属性即可
              this.groupForm = Object.assign({},this.paramGroupList)
            } else {
              // 为空，初始化brand
              this.groupForm = {}
            }
          },
          immediate: true,
        },
        paramList: {// 监控paramsGroupList的变化
          handler(val) {
            if (val) {
              console.log(val)
              // 注意不要直接复制，否则这边的修改会影响到父组件的数据，copy属性即可
              this.groupForm = Object.assign({},this.paramList)
            } else {
              // 为空，初始化
              this.groupForm = {}
            }
          },
          immediate: true,
        }
      }
    }
</script>

<style scoped>

</style>
