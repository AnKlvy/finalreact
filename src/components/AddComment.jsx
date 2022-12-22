import * as React from 'react';
import {CommentContext} from './../commentContext'

import Grid from '@mui/material/Unstable_Grid2';

import { Box, Button, Avatar, Textarea} from '@mui/joy';


export default function TextareaValidator() {
  const [italic, setItalic] = React.useState(false);
  const [fontWeight, setFontWeight] = React.useState('normal');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const {IMG} = React.useContext(CommentContext);
  return (
    <div style={{display:'flex', 
    justifyContent:'center'}}>
      
      <Grid container spacing={5} 
      sx = {{
        backgroundColor:'white', 
        borderRadius:6, 
        position:'fixed',
        bottom:'80px',
        width:'60%'
        }}>   
        <Grid xs={1}>
        <Avatar
              src={IMG.juliusomo}
              variant="rounded"
              alt="user-avatar"
            />
        </Grid>
      <Grid xs={9}>
      <Textarea
        placeholder="Add a comment..."
        minRows={3}
        endDecorator={
          <Box
            sx={{
              display: 'flex',
              // gap: 'var(--Textarea-paddingBlock)',
              // pt: 'var(--Textarea-paddingBlock)',
              borderTop: '1px solid',
              borderColor: 'divider',
              flex: 'auto',
            }}
          >
            
          </Box>
        }
        
        sx={{
          minWidth: 400,
          fontWeight,
          // fontStyle: italic ? 'italic' : 'initial',
        }}
      />
      </Grid>
      <Grid xs='auto'>
     
      <Button sx={{
        backgroundColor:'hsl(238, 40%, 52%)', 
        width:'110px', 
        height:'50px',
        fontSize:'18px'}}>SEND</Button>
    
      </Grid>
      </Grid>
    </div>
    
    
  );
}
