import React, { Component } from 'react';
import './App.css';
import { getRandomArrayElement } from './utils';
import { getRandomRecipe } from './recipes'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      loading: true,
      recipeLoading: true,
      errorLoading: false,
      recipe: null};
  }

  

generateGoogleImageFromProduct(productName) {
    
  let googleSearchApiKey = "AIzaSyDyCE7T9DHO-lISGuHEhHxOYYv10FlVZ8Q";
  let googleCustomSearchId = "018444961947954724953:rpnwzm1dq3c";

  const GoogleImages = require('./google-images');

  const client = new GoogleImages(googleCustomSearchId, googleSearchApiKey);
  this.setState((prevState, props) => {
    return {
      ...props,
      loading: true,
      errorLoading: false
    }
  });

  client.search(productName)
    .then(images => {
      if (!images || !images.length) {
        this.setState((prevState, props) => {
          return {
            ...props,
            imageUrl: null,
            loading: false
          }
        }); 
      }
      this.setState((prevState, props) => {
        return {
          ...props,
          imageUrl: getRandomArrayElement(images).url,
          loading: false
      }})
    }).catch((e) => {
      this.setState((prevState, props) => {
        return {
          ...props,
          imageUrl: null,
          loading: false,
          errorLoading: true
      }})
      console.error(e);
    });
}

generateRecipe = (nameMiddle, nameEnd) => {
  this.setState((prevState, props) => {
    return {
      ...props,
      recipeLoading: true
    }
  })  
  getRandomRecipe(`${nameMiddle} ${nameEnd}`).then((recipe) => {
      this.setState((prevState, props) => {
        return {
          ...props,
          recipe: recipe,
          recipeLoading: false
        };
      })
  }).catch((e) => {
    console.error(e);
    this.setState((prevState, props) => {
        return {
          ...props,
          recipeLoading: false
        }
    });
  });
}
  generateProduct = function() {
    let nameStarters = ["Super", "Mildly", "Quite", "Really", "Fancy", "Ready-made",];
    let nameMiddles = [ "nutty", "peppered", "saucy", "boiled", "tasty", "flaky", "roasted", "hot", "fresh"];
    let nameEnds = ["salad", "chicken", "fish & chips", "Coca-cola", "sparkling water", "sandwich", "tuna pie", "crisps", "sausages"];
    var start = getRandomArrayElement(nameStarters);
    var middle = getRandomArrayElement(nameMiddles);
    var end = getRandomArrayElement(nameEnds);
    var productName = `${start} ${middle} ${end}`;
    
    this.setState((prevState, props) => {
      return {
        ...props,
        productName: productName}
    })
    this.generateGoogleImageFromProduct(productName);
    this.generateRecipe(middle, end);
  }

  componentWillMount = function() {
    this.generateProduct();
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Avari-o-matic</h1>
        </header>
        <div className="App-intro">
          <div><button onClick={() => this.generateProduct()}>Generate</button></div>
          <div>{this.state.productName}</div>
          {!this.state.loading && this.state.imageUrl && <div><img style={{"width" : "300px"}} src={this.state.imageUrl}/></div>}
          {!this.state.recipeLoading && !this.state.imageUrl && this.state.recipe && this.state.recipe.image && <div><img style={{"width" : "300px"}} src={this.state.recipe.image}/></div>}
          {this.state.loading && <div style={{"font-style": "italic"}}>(Loading image...)</div>}
          {this.state.recipeLoading && <div>Loading recipe...</div>}
          {!this.state.recipeLoading && this.state.recipe && <div>
            <h2>Make your own {this.state.productName}</h2>
              <h3>Ingredients</h3>
              <div>
                {this.state.recipe.ingredientLines.map((line, index) => {
                  return <div key={index}>{line}</div>
                })}
                </div>
                {this.state.recipe && this.state.recipe.url && <div><a href={this.state.recipe.url} target="_blank">Full recipe</a></div>}
          <hr/>
          </div>
        }
        </div>
      </div>
    );
  }
}

export default App;
