import { Bootstrap } from './bootstrap';

// loader 调起引导程序
Bootstrap().catch((err) => {
  console.error(err);
  console.error(err.stack);
  process.exit(1);
});
