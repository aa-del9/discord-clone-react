import { useNavigate } from "react-router-dom";
import "./App.css";
import { Button } from "@/components/ui/button";
function App() {
  const navigate = useNavigate();
  return (
    <>
      <p className="underline">discord clone</p>
      <Button
        onClick={() => {
          navigate("/login");
        }}
      >
        Click me
      </Button>
    </>
  );
}

export default App;
