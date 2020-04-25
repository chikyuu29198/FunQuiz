const Tabletop = require('tabletop');

function getData(key) {
    var publicSpreadsheetUrl = '11uGBq9i-C4nOiyxNyco1j9gPEq1HYPuDlFpquf6rvSw';
    var newQuizList = []
    Tabletop.init( { key: publicSpreadsheetUrl,
    callback: showInfo,
    simpleSheet: true } )
    function showInfo(data, tabletop) {
    // console.log(data)
    var quizList = data
    // console.log(quizList)
    let newQuiz = {}
    let correctIndex
    for (i = 0; i < quizList.length; i++){
        console.log(i)
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
        //newQuiz.correctAnswer = correctIndex;
        newQuizList.push(newQuiz)
        console.log(newQuiz)
    }
    }
    return newQuizList

}

 exports.getAll = async function(req, res) {
    var key = req.query.key
    console.log(key)
    var newQuizList = await getData(key)
    console.log(newQuizList)
    res.send(newQuizList)
};
