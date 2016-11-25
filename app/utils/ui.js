import $ from 'jquery'

const moreRecipes = () => {
  const recipeList = $('.recipe-list-wrapper')
  if (recipeList[0]) {
    recipeList.animate(
      { scrollTop: recipeList[0].scrollHeight },
      { duration: 1000, specialEasing: { height: 'easeOutCirc', width: 'easeOutCirc' } }
    )
  }
}

const showTooltip = (idName, message) => {
  const elemId = `#${idName}`
  window.showTooltip($(elemId))
  $('.tooltip-inner').last().html(message)
}

export default {
  tooltips: {
    showTooltip
  },
  anims: {
    moreRecipes
  }
}
