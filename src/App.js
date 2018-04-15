import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {productName: ""};
  }
  getRandomArrayElement = function(items) {
    return items[Math.floor(Math.random()*items.length)];
  }
  
  
  generateProduct = function() {
    let nameStarters = ["Super", "Mildly", "Quite", "Really", "Fancy", "Ready-made",];
    let nameMiddles = [ "nutty", "peppered", "saucy", "boiled", "tasty", "flaky", "roasted", "hot", "fresh"];
    let nameEnds = ["salad", "chicken", "fish & chips", "Coca-cola", "sparkling water", "sandwich", "tuna pie", "crisps", "sausages"];
    var productName = `${this.getRandomArrayElement(nameStarters)} ${this.getRandomArrayElement(nameMiddles)} ${this.getRandomArrayElement(nameEnds)}`;
    this.setState((prevState, props) => {
      return {productName: productName}
    })
    
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
        <p className="App-intro">
          {this.state.productName}
        </p>
        <button onClick={() => this.generateProduct()}>Generate</button>
      </div>
    );
  }
}

export default App;
