import "./Techs.css";

function Techs() {
  return (
    <section className="techs" id="techs">
      <h2 className="techs__title">Технологии</h2>

      <div className="techs__description">
        <h3 className="techs__description-title">7 технологий</h3>
        <p className="techs__description-text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
      </div>

      <div className="techs__info">
        <p className="techs__info-block">HTML</p>
        <p className="techs__info-block">CSS</p>
        <p className="techs__info-block">JS</p>
        <p className="techs__info-block">React</p>
        <p className="techs__info-block">Git</p>
        <p className="techs__info-block">Express.js</p>
        <p className="techs__info-block">mongoDB</p>
      </div>
    </section>
  );
}

export default Techs;
