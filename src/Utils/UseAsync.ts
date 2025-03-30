import { useEffect, useState } from "react";

const useAsync = <Args extends any[], Response>(
  call: (...args: Args) => Promise<Response>,
  ...args: Args
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<Response | null>(null);

  useEffect(() => {
    setLoading(true);

    call(...args)
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [call]);

  return { loading, error, data: data };
};

export { useAsync };
