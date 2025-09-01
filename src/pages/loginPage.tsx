import { Descope } from "@descope/react-sdk";
import {useNavigate} from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();


  return (
      <Descope
        flowId="migrate-users-from-passwords-to-passkeys-using-a-b"
        onSuccess={(e) => navigate("/", { replace: true })}
      />
  );
}