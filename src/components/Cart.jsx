import React from 'react'
import { AiFillDelete } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { toast } from "react-hot-toast"
const Cart = () => {
    //sending state to redux using dispatch and reciving from redux using useSelector
    const { cartItems, totalAmount } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    //operation in the state
    const increaseQnt = (id) => {
        dispatch({ type: "addToCart", payload: { id } })
        dispatch({ type: 'calculateTotal' })
    }
    const decreaseQnt = (id) => {
        dispatch({ type: "decreaseQnt", payload: id })
        dispatch({ type: 'calculateTotal' })
    }
    const deleteItem = (id) => {
        toast.success('Item Removed From Cart')
        dispatch({ type: "deleteItem", payload: id })
        dispatch({ type: 'calculateTotal' })
    }
    return (
        <div className='cart'>
            <div className="cart_items">
                //mappign through cartItems from redux nad show the state from redux
                {cartItems.map((item) => (
                    <Cartcard key={item.id}
                        id={item.id}
                        title={item.title}
                        imgSrc={item.imgSrc}
                        price={item.price}
                        quantity={item.quantity}
                        increaseQnt={increaseQnt}
                        decreaseQnt={decreaseQnt}
                        deleteItem={deleteItem}
                    />
                ))}
            </div>
            <div className="cart_amount">
                <h1>Total:${totalAmount}</h1>
                <button>Buy Now</button>
            </div>
        </div>
    )
}
const Cartcard = ({ id, title, imgSrc, price, quantity, decreaseQnt, increaseQnt, deleteItem }) => {
    return (
        //card to show the data
        <div className='card'>
            <img src={imgSrc} alt={title} />
            <div className='card_title'>
                <h2>{title}</h2>
                <h2>Cost: ${price}</h2>
            </div>
            <div className='card_button'>
                <button onClick={() => decreaseQnt(id)}>-</button>
                <p>{quantity}</p>
                <button onClick={() => increaseQnt(id)}>+</button>
                <AiFillDelete onClick={() => deleteItem(id)} />
            </div>
        </div>
    )
}
export default Cart