import { createContext } from "react";

//공유한 데이터 생성
const ColorContext = createContext({ color: "black" });

export default ColorContext;
