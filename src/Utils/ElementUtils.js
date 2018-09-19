

 
  let errorMsg=function(){
    this.$message({
        message: '警告哦，这是一条警告消息',
        type: 'warning'
      });
  }

module.exports ={
    errorMsg: errorMsg
}