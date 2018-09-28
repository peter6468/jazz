import React from 'react';

const Container = props =>
    <div className = {`contianer${props.fluid ? "-fluid" : ""}`}>
    {props.children}
    </div>;

export default Container;