import { useState } from 'react'
import './App.css'

import Modal from './components/Modal'

import data from './assets/podcasts_episodes_manual_update.csv'
import { podcastsConfig } from './config'

function App() {

  const displayData = data
    .filter(({ filterOut }) => parseInt(filterOut) !== 1)
    .sort((a, b) => a.date < b.date)

  const podcasts = [... new Set(displayData.map(({ podcast }) => podcast))];
  const allCategories = [... new Set(displayData.map(({ category }) => category.split(',')).flat())];

  const allGuests = displayData
    .filter(({ category, guest }) => category != 'témoignage' && guest !== "")
    .map(({ guest }) => guest.split(','))
    .flat();
  const guestsOccurence = allGuests.reduce(function (acc, curr) {
    return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
  }, {});
  const famousGuests = Object.entries(guestsOccurence)
    .filter(([, value]) => value > 1)
    .sort((a,b) => a[1] < b[1])
    .map(([key]) => key);

  const [categories, setCategories] = useState(allCategories);
  const [guests, setGuests] = useState(allGuests);
  const [episodeInModal, setEpisodeInModal] = useState({});

  const episodes = displayData
  .filter(({ category, guest }) =>
    categories.some(c => category.split(',').includes(c))
    && guests.some(g => guest.split(',').includes(g))
  );

  return (
    <>
      <Modal episode={episodeInModal} onClose={() => setEpisodeInModal({})}/>
      <h1>Explorez les podcasts</h1>
      <div className="podcasts">
        {podcasts.map(p => (
          <div className="podcast" key={p} style={{ backgroundColor: podcastsConfig[p].color }}>{p}</div>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <h2>📑 Thèmes</h2>
        <button style={{ fontStyle: 'italic', fontWeight: 300 }} onClick={() => setCategories(allCategories)}>
          Sélectionnez toutes les catégories
        </button>
      </div>
      <div className="categories">
        {allCategories.map(c => (
          <div className="category" key={c} style={{ fontWeight: categories.includes(c) ? 900 : 300}}>
            <button onClick={() => setCategories([c])}>
              {c}
            </button>
          </div>
        ))}
      </div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <h2>🙋🏼‍♀️ Invité.e.s les plus représenté.e.s</h2>
        <button style={{ fontStyle: 'italic', fontWeight: 300 }} onClick={() => setGuests(allGuests)}>
          Sélectionnez l&apos;ensemble des invité.e.s
        </button>
      </div>
      <div className="categories">
        {famousGuests.map(g => (
          <div className="category" key={g} style={{ fontWeight: famousGuests.includes(g) ? 900 : 300}}>
            <button onClick={() => setGuests([g])}>
              {g}
            </button>
          </div>
        ))}
      </div>

      <h2>Episodes</h2>
      {episodes.length === 0 && (
        <p>🥲 Aucun épisode ne correspond aux filtres sélectionnés</p>
      )}
      <div className="episodes">
        {episodes.map(episode => (
          <div
            className="episode"
            key={episode.name}
            style={{ backgroundColor: podcastsConfig[episode.podcast].color, display: 'flex',  alignItems: 'center', justifyContent: 'center' }}
            onClick={() => setEpisodeInModal(episode)}
          >
            <span>{episode.name}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
