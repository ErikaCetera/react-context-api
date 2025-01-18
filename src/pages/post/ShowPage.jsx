import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import { useAlertContext } from '../../context/AlertContext';

function ShowPage() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const { apiUrl } = useContext(GlobalContext);

  const { setError } = useAlertContext();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${apiUrl}/posts/${id}`)
      .then((resp) => {
        setPost(resp.data);
      })
      .catch((err) => {
        if (err.status === 404) {
          setError("Ricetta non trovata");
          navigate("/not-found");
        } else {
          setError("Si è verificato un errore durante il caricamento");
        }
      })
  }, [id]);



  return (
    <>
      <button className="btn btn-light m-2" onClick={() => navigate("/posts")}>
        Indietro
      </button>

      {post ? (
        <div className="card text-center">
          <h1>{post.titolo}</h1>
          <img className="w-25 mx-auto" src={`${apiUrl}/${post.immagine}`} alt="" />
          <p className="my-2">{post.contenuto}</p>

          <div className="mt-4">
            <Link className="btn btn-danger m-3" to={`/posts/${post.id - 1}`}>
              <i className="fa-solid fa-arrow-left"></i>
            </Link>
            <Link className="btn btn-danger m-3" to={`/posts/${post.id + 1}`}>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      ) : (
        <p>Caricamento...</p>
      )}
    </>
  );
}

export default ShowPage;
