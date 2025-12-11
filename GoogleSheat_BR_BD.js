function buttonBR_BDWithLock(e) {
  executeWithLock(()=>{
    buttonBR_BD(e);
  });
}

/**
 * Handles the "Create BD" and "Create BR" button actions in the sheet.
 * @param {Object} e - The event object passed by the onEdit trigger.
 */
function buttonBR_BD(e) {
  const range = e.range; // По какой колонке кликнули
  const mainSheet = range.getSheet(); // Get the active sheet
  const mainRow = range.getRow(); // Get the row of the edited cell

  // Ensure the action is performed only for rows >= 2 in the correct sheet
  //Анализируется только вкладка "ЗвБД"
  if (mainRow >= 2 && mainSheet.getName() === CONFIG_BRBD_SHEETS.zvbd.name) {//CONFIG_BRBD_SHEETS.zvbd.name: "ЗвБД", Вкладка называется "ЗвБД"//mainSheet: "ЗвБД"
    // // Define the column names for buttons and URLs
    const btnBDColumnName = CONFIG_BRBD_SHEETS.zvbd.columns.genBD;//genBD: "БД_створити"//btnBDColumnName: "БД_створити"
    const btnBRColumnName = CONFIG_BRBD_SHEETS.zvbd.columns.genBR;//genBR: "БР_створити",//btnBRColumnName: "БР_створити"
    const btnPTColumnName = CONFIG_BRBD_SHEETS.zvbd.columns.genZvT;//genZvT: "ЗвТ_створити"//btnPTColumnName: "ЗвТ_створити"
    const btnRptColumnName = CONFIG_BRBD_SHEETS.zvbd.columns.genRpt;//genRpt: "Рп_створити",//btnRptColumnName: "Рп_створити"
    const urlBDColumnName = CONFIG_BRBD_SHEETS.zvbd.columns.urlBD;//urlBD: "БД"//urlBDColumnName: "БД"
    const urlBRColumnName = CONFIG_BRBD_SHEETS.zvbd.columns.urlBR;//urlBR: "БР"//urlBRColumnName: "БР"
    const urlZTColumnName = CONFIG_BRBD_SHEETS.zvbd.columns.urlZvT;//urlZvT: "ЗвТ"//urlZTColumnName: "ЗвТ"
    const urlRptColumnName =CONFIG_BRBD_SHEETS.zvbd.columns.urlRpt;//urlRpt: "Рп"//urlRptColumnName: "Рп"

    // Get column indexes for the specified fields
    const mainColumnIndexes = getColumnIndexes(mainSheet);//mainSheet: "ЗвБД"

    // Handle "Create BD" button actions
    if (range.getColumn() === mainColumnIndexes[btnBDColumnName]) {//btnBDColumnName: "БД_створити"
      if (e.value === "TRUE" && e.oldValue !== "TRUE") {
        // Notify the user and create BD
        mainSheet.getParent().toast("Run BD", "Notification", 5);//mainSheet: "ЗвБД"
        try {
		  //Проверяет, что в "ЗвТ_створити" стоит "TRUE", иначе просит создать "ЗвеТаб - відсутня. Створіть ЗвеТаб"
          checkIsPTExist(mainSheet, mainRow, mainColumnIndexes[btnPTColumnName], "TRUE");//mainSheet: "ЗвБД"//btnPTColumnName: "ЗвТ_створити"
          const urlNewBD = formateBD(mainSheet, mainRow); // Generate BD//mainSheet: "ЗвБД"
          mainSheet.getRange(mainRow, mainColumnIndexes[urlBDColumnName]).setValue(urlNewBD);//mainSheet: "ЗвБД"//urlBDColumnName: "БД"
        } catch (error) {
          Logger.log(`Error creating BD: ${error.message}`);
          mainSheet.getParent().toast("Error creating BD!", "Error", 5);//mainSheet: "ЗвБД"
          mainSheet.getRange(mainRow, mainColumnIndexes[urlBDColumnName]).setValue(`Error creating BD: \n${error.message}`);//mainSheet: "ЗвБД"//urlBDColumnName: "БД"
          mainSheet.getRange(mainRow, mainColumnIndexes[btnBDColumnName]).setValue("FALSE");//btnBDColumnName: "БД_створити"//mainSheet: "ЗвБД"
        }
      } else if (e.value === "FALSE" && e.oldValue !== "FALSE") {
        // Notify the user and delete BD
        mainSheet.getParent().toast("Delete BD", "Notification", 5);//mainSheet: "ЗвБД"
        removeFileAndUrl(mainSheet.getRange(mainRow, mainColumnIndexes[urlBDColumnName]));//mainSheet: "ЗвБД"//urlBDColumnName: "БД"
      }

    // Handle "Create BR" button actions
    } else if (range.getColumn() === mainColumnIndexes[btnBRColumnName]) {//btnBRColumnName: "БР_створити"
      if (e.value === "TRUE" && e.oldValue !== "TRUE") {
        // Notify the user and create BR
        mainSheet.getParent().toast("Run BR", "Notification", 5);
        try {
		  //Проверяет, что в "ЗвТ_створити" стоит "TRUE", иначе просит создать "ЗвеТаб - відсутня. Створіть ЗвеТаб"
          checkIsPTExist(mainSheet, mainRow, mainColumnIndexes[btnPTColumnName], "TRUE");//btnPTColumnName: "ЗвТ_створити"
          const urlNewBR = formateBR(mainSheet, mainRow); // Generate BR
          mainSheet.getRange(mainRow, mainColumnIndexes[urlBRColumnName]).setValue(urlNewBR);//urlBRColumnName: "БР"
        } catch (error) {
          Logger.log(`Error creating BR: ${error.message}`);
          mainSheet.getParent().toast("Error creating BR!", "Error", 5);
          mainSheet.getRange(mainRow, mainColumnIndexes[urlBRColumnName]).setValue(`Error creating BR: \n${error.message}`);//urlBRColumnName: "БР"
          mainSheet.getRange(mainRow, mainColumnIndexes[btnBRColumnName]).setValue("FALSE");//btnBRColumnName: "БР_створити"
        }
      } else if (e.value === "FALSE" && e.oldValue !== "FALSE") {
        // Notify the user and delete BR
        mainSheet.getParent().toast("Delete BR", "Notification", 5);
        removeFileAndUrl(mainSheet.getRange(mainRow, mainColumnIndexes[urlBRColumnName]));//urlBRColumnName: "БР"
      }
      // Handle "Create PivotTable" button actions
    } else if (range.getColumn() === mainColumnIndexes[btnPTColumnName]) {//btnPTColumnName: "ЗвТ_створити"
      if (e.value === "TRUE" && e.oldValue !== "TRUE") {
        // Notify the user and create PT
        mainSheet.getParent().toast("Run ZT", "Notification", 5);
        try {
          const urlNewBR = formatePT(mainSheet, mainRow); // Generate PT
          mainSheet.getRange(mainRow, mainColumnIndexes[urlZTColumnName]).setValue(urlNewBR);//urlZTColumnName: "ЗвТ"
        } catch (error) {
          Logger.log(`Error creating ZT: ${error.message}`);
          mainSheet.getParent().toast("Error creating ZT!", "Error", 5);
          mainSheet.getRange(mainRow, mainColumnIndexes[urlZTColumnName]).setValue(`Error creating ZT: \n${error.message}`);//urlZTColumnName: "ЗвТ"
          mainSheet.getRange(mainRow, mainColumnIndexes[btnPTColumnName]).setValue("FALSE");//btnPTColumnName: "ЗвТ_створити"
        }
      } else if (e.value === "FALSE" && e.oldValue !== "FALSE") {
        // Notify the user and delete PT
        mainSheet.getParent().toast("Delete ZT", "Notification", 5);
        setValueWithRecallTrigger(mainSheet.getRange(mainRow, mainColumnIndexes[btnBDColumnName]), 'FALSE');//btnBDColumnName: "БД_створити"
        setValueWithRecallTrigger(mainSheet.getRange(mainRow, mainColumnIndexes[btnBRColumnName]), 'FALSE');//btnBRColumnName: "БР_створити"
        removeFileAndUrl(mainSheet.getRange(mainRow, mainColumnIndexes[urlZTColumnName]));//urlZTColumnName: "ЗвТ"
      }
    // Handle "Create report" button actions
    } else if (range.getColumn() === mainColumnIndexes[btnRptColumnName]) {//btnRptColumnName: "Рп_створити"
      if (e.value === "TRUE" && e.oldValue !== "TRUE") {
        // Notify the user and create Report
        mainSheet.getParent().toast("Run reports", "Notification", 5);
        try {
          const urlNewRpt = formateRpt(mainSheet, mainRow); // Generate report
          mainSheet.getRange(mainRow, mainColumnIndexes[urlRptColumnName]).setValue(urlNewRpt);//urlRptColumnName: "Рп"
        } catch (error) {
          Logger.log(`Error creating reports: ${error.message}`);
          mainSheet.getParent().toast("Error creating reports!", "Error", 5);
          mainSheet.getRange(mainRow, mainColumnIndexes[urlRptColumnName]).setValue(`Error creating reports: \n${error.message}`);//urlRptColumnName: "Рп"
          mainSheet.getRange(mainRow, mainColumnIndexes[btnRptColumnName]).setValue("FALSE");//btnRptColumnName: "Рп_створити"
        }
      } else if (e.value === "FALSE" && e.oldValue !== "FALSE") {
        // Notify the user and delete reports
        mainSheet.getParent().toast("Delete reports", "Notification", 5);
        removeFileAndUrl(mainSheet.getRange(mainRow, mainColumnIndexes[urlRptColumnName]));//urlRptColumnName: "Рп"
      }
    }
  }
}




function removeFileAndUrl(range) {
  const url = range.getValue();
  if (url) {
    try {
      deleteGoogleDoc(url); // Delete the BR file
    } catch (error) {
      Logger.log(`Error deleting ${url}: ${error.message}`);
      range.getSheet().getParent().toast("Error deleting ${url}!", "Error", 5);
    }
  }
  range.setValue(""); // Clear URL cell
}

function setValueWithRecallTrigger(range, value) {
  const oldValue = range.getValue().toString().toUpperCase(); // Capture the value before changing it
  range.setValue(value);             // Set the new value

  // Construct the fake onEdit event object
  const fakeEvent = {
    range: range,
    source: range.getSheet().getParent(),
    value: value,
    oldValue: oldValue,
    authMode: ScriptApp.AuthMode.FULL
  };

  // Trigger your locked function manually
  buttonBR_BDWithLock(fakeEvent);
}

/*
checkIsPTExist(mainSheet, mainRow, mainColumnIndexes[btnPTColumnName], "TRUE");//mainSheet: "ЗвБД"//btnPTColumnName: "ЗвТ_створити"
checkIsPTExist(mainSheet, mainRow, mainColumnIndexes[btnPTColumnName], "TRUE");//mainSheet: "ЗвБД"//btnPTColumnName: "ЗвТ_створити"
*/
function checkIsPTExist(mainSheet, mainRow, btnPTColumnIdx, expectedValue) {
  const btnPTValue = mainSheet.getRange(mainRow, btnPTColumnIdx).getValue().toString().toUpperCase();
  if(btnPTValue != expectedValue) {//expectedValue = "TRUE"
    let errorMessage = "";
    if (btnPTValue === "TRUE") {
      errorMessage = "ЗвеТаб вже існує";
    } else if(btnPTValue !== "TRUE") {
      errorMessage = "ЗвеТаб - відсутня. Створіть ЗвеТаб";
    }
    throw new Error(errorMessage);
  }
}

function testButtonBR_BD() {
  const sheet = SpreadsheetApp.openById(CONFIG_MAIN.brbdFileId).getSheetByName(CONFIG_BRBD_SHEETS.zvbd.name);
  const mockEvent = {
    range: sheet.getRange("G2"), // Example range
    value: "TRUE", // Simulate a checkbox being checked
    source: sheet.getParent(),
    oldValue: "FALSE",
  };

  buttonBR_BDWithLock(mockEvent); // Call the function with the mock event
}
//----------------------------------------------------------

/**
 * Formats and processes BR data for a specific row in the main sheet.
 * This function acts as a wrapper around the more generic `formateDoc` function,
 * passing BR-specific parameters for date, number, structure sheet, and name prefix.
 *
 * @param {Sheet} mainSheet - The main sheet where the BR data resides.
 * @param {number} mainRow - The row number in the main sheet to process.
 * @returns {string} - The URL of the newly created BR document.
 */
function formateBR(mainSheet, mainRow) {
  // Define BR-specific configuration:
  const brDateColumn = CONFIG_BRBD_SHEETS.zvbd.columns.dateBR;
  const brNumberColumn = CONFIG_BRBD_SHEETS.zvbd.columns.numBR;
  const brStructSheetName = CONFIG_INFO.sheets.brStruct.name; // Name of the structure sheet in the linked info spreadsheet
  const mainSprdsht = mainSheet.getParent();//mainSprdsht - вся таблица, со всеми вкладками
  const brNamePrefix = "БР" + getMainUnitName(mainSprdsht); // Prefix for naming the generated document

  // Call the generic `formateDoc` function with BR-specific parameters.
  return formateDoc(mainSheet, mainRow, brDateColumn, brNumberColumn, brStructSheetName, brNamePrefix);
}
//----------------------------------

/**
 * Formats and processes BD data for a specific row in the main sheet.
 * This function acts as a wrapper around the more generic `formateDoc` function,
 * passing BD-specific parameters for date, number, structure sheet, and name prefix.
 *
 * @param {Sheet} mainSheet - The main sheet where the BD data resides.
 * @param {number} mainRow - The row number in the main sheet to process.
 * @returns {string} - The URL of the newly created BD document.
 */
function formateBD(mainSheet, mainRow) {
  // Define BR-specific configuration:
  const bdDateColumn = CONFIG_BRBD_SHEETS.zvbd.columns.dateBD;//dateBD: "ДатаБД"//bdDateColumn: "ДатаБД"
  const bdNumberColumn = CONFIG_BRBD_SHEETS.zvbd.columns.numBD;//numBD: "№БД"//bdNumberColumn: "№БД"
  const bdStructSheetName = CONFIG_INFO.sheets.bdStruct.name; //bdStruct.name: BDst//bdStructSheetName: BDst
  const mainSprdsht = mainSheet.getParent();//mainSprdsht - вся таблица, со всеми вкладками
  const bdNamePrefix = "БД" + getMainUnitName(mainSprdsht); // Prefix for naming the generated document

  // Call the generic `formateDoc` function with BR-specific parameters.
  return formateDoc(mainSheet, mainRow, bdDateColumn, bdNumberColumn, bdStructSheetName, bdNamePrefix);
}
//---------------------------------

function formatePT(mainSheet, mainRow) {
  // find units urls
  const unitUrls = findUnitUrls(mainSheet, mainRow);
  // find child BRBDs urls
  const childBDBDUrls = findChildBDBDUrls(mainSheet.getParent());

  // collect errors
  const zvbdColumnIdxs = getColumnIndexes(mainSheet);
  const curDate = mainSheet.getRange(mainRow, zvbdColumnIdxs[CONFIG_BRBD_SHEETS.zvbd.columns.dateBD], 1, 1).getValue();
  let errMessage = "";
  if (unitUrls.length === 0 && childBDBDUrls.length === 0) {
    errMessage = "Empty";
  } else {
    errMessage = [
      ...unitUrls.map(checkErrorsInOneBD),
      ...childBDBDUrls.map(url => checkErrorsInOneBRBD(url, curDate))
      ]
      .filter(Boolean)
      .join("\n\n")
  }
  // throw if any error found
  if (errMessage.length > 0) {
    throw new Error(errMessage)
  }

  // collect data for PT
  //    from child BRBDs
  //    from units
  const ptHeader = Object.values(CONFIG_PIVOTTABLE.sheets.task.columns);
  const ptData = [
    ptHeader,
    ... unitUrls.map(getPTFromLeaf).flat(),
    ... childBDBDUrls.map(url => getPTFromBRBD(url, curDate)).flat(),
  ];

  // save collected PT
  return savePT(ptData, curDate);
}


function getPTFromLeaf(url){
  const srcSprdsht = SpreadsheetApp.openByUrl(url);
  const leafSrcSheet = srcSprdsht.getSheetByName(
    CONFIG_COPY2PIVOTTABLE.fromUnit.srcSheet);
  const resultColumns = Object.values(CONFIG_PIVOTTABLE.sheets.task.columns);
  const columnMapping = CONFIG_COPY2PIVOTTABLE.fromUnit.columns2Copy;
  let fullData = getDataFromSheetByColumns(leafSrcSheet, resultColumns, columnMapping);
  
  // remove empty rows
  fullData = fullData.filter(row => {
    return !row.every(cell => String(cell).trim() === '');
  });

  // add curUnit name to unitLvl1
    // find curUnitShortName
  const curUnitId = srcSprdsht.getSheetByName(CONFIG_UNIT.sheets.dCommon.name).getRange(CONFIG_UNIT.sheets.dCommon.cells.unitId).getValue();

  const dUnitSheet = srcSprdsht.getSheetByName(CONFIG_UNIT.sheets.dUnit.name);
  const dUnitSheetData = dUnitSheet.getDataRange().getValues();
  const dUnitDictData = convertToArrayOfDictionaries(dUnitSheetData);
  const curUnitDict = dUnitDictData.find(rowDict => rowDict[CONFIG_UNIT.sheets.dUnit.columns.unitId] === curUnitId);
  if (!curUnitDict){
    throw new Error(`There is no ${curUnitId} In sheet=${CONFIG_UNIT.sheets.dUnit.name} column=${CONFIG_UNIT.sheets.dUnit.columns.unitId}`);
  }
  const curUnitName = curUnitDict[CONFIG_UNIT.sheets.dUnit.columns.unitNameShort];

  // add curUnit name to unitLvl1
  fullData = fillColumnWithValue(fullData, CONFIG_PIVOTTABLE.sheets.task.columns.unitLvl1, curUnitName);

  //remove skipRow and header
  const skipRow = CONFIG_COPY2PIVOTTABLE.fromUnit.skipRow;
  const ptWithoutSkippingRow = [...fullData.slice(1, skipRow - 1),...fullData.slice(skipRow)]

  return ptWithoutSkippingRow;
}

function getPTFromBRBD(brbdUrl, curDate) {
  const brbdSprdsht = SpreadsheetApp.openByUrl(brbdUrl);
  const zvbdSheet = brbdSprdsht.getSheetByName(CONFIG_BRBD_SHEETS.zvbd.name);  
  const zvbdRowNumber = findRowByDate(zvbdSheet, CONFIG_BRBD_SHEETS.zvbd.columns.dateBD, curDate);
  const zvbdColumnIndexs = getColumnIndexes(zvbdSheet);
  const ptUrl = zvbdSheet.getRange(
    zvbdRowNumber,
    zvbdColumnIndexs[CONFIG_BRBD_SHEETS.zvbd.columns.urlZvT],
    1,
    1
  ).getValue();
  const srcPtSheet = SpreadsheetApp.openByUrl(ptUrl).getSheetByName(CONFIG_COPY2PIVOTTABLE.fromPT.srcSheet);
  const resultColumns = Object(CONFIG_PIVOTTABLE.sheets.task.columns).values();
  const columnMapping = CONFIG_COPY2PIVOTTABLE.fromPT.columns2Copy;
  let fullData = getDataFromSheetByColumns(srcPtSheet, resultColumns, columnMapping);

  // add curUnit name to unitLvl1
    // find curUnitShortName
  const curUnitId = brbdSprdsht.getSheetByName(CONFIG_BRBD_SHEETS.comInfo.name).getRange(CONFIG_BRBD_SHEETS.comInfo.cells.mainUnitId).getValue();

  const dUnitSheet = srcSprdsht.getSheetByName(CONFIG_BRBD_SHEETS.dUnit.name);
  const dUnitSheetData = dUnitSheet.getDataRange().getValues();
  const dUnitDictData = convertToArrayOfDictionaries(dUnitSheetData);
  const curUnitDict = dUnitDictData.find(rowDict => rowDict[CONFIG_BRBD_SHEETS.dUnit.columns.unitId] === curUnitId);
  if (!curUnitDict){
    throw new Error(`There is no ${curUnitId} In sheet=${CONFIG_BRBD_SHEETS.dUnit.name} column=${CONFIG_BRBD_SHEETS.dUnit.columns.unitId}`);
  }
  const curUnitName = curUnitDict[CONFIG_BRBD_SHEETS.dUnit.columns.unitNameShort];
  // add curUnit name to unitLvl1
  fullData = fillColumnWithValue(fullData, CONFIG_PIVOTTABLE.sheets.task.columns.unitLvl1, curUnitName);

  // remove headers
  return fullData.slice(1); 
}

function savePT(pivotTable, curDate) {
  // make copy of templatePT and save to corresponding fold
  const parserPivotTableFileName = new ParserPivotTableFileName();
  const parserPivotTableTemplateFileName = new ParserPivotTableTemplateFileName();
  const templatePTFileName = parserPivotTableTemplateFileName.Form({version: CONFIG_MAIN.version});
  const templatePTId = getFileIdByName(CONFIG_MAIN.templateFolderId, templatePTFileName);
  const newPTFileName = parserPivotTableFileName.Form({version: CONFIG_MAIN.version, date: curDate});
  const dstFolderId = getFolderByDate(CONFIG_MAIN.dataFolderId, curDate);

  const newPTId = copyFile(templatePTId, dstFolderId, newPTFileName);

  // todo paste pivotTable to new file

  const newPT = SpreadsheetApp.openById(newPTId);
  const newPTSheet = newPT.getSheetByName(CONFIG_PIVOTTABLE.sheets.task.name);

  const pasteRange = newPTSheet.getRange(1, 1, pivotTable.length, pivotTable[0].length);
  pasteRange.setValues(pivotTable);

  return newPT.getUrl();
}


/**
 * Finds URLs for a unit in the main sheet row.
 *
 * @param {GoogleAppsScript.Spreadsheet.Sheet} mainSheet - The sheet to read from.
 * @param {number} mainRow - The row number to process.
 */
function findUnitUrls(mainSheet, mainRow) {
  // Fetch data from the main row
  const mainColumnIndexes = getColumnIndexes(mainSheet);
  const mainRowData = mainSheet.getRange(mainRow, 1, 1, mainSheet.getLastColumn()).getValues()[0];

  const unitUrlColumnIndices = getRangeOfIndicesInDict(
    CONFIG_BRBD_SHEETS.zvbd.columns.startBDUrl,
    CONFIG_BRBD_SHEETS.zvbd.columns.endBDUrl,
    mainColumnIndexes);

  const unitUrls = unitUrlColumnIndices
    .map(columnIdx => {
      return mainRowData[columnIdx - 1];
    })
    .filter(Boolean); // Remove null/undefined values
  
  return unitUrls;
}

/**
 * Finds URLs for a child brdbs from spreadsheet.
 *
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} mainSprdsht
 */
function findChildBDBDUrls(mainSprdsht) {
  
  const mainUnitId = mainSprdsht.getSheetByName(CONFIG_BRBD_SHEETS.comInfo.name).getRange(CONFIG_BRBD_SHEETS.comInfo.cells.mainUnitId).getValue();

  const dUnitSheet = mainSprdsht.getSheetByName(CONFIG_BRBD_SHEETS.dUnit.name);
  const dUnitColumnIndexes = getColumnIndexes(dUnitSheet);
  const dUnitData = dUnitSheet.getDataRange().getValues().slice(1); // data without header
  const childBDUrls = dUnitData
    .filter(row => {
      return row[dUnitColumnIndexes[CONFIG_BRBD_SHEETS.dUnit.columns.masterUnitId] - 1] === mainUnitId 
      && row[dUnitColumnIndexes[CONFIG_BRBD_SHEETS.dUnit.columns.isLeaf] - 1] === false;
    })
    .map(row => {
      return row[dUnitColumnIndexes[CONFIG_BRBD_SHEETS.dUnit.columns.unitBRBDId] - 1];
    })
    .filter(Boolean);
  
  return childBDUrls;
}
//----------------------------------------

/**
 * Formats and processes Report data for a specific row in the main sheet.
 * This function acts as a wrapper around the more generic `formateDoc` function,
 * passing Report-specific parameters for date, number, structure sheet, and name prefix.
 *
 * @param {Sheet} mainSheet - The main sheet where the BD data resides.
 * @param {number} mainRow - The row number in the main sheet to process.
 * @returns {string} - The URL of the newly created BD document.
 */
function formateRpt(mainSheet, mainRow) {
  const dateColumn = CONFIG_BRBD_SHEETS.zvbd.columns.dateBD; // Column name containing the BD date
  const infoColumn = CONFIG_BRBD_SHEETS.zvbd.columns.urlInfo; // Column name containing the link to the info spreadsheet
  const rptStructSheetName = CONFIG_INFO.sheets.rptStruct.name; // Name of the structure sheet in the linked info spreadsheet

  // Step 1: Get the column indexes for required fields, Fetch data from the row being processed
  const mainColumnIndexes = getColumnIndexes(mainSheet);
  const mainRowData = mainSheet.getRange(mainRow, 1, 1, mainSheet.getLastColumn()).getValues()[0];


  // Step 2: Access the linked info spreadsheet
  const infoId = extractSpreadsheetId(mainRowData[mainColumnIndexes[infoColumn] - 1]); // Extract spreadsheet ID from URL
  const infoSpreadsheet = SpreadsheetApp.openById(infoId);
  const structSheet = infoSpreadsheet.getSheetByName(rptStructSheetName);

  if (!structSheet) {
    throw new Error(`Structure sheet "${rptStructSheetName}" not found in the linked spreadsheet.`);
  }

  // Step 3: Collect text data from the structure sheet
  const collectedTexts = collectDataByStruct(structSheet, mainSheet, mainRow);

  // Step 4: Copy the document template and rename it
    //Get the folder where the info file is located
  let docFolderID;
  const infoParentFolders = DriveApp.getFileById(infoId).getParents();
  if (infoParentFolders.hasNext()) {
    docFolderID = infoParentFolders.next().getId(); // Get the parent folder ID
  } else {
    throw new Error("The linked spreadsheet does not have a parent folder.");
  }
    // Generate a unique name for the new document
  const docDate = mainRowData[mainColumnIndexes[dateColumn] - 1];
  const parserReportsFileName = new ParserReportsFileName();
  const docName = parserReportsFileName.Form({version:CONFIG_MAIN.version, date: docDate});

  const templateFileID = getReportsTemplateId(); // ID of the document template
  const docFileID = copyFile(templateFileID, docFolderID, docName);

  // Step 5: Add the collected texts as separate paragraphs in the newly created document
  addParagraphsAsLast(docFileID, collectedTexts);

  // Construct the URL for the new document
  const docUrl = `https://docs.google.com/document/d/${docFileID}`;

  // Log the success message
  Logger.log(`File "${docName}" successfully created at ${docUrl}.`);
  
  return docUrl; // Return the URL of the created document
}
//----------------------------------------

/**
 * Formats and creates a new document based on a template, with data collected from a structured sheet.
 *
 * @param {Sheet} mainSheet - The main sheet where the function is triggered.
 * @param {number} mainRow - The row in the main sheet being processed.
 * @param {string} dateColumn - The column name in the main sheet containing the date.
 * @param {string} numberColumn - The column name in the main sheet containing the number.
 * @param {string} structSheetName - The name of the structure sheet in the linked spreadsheet.
 * @param {string} docNamePrefix - Prefix for the name of the generated document.
 * @returns {string} - The URL of the created document.
 * @throws {Error} - Throws an error if any critical steps fail (e.g., missing sheet, missing folder).
 */
function formateDoc(mainSheet, mainRow, dateColumn, numberColumn, structSheetName, docNamePrefix) {
  // Configuration: Template file ID and info column
  const templateDocFileID = getDocTemplateId(); // ID of the document template
  const infoColumn = CONFIG_BRBD_SHEETS.zvbd.columns.urlInfo; // Column name containing the link to the info spreadsheet

  // Get the column indexes for required fields
  const mainColumnIndexes = getColumnIndexes(mainSheet);
  
  // Fetch data from the row being processed
  const mainRowData = mainSheet.getRange(mainRow, 1, 1, mainSheet.getLastColumn()).getValues()[0];

  // Access the linked info spreadsheet
  const infoUrl = mainRowData[mainColumnIndexes[infoColumn] - 1];
  const infoId = extractSpreadsheetId(infoUrl); // Extract spreadsheet ID from URL
  const infoSpreadsheet = SpreadsheetApp.openById(infoId);
  const structSheet = infoSpreadsheet.getSheetByName(structSheetName);

  if (!structSheet) {
    throw new Error(`Structure sheet "${structSheetName}" not found in the linked spreadsheet.`);
  }

  // Collect text data from the structure sheet
  const collectedTexts = collectDataByStruct(structSheet, mainSheet, mainRow);

  // Generate a unique name for the new document
  const docDate = mainRowData[mainColumnIndexes[dateColumn] - 1];
  const docNumber = mainRowData[mainColumnIndexes[numberColumn] - 1];
  const formattedDate = Utilities.formatDate(new Date(docDate), Session.getScriptTimeZone(), "yyyy.MM.dd");
  const docName = `${docNamePrefix}_${formattedDate}_${docNumber}`; //todo add to naming

  // Get the folder where the info file is located
  let docFolderID;
  const infoParentFolders = DriveApp.getFileById(infoId).getParents();
  if (infoParentFolders.hasNext()) {
    docFolderID = infoParentFolders.next().getId(); // Get the parent folder ID
  } else {
    throw new Error("The linked spreadsheet does not have a parent folder.");
  }

  // Copy the document template and rename it
  const docFileID = copyFile(templateDocFileID, docFolderID, docName);

  // Add the collected texts as separate paragraphs in the newly created document
  addParagraphsAsLast(docFileID, collectedTexts);

  // Construct the URL for the new document
  const docUrl = `https://docs.google.com/document/d/${docFileID}`;

  // Log the success message
  Logger.log(`File "${docName}" successfully created at ${docUrl}.`);
  
  return docUrl; // Return the URL of the created document
}
//---------------------------------

/**
 * Collects data from external sheets based on a structure defined in structSheet.
 *
 * @param {Sheet} structSheet - The sheet defining the structure of data extraction.
 * @param {Sheet} mainSheet - The main sheet containing URLs to external sheets.
 * @param {number} mainRow - The row in the mainSheet where the external sheet URLs are located.
 * @returns {Array<string>} - An array of extracted text values from external sheets.
 */
function collectDataByStruct(structSheet, mainSheet, mainRow) {
  let collectedTexts = []; // Array to store collected text values.

  // Retrieve column indexes dynamically for structSheet and mainSheet.
  const structColumnIndexes = getColumnIndexes(structSheet);
  const mainColumnIndexes = getColumnIndexes(mainSheet);

  // Get the range of data from structSheet.
  const lastRow = structSheet.getLastRow();
  const lastColumn = structSheet.getLastColumn();
  const allData = structSheet.getRange(2, 1, lastRow - 1, lastColumn).getValues(); // Retrieve data excluding headers.

  // Iterate over each row in structSheet.
  allData.forEach(row => {
    // Extract values based on column indexes.
    const srcFrom = row[structColumnIndexes[CONFIG_INFO.anyStructColumn.srcFrom] - 1];
    const srcTo = row[structColumnIndexes[CONFIG_INFO.anyStructColumn.srcTo] - 1];
    const cell = row[structColumnIndexes[CONFIG_INFO.anyStructColumn.cell] - 1];
    const valueIfEmpty = row[structColumnIndexes[CONFIG_INFO.anyStructColumn.valueIfEmpty] - 1];

    // Log the extracted values for debugging.
    Logger.log(`${CONFIG_INFO.anyStructColumn.srcFrom}: ${srcFrom}
      ${CONFIG_INFO.anyStructColumn.srcTo}: ${srcTo}
      ${CONFIG_INFO.anyStructColumn.cell}: ${cell}`);

    // Get the range of column indexes in mainSheet based on srcFrom and srcTo.
    const mainIndicesRange = getRangeOfIndicesInDict(srcFrom, srcTo, mainColumnIndexes);

    // Retrieve the specified row from mainSheet.
    const mainRowData = mainSheet.getRange(mainRow, 1, 1, mainSheet.getLastColumn()).getValues()[0];

    // Iterate over the determined column indexes in mainSheet.
    const curRowTexts = [];
    mainIndicesRange.forEach(idx => {
      const url = mainRowData[idx - 1]; // Extract the URL from the main row.

      if (url) {
        const curId = extractSpreadsheetId(url); // Extract the spreadsheet ID from the URL.
        const curText = getTextFromExternSheet(curId, cell); // Fetch text from the external sheet.
        if (curText) {
          curRowTexts.push(curText); // Store the extracted text.
        }
      }
    });
    if (curRowTexts.length == 0 && valueIfEmpty !== "") {
      collectedTexts.push(valueIfEmpty);
    } else {
      collectedTexts.push(...curRowTexts); // Store the extracted text.
    }
  });

  // split texts by soft new line (in destination docx aligment will be not on rowWide)
  const splitTexts = collectedTexts.flatMap(text => text.split(String.fromCharCode(13)));
  return splitTexts; // Return the array of collected text values.
}


//////////////////////////////////////////////////
// function testCollectDataByStruct(){
//   const idInfo = "1b65QKjgP4YvBghsbxUYKKpCcvEzHkiWvKe-GoqAdpWw";
//   const idMain = "1oEmcgm9tLlcvGH2rKg17d263uQPE-Qn0Hqqfsr2EDk8";
//   const srtuctSheet = SpreadsheetApp.openById(idInfo).getSheetByName("BDStruct");
//   const mainSheet = SpreadsheetApp.openById(idMain).getSheetByName("Зведене БД");
//   const mainRow = 3;
  
//   const collectedTexts = collectDataByStruct(srtuctSheet, mainSheet, mainRow); 
//   Logger.log(collectedTexts);
// }
//---------------------------------------------

function checkErrorsInOneBRBD(brbdUrl, curDate) {
  const brbdFile = SpreadsheetApp.openByUrl(brbdUrl);
  
  // find brbd unit name
  const brbdUnitName = getBrbdUnitName(brbdFile);

  // get text from PTUrl cell in zvBD sheet
  const zvbdSheet = brbdFile.getSheetByName(CONFIG_BRBD_SHEETS.zvbd.name);
  const curRowNum = findRowByDate(zvbdSheet, CONFIG_BRBD_SHEETS.zvbd.columns.dateBD, curDate);
  const zvbdColIdxs = getColumnIndexes(zvbdSheet);
  const ptUrlTxt = zvbdSheet
    .getRange(curRowNum,zvbdColIdxs[CONFIG_BRBD_SHEETS.zvbd.columns.urlZvT],1,1)
    .getDisplayValue();

  let errorMessage = ""; // by default no errors
  if (ptUrlTxt.length === 0) {
    errorMessage = `Помилка в похідному БР_БД ${brbdUnitName}\n\tВідсутня зведена таблиця.`;
  }
  if (!isSpreadsheetUrl(ptUrlTxt)) {
    errorMessage = `Помилка в похідному БР_БД ${brbdUnitName}\n\t${ptUrlTxt}`;
  }
  return errorMessage;
}

function getBrbdUnitName(brbdSprdsht) {
  const brbdUnitId = brbdSprdsht
    .getSheetByName(CONFIG_BRBD_SHEETS.comInfo.name)
    .getRange(CONFIG_BRBD_SHEETS.comInfo.cells.mainUnitId)
    .getValue();
  const brbdDUnitSheet = brbdSprdsht.getSheetByName(CONFIG_BRBD_SHEETS.dUnit.name);
  const dUnitColumnIndexes = getColumnIndexes(brbdDUnitSheet);
  const dUnitData = brbdDUnitSheet.getDataRange().getValues().slice(1); // skip header
  const matchRow = dUnitData.find(
    row => row[dUnitColumnIndexes[CONFIG_BRBD_SHEETS.dUnit.columns.unitId] - 1] === brbdUnitId
  );

  if (!matchRow) {
    throw new Error(`BRBD with id "${brbdUnitId}" was not found.`);
  }

  return matchRow[
    dUnitColumnIndexes[CONFIG_BRBD_SHEETS.dUnit.columns.unitNameShort] - 1
  ];
}

/**
 * Checks for errors in a specified Google Sheet by URL.
 * Scans the sheet configured in `CONFIG_UNIT.sheets.error.name` for non-empty "type" column entries.
 *
 * @param {string} fileUrl - The URL of the Google Spreadsheet to check.
 * @return {Object|null} - Returns an object with the file name and a comma-separated string of error types,
 *                         or null if no errors are found.
 *
 * @throws {Error} If the target sheet is not found in the file.
 */
function checkErrorsInOneBD(fileUrl) {
  const file = SpreadsheetApp.openByUrl(fileUrl); 
  const fileName = file.getName(); // Get the file name
  const sheet = file.getSheetByName(CONFIG_UNIT.sheets.error.name); // Get the target sheet
  
  if (!sheet) {
    throw new Error(`Sheet "${CONFIG_UNIT.sheets.error.name}" not found in file "${fileName}".`);
  }

  const errColumnIndexes = getColumnIndexes(sheet);
  const errData = sheet.getDataRange().getValues().slice(1); // data without header

  const existErrTypes = errData
    .map(row => {
      const val = row[errColumnIndexes[CONFIG_UNIT.sheets.error.columns.type] - 1];
      return val.toString().trim();
    })
    .filter(value => value.length > 0); // Filter out empty strings

  if (existErrTypes.length > 0) {
    return `Помилка у файлі "${fileName}":\n\t${existErrTypes.join("\n\t")}`;
  }
  return "";
}
//-----------------------------

/**
 * Retrieves (or creates) the folder corresponding to the given date under the specified main folder.
 * 
 * @param {string} mainFolderId - The ID of the main folder (root folder for year/month/day).
 * @param {Date} date - The date used to determine the folder structure.
 * @returns {GoogleAppsScript.Drive.Folder} - The final day folder (existing or newly created).
 */
function getFolderByDate(mainFolderId, date) {
  // Format date components
  const year = date.getFullYear();
  const month = Utilities.formatDate(date, Session.getScriptTimeZone(), "yyyy.MM");
  const day = Utilities.formatDate(date, Session.getScriptTimeZone(), "yyyy.MM.dd");

  // Build folder structure (year/month/day)
  const yearFolder = getOrCreateFolder(mainFolderId, year.toString());
  const monthFolder = getOrCreateFolder(yearFolder.getId(), month);
  const dayFolder = getOrCreateFolder(monthFolder.getId(), day);

  return dayFolder; // Return the final day folder
}

/**
 * Retrieves a folder by name within a parent folder, creating it if it doesn't exist.
 * 
 * @param {string} parentFolderId - The ID of the parent folder.
 * @param {string} folderName - The name of the folder to find or create.
 * @returns {GoogleAppsScript.Drive.Folder} - The folder (existing or newly created).
 */
function getOrCreateFolder(parentFolderId, folderName) {
  const parentFolder = DriveApp.getFolderById(parentFolderId);
  const folders = parentFolder.getFoldersByName(folderName);

  if (folders.hasNext()) {
    return folders.next(); // Return existing folder
  } else {
    return parentFolder.createFolder(folderName); // Create new folder
  }
}

// function testGetFolderByDate() {
//   const mainFolderId = "1KlzKGYJ8q2AZrUTgVUIqAdB3CET3wVgl";
//   const date = new Date("2024-01-31");
//   const newFolder = getFolderByDate(mainFolderId, date);
//   Logger.log(`newFolder: ${newFolder.getUrl()}`);
// }
//---------------------------------------------------------------

function checkSignatiories(convOsFile) {
  //get signatories from "Загінфо"
  const signatories = getSignatories();

  //get all people (from os file without "вибув")
  const osAll = getAllManpower(convOsFile);
  verifyAllExistInCollectedData(osAll, signatories.bd);
}

function getAllManpower(convOsFile) {
  const sheets = convOsFile.getSheets();
  const allManpower = []; // format: "<rank> <fullname>"

  sheets.forEach(sheet => {
    const range = sheet.getDataRange();
    const values = range.getValues();

    if (values.length < 2) return; // Skip empty or header-only sheets

    const headers = values[0];
    const rankIndex = headers.indexOf(CONFIG_OSFILE.columnNames.rank);
    const nameIndex = headers.indexOf(CONFIG_OSFILE.columnNames.pib);
    const statusIndex = headers.indexOf(CONFIG_OSFILE.columnNames.inOutStatus);

    if (rankIndex === -1 || nameIndex === -1 || statusIndex === -1) {
      Logger.log(`Skipping sheet "${sheet.getName()}" - Missing column`);
      return;
    }

    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      const rank = row[rankIndex];
      const name = row[nameIndex];
      const status = row[statusIndex];

      if (rank && name && status !== CONFIG_OSFILE.statuses.outcome) {
        allManpower.push(`${rank} ${name}`);
      }
    }
  });

  Logger.log("Collected Data:", allManpower);
  return allManpower;
}

function getSignatories() {
  const signSheet = SpreadsheetApp.openById(CONFIG_MAIN.brbdFileId).getSheetByName(CONFIG_SIGN.sheetWithSign);
  const bd = CONFIG_SIGN.bd
    .filter(curBD => curBD.needCheck)
    .map(curBD =>
      signSheet.getRange(curBD.rank).getValue() + " " +
      signSheet.getRange(curBD.lastName).getValue() + " " +
      signSheet.getRange(curBD.firstName).getValue() + " " +
      signSheet.getRange(curBD.midName).getValue()
    );

  const br = CONFIG_SIGN.br
    .filter(curBR => curBR.needCheck)
    .map(curBD =>
      signSheet.getRange(curBD.rank).getValue() + " " +
      signSheet.getRange(curBD.lastName).getValue() + " " +
      signSheet.getRange(curBD.firstName).getValue() + " " +
      signSheet.getRange(curBD.midName).getValue()
    );
  return {br, bd};
}

function verifyAllExistInCollectedData(collectedData, toCheck) {
  // Normalize both lists to lowercase and trimmed values
  const dataSet = new Set(collectedData.map(s => s.toLowerCase().trim()));
  const missing = [];

  toCheck.forEach(item => {
    const normalized = item.toLowerCase().trim();
    if (!dataSet.has(normalized)) {
      missing.push(item);
    }
  });

  if (missing.length > 0) {
    const errorMessage = `The following values were not found:\n- ${missing.join("\n- ")}`;
    throw new Error(errorMessage);
  }

  Logger.log("All values found successfully.");
}
//------------------------------------------

function makeTodayBDsFromTemplateWithLock() {
  executeWithLock(makeTodayBDsFromTemplate);
}

function makeTodayBDsFromTemplate(){
  // const actualDate = new Date();
 const actualDate = new Date(2025, 6, 11); // testing
  // actualDate.setDate(actualDate.getDate() + 9); // testing
  makeBDsOnDate(actualDate);
}

function makeBDsOnDate(actualDate) {
  const infoTemplateId = getInfoTemplateId();
  const bdTemplateId = getBDTemplateId();
  const dstFolder = getFolderByDate(CONFIG_MAIN.dataFolderId, actualDate);

  const brbdSprsht = SpreadsheetApp.openById(CONFIG_MAIN.brbdFileId);
  const zvbdSheet = brbdSprsht.getSheetByName(CONFIG_BRBD_SHEETS.zvbd.name);
  const mainRow = findRowByDate(zvbdSheet, CONFIG_BRBD_SHEETS.zvbd.columns.dateBD, actualDate);

  makeInfoFile(infoTemplateId, actualDate, mainRow, dstFolder);

  const osFileId = getOsFileId(actualDate);
  const convOsFileId = convertXlsxToGoogleSheetInSameFolder(osFileId);
  const convOsFile = SpreadsheetApp.openById(convOsFileId);
  
  const derivedUnitData = getChildUnitsData(brbdSprsht);
  for (const curUnitData of derivedUnitData){
    if (curUnitData[CONFIG_BRBD_SHEETS.dUnit.columns.isLeaf]){
      makeBDFile(brbdSprsht, bdTemplateId, actualDate, mainRow, curUnitData, convOsFile, dstFolder);
    }
  }
  
  Drive.Files.remove(convOsFileId);
}


/**
 * Retrieves child unit data from a given spreadsheet.
 *
 * @param {SpreadsheetApp.Spreadsheet} brbdSprsht - The source spreadsheet object containing unit data.
 * @return {Array<Object>} - An array of dictionaries representing each child unit.
 */
function getChildUnitsData(brbdSprsht) {
  const mainUnitId = brbdSprsht.getSheetByName(CONFIG_BRBD_SHEETS.comInfo.name).getRange(CONFIG_BRBD_SHEETS.comInfo.cells.mainUnitId).getValue();

  const unitSheet = brbdSprsht.getSheetByName(CONFIG_BRBD_SHEETS.dUnit.name);
  const unitData = getDataFromRange(unitSheet);
  const derivedUnits = filterData(unitData, CONFIG_BRBD_SHEETS.dUnit.columns.masterUnitId, mainUnitId);

  return convertToArrayOfDictionaries(derivedUnits);
}
//---------------------------------------

/**
 * Converts an .xlsx file to Google Sheets and saves the converted file in the same folder.
 * 
 * @param {string} fileId - The ID of the .xlsx file on Google Drive.
 * @returns {string} - The ID of the converted Google Sheets file.
 */
function convertXlsxToGoogleSheetInSameFolder(fileId) {
  // Ensure Drive API is enabled in Advanced Services
  const file = Drive.Files.get(fileId, { fields: "id,name,parents" });

  if (!file) {
    throw new Error("File not found. Ensure the file ID is correct.");
  }

  // Get the parent folder ID
  const parentId = file.parents[0];

  // Prepare the metadata for the converted file
  const resource = {
    name: file.name.replace(/\.xlsx$/i, ""), // Remove ".xlsx" from the name
    mimeType: MimeType.GOOGLE_SHEETS,
    parents: [{id: parentId}] // Place it in the same folder
  };

  // Convert the .xlsx file to Google Sheets
  const convertedFile = Drive.Files.copy(resource, fileId);

  // Return the ID of the converted file
  return convertedFile.id;
}
//-----------------------------------------------

function makeInfoFile(infoTemplate, actualDate, mainRow, dstFolder) {
  const parserInfoFileName = new ParserInfoFileName();
  const infoFileName = parserInfoFileName.Form({date: actualDate, version:CONFIG_MAIN.version});


  // copy template info (set permissions)
  const newInfoId = copySpreadsheetWithProtections(infoTemplate, dstFolder, infoFileName);
  resetPermissions(newInfoId, CONFIG_COPY_INFO.dstPermission);

  // copy sheets
  const newInfo = SpreadsheetApp.openById(newInfoId);
  const brbdSprsht = SpreadsheetApp.openById(CONFIG_MAIN.brbdFileId);
  const masterUnitId = -1; //todo
  CONFIG_COPY_INFO.copySheets.forEach(({src, columnFilterById, dst}) => {
    copySheetDataByValue(
      brbdSprsht.getSheetByName(src),
      newInfo.getSheetByName(dst),
      columnFilterById,
      masterUnitId
    );
  });

  // copy column to cell
  const srcSheet = brbdSprsht.getSheetByName(CONFIG_COPY_INFO.copyVarInfo.srcSheet);
  const dstSheet = newInfo.getSheetByName(CONFIG_COPY_INFO.copyVarInfo.dstSheet);
  const srcColumnIndexs = getColumnIndexes(srcSheet);
  const mainRowData = srcSheet.getRange(mainRow, 1, 1, srcSheet.getLastColumn()).getValues()[0];

  CONFIG_COPY_INFO.copyVarInfo.columns2cell.forEach(([columnName, cell])=> {
    // get value from column
    const curValue = mainRowData[srcColumnIndexs[columnName] - 1];
    // set value to cell
    dstSheet.getRange(cell).setValue(curValue);
  });

  // set url to "Зведене БД"
  const zvbdSheet = brbdSprsht.getSheetByName(CONFIG_BRBD_SHEETS.zvbd.name);
  const zvbdColumnIndexs = getColumnIndexes(zvbdSheet);
  zvbdSheet.getRange(mainRow, zvbdColumnIndexs[CONFIG_BRBD_SHEETS.zvbd.columns.urlInfo]).setValue(newInfo.getUrl());
}
//-------------------------------------

function makeBDFile(brbdSprsht, bdTemplateId, actualDate, mainRow, curUnitData, convOsFile, dstFolder) {
  // define new bd file name
  const unitShortName = curUnitData[CONFIG_BRBD_SHEETS.dUnit.columns.unitNameShort];
  const parserBDFileName = new ParserBDFileName();
  const bdFileName = parserBDFileName.Form({
    date: actualDate, 
    unitName: unitShortName,
    version: CONFIG_MAIN.version,
  });
  // copy template bd 
  const newBDId = copySpreadsheetWithProtections(bdTemplateId, dstFolder, bdFileName);
  // set permissions
  const bdPermission = JSON.parse(JSON.stringify(CONFIG_COPY_UNIT.dstPermission)); // copy perms
  let curUnitDoers = curUnitData[CONFIG_BRBD_SHEETS.dUnit.columns.doerEmail]; // add doers
  curUnitDoers = curUnitDoers.trim() ? curUnitDoers.split(" ") : [];
  bdPermission.editor = [...bdPermission.editor, ...curUnitDoers];
  resetPermissions(newBDId, bdPermission); // set perms

  const newBD = SpreadsheetApp.openById(newBDId);
  const unitId = curUnitData[CONFIG_BRBD_SHEETS.dUnit.columns.unitId];

  // find url yesterday BD
  const zvbdSheet = brbdSprsht.getSheetByName(CONFIG_BRBD_SHEETS.zvbd.name);
  const ydayRowData = zvbdSheet.getRange(mainRow - 1, 1, 1, zvbdSheet.getLastColumn()).getValues()[0];
  const zbdColumnIndexes = getColumnIndexes(zvbdSheet);
  const ydayBDUrl = ydayRowData[zbdColumnIndexes[unitShortName] - 1];

  const newBDPersSheet =  newBD.getSheetByName(CONFIG_COPY_UNIT.copyPers.dstSheet);
  const osUnitSheet = convOsFile.getSheetByName(unitShortName);

  //copy data from yesterday
  if (isSpreadsheetUrl(ydayBDUrl)) {
    const ydayBD = SpreadsheetApp.openByUrl(ydayBDUrl);
    const ydayBDDistrSheet = ydayBD.getSheetByName(CONFIG_COPY_UNIT.copyDistr.dstSheet);
    const ydayBDPersSheet =  ydayBD.getSheetByName(CONFIG_COPY_UNIT.copyPers.dstSheet);
    const ydayBDDTeamSheet =  ydayBD.getSheetByName(CONFIG_COPY_UNIT.copyDTeam.dstSheet);
    const newBDDistrSheet = newBD.getSheetByName(CONFIG_COPY_UNIT.copyDistr.dstSheet);
    const newBDDTeamSheet = newBD.getSheetByName(CONFIG_COPY_UNIT.copyDTeam.dstSheet);

    // copy yesterday os
    copyRangeByValue(ydayBDPersSheet, CONFIG_COPY_UNIT.copyPers.dstRange, newBDPersSheet, CONFIG_COPY_UNIT.copyPers.dstRange);
    
    // copy yesterday dteams
    copyRangeByValue(ydayBDDTeamSheet, CONFIG_COPY_UNIT.copyDTeam.dstRange, newBDDTeamSheet, CONFIG_COPY_UNIT.copyDTeam.dstRange);

    // copy yesterday distr
    SpreadsheetApp.flush(); // !!! need for recalculation datavalidation !!!
    copyRangeByValue(ydayBDDistrSheet, CONFIG_COPY_UNIT.copyDistr.dstRange, newBDDistrSheet, CONFIG_COPY_UNIT.copyDistr.dstRange);
    SpreadsheetApp.flush();

    // clear dteams
    newBDDTeamSheet.getRange(CONFIG_COPY_UNIT.copyDTeam.dstRange).clearContent();
  }

  // copy sheets
  CONFIG_COPY_UNIT.copySheets.forEach(({src, columnFilterById, dst}) => {
    copySheetDataByValue(
      brbdSprsht.getSheetByName(src),
      newBD.getSheetByName(dst),
      columnFilterById,
      unitId,
    );
  });

   // copy column to cell
  const srcSheet = brbdSprsht.getSheetByName(CONFIG_COPY_UNIT.copyDCommon.srcSheet);
  const dstSheet = newBD.getSheetByName(CONFIG_COPY_UNIT.copyDCommon.dstSheet);
  const srcColumnIndexs = getColumnIndexes(srcSheet);
  const mainRowData = srcSheet.getRange(mainRow, 1, 1, srcSheet.getLastColumn()).getValues()[0];

  CONFIG_COPY_UNIT.copyDCommon.columns2cell.forEach(([columnName, cell])=> {
    const curValue = mainRowData[srcColumnIndexs[columnName] - 1];
    dstSheet.getRange(cell).setValue(curValue);
  });

  // copy single cell
  const unitIdCell = dstSheet.getRange(CONFIG_COPY_UNIT.copyDCommon.dstCells.unitId);
  unitIdCell.setNumberFormat("@");
  unitIdCell.setValue(unitId);

  // copy pers from convOsFile
  copyRangeByValue(osUnitSheet, CONFIG_COPY_UNIT.copyPers.srcRange, newBDPersSheet, CONFIG_COPY_UNIT.copyPers.dstRange);

  // set url to zvbd
  zvbdSheet.getRange(mainRow, zbdColumnIndexes[unitShortName]).setValue(newBD.getUrl());
}
//-----------------------------------

const NEED_2_SET_PERMISSION = false;
function getExistingPermissions(fileId) {
  /**
   * Retrieves the existing permissions for a file.
   *
   * @param {string} fileId - The ID of the file to get permissions for.
   * @return {Array} - A list of existing permissions.
   */
  try {
    const permissions = Drive.Permissions.list(
      fileId, {
        supportsAllDrives: true,
        fields: "permissions(id,emailAddress,role)",
    }).permissions;
    return permissions || [];
  } catch (e) {
    Logger.log(`Failed to retrieve permissions: ${e.message}`);
    return [];
  }
}

function resetPermissions(fileId, permissions) {
  const roleMapping = {
    viewer: "reader",
    editor: "writer",
    commenter: "commenter"
  };

  // Get current permissions to avoid duplicate calls
  const currentPermissions = getExistingPermissions(fileId);
  
  // Flatten the new permissions into a map for quick lookup
  const newPermissionsMap = new Map();
  Object.entries(permissions).forEach(([role, emails]) => {
    emails.forEach(email => {
      newPermissionsMap.set(email, roleMapping[role]);
    });
  });

  // Step 1: Modify permissions if the role is different
  currentPermissions.forEach(perm => {
    const emailAddress = perm.emailAddress;
    if (!emailAddress) return; // Skip if no email found

    const newRole = newPermissionsMap.get(emailAddress);

    if (newRole && perm.role !== newRole && perm.role !== "owner") {
      try {
        if (NEED_2_SET_PERMISSION) Drive.Permissions.update(
          { role: newRole },
          fileId,
          perm.id
        );
        Logger.log(`Updated permission for: ${emailAddress} to ${newRole}`);
      } catch (error) {
        Logger.log(`Failed to update permission for ${emailAddress}: ${error.message}`);
      }
    }
  });

  // Step 2: Remove permissions that are not in the new list
  currentPermissions.forEach(perm => {
    const emailAddress = perm.emailAddress;
    if (!emailAddress) return; // Skip if no email found

    if (perm.role !== "owner" && !newPermissionsMap.has(emailAddress)) {
      try {
        if (NEED_2_SET_PERMISSION) Drive.Permissions.remove(fileId, perm.id);
        Logger.log(`Removed permission for: ${emailAddress} (was ${perm.role})`);
      } catch (error) {
        Logger.log(`Failed to remove permission for ${emailAddress}: ${error.message}`);
      }
    }
  });

  // Step 3: Add only missing permissions
  newPermissionsMap.forEach((role, email) => {
    const permissionType = email.includes("@googlegroups.com") ? "group" : "user";

    // Check if permission already exists
    const existingPermission = currentPermissions.find(p => p.emailAddress === email);

    if (!existingPermission) {
      try {
        if (NEED_2_SET_PERMISSION) Drive.Permissions.create(
          {
            role: role,
            type: permissionType,
            emailAddress: email
          },
          fileId,
          { sendNotificationEmails: false }
        );
        Logger.log(`Added ${role} permission for ${email}`);
      } catch (error) {
        Logger.log(`Failed to add ${role} permission for ${email}: ${error.message}`);
      }
    }
  });

  Logger.log("Permissions updated efficiently.");
}
//------------------------------------

function getProtections(spreadsheetId) {
  // Retrieve the protections for a spreadsheet
  const protections = Sheets.Spreadsheets.get(spreadsheetId, {
    fields: "sheets/protectedRanges",
  });
  return protections.sheets || [];
}

function updateProtections(spreadsheetId, protections) {
  const requests = [];

  // Step 1: Remove existing protections
  const spreadsheet = Sheets.Spreadsheets.get(spreadsheetId, {
    fields: "sheets/protectedRanges",
  });
  const sheets = spreadsheet.sheets || [];

  sheets.forEach(sheet => {
    const protectedRanges = sheet.protectedRanges || [];
    protectedRanges.forEach(protection => {
      const protectionId = protection.protectedRangeId;
      if (protectionId) {
        // Add request to delete existing protection
        requests.push({
          deleteProtectedRange: {
            protectedRangeId: protectionId,
          },
        });
      }
    });
  });

  // Step 2: Add new protections
  protections.forEach(sheet => {
    const protectedRanges = sheet.protectedRanges || [];
    protectedRanges.forEach(protection => {
      // Add request to add new protection
      requests.push({
        addProtectedRange: {
          protectedRange: {
            range: protection.range,
            unprotectedRanges: protection.unprotectedRanges || [], 
            editors: protection.editors || {}, // Editors list
            warningOnly: protection.warningOnly || false, // Warning flag
          },
        },
      });
    });
  });

  // Execute the batch update request if there are any changes
  if (requests.length > 0) {
    const body = { requests: requests };
    Sheets.Spreadsheets.batchUpdate(body, spreadsheetId);
  }
}
//-----------------------------------------

// Define the abstract class
/**
 * Abstract base class for parsing and forming file names.
 * @abstract
 */
class ParserFileName {
  constructor() {
    if (new.target === ParserFileName) {
      throw new Error("Cannot instantiate an abstract class.");
    }
  }

  /**
   * Parses a file name and extracts its components.
   * @abstract
   * @param {string} fileName - The file name to parse.
   * @returns {Object} Parsed file name components.
   * @throws {Error} If not implemented by a subclass.
   */
  Parse(fileName) {
    throw new Error("Method 'Parse()' must be implemented.");
  }

  /**
   * Forms a file name from provided components.
   * @abstract
   * @param {Object} data - Data needed to form the file name.
   * @returns {string} The formed file name.
   * @throws {Error} If not implemented by a subclass.
   */
  Form(data) {
    throw new Error("Method 'Form()' must be implemented.");
  }
}

// Derived class ParserBDFileName
/**
 * Parser for BD file names in the format "yyyy.MM.dd_unitName_БД_version".
 */
class ParserBDFileName extends ParserFileName {
  constructor() {
    super(); // Call the superclass constructor
    this.nameRegex = /^(\d{4}\.\d{2}\.\d{2})_([^\_]+)_БД_(\d+\.\d+)$/;
  }

  /**
   * Parses a BD file name.
   * @param {string} fileName - The BD file name to parse.
   * @returns {Object} Parsed file name components.
   * @returns {Date} return.date - The extracted date as a Date object.
   * @returns {string} return.unitName - The extracted unit name.
   * @returns {string} return.version - The extracted version string.
   * @throws {Error} If the file name format is invalid.
   */
  Parse(fileName) {
    const match = fileName.match(this.nameRegex);

    if (match) {
      const dateStr = match[1];
      const unitName = match[2];
      const version = match[3];

      const [year, month, day] = dateStr.split(".").map(Number);
      const date = new Date(year, month - 1, day);

      return {
        date: date,
        unitName: unitName,
        version: version,
      };
    } else {
      throw new Error("Invalid file name format: " + fileName);
    }
  }

  /**
   * Forms a BD file name.
   * @param {Object} data - Data for forming the file name.
   * @param {Date} data.date - The date object.
   * @param {string} data.unitName - The unit name.
   * @param {string} data.version - The version string.
   * @returns {string} The formed BD file name.
   * @throws {Error} If required data is missing.
   */
  Form(data) {
    const { date, unitName, version } = data;

    if (!date || !unitName || !version) {
      throw new Error("Missing required data to form file name.");
    }

    const dateStr = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join(".");

    return `${dateStr}_${unitName}_БД_${version}`;
  }
}

// Derived class ParserBDTemplateFileName
/**
 * Parser for BD template file names in the format "шаблон_БД_version".
 */
class ParserBDTemplateFileName extends ParserFileName {
  constructor() {
    super();
    this.nameRegex = /^шаблон_БД_(\d+\.\d+)$/;
  }

  /**
   * Parses a BD template file name.
   * @param {string} fileName - The BD template file name to parse.
   * @returns {Object} Parsed file name components.
   * @returns {string} return.version - The extracted version string.
   * @throws {Error} If the file name format is invalid.
   */
  Parse(fileName) {
    const match = fileName.match(this.nameRegex);

    if (match) {
      const version = match[1];

      return {
        version: version,
      };
    } else {
      throw new Error("Invalid file name format: " + fileName);
    }
  }

  /**
   * Forms a BD template file name.
   * @param {Object} data - Data for forming the file name.
   * @param {string} data.version - The version string.
   * @returns {string} The formed BD template file name.
   * @throws {Error} If required data is missing.
   */
  Form(data) {
    const { version } = data;

    if (!version) {
      throw new Error("Missing required data to form file name.");
    }

    return `шаблон_БД_${version}`;
  }
}

// Derived class ParserOSFileName
/**
 * Parser for os file names in the format "yyyy.MM.dd_os_version".
 */
class ParserOSFileName extends ParserFileName {
  constructor() {
    super(); // Call the superclass constructor
    this.nameRegex = /^(\d{4}\.\d{2}\.\d{2})_([^\_]+)_ос_(\d+\.\d+)$/;
  }

  /**
   * Parses a os file name.
   * @param {string} fileName - The os file name to parse.
   * @returns {Object} Parsed file name components.
   * @returns {Date} return.date - The extracted date as a Date object.
   * @returns {string} return.version - The extracted version string.
   * @throws {Error} If the file name format is invalid.
   */
  Parse(fileName) {
    const match = fileName.match(this.nameRegex);

    if (match) {
      const dateStr = match[1];
      const version = match[2];

      const [year, month, day] = dateStr.split(".").map(Number);
      const date = new Date(year, month - 1, day);

      return {
        date: date,
        version: version,
      };
    } else {
      throw new Error("Invalid file name format: " + fileName);
    }
  }

  /**
   * Forms a os file name.
   * @param {Object} data - Data for forming the file name.
   * @param {Date} data.date - The date object.
   * @param {string} data.version - The version string.
   * @returns {string} The formed os file name.
   * @throws {Error} If required data is missing.
   */
  Form(data) {
    const { date, version } = data;

    if (!date || !version) {
      throw new Error("Missing required data to form file name.");
    }

    const dateStr = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join(".");

    return `${dateStr}_ос_${version}`;
  }
}


// Derived class ParserInfoTemplateFileName
/**
 * Parser for Info template file names in the format "шаблон_ІНФО_version".
 */
class ParserInfoTemplateFileName extends ParserFileName {
  constructor() {
    super();
    this.nameRegex = /^шаблон_ІНФО_(\d+\.\d+)$/;
  }

  /**
   * Parses a Info template file name.
   * @param {string} fileName - The Info template file name to parse.
   * @returns {Object} Parsed file name components.
   * @returns {string} return.version - The extracted version string.
   * @throws {Error} If the file name format is invalid.
   */
  Parse(fileName) {
    const match = fileName.match(this.nameRegex);

    if (match) {
      const version = match[1];

      return {
        version: version,
      };
    } else {
      throw new Error("Invalid file name format: " + fileName);
    }
  }

  /**
   * Forms a Info template file name.
   * @param {Object} data - Data for forming the file name.
   * @param {string} data.version - The version string.
   * @returns {string} The formed Info template file name.
   * @throws {Error} If required data is missing.
   */
  Form(data) {
    const { version } = data;

    if (!version) {
      throw new Error("Missing required data to form file name.");
    }

    return `шаблон_ІНФО_${version}`;
  }
}

// Derived class ParserInfoFileName
/**
 * Parser for info file names in the format "yyyy.MM.dd_ІНФО_version".
 */
class ParserInfoFileName extends ParserFileName {
  constructor() {
    super(); // Call the superclass constructor
    this.nameRegex = /^(\d{4}\.\d{2}\.\d{2})_([^\_]+)_ІНФО_(\d+\.\d+)$/;
  }

  /**
   * Parses a info file name.
   * @param {string} fileName - The info file name to parse.
   * @returns {Object} Parsed file name components.
   * @returns {Date} return.date - The extracted date as a Date object.
   * @returns {string} return.version - The extracted version string.
   * @throws {Error} If the file name format is invalid.
   */
  Parse(fileName) {
    const match = fileName.match(this.nameRegex);

    if (match) {
      const dateStr = match[1];
      const version = match[2];

      const [year, month, day] = dateStr.split(".").map(Number);
      const date = new Date(year, month - 1, day);

      return {
        date: date,
        version: version,
      };
    } else {
      throw new Error("Invalid file name format: " + fileName);
    }
  }

  /**
   * Forms a info file name.
   * @param {Object} data - Data for forming the file name.
   * @param {Date} data.date - The date object.
   * @param {string} data.version - The version string.
   * @returns {string} The formed os file name.
   * @throws {Error} If required data is missing.
   */
  Form(data) {
    const { date, version } = data;

    if (!date || !version) {
      throw new Error("Missing required data to form file name.");
    }

    const dateStr = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join(".");

    return `${dateStr}_ІНФО_${version}`;
  }
}

// Derived class ParserDocTemplateFileName
/**
 * Parser for Doc template file names in the format "шаблон_DOC_version".
 */
class ParserDocTemplateFileName extends ParserFileName {
  constructor() {
    super();
    this.nameRegex = /^шаблон_DOC_(\d+\.\d+)$/;
  }

  /**
   * Parses a Info template file name.
   * @param {string} fileName - The Doc template file name to parse.
   * @returns {Object} Parsed file name components.
   * @returns {string} return.version - The extracted version string.
   * @throws {Error} If the file name format is invalid.
   */
  Parse(fileName) {
    const match = fileName.match(this.nameRegex);

    if (match) {
      const version = match[1];

      return {
        version: version,
      };
    } else {
      throw new Error("Invalid file name format: " + fileName);
    }
  }

  /**
   * Forms a Doc template file name.
   * @param {Object} data - Data for forming the file name.
   * @param {string} data.version - The version string.
   * @returns {string} The formed Info template file name.
   * @throws {Error} If required data is missing.
   */
  Form(data) {
    const { version } = data;

    if (!version) {
      throw new Error("Missing required data to form file name.");
    }

    return `шаблон_DOC_${version}`;
  }
}

/**
 * Parser for Info template file names in the format "шаблон_ЗведенаТаблиця_version".
 */
class ParserPivotTableTemplateFileName extends ParserFileName {
  constructor() {
    super();
    this.nameRegex = /^шаблон_ЗведенаТаблиця_(\d+\.\d+)$/;
  }
  Parse(fileName) {
    const match = fileName.match(this.nameRegex);

    if (match) {
      const version = match[1];

      return {
        version: version,
      };
    } else {
      throw new Error("Invalid file name format: " + fileName);
    }
  }
  Form(data) {
    const { version } = data;

    if (!version) {
      throw new Error("Missing required data to form file name.");
    }

    return `шаблон_ЗведенаТаблиця_${version}`;
  }
}

/**
 * Parser for info file names in the format "yyyy.MM.dd_ЗведенаТаблиця_version".
 */
class ParserPivotTableFileName extends ParserFileName {
  constructor() {
    super(); // Call the superclass constructor
    this.nameRegex = /^(\d{4}\.\d{2}\.\d{2})_([^\_]+)_ЗведенаТаблиця_(\d+\.\d+)$/;
  }
  Parse(fileName) {
    const match = fileName.match(this.nameRegex);

    if (match) {
      const dateStr = match[1];
      const version = match[2];

      const [year, month, day] = dateStr.split(".").map(Number);
      const date = new Date(year, month - 1, day);

      return {
        date: date,
        version: version,
      };
    } else {
      throw new Error("Invalid file name format: " + fileName);
    }
  }
  Form(data) {
    const { date, version } = data;

    if (!date || !version) {
      throw new Error("Missing required data to form file name.");
    }

    const dateStr = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join(".");

    return `${dateStr}_ЗведенаТаблиця_${version}`;
  }
}

///////////////////////////////////////////////
/**
 * Parser for Info template file names in the format "шаблон_рапорти_version".
 */
class ParserReportsTemplateFileName extends ParserFileName {
  constructor() {
    super();
    this.nameRegex = /^шаблон_рапорти_(\d+\.\d+)$/;
  }
  Parse(fileName) {
    const match = fileName.match(this.nameRegex);

    if (match) {
      const version = match[1];

      return {
        version: version,
      };
    } else {
      throw new Error("Invalid file name format: " + fileName);
    }
  }
  Form(data) {
    const { version } = data;

    if (!version) {
      throw new Error("Missing required data to form file name.");
    }

    return `шаблон_рапорти_${version}`;
  }
}

/**
 * Parser for info file names in the format "yyyy.MM.dd_ЗведенаТаблиця_version".
 */
class ParserReportsFileName extends ParserFileName {
  constructor() {
    super(); // Call the superclass constructor
    this.nameRegex = /^(\d{4}\.\d{2}\.\d{2})_([^\_]+)_рапорти_(\d+\.\d+)$/;
  }
  Parse(fileName) {
    const match = fileName.match(this.nameRegex);

    if (match) {
      const dateStr = match[1];
      const version = match[2];

      const [year, month, day] = dateStr.split(".").map(Number);
      const date = new Date(year, month - 1, day);

      return {
        date: date,
        version: version,
      };
    } else {
      throw new Error("Invalid file name format: " + fileName);
    }
  }
  Form(data) {
    const { date, version } = data;

    if (!date || !version) {
      throw new Error("Missing required data to form file name.");
    }

    const dateStr = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join(".");

    return `${dateStr}_рапорти_${version}`;
  }
}
//------------------------------------------

function executeWithLock(callback) {
  const lock = LockService.getScriptLock();
  
  if (!lock.tryLock(100000)) { // Wait up to 100 seconds
    Logger.log("Another instance is running. Exiting...");
    return;
  }

  try {
    callback(); // Run the provided function safely
  } finally {
    lock.releaseLock(); // Ensure lock is released after execution
    Logger.log("Execution finished.");
  }
}
//-----------------------------

/**
 * Retrieves the file ID for a given file name within a specified folder.
 * @param {string} folderId - The ID of the folder where the file is located.
 * @param {string} fileName - The name of the file to find.
 * @return {string|null} The file ID if found, otherwise null.
 */
function getFileIdByName(folderId, fileName) {
  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFilesByName(fileName);
  
  if (files.hasNext()) {
    return files.next().getId(); // Return the first matching file ID
  }
  return null; // Return null if the file is not found
}

/**
 * Copies a Google Drive file, moves it to a specified folder, and renames it.
 * Supports both file/folder objects and their IDs to optimize API requests.
 *
 * @param {string|GoogleAppsScript.Drive.File} srcFile - The file object or file ID of the source file.
 * @param {string|GoogleAppsScript.Drive.Folder} dstFolder - The folder object or folder ID where the copied file should be placed.
 * @param {string} fileName - The new name for the copied file.
 * @returns {string} - The ID of the copied file.
 */
function copyFile(srcFile, dstFolder, fileName) {
  try {
    // Convert IDs to objects if necessary
    const file = (typeof srcFile === "string") ? DriveApp.getFileById(srcFile) : (srcFile.getId ? srcFile : null);
    const folder = (typeof dstFolder === "string") ? DriveApp.getFolderById(dstFolder) : dstFolder;

    if (!file) {
      throw new Error(`Invalid source file: ${srcFile}`);
    }
    if (!folder) {
      throw new Error(`Invalid destination folder: ${dstFolder}`);
    }

    // Make a copy
    const copiedFile = file.makeCopy(fileName, folder);
    const copiedFileId = copiedFile.getId();

    Logger.log(`File copied successfully: ${fileName} (ID: ${copiedFileId})`);
    return copiedFileId;
  } catch (error) {
    Logger.log(`Error copying file (${fileName}): ${error.message}`);
    throw new Error(`Error copying file: ${error.message}`);
  }
}

function copySpreadsheetWithProtections(srcSpreadsheetId, dstFolder, newSpreadsheetName) {
  // Step 1: Copy the spreadsheet file
  const copiedSpreadsheetId = copyFile(srcSpreadsheetId, dstFolder, newSpreadsheetName);

  // Step 2: Retrieve protections from the source spreadsheet
  const protections = getProtections(srcSpreadsheetId);

  // Step 3: Apply protections to the copied spreadsheet
  updateProtections(copiedSpreadsheetId, protections);

  return copiedSpreadsheetId;
}


/**
 * Extracts the Spreadsheet ID from a URL or returns the ID if it's already in the correct format.
 *
 * @param {string} urlOrId - The URL of the Google Sheets document or the spreadsheet ID.
 * @returns {string} - The spreadsheet ID.
 */
function extractSpreadsheetId(urlOrId) {
  const regex = /https:\/\/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/;
  const match = urlOrId.match(regex);
  
  if (match) {
    return match[1]; // Extracted ID from the URL
  } else {
    // If it's already an ID, just return it
    return urlOrId;
  }
}

/**
 * Extracts the file ID from a Google Drive file URL.
 * @param {string} url - The URL of the file.
 * @returns {string|null} - The extracted file ID or null if not found.
 */
function extractAnyFileIdFromUrl(url) {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

/**
 * Checks if the given text is a valid Google Spreadsheet URL.
 *
 * @param {string} text - The text to check.
 * @return {boolean} - True if the text is a valid Spreadsheet URL, otherwise false.
 */
function isSpreadsheetUrl(text) {
  const spreadsheetUrlPattern = /^https:\/\/docs\.google\.com\/spreadsheets\/d\/[a-zA-Z0-9-_]+/;
  return spreadsheetUrlPattern.test(text);
}
//----------------------------------

function getInfoTemplateId() {
  const templateFolderId = CONFIG_MAIN.templateFolderId;
  const parserInfoTemplateFileName = new ParserInfoTemplateFileName();
  const infoFileName = parserInfoTemplateFileName.Form({version:CONFIG_MAIN.version});
  return getFileIdByName(templateFolderId, infoFileName);
}

function getBDTemplateId() {
  const templateFolderId = CONFIG_MAIN.templateFolderId;
  const parserBDTemplateFileName = new ParserBDTemplateFileName();
  const bdFileName = parserBDTemplateFileName.Form({version:CONFIG_MAIN.version});
  return getFileIdByName(templateFolderId, bdFileName);
}

function getDocTemplateId() {
  const templateFolderId = CONFIG_MAIN.templateFolderId;
  const parserDocTemplateFileName = new ParserDocTemplateFileName();
  const docFileName = parserDocTemplateFileName.Form({version:CONFIG_MAIN.version});
  return getFileIdByName(templateFolderId, docFileName);
}

function getReportsTemplateId() {
  const templateFolderId = CONFIG_MAIN.templateFolderId;
  const parserReportsTemplateFileName = new ParserReportsTemplateFileName();
  const fileName = parserReportsTemplateFileName.Form({version:CONFIG_MAIN.version});
  return getFileIdByName(templateFolderId, fileName);
}

function getOsFileId(actualDate) {
  const parserOSFileName = new ParserOSFileName();
  const osFileName = parserOSFileName.Form({date:actualDate, version:CONFIG_MAIN.version}) + ".xlsx";
  const osFileId = getFileIdByName(CONFIG_MAIN.osFolderId, osFileName);
  if (!osFileId) {
    throw new Error(`File '${osFileName}' not found in google drive folder.`);
  }
  return osFileId;
}

function getRangeOfIndicesInDict(nameFrom, nameTo, columnIndices) {
  const idxFrom = columnIndices[nameFrom];
  if (!idxFrom) throw new Error(`Column not found: ${nameFrom}`);

  if (!nameTo) return [idxFrom];

  const idxTo = columnIndices[nameTo];
  if (!idxTo) throw new Error(`Column not found: ${nameTo}`);
  if (idxTo < idxFrom) {
    throw new Error(`Invalid column range: from-${nameFrom}-${idxFrom} to-${nameTo}-${idxTo}`);
  }

  return Array.from({ length: idxTo - idxFrom + 1 }, (_, i) => idxFrom + i);
}

function getMainUnitName(brbdSprdsht) {//brbdSprdsht - сама таблица со всеми вкладками
  // find curUnitShortName (brbd)
  const mainUnitId = brbdSprdsht
	.getSheetByName(CONFIG_BRBD_SHEETS.comInfo.name)//CONFIG_BRBD_SHEETS.comInfo.name = "cominfo"
	.getRange(CONFIG_BRBD_SHEETS.comInfo.cells.mainUnitId)
	.getValue();
  const dUnitSheet = brbdSprdsht.getSheetByName(CONFIG_BRBD_SHEETS.dUnit.name);
  const dUnitSheetData = dUnitSheet.getDataRange().getValues();
  const dUnitDictData = convertToArrayOfDictionaries(dUnitSheetData);
  const mainUnitDict = dUnitDictData.find(rowDict => rowDict[CONFIG_BRBD_SHEETS.dUnit.columns.unitId] === mainUnitId);
  if (!mainUnitDict){
    throw new Error(`There is no ${mainUnitId} In sheet=${CONFIG_UNIT.sheets.dUnit.name} column=${CONFIG_UNIT.sheets.dUnit.columns.unitId}`);
  }
  return mainUnitDict[CONFIG_UNIT.sheets.dUnit.columns.unitNameShort];
}
//----------------------------------

/**
 * Retrieves column indexes for a list of column names or all columns in the sheet.
 * @param {Sheet} sheet - The sheet containing the column headers.
 * @param {string[]} [columnNames] - Array of column names to find. If not provided, returns all column indexes.
 * @returns {Object} - A mapping of column names to their indexes (1-based).
 */
function getColumnIndexes(sheet, columnNames = []) {
  const firstRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]; // Get header row
  const columnIndexes = {};

  if (columnNames.length > 0) {
    // If column names are provided, return specific columns
    columnNames.forEach(name => {
      const index = firstRow.indexOf(name);
      if (index === -1) {
        throw new Error(`Column not found: ${name}`);
      }
      columnIndexes[name] = index + 1; // Convert 0-based index to 1-based
    });
  } else {
    // If no column names are provided, return all columns
    firstRow.forEach((name, index) => {
      columnIndexes[name] = index + 1; // Convert 0-based index to 1-based
    });
  }

  return columnIndexes;
}

/**
 * Retrieves text from an external Google Sheets file.
 *
 * @param {string} externSheetId - The ID of the external Google Sheets file.
 * @param {string} cell - The cell reference in the format 'SheetName!Cell' (e.g., 'Довідники!A15').
 * @returns {string} - The text value from the specified cell.
 */
function getTextFromExternSheet(externSheetId, cell) {
  try {
    // Extract the sheet name and cell from the provided reference
    const cellAddress = parseSheetAndCell(cell);

    // Open the external spreadsheet by ID
    const externalSpreadsheet = SpreadsheetApp.openById(externSheetId);

    // Get the sheet by name
    const sheet = externalSpreadsheet.getSheetByName(cellAddress.sheet);
    if (!sheet) {
      throw new Error(`Sheet '${cellAddress.sheet}' not found in the external spreadsheet.`);
    }

    // Get the value from the specified cell
    const value = sheet.getRange(cellAddress.cell).getValue();

    return value;
  } catch (error) {
    Logger.log(`Error retrieving text from external sheet: ${error.message}`);
    return null;
  }
}
/**
 * Fetch data from a specified range in a Google Sheet.
 *
 * @returns {Array<Array<string>>} - A 2D array representing the values in the range.
 */
function getDataFromRange(srcSpreadsheet, sheetRange) {
  try {
    // Get the range and fetch its values
    const dataRange = sheetRange ? srcSpreadsheet.getRange(sheetRange) : srcSpreadsheet.getDataRange();
    const data = dataRange.getValues();

    return data; // Returns a 2D array of values
  } catch (error) {
    Logger.log(`Error fetching data: ${error.message}`);
    return [];
  }
}

/**
 * Filters data based on a specific column and value.
 *
 * @param {Array<Array>} data - The dataset as a 2D array, where the first row is the header row.
 * @param {string} keyColumnName - The name of the column to filter the data by.
 * @param {any} keyValue - The value to match in the specified column.
 * @returns {Array<Array>} - A filtered 2D array including the header and rows matching the filter condition but without keyColumn.
 * @throws {Error} - Throws an error if the dataset has less than two rows (header + data) or if the key column is not found in the header.
 */
function filterData(data, keyColumnName, keyValue) {
  if (data.length < 2) throw new Error("The range must include a header row and at least one data row.");

  // Extract header and data rows
  const header = data[0];
  const rows = data.slice(1);

  // Find the index of the key column
  const keyColumnIndex = header.indexOf(keyColumnName);
  if (keyColumnIndex === -1) throw new Error(`Column '${keyColumnName}' not found in the header.`);

  // Filter rows based on the key column's value
  const filteredRows = rows.filter(row => row[keyColumnIndex] === keyValue);

  // Remove the key column from both the header and filtered rows
  return [header, ...filteredRows].map(row => row.filter((_, colIndex) => colIndex !== keyColumnIndex));
}

/**
 * Converts data (with headers) to an array of dictionaries (objects).
 *
 * @param {Array} dataWithHeader - The data array where the first row is the header.
 * @return {Array<Object>} - An array of dictionaries, one for each data row.
 */
function convertToArrayOfDictionaries(dataWithHeader) {
  if (dataWithHeader.length < 2) {
    throw new Error("The data should contain at least one data row and one header row.");
  }

  const header = dataWithHeader[0];
  const dataRows = dataWithHeader.slice(1);

  // Convert each row to a dictionary
  const result = dataRows.map(row => {
    const rowDict = {};
    header.forEach((key, index) => {
      rowDict[key] = row[index];
    });
    return rowDict;
  });

  return result;
}

function findRowByDate(sheet, dateColumnName, srchDate) {
  const columnIndex = getColumnIndexes(sheet, [dateColumnName])[dateColumnName];
  const data = sheet.getRange(1, columnIndex, sheet.getLastRow(), 1).getValues(); // Get all values in the column
  const targetDate = new Date(srchDate).setHours(0, 0, 0, 0); // Normalize the target date (remove time part)

  for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
    const cellValue = data[rowIndex][0];

    if (cellValue instanceof Date) { // Ensure it's a date
      const cellDate = new Date(cellValue).setHours(0, 0, 0, 0); // Normalize date

      if (cellDate === targetDate) {
        return rowIndex + 1; // Convert zero-based index to spreadsheet row index
      }
    }
  }
  return -1; // Return -1 if not found
}

function copySheetDataByValue(srcSheet, dstSheet, filterColumnName, filterValue) {
  // Get the data from the source sheet (range with actual data)
  const range = srcSheet.getDataRange(); // Automatically adjusts to used range
  let data = range.getValues(); // Get values (not formulas)

  if (filterColumnName){
    data = filterData(data, filterColumnName, filterValue);
  }

  // Write values to the destination sheet starting at A1
  dstSheet.getRange(1, 1, data.length, data[0].length).setValues(data);
}

/**
 * Copies data from srcRange to the upper-left cell of dstRange after clearing dstRange.
 *
 * @param {SpreadsheetApp.Sheet} srcSheet - Source sheet
 * @param {string} srcRangeA1 - A1 notation of the source range (e.g., "A:B")
 * @param {SpreadsheetApp.Sheet} dstSheet - Destination sheet
 * @param {string} dstRangeA1 - A1 notation of the destination range (e.g., "C:D")
 */
function copyRangeByValue(srcSheet, srcRangeA1, dstSheet, dstRangeA1) {
  const srcRange = srcSheet.getRange(srcRangeA1);
  const srcValues = srcRange.getValues();

  const dstRange = dstSheet.getRange(dstRangeA1);
  dstRange.clearContent(); // Clean destination

  const dstStartRow = dstRange.getRow();
  const dstStartCol = dstRange.getColumn();

  const dstTargetRange = dstSheet.getRange(dstStartRow, dstStartCol, srcValues.length, srcValues[0].length);
  dstTargetRange.setValues(srcValues);
}

/**
 * Processes data from a Google Sheet, reordering and mapping columns
 * based on provided configurations.
 *
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet The source sheet object.
 * @param {string[]} resultColumns An array of strings representing the desired order
 * of columns in the output, and their headers.
 * @param {Array<{src: string, dst: string}>} columnMapping An array of objects, where each object has
 * 'src' (source column header) and 'dst' (destination column header) properties.
 * @returns {Array<Array<any>>} A 2D array of data with columns reordered and mapped.
 */
function getDataFromSheetByColumns(sheet, resultColumns, columnMapping) {
  if (!sheet) {
    Logger.log(`Error: Sheet object is null or undefined.`);
    return [];
  }

  // Get all data from the sheet. Assumes the first row is the header.
  const allData = sheet.getDataRange().getValues();
  if (allData.length === 0) {
    Logger.log(`Sheet '${sheet.getName()}' is empty.`);
    return [];
  }

  const sourceHeaders = allData[0]; // The first row contains the headers
  const sourceDataRows = allData.slice(1); // All subsequent rows are data

  // Create a map from source header name to its column index
  const sourceHeaderMap = {};
  sourceHeaders.forEach((header, index) => {
    sourceHeaderMap[header] = index;
  });

  // Create a map from result column name to its desired index in the output
  const resultColumnMap = {};
  resultColumns.forEach((header, index) => {
    resultColumnMap[header] = index;
  });

  // Initialize the transformed data array with the result headers as the first row
  const transformedData = [resultColumns];

  // Process each data row from the source sheet
  sourceDataRows.forEach(sourceRow => {
    // Create a new row for the transformed data, initialized with empty values
    // for all result columns.
    const newRow = new Array(resultColumns.length).fill('');

    // Iterate through the column mapping to populate the new row
    columnMapping.forEach(mappingPair => {
      const srcColumnName = mappingPair.src;
      const dstColumnName = mappingPair.dst;

      const srcIndex = sourceHeaderMap[srcColumnName];
      const dstIndex = resultColumnMap[dstColumnName];

      // Check if both source and destination columns are valid
      if (srcIndex !== undefined && dstIndex !== undefined) {
        newRow[dstIndex] = sourceRow[srcIndex];
      } else {
        // Log a warning if a column mapping is invalid, but don't stop processing
        if (srcIndex === undefined) {
          Logger.log(`Warning: Source column '${srcColumnName}' not found in sheet '${sheet.getName()}'.`);
        }
        if (dstIndex === undefined) {
          Logger.log(`Warning: Destination column '${dstColumnName}' not found in resultColumns.`);
        }
      }
    });
    transformedData.push(newRow); // Add the newly created row to the transformed data
  });

  return transformedData;
}


/**
 * Fills a specified column in a 2D array (with a header row) with a given value.
 * The column is identified by its header name.
 *
 * @param {Array<Array<any>>} dataWithHeader The 2D array including the header row.
 * @param {string} columnHeaderToFill The header name of the column to fill.
 * @param {any} valueToFill The value to insert into the specified column for all data rows.
 * @returns {Array<Array<any>>} The modified 2D array with the column filled.
 */
function fillColumnWithValue(dataWithHeader, columnHeaderToFill, valueToFill) {
  if (!dataWithHeader || dataWithHeader.length === 0) {
    Logger.log("Error: dataWithHeader is empty or invalid.");
    return [];
  }

  const headerRow = dataWithHeader[0];
  const dataRows = dataWithHeader.slice(1);

  // Find the index of the column to fill
  const columnIndexToFill = headerRow.indexOf(columnHeaderToFill);

  if (columnIndexToFill === -1) {
    Logger.log(`Error: Column header '${columnHeaderToFill}' not found in the provided data array.`);
    return dataWithHeader; // Return original data if column not found
  }

  // Iterate through the data rows and fill the specified column
  dataRows.forEach(row => {
    // Ensure the row has enough columns; expand if necessary
    while (row.length <= columnIndexToFill) {
      row.push(''); // Add empty cells until the desired index is reachable
    }
    row[columnIndexToFill] = valueToFill;
  });

  // Reconstruct the array with the header and modified data rows
  return [headerRow, ...dataRows];
}

/**
 * Parses a string reference (e.g., "Sheet1!A1", "My Sheet'!B5") into
 * its sheet name and cell address components.
 *
 * @param {string} referenceString The string containing the sheet and cell reference.
 * Examples: "Sheet1!A1", "'Another Sheet'!B5", "Data!Z100", "CONSTR!A1", "ДВД'!A7"
 * @returns {object|null} An object with 'sheet' and 'cell' properties,
 * or null if the reference string is invalid.
 * Example: { sheet: "Sheet1", cell: "A1" }
 */
function parseSheetAndCell(referenceString) {
  if (typeof referenceString !== 'string' || referenceString.trim() === '') {
    console.error("Invalid input: referenceString must be a non-empty string.");
    return null;
  }

  // Regular expression to match sheet name and cell address.
  // It handles sheet names with spaces or special characters enclosed in single quotes,
  // and non-quoted sheet names.
  // Group 1: Sheet Name (either quoted or unquoted)
  // Group 2: Cell Address
  const regex = /^(?:([^']+)'|([^'!]+))!([A-Za-z]+\d+)$/;
  const match = referenceString.match(regex);

  if (match) {
    let sheetName = match[1] || match[2]; // Use group 1 if quoted, else group 2
    const cellAddress = match[3];

    return {
      sheet: sheetName,
      cell: cellAddress
    };
  } else {
    console.error(`Could not parse reference string: "${referenceString}". Expected format like "Sheet!A1" or "'Sheet Name'!B2".`);
    return null;
  }
}
//--------------------------------

function addParagraphsAsLast(documentId, newTexts) {
  const doc = DocumentApp.openById(documentId);
  const body = doc.getBody();
  
  // Get the total number of elements (paragraphs and other elements)
  const numParagraphs = body.getNumChildren();
  
  if (numParagraphs === 0) {
    Logger.log("No paragraphs found in the document. Adding new text.");
    newTexts.forEach(text => body.appendParagraph(text));
    doc.saveAndClose();
    return;
  }

  // Get the last paragraph
  const lastParagraph = body.getChild(numParagraphs - 1).asParagraph();
  const lastText = lastParagraph.getText().trim();

  // Copy formatting from the last paragraph before removal
  const alignment = lastParagraph.getAlignment();
  const startIndent = lastParagraph.getIndentStart();
  const endIndent = lastParagraph.getIndentEnd();
  const firstLineIndent = lastParagraph.getIndentFirstLine();
  const spacingBefore = lastParagraph.getSpacingBefore();
  const spacingAfter = lastParagraph.getSpacingAfter();
  const lineSpacing = lastParagraph.getLineSpacing();

  // Append multiple new paragraphs with the copied formatting
  newTexts.forEach(text => {
    const newParagraph = body.appendParagraph(text);
    newParagraph.setAlignment(alignment);
    newParagraph.setIndentStart(startIndent);
    newParagraph.setIndentEnd(endIndent);
    newParagraph.setIndentFirstLine(firstLineIndent);
    newParagraph.setSpacingBefore(spacingBefore);
    newParagraph.setSpacingAfter(spacingAfter);
    newParagraph.setLineSpacing(lineSpacing);
  });
  if (lastText === "") {
    // If the last paragraph is empty, remove it and add new text paragraphs
    body.removeChild(lastParagraph);
    Logger.log("Empty paragraph found. Removed.");
  }
  // Save and close the document to apply changes
  doc.saveAndClose();

  Logger.log("Paragraphs added with new text.");
}

/**
 * Deletes a Google Doc file using its URL.
 * @param {string} fileUrl - The URL of the Google Doc file to delete.
 */
function deleteGoogleDoc(fileUrl) {
  try {
    // Extract the file ID from the URL
    const fileId = extractAnyFileIdFromUrl(fileUrl);

    if (!fileId) {
      throw new Error("Invalid URL or file ID could not be extracted.");
    }

    // Get the file by its ID and delete it
    const file = DriveApp.getFileById(fileId);
    file.setTrashed(true); // Moves the file to the trash

    Logger.log(`File with ID ${fileId} moved to trash.`);
  } catch (error) {
    Logger.log(`Error deleting file: ${error.message}`);
  }
}
//---------------------------------

const CONFIG_MAIN = {
    dataFolderId: "1kMmJ2oqpiM0ecN1eB1CzzB_mgzM7007o", 
    templateFolderId: "1Rv8S31US4vmLIvqhhCfa_9BUdy9mzuA6",
    osFolderId: "1bcmY2RMy9Gz90-UERRqXfnRFBTE8KCmA",
    brbdFileId: SpreadsheetApp.getActiveSpreadsheet().getId(),
    version: "1.4",
};

const CONFIG_ROLES = {
  unitDoer: {}, // load from bdbr table(sheet: "D_unit")
  user: ["s5user@googlegroups.com"], // S3
  proUser: ["pros5@googlegroups.com"], // S5 
  admin: ["adms5@googlegroups.com"],
};

const CONFIG_BRBD_SHEETS = {
  zvbd : {
    name: "ЗвБД",
    columns: {
      dateBD: "ДатаБД",
      numBD: "№БД",
      dateBR: "ДатаБР",
      numBR: "№БР",
      dateBRsn: "ДатаБРсн",
      numBRsn: "№БРсн",
      genZvT: "ЗвТ_створити",
      genBR: "БР_створити",
      genBD: "БД_створити",
      genZBD: "ЖБД_створити",
      genRpt: "Рп_створити",
      urlZvT: "ЗвТ",
      urlBR: "БР",
      urlBD: "БД",
      urlZBD: "ЖБД",
      urlRpt: "Рп",
      startBDUrl: "BD_start",
      endBDUrl: "BD_end",
      urlInfo: "ІНФО",
    },
  },
  dTeam: {
    name: "D_team",
    columns: {
      unitId: "<УІпідрозділу>",
    },
  },
  dType: {
    name: "D_type",
    columns: {
      unitId: "<УІпідрозділу>",
    },
  },
  dMission: {
    name: "D_mission",
    columns: {
      unitId: "<УІпідрозділу>",
    },
  },
  dUnit: {
    name: "D_unit",
    columns: {
      unitId: "<УІпідрозділу>",
      masterUnitId: "<УІ старшого начальника>",
      unitNameShort: "<підрозділ скор>",
      doerEmail: "<email виконавців>",
      unitLvl: "unitLvl",
      isLeaf: "isLeaf",
      unitBRBDId: "idBRBD",
    },
  },
  dArea100: {
    name: "D_area100",
  },
  dWeapon: {
    name: "D_weapon",
  },
  comInfo: {
    name: "cominfo",
    cells: {
      mainUnitId: "A1",
    },
  }
};

const CONFIG_INFO = {
  sheets: {
    brStruct: {
      name: "BRst",
    },
    bdStruct: {
      name: "BDst",
    },
    rptStruct: {
      name: "Rptst",
    },
    brPolkStruct: {
      name: "BRPst",
    },
    bdPolkStruct: {
      name: "BDPst",
    },
    zhbdStruct: {
      name: "ZHBDst",
    },
    dicts: {
      name: "ДВД",
    },
    text: {
      name: "Текст",
    },
    dUnit: {
      name: "D_unit",
    },
    comInfo: {
      name: "cominfo",
    },
    comVarInfo: {
      name: "comVarInfo",
      cells: {
        dateBR: "A1",
        numBR: "A2",
        dateBD: "A3",
        numBD: "A4",
        dateBRsn: "A5",
        numBRsn: "A6",
      },
    },
    br: {
      name: "БР",
    },
    bd: {
      name: "БД",
    },
    zhbd: {
      name: "ЖБД",
    },
    brPolk: {
      name: "БРП",
    },
    bdPolk: {
      name: "БДП",
    },
  },
  anyStructColumn: {
    srcFrom: "src_from", // Column defining the starting source.
    srcTo: "src_to",     // Column defining the ending source.
    cell: "cell",        // Column specifying which cell to extract.
    valueIfEmpty: "value_if_empty", // Column with text if source all source data are empty.
  },
};

const CONFIG_UNIT = {
  sheets: {
    distr: {
      name: "distr",
    },
    task: {
      name: "task",
      columns: {
        team: "Команда",
        taskType: "Тип завдання",
        rsp: "РСП для екіпажів (груп)для задач на 100К",
        weapon: "Засіб",
        brygads: "Бригади, в інтересах якіх працюють екіпажі",
        flyNum: "Кількість вильотів",
        results: "Результат виконання завдання",
        ovtLose: "Втрати ОВТ",
        osLose: "Втрати О/С",
        brPolk: "БР полку",
      },
    },
    add: {
      name: "add",
    },
    pers: {
      name: "pers",
    },
    error: {
      name: "error",
      columns: {
        type: "Індикатор",
        descr: "Опис помилки",
      },
    },
    dTeam: {
      name: "D_team",
    },
    dWeapon: {
      name: "D_weapon",
    },
    dArea100: {
      name: "D_area100",
    },
    dType: {
      name: "D_type",
    },
    dUnit: {
      name: "D_unit",
      columns: {
        unitId: "<УІпідрозділу>",
        masterUnitId: "<УІ старшого начальника>",
        unitNameShort: "<підрозділ скор>",
        doerEmail: "<email виконавців>",
        unitLvl: "unitLvl",
        isLeaf: "isLeaf",
        unitBRBDId: "idBRBD",
      },
    },
    dMission: {
      name: "D_mission",
    },
    dCommon: {
      name: "D_common",
      cells: {
        unitId: "B1",
        dateBR: "B2",
        dateBD: "B3",
        numBR: "B4",
      },
    },
  },
};

const CONFIG_PIVOTTABLE = {
  sheets: {
    task: {
      name: "task",
      columns: {
        unitLvl1: "unitLvl1",
        unitLvl2: "unitLvl2",
        team: "Команда",
        taskType: "Тип завдання",
        rsp: "РСП для екіпажів (груп)для задач на 100К",
        weapon: "Засіб",
        brygads: "Бригади, в інтересах якіх працюють екіпажі",
        flyNum: "Кількість вильотів",
        results: "Результат виконання завдання",
        ovtLose: "Втрати ОВТ",
        osLose: "Втрати О/С",
        brPolk: "БР полку",
      },
    },
  },
};


const CONFIG_COPY2PIVOTTABLE = {
  fromUnit:{
    srcSheet: CONFIG_UNIT.sheets.task.name,
    dstSheet: CONFIG_PIVOTTABLE.sheets.task.name,
    skipRow: 2,
    columns2Copy: [
      {src: CONFIG_UNIT.sheets.task.columns.team,       dst: CONFIG_PIVOTTABLE.sheets.task.columns.team},
      {src: CONFIG_UNIT.sheets.task.columns.taskType,   dst: CONFIG_PIVOTTABLE.sheets.task.columns.taskType},
      {src: CONFIG_UNIT.sheets.task.columns.rsp,        dst: CONFIG_PIVOTTABLE.sheets.task.columns.rsp},
      {src: CONFIG_UNIT.sheets.task.columns.weapon,     dst: CONFIG_PIVOTTABLE.sheets.task.columns.weapon},
      {src: CONFIG_UNIT.sheets.task.columns.brygads,    dst: CONFIG_PIVOTTABLE.sheets.task.columns.brygads},
      {src: CONFIG_UNIT.sheets.task.columns.flyNum,     dst: CONFIG_PIVOTTABLE.sheets.task.columns.flyNum},
      {src: CONFIG_UNIT.sheets.task.columns.results,    dst: CONFIG_PIVOTTABLE.sheets.task.columns.results},
      {src: CONFIG_UNIT.sheets.task.columns.ovtLose,    dst: CONFIG_PIVOTTABLE.sheets.task.columns.ovtLose},
      {src: CONFIG_UNIT.sheets.task.columns.osLose,     dst: CONFIG_PIVOTTABLE.sheets.task.columns.osLose},
      {src: CONFIG_UNIT.sheets.task.columns.brPolk,     dst: CONFIG_PIVOTTABLE.sheets.task.columns.brPolk},
    ],
  },
  fromPT: {
    srcSheet: CONFIG_PIVOTTABLE.sheets.task.name,
    dstSheet: CONFIG_PIVOTTABLE.sheets.task.name,
    columns2Copy: [
      {src: CONFIG_PIVOTTABLE.sheets.task.columns.unitLvl1,   dst: CONFIG_PIVOTTABLE.sheets.task.columns.unitLvl2},
      {src: CONFIG_PIVOTTABLE.sheets.task.columns.team,       dst: CONFIG_PIVOTTABLE.sheets.task.columns.team},
      {src: CONFIG_PIVOTTABLE.sheets.task.columns.team,       dst: CONFIG_PIVOTTABLE.sheets.task.columns.team},
      {src: CONFIG_PIVOTTABLE.sheets.task.columns.team,       dst: CONFIG_PIVOTTABLE.sheets.task.columns.team},
      {src: CONFIG_PIVOTTABLE.sheets.task.columns.taskType,   dst: CONFIG_PIVOTTABLE.sheets.task.columns.taskType},
      {src: CONFIG_PIVOTTABLE.sheets.task.columns.rsp,        dst: CONFIG_PIVOTTABLE.sheets.task.columns.rsp},
      {src: CONFIG_PIVOTTABLE.sheets.task.columns.weapon,     dst: CONFIG_PIVOTTABLE.sheets.task.columns.weapon},
      {src: CONFIG_PIVOTTABLE.sheets.task.columns.brygads,    dst: CONFIG_PIVOTTABLE.sheets.task.columns.brygads},
      {src: CONFIG_PIVOTTABLE.sheets.task.columns.flyNum,     dst: CONFIG_PIVOTTABLE.sheets.task.columns.flyNum},
      {src: CONFIG_PIVOTTABLE.sheets.task.columns.results,    dst: CONFIG_PIVOTTABLE.sheets.task.columns.results},
      {src: CONFIG_PIVOTTABLE.sheets.task.columns.ovtLose,    dst: CONFIG_PIVOTTABLE.sheets.task.columns.ovtLose},
      {src: CONFIG_PIVOTTABLE.sheets.task.columns.osLose,     dst: CONFIG_PIVOTTABLE.sheets.task.columns.osLose},
      {src: CONFIG_PIVOTTABLE.sheets.task.columns.brPolk,     dst: CONFIG_PIVOTTABLE.sheets.task.columns.brPolk},
    ],
  },
};






const CONFIG_COPY_INFO = {
  dstPermission: {
    viewer: [...CONFIG_ROLES.user],
    editor: [...CONFIG_ROLES.proUser, ...CONFIG_ROLES.admin],
    commenter: [],
  },
  copySheets: [
    {
      src: CONFIG_BRBD_SHEETS.dUnit.name,
      columnFilterById: null,
      dst: CONFIG_INFO.sheets.dUnit.name,
    },
    {
      src: CONFIG_BRBD_SHEETS.comInfo.name,
      columnFilterById: null,
      dst: CONFIG_INFO.sheets.comInfo.name,
    },
  ],
  copyVarInfo: {
    srcSheet: CONFIG_BRBD_SHEETS.zvbd.name,
    dstSheet: CONFIG_INFO.sheets.comVarInfo.name,
    columns2cell:[
      [CONFIG_BRBD_SHEETS.zvbd.columns.dateBR,
      CONFIG_INFO.sheets.comVarInfo.cells.dateBR],
      
      [CONFIG_BRBD_SHEETS.zvbd.columns.numBR,
      CONFIG_INFO.sheets.comVarInfo.cells.numBR],
      
      [CONFIG_BRBD_SHEETS.zvbd.columns.dateBD,
      CONFIG_INFO.sheets.comVarInfo.cells.dateBD],
      
      [CONFIG_BRBD_SHEETS.zvbd.columns.numBD,
      CONFIG_INFO.sheets.comVarInfo.cells.numBD],
      
      [CONFIG_BRBD_SHEETS.zvbd.columns.dateBRsn,
      CONFIG_INFO.sheets.comVarInfo.cells.dateBRsn],
      
      [CONFIG_BRBD_SHEETS.zvbd.columns.numBRsn,
      CONFIG_INFO.sheets.comVarInfo.cells.numBRsn],
    ],
  }
};

const CONFIG_COPY_UNIT = {
  dstPermission: {
    viewer: [],
    editor: [...CONFIG_ROLES.user, ...CONFIG_ROLES.proUser, ...CONFIG_ROLES.admin], // add from dUnit sheet
    commenter: [],
  },
  copySheets: [
    {
      src: CONFIG_BRBD_SHEETS.dTeam.name,
      columnFilterById: CONFIG_BRBD_SHEETS.dTeam.columns.unitId,
      dst: CONFIG_UNIT.sheets.dTeam.name,
    },
    {
      src: CONFIG_BRBD_SHEETS.dType.name,
      columnFilterById: CONFIG_BRBD_SHEETS.dType.columns.unitId,
      dst: CONFIG_UNIT.sheets.dType.name,
    },
    {
      src: CONFIG_BRBD_SHEETS.dMission.name,
      columnFilterById: CONFIG_BRBD_SHEETS.dMission.columns.unitId,
      dst: CONFIG_UNIT.sheets.dMission.name,
    },
    {
      src: CONFIG_BRBD_SHEETS.dUnit.name,
      columnFilterById: null,
      dst: CONFIG_UNIT.sheets.dUnit.name,
    },
    {
      src: CONFIG_BRBD_SHEETS.dArea100.name,
      columnFilterById: null,
      dst: CONFIG_UNIT.sheets.dArea100.name,
    },
    {
      src: CONFIG_BRBD_SHEETS.dWeapon.name,
      columnFilterById: null,
      dst: CONFIG_UNIT.sheets.dWeapon.name,
    },
  ],
  copyDCommon: {
    srcSheet: CONFIG_BRBD_SHEETS.zvbd.name,
    dstSheet: CONFIG_UNIT.sheets.dCommon.name,
    columns2cell:[
      [CONFIG_BRBD_SHEETS.zvbd.columns.dateBR,
      CONFIG_UNIT.sheets.dCommon.cells.dateBR],
      
      [CONFIG_BRBD_SHEETS.zvbd.columns.dateBD,
      CONFIG_UNIT.sheets.dCommon.cells.dateBD],

      [CONFIG_BRBD_SHEETS.zvbd.columns.numBR,
      CONFIG_UNIT.sheets.dCommon.cells.numBR],
    ],
    dstCells: {
      unitId: CONFIG_UNIT.sheets.dCommon.cells.unitId,
    },
  },
  copyDistr: {
    dstSheet: CONFIG_UNIT.sheets.distr.name,
    dstRange: "A:B", 
  },
  copyPers: {
    dstSheet: CONFIG_UNIT.sheets.pers.name,
    dstRange: "A:F",
    srcRange: "A:F",
  },
  copyDTeam: {
    dstSheet: CONFIG_UNIT.sheets.dTeam.name,
    dstRange: "A:A",
  },
};

const CONFIG_OSFILE = {
  columnNames: {
    id: "id_вс",
    rank: "Військове звання",
    pib: "ПІБ",
    position: "посада полк дв",
    bornDate: "Дата народження",
    inOutStatus: "прибув/вибув",
  },
  statuses: {
    income: "прибув",
    outcome: "вибув",
  },
};

const CONFIG_SIGN = {
  sheetWithSign: "Загінфа",
  br: [
    {
      needCheck: false,
      rank: "A39",
      lastName: "A42",
      firstName: "A40",
      midName: "A41",
    },
    {
      needCheck: false,
      rank: "A44",
      lastName: "A47",
      firstName: "A45",
      midName: "A46",
    },
  ],
  bd: [
    {
      needCheck: true,
      rank: "A49",
      lastName: "A52",
      firstName: "A50",
      midName: "A51",
    },
    {
      needCheck: false,
      rank: "A54",
      lastName: "A57",
      firstName: "A55",
      midName: "A56",
    },
  ],
};
//---------------------------------------------
