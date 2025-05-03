
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, XAxis, YAxis, Bar, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { UserData } from "@/types/user";
import { format, startOfWeek, addDays } from "date-fns";

interface AttendanceChartProps {
  userData: UserData;
}

// Generate days of the week for the chart
const getDaysOfWeek = () => {
  const startDate = startOfWeek(new Date());
  return Array(7)
    .fill(0)
    .map((_, index) => {
      const date = addDays(startDate, index);
      return {
        name: format(date, "EEE"),
        date: format(date, "yyyy-MM-dd"),
        value: 0,
      };
    });
};

const AttendanceChart = ({ userData }: AttendanceChartProps) => {
  const [chartData, setChartData] = useState(getDaysOfWeek());
  
  // In a real app, this would fetch actual attendance data
  useEffect(() => {
    // Simulate data for demonstration
    setChartData(chartData.map(day => ({
      ...day,
      value: day.name === "Mon" || day.name === "Wed" || day.name === "Fri" 
        ? 1 
        : 0
    })));
  }, [userData]);

  const config = {
    attendance: {
      label: "Attendance",
      color: "#8B5CF6",
    },
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Weekly Attendance</CardTitle>
        <CardDescription>
          Your attendance record for the current week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ChartContainer config={config}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 1]} ticks={[0, 1]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Present" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceChart;
