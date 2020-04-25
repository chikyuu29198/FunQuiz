const Tabletop = require('tabletop');

async function getData(publicSpreadsheetUrl) {
    var newQuizList = []
    let quizList = await Tabletop.init( { key: publicSpreadsheetUrl, simpleSheet: true } )
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
        newQuizList.push(newQuiz)
        console.log(newQuiz)
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
