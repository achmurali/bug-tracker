//@ts-nocheck
import { Typography } from '@material-ui/core';
import React, { useEffect, useLayoutEffect } from 'react';

import './pageNotFound.css'

const PageNotFound = () => {
    let player;

    // adjust skybox height to multiple of 32
    useLayoutEffect(() => {
        player = document.getElementById('player');
        let h = document.getElementById('skybox').offsetHeight;
        let s_h = Math.round(h / 32) * 32;
        document.getElementById('skybox').style.height = `${s_h}px`;
    },[]);

    function walkLeft() {
        player.className = "walk-left";
        setTimeout(searchLeft, 1000);
    }
    function searchLeft() {
        player.className = "search-left";
        // player.style.left = "40%";
        setTimeout(walkRight, 3000);
    }
    function walkRight() {
        player.className = "walk-right";
        setTimeout(searchRight, 1000);
    }
    function searchRight() {
        player.className = "search-right";
        // player.style.left = "60%";
        setTimeout(walkLeft, 3000);
    }

    useEffect(() => {
        walkLeft();
    },[])
    return (
        <div className="main-body">
        <div id="skybox" className="skybox">
            <div className="txt"> Game over
            <br />
                <span>404 FILE NOT FOUND</span>
            </div>
            <div id="player" className="idle"></div>
            <div className="ground"></div>
        </div>
        </div>  
    )
}

export default PageNotFound;