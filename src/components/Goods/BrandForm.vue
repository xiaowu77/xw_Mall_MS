<template>
    <div>
      <!--主体-->
      <el-form :model="brandForm" :rules="cateRuleForm" ref="RuleRef" label-width="80px" status-icon>
        <el-form-item label="品牌名称" prop="name" >
          <el-input v-model="brandForm.name"></el-input>
        </el-form-item>
        <el-form-item label="首字母" prop="letter" >
          <el-input v-model="brandForm.letter" required></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="cateIds">
          <!--options指定数据源-->
          <!--props指定配置对象-->
          <el-cascader expand-trigger="hover" :options="parentCateList" :props="cascaderProps"
                        v-model="brandForm.selectedPids" clearable >
          </el-cascader>
        </el-form-item>
        <el-form-item label="LOGO"  >
          <upload
            v-model="brandForm.image" url="/upload/image" :multiple="false" :pic-width="150" :pic-height="60">
          </upload>
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
    import getCateListTree from './CateListTree'
    import Upload from "../Form/Upload";
    export default {
      components: {
        Upload},
      props:{
        isEdit:{
          type: Boolean,
          default: false
        },
        oldBrand:{
          type: Object
        }
      },
      name: "brand-form",
      data(){
        return{
          // 表单校验规则
          cateRuleForm:{
            name:[
              {required: true, message: '请输品牌名称', trigger: 'blur'},
            ],
            cateIds:[
              {required: true, message: '请选择商品分类', trigger: 'blur'},
            ],
          },
          // 分类列表
          parentCateList:[],
          // 级联组件
          cascaderProps:{
            value: 'id',
            label: 'name',
            children: 'children'
          },
          brandForm:{
            name: '',
            letter: '',
            // 分类cids
            selectedPids:[],
            image: '',
          }
        }
      },
      created(){
        this.getCateList()
      },
      methods:{
        // 获取分类的级联选择项
        getCateList(){
          this.$http.get('item/category/all')
            .then(res =>{
              this.parentCateList=getCateListTree(res)
            })
        },
        //重置
        reset(){
          this. brandForm={
            name: '',
            letter: '',
            selectedPids:[],
            image: '',
          }
        },
        //提交
        submit(){
          // 定义一个请求参数对象，通过解构表达式来获取brand中的属性
          const {selectedPids, letter, ...params}=this.brandForm;
          //数据库中只要保存分类的id即可，因此我们对categories的值进行处理,只保留id，并转为字符串
          params.cids=selectedPids
          //将首字母转为大写
          params.letter=letter.toUpperCase()
          this.$http({
            method: this.isEdit ? 'put' :'post',
            url: 'item/brand/',
            data: this.$qs.stringify(params)//params默认json对象，这里把json对象转换成原始普通对象参数
          }).then(() =>{
            // 关闭窗口
            this.$emit("close");
            this.$message.success("保存成功！");
          }).catch(()=>{
            this.$message.error("保存失败！");
          })
        }
      },
      watch:{
        oldBrand: {
          deep: true,
          handler(val){
            if(val){
              this.brandForm=JSON.parse(JSON.stringify(val))
            }else{
              this.brandForm={
                name: '',
                letter: '',
                selectedPids:[],
                image: '',
              }
            }
          }
        }
      }
    }
</script>

<style scoped>

</style>
