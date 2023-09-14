import PropTypes from 'prop-types';

import { group } from 'd3-array';

import { podcastsConfig } from "../config";

const Gender = ({ allEpisodes }) => {
  const genderRatio = Array.from(group(allEpisodes, p => p.podcast))
    .map(([podcast, episodes]) => {

      const genderList = episodes.map(e => e.guestGender.split(',')).flat();
      const guestCount = genderList.length;
      const womenCount = genderList.filter(g => g === 'f').length;
      
      return ({
        podcast,
        womenRatio: Math.round(womenCount / guestCount * 100),
      });
    })
    .sort((a,b) => a.womenRatio < b.womenRatio);
  
  return (
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.25)', borderBottom: '1px solid rgba(255,255,255,0.25)' }}>
      <h4>Pourcentages de femmes invitées par podcast</h4>
      <p style= {{ fontSize: 'small', fontStyle: 'italic' }}>Pour centage calculé sur le nombre total d'invité·e·s (si deux personnes sont invités dans un
      épisode, cela compte pour deux invité·e·s)</p>
      {genderRatio.map(({ podcast, womenRatio }) => (
        <div key={podcast} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '0.5em' }}>
          <div style={{ height: '30px', width: `${womenRatio * 2}px`, backgroundColor: podcastsConfig[podcast].color }}/>
          <p>{podcast}</p>
          <p style={{ fontStyle: 'italic' }}>{`(${womenRatio} %)`}</p>
        </div>
      ))}
    </div>
  );
};

Gender.propTypes = {
  allEpisodes: PropTypes.array.isRequired,
}

export default Gender