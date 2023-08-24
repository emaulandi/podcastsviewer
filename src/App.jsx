import { useState } from 'react'
import './App.css'

import Modal from './components/Modal'

import data from './assets/podcasts_episodes_manual_update.csv'
import { podcastsConfig } from './config'
import Overtime from './components/Overtime'
import Footer from './components/Footer'
import Header from './components/Header'

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

  const podcastsChips = (
    <div className="podcasts">
      {podcasts.map(p => (
        <div className="podcast" key={p} style={{ backgroundColor: podcastsConfig[p].color }}>{p}</div>
      ))}
    </div>
  );

  return (
    <>
      <Header/>
      <div className='container'>
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
          Aliquam sem diam, eleifend non maximus at, interdum quis nibh. Suspendisse vel ullamcorper velit, in hendrerit turpis. Duis porttitor, sapien vel sagittis porttitor, tellus sapien sollicitudin est, lacinia pharetra tellus quam eget massa. Nam tempus nec dolor vitae euismod. Curabitur vulputate, eros sit amet dignissim congue, est felis imperdiet lorem, vel euismod erat dolor eu ex. Nam ut blandit velit. Cras interdum nunc mauris, ac porta tellus maximus et. Donec at faucibus elit. Sed at tellus faucibus, rhoncus arcu quis, posuere erat. Maecenas sollicitudin sem ut tempus sollicitudin. Nullam accumsan sollicitudin mi sed mattis. Nam sed velit sagittis massa vestibulum molestie sit amet consectetur metus. Mauris sed imperdiet velit.
          </p>
        </div>

        <Modal episode={episodeInModal} onClose={() => setEpisodeInModal({})}/>

        <Overtime
          episodes={displayData}
          onEpisodeClick={episode => setEpisodeInModal(episode)}
        />

        <section>
          <h1>Explorez les podcasts</h1>
          {podcastsChips}

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
              <div className="category" key={g} style={{ fontWeight: guests.includes(g) ? 900 : 300}}>
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
                style={{
                    borderTop: `solid 5px ${podcastsConfig[episode.podcast].color}`,
                    display: 'flex',  alignItems: 'center', justifyContent: 'center'
                  }}
                onClick={() => setEpisodeInModal(episode)}
              >
                <span>{episode.name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}

export default App
