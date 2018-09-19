<template>
  <div class="wrapper">
      <el-form :model="cardForm" :rules="cardFormRules" ref="cardForm" class="demo-ruleForm">        
        <el-form-item  prop="generateNum">                
            <el-row>
                <el-col :span="12">
                    <el-input  placeholder="请输入要生成的卡片数目"  v-model.number="cardForm.generateNum"></el-input>                                                 
                </el-col>
                <el-col  :span="4" >
                    <el-button type="primary" v-on:click="submitForm('ruleForm')"> 生成卡片</el-button> 
                </el-col>
            </el-row>                       
        </el-form-item>                                                
      </el-form>    
      <el-container>
        <el-table
            :data="cardTabel"
            style="width: 100%"
            :row-class-name="tableRowClassName">
            <el-table-column
            prop="date"
            label="日期"
            width="180">
            </el-table-column>
            <el-table-column
            prop="name"
            label="姓名"
            width="180">
            </el-table-column>
            <el-table-column
            prop="address"
            label="地址">
            </el-table-column>
        </el-table>
      </el-container>  
  </div>
</template>

<script>

export default {
  components:{},
  props:{},
  data(){
    return {
        //卡片数据
        cardTabel:[{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        cardForm: {
            generateNum:null
        },      
        cardFormRules:{
            generateNum: [
                { required: true, message: '请输入要生成的卡片数目', trigger: 'blur' },                                 
                { type: 'number', message: '必须为数字值'}
            ]
        }
    }
  },
  watch:{},
  computed:{},
  methods:{
      //渲染行样式
      tableRowClassName({row, rowIndex}) {         
        if (rowIndex === 1) {           
          return 'cardNotAllot-row';
        } else if (rowIndex === 3) {           
          return 'cardAlloted-row';
        }
        return '';
      },
      //生成卡片
      submitForm:function(){
          this.$refs["cardForm"].validate((valid) => {
          if (valid) {
            console.log("即将生成"+this.cardForm.generateNum+"张卡片");
          } else {
            this.$message({
                message: "请输入要生成的卡的数目",
                type: 'warning'
            });
            return false;
          }
        });

        
      }          
  },
  created(){},
  mounted(){}
}
</script>
<style >
.wrapper{}

.el-table .cardNotAllot-row {
background: oldlace;
}

.el-table .cardAlloted-row {
background: #f0f9eb;
}

</style>