import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import IItemCard from "../../interface/IItemCard";
import classes from './ItemCard.module.css';

interface IItemCardProps extends IItemCard {
    onRemoveFromFavorites?: (id: string) => void; 
}

const ItemCard: React.FC<IItemCardProps> = ({ id, name, description, image, type, onRemoveFromFavorites }) => {
    const [isFavorite, setIsFavorite] = useState(false); 

    useEffect(() => {
        const favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
        const isFav = favourites.some((item: IItemCard) => item.id === id); 
        setIsFavorite(isFav);
    }, [id]);

    const toggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault(); 
        let favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
        
        if (isFavorite) {
            favourites = favourites.filter((item: IItemCard) => item.id !== id);
            localStorage.setItem('favourites', JSON.stringify(favourites));
            setIsFavorite(false);
            if (onRemoveFromFavorites) {
                onRemoveFromFavorites(id); 
            }
        } else {
            favourites.push({ id, name, description, image, type });
            localStorage.setItem('favourites', JSON.stringify(favourites));
            setIsFavorite(true);
        }
    };

    return (
            <NavLink to={`/${type}/${id}`}  style={{ textDecoration: 'none' }}>
                <div className={classes.item}>
                    <div className={classes.image}>
                        <img src={image} alt={name} />
                    </div>
                    <div className={classes.name}>
                        <p>{name}</p>
                    </div>
                    <div className={classes.info}>
                        <p>{description}</p>
                    </div>
                    <div
                        className={`${classes.heartIcon} ${isFavorite ? classes.filled : ''}`}
                        onClick={toggleFavorite}
                    >
                        ❤
                    </div>
                </div>
            </NavLink>
    );
};

export default ItemCard;
