import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../../requests/index'
import EnhancedTableHead from './components/EnhancedTableHead'
import EnhancedTableToolbar from './components/EnhancedTableToolbar'
import EnhancedTableRow from './components/row/EnhancedTableRow'

/*
  Material-UI components
*/
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Collapse from '@material-ui/core/Collapse';
import Fade from '@material-ui/core/Fade';
import Zoom from '@material-ui/core/Zoom';
import Grow from '@material-ui/core/Grow';
import Slide from '@material-ui/core/Slide';
import Badge from '@material-ui/core/Badge';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

/*
  Icons
*/
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Add from '@material-ui/icons/AddBox';
import Import from '@material-ui/icons/UnarchiveOutlined';
import Export from '@material-ui/icons/SaveAlt';
import Clear from '@material-ui/icons/Clear';
import Delete from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import Search from '@material-ui/icons/Search';
import ArrowRight from '@material-ui/icons/KeyboardArrowRight';

/*
  Styles
*/
const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(7),
    },
    paper: {
        marginBottom: theme.spacing(2),
        overflowX: 'auto',
    }
}));

export default function EnhancedTable(props) {
    /*
      Styles
    */
    const classes = useStyles();
    /*
      Properties
    */
    const { model } = props;
    const headCells = makeHeadCells(props.model.attributes);
    /*
      State
    */
    const [items, setItems] = useState([]);
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState('');
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [selected, setSelected] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isOnApiRequest, setIsOnApiRequest] = useState(true);
    const [isPendingApiRequest, setIsPendingApiRequest] = useState(false);
    const [isGettingFirstData, setIsGettingFirstData] = useState(true); //to avoid repeat initial fetch
    const [searchTimeoutId, setSearchTimeoutId] = useState(0);
    const [isSearchTimeoutOn, setIsSearchTimeoutOn] = useState(false);
    /*
      Store selectors
    */
    const graphqlServerUrl = useSelector(state => state.urls.graphqlServerUrl)
    /*
      Vars
    */
    
    //var isOnApiRequest = false; //context of: getData()
    /*
      Effects
    */
    useEffect(() => {
        /**
         * Debug
         */
        console.log("headCells: ", headCells);

        getData();
    }, []);

    useEffect(() => {
        console.log("new search: ", search, " isGettingFirstData: ", isGettingFirstData);
        
        if(isGettingFirstData) {
          return;
        }

        console.log("IS TIMEOUT ON: ", isSearchTimeoutOn);
        if(isSearchTimeoutOn) {
          //clear current timeout
          window.clearTimeout(searchTimeoutId);
  
          console.log("CLEAR: timeout: ", searchTimeoutId)
        }

        //wait
        waitSearchTimeoutAsync(200);

        //update state
        setIsSearchTimeoutOn(true);

    }, [search]);

    useEffect(() => {
        console.log("new order: ", order);
        if (!isOnApiRequest) {
            getData();
        } else {
          if(!isGettingFirstData)
            setIsPendingApiRequest(true);
        }
    }, [order]);

    useEffect(() => {
        console.log("new orderBy: ", orderBy);
        if (!isOnApiRequest) {
            getData();
        } else {
          if(!isGettingFirstData)
            setIsPendingApiRequest(true);
        }
    }, [orderBy]);

    useEffect(() => {
        console.log("new page: ", page);
        if (!isOnApiRequest) {
            getData();
        } else {
          if(!isGettingFirstData)
            setIsPendingApiRequest(true);
        }
    }, [page]);

    useEffect(() => {
        console.log("new rowsPerPage: ", rowsPerPage);
        if (!isOnApiRequest) {
            getData();
        } else {
          if(!isGettingFirstData)
            setIsPendingApiRequest(true);
        }
    }, [rowsPerPage]);

    useEffect(() => {
      console.log("new isOnApiRequest: ", isOnApiRequest);
      console.log("isPendingApiRequest: ", isPendingApiRequest);
      
      if (!isOnApiRequest && isPendingApiRequest) {
        //reset
        setIsPendingApiRequest(false);

        //get data  
        getData();
      }
    }, [isOnApiRequest]);

    /*
      Methods
    */
    let waitSearchTimeout = ms => new Promise(resolve => {
      
      //set timeout
      let id = window.setTimeout(function() {
        console.log("TRIGGER: T-timeout: ", searchTimeoutId, " T-search: ", search, " T-isOnApiReq: ", isOnApiRequest);
        
        if (!isOnApiRequest) {
          getData();
        } else {
          setIsPendingApiRequest(true);
        }
        
        //update state
        setIsSearchTimeoutOn(false);

        //resolve
        resolve("ok");
      }, ms);

      //update state
      setSearchTimeoutId(id);
      console.log("START: timeout: ", id);

    });

    let waitSearchTimeoutAsync = async ms => {
      await waitSearchTimeout(ms);
    };

    /**
     * makeHeadCells
     *
     * @param {Object} attributes Model attributes object.
     */
    function makeHeadCells(attributes) {

        var headCells = [];
        var attributesKeys = Object.keys(attributes);

        //make id cell
        headCells.push({ key: 0, name: "id", label: "Id", type: "Int" });

        //make attributes cells
        for (var i = 0; i < attributesKeys.length; i++) {
            var o = {};

            //add key
            o.key = i + 1;

            //add name
            o.name = attributesKeys[i];

            //add label
            o.label = makeCellLabel(attributesKeys[i]);

            //add type
            o.type = attributes[attributesKeys[i]];

            //push
            headCells.push(o);
        }
        return headCells;
    }

    function makeCellLabel(text) {

        //capitalize first letter
        var label = text[0].toUpperCase() + text.slice(1);

        return label;
    }

    /**
     * getData
     * 
     * Get @items and @count from GrahpQL Server.
     * Uses current state properties to fill query request.
     * Updates state to inform new @items and @count retreived.
     * 
     */
    function getData() {
        /**
         * Debug
         */
        console.log("@@getData() with: ");
        console.log("@@url: ", graphqlServerUrl);
        console.log("@@search: ", search);
        console.log("@@onApiRequest: ", isOnApiRequest);

        //set state flag
        setIsOnApiRequest(true);

        //reset
        if(isGettingFirstData) {
          setIsGettingFirstData(false);
        }

        /*
          API Request: countItems
        */
        api[model.model].getCountItems(model, graphqlServerUrl, search)
            .then(response => {
                //Check response
                if (
                    response.data &&
                    response.data.data
                ) {
                    /**
                     * Debug
                     */
                    console.log("newCount: ", response.data.data['count'+model.names.namePlCp]);

                    //set new count
                    var newCount = response.data.data['count'+model.names.namePlCp];

                    /*
                      API Request: items
                    */
                    api[model.model].getItems(
                        model,
                        graphqlServerUrl,
                        search,
                        orderBy,
                        order,
                        page * rowsPerPage, //paginationOffset
                        rowsPerPage, //paginationLimit
                    )
                        .then(response => {
                            //check response
                            if (
                                response.data &&
                                response.data.data &&
                                response.data.data[model.names.namePl]) {

                                /**
                                 * Debug
                                 */
                                console.log("@@newCount: ", newCount);
                                console.log("@@newItems: ", response.data.data[model.names.namePl]);

                                //update state
                                setIsOnApiRequest(false);
                                setCount(newCount);
                                setItems(response.data.data[model.names.namePl]);

                                //done
                                console.log("getData: done");
                                return;

                            } else {

                                //error
                                console.log("error1");

                                //done
                                return;
                            }
                        })
                        .catch(err => {

                            //error
                            console.log("error2");

                            //done
                            return;
                        });

                    //done
                    return;

                } else {

                    //error
                    console.log("error3")

                    //done
                    return;
                }
            })
            .catch(err => {

                //error
                console.log("error4: ", err)

                //done
                return;
            });
    }

    /*
      Handlers
    */

    /**
     * On search text changed handler.
     * 
     * @param {String} value New search text value.
     */
    const handleSearchEnter = text => {
      console.log("on HSC: text: ", text);
      
      setSearch(text);
    }


    const handleNewData = ( newCount, newItems) => {
        setCount(newCount); 
        setItems(newItems);
    }

    const handleRequestSort = (event, property) => {
        //invert order
        const isDesc = (order === 'desc');
        setOrder(isDesc ? 'asc' : 'desc');

        if (orderBy !== property) {
            //set new orderBy
            setOrderBy(property);
        }
    };

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = items.map(item => item.id);
            setSelected(newSelecteds);
            return;
        }
        else {
            setSelected([]);
        }
    };

    const handleClickOnRow = (event, item) => {

        console.log("clicked itemId: ", item.id);

        // const selectedIndex = selected.indexOf(name);
        // let newSelected = [];

        // if (selectedIndex === -1) {
        //   newSelected = newSelected.concat(selected, name);
        // } else if (selectedIndex === 0) {
        //   newSelected = newSelected.concat(selected.slice(1));
        // } else if (selectedIndex === selected.length - 1) {
        //   newSelected = newSelected.concat(selected.slice(0, -1));
        // } else if (selectedIndex > 0) {
        //   newSelected = newSelected.concat(
        //     selected.slice(0, selectedIndex),
        //     selected.slice(selectedIndex + 1),
        //   );
        // }

        // setSelected(newSelected);
    };

    const handleRowChecked = (event, item) => {

        const selectedIndex = selected.indexOf(item.id);
        let newSelected = [];

        if (selectedIndex === -1) {
            //select
            newSelected = newSelected.concat(selected, item.id);
        } else if (selectedIndex === 0) {
            //unselect unique item
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            //unselect last item
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            //unselect item in the middle
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        //update state
        setSelected(newSelected);
    }

    const handleRowExpanded = (event, item) => {

        const expandedIndex = expanded.indexOf(item.id);
        let newExpanded = [];

        if (expandedIndex === -1) {
            //select
            newExpanded = newExpanded.concat(expanded, item.id);
        } else if (expandedIndex === 0) {
            //unselect unique item
            newExpanded = newExpanded.concat(expanded.slice(1));
        } else if (expandedIndex === expanded.length - 1) {
            //unselect last item
            newExpanded = newExpanded.concat(expanded.slice(0, -1));
        } else if (expandedIndex > 0) {
            //unselect item in the middle
            newExpanded = newExpanded.concat(
                expanded.slice(0, expandedIndex),
                expanded.slice(expandedIndex + 1),
            );
        }
        //update state
        setExpanded(newExpanded);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = event => {
        setDense(event.target.checked);
    };

    const isSelected = itemId => selected.indexOf(itemId) !== -1;

    const isExpanded = itemId => expanded.indexOf(itemId) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage);

    /*
      Render
    */
    return (
        <div className={classes.root}>
            <Grid container justify='center'>
                <Grid item xs={9} md={11} lg={12}>
                    <Paper className={classes.paper}>

                        {/* Toolbar */}
                        <EnhancedTableToolbar
                            numSelected={selected.length}
                            search={search}
                            title={model.names.namePlCp}
                            onSearchEnter={handleSearchEnter}
                        />

                        {/* Table */}
                        <Table size={dense ? 'small' : 'medium'}>
                            
                            {/* Table Head */}
                            <EnhancedTableHead
                                headCells={headCells}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                rowCount={count}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                            />

                            {/* Table Body */}
                            {(!isOnApiRequest) && (                            
                              <Fade
                                in={true}
                                unmountOnExit
                              >
                                <TableBody>
                                    {
                                        items.map((item, index) => {
                                            const isItemSelected = isSelected(item.id);
                                            const isItemExpanded = isExpanded(item.id);
                                            const itemKeys = Object.keys(item);

                                            return ([
                                                /*
                                                  Table Row
                                                */
                                                <TableRow
                                                    hover
                                                    onClick={event => handleClickOnRow(event, item)}
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={item.id}
                                                    selected={isItemSelected}
                                                >
                                                    {/* Checkbox */}
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            checked={isItemSelected}
                                                            onChange={event => handleRowChecked(event, item)}
                                                        />
                                                    </TableCell>

                                                    {/* Expand icon */}
                                                    <TableCell padding="checkbox">
                                                        <Tooltip title="">
                                                            <IconButton
                                                                color="primary"
                                                                style={{
                                                                    transition: 'all ease 200ms',
                                                                    transform: isItemExpanded ? 'rotate(90deg)' : 'none'
                                                                }}
                                                                onClick={event => handleRowExpanded(event, item)}
                                                            >
                                                                <ArrowRight />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>

                                                    {/*
                                                        Actions:
                                                        - Edit
                                                        - Delete
                                                    */}
                                                    <TableCell padding='checkbox' align='center'>
                                                        <Tooltip title="Edit">
                                                            <IconButton color="primary">
                                                                <Edit fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>

                                                    <TableCell padding='checkbox' align='center'>
                                                        <Tooltip title="Delete">
                                                            <IconButton color="primary">
                                                                <Delete fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>

                                                    {/* Item fields */}
                                                    {headCells.map(head => (
                                                        <TableCell
                                                            key={head.name + item.id}
                                                            align={
                                                                (head.type === 'Int' || head.type === 'Float') ?
                                                                    'right' : 'left'
                                                            }
                                                            padding="default"
                                                        >
                                                            {item[head.name]}
                                                        </TableCell>
                                                    ))}

                                                </TableRow>,
                                                /*
                                                  Detail Row
                                                */
                                                (isItemExpanded) && (
                                                    <TableRow key={"detail-row-" + item.id}>
                                                        <TableCell colSpan={4 + headCells.length} padding="none">
                                                            <EnhancedTableRow
                                                                item={item}
                                                                headCells={headCells}
                                                                toOnes={model.toOnes}
                                                                toManys={model.toManys}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            ]);
                                        })
                                    }
                                    {/* {emptyRows > 0 && (
                                        <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                            <TableCell colSpan={4 + headCells.length} />
                                        </TableRow>
                                    )} */}
                                </TableBody>
                              </Fade>
                            )}
                            {(isOnApiRequest) && (
                              <Fade
                                in={true}
                                unmountOnExit
                              >
                                <TableBody>
                                  <TableRow style={{ height: 53 * 4 }}>
                                    <TableCell colSpan={4 + headCells.length}>
                                      <Grid container>
                                        <Grid item xs={12}>
                                          <Grid container justify="center">
                                            <Grid item>
                                              <CircularProgress color='primary' disableShrink/>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Fade>
                            )}
                        </Table>

                         {/*
                            Pagination
                        */}
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={items.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Paper>
                    
                    <FormControlLabel
                        control={<Switch checked={dense} onChange={handleChangeDense} />}
                        label="Dense padding"
                    />
                </Grid>
            </Grid>
        </div>
    );
}

/*
  PropTypes
*/
EnhancedTable.propTypes = {
    model: PropTypes.PropTypes.exact({
        model: PropTypes.string,
        storageType: PropTypes.string,
        attributes: PropTypes.object,
        associations: PropTypes.object,
        names: PropTypes.object,
        toManys: PropTypes.array,
        toOnes: PropTypes.array,
    }).isRequired,
};