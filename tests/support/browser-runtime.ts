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
  if (process.platform !== 'linux' || process.arch !== 'x64') return {};
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
  // The vendor config names Lambda directories. Point it at our extracted fonts.
  const xmlPath = (path: string) => path.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const fontCache = resolve(cache, 'font-cache');
  await mkdir(fontCache, { recursive: true });
  await writeFile(resolve(cache, 'fonts/fonts.conf'), `<?xml version="1.0"?>\n<fontconfig>\n<dir>${xmlPath(resolve(cache, 'fonts/fonts'))}</dir>\n<cachedir>${xmlPath(fontCache)}</cachedir>\n</fontconfig>\n`);
  // The vendor's single-process flag breaks a second Playwright context.
  // Multiprocess launch passes this sandbox's full suite.
  return { executablePath: resolve(cache, 'chromium'), args: chromium.args.filter(arg => arg !== '--single-process'),
    env: { ...process.env, FONTCONFIG_PATH: resolve(cache, 'fonts'), LD_LIBRARY_PATH: cache } };
}
