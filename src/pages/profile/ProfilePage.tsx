// src/pages/ProfilePage.tsx
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import './style.css';

function ProfilePage() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="page-container">
      <div className="profile-card">
        <h2>Профиль пользователя</h2>
        {user ? (
          <p className="profile-info"><strong>Имя пользователя:</strong> {user.username}</p>
        ) : (
          <p>Пожалуйста, войдите, чтобы увидеть профиль.</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
