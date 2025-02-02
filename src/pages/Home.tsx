import { useState } from "react";
import ListingCard from "../components/ListingCard";

const listings = [
  { id: 1, title: "Appartement cosy à Paris", image: "https://source.unsplash.com/400x300/?apartment", price: 120, location: "Paris, France" },
  { id: 2, title: "Villa avec piscine à Nice", image: "https://source.unsplash.com/400x300/?villa", price: 250, location: "Nice, France" },
  { id: 3, title: "Chalet en montagne", image: "https://source.unsplash.com/400x300/?chalet", price: 180, location: "Chamonix, France" },
];

const Home = () => {
  const [search, setSearch] = useState("");

  // Filtrer les logements en fonction de la recherche
  const filteredListings = listings.filter(
    (listing) =>
      listing.title.toLowerCase().includes(search.toLowerCase()) ||
      listing.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold text-center">Découvrez nos logements</h1>

      {/* Champ de recherche */}
      <div className="mt-6 flex justify-center">
        <input
          type="text"
          placeholder="Rechercher un logement..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-md w-1/2"
        />
      </div>

      {/* Liste des logements filtrés */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {filteredListings.length > 0 ? (
          filteredListings.map((listing) => <ListingCard key={listing.id} {...listing} />)
        ) : (
          <p className="text-center text-gray-500 col-span-3">Aucun logement trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
