import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

const CenteredDoughnutChart = (props) => {
  useEffect(() => {
    Chart.register(CategoryScale, LinearScale, Title, Tooltip, Legend);

    const originalDoughnutDraw = Chart.registry.getController('doughnut').prototype.draw;
    Chart.registry.getController('doughnut').prototype.draw = function () {
      originalDoughnutDraw.apply(this, arguments);

      const { chart } = this;
      const { width, height, ctx } = chart;

      const centerX = width / 3.5;
      const centerY = height / 2;

      ctx.restore();
      const fontSize = (height / 114).toFixed(2);
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';

      const total = props.total; 
      const textX = centerX;
      const textY = centerY;

      ctx.fillStyle = 'white'; 
      ctx.fillText(total, textX, textY);
      ctx.save();
    };
  }, []);

  return <Doughnut data={props.data} options={props.options} />;
};

export default CenteredDoughnutChart;
