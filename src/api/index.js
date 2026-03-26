import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

// 업장 목록 조회
export const getRestaurants = () => api.get('/restaurants');

// 대기 등록
export const createWaiting = (data) => api.post('/waiting', data);