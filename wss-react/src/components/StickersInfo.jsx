import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import '../css/StickersInfo.css'

export const StickersInfo = ({mostrarSticker, idImage}) => {

	console.log(idImage);

	return (
		<div className="transparent">
			<div className='stickerInfo'>
				<div className="stickerInfo-img">
					<div className="back" onClick={mostrarSticker}><FontAwesomeIcon icon={faCircleXmark} /></div>
				</div>
				<div className="stickerInfo-maincontent">
					<div className="stickerInfo-carrito">
						<FontAwesomeIcon icon={faCartShopping} />
					</div>
					<div className="stickerInfo-content">
						<div className="stickerInfo__title"> Title </div>
						<div className="stickerInfo__description">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem repellat incidunt, ea maxime sit est iusto beatae? Voluptas consectetur 
						</div>
						<div className="stickerInfo__date"> 13-06-2023 </div>
						<div className="stickerInfo__about">
							<div className="about-category"> Category Pro </div>
							<div className="about-likes">
								<div className="likes-icon"></div>
								<div className="likes-number"> 100 Likes </div>
							</div>
						</div>
						<div className="stickerInfo__author">
							<div className="author-img"></div>
							<div className="author-nickname">Autor</div>
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
