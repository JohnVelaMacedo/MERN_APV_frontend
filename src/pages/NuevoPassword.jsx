import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);
  const { token } = useParams();

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);
        setTokenValido(true);
        setAlerta({ msg: "Coloca tu nuevo Password" });
      } catch (error) {
        setAlerta({ msg: "Hubo un error en el enlace", error: true });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: "El password debe ser de minimo 6 caracteres",
        error: true,
      });
      return;
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });
      setAlerta({ msg: data.msg });
      setPasswordModificado(true);
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Reestablece tu password y no Pierdas Acceso a{" "}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl b-white">
        {msg && <Alerta alerta={alerta} />}

        {tokenValido && (
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label
                htmlFor="password"
                className="uppercase text-gray-600 block text-xl font-bold"
              >
                Nuevo Password
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

            <input
              type="submit"
              value="Guardar Nuevo Password"
              className="bg-indigo-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 
                hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            />
          </form>
        )}
        
        {passwordModificado && (
          <Link to="/" className="block text-center my-5 text-gray-500">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default NuevoPassword;
