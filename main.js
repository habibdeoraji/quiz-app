$(function () {
    var mainContainer = $('#main-container')

    function quizQuestionRendered(quizDetails, questionNumber) {

        var questionWrapper = $("<div>").addClass('question-wrapper');
        var quizQuestion = $("<p>").addClass('quiz-question').text("Q" + questionNumber + ". " + quizDetails.question);

        questionWrapper.append(quizQuestion)
        for (var i = 0; i < quizDetails.options.length; i++) {

            var label = $('<label>').addClass('option-value');

            var input = $('<input>').attr({
                "type": "radio",
                name: "q" + questionNumber,
                id: "q" + questionNumber,
                value: i + 1,
                required: true
            });

            var labelValue = $("<span>").text(quizDetails.options[i])

            label.append(input, labelValue)
            questionWrapper.append(label)
            var lineBreak = $("<br>");
            questionWrapper.append(lineBreak)
        }
        mainContainer.append(questionWrapper)

    }



    $.get("https://6075a1380baf7c0017fa69e8.mockapi.io/habib/quiz", function (response) {
        var quizDetails = response;
        for (var j = 0; j < quizDetails.length; j++) {
            quizQuestionRendered(quizDetails[j], j + 1)
        }
        submitButton.click(function (e) {
            checkButton(quizDetails)
        })
    })


    var submitButton = $('#submit-button');
    mainContainer.submit(function (e) {
        e.preventDefault();
    })


    function checkButton(quizDetails) {
        var getSelectedValue = $("input[type='radio']:checked");

        if (getSelectedValue.length == quizDetails.length) {
            var enteredAnswer = []
            console.log(quizDetails.length)
            for (var k = 0; k < quizDetails.length; k++) {
                var val = getSelectedValue[k].value;
                enteredAnswer.push(val)
            }
        } else {
            alert("Try all the questions!")
        }
        var score = 0;
        for (var q = 0; q < quizDetails.length; q++) {
            if (enteredAnswer[q] == quizDetails[q].answer) {
                score += 1;
            }
        }

        var resulCard = $('#result-card')
        var myScore = $('#score');
        myScore.text(score + "/" + quizDetails.length);

        resulCard.css("display", "block")

        var cancelButton = $('#cancel-icon');
        cancelButton.click(function (e) {
            resulCard.css("display", "none");
            location.reload('./index.html')

        })

    }

})