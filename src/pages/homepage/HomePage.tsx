// src/pages/HomePage.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './style.css';

interface Entity {
  name: string;
  url: string;
}

function HomePage() {
  const [data, setData] = useState<Entity[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const page = Number(params.get('page')) || 1;

  useEffect(() => {
    axios.get(`https://swapi.dev/api/people/?page=${page}`).then((response) => {
      setData(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 10));
    });
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      navigate(`?page=${page + 1}`);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      navigate(`?page=${page - 1}`);
    }
  };

  return (
    <div className="page-container">
      <div className="content-card">
        <h2>Персонажи</h2>
        <ul className="list-group">
          {data.map((entity, index) => (
            <li
              key={index}
              className="list-group-item"
              onClick={() => navigate(`/details/${entity.url.split('/').slice(-2, -1)[0]}`)}
            >
              {entity.name}
            </li>
          ))}
        </ul>
        <div className="pagination-controls">
          <button className="btn btn-secondary" onClick={handlePreviousPage} disabled={page === 1}>
            Предыдущая
          </button>
          <span>Страница {page} из {totalPages}</span>
          <button className="btn btn-secondary" onClick={handleNextPage} disabled={page === totalPages}>
            Следующая
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
