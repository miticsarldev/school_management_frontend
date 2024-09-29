import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import LOGO from "/logos/logo_mitic_light.png";
import Navbar from "./miscelleanous/Navbar";

const PublicPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-80px)] flex flex-col">
        <main className="flex-grow flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-screen-md text-center">
            <div className="mb-8">
              <img
                src={LOGO}
                alt="Clinic Logo"
                className="mx-auto h-36 w-auto"
              />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Bienvenue sur <br /> MITIC SCHOOL MANAGEMENT
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Un gestionnaire de votre école et/ou de votre université en une
              seule place
            </p>
            <Button asChild size="lg">
              <Link to="/login">Connexion</Link>
            </Button>
          </div>
        </main>
        <footer className="bg-muted py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h2 className="font-semibold mb-2">À Propos de Nous</h2>
                <p className="text-sm text-muted-foreground">
                  MITIC est dédiée à fournir des services IT de haute qualité.
                </p>
              </div>
              <div>
                <h2 className="font-semibold mb-2">Contact</h2>
                <p className="text-sm text-muted-foreground">
                  Email : contact@miticsarl.com
                  <br />
                  Téléphone : +223 73810023
                </p>
              </div>
              <div>
                <h2 className="font-semibold mb-2">Adresse</h2>
                <p className="text-sm text-muted-foreground">
                  Hamdallace ACI 2000
                  <br />
                  Bamako, MALI
                </p>
              </div>
            </div>
            <div className="mt-8 text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} MITIC SARL. Tous droits réservés.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default PublicPage;
