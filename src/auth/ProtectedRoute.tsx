import { useSession } from "@descope/react-sdk";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const { isAuthenticated, isSessionLoading } = useSession();

  if (isSessionLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
