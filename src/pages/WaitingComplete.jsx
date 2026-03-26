import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function WaitingComplete() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const result = state?.result;
  const restaurant = state?.restaurant;

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
      <h2 style={{ marginBottom: '8px' }}>대기 등록 완료!</h2>
      <p style={{ color: '#888', marginBottom: '40px' }}>{restaurant?.name}</p>

      <div
        style={{
          background: '#fff3ee',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '40px',
        }}
      >
        <div style={{ fontSize: '14px', color: '#888', marginBottom: '8px' }}>내 순번</div>
        <div style={{ fontSize: '72px', fontWeight: 'bold', color: '#ff6b35' }}>
          {result?.queue_number}
        </div>
        <div style={{ fontSize: '14px', color: '#888', marginTop: '8px' }}>번</div>
      </div>

      <p style={{ color: '#555', marginBottom: '40px', lineHeight: '1.6' }}>
        순서가 되면 문자로 안내해드립니다.
        <br />
        잠시 주변에서 편하게 기다려주세요 😊
      </p>

      <button
        onClick={() => navigate('/')}
        style={{
          width: '100%',
          padding: '16px',
          background: '#333',
          color: '#fff',
          border: 'none',
          borderRadius: '12px',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        처음으로 돌아가기
      </button>
    </div>
  );
}

export default WaitingComplete;