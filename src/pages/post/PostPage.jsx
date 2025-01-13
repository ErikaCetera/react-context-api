import { useEffect, useState } from 'react'
import axios from 'axios'
import { AppCard } from '../../components/AppCard';
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;



function PostPage() {

  //Variabili di stato 
  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const [filter, setFilter] = useState("all");


  //Mostra i posts all'avvio della pagina
  useEffect(() => {
    getPosts()
  }, [filter]);

  const getPosts = () => {
    //Preleva lista dei posts dal server
    let url = `${apiUrl}/posts`;
    if (filter !== "all") {
      url += `?tags=${filter.replace(/\s+/g, '%20')}`;
    }
    axios.get(url).then((resp) => {
      console.log(resp)
      setArticles(resp.data.postsList)
    });
  };

  // Funzione per gestire eliminazione dei posts 
  const handleDelete = (idToDelete) => {
    const newArray = articles.filter((curItem) => curItem.id !== idToDelete);
    setArticles(newArray)
    axios.delete(`${apiUrl}/posts/${idToDelete}`).then((resp) => {
      ;
    });
  };

  //Mostra i tag all'avvio della pagina
  useEffect(() => {
    getTags()
  }, [])

  //Funzione per prelevare lista dei tag dal server
  const getTags = () => {
    axios.get(`${apiUrl}/tags`).then((resp) => {
      setTags(resp.data.tags)
    });
  };
  return (
    <>
      <main className='container mt-5'>
        {/* select che filtrerà i post in base ai tags */}
        <section className="d-flex justify-content-between align-items-center">
          <select name="tag" value={filter} onChange={(event) => setFilter(event.target.value)}>
            <option value="all">Tutte le Ricette</option>
            {tags && tags.map((curTag, index) => <option key={index} value={curTag}>{curTag}</option>)}
          </select>

          <Link className="btn btn-light" to="/posts/create">
            Aggiungi una nuova Ricetta
          </Link>
        </section>

        <section className='my-5'>
          <h2>Ricette</h2>
          {articles && articles.length > 0 ? (
            <div className="row row-cols-2 row-cols-lg-3">
              {articles.map((curItem, index) => (
                <div className="col" key={index}>
                  <AppCard
                    post={curItem}
                    onDelete={() => handleDelete(curItem.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>Nessun articolo presente</p>
          )}
        </section>

      </main>
    </>
  )
}

export default PostPage;
