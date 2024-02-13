import styled from "styled-components";

const ProfileImg = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.$imgUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
`;

export default ProfileImg;
