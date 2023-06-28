import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clienteAxios from "../config/axios.js";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`;
        const { data } = await clienteAxios.get(url);
        setCuentaConfirmada(true);
        setAlerta({ msg: data.msg, error: false });
        console.log(data);
      } catch (error) {
        setAlerta({ msg: error.response.data.msg, error: true });
      }
      setCargando(false);
    };

    confirmarCuenta();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma tu Cuenta y Comienza a Administrar{" "}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl b-white">
        {!cargando && <Alerta alerta={alerta} />}

        {cuentaConfirmada && (
          <Link to="/" className="block text-center my-5 text-gray-500">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
