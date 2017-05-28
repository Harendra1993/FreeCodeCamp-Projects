import React, { Component } from 'react';
import {Button,Modal} from 'react-bootstrap';
import FieldGroup from '../helpers/fieldGroup';

class EditRecipeForm extends Component {
  handleRecipeEditInputChange(e){
    this.props.handleRecipeEditInputChange(e.target.value)
  }
  handleIngredientsEditInputChange(e){
    this.props.handleIngredientsEditInputChange(e.target.value)
  }
    render(){
        return(
          <Modal show={this.props.showModal} onHide={this.props.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit recipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this.props.handleSubmit.bind(this)}>
              <FieldGroup type="text" label="Recipe" placeholder="blueberry pancakes" defaultValue={this.props.recipe.recipeName}
              value={this.props.editRecipeNameInputVal}
              onChange={this.handleRecipeEditInputChange.bind(this)}  />

                <FieldGroup type="textarea" label="Ingredients" placeholder="milk,sugar,flour,butter,blueberries"
                defaultValue={this.props.recipe.ingredients}
                value={this.props.editIngredientsInputVal}
                onChange={this.handleIngredientsEditInputChange.bind(this)}  />

              <Button type="submit" bsStyle="btn btn-success"><i className="fa fa-floppy-o"></i> Save changes</Button>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.closeModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        )
    }
  }

    export default EditRecipeForm
