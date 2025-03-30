import { useRef, useState } from "react";

const useAsync = <Args extends unknown[], Response>(
  call: (...args: Args) => Promise<Response>,
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Response | null>(null);

  const trigger = useRef(
    (...args: Args) =>
      new Promise((resolve, reject) => {
        setLoading(false);

        call(...args)
          .then((data) => {
            setData(data);
            resolve(data);
          })
          .catch((err) => {
            setError(err);
            reject(err);
          })
          .finally(() => {
            setLoading(false);
          });
      }),
  );

  return { loading, error, data, trigger: trigger.current };
};

export { useAsync };
