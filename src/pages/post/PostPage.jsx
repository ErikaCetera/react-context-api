import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import GlobalContext from '../../context/GlobalContext';
import AppCard from '../../components/AppCard'
import AppFilter from '../../components/AppFilter';






function PostPage() {
  
  const {articles, filter, setFilter, handleDelete} = useContext(GlobalContext);

  return (
    <>
      <main className='container mt-5'>
        <section className="d-flex justify-content-between align-items-center">
          <AppFilter
          selectTag={filter}
          onFilter={setFilter}
          />
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
