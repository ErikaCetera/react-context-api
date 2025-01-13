import { useState } from 'react'
import axios from 'axios'
import { AppForm } from '../../components/AppForm';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

const initialFormData = {
    titolo: "",
    contenuto: "",
    immagine: "",
    tags: [],

  };


function CreatePage(){

    const [formData, setFormData] = useState(initialFormData);
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();
    

     // Funzione per gestire il cambiamento del valore dell'input
      const handleInputChange = (event) => {
        const keyToChange = event.target.name;
    
        const newData = {
          ...formData,
          [keyToChange]: event.target.value,
        };
    
        setFormData(newData);
      };


    // Funzione per gestire l'invio del form
  const handleSubmit = (event) => {
    event.preventDefault();
    //Invia dati del form al server
    axios.post(`${apiUrl}/posts`, formData).then((resp) => {
        
      //creo oggetto nuovo articolo
      const newArticle = {
        ...formData,
      }
      //creo copia degli articoli precedenti
      const newArray = [...articles, newArticle];
      //aggiorno stato menu
      setArticles(newArray)
      //ripulisco stati del form
      setFormData(initialFormData);
      navigate("/posts");
    })
  };

    return(

        <section className= "m-5">
          <button className="btn btn-light my-3"
         onClick={() => {
           navigate(-1);
         }}
       >
         Indietro
       </button >
          <div className='row w-50'>
            <h3 className='mb-3'>Aggiungi qui la tua Ricetta</h3>
            <AppForm
              form={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </section>
    )
}

export default CreatePage;