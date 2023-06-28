import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios.js";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      [nombre, email, password, repetirPassword].some(
        (value) => value.trim() === ""
      )
    ) {
      setAlerta({ msg: "Hay campos vacios", error: true });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({ msg: "Los passwords no son iguales", error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "El Password es muy corto, agrega minimo 6 caracteres",
        error: true,
      });
      return;
    }
    setAlerta({});

    // Crear el usuario en el api
    try {
      await clienteAxios.post("/veterinarios", { nombre, email, password });

      setAlerta({ msg: "Creado correctamente, revisa tu email", error: false });
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea tu Cuenta y Administra{" "}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl b-white">
        {msg && <Alerta alerta={alerta} />}

        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              htmlFor="nombre"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              placeholder="Tu Nombre"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              autoComplete="off"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              htmlFor="email"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              placeholder="Email de Registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Tu Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              htmlFor="repetir-password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Repetir Password
            </label>
            <input
              id="repetir-password"
              type="password"
              placeholder="Repite tu Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Crear Cuenta"
            className="bg-indigo-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 
              hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/" className="block text-center my-5 text-gray-500">
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link
            to="/olvide-password"
            className="block text-center my-5 text-gray-500"
          >
            Olvide mi Password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Registrar;
