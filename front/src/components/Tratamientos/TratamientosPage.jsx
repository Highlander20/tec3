import React from 'react';

const TratamientosPage = ({ onBack }) => {
    return (
        <div>
            {/* Botón de regresar */}
            <button className="back-button" onClick={onBack}>
                Regresar
            </button>

            <h1>Lista de Tratamientos</h1>
            <p>Aquí aparecerán todos los Tratamientos</p>
        </div>
    );
};

export default TratamientosPage;
