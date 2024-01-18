import React, { useContext, useEffect, useState } from "react"
import { BsTrash } from "react-icons/bs";
import { deleteCard, getCards } from "../../services/cards.service"
import { ICard } from "../../@types/@types"
import css from "./Home.module.scss"
import Swal from "sweetalert2"
import AuthContext from "../../context/AuthContext";


const Home = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [cards, setCards] = useState<ICard[]>([])
    useEffect(() => {
        getCards().then(cards => {
            console.log(cards)
            setCards(cards)
        })
    }, [])
    return (
        <>
            <h3 className="m-3" style={{ textAlign: "center" }}>Your Meme Gallery</h3>
            <div className={css.gridContainer}>
                {React.Children.toArray(cards.map(card =>
                    <div className="d-flex flex-column border-5 border-dark rounded w-25">
                        <img className={css.Img}
                            src={card.image} alt="Card cap" style={{
                                objectFit:
                                    "cover",
                                width: "100%", height: "250px", border: "1px solid black"
                            }} />
                        <div style={{
                            backgroundColor: "black", width: "100%", borderBottomLeftRadius: "8px",
                            borderBottomRightRadius: "8px"
                        }}>
                            <div className="m-2">
                                <h5 className={css.Name}>{card.nameOfMeme}</h5>
                            </div>
                            <div className="ms-2 text-muted">
                                <h6 className={css.Price}>{card.description}</h6>
                            </div>
                            {isLoggedIn && <button
                                className="btn btn-danger m-2"
                                onClick={() => {
                                    Swal.fire({
                                        title: "Are you sure you want to delete the card?",
                                        showDenyButton: true,
                                        confirmButtonText: "Yes",
                                        denyButtonText: `No`,
                                    }).then((result) => {

                                        if (result.isConfirmed) {
                                            deleteCard((card as any)._id).then(() => {
                                                setCards(cards.filter(cardOther => (cardOther as any)._id !== (card as any)._id))
                                            })
                                            Swal.fire("Deleted!", "", "success");
                                        } else if (result.isDenied) {
                                            Swal.fire("Keeping the card", "", "info");
                                        }
                                    });
                                }}
                            >
                                <BsTrash />
                            </button>}
                        </div>
                    </div>
                ))}
            </div>
            {!isLoggedIn && <h6 className="m-3" style={{ textAlign: "center" }}>You can add memes only if you're connected</h6>}
        </>
    )
}

export default Home