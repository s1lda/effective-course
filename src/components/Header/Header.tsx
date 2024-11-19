import { NavLink } from 'react-router-dom';
import logoMarvel from '../../assets/Logos/logoMarvel.png';
import classes from './Header.module.css';
function Header() {
    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <img src={logoMarvel} className={classes.image} alt="logo-marverl" />
                <div className={classes.menu_container}>
                    <NavLink 
                        to="/characters" 
                        className={({ isActive }) => `${classes.menu} ${isActive ? classes.active : ''}`}
                    >
                        <span>Characters</span>
                    </NavLink>
                    <NavLink 
                        to="/comics" 
                        className={({ isActive }) => `${classes.menu} ${isActive ? classes.active : ''}`}
                    >
                        <span>Comics</span>
                    </NavLink>
                    <NavLink 
                        to="/favourites" 
                        className={({ isActive }) => `${classes.menu} ${isActive ? classes.active : ''}`}
                    >
                        <span>Favourites</span>
                    </NavLink>
                </div>
            </div>
        </header>
    );
}

export default Header;