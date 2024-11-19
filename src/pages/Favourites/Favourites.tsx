import { useEffect, useState } from 'react';
import ItemCard from '../../components/ItemCard/ItemCard';
import IItemCard from '../../interface/IItemCard';
import classes from './Favourites.module.css';

const Favourites = () => {
    const [favouriteItems, setFavouriteItems] = useState<IItemCard[]>([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favourites') || '[]');
        setFavouriteItems(storedFavorites);
    }, []);

    const handleRemoveFromFavorites = (id: string) => {
        setFavouriteItems((prevItems) => prevItems.filter(item => item.id !== id));
    };

    return (
        <section className={classes.favourites}>
            <div className={classes.container}>
                <div className={classes.title}>
                    <p>Избранные элементы ({favouriteItems.length})</p>
                </div>

                <div className={classes.items}>
                    {favouriteItems.length > 0 ? (
                        favouriteItems.map((item) => (
                            <ItemCard
                                key={item.id}
                                {...item}
                                type={item.type}
                                onRemoveFromFavorites={handleRemoveFromFavorites} 
                            />
                        ))
                    ) : (
                        <p className={classes.no_items}>Избранные элементы не найдены</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Favourites;
