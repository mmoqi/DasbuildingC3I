<template>
  <div class="wrapper">
      
  <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
    <el-tab-pane label="m2设备" name="m2">m2设备</el-tab-pane>
    <el-tab-pane label="m4设备" name="m4">m4设备</el-tab-pane>
    <el-tab-pane label="f1设备" name="f1">f1设备</el-tab-pane>
    <el-tab-pane label="z1设备" name="z1">z1设备</el-tab-pane>
    <el-tab-pane label="k1设备" name="k1">k1设备</el-tab-pane>
    <el-tab-pane label="人脸设备" name="fourth">人脸设备</el-tab-pane>
    <el-tab-pane label="指纹设备" name="fourth">指纹设备</el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
 data() {
    return {
      activeName2: 'first'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  watch:{},
  computed:{},
  
  created(){},
  mounted(){}
}
</script>
<style  scoped>
.wrapper{}
</style>