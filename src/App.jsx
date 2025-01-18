import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/post/PostPage";
import CreatePage from "./pages/post/CreatePage";
import ShowPage from "./pages/post/ShowPage";
import NotFoundPage from "./pages/NotFoundPage";
import GlobalContext from "./context/GlobalContext";
import { useState, useEffect} from "react";
import axios from "axios";
import { AlertProvider } from "./context/AlertContext";



const apiUrl = import.meta.env.VITE_API_URL;

function App() {

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

// Funzione per gestire eliminazione dei posts 
const handleDelete = (idToDelete) => {
  const newArray = articles.filter((curItem) => curItem.id !== idToDelete);
  setArticles(newArray)
  axios.delete(`${apiUrl}/posts/${idToDelete}`).then((resp) => {
    ;
  });
};


  const globalProviderValue = {
   articles,
   setArticles,
   apiUrl,
   filter,
   setFilter,
   tags,
   handleDelete
  };


  return (
    <><GlobalContext.Provider value={globalProviderValue}>
      <AlertProvider>
      <BrowserRouter>
      <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
              <Route path="/posts" >
              <Route index element={<PostPage />} />
              <Route path="create" element={<CreatePage />} />
              <Route path=":id" element={<ShowPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
         </Route>
        </Routes>
        </BrowserRouter >
        </AlertProvider>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
