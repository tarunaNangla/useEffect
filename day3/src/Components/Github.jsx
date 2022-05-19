import React, { useEffect, useState } from 'react'
import axios from "axios"


const getGithubUsers = (q="albseb511",page=1)=>{
  return  axios(" https://api.github.com/search/users",
  {
      method:"GET",
      params:
     { 
        //  q:"albseb511"
        q,
        per_page:5,
        page
     }
  })

}


const Github = () => {

    const [load,setLoading]= useState(true);
    const [data, setData]=useState([]);
    const [query,setQuery]=useState("masai")
    
    const [error,setError]= useState(false)
    const [page,setPage] =useState(1); 
    
    useEffect (()=>{
        getGithubUsers(query,page)
        .then(res=>{
            setLoading(false)
            setData(res.data)
         }) 
        .catch(err=>{
              setLoading(false)
              setError(true)
              console.log(error)
         })
    },[query,page])
 
    const handleClick =(query)=> setQuery(query)
    
    // const handlePageChange =page => setPage(page);
    console.log(query)
    return (
   
    <div>
     {load && <h1>...Loading</h1>}
        
        <h1 onClick={()=>setLoading(!load)}>GitHub user</h1>
    
        <SearchBox handleClick={handleClick} />
        {
            data?.items?.map((ele)=>
              (
                  <GithubCard key={ele.id} {...ele}/>
              ))     
            
        }


<div>
  <button disabled={page===1} onClick={()=>setPage(page-1)}>Prev</button>
  <button  onClick={()=>setPage(page+1)}>Next</button>
</div>
    </div>

  
  )
}

const SearchBox = ({handleClick})=>{
  
  const [text,setText]=useState("");

  return(
    <div>
      
        <input type="text" value={text} onChange={(e)=>setText(e.target.value)} />
        <button onClick={()=>handleClick(text)} >SEARCH</button>
    </div>
  )
}

const GithubCard =(props)=>{
// console.log(props)
  return(
  <>
    <div style={{display:'flex',gap:'20px'}}>
        <img  style={{width:'100px',heigth:'100px'}} src={props.avatar_url} alt={props.login}/>
        <h1>{props.login}</h1>
    </div>
  </>
)
}



export default Github
