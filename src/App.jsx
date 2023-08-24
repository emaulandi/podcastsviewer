import { useState } from 'react'
import './App.css'

import Modal from './components/Modal'

import data from './assets/podcasts_episodes_manual_update.csv'
import { podcastsConfig } from './config'
import Overtime from './components/Overtime'
import Footer from './components/Footer'
import Header from './components/Header'
import People from './components/People'
import EpisodesList from './components/EpisodesList'

function App() {

  // Episodes
  const allEpisodes = data
    .filter(({ filterOut }) => parseInt(filterOut) !== 1)
    .sort((a, b) => a.date < b.date)

  // Podcasts
  const podcasts = [... new Set(allEpisodes.map(({ podcast }) => podcast))];
  
  // Categories
  const allCategoriesList = allEpisodes
    .map(({ category }) => category.split(','))
    .flat()
    .filter(category => category !== '');
  const allCategories = [... new Set(allCategoriesList)]; // unique
  const categoryOccurence = allCategoriesList.reduce(function (acc, curr) {
    return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
  }, {});
  const sortedCategories = Object.entries(categoryOccurence)
    .sort((a,b) => a[1] < b[1]) // [key, value] -> sorting by value
    .map(([key]) => key);

  // Guests
  const allGuests = allEpisodes
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

  // State
  const [categories, setCategories] = useState(allCategories);
  const [guests, setGuests] = useState(allGuests);
  const [episodeInModal, setEpisodeInModal] = useState({});

  const episodes = allEpisodes
  .filter(({ category, guest }) =>
    categories.some(c => category.split(',').includes(c))
    && (
      // only one guest selected ? strict filter
      guests.length === 1
        ? guests.some(g => guest.split(',').includes(g))
        : guest === '' || guests.some(g => guest.split(',').includes(g))
    )
  );

  const podcastsChips = (
    <div className="podcasts">
      {podcasts.map(p => (
        <div className="podcast" key={p} style={{ backgroundColor: podcastsConfig[p].color }}>{p}</div>
      ))}
    </div>
  );

  const detailClick = (
    <p style={{ fontWeight: 300, fontStyle: 'italic'}}>Voir le détail d&apos;un épisode en cliquant dessus</p>
  );

  return (
    <>
      <Header/>
      <div className='container'>
        <section id="intro">
          <div className='textContainer'>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel neque imperdiet, dictum neque vel, tincidunt ipsum. Mauris condimentum, enim a lobortis dapibus, mauris diam gravida ipsum, sit amet rutrum enim felis faucibus est. Donec non sapien bibendum, consequat sapien ornare, convallis nisl. Aenean nec tellus malesuada, convallis magna vel, ornare sapien. Morbi mauris nunc, tempor ut nisl sed, pellentesque dapibus lectus. Nam mollis magna sit amet sem dapibus ornare. Pellentesque aliquam dolor sed ullamcorper finibus.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {podcastsChips}
          </div>

          <div className='textContainer'>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel neque imperdiet, dictum neque vel, tincidunt ipsum. Mauris condimentum, enim a lobortis dapibus, mauris diam gravida ipsum, sit amet rutrum enim felis faucibus est. Donec non sapien bibendum, consequat sapien ornare, convallis nisl. Aenean nec tellus malesuada, convallis magna vel, ornare sapien. Morbi mauris nunc, tempor ut nisl sed, pellentesque dapibus lectus. Nam mollis magna sit amet sem dapibus ornare. Pellentesque aliquam dolor sed ullamcorper finibus.
            </p>
            <p>
            Les podcasts <b>Présages</b> et <b>Sismique</b> ont tous deux démarrés en 2018,
            suivi de <b>Ozé</b> et <b>Pan(s) B</b> en 2020 <i>(beaucoup d'épisodes du podcast
            Plan(s) B ont été ajoutés en avril 2021, peut-être ont-ils été ajoutés d'un coup sur Spotify et sont plus anciens).</i>
            </p>

            {detailClick}
          </div>

          <Modal episode={episodeInModal} onClose={() => setEpisodeInModal({})}/>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="figure">
              <Overtime
                episodes={allEpisodes}
                onEpisodeClick={episode => setEpisodeInModal(episode)}
              />
            </div>
          </div>
        </section>

        <section id="people">
          <div className='textContainer'>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel neque imperdiet, dictum neque vel, tincidunt ipsum. Mauris condimentum, enim a lobortis dapibus, mauris diam gravida ipsum, sit amet rutrum enim felis faucibus est. Donec non sapien bibendum, consequat sapien ornare, convallis nisl. Aenean nec tellus malesuada, convallis magna vel, ornare sapien. Morbi mauris nunc, tempor ut nisl sed, pellentesque dapibus lectus. Nam mollis magna sit amet sem dapibus ornare. Pellentesque aliquam dolor sed ullamcorper finibus.
            </p>
            <h2>Les petits chouchous</h2>
            <p>
            Plusieurs invité·e·s apparaissent dans plus d&apos;un podcast ! Serait-ce la fame, leur approche transdisciplinaire ou sur des sujets phares ? 
            À vous de vous faire une idée. 
            </p>
            {detailClick}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <People 
              allEpisodes={allEpisodes}
              famousGuests={famousGuests}
              onEpisodeClick={episode => setEpisodeInModal(episode)}
            />
          </div>

          <div className='textContainer'>
            <p>
              On a vu au dessus la liste des épisodes concernés pour les invité·e·s que l'on peut écouter sur 3 ou 4 podcats. Pas d'inquiétudes pour les autres,
              il sera possible d'explorer un peu plus bas l'ensemble des épisodes par invité·e.
            </p>
          </div>
        </section>

        <section id="explore">
          <h1>Explorez les podcasts</h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
            <p>Podcasts listés : </p>
            {podcastsChips}
          </div>

          {detailClick}
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <h2>📑 Thèmes</h2>
            <button style={{ fontStyle: 'italic', fontWeight: 300 }} onClick={() => setCategories(allCategories)}>
              Sélectionnez toutes les catégories
            </button>
          </div>
          <div className="filters">
            {sortedCategories.map(c => (
              <div className="chip" key={c} style={{ fontWeight: categories.includes(c) ? 900 : 300}}>
                <button onClick={() => setCategories([c])}>
                  {c}
                </button>
              </div>
            ))}
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <h2>🙋🏼‍♀️ Invité·e·s les plus représenté·e·s</h2>
            <button style={{ fontStyle: 'italic', fontWeight: 300 }} onClick={() => setGuests(allGuests)}>
              Sélectionnez l&apos;ensemble des invité.e.s
            </button>
          </div>
          <div className="filters">
            {famousGuests.map(g => (
              <div className="chip" key={g} style={{ fontWeight: guests.includes(g) ? 900 : 300}}>
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
          <EpisodesList
            episodes={episodes}
            onEpisodeClick={episode => setEpisodeInModal(episode)}
          />
        </section>
      </div>

      <Footer />
    </>
  )
}

export default App
