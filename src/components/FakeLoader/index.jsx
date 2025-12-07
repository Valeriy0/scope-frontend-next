import { useState, useEffect } from 'react';

import ScopeLoader from 'components/ScopeLoader';

const FakeLoader = ({ children, isLoading }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 секунды

    return () => window.clearTimeout(timer);
  }, []);

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center mt-[100px] mb-[100px]">
        <ScopeLoader type="black" width="60px" height="60px" />
      </div>
    );
  }

  return <>{children}</>;
};

export default FakeLoader;
