import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import LiquorIcon from '@mui/icons-material/Liquor';
import EuroIcon from '@mui/icons-material/Euro';
import RangeValue from './RangeValue';
import SearchAppBar from './Search';
import { useContext, useEffect } from 'react';
import { FilterContext, FilterDispatchContext } from '../components/context/FiltersContext';

export default function Sidebar() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const setFilters = useContext(FilterDispatchContext);
  const filters = React.useContext(FilterContext);

  const  handleAlterFilterName =  async (value) => {
    console.log("========VALUE==========")
    console.log(value)
    console.log("====VALUE=========")
    setFilters({
      filterName: value
    }
    )
    console.log("========FILTER==========")
    console.log(filters)
    console.log("====FILTER=========")
  }

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      className='sidebar'
    >
       <SearchAppBar  handleChange={handleAlterFilterName} />
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <LiquorIcon />
        </ListItemIcon>
        <ListItemText primary="Vinhos e Azeites" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Tinto" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Branco" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Virgem" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <EuroIcon />
        </ListItemIcon>
        <ListItemText primary="Valores" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
           <RangeValue />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}