import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
	faCircleXmark, 
	faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { stickerInfo, getUser } from '../service/api';
import '../css/StickersInfo.css'

export const StickersInfo = ({mostrarSticker, idImage}) => {
	const [sticker, setSticker] = useState({})
	const [user, setUser] = useState({})
	

	const callStickerInfo = async () => {
		const response = await stickerInfo(idImage)
		setSticker(response || {})
		callUserInfo(response.S_CREADOR_id)
	}

	const callUserInfo = async (id) => {
		const response = await getUser(id)
		setUser(response || {})
	}

	useEffect (() => {
		callStickerInfo()
		return () => {
		}
	}, [])

	return (
		<div className="transparent">
			<div className='stickerInfo'>
				<div className="stickerInfo-img">
					<div 
						className="back" 
						onClick={mostrarSticker}>
						<FontAwesomeIcon icon={faCircleXmark} />
					</div>
					<img src={sticker.Foto} alt={sticker.nombre} />
				</div>
				<div className="stickerInfo-maincontent">
					<div className="stickerInfo-carrito">
						<FontAwesomeIcon icon={faCartShopping} />
					</div>
					<div className="stickerInfo-content">
						<div className="stickerInfo__title"> {sticker.nombre} </div>
						<div className="stickerInfo__description">
							{sticker.descripcion}
						</div>
						<div className="stickerInfo__date"> {sticker.FechaSubida?.substring(0, 11) } </div>
						<div className="stickerInfo__about">
							<div className="about-category"> Category Pro </div>
							<div className="about-likes">
								<div className="likes-icon"></div>
								<div className="likes-number"> {`${sticker.likes} likes`} </div>
							</div>
						</div>
						<div className="stickerInfo__author">
							<div className="author-img"></div>
							<div className="author-nickname"> {user.username} </div>
						</div>
						<div className="stickerInfo-comments">
							<div className="comment-title"> # comments </div>
							<div className="comments"> Lorem  </div>
						</div>
					</div>
					<div className="stickerInfo-com">
						<div className="com-userimg"></div>
						<div className="com-comment">
							<input className="com-comment__input" placeholder='Comenta algo...'></input>
							<div className="com-comment__enter"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
