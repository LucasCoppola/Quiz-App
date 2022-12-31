const score = document.getElementById('correct-score')
const totalQuestions = document.getElementById('total-question')
const question = document.getElementById('question')
const playAgainBtn = document.getElementById('play-again')
const result = document.getElementById('result')
const options = document.querySelectorAll('.quiz-options')
const category = document.querySelector('.quiz-category')

let scoreCount = 0;
let askedQuestions = 0;
let totalQuestion = 10;
let currentQuestionId = null;


document.addEventListener('DOMContentLoaded', () => {
  loadQuestion()
  score.textContent = scoreCount
  totalQuestions.textContent = totalQuestion

})

const loadQuestion = async () => {
  const res = await axios.get('https://the-trivia-api.com/api/questions?limit=1&region=AR&difficulty=easy');
  result.innerHTML = ""
  showQuestion(res.data[0])
  currentQuestionId = res.data[0].id
}

const showQuestion = async (res) => {
  let correctAnswer = res.correctAnswer
  let incorrectAnswers = res.incorrectAnswers
  let optionsList = incorrectAnswers
  optionsList.splice(Math.floor(Math.random() * (incorrectAnswers.length + 1)), 0, correctAnswer)

  options.forEach((item, i) => {
    const optionIndex = optionsList[i]
    item.innerHTML = optionIndex
  });

  question.textContent = res.question
  category.textContent = res.category

  checkOption(res)
}

const checkOption = async(res) => {
  options.forEach((option) => {
    option.addEventListener('click', () => {
      if(res.id === currentQuestionId){
        let selectedOption = option.textContent
        if(selectedOption == res.correctAnswer){
          scoreCount++
          result.innerHTML = `<p>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                                Correct Answer!
                              </p>`;
        }else{
          result.innerHTML = `<p>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
                                Incorrect Answer!
                              </p>
                              <p><small><b>Correct Answer: </b> ${res.correctAnswer}</small>
                              </p>`
        }
        checkCount()
        }  
    })
  })
}

const checkCount = () => {
  askedQuestions++
  score.textContent = scoreCount
  totalQuestions.textContent = totalQuestion
  if(scoreCount === totalQuestion){
    result.textContent = "Holy shit, you're smart asf!!"
    playAgainBtn.style.display = "block"
  }else if(askedQuestions === 20){
    result.textContent = "Give it another shot!!"
    playAgainBtn.style.display = "block"
  }else{
     setTimeout(() => {
      loadQuestion()
    }, 500)
  }
}

playAgainBtn.addEventListener('click', () => {
  result.innerHTML = ""
  askedQuestions = 0
  scoreCount = 0
  currentQuestionId = null
  score.textContent = scoreCount
  totalQuestions.textContent = totalQuestion
  playAgainBtn.style.display = "none"
  loadQuestion()
})
