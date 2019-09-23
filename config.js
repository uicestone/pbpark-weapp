const isProd = false || process.env === "production";

//http://kanga-test.uice.lu/api
//http://localhost:8080/api

export const config = {
  API_ENDPOINT: isProd ? "https://api.kangazone.com" : "http://localhost:8080/api",
  avaliableHours: [
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00"
  ],
  statusLabel: {
    PENDING: "待付款",
    BOOKED: "待服务",
    IN_QUEUE: "排队中",
    CANCELED: "已取消",
    IN_SERVICE: "服务中",
    FINISHED: "已完成"
  }
};
