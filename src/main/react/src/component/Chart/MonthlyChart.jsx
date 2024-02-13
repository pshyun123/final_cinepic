import { styled } from "styled-components";
import { useEffect, useState } from "react";
import useTokenAxios from "../../hooks/useTokenAxios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import MemberApi from "../../api/MemberApi";

const ChartComp = styled.div`
  .chart {
    margin-right: 20px;
    padding: 20px;
    width: 750px;
    height: 100%;
    border-radius: 10px;
    border: 1px solid var(--GREY);
    background-color: white;
    .chartTitle {
      margin-bottom: 30px;
      font-weight: 600;
      font-size: 1.3rem;
      color: #333;
    }
  }
  p {
    color: #333;
  }

  span {
    color: #333;
  }
`;
export default function Chart() {
  const [monthlyUserData, setMonthlyUserData] = useState([]);

  const fetchMonthlyUserData = async () => {
    const res = await MemberApi.getMonthlyData();
    if (res.data !== null) {
      const monthOrder = [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월",
      ];
      const sortedMonthlyUserData = res.data.sort((a, b) => {
        const monthA = monthOrder.indexOf(a.month);
        const monthB = monthOrder.indexOf(b.month);
        return monthA - monthB;
      });
      setMonthlyUserData(sortedMonthlyUserData);
    }
  };

  const getMonthlyUserData = useTokenAxios(fetchMonthlyUserData);
  useEffect(() => {
    getMonthlyUserData();
  }, []);

  return (
    <ChartComp>
      <div className="chart">
        <h4 className="chartTitle">월별 회원가입 현황</h4>
        {
          <ResponsiveContainer
            width="100%"
            aspect={4 / 1.5} // aspect 는 width / height 의 비율을 지정
          >
            <LineChart data={monthlyUserData}>
              {/* X축 설정 */}
              <XAxis
                dataKey="month"
                stroke="var(--GREY)"
                tickCount={12}
                tick={{
                  fontSize: 13,
                  fill: "var(--DARKGREY)",
                }}
              />
              {/* 선 그래프 설정 */}
              <Line
                type="monotone"
                dataKey="monthlyUser"
                // 그래프 선 색 변경
                stroke="var(--RED)" // 원하는 그래프 선의 색상으로 변경
              />
              {/* Y축 설정 */}
              <YAxis
                stroke="var(--GREY)"
                // tickCount 속성을 사용하여 눈금 간격을 지정
                tickCount={6}
                // tick 속성을 사용하여 텍스트 스타일 지정
                tick={{
                  fontSize: 13,
                  fill: "var(--DARKGREY)",
                }}
              />
              {/* Tooltip이 화면에 보일 수 있도록 위치 설정 */}
              <Tooltip
                position={{ y: -20 }}
                wrapperStyle={{ pointerEvents: "all" }} // 툴팁이 다른 요소들에 가려져도 포인터 유지
                contentStyle={{
                  color: "var(--GREY)",
                  minHeight: "60px",
                  padding: "10px",
                }} // Tooltip 크기 조절
                offset={20} // 위치 조절
              />
              {/* 그리드 설정 */}
              <CartesianGrid stroke="var(--GREY)" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        }
      </div>
    </ChartComp>
  );
}
