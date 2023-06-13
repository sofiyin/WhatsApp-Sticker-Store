import React, {useState} from 'react'
import '../css/StickersContent.css'
import { StickersInfo } from './StickersInfo'

export const StickersContent = () => {

    const [showSticker, setshowSticker] = useState(false)

    const mostrarSticker = () => {
        setshowSticker(true)
    }

    return (
        <main className="main">
            <div className="gallery">
                <img id='1' onClick={ mostrarSticker }
                src="https://images.pexels.com/photos/3777622/pexels-photo-3777622.jpeg" 
                alt="Michi_1" 
                />
                
                <img 
                src="https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Michi_2" 
                />

                <img 
                src="https://images.pexels.com/photos/2173872/pexels-photo-2173872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Michi_3" 
                />

                <img 
                src="https://images.pexels.com/photos/384555/pexels-photo-384555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Michi_4" 
                />

                <img 
                src="https://images.pexels.com/photos/2361952/pexels-photo-2361952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Michi_5" 
                />

                <img 
                src="https://images.pexels.com/photos/866496/pexels-photo-866496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Michi_6" 
                />

                <img 
                src="https://images.pexels.com/photos/3525298/pexels-photo-3525298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Michi_7" 
                />

                <img 
                src="https://images.pexels.com/photos/3712095/pexels-photo-3712095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Michi_8" 
                />

                <img 
                src="https://images.pexels.com/photos/69932/tabby-cat-close-up-portrait-69932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Michi_9" 
                />

                { showSticker && <StickersInfo setshowSticker={setshowSticker}/> }
            </div>
        </main>
    )
}
