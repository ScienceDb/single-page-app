import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import StringField from './components/StringField'
import IntField from './components/IntField'

/*
  Material-UI components
*/
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

/*
  Styles
*/
const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
  },
  card: {
    margin: 'auto',
    overflow: 'auto',
    height: '100%',
    maxHeight: '80vh'
  },
  cardContent: {
    marginLeft: theme.spacing(0),
    width: '100%',
    maxWidth: 600,
    minWidth: 200,
  },
  ibox: {
    padding: theme.spacing(2),
  },
}));

export default function CreateView(props) {
  /*
    Styles
  */
  const classes = useStyles();

  /*
    Properties
  */
  const { items, valueOkStates, 
          handleFocus, handleBlur, 
          handleFieldReady, handleChange,
          handleKeyDown, handleCancel, handleSave,
        } = props;

  /*
    Hooks
  */
  useEffect(() => {
    console.log("@@- items: ", items);

  }, []);

  /*
    Methods
  */
 function itemHasKey(item, index) {
    if(item !== undefined) {
      return item.key === this.key;
    } else {
      return false;
    }
  }

  function getValueOkStatus(key) {
    let it = undefined;

    //find index
    if(valueOkStates.length > 0) {
      it = valueOkStates.find(itemHasKey, {key:key});
    }
    //update state
    if(it !== undefined) {
      return it.valueOk;
    } else {
      return 0;
    }
  }

  /*
    Handlers
  */
  const handleValueChange = (event, value) => {
    console.log("@@- handleValueChange: ", value);
  }

  /*
    Render
  */
  return (
    <div className={classes.root}>
      <Grid container justify='center'>
        <Grid item xs={12}>
          <Card className={classes.card} 
            elevation={0}
          >
            {/* Message */}
            <CardContent>
              <Typography variant="h5" component="h2">
                Please complete the fields
              </Typography>
            </CardContent>

            {/* Fields */}
            {items.map((item, index) => {
              var valueOk = getValueOkStatus(item.key);
              
              return (
                <CardContent key={item.key} className={classes.cardContent} >

                  {/* Case: String */}
                  {(item.type === 'String') && (
                    <StringField
                      itemKey={item.key}
                      label={item.label}
                      valueOk={valueOk}
                      handleChange={handleValueChange}
                      handleFocus={handleFocus}
                      handleBlur={handleBlur}
                      handleReady={handleFieldReady}
                      handleChange={handleChange}
                      handleKeyDown={handleKeyDown}
                    />
                  )}

                  {/* Case: Int */}
                  {(item.type === 'Int') && (
                    <IntField
                      itemKey={item.key}
                      label={item.label}
                      valueOk={valueOk}
                      handleChange={handleValueChange}
                      handleFocus={handleFocus}
                      handleBlur={handleBlur}
                      handleReady={handleFieldReady}
                      handleChange={handleChange}
                      handleKeyDown={handleKeyDown}
                    />
                  )}

                </CardContent>
              );
            })}

            {/* Actions */}
            <CardActions>

              {/* Action: Cancel */}
              <Button 
                size="small" 
                color="primary"
                onClick={(event) => {
                  if(handleCancel !== undefined) {
                    handleCancel(event);
                  }
                }}
              >
                CANCEL
              </Button>

              {/* Action: Save */}
              <Button 
                size="small" 
                color="primary"
                onClick={(event) => {
                  if(handleSave !== undefined) {
                    handleSave(event);
                  }
                }}
              >
                SAVE
              </Button>

            </CardActions>

          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

/*
  PropTypes
*/
CreateView.propTypes = {
  items: PropTypes.array.isRequired,
};