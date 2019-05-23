const packager = require('electron-packager')

const platform = "win32";
const options = {
	dir: '.',
	icon: './scripts/favicon.ico',
	out: 'out',
	overwrite: true,
	appVersion: '1.0.0.0',
	executableName: 'electronreact',
  name: 'electronreact',
  asar: true,
  platform,
  download: {
    mirror: 'https://github.com/castlabs/electron-releases/releases/download/v',
    cache: './.electron-dl-cache'
  },
  ignore: /^\/src|^\/out|^\/config|^\/lib|^\/public|^\/scripts|^\/certs|\/(\.[^/]*|.*\.md|.*\.markdown)$/
}
packager(options)
	.then(appPaths => {
    console.log('packager completed...', appPaths);
    if (platform === 'darwin') {
      var createDMG = require('electron-installer-dmg')
      createDMG({
        appPath: `${appPaths[0]}/electron-react.app`,
        name: "electronreact",
        icon: './scripts/favicon.icns',
        overwrite: true,
        out: './out'
      }, function done (err) { if (err) console.log(err); console.log('DMG done')})
    } else {
      const electronInstaller = require('electron-winstaller')
      electronInstaller.createWindowsInstaller({
        appDirectory: appPaths[0],
        outputDirectory: './out',
        authors: 'British telecom Plc.',
        exe: 'electronreact.exe',
		name: 'electronreact.exe',
		title: 'electronreact.exe',
        signWithParams: `/a /f ./certs/codesign.pfx /p changeit /tr http://timestamp.comodoca.com /td sha256`,
		loadingGif: './scripts/transfer-gif.gif'
      })
        .then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));
    }
  });