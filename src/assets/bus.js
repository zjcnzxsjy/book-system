/**
 * 适用于组件间简单事件通信，不提倡用于管理复杂数据及应用状态
 */
import Vue from 'vue'
let bus = new Vue();
export default bus;