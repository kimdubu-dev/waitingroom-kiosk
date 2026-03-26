import React, { useEffect, useState } from 'react';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8000' });

function Dashboard() {
  const [waitings, setWaitings] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const fetchData = async () => {
    const res = await api.get('/restaurants');
    setRestaurants(res.data);
    if (!selectedRestaurant && res.data.length > 0) {
      setSelectedRestaurant(res.data[0].id);
    }
  };

  const fetchWaitings = async () => {
    if (!selectedRestaurant) return;
    const res = await api.get(`/waitings/${selectedRestaurant}`);
    setWaitings(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchWaitings();
    const interval = setInterval(fetchWaitings, 5000); // 5초마다 자동 갱신
    return () => clearInterval(interval);
  }, [selectedRestaurant]);

  const handleCall = async (id) => {
    await api.patch(`/waiting/${id}/call`);
    fetchWaitings();
  };

  const handleSeat = async (id) => {
    await api.patch(`/waiting/${id}/seat`);
    fetchWaitings();
  };

  const handleCancel = async (id) => {
    await api.patch(`/waiting/${id}/cancel`);
    fetchWaitings();
  };

  const statusLabel = (status) => {
    switch (status) {
      case 'waiting': return { text: '대기중', color: '#ff6b35' };
      case 'called': return { text: '호출됨', color: '#3b82f6' };
      case 'seated': return { text: '착석', color: '#22c55e' };
      case 'cancelled': return { text: '취소', color: '#aaa' };
      default: return { text: status, color: '#333' };
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '8px' }}>👨‍💼 직원 대시보드</h1>
      <p style={{ color: '#888', marginBottom: '30px' }}>5초마다 자동 갱신됩니다</p>

      {/* 업장 선택 탭 */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
        {restaurants.map((r) => (
          <button
            key={r.id}
            onClick={() => setSelectedRestaurant(r.id)}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: selectedRestaurant === r.id ? '2px solid #ff6b35' : '1px solid #ddd',
              background: selectedRestaurant === r.id ? '#fff3ee' : '#fff',
              color: selectedRestaurant === r.id ? '#ff6b35' : '#333',
              fontWeight: selectedRestaurant === r.id ? 'bold' : 'normal',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            {r.name} ({r.waiting_count})
          </button>
        ))}
      </div>

      {/* 대기 목록 */}
      {waitings.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#888', padding: '60px' }}>
          현재 대기 중인 손님이 없습니다
        </div>
      ) : (
        waitings.map((w) => {
          const { text, color } = statusLabel(w.status);
          return (
            <div
              key={w.id}
              style={{
                border: '1px solid #eee',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6b35' }}>
                    {w.queue_number}번
                  </span>
                  <span style={{ color, fontWeight: 'bold', fontSize: '14px' }}>{text}</span>
                </div>
                <div style={{ color: '#888', fontSize: '14px', marginTop: '4px' }}>
                  {w.party_size}명 · +{w.country_code} {w.phone}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {w.status === 'waiting' && (
                  <>
                    <button
                      onClick={() => handleCall(w.id)}
                      style={{
                        padding: '8px 16px',
                        background: '#3b82f6',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                      }}
                    >
                      호출
                    </button>
                    <button
                      onClick={() => handleCancel(w.id)}
                      style={{
                        padding: '8px 16px',
                        background: '#eee',
                        color: '#666',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                      }}
                    >
                      취소
                    </button>
                  </>
                )}
                {w.status === 'called' && (
                  <button
                    onClick={() => handleSeat(w.id)}
                    style={{
                      padding: '8px 16px',
                      background: '#22c55e',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    착석
                  </button>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Dashboard;