import FileSaver from 'file-saver'

export function saveJsonFile(fileName, json) {
  var file = new Blob([json], {type: "application/json;charset=utf-8"});
  FileSaver.saveAs(file, fileName);
}