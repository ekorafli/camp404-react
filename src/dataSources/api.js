import axios from 'axios';

const BASE_URL = 'http://localhost:3000/';

const getItems = async () => {
    try {
        const {data} = await axios.get(BASE_URL + "items")
        return data.data;
    } catch (error) {
        return null
    }
}

const getItemById = async(id) => {
    try {
        const {data} = await axios.get(BASE_URL + "items/" + id)
        return data.data;
    } catch (error) {
        return null
    }
}

const addItem = async(payload) => {
    try {
        await axios.post(BASE_URL + "items", payload)
        return "success"
    } catch (error) {
        return null
    }
}

const updateItem = async(id, payload) => {
    try {
        await axios.put(BASE_URL + "items/" + id, payload)
        return "success"
    } catch (error) {
        return null
    }
}

const deleteItem = async(id) => {
    try {
        await axios.delete(BASE_URL + "items/" + id)
        return "success"
    } catch (error) {
        return null
    }
}

export {getItems, getItemById, addItem, updateItem, deleteItem}