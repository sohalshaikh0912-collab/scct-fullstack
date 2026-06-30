import React, { useEffect, useState } from 'react'
import axios from 'axios'
const App = () => {
const [data, setdata] = useState([])
const [index, setindex] = useState(1)
 const getdata=async()=>{   
  const response=await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=16`)
  
  setdata(response.data)
 }
 useEffect(function(){
getdata()
 },[index])
 let printUserData='no User Avaibale'

 if(printUserData.length>0){
  printUserData=data.map(function(Elem,idx){
    return <div key={idx}>
   <a href={Elem.url}>
     <div className='h-40 w-44  rounded-xl overflow-hidden   '>
      <img className='object-cover h-full w-full' src={Elem.download_url}  alt="" />
      
      <h2 className='font-bold text-lg'>{Elem.author}</h2>
      </div>
   </a>
       </div>
  })
 }

  return (
    <div  className='bg-black overflow-auto h-screen p-4 text-white'>
    
<div className='flex flex-wrap gap-4'>
{printUserData}
</div>
<div className='flex flex-wrap gap-5 rounded-2xl m-3'>
  <button className='bg-red-500 p-5 font-bold'
  onClick={()=>{
if(index>0){
 setindex( index-1)
}
  }}
  >PRIV</button>
  <h2 className='mt-2 font-extrabold p-5 '>Page {index}</h2>
  <button className='bg-red-500 p-5 font-bold'
  onClick={()=>{
setindex(index+1)
  }}
  >NEXT</button>
</div>
  </div>)
}
export default App