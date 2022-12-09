import { Routes, Route } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import Profile from "./profile";

import Article from "./Article";
import Articles from "./Articles";
import Layout from "./Layout";

import Login from "./Login";
import MyPage from "./MyPage";
import ColorBox from "./ColorBox";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Route>
      <Route path="/articles" element={<Articles />}>
        <Route path=":id" element={<Article />} />
      </Route>
      <Route path="colorbox" element={<ColorBox />} />
      <Route path="*" element={<Article />} />
    </Routes>
  );
}

export default App;
