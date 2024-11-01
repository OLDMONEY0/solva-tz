// src/pages/LoginPage.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../../store';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './style.css';

interface LoginFormInputs {
  username: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup.string().required('Имя пользователя обязательно'),
  password: yup.string().required('Пароль обязателен'),
});

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: LoginFormInputs) => {
    if (data.username === 'admin' && data.password === 'password') {
      dispatch(login({ username: data.username }));
      navigate('/');
    } else {
      alert('Неправильные учетные данные');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="text-center">Войти</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-3">
            <input
              {...register('username')}
              type="username"
              className="form-control"
              placeholder="username"
            />
            {errors.username && <p className="text-danger">{errors.username.message}</p>}
          </div>
          <div className="form-group mb-3">
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              placeholder="password"
            />
            {errors.password && <p className="text-danger">{errors.password.message}</p>}
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />{' '}
              Показать пароль
            </div>
            <a href="#" className="text-muted">Забыли пароль?</a>
          </div>
          <button type="submit" className="btn btn-primary w-100">ВОЙТИ</button>
        </form>
        <div className="text-center mt-3">
          <p className="text-muted">У вас есть аккаунт? <a href="#">Зарегистрироваться</a></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
