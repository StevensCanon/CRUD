import { useState, useRef, useEffect } from "react";
import { useLibros } from "@/context/LibroContext";
import LibroCardList from "@/components/LibroCard";


function LibroForm() {
  const [title, setTitle] = useState("");
  const [Author, setAuthor] = useState("");
  const [Category, setCategory] = useState("");
  const [Editorial, setEditorial] = useState("");
  const [language, setlanguage] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  const { createLibro, selectedLibro, setSelectedLibro, updateLibro } = useLibros();

  useEffect(() => {
    if (selectedLibro) {
      setTitle(selectedLibro.title);
      setAuthor(selectedLibro.Author || "");
      setCategory(selectedLibro.Category || "");
      setEditorial(selectedLibro.Editorial || "");
      setlanguage(selectedLibro.language || "");
    }
  }, [selectedLibro]);

  return ( 
    <div className="flex flex-col justify-center items-center h-screen text-xl">
      <h1 className="titulo">Gestión de Libros</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          if (selectedLibro) {
            await updateLibro(selectedLibro.id, {
              title,
              Author,
              Category,
              Editorial,
              language,
            });
            setSelectedLibro(null);
          } else {
            await createLibro({
              title,
              Author,
              Category,
              Editorial,
              language,
            });
          }

          setTitle("");
          setAuthor("");
          setCategory("");
          setEditorial("");
          setlanguage("");

          titleRef.current?.focus();
        }}
        className="flex flex-col justify-center items-center space-y-4"
      >
        <input
          type="text"
          name="title"
          autoFocus
          placeholder="Titulo"
          className="w-full  px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 my-2"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          ref={titleRef}
        />

        <input
          name="Author"
          placeholder="Autor"
          className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 my-2"
          onChange={(e) => setAuthor(e.target.value)}
          value={Author}
        />

        <input
          type="text"
          name="Category"
          placeholder="Categoria"
          className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 my-2"
          onChange={(e) => setCategory(e.target.value)}
          value={Category}
        />

        <input
          type="text"
          name="Editorial"
          placeholder="Editorial"
          className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 my-2"
          onChange={(e) => setEditorial(e.target.value)}
          value={Editorial}
        />

        <input
          type="text"
          name="language"
          placeholder="Lenguaje"
          className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 my-2"
          onChange={(e) => setlanguage(e.target.value)}
          value={language}
        />

        <div className="flex justify-end w-full">
          <button
            className="w-full px-4 py-2 text-white bg-red-950 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!title || !Author || !Category || !Editorial || !language}
            type="submit"
          >
            {selectedLibro ? "Actualizar" : "Crear"}
          </button>

          {selectedLibro && (
            <button
              className="w-full ml-2 px-4 py-2 text-black bg-slate-400 hover:bg-slate-500 rounded-md"
              type="button"
              onClick={() => {
                setSelectedLibro(null);
                setTitle("");
                setAuthor("");
                setCategory("");
                setEditorial("");
                setlanguage("");
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default LibroForm;
