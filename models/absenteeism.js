/***********************************************************
 Author:  刘敏杰              Date:  2016/05/30
 Description:   把schema对象模型，编译成一个Model对象；
 Function List:  connect()方法：在mongoose模块级别下导出，连接到
                 config所设置的数据库；
                  model()方法: 编译模型；
 ***********************************************************/
var mongoose = require('mongoose');
var absenteeismSchema = require('../schemas/absenteeism');
//mongoose.connect(config.db.host);
var absenteeismModel = mongoose.model('absenteeism',absenteeismSchema,'absenteeism');

module.exports = absenteeismModel;