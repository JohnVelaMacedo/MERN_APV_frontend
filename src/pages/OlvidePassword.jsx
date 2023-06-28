import { useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios.js";
import Alerta from "../components/Alerta.jsx";

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "") {
      setAlerta({ msg: "El Email es obligatorio", error: true });
      return;
    }

    try {
      const { data } = await clienteAxios.post(
        "/veterinarios/olvide-password",
        { email }
      );
      setAlerta({ msg: data.msg, error: false });
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Recupera tu Acceso y no Pierdas{" "}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl b-white">
        {msg && <Alerta alerta={alerta} />}

        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              htmlFor="email"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email de Registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Enviar Instrucciones"
            className="bg-indigo-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 
              hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/" className="block text-center my-5 text-gray-500">
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link
            to="/registrar"
            className="block text-center my-5 text-gray-500"
          >
            ¿No tienes una cuenta? Registrate
          </Link>
        </nav>
      </div>
    </>
  );
};

export default OlvidePassword;
