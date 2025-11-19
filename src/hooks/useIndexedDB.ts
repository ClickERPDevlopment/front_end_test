import { useEffect, useState } from 'react';
import { initDB } from '../app/idb/dbConnection';
import { IDBPDatabase } from 'idb';

const useIndexedDB = () => {
  const [db, setDb] = useState<IDBPDatabase | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeDB = async () => {
      try {
        const database = await initDB();
        setDb(database);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeDB();
  }, []);

  return { db, isLoading, error };
};

export default useIndexedDB;