<template>
  <div class="wrapper">
      <el-form :model="cardForm" :rules="cardFormRules" ref="cardForm" class="demo-ruleForm">        
        <el-form-item  prop="generateNum">                
            <el-row>
              <el-col :span="4">
                <el-select v-model="CardSegValue" placeholder="请选择当前卡段">
                  <el-option
                    v-for="item in CardSegOption"
                    :key="item.CardSegID"
                    :label="item.CardSegName+'-'+item.CardSegStartID+'-'+item.CardSegEndID"
                    :value="item.CardSegID"
                    :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-col>
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
        <el-main>
          <el-table
            :data="cardTabel"
            style="width: 100%"            
             v-loading="CardTableLoading"
            :row-class-name="tableRowClassName">
            <el-table-column
            prop="CardID"
            label="卡流水号"
            width="180">
            </el-table-column>
            <el-table-column
            prop="CardDispNo"
            label="卡显示编号"
            width="180">
            </el-table-column>
            <el-table-column
            prop="CardFixNo"
            label="卡固有号">
            </el-table-column>
            <el-table-column
            prop="CardTypeID"
            label="卡固有号">
            </el-table-column>
            <el-table-column
            prop="CardStatus"
            label="卡状态">
            </el-table-column>      
            <el-table-column
            prop="CardIsUse"
            label="卡使用状态">
            </el-table-column>                                    
          </el-table>
        </el-main>
        <el-footer>
          <el-pagination 
            background
            layout="prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 50, 100, 200]"
            :page-size="pageSize"            
            :total="total">
          </el-pagination>
        </el-footer>
        
        
      </el-container>  

  </div>
</template>

<script>
import Urls from '@/config/Url'
import axios from 'axios'

export default {
  components:{},
  props:{},
  data(){
    return {
        CardTableLoading:false,
        currentPage:1,
        pagesize:10,
        total:100,
        //卡分段下拉框
        CardSegOption: [{
          CardSegID: '1',
          CardSegName: '默认段',
          CardSegStartID: '0',
          CardSegEndID: '5000'
        }, {
          CardSegID: '2',
          CardSegName: '默认段',
          CardSegStartID: '5000',
          CardSegEndID: '15000',        
        }],
        CardSegValue: '',    
        //卡片数据
        cardTabel:[
          // {
          //   CardID: '1',
          //   CardDispNo: '1',
          //   CardFixNo: '245636636',
          //   CardTypeID: '1',
          //   CardStatus: '已发卡',
          //   CardIsUse: '卡使用中',         
          // }
        ],
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
      showAllCardInfo:function(){
        var me=this;
        var url=Urls.GetAllCardInfoUrl;
        this.CardTableLoading=true;
        let currentPage=this.currentPage;
        let pagesize=this.pagesize;

        axios.post(url, {currentPage: currentPage,pagesize:pagesize})
            .then(function (response) {
              var data=response.data;
              if(data.status==0){
                let cardInfo=JSON.parse(data.message);
                let cardInfoArr=cardInfo.objList;
                let count=cardInfo.total;
                
                let cardInfoList = cardInfoArr.map(function (obj) {
                  return {
                    CardID:obj.CardID,
                    CardDispNo:obj.CardDispNo,
                    CardTypeID:obj.CardTypeID,
                    CardFixNo:obj.CardFixNo,
                    CardIsUse:obj.CardIsUse
                  };
                });
                me.cardTabel=cardInfoList;
                me.CardTableLoading=false;
                me.total=count;
              }else{
                this.$message({
                    message: "生成卡片失败",
                    type: 'warning'
                });
                me.CardTableLoading=false;
              
              }
            
            })
            .catch(function (error) {
              me.CardTableLoading=false;
              console.log(error);
            });
      },
      //生成卡片
      submitForm:function(){
        let me=this;
          this.$refs["cardForm"].validate((valid) => {
          if (valid) {
             var url=Urls.GenerateCardUrl;
             var  count=this.cardForm.generateNum; 
             var CardSegID=this.CardSegValue;
             var  cardtypeid=1;
       
            axios.post(url, {count: count,CardSegID:CardSegID,cardtypeid:cardtypeid})
              .then(function (response) {
                var data=response.data;
                if(data.status==0){
                  
                  me.showAllCardInfo();
                }else{
                  this.$message({
                      message: "生成卡片失败",
                      type: 'warning'
                  });               
                }              
              })
              .catch(function (error) {                
                console.log(error);
              });            
          } else {
            this.$message({
                message: "请输入要生成的卡的数目",
                type: 'warning'
            });
            return false;
          }
        });        
      },
      //分页        
      handleCurrentChange:function(currentPage){
        this.currentPage=currentPage;
        this.showAllCardInfo();
      },    
      //修改size  
      handleSizeChange:function(size){
          this.pagesize=size;
      }
  },
  created(){
    this.showAllCardInfo();
  },
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