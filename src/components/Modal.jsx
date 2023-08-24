import PropTypes from 'prop-types';

import '../styles/modal.css';
import { podcastsConfig } from '../config';

const Modal = ({ episode = {}, onClose }) => {
  const isEmpty = Object.keys(episode).length === 0;
  const color = podcastsConfig[episode?.podcast]?.color;
  
  return (
    !isEmpty && (
      <div className="modal" onClick={e => {
        onClose(e);
      }}>
        <div className="modal-content" onClick={e => e.stopPropagation()} style={{ borderTop: `6px solid ${color}`}}>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <img src={episode.image300} />
            <div style={{ padding: '1em' }}>
              <h3 style={{ margin: 0 }}>{episode.name}</h3>
              <div
                className="podcast"
                key={episode.podcast}
                style={{ backgroundColor: color, marginLeft: 0 }}
              >
                {episode.podcast}
              </div>
              <p>{episode.date}</p>
              {episode.guest && (
                <p>Avec {
                  episode.guest.split(',').map(g =>
                    <span key={g}>{g}</span>
                  )}
                </p>
              )}
              <p>{
                episode.category.split(',').map(c =>
                  <span
                    className="category"
                    key={c}
                  >
                      {c}
                  </span>
                )}
              </p>
              <a href={episode.spotifyUrl} target="_blank" rel="noreferrer">Ecouter sur spotify</a>
            </div>
            <button
              onClick={e => {
                onClose(e);
              }}
            >
              ✕
            </button>
          </div>
          <p style={{ fontWeight: 300 }}>{episode.description}</p>
        </div>
      </div>
    )
  );
}

Modal.propTypes = {
  episode: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Modal