import React, { Component } from 'react';
import {Button,Modal} from 'react-bootstrap';
import FieldGroup from '../helpers/fieldGroup';

class AddRecipeForm extends Component {

    render(){
        return(
          <Modal show={this.props.showModal} onHide={this.props.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add a recipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this.props.handleSubmit}>
                <FieldGroup type="text" label="Recipe" placeholder="blueberry pancakes" onChange={this.props.handleRecipeInputChange} />
                <FieldGroup type="textarea" label="Ingredients" placeholder="milk,sugar,flour,butter,blueberries" onChange={this.props.handleIngredientsInputChange} />
                <Button type="submit" bsStyle="btn btn-success"><i className="fa fa-plus"></i> Create</Button>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.closeModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        )
    }
}


export default AddRecipeForm
