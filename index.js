var http=require('http');  
var nodemailer = require('nodemailer');
//get 请求外网  

function getCommentCount(){
	http.get('http://183.61.122.121/android/unAuth/article/cp/getArticlePvAndCommentCount.do?uniqueIds=&articleSource=4&articleIds=127642915&v=2922&operator=46002&flymeuid=&nt=wifi&vn=2.9.22&deviceinfo=D&deviceType=M6850&os=',
		function(req,res){  
		    var html='';  
		    req.on('data',function(data){  
		        html+=data;
		    });  
		    req.on('end',function(){  
		    	res=JSON.parse(html);
		        if(res.code==200){
		        	console.log(res.value[0].commentCount,(new Date()).toLocaleString());
		        	if(res.value[0].commentCount>=31000){
		        		clearInterval(time);
		        		setInterval(getCommentCount,10000);
		        	}
		        	if(res.value[0].commentCount>=33200){
		        		//doSomethingRemindMe
		        		// send mail with defined transport object
						transporter.sendMail(mailOptions, function(error, info){
						    if(error){
						        return console.log(error);
						    }
						    console.log('Message sent: ' + info.response);

						});
		        	}
		        }
		        else{
		        	console.log("error");
		        }
		    });  
		}
	);
}



var transporter = nodemailer.createTransport({
    //https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
    service: 'qq',
    port: 465, // SMTP 端口
    secureConnection: true, // 使用 SSL
    auth: {
        user: '1346631393@qq.com',
        //这里密码不是qq密码，是你设置的smtp密码
        pass: 'XXX'
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '1346631393@qq.com', // 发件地址
    to: '583274568@qq.com', // 收件列表
    subject: 'Hello', // 标题
    //text和html两者只支持一种
    text: 'Hello world ?', // 标题
    html: '<b>Hello world ?</b>' // html 内容
};

getCommentCount();
var time=setInterval(getCommentCount,6000000);