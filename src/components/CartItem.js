import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Product from './Product'

export default class CartItem extends Component {
  render() {
    const { price, quantity, title, onRemove, onAdd, onRemoveAll} = this.props

    return (
      <Product price={price} quantity={quantity} title={title}
               action={<button onClick={onRemove}>{' - '}</button>}
                onAdd={<button onClick={onAdd}>{' + '}</button>}
               onRemoveAll={ <button onClick={onRemoveAll}>{' X '}</button>}
      />
    )
  }
}

CartItem.propTypes = {
  price: PropTypes.number,
  quantity: PropTypes.number,
  title: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
  onRemoveAll:PropTypes.func.isRequired,
  onAdd:PropTypes.func.isRequired,
}
