import { useNavigate } from "react-router-dom";


function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <button
      onClick = {navigate(-1)}> 
      <h1 className="text-center">Pagina non trovata - Errore 404"</h1>
      </button>
    </>
  );
}

export default NotFoundPage;