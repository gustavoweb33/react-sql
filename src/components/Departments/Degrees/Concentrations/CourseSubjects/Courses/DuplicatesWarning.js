import React from 'react';

const duplicateWaring = ({ duplicates }) => {
    console.log(duplicates)
    return (
        <div>
        <h3>Warning. You have duplicate courses. Please remove any duplications to continue.</h3>
            {
                duplicates.map((duplicate, index) => {
                    return <ul key={index}>
                        <li>
                            {duplicate}
                        </li>

                    </ul>
                })
            }
        </div>
    )
}


export default duplicateWaring;