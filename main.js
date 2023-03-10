document.body.style.backgroundColor = 'gray'
const body = document.querySelector('body')
const header = document.createElement('header')
const table = document.querySelector('.table')
const script = document.querySelector('script')
body.insertBefore(header, table)
const title = document.createElement('h1')
header.appendChild(title)
title.innerText = 'Guess Cell'
const instruction = document.createElement('p')
header.appendChild(instruction)
instruction.innerText = 'Guess 7 cells in 30sec! Beware, one cell is deadly!'
instruction.style.fontWeight = 'bold'
const button = document.createElement('button')
body.insertBefore(button, script)
button.addEventListener('click', play)
button.innerText = 'Play'
const cells = document.querySelectorAll('td')
cells.forEach(i => i.style.width = '30px')
cells.forEach(i => i.style.height = '30px')
cells.forEach(i => i.style.border = '1px solid black')
let Id = 1
cells.forEach(e => e.setAttribute('id', `${Id++}`))
const timer = document.createElement('p')
header.appendChild(timer)
timer.innerText = 'Timer: 30 sec'
let time
const randomNumbersSet = new Set()
let randomNumbersArray
let intervalTimer
let correctCells = new Set()

function play() {
  cells.forEach(e => e.addEventListener('click', guess))
  cells.forEach(e => e.style.backgroundColor = 'white')
  time = 30
  countDown()
  intervalTimer = setInterval(countDown, 1000)
  generateRandomNumbers()
}

function generateRandomNumbers() {
  while(randomNumbersSet.size < 11) {
    randomNumbersSet.add(Math.floor(Math.random()* 100) + 1)
  }
    randomNumbersArray = Array.from(randomNumbersSet)
    console.log(randomNumbersArray);
 }

 function countDown() {
  time === 0 ? gameOver() : timer.innerText = `Timer: ${time--} sec`
}
 
function guess(e) {
if (randomNumbersArray[0] == e.srcElement.id) {
  e.srcElement.style.backgroundColor = 'black'
  return gameOver()
 } else if (randomNumbersArray.find(elem => elem == e.srcElement.id)) {  
    correctCells.add(e.srcElement.id)
    e.srcElement.style.backgroundColor = 'green'
    console.log(correctCells);
 } else e.srcElement.style.backgroundColor = 'brown'
  
 winAlert()
}

function winAlert() {
 if(correctCells.size === 7) {
  gameOver()
  instruction.innerText = 'You WIN!!!'
 }
}

function gameOver() {
  clearInterval(intervalTimer)
  cells.forEach(e => e.removeEventListener('click', guess))
  time === 0 ? instruction.innerText = 'TIME OUT!!!' : 
  instruction.innerText = 'GAME OVER!'
  timer.innerText = `Timer: 0 sec`
  randomNumbersArray.length = 0
  randomNumbersSet.clear()
  correctCells.clear()
}
