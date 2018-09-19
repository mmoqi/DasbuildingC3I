<template>
  <div class="wrapper">

    <el-container>
      <el-header>
        <el-upload
          class="upload-demo"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"             
          :limit="1"
          :file-list="fileList"         
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button  size="small" type="success" @click="preView">预览</el-button>  
          <el-button style="margin-left: 10px;" size="small" type="danger" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传Excel文件</div>
        </el-upload>
        
      </el-header>
      <el-main>
        <el-container>                    
          <el-main>
            <el-table :data="tableData" border highlight-current-row style="width: 100%;text-align:center">
             <el-table-column  :label="tableTitle" >
              <el-table-column min-width="150" v-for='item in tableHeader' :prop="item" :label="item" :key='item'>

              </el-table-column>
            </el-table-column>
          </el-table>
          </el-main>
        </el-container>
        

      </el-main>
      
      
    </el-container>
  </div>
</template>

<script>

import axios from 'axios'
import Urls from '@/config/Url'
import XLSX from 'xlsx'

export default {
  components:{},
  props:{},
  data(){
    return {
      tableTitle:'',
      files:'',
      tableData: '', 
      tableHeader: '',
      fileList: [
        // {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
        ]
    }
  },
  watch:{},
  computed:{},
  methods:{
    beforeUpload(file){           
      this.files = file;
      const extension = file.name.split('.')[1] === 'xls'
      const extension2 = file.name.split('.')[1] === 'xlsx'
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!extension && !extension2) {
      this.$message.warning('上传模板只能是 xls、xlsx格式!')
      return
      }
      if (!isLt2M) {
      this.$message.warning('上传模板大小不能超过 5MB!')
      return
      }
      this.fileName = file.name;
      return false // 返回false不会自动上传
    },
    preView:function(){        
      this.readerData(this.$refs.upload.uploadFiles[0].raw);        
    },
    submitUpload:function() {        
      this.$refs.upload.submit();
    },
    
    handlePreview:function(file) {
      this.preView();
    },
    generateDate:function({ tableTitle, header, results }) {
      this.tableTitle = tableTitle
      this.tableData = results
      this.tableHeader = header
    },   
    readerData(itemFile) {     
        if (itemFile.name.split('.')[1] != 'xls' && itemFile.name.split('.')[1] != 'xlsx') {
            this.$message({message: '上传文件格式错误，请上传xls、xlsx文件！',type: 'warning'});
          } else {
            const reader = new FileReader()
            reader.onload = e => {
               
                const data = e.target.result
                const fixedData = this.fixdata(data)
                const workbook = XLSX.read(btoa(fixedData), { type: 'base64' })
                const firstSheetName = workbook.SheetNames[0] // 第一张表 sheet1
                const worksheet = workbook.Sheets[firstSheetName] // 读取sheet1表中的数据   
                      
                delete worksheet['!merges']
               
                let A_l = worksheet['!ref'].split(':')[1] //当excel存在标题行时
                
                worksheet['!ref'] = `A1:${A_l}`
                const tableTitle = firstSheetName
                const header = this.get_header_row(worksheet)
                const results = XLSX.utils.sheet_to_json(worksheet)
                this.generateDate({ tableTitle, header,results })
              }
          
            reader.readAsArrayBuffer(itemFile)
          }
    },
    fixdata(data) {
        let o = ''
        let l = 0
        const w = 10240
        for (; l < data.byteLength / w; ++l) 
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
        return o
    },
    get_header_row(sheet) {
        const headers = []
       
        const range = XLSX.utils.decode_range(sheet['!ref'])       
        //let C 
        const R = range.s.r /* start in the first row */
        for (let C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
            var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })] /* find the cell in the first row */
            var hdr = 'UNKNOWN ' + C // <-- replace with your desired defaultif (cell && cell.t) 
            hdr = XLSX.utils.format_cell(cell)
            headers.push(hdr)
        }
        return headers
    }
  },
  created(){},
  mounted(){}
}
</script>
<style lang="scss" scoped>
.wrapper{}
.el-main{
  padding-top: 0px;
}
</style>