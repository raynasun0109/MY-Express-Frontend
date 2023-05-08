import React, { useEffect, useState } from 'react';
import './MerchantPaid.scss';
import MerchantLayout from '../../MerchantLayout/MerchantLayout';
import Cookies from 'universal-cookie';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import moment from "moment";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import {getTranscationFromSameMerchant,updateOneTransaction} from "../../../../service/TransactionService";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const cookies = new Cookies();

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
    },
    [`&.${tableCellClasses.body}`]: {
    },
}));

const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER_BY = 'calories';
const DEFAULT_ROWS_PER_PAGE = 5;

function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}

  // Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
  // stableSort() brings sort stability to non-modern browsers (notably IE11). If you
  // only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
  // with exampleArray.slice().sort(exampleComparator)
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

function MerchantPaid(){
    const [order, setOrder] = React.useState(DEFAULT_ORDER);
    const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [visibleRows, setVisibleRows] = React.useState(null);
    const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
    const [paddingHeight, setPaddingHeight] = React.useState(0);
    const [tranList, setTranList] = useState([]);
    const [status, setStatus] = useState('');

    const [cookie,setCookie]=useState('')
    const [openAdd, setOpenAdd] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [tempUpdate, setTempUpdate] = useState({});


    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);
    // const handleOpenUpdate = () => setOpenUpdate(true);
    const handleCloseUpdate = () => setOpenUpdate(false);

    function handleOpenUpdate(data){
        setTempUpdate(data)
        setOpenUpdate(true);
    }
    useEffect(() => {
        fetchCookie()
    }, []);

    function fetchCookie(){
        setCookie(cookies.get('myShopaholic')?cookies.get('myShopaholic'):'')
        fetchTranList(cookies.get('myShopaholic')?cookies.get('myShopaholic'):'')
    }

    function fetchTranList(id){
        getTranscationFromSameMerchant({merchant_uuid:id.uuid,status:"paid"})
            .then(res => {
                setTranList(res.data)
            })
    }
    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
      };
    const handleChangePage = React.useCallback(
        (event, newPage) => {
          setPage(newPage);
    
          const sortedRows = stableSort(tranList, getComparator(order, orderBy));
          const updatedRows = sortedRows.slice(
            newPage * rowsPerPage,
            newPage * rowsPerPage + rowsPerPage,
          );
    
          setVisibleRows(updatedRows);
    
          // Avoid a layout jump when reaching the last page with empty rows.
          const numEmptyRows =
            newPage > 0 ? Math.max(0, (1 + newPage) * rowsPerPage - tranList.length) : 0;
    
          const newPaddingHeight = (dense ? 33 : 53) * numEmptyRows;
          setPaddingHeight(newPaddingHeight);
        },
        [order, orderBy, dense, rowsPerPage],
    );

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tranList.length) : 0;

    const handleChangeRowsPerPage = React.useCallback(
        (event) => {
          const updatedRowsPerPage = parseInt(event.target.value, 10);
          setRowsPerPage(updatedRowsPerPage);
          setPage(0);
          const sortedRows = stableSort(tranList, getComparator(order, orderBy));
          const updatedRows = sortedRows.slice(
            0 * updatedRowsPerPage,
            0 * updatedRowsPerPage + updatedRowsPerPage,
          );
          setVisibleRows(updatedRows);
          // There is no layout jump to handle on the first page.
          setPaddingHeight(0);
        },
        [order, orderBy],
    );

    const handleUpdateProduct=(event)=>{
        event.preventDefault();
        const data = {
            uuid: tempUpdate.transaction_uuid,
            status,
          }

          updateOneTransaction(data).then(res => {
                if(res.status==200){
                    fetchTranList(cookie)
                    handleCloseUpdate()
                } else{
                    console.log("update tran failed")
                }
        })
    }

    return (
        <MerchantLayout>
             <TableContainer className="merchant_tran_paid_container_bottom">
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead className="merchant_tran_container_bottom_table_head">
                        <TableRow className="merchant_tran_container_bottom_table_row">
                            <StyledTableCell>UUID</StyledTableCell>
                            {/* <StyledTableCell>Customer</StyledTableCell> */}
                            <StyledTableCell>Image</StyledTableCell>
                            <StyledTableCell>Products</StyledTableCell>
                            <StyledTableCell>Amount</StyledTableCell>
                            <StyledTableCell>Total</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell>Created</StyledTableCell>
                            <StyledTableCell>Updated</StyledTableCell>
                            <StyledTableCell>Modify</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody className="merchant_tran_container_bottom_body">
                    {tranList&&(rowsPerPage > 0
                        ? tranList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : tranList
                    ).map((row) => (
                        <TableRow key={row.uuid}>
                            <TableCell component="th" scope="row">
                                {row.transaction_uuid}
                            </TableCell>
                            {/* <TableCell>
                                {row.user_first_name} {row.user_last_name}
                            </TableCell> */}
                            <TableCell className="merchant_tran_container_img">
                                <img src={JSON.parse(row.product_content)[0].image}/>
                            </TableCell>
                            <TableCell>
                                {JSON.parse(row.product_content)[0].name}
                            </TableCell>
                            <TableCell className="merchant_tran_container_center">
                                {JSON.parse(row.product_content)[0].qty}
                            </TableCell>
                            <TableCell className="merchant_tran_container_center">
                                {row.total}
                            </TableCell>
                            <TableCell className="merchant_tran_container_status_container">
                                <span className={`merchant_tran_container_${row.status}`}>{row.status}</span>
                            </TableCell>
                            <TableCell>
                            {moment(JSON.parse(row.created_at)).format('YYYY-MM-DD HH:mm:ss')}
                            </TableCell>
                            <TableCell>
                            {moment(JSON.parse(row.update_at)).format('YYYY-MM-DD HH:mm:ss')}
                            </TableCell>
                            <TableCell className="merchant_tran_container_bottom_body_btn_container">
                                <Button variant="outlined" className="merchant_tran_update_btn" onClick={()=>handleOpenUpdate(row)}>Update</Button>
                            </TableCell>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={tranList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <Modal
                className="merchant_tran_container"
                open={openUpdate}
                onClose={handleCloseUpdate}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <form component="form" className="add_product_container_box" onSubmit={handleUpdateProduct}>
                    <Typography id="modal-modal-title" className="add_product_container_box_title">
                        Update Transaction Status
                    </Typography>
                    <div className="add_product_container_box_content">
                        <div className="add_product_container_box_content_title">
                            Status:
                        </div>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={status}
                                label="status"
                                onChange={handleChangeStatus}
                                >
                                    <MenuItem value={'Paid'}>Paid</MenuItem>
                                    <MenuItem value={'Processing'}>Processing</MenuItem>
                                    <MenuItem value={'Shipped'}>Shipped</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>

                    <Button
                            type="submit"
                            variant="contained"
                            className="add_confirm_btn"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Update
                        </Button>
                </form>
            </Modal>
        </MerchantLayout>
    )
}

export default MerchantPaid;