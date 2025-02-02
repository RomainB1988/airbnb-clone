import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchListing = async () => {
      if (!id) return;
      const listingRef = doc(db, "listings", id);
      const docSnap = await getDoc(listingRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(data.title);
        setLocation(data.location);
        setPrice(data.price);
        setDescription(data.description);
        setImage(data.image);
      } else {
        console.error("Annonce non trouvée !");
        navigate("/");
      }
    };

    fetchListing();
  }, [id, navigate]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !user) return;

    try {
      await updateDoc(doc(db, "listings", id), {
        title,
        location,
        price: Number(price),
        description,
        image,
      });
      alert("Annonce mise à jour avec succès !");
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Erreur lors de la mise à jour !");
    }
  };

  return (
    <div className="container mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold text-center">Modifier l'annonce</h1>
      <form onSubmit={handleUpdate} className="max-w-md mx-auto mt-6 space-y-4">
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded-md w-full"
        />
        <input
          type="text"
          placeholder="Lieu"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 border rounded-md w-full"
        />
        <input
          type="number"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-2 border rounded-md w-full"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded-md w-full"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="p-2 border rounded-md w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600">
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default EditListing;
