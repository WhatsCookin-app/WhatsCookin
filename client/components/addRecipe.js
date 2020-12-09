import React from 'react'
import {Button, Modal, Form} from 'react-bootstrap'

const AddRecipe = ({
  show,
  handleClose,
  handleSubmit,
  name,
  ingredients,
  instructions,
  handleChange
}) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload a Recipe</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Recipe Name</Form.Label>
            <Form.Control
              name="name"
              type="name"
              style={{marginLeft: '100px'}}
              value={name}
              onChange={handleChange}
              placeholder="Easy Pancake"
            />
          </Form.Group>
          <Form.Group controlId="ingredients">
            <Form.Label>Ingredients</Form.Label>
            <Form.Control
              as="textarea"
              rows="5"
              name="ingredients"
              type="ingredients"
              style={{marginLeft: '100px'}}
              value={ingredients}
              onChange={handleChange}
              placeholder={
                '1 cup all-purpose flour' +
                '\n' +
                '2 tablespoons white sugar' +
                '\n' +
                '1 cup milk' +
                '\n' +
                '1 egg, beaten' +
                '\n' +
                '1 cup milk'
              }
            />
          </Form.Group>
          <Form.Group controlId="instructions">
            <Form.Label>Instructions</Form.Label>
            <Form.Control
              name="instructions"
              type="instructions"
              value={instructions}
              onChange={handleChange}
              as="textarea"
              rows="10"
              style={{marginLeft: '100px'}}
              placeholder={
                'In a large bowl, mix flour, sugar, baking powder and salt. Make a well in the center, and pour in milk, egg and oil. Mix until smooth.' +
                '\n' +
                'Heat a lightly oiled griddle or frying pan over medium high heat. Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake. Brown on both sides and serve hot.'
              }
            />
          </Form.Group>
          {name && ingredients && instructions ? (
            <Button
              variant="success"
              active
              type="submit"
              style={{
                marginLeft: '400px',
                marginBottom: '30px'
              }}
            >
              Upload
            </Button>
          ) : (
            <Button
              variant="success"
              disabled
              type="submit"
              style={{
                marginLeft: '400px',
                marginBottom: '30px'
              }}
            >
              Upload
            </Button>
          )}
        </Form>
      </Modal>
    </>
  )
}

export default AddRecipe
