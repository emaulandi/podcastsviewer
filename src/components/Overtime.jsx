import PropTypes from 'prop-types';

import { podcastsConfig } from '../config';
import { group } from 'd3-array';

const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const getMonth = date => months[date.getMonth()];
const getDateFr = stringDate => {
  const date = new Date(stringDate);
  return `${getMonth(date)} ${date.getFullYear()}`;
}

const Overtime = ({ episodes = [], onEpisodeClick = () => {} }) => {
  const episodesByYearMonth = group(
    episodes.sort((a,b) => a .date > b.date),
    d => d.date.slice(0,4),
    d => d.date.slice(0,7)
  );

  return Array.from(episodesByYearMonth).map(([year, yearGroupValues]) => (
    <div key={year} style={{ textAlign: 'left', fontWeight: 300, marginTop: '0.5em' }}>
      <span>{year}</span>
      {Array.from(yearGroupValues).map(([monthYear, monthGroupValues]) => (
          <div key={monthYear} className="month">
            {/* <span style={{ width: '130px', textAlign: 'right', fontWeight: 300 }}>{getDateFr(monthYear)}</span> */}
            {/* <span style={{ width: '80px', textAlign: 'right', fontWeight: 300 }}>{getMonth(new Date(monthYear))}</span> */}
            <div className="blocGroup">
              {monthGroupValues.map(e => (
                <div
                  key={e.name}
                  className="episodeBloc"
                  style={{ backgroundColor: podcastsConfig[e.podcast].color }}
                  onClick={() => onEpisodeClick(e)}
                />
              ))}
            </div>
          </div>
      ))}
    </div>
  ));
}

Overtime.propTypes = {
  episodes: PropTypes.array.isRequired,
  onEpisodeClick: PropTypes.func.isRequired,
}

export default Overtime