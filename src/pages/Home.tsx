import ListingCard from "../components/ListingCard";

const listings = [
  { id: 1, title: "Appartement cosy à Paris", image: "https://source.unsplash.com/400x300/?apartment", price: 120, location: "Paris, France" },
  { id: 2, title: "Villa avec piscine à Nice", image: "https://source.unsplash.com/400x300/?villa", price: 250, location: "Nice, France" },
  { id: 3, title: "Chalet en montagne", image: "https://source.unsplash.com/400x300/?chalet", price: 180, location: "Chamonix, France" },
];

const Home = () => {
  return (
    <div className="container mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold text-center">Découvrez nos logements</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {listings.map((listing) => (
          <ListingCard key={listing.id} {...listing} />
        ))}
      </div>
    </div>
  );
};

export default Home;
