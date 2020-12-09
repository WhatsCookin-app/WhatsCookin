import React from 'react'
import {Button, Modal, Form} from 'react-bootstrap'
//was trying to render add recipe modal here but i kept getting errors
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
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload a Recipe</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit} className="d-flex flex-column">
          <Form.Group controlId="name" className="mb-0">
            <Form.Label>Recipe Name</Form.Label>
            <Form.Control
              name="name"
              type="name"
              value={name}
              onChange={handleChange}
              placeholder="Easy Pancake"
              className="mb-1 mt-1"
            />
          </Form.Group>
          <Form.Group controlId="ingredients" className="mb-1 mt-1">
            <Form.Label>Ingredients</Form.Label>
            <Form.Control
              as="textarea"
              rows="5"
              name="ingredients"
              type="ingredients"
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
            {/* <br /> */}
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
              placeholder={
                'In a large bowl, mix flour, sugar, baking powder and salt. Make a well in the center, and pour in milk, egg and oil. Mix until smooth.' +
                '\n' +
                'Heat a lightly oiled griddle or frying pan over medium high heat. Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake. Brown on both sides and serve hot.'
              }
            />
          </Form.Group>
          {name && ingredients && instructions ? (
            <div className="d-flex justify-content-end mt-1">
              <Button variant="success" active type="submit">
                Upload
              </Button>
            </div>
          ) : (
            <div className="d-flex justify-content-end mt-1">
              <Button variant="success" disabled type="submit">
                Upload
              </Button>
            </div>
          )}
        </Form>
      </Modal>
    </div>
  )
}

export default AddRecipe
