import React from 'react'
import '../css/StickersInfo.css'

export const StickersInfo = ({setshowSticker}) => {

    const ocultarSticker = () => {
        setshowSticker(false)
    }

    return (
        <div className='stickerInfo'>
            <div className="stickerInfo-img">
                <button onClick={ocultarSticker}>Enviar mensaje</button>
            </div>
            <div className="stickerInfo-content">
                
            </div>
        </div>
    )
}
