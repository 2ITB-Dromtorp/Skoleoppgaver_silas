import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Report(){

    const navigate = useNavigate();

    return (
        <div>
            dette er report

            <button onClick={() => navigate(-1)}>go back</button>
        </div>
    )
}