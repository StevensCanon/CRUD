"use client";

import LibroForm from "@/components/LibroForm";
import LibroCard from "@/components/LibroCard";
import { useLibros } from "@/context/LibroContext";
import { useEffect } from "react";

function HomePage() {
  const { libros, loadLibros } = useLibros();

  useEffect(() => {
    loadLibros();
  }, []);

  return (
    <div>
      <LibroForm />
      <div className="grid grid-cols-4 gap-4">
        {libros.map((libro) => (
          <LibroCard libro={libro} key={libro.id} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
