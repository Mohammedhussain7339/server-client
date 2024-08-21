import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems } from './redux/slices/counter/counterslices'


function Reduxfile() {
    const count = useSelector((state) => state.counter.value)
    const cart = useSelector((state) => state.counter.cart)
    const cartItems = useSelector(selectCartItems);

    const dispatch = useDispatch()
  
  return (
    <div>
      <h3>{cart.length}</h3>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item._id}>
              {item.name} - Quantity: {item.quantity} - Price: ${item.amount}
            </li>
          ))}
        </ul>
      )}

    {/* <button onClick={() => dispatch(increment())}>increment</button>
    <h1>{count}</h1>
    <button onClick={() => dispatch(decrement())}>decrement</button> */}


    </div>
  )
}

export default Reduxfile
