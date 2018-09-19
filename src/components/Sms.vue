<template>
  <div class="wrap">
    <el-container>
       <el-header height="20">
        <h1>短信平台</h1>
      </el-header>
      <el-container>                
        <el-tabs v-model="activeName" @tab-click="clickTab">
          <el-tab-pane label="发送消息" name="first" >
            <el-container>
              <el-aside>            
                  <el-input placeholder="请输入手机号" class="todoinput" @keyup.enter.native="add" v-model="newtodo.content"></el-input>            
                  <el-row v-for="(item, index) in todolist" class="list-row" :key="index">
                    <el-col :xs="2" :sm="1" :md="1" :lg="1" :xl="1" class="check" :class="{ green: !todolist[index].done, 'red': todolist[index].done }">
                      <el-checkbox size="mini" v-model="item.done"></el-checkbox>
                    </el-col>
                    <el-col :xs="20" :sm="22" :md="22" :lg="22" :xl="22">
                      <input type="text" v-model="item.content" class="ipcont" :class="{done: todolist[index].done}">
                    </el-col>
                    <el-col :xs="2" :sm="1" :md="1" :lg="1" :xl="1" class="close">
                      <i class="el-icon-close" @click="del(index)"></i>
                    </el-col>
                  </el-row>                          
              </el-aside>
              <el-main>

                <p> 选中：{{ donenum }}人</p>
                <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="发送消息" >
                  <el-input v-model="ruleForm.SmsMsg"></el-input>
                </el-form-item>
                <el-form-item label="定时发送" >
                  <el-switch v-model="ruleForm.SendOnTime"></el-switch>
                </el-form-item>
                <div v-if="ruleForm.SendOnTime">
                    <el-form-item label="发送时间" required>
                    <el-col :span="11">
                      <el-form-item >
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                      <el-form-item >
                        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                      </el-form-item>
                    </el-col>
                  </el-form-item>       
                </div>        
                
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-main>    
            </el-container>
          </el-tab-pane>
          <el-tab-pane label="已发送" name="second">
            <el-header></el-header>
              <el-main>
                <el-table
                :data="SmsSendData"
                style="width: 100%">
                <el-table-column
                  prop="id"
                  label="id"
                  width="180">
                </el-table-column>

                <el-table-column
                  prop="phone"
                  label="电话"
                  width="180">
                </el-table-column>

                <el-table-column
                  prop="msg"
                  label="短信内容">
                </el-table-column>

                <el-table-column
                  prop="create_time"
                  label="创建时间">
                </el-table-column>
                
                <el-table-column
                  prop="send_time"
                  label="发送时间">
                </el-table-column>
                
                <el-table-column
                  prop="send_ontime"
                  label="立刻发送">
                </el-table-column>
                
                <el-table-column
                  prop="status"
                  label="发送状态">
                   <template slot-scope="scope">
                    <el-tag
                      :type="scope.row.tag === '家' ? 'primary' : 'success'"
                      disable-transitions>{{scope.row.tag}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column                  
                  label="操作"
                  width="150">
                  <template slot-scope="scope">
                   
                    <el-button type="text" size="small">重复发送</el-button>
                  
                  </template>
                </el-table-column>
              </el-table>
              </el-main>
              

          </el-tab-pane>
          <el-tab-pane label="待发送" name="third">
            <el-container>

              <el-header>
                
              </el-header>
              <el-main>

                <el-table
                :data="SmsNotSendData"
                style="width: 100%">
                <el-table-column
                  prop="id"
                  label="id"
                  width="180">
                </el-table-column>

                <el-table-column
                  prop="phone"
                  label="电话"
                  width="180">
                </el-table-column>

                <el-table-column
                  prop="msg"
                  label="短信内容">
                </el-table-column>

                <el-table-column
                  prop="create_time"
                  label="创建时间">
                </el-table-column>
                
                <el-table-column
                  prop="send_time"
                  label="发送时间">
                </el-table-column>
                
                <el-table-column
                  prop="send_ontime"
                  label="立刻发送">
                </el-table-column>
                
                <el-table-column
                  prop="status"
                  label="发送状态">
                   <template slot-scope="scope">
                    <el-tag
                      :type="scope.row.tag === '家' ? 'primary' : 'success'"
                      disable-transitions>{{scope.row.tag}}</el-tag>
                  </template>
                </el-table-column>

                <el-table-column                  
                  label="操作"
                  width="150">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="handleClick(scope.row)" type="text" size="small">立刻发送</el-button>
                    <el-button type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              </el-main>
            </el-container>
          </el-tab-pane>
        </el-tabs>
      </el-container>                                        
    </el-container>
    
  </div>
</template>

<script>

import axios from 'axios'

import Urls from '@/config/Url';

var STORAGE_KEY = 'todolist'

      function fetch() {
        return JSON.parse(window.localStorage.getItem(STORAGE_KEY)
          || '[]')
      }
      function save(items) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
      }

export default {
  name: 'HelloWorld',
  data () {
    return {
      activeName: 'first',
      msg: 'Welcome to Your Vue.js App',
      newtodo: {
        content: '',
        done: false
      },
      // todolist: [
      //   // {
      //   //   content: '现在开始吧',
      //   //   done: false
      //   // }
      // ]
      todolist: fetch(),
      ruleForm: {
        SmsMsg: '',
        SendOnTime:false
      },
      SmsSendData: [],
      SmsNotSendData: []
      
    }
  },
  methods: {
        add: function () {
          if (this.newtodo.content) {
            this.todolist.push(this.newtodo)
            this.newtodo = { content: '', done: false }
          }
        },
        del: function (index) {
          this.todolist.splice(index, 1)
        },
        submitForm: function(div){
          var me=this;
            var doneList=this.todolist.filter(function(item){
                return item.done;
            });
            var phoneList=doneList.map(function(v){return v.content;})

            if(!this.ruleForm.SendOnTime){
                
            }else{

            }            
        },
        handleClick(tab, event) {
          
        },
        clickTab:function(){          
          this.getSmsSendData();
          //this.getSmsNotSendData();
        },
        //获取已发送的数据
        getSmsSendData:function(){
          var url=Urls.SmsSendDateUrl;
          var me=this;
          axios.get(url)
          .then(function (response) {
            var data=response.data;
            if(data.status!=0){
              alert("获取已发送数据失败");
              return ;
            }                       
            me.SmsSendData=JSON.parse(data.message);  
                        
          })
          .catch(function (error) {
            console.log(error);
          });

        },
        //获取未发送的数据
        getSmsNotSendData:function(){
          var url=Urls.SmsNotSendDateUrl;
          var me=this;
          axios.get(url)
          .then(function (response) {
            var data=response.data;
            if(data.status!=0){
              alert("获取已发送数据失败");
              return ;
            }                       
            me.SmsNotSendData=JSON.parse(data.message);  
          })
          .catch(function (error) {
            console.log(error);
          });

        },
        //发送短信
        sendMsg:function(msg){
          var url=Urls.SMsUrl;          
          axios.post(url, {
            phoneList:JSON.stringify(phoneList),
            msg:msg
          }).then(function (response) {
            var data=response.data;
            if(data.status!=0){
              alert("获取已发送数据失败");
              return ;
            }                                   
            me.$alert('发送消息成功', '标题名称', {
              confirmButtonText: '确定'                      
            });
          }).catch(function (error) {
            me.$alert('发送消息失败', '标题名称', {
                  confirmButtonText: '确定'                      
                });
          })
        },
        //重复发送数据
        sendMsgRepeat:function(){

        }
      },
      computed: {
        donenum: function () {
          return this.todolist.filter(function (val) { return val.done }).length
        }
      },
      watch: {
        todolist: {
        handler(items) {
          save(items)
        },
        deep: true
      }
      }
    }
    
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .el-button-group{
      float: left;
    }
    .el-tabs{
     width :100%;
    }
    .el-header {
      text-align: center;
    }

    .el-main{
      padding: 0;
      padding-left: 20px;
    }

    .todoinput {
      margin-bottom: 40px;
    }

    .list-row {
      height: 40px;
      background-color: #fbfbfb;
      margin-bottom: 5px;
    }


    .check {
      text-align: center;
      line-height: 40px;
    }

    .red {
      border-left: #ef5f65 2px solid;
    }

    .green {
      border-left: #B9E1DC 2px solid;
    }

    .ipcont {
      width: 90%;
      margin-top: 8px;
      border: 0;
      line-height: 24px;
      background-color: transparent;
      font-size: 16px;
      color: #756C83;
    }

    .close {
      text-align: center;
      line-height: 40px;
    }

    .el-icon-close {
      cursor: pointer;
    }

    .el-icon-close:hover {
      color: #ef5f65;
    }

    
</style>
