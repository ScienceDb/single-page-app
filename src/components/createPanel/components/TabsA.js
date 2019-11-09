import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/*
  Material-UI components
*/
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

/*
  Styles
*/
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  actions: {
    height:'100%',
  }
}));

export default function SimpleTabs(props) {
  /*
    Styles
  */
  const classes = useStyles();

  /*
    Properties
  */
  const { 
    value, 
    handleChange,
    handleCancel, 
    handleSave,
  } = props;

  return (
    <div className={classes.root}>
      <Grid container justify='center'>
        <Grid item xs={12}>

          {/* Menú */}
          <Grid container justify='center'>
            
            {/* Tabs */}
            <Grid item xs={5}>
              <Tabs
                value={value}
                onChange={(event, newValue) => {
                  if (handleChange !== undefined) {
                    handleChange(event, newValue);
                  }
                }}>
                <Tab value={0} label="Attributes" />
                <Tab value={1} label="Associations" />
              </Tabs>
            </Grid>

            {/* Actions */}
            <Grid item xs={6}>
              <Grid container className={classes.actions} spacing={1} justify='flex-end'>
                {/* Cancel */}
                <Grid item>
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={(event) => {
                      if (handleCancel !== undefined) {
                        handleCancel(event);
                      }
                    }}
                  >
                    CANCEL
                  </Button>
                </Grid>

                <Grid item>
                  {/* Save */}
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={(event) => {
                      if (handleSave !== undefined) {
                        handleSave(event);
                      }
                    }}
                  >
                    SAVE
              </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container justify='center'>
            <Grid item xs={11}>
              {/* Divider */}
              <Divider orientation="horizontal" />
            </Grid>

          </Grid>

        </Grid>
      </Grid>

    </div>
  );
}