import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

interface ListingProps {
  id: string;
  title: string;
  image: string;
  price: number;
  location: string;
  userId: string; // Propriétaire de l'annonce
}

const ListingCard: React.FC<ListingProps> = ({ id, title, image, price, location, userId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    // Vérifier si ce logement est déjà en favoris
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(savedFavorites.includes(id));
  }, [id]);

  const toggleFavorite = () => {
    let savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (isFavorite) {
      savedFavorites = savedFavorites.filter((favId: string) => favId !== id);
    } else {
      savedFavorites.push(id);
    }

    localStorage.setItem("favorites", JSON.stringify(savedFavorites));
    setIsFavorite(!isFavorite);
  };

  const handleDelete = async () => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette annonce ?")) return;
    if (!user || user.uid !== userId) {
      alert("Vous n'avez pas l'autorisation de supprimer cette annonce !");
      return;
    }

    try {
      await deleteDoc(doc(db, "listings", id));
      alert("Annonce supprimée avec succès !");
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Erreur lors de la suppression !");
    }
  };

  return (
    <div className="glass border rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <p className="text-gray-700 font-medium">{location}</p>
        <p className="text-gray-800 font-semibold">{price}€ / nuit</p>
        <div className="mt-4 flex flex-col gap-2">
          {/* Bouton Voir Plus */}
          <Link to={`/listing/${id}`} className="bg-blue-500 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-600">
            Voir Plus
          </Link>

          {/* Bouton Ajouter aux Favoris */}
          <button
            onClick={toggleFavorite}
            className={`px-4 py-2 text-white rounded-lg w-full ${isFavorite ? "bg-red-500" : "bg-gray-500 hover:bg-gray-700"}`}
          >
            {isFavorite ? "❤️ Retirer des favoris" : "🤍 Ajouter aux favoris"}
          </button>

          {/* Boutons Modifier et Supprimer visibles uniquement pour le propriétaire */}
          {user && user.uid === userId && (
            <>
              <Link to={`/edit-listing/${id}`} className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-center hover:bg-yellow-600">
                Modifier
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg w-full hover:bg-red-700"
              >
                Supprimer
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
