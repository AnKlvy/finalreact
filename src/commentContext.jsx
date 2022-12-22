import { createContext, useState } from "react";
import data from "./data.json";
import amyrobson from "./images/avatars/image-amyrobson.png";
import maxblagun from "./images/avatars/image-maxblagun.png";
import ramsesmiron from "./images/avatars/image-ramsesmiron.png";
import juliusomo from "./images/avatars/image-juliusomo.png";

export const CommentContext = createContext();
const IMG = { amyrobson, maxblagun, ramsesmiron, juliusomo };

export const CommentProvider = ({children}) =>{
    return(
        <CommentContext.Provider
        value={{IMG}}>
            {children}
        </CommentContext.Provider>
    );
}

