const htmlElements = {
  body: document.querySelector('body'),
  wrapper: document.querySelector('#table'),
  header: document.createElement('header'),
  table: document.querySelector('.table'),
  script: document.querySelector('script'),
  title: document.createElement('h1'),
  instruction: document.createElement('p'),
  button: document.createElement('button'),
  cells: document.querySelectorAll('td'),
  timer: document.createElement('p')
}

const values = {
  Id: 1,
  time: 0,
  randomNumbersSet: new Set(),
  correctCells: new Set(),
  randomNumbersArray: [],
  
}

document.body.style.backgroundColor = 'gray'
htmlElements.body.insertBefore(htmlElements.header, htmlElements.table)
htmlElements.header.appendChild(htmlElements.title)
htmlElements.title.innerText = 'Guess Cell'
htmlElements.header.appendChild(htmlElements.instruction)
htmlElements.instruction.innerText = 'Guess 7 cells in 30sec! Beware, one cell is deadly!'
htmlElements.instruction.style.fontWeight = 'bold'
htmlElements.body.insertBefore(htmlElements.button, htmlElements.script)
htmlElements.button.addEventListener('click', play)
htmlElements.button.innerText = 'Play'
htmlElements.cells.forEach(i => i.style.width = '30px')
htmlElements.cells.forEach(i => i.style.height = '30px')
htmlElements.cells.forEach(i => i.style.border = '1px solid black')
htmlElements.cells.forEach(e => e.setAttribute('id', `${values.Id++}`))
htmlElements.header.appendChild(htmlElements.timer)
htmlElements.timer.innerText = 'Timer: 30 sec'

let intervalTimer

function play() {
  htmlElements.cells.forEach(e => e.addEventListener('click', guess))
  htmlElements.cells.forEach(e => e.style.backgroundColor = 'white')
  values.time = 30
  countDown()
  intervalTimer = setInterval(countDown, 1000)
  generateRandomNumbers()
}

function generateRandomNumbers() {
  while(values.randomNumbersSet.size < 11) {
    values.randomNumbersSet.add(Math.floor(Math.random()* 100) + 1)
  }
  values.randomNumbersArray = Array.from(values.randomNumbersSet)
    console.log(values.randomNumbersArray);
 }

 function countDown() {
  values.time === 0 ? gameOver() : htmlElements.timer.innerText = `Timer: ${values.time--} sec`
}
 
function guess(e) {
if (values.randomNumbersArray[0] == e.srcElement.id) {
  e.srcElement.style.backgroundColor = 'black'
  return gameOver()
 } else if (values.randomNumbersArray.find(elem => elem == e.srcElement.id)) {  
  values.correctCells.add(e.srcElement.id)
    e.srcElement.style.backgroundColor = 'green'
    console.log(values.correctCells);
 } else e.srcElement.style.backgroundColor = 'brown'
  
 winAlert()
}

function winAlert() {
 if(values.correctCells.size === 7) {
  gameOver()
  htmlElements.instruction.innerText = 'You WIN!!!'
 }
}

function gameOver() {
  clearInterval(intervalTimer)
  htmlElements.cells.forEach(e => e.removeEventListener('click', guess))
  values.time === 0 ? instruction.innerText = 'TIME OUT!!!' : 
  htmlElements.instruction.innerText = 'GAME OVER!'
  htmlElements.timer.innerText = `Timer: 0 sec`
  values.randomNumbersArray.length = 0
  values.randomNumbersSet.clear()
  values.correctCells.clear()
}
