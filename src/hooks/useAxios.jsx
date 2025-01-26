import axios from 'axios'
import React from 'react'

export const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

const useAxios = () => {
  return (
    <div>useAxios</div>
  )
}

export default useAxios