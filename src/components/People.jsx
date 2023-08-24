import PropTypes from 'prop-types';

import { group } from 'd3-array';

import EpisodesList from './EpisodesList';

const numberEmojis = {
  2: '2️⃣',
  3: '3️⃣',
  4: '4️⃣',
}

const People = ({ allEpisodes = [], famousGuests = [], onEpisodeClick = () => {} }) => {

  const guestsOccurenceByPodcast = famousGuests.map(guest => {
    const podcastsByGuest = allEpisodes.reduce((acc, curr) => {
      const episodeContainGuest = curr.guest.split(',').includes(guest);
      return episodeContainGuest ? acc.add(curr.podcast) : acc, acc
    }, new Set());

    return { guest, uniquePodcastCount: podcastsByGuest.size };
  });

  const mainGuests = guestsOccurenceByPodcast.filter(({ uniquePodcastCount }) => uniquePodcastCount > 1);
  const mainGuestsByPodcastCount = group(mainGuests, d => d.uniquePodcastCount);

  return (
    <div className="figure" style={{ textAlign: 'left' }}>
      {Array.from(mainGuestsByPodcastCount)
        .sort((a,b) => a[1] > b[1]) // [key, value]
        .map(([uniquePodcastCount, guests]) => (
        <div key={uniquePodcastCount} style={{ marginTop: '1em' }}>
          <div style={{ marginBottom: '0.8em' }}>
            <span>{
              `
              ${numberEmojis[uniquePodcastCount]} 
              Apparaît dans 
              ${uniquePodcastCount === 4 ? 'tous les' : uniquePodcastCount}
              podcasts`
          }</span>
          </div>
          <div className="filters" style={{ marginBottom: '0.5em' }}>
            {guests.map(({ guest }) => (
              <div key={guest}>
                <span key={guest} className="chip" style={{ fontWeight: 900 }}>{guest}</span>
                  {uniquePodcastCount > 2 && (
                    <div style={{ marginTop: '0.5em', marginBottom: '1em' }}>
                      <EpisodesList
                        episodes={allEpisodes.filter(({ guest: episodeGuest }) => episodeGuest.split(',').includes(guest))}
                        onEpisodeClick={onEpisodeClick}
                        borderSize={'4px'}
                        borderType={'left'}
                        additionalStyle={{
                          width: '150px', height:'40px', minHeight: 0, overflow: 'hidden',
                          fontSize: 'small', alignItems: 'start', paddingLeft: '8px'
                        }}
                      />
                    </div>
                  )}

              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

People.propTypes = {
  allEpisodes: PropTypes.array.isRequired,
  famousGuests: PropTypes.array.isRequired,
  onEpisodeClick: PropTypes.func.isRequired,
}

export default People