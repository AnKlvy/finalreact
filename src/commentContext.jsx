import { createContext, useState } from "react";
import data from "./data.json";
import amyrobson from "./images/avatars/image-amyrobson.png";
import maxblagun from "./images/avatars/image-maxblagun.png";
import ramsesmiron from "./images/avatars/image-ramsesmiron.png";
import juliusomo from "./images/avatars/image-juliusomo.png";

export const CommentContext = createContext();
const IMG = { amyrobson, maxblagun, ramsesmiron, juliusomo };
const { comments, currentUser } = data;

export const CommentProvider = ({children}) =>{
    const [commentSection, setCommentSection] = useState(comments);
    const addComment = (data) => {
      setCommentSection([
        ...commentSection,
        {
          id: Math.floor(Math.random() * 10000),
          content: data,
          createdAt: "Just now",
          score: 0,
          replies: [],
          user: { username: "juliusomo" },
        },
      ]);
    };
  
    const deleteComment = (commentId) => {
      setCommentSection(
        commentSection.filter((comment) => comment.id !== commentId)
      );
    };


    return(
        <CommentContext.Provider
        value={{
            IMG,
            currentUser,
            commentSection,
            addComment,
            deleteComment
            }}>
            {children}
        </CommentContext.Provider>
    );
}

