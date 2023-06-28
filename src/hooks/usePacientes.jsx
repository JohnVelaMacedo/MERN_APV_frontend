import { useContext } from "react";
import PacientesContext from "../context/PacientesProvider";

const usePacientes = () => useContext(PacientesContext);

export default usePacientes;
