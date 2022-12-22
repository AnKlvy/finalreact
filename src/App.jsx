import Container from '@mui/material/Container';
import { useState } from 'react'
import { CommentProvider } from './commentContext';
import TextareaValidator from './components/AddComment'




function App() {
  

  return (
    <Container maxWidth="sm" sx={{backgroundColor:'hsl(228, 33%, 97%)', minHeight: '100vh', minWidth: '800px'}}>
      <CommentProvider>
    <TextareaValidator />
    </CommentProvider>
    </Container>
  )
}

export default App
