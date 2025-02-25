// publicData.js
import { House, Shop, UserFilled, User } from '@element-plus/icons-vue';

//日期转换格式
const dateFormat = "YYYY-MM-DD HH:mm"
const dateMonthFormat = "MM/YYYY"
const dateTimeFormat = "HH:mm DD/MM/YYYY"
const adminMenuData = [
  { id: 1, url: "/index", icon: House, name: "主页" },
  { id: 2, url: "/shop", icon: Shop, name: "商品管理" },
  { id: 3, url: "/category", icon: Shop, name: "分类管理" },
  { id: 4, url: "/spec", icon: Shop, name: "规格管理" },
  { id: 5, url: "/slider", icon: Shop, name: "轮播图管理" },
  { id: 6, url: "/order", icon: UserFilled, name: "订单管理" },
  { id: 7, url: "/user", icon: User, name: "用户管理" },
];
export {
  dateFormat,
  dateMonthFormat,
  dateTimeFormat,
  adminMenuData
}