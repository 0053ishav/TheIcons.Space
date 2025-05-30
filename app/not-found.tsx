import { AlertCircleIcon, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center text-center min-h-screen">
      <div className="text-6xl font-bold  text-primary flex ">
        404
        <AlertCircleIcon />
        </div>
      <p className="text-xl mt-4">
        Oops! The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        className="mt-6 inline-block  px-4 py-2 rounded-md  transition hover:text-primary"
      >
        <Home />
      </a>
    </div>
  );
}
