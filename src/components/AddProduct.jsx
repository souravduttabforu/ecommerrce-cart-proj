import React, { useState } from 'react'
import api from '../api/api'
//taking value and from add item and send it to Home component
const AddProduct = ({ setAddNewData }) => {
    const itemDetails = {
        id: Date.now(),
        title: "",
        price: "",
        image: "",
    }
    const [item, setItem] = useState(itemDetails)

    const handleInputChange = (e) => {

        const { name, value } = e.target
        setItem({
            ...item,
            [name]: value
        })
    }
    const addInputItem = (e) => {
        e.preventDefault()
        api.post(`/`, item)
            .then(response => setAddNewData(response.data))
    }

    return (
        <div className='add_product'>
            <form>
                <input type="text" name='title' value={item.title} placeholder='Product Title' onChange={handleInputChange} />
                <br />
                <input type="text" name='price' value={item.price} placeholder='Product Price' onChange={handleInputChange} />
                <br />
                <input type="text" name='image' value={item.image} placeholder='Image Link' onChange={handleInputChange} />
                <br />

                <button type='submit' onClick={addInputItem}>Add Item</button>
            </form>
        </div>
    )
}

export default AddProduct