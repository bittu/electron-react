const packager = require('electron-packager')

const options = {
	dir: '.',
	icon: './scripts/favicon.ico',
	out: 'out',
	overwrite: true,
	appVersion: '1.0.0.0',
	executableName: 'electron-react',
  name: 'electron-react',
  asar: true,
  platform: "win32",
  download: {
    mirror: 'https://github.com/castlabs/electron-releases/releases/download/v',
    cache: './.electron-dl-cache'
  },
  ignore: /^\/src|^\/out|^\/config|^\/lib|^\/public|^\/scripts|\/(\.[^/]*|.*\.md|.*\.markdown)$/
}
packager(options)
	.then(appPaths => {
    console.log('packager completed...', appPaths);
    const electronInstaller = require('electron-winstaller')
    electronInstaller.createWindowsInstaller({
      appDirectory: appPaths[0],
      outputDirectory: './out',
      authors: 'My Inc.',
      exe: 'electron-react.exe'
    })
      .then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));
  });