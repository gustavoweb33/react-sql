import React from 'react';
import Degrees from './Degrees/Degree';
import style from '../../Global.module.css';


const degree = ({ department, change, degrees }) => {
    const degree = degrees.length === 0 ? null : <Degrees degrees={degrees} />
   
    return (
        <div className={style.space}>
            <select onChange={change}>
            <option value = {' '}>DEPARTMENT</option>
                {
                    department.map(name => <option key={name} value={name}> {name} </option>)
                }
            </select>
            {degree}
        </div>
    )
}

export default degree;

