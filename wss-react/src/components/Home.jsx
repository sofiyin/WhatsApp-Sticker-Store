import React, {useState, useEffect} from 'react'
import { StickersInfo } from './StickersInfo'
import { NavBar } from './NavBar'
import '../css/Home.css'

const BACKEND_URL = 'http://localhost:5000'

export const Home = () => {
  const [showSticker, setshowSticker] = useState(false)
  const [users, setUsers] = useState([])

  const mostrarSticker = () => {
    setshowSticker(!showSticker)
  }

  // Función asíncrona para hacer fetch a flask:
  const fetchStickers = async () => {
    const result = await fetch(`${BACKEND_URL}/personas`)
    const body = await result.json()
    
    return body
  }

  const usuarios = async () => {
    const result = await fetchStickers()
    setUsers(result)
  }

  useEffect (() => {
    usuarios()
    console.log(users);

    return () => {
      
    }
  }, [])

  return (
    <>
      <NavBar />
      <main className="main">
        <table className="person_table">
          <thead>
            <tr>
              <th>id</th>
              <th>username</th>
              <th>email</th>
              <th>password</th>
            </tr>
          </thead>
          <tbody>
            {users.map((person) => (
              <tr key={person.id}>
                <td>{person.id}</td>
                <td>{person.username}</td>
                <td>{person.correo}</td>
                <td>{person.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="gallery">
          <img id='1' onClick={ mostrarSticker }
          src="https://images.pexels.com/photos/3777622/pexels-photo-3777622.jpeg" 
          alt="Michi_1" 
          />
            
          <img onClick={ mostrarSticker }
          src="https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          alt="Michi_2" 
          />

          <img onClick={ mostrarSticker }
          src="https://images.pexels.com/photos/2173872/pexels-photo-2173872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          alt="Michi_3" 
          />

          <img onClick={ mostrarSticker }
          src="https://images.pexels.com/photos/384555/pexels-photo-384555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          alt="Michi_4" 
          />

          <img onClick={ mostrarSticker }
          src="https://images.pexels.com/photos/2361952/pexels-photo-2361952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          alt="Michi_5" 
          />

          <img onClick={ mostrarSticker }
          src="https://images.pexels.com/photos/866496/pexels-photo-866496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          alt="Michi_6" 
          />

          <img onClick={ mostrarSticker }
          src="https://images.pexels.com/photos/3525298/pexels-photo-3525298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          alt="Michi_7" 
          />

          <img onClick={ mostrarSticker }
          src="https://images.pexels.com/photos/3712095/pexels-photo-3712095.jpeg?auto=co3mpress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          alt="Michi_8" 
          />

          <img onClick={ mostrarSticker }
          src="https://images.pexels.com/photos/69932/tabby-cat-close-up-portrait-69932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          alt="Michi_9" 
          />

          <img onClick={ mostrarSticker }
          src="https://i.imgur.com/w5Newyw.jpg" 
          alt="Michi_9" 
          />
        </div>
        { showSticker && <StickersInfo mostrarSticker={mostrarSticker}/> }
      </main>
    </>
  )
}
