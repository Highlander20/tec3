import React from 'react';

const CitasPage = ({ onBack }) => {
    return (
        <div>
            {/* Botón de regresar */}
            <button className="back-button" onClick={onBack}>
                Regresar
            </button>

            <h1>Lista de Citas Programadas</h1>
            <p>Aquí aparecerán todos las Citas Porgramadas</p>
        </div>
    );
};

export default CitasPage;
