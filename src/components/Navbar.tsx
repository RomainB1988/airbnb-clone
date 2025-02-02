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
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Airbnb Clone</h1>
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-white hover:text-gray-200 transition">Accueil</Link></li>
          {user ? (
            <>
              <li className="text-white">Bienvenue, {user.displayName || "Utilisateur"}</li>
              <li>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition">
                  Déconnexion
                </button>
              </li>
            </>
          ) : (
            <li><Link to="/login" className="text-white hover:text-gray-200 transition">Se connecter</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
