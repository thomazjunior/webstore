import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export default function NativeSelectDemo() {
  return (
    <Box sx={{ minWidth: 120, display: 'block', width: 1, padding: 1 }} >
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          De
        </InputLabel>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </NativeSelect>
      </FormControl>
      <FormControl fullWidth sx={{mt: '10px'}}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Até
        </InputLabel>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}