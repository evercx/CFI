/*****************************************************************************************************************
 Author:  刘敏杰             Date:  2016/04/29
 Description:  用户信息表
 Function List:  在Document对象的save()方法前调用pre函数，当isNew为true时，表示文档中还没有对象被存储在MongoDB中，
                 此时，使creatTime和updateTime字段设置为系统当前时间，反之，creatTime不变，updateTime为系统当前时间。
 ********************************************************************************************************************/

var mongoose = require('mongoose');
var userInfoSchema = new mongoose.Schema({
	uEmail:{
		type:String,
		required:true
	},
	uPassword:{
		type:String,
		required:true
	},
	uRegisterTime:{
		type:Date,
		default:Date.now()
	},
    meta: {
        creatTime: {
            type: Date,
            default: Date.now()
        },
        updateTime: {
            type: Date,
            default: Date.now()
        }
    }
});

userInfoSchema.pre('save',function(next) {
    if (this.isNew) {
        this.meta.creatTime = this.meta.updateTime = Date.now();
    }
    else {
        this.mata.updateTime = Date.now();
    }
    next();
});

module.exports = userInfoSchema;