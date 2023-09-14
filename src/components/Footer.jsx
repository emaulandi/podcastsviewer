const Footer = () => (
  <div className="footer">
    <div className="footerContent">
      <p><a target='_blank' rel="noreferrer" href='https://github.com/emaulandi/podcastsviewer'>Code et données disponibles sur github</a></p>
      <p>
        La collecte des données a été réalisée grâce à
        <a target='_blank' rel="noreferrer" href='https://developer.spotify.com/documentation/web-api'>l'API de Spotify </a> 
         et un petit script python pour la récupération et la fusion des épisodes des 4 podcasts. Pour chaque épisode, les invité·e·s ont été 
        extraits des description (ainsi que leur genre absé sur leur prénom). Un ou des thème a été rajouté subjectivement à la main.
      </p>
      <p><a target='_blank' rel="noreferrer" href='https://emaulandi.github.io/portfolio/'>Voir d'autres réalisations</a></p>
    </div>
  </div>
);

export default Footer