"use client"

import LibroForm from "@/components/LibroForm";
import LibroCard from "@/components/LibroCard";
import { useLibros } from "@/context/LibroContext";
import { useEffect } from "react";

function AboutPage() {
  const { libros, loadLibros } = useLibros();

  useEffect(() => {
    loadLibros();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        {libros.map((libro) => (
          <LibroCard libro={libro} key={libro.id} />
        ))}
      </div>
    </div>
  );
}

export default AboutPage;
