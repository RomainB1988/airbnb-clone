import { useState, useEffect } from "react";
import ListingCard from "../components/ListingCard";

const listings = [
  { id: 1, title: "Appartement cosy à Paris", image: "https://source.unsplash.com/400x300/?apartment", price: 120, location: "Paris, France" },
  { id: 2, title: "Villa avec piscine à Nice", image: "https://source.unsplash.com/400x300/?villa", price: 250, location: "Nice, France" },
  { id: 3, title: "Chalet en montagne", image: "https://source.unsplash.com/400x300/?chalet", price: 180, location: "Chamonix, France" },
];

const Favorites = () => {
  const [favoriteListings, setFavoriteListings] = useState<number[]>([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavoriteListings(savedFavorites);
  }, []);

  return (
    <div className="container mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold text-center">❤️ Mes Favoris</h1>

      {favoriteListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {listings
            .filter((listing) => favoriteListings.includes(listing.id))
            .map((listing) => (
              <ListingCard key={listing.id} {...listing} />
            ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">Aucun logement en favoris.</p>
      )}
    </div>
  );
};

export default Favorites;
