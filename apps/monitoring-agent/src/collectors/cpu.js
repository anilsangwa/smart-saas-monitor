export async function getCpuLoad() {
  // Lightweight cpu load sample using os module
  try {
    const os = await import('node:os');
    const cpus = os.cpus();
    const idle = cpus.reduce((sum, cpu) => sum + cpu.times.idle, 0);
    const total = cpus.reduce((sum, cpu) => sum + Object.values(cpu.times).reduce((a, b) => a + b, 0), 0);
    const load = total === 0 ? 0 : 1 - idle / total;
    return { load, cpuCount: cpus.length };
  } catch (e) {
    return { load: 0, cpuCount: 0, error: e.message };
  }
}
