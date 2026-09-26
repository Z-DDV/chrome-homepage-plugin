import { readFileSync, writeFileSync } from 'node:fs'

const directory = new URL('../assets/weather-backgrounds/', import.meta.url)

// 镜像相邻副本使两端像素一致；内嵌 JPEG，避免 SVG 背景禁用外部图片引用。
for (const kind of ['clear', 'cloudy', 'rain', 'snow', 'storm', 'fog']) {
  const image = readFileSync(new URL(`${kind}.jpg`, directory)).toString('base64')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="3200" height="400" viewBox="0 0 3200 400">
  <defs><image id="photo" width="1600" height="400" xlink:href="data:image/jpeg;base64,${image}"/></defs>
  <use xlink:href="#photo"/>
  <use xlink:href="#photo" transform="translate(3200 0) scale(-1 1)"/>
</svg>
`
  writeFileSync(new URL(`${kind}-tile.svg`, directory), svg, 'utf8')
}
