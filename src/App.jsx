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
import Gender from './components/Genders'

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

  const podcastChip = title => (
    <span className="podcast" key={title} style={{ backgroundColor: podcastsConfig[title].color }}>
      <a style={{ fontWeight: 400, color: 'inherit', textDecoration: 'inherit' }} target='_blank' rel="noreferrer" href={podcastsConfig[title].link}>
        {title}
      </a>
    </span>
    
  );
  const podcastsChips = (
    <div className="podcasts">
      {podcasts.map(p => (
        <div key={p} style={{ margin: '0.3em' }}>
          {podcastChip(p)}
        </div>
      ))}
    </div>
  );

  const detailClick = (
    <p style={{ fontWeight: 300, fontStyle: 'italic'}}>Il est possible de voir le détail d'un épisode en cliquant dessus</p>
  );

  const separator = (
    <p style={{ fontWeight: 300, padding: '1em' }}>🎧</p>
  );

  return (
    <>
      <Header/>
      <Modal episode={episodeInModal} onClose={() => setEpisodeInModal({})}/>
      <div className='container'>
        <section id="intro">
          <div className='textContainer'>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel neque imperdiet, dictum neque vel, tincidunt ipsum. Mauris condimentum, enim a lobortis dapibus, mauris diam gravida ipsum, sit amet rutrum enim felis faucibus est. Donec non sapien bibendum, consequat sapien ornare, convallis nisl. Aenean nec tellus malesuada, convallis magna vel, ornare sapien. Morbi mauris nunc, tempor ut nisl sed, pellentesque dapibus lectus. Nam mollis magna sit amet sem dapibus ornare. Pellentesque aliquam dolor sed ullamcorper finibus.
            </p>

            {podcastsChips}

            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel neque imperdiet, dictum neque vel, tincidunt ipsum. Mauris condimentum, enim a lobortis dapibus, mauris diam gravida ipsum, sit amet rutrum enim felis faucibus est. Donec non sapien bibendum, consequat sapien ornare, convallis nisl. Aenean nec tellus malesuada, convallis magna vel, ornare sapien. Morbi mauris nunc, tempor ut nisl sed, pellentesque dapibus lectus. Nam mollis magna sit amet sem dapibus ornare. Pellentesque aliquam dolor sed ullamcorper finibus.
            </p>
            <p>
            Les podcasts {podcastChip('Présages')} et {podcastChip('Sismique')} ont tous deux démarrés en 2018,
            suivi de {podcastChip('Ozé. Comprendre. S\'inspirer. S\'engager')} et {podcastChip('Plan(s) B')} en 2020 (beaucoup d'épisodes du podcast
            Plan(s) B ont été ajoutés en avril 2021, peut-être ont-ils été ajoutés d'un coup sur Spotify et sont plus anciens).
            </p>

            <p>
              Voici ci-dessous une petite frise par année des épisodes publiés représentés par un carré de la couleur associée
              au podcast, une ligne représentant un mois.
            </p>

            {detailClick}
          </div>

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
          {separator}
          <div className='textContainer'>
            <h2>Les petits chouchous</h2>
            <p>
            Plusieurs invité·e·s apparaissent dans plus d&apos;un podcast ! Serait-ce la <i>fame</i>, leur approche transdisciplinaire ou le fait
            qu'iels traitent des sujets phares ? 
            À vous de vous faire une idée 🤓. 
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

        <section id="topics">
          {separator}
          <div className='textContainer'>
            <h2>Des approches complémentaires ?</h2>
            <p>
              J'imagine que l'on sélectionne chacun·e des ressources qui nous parlent dans le contenu, l'approche <i>(tout en gardant
              l'importance de se confronter à des idées différentes)</i>. Ces quatre podcasts sont à mon sens assez complémentaires.
              Je suis plus attirée par défaut vers la posture et l'angle de vue {podcastChip('Présages')} qui dépeind les sujets plutôt
              depuis un regard liés aux rapports de pouvoirs et aux luttes. Ce n'est pas forcément la tasse de thé 🍵 de certains milieux
              mobilisant principalement les lunettes des sciences "dures" sans trop regarder du côté des sciences sociales. Pour autant,
              je trouve la conjonction des deux beaucoup plus complète et riche !
            </p>
            <p>
              Un cas qui ma marqué est l'écoute de l'épisode de {podcastChip('Sismique')} avec <a target='_blank' rel="noreferrer" href='https://open.spotify.com/episode/1LfZAWZAVFM529fssZMxWd
'>Serge Zaka sur climat et agriculture</a>. Marquée par la lecture juste
              avant de Rendre la terre aux machines de l'Atelier Paysan, je m'énervais toute seule en ma ngeant mon goûter : <i>"Mais il ne 
              parle pas des différents types d'agricultures ! Et du rapport aux fournisseurs de l'industrie agricole, et des autres impacts
              sur l'environnement et gnagnagna !"</i>. Disclaimer : je ne suis pas du tout une experte du sujet et j'ai forcément un point de
              vue très partiel du sujet (surement beaucoup plus que les intervenant·e·s dans ces podcats !). Mais cela étant dit, je suis allée
              voir le dernier épisodes de  {podcastChip('Présages')} sur le sujet vaste de l'alimentation et j'ai trouvé tellement riche l'épisode
              avec <a target='_blank' rel="noreferrer" href='https://open.spotify.com/episode/0EyrFqnCrcSQi0PEwd2esL'>l'association Les Greniers d'abondance</a>, 
              qui ajoute un point de vue différent et plus global à mon sens. <i>(Et pour des ressources encore plus variées, 
              rendez-vous plus bas pour lister tous les épisodes liés au sujet de l'alimentation).</i>
            </p>
            <p>
              C'est un rappel pour moi (et vous ?) de continuer à écouter / lire des contenus proche et moins proche de mon point de vue intial
              pour construire un regard plus englobant et se familiariser avec des manières de voir dfférentes, même si on ne les adopte pas forcément.
            </p>
          </div>
        </section>

        <section id="crosspodcast">
        {separator}
          <div className='textContainer'>
            <h2>Créateurs de podcasts ... aussi invités de podcasts</h2>
            <p>
            Petit bonus fun de fin, les créateurs de {podcastChip('Sismique')} et {podcastChip('Ozé. Comprendre. S\'inspirer. S\'engager')}
            ont été invités sur {podcastChip('Plan(s) B')}. On a également un épisode du podcast {podcastChip('Ozé. Comprendre. S\'inspirer. S\'engager')} 
            où l'invité est le créateur de {podcastChip('Sismique')}.
            </p>
            <p>
            Je voudrais bien voir un jour la créatrice de {podcastChip('Présages')} invitée également <i>(même si elle n'a pas - encore ? - écrit de livre
            à l'inverse des deux autres).</i>
            </p>
          </div>
        </section>

        <section id="gender">
          {separator}
          <div className='textContainer'>
            <h2>Petit apparté sur la représentativité des invité·e·s</h2>
            <p>
                Il y a telelment d'aspect de représentativité qu'il serait intéressant d'explorer ! Sur l'âge des invité·e·s, leurs
                professions et domaines d'activité ou leurs nationalités. Il reste un aspect qui est aussi pertinent et plus simple
                à regarder : le genre des invité·e·s.
            </p>
            <p>
                Alors, a-t-on des femmes invitées dans ces podcasts ?
            </p>
            <Gender allEpisodes={allEpisodes} />
            <p>
            {podcastChip('Ozé. Comprendre. S\'inspirer. S\'engager')} et {podcastChip('Présages')}
                se démarquent largement avec plus de 40% de femmes invitées. Note : pour Ozé, un certain nombre d'épisodes sont de type "témoignages"
                pour relater le parcours des invité·e·s et sont peut-être moins orienté expertise <i>(ces épisodes sont des fois indiqués avec la mention #Parcours
                dans le titre)</i>
            </p>
            
          </div>
          
        </section>

        <section id="explore">
          {separator}
          <h1>Explorez les podcasts</h1>

          <div className='textContainer'>
            <p>À vous d'explorer maintenant ! Il est possible de filtrer par thème et par invité·e.</p>
          </div>
          <p>Podcasts listés : </p>
          {podcastsChips}

          {detailClick}

          <div className='textContainer'>
            <p>
              La catégorisation par thème est ici tout à fait subjective et toujours en cours. Le sujet <b>alimentation</b> est chapeau pour
              les sujets d'agriculture par exemple. Le thème <b>intériorité</b> par de ce qui nous traverse, nos doutes, nos biais et nos manières
              d'expérimenter le monde. Les <b>luttes</b> englobent la perspectives qui questionnent les rapports de pouvoirs.
            </p>
            <p>
              Un épisode peut bien sûr être lié à plusieurs thèmes. Le fichier original et la catégorisation sont accessible sur github (voir bas de page).
            </p>
          </div>
          
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
