import css from "./About.module.scss"

const About = () => {
    return (
        <>
            <h3 className={css.namePage}>About the App</h3>
            <div className={css.p}>This App is basiclly for making memes, you can add more meme to the home page and delete them if you want.</div>

            <div className={css.p}>But only if you have a user, have fun</div>
        </>
    )
}

export default About