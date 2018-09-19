<template>
  <div class="wrapper">

    
    <section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getTenants">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="telnants" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="t_id" label="id" width="120" sortable>
			</el-table-column>
			<el-table-column prop="t_name" label="租户姓名" width="120" :formatter="formatSex" sortable>
			</el-table-column>
			<el-table-column prop="t_floor" label="租户楼层" width="100" sortable>
			</el-table-column>
			<el-table-column prop="t_server_ip" label="服务器ip" width="120" sortable>
			</el-table-column>
			<el-table-column prop="t_status" label="租户状态" width="100" sortable>
			</el-table-column>
			<el-table-column label="操作" min-width="150">
				<template slot-scope="scope">         
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>


		<!--新增 编辑界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false" :visible.sync="addFormVisible">
			<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm" 
      label-position="left"
      >
				<el-form-item label="租戶名称" prop="t_name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
      
      	<el-form-item label="租户服务器ip" prop="t_server_ip">
					<el-input v-model="addForm.t_server_ip" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item 
            v-for="(floor, index) in addForm.t_floor"
            :label="'楼层' + index"
            :key="floor.key"
            :prop="'t_floor.' + index + '.value'"
            :rules="{
              required: true, message: '楼层不能为空', trigger: 'blur'
            }"
          >       
           <el-col :span="14">
              <el-input v-model="floor.value" size='mini' ></el-input>
           </el-col>   
           <el-col :span="10">
               <el-button @click.prevent="removeFloor(floor)">删除</el-button>
           </el-col>   
       
        </el-form-item>
        <el-form-item >
            <el-button @click="addFloor">新增楼层</el-button>
        </el-form-item>
       
        <el-form-item label="租住状态">
					<el-radio-group v-model="addForm.t_status">
						<el-radio class="radio" :label=1>正常</el-radio>
						<el-radio class="radio" :label=0>失效</el-radio>
					</el-radio-group>
				</el-form-item>

			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      filters: {
        name: ""
      },
      telnants: [
        {
          t_id: "2",
          t_name: "2",
          t_floor: "2",
          t_server_ip: "2",
          t_status: "2",
          t_create_time: "2",
          t_modify_time: "2"
        }
      ],
      total: 1,
      page: 1,
      listLoading: false,
      sels: [], //列表选中列

        
      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      //新增界面数据
      addForm: {
        t_name: "",
        t_floor: [],
        t_status:0
        
      }
    };
  },
  methods: {
    //性别显示转换
    formatSex: function(row, column) {
      return row.sex == 1 ? "男" : row.sex == 0 ? "女" : "未知";
    },
    addFloor: function() {
      this.addForm.t_floor.push({
        value: "",
        key: Date.now()
      });
    },
    removeFloor: function(item) {
      var index = this.addForm.t_floor.indexOf(item);
      if (index !== -1) {
        this.addForm.t_floor.splice(index, 1);
      }
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getTenants();
    },
    //获取用户列表
    getTenants() {
      let para = {
        page: this.page,
        name: this.filters.name
      };
      this.listLoading = true;
      //NProgress.start();

      this.listLoading = false;
      // getUserListPage(para).then((res) => {
      // 	this.total = res.data.total;
      // 	this.users = res.data.users;
      // 	this.listLoading = false;
      //   //NProgress.done();
      // });
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { id: row.id };
          removeUser(para).then(res => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getTenants();
          });
        })
        .catch(() => {});
    },
   
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
      this.addForm = {
        t_name: "",
        t_floor: [],
        t_status:1,
        t_server_ip:''
        
      };
    },
    //编辑
    editSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.editForm);
            para.birth =
              !para.birth || para.birth == ""
                ? ""
                : util.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
            editUser(para).then(res => {
              this.editLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["addForm"].resetFields();
              this.addFormVisible = false;
              this.getTenants();
            });
          });
        }
      });
    },
    //新增
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.addForm);
            para.birth =
              !para.birth || para.birth == ""
                ? ""
                : util.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
            addUser(para).then(res => {
              this.addLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["addForm"].resetFields();
              this.addFormVisible = false;
              this.getTenants();
            });
          });
        }
      });
    },
    selsChange: function(sels) {
      this.sels = sels;
    },
    //批量删除
    batchRemove: function() {
      var ids = this.sels.map(item => item.id).toString();
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { ids: ids };
          batchRemoveUser(para).then(res => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getTenants();
          });
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.getTenants();
  }
};
</script>
<style >
.wrapper {
}
</style>