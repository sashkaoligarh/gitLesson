const socketUrl = 'wss://fep-app.herokuapp.com'

const MESSAGE_COMMAND = 'newMessage'
const TYPED_COMMAND = 'typed'


const LIST_SELECTOR = '.list'
const INPUT_MESSAGE_SELECTOR = '.messInput'
const INPUT_NAME_SELECTOR = '.nameInput'
const TYPED = '.typed'
const BUTTON_SEND_SELECTOR = '.button-send'



const list = document.querySelector(LIST_SELECTOR)
const inputMessage = document.querySelector(INPUT_MESSAGE_SELECTOR)
const inputName = document.querySelector(INPUT_NAME_SELECTOR)
const sndButton = document.querySelector(BUTTON_SEND_SELECTOR)

const sendStatus = (status) => {
  const dataToSend = JSON.stringify({
    command:'typed',
    username: inputName.value,
    status:status
  })
  socket.send(dataToSend)
}

inputMessage.addEventListener('focus', () => sendStatus(true))
inputMessage.addEventListener('focusout', () => sendStatus(false))

let socket
const initConnection = () => {
  socket = new WebSocket(socketUrl)
}
initConnection()

socket.onopen = () => {
  console.log('socket opened');
  $(TYPED).hide()
}


socket.onclose = () => {
  console.log('socket closed');
}

socket.onerror = (error) => {
  console.log('error', error);
}

socket.onmessage = (event) => {
  onCommand(event)
}

const SendMessage = () => {
  const dataToSend = JSON.stringify({
    username: inputName.value,
    message: inputMessage.value,
    command:'newMessage'
  })
  socket.send(dataToSend)
}

sndButton.addEventListener('click', SendMessage)
const onCommand = (event) => {
  console.log('event', event);
  const parsedData = JSON.parse(event.data)
  const command = parsedData.command
  if(command === MESSAGE_COMMAND){
    renderMessage(parsedData)
  } 
  if(command === TYPED_COMMAND) {
    if(parsedData.username !== inputName.value){
      if(parsedData.status) {
        $(TYPED).show()
      } else {
        $(TYPED).hide()
      }
    }

  }
}



const renderMessage = (response) => {
  const html = generateMessageHtml(response)
  list.insertAdjacentHTML('beforeend', html)
}

const generateMessageHtml = (item) => {
  return `
    <a >${item.username}</a>
    <a >${item.message}</a>
  `
}