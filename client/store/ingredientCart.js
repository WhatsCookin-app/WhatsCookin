import axios from 'axios'

//Action Types

//Relates to NavBar - when cart is clicked.
export const GOT_INGREDIENT_CART = 'GOT_INGREDIENT_CART'

//getting a new home and adding it to our cart
export const ADD_TO_INGREDIENT_CART = 'ADD_TO_INGREDIENT_CART'

//remove a home from the cart
const REMOVE_FROM_INGREDIENT_CART = 'REMOVE_FROM_INGREDIENT_CART'

//Action Creators

export const gotIngredientCart = cart => {
  return {type: GOT_INGREDIENT_CART, cart}
}

export const addToIngredientCart = ingredient => {
  return {type: ADD_TO_INGREDIENT_CART, ingredient}
}

const deleteItemFromCart = recipeId => {
  return {type: REMOVE_FROM_INGREDIENT_CART, recipeId}
}

function cartReducer(state = cart, action) {
  switch (action.type) {
    case GOT_INGREDIENT_CART:
      return action.cart
    case ADD_TO_INGREDIENT_CART:
  }
}
