import "./NavTab.css";

function NavTab() {
  return (
    <section className="NavTab">
      <a className="NavTab__link" href="#aboutProject">
        О проекте
      </a>
      <a className="NavTab__link" href="#techs">
        Технологии
      </a>
      <a className="NavTab__link" href="#aboutMe">
        Студент
      </a>
    </section>
  );
}

export default NavTab;
