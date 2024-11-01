// src/pages/DetailsPage.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './style.css';

interface Entity {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  films: string[];
}

interface Film {
  title: string;
  release_date: string;
  director: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Имя обязательно'),
  height: yup.string().required('Рост обязателен'),
  mass: yup.string().required('Масса обязательна'),
  hair_color: yup.string().required('Цвет волос обязателен'),
  skin_color: yup.string().required('Цвет кожи обязателен'),
  eye_color: yup.string().required('Цвет глаз обязателен'),
  birth_year: yup.string().required('Год рождения обязателен'),
  gender: yup.string().required('Пол обязателен'),
});

function DetailsPage() {
  const { id } = useParams();
  const [entity, setEntity] = useState<Entity | null>(null);
  const [films, setFilms] = useState<Film[]>([]);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Entity>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    // Загружаем данные персонажа
    axios.get(`https://swapi.dev/api/people/${id}/`)
      .then((response) => {
        const entityData = response.data;
        setEntity(entityData);
        reset(entityData);

        // Проверяем, что есть массив `films`
        if (Array.isArray(entityData.films)) {
          // Загружаем данные фильмов
          const filmRequests = entityData.films.map((filmUrl: string) =>
            axios.get(filmUrl).then((res) => res.data)
          );          

          Promise.all(filmRequests).then((filmsData) => setFilms(filmsData));
        } else {
          console.error('Нет данных о фильмах для этого персонажа');
        }
      })
      .catch((error) => {
        console.error('Ошибка загрузки данных персонажа:', error);
      });
  }, [id, reset]);

  const onSubmit = (data: Entity) => {
    setEntity(data);
    alert('Изменения сохранены локально!');
  };

  return (
    <div className="page-container">
      <div className="details-card">
        <h2>Детали персонажа: {entity?.name}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Имя</label>
            <input {...register('name')} className="form-control" />
            {errors.name && <p className="text-danger">{errors.name.message}</p>}
          </div>
          <div className="form-group">
            <label>Рост</label>
            <input {...register('height')} className="form-control" />
            {errors.height && <p className="text-danger">{errors.height.message}</p>}
          </div>
          <div className="form-group">
            <label>Масса</label>
            <input {...register('mass')} className="form-control" />
            {errors.mass && <p className="text-danger">{errors.mass.message}</p>}
          </div>
          <div className="form-group">
            <label>Цвет волос</label>
            <input {...register('hair_color')} className="form-control" />
            {errors.hair_color && <p className="text-danger">{errors.hair_color.message}</p>}
          </div>
          <div className="form-group">
            <label>Цвет кожи</label>
            <input {...register('skin_color')} className="form-control" />
            {errors.skin_color && <p className="text-danger">{errors.skin_color.message}</p>}
          </div>
          <div className="form-group">
            <label>Цвет глаз</label>
            <input {...register('eye_color')} className="form-control" />
            {errors.eye_color && <p className="text-danger">{errors.eye_color.message}</p>}
          </div>
          <div className="form-group">
            <label>Год рождения</label>
            <input {...register('birth_year')} className="form-control" />
            {errors.birth_year && <p className="text-danger">{errors.birth_year.message}</p>}
          </div>
          <div className="form-group">
            <label>Пол</label>
            <input {...register('gender')} className="form-control" />
            {errors.gender && <p className="text-danger">{errors.gender.message}</p>}
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">Сохранить</button>
        </form>

        {/* Секция с фильмами */}
        <h3 className="mt-5">Фильмы</h3>
        <ul className="list-group">
          {films.map((film, index) => (
            <li key={index} className="list-group-item">
              <strong>{film.title}</strong> <br />
              <small>Дата выхода: {film.release_date}</small> <br />
              <small>Режиссер: {film.director}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DetailsPage;
