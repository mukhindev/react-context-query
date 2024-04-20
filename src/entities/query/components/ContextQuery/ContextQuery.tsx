import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

type QueryRequest = (...args: any[]) => Promise<any>;
type QueryOptions<T extends QueryRequest> = Parameters<T>[0];
type QueryReply<T extends QueryRequest> = Awaited<ReturnType<T>>;

interface QueryProps<T extends QueryRequest> {
  options?: QueryOptions<T>;
  children: ReactNode;
}

export const createQueryContext = <T extends QueryRequest>(request: T) => {
  const QueryContext = createContext(
    {} as {
      reply: QueryReply<T> | null;
      fetch: (options: QueryOptions<T>) => void;
      refresh: () => void;
      inPending: boolean;
      inProgress: boolean;
    },
  );

  const useQuery = () => {
    return useContext(QueryContext);
  };

  function Provider<T extends QueryRequest>(props: QueryProps<T>) {
    const { children, options: initialOptions = {} } = props;

    const [options, setOptions] = useState<QueryOptions<T>>(initialOptions);
    const [reply, setReply] = useState<QueryReply<T> | null>(null);
    const [inPending, setInPending] = useState(true);
    const [inProgress, setInProgress] = useState(false);

    const fetch = useCallback((options: QueryOptions<T>) => {
      setInProgress(true);

      request(options)
        .then((res) => {
          setOptions(setOptions);
          setReply(res);
          setInPending(false);
        })
        .finally(() => {
          setInProgress(false);
        });
    }, []);

    const refresh = useCallback(() => {
      fetch(options);
    }, [options, fetch]);

    return (
      <QueryContext.Provider
        value={{
          reply,
          fetch,
          refresh,
          inPending,
          inProgress,
        }}
      >
        {children}
      </QueryContext.Provider>
    );
  }

  return { Provider, useQuery };
};
