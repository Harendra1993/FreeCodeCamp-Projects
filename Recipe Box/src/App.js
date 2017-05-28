import React, { Component } from 'react';
import './App.css';
import Header from './main/header';
import Footer from './main/footer';
import AddRecipeForm from './main/addRecipeForm';
import RecipeList from './main/recipeList';
import EditRecipeForm from './main/editRecipeForm';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        showModal: false,
        showEditModal: false,
        recipes: [],
        recipeName: '',
        ingredients: '',
        editRecipeNameInputVal: '',
        editIngredientsInputVal: '',
        recipeToEdit: {recipeName:'',ingredients:''}
      }
   }

   componentDidMount(){
      if(localStorage.getItem('recipes')){
        let recipes = JSON.parse(localStorage.getItem('recipes'))
        this.setState({recipes:recipes})
      }
    }

    closeModal(){
      this.setState({ showModal: false })
    }

    openModal(){
      this.setState({ showModal: true })
    }

    closeEditModal(){
      this.setState({ showEditModal: false })
    }

    openEditModal(recipe){
      this.setState({showEditModal:true,recipeToEdit:recipe})
    }

    handleRecipeInputChange(e){
     this.setState({recipeName: e.target.value})
   }

   handleIngredientsInputChange(e){
     this.setState({ingredients: e.target.value})
   }

   handleRecipeEditInputChange(value){
     this.setState({editRecipeNameInputVal: value})
   }

   handleIngredientsEditInputChange(value){
     this.setState({editIngredientsInputVal: value})
   }

   handleFormSubmit(event){
      event.preventDefault()

      let recipeName = this.state.recipeName, ingredients = this.state.ingredients, recipes = this.state.recipes
      if(!recipeName || !ingredients) {
        return
      }
      let ingredientArr = ingredients.split(',')
      recipes.push({recipeName:recipeName,ingredients:ingredientArr})
      this.setState({recipes:recipes})
      localStorage.setItem('recipes',JSON.stringify(recipes))
      this.setState({recipeName:'',ingredients:''})
      this.closeModal()
    }

    handleDeleteRecipe(recipeIndex,event){
      event.preventDefault()
      let recipes = this.state.recipes.filter((recipe,index)=>{
        return index !== recipeIndex
      })
      this.setState({recipes:recipes})
      localStorage.setItem('recipes',JSON.stringify(recipes))
    }

    handleResetRecipes(recipeIndex,event){
      event.preventDefault()
      this.setState({recipes:[]})
      localStorage.setItem('recipes',JSON.stringify([]))
    }

    handleEditFormSubmit(event){
      event.preventDefault()
      if(this.state.editRecipeNameInputVal === '' && this.state.editIngredientsInputVal===''){
        return; // no changes were made
      }
      let recipes = this.state.recipes
      recipes.map((recipe,index)=>{
        if(recipe.recipeName === this.state.recipeToEdit.recipeName){
          if(this.state.editRecipeName !== ''){
            recipe.recipeName = this.state.editRecipeNameInputVal
          }
          if(this.state.editIngredientsInputVal !== ''){
            let ingredientArr = this.state.editIngredientsInputVal.split(',')
            recipe.ingredients = ingredientArr
          }
        }
      })
      this.setState({recipes:recipes})
      localStorage.setItem('recipes',JSON.stringify(recipes))
      this.closeEditModal()
    }

  render() {
    return (
      <div>
        <Header/>

        <div className="container-fluid clearfix">
          <button
          type="button"
          className="btn btn-success "
          title="Add a New Recipe"
        onClick={this.openModal.bind(this)}
        >
          <i className="fa fa-plus"></i>
          New Recipe
        </button>
        <button type="button"
          className="btn btn-warning float-right"
          title="Reset All Recipes"
          onClick={this.handleResetRecipes.bind(this)}
        >
          <i className="fa fa-trash-o"></i>
          Reset Recipes
        </button>
        <RecipeList recipes={this.state.recipes}
                     handleDeleteRecipe={this.handleDeleteRecipe.bind(this)}
                     handleOpenEditModal={this.openEditModal.bind(this)}
                     editRecipeNameInputVal={this.state.editRecipeNameInputVal}
                     editIngredientsInputVal={this.state.editIngredientsInputVal}
                     />
        </div>
        <Footer/>
          <AddRecipeForm showModal={this.state.showModal} closeModal={this.closeModal.bind(this)}
            handleSubmit={this.handleFormSubmit.bind(this)}  handleRecipeInputChange={this.handleRecipeInputChange.bind(this)}
                      handleIngredientsInputChange={this.handleIngredientsInputChange.bind(this)}/>

            <EditRecipeForm showModal={this.state.showEditModal} closeModal={this.closeEditModal.bind(this)}
              handleSubmit={this.handleEditFormSubmit.bind(this)}
                         handleRecipeEditInputChange={this.handleRecipeEditInputChange.bind(this)}
                         handleIngredientsEditInputChange={this.handleIngredientsEditInputChange.bind(this)}
                          recipe={this.state.recipeToEdit} />
      </div>

    );
  }
}







export default App;
