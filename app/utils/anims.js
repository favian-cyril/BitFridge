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

const anims = {
  moreRecipes
}

export default anims
