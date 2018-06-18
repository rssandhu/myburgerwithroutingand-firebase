import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-app-3c92f.firebaseio.com/'
});

export default instance;