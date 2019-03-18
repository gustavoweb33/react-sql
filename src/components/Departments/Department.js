import React from 'react';
import Degrees from './Degrees/Degree';
import style from '../../Global.module.css';



const degree = ({ department, change, degrees }) => {
    const degree = degrees.length === 0 ? null : <Degrees degrees={degrees} />

    return (
        <div className={style.space}>
            <div className={style.grid}>
                <select onChange={change}>
                    <option value={' '}>DEPARTMENT</option>
                    {
                        department.map(name => <option key={name} value={name}> {name} </option>)
                    }
                </select>
                {degree}
            </div>
        </div>
    )
}

export default degree;

