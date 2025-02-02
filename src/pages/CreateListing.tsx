import { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    location: "",
    price: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("Vous devez être connecté pour créer une annonce !");
      return;
    }

    if (!formData.title || !formData.image || !formData.location || !formData.price || !formData.description) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    try {
      await addDoc(collection(db, "listings"), {
        ...formData,
        price: Number(formData.price),
        userId: user.uid,
        createdAt: new Date().toISOString(),
      });

      alert("Annonce créée avec succès !");
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la création :", error);
      alert("Erreur lors de la création !");
    }
  };

  return (
    <div className="container mx-auto mt-10 p-6 max-w-lg bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Créer une annonce</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Titre" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded-md" />
        <input type="text" name="image" placeholder="URL de l'image" value={formData.image} onChange={handleChange} className="w-full p-2 border rounded-md" />
        <input type="text" name="location" placeholder="Localisation" value={formData.location} onChange={handleChange} className="w-full p-2 border rounded-md" />
        <input type="number" name="price" placeholder="Prix par nuit (€)" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded-md" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded-md" rows={4} />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Créer l'annonce</button>
      </form>
    </div>
  );
};

export default CreateListing;
