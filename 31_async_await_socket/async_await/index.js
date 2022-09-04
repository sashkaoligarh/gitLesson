const url = 'https://jsonplaceholder.typicode.com/todos'
const LOADER_SELECTOR = '.loader'
const LIST_SELECTOR = '.list'
const ERROR_SELECTOR = '.error'

const list = document.querySelector(LIST_SELECTOR)
const error = document.querySelector(ERROR_SELECTOR)

const fetchWithDelay = (ms) => {
  return new Promise ((resolve, reject) => {
    setTimeout(() => {
      fetch(url).then((res) => {
        // resolve(res)
        reject('fetch failed')
      })
    },ms)
  })
}


// const fetchTodos = () => {
//   return fetchWithDelay(2000)
//   .then((res) => {
//     if(res.ok){
//       return res.json()
//     }
//   })
// }

// fetchTodos()
// .then(res => {
//   console.log('response', res);
// })

const AsyncFetch = async () => {
  $(LOADER_SELECTOR).show();
  try {
    const res = await fetchWithDelay(2000)
    const data = await res.json()
    renderToDoList(data)
    console.log('response async', data);
  } catch (e) {
    generateError(e)
  } finally {
    $(LOADER_SELECTOR).hide();
  }
}

const renderToDoList = (data) => {
  const html = data.map(generateItemHtml).join('')
  list.insertAdjacentHTML('beforeend', html)
}

const generateItemHtml = (item) => {
  return `
    <a data-id="${item.userID}">${item.title}</a>
  `
}

const generateError = (text) => {
  error.insertAdjacentHTML('beforeend', `
    <a>Error: ${text}</a>
  `)
}

AsyncFetch()