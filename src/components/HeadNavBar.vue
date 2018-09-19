<template>
  <el-menu
  :default-active="主页"
  class="el-menu-demo"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  router=true
  active-text-color="#ffd04b">

<el-menu-item  v-if="item.children.length==0" v-for="(item,index) in pathData"  v-bind:key="index" :index="item.path">
    {{item.name}}    
  </el-menu-item>
  <el-submenu v-if="item.children.length>0" v-for="(item,index) in pathData"  v-bind:key="index" :index="item.path">
    <template slot="title">{{item.name}}</template>
    
    <el-menu-item  v-if="item.children.length==0" v-for="(item,index) in item.children"  v-bind:key="index" :index="item.path">
      {{item.name}}    
    </el-menu-item>
    <el-submenu v-if="item.children.length>0" v-for="(item3,index3) in item.children"  v-bind:key="index3" :index="item3.path">    
      <template slot="title">{{item3.name}}</template>    
       <el-menu-item  v-for="(item4,index4) in item3.children"  v-bind:key="index4" :index="item.path+'/'+item3.path+'/'+item4.path">
        {{item4.name}}    
       
      </el-menu-item>
    </el-submenu>

  </el-submenu>

</el-menu>
<!-- <el-menu-item  v-if="item.children.length==0" v-for="(item,index) in pathData"  v-bind:key="index" :index="item.path">
    {{item.name}}    
  </el-menu-item>
  <el-submenu v-if="item.children.length>0" v-for="(item,index) in pathData"  v-bind:key="index" :index="item.path">
    <template slot="title">{{item.name}}</template>
    
    <el-menu-item  v-if="item.children.length==0" v-for="(item,index) in item.children"  v-bind:key="index" :index="item.path">
      {{item.name}}    
    </el-menu-item>
    <el-submenu v-if="item.children.length>0" v-for="(item3,index3) in item.children"  v-bind:key="index3" :index="item3.path">    
      <template slot="title">{{item3.name}}</template>    
       <el-menu-item  v-for="(item4,index4) in item3.children"  v-bind:key="index4" :index="item.path+'/'+item3.path+'/'+item4.path">
        {{item4.name}}    
       
      </el-menu-item>
    </el-submenu>

  </el-submenu>

</el-menu> -->
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      pathData:
        [
          {
            path: '/',
            name: '主页',
            leaf:true,
            children:[]     
          },
          {
            path: '/project',
            name: '我的项目',
            leaf:true,
            children:[]     
          },
          {
            path: '/sms',
            name: '我的短信',
            leaf:true,
            children:[]     
          },
          {
            path: '/manage',
            name: '管理系统',     
            leaf:false,
            children:[
              {
                  path: 'tenant',
                  name: '租户管理',     
                  leaf:false,
                  children:[
                    {
                        path: 'tenantManage',
                        name: '租户管理',
                        leaf:true,
                        children:[]                             

                    }
                  ]
              },
              {
                  path: 'dev',
                  name: '设备管理',    
                  leaf:false,
                  children:[
                    {
                        path: 'devManage'  ,
                        name: '设备管理',
                        leaf:true,
                        children:[]                                                        
                    }
                  ]
              },
              {
                  path: 'system',
                  name: '系统管理',    
                  leaf:false,
                  children:[
                    {
                        path: 'systemConfig',
                        name: '系统管理',
                        leaf:true,
                        children:[]                                   
                    }
                  ]
              }
              
            ]
          },
           {
            path: '/house',
            name: '物业系统',     
            leaf:false,
            children:[
              {
                  path: 'card',
                  name: '卡片管理',     
                  leaf:false,
                  children:[
                    {
                        path: 'cardPre',
                        name: '预发卡',
                        leaf:true,
                        children:[]                             

                    },
                    {
                        path: 'cardAllot',
                        name: '卡片分配',
                        leaf:true,
                        children:[]                             

                    }
                  ]
              },
              {
                  path: 'tenantInfo',
                  name: '租户信息管理',    
                  leaf:false,
                  children:[
                    {
                        path: 'tenantInfoManage'  ,
                        name: '租户信息管理',
                        leaf:true,
                        children:[]                                                        
                    }
                  ]
              },
              {
                  path: 'dev',
                  name: '设备管理',    
                  leaf:false,
                  children:[
                    {
                        path: 'devManage',
                        name: '设备管理',
                        leaf:true,
                        children:[]                                   
                    }
                  ]
              }
              
            ]
          }
          
        ]
           
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style l>

</style>