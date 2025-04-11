let express = require("express");
// const { console } = require("inspector");
let axios = require("axios");

let app = express();
let port = process.env.PORT || 80;

app.use(express.static("public_html"));
app.listen(port, function(){
	console.log("html 서버 시작됨")
});


// app.use()로 public_html 폴더 전체를 express 모듈 웹서버가 구동되게 했는데, 단 한 개의 페이지만 열어보자
// 두 번째 파라미터에는 /pharmach_list로 접속한 사용자에게 (req, res)를 사용하여 요청(받고)과 응답(보냄)
app.get("/pharmach_list", (req, res) => {
    //app.get() 역시 비동기이기 때문에 동기로 바꾸는 작업이 필요
    let api = async() => {
        //밑에 동기로 수행하기 위해 axios로 부터 받은 데이터 객체를 받을 변수를 미리 상위에 선언
        let response = null;

        //axios는 try catch 로 예외처리 필요
        try {
            //axios.get()라는 모듈을 써서 다른 URL에 있는(크로스 도메인) 데이터를 가지고 온다.
            //CORS는 Cross Origin Resource Sharing(교차 출처 자원 공유)
            //https에서 s를 빼고, (?) 전까지 : 파라미터변수 제외
            response = await axios.get("http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire", {
                //두번째 인자가 여러개(파라미터들)일 경우 중괄호를 써서 표현
                //params도 여러개라서 때문에 중괄호를 써서 표현
                params : {
                    //serviceKey는 프로그램 변수에 할당할 때는 암호화되지 않은 Decoding 형태의 키를 넣는다. 
                    "serviceKey" : "TR9SiJfLDu9G7hDWYb/QdZ8UWDNr8a02u59fN62ODfgy8TYZJl1ZVGvZ0W2znOOx7AD4K1ElX/PZA04mk3u8RA==",
                    "Q0" : req.query.Q0,
                    "Q1" : req.query.Q1,
                    "QT" : req.query.QT,
                    "QN" : req.query.QN,
                    "ORD" : req.query.ORD,
                    "pageNo" : req.query.pageNo,
                    "numOfRows" : req.query.numOfRows
                }
            });
        }
        catch(e) {
            console.log(e);
        }
        return response;
    }

    //CORS 오류를 잡기 위한 소스 res가 교차 출처에 대해 보내는 것이 가능해 진다.
    api().then((response) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(response.data.response.body);
    });        
});


// index02.html에 접근 가능하도록 라우팅 추가
app.get("/index02", (req, res) => {
    res.sendFile(__dirname + "/public_html/index02.html");
});
