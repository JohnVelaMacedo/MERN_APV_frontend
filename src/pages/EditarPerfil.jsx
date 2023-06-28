import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";

const EditarPerfil = () => {
  const { auth, actualizarPerfil } = useAuth();
  const [perfil, setPerfil] = useState({});
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    setPerfil(auth);
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombre, email } = perfil;
    if ([nombre.trim(), email.trim()].includes("")) {
      setAlerta({ msg: "Email y Nombre son obligatorios", error: true });
      return;
    }

    const resultado = await actualizarPerfil(perfil);
    setAlerta(resultado);
  };

  const { msg } = alerta;

  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modificar tu{" "}
        <span className="text-indigo-600 font-bold">Información aquí</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alerta alerta={alerta} />}

          <form onSubmit={handleSubmit}>
            {/* NOMBRE */}
            <div className="my-3">
              <label
                htmlFor="nombre"
                className="uppercase font-bold text-gray-600"
              >
                Nombre:{" "}
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                autoComplete="off"
                placeholder="Tu Nombre"
                value={perfil.nombre || ""}
                onChange={(e) =>
                  setPerfil({ ...perfil, [e.target.name]: e.target.value })
                }
              />
            </div>

            {/* SITIO WEB */}
            <div className="my-3">
              <label
                htmlFor="web"
                className="uppercase font-bold text-gray-600"
              >
                Sitio Web:{" "}
              </label>
              <input
                type="text"
                id="web"
                name="web"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                autoComplete="off"
                placeholder="Tu Sitio Web"
                value={perfil.web || ""}
                onChange={(e) =>
                  setPerfil({ ...perfil, [e.target.name]: e.target.value })
                }
              />
            </div>

            {/* TELEFONO */}
            <div className="my-3">
              <label
                htmlFor="telefono"
                className="uppercase font-bold text-gray-600"
              >
                Telefono:{" "}
              </label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                autoComplete="off"
                placeholder="Tu Telefono"
                value={perfil.telefono || ""}
                onChange={(e) =>
                  setPerfil({ ...perfil, [e.target.name]: e.target.value })
                }
              />
            </div>

            {/* EMAIL */}
            <div className="my-3">
              <label
                htmlFor="email"
                className="uppercase font-bold text-gray-600"
              >
                Email:{" "}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                autoComplete="off"
                placeholder="Tu Email"
                value={perfil.email || ""}
                onChange={(e) =>
                  setPerfil({ ...perfil, [e.target.name]: e.target.value })
                }
              />
            </div>

            <input
              type="submit"
              className="bg-indigo-700 px-10 py-3 text-white rounded-lg uppercase w-full mt-5 font-bold cursor-pointer"
              value="Guardar Cambios"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditarPerfil;
