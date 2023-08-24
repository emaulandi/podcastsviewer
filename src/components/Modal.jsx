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
          <div style={{ textAlign: 'right' }}>
            <button
              style={{ fontWeight: 300, fontStyle: 'italic' }}
              onClick={e => {
                onClose(e);
              }}
            >
              ✕ Fermer
            </button>
          </div>
          <div style={{ display: 'flex', gap: '1em', flexWrap: 'wrap' }}>
            <div>
              <img style={{ width: '200px' }} src={episode.image300} />
            </div>
            <div>
              <div
                className="podcast"
                key={episode.podcast}
                style={{ backgroundColor: color, marginLeft: 0 }}
              >
                {episode.podcast}
              </div>
              <h3 style={{ margin: 0 }}>{episode.name}</h3>
              <a href={episode.spotifyUrl} target="_blank" rel="noreferrer">Ecouter sur spotify</a>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5em' }}>
              {episode.guest && (
                <span>Avec {
                  episode.guest.split(',').map(g =>
                    <span key={g}>{g}</span>
                  )}
                </span>
              )}
              <span style={{ fontWeight: 300, fontStyle: 'italic' }}>({episode.date})</span>
              </div>
              <div style={{ marginTop: '0.5em', marginBottom: '0.5em' }}>{
                episode.category.split(',').map(c =>
                  <span
                    className="chip"
                    key={c}
                  >
                    {c}
                  </span>
                )}
              </div>
            </div>
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