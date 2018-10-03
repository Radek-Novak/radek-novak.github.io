const btns = document.getElementsByClassName('open')

for (let btn of btns) {
  btn.addEventListener('click', e => {
    const { parentElement } = e.target;
    const link = parentElement.getElementsByClassName('link')[0]
    const href = link.getAttribute('href')
    const iframe = parentElement.querySelector('iframe')
    if (iframe) {
      iframe.remove()
      btn.innerHTML = '▶';
    }
    else {
      parentElement.appendChild(createIframe(href))
      btn.innerHTML = '▼';
    }
  })
}

const createIframe = href => {
  const iframe = document.createElement('iframe')
  iframe.setAttribute('src', href)
  iframe.setAttribute('width', 800)
  iframe.setAttribute('height', 800)

  return iframe
}