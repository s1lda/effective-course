import React from "react";
import classes from './ItemCard.module.css';
import IItemCard from "../../interface/IItemCard";
import { NavLink } from "react-router-dom";

const ItemCard: React.FC<IItemCard> = ({ id, name, description, image, type }) => (
    <NavLink to={`/${type}/${id}`} className={classes.item} style={{ textDecoration: 'none' }}>
        <div className={classes.image}>
            <img src={image} alt={name} />
        </div>
        <div className={classes.name}>
            <p>{name}</p>
        </div>
        <div className={classes.info}>
            <p>{description}</p>
        </div>
    </NavLink>
);

export default ItemCard;
