import axios from 'axios';

export default axios.create({
  baseURL: 'https://opensky-network.org/api'
});
