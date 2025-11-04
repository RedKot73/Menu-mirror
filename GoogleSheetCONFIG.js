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
