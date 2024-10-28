import classes from './Footer.module.css'
import logoMarvel from "../../assets/logoMarvel2.svg"
function Footer(){
    let CURRENT_YEAR: number=new Date().getFullYear();
    return(
        <footer className={classes.footer}>
            <div className={classes.container}>
                <div className={classes.content}>
                    <img src={logoMarvel} className={classes.image}/>
                    <div className={classes.text}>
                        <p>Data provided by Marvel. © {CURRENT_YEAR} MARVEL” </p>
                        <a href="https://developer.marvel.com">developer.marvel.com</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer;