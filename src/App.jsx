import { useState } from 'react'
import './App.css'

import data from './assets/podcasts_episodes_manual_update.csv'
import { podcastsConfig } from './config'

function App() {

  const displayData = data
    .filter(({ filterOut }) => parseInt(filterOut) !== 1)
    .sort((a, b) => a.date < b.date)

  const podcasts = [... new Set(displayData.map(({ podcast }) => podcast))];
  const initialCategories = [... new Set(displayData.map(({ category }) => category.split(',')).flat())];

  const [categories, setCategories] = useState(initialCategories);

  return (
    <>
      <h1>Explorez les podcasts</h1>
      <h2>Podcasts</h2>
      <div className="podcasts">
        {podcasts.map(p => (
          <div className="podcast" key={p} style={{ backgroundColor: podcastsConfig[p].color }}>{p}</div>
        ))}
      </div>
      <h2>Thèmes</h2>
      <div className="categories">
        {initialCategories.map(c => (
          <div className="category" key={c} style={{ fontWeight: categories.includes(c) ? 900 : 300}}>
            <button onClick={() => setCategories([c])}>
              {c}
            </button>
          </div>
        ))}
      </div>
      <button style={{ fontStyle: 'italic', fontWeight: 300 }} onClick={() => setCategories(initialCategories)}>
        Sélectionnez toutes les catégories
      </button>
      <h2>Episodes</h2>
      <div className="episodes">
        {displayData
          .filter(({ category }) => categories.some(cat => category.split(',').includes(cat)))
          .map(({ name, podcast }) => (
          <div className="episode" key={name} style={{ backgroundColor: podcastsConfig[podcast].color }}>
            <span>{name}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
