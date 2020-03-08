<template>
    <div>
      <!--提示区-->
      <el-alert :title="isEdit ? '添加商品信息' : '修改商品信息'" type="info" center show-icon :closable="false"></el-alert>
      <!--步骤区-->
      <el-steps :active="activeIndex - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品描述"></el-step>
        <el-step title="规格参数"></el-step>
        <el-step title="SKU属性"></el-step>
      </el-steps>

      <el-form :model="addItemForm" :rules="rulesItemForm" ref="addItemRef" label-width="80px">
        <!--标签栏-->
        <el-tabs tab-position="left" style="height: 200px;" v-model="activeIndex" :before-leave="beforeTabLeave">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="选择商品" prop="goodsCB">
              <el-col :span="8">
                <el-cascader expand-trigger="hover" :options="parentCateList" :props="cascaderProps"
                             @change="handleCateChanged" v-model="addItemForm.selectedPids" clearable placeholder="请选择分类">
                </el-cascader>
              </el-col>
              <el-col :span="8">
                <el-select v-model="addItemForm.brandId" clearable placeholder="请选择品牌">
                  <el-option
                    v-for="item in brandInfo"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="商品标题" prop="title">
              <el-col :span="18">
                <el-input placeholder="请输入内容" v-model="addItemForm.title"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="商品卖点" prop="subTitle">
              <el-col :span="18">
                <el-input type="textarea" autosize placeholder="请输入内容"
                          v-model="addItemForm.subTitle"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="包装清单" prop="packingList">
              <el-col :span="18">
                <el-input type="textarea" autosize placeholder="请输入内容"
                          v-model="addItemForm.spuDetail.packingList"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="售后服务" prop="afterService">
              <el-col :span="18">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                          placeholder="请输入内容" v-model="addItemForm.spuDetail.afterService"></el-input>
              </el-col>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品描述" name="1">
            <!--富文本编辑器-->
            <editor v-model="addItemForm.spuDetail.description" upload-url="upload/image"></editor>
          </el-tab-pane>
          <el-tab-pane label="规格参数" name="2">
            <el-card class="box-card" >
            <el-row :gutter="20">
              <el-col :span="12" v-for="spec in specs" :key="spec.id">
                <span >{{spec.name}}</span>
                <el-input style="margin: 10px 0" v-model="spec.v"></el-input>
              </el-col>
            </el-row>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="SKU属性" name="3">
            <el-form-item :label="specialSpec.name+':'" v-for="specialSpec in specialSpecs" :key="specialSpec.id">
              <!--循环渲染tag-->
              <el-tag :key="tag" v-for="(tag,i) in specialSpec.options"
                      closable :disable-transitions="false" @close="handleClose(i, specialSpec.options)">
                {{tag}}</el-tag>
              <!--输入的文本框-->
              <el-input class="input-new-tag"
                v-if="specialSpec.inputVisible" v-model="inputValue"
                ref="saveTagInput" size="small"
                @keyup.enter.native="handleInputConfirm(specialSpec)"
                @blur="handleInputConfirm(specialSpec)">
              </el-input>
              <!--添加按钮-->
              <el-button v-else class="button-new-tag" size="small" @click="showInput(specialSpec)">+ New Tag</el-button>
            </el-form-item>
            <el-table :data="skus" style="width: 100%" @selection-change="changeFun" ref="multipleTable">
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <upload v-model="scope.row.images" url="/upload/image"></upload>
                </template>
              </el-table-column>
              <el-table-column prop="机身颜色.v" label="机身颜色"></el-table-column>
              <el-table-column prop="内存.v" label="内存"></el-table-column>
              <el-table-column prop="机身存储.v" label="机身存储"></el-table-column>
              <el-table-column prop="price" label="价格"  width="150" >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.price" style="width: 90px"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="stock" label="库存"  width="150">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.stock" style="width: 90px"></el-input>
                </template>
              </el-table-column>
              <el-table-column type="selection" prop="enable" ></el-table-column>
            </el-table>

            <el-row style="margin-top: 10px">
              <el-col :span="8" :offset="16">
                <el-button type="primary" @click="submit">提交表单</el-button>
                <el-button type="info" @click="reset">重置表单</el-button>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-form>

    </div>
</template>

<script>
    import getCateListTree from './CateListTree'
    import Upload from "../Form/Upload";
    import Editor from "../Form/Editor";
    export default {
      components: {
        Editor,
        Upload},
      name: "item-list-form",
      props:{
        isEdit:{
          type: Boolean,
          default: false
        },
        oldGoods:{
          type: Object
        }
      },
      data(){
        return{
          imgDialogVisible: false,
          // sku属性值
          dynamicTags: [],
          // 控制按钮与文本的切换
          //inputVisible: false,
          // 文本框中输入的内容
          inputValue: '',
          activeIndex: '0',
          // 普通规格参数
          specs:[],
          //特殊规格参数
          specialSpecs:[],
          addItemForm:{
            selectedPids:[], // 商品分类信息
            brandId: '', // 品牌id信息
            title: '', // 标题
            subTitle: '', // 子标题
            spuDetail: {
              packingList: '', // 包装列表
              afterService: '', // 售后服务
              description: '' // 商品描述
            }
          },
          // 表单校验规则
          rulesItemForm:{
            goodsCB: [{ required: true, trigger: 'blur' }],
            title: [{ required: true, message: '请输入商品标题', trigger: 'blur' }],
            subTitle: [{ required: true, message: '请输入商品卖点', trigger: 'blur' }],
            // packingList: [{ required: true, message: '请输入包装清单', trigger: 'blur' }],
            // afterService: [{ required: true, message: '请输入售后服务', trigger: 'blur' }],
          },
          // 父级分类列表
          parentCateList:[],
          cascaderProps:{
            value: 'id',
            label: 'name',
            children: 'children'
          },
          //品牌信息
          brandInfo:[],
        }
      },
      created(){
        this.getParamsGroupList()
      },
      methods:{
        //提交表单
        submit(){
          //表单校验。
          if(!this.$refs.addItemRef.validate){
            this.$message.error("请先完成表单内容！");
          }
          // addItemForm，用结构表达式接收,除了分类cids(selectedPids)外，都接收到goodsParams中
          console.log(this.addItemForm)
          const {selectedPids: [cid1, cid2, cid3 ], ...goodsParams} = this.addItemForm;
          // 处理规格参数
          const specs = {};
          this.specs.forEach(({ id,v }) => {
            specs[id] = v;
          });
          // 处理特有规格参数模板
          const specTemplate = {};
          this.specialSpecs.forEach(({ id, options }) => {
            specTemplate[id] = options;
          });
          // 处理sku
          console.log(this.skus)
          const skus = this.skus
            .filter(s => s.enable)
            .map(({ price, stock, enable, images, indexes, ...rest }) => {
              // 标题，在spu的title基础上，拼接特有规格属性值
              const title = goodsParams.title + " " + Object.values(rest).map(v => v.v).join(" ");
              const obj = {};
              Object.values(rest).forEach(v => {
                obj[v.id] = v.v;
              });
              return {
                price: price*100, // 价格需要格式化
                stock,
                indexes,
                enable,
                title, // 基本属性
                images: images ? images.join(",") : '', // 图片
                ownSpec: JSON.stringify(obj) // 特有规格参数
              }
            })
          Object.assign(goodsParams, {
            cid1,
            cid2,
            cid3, // 商品分类
            skus // sku列表
          });
          goodsParams.spuDetail.genericSpec = JSON.stringify(specs);
          goodsParams.spuDetail.specialSpec = JSON.stringify(specTemplate);
          console.log(goodsParams)
          this.$http({
            method: this.isEdit ? "put" : "post",
            url: "/item/goods/goods",
            data: goodsParams
          })
            .then(() => {
              // 成功，关闭窗口
              this.reset()
              // 提示成功
              this.$message.success("保存成功了");
            })
            .catch(() => {
              this.$message.error("保存失败！");
            });
        },
        //重置表单
        reset(){
          this.activeIndex= '0';
          Object.assign(this.addItemForm, {
            selectedPids: null, // 商品分类信息
            brandId: '', // 品牌id信息
            title: "", // 标题
            subTitle: "", // 子标题
            spuDetail: {
              packingList: "", // 包装列表
              afterService: "", // 售后服务
              description: "" // 商品描述
            }
          });
          this.specs = [];
          this.specialSpecs = [];

        },
        //获取商品树状图
        getParamsGroupList(){
          this.$http.get('item/category/all')
            .then(res =>{
              this.parentCateList=getCateListTree(res)
            })
        },
        // 根据参数组id获取对应商品信息
        handleCateChanged(){

        },
        // 阻止标签页切换
        beforeTabLeave(activeName,oldActiveName){
          if(oldActiveName === '0' && this.addItemForm.selectedPids.length !== 3){
            this.$message.error('请选择分类！')
            return false
          }
          // else if(this.addItemForm.brandId == ''){
          //   this.$message.error('请选择品牌！')
          //   return false
          // }else if(this.addItemForm.title == ''){
          //   this.$message.error('请输入商品标题！')
          //   return false
          // }
        },
        // 删除tag标签
        handleClose(i,options) {
         options.splice(i, 1);
        },
        // 文本框失去焦点或摁下回车键
        handleInputConfirm(info){
          let inputValue = this.inputValue;
          if (inputValue) {
            info.options.push(inputValue);
          }
          info.inputVisible = false;
          this.inputValue = '';
        },
        // 点击按钮，展示文本输入框
        showInput(info){
          info.inputVisible = true;
          //自动获取焦点
          this.$nextTick(_ => {
            this.$refs['saveTagInput'].$refs.input.focus()
          })
        },
        // 处理移除图片
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        // 处理图片预览
        handlePictureCardPreview(file) {
          console.log(file)
          this.dialogImageUrl = file.url;
          this.imgDialogVisible = true;
        },
        //点击sku的复选框事件
        changeFun(val){
          val.forEach(v=>{
            v.enable=true
          })
        }
      },
      computed: {
        skus() {
          // 过滤掉用户没有填写数据的规格参数
          const arr = this.specialSpecs.filter(s => s.options.length > 0);
          // 通过reduce进行累加笛卡尔积
          return arr.reduce(
            (last, spec, index) => {
              const result = [];
              last.forEach(o => {
                spec.options.forEach((option, i) => {
                  const obj = JSON.parse(JSON.stringify(o));
                  obj[spec.name] = {v: option, id: spec.id};
                  obj.indexes = (obj.indexes || '') + '_' + i
                  if (index === arr.length - 1) {
                    obj.indexes = obj.indexes.substring(1);
                    // 如果发现是最后一组，则添加价格、库存等字段
                    Object.assign(obj, {
                      price: 0,
                      stock: 0,
                      enable: false,
                      images: []
                    });
                    if (this.isEdit) {
                      // 如果是编辑，则回填sku信息
                      const sku = this.addItemForm.skus.get(obj.indexes);
                      if (sku != null) {
                        const {price, stock, enable, images} = sku;
                        Object.assign(obj, {
                          price: price/100,
                          stock,
                          enable,
                          images: images ? images.split(",") : [],
                        });
                      }
                    }
                  }
                  result.push(obj);
                });
              });
              return result;
            },
            [{}]
          );
        },
      },
      watch: {
        oldGoods: {
          immediate: true,
          handler(val){
            if(this.isEdit){
              this.addItemForm =JSON.parse(JSON.stringify(val))
              // //切割cname（"手机-手机通讯-手机"）
              // const names=val.cname.split('-')
              //组织商品分类信息
              this.addItemForm.selectedPids=[val.cid1,val.cid2,val.cid3];
              // 将skus处理成map
              const skuMap = new Map();
              this.addItemForm.skus.forEach(s => {
                skuMap.set(s.indexes, s);
              });
              this.addItemForm.skus = skuMap;
            }
          }
        },
        'addItemForm.selectedPids':{
          immediate: true,
          handler(val){
            if(val){
              // 根据分类查询品牌
              this.$http.get('item/brand/cid/'+val[2])
                .then(res =>{
                  this.brandInfo=res.data
                });
              // 根据分类查询规格参数
              this.$http.get('item/spec/params?cid='+val[2])
                .then(res =>{
                  let specs = [];
                  let template = [];
                  if (this.isEdit){
                    specs = JSON.parse(this.addItemForm.spuDetail.genericSpec);
                    template = JSON.parse(this.addItemForm.spuDetail.specialSpec);
                  }
                  // 对特有规格进行筛选
                  const arr1 = [];
                  const arr2 = [];
                  res.data.forEach(({id, name,generic, numeric, unit }) => {
                    if(generic){
                      const o = { id, name, numeric, unit};
                      if(this.isEdit){
                        o.v = specs[id];
                      }
                      arr1.push(o)
                    }else{
                      const o = {id, name, options:[], inputVisible: false};
                      if(this.isEdit){
                        o.options = template[id];
                      }
                      arr2.push(o)
                    }
                  });
                  this.specs = arr1;// 通用规格
                  this.specialSpecs = arr2;// 特有规格
                })
            }
          }
        },
        'addItemForm.skus':{
          immediate: true,
          handler(val){
            if(val){
              this.$nextTick(_ => {
                val.forEach(row =>{
                  this.$refs.multipleTable.toggleRowSelection(row);
                })
              })
            }
          }
        }
      }
    }
</script>

<style lang="less" scoped>
  .input-new-tag{
    width: 100px;
  }
  .input-new-tag,.button-new-tag,.el-tag{
    margin-left: 15px;
  }
</style>
