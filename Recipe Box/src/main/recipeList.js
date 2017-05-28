import React, { Component } from 'react';
import {Button,Panel,ButtonToolbar,Accordion,ListGroupItem,ListGroup} from 'react-bootstrap';


class RecipeList extends Component {
  handleOpenEditModal(recipe,event) {
    this.props.handleOpenEditModal(recipe)
  }
    render(){

        let recipes = this.props.recipes.map((recipe,index)=>{
          return (
            <Panel header={recipe.recipeName} eventKey={index} key={index}>
              <IngredientsList ingredients={recipe.ingredients}  />
              <ButtonToolbar>
                <Button bsStyle="btn btn-danger" onClick={this.props.handleDeleteRecipe.bind(null,index)}><i className="fa fa-trash-o"></i> Delete</Button>
                <Button bsStyle="btn btn-primary" onClick={this.handleOpenEditModal.bind(this,recipe)}><i className="fa fa-pencil-square-o"></i> Edit</Button>
                </ButtonToolbar>

            </Panel>
          )
      })
      return (
        <Accordion>
          {recipes}
        </Accordion>
      )
    }
}

class IngredientsList extends Component {
  render() {
    let ingredients = this.props.ingredients.map((ingredient,index)=>{
      return <ListGroupItem key={index}>{ingredient}</ListGroupItem>
    })
    return (
      <ListGroup>
      {ingredients}
    </ListGroup>
    )
  }
}

export default RecipeList
