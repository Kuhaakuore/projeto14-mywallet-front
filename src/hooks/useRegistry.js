import { useContext } from "react";
import RegistryContext from "../contexts/RegistryContext";

export default function useRegistry() {
  return useContext(RegistryContext);
}