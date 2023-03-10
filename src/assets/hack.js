/**
 * - 适用条件
 *   - CDN 直播播放器，配置了 webPageFullScreen
 * - 执行时机
 *   - 监听 PolyvLiveSdk.EVENTS.CHANNEL_DATA_INIT 事件中，liveSdk.setupPlayer 之后
 *
 * @param liveSdk  PolyvLiveSdk 实例
 */
export function getLiveSdkHackHelper(liveSdk) {
  const getLivePlayer = () => {
    return liveSdk.player.player.livePlayer;
  };

  const getWebPageFullScreenComponent = () => {
    return liveSdk.player.player.livePlayer.webPageFullScreenComponent;
  };

  /**
   * 兼容 webview 播放器
   * @warn 需要提前注入 hack.css
   * @param distance 导航栏的距离
   * */
  function polyfillWebviewPlayer(distance = 70) {
    const fl = getWebPageFullScreenComponent();
    setTimeout(() => {
      document.documentElement.style.setProperty(
        '--plv-fullscreen-webview-polyfill',
        `${distance}px`
      );
      if (!fl.isLandscape) {
        document.documentElement.style.setProperty(
          '--plv-fullscreen-vh',
          `${window.innerHeight - distance}px`
        );
      }
      fl.container.addClass('plv-webview-polyfill');
    }, fl.set.ocDelay + 100);
  }

  window.addEventListener('orientationchange', polyfillWebviewPlayer);

  return {
    /** 设置全屏 */
    openFullscreen: () => { getLivePlayer().events.emit('FULL_SCREEN_CLICK', true); },
    /** 退出全屏 */
    exitFullscreen: () => { getLivePlayer().events.emit('FULL_SCREEN_CLICK', false); },
    /** 兼容 webview 播放器 */
    polyfillWebviewPlayer
  };
}
