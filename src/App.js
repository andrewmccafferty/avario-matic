import React, { Component } from 'react';
import './App.css';
 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      loading: true};
  }
  getRandomArrayElement = function(items) {
    return items[Math.floor(Math.random()*items.length)];
  }
  getRandomArrayElement = (items) => {
    return items[Math.floor(Math.random()*items.length)];
  }

generateGoogleImageFromProduct(productName) {
    
  const googleSearchApiKey = process.env.GOOGLE_API_KEY;
  const googleCustomSearchId = process.env.CUSTOM_SEARCH_KEY;
  const GoogleImages = require('./google-images');

  const client = new GoogleImages(googleCustomSearchId, googleSearchApiKey);
  this.setState((prevState, props) => {
    return {
      ...props,
      loading: true
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
          imageUrl: this.getRandomArrayElement(images).url,
          loading: false
      }})
    });
}

  generateProduct = function() {
    let nameStarters = ["Super", "Mildly", "Quite", "Really", "Fancy", "Ready-made",];
    let nameMiddles = [ "nutty", "peppered", "saucy", "boiled", "tasty", "flaky", "roasted", "hot", "fresh"];
    let nameEnds = ["salad", "chicken", "fish & chips", "Coca-cola", "sparkling water", "sandwich", "tuna pie", "crisps", "sausages"];
    var productName = `${this.getRandomArrayElement(nameStarters)} ${this.getRandomArrayElement(nameMiddles)} ${this.getRandomArrayElement(nameEnds)}`;
    
    this.setState((prevState, props) => {
      return {
        ...props,
        productName: productName}
    })
    this.generateGoogleImageFromProduct(productName);
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
          {!this.state.loading && !this.state.imageUrl && <div>:-( No image found for {this.state.productName}</div>}
          {this.state.loading && <div style={{"font-style": "italic"}}>(Loading...)</div>}
        </div>
      </div>
    );
  }
}

export default App;
