var config = {
API_PATH:'/api',
PORT:process.env.PORT || 8080,
DB:{
HOST:'localhost',
PORT:'27017',
DATABASE:'NODE_EXCEL'
},
getDBString:function(){
    return "mongodb://"+this.DB.HOST+":" +this.DB.PORT +"/"+this.DB.DATABASE;
}
}
module.exports=config;