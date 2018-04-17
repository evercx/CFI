/*****************************************************************************************************************
 Author:  刘敏杰             Date:  2016/05/30
 Description:  缺勤统计表
 Function List:  在Document对象的save()方法前调用pre函数，当isNew为true时，表示文档中还没有对象被存储在MongoDB中，
                 此时，使creatTime和updateTime字段设置为系统当前时间，反之，creatTime不变，updateTime为系统当前时间。
 ********************************************************************************************************************/

var mongoose = require('mongoose');
var absenteeismSchema = new mongoose.Schema({
	semester:{     //学期
		type:String
		//required:true
	},
	week:{     //周次
		type:String
	},
	recordDate:{   //登记日期
		type:String
		//default:Date.now()
	},
    stuNumber:{     //学号
        type:String
    },
    stuName:{     //姓名
        type:String
    },
    stuClass:{     //班级
        type:String
    },
    classType:{     //课堂类型
        type:String
    },
    date:{     //日期
        type:String
    },
    lesson:{     //课程名
        type:String
    },
    teacher:{     //任课教师
        type:String
    },
    classroom:{     //教学地点
        type:String
    },
    lessonTime:{     //教学时间段
        type:String
    },
    remark:{     //备注
        type:String
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



absenteeismSchema.pre('save',function(next) {
    if (this.isNew) {
        this.meta.creatTime = this.meta.updateTime = Date.now();
    }
    else {
        this.mata.updateTime = Date.now();
    }
    next();
});

module.exports = absenteeismSchema;