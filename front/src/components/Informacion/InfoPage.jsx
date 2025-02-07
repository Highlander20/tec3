import React from 'react';
import './info.css';

const InfoPage = ({ onBack }) => {
  return (
    <div className="about-section">
      {/* Botón de regresar */}
      <button className="back-button" onClick={onBack}>
        Regresar
      </button>

      <section className="about-us" id="about">
        <div className="content">
          <h1 className="clinic-name">Clínica Arte Dental</h1>
          <p>
            En Clínica Arte Dental, contamos con un equipo de profesionales altamente capacitados que se dedican a brindar el mejor cuidado dental posible. 
            Desde que entras por nuestra puerta, te recibirán con una sonrisa y te ofrecerán un trato personalizado y humano.
          </p>

          <p>
            Nuestro compromiso es asegurarnos de que cada paciente se sienta cómodo y reciba los mejores tratamientos dentales. Estamos aquí para responder a todas tus preguntas 
            y ofrecerte las soluciones más adecuadas para tus necesidades.
          </p>

          <p>¡Visítanos y descubre cómo podemos ayudarte a mantener tu salud dental en óptimas condiciones!</p>
          
        </div>

        <div className="image">
          <img src="./src/img/foro.jpg" alt="Ilustración de un dentista con un paciente" />
        </div>

      </section>

      <footer className="footer">
        <p>Síguenos en nuestras redes sociales:</p>
        <div className="social-icons">
          <a href="#"><img src="./src/img/face.png" alt="Facebook" /></a>
          <a href="#"><img src="./src/img/instagram.png" alt="Instagram" /></a>
          <a href="#"><img src="./src/img/tiktok.png" alt="TikTok" /></a>
          <a href="#"><img src="./src/img/wasap.png" alt="WhastApp" /></a>
        </div>
      </footer>
    </div>
  );
};

export default InfoPage;
