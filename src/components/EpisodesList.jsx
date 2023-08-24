import PropTypes from 'prop-types';

import { podcastsConfig } from "../config";

const EpisodesList = ({
  episodes = [],
  onEpisodeClick = () => {},
  additionalStyle = {},
  borderSize = '5px',
  borderType = 'top',
}) => (
  <div className="episodes">
    {episodes.map(episode => (
      <div
        className="episode"
        key={episode.name}
        style={{
            borderTop: borderType === 'top' && `solid ${borderSize} ${podcastsConfig[episode.podcast].color}`,
            borderLeft: borderType === 'left' && `solid ${borderSize} ${podcastsConfig[episode.podcast].color}`,
            display: 'flex',  alignItems: 'center', justifyContent: 'center',
            ...additionalStyle
          }}
          onClick={() => onEpisodeClick(episode)}
      >
        <span>{episode.name}</span>
      </div>
    ))}
  </div>
);

EpisodesList.propTypes = {
  episodes: PropTypes.array.isRequired,
  onEpisodeClick: PropTypes.func.isRequired,
  additionalStyle: PropTypes.object.isRequired,
  borderSize: PropTypes.string.isRequired,
  borderType: PropTypes.string.isRequired,
}

export default EpisodesList