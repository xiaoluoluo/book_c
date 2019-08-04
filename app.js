let testurl = "http://192.168.0.104:8999/";
let releasurl = "https://www.wecat8.com/book/";
let titleurl = releasurl;
App({
	// 注册小程序
	onLauch(){
		console.log('程序开启');
	},
	data: {
		isMusicPlay: false,
		playPageIndex: null,
		movies: [],
    usermsg: null,
    titleurl:"http://192.168.0.101:8999/",
    gophotoway: 1,
    way1image: "",
    way2image: "",
    way3image: "",
    upimageurl:"",
    user_id:0,
    questionList: [],
    myquestionList: [],
    subarry: ["全科目",'数学', '物理', '化学', '英语', '语文', '生物'],
    // imgpostfix:"?x-oss-process=image/rotate,270",
    imgpostfix: "",
	},
  mainurl: {
    // 1登录 Get
    // http://127.0.0.1:8999/login?wid=luoxiaosong
    login: titleurl + "login",
    // 2 获取openId POST 
    // http://127.0.0.1:8999/getWxOpenId{ "app_id": "ddd", "secret": "ffff", "code": "dddddd" }
    getWxOpenId: titleurl + "getWxOpenId",
    // 3 注册 POST
    // http://127.0.0.1:8999/register { "user_wid": "luoxiaosong", "user_name": "ddddd", "user_head_pic": "dddd" }
    register: titleurl + "register",
//     4 增加我的错题 POST
// http://127.0.0.1:8999/addMyQuestion
//{"user_id":100,"question_title":"dddd","answer_pic":"piss","subject_code":1,"true_title":"sssss","true_pic":"ssddd","false_title":"dddd","false_pic":"ddddd"}


    addMyQuestion: titleurl + "addMyQuestion",
//     5 获取我的所有的错题 Get
//http://127.0.0.1:8999/getMyAllQuestion?user_id=100&page=0&subject_code=1
    getMyAllQuestion: titleurl + "getMyAllQuestion",
//     6 根据错误id获取题目信息 Get
// http://127.0.0.1:8999/getQuestionById?question_id=100
//     7获取提列表 Get
// http://127.0.0.1:8999/getQuestionList?user_id=100&page=0&subject_code=1

    getQuestionList: titleurl + "getQuestionList",
//     8 更新题目信息 POST
    // http://127.0.0.1:8999/updateQuestion
    //   { "question_id": 100, "user_id": 100, "question_title": "sssss", "answer_pic": "dddd", "subject_code": 1, "true_title": "title", "true_pic": "ddddd", "false_title": "ftitle", "false_pic": "fffff" }

    updateQuestion: titleurl + "updateQuestion",
//     9 删除一个题目 POST
// http://127.0.0.1:8999/deletedMyQuestion

// { "question_id": 100 }
    deletedMyQuestion: titleurl + "deletedMyQuestion",
    // 10http://127.0.0.1:8999/updateGrade{"user_id":100,"user_grade":5}
    updateGrade: titleurl + "updateGrade",
    //11 增加评论POST http://127.0.0.1:8999/addQuestionComment{ "user_id": 100, "question_id": 5, "comment_intro": "ssssssss" }
    addQuestionComment: titleurl + "addQuestionComment",
//     12 获取评论 Get
// http://127.0.0.1:8999/getQuestionComment&question_id=111
    getQuestionComment: titleurl + "getQuestionComment",


  },

})