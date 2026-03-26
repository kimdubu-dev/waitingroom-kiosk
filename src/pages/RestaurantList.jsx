import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRestaurants } from '../api';

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getRestaurants().then((res) => setRestaurants(res.data));
  }, []);

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>🍽️ 푸드코트 대기</h1>
      <p style={{ textAlign: 'center', color: '#888', marginBottom: '30px' }}>
        이용할 업장을 선택해주세요
      </p>
      {restaurants.map((r) => (
        <div
          key={r.id}
          onClick={() => navigate('/waiting', { state: { restaurant: r } })}
          style={{
            border: '1px solid #ddd',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '16px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{r.name}</div>
            <div style={{ color: '#888', marginTop: '4px' }}>{r.description}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6b35' }}>
              {r.waiting_count}
            </div>
            <div style={{ fontSize: '12px', color: '#888' }}>대기중</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RestaurantList;