import { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const MyReservations = () => {
  const [user] = useAuthState(auth);
  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchReservations = async () => {
      const q = query(collection(db, "reservations"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const reservationsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReservations(reservationsData);
    };

    fetchReservations();
  }, [user]);

  const handleCancel = async (reservationId: string) => {
    if (!window.confirm("Voulez-vous vraiment annuler cette réservation ?")) return;

    try {
      await deleteDoc(doc(db, "reservations", reservationId));
      setReservations((prev) => prev.filter((res) => res.id !== reservationId));
      alert("Réservation annulée !");
    } catch (error) {
      console.error("Erreur lors de l'annulation :", error);
      alert("Erreur lors de l'annulation !");
    }
  };

  if (!user) {
    return <p className="text-center mt-10">Veuillez vous connecter pour voir vos réservations.</p>;
  }

  return (
    <div className="container mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold text-center">Mes Réservations</h1>
      <div className="mt-6">
        {reservations.length > 0 ? (
          reservations.map((res) => (
            <div key={res.id} className="p-4 bg-gray-100 rounded-lg shadow-md mb-4">
              <h2 className="text-lg font-semibold">{res.title}</h2>
              <p className="text-gray-600">{res.location}</p>
              <p className="text-gray-900 font-bold">{res.price}€ / nuit</p>
              <p className="text-gray-700 mt-2">
                Du {new Date(res.startDate).toLocaleDateString()} au {new Date(res.endDate).toLocaleDateString()}
              </p>
              <button
                onClick={() => handleCancel(res.id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Annuler la réservation
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">Aucune réservation.</p>
        )}
      </div>
    </div>
  );
};

export default MyReservations;
