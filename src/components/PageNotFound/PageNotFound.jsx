import "./PageNotFound.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

function PageNotFound() {
  const navigate = useNavigate();

  function handleBackButton() {
      navigate(-1)
  }

  return (
    <section className="pageNotFound">
      <div className="pageNotFound__container">
        <h2 className="pageNotFound__title">404</h2>
        <p className="pageNotFound__subtitle">Страница не найдена</p>
      </div>
      <Link className="pageNotFound__link" onClick={handleBackButton}>Назад</Link>
    </section>
  );
}

export default PageNotFound;
