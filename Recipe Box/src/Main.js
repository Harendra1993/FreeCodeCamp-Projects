import React, { Component } from 'react';
import './App';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    const recipes = [];

       let recipeData = {};
       if (localStorage.getItem(itemName)) {
         recipeData = JSON.parse(localStorage.getItem(itemName));
       } else {
         localStorage.setItem(itemName, JSON.stringify(DEFAULT_RECIPES));
         recipeData = DEFAULT_RECIPES;
       }
        this.state = {
          recipes: recipeData,
      activeRecipe: null,
      warningAction: { name: '', description: '', function: null },
    };

   }
   renderRecipes() {
       const recipeList = [];
       const recipes = this.state.recipes;

       for (const key in recipes) {
         const active = this.state.activeRecipe == key;
         recipeList.push((
           <Recipe
             onUpdateRecipe={this.onUpdateRecipe}
             onClick={this.onClickRecipe}
             active={active}
             recipe={recipes[key]}
             onDelete={this.onDeleteRecipe}
             />
         ));
       }

       return recipeList;
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
          onClick={this.addRecipe}
        >
          <i className="fa fa-plus"></i>
          New Recipe
        </button>
        <button type="button"
          className="btn btn-warning float-right"
          title="Reset All Recipes"
          onClick={this.onReset}
        >
          <i className="fa fa-trash-o"></i>
          Reset Recipes
        </button>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
