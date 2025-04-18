import { useState, useEffect, useCallback } from 'react';
import supabase from "../services/supabase";

const useFetchSupabaseFiles = () => {
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchImages = useCallback(async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .storage
          .from('files')
          .list('', { limit: 100 });
          
        if (error) {
          return;
        }
  
        if (data) {
          setFiles(data);
        }
      } catch(err) {
        // Handle Error
      } finally {
        setIsLoading(false);
      }
    }, []);

    return {
      fetchImages,
      files,
      isLoading
    }
}

export default useFetchSupabaseFiles