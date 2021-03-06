// Generated by CoffeeScript 1.10.0
var Excel2json;

Excel2json = (function() {
  var char, claseLevel;

  char = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  claseLevel = 3;

  function Excel2json(workbook) {
    this.workbook = workbook;
  }

  Excel2json.prototype.headSet = function(xValue) {};

  Excel2json.prototype.format = function() {
    var charCode, charCodeStart, charStore, ge, index, numberIndex, ref, result, sheet, ten, workbook;
    workbook = this.workbook;
    sheet = workbook.Sheets[workbook.SheetNames[0]];
    ref = sheet['!ref'].split(':');
    index = 0;
    charCodeStart = 65;
    charCode = 65;
    result = {};
    while (index <= 61) {
      charStore = '';
      ten = parseInt(index / 26);
      ge = index % 26;
      if (ten !== 0) {
        charStore = String.fromCharCode(charCodeStart + ten - 1);
      }
      charStore += String.fromCharCode(charCode + ge);
      numberIndex = 2;
      while (numberIndex <= 13) {
        if (index === 0) {
          result[sheet[charStore + numberIndex].v] = [];
        } else {
          result[sheet['A' + numberIndex].v].push(sheet[charStore + numberIndex].v);
        }
        ++numberIndex;
      }
      ++index;
    }
    return JSON.stringify(result);
  };

  return Excel2json;

})();
