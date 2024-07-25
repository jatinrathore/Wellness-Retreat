import CardsSection from "./CardsSection";
import NavBar from "./NavBar";

const MainContent = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="p-5">
        <CardsSection />
      </main>
      <footer className="flex justify-center p-5 text-gray-600">
        <p>&copy; 2024 Wellness Retreats. All rights reserved.</p>
      </footer>
    </>
  );
};

export default MainContent;
