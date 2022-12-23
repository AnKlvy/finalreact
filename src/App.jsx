import Container from '@mui/material/Container';
import { useState, useContext } from 'react'
import { CommentContext, CommentProvider } from './commentContext';
import TextareaValidator from './components/AddComment'
import { Comment } from './components/Comment';




function App() {
  const { commentSection } = useContext(CommentContext);
  
  return (
    <div style={{
      backgroundColor:'hsl(228, 33%, 97%)', 
      minHeight: '100vh', 
      minWidth: '800px',
      }}>
       
      
       
      {commentSection.map((comment) => {
          return <Comment key={comment.id} data={comment} />;
        })}
      
    <TextareaValidator style={{ fontFamily:'https://fonts.google.com/specimen/Rubik'}}/>
    
    <div style={{height:'200px'}}></div>
    </div>
  )
}

export default App
