import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PieChart, Pie, Sector } from "recharts";
import MemberApi from "../../api/MemberApi";
import useTokenAxios from "../../hooks/useTokenAxios";

const PieChartBox = styled.div`
  padding: 30px;
  border-radius: 10px;
  border: 1px solid var(--GREY);
  .chartTitle {
    margin-bottom: 30px;
    font-weight: 600;
    font-size: 1.3rem;
    color: #333;
  }
`;

const ResponsiveContainer = styled.div`
  /* margin: 20px; */
`;

const PieChartComp = styled(PieChart)`
  background-color: #fff;
  /* border: 1px solid var(--GREY); */
  border-radius: 10px;
  .chartTitle {
    font-size: 1.4em;
    color: var(--BLACK);
    text-align: center; /* 글자 중앙 정렬을 위해 추가 */
    margin-bottom: 10px; /* 필요에 따라 여백 조절 */
  }
`;
// const data = [//map - string과
//   { name: "일반 회원", value: 400 },
//   { name: "카카오 회원", value: 300 },
// ];

const TypeChart = (props) => {
  const RADIAN = Math.PI / 180; // 각도를 라디안 단위로 변환하는 상수
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  // 중간 각도를 기반으로 삼각함수 값을 계산
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  // 시작점, 중간점, 끝점 좌표 계산
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  // 텍스트의 위치를 결정하기 위한 textAnchor 값 설정
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      {/* 파이 차트의 섹터에 대한 이름 표시 -일반 회원 / 카카오 회원*/}
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"var(--BLACK)"}>
        {payload.name}
      </text>
      {/* 섹터 그리기 */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={"var(--RED)"}
      />
      {/* 선 그리기 */}
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      {/* 점 */}
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      {/* 값 표시 텍스트 */}
      {/* 인원수 */}
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="var(--BLACK)"
        fontSize={13}
      >{`${value} 명`}</text>
      {/* 퍼센트 */}
      <text
        x={ex + (cos >= 0 ? 1 : -1.5) * 12}
        y={ey}
        dy={18}
        textAnchor="middle"
        fill="var(--DARKGREY)"
        fontSize={11}
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const LoginTypeChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  // 회원 데이터 가져오기
  const fetchData = async () => {
    try {
      const typeRes = await MemberApi.getMemberTypeData();

      if (typeRes.data !== null) {
        setData(typeRes.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // 데이터를 가져오는 커스텀 훅 사용
  const getData = useTokenAxios(fetchData); // 리프레시 토큰까지 만료되면 재로그인 할 수 있도록 담아줌(커스텀 훅)

  const [activeIndex, setActiveIndex] = useState(0);

  // 파이 차트에 마우스를 올렸을 때의 이벤트 핸들러
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <PieChartBox>
      <h4 className="chartTitle">회원가입 방법 구분</h4>
      <ResponsiveContainer width="100%" height="100%">
        <PieChartComp width={300} height={300}>
          <Pie
            activeIndex={activeIndex}
            activeShape={TypeChart}
            data={data}
            cx="50%" // 가로위치
            cy="50%" // 세로위치
            innerRadius={60} // 안쪽 원
            outerRadius={80} // 바깥쪽 원
            fill="var(--DARKGREY)"
            dataKey="value"
            onMouseEnter={onPieEnter}
          />
        </PieChartComp>
      </ResponsiveContainer>
    </PieChartBox>
  );
};

export default LoginTypeChart;
