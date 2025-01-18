// AppFilter.js
import { useContext } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";


function AppFilter({ selectTag, onFilter }) {
    
const {tags} = useContext(GlobalContext);
    return (
        <>
            <select name="tag" value={selectTag} onChange={(event) => onFilter(event.target.value)}>
                <option value="all">Tutte le Ricette</option>
                {tags && tags.map((curTag, index) => <option key={index} value={curTag}>{curTag}</option>)}
            </select>
            <Link className="btn btn-light" to="/posts/create">
                Aggiungi una nuova Ricetta
            </Link>
        </>

    );
}

export default AppFilter;
