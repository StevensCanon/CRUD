"use client";

import { createContext, useState, useContext } from "react";
import { CreateLibro, UpdateLibro } from "@/interfaces/Libro";
import { Libro } from "@prisma/client";

export const libroContext = createContext<{
  libros: Libro[];
  loadLibros: () => Promise<void>;
  createLibro: (libro: CreateLibro) => Promise<void>;
  deleteLibro: (id: number) => Promise<void>;
  selectedLibro: Libro| null;
  setSelectedLibro: (libro: Libro | null) => void;
  updateLibro: (id: number, libro: UpdateLibro) => Promise<void>;
}>({
  libros: [],
  loadLibros: async () => {},
  createLibro: async (libro: CreateLibro) => {},
  deleteLibro: async (id: number) => {},
  selectedLibro: null,
  setSelectedLibro: (libro: Libro | null) => {},
  updateLibro: async (id: number, libro: UpdateLibro) => {},
});

export const useLibros = () => {
  const context = useContext(libroContext);
  if (!context) {
    throw new Error("useLibros must be used within a LibrosProvider");
  }
  return context;
};

export const LibrosProvider = ({ children }: { children: React.ReactNode }) => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [selectedLibro, setSelectedLibro] = useState<Libro| null>(null);

  async function loadLibros() {
    const res = await fetch("/api/libros");
    const data = await res.json();
    setLibros(data);
  }

  async function createLibro(libro: CreateLibro) {
    const res = await fetch("/api/libros", {
      method: "POST",
      body: JSON.stringify(libro), 
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newLibro = await res.json();
    setLibros(prevLibros => [...prevLibros, newLibro]); 
  }
  

  async function deleteLibro(id: number) {
    const res = await fetch("/api/libros/" + id, {
      method: "DELETE",
    });
    const data = await res.json();
    setLibros(libros.filter((libro) => libro.id !== id));
  }

  async function updateLibro(id: number, libro: UpdateLibro) {
    const res = await fetch("/api/libros/" + id, {
      method: "PUT",
      body: JSON.stringify(libro),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setLibros(libros.map((libro) => (libro.id === id ? data : libro)));
  }

  return (
    <libroContext.Provider
      value={{
        libros,
        loadLibros,
        createLibro,
        deleteLibro,
        selectedLibro,
        setSelectedLibro,
        updateLibro,
      }}
    >
      {children}
    </libroContext.Provider>
  );
};
