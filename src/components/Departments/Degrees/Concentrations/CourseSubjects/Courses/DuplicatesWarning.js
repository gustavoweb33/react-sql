import React from 'react';

const duplicateWaring = ({ duplicates }) => {
    console.log(duplicates)
    return (
        <div>
        <h3>Warning. You have duplicate courses. Please remove any duplications to continue.</h3>
            {
                duplicates.map((duplicate) => {
                    return <ul key={duplicate}>
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