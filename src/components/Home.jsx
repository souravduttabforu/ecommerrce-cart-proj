import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast"
import api from '../api/api.js';



const Home = ({ addNewData }) => {

  //to fetch from api and show data on main page
  const [listItems, setListItems] = useState([])
  const addNew = () => {
    const storeList = [...listItems]
    storeList.upshift(addNewData)
    setListItems(storeList)
  }
  useEffect(() => {

    api.get('/').then(response => setListItems(response.data))
    if (listItems.length > 0) addNew()

  }, [setListItems])


  //sending state to redux Store
  const dispatch = useDispatch()
  const addToCart = (addToCartItem) => {
    toast.success("Item Added To Cart")
    dispatch({ type: "addToCart", payload: addToCartItem })
    dispatch({ type: 'calculateTotal' })
  }

  //operation on click on edit buton on card
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editId, setEditId] = useState()
  const editItem = (id) => {
    setIsEditOpen(true)
    setEditId(id)
  }
  const editItemDetails = {
    id: 0,
    title: "",
    price: "",
    image: "",
  }
  const [editInputItem, setEditInputItem] = useState(editItemDetails)
  const editInput = (e) => {
    //  const { name, value } = e.target
    setEditInputItem({
      ...editInputItem,
      [e.target.name]: e.target.value
    })
  }
  const submitEditItem = (id) => {
    const storeEditInputItem = { ...editInputItem }
    storeEditInputItem.id = id
    api.put(`/${id}`, storeEditInputItem)
      .then(response => setEditInputItem(response.data))
    //setEditInputItem(storeEditInputItem)
    const storeListItem = [...listItems]
    const objId = listItems.findIndex(obj => obj.id === id)
    console.log(objId)
    storeListItem[objId] = editInputItem
    setListItems(storeListItem)
    setIsEditOpen(false)
  }

  return (
    <div className='home'>
      //itrateing through items and show the components
      {listItems.map((item) => (
        isEditOpen && item.id === editId ? <EditCard
          key={item.id}
          id={item.id}
          editInputItem={editInputItem}
          editInput={editInput}
          submitEditItem={submitEditItem} /> :
          <ItemCard key={item.id}
            id={item.id}
            title={item.title}
            imgSrc={item.image}
            price={item.price}
            handler={addToCart}
            editItem={editItem}
          />
      ))}
    </div>
  )
}
//normal item component
const ItemCard = ({ id, title, price, imgSrc, handler, editItem }) => {
  return (
    <div className='item_card'>
      <img src={imgSrc} alt={title} />
      <h2>{title}</h2>

      <div className='card_btns' >
        <h2>${price}</h2>
        <button onClick={() => editItem(id)}>EDIT</button>
        <button onClick={() => handler({ id, title, price, imgSrc, quantity: 1 })}>ADD TO CART</button>
      </div>
    </div>
  )
}
// card component when click on edit
const EditCard = ({ id, editInputItem, editInput, submitEditItem }) => {
  return <div className='edit_card'>
    <label>Product Name</label>
    <input type="text" name="title" value={editInputItem.title} onChange={editInput} />
    <label>Price</label>
    <input type="text" name="price" value={editInputItem.price} onChange={editInput} />
    <label> Image URL</label>
    <input type="text" name='image' value={editInputItem.image} onChange={editInput} />

    <button onClick={() => submitEditItem(id)}>Submit Edit</button>
  </div>
}
export default Home