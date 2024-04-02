import { useState, useEffect } from 'react';
import './App.css';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import { Select, MenuItem, CircularProgress } from '@mui/material';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import Typography from '@mui/material/Typography';

const OrderBook = () => {
  const [loading, setLoading] = useState(false);
  const [symbolsLoading, setSymbolsLoading] = useState(true);
  const [symbolsData, setSymbolsData] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [priceData, setPriceData] = useState([]);
  const navigate = useNavigate();

  const fetchSymbols = async () => {
    try {
      const response = await fetch(
        'https://api.binance.com/api/v3/exchangeInfo'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch symbols');
      }
      const data = await response.json();
      const resultData = [];
      for (let i = 0; i < 100; i++) {
        resultData.push(data.symbols[i].symbol);
      }
      setSymbolsData(resultData);
      setSymbolsLoading(false);
    } catch (error) {
      console.error('Error fetching symbols:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchSymbols();
  }, []);

  const handleSymbolChange = async (event: any) => {
    try {
      const symbol = event.target.value;
      setSelectedSymbol(symbol);
      let apiString = 'https://api.binance.com/api/v3/trades?symbol=' + symbol;
      const response = await fetch(apiString);
      if (!response.ok) {
        throw new Error('Failed to fetch Price');
      }
      const data = await response.json();
      setPriceData(data.splice(0, 100));
    } catch (error) {
      console.error('Error fetching price:', error);
      throw error;
    }
  };

  return (
    <div className="order-book-container">
      <div className="logout-button">
        <LoadingButton
          loading={loading}
          type="submit"
          loadingPosition="end"
          fullWidth
          variant="contained"
          className="login-button"
          endIcon={<></>}
          onClick={() => navigate('/')}
        >
          Logout
        </LoadingButton>
      </div>
      {symbolsLoading ? (
        <CircularProgress />
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Typography sx={{ marginTop: '1rem' }}>
            {' '}
            Select the Symbol from the dropdown:
          </Typography>
          <div style={{ width: '60vh', marginLeft: '5rem' }}>
            <Select
              value={selectedSymbol}
              onChange={handleSymbolChange}
              displayEmpty
              fullWidth
            >
              <MenuItem value="" disabled>
                Select Symbol
              </MenuItem>
              {symbolsData.map((symbol) => (
                <MenuItem key={symbol} value={symbol}>
                  {symbol}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      )}
      {priceData.length > 0 ? (
        <div
          className="table-container"
          style={{ marginTop: '3rem', height: '70vh', overflow: 'auto' }}
        >
          <Table>
            <TableHead sx={{ position: 'sticky' }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Best Match</TableCell>
                <TableCell>Buyer Maker</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Quote Quantity</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {priceData.map((dataItem: any, index) => (
                <TableRow key={index}>
                  <TableCell>{dataItem.id}</TableCell>
                  <TableCell>{dataItem.isBestMatch.toString()}</TableCell>
                  <TableCell>{dataItem.isBuyerMaker.toString()}</TableCell>
                  <TableCell>{dataItem.price}</TableCell>
                  <TableCell>{dataItem.qty}</TableCell>
                  <TableCell>{dataItem.quoteQty}</TableCell>
                  <TableCell>
                    {new Date(dataItem.time).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="no-data-text">
          No Data to Display Select Any One of the above
        </p>
      )}
    </div>
  );
};

export default OrderBook;
