import { getCpuLoad } from "./collectors/cpu.js";

async function sample() {
  const metrics = await getCpuLoad();
  console.log("Agent metrics:", metrics);
}

setInterval(() => {
  sample().catch((e) => console.error('Agent error:', e));
}, 5000);
