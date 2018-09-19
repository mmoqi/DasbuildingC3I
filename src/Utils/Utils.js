

 
  let errorMsg=function(msg){
    this.$message({
        message: msg,
        type: 'warning'
      });
  }

module.exports ={
    errorMsg: errorMsg
}