import React,{useEffect, useState} from 'react'
import Youtube from 'react-youtube'
import "./RowPost.css"
import {imageUrl,API_KEY} from '../../constants/constants'
import axios  from '../../axios'

function Rowpost(props) {
    const [movies, setMovie] = useState([])
    const [urlId,setUrlId] = useState("")
    useEffect(() => {
        axios.get (props.url).then(response=>{
            console.log(response.data);
            setMovie(response.data.results)
        })
    }, [])
    
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          autoplay: 1,
        },
      };

      const handleMovie = (id)=>{
        //  var prev = null
        console.log(id);
        axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
            if(response.data.results.length!==0){
                setUrlId(response.data.results[0])
            }
        })
      }
  return (
    <div className='row'>
        <h1>{props.title}</h1>
        <div className='posters'>
            {movies.map((obj)=>

            <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? 'smallPoster' : 'poster'} src={`${imageUrl+obj.backdrop_path}`} alt="posters" />

            )}
        </div>
       { urlId && <Youtube opts={opts} videoId={urlId.key} /> }
    </div>
  )
}

export default Rowpost

