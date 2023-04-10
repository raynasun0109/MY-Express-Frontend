import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import UserLayout from '../UserLayout/UserLayout';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'universal-cookie';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import moment from "moment";
import './UserOrders.scss';
import {getOrdersFromOneUser} from '../../../service/OrdersService';
import {getOneTranscationFromOneOrder,getTranscationFromSameOrder} from '../../../service/TransactionService';
import {splitTransactionStringArray,formatted_orderlist_to_user_dashboard,sortTransactionArray} from '../../../utils/functions';
import {mockup_orderListSorted} from '../../../utils/mockups'
const cookies = new Cookies();

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Cupcake', 305, 3.7, 67, 4.3),  createData('Cupcake', 305, 3.7, 67, 4.3),  createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
    },
    [`&.${tableCellClasses.body}`]: {
    },
}));


export default function UserOrders(){
    const [order, setOrder] = React.useState(DEFAULT_ORDER);
    const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [visibleRows, setVisibleRows] = React.useState(null);
    const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
    const [paddingHeight, setPaddingHeight] = React.useState(0);
    const [orderList, setOrderList] = useState([]);
    const [cookie,setCookie]=useState('')
    const [buffer,setBuffer]=useState(true)

    // const [openAdd, setOpenAdd] = useState(false);
    // const [openUpdate, setOpenUpdate] = useState(false);
    // const [tempUpdate, setTempUpdate] = useState({});
    useEffect(() => {
        fetchCookie()
    }, []);

    function fetchCookie(){
        setCookie(cookies.get('myShopaholic')?cookies.get('myShopaholic'):'')
        fetchOrderList(cookies.get('myShopaholic')?cookies.get('myShopaholic'):'')
    }

    function fetchOrderList(id){
        // setOrderList(mockup_orderListSorted)

        getTranscationFromSameOrder({uuid:id.uuid})
            .then(res => {
                // console.log(sortTransactionArray(res.data))
                setOrderList(sortTransactionArray(res.data))
                // console.log('res',formatted_orderlist_to_user_dashboard(res.data))
                // setOrderList(formatted_orderlist_to_user_dashboard(res.data))
                // setBuffer(false)
            })
    }

    const handleChangePage = React.useCallback(
        (event, newPage) => {
          setPage(newPage);
    
          const sortedRows = stableSort(rows, getComparator(order, orderBy));
          const updatedRows = sortedRows.slice(
            newPage * rowsPerPage,
            newPage * rowsPerPage + rowsPerPage,
          );
    
          setVisibleRows(updatedRows);
    
          // Avoid a layout jump when reaching the last page with empty rows.
          const numEmptyRows =
            newPage > 0 ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length) : 0;
    
          const newPaddingHeight = (dense ? 33 : 53) * numEmptyRows;
          setPaddingHeight(newPaddingHeight);
        },
        [order, orderBy, dense, rowsPerPage],
    );

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangeRowsPerPage = React.useCallback(
        (event) => {
          const updatedRowsPerPage = parseInt(event.target.value, 10);
          setRowsPerPage(updatedRowsPerPage);
          setPage(0);
          const sortedRows = stableSort(rows, getComparator(order, orderBy));
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

    function renderProductDetailCell(oneTransaction){
        // console.log('oneTransaction',oneTransaction)
        // const detail=JSON.parse(oneTransaction)[0]
        return (
            <div>
              {/* {oneTransaction.name} */}
                        {/* <img src={detail.image}/> */}
                    {/* <TableCell>
                        <img src={detail.image}/>
                    </TableCell> */}
                {/* {console.log('oneTransaction',detail)} */}
                {/* {
                    fetchProdcutDetails(oneTransactionUuid)
                } */}
 {/* <TableCell component="th" scope="row">
                            </TableCell> */}
            </div>
        )
    }

    return (
        <UserLayout key="UserOrders" className="user_order_container">
            <div className="user_order_container_head">
                <div className="user_order_container_head_block user_order_container_first_block">Product</div>
                <div className="user_order_container_head_block user_order_container_block user_order_container_head_cell">Item</div>
                <div className="user_order_container_head_block user_order_container_block user_order_container_head_cell">Qty</div>
                <div className="user_order_container_head_block user_order_container_block user_order_container_head_cell">Price</div>
                <div className="user_order_container_head_block user_order_container_block user_order_container_head_cell">Status</div>
            </div>
            
            {
            orderList&&orderList.map((list) => (
                <div key={list[0].uuid} className="user_order_transaction_container">
                    <div className="user_order_transaction_container_head">
                            <span className="user_order_transaction_head_date">{moment(JSON.parse(list[0].created_at)).format('YYYY-MM-DD')} </span> 
                            <span className="user_order_transaction_head_order">Order#</span>
                            <span className="user_order_transaction_head_order_uuid">{list[0].order_uuid}</span> 
                    </div>

                    {
                        list.map((item)=>(
                            <div className="user_order_transaction_container_body">
                                <div className="user_order_container_first_block user_order_transaction_container_body_first_block">
                                    <img className="user_order_transaction_container_body_img" src={JSON.parse(item.product_content)[0].image}/>
                                    <div className="user_order_transaction_text_container">
                                        <div className="user_order_transaction_text_name">
                                            {JSON.parse(item.product_content)[0].name}
                                        </div>
                                        <div className="user_order_transaction_text_desc">
                                            {JSON.parse(item.product_content)[0].description}
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="user_order_container_block user_order_transaction_container_block">
                                    {JSON.parse(item.product_content)[0].price}
                                </div>
                                <div className="user_order_container_block user_order_transaction_container_block">
                                    {JSON.parse(item.product_content)[0].qty}
                                </div>
                                <div className="user_order_container_block user_order_transaction_container_block">
                                    {JSON.parse(item.product_content)[0].price*JSON.parse(item.product_content)[0].qty}
                                </div>
                                <div className={`user_order_transaction_${item.status} user_order_transaction_ user_order_container_block user_order_transaction_container_block`}>
                                    {item.status}
                                </div>
                            {console.log(item.merchant_uuid,JSON.parse(item.product_content))}
                            </div>
                        ))
                           
                        
                    }
                </div>
            ))

         }
                
        </UserLayout>
    )
}
