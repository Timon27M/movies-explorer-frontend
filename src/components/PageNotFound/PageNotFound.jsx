import './PageNotFound.css';
import { Link } from 'react-router-dom';

function PageNotFound() {
    return (
        <section className='pageNotFound'>
            <div className="pageNotFound__container">
                <h2 className="pageNotFound__title">404</h2>
                <p className="pageNotFound__subtitle">Страница не найдена</p>
            </div>
            <Link className="pageNotFound__link">Назад</Link>
        </section>
    );
}

export default PageNotFound;