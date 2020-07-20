import React, { Component } from 'react';
import LoaderGif from './../Images/ADWR.gif';
import './Loader.css';

export const Loader = () => {

    return <div className='loader'>
        <img src={LoaderGif} />
    </div>
}