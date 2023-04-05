import React, { useEffect, useState } from 'react';
import './MerchantProducts.scss';
import MerchantLayout from '../MerchantLayout/MerchantLayout';
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
import {getProductsFromMerchant,deleteOneProduct,updateOneProduct,addOneProduct} from '../../../service/ProductService';
import moment from "moment";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const cookies = new Cookies();
const style = {
    position: 'absolute',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
    },
    [`&.${tableCellClasses.body}`]: {
    },
}));


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

export default function MerchantProducts(){
    const [order, setOrder] = React.useState(DEFAULT_ORDER);
    const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [visibleRows, setVisibleRows] = React.useState(null);
    const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
    const [paddingHeight, setPaddingHeight] = React.useState(0);
    const [productList, setProductList] = useState([]);
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
        fetchProductList(cookies.get('myShopaholic')?cookies.get('myShopaholic'):'')

    }

    function fetchProductList(id){
        getProductsFromMerchant({merchant_uuid:id.uuid})
            .then(res => {
                setProductList(res.data)
            })
    }

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
    
        setSelected(newSelected);
      };
    
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

    function deleteProduct(uuid){
        deleteOneProduct({uuid}).then(res => {
            fetchProductList(cookie)
        })
    }

    const handleAddProduct=(event)=>{
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const data = {
            name: form.get('name'),
            description: form.get('description'),
            category: form.get('category'),
            price: form.get('price'),
            image: form.get('image'),
            location: form.get('location'),
            stock: form.get('stock'),
            merchant_uuid:cookie.uuid
          }

          addOneProduct(data).then(res => {
                if(res.status==200){
                    fetchProductList(cookie)
                    handleCloseAdd()
                } else{
                    console.log("add product failed")
                }
        })
    }

    const handleUpdateProduct=(event)=>{
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const data = {
            name: form.get('name'),
            description: form.get('description'),
            category: form.get('category'),
            price: form.get('price'),
            image: form.get('image'),
            location: form.get('location'),
            stock: form.get('stock'),
            merchant_uuid:cookie.uuid,
            uuid:tempUpdate.uuid
          }
        updateOneProduct(data).then(res => {
                if(res.status==200){
                    fetchProductList(cookie)
                    handleCloseUpdate()
                } else{
                    console.log("update product failed")
                }
        })
    }
    return (
        <MerchantLayout className="merchant_container" key="MerchantProducts">
         
            <div className="merchant_container_top">
                <Button variant="outlined" className="merchant_add_product" onClick={handleOpenAdd}>Add Product</Button>
            </div>
            <TableContainer className="merchant_container_bottom">
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead className="merchant_container_bottom_table_head">
                        <TableRow className="merchant_container_bottom_table_row">
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Category</StyledTableCell>
                            <StyledTableCell>Decription</StyledTableCell>
                            <StyledTableCell>Image</StyledTableCell>
                            <StyledTableCell>Location</StyledTableCell>
                            <StyledTableCell>Price</StyledTableCell>
                            <StyledTableCell>Stock</StyledTableCell>
                            <StyledTableCell>Created</StyledTableCell>
                            <StyledTableCell>Updated</StyledTableCell>
                            <StyledTableCell>Modify</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody className="merchant_container_bottom_body">
                    {productList&&(rowsPerPage > 0
                        ? productList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : productList
                    ).map((row) => (
                        <TableRow key={row.uuid}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell>
                                {row.category}
                            </TableCell>
                            <TableCell>
                                {row.description}
                            </TableCell>
                            <TableCell className="merchant_container_bottom_body_img_container">
                                <img src={row.image}/>
                            </TableCell>
                            <TableCell>
                                {row.location}
                            </TableCell>
                            <TableCell>
                                {row.price}
                            </TableCell>
                            <TableCell>
                                {row.stock}
                            </TableCell>
                            <TableCell>
                            {moment(JSON.parse(row.created_at)).format('YYYY-MM-DD HH:mm:ss')}
                            </TableCell>
                            <TableCell>
                            {moment(JSON.parse(row.update_at)).format('YYYY-MM-DD HH:mm:ss')}
                            </TableCell>
                            <TableCell className="merchant_container_bottom_body_btn_container">
                                <Button variant="outlined" className="merchant_update_btn" onClick={()=>handleOpenUpdate(row)}>Update</Button>
                                <Button variant="outlined" className="merchant_delete_btn" onClick={()=>deleteProduct(row.uuid)}>Delete</Button>
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
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
               <Modal
                className="add_product_container"
                open={openAdd}
                onClose={handleCloseAdd}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <form component="form" className="add_product_container_box" onSubmit={handleAddProduct}>
                    <Typography id="modal-modal-title" className="add_product_container_box_title">
                        Add Product
                    </Typography>
                    <div className="add_product_container_box_content">
                        <div className="add_product_container_box_content_title">
                            Name:
                        </div>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            name="name"
                            autoFocus
                            className="add_product_container_box_content_input"
                        />
                    </div>
                    <div className="add_product_container_box_content" >
                        <div className="add_product_container_box_content_title">
                            Category:
                        </div>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="category"
                            name="category"
                            autoFocus
                            className="add_product_container_box_content_input"
                        />
                    </div>
                    <div className="add_product_container_box_content">
                        <div className="add_product_container_box_content_title">
                            Description:
                        </div>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="description"
                            name="description"
                            autoFocus
                            className="add_product_container_box_content_input"
                        />
                    </div>
                    <div className="add_product_container_box_content">
                        <div className="add_product_container_box_content_title">
                            Image:
                        </div>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="image"
                            name="image"
                            autoFocus
                            className="add_product_container_box_content_input"
                        />
                    </div>
                    <div className="add_product_container_box_content">
                        <div className="add_product_container_box_content_title">
                            Location:
                        </div>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="location"
                            name="location"
                            autoFocus
                            className="add_product_container_box_content_input"
                        />
                    </div>
                    <div className="add_product_container_box_content">
                        <div className="add_product_container_box_content_title">
                            Price:
                        </div>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            name="price"
                            autoFocus
                            className="add_product_container_box_content_input"
                        />
                    </div>
                    <div className="add_product_container_box_content">
                        <div className="add_product_container_box_content_title">
                            Stock:
                        </div>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="stock"
                            name="stock"
                            autoFocus
                            className="add_product_container_box_content_input"
                        />
                    </div>

                    <Button
                            type="submit"
                            variant="contained"
                            className="add_confirm_btn"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add
                        </Button>
                </form>
            </Modal>
            <Modal
                className="add_product_container"
                open={openUpdate}
                onClose={handleCloseUpdate}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <form component="form" className="add_product_container_box" onSubmit={handleUpdateProduct}>
                    <Typography id="modal-modal-title" className="add_product_container_box_title">
                        Update Product
                    </Typography>
                    <div className="add_product_container_box_content">
                        <div className="add_product_container_box_content_title">
                            Name:
                        </div>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            name="name"
                            defaultValue={tempUpdate.name}
                            autoFocus
                            className="add_product_container_box_content_input"
                        />
                    </div>
                    <div className="add_product_container_box_content" >
                        <div className="add_product_container_box_content_title">
                            Category:
                        </div>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="category"
                            defaultValue={tempUpdate.category}
                            name="category"
                            autoFocus
                            className="add_product_container_box_content_input"
                        />
                    </div>
                    <div className="add_product_container_box_content">
                        <div className="add_product_container_box_content_title">
                            Description:
                        </div>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="description"
                            name="description"
                            autoFocus
                            defaultValue={tempUpdate.description}
                            className="add_product_container_box_content_input"
                        />
                    </div>
                    <div className="add_product_container_box_content">
                        <div className="add_product_container_box_content_title">
                            Image:
                        </div>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="image"
                            name="image"
                            autoFocus
                            defaultValue={tempUpdate.image}
                            className="add_product_container_box_content_input"
                        />
                    </div>
                    <div className="add_product_container_box_content">
                        <div className="add_product_container_box_content_title">
                            Location:
                        </div>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="location"
                            name="location"
                            autoFocus
                            defaultValue={tempUpdate.location}
                            className="add_product_container_box_content_input"
                        />
                    </div>
                    <div className="add_product_container_box_content">
                        <div className="add_product_container_box_content_title">
                            Price:
                        </div>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            name="price"
                            defaultValue={tempUpdate.price}
                            autoFocus
                            className="add_product_container_box_content_input"
                        />
                    </div>
                    <div className="add_product_container_box_content">
                        <div className="add_product_container_box_content_title">
                            Stock:
                        </div>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="stock"
                            name="stock"
                            autoFocus
                            defaultValue={tempUpdate.stock}
                            className="add_product_container_box_content_input"
                        />
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