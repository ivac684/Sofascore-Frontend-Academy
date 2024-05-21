import React from 'react';
import useSWR from 'swr';
import { Tournament } from '@/types/Tournament';

const Tournaments = () => {
  const { data, error } = useSWR(`/api/sport/football/tournaments`);

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Leagues</h1>
      <ul>
        {data.map((tournament: Tournament) => (
          <li key={tournament.id}>
            <div>
              <h2>{tournament.name}</h2>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tournaments;
