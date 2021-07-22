import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/audit/api/v1/',
});

// Specify interceptors
// Uncomment when implementing authentication
// instance.interceptors.request.use((req) => {
//     if (localStorage.getItem("profile")) {
//       req.headers.Authorization = `Bearer ${
//         JSON.parse(localStorage.getItem("profile")).token
//       }`;
//     }

//     return req;
//   });

// Fetch all Logs from Blockchain
export const fetchLogs = () => instance.get('/logs');

// Fetch all transactions from DB
export const fetchTrts = () => instance.get('/transactions');

// Retrieve balance
export const fetchBalance = () => instance.get('/balance');
