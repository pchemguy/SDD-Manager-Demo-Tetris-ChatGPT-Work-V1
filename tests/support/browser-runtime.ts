/** Linux sandbox browser extraction; other platforms use Playwright's installation. */
import { access, mkdir, rm, writeFile } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { createBrotliDecompress } from 'node:zlib';
import tar from 'tar-fs';
import type { LaunchOptions } from '@playwright/test';

/** Extract packaged Chromium without archive ownership changes prohibited by the sandbox. */
export async function browserLaunchOptions(): Promise<LaunchOptions> {
  if (process.platform !== 'linux') return {};
  const { default: chromium } = await import('@sparticuz/chromium');
  const require = createRequire(import.meta.url);
  const assets = resolve(dirname(require.resolve('@sparticuz/chromium')), '../bin');
  // tar-fs supports chown; its community declarations omit that option.
  const extractionOptions = { chown: false, dmode: 0o755 };
  const cache = resolve('.cache/browser/153.0.0');
  const marker = resolve(cache, 'complete');
  let complete = false;
  try { await access(marker); complete = true; } catch { /* Extract below. */ }
  if (!complete) {
    await rm(cache, { recursive: true, force: true });
    await mkdir(cache, { recursive: true });
    await pipeline(createReadStream(resolve(assets, 'chromium.br')), createBrotliDecompress(),
      (await import('node:fs')).createWriteStream(resolve(cache, 'chromium'), { mode: 0o755 }));
    for (const name of ['fonts', 'swiftshader']) {
      const destination = name === 'fonts' ? resolve(cache, 'fonts') : cache;
      await mkdir(destination, { recursive: true });
      await pipeline(createReadStream(resolve(assets, `${name}.tar.br`)), createBrotliDecompress(),
        tar.extract(destination, extractionOptions));
    }
    await writeFile(marker, '153.0.0\n');
  }
  // The vendor's single-process flag breaks a second Playwright context.
  // Multiprocess launch passes this sandbox's full suite.
  return { executablePath: resolve(cache, 'chromium'), args: chromium.args.filter(arg => arg !== '--single-process'),
    env: { ...process.env, FONTCONFIG_PATH: resolve(cache, 'fonts'), LD_LIBRARY_PATH: cache } };
}
