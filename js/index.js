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


function allTags() {
  const inputValues = new Set()
  for (let tags of document.getElementsByClassName('card__tags')) {
    for (let tag of tags.innerText.split(', ')) {
      inputValues.add(tag)
    }
  }
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


const elList = document.getElementById('js-list')
const elFilters = document.getElementById('js-filters')
elFilters.getElementsByClassName('card__content')[0].innerHTML = allTags().map(tag => filterCheckbox(tag)).join(' ')



let isotope = new Isotope( '.grid', {
  itemSelector: '.grid-item',
  
  masonry: {
    columnWidth: 200,
    fitWidth: true,
    gutter: 10
  }
})
isotope.arrange({filter: filter(getCheckedInputs(elFilters))})

elFilters.addEventListener('change', function(e) {
  this.checked = !this.checked
  
  isotope.arrange({filter: filter(getCheckedInputs(elFilters))})
})
