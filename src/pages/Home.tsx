import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import ListingCard from "../components/ListingCard";

// Annonces fixes en cas d'absence de Firebase
const staticListings = [
  {
    id: 1,
    title: "Appartement cosy à Paris",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    price: 120,
    location: "Paris, France",
  },
  {
    id: 2,
    title: "Villa avec piscine à Nice",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    price: 250,
    location: "Nice, France",
  },
  {
    id: 3,
    title: "Chalet en montagne à Chamonix",
    image: "https://images.unsplash.com/photo-1502672023488-70e25813eb80",
    price: 180,
    location: "Chamonix, France",
  },
  {
    id: 4,
    title: "Loft moderne à Lyon",
    image: "https://images.unsplash.com/photo-1571055107559-3e67626f86f2",
    price: 140,
    location: "Lyon, France",
  },
  {
    id: 5,
    title: "Maison de campagne en Provence",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    price: 200,
    location: "Provence, France",
  },
  {
    id: 6,
    title: "Appartement avec terrasse à Bordeaux",
    image: "https://images.unsplash.com/photo-1560185007-a5ef5b951a04",
    price: 160,
    location: "Bordeaux, France",
  },
  {
    id: 7,
    title: "Penthouse à Marseille",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    price: 300,
    location: "Marseille, France",
  },
  {
    id: 8,
    title: "Studio économique à Toulouse",
    image: "https://images.unsplash.com/photo-1598928636135-d6ddca51f3d8",
    price: 90,
    location: "Toulouse, France",
  },
];

const Home = () => {
  const [listings, setListings] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "listings"));
        const firebaseListings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Ajouter les annonces Firebase aux annonces fixes
        setListings([...staticListings, ...firebaseListings]);
      } catch (error) {
        console.error("Erreur lors de la récupération des annonces:", error);
        // Si erreur Firebase, on garde uniquement les annonces fixes
        setListings(staticListings);
      }
    };

    fetchListings();
  }, []);

  // Filtrer les logements en fonction de la recherche
  const filteredListings = listings.filter(
    (listing) =>
      listing.title.toLowerCase().includes(search.toLowerCase()) ||
      listing.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-20 p-6">
      <h1 className="text-4xl font-bold text-center text-white drop-shadow-lg">
        🏡 Découvrez nos logements
      </h1>

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
          filteredListings.map((listing) => (
            <div key={listing.id} className="glass">
              <ListingCard {...listing} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">Aucun logement trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
