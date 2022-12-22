import Container from '@mui/material/Container';
import { useState } from 'react'
import { CommentProvider } from './commentContext';
import TextareaValidator from './components/AddComment'
import { Comment } from './components/Comment';




function App() {
  
  return (
    <div style={{
      backgroundColor:'hsl(228, 33%, 97%)', 
      minHeight: '100vh', 
      minWidth: '800px',
      }}>
       <Comment />
      <CommentProvider>
       
    <TextareaValidator/>
    </CommentProvider>
    <div style={{height:'200px'}}></div>
    </div>
  )
}

export default App
