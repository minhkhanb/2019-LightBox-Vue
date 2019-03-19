import axios from 'axios';
const axiosGet = () => {
  return axios.get('https://api.github.com/users/minhkhanb')
        .then(function(response){
          console.log('data: ', response.data); // ex.: { user: 'Your User'}
          console.log('status: ', response.status); // ex.: 200
        });
}

export default axiosGet;