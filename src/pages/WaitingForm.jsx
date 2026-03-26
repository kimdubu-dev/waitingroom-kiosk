import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createWaiting } from '../api';

const COUNTRY_CODES = [
  { label: '🇰🇷 한국 (+82)', value: '82' },
  { label: '🇺🇸 미국 (+1)', value: '1' },
  { label: '🇯🇵 일본 (+81)', value: '81' },
  { label: '🇨🇳 중국 (+86)', value: '86' },
  { label: '🇬🇧 영국 (+44)', value: '44' },
  { label: '🇩🇪 독일 (+49)', value: '49' },
  { label: '🇫🇷 프랑스 (+33)', value: '33' },
  { label: '🇦🇺 호주 (+61)', value: '61' },
  { label: '🇨🇦 캐나다 (+1)', value: '1' },
  { label: '🇸🇬 싱가포르 (+65)', value: '65' },
];

function WaitingForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const restaurant = state?.restaurant;

  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('82');
  const [partySize, setPartySize] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!phone) {
      alert('전화번호를 입력해주세요');
      return;
    }
    setLoading(true);
    try {
      const res = await createWaiting({
        restaurant_id: restaurant.id,
        phone,
        country_code: countryCode,
        party_size: partySize,
      });
      navigate('/complete', { state: { result: res.data, restaurant } });
    } catch (e) {
      alert('대기 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <button
        onClick={() => navigate('/')}
        style={{ background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', marginBottom: '20px' }}
      >
        ← 뒤로
      </button>
      <h2 style={{ marginBottom: '8px' }}>{restaurant?.name}</h2>
      <p style={{ color: '#888', marginBottom: '30px' }}>대기 정보를 입력해주세요</p>

      {/* 인원 선택 */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>인원 수</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              onClick={() => setPartySize(n)}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '8px',
                border: partySize === n ? '2px solid #ff6b35' : '1px solid #ddd',
                background: partySize === n ? '#fff3ee' : '#fff',
                color: partySize === n ? '#ff6b35' : '#333',
                fontWeight: partySize === n ? 'bold' : 'normal',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* 국가 선택 */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>국가</label>
        <select
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '16px',
          }}
        >
          {COUNTRY_CODES.map((c) => (
            <option key={c.label} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      {/* 전화번호 입력 */}
      <div style={{ marginBottom: '32px' }}>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>전화번호</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="전화번호를 입력해주세요"
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '16px',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* 등록 버튼 */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: '100%',
          padding: '16px',
          background: '#ff6b35',
          color: '#fff',
          border: 'none',
          borderRadius: '12px',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        {loading ? '등록 중...' : '대기 등록하기'}
      </button>
    </div>
  );
}

export default WaitingForm;