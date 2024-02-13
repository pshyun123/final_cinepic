import React from "react";
import { useState, useEffect } from "react";
import BoardApi from "../../api/BoardApi";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import styled from "styled-components";

const BarChartBox = styled.div`
  padding: 30px;
  height: 400px;
  border-radius: 10px;
  border: 1px solid var(--GREY);
  background-color: white;

  .chartTitle {
    margin-bottom: 30px;
    font-weight: 600;
    font-size: 1.3rem;
    color: #333;
  }
`;

const categoryColors = {
  씨네크루: "var(--DARKRED)",
  크루후기: "var(--RED)",
  온라인: "var(--ORANGE)",
  오프라인: "var(--DARKGREY)",
};

const CategoryChart = () => {
  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await BoardApi.getAllCategories(); // API 호출
        const data = response.data;

        const formattedData = Object.keys(data)
          .map((key) => ({
            category: key,
            pv: data[key],
          }))
          .sort((a, b) => {
            const categoryOrder = {
              씨네크루: 0,
              크루후기: 1,
              온라인: 2,
              오프라인: 3,
            };
            //오름차순 정렬
            return categoryOrder[a.category] - categoryOrder[b.category];
          });

        setBoardData(formattedData); // 데이터 설정
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    }

    fetchData(); // 데이터 가져오기
  }, []); // 컴포넌트가 마운트될 때 한 번만 호출

  return (
    <BarChartBox>
      <h4 className="chartTitle">유형별 누적게시물 현황</h4>
      <ResponsiveContainer width="90%" height="90%">
        <ComposedChart
          layout="vertical"
          width={500}
          height={400}
          data={boardData}
          margin={{
            top: 30,
            right: 30,
            bottom: 30,
            left: 30,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" />
          <YAxis dataKey="category" type="category" scale="band" />
          <Bar dataKey="pv" barSize={20} radius={[0, 10, 10, 0]}>
            {boardData.length > 0 &&
              boardData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={categoryColors[entry.category]}
                />
              ))}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </BarChartBox>
  );
};

export default CategoryChart;
