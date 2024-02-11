import { WorkInfo, ChangeIsRep } from "./type";
import CustomAudioPlayer from "./CustomAudioPlayer";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { CurrentMemberAtom } from "@/recoil/Auth";
import { axiosClient } from "@/api/axios";
import { getCookie } from "@/api/cookie";

// 전체 래퍼
const WorkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 330px;
  height: 390px;
`;

// 별 아이콘에 대표 여부 알려주는 props
interface StarProps {
  isRep: number;
}
// 별 아이콘
const Star = styled.span<StarProps>`
  position: relative;
  top: 8px;
  left: 8px;
  cursor: pointer;
  color: ${(props) => (props.isRep === 1 ? "yellow" : "grey")};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 4vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 대표작업물 여부 바꾸기 요청
const changeIsRep = async (targetWorkInfo: ChangeIsRep) => {
  const accessToken = getCookie("access_token");
  try {
    const response = await axiosClient.put(
      `/api/voices/${targetWorkInfo.voiceId}/works/${targetWorkInfo.workId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    alert(response.data);
    alert("대표 작업물 등록 성공!");
    return response.data;
  } catch (error) {
    alert("대표 작업물 등록 실패!");
    console.error(error);
    return null;
  }
};

const ImageContainer = styled.div`
  flex: 3;
  display: flex;

  @media (max-width: 480px) {
    display: none;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: hidden;

  @media (max-width: 480px) {
    display: none;
  }
`;

const Tag = styled.span`
  background-color: #5b5ff4;
  color: #fff;
  padding: 0.2rem 0.8rem;
  border-radius: 25px;
  display: inline-block;
  text-align: center;
  margin: 0.1rem;
  width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
`;

const handleStarClick = async (targetWork: WorkInfo) => {
  const beforeVoiceId = targetWork.voiceId;
  const beforWorkId = targetWork.workId;
  const before: ChangeIsRep = {
    voiceId: beforeVoiceId,
    workId: beforWorkId,
  };
  try {
    const repOrNot = await changeIsRep(before);
  } catch (error) {
    console.error(error);
  }
};

export default function RepWork({ work }: { work: WorkInfo }) {
  const currentMember = useRecoilValue(CurrentMemberAtom);
  return (
    <WorkWrapper>
      <div onClick={handleStarClick}>
        <Star isRep={work.isRep}>{work.isRep ? "★" : "☆"}</Star>
      </div>
      <div>
        <div style={{ display: "flex", marginBottom: "15px" }}>
          <ImageContainer>
            <img
              src={work.photoUrl}
              alt={work.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </ImageContainer>
          <div
            style={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <TagContainer>
              <Tag>{work.CategoryInfoValue.mediaClassification}</Tag>
              <Tag>{work.CategoryInfoValue.voiceTone}</Tag>
              <Tag>{work.CategoryInfoValue.voiceStyle}</Tag>
              <Tag>{work.CategoryInfoValue.gender}</Tag>
              <Tag>{work.CategoryInfoValue.age}</Tag>
            </TagContainer>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "15px",
          }}
        >
          <h2
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginBottom: "20px",
            }}
          >
            {work.title}
          </h2>
          <CustomAudioPlayer src={work.recordUrl} />
        </div>
      </div>
    </WorkWrapper>
  );
}
