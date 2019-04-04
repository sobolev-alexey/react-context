import React, { Component } from 'react';

import ShopContext from './shop-context';

class GlobalState extends Component {
  state = {
    products: [
      { id: 'product1', title: 'Product 1', price: 10 },
      { id: 'product2', title: 'Product 2', price: 20 },
      { id: 'product3', title: 'Product 3', price: 30 },
    ],
    cart: []
  };

  addProductToCart = product => {
    console.log('Adding product', product);
    const updatedCart = [...this.state.cart];
    const updatedItemIndex = updatedCart.findIndex(
      item => item.id === product.id
    );

    if (updatedItemIndex < 0) {
      updatedCart.push({ ...product, quantity: 1 });
    } else {
      const updatedItem = {
        ...updatedCart[updatedItemIndex]
      };
      updatedItem.quantity++;
      updatedCart[updatedItemIndex] = updatedItem;
    }
    this.setState({ cart: updatedCart });
  };

  removeProductFromCart = productId => {
    console.log('Removing product with id: ' + productId);
    const updatedCart = [...this.state.cart];
    const updatedItemIndex = updatedCart.findIndex(
      item => item.id === productId
    );

    const updatedItem = {
      ...updatedCart[updatedItemIndex]
    };
    updatedItem.quantity--;
    if (updatedItem.quantity <= 0) {
      updatedCart.splice(updatedItemIndex, 1);
    } else {
      updatedCart[updatedItemIndex] = updatedItem;
    }
    this.setState({ cart: updatedCart });
  };

  render() {
    return (
      <ShopContext.Provider
        value={{
          products: this.state.products,
          cart: this.state.cart,
          addProductToCart: this.addProductToCart,
          removeProductFromCart: this.removeProductFromCart
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}

export default GlobalState;
