const mongoose = require('mongoose')
// 创建schema对象
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const candidateSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  //薪水
  salary: {
    type: String,
    default: 0

  },
  phonenum: {
    type: String,
    default: '0'
  },

  //工作年限
  work_seniority: {
    type: String,
    default: 0
  },
  //当前职位
  position: {
    type: String,
    default: "工程师"
  },
  //拟推荐职位
  target_position: "",
  //拟推荐客户
  target_customs: "",
  company: {
    type: String,
    default: "腾讯"

  },
  //职能
  functions: {
    type: String,
    default: "开发"


  },
  counselor: {
    type: String,
    default: "cedric"

  },
  update_date: {
    type: Date



  },
  //所在地区
  area: {
    type: String,
    default: "深圳"
  },

  sex: {
    type: String,
    default: "男"
  },
  age: {
    type: String,
    default: "30"
  },
  pipeline: {
    type: String,
    default: "callList"
  },


  education: {
    type: String,
    default: "本科"
  },
  email: {
    type: String,
    default: 'default@qq.com'
  },
  marriage: {
    type: String,
    default: '单身'
  },
  pipeline_info: {
    type: Object,
    default: {
      subpipeline: "callList",
      //状态时间
      statustime: new Date(),
      // 推荐时间
      recommendtime: new Date(),
      //保存所有流程的提醒事项
      reminds: [],
      callList: {
        //子状态
        subpipeline: "待沟通",
        addtime: new Date(),
        statustime: new Date(),
        //保存所有备注
        remarks: [],
        communicate: {
          remarks: [],
          remindtime: new Date(),
          reminder: [],
          statustime: new Date(),

        },
        candidate_refuse: {
          remarks: [],
          remindtime: new Date(),
          reminder: [],
          statustime: new Date(),

        },
        counselor_refuse: {
          remarks: [],
          remindtime: new Date(),
          statustime: new Date(),
          reminder: [],
        },
        customer_refuse: {
          remarks: [],
          remindtime: new Date(),
          statustime: new Date(),
          reminder: [],
        },
        recommended: {
          remarks: [],
          remindtime: new Date(),
          statustime: new Date(),
          reminder: [],
        }
      }, //审核

      audit: {
        //子状态
        subpipeline: "待沟通",
        addtime: new Date(),
        statustime: new Date(),
        //保存所有备注
        remarks: [],
        //通过
        pass: {
          remarks: [],
          remindtime: new Date(),
          statustime: new Date(),
          reminder: [],
        },
        //打回
        repulse: {
          remarks: [],
          remindtime: new Date(),
          statustime: new Date(),
          reminder: [],
        }
      },
      recommend: {
        //子状态
        subpipeline: "待沟通",
        addtime: new Date(),
        statustime: new Date(),
        //保存所有备注
        remarks: [],
        recommendtime: new Date(),
        recommend_follow: {
          remarks: [],
          remindtime: new Date(),
          statustime: new Date(),
          reminder: [],
        },
        interview_plan: [{
          //面试轮次
          sequence: 1,
          //面试时间
          interviewtime: new Date(),
          //提醒时间
          remindtime: new Date(),
          // 面试地点
          location: "",
          // 面试官
          interviewer: "",
          // 面试备注
          remarks: [],
          // 状态时间
          statustime: new Date(),
          // 提醒人
          reminder: [],
        }],
        //推荐淘汰
        recommend_obsolete: { //子状态
          subpipeline: "待沟通",
          addtime: new Date(),
          statustime: new Date(),
          //保存备注
          remarks: [],
          remindtime: new Date(),
          reminder: [],

        },
        //重启流程
        restrat_pipeline: { //子状态
          subpipeline: "待沟通",
          addtime: new Date(),
          statustime: new Date(),
          //保存备注
          remarks: [],
          reminder: [],
          remindtime: new Date(),

        }
      },
      interview: {
        //子状态
        subpipeline: "待沟通",
        addtime: new Date(),
        statustime: new Date(),
        //保存所有备注
        remarks: [],
        recommendtime: new Date(),
        interview_follow: {
          //面试跟进备注
          remarks: [],
          //面试跟进提醒时间
          remindtime: new Date(),
          //状态时间
          statustime: new Date(),
          //提醒人
          reminder: [],
        },
        interview_plan: [{
          //面试轮次
          sequence: 1,
          //面试时间
          interviewtime: new Date(),
          //提醒时间
          remindtime: new Date(),
          // 面试地点
          location: "",
          // 面试官
          interviewer: "",
          // 面试备注
          remarks: [],
          // 状态时间
          statustime: new Date(),
          // 提醒人
          reminder: [],
        }],
        //面试淘汰
        interview_obsolete: { //子状态
          subpipeline: "面试淘汰",

          statustime: new Date(),
          //保存备注
          remarks: [],
          remindtime: new Date(),
          reminder: [],

        },
        //offer
        offer: [{
          //收费
          charge: 0,
          //offer时间
          offer_time: new Date(),
          //入职时间
          entry_time: new Date(),
          // 年薪
          package: 0,
          // 月数
          months: 0,
          // 月薪
          month_salary: 0,
          // 备注
          remarks: [],
          // 提醒人
          reminder: [],
          // 状态时间
          statustime: new Date(),

        }],
        //offer淘汰
        offer_obsolete: { //子状态
          subpipeline: "offer淘汰",
          statustime: new Date(),
          //保存备注
          remarks: [],
          remindtime: new Date(),
          reminder: [],

        },
        //重启流程
        restrat_pipeline: { //子状态
          subpipeline: "待沟通",

          statustime: new Date(),
          //保存备注
          remarks: [],
          reminder: [],
          remindtime: new Date(),

        }
      },

      offer: {
        //子状态
        subpipeline: "待入职",
        addtime: new Date(),
        statustime: new Date(),
        //保存所有备注
        remarks: [],
        recommendtime: new Date(),
        offer_follow: {
          //offer跟进备注
          remarks: [],
          //offer跟进提醒时间
          remindtime: new Date(),
          //状态时间
          statustime: new Date(),
          //提醒人
          reminder: [],
        },

        //入职
        entry: {
          //子状态
          subpipeline: "待入职",
          // 入职时间
          entry_time: "",
          // 保证期结束时间
          guarantee_time: "",
          statustime: "",
          //保存备注
          remarks: [],
          remindtime: "",
          reminder: [],

        },
        //offer
        offer: [{
          //收费
          charge: 0,
          //offer时间
          offer_time: new Date(),
          //入职时间
          entry_time: new Date(),
          // 年薪
          package: 0,
          // 月数
          months: 0,
          // 月薪
          month_salary: 0,
          // 备注
          remarks: [],
          // 提醒人
          reminder: [],
          // 状态时间
          statustime: new Date(),

        }],
        // 入职失败
        entry_obsolete: {
          subpipeline: "入职失败",
          statustime: new Date(),
          //保存备注
          remarks: [],
          remindtime: new Date(),
          reminder: [],

        },
        //重启流程
        restrat_pipeline: { //子状态
          subpipeline: "待沟通",

          statustime: new Date(),
          //保存备注
          remarks: [],
          reminder: [],
          remindtime: new Date(),

        }
      },
      entry: {
        //子状态
        subpipeline: "入职",
        addtime: new Date(),
        statustime: "",
        //保存所有备注
        remarks: [],

        entry_follow: {
          //入职跟进备注
          remarks: [],
          //入职跟进提醒时间
          remindtime: "",
          //状态时间
          statustime: "",
          //提醒人
          reminder: [],
        },

        //入职
        entry: {
          //子状态
          subpipeline: "入职",
          // 入职时间
          entry_time: "",
          // 保证期结束时间
          guarantee_time: "",
          statustime: "",
          //保存备注
          remarks: [],
          remindtime: "",
          reminder: [],

        },
        //over_insured过保
        over_insured: {
          subpipeline: "过保",
          statustime: "",
          // 保证期结束时间
          guarantee_time: "",
          //保存备注
          remarks: [],
          remindtime: "",
          reminder: [],
        },
        // 离职
        resign: {
          subpipeline: "离职",
          statustime: "",
          //保存备注
          remarks: [],
          remindtime: "",
          reminder: [],

        },
        //重启流程
        restrat_pipeline: { //子状态
          subpipeline: "待沟通",

          statustime: new Date(),
          //保存备注
          remarks: [],
          reminder: [],
          remindtime: new Date(),

        }
      },
      over_insured: {
        //子状态
        subpipeline: "过保",
        addtime: new Date(),
        statustime: "",
        //保存所有备注
        remarks: [], //over_insured过保
        over_insured: {
          subpipeline: "过保",
          statustime: "",
          // 保证期结束时间
          guarantee_time: "",
          //保存备注
          remarks: [],
          remindtime: "",
          reminder: [],
        },
        //重启流程
        restrat_pipeline: { //子状态
          subpipeline: "待沟通",

          statustime: "",
          //保存备注
          remarks: [],
          reminder: [],
          remindtime: "",

        }
      },
      obsolete: {
        //子状态
        subpipeline: "淘汰",
        addtime: new Date(),
        statustime: "",
        //保存所有备注
        remarks: [],
        obsolete: {
          subpipeline: "淘汰",
          statustime: "",

          //保存备注
          remarks: [],
          remindtime: "",
          reminder: [],
        },
        //重启流程
        restrat_pipeline: { //子状态
          subpipeline: "待沟通",

          statustime: "",
          //保存备注
          remarks: [],
          reminder: [],
          remindtime: "",

        }
      }
    },









  }
});

// 将schema对象转化为数据模型
const Candidate = mongoose.model('candidates', candidateSchema)

module.exports = Candidate