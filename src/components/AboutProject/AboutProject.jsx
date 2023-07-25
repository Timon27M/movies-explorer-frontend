import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="aboutProject" id="aboutProject">
      <h2 className="aboutProject__title">О проекте</h2>

      <div className="aboutProject__info">
        <div className="aboutProject__description">
          <h3 className="aboutProject__description-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="aboutProject__description-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="aboutProject__description">
          <h3 className="aboutProject__description-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="aboutProject__description-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>

      <div className="aboutProject__container">
        <div className="aboutProject__line aboutProject__line_type_green">
          <h3 className="aboutProject__line-title aboutProject__line-title_type_green">
            1 неделя
          </h3>
          <p className="aboutProject__line-info">Back-end</p>
        </div>

        <div className="aboutProject__line aboutProject__line_type_white">
          <h3 className="aboutProject__line-title aboutProject__line-title_type_white">
            4 неделя
          </h3>
          <p className="aboutProject__line-info">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
