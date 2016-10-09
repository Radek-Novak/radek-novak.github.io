const listItem = (o) => `
<div class="card grid-item">
  <div class="card__name">${o.title}</div>
  <figure class="card__figure">
    <a href="${o.link}">
      <div class="card__image" style='background-image: url("${o.img}");'></div>
    </a>
  </figure>
  <div class="card__content">${o.text}
    <div class="card__tags">${o.tags.join(', ')}</div>
  </div>
</div>
`
const filterCheckbox = (value) => `
  <div class="link-wrap u-noselect">
    <input type="checkbox" value="${value}" id="${value}" hidden checked/>
    <label for="${value}">${value}</label>
  </div>
`

const cardFilters = (content) => `
<div class="card grid-item" id="js-filters">
  <div class="card__content">${content}</div>
</div>
`

const elList = document.getElementById('js-list')


function allTags(links) {
  let inputValues = new Set()
  links.forEach(lnk => lnk.tags.forEach(tag => inputValues.add(tag)))

  // convert to array
  return [...inputValues]
}

function filter(checkedInputs) {
  return function(curEl) {

    const tagEl = curEl.querySelector('.card__tags')
    if (!tagEl) return true

    const tags = tagEl.innerHTML.split(', ')

    return checkedInputs.some(ci => tags.some(tag => tag == ci))
  }
}

function getCheckedInputs(elFilters) {
  const inputs = elFilters.getElementsByTagName('input')
  return Array.from(inputs)
    .filter(elFilter => elFilter.checked)
    .map(input => input.value)
}

fetch('src/links.json')
  .then(links => links.json())
  .then(links => {
    elList.innerHTML += cardFilters(allTags(links).map(tag => filterCheckbox(tag)).join(' '))

    elList.innerHTML += (links.map( link => listItem(link)).join(''))

    let isotope = new Isotope( '.grid', {
      itemSelector: '.grid-item',

      masonry: {
        columnWidth: 200,
        fitWidth: true,
        gutter: 10
      }
    })

    const elFilters = document.getElementById('js-filters')

    elFilters.addEventListener('change', function(e) {
      this.checked = !this.checked

      isotope.arrange({filter: filter(getCheckedInputs(elFilters))})
    })

  })
