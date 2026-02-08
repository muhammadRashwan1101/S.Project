import { useEffect } from "react";
import { CheckIcon } from "./Icons";

export function Toast({ msg, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return <div className="toast"><CheckIcon /> {msg}</div>;
}
