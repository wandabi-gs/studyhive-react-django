import axios from 'axios'

export const backendUrl = (url) =>{
    return `http://localhost:3000/${url}`
} 

export const user_register = (data) => {
    let formData = new FormData();

    for(const name in data){
        formData.append(name, data[name])
    }

    return axios.post(
        backendUrl('auth/register'),
        data
    )
}

export const user_login = (data) => {
    let formData = new FormData();

    for(const name in data){
        formData.append(name, data[name])
    }

    return axios.post(
        backendUrl('auth/login'),
        data
    )
}