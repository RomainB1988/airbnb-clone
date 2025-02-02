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
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Airbnb Clone</h1>
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-gray-700 hover:text-black">Accueil</Link></li>
          {user ? (
            <>
              <li className="text-gray-700">Bienvenue, {user.displayName || "Utilisateur"}</li>
              <li>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded">
                  Déconnexion
                </button>
              </li>
            </>
          ) : (
            <li><Link to="/login" className="text-gray-700 hover:text-black">Se connecter</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
