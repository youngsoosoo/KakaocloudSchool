import { useLocation } from "react-router-dom";
import qs from "qs";

const About = () => {
  //query string을 읽을 수 있는 Hook
  const location = useLocation();
  const queryString = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  console.log(queryString);

  return (
    <div>
      <h1>React Router 실습</h1>
      <p>Query String : {location.search}</p>
    </div>
  );
};

export default About;
