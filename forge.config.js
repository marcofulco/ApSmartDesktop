module.exports = {
  packagerConfig: {
    icon: 'icon/iconaAp.ico' 
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        iconUrl: 'https://smart.aziendapratica.it/iconaAp.ico',
        setupIcon: 'icon/iconaAp.ico',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
            icon: 'icon/iconaAp.ico',
          },
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
