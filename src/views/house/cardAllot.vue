<template>
  <div class="wrapper">
    <el-container>
      <el-header>
        <el-button-group>
          
            <el-button type="primary" icon="el-icon-edit" @click="AllotCard" :disabled="doAllot">分配</el-button>
            <el-button type="primary" icon="el-icon-share" @click="CancellAllotCard"  :disabled="cancellAllot"  >取消分配</el-button>        

        </el-button-group>
      </el-header>
      <el-container>
        <el-aside>
          <el-input placeholder="请输入员工名称" icon="search" v-model="empnameFilter" class="search-input">
             <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
           <el-table
            :data="tableData"
            :highlight-current-row="true"           
            @row-click="selectEmp"
            style="width: 100%">
            
            <el-table-column
              prop="empid"
              label="人员id"
              width="180">
            </el-table-column>
            <el-table-column
              prop="empname"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="empno"
              label="人员编号"
              width="180">
            </el-table-column>            
          </el-table>
        </el-aside>
        <el-main>     
          <el-input placeholder="请输入卡流水号" icon="search" v-model="cardIDFilter" class="search-input">
             <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>

           <el-table
            :data="CardInfoTableData"
           
            empty-text="暂无可分配的卡片"
            :highlight-current-row="true"    
            :row-class-name="tableRowClassName"
            @row-click="selectCard"
             v-loading="CardTableLoading"
            style="width: 100%">
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
              prop="CardTypeID"
              label="卡类"
              width="180">
            </el-table-column>     
            <el-table-column
              prop="CardFixNo"
              label="卡固有号"
              width="180">
            </el-table-column>         
             <el-table-column
              prop="CardIsUse"
              label="卡已分配"
              width="180">
            </el-table-column>         
               
               
          </el-table>
        </el-main>
      </el-container>
      
    </el-container>
  </div>
</template>

<script>
import urls from '@/config/Url'
import axios from 'axios'
export default {
  components:{},
  props:{},
  data(){
    return {
      CardTableLoading: false,
      cancellAllot:true,
      doAllot:true,
      selectEmpBol:false,
      empnameFilter:'',
      cardIDFilter:'',
      selectCardID:'',
      selectEmpID:'',
      tableData: [{
        empid: '1',
        empname: '王小虎',
        empno: 'fw12414',            
      }, {
        empid: '2',
        empname: '李线程',
        empno: 'fw2434',            
      }],
      CardInfoTableData: [
        // {
        //   CardID: '1',
        //   CardDispNo: '12323',
        //   CardTypeID: '1',            
        //   CardFixNo: '15363474754747',            
        //   CardIsUse: '1',          
        // }
      ]
    }        
  },
  watch:{},
  computed:{},
  methods:{
    //渲染行样式
    tableRowClassName({row, rowIndex}) {         
      var CardIsUse=row.CardIsUse;      
      if (CardIsUse == 0) {                   
        return 'cardNotAllot-row';
      } else if (CardIsUse == 1) {            
        return 'cardAlloted-row';
      }
      return '';
    },

    //刷新卡片表格数据
    refreshCardTable:function(){
      var url=urls.getEmpCardInfoUrl;     
      var me=this;
      var empid=this.selectEmpID==""?0:this.selectEmpID;    
      //请求该人员的未发卡信息和已发卡信息
      this.CardTableLoading=true;
      axios.post(url, {empid: empid})
        .then(function (response) {
          var data=response.data;
          if(data.status==0){
            let cardInfoArr=JSON.parse(data.message);
            let cardInfoList = cardInfoArr.map(function (obj) {
              return {
                CardID:obj.CardID,
                CardDispNo:obj.CardDispNo,
                CardTypeID:obj.CardTypeID,
                CardFixNo:obj.CardFixNo,
                CardIsUse:obj.CardIsUse
              };
            });
            me.CardInfoTableData=cardInfoList;
           me.CardTableLoading=false;
          }else{
            this.$message({
                message: "加载失败",
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
    //选中人员
    selectEmp:function(row, event, column){      
      var url=urls.getEmpCardInfoUrl;     
      var me=this;

      var empid=row.empid;    
      this.selectEmpBol=true; 
      this.selectEmpID=empid;
      //刷新卡片表格数据
      this.refreshCardTable();

    },
    //选中卡片
    selectCard:function(row, event, column){
      var CardID=row.CardID;
      var CardIsUse=row.CardIsUse;
      this.selectCardID=CardID;
      if(CardIsUse==1 && this.selectEmpBol){
        
       this.doAllot=true;
        this.cancellAllot=false;
      }else if(CardIsUse==0 && this.selectEmpBol){
        
         this.cancellAllot=true;
        this.doAllot=false;
        
      }
     
    },
    //取消分配卡片
    CancellAllotCard:function(){
      var url=urls.CancellAllotCardUrl;     
      var me=this;
      let cardid=this.selectCardID;
      let empid=this.selectEmpID;
    
      //请求该人员的未发卡信息和已发卡信息
      axios.post(url, {empid: empid,cardid:cardid})
        .then(function (response) {
          var data=response.data;
          if(data.status==0){
            
            me.refreshCardTable();
          }else{
            this.$message({
                message: "分配卡片失败",
                type: 'warning'
            });
          }
        
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //分配卡片
    AllotCard:function(){
      var url=urls.AllotCardUrl;     
      var me=this;
      let cardid=this.selectCardID;
      let empid=this.selectEmpID;
    
      //请求该人员的未发卡信息和已发卡信息
      axios.post(url, {empid: empid,cardid:cardid})
        .then(function (response) {
          var data=response.data;
          if(data.status==0){
                        
            me.refreshCardTable();
          }else{
            this.$message({
                message: "分配卡片失败",
                type: 'warning'
            });
          }
        
        })
        .catch(function (error) {
          console.log(error);
        });
      
    }
  },
  created(){
    this.refreshCardTable();
  },
  mounted(){}
}
</script>
<style lang="scss"  >
.wrapper{}

.el-header{
  padding-left:0px;
}
.el-main{
  padding-top:0px;
 
}
.el-table .cardNotAllot-row {

background: #f0f9eb;
}

.el-table .cardAlloted-row {
background: oldlace;
}

</style>