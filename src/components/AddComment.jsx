import * as React from 'react';
import {CommentContext} from './../commentContext'

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { Avatar } from '@mui/joy';
// import { Avatar } from '@mui/material';

export default function TextareaValidator() {
  const [italic, setItalic] = React.useState(false);
  const [fontWeight, setFontWeight] = React.useState('normal');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const {IMG} = React.useContext(CommentContext);
  return (
    <div style={{display:'flex', justifyContent:'center'}}>
      {/* <FormLabel>Your comment</FormLabel> */}
      <Grid container spacing={5} 
      sx = {{
        backgroundColor:'white', 
        borderRadius:6, 
        position:'fixed',
        bottom:'100px',
        width:'50%'
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
              gap: 'var(--Textarea-paddingBlock)',
              pt: 'var(--Textarea-paddingBlock)',
              borderTop: '1px solid',
              borderColor: 'divider',
              flex: 'auto',
            }}
          >
            <IconButton
              variant="plain"
              color="neutral"
              onClick={(event) => setAnchorEl(event.currentTarget)}
            >
              <FormatBold />
              <KeyboardArrowDown fontSize="md" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              size="sm"
              placement="bottom-start"
              sx={{ '--List-decorator-size': '24px' }}
            >
              {['200', 'normal', 'bold'].map((weight) => (
                <MenuItem
                  key={weight}
                  selected={fontWeight === weight}
                  onClick={() => {
                    setFontWeight(weight);
                    setAnchorEl(null);
                  }}
                  sx={{ fontWeight: weight }}
                >
                  <ListItemDecorator>
                    {fontWeight === weight && <Check fontSize="sm" />}
                  </ListItemDecorator>
                  {weight === '200' ? 'lighter' : weight}
                </MenuItem>
              ))}
            </Menu>
            <IconButton
              variant={italic ? 'soft' : 'plain'}
              color={italic ? 'primary' : 'neutral'}
              aria-pressed={italic}
              onClick={() => setItalic((bool) => !bool)}
            >
              <FormatItalic />
            </IconButton>
            
          </Box>
        }
        
        sx={{
          minWidth: 400,
          fontWeight,
          fontStyle: italic ? 'italic' : 'initial',
        }}
      />
      </Grid>
      <Grid xs={2}>
     
      <Button sx={{backgroundColor:'hsl(238, 40%, 52%)'}}>Send</Button>
    
      </Grid>
      </Grid>
    </div>
    
    
  );
}
