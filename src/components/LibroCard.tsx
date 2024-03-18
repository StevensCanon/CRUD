import { Libro } from "@prisma/client";
import { useLibros } from "@/context/LibroContext";
import { HiTrash, HiPencil } from 'react-icons/hi';

function LibroCard({ libro }: { libro: Libro }) {
  const { deleteLibro, setSelectedLibro } = useLibros();

  return (
    <div className="p-4">
      <div className="bg-slate-300 p-4">
        <h1 className="text-2xl font-bold">{libro.title}</h1>
        <p>Autor: {libro.Author}</p>
        <p>Categoria: {libro.Category}</p>
        <p>Editorial: {libro.Editorial}</p>
        <p>Idioma: {libro.language}</p>
        <p>Ultima Actualizacion: {new Date(libro.createdAt).toLocaleDateString()}</p>
        <div className="flex justify-end gap-x-2 mt-4">
          <button
            onClick={async () => {
              if (confirm("Estas seguro que deseas eliminar esta informacion?")) {
                await deleteLibro(Number(libro.id));
              }
            }}
          >
            <HiTrash className="text-2xl text-red-600" />
          </button>
          <button
            onClick={() => {
              setSelectedLibro(libro);
            }}
          >
            <HiPencil className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LibroCard;
