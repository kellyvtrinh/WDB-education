import React from "react";

const Navbar = ({title, description}) => {

    let x = 5;
    x = 8;

    return (
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
            <p>{x}</p> 

        </div>
    ); 
    // a return is required, and everything in the return
    // needs to be in a div

}

// export so that other files can import!
// remember to import it in the App.js
export default Navbar;