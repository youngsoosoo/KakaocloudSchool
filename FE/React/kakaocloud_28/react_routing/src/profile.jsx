import { useParams } from "react-router-dom";

//출력할 데이터 생성
const data = {
  adam: {
    name: "군계",
    description: "동일한 작업을 매일 하는 것이 가장 어렵다",
  },
  jessica: {
    name: "제시카",
    description: "내가 하기 싫은 것은 남도 하기 싫다.",
  },
};

const Profile = () => {
  //URL 파라미터 읽기
  const params = useParams();
  //데이터 찾아오기
  //username이라는 파라미터를 찾아옵ㄴ디ㅏ.
  const profile = data[params.username];
  return (
    <div>
      <h1>사용자 프로필</h1>
      {profile ? (
        <div>
          <h2>{profile.name}</h2>
          <p>{profile.description}</p>
        </div>
      ) : (
        <p>존재하지 않는 사용자입니다.</p>
      )}
    </div>
  );
};

export default Profile;
