import { useState } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Connexion réussie !");
      navigate("/");
    } catch (error) {
      alert("Erreur lors de la connexion");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Connexion réussie avec Google !");
      navigate("/");
    } catch (error) {
      alert("Erreur lors de la connexion avec Google");
    }
  };

  return (
    <div className="container mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold text-center">Connexion</h2>
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md mt-6">
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded-md mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full p-2 border rounded-md mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
            Connexion
          </button>
        </form>
        <button onClick={handleGoogleLogin} className="w-full bg-red-500 text-white p-2 rounded-md mt-2">
          Connexion avec Google
        </button>
      </div>
    </div>
  );
};

export default Login;
