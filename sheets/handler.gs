function doPost(e) {
  try {
    Logger.log(e);
    recordRow(e);

    return ContentService.createTextOutput(JSON.stringify({
      "result":"success",
      "data": JSON.stringify(e.parameters)
    })).setMimeType(ContentService.MimeType.JSON);
  } catch(error) { // if error return this
    Logger.log(error);
    return ContentService.createTextOutput(JSON.stringify({
      "result":"error",
      "error": error
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function recordRow(e) {
  Logger.log(JSON.stringify(e));
  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName('Responses');
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow()+1;
    var row = [ new Date() ];
    
    for (var i = 1; i < headers.length; i++) {
      if(headers[i].length > 0) {
        var val = e.parameter[headers[i]] || '';
        row.push(val);
      }
    }
    
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
  } catch(error) {
    Logger.log(error);
  } finally {
    return;
  }
}
