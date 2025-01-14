import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={400}
    viewBox="0 0 280 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="45%" y="310" rx="24" ry="24" width="55%" height="45" />
    <rect x="0" y="0" rx="10" ry="10" width="100%" height="45" />
    <rect x="0" y="220" rx="10" ry="10" width="100%" height="80" />
    <rect x="0" y="320" rx="10" ry="10" width="95" height="30" />
    <rect x="0" y="165" rx="10" ry="10" width="100%" height="45" />
  </ContentLoader>
);

export default Skeleton;
