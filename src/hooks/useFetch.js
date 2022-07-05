//import {userContext} from '../context/userContext';

export const useFetch = () => {
  let token = '';
  const fetchData = async (method, url, data = {}) => {
    token = JSON.parse(localStorage.getItem('user'));
    const fetchComposition =  {
        method,
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token?.token}`
        },
    }
    if (method !== 'GET' && method !== 'DELETE') {
      fetchComposition.body = JSON.stringify({...data});
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {...fetchComposition});
      if (!response.ok) return;
      const responseData = await response.json();
      return responseData;
    } catch (exception) {
      console.log(exception);
      return;
    }
  }
  
  const getRequest = async (endpoint) => await fetchData('GET', endpoint);
  const postRequest = async (endpoint, data) => await fetchData('POST', endpoint, data);
  const putRequest = async (endpoint, data) => await fetchData('PUT', endpoint, data);
  const deleteRequest = async (endpoint, data) => await fetchData('DELETE', endpoint, data);

  return {getRequest, postRequest, putRequest, deleteRequest}; 
}
