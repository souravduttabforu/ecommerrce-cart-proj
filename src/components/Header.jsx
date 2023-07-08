import React from 'react'
import { Link } from 'react-router-dom'

import { AiFillShopping, AiOutlineUser } from "react-icons/ai"
import { useSelector } from "react-redux"
//upper part of the app whre u can go between home cart and ad item
const Header = () => {
    const { cartItems } = useSelector(state => state.cart)
    return (
        <div className='header'>
            <div className='header_left_container'>
                <Link to={'/'}>HOME</Link>
                <Link to={'/addproduct'}>ADD ITEM</Link>
            </div>
            <div className='header_right_container'>

                <Link to={'/cart'}><AiFillShopping />
                    <div className='cart_count'>{cartItems.length}</div>
                </Link>
                <AiOutlineUser />
            </div>
        </div>
    )
}

export default Header