import { createReadStream, existsSync, mkdirSync, rmdirSync } from 'fs';
import { DownloaderHelper } from 'node-downloader-helper';
import fetch from 'node-fetch';
import { Extract } from 'unzipper';
import { sync as delSync } from 'del';

const FAVICON_API_URL = 'https://realfavicongenerator.net/api/favicon';
const ICON_IMG = {
  alpha: 'https://i.imgur.com/OfK5jC5.png',
  beta: 'https://i.imgur.com/OfK5jC5.png',
  release: 'https://i.imgur.com/OfK5jC5.png',
};

async function generateFavicons(buildType, faviconAPIKey) {
  /**
   * 1. add all png, svg, ico files
   * 2. add browserconfig.xml
   * 3. merge manifest keys
   */
  console.log(`Fetching new favicons for "${buildType}"`);

  const faviconAPIResult = (
    await (
      await fetch(FAVICON_API_URL, {
        method: 'post',
        body: JSON.stringify({
          favicon_generation: {
            api_key: faviconAPIKey,
            master_picture: { type: 'url', url: ICON_IMG[buildType] },
            files_location: { type: 'root' },
            favicon_design: {
              desktop_browser: {},
              ios: {
                picture_aspect: 'background_and_margin',
                margin: 10,
                background_color: '#000000',
                assets: {
                  ios6_and_prior_icons: true,
                  ios7_and_later_icons: true,
                },
              },
              windows: {
                picture_aspect: 'white_silhouette',
                background_color: '#892cdc',
                assets: {
                  windows_80_ie_10_tile: true,
                  windows_10_ie_11_edge_tiles: {
                    small: true,
                    medium: true,
                    big: true,
                    rectangle: true,
                  },
                },
              },
              android_chrome: {
                picture_aspect: 'shadow',
                // manifest: {
                //   // These don't really matter as we have them specified in our
                //   // manifest already
                //   name: 'Stellar',
                //   start_url: '/',
                //   display: 'standalone'

                // },
                manifest: {},
              },
            },
          },
        }),
      })
    ).json()
  ).favicon_generation_result;

  // const faviconAPIResult = { result: { status: 'success' } };

  if (faviconAPIResult.result.status === 'success') {
    console.log('Generating and fetching successful');

    if (!existsSync('temp')) {
      console.log(`"temp" directory didn't exist; it will be created`);
      mkdirSync('temp');
    }

    console.log('Downloading favicons');
    const faviconZipDownloader = new DownloaderHelper(
      faviconAPIResult.favicon.package_url,
      'temp',
      { fileName: 'favicons.zip', override: true },
    );
    faviconZipDownloader.on('end', () => {
      console.log('Downloading successful');

      if (existsSync('temp/favicons')) {
        console.log(`"temp/favicons" already exists; it will be deleted`);
        delSync('temp/favicons');
      }

      console.log('Unzipping favicons');
      const faviconZipReadStream = createReadStream('temp/favicons.zip');
      faviconZipReadStream.pipe(Extract({ path: 'temp/favicons' }));
      console.log('Unzipping successful');
    });
    faviconZipDownloader.on('error', () => console.log('Downloading failed'));
    faviconZipDownloader.start();
  } else {
    console.error('Fetching failed; result:');
    console.error(faviconAPIResult);
  }
}

export default generateFavicons;