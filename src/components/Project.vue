<template>
  <div class="wrapper">
      <el-container>
        <el-header>
            <el-button-group>
                <el-button type="primary" icon="el-icon-edit" @click="addProject">添加</el-button>
                <el-button type="primary" icon="el-icon-share" @click="editProject">修改</el-button>
                <el-button type="primary" icon="el-icon-delete">删除</el-button>
            </el-button-group>
        </el-header>
        
        <el-main>
            <el-table  
            ref="projectTable"     
            highlight-current-row=true
            @selection-change="selectRow"  
            @row-click="clickRow"    
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
             <el-table-column
                    prop="ProjectID"
                    label="项目id"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="ProjectName"
                    label="项目名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="ProjectType"
                    label="项目类型"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="ProjectLeader"
                    label="项目负责人"
                    width="180">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="rowEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
       
    </el-container>


   <!-- 添加 删除 项目对话框 -->
    <el-dialog title="项目信息" :visible.sync="dialogProjectVisible">
        <el-form :model="projectInfo">
            <el-form-item label="项目名称" :label-width="formLabelWidth">
                <el-input v-model="projectInfo.ProjectName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="项目分类" :label-width="formLabelWidth">
                <el-select v-model="projectInfo.ProjectType" placeholder="请选择项目类型">
                    <el-option v-for="(item,index) in ProjectTypeList" :label="item.name" :value="item.value" v-bind:key="index"></el-option>                    
                </el-select>
            </el-form-item>
             <el-form-item label="项目负责人" :label-width="formLabelWidth">
                <el-input v-model="projectInfo.ProjectLeader" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogProjectVisible = false">取 消</el-button>
            <el-button type="primary" @click="addProject = false">确 定</el-button>
        </div>
    </el-dialog>
   
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      formLabelWidth: '120px',
      dialogProjectVisible:false,
      ProjectTypeList:[
          {
              name:'小程序',
              value:'小程序'
          },
          {
              name:'微信公众号',
              value:'小程序'
          },
          {
              name:'C3I',
              value:'小程序'
          },
          {
              name:'C3V8',
              value:'小程序'
          }
                    
      ],
      //项目信息  
      projectInfo:{
        ProjectName:"",
        ProjectType:"",
        ProjectLeader:""
      },
      tableData: [
        {
            ProjectID:1,
          ProjectName: "2016-05-02",
          ProjectType: "王小虎",
          ProjectLeader: "上海市普陀区金沙江路 1518 弄"
        },
        {
            ProjectID:2,
          ProjectName: "2016-222",
          ProjectType: "王小虎2222",
          ProjectLeader: "上海市普陀区金沙江路 1518 弄2222"
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
      //添加xai
      addProject:function(){
          this.projectInfo={};
          this.dialogProjectVisible=true;
      },
      //编辑项目
      editProject:function(){
          if(this.projectInfo.ProjectName){
            this.dialogProjectVisible=true;
          }else{
            this.tipSelectOne();
          }
        
      },
      //选中表格行
      selectRow:function(selection){
          if(selection[0]){                      
            this.projectInfo=selection[selection.length-1];
          }else{
              this.projectInfo={};
          }        
      },     
      clickRow:function(row, event, column){
        this.$refs.projectTable.toggleRowSelection(row);
      }, 
      rowEdit:function(index,row){           
           this.projectInfo.ProjectName=row.ProjectName;
           this.projectInfo.ProjectType=row.ProjectType;
           this.projectInfo.ProjectLeader=row.ProjectLeader;                        
           this.dialogProjectVisible=true;
      },     
      tipSelectOne() {
        this.$message({
          message: '请选择要一条处理的项目',
          type: 'warning'
        });
      },
      tipSelect() {
        this.$message({
          message: '请选择要处理的项目',
          type: 'warning'
        });
      }
  },
  created() {},
  mounted() {}
};
</script>
<style l>
.wrapper {
}

.el-button-group{
    float: left;
}
</style>