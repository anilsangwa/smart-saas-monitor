import { getCpuLoad } from "./collectors/cpu.js";

setInterval(() => {
  console.log("Agent metrics:", getCpuLoad());
}, 5000);
