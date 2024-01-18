import css from "./Add.module.scss"
import { addCard } from "../../services/cards.service"
import { ICard } from "../../@types/@types"
import { Link } from "react-router-dom"

const Add = () => {
    const submit = async (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = (Object.fromEntries(formData) as any) as ICard
        alert(JSON.stringify(data))
        try {
            const { _id } = await addCard(data)
            if (_id)
                return alert("Card added!")
            throw new Error("Could not add card, please try again later")
        } catch (e: any) {
            alert(e.message)
        }

    }
    return (
        <form className={css.addMemes} onSubmit={submit}>
            <h3 className={css.namePage}>Add Memes</h3>
            <div className={css.addCardBody}>
                <input type="text" name="image" placeholder="working on the images" className={css.inputBox} />
                <h6 className={css.messageAboutPassword}>The image must be used from imgBB</h6>
                <Link className={css.messageAboutPassword} to={"https://imgbb.com/"}>click here to get there</Link>
                <input type="text" name="nameOfMeme" placeholder="Enter Meme name" className={css.inputBox} />
                <input type="text" name="description" placeholder="Enter Description of ta meme" className={css.inputBox} />
                <button className={css.appButton}>Add Product</button>
            </div>
        </form>
    )
}

export default Add