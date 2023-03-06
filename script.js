const startButton = document.querySelector('#startbtn')
const stopButton = document.querySelector('#stopbtn')
const zombies = document.querySelectorAll('.circle_img')
const score = document.querySelector('#kills')
const finalScore = document.querySelector('#finalscore')
const resultAnswer = document.querySelector('#result')
const modalClose = document.querySelector('.closebtn')
const modal = document.querySelector('.overlay')

let countScore = 0
let active = 0
let timer
let pace = 1000
let rounds = 0

const audio2 = new Audio('assets/sinister-lol.mp3')
audio2.play()

const randomZombie = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const zombieClicking = (i) => {
  console.log('clicked zombie' + i)
  if (i === active) {
    const audio = new Audio('assets/22-cal.mp3')
    audio.play()
    countScore++
    rounds--
    score.textContent = countScore
  } else {
    endGame()
  }
}

zombies.forEach((zombie, i) => {
  zombie.addEventListener('click', () => zombieClicking(i))
})
const zombieJump = () => {
  zombies.forEach(zombie => { zombie.style.pointerEvents = 'auto' })
}

const startGame = () => {
  if (rounds >= 10) {
    return endGame()
  }
  startButton.classList.add('hide')
  stopButton.classList.remove('hide')

  zombieJump()
  const nextActive = pickNew(active)

  zombies[nextActive].classList.toggle('active')
  zombies[active].classList.remove('active')

  active = nextActive
  timer = setTimeout(startGame, pace)
  pace = pace - 10
  rounds++

  function pickNew (active) {
    const nextActive = randomZombie(0, 3)

    if (nextActive !== active) {
      return nextActive
    } else {
      return pickNew(active)
    }
  }
}

const endGame = () => {
  const audio3 = new Audio('assets/retro-style-track.mp3')
  clearTimeout(timer)
  modal.classList.remove('hide')
  finalScore.textContent = countScore

  if (countScore === 0) {
    resultAnswer.textContent = 'you suck!'
  } else if (countScore > 0 && countScore <= 15) {
    resultAnswer.textContent = `You only killed ${countScore} my grandma could have done better and shes dead!`
  } else if (countScore > 15) {
    resultAnswer.textContent = `${countScore} wow your a real Zombie Slayer!!!`
  }
  audio3.play()
  stopButton.classList.add('hide')
  startButton.classList.remove('hide')
}

const resetGame = () => {
  window.location.reload()
}

const modulCloseFunc = () => {
  modal.classList.add('hide')
  resetGame()
}

modalClose.addEventListener('click', modulCloseFunc)
startButton.addEventListener('click', startGame)
stopButton.addEventListener('click', endGame)
