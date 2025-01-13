import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <ButtonGoBack
      back = {navigate(-1)}/>
      <h1 className="text-center">Pagina non trovata - Errore 404"</h1>
    </>
  );
}

export default NotFoundPage;