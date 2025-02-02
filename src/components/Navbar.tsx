import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <nav className="glass fixed top-0 w-full flex justify-between px-10 py-4 z-10">
      <h1 className="text-xl font-bold text-white">🏡 Airbnb Clone</h1>
      <ul className="flex space-x-6 text-white">
        <li><Link to="/" className="hover:text-gray-200 transition">Accueil</Link></li>
        {user ? (
          <>
            <li>
              <Link to="/create-listing" className="hover:text-gray-300">
                📌 Créer une annonce
              </Link>
            </li>

            <li>
              <Link to="/favorites" className="hover:text-blue-500">❤️ Favoris</Link>
            </li>
            <li className="text-white">Bienvenue, {user.displayName || "Utilisateur"}</li>
            <li>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition">
                Déconnexion
              </button>
            </li>
          </>
        ) : (
          <li><Link to="/login" className="hover:text-gray-200 transition">Se connecter</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
