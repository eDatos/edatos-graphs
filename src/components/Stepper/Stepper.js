import React from 'react';
import {
  FaCloudUploadAlt,
  FaChartBar,
  FaMap,
  FaPalette,
  FaShareAlt,
} from 'react-icons/fa';
import style from './Stepper.module.scss'; // Archivo de estilos CSS para el Stepper
import cn from 'classnames'; // Librería para manejar clases de CSS

function Stepper() {
  return (
    <div className={style.stepper}>
      <div className={style.step}>
        <div className={cn(style.stepIcon, style.active)}>
          <span>1</span>
          <FaCloudUploadAlt />
        </div>
        <div className={style.stepText}>Cargar datos</div>
      </div>
      <div className={style.step}>
        <div className={style.stepIcon}>
          <span>2</span>
          <FaChartBar />
        </div>
        <div className={style.stepText}>Escoger gráfico</div>
      </div>
      <div className={style.step}>
        <div className={style.stepIcon}>
          <span>3</span>
          <FaMap />
        </div>
        <div className={style.stepText}>Mapear</div>
      </div>
      <div className={style.step}>
        <div className={style.stepIcon}>
          <span>4</span>
          <FaPalette />
        </div>
        <div className={style.stepText}>Personalizar</div>
      </div>
      <div className={style.step}>
        <div className={style.stepIcon}>
          <span>5</span>
          <FaShareAlt />
        </div>
        <div className={style.stepText}>Exportar</div>
      </div>
    </div>
  );
}

export default Stepper;
