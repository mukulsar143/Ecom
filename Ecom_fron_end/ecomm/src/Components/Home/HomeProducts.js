import { useState } from "react"

export default function HomeProducts () {
const [search, setsearch] = useState('')  
 return fetch(`http://127.0.0.1:8000/api/products/?search${search}`).then((res)=>res.json())
 .then((resp)=> setsearch(resp))
}