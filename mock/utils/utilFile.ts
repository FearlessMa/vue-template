import * as fs from 'fs';
type ArrayStr = Array<string>;
/**
 * 获取文件名称
 *
 * @param {string} path 查找的根路径
 * @param {boolean} [includePath=true] 默认值true，是否显示基于根路径的完整路径
 * @returns {ArrayStr} 路径数组
 */
function getFile(path: string, includePath: boolean = true): ArrayStr {
  let urlList: ArrayStr = [];
  let urls: ArrayStr = fs.readdirSync(path);
  urls.forEach(url => {
    const isDir: boolean = fs.statSync(path + '/' + url).isDirectory();
    if (isDir) {
      const list: ArrayStr = getFile(path + '/' + url, includePath);
      if (includePath) {
        list.forEach(item => {
          urlList.push(url + '/' + item);
        })
      } else {
        urlList = urlList.concat(...list);
      }
    } else {
      urlList.push(url)
    }
  })
  return urlList;
}
/**
 * 获得文件名
 * 
 * @param {string} filePath 文件路径或者文件名
 * @param {boolean} [includeSuffixionName=false] 默认去除后缀名
 * @returns {string}
 */
function getFileName(filePath: string, includeSuffixionName: boolean = false): string {
  let fileName = filePath.split('/').pop();
  if (!includeSuffixionName) {
    fileName = fileName.split('.')[0]
  }
  return fileName
}

export {
  getFile,
  getFileName
}