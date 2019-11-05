import React, { useEffect, useRef } from 'react';

/*
  Material-UI components
*/
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
//icons
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles(theme => ({
  textField: {
    margin: 'auto',
    width: '100%',
    maxWidth: 300,
    minWidth: 200,
  },
}));

export default function IntField(props) {
  /*
    Properties
  */
  const classes = useStyles();
  const {
    itemKey,
    label,
    text,
    valueOk,
    handleChange,
    handleFocus,
    handleBlur,
    handleReady,
    handleKeyDown,
  } = props;
  
  /*
    State
  */
  const [value, setValue] = React.useState('');

  /*
    Refs
  */
  const inputRef = useRef(null);
  const textFieldRef = useRef(null);
  
  /*
    Hooks
  */
  useEffect(() => {
    if(text !== undefined && text !== null && text !== '') {
      //update state
      setValue(text);
    }

    //run callback
    if(handleReady !== undefined) {
      handleReady(itemKey, textFieldRef, inputRef);
    }

  }, []);

  return (
        <TextField
          id={"int-field-"+itemKey+'-'+label}
          label={label}
          ref={textFieldRef}
          inputRef={inputRef}
          type="number"
          value={value}
          className={classes.textField}
          margin="normal"
          variant="standard"
          InputProps={{
            endAdornment:
              <InputAdornment position="end">
                {(valueOk!==undefined&&valueOk) ? <CheckIcon color="primary" fontSize="small" /> : ''}
              </InputAdornment>
          }}
          onChange={(event) => {
            //update state
            setValue(event.target.value);

            //run callback
            if(handleChange !== undefined) {
              handleChange(event, event.target.value, itemKey);
            }
          }}
          onFocus={(event) => {
            //run callback
            if(handleFocus !== undefined) {
              handleFocus(event, event.target.value, itemKey);
            }
          }}
          onBlur={(event) => {
            //run callback
            if(handleBlur !== undefined) {
              handleBlur(event, event.target.value, itemKey);
            }
          }}
          onKeyDown={(event) => {
            //run callback
            if(handleKeyDown !== undefined) {
              handleKeyDown(event, event.target.value, itemKey);
            }
          }}
        />
  );
}