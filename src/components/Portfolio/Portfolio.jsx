import './Portfolio.css';
import link from '../../images/link.svg'

function Portfolio() {
    return (
        <section className='portfolio'>
            <h2 className='portfolio__title'>Портфолио</h2>

            <div className='portfolio__links'>
                <a className='portfolio__link' href="#">
                    <p className='portfolio__link-text'>Статичный сайт</p>
                    <img src={link} alt="фавикон ссылки" />
                </a>
                <a className='portfolio__link' href="#">
                    <p className='portfolio__link-text'>Адаптивный сайт</p>
                    <img src={link} alt="фавикон ссылки" />
                </a>
                <a className='portfolio__link' href="#">
                    <p className='portfolio__link-text'>Одностраничное приложение</p>
                    <img src={link} alt="фавикон ссылки" />
                </a>
            </div>
        </section>
    );
}

export default Portfolio;