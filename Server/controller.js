const Tabletop = require('tabletop');

// async function getData(publicSpreadsheetUrl) {
//     var newQuizList = []
//     let quizList = await Tabletop.init( { key: publicSpreadsheetUrl, simpleSheet: false} )
// 	console.log(Object.keys(quizList))
// 	console.log(quizList['Trang tính1'].all())
	
//     //console.log()
//     return "TEST"

// }

async function getData(publicSpreadsheetUrl) {
    var newQuizList = []
    var user_custom = []
    let data = await Tabletop.init( { key: publicSpreadsheetUrl, simpleSheet: false } )
    let sheetName = Object.keys(data)
    let quizList = data[sheetName[1]].all()
    let customization = data[sheetName[0]].all()
    // console.log('quizList' + quizList)
    // console.log('customization '+ customization)
    let newQuiz = {}
    let correctIndex
    for (i = 0; i < quizList.length; i++){
        // console.log(i)
        newQuiz = {...quizList[i]};
        correctIndex = Math.floor(Math.random() * 4) + 1;
        //   console.log(correctIndex)
        switch (correctIndex) {
        case 2:
        newQuiz.a = quizList[i].b
        newQuiz.b = quizList[i].a
        newQuiz.correctAnswer = 'b'
        break;
        case 3:
        newQuiz.a = quizList[i].c
        newQuiz.c = quizList[i].a
        newQuiz.correctAnswer = 'c'
        break;
        case 4:
        newQuiz.a = quizList[i].d
        newQuiz.d = quizList[i].a
        newQuiz.correctAnswer = 'd'
        break;
        default:
            newQuiz.correctAnswer = 'a'
        break;
        }
        newQuizList.push(newQuiz)
        // console.log(newQuiz)
    }
    let custom = {}
    for ( i = 0; i< customization.length; i++){
        // console.log(customization[i])
        custom = {...customization[i]}
        user_custom.push(custom)
    }
    // console.log(newQuizList)
    // console.log(user_custom)
    var resData = {}
    resData.quiz = newQuizList
    resData.user_custom = user_custom
    console.log(resData.quiz)
    // var a = JSON.parse(resData)
    console.log(resData.user_custom)
    return resData

}

 exports.getAll = async function(req, res) {
    var key = req.query.key
    console.log(key)
    var newQuizList = await getData(key)
    // console.log(newQuizList)
    res.send(newQuizList)
};