import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Product extends Component {
  render() {
    const { price, quantity, title, action,onAdd, onRemoveAll} = this.props
    return (
      <div>
        {title} - &#36;{price} {quantity ? `x ${quantity}` : null} {onAdd} {action} {onRemoveAll}
      </div>
    )
  }
}

Product.propTypes = {
  price: PropTypes.number,
  quantity: PropTypes.number,
  title: PropTypes.string,
  action: PropTypes.node,
  onAdd:PropTypes.node,
}
