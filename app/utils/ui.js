import $ from 'jquery'

const scrollDown = classSelector => {
  const element = $(classSelector)
  console.log(element[0])
  if (element[0]) {
    element.animate(
      { scrollTop: element[0].scrollHeight },
      { duration: 1000, specialEasing: { height: 'easeOutCirc', width: 'easeOutCirc' } }
    )
  }
}

const showTooltip = (idName, message) => {
  console.log(idName)
  window.showTooltip($(`#${idName}`))
  $('.tooltip-inner').last().html(message)
}

export default {
  tooltips: {
    showTooltip
  },
  anims: {
    scrollDown
  }
}
