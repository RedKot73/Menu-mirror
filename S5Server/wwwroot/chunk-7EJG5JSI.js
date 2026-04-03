import {
  ChangePasswordDialogComponent,
  UsersService
} from "./chunk-3C2KJSQ4.js";
import {
  MasterDetailLayoutComponent
} from "./chunk-RGE4EEWU.js";
import {
  MatChip,
  MatChipAvatar,
  MatChipRemove,
  MatChipRow,
  MatChipsModule
} from "./chunk-DW2ITXUJ.js";
import {
  MatDivider,
  MatDividerModule
} from "./chunk-U3E6ZCOL.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-HFCL4LX6.js";
import {
  SoldierService
} from "./chunk-TAPS6EZF.js";
import {
  SoldierUtils
} from "./chunk-KM64JSWM.js";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
} from "./chunk-ZWWMZKX6.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-LFLZCNEV.js";
import {
  _MatInternalFormField
} from "./chunk-5OFTEHZD.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-4P4RSBWD.js";
import {
  MatOption
} from "./chunk-2P3X7Y6Y.js";
import {
  MatSnackBar,
  MatSnackBarModule,
  S5App_ErrorHandler
} from "./chunk-BOCU6YDT.js";
import {
  ConfirmDialogComponent
} from "./chunk-TXKUHQZM.js";
import {
  MatSort,
  MatSortHeader,
  MatSortModule
} from "./chunk-5DKE6E4J.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from "./chunk-EMY5UD7C.js";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
  MatTableModule
} from "./chunk-NPUDLI5V.js";
import {
  DefaultValueAccessor,
  FormControl,
  FormControlDirective,
  FormsModule,
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatHint,
  MatIcon,
  MatIconModule,
  MatInput,
  MatInputModule,
  MatLabel,
  MatSuffix,
  MaxLengthValidator,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgModel,
  ReactiveFormsModule,
  RequiredValidator,
  Validators
} from "./chunk-IC3HW47I.js";
import "./chunk-GOHAIDCM.js";
import {
  BidiModule,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  CommonModule,
  Component,
  DatePipe,
  ElementRef,
  EventEmitter,
  FocusMonitor,
  HostAttributeToken,
  HttpClient,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  MatButton,
  MatButtonModule,
  MatIconButton,
  MatRipple,
  NgModule,
  Output,
  Subject,
  ViewChild,
  ViewEncapsulation,
  _CdkPrivateStyleLoader,
  _IdGenerator,
  _StructuralStylesLoader,
  __async,
  __commonJS,
  __toESM,
  _animationsDisabled,
  booleanAttribute,
  catchError,
  computed,
  debounceTime,
  distinctUntilChanged,
  forkJoin,
  forwardRef,
  inject,
  map,
  numberAttribute,
  of,
  setClassMetadata,
  signal,
  takeUntil,
  throwError,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-IKDNLDBK.js";

// node_modules/qrcode/lib/can-promise.js
var require_can_promise = __commonJS({
  "node_modules/qrcode/lib/can-promise.js"(exports, module) {
    "use strict";
    module.exports = function() {
      return typeof Promise === "function" && Promise.prototype && Promise.prototype.then;
    };
  }
});

// node_modules/qrcode/lib/core/utils.js
var require_utils = __commonJS({
  "node_modules/qrcode/lib/core/utils.js"(exports) {
    "use strict";
    var toSJISFunction;
    var CODEWORDS_COUNT = [
      0,
      // Not used
      26,
      44,
      70,
      100,
      134,
      172,
      196,
      242,
      292,
      346,
      404,
      466,
      532,
      581,
      655,
      733,
      815,
      901,
      991,
      1085,
      1156,
      1258,
      1364,
      1474,
      1588,
      1706,
      1828,
      1921,
      2051,
      2185,
      2323,
      2465,
      2611,
      2761,
      2876,
      3034,
      3196,
      3362,
      3532,
      3706
    ];
    exports.getSymbolSize = function getSymbolSize(version) {
      if (!version) throw new Error('"version" cannot be null or undefined');
      if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40');
      return version * 4 + 17;
    };
    exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
      return CODEWORDS_COUNT[version];
    };
    exports.getBCHDigit = function(data) {
      let digit = 0;
      while (data !== 0) {
        digit++;
        data >>>= 1;
      }
      return digit;
    };
    exports.setToSJISFunction = function setToSJISFunction(f) {
      if (typeof f !== "function") {
        throw new Error('"toSJISFunc" is not a valid function.');
      }
      toSJISFunction = f;
    };
    exports.isKanjiModeEnabled = function() {
      return typeof toSJISFunction !== "undefined";
    };
    exports.toSJIS = function toSJIS(kanji) {
      return toSJISFunction(kanji);
    };
  }
});

// node_modules/qrcode/lib/core/error-correction-level.js
var require_error_correction_level = __commonJS({
  "node_modules/qrcode/lib/core/error-correction-level.js"(exports) {
    "use strict";
    exports.L = { bit: 1 };
    exports.M = { bit: 0 };
    exports.Q = { bit: 3 };
    exports.H = { bit: 2 };
    function fromString(string) {
      if (typeof string !== "string") {
        throw new Error("Param is not a string");
      }
      const lcStr = string.toLowerCase();
      switch (lcStr) {
        case "l":
        case "low":
          return exports.L;
        case "m":
        case "medium":
          return exports.M;
        case "q":
        case "quartile":
          return exports.Q;
        case "h":
        case "high":
          return exports.H;
        default:
          throw new Error("Unknown EC Level: " + string);
      }
    }
    exports.isValid = function isValid(level) {
      return level && typeof level.bit !== "undefined" && level.bit >= 0 && level.bit < 4;
    };
    exports.from = function from(value, defaultValue) {
      if (exports.isValid(value)) {
        return value;
      }
      try {
        return fromString(value);
      } catch (e) {
        return defaultValue;
      }
    };
  }
});

// node_modules/qrcode/lib/core/bit-buffer.js
var require_bit_buffer = __commonJS({
  "node_modules/qrcode/lib/core/bit-buffer.js"(exports, module) {
    "use strict";
    function BitBuffer() {
      this.buffer = [];
      this.length = 0;
    }
    BitBuffer.prototype = {
      get: function(index) {
        const bufIndex = Math.floor(index / 8);
        return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
      },
      put: function(num, length) {
        for (let i = 0; i < length; i++) {
          this.putBit((num >>> length - i - 1 & 1) === 1);
        }
      },
      getLengthInBits: function() {
        return this.length;
      },
      putBit: function(bit) {
        const bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) {
          this.buffer.push(0);
        }
        if (bit) {
          this.buffer[bufIndex] |= 128 >>> this.length % 8;
        }
        this.length++;
      }
    };
    module.exports = BitBuffer;
  }
});

// node_modules/qrcode/lib/core/bit-matrix.js
var require_bit_matrix = __commonJS({
  "node_modules/qrcode/lib/core/bit-matrix.js"(exports, module) {
    "use strict";
    function BitMatrix(size) {
      if (!size || size < 1) {
        throw new Error("BitMatrix size must be defined and greater than 0");
      }
      this.size = size;
      this.data = new Uint8Array(size * size);
      this.reservedBit = new Uint8Array(size * size);
    }
    BitMatrix.prototype.set = function(row, col, value, reserved) {
      const index = row * this.size + col;
      this.data[index] = value;
      if (reserved) this.reservedBit[index] = true;
    };
    BitMatrix.prototype.get = function(row, col) {
      return this.data[row * this.size + col];
    };
    BitMatrix.prototype.xor = function(row, col, value) {
      this.data[row * this.size + col] ^= value;
    };
    BitMatrix.prototype.isReserved = function(row, col) {
      return this.reservedBit[row * this.size + col];
    };
    module.exports = BitMatrix;
  }
});

// node_modules/qrcode/lib/core/alignment-pattern.js
var require_alignment_pattern = __commonJS({
  "node_modules/qrcode/lib/core/alignment-pattern.js"(exports) {
    "use strict";
    var getSymbolSize = require_utils().getSymbolSize;
    exports.getRowColCoords = function getRowColCoords(version) {
      if (version === 1) return [];
      const posCount = Math.floor(version / 7) + 2;
      const size = getSymbolSize(version);
      const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
      const positions = [size - 7];
      for (let i = 1; i < posCount - 1; i++) {
        positions[i] = positions[i - 1] - intervals;
      }
      positions.push(6);
      return positions.reverse();
    };
    exports.getPositions = function getPositions(version) {
      const coords = [];
      const pos = exports.getRowColCoords(version);
      const posLength = pos.length;
      for (let i = 0; i < posLength; i++) {
        for (let j = 0; j < posLength; j++) {
          if (i === 0 && j === 0 || // top-left
          i === 0 && j === posLength - 1 || // bottom-left
          i === posLength - 1 && j === 0) {
            continue;
          }
          coords.push([pos[i], pos[j]]);
        }
      }
      return coords;
    };
  }
});

// node_modules/qrcode/lib/core/finder-pattern.js
var require_finder_pattern = __commonJS({
  "node_modules/qrcode/lib/core/finder-pattern.js"(exports) {
    "use strict";
    var getSymbolSize = require_utils().getSymbolSize;
    var FINDER_PATTERN_SIZE = 7;
    exports.getPositions = function getPositions(version) {
      const size = getSymbolSize(version);
      return [
        // top-left
        [0, 0],
        // top-right
        [size - FINDER_PATTERN_SIZE, 0],
        // bottom-left
        [0, size - FINDER_PATTERN_SIZE]
      ];
    };
  }
});

// node_modules/qrcode/lib/core/mask-pattern.js
var require_mask_pattern = __commonJS({
  "node_modules/qrcode/lib/core/mask-pattern.js"(exports) {
    "use strict";
    exports.Patterns = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7
    };
    var PenaltyScores = {
      N1: 3,
      N2: 3,
      N3: 40,
      N4: 10
    };
    exports.isValid = function isValid(mask) {
      return mask != null && mask !== "" && !isNaN(mask) && mask >= 0 && mask <= 7;
    };
    exports.from = function from(value) {
      return exports.isValid(value) ? parseInt(value, 10) : void 0;
    };
    exports.getPenaltyN1 = function getPenaltyN1(data) {
      const size = data.size;
      let points = 0;
      let sameCountCol = 0;
      let sameCountRow = 0;
      let lastCol = null;
      let lastRow = null;
      for (let row = 0; row < size; row++) {
        sameCountCol = sameCountRow = 0;
        lastCol = lastRow = null;
        for (let col = 0; col < size; col++) {
          let module2 = data.get(row, col);
          if (module2 === lastCol) {
            sameCountCol++;
          } else {
            if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
            lastCol = module2;
            sameCountCol = 1;
          }
          module2 = data.get(col, row);
          if (module2 === lastRow) {
            sameCountRow++;
          } else {
            if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
            lastRow = module2;
            sameCountRow = 1;
          }
        }
        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
      }
      return points;
    };
    exports.getPenaltyN2 = function getPenaltyN2(data) {
      const size = data.size;
      let points = 0;
      for (let row = 0; row < size - 1; row++) {
        for (let col = 0; col < size - 1; col++) {
          const last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
          if (last === 4 || last === 0) points++;
        }
      }
      return points * PenaltyScores.N2;
    };
    exports.getPenaltyN3 = function getPenaltyN3(data) {
      const size = data.size;
      let points = 0;
      let bitsCol = 0;
      let bitsRow = 0;
      for (let row = 0; row < size; row++) {
        bitsCol = bitsRow = 0;
        for (let col = 0; col < size; col++) {
          bitsCol = bitsCol << 1 & 2047 | data.get(row, col);
          if (col >= 10 && (bitsCol === 1488 || bitsCol === 93)) points++;
          bitsRow = bitsRow << 1 & 2047 | data.get(col, row);
          if (col >= 10 && (bitsRow === 1488 || bitsRow === 93)) points++;
        }
      }
      return points * PenaltyScores.N3;
    };
    exports.getPenaltyN4 = function getPenaltyN4(data) {
      let darkCount = 0;
      const modulesCount = data.data.length;
      for (let i = 0; i < modulesCount; i++) darkCount += data.data[i];
      const k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
      return k * PenaltyScores.N4;
    };
    function getMaskAt(maskPattern, i, j) {
      switch (maskPattern) {
        case exports.Patterns.PATTERN000:
          return (i + j) % 2 === 0;
        case exports.Patterns.PATTERN001:
          return i % 2 === 0;
        case exports.Patterns.PATTERN010:
          return j % 3 === 0;
        case exports.Patterns.PATTERN011:
          return (i + j) % 3 === 0;
        case exports.Patterns.PATTERN100:
          return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
        case exports.Patterns.PATTERN101:
          return i * j % 2 + i * j % 3 === 0;
        case exports.Patterns.PATTERN110:
          return (i * j % 2 + i * j % 3) % 2 === 0;
        case exports.Patterns.PATTERN111:
          return (i * j % 3 + (i + j) % 2) % 2 === 0;
        default:
          throw new Error("bad maskPattern:" + maskPattern);
      }
    }
    exports.applyMask = function applyMask(pattern, data) {
      const size = data.size;
      for (let col = 0; col < size; col++) {
        for (let row = 0; row < size; row++) {
          if (data.isReserved(row, col)) continue;
          data.xor(row, col, getMaskAt(pattern, row, col));
        }
      }
    };
    exports.getBestMask = function getBestMask(data, setupFormatFunc) {
      const numPatterns = Object.keys(exports.Patterns).length;
      let bestPattern = 0;
      let lowerPenalty = Infinity;
      for (let p = 0; p < numPatterns; p++) {
        setupFormatFunc(p);
        exports.applyMask(p, data);
        const penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);
        exports.applyMask(p, data);
        if (penalty < lowerPenalty) {
          lowerPenalty = penalty;
          bestPattern = p;
        }
      }
      return bestPattern;
    };
  }
});

// node_modules/qrcode/lib/core/error-correction-code.js
var require_error_correction_code = __commonJS({
  "node_modules/qrcode/lib/core/error-correction-code.js"(exports) {
    "use strict";
    var ECLevel = require_error_correction_level();
    var EC_BLOCKS_TABLE = [
      // L  M  Q  H
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      2,
      2,
      1,
      2,
      2,
      4,
      1,
      2,
      4,
      4,
      2,
      4,
      4,
      4,
      2,
      4,
      6,
      5,
      2,
      4,
      6,
      6,
      2,
      5,
      8,
      8,
      4,
      5,
      8,
      8,
      4,
      5,
      8,
      11,
      4,
      8,
      10,
      11,
      4,
      9,
      12,
      16,
      4,
      9,
      16,
      16,
      6,
      10,
      12,
      18,
      6,
      10,
      17,
      16,
      6,
      11,
      16,
      19,
      6,
      13,
      18,
      21,
      7,
      14,
      21,
      25,
      8,
      16,
      20,
      25,
      8,
      17,
      23,
      25,
      9,
      17,
      23,
      34,
      9,
      18,
      25,
      30,
      10,
      20,
      27,
      32,
      12,
      21,
      29,
      35,
      12,
      23,
      34,
      37,
      12,
      25,
      34,
      40,
      13,
      26,
      35,
      42,
      14,
      28,
      38,
      45,
      15,
      29,
      40,
      48,
      16,
      31,
      43,
      51,
      17,
      33,
      45,
      54,
      18,
      35,
      48,
      57,
      19,
      37,
      51,
      60,
      19,
      38,
      53,
      63,
      20,
      40,
      56,
      66,
      21,
      43,
      59,
      70,
      22,
      45,
      62,
      74,
      24,
      47,
      65,
      77,
      25,
      49,
      68,
      81
    ];
    var EC_CODEWORDS_TABLE = [
      // L  M  Q  H
      7,
      10,
      13,
      17,
      10,
      16,
      22,
      28,
      15,
      26,
      36,
      44,
      20,
      36,
      52,
      64,
      26,
      48,
      72,
      88,
      36,
      64,
      96,
      112,
      40,
      72,
      108,
      130,
      48,
      88,
      132,
      156,
      60,
      110,
      160,
      192,
      72,
      130,
      192,
      224,
      80,
      150,
      224,
      264,
      96,
      176,
      260,
      308,
      104,
      198,
      288,
      352,
      120,
      216,
      320,
      384,
      132,
      240,
      360,
      432,
      144,
      280,
      408,
      480,
      168,
      308,
      448,
      532,
      180,
      338,
      504,
      588,
      196,
      364,
      546,
      650,
      224,
      416,
      600,
      700,
      224,
      442,
      644,
      750,
      252,
      476,
      690,
      816,
      270,
      504,
      750,
      900,
      300,
      560,
      810,
      960,
      312,
      588,
      870,
      1050,
      336,
      644,
      952,
      1110,
      360,
      700,
      1020,
      1200,
      390,
      728,
      1050,
      1260,
      420,
      784,
      1140,
      1350,
      450,
      812,
      1200,
      1440,
      480,
      868,
      1290,
      1530,
      510,
      924,
      1350,
      1620,
      540,
      980,
      1440,
      1710,
      570,
      1036,
      1530,
      1800,
      570,
      1064,
      1590,
      1890,
      600,
      1120,
      1680,
      1980,
      630,
      1204,
      1770,
      2100,
      660,
      1260,
      1860,
      2220,
      720,
      1316,
      1950,
      2310,
      750,
      1372,
      2040,
      2430
    ];
    exports.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
    exports.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
  }
});

// node_modules/qrcode/lib/core/galois-field.js
var require_galois_field = __commonJS({
  "node_modules/qrcode/lib/core/galois-field.js"(exports) {
    "use strict";
    var EXP_TABLE = new Uint8Array(512);
    var LOG_TABLE = new Uint8Array(256);
    (function initTables() {
      let x = 1;
      for (let i = 0; i < 255; i++) {
        EXP_TABLE[i] = x;
        LOG_TABLE[x] = i;
        x <<= 1;
        if (x & 256) {
          x ^= 285;
        }
      }
      for (let i = 255; i < 512; i++) {
        EXP_TABLE[i] = EXP_TABLE[i - 255];
      }
    })();
    exports.log = function log(n) {
      if (n < 1) throw new Error("log(" + n + ")");
      return LOG_TABLE[n];
    };
    exports.exp = function exp(n) {
      return EXP_TABLE[n];
    };
    exports.mul = function mul(x, y) {
      if (x === 0 || y === 0) return 0;
      return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
    };
  }
});

// node_modules/qrcode/lib/core/polynomial.js
var require_polynomial = __commonJS({
  "node_modules/qrcode/lib/core/polynomial.js"(exports) {
    "use strict";
    var GF = require_galois_field();
    exports.mul = function mul(p1, p2) {
      const coeff = new Uint8Array(p1.length + p2.length - 1);
      for (let i = 0; i < p1.length; i++) {
        for (let j = 0; j < p2.length; j++) {
          coeff[i + j] ^= GF.mul(p1[i], p2[j]);
        }
      }
      return coeff;
    };
    exports.mod = function mod(divident, divisor) {
      let result = new Uint8Array(divident);
      while (result.length - divisor.length >= 0) {
        const coeff = result[0];
        for (let i = 0; i < divisor.length; i++) {
          result[i] ^= GF.mul(divisor[i], coeff);
        }
        let offset = 0;
        while (offset < result.length && result[offset] === 0) offset++;
        result = result.slice(offset);
      }
      return result;
    };
    exports.generateECPolynomial = function generateECPolynomial(degree) {
      let poly = new Uint8Array([1]);
      for (let i = 0; i < degree; i++) {
        poly = exports.mul(poly, new Uint8Array([1, GF.exp(i)]));
      }
      return poly;
    };
  }
});

// node_modules/qrcode/lib/core/reed-solomon-encoder.js
var require_reed_solomon_encoder = __commonJS({
  "node_modules/qrcode/lib/core/reed-solomon-encoder.js"(exports, module) {
    "use strict";
    var Polynomial = require_polynomial();
    function ReedSolomonEncoder(degree) {
      this.genPoly = void 0;
      this.degree = degree;
      if (this.degree) this.initialize(this.degree);
    }
    ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
      this.degree = degree;
      this.genPoly = Polynomial.generateECPolynomial(this.degree);
    };
    ReedSolomonEncoder.prototype.encode = function encode(data) {
      if (!this.genPoly) {
        throw new Error("Encoder not initialized");
      }
      const paddedData = new Uint8Array(data.length + this.degree);
      paddedData.set(data);
      const remainder = Polynomial.mod(paddedData, this.genPoly);
      const start = this.degree - remainder.length;
      if (start > 0) {
        const buff = new Uint8Array(this.degree);
        buff.set(remainder, start);
        return buff;
      }
      return remainder;
    };
    module.exports = ReedSolomonEncoder;
  }
});

// node_modules/qrcode/lib/core/version-check.js
var require_version_check = __commonJS({
  "node_modules/qrcode/lib/core/version-check.js"(exports) {
    "use strict";
    exports.isValid = function isValid(version) {
      return !isNaN(version) && version >= 1 && version <= 40;
    };
  }
});

// node_modules/qrcode/lib/core/regex.js
var require_regex = __commonJS({
  "node_modules/qrcode/lib/core/regex.js"(exports) {
    "use strict";
    var numeric = "[0-9]+";
    var alphanumeric = "[A-Z $%*+\\-./:]+";
    var kanji = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
    kanji = kanji.replace(/u/g, "\\u");
    var byte = "(?:(?![A-Z0-9 $%*+\\-./:]|" + kanji + ")(?:.|[\r\n]))+";
    exports.KANJI = new RegExp(kanji, "g");
    exports.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
    exports.BYTE = new RegExp(byte, "g");
    exports.NUMERIC = new RegExp(numeric, "g");
    exports.ALPHANUMERIC = new RegExp(alphanumeric, "g");
    var TEST_KANJI = new RegExp("^" + kanji + "$");
    var TEST_NUMERIC = new RegExp("^" + numeric + "$");
    var TEST_ALPHANUMERIC = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
    exports.testKanji = function testKanji(str) {
      return TEST_KANJI.test(str);
    };
    exports.testNumeric = function testNumeric(str) {
      return TEST_NUMERIC.test(str);
    };
    exports.testAlphanumeric = function testAlphanumeric(str) {
      return TEST_ALPHANUMERIC.test(str);
    };
  }
});

// node_modules/qrcode/lib/core/mode.js
var require_mode = __commonJS({
  "node_modules/qrcode/lib/core/mode.js"(exports) {
    "use strict";
    var VersionCheck = require_version_check();
    var Regex = require_regex();
    exports.NUMERIC = {
      id: "Numeric",
      bit: 1 << 0,
      ccBits: [10, 12, 14]
    };
    exports.ALPHANUMERIC = {
      id: "Alphanumeric",
      bit: 1 << 1,
      ccBits: [9, 11, 13]
    };
    exports.BYTE = {
      id: "Byte",
      bit: 1 << 2,
      ccBits: [8, 16, 16]
    };
    exports.KANJI = {
      id: "Kanji",
      bit: 1 << 3,
      ccBits: [8, 10, 12]
    };
    exports.MIXED = {
      bit: -1
    };
    exports.getCharCountIndicator = function getCharCountIndicator(mode, version) {
      if (!mode.ccBits) throw new Error("Invalid mode: " + mode);
      if (!VersionCheck.isValid(version)) {
        throw new Error("Invalid version: " + version);
      }
      if (version >= 1 && version < 10) return mode.ccBits[0];
      else if (version < 27) return mode.ccBits[1];
      return mode.ccBits[2];
    };
    exports.getBestModeForData = function getBestModeForData(dataStr) {
      if (Regex.testNumeric(dataStr)) return exports.NUMERIC;
      else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC;
      else if (Regex.testKanji(dataStr)) return exports.KANJI;
      else return exports.BYTE;
    };
    exports.toString = function toString(mode) {
      if (mode && mode.id) return mode.id;
      throw new Error("Invalid mode");
    };
    exports.isValid = function isValid(mode) {
      return mode && mode.bit && mode.ccBits;
    };
    function fromString(string) {
      if (typeof string !== "string") {
        throw new Error("Param is not a string");
      }
      const lcStr = string.toLowerCase();
      switch (lcStr) {
        case "numeric":
          return exports.NUMERIC;
        case "alphanumeric":
          return exports.ALPHANUMERIC;
        case "kanji":
          return exports.KANJI;
        case "byte":
          return exports.BYTE;
        default:
          throw new Error("Unknown mode: " + string);
      }
    }
    exports.from = function from(value, defaultValue) {
      if (exports.isValid(value)) {
        return value;
      }
      try {
        return fromString(value);
      } catch (e) {
        return defaultValue;
      }
    };
  }
});

// node_modules/qrcode/lib/core/version.js
var require_version = __commonJS({
  "node_modules/qrcode/lib/core/version.js"(exports) {
    "use strict";
    var Utils = require_utils();
    var ECCode = require_error_correction_code();
    var ECLevel = require_error_correction_level();
    var Mode = require_mode();
    var VersionCheck = require_version_check();
    var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
    var G18_BCH = Utils.getBCHDigit(G18);
    function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
      for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
          return currentVersion;
        }
      }
      return void 0;
    }
    function getReservedBitsCount(mode, version) {
      return Mode.getCharCountIndicator(mode, version) + 4;
    }
    function getTotalBitsFromDataArray(segments, version) {
      let totalBits = 0;
      segments.forEach(function(data) {
        const reservedBits = getReservedBitsCount(data.mode, version);
        totalBits += reservedBits + data.getBitsLength();
      });
      return totalBits;
    }
    function getBestVersionForMixedData(segments, errorCorrectionLevel) {
      for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
        const length = getTotalBitsFromDataArray(segments, currentVersion);
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
          return currentVersion;
        }
      }
      return void 0;
    }
    exports.from = function from(value, defaultValue) {
      if (VersionCheck.isValid(value)) {
        return parseInt(value, 10);
      }
      return defaultValue;
    };
    exports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {
      if (!VersionCheck.isValid(version)) {
        throw new Error("Invalid QR Code version");
      }
      if (typeof mode === "undefined") mode = Mode.BYTE;
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (mode === Mode.MIXED) return dataTotalCodewordsBits;
      const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);
      switch (mode) {
        case Mode.NUMERIC:
          return Math.floor(usableBits / 10 * 3);
        case Mode.ALPHANUMERIC:
          return Math.floor(usableBits / 11 * 2);
        case Mode.KANJI:
          return Math.floor(usableBits / 13);
        case Mode.BYTE:
        default:
          return Math.floor(usableBits / 8);
      }
    };
    exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
      let seg;
      const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);
      if (Array.isArray(data)) {
        if (data.length > 1) {
          return getBestVersionForMixedData(data, ecl);
        }
        if (data.length === 0) {
          return 1;
        }
        seg = data[0];
      } else {
        seg = data;
      }
      return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
    };
    exports.getEncodedBits = function getEncodedBits(version) {
      if (!VersionCheck.isValid(version) || version < 7) {
        throw new Error("Invalid QR Code version");
      }
      let d = version << 12;
      while (Utils.getBCHDigit(d) - G18_BCH >= 0) {
        d ^= G18 << Utils.getBCHDigit(d) - G18_BCH;
      }
      return version << 12 | d;
    };
  }
});

// node_modules/qrcode/lib/core/format-info.js
var require_format_info = __commonJS({
  "node_modules/qrcode/lib/core/format-info.js"(exports) {
    "use strict";
    var Utils = require_utils();
    var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
    var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
    var G15_BCH = Utils.getBCHDigit(G15);
    exports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
      const data = errorCorrectionLevel.bit << 3 | mask;
      let d = data << 10;
      while (Utils.getBCHDigit(d) - G15_BCH >= 0) {
        d ^= G15 << Utils.getBCHDigit(d) - G15_BCH;
      }
      return (data << 10 | d) ^ G15_MASK;
    };
  }
});

// node_modules/qrcode/lib/core/numeric-data.js
var require_numeric_data = __commonJS({
  "node_modules/qrcode/lib/core/numeric-data.js"(exports, module) {
    "use strict";
    var Mode = require_mode();
    function NumericData(data) {
      this.mode = Mode.NUMERIC;
      this.data = data.toString();
    }
    NumericData.getBitsLength = function getBitsLength(length) {
      return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
    };
    NumericData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    NumericData.prototype.getBitsLength = function getBitsLength() {
      return NumericData.getBitsLength(this.data.length);
    };
    NumericData.prototype.write = function write(bitBuffer) {
      let i, group, value;
      for (i = 0; i + 3 <= this.data.length; i += 3) {
        group = this.data.substr(i, 3);
        value = parseInt(group, 10);
        bitBuffer.put(value, 10);
      }
      const remainingNum = this.data.length - i;
      if (remainingNum > 0) {
        group = this.data.substr(i);
        value = parseInt(group, 10);
        bitBuffer.put(value, remainingNum * 3 + 1);
      }
    };
    module.exports = NumericData;
  }
});

// node_modules/qrcode/lib/core/alphanumeric-data.js
var require_alphanumeric_data = __commonJS({
  "node_modules/qrcode/lib/core/alphanumeric-data.js"(exports, module) {
    "use strict";
    var Mode = require_mode();
    var ALPHA_NUM_CHARS = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      " ",
      "$",
      "%",
      "*",
      "+",
      "-",
      ".",
      "/",
      ":"
    ];
    function AlphanumericData(data) {
      this.mode = Mode.ALPHANUMERIC;
      this.data = data;
    }
    AlphanumericData.getBitsLength = function getBitsLength(length) {
      return 11 * Math.floor(length / 2) + 6 * (length % 2);
    };
    AlphanumericData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    AlphanumericData.prototype.getBitsLength = function getBitsLength() {
      return AlphanumericData.getBitsLength(this.data.length);
    };
    AlphanumericData.prototype.write = function write(bitBuffer) {
      let i;
      for (i = 0; i + 2 <= this.data.length; i += 2) {
        let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;
        value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);
        bitBuffer.put(value, 11);
      }
      if (this.data.length % 2) {
        bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
      }
    };
    module.exports = AlphanumericData;
  }
});

// node_modules/qrcode/lib/core/byte-data.js
var require_byte_data = __commonJS({
  "node_modules/qrcode/lib/core/byte-data.js"(exports, module) {
    "use strict";
    var Mode = require_mode();
    function ByteData(data) {
      this.mode = Mode.BYTE;
      if (typeof data === "string") {
        this.data = new TextEncoder().encode(data);
      } else {
        this.data = new Uint8Array(data);
      }
    }
    ByteData.getBitsLength = function getBitsLength(length) {
      return length * 8;
    };
    ByteData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    ByteData.prototype.getBitsLength = function getBitsLength() {
      return ByteData.getBitsLength(this.data.length);
    };
    ByteData.prototype.write = function(bitBuffer) {
      for (let i = 0, l = this.data.length; i < l; i++) {
        bitBuffer.put(this.data[i], 8);
      }
    };
    module.exports = ByteData;
  }
});

// node_modules/qrcode/lib/core/kanji-data.js
var require_kanji_data = __commonJS({
  "node_modules/qrcode/lib/core/kanji-data.js"(exports, module) {
    "use strict";
    var Mode = require_mode();
    var Utils = require_utils();
    function KanjiData(data) {
      this.mode = Mode.KANJI;
      this.data = data;
    }
    KanjiData.getBitsLength = function getBitsLength(length) {
      return length * 13;
    };
    KanjiData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    KanjiData.prototype.getBitsLength = function getBitsLength() {
      return KanjiData.getBitsLength(this.data.length);
    };
    KanjiData.prototype.write = function(bitBuffer) {
      let i;
      for (i = 0; i < this.data.length; i++) {
        let value = Utils.toSJIS(this.data[i]);
        if (value >= 33088 && value <= 40956) {
          value -= 33088;
        } else if (value >= 57408 && value <= 60351) {
          value -= 49472;
        } else {
          throw new Error(
            "Invalid SJIS character: " + this.data[i] + "\nMake sure your charset is UTF-8"
          );
        }
        value = (value >>> 8 & 255) * 192 + (value & 255);
        bitBuffer.put(value, 13);
      }
    };
    module.exports = KanjiData;
  }
});

// node_modules/dijkstrajs/dijkstra.js
var require_dijkstra = __commonJS({
  "node_modules/dijkstrajs/dijkstra.js"(exports, module) {
    "use strict";
    var dijkstra = {
      single_source_shortest_paths: function(graph, s, d) {
        var predecessors = {};
        var costs = {};
        costs[s] = 0;
        var open = dijkstra.PriorityQueue.make();
        open.push(s, 0);
        var closest, u, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
        while (!open.empty()) {
          closest = open.pop();
          u = closest.value;
          cost_of_s_to_u = closest.cost;
          adjacent_nodes = graph[u] || {};
          for (v in adjacent_nodes) {
            if (adjacent_nodes.hasOwnProperty(v)) {
              cost_of_e = adjacent_nodes[v];
              cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
              cost_of_s_to_v = costs[v];
              first_visit = typeof costs[v] === "undefined";
              if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
                costs[v] = cost_of_s_to_u_plus_cost_of_e;
                open.push(v, cost_of_s_to_u_plus_cost_of_e);
                predecessors[v] = u;
              }
            }
          }
        }
        if (typeof d !== "undefined" && typeof costs[d] === "undefined") {
          var msg = ["Could not find a path from ", s, " to ", d, "."].join("");
          throw new Error(msg);
        }
        return predecessors;
      },
      extract_shortest_path_from_predecessor_list: function(predecessors, d) {
        var nodes = [];
        var u = d;
        var predecessor;
        while (u) {
          nodes.push(u);
          predecessor = predecessors[u];
          u = predecessors[u];
        }
        nodes.reverse();
        return nodes;
      },
      find_path: function(graph, s, d) {
        var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
        return dijkstra.extract_shortest_path_from_predecessor_list(
          predecessors,
          d
        );
      },
      /**
       * A very naive priority queue implementation.
       */
      PriorityQueue: {
        make: function(opts) {
          var T = dijkstra.PriorityQueue, t = {}, key;
          opts = opts || {};
          for (key in T) {
            if (T.hasOwnProperty(key)) {
              t[key] = T[key];
            }
          }
          t.queue = [];
          t.sorter = opts.sorter || T.default_sorter;
          return t;
        },
        default_sorter: function(a, b) {
          return a.cost - b.cost;
        },
        /**
         * Add a new item to the queue and ensure the highest priority element
         * is at the front of the queue.
         */
        push: function(value, cost) {
          var item = { value, cost };
          this.queue.push(item);
          this.queue.sort(this.sorter);
        },
        /**
         * Return the highest priority element in the queue.
         */
        pop: function() {
          return this.queue.shift();
        },
        empty: function() {
          return this.queue.length === 0;
        }
      }
    };
    if (typeof module !== "undefined") {
      module.exports = dijkstra;
    }
  }
});

// node_modules/qrcode/lib/core/segments.js
var require_segments = __commonJS({
  "node_modules/qrcode/lib/core/segments.js"(exports) {
    "use strict";
    var Mode = require_mode();
    var NumericData = require_numeric_data();
    var AlphanumericData = require_alphanumeric_data();
    var ByteData = require_byte_data();
    var KanjiData = require_kanji_data();
    var Regex = require_regex();
    var Utils = require_utils();
    var dijkstra = require_dijkstra();
    function getStringByteLength(str) {
      return unescape(encodeURIComponent(str)).length;
    }
    function getSegments(regex, mode, str) {
      const segments = [];
      let result;
      while ((result = regex.exec(str)) !== null) {
        segments.push({
          data: result[0],
          index: result.index,
          mode,
          length: result[0].length
        });
      }
      return segments;
    }
    function getSegmentsFromString(dataStr) {
      const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
      const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
      let byteSegs;
      let kanjiSegs;
      if (Utils.isKanjiModeEnabled()) {
        byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
        kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
      } else {
        byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
        kanjiSegs = [];
      }
      const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
      return segs.sort(function(s1, s2) {
        return s1.index - s2.index;
      }).map(function(obj) {
        return {
          data: obj.data,
          mode: obj.mode,
          length: obj.length
        };
      });
    }
    function getSegmentBitsLength(length, mode) {
      switch (mode) {
        case Mode.NUMERIC:
          return NumericData.getBitsLength(length);
        case Mode.ALPHANUMERIC:
          return AlphanumericData.getBitsLength(length);
        case Mode.KANJI:
          return KanjiData.getBitsLength(length);
        case Mode.BYTE:
          return ByteData.getBitsLength(length);
      }
    }
    function mergeSegments(segs) {
      return segs.reduce(function(acc, curr) {
        const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
        if (prevSeg && prevSeg.mode === curr.mode) {
          acc[acc.length - 1].data += curr.data;
          return acc;
        }
        acc.push(curr);
        return acc;
      }, []);
    }
    function buildNodes(segs) {
      const nodes = [];
      for (let i = 0; i < segs.length; i++) {
        const seg = segs[i];
        switch (seg.mode) {
          case Mode.NUMERIC:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.ALPHANUMERIC, length: seg.length },
              { data: seg.data, mode: Mode.BYTE, length: seg.length }
            ]);
            break;
          case Mode.ALPHANUMERIC:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.BYTE, length: seg.length }
            ]);
            break;
          case Mode.KANJI:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
            ]);
            break;
          case Mode.BYTE:
            nodes.push([
              { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
            ]);
        }
      }
      return nodes;
    }
    function buildGraph(nodes, version) {
      const table = {};
      const graph = { start: {} };
      let prevNodeIds = ["start"];
      for (let i = 0; i < nodes.length; i++) {
        const nodeGroup = nodes[i];
        const currentNodeIds = [];
        for (let j = 0; j < nodeGroup.length; j++) {
          const node = nodeGroup[j];
          const key = "" + i + j;
          currentNodeIds.push(key);
          table[key] = { node, lastCount: 0 };
          graph[key] = {};
          for (let n = 0; n < prevNodeIds.length; n++) {
            const prevNodeId = prevNodeIds[n];
            if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
              graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
              table[prevNodeId].lastCount += node.length;
            } else {
              if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;
              graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version);
            }
          }
        }
        prevNodeIds = currentNodeIds;
      }
      for (let n = 0; n < prevNodeIds.length; n++) {
        graph[prevNodeIds[n]].end = 0;
      }
      return { map: graph, table };
    }
    function buildSingleSegment(data, modesHint) {
      let mode;
      const bestMode = Mode.getBestModeForData(data);
      mode = Mode.from(modesHint, bestMode);
      if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
        throw new Error('"' + data + '" cannot be encoded with mode ' + Mode.toString(mode) + ".\n Suggested mode is: " + Mode.toString(bestMode));
      }
      if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
        mode = Mode.BYTE;
      }
      switch (mode) {
        case Mode.NUMERIC:
          return new NumericData(data);
        case Mode.ALPHANUMERIC:
          return new AlphanumericData(data);
        case Mode.KANJI:
          return new KanjiData(data);
        case Mode.BYTE:
          return new ByteData(data);
      }
    }
    exports.fromArray = function fromArray(array) {
      return array.reduce(function(acc, seg) {
        if (typeof seg === "string") {
          acc.push(buildSingleSegment(seg, null));
        } else if (seg.data) {
          acc.push(buildSingleSegment(seg.data, seg.mode));
        }
        return acc;
      }, []);
    };
    exports.fromString = function fromString(data, version) {
      const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
      const nodes = buildNodes(segs);
      const graph = buildGraph(nodes, version);
      const path = dijkstra.find_path(graph.map, "start", "end");
      const optimizedSegs = [];
      for (let i = 1; i < path.length - 1; i++) {
        optimizedSegs.push(graph.table[path[i]].node);
      }
      return exports.fromArray(mergeSegments(optimizedSegs));
    };
    exports.rawSplit = function rawSplit(data) {
      return exports.fromArray(
        getSegmentsFromString(data, Utils.isKanjiModeEnabled())
      );
    };
  }
});

// node_modules/qrcode/lib/core/qrcode.js
var require_qrcode = __commonJS({
  "node_modules/qrcode/lib/core/qrcode.js"(exports) {
    "use strict";
    var Utils = require_utils();
    var ECLevel = require_error_correction_level();
    var BitBuffer = require_bit_buffer();
    var BitMatrix = require_bit_matrix();
    var AlignmentPattern = require_alignment_pattern();
    var FinderPattern = require_finder_pattern();
    var MaskPattern = require_mask_pattern();
    var ECCode = require_error_correction_code();
    var ReedSolomonEncoder = require_reed_solomon_encoder();
    var Version = require_version();
    var FormatInfo = require_format_info();
    var Mode = require_mode();
    var Segments = require_segments();
    function setupFinderPattern(matrix, version) {
      const size = matrix.size;
      const pos = FinderPattern.getPositions(version);
      for (let i = 0; i < pos.length; i++) {
        const row = pos[i][0];
        const col = pos[i][1];
        for (let r = -1; r <= 7; r++) {
          if (row + r <= -1 || size <= row + r) continue;
          for (let c = -1; c <= 7; c++) {
            if (col + c <= -1 || size <= col + c) continue;
            if (r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4) {
              matrix.set(row + r, col + c, true, true);
            } else {
              matrix.set(row + r, col + c, false, true);
            }
          }
        }
      }
    }
    function setupTimingPattern(matrix) {
      const size = matrix.size;
      for (let r = 8; r < size - 8; r++) {
        const value = r % 2 === 0;
        matrix.set(r, 6, value, true);
        matrix.set(6, r, value, true);
      }
    }
    function setupAlignmentPattern(matrix, version) {
      const pos = AlignmentPattern.getPositions(version);
      for (let i = 0; i < pos.length; i++) {
        const row = pos[i][0];
        const col = pos[i][1];
        for (let r = -2; r <= 2; r++) {
          for (let c = -2; c <= 2; c++) {
            if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) {
              matrix.set(row + r, col + c, true, true);
            } else {
              matrix.set(row + r, col + c, false, true);
            }
          }
        }
      }
    }
    function setupVersionInfo(matrix, version) {
      const size = matrix.size;
      const bits = Version.getEncodedBits(version);
      let row, col, mod;
      for (let i = 0; i < 18; i++) {
        row = Math.floor(i / 3);
        col = i % 3 + size - 8 - 3;
        mod = (bits >> i & 1) === 1;
        matrix.set(row, col, mod, true);
        matrix.set(col, row, mod, true);
      }
    }
    function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
      const size = matrix.size;
      const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
      let i, mod;
      for (i = 0; i < 15; i++) {
        mod = (bits >> i & 1) === 1;
        if (i < 6) {
          matrix.set(i, 8, mod, true);
        } else if (i < 8) {
          matrix.set(i + 1, 8, mod, true);
        } else {
          matrix.set(size - 15 + i, 8, mod, true);
        }
        if (i < 8) {
          matrix.set(8, size - i - 1, mod, true);
        } else if (i < 9) {
          matrix.set(8, 15 - i - 1 + 1, mod, true);
        } else {
          matrix.set(8, 15 - i - 1, mod, true);
        }
      }
      matrix.set(size - 8, 8, 1, true);
    }
    function setupData(matrix, data) {
      const size = matrix.size;
      let inc = -1;
      let row = size - 1;
      let bitIndex = 7;
      let byteIndex = 0;
      for (let col = size - 1; col > 0; col -= 2) {
        if (col === 6) col--;
        while (true) {
          for (let c = 0; c < 2; c++) {
            if (!matrix.isReserved(row, col - c)) {
              let dark = false;
              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) === 1;
              }
              matrix.set(row, col - c, dark);
              bitIndex--;
              if (bitIndex === -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }
          row += inc;
          if (row < 0 || size <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    }
    function createData(version, errorCorrectionLevel, segments) {
      const buffer = new BitBuffer();
      segments.forEach(function(data) {
        buffer.put(data.mode.bit, 4);
        buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version));
        data.write(buffer);
      });
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
        buffer.put(0, 4);
      }
      while (buffer.getLengthInBits() % 8 !== 0) {
        buffer.putBit(0);
      }
      const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
      for (let i = 0; i < remainingByte; i++) {
        buffer.put(i % 2 ? 17 : 236, 8);
      }
      return createCodewords(buffer, version, errorCorrectionLevel);
    }
    function createCodewords(bitBuffer, version, errorCorrectionLevel) {
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewords = totalCodewords - ecTotalCodewords;
      const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);
      const blocksInGroup2 = totalCodewords % ecTotalBlocks;
      const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
      const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
      const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
      const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;
      const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;
      const rs = new ReedSolomonEncoder(ecCount);
      let offset = 0;
      const dcData = new Array(ecTotalBlocks);
      const ecData = new Array(ecTotalBlocks);
      let maxDataSize = 0;
      const buffer = new Uint8Array(bitBuffer.buffer);
      for (let b = 0; b < ecTotalBlocks; b++) {
        const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
        dcData[b] = buffer.slice(offset, offset + dataSize);
        ecData[b] = rs.encode(dcData[b]);
        offset += dataSize;
        maxDataSize = Math.max(maxDataSize, dataSize);
      }
      const data = new Uint8Array(totalCodewords);
      let index = 0;
      let i, r;
      for (i = 0; i < maxDataSize; i++) {
        for (r = 0; r < ecTotalBlocks; r++) {
          if (i < dcData[r].length) {
            data[index++] = dcData[r][i];
          }
        }
      }
      for (i = 0; i < ecCount; i++) {
        for (r = 0; r < ecTotalBlocks; r++) {
          data[index++] = ecData[r][i];
        }
      }
      return data;
    }
    function createSymbol(data, version, errorCorrectionLevel, maskPattern) {
      let segments;
      if (Array.isArray(data)) {
        segments = Segments.fromArray(data);
      } else if (typeof data === "string") {
        let estimatedVersion = version;
        if (!estimatedVersion) {
          const rawSegments = Segments.rawSplit(data);
          estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
        }
        segments = Segments.fromString(data, estimatedVersion || 40);
      } else {
        throw new Error("Invalid data");
      }
      const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);
      if (!bestVersion) {
        throw new Error("The amount of data is too big to be stored in a QR Code");
      }
      if (!version) {
        version = bestVersion;
      } else if (version < bestVersion) {
        throw new Error(
          "\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + bestVersion + ".\n"
        );
      }
      const dataBits = createData(version, errorCorrectionLevel, segments);
      const moduleCount = Utils.getSymbolSize(version);
      const modules = new BitMatrix(moduleCount);
      setupFinderPattern(modules, version);
      setupTimingPattern(modules);
      setupAlignmentPattern(modules, version);
      setupFormatInfo(modules, errorCorrectionLevel, 0);
      if (version >= 7) {
        setupVersionInfo(modules, version);
      }
      setupData(modules, dataBits);
      if (isNaN(maskPattern)) {
        maskPattern = MaskPattern.getBestMask(
          modules,
          setupFormatInfo.bind(null, modules, errorCorrectionLevel)
        );
      }
      MaskPattern.applyMask(maskPattern, modules);
      setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
      return {
        modules,
        version,
        errorCorrectionLevel,
        maskPattern,
        segments
      };
    }
    exports.create = function create(data, options) {
      if (typeof data === "undefined" || data === "") {
        throw new Error("No input text");
      }
      let errorCorrectionLevel = ECLevel.M;
      let version;
      let mask;
      if (typeof options !== "undefined") {
        errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
        version = Version.from(options.version);
        mask = MaskPattern.from(options.maskPattern);
        if (options.toSJISFunc) {
          Utils.setToSJISFunction(options.toSJISFunc);
        }
      }
      return createSymbol(data, version, errorCorrectionLevel, mask);
    };
  }
});

// node_modules/qrcode/lib/renderer/utils.js
var require_utils2 = __commonJS({
  "node_modules/qrcode/lib/renderer/utils.js"(exports) {
    "use strict";
    function hex2rgba(hex) {
      if (typeof hex === "number") {
        hex = hex.toString();
      }
      if (typeof hex !== "string") {
        throw new Error("Color should be defined as hex string");
      }
      let hexCode = hex.slice().replace("#", "").split("");
      if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
        throw new Error("Invalid hex color: " + hex);
      }
      if (hexCode.length === 3 || hexCode.length === 4) {
        hexCode = Array.prototype.concat.apply([], hexCode.map(function(c) {
          return [c, c];
        }));
      }
      if (hexCode.length === 6) hexCode.push("F", "F");
      const hexValue = parseInt(hexCode.join(""), 16);
      return {
        r: hexValue >> 24 & 255,
        g: hexValue >> 16 & 255,
        b: hexValue >> 8 & 255,
        a: hexValue & 255,
        hex: "#" + hexCode.slice(0, 6).join("")
      };
    }
    exports.getOptions = function getOptions(options) {
      if (!options) options = {};
      if (!options.color) options.color = {};
      const margin = typeof options.margin === "undefined" || options.margin === null || options.margin < 0 ? 4 : options.margin;
      const width = options.width && options.width >= 21 ? options.width : void 0;
      const scale = options.scale || 4;
      return {
        width,
        scale: width ? 4 : scale,
        margin,
        color: {
          dark: hex2rgba(options.color.dark || "#000000ff"),
          light: hex2rgba(options.color.light || "#ffffffff")
        },
        type: options.type,
        rendererOpts: options.rendererOpts || {}
      };
    };
    exports.getScale = function getScale(qrSize, opts) {
      return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
    };
    exports.getImageWidth = function getImageWidth(qrSize, opts) {
      const scale = exports.getScale(qrSize, opts);
      return Math.floor((qrSize + opts.margin * 2) * scale);
    };
    exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
      const size = qr.modules.size;
      const data = qr.modules.data;
      const scale = exports.getScale(size, opts);
      const symbolSize = Math.floor((size + opts.margin * 2) * scale);
      const scaledMargin = opts.margin * scale;
      const palette = [opts.color.light, opts.color.dark];
      for (let i = 0; i < symbolSize; i++) {
        for (let j = 0; j < symbolSize; j++) {
          let posDst = (i * symbolSize + j) * 4;
          let pxColor = opts.color.light;
          if (i >= scaledMargin && j >= scaledMargin && i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
            const iSrc = Math.floor((i - scaledMargin) / scale);
            const jSrc = Math.floor((j - scaledMargin) / scale);
            pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
          }
          imgData[posDst++] = pxColor.r;
          imgData[posDst++] = pxColor.g;
          imgData[posDst++] = pxColor.b;
          imgData[posDst] = pxColor.a;
        }
      }
    };
  }
});

// node_modules/qrcode/lib/renderer/canvas.js
var require_canvas = __commonJS({
  "node_modules/qrcode/lib/renderer/canvas.js"(exports) {
    "use strict";
    var Utils = require_utils2();
    function clearCanvas(ctx, canvas, size) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!canvas.style) canvas.style = {};
      canvas.height = size;
      canvas.width = size;
      canvas.style.height = size + "px";
      canvas.style.width = size + "px";
    }
    function getCanvasElement() {
      try {
        return document.createElement("canvas");
      } catch (e) {
        throw new Error("You need to specify a canvas element");
      }
    }
    exports.render = function render(qrData, canvas, options) {
      let opts = options;
      let canvasEl = canvas;
      if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = void 0;
      }
      if (!canvas) {
        canvasEl = getCanvasElement();
      }
      opts = Utils.getOptions(opts);
      const size = Utils.getImageWidth(qrData.modules.size, opts);
      const ctx = canvasEl.getContext("2d");
      const image = ctx.createImageData(size, size);
      Utils.qrToImageData(image.data, qrData, opts);
      clearCanvas(ctx, canvasEl, size);
      ctx.putImageData(image, 0, 0);
      return canvasEl;
    };
    exports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
      let opts = options;
      if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = void 0;
      }
      if (!opts) opts = {};
      const canvasEl = exports.render(qrData, canvas, opts);
      const type = opts.type || "image/png";
      const rendererOpts = opts.rendererOpts || {};
      return canvasEl.toDataURL(type, rendererOpts.quality);
    };
  }
});

// node_modules/qrcode/lib/renderer/svg-tag.js
var require_svg_tag = __commonJS({
  "node_modules/qrcode/lib/renderer/svg-tag.js"(exports) {
    "use strict";
    var Utils = require_utils2();
    function getColorAttrib(color, attrib) {
      const alpha = color.a / 255;
      const str = attrib + '="' + color.hex + '"';
      return alpha < 1 ? str + " " + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
    }
    function svgCmd(cmd, x, y) {
      let str = cmd + x;
      if (typeof y !== "undefined") str += " " + y;
      return str;
    }
    function qrToPath(data, size, margin) {
      let path = "";
      let moveBy = 0;
      let newRow = false;
      let lineLength = 0;
      for (let i = 0; i < data.length; i++) {
        const col = Math.floor(i % size);
        const row = Math.floor(i / size);
        if (!col && !newRow) newRow = true;
        if (data[i]) {
          lineLength++;
          if (!(i > 0 && col > 0 && data[i - 1])) {
            path += newRow ? svgCmd("M", col + margin, 0.5 + row + margin) : svgCmd("m", moveBy, 0);
            moveBy = 0;
            newRow = false;
          }
          if (!(col + 1 < size && data[i + 1])) {
            path += svgCmd("h", lineLength);
            lineLength = 0;
          }
        } else {
          moveBy++;
        }
      }
      return path;
    }
    exports.render = function render(qrData, options, cb) {
      const opts = Utils.getOptions(options);
      const size = qrData.modules.size;
      const data = qrData.modules.data;
      const qrcodesize = size + opts.margin * 2;
      const bg = !opts.color.light.a ? "" : "<path " + getColorAttrib(opts.color.light, "fill") + ' d="M0 0h' + qrcodesize + "v" + qrcodesize + 'H0z"/>';
      const path = "<path " + getColorAttrib(opts.color.dark, "stroke") + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
      const viewBox = 'viewBox="0 0 ' + qrcodesize + " " + qrcodesize + '"';
      const width = !opts.width ? "" : 'width="' + opts.width + '" height="' + opts.width + '" ';
      const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + "</svg>\n";
      if (typeof cb === "function") {
        cb(null, svgTag);
      }
      return svgTag;
    };
  }
});

// node_modules/qrcode/lib/browser.js
var require_browser = __commonJS({
  "node_modules/qrcode/lib/browser.js"(exports) {
    "use strict";
    var canPromise = require_can_promise();
    var QRCode2 = require_qrcode();
    var CanvasRenderer = require_canvas();
    var SvgRenderer = require_svg_tag();
    function renderCanvas(renderFunc, canvas, text, opts, cb) {
      const args = [].slice.call(arguments, 1);
      const argsNum = args.length;
      const isLastArgCb = typeof args[argsNum - 1] === "function";
      if (!isLastArgCb && !canPromise()) {
        throw new Error("Callback required as last argument");
      }
      if (isLastArgCb) {
        if (argsNum < 2) {
          throw new Error("Too few arguments provided");
        }
        if (argsNum === 2) {
          cb = text;
          text = canvas;
          canvas = opts = void 0;
        } else if (argsNum === 3) {
          if (canvas.getContext && typeof cb === "undefined") {
            cb = opts;
            opts = void 0;
          } else {
            cb = opts;
            opts = text;
            text = canvas;
            canvas = void 0;
          }
        }
      } else {
        if (argsNum < 1) {
          throw new Error("Too few arguments provided");
        }
        if (argsNum === 1) {
          text = canvas;
          canvas = opts = void 0;
        } else if (argsNum === 2 && !canvas.getContext) {
          opts = text;
          text = canvas;
          canvas = void 0;
        }
        return new Promise(function(resolve, reject) {
          try {
            const data = QRCode2.create(text, opts);
            resolve(renderFunc(data, canvas, opts));
          } catch (e) {
            reject(e);
          }
        });
      }
      try {
        const data = QRCode2.create(text, opts);
        cb(null, renderFunc(data, canvas, opts));
      } catch (e) {
        cb(e);
      }
    }
    exports.create = QRCode2.create;
    exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
    exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);
    exports.toString = renderCanvas.bind(null, function(data, _, opts) {
      return SvgRenderer.render(data, opts);
    });
  }
});

// node_modules/@angular/material/fesm2022/slide-toggle.mjs
var _c0 = ["switch"];
var _c1 = ["*"];
function MatSlideToggle_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 13);
    \u0275\u0275element(2, "path", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "svg", 15);
    \u0275\u0275element(4, "path", 16);
    \u0275\u0275elementEnd()();
  }
}
var MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS = new InjectionToken("mat-slide-toggle-default-options", {
  providedIn: "root",
  factory: () => ({
    disableToggleValue: false,
    hideIcon: false,
    disabledInteractive: false
  })
});
var MatSlideToggleChange = class {
  source;
  checked;
  constructor(source, checked) {
    this.source = source;
    this.checked = checked;
  }
};
var MatSlideToggle = class _MatSlideToggle {
  _elementRef = inject(ElementRef);
  _focusMonitor = inject(FocusMonitor);
  _changeDetectorRef = inject(ChangeDetectorRef);
  defaults = inject(MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS);
  _onChange = (_) => {
  };
  _onTouched = () => {
  };
  _validatorOnChange = () => {
  };
  _uniqueId;
  _checked = false;
  _createChangeEvent(isChecked) {
    return new MatSlideToggleChange(this, isChecked);
  }
  _labelId;
  get buttonId() {
    return `${this.id || this._uniqueId}-button`;
  }
  _switchElement;
  focus() {
    this._switchElement.nativeElement.focus();
  }
  _noopAnimations = _animationsDisabled();
  _focused;
  name = null;
  id;
  labelPosition = "after";
  ariaLabel = null;
  ariaLabelledby = null;
  ariaDescribedby;
  required;
  color;
  disabled = false;
  disableRipple = false;
  tabIndex = 0;
  get checked() {
    return this._checked;
  }
  set checked(value) {
    this._checked = value;
    this._changeDetectorRef.markForCheck();
  }
  hideIcon;
  disabledInteractive;
  change = new EventEmitter();
  toggleChange = new EventEmitter();
  get inputId() {
    return `${this.id || this._uniqueId}-input`;
  }
  constructor() {
    inject(_CdkPrivateStyleLoader).load(_StructuralStylesLoader);
    const tabIndex = inject(new HostAttributeToken("tabindex"), {
      optional: true
    });
    const defaults = this.defaults;
    this.tabIndex = tabIndex == null ? 0 : parseInt(tabIndex) || 0;
    this.color = defaults.color || "accent";
    this.id = this._uniqueId = inject(_IdGenerator).getId("mat-mdc-slide-toggle-");
    this.hideIcon = defaults.hideIcon ?? false;
    this.disabledInteractive = defaults.disabledInteractive ?? false;
    this._labelId = this._uniqueId + "-label";
  }
  ngAfterContentInit() {
    this._focusMonitor.monitor(this._elementRef, true).subscribe((focusOrigin) => {
      if (focusOrigin === "keyboard" || focusOrigin === "program") {
        this._focused = true;
        this._changeDetectorRef.markForCheck();
      } else if (!focusOrigin) {
        Promise.resolve().then(() => {
          this._focused = false;
          this._onTouched();
          this._changeDetectorRef.markForCheck();
        });
      }
    });
  }
  ngOnChanges(changes) {
    if (changes["required"]) {
      this._validatorOnChange();
    }
  }
  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }
  writeValue(value) {
    this.checked = !!value;
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  validate(control) {
    return this.required && control.value !== true ? {
      "required": true
    } : null;
  }
  registerOnValidatorChange(fn) {
    this._validatorOnChange = fn;
  }
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
    this._changeDetectorRef.markForCheck();
  }
  toggle() {
    this.checked = !this.checked;
    this._onChange(this.checked);
  }
  _emitChangeEvent() {
    this._onChange(this.checked);
    this.change.emit(this._createChangeEvent(this.checked));
  }
  _handleClick() {
    if (!this.disabled) {
      this.toggleChange.emit();
      if (!this.defaults.disableToggleValue) {
        this.checked = !this.checked;
        this._onChange(this.checked);
        this.change.emit(new MatSlideToggleChange(this, this.checked));
      }
    }
  }
  _getAriaLabelledBy() {
    if (this.ariaLabelledby) {
      return this.ariaLabelledby;
    }
    return this.ariaLabel ? null : this._labelId;
  }
  static \u0275fac = function MatSlideToggle_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatSlideToggle)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatSlideToggle,
    selectors: [["mat-slide-toggle"]],
    viewQuery: function MatSlideToggle_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._switchElement = _t.first);
      }
    },
    hostAttrs: [1, "mat-mdc-slide-toggle"],
    hostVars: 13,
    hostBindings: function MatSlideToggle_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275domProperty("id", ctx.id);
        \u0275\u0275attribute("tabindex", null)("aria-label", null)("name", null)("aria-labelledby", null);
        \u0275\u0275classMap(ctx.color ? "mat-" + ctx.color : "");
        \u0275\u0275classProp("mat-mdc-slide-toggle-focused", ctx._focused)("mat-mdc-slide-toggle-checked", ctx.checked)("_mat-animation-noopable", ctx._noopAnimations);
      }
    },
    inputs: {
      name: "name",
      id: "id",
      labelPosition: "labelPosition",
      ariaLabel: [0, "aria-label", "ariaLabel"],
      ariaLabelledby: [0, "aria-labelledby", "ariaLabelledby"],
      ariaDescribedby: [0, "aria-describedby", "ariaDescribedby"],
      required: [2, "required", "required", booleanAttribute],
      color: "color",
      disabled: [2, "disabled", "disabled", booleanAttribute],
      disableRipple: [2, "disableRipple", "disableRipple", booleanAttribute],
      tabIndex: [2, "tabIndex", "tabIndex", (value) => value == null ? 0 : numberAttribute(value)],
      checked: [2, "checked", "checked", booleanAttribute],
      hideIcon: [2, "hideIcon", "hideIcon", booleanAttribute],
      disabledInteractive: [2, "disabledInteractive", "disabledInteractive", booleanAttribute]
    },
    outputs: {
      change: "change",
      toggleChange: "toggleChange"
    },
    exportAs: ["matSlideToggle"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _MatSlideToggle),
      multi: true
    }, {
      provide: NG_VALIDATORS,
      useExisting: _MatSlideToggle,
      multi: true
    }]), \u0275\u0275NgOnChangesFeature],
    ngContentSelectors: _c1,
    decls: 14,
    vars: 27,
    consts: [["switch", ""], ["mat-internal-form-field", "", 3, "labelPosition"], ["role", "switch", "type", "button", 1, "mdc-switch", 3, "click", "tabIndex", "disabled"], [1, "mat-mdc-slide-toggle-touch-target"], [1, "mdc-switch__track"], [1, "mdc-switch__handle-track"], [1, "mdc-switch__handle"], [1, "mdc-switch__shadow"], [1, "mdc-elevation-overlay"], [1, "mdc-switch__ripple"], ["mat-ripple", "", 1, "mat-mdc-slide-toggle-ripple", "mat-focus-indicator", 3, "matRippleTrigger", "matRippleDisabled", "matRippleCentered"], [1, "mdc-switch__icons"], [1, "mdc-label", 3, "click", "for"], ["viewBox", "0 0 24 24", "aria-hidden", "true", 1, "mdc-switch__icon", "mdc-switch__icon--on"], ["d", "M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"], ["viewBox", "0 0 24 24", "aria-hidden", "true", 1, "mdc-switch__icon", "mdc-switch__icon--off"], ["d", "M20 13H4v-2h16v2z"]],
    template: function MatSlideToggle_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275projectionDef();
        \u0275\u0275elementStart(0, "div", 1)(1, "button", 2, 0);
        \u0275\u0275listener("click", function MatSlideToggle_Template_button_click_1_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx._handleClick());
        });
        \u0275\u0275element(3, "div", 3)(4, "span", 4);
        \u0275\u0275elementStart(5, "span", 5)(6, "span", 6)(7, "span", 7);
        \u0275\u0275element(8, "span", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "span", 9);
        \u0275\u0275element(10, "span", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(11, MatSlideToggle_Conditional_11_Template, 5, 0, "span", 11);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(12, "label", 12);
        \u0275\u0275listener("click", function MatSlideToggle_Template_label_click_12_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView($event.stopPropagation());
        });
        \u0275\u0275projection(13);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        const switch_r2 = \u0275\u0275reference(2);
        \u0275\u0275property("labelPosition", ctx.labelPosition);
        \u0275\u0275advance();
        \u0275\u0275classProp("mdc-switch--selected", ctx.checked)("mdc-switch--unselected", !ctx.checked)("mdc-switch--checked", ctx.checked)("mdc-switch--disabled", ctx.disabled)("mat-mdc-slide-toggle-disabled-interactive", ctx.disabledInteractive);
        \u0275\u0275property("tabIndex", ctx.disabled && !ctx.disabledInteractive ? -1 : ctx.tabIndex)("disabled", ctx.disabled && !ctx.disabledInteractive);
        \u0275\u0275attribute("id", ctx.buttonId)("name", ctx.name)("aria-label", ctx.ariaLabel)("aria-labelledby", ctx._getAriaLabelledBy())("aria-describedby", ctx.ariaDescribedby)("aria-required", ctx.required || null)("aria-checked", ctx.checked)("aria-disabled", ctx.disabled && ctx.disabledInteractive ? "true" : null);
        \u0275\u0275advance(9);
        \u0275\u0275property("matRippleTrigger", switch_r2)("matRippleDisabled", ctx.disableRipple || ctx.disabled)("matRippleCentered", true);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.hideIcon ? 11 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("for", ctx.buttonId);
        \u0275\u0275attribute("id", ctx._labelId);
      }
    },
    dependencies: [MatRipple, _MatInternalFormField],
    styles: ['.mdc-switch{align-items:center;background:none;border:none;cursor:pointer;display:inline-flex;flex-shrink:0;margin:0;outline:none;overflow:visible;padding:0;position:relative;width:var(--mat-slide-toggle-track-width, 52px)}.mdc-switch.mdc-switch--disabled{cursor:default;pointer-events:none}.mdc-switch.mat-mdc-slide-toggle-disabled-interactive{pointer-events:auto}label:empty{display:none}.mdc-switch__track{overflow:hidden;position:relative;width:100%;height:var(--mat-slide-toggle-track-height, 32px);border-radius:var(--mat-slide-toggle-track-shape, var(--mat-sys-corner-full))}.mdc-switch--disabled.mdc-switch .mdc-switch__track{opacity:var(--mat-slide-toggle-disabled-track-opacity, 0.12)}.mdc-switch__track::before,.mdc-switch__track::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";height:100%;left:0;position:absolute;width:100%;border-width:var(--mat-slide-toggle-track-outline-width, 2px);border-color:var(--mat-slide-toggle-track-outline-color, var(--mat-sys-outline))}.mdc-switch--selected .mdc-switch__track::before,.mdc-switch--selected .mdc-switch__track::after{border-width:var(--mat-slide-toggle-selected-track-outline-width, 2px);border-color:var(--mat-slide-toggle-selected-track-outline-color, transparent)}.mdc-switch--disabled .mdc-switch__track::before,.mdc-switch--disabled .mdc-switch__track::after{border-width:var(--mat-slide-toggle-disabled-unselected-track-outline-width, 2px);border-color:var(--mat-slide-toggle-disabled-unselected-track-outline-color, var(--mat-sys-on-surface))}@media(forced-colors: active){.mdc-switch__track{border-color:currentColor}}.mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:translateX(0);background:var(--mat-slide-toggle-unselected-track-color, var(--mat-sys-surface-variant))}.mdc-switch--selected .mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch--selected .mdc-switch__track::before{transform:translateX(-100%)}.mdc-switch--selected .mdc-switch__track::before{opacity:var(--mat-slide-toggle-hidden-track-opacity, 0);transition:var(--mat-slide-toggle-hidden-track-transition, opacity 75ms)}.mdc-switch--unselected .mdc-switch__track::before{opacity:var(--mat-slide-toggle-visible-track-opacity, 1);transition:var(--mat-slide-toggle-visible-track-transition, opacity 75ms)}.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before{background:var(--mat-slide-toggle-unselected-hover-track-color, var(--mat-sys-surface-variant))}.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before{background:var(--mat-slide-toggle-unselected-focus-track-color, var(--mat-sys-surface-variant))}.mdc-switch:enabled:active .mdc-switch__track::before{background:var(--mat-slide-toggle-unselected-pressed-track-color, var(--mat-sys-surface-variant))}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::before,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::before,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::before,.mdc-switch.mdc-switch--disabled .mdc-switch__track::before{background:var(--mat-slide-toggle-disabled-unselected-track-color, var(--mat-sys-surface-variant))}.mdc-switch__track::after{transform:translateX(-100%);background:var(--mat-slide-toggle-selected-track-color, var(--mat-sys-primary))}[dir=rtl] .mdc-switch__track::after{transform:translateX(100%)}.mdc-switch--selected .mdc-switch__track::after{transform:translateX(0)}.mdc-switch--selected .mdc-switch__track::after{opacity:var(--mat-slide-toggle-visible-track-opacity, 1);transition:var(--mat-slide-toggle-visible-track-transition, opacity 75ms)}.mdc-switch--unselected .mdc-switch__track::after{opacity:var(--mat-slide-toggle-hidden-track-opacity, 0);transition:var(--mat-slide-toggle-hidden-track-transition, opacity 75ms)}.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after{background:var(--mat-slide-toggle-selected-hover-track-color, var(--mat-sys-primary))}.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after{background:var(--mat-slide-toggle-selected-focus-track-color, var(--mat-sys-primary))}.mdc-switch:enabled:active .mdc-switch__track::after{background:var(--mat-slide-toggle-selected-pressed-track-color, var(--mat-sys-primary))}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::after,.mdc-switch.mdc-switch--disabled .mdc-switch__track::after{background:var(--mat-slide-toggle-disabled-selected-track-color, var(--mat-sys-on-surface))}.mdc-switch__handle-track{height:100%;pointer-events:none;position:absolute;top:0;transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);left:0;right:auto;transform:translateX(0);width:calc(100% - var(--mat-slide-toggle-handle-width))}[dir=rtl] .mdc-switch__handle-track{left:auto;right:0}.mdc-switch--selected .mdc-switch__handle-track{transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track{transform:translateX(-100%)}.mdc-switch__handle{display:flex;pointer-events:auto;position:absolute;top:50%;transform:translateY(-50%);left:0;right:auto;transition:width 75ms cubic-bezier(0.4, 0, 0.2, 1),height 75ms cubic-bezier(0.4, 0, 0.2, 1),margin 75ms cubic-bezier(0.4, 0, 0.2, 1);width:var(--mat-slide-toggle-handle-width);height:var(--mat-slide-toggle-handle-height);border-radius:var(--mat-slide-toggle-handle-shape, var(--mat-sys-corner-full))}[dir=rtl] .mdc-switch__handle{left:auto;right:0}.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle{width:var(--mat-slide-toggle-unselected-handle-size, 16px);height:var(--mat-slide-toggle-unselected-handle-size, 16px);margin:var(--mat-slide-toggle-unselected-handle-horizontal-margin, 0 8px)}.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle:has(.mdc-switch__icons){margin:var(--mat-slide-toggle-unselected-with-icon-handle-horizontal-margin, 0 4px)}.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle{width:var(--mat-slide-toggle-selected-handle-size, 24px);height:var(--mat-slide-toggle-selected-handle-size, 24px);margin:var(--mat-slide-toggle-selected-handle-horizontal-margin, 0 24px)}.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle:has(.mdc-switch__icons){margin:var(--mat-slide-toggle-selected-with-icon-handle-horizontal-margin, 0 24px)}.mat-mdc-slide-toggle .mdc-switch__handle:has(.mdc-switch__icons){width:var(--mat-slide-toggle-with-icon-handle-size, 24px);height:var(--mat-slide-toggle-with-icon-handle-size, 24px)}.mat-mdc-slide-toggle .mdc-switch:active:not(.mdc-switch--disabled) .mdc-switch__handle{width:var(--mat-slide-toggle-pressed-handle-size, 28px);height:var(--mat-slide-toggle-pressed-handle-size, 28px)}.mat-mdc-slide-toggle .mdc-switch--selected:active:not(.mdc-switch--disabled) .mdc-switch__handle{margin:var(--mat-slide-toggle-selected-pressed-handle-horizontal-margin, 0 22px)}.mat-mdc-slide-toggle .mdc-switch--unselected:active:not(.mdc-switch--disabled) .mdc-switch__handle{margin:var(--mat-slide-toggle-unselected-pressed-handle-horizontal-margin, 0 2px)}.mdc-switch--disabled.mdc-switch--selected .mdc-switch__handle::after{opacity:var(--mat-slide-toggle-disabled-selected-handle-opacity, 1)}.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__handle::after{opacity:var(--mat-slide-toggle-disabled-unselected-handle-opacity, 0.38)}.mdc-switch__handle::before,.mdc-switch__handle::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";width:100%;height:100%;left:0;position:absolute;top:0;transition:background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1),border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);z-index:-1}@media(forced-colors: active){.mdc-switch__handle::before,.mdc-switch__handle::after{border-color:currentColor}}.mdc-switch--selected:enabled .mdc-switch__handle::after{background:var(--mat-slide-toggle-selected-handle-color, var(--mat-sys-on-primary))}.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mat-slide-toggle-selected-hover-handle-color, var(--mat-sys-primary-container))}.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mat-slide-toggle-selected-focus-handle-color, var(--mat-sys-primary-container))}.mdc-switch--selected:enabled:active .mdc-switch__handle::after{background:var(--mat-slide-toggle-selected-pressed-handle-color, var(--mat-sys-primary-container))}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:hover:not(:focus):not(:active) .mdc-switch__handle::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:focus:not(:active) .mdc-switch__handle::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:active .mdc-switch__handle::after,.mdc-switch--selected.mdc-switch--disabled .mdc-switch__handle::after{background:var(--mat-slide-toggle-disabled-selected-handle-color, var(--mat-sys-surface))}.mdc-switch--unselected:enabled .mdc-switch__handle::after{background:var(--mat-slide-toggle-unselected-handle-color, var(--mat-sys-outline))}.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mat-slide-toggle-unselected-hover-handle-color, var(--mat-sys-on-surface-variant))}.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mat-slide-toggle-unselected-focus-handle-color, var(--mat-sys-on-surface-variant))}.mdc-switch--unselected:enabled:active .mdc-switch__handle::after{background:var(--mat-slide-toggle-unselected-pressed-handle-color, var(--mat-sys-on-surface-variant))}.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__handle::after{background:var(--mat-slide-toggle-disabled-unselected-handle-color, var(--mat-sys-on-surface))}.mdc-switch__handle::before{background:var(--mat-slide-toggle-handle-surface-color)}.mdc-switch__shadow{border-radius:inherit;bottom:0;left:0;position:absolute;right:0;top:0}.mdc-switch:enabled .mdc-switch__shadow{box-shadow:var(--mat-slide-toggle-handle-elevation-shadow)}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__shadow,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__shadow,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__shadow,.mdc-switch.mdc-switch--disabled .mdc-switch__shadow{box-shadow:var(--mat-slide-toggle-disabled-handle-elevation-shadow)}.mdc-switch__ripple{left:50%;position:absolute;top:50%;transform:translate(-50%, -50%);z-index:-1;width:var(--mat-slide-toggle-state-layer-size, 40px);height:var(--mat-slide-toggle-state-layer-size, 40px)}.mdc-switch__ripple::after{content:"";opacity:0}.mdc-switch--disabled .mdc-switch__ripple::after{display:none}.mat-mdc-slide-toggle-disabled-interactive .mdc-switch__ripple::after{display:block}.mdc-switch:hover .mdc-switch__ripple::after{transition:75ms opacity cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:focus .mdc-switch__ripple::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:active .mdc-switch__ripple::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:hover:not(:focus) .mdc-switch__ripple::after,.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background:var(--mat-slide-toggle-unselected-hover-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mat-slide-toggle-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after{background:var(--mat-slide-toggle-unselected-focus-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mat-slide-toggle-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after{background:var(--mat-slide-toggle-unselected-pressed-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mat-slide-toggle-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));transition:opacity 75ms linear}.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background:var(--mat-slide-toggle-selected-hover-state-layer-color, var(--mat-sys-primary));opacity:var(--mat-slide-toggle-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after{background:var(--mat-slide-toggle-selected-focus-state-layer-color, var(--mat-sys-primary));opacity:var(--mat-slide-toggle-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mdc-switch--selected:enabled:active .mdc-switch__ripple::after{background:var(--mat-slide-toggle-selected-pressed-state-layer-color, var(--mat-sys-primary));opacity:var(--mat-slide-toggle-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));transition:opacity 75ms linear}.mdc-switch__icons{position:relative;height:100%;width:100%;z-index:1;transform:translateZ(0)}.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__icons{opacity:var(--mat-slide-toggle-disabled-unselected-icon-opacity, 0.38)}.mdc-switch--disabled.mdc-switch--selected .mdc-switch__icons{opacity:var(--mat-slide-toggle-disabled-selected-icon-opacity, 0.38)}.mdc-switch__icon{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0;opacity:0;transition:opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-switch--unselected .mdc-switch__icon{width:var(--mat-slide-toggle-unselected-icon-size, 16px);height:var(--mat-slide-toggle-unselected-icon-size, 16px);fill:var(--mat-slide-toggle-unselected-icon-color, var(--mat-sys-surface-variant))}.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__icon{fill:var(--mat-slide-toggle-disabled-unselected-icon-color, var(--mat-sys-surface-variant))}.mdc-switch--selected .mdc-switch__icon{width:var(--mat-slide-toggle-selected-icon-size, 16px);height:var(--mat-slide-toggle-selected-icon-size, 16px);fill:var(--mat-slide-toggle-selected-icon-color, var(--mat-sys-on-primary-container))}.mdc-switch--selected.mdc-switch--disabled .mdc-switch__icon{fill:var(--mat-slide-toggle-disabled-selected-icon-color, var(--mat-sys-on-surface))}.mdc-switch--selected .mdc-switch__icon--on,.mdc-switch--unselected .mdc-switch__icon--off{opacity:1;transition:opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle{-webkit-user-select:none;user-select:none;display:inline-block;-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,.mat-mdc-slide-toggle .mdc-switch__ripple::after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:50%;pointer-events:none}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty){transform:translateZ(0)}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-focus-indicator::before{content:""}.mat-mdc-slide-toggle .mat-internal-form-field{color:var(--mat-slide-toggle-label-text-color, var(--mat-sys-on-surface));font-family:var(--mat-slide-toggle-label-text-font, var(--mat-sys-body-medium-font));line-height:var(--mat-slide-toggle-label-text-line-height, var(--mat-sys-body-medium-line-height));font-size:var(--mat-slide-toggle-label-text-size, var(--mat-sys-body-medium-size));letter-spacing:var(--mat-slide-toggle-label-text-tracking, var(--mat-sys-body-medium-tracking));font-weight:var(--mat-slide-toggle-label-text-weight, var(--mat-sys-body-medium-weight))}.mat-mdc-slide-toggle .mat-ripple-element{opacity:.12}.mat-mdc-slide-toggle .mat-focus-indicator::before{border-radius:50%}.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after{transition:none}.mat-mdc-slide-toggle .mdc-switch:enabled+.mdc-label{cursor:pointer}.mat-mdc-slide-toggle .mdc-switch--disabled+label{color:var(--mat-slide-toggle-disabled-label-text-color, var(--mat-sys-on-surface))}.mat-mdc-slide-toggle-touch-target{position:absolute;top:50%;left:50%;height:var(--mat-slide-toggle-touch-target-size, 48px);width:100%;transform:translate(-50%, -50%);display:var(--mat-slide-toggle-touch-target-display, block)}[dir=rtl] .mat-mdc-slide-toggle-touch-target{left:auto;right:50%;transform:translate(50%, -50%)}\n'],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSlideToggle, [{
    type: Component,
    args: [{
      selector: "mat-slide-toggle",
      host: {
        "class": "mat-mdc-slide-toggle",
        "[id]": "id",
        "[attr.tabindex]": "null",
        "[attr.aria-label]": "null",
        "[attr.name]": "null",
        "[attr.aria-labelledby]": "null",
        "[class.mat-mdc-slide-toggle-focused]": "_focused",
        "[class.mat-mdc-slide-toggle-checked]": "checked",
        "[class._mat-animation-noopable]": "_noopAnimations",
        "[class]": 'color ? "mat-" + color : ""'
      },
      exportAs: "matSlideToggle",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => MatSlideToggle),
        multi: true
      }, {
        provide: NG_VALIDATORS,
        useExisting: MatSlideToggle,
        multi: true
      }],
      imports: [MatRipple, _MatInternalFormField],
      template: `<div mat-internal-form-field [labelPosition]="labelPosition">
  <button
    class="mdc-switch"
    role="switch"
    type="button"
    [class.mdc-switch--selected]="checked"
    [class.mdc-switch--unselected]="!checked"
    [class.mdc-switch--checked]="checked"
    [class.mdc-switch--disabled]="disabled"
    [class.mat-mdc-slide-toggle-disabled-interactive]="disabledInteractive"
    [tabIndex]="disabled && !disabledInteractive ? -1 : tabIndex"
    [disabled]="disabled && !disabledInteractive"
    [attr.id]="buttonId"
    [attr.name]="name"
    [attr.aria-label]="ariaLabel"
    [attr.aria-labelledby]="_getAriaLabelledBy()"
    [attr.aria-describedby]="ariaDescribedby"
    [attr.aria-required]="required || null"
    [attr.aria-checked]="checked"
    [attr.aria-disabled]="disabled && disabledInteractive ? 'true' : null"
    (click)="_handleClick()"
    #switch>
    <div class="mat-mdc-slide-toggle-touch-target"></div>
    <span class="mdc-switch__track"></span>
    <span class="mdc-switch__handle-track">
      <span class="mdc-switch__handle">
        <span class="mdc-switch__shadow">
          <span class="mdc-elevation-overlay"></span>
        </span>
        <span class="mdc-switch__ripple">
          <span class="mat-mdc-slide-toggle-ripple mat-focus-indicator" mat-ripple
            [matRippleTrigger]="switch"
            [matRippleDisabled]="disableRipple || disabled"
            [matRippleCentered]="true"></span>
        </span>
        @if (!hideIcon) {
          <span class="mdc-switch__icons">
            <svg
              class="mdc-switch__icon mdc-switch__icon--on"
              viewBox="0 0 24 24"
              aria-hidden="true">
              <path d="M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z" />
            </svg>
            <svg
              class="mdc-switch__icon mdc-switch__icon--off"
              viewBox="0 0 24 24"
              aria-hidden="true">
              <path d="M20 13H4v-2h16v2z" />
            </svg>
          </span>
        }
      </span>
    </span>
  </button>

  <!--
    Clicking on the label will trigger another click event from the button.
    Stop propagation here so other listeners further up in the DOM don't execute twice.
  -->
  <label class="mdc-label" [for]="buttonId" [attr.id]="_labelId" (click)="$event.stopPropagation()">
    <ng-content></ng-content>
  </label>
</div>
`,
      styles: ['.mdc-switch{align-items:center;background:none;border:none;cursor:pointer;display:inline-flex;flex-shrink:0;margin:0;outline:none;overflow:visible;padding:0;position:relative;width:var(--mat-slide-toggle-track-width, 52px)}.mdc-switch.mdc-switch--disabled{cursor:default;pointer-events:none}.mdc-switch.mat-mdc-slide-toggle-disabled-interactive{pointer-events:auto}label:empty{display:none}.mdc-switch__track{overflow:hidden;position:relative;width:100%;height:var(--mat-slide-toggle-track-height, 32px);border-radius:var(--mat-slide-toggle-track-shape, var(--mat-sys-corner-full))}.mdc-switch--disabled.mdc-switch .mdc-switch__track{opacity:var(--mat-slide-toggle-disabled-track-opacity, 0.12)}.mdc-switch__track::before,.mdc-switch__track::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";height:100%;left:0;position:absolute;width:100%;border-width:var(--mat-slide-toggle-track-outline-width, 2px);border-color:var(--mat-slide-toggle-track-outline-color, var(--mat-sys-outline))}.mdc-switch--selected .mdc-switch__track::before,.mdc-switch--selected .mdc-switch__track::after{border-width:var(--mat-slide-toggle-selected-track-outline-width, 2px);border-color:var(--mat-slide-toggle-selected-track-outline-color, transparent)}.mdc-switch--disabled .mdc-switch__track::before,.mdc-switch--disabled .mdc-switch__track::after{border-width:var(--mat-slide-toggle-disabled-unselected-track-outline-width, 2px);border-color:var(--mat-slide-toggle-disabled-unselected-track-outline-color, var(--mat-sys-on-surface))}@media(forced-colors: active){.mdc-switch__track{border-color:currentColor}}.mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:translateX(0);background:var(--mat-slide-toggle-unselected-track-color, var(--mat-sys-surface-variant))}.mdc-switch--selected .mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch--selected .mdc-switch__track::before{transform:translateX(-100%)}.mdc-switch--selected .mdc-switch__track::before{opacity:var(--mat-slide-toggle-hidden-track-opacity, 0);transition:var(--mat-slide-toggle-hidden-track-transition, opacity 75ms)}.mdc-switch--unselected .mdc-switch__track::before{opacity:var(--mat-slide-toggle-visible-track-opacity, 1);transition:var(--mat-slide-toggle-visible-track-transition, opacity 75ms)}.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before{background:var(--mat-slide-toggle-unselected-hover-track-color, var(--mat-sys-surface-variant))}.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before{background:var(--mat-slide-toggle-unselected-focus-track-color, var(--mat-sys-surface-variant))}.mdc-switch:enabled:active .mdc-switch__track::before{background:var(--mat-slide-toggle-unselected-pressed-track-color, var(--mat-sys-surface-variant))}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::before,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::before,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::before,.mdc-switch.mdc-switch--disabled .mdc-switch__track::before{background:var(--mat-slide-toggle-disabled-unselected-track-color, var(--mat-sys-surface-variant))}.mdc-switch__track::after{transform:translateX(-100%);background:var(--mat-slide-toggle-selected-track-color, var(--mat-sys-primary))}[dir=rtl] .mdc-switch__track::after{transform:translateX(100%)}.mdc-switch--selected .mdc-switch__track::after{transform:translateX(0)}.mdc-switch--selected .mdc-switch__track::after{opacity:var(--mat-slide-toggle-visible-track-opacity, 1);transition:var(--mat-slide-toggle-visible-track-transition, opacity 75ms)}.mdc-switch--unselected .mdc-switch__track::after{opacity:var(--mat-slide-toggle-hidden-track-opacity, 0);transition:var(--mat-slide-toggle-hidden-track-transition, opacity 75ms)}.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after{background:var(--mat-slide-toggle-selected-hover-track-color, var(--mat-sys-primary))}.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after{background:var(--mat-slide-toggle-selected-focus-track-color, var(--mat-sys-primary))}.mdc-switch:enabled:active .mdc-switch__track::after{background:var(--mat-slide-toggle-selected-pressed-track-color, var(--mat-sys-primary))}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::after,.mdc-switch.mdc-switch--disabled .mdc-switch__track::after{background:var(--mat-slide-toggle-disabled-selected-track-color, var(--mat-sys-on-surface))}.mdc-switch__handle-track{height:100%;pointer-events:none;position:absolute;top:0;transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);left:0;right:auto;transform:translateX(0);width:calc(100% - var(--mat-slide-toggle-handle-width))}[dir=rtl] .mdc-switch__handle-track{left:auto;right:0}.mdc-switch--selected .mdc-switch__handle-track{transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track{transform:translateX(-100%)}.mdc-switch__handle{display:flex;pointer-events:auto;position:absolute;top:50%;transform:translateY(-50%);left:0;right:auto;transition:width 75ms cubic-bezier(0.4, 0, 0.2, 1),height 75ms cubic-bezier(0.4, 0, 0.2, 1),margin 75ms cubic-bezier(0.4, 0, 0.2, 1);width:var(--mat-slide-toggle-handle-width);height:var(--mat-slide-toggle-handle-height);border-radius:var(--mat-slide-toggle-handle-shape, var(--mat-sys-corner-full))}[dir=rtl] .mdc-switch__handle{left:auto;right:0}.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle{width:var(--mat-slide-toggle-unselected-handle-size, 16px);height:var(--mat-slide-toggle-unselected-handle-size, 16px);margin:var(--mat-slide-toggle-unselected-handle-horizontal-margin, 0 8px)}.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle:has(.mdc-switch__icons){margin:var(--mat-slide-toggle-unselected-with-icon-handle-horizontal-margin, 0 4px)}.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle{width:var(--mat-slide-toggle-selected-handle-size, 24px);height:var(--mat-slide-toggle-selected-handle-size, 24px);margin:var(--mat-slide-toggle-selected-handle-horizontal-margin, 0 24px)}.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle:has(.mdc-switch__icons){margin:var(--mat-slide-toggle-selected-with-icon-handle-horizontal-margin, 0 24px)}.mat-mdc-slide-toggle .mdc-switch__handle:has(.mdc-switch__icons){width:var(--mat-slide-toggle-with-icon-handle-size, 24px);height:var(--mat-slide-toggle-with-icon-handle-size, 24px)}.mat-mdc-slide-toggle .mdc-switch:active:not(.mdc-switch--disabled) .mdc-switch__handle{width:var(--mat-slide-toggle-pressed-handle-size, 28px);height:var(--mat-slide-toggle-pressed-handle-size, 28px)}.mat-mdc-slide-toggle .mdc-switch--selected:active:not(.mdc-switch--disabled) .mdc-switch__handle{margin:var(--mat-slide-toggle-selected-pressed-handle-horizontal-margin, 0 22px)}.mat-mdc-slide-toggle .mdc-switch--unselected:active:not(.mdc-switch--disabled) .mdc-switch__handle{margin:var(--mat-slide-toggle-unselected-pressed-handle-horizontal-margin, 0 2px)}.mdc-switch--disabled.mdc-switch--selected .mdc-switch__handle::after{opacity:var(--mat-slide-toggle-disabled-selected-handle-opacity, 1)}.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__handle::after{opacity:var(--mat-slide-toggle-disabled-unselected-handle-opacity, 0.38)}.mdc-switch__handle::before,.mdc-switch__handle::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";width:100%;height:100%;left:0;position:absolute;top:0;transition:background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1),border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);z-index:-1}@media(forced-colors: active){.mdc-switch__handle::before,.mdc-switch__handle::after{border-color:currentColor}}.mdc-switch--selected:enabled .mdc-switch__handle::after{background:var(--mat-slide-toggle-selected-handle-color, var(--mat-sys-on-primary))}.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mat-slide-toggle-selected-hover-handle-color, var(--mat-sys-primary-container))}.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mat-slide-toggle-selected-focus-handle-color, var(--mat-sys-primary-container))}.mdc-switch--selected:enabled:active .mdc-switch__handle::after{background:var(--mat-slide-toggle-selected-pressed-handle-color, var(--mat-sys-primary-container))}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:hover:not(:focus):not(:active) .mdc-switch__handle::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:focus:not(:active) .mdc-switch__handle::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:active .mdc-switch__handle::after,.mdc-switch--selected.mdc-switch--disabled .mdc-switch__handle::after{background:var(--mat-slide-toggle-disabled-selected-handle-color, var(--mat-sys-surface))}.mdc-switch--unselected:enabled .mdc-switch__handle::after{background:var(--mat-slide-toggle-unselected-handle-color, var(--mat-sys-outline))}.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mat-slide-toggle-unselected-hover-handle-color, var(--mat-sys-on-surface-variant))}.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mat-slide-toggle-unselected-focus-handle-color, var(--mat-sys-on-surface-variant))}.mdc-switch--unselected:enabled:active .mdc-switch__handle::after{background:var(--mat-slide-toggle-unselected-pressed-handle-color, var(--mat-sys-on-surface-variant))}.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__handle::after{background:var(--mat-slide-toggle-disabled-unselected-handle-color, var(--mat-sys-on-surface))}.mdc-switch__handle::before{background:var(--mat-slide-toggle-handle-surface-color)}.mdc-switch__shadow{border-radius:inherit;bottom:0;left:0;position:absolute;right:0;top:0}.mdc-switch:enabled .mdc-switch__shadow{box-shadow:var(--mat-slide-toggle-handle-elevation-shadow)}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__shadow,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__shadow,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__shadow,.mdc-switch.mdc-switch--disabled .mdc-switch__shadow{box-shadow:var(--mat-slide-toggle-disabled-handle-elevation-shadow)}.mdc-switch__ripple{left:50%;position:absolute;top:50%;transform:translate(-50%, -50%);z-index:-1;width:var(--mat-slide-toggle-state-layer-size, 40px);height:var(--mat-slide-toggle-state-layer-size, 40px)}.mdc-switch__ripple::after{content:"";opacity:0}.mdc-switch--disabled .mdc-switch__ripple::after{display:none}.mat-mdc-slide-toggle-disabled-interactive .mdc-switch__ripple::after{display:block}.mdc-switch:hover .mdc-switch__ripple::after{transition:75ms opacity cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:focus .mdc-switch__ripple::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:active .mdc-switch__ripple::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:hover:not(:focus) .mdc-switch__ripple::after,.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background:var(--mat-slide-toggle-unselected-hover-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mat-slide-toggle-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after{background:var(--mat-slide-toggle-unselected-focus-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mat-slide-toggle-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after{background:var(--mat-slide-toggle-unselected-pressed-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mat-slide-toggle-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));transition:opacity 75ms linear}.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background:var(--mat-slide-toggle-selected-hover-state-layer-color, var(--mat-sys-primary));opacity:var(--mat-slide-toggle-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after{background:var(--mat-slide-toggle-selected-focus-state-layer-color, var(--mat-sys-primary));opacity:var(--mat-slide-toggle-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mdc-switch--selected:enabled:active .mdc-switch__ripple::after{background:var(--mat-slide-toggle-selected-pressed-state-layer-color, var(--mat-sys-primary));opacity:var(--mat-slide-toggle-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));transition:opacity 75ms linear}.mdc-switch__icons{position:relative;height:100%;width:100%;z-index:1;transform:translateZ(0)}.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__icons{opacity:var(--mat-slide-toggle-disabled-unselected-icon-opacity, 0.38)}.mdc-switch--disabled.mdc-switch--selected .mdc-switch__icons{opacity:var(--mat-slide-toggle-disabled-selected-icon-opacity, 0.38)}.mdc-switch__icon{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0;opacity:0;transition:opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-switch--unselected .mdc-switch__icon{width:var(--mat-slide-toggle-unselected-icon-size, 16px);height:var(--mat-slide-toggle-unselected-icon-size, 16px);fill:var(--mat-slide-toggle-unselected-icon-color, var(--mat-sys-surface-variant))}.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__icon{fill:var(--mat-slide-toggle-disabled-unselected-icon-color, var(--mat-sys-surface-variant))}.mdc-switch--selected .mdc-switch__icon{width:var(--mat-slide-toggle-selected-icon-size, 16px);height:var(--mat-slide-toggle-selected-icon-size, 16px);fill:var(--mat-slide-toggle-selected-icon-color, var(--mat-sys-on-primary-container))}.mdc-switch--selected.mdc-switch--disabled .mdc-switch__icon{fill:var(--mat-slide-toggle-disabled-selected-icon-color, var(--mat-sys-on-surface))}.mdc-switch--selected .mdc-switch__icon--on,.mdc-switch--unselected .mdc-switch__icon--off{opacity:1;transition:opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle{-webkit-user-select:none;user-select:none;display:inline-block;-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,.mat-mdc-slide-toggle .mdc-switch__ripple::after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:50%;pointer-events:none}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty){transform:translateZ(0)}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-focus-indicator::before{content:""}.mat-mdc-slide-toggle .mat-internal-form-field{color:var(--mat-slide-toggle-label-text-color, var(--mat-sys-on-surface));font-family:var(--mat-slide-toggle-label-text-font, var(--mat-sys-body-medium-font));line-height:var(--mat-slide-toggle-label-text-line-height, var(--mat-sys-body-medium-line-height));font-size:var(--mat-slide-toggle-label-text-size, var(--mat-sys-body-medium-size));letter-spacing:var(--mat-slide-toggle-label-text-tracking, var(--mat-sys-body-medium-tracking));font-weight:var(--mat-slide-toggle-label-text-weight, var(--mat-sys-body-medium-weight))}.mat-mdc-slide-toggle .mat-ripple-element{opacity:.12}.mat-mdc-slide-toggle .mat-focus-indicator::before{border-radius:50%}.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after{transition:none}.mat-mdc-slide-toggle .mdc-switch:enabled+.mdc-label{cursor:pointer}.mat-mdc-slide-toggle .mdc-switch--disabled+label{color:var(--mat-slide-toggle-disabled-label-text-color, var(--mat-sys-on-surface))}.mat-mdc-slide-toggle-touch-target{position:absolute;top:50%;left:50%;height:var(--mat-slide-toggle-touch-target-size, 48px);width:100%;transform:translate(-50%, -50%);display:var(--mat-slide-toggle-touch-target-display, block)}[dir=rtl] .mat-mdc-slide-toggle-touch-target{left:auto;right:50%;transform:translate(50%, -50%)}\n']
    }]
  }], () => [], {
    _switchElement: [{
      type: ViewChild,
      args: ["switch"]
    }],
    name: [{
      type: Input
    }],
    id: [{
      type: Input
    }],
    labelPosition: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input,
      args: ["aria-label"]
    }],
    ariaLabelledby: [{
      type: Input,
      args: ["aria-labelledby"]
    }],
    ariaDescribedby: [{
      type: Input,
      args: ["aria-describedby"]
    }],
    required: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    color: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disableRipple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    tabIndex: [{
      type: Input,
      args: [{
        transform: (value) => value == null ? 0 : numberAttribute(value)
      }]
    }],
    checked: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    hideIcon: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disabledInteractive: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    change: [{
      type: Output
    }],
    toggleChange: [{
      type: Output
    }]
  });
})();
var MatSlideToggleModule = class _MatSlideToggleModule {
  static \u0275fac = function MatSlideToggleModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatSlideToggleModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatSlideToggleModule,
    imports: [MatSlideToggle],
    exports: [MatSlideToggle, BidiModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [MatSlideToggle, BidiModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSlideToggleModule, [{
    type: NgModule,
    args: [{
      imports: [MatSlideToggle],
      exports: [MatSlideToggle, BidiModule]
    }]
  }], null, null);
})();

// src/app/dialogs/SoldierSelect-dialog.component.ts
function SoldierSelectDialogComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 11);
    \u0275\u0275listener("click", function SoldierSelectDialogComponent_Conditional_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearSearch());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "close");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275attribute("aria-label", "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u0438 \u043F\u043E\u0448\u0443\u043A");
  }
}
function SoldierSelectDialogComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "mat-icon", 12);
    \u0275\u0275text(2, "refresh");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...");
    \u0275\u0275elementEnd()();
  }
}
function SoldierSelectDialogComponent_Conditional_19_th_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, "\u0417\u0432\u0430\u043D\u043D\u044F");
    \u0275\u0275elementEnd();
  }
}
function SoldierSelectDialogComponent_Conditional_19_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r3.rankShortValue);
  }
}
function SoldierSelectDialogComponent_Conditional_19_th_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, "\u041F\u0406\u0411");
    \u0275\u0275elementEnd();
  }
}
function SoldierSelectDialogComponent_Conditional_19_td_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formatFIO(item_r4));
  }
}
function SoldierSelectDialogComponent_Conditional_19_th_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, "\u041F\u043E\u0437\u0438\u0432\u043D\u0438\u0439");
    \u0275\u0275elementEnd();
  }
}
function SoldierSelectDialogComponent_Conditional_19_td_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r5.nickName);
  }
}
function SoldierSelectDialogComponent_Conditional_19_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, "\u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B");
    \u0275\u0275elementEnd();
  }
}
function SoldierSelectDialogComponent_Conditional_19_td_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r6.unitShortName);
  }
}
function SoldierSelectDialogComponent_Conditional_19_th_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, "\u041F\u043E\u0441\u0430\u0434\u0430");
    \u0275\u0275elementEnd();
  }
}
function SoldierSelectDialogComponent_Conditional_19_td_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r7.positionValue);
  }
}
function SoldierSelectDialogComponent_Conditional_19_tr_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 26);
  }
}
function SoldierSelectDialogComponent_Conditional_19_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 27);
    \u0275\u0275listener("click", function SoldierSelectDialogComponent_Conditional_19_tr_17_Template_tr_click_0_listener() {
      const row_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectSoldier(row_r9));
    });
    \u0275\u0275elementEnd();
  }
}
function SoldierSelectDialogComponent_Conditional_19_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "mat-icon");
    \u0275\u0275text(2, "people_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0412\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u043E\u0441\u043B\u0443\u0436\u0431\u043E\u0432\u0446\u0456\u0432 \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E");
    \u0275\u0275elementEnd()();
  }
}
function SoldierSelectDialogComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 13);
    \u0275\u0275elementContainerStart(1, 14);
    \u0275\u0275template(2, SoldierSelectDialogComponent_Conditional_19_th_2_Template, 2, 0, "th", 15)(3, SoldierSelectDialogComponent_Conditional_19_td_3_Template, 2, 1, "td", 16);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(4, 17);
    \u0275\u0275template(5, SoldierSelectDialogComponent_Conditional_19_th_5_Template, 2, 0, "th", 15)(6, SoldierSelectDialogComponent_Conditional_19_td_6_Template, 2, 1, "td", 16);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(7, 18);
    \u0275\u0275template(8, SoldierSelectDialogComponent_Conditional_19_th_8_Template, 2, 0, "th", 15)(9, SoldierSelectDialogComponent_Conditional_19_td_9_Template, 2, 1, "td", 16);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(10, 19);
    \u0275\u0275template(11, SoldierSelectDialogComponent_Conditional_19_th_11_Template, 2, 0, "th", 15)(12, SoldierSelectDialogComponent_Conditional_19_td_12_Template, 2, 1, "td", 16);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(13, 20);
    \u0275\u0275template(14, SoldierSelectDialogComponent_Conditional_19_th_14_Template, 2, 0, "th", 15)(15, SoldierSelectDialogComponent_Conditional_19_td_15_Template, 2, 1, "td", 16);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(16, SoldierSelectDialogComponent_Conditional_19_tr_16_Template, 1, 0, "tr", 21)(17, SoldierSelectDialogComponent_Conditional_19_tr_17_Template, 1, 0, "tr", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(18, SoldierSelectDialogComponent_Conditional_19_Conditional_18_Template, 5, 0, "div", 23);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("dataSource", ctx_r1.dataSource);
    \u0275\u0275advance(16);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.displayedColumns)("matHeaderRowDefSticky", true);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.items().length === 0 ? 18 : -1);
  }
}
var SoldierSelectDialogComponent = class _SoldierSelectDialogComponent {
  dialogRef;
  data;
  soldierService = inject(SoldierService);
  snackBar = inject(MatSnackBar);
  items = signal([], ...ngDevMode ? [{ debugName: "items" }] : []);
  dataSource = new MatTableDataSource([]);
  displayedColumns = ["rankShortValue", "fio", "nickName", "unitShortName", "positionValue"];
  isLoading = signal(false, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
  searchTerm = signal("", ...ngDevMode ? [{ debugName: "searchTerm" }] : []);
  dialogTitle = signal("\u0412\u0438\u0431\u0456\u0440 \u0432\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u043E\u0441\u043B\u0443\u0436\u0431\u043E\u0432\u0446\u044F", ...ngDevMode ? [{ debugName: "dialogTitle" }] : []);
  searchTimeout;
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.data = data;
    if (data?.title) {
      this.dialogTitle.set(data.title);
    }
    this.reload();
  }
  reload() {
    this.isLoading.set(true);
    const search = this.searchTerm() || void 0;
    const unitId = this.data?.unitId;
    this.soldierService.getAll(search, unitId).subscribe({
      next: (soldiers) => {
        this.items.set(soldiers);
        this.dataSource.data = soldiers;
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0432\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u043E\u0441\u043B\u0443\u0436\u0431\u043E\u0432\u0446\u0456\u0432:", error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0432\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u043E\u0441\u043B\u0443\u0436\u0431\u043E\u0432\u0446\u0456\u0432");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
        this.isLoading.set(false);
      }
    });
  }
  onSearchChange() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = window.setTimeout(() => {
      this.reload();
    }, 500);
  }
  clearSearch() {
    this.searchTerm.set("");
    this.reload();
  }
  selectSoldier(soldier) {
    this.dialogRef.close(soldier);
  }
  onCancel() {
    this.dialogRef.close();
  }
  formatFIO(item) {
    return SoldierUtils.formatFIO(item.firstName, item.midleName, item.lastName);
  }
  static \u0275fac = function SoldierSelectDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SoldierSelectDialogComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SoldierSelectDialogComponent, selectors: [["soldier-select-dialog"]], decls: 23, vars: 5, consts: [["mat-dialog-title", ""], [1, "dialog-content"], [1, "action-panel"], ["appearance", "outline", 1, "search-field"], ["matInput", "", "placeholder", "\u041F\u0440\u0456\u0437\u0432\u0438\u0449\u0435, \u0456\u043C'\u044F \u0430\u0431\u043E \u043F\u043E\u0437\u0438\u0432\u043D\u0438\u0439", 3, "ngModelChange", "ngModel"], ["mat-icon-button", "", "matSuffix", ""], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "table-container"], [1, "loading-container"], ["align", "end"], ["mat-button", "", 3, "click"], ["mat-icon-button", "", "matSuffix", "", 3, "click"], [1, "loading-spinner"], ["mat-table", "", "matSort", "", 1, "selection-table", 3, "dataSource"], ["matColumnDef", "rankShortValue"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "fio"], ["matColumnDef", "nickName"], ["matColumnDef", "unitShortName"], ["matColumnDef", "positionValue"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["mat-row", "", "class", "selectable-row", 3, "click", 4, "matRowDef", "matRowDefColumns"], [1, "no-data"], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], ["mat-header-row", ""], ["mat-row", "", 1, "selectable-row", 3, "click"]], template: function SoldierSelectDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "h2", 0);
      \u0275\u0275text(1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "mat-dialog-content")(3, "div", 1)(4, "div", 2)(5, "mat-form-field", 3)(6, "mat-label");
      \u0275\u0275text(7, "\u041F\u043E\u0448\u0443\u043A");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "input", 4);
      \u0275\u0275twoWayListener("ngModelChange", function SoldierSelectDialogComponent_Template_input_ngModelChange_8_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function SoldierSelectDialogComponent_Template_input_ngModelChange_8_listener() {
        return ctx.onSearchChange();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "button", 5)(10, "mat-icon");
      \u0275\u0275text(11, "search");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(12, SoldierSelectDialogComponent_Conditional_12_Template, 3, 1, "button", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "button", 6);
      \u0275\u0275listener("click", function SoldierSelectDialogComponent_Template_button_click_13_listener() {
        return ctx.reload();
      });
      \u0275\u0275elementStart(14, "mat-icon");
      \u0275\u0275text(15, "refresh");
      \u0275\u0275elementEnd();
      \u0275\u0275text(16, " \u041E\u043D\u043E\u0432\u0438\u0442\u0438 ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 7);
      \u0275\u0275conditionalCreate(18, SoldierSelectDialogComponent_Conditional_18_Template, 5, 0, "div", 8)(19, SoldierSelectDialogComponent_Conditional_19_Template, 19, 5);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(20, "mat-dialog-actions", 9)(21, "button", 10);
      \u0275\u0275listener("click", function SoldierSelectDialogComponent_Template_button_click_21_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275text(22, "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.dialogTitle());
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-label", "\u041F\u043E\u0448\u0443\u043A");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.searchTerm() ? 12 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.isLoading() ? 18 : 19);
    }
  }, dependencies: [
    CommonModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatIconModule,
    MatIcon,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatSuffix,
    MatInputModule,
    MatInput,
    MatTooltipModule,
    MatTableModule,
    MatTable,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatColumnDef,
    MatCellDef,
    MatRowDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatSortModule,
    MatSort,
    MatSortHeader,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.dialog-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 70vh;\n  max-height: 70vh;\n  min-height: 400px;\n}\n.action-panel[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  margin-bottom: 16px;\n  padding: 8px;\n  background-color: #fafafa;\n  border-radius: 4px;\n}\n.search-field[_ngcontent-%COMP%] {\n  flex: 1;\n  max-width: 400px;\n}\n.table-container[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow: auto;\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n.selection-table[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.selectable-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.selectable-row[_ngcontent-%COMP%]:hover {\n  background-color: #f5f5f5;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  gap: 16px;\n}\n.loading-container[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  color: #1976d2;\n}\n.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #666;\n}\n.no-data[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  color: #666;\n}\n.no-data[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  color: #ccc;\n  margin-bottom: 16px;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=SoldierSelect-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SoldierSelectDialogComponent, [{
    type: Component,
    args: [{ selector: "soldier-select-dialog", standalone: true, imports: [
      CommonModule,
      MatDialogModule,
      MatButtonModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      MatTooltipModule,
      MatTableModule,
      MatSortModule,
      FormsModule
    ], template: `
    <h2 mat-dialog-title>{{ dialogTitle() }}</h2>
    <mat-dialog-content>
      <div class="dialog-content">
        <!-- \u041F\u0430\u043D\u0435\u043B\u044C \u043F\u043E\u0448\u0443\u043A\u0443 -->
        <div class="action-panel">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>\u041F\u043E\u0448\u0443\u043A</mat-label>
            <input
              matInput
              [(ngModel)]="searchTerm"
              (ngModelChange)="onSearchChange()"
              placeholder="\u041F\u0440\u0456\u0437\u0432\u0438\u0449\u0435, \u0456\u043C'\u044F \u0430\u0431\u043E \u043F\u043E\u0437\u0438\u0432\u043D\u0438\u0439"
            />
            <button mat-icon-button matSuffix [attr.aria-label]="'\u041F\u043E\u0448\u0443\u043A'">
              <mat-icon>search</mat-icon>
            </button>
            @if (searchTerm()) {
              <button
                mat-icon-button
                matSuffix
                (click)="clearSearch()"
                [attr.aria-label]="'\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u0438 \u043F\u043E\u0448\u0443\u043A'"
              >
                <mat-icon>close</mat-icon>
              </button>
            }
          </mat-form-field>

          <button mat-raised-button color="primary" (click)="reload()">
            <mat-icon>refresh</mat-icon>
            \u041E\u043D\u043E\u0432\u0438\u0442\u0438
          </button>
        </div>

        <!-- \u0422\u0430\u0431\u043B\u0438\u0446\u044F -->
        <div class="table-container">
          @if (isLoading()) {
            <div class="loading-container">
              <mat-icon class="loading-spinner">refresh</mat-icon>
              <p>\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...</p>
            </div>
          } @else {
            <table mat-table [dataSource]="dataSource" matSort class="selection-table">
              <ng-container matColumnDef="rankShortValue">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>\u0417\u0432\u0430\u043D\u043D\u044F</th>
                <td mat-cell *matCellDef="let item">{{ item.rankShortValue }}</td>
              </ng-container>

              <ng-container matColumnDef="fio">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041F\u0406\u0411</th>
                <td mat-cell *matCellDef="let item">{{ formatFIO(item) }}</td>
              </ng-container>

              <ng-container matColumnDef="nickName">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041F\u043E\u0437\u0438\u0432\u043D\u0438\u0439</th>
                <td mat-cell *matCellDef="let item">{{ item.nickName }}</td>
              </ng-container>

              <ng-container matColumnDef="unitShortName">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B</th>
                <td mat-cell *matCellDef="let item">{{ item.unitShortName }}</td>
              </ng-container>

              <ng-container matColumnDef="positionValue">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041F\u043E\u0441\u0430\u0434\u0430</th>
                <td mat-cell *matCellDef="let item">{{ item.positionValue }}</td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
              <tr
                mat-row
                *matRowDef="let row; columns: displayedColumns"
                (click)="selectSoldier(row)"
                class="selectable-row"
              ></tr>
            </table>

            @if (items().length === 0) {
              <div class="no-data">
                <mat-icon>people_outline</mat-icon>
                <p>\u0412\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u043E\u0441\u043B\u0443\u0436\u0431\u043E\u0432\u0446\u0456\u0432 \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E</p>
              </div>
            }
          }
        </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438</button>
    </mat-dialog-actions>
  `, styles: ["/* angular:styles/component:css;f5713d9374928af95e30e916d51c66949655b97fe628cd28149f0037bdebb20b;/home/havrok/projects/work/411/s5/s5app/Menu/S5Server/Front/src/app/dialogs/SoldierSelect-dialog.component.ts */\n:host {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.dialog-content {\n  display: flex;\n  flex-direction: column;\n  height: 70vh;\n  max-height: 70vh;\n  min-height: 400px;\n}\n.action-panel {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  margin-bottom: 16px;\n  padding: 8px;\n  background-color: #fafafa;\n  border-radius: 4px;\n}\n.search-field {\n  flex: 1;\n  max-width: 400px;\n}\n.table-container {\n  flex: 1;\n  overflow: auto;\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n.selection-table {\n  width: 100%;\n}\n.selectable-row {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.selectable-row:hover {\n  background-color: #f5f5f5;\n}\n.loading-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  gap: 16px;\n}\n.loading-container .loading-spinner {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  animation: spin 1s linear infinite;\n  color: #1976d2;\n}\n.loading-container p {\n  color: #666;\n}\n.no-data {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  color: #666;\n}\n.no-data mat-icon {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  color: #ccc;\n  margin-bottom: 16px;\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=SoldierSelect-dialog.component.css.map */\n"] }]
  }], () => [{ type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SoldierSelectDialogComponent, { className: "SoldierSelectDialogComponent", filePath: "app/dialogs/SoldierSelect-dialog.component.ts", lineNumber: 232 });
})();

// src/Login/dialogs/CreateUserDialog.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function CreateUserDialogComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 6);
  }
}
function CreateUserDialogComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 7);
    \u0275\u0275text(1, "error");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("matTooltip", ctx_r0.userNameError);
  }
}
function CreateUserDialogComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 8);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function CreateUserDialogComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.userNameError);
  }
}
function CreateUserDialogComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 6);
  }
}
function CreateUserDialogComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 7);
    \u0275\u0275text(1, "error");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("matTooltip", ctx_r0.passwordErrors.join("\n"));
  }
}
function CreateUserDialogComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 11);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function CreateUserDialogComponent_Conditional_29_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const err_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(err_r2);
  }
}
function CreateUserDialogComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275repeaterCreate(1, CreateUserDialogComponent_Conditional_29_For_2_Template, 2, 1, "p", 14, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.passwordErrors);
  }
}
function CreateUserDialogComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.passwordHints);
  }
}
function CreateUserDialogComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 14);
    \u0275\u0275text(1, "\u041F\u0430\u0440\u043E\u043B\u0456 \u043D\u0435 \u0437\u0431\u0456\u0433\u0430\u044E\u0442\u044C\u0441\u044F");
    \u0275\u0275elementEnd();
  }
}
function CreateUserDialogComponent_For_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r3 = ctx.$implicit;
    \u0275\u0275property("value", role_r3.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(role_r3.value);
  }
}
var CreateUserDialogComponent = class _CreateUserDialogComponent {
  dialogRef = inject(MatDialogRef);
  dialog = inject(MatDialog);
  usersService = inject(UsersService);
  data = inject(MAT_DIALOG_DATA);
  model = {
    userName: "",
    password: ""
  };
  selectedSoldier = null;
  selectedRole = "";
  confirmPassword = "";
  // Validation state
  checkingUserName = false;
  userNameAvailable = false;
  userNameError = "";
  checkingPassword = false;
  passwordValid = false;
  passwordErrors = [];
  passwordHints = "";
  userNameSubject = new Subject();
  passwordSubject = new Subject();
  destroy$ = new Subject();
  ngOnInit() {
    this.usersService.getPasswordRequirements().subscribe((req) => {
      this.passwordHints = this.buildRequirementsHint(req);
    });
    this.userNameSubject.pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe((value) => {
      if (!value || value.length < 3) {
        this.checkingUserName = false;
        this.userNameAvailable = false;
        this.userNameError = value ? "\u041C\u0456\u043D\u0456\u043C\u0443\u043C 3 \u0441\u0438\u043C\u0432\u043E\u043B\u0438" : "";
        return;
      }
      this.checkingUserName = true;
      this.usersService.checkUsername(value).subscribe({
        next: (res) => {
          this.checkingUserName = false;
          this.userNameAvailable = res.isAvailable;
          this.userNameError = res.isAvailable ? "" : res.message;
        },
        error: () => {
          this.checkingUserName = false;
          this.userNameAvailable = true;
          this.userNameError = "";
        }
      });
    });
    this.passwordSubject.pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe((value) => {
      if (!value) {
        this.checkingPassword = false;
        this.passwordValid = false;
        this.passwordErrors = [];
        return;
      }
      this.checkingPassword = true;
      this.usersService.validatePassword(value, this.model.userName).subscribe({
        next: (res) => {
          this.checkingPassword = false;
          this.passwordValid = res.isValid;
          this.passwordErrors = res.errors ?? [];
        },
        error: () => {
          this.checkingPassword = false;
          this.passwordValid = true;
          this.passwordErrors = [];
        }
      });
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onUserNameChange(value) {
    this.userNameAvailable = false;
    this.userNameError = "";
    this.userNameSubject.next(value);
  }
  onPasswordChange(value) {
    this.passwordValid = false;
    this.passwordErrors = [];
    this.passwordSubject.next(value);
  }
  get soldierDisplay() {
    if (!this.selectedSoldier) {
      return "";
    }
    const s = this.selectedSoldier;
    const rank = s.rankShortValue ? s.rankShortValue + " " : "";
    return `${rank}${this.formatFIO(s)} (${s.unitShortName ?? "\u2014"})`;
  }
  openSoldierSelect() {
    const dialogRef = this.dialog.open(SoldierSelectDialogComponent, {
      width: "900px",
      maxHeight: "90vh"
    });
    dialogRef.afterClosed().subscribe((soldier) => {
      if (soldier) {
        this.selectedSoldier = soldier;
        this.model.soldierId = soldier.id;
        if (!this.model.userName && soldier.nickName) {
          this.model.userName = soldier.nickName;
          this.onUserNameChange(soldier.nickName);
        }
      }
    });
  }
  get passwordMismatch() {
    return !!this.confirmPassword && this.model.password !== this.confirmPassword;
  }
  get canSave() {
    if (this.checkingUserName || this.checkingPassword)
      return false;
    return !!this.model.userName && this.userNameAvailable && !!this.model.password && this.passwordValid && this.model.password === this.confirmPassword;
  }
  save() {
    if (this.canSave) {
      if (this.selectedRole) {
        this.model.roles = [this.selectedRole];
      }
      this.dialogRef.close(this.model);
    }
  }
  buildRequirementsHint(req) {
    const parts = [];
    if (req.requiredLength > 0) {
      parts.push(`\u043C\u0456\u043D. ${req.requiredLength} \u0441\u0438\u043C\u0432\u043E\u043B\u0456\u0432`);
    }
    if (req.requireDigit) {
      parts.push("\u0446\u0438\u0444\u0440\u0430");
    }
    if (req.requireLowercase) {
      parts.push("\u043C\u0430\u043B\u0435\u043D\u044C\u043A\u0430 \u043B\u0456\u0442\u0435\u0440\u0430");
    }
    if (req.requireUppercase) {
      parts.push("\u0432\u0435\u043B\u0438\u043A\u0430 \u043B\u0456\u0442\u0435\u0440\u0430");
    }
    if (req.requireNonAlphanumeric) {
      parts.push("\u0441\u043F\u0435\u0446\u0441\u0438\u043C\u0432\u043E\u043B");
    }
    return parts.length ? "\u0412\u0438\u043C\u043E\u0433\u0438: " + parts.join(", ") : "";
  }
  formatFIO(item) {
    return SoldierUtils.formatFIO(item.firstName, item.midleName, item.lastName);
  }
  static \u0275fac = function CreateUserDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CreateUserDialogComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreateUserDialogComponent, selectors: [["app-create-user-dialog"]], decls: 47, vars: 13, consts: [["mat-dialog-title", ""], [1, "dialog-content"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "readonly", "", "required", "", 3, "value"], ["mat-icon-button", "", "matSuffix", "", "color", "primary", "matTooltip", "\u0412\u0438\u0431\u0440\u0430\u0442\u0438", 3, "click"], ["matInput", "", "required", "", 3, "ngModelChange", "ngModel"], ["matSuffix", "", "diameter", "18"], ["matSuffix", "", "color", "warn", 3, "matTooltip"], ["matSuffix", "", "matTooltip", "\u041B\u043E\u0433\u0456\u043D \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0438\u0439", 1, "icon-success"], ["matInput", "", "type", "email", 3, "ngModelChange", "ngModel"], ["matInput", "", "type", "password", "required", "", 3, "ngModelChange", "ngModel"], ["matSuffix", "", "matTooltip", "\u041F\u0430\u0440\u043E\u043B\u044C \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u0454 \u0432\u0438\u043C\u043E\u0433\u0430\u043C", 1, "icon-success"], [1, "validation-errors"], [1, "hint-text"], [1, "error-text"], [3, "ngModelChange", "ngModel"], [3, "value"], ["align", "end"], ["mat-button", "", "mat-dialog-close", ""], ["mat-flat-button", "", "color", "primary", 3, "click", "disabled"]], template: function CreateUserDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "h2", 0);
      \u0275\u0275text(1, "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "mat-dialog-content", 1)(3, "mat-form-field", 2)(4, "mat-label");
      \u0275\u0275text(5, "\u0412\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u043E\u0441\u043B\u0443\u0436\u0431\u043E\u0432\u0435\u0446\u044C");
      \u0275\u0275elementEnd();
      \u0275\u0275element(6, "input", 3);
      \u0275\u0275elementStart(7, "button", 4);
      \u0275\u0275listener("click", function CreateUserDialogComponent_Template_button_click_7_listener() {
        return ctx.openSoldierSelect();
      });
      \u0275\u0275elementStart(8, "mat-icon");
      \u0275\u0275text(9, "person_search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "mat-form-field", 2)(11, "mat-label");
      \u0275\u0275text(12, "\u041B\u043E\u0433\u0456\u043D");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "input", 5);
      \u0275\u0275twoWayListener("ngModelChange", function CreateUserDialogComponent_Template_input_ngModelChange_13_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.model.userName, $event) || (ctx.model.userName = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function CreateUserDialogComponent_Template_input_ngModelChange_13_listener($event) {
        return ctx.onUserNameChange($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(14, CreateUserDialogComponent_Conditional_14_Template, 1, 0, "mat-spinner", 6)(15, CreateUserDialogComponent_Conditional_15_Template, 2, 1, "mat-icon", 7)(16, CreateUserDialogComponent_Conditional_16_Template, 2, 0, "mat-icon", 8);
      \u0275\u0275conditionalCreate(17, CreateUserDialogComponent_Conditional_17_Template, 2, 1, "mat-error");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "mat-form-field", 2)(19, "mat-label");
      \u0275\u0275text(20, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "input", 9);
      \u0275\u0275twoWayListener("ngModelChange", function CreateUserDialogComponent_Template_input_ngModelChange_21_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.model.email, $event) || (ctx.model.email = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(22, "mat-form-field", 2)(23, "mat-label");
      \u0275\u0275text(24, "\u041F\u0430\u0440\u043E\u043B\u044C");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "input", 10);
      \u0275\u0275twoWayListener("ngModelChange", function CreateUserDialogComponent_Template_input_ngModelChange_25_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.model.password, $event) || (ctx.model.password = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function CreateUserDialogComponent_Template_input_ngModelChange_25_listener($event) {
        return ctx.onPasswordChange($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(26, CreateUserDialogComponent_Conditional_26_Template, 1, 0, "mat-spinner", 6)(27, CreateUserDialogComponent_Conditional_27_Template, 2, 1, "mat-icon", 7)(28, CreateUserDialogComponent_Conditional_28_Template, 2, 0, "mat-icon", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(29, CreateUserDialogComponent_Conditional_29_Template, 3, 0, "div", 12);
      \u0275\u0275conditionalCreate(30, CreateUserDialogComponent_Conditional_30_Template, 2, 1, "p", 13);
      \u0275\u0275elementStart(31, "mat-form-field", 2)(32, "mat-label");
      \u0275\u0275text(33, "\u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F \u043F\u0430\u0440\u043E\u043B\u044F");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "input", 10);
      \u0275\u0275twoWayListener("ngModelChange", function CreateUserDialogComponent_Template_input_ngModelChange_34_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.confirmPassword, $event) || (ctx.confirmPassword = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(35, CreateUserDialogComponent_Conditional_35_Template, 2, 0, "p", 14);
      \u0275\u0275elementStart(36, "mat-form-field", 2)(37, "mat-label");
      \u0275\u0275text(38, "\u0420\u043E\u043B\u044C");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "mat-select", 15);
      \u0275\u0275twoWayListener("ngModelChange", function CreateUserDialogComponent_Template_mat_select_ngModelChange_39_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedRole, $event) || (ctx.selectedRole = $event);
        return $event;
      });
      \u0275\u0275repeaterCreate(40, CreateUserDialogComponent_For_41_Template, 2, 2, "mat-option", 16, _forTrack0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(42, "mat-dialog-actions", 17)(43, "button", 18);
      \u0275\u0275text(44, "\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "button", 19);
      \u0275\u0275listener("click", function CreateUserDialogComponent_Template_button_click_45_listener() {
        return ctx.save();
      });
      \u0275\u0275text(46, " \u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 ");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275property("value", ctx.soldierDisplay);
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.model.userName);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.checkingUserName ? 14 : ctx.userNameError ? 15 : ctx.model.userName && ctx.userNameAvailable ? 16 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.userNameError ? 17 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.model.email);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.model.password);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.checkingPassword ? 26 : ctx.passwordErrors.length ? 27 : ctx.model.password && ctx.passwordValid ? 28 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.passwordErrors.length ? 29 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.passwordHints ? 30 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.confirmPassword);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.passwordMismatch ? 35 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedRole);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.data.roles);
      \u0275\u0275advance(5);
      \u0275\u0275property("disabled", !ctx.canSave);
    }
  }, dependencies: [
    CommonModule,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    RequiredValidator,
    NgModel,
    MatDialogModule,
    MatDialogClose,
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatError,
    MatSuffix,
    MatInputModule,
    MatInput,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatSelectModule,
    MatSelect,
    MatOption,
    MatIconModule,
    MatIcon,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    MatTooltipModule,
    MatTooltip
  ], styles: ["\n\n.dialog-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  min-width: 320px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.error-text[_ngcontent-%COMP%] {\n  color: var(--mat-warn-color, #f44336);\n  font-size: 12px;\n  margin: -4px 0 4px 0;\n}\n.hint-text[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 12px;\n  margin: -4px 0 8px 0;\n}\n.validation-errors[_ngcontent-%COMP%] {\n  margin: -4px 0 4px 0;\n}\n.icon-success[_ngcontent-%COMP%] {\n  color: #4caf50;\n}\n/*# sourceMappingURL=dialog-shared.css.map */", "\n\n.dialog-content[_ngcontent-%COMP%] {\n  min-width: 360px;\n}\n/*# sourceMappingURL=CreateUserDialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CreateUserDialogComponent, [{
    type: Component,
    args: [{ selector: "app-create-user-dialog", imports: [
      CommonModule,
      FormsModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatSelectModule,
      MatIconModule,
      MatProgressSpinnerModule,
      MatTooltipModule
    ], template: `
    <h2 mat-dialog-title>\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430</h2>
    <mat-dialog-content class="dialog-content">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u0412\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u043E\u0441\u043B\u0443\u0436\u0431\u043E\u0432\u0435\u0446\u044C</mat-label>
        <input matInput [value]="soldierDisplay" readonly required />
        <button
          mat-icon-button
          matSuffix
          color="primary"
          (click)="openSoldierSelect()"
          matTooltip="\u0412\u0438\u0431\u0440\u0430\u0442\u0438"
        >
          <mat-icon>person_search</mat-icon>
        </button>
      </mat-form-field>

      <!-- \u041B\u043E\u0433\u0456\u043D \u0437 \u043F\u0435\u0440\u0435\u0432\u0456\u0440\u043A\u043E\u044E \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E\u0441\u0442\u0456 -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u041B\u043E\u0433\u0456\u043D</mat-label>
        <input
          matInput
          [(ngModel)]="model.userName"
          required
          (ngModelChange)="onUserNameChange($event)"
        />
        @if (checkingUserName) {
          <mat-spinner matSuffix diameter="18"></mat-spinner>
        } @else if (userNameError) {
          <mat-icon matSuffix color="warn" [matTooltip]="userNameError">error</mat-icon>
        } @else if (model.userName && userNameAvailable) {
          <mat-icon matSuffix class="icon-success" matTooltip="\u041B\u043E\u0433\u0456\u043D \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0438\u0439"
            >check_circle</mat-icon
          >
        }
        @if (userNameError) {
          <mat-error>{{ userNameError }}</mat-error>
        }
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Email</mat-label>
        <input matInput type="email" [(ngModel)]="model.email" />
      </mat-form-field>

      <!-- \u041F\u0430\u0440\u043E\u043B\u044C \u0437 \u043F\u0435\u0440\u0435\u0432\u0456\u0440\u043A\u043E\u044E \u0432\u0438\u043C\u043E\u0433 -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u041F\u0430\u0440\u043E\u043B\u044C</mat-label>
        <input
          matInput
          type="password"
          [(ngModel)]="model.password"
          required
          (ngModelChange)="onPasswordChange($event)"
        />
        @if (checkingPassword) {
          <mat-spinner matSuffix diameter="18"></mat-spinner>
        } @else if (passwordErrors.length) {
          <mat-icon matSuffix color="warn" [matTooltip]="passwordErrors.join('\\n')"
            >error</mat-icon
          >
        } @else if (model.password && passwordValid) {
          <mat-icon matSuffix class="icon-success" matTooltip="\u041F\u0430\u0440\u043E\u043B\u044C \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u0454 \u0432\u0438\u043C\u043E\u0433\u0430\u043C"
            >check_circle</mat-icon
          >
        }
      </mat-form-field>
      @if (passwordErrors.length) {
        <div class="validation-errors">
          @for (err of passwordErrors; track err) {
            <p class="error-text">{{ err }}</p>
          }
        </div>
      }
      @if (passwordHints) {
        <p class="hint-text">{{ passwordHints }}</p>
      }

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F \u043F\u0430\u0440\u043E\u043B\u044F</mat-label>
        <input matInput type="password" [(ngModel)]="confirmPassword" required />
      </mat-form-field>

      @if (passwordMismatch) {
        <p class="error-text">\u041F\u0430\u0440\u043E\u043B\u0456 \u043D\u0435 \u0437\u0431\u0456\u0433\u0430\u044E\u0442\u044C\u0441\u044F</p>
      }

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u0420\u043E\u043B\u044C</mat-label>
        <mat-select [(ngModel)]="selectedRole">
          @for (role of data.roles; track role.id) {
            <mat-option [value]="role.value">{{ role.value }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438</button>
      <button mat-flat-button color="primary" [disabled]="!canSave" (click)="save()">
        \u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438
      </button>
    </mat-dialog-actions>
  `, styles: ["/* src/Login/dialogs/dialog-shared.scss */\n.dialog-content {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  min-width: 320px;\n}\n.full-width {\n  width: 100%;\n}\n.error-text {\n  color: var(--mat-warn-color, #f44336);\n  font-size: 12px;\n  margin: -4px 0 4px 0;\n}\n.hint-text {\n  color: #666;\n  font-size: 12px;\n  margin: -4px 0 8px 0;\n}\n.validation-errors {\n  margin: -4px 0 4px 0;\n}\n.icon-success {\n  color: #4caf50;\n}\n/*# sourceMappingURL=dialog-shared.css.map */\n", "/* angular:styles/component:css;d41978f454f8445fd780e3d2eaacd18435752233bf8a4f06a1a456523d42661d;/home/havrok/projects/work/411/s5/s5app/Menu/S5Server/Front/src/Login/dialogs/CreateUserDialog.component.ts */\n.dialog-content {\n  min-width: 360px;\n}\n/*# sourceMappingURL=CreateUserDialog.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreateUserDialogComponent, { className: "CreateUserDialogComponent", filePath: "Login/dialogs/CreateUserDialog.component.ts", lineNumber: 155 });
})();

// src/Login/dialogs/ChangeLoginDialog.component.ts
function ChangeLoginDialogComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 4);
  }
}
function ChangeLoginDialogComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 5);
    \u0275\u0275text(1, "error");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("matTooltip", ctx_r0.userNameError);
  }
}
function ChangeLoginDialogComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 6);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function ChangeLoginDialogComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.userNameError);
  }
}
function ChangeLoginDialogComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-form-field", 2)(1, "mat-label");
    \u0275\u0275text(2, "\u041F\u0430\u0440\u043E\u043B\u044C \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 10);
    \u0275\u0275twoWayListener("ngModelChange", function ChangeLoginDialogComponent_Conditional_15_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.model.currentPassword, $event) || (ctx_r0.model.currentPassword = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-hint");
    \u0275\u0275text(5, "\u0414\u043B\u044F \u043F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F \u0437\u043C\u0456\u043D\u0438 \u043B\u043E\u0433\u0456\u043D\u0443");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.model.currentPassword);
  }
}
var ChangeLoginDialogComponent = class _ChangeLoginDialogComponent {
  dialogRef = inject(MatDialogRef);
  usersService = inject(UsersService);
  data = inject(MAT_DIALOG_DATA);
  model = { currentPassword: "", newUserName: "" };
  // Validation state
  checkingUserName = false;
  userNameAvailable = false;
  userNameError = "";
  userNameSubject = new Subject();
  destroy$ = new Subject();
  ngOnInit() {
    this.userNameSubject.pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe((value) => {
      if (!value || value.length < 3) {
        this.checkingUserName = false;
        this.userNameAvailable = false;
        this.userNameError = value ? "\u041C\u0456\u043D\u0456\u043C\u0443\u043C 3 \u0441\u0438\u043C\u0432\u043E\u043B\u0438" : "";
        return;
      }
      if (value === this.data.userName) {
        this.checkingUserName = false;
        this.userNameAvailable = false;
        this.userNameError = "\u041D\u043E\u0432\u0438\u0439 \u043B\u043E\u0433\u0456\u043D \u0441\u043F\u0456\u0432\u043F\u0430\u0434\u0430\u0454 \u0437 \u043F\u043E\u0442\u043E\u0447\u043D\u0438\u043C";
        return;
      }
      this.checkingUserName = true;
      this.usersService.checkUsername(value, this.data.userId).subscribe({
        next: (res) => {
          this.checkingUserName = false;
          this.userNameAvailable = res.isAvailable;
          this.userNameError = res.isAvailable ? "" : res.message;
        },
        error: () => {
          this.checkingUserName = false;
          this.userNameAvailable = true;
          this.userNameError = "";
        }
      });
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onUserNameChange(value) {
    this.userNameAvailable = false;
    this.userNameError = "";
    this.userNameSubject.next(value);
  }
  get canSave() {
    if (this.checkingUserName)
      return false;
    const passwordOk = this.data.adminChange || !!this.model.currentPassword;
    return !!this.model.newUserName && this.userNameAvailable && passwordOk;
  }
  save() {
    if (this.canSave) {
      this.dialogRef.close(this.model);
    }
  }
  static \u0275fac = function ChangeLoginDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChangeLoginDialogComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChangeLoginDialogComponent, selectors: [["app-change-login-dialog"]], decls: 21, vars: 6, consts: [["mat-dialog-title", ""], [1, "dialog-content"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "required", "", 3, "ngModelChange", "ngModel"], ["matSuffix", "", "diameter", "18"], ["matSuffix", "", "color", "warn", 3, "matTooltip"], ["matSuffix", "", "matTooltip", "\u041B\u043E\u0433\u0456\u043D \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0438\u0439", 1, "icon-success"], ["align", "end"], ["mat-button", "", "mat-dialog-close", ""], ["mat-flat-button", "", "color", "primary", 3, "click", "disabled"], ["matInput", "", "type", "password", "required", "", 3, "ngModelChange", "ngModel"]], template: function ChangeLoginDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "h2", 0);
      \u0275\u0275text(1, "\u0417\u043C\u0456\u043D\u0438\u0442\u0438 \u043B\u043E\u0433\u0456\u043D");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "mat-dialog-content", 1)(3, "p");
      \u0275\u0275text(4, "\u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447: ");
      \u0275\u0275elementStart(5, "strong");
      \u0275\u0275text(6);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "mat-form-field", 2)(8, "mat-label");
      \u0275\u0275text(9, "\u041D\u043E\u0432\u0438\u0439 \u043B\u043E\u0433\u0456\u043D");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "input", 3);
      \u0275\u0275twoWayListener("ngModelChange", function ChangeLoginDialogComponent_Template_input_ngModelChange_10_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.model.newUserName, $event) || (ctx.model.newUserName = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function ChangeLoginDialogComponent_Template_input_ngModelChange_10_listener($event) {
        return ctx.onUserNameChange($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(11, ChangeLoginDialogComponent_Conditional_11_Template, 1, 0, "mat-spinner", 4)(12, ChangeLoginDialogComponent_Conditional_12_Template, 2, 1, "mat-icon", 5)(13, ChangeLoginDialogComponent_Conditional_13_Template, 2, 0, "mat-icon", 6);
      \u0275\u0275conditionalCreate(14, ChangeLoginDialogComponent_Conditional_14_Template, 2, 1, "mat-error");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(15, ChangeLoginDialogComponent_Conditional_15_Template, 6, 1, "mat-form-field", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "mat-dialog-actions", 7)(17, "button", 8);
      \u0275\u0275text(18, "\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "button", 9);
      \u0275\u0275listener("click", function ChangeLoginDialogComponent_Template_button_click_19_listener() {
        return ctx.save();
      });
      \u0275\u0275text(20, " \u0417\u043C\u0456\u043D\u0438\u0442\u0438 ");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.data.userName);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.model.newUserName);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.checkingUserName ? 11 : ctx.userNameError ? 12 : ctx.model.newUserName && ctx.userNameAvailable ? 13 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.userNameError ? 14 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.data.adminChange ? 15 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", !ctx.canSave);
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, RequiredValidator, NgModel, MatDialogModule, MatDialogClose, MatDialogTitle, MatDialogActions, MatDialogContent, MatFormFieldModule, MatFormField, MatLabel, MatHint, MatError, MatSuffix, MatInputModule, MatInput, MatButtonModule, MatButton, MatIconModule, MatIcon, MatProgressSpinnerModule, MatProgressSpinner, MatTooltipModule, MatTooltip], styles: ["\n\n.dialog-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  min-width: 320px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.error-text[_ngcontent-%COMP%] {\n  color: var(--mat-warn-color, #f44336);\n  font-size: 12px;\n  margin: -4px 0 4px 0;\n}\n.hint-text[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 12px;\n  margin: -4px 0 8px 0;\n}\n.validation-errors[_ngcontent-%COMP%] {\n  margin: -4px 0 4px 0;\n}\n.icon-success[_ngcontent-%COMP%] {\n  color: #4caf50;\n}\n/*# sourceMappingURL=dialog-shared.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChangeLoginDialogComponent, [{
    type: Component,
    args: [{ selector: "app-change-login-dialog", imports: [
      FormsModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      MatProgressSpinnerModule,
      MatTooltipModule
    ], template: `
    <h2 mat-dialog-title>\u0417\u043C\u0456\u043D\u0438\u0442\u0438 \u043B\u043E\u0433\u0456\u043D</h2>
    <mat-dialog-content class="dialog-content">
      <p>\u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447: <strong>{{ data.userName }}</strong></p>

      <!-- \u041D\u043E\u0432\u0438\u0439 \u043B\u043E\u0433\u0456\u043D \u0437 \u043F\u0435\u0440\u0435\u0432\u0456\u0440\u043A\u043E\u044E \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E\u0441\u0442\u0456 -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u041D\u043E\u0432\u0438\u0439 \u043B\u043E\u0433\u0456\u043D</mat-label>
        <input
          matInput
          [(ngModel)]="model.newUserName"
          required
          (ngModelChange)="onUserNameChange($event)"
        />
        @if (checkingUserName) {
          <mat-spinner matSuffix diameter="18"></mat-spinner>
        } @else if (userNameError) {
          <mat-icon matSuffix color="warn" [matTooltip]="userNameError">error</mat-icon>
        } @else if (model.newUserName && userNameAvailable) {
          <mat-icon matSuffix class="icon-success" matTooltip="\u041B\u043E\u0433\u0456\u043D \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0438\u0439"
            >check_circle</mat-icon
          >
        }
        @if (userNameError) {
          <mat-error>{{ userNameError }}</mat-error>
        }
      </mat-form-field>

      @if(!data.adminChange) {
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u041F\u0430\u0440\u043E\u043B\u044C \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430</mat-label>
        <input matInput type="password" [(ngModel)]="model.currentPassword" required />
        <mat-hint>\u0414\u043B\u044F \u043F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F \u0437\u043C\u0456\u043D\u0438 \u043B\u043E\u0433\u0456\u043D\u0443</mat-hint>
      </mat-form-field>
      }
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438</button>
      <button mat-flat-button color="primary" [disabled]="!canSave" (click)="save()">
        \u0417\u043C\u0456\u043D\u0438\u0442\u0438
      </button>
    </mat-dialog-actions>
  `, styles: ["/* src/Login/dialogs/dialog-shared.scss */\n.dialog-content {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  min-width: 320px;\n}\n.full-width {\n  width: 100%;\n}\n.error-text {\n  color: var(--mat-warn-color, #f44336);\n  font-size: 12px;\n  margin: -4px 0 4px 0;\n}\n.hint-text {\n  color: #666;\n  font-size: 12px;\n  margin: -4px 0 8px 0;\n}\n.validation-errors {\n  margin: -4px 0 4px 0;\n}\n.icon-success {\n  color: #4caf50;\n}\n/*# sourceMappingURL=dialog-shared.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChangeLoginDialogComponent, { className: "ChangeLoginDialogComponent", filePath: "Login/dialogs/ChangeLoginDialog.component.ts", lineNumber: 80 });
})();

// src/app/auth/totp.service.ts
var TotpService = class _TotpService {
  gql = "/graphql";
  http = inject(HttpClient);
  /**
   * Initiates 2FA setup: generates a new TOTP secret and returns the QR URI + manual key.
   * GraphQL resolver: AuthMutation.GetTwoFactorSetup → camelCase: getTwoFactorSetup
   */
  getSetup() {
    const query = `
      mutation GetTwoFactorSetup {
        twoFactorSetup {
          qrUri
          manualEntryKey
          serverTimeIso
        }
      }
    `;
    return this.http.post(this.gql, { query }).pipe(map((res) => {
      if (res?.errors?.length) {
        console.error("[ERROR] 2FA getSetup GraphQL error:", res.errors);
        throw new Error(res.errors[0]?.message ?? "GraphQL error");
      }
      const data = res?.data?.twoFactorSetup;
      console.log("[DEBUG] 2FA Setup response: qrUri present =", !!data?.qrUri, "| serverTime =", data?.serverTimeIso);
      return {
        sharedKey: data.manualEntryKey,
        authenticatorUri: data.qrUri,
        serverTimeIso: data.serverTimeIso
      };
    }), catchError((err) => {
      console.error("[ERROR] 2FA getSetup failed:", err?.message ?? err);
      if (err.error) {
        console.error("[DEBUG] GQL 400 Error Body:");
        console.dir(err.error);
      }
      return throwError(() => err);
    }));
  }
  /**
   * Submits the 6-digit TOTP code to enable 2FA for the current user.
   * GraphQL resolver: AuthMutation.EnableTwoFactor → camelCase: enableTwoFactor
   */
  enable(code) {
    const query = `
      mutation EnableTwoFactor($code: String!) {
        enableTwoFactor(code: $code)
      }
    `;
    return this.http.post(this.gql, { query, variables: { code } }).pipe(map((res) => {
      if (res?.errors?.length) {
        console.error("[ERROR] 2FA enableTwoFactor GraphQL error:", res.errors);
        throw new Error(res.errors[0]?.message ?? "GraphQL error");
      }
      const success = res?.data?.enableTwoFactor === true;
      console.log("[DEBUG] 2FA Enable response: success =", success);
      return {
        success,
        message: success ? "2FA \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u0443\u0432\u0456\u043C\u043A\u043D\u0435\u043D\u043E" : "\u041D\u0435\u0432\u0456\u0440\u043D\u0438\u0439 \u043A\u043E\u0434 \u043F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F"
      };
    }), catchError((err) => {
      console.error("[ERROR] 2FA enable failed:", err?.message ?? err);
      return throwError(() => err);
    }));
  }
  /**
   * Disables 2FA for the current user (requires password confirmation).
   * GraphQL resolver: AuthMutation.DisableTwoFactor → camelCase: disableTwoFactor
   */
  disable(password) {
    const query = `
      mutation DisableTwoFactor($password: String!) {
        disableTwoFactor(password: $password)
      }
    `;
    return this.http.post(this.gql, { query, variables: { password } }).pipe(map((res) => {
      const success = res?.data?.disableTwoFactor === true;
      console.log("[DEBUG] 2FA Disable response: success =", success);
      return {
        success,
        message: success ? "2FA \u0432\u0438\u043C\u043A\u043D\u0435\u043D\u043E" : "\u041D\u0435\u0432\u0456\u0440\u043D\u0438\u0439 \u043F\u0430\u0440\u043E\u043B\u044C \u0430\u0431\u043E \u043F\u043E\u043C\u0438\u043B\u043A\u0430"
      };
    }), catchError((err) => {
      console.error("[ERROR] 2FA disable failed:", err);
      return throwError(() => err);
    }));
  }
  /**
   * Fetches the current 2FA enabled status for the authenticated user.
   * GraphQL resolver: Query.GetTwoFactorStatus → camelCase: getTwoFactorStatus
   */
  getStatus() {
    const query = `
      query GetTwoFactorStatus {
        twoFactorStatus
      }
    `;
    return this.http.post(this.gql, { query }).pipe(map((res) => {
      if (res?.errors?.length) {
        throw new Error(res.errors[0]?.message ?? "GraphQL error");
      }
      const enabled = res?.data?.twoFactorStatus === true;
      console.log("[DEBUG] 2FA Status response: isTwoFactorEnabled =", enabled);
      return { isTwoFactorEnabled: enabled };
    }), catchError((err) => {
      console.error("[ERROR] 2FA getStatus failed:", err);
      if (err.error) {
        console.error("[DEBUG] GQL getStatus 400 Error Body:");
        console.dir(err.error);
      }
      return throwError(() => err);
    }));
  }
  static \u0275fac = function TotpService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TotpService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TotpService, factory: _TotpService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TotpService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/auth/TotpSetupDialog.component.ts
var QRCode = __toESM(require_browser());
function TotpSetupDialogComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275element(1, "mat-spinner", 6);
    \u0275\u0275elementEnd();
  }
}
function TotpSetupDialogComponent_Conditional_6_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "mat-icon", 9);
    \u0275\u0275text(2, "error_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.errorMessage(), " ");
  }
}
function TotpSetupDialogComponent_Conditional_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "mat-icon", 10);
    \u0275\u0275text(2, "history");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "strong");
    \u0275\u0275text(5, "\u0423\u0432\u0430\u0433\u0430!");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" \u0427\u0430\u0441 \u043D\u0430 \u0432\u0430\u0448\u043E\u043C\u0443 \u043F\u0440\u0438\u0441\u0442\u0440\u043E\u0457 \u0440\u043E\u0437\u0431\u0456\u0433\u0430\u0454\u0442\u044C\u0441\u044F \u0437 \u0441\u0435\u0440\u0432\u0435\u0440\u043E\u043C (\u0434\u0440\u0435\u0439\u0444: ", (ctx_r0.timeDrift() / 1e3).toFixed(1), "\u0441). \u0426\u0435 \u043C\u043E\u0436\u0435 \u0437\u0430\u0432\u0430\u0436\u0430\u0442\u0438 \u0430\u043A\u0442\u0438\u0432\u0430\u0446\u0456\u0457 2FA. \u0411\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430, \u043F\u0435\u0440\u0435\u0432\u0456\u0440\u0442\u0435 \u043D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F \u0447\u0430\u0441\u0443. ");
  }
}
function TotpSetupDialogComponent_Conditional_6_Conditional_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 16);
    \u0275\u0275listener("click", function TotpSetupDialogComponent_Conditional_6_Conditional_2_Conditional_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.showEnableForm.set(true));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "lock");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0423\u0432\u0456\u043C\u043A\u043D\u0443\u0442\u0438 2FA ");
    \u0275\u0275elementEnd();
  }
}
function TotpSetupDialogComponent_Conditional_6_Conditional_2_Conditional_9_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275element(1, "mat-spinner", 19);
    \u0275\u0275elementStart(2, "span", 20);
    \u0275\u0275text(3, "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F QR-\u043A\u043E\u0434\u0443...");
    \u0275\u0275elementEnd()();
  }
}
function TotpSetupDialogComponent_Conditional_6_Conditional_2_Conditional_9_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 22);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(5);
    \u0275\u0275property("src", ctx_r0.qrDataUrl(), \u0275\u0275sanitizeUrl);
  }
}
function TotpSetupDialogComponent_Conditional_6_Conditional_2_Conditional_9_Conditional_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "mat-icon");
    \u0275\u0275text(2, "qr_code_2");
    \u0275\u0275elementEnd()();
  }
}
function TotpSetupDialogComponent_Conditional_6_Conditional_2_Conditional_9_Conditional_2_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 34);
  }
}
function TotpSetupDialogComponent_Conditional_6_Conditional_2_Conditional_9_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 21);
    \u0275\u0275conditionalCreate(2, TotpSetupDialogComponent_Conditional_6_Conditional_2_Conditional_9_Conditional_2_Conditional_2_Template, 1, 1, "img", 22)(3, TotpSetupDialogComponent_Conditional_6_Conditional_2_Conditional_9_Conditional_2_Conditional_3_Template, 3, 0, "div", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 24)(5, "p", 25);
    \u0275\u0275text(6, " 1. \u0412\u0456\u0434\u0441\u043A\u0430\u043D\u0443\u0439\u0442\u0435 QR \u0432 \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0456\u043A\u0430\u0442\u043E\u0440\u0456 (Google Auth, Authy). ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 26);
    \u0275\u0275text(8, "\u0410\u0431\u043E \u043A\u043B\u044E\u0447 \u0432\u0440\u0443\u0447\u043D\u0443:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 27);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "mat-divider", 28);
    \u0275\u0275elementStart(12, "p", 29);
    \u0275\u0275text(13, " 2. \u0412\u0432\u0435\u0434\u0456\u0442\u044C 6-\u0437\u043D\u0430\u0447\u043D\u0438\u0439 \u043A\u043E\u0434 \u0437 \u0434\u043E\u0434\u0430\u0442\u043A\u0443: ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "mat-form-field", 30)(15, "mat-label");
    \u0275\u0275text(16, "\u041A\u043E\u0434 \u043F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F");
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "input", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 32)(19, "button", 33);
    \u0275\u0275listener("click", function TotpSetupDialogComponent_Conditional_6_Conditional_2_Conditional_9_Conditional_2_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.enableTotp());
    });
    \u0275\u0275conditionalCreate(20, TotpSetupDialogComponent_Conditional_6_Conditional_2_Conditional_9_Conditional_2_Conditional_20_Template, 1, 0, "mat-spinner", 34);
    \u0275\u0275text(21, " \u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0438 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 35);
    \u0275\u0275listener("click", function TotpSetupDialogComponent_Conditional_6_Conditional_2_Conditional_9_Conditional_2_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.cancelEnable());
    });
    \u0275\u0275text(23, "\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.qrDataUrl() ? 2 : 3);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", ctx_r0.setupData().sharedKey, " ");
    \u0275\u0275advance(7);
    \u0275\u0275property("formControl", ctx_r0.verificationCodeControl);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.verificationCodeControl.invalid || ctx_r0.isVerifying());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isVerifying() ? 20 : -1);
  }
}
function TotpSetupDialogComponent_Conditional_6_Conditional_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275conditionalCreate(1, TotpSetupDialogComponent_Conditional_6_Conditional_2_Conditional_9_Conditional_1_Template, 4, 0, "div", 17)(2, TotpSetupDialogComponent_Conditional_6_Conditional_2_Conditional_9_Conditional_2_Template, 24, 5, "div", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.setupData() ? 1 : 2);
  }
}
function TotpSetupDialogComponent_Conditional_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "mat-icon", 12);
    \u0275\u0275text(2, "no_encryption");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 13);
    \u0275\u0275text(4, "\u0414\u0432\u043E\u0444\u0430\u043A\u0442\u043E\u0440\u043D\u0430 \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0456\u043A\u0430\u0446\u0456\u044F ");
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6, "\u0432\u0438\u043C\u043A\u043D\u0435\u043D\u0430");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, ".");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, TotpSetupDialogComponent_Conditional_6_Conditional_2_Conditional_8_Template, 4, 0, "button", 14);
    \u0275\u0275conditionalCreate(9, TotpSetupDialogComponent_Conditional_6_Conditional_2_Conditional_9_Template, 3, 1, "div", 15);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275conditional(!ctx_r0.showEnableForm() ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.showEnableForm() ? 9 : -1);
  }
}
function TotpSetupDialogComponent_Conditional_6_Conditional_3_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", function TotpSetupDialogComponent_Conditional_6_Conditional_3_Conditional_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.showDisableForm.set(true));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "no_encryption");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0412\u0438\u043C\u043A\u043D\u0443\u0442\u0438 2FA ");
    \u0275\u0275elementEnd();
  }
}
function TotpSetupDialogComponent_Conditional_6_Conditional_3_Conditional_9_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 47);
  }
}
function TotpSetupDialogComponent_Conditional_6_Conditional_3_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 39)(1, "p", 41)(2, "mat-icon", 42);
    \u0275\u0275text(3, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043F\u043E\u0442\u043E\u0447\u043D\u0438\u0439 \u043F\u0430\u0440\u043E\u043B\u044C \u0434\u043B\u044F \u043F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F \u0432\u0438\u043C\u043A\u043D\u0435\u043D\u043D\u044F 2FA: ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "mat-form-field", 43)(6, "mat-label");
    \u0275\u0275text(7, "\u041F\u0430\u0440\u043E\u043B\u044C");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "input", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 45)(10, "button", 46);
    \u0275\u0275listener("click", function TotpSetupDialogComponent_Conditional_6_Conditional_3_Conditional_9_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.disableTotp());
    });
    \u0275\u0275conditionalCreate(11, TotpSetupDialogComponent_Conditional_6_Conditional_3_Conditional_9_Conditional_11_Template, 1, 0, "mat-spinner", 47);
    \u0275\u0275text(12, " \u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0438 \u0432\u0438\u043C\u043A\u043D\u0435\u043D\u043D\u044F ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 35);
    \u0275\u0275listener("click", function TotpSetupDialogComponent_Conditional_6_Conditional_3_Conditional_9_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.cancelDisable());
    });
    \u0275\u0275text(14, "\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(8);
    \u0275\u0275property("formControl", ctx_r0.passwordControl);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.passwordControl.invalid || ctx_r0.isVerifying());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isVerifying() ? 11 : -1);
  }
}
function TotpSetupDialogComponent_Conditional_6_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "mat-icon", 36);
    \u0275\u0275text(2, "verified_user");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 37);
    \u0275\u0275text(4, "\u0414\u0432\u043E\u0444\u0430\u043A\u0442\u043E\u0440\u043D\u0430 \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0456\u043A\u0430\u0446\u0456\u044F ");
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6, "\u0443\u0432\u0456\u043C\u043A\u043D\u0435\u043D\u0430");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, ".");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, TotpSetupDialogComponent_Conditional_6_Conditional_3_Conditional_8_Template, 4, 0, "button", 38)(9, TotpSetupDialogComponent_Conditional_6_Conditional_3_Conditional_9_Template, 15, 3, "div", 39);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275conditional(!ctx_r0.showDisableForm() ? 8 : 9);
  }
}
function TotpSetupDialogComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, TotpSetupDialogComponent_Conditional_6_Conditional_0_Template, 4, 1, "div", 7);
    \u0275\u0275conditionalCreate(1, TotpSetupDialogComponent_Conditional_6_Conditional_1_Template, 7, 1, "div", 8);
    \u0275\u0275conditionalCreate(2, TotpSetupDialogComponent_Conditional_6_Conditional_2_Template, 10, 2);
    \u0275\u0275conditionalCreate(3, TotpSetupDialogComponent_Conditional_6_Conditional_3_Template, 10, 1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.errorMessage() ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.timeDrift() > 3e4 ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.isTwoFactorEnabled() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isTwoFactorEnabled() ? 3 : -1);
  }
}
var TotpSetupDialogComponent = class _TotpSetupDialogComponent {
  totpService = inject(TotpService);
  snackBar = inject(MatSnackBar);
  dialogRef = inject(MatDialogRef);
  // ── state signals ──────────────────────────────────────────
  isLoading = signal(true, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
  isVerifying = signal(false, ...ngDevMode ? [{ debugName: "isVerifying" }] : []);
  errorMessage = signal("", ...ngDevMode ? [{ debugName: "errorMessage" }] : []);
  isTwoFactorEnabled = signal(false, ...ngDevMode ? [{ debugName: "isTwoFactorEnabled" }] : []);
  setupData = signal(null, ...ngDevMode ? [{ debugName: "setupData" }] : []);
  showEnableForm = signal(false, ...ngDevMode ? [{ debugName: "showEnableForm" }] : []);
  showDisableForm = signal(false, ...ngDevMode ? [{ debugName: "showDisableForm" }] : []);
  qrDataUrl = signal(null, ...ngDevMode ? [{ debugName: "qrDataUrl" }] : []);
  timeDrift = signal(0, ...ngDevMode ? [{ debugName: "timeDrift" }] : []);
  // ── form controls ──────────────────────────────────────────
  verificationCodeControl = new FormControl("", [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(6),
    Validators.pattern(/^\d{6}$/)
  ]);
  passwordControl = new FormControl("", Validators.required);
  // ──────────────────────────────────────────────────────────
  ngOnInit() {
    console.log("[DEBUG] TotpSetupDialog opened \u2014 loading status + time-sync setup.");
    this.isLoading.set(true);
    this.errorMessage.set("");
    forkJoin({
      status: this.totpService.getStatus().pipe(catchError((err) => {
        this.errorMessage.set(`\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0441\u0442\u0430\u0442\u0443\u0441\u0443: ${err.message || "400 (Check Schema)"}`);
        return of({ isTwoFactorEnabled: false });
      })),
      setup: this.totpService.getSetup().pipe(catchError((err) => {
        this.errorMessage.set(`\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F QR: ${err.message || "400 (Check Schema)"}`);
        return of(null);
      }))
    }).subscribe(({ status, setup }) => {
      this.isTwoFactorEnabled.set(status.isTwoFactorEnabled);
      if (setup) {
        this.setupData.set(setup);
        const serverTime = new Date(setup.serverTimeIso).getTime();
        const clientTime = (/* @__PURE__ */ new Date()).getTime();
        const drift = Math.abs(serverTime - clientTime);
        this.timeDrift.set(drift);
        console.log(`[DEBUG] Time sync audit: Server=${setup.serverTimeIso}, Client=${(/* @__PURE__ */ new Date()).toISOString()}, Drift=${drift}ms`);
        this.generateQrCode(setup.authenticatorUri);
      }
      this.isLoading.set(false);
    });
  }
  generateQrCode(uri) {
    return __async(this, null, function* () {
      try {
        const dataUrl = yield QRCode.toDataURL(uri, {
          margin: 2,
          width: 148,
          color: { dark: "#000000", light: "#ffffff" }
        });
        this.qrDataUrl.set(dataUrl);
        console.log("[DEBUG] Local QR Code generated successfully.");
      } catch (err) {
        console.error("[ERROR] Failed to generate local QR code:", err);
      }
    });
  }
  cancelEnable() {
    this.showEnableForm.set(false);
    this.verificationCodeControl.reset();
    this.errorMessage.set("");
  }
  enableTotp() {
    if (this.verificationCodeControl.invalid)
      return;
    const code = this.verificationCodeControl.value;
    this.isVerifying.set(true);
    this.errorMessage.set("");
    this.totpService.enable(code).subscribe({
      next: (res) => {
        console.log("[DEBUG] enableTwoFactor response received. Success:", res.success);
        this.isVerifying.set(false);
        if (res.success) {
          this.snackBar.open("\u2705 \u0414\u0432\u043E\u0444\u0430\u043A\u0442\u043E\u0440\u043D\u0443 \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0456\u043A\u0430\u0446\u0456\u044E \u0443\u0432\u0456\u043C\u043A\u043D\u0435\u043D\u043E", "OK", { duration: 4e3 });
          this.isTwoFactorEnabled.set(true);
          this.showEnableForm.set(false);
          this.verificationCodeControl.reset();
        } else {
          this.errorMessage.set("\u041D\u0435\u0432\u0456\u0440\u043D\u0438\u0439 \u043A\u043E\u0434. \u041F\u0435\u0440\u0435\u0432\u0456\u0440\u0442\u0435 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0456\u0437\u0430\u0446\u0456\u044E \u0447\u0430\u0441\u0443 \u0432 \u0434\u043E\u0434\u0430\u0442\u043A\u0443 \u0456 \u0441\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0437\u043D\u043E\u0432\u0443.");
        }
      },
      error: (err) => {
        console.error("[ERROR] enableTwoFactor failed:", err?.message ?? err);
        this.isVerifying.set(false);
        this.errorMessage.set("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 \u043F\u0440\u0438 \u0430\u043A\u0442\u0438\u0432\u0430\u0446\u0456\u0457 2FA: " + (err?.message ?? "\u043D\u0435\u0432\u0456\u0434\u043E\u043C\u0430 \u043F\u043E\u043C\u0438\u043B\u043A\u0430"));
      }
    });
  }
  cancelDisable() {
    this.showDisableForm.set(false);
    this.passwordControl.reset();
    this.errorMessage.set("");
  }
  disableTotp() {
    if (this.passwordControl.invalid)
      return;
    this.isVerifying.set(true);
    this.errorMessage.set("");
    this.totpService.disable(this.passwordControl.value).subscribe({
      next: (res) => {
        console.log("[DEBUG] disableTwoFactor response received. Success:", res.success);
        this.isVerifying.set(false);
        if (res.success) {
          this.snackBar.open("2FA \u0432\u0438\u043C\u043A\u043D\u0435\u043D\u043E", "OK", { duration: 3e3 });
          this.isTwoFactorEnabled.set(false);
          this.showDisableForm.set(false);
          this.passwordControl.reset();
        } else {
          this.errorMessage.set("\u041D\u0435\u0432\u0456\u0440\u043D\u0438\u0439 \u043F\u0430\u0440\u043E\u043B\u044C. \u0421\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0449\u0435 \u0440\u0430\u0437.");
        }
      },
      error: (err) => {
        console.error("[ERROR] disableTwoFactor failed:", err?.message ?? err);
        this.isVerifying.set(false);
        this.errorMessage.set("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u0440\u0438 \u0432\u0438\u043C\u043A\u043D\u0435\u043D\u043D\u0456 2FA: " + (err?.message ?? "\u043D\u0435\u0432\u0456\u0434\u043E\u043C\u0430 \u043F\u043E\u043C\u0438\u043B\u043A\u0430"));
      }
    });
  }
  static \u0275fac = function TotpSetupDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TotpSetupDialogComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TotpSetupDialogComponent, selectors: [["app-totp-setup-dialog"]], decls: 10, vars: 1, consts: [["mat-dialog-title", ""], [2, "vertical-align", "middle", "margin-right", "8px"], [2, "min-width", "380px", "max-width", "500px"], [2, "display", "flex", "justify-content", "center", "padding", "24px"], ["align", "end"], ["mat-button", "", "mat-dialog-close", ""], ["diameter", "40"], [2, "color", "#c62828", "margin-bottom", "14px", "padding", "10px 14px", "background", "#ffebee", "border-radius", "6px", "font-size", "14px", "display", "flex", "align-items", "center", "gap", "8px"], [2, "color", "#e65100", "margin-bottom", "14px", "padding", "10px 14px", "background", "#fff3e0", "border", "1px solid #ffe0b2", "border-radius", "6px", "font-size", "13px", "display", "flex", "align-items", "center", "gap", "8px"], [2, "font-size", "18px"], [2, "font-size", "20px"], [2, "display", "flex", "align-items", "center", "gap", "10px", "margin-bottom", "10px"], [2, "color", "#757575", "font-size", "22px"], [2, "font-size", "14px"], ["mat-raised-button", "", "color", "primary"], [2, "border", "1px solid #e0e0e0", "border-radius", "8px", "padding", "12px"], ["mat-raised-button", "", "color", "primary", 3, "click"], [2, "display", "flex", "align-items", "center", "gap", "10px", "min-height", "56px"], [2, "display", "flex", "flex-direction", "row", "gap", "14px", "align-items", "flex-start"], ["diameter", "24", 2, "flex-shrink", "0"], [2, "font-size", "13px", "opacity", "0.7"], [2, "flex-shrink", "0"], ["alt", "QR Code", "width", "120", "height", "120", 2, "border", "1px solid #e0e0e0", "border-radius", "8px", "padding", "3px", "display", "block", 3, "src"], [2, "width", "120px", "height", "120px", "display", "flex", "align-items", "center", "justify-content", "center", "background", "#f5f5f5", "border-radius", "8px", "color", "#ef5350"], [2, "flex", "1", "display", "flex", "flex-direction", "column", "gap", "6px"], [2, "font-weight", "600", "margin", "0", "font-size", "12px", "line-height", "1.4"], [2, "font-size", "11px", "opacity", "0.65", "margin", "0"], [2, "font-family", "monospace", "font-size", "11px", "padding", "6px 8px", "background", "#f5f5f5", "border", "1px dashed #bdbdbd", "border-radius", "6px", "letter-spacing", "2px", "user-select", "all", "word-break", "break-all", "line-height", "1.5"], [2, "margin", "2px 0"], [2, "font-weight", "600", "margin", "0", "font-size", "12px"], ["appearance", "outline", "subscriptSizing", "dynamic", 2, "width", "100%"], ["matInput", "", "maxlength", "6", "inputmode", "numeric", "autocomplete", "one-time-code", "placeholder", "000000", 3, "formControl"], [2, "display", "flex", "gap", "8px", "flex-wrap", "wrap"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["diameter", "16", 2, "display", "inline-block", "margin-right", "4px"], ["mat-button", "", 3, "click"], [2, "color", "#2e7d32", "font-size", "22px"], [2, "font-size", "14px", "color", "#2e7d32"], ["mat-stroked-button", "", "color", "warn"], [2, "padding", "16px", "background", "#fff3e0", "border-radius", "8px", "border", "1px solid #ffe0b2"], ["mat-stroked-button", "", "color", "warn", 3, "click"], [2, "margin", "0 0 12px", "font-size", "14px"], [2, "font-size", "16px", "vertical-align", "middle", "color", "#e65100", "margin-right", "4px"], ["appearance", "outline", 2, "width", "100%"], ["matInput", "", "type", "password", 3, "formControl"], [2, "display", "flex", "gap", "8px", "margin-top", "4px"], ["mat-raised-button", "", "color", "warn", 3, "click", "disabled"], ["diameter", "18", 2, "display", "inline-block", "margin-right", "6px"]], template: function TotpSetupDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "h2", 0)(1, "mat-icon", 1);
      \u0275\u0275text(2, "security");
      \u0275\u0275elementEnd();
      \u0275\u0275text(3, " \u0414\u0432\u043E\u0444\u0430\u043A\u0442\u043E\u0440\u043D\u0430 \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0456\u043A\u0430\u0446\u0456\u044F ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "mat-dialog-content", 2);
      \u0275\u0275conditionalCreate(5, TotpSetupDialogComponent_Conditional_5_Template, 2, 0, "div", 3)(6, TotpSetupDialogComponent_Conditional_6_Template, 4, 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "mat-dialog-actions", 4)(8, "button", 5);
      \u0275\u0275text(9, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.isLoading() ? 5 : 6);
    }
  }, dependencies: [
    MatDialogModule,
    MatDialogClose,
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    MatButtonModule,
    MatButton,
    MatInputModule,
    MatInput,
    MatFormField,
    MatLabel,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    MatIconModule,
    MatIcon,
    MatDividerModule,
    MatDivider,
    MatSnackBarModule,
    ReactiveFormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    MaxLengthValidator,
    FormControlDirective
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TotpSetupDialogComponent, [{
    type: Component,
    args: [{
      selector: "app-totp-setup-dialog",
      standalone: true,
      imports: [
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatDividerModule,
        MatSnackBarModule,
        ReactiveFormsModule
      ],
      template: `
    <h2 mat-dialog-title>
      <mat-icon style="vertical-align: middle; margin-right: 8px;">security</mat-icon>
      \u0414\u0432\u043E\u0444\u0430\u043A\u0442\u043E\u0440\u043D\u0430 \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0456\u043A\u0430\u0446\u0456\u044F
    </h2>

    <mat-dialog-content style="min-width: 380px; max-width: 500px;">

      <!-- \u2500\u2500 LOADING \u2500\u2500 -->
      @if (isLoading()) {
        <div style="display:flex; justify-content:center; padding:24px;">
          <mat-spinner diameter="40"></mat-spinner>
        </div>
      } @else {

        <!-- \u2500\u2500 ERROR BANNER \u2500\u2500 -->
        @if (errorMessage()) {
          <div style="color:#c62828; margin-bottom:14px; padding:10px 14px; background:#ffebee; border-radius:6px; font-size:14px; display:flex; align-items:center; gap:8px;">
            <mat-icon style="font-size:18px;">error_outline</mat-icon>
            {{ errorMessage() }}
          </div>
        }

        <!-- \u2500\u2500 TIME DRIFT WARNING \u2500\u2500 -->
        @if (timeDrift() > 30000) {
          <div style="color:#e65100; margin-bottom:14px; padding:10px 14px; background:#fff3e0; border:1px solid #ffe0b2; border-radius:6px; font-size:13px; display:flex; align-items:center; gap:8px;">
            <mat-icon style="font-size:20px;">history</mat-icon>
            <div>
              <strong>\u0423\u0432\u0430\u0433\u0430!</strong> \u0427\u0430\u0441 \u043D\u0430 \u0432\u0430\u0448\u043E\u043C\u0443 \u043F\u0440\u0438\u0441\u0442\u0440\u043E\u0457 \u0440\u043E\u0437\u0431\u0456\u0433\u0430\u0454\u0442\u044C\u0441\u044F \u0437 \u0441\u0435\u0440\u0432\u0435\u0440\u043E\u043C (\u0434\u0440\u0435\u0439\u0444: {{ (timeDrift()/1000).toFixed(1) }}\u0441).
              \u0426\u0435 \u043C\u043E\u0436\u0435 \u0437\u0430\u0432\u0430\u0436\u0430\u0442\u0438 \u0430\u043A\u0442\u0438\u0432\u0430\u0446\u0456\u0457 2FA. \u0411\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430, \u043F\u0435\u0440\u0435\u0432\u0456\u0440\u0442\u0435 \u043D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F \u0447\u0430\u0441\u0443.
            </div>
          </div>
        }

        <!-- \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
             STATE: 2FA DISABLED
        \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->
        @if (!isTwoFactorEnabled()) {

          <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
            <mat-icon style="color:#757575; font-size:22px;">no_encryption</mat-icon>
            <span style="font-size:14px;">\u0414\u0432\u043E\u0444\u0430\u043A\u0442\u043E\u0440\u043D\u0430 \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0456\u043A\u0430\u0446\u0456\u044F <strong>\u0432\u0438\u043C\u043A\u043D\u0435\u043D\u0430</strong>.</span>
          </div>

          <!-- Collapsed: show [\u0423\u0432\u0456\u043C\u043A\u043D\u0443\u0442\u0438 2FA] button -->
          @if (!showEnableForm()) {
            <button mat-raised-button color="primary" (click)="showEnableForm.set(true)">
              <mat-icon>lock</mat-icon>
              \u0423\u0432\u0456\u043C\u043A\u043D\u0443\u0442\u0438 2FA
            </button>
          }

          <!-- Expanded: show QR + code input -->
          @if (showEnableForm()) {
            <div style="border:1px solid #e0e0e0; border-radius:8px; padding:12px;">

              @if (!setupData()) {
                <!-- Loading setup data -->
                <div style="display:flex; align-items:center; gap:10px; min-height:56px;">
                  <mat-spinner diameter="24" style="flex-shrink:0;"></mat-spinner>
                  <span style="font-size:13px; opacity:0.7;">\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F QR-\u043A\u043E\u0434\u0443...</span>
                </div>
              } @else {

                <!-- 2-column layout: QR left, controls right -->
                <div style="display:flex; flex-direction:row; gap:14px; align-items:flex-start;">

                  <!-- LEFT: QR image -->
                  <div style="flex-shrink:0;">
                    @if (qrDataUrl()) {
                      <img
                        [src]="qrDataUrl()"
                        alt="QR Code"
                        width="120"
                        height="120"
                        style="border:1px solid #e0e0e0; border-radius:8px; padding:3px; display:block;"
                      />
                    } @else {
                      <div style="width:120px; height:120px; display:flex; align-items:center; justify-content:center; background:#f5f5f5; border-radius:8px; color:#ef5350;">
                        <mat-icon>qr_code_2</mat-icon>
                      </div>
                    }
                  </div>

                  <!-- RIGHT: instructions + form -->
                  <div style="flex:1; display:flex; flex-direction:column; gap:6px;">

                    <!-- Step 1: scan QR -->
                    <p style="font-weight:600; margin:0; font-size:12px; line-height:1.4;">
                      1. \u0412\u0456\u0434\u0441\u043A\u0430\u043D\u0443\u0439\u0442\u0435 QR \u0432 \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0456\u043A\u0430\u0442\u043E\u0440\u0456 (Google Auth, Authy).
                    </p>

                    <!-- Manual key -->
                    <div style="font-size:11px; opacity:0.65; margin:0;">\u0410\u0431\u043E \u043A\u043B\u044E\u0447 \u0432\u0440\u0443\u0447\u043D\u0443:</div>
                    <div style="font-family:monospace; font-size:11px; padding:6px 8px; background:#f5f5f5; border:1px dashed #bdbdbd; border-radius:6px; letter-spacing:2px; user-select:all; word-break:break-all; line-height:1.5;">
                      {{ setupData()!.sharedKey }}
                    </div>

                    <mat-divider style="margin:2px 0;"></mat-divider>

                    <!-- Step 2: verify code -->
                    <p style="font-weight:600; margin:0; font-size:12px;">
                      2. \u0412\u0432\u0435\u0434\u0456\u0442\u044C 6-\u0437\u043D\u0430\u0447\u043D\u0438\u0439 \u043A\u043E\u0434 \u0437 \u0434\u043E\u0434\u0430\u0442\u043A\u0443:
                    </p>

                    <mat-form-field appearance="outline" style="width:100%;" subscriptSizing="dynamic">
                      <mat-label>\u041A\u043E\u0434 \u043F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F</mat-label>
                      <input
                        matInput
                        [formControl]="verificationCodeControl"
                        maxlength="6"
                        inputmode="numeric"
                        autocomplete="one-time-code"
                        placeholder="000000"
                      />
                    </mat-form-field>

                    <div style="display:flex; gap:8px; flex-wrap:wrap;">
                      <button
                        mat-raised-button
                        color="primary"
                        [disabled]="verificationCodeControl.invalid || isVerifying()"
                        (click)="enableTotp()"
                      >
                        @if (isVerifying()) {
                          <mat-spinner diameter="16" style="display:inline-block; margin-right:4px;"></mat-spinner>
                        }
                        \u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0438
                      </button>
                      <button mat-button (click)="cancelEnable()">\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438</button>
                    </div>

                  </div>
                </div>
              }
            </div>
          }

        }

        <!-- \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
             STATE: 2FA ENABLED
        \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->
        @if (isTwoFactorEnabled()) {

          <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
            <mat-icon style="color:#2e7d32; font-size:22px;">verified_user</mat-icon>
            <span style="font-size:14px; color:#2e7d32;">\u0414\u0432\u043E\u0444\u0430\u043A\u0442\u043E\u0440\u043D\u0430 \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0456\u043A\u0430\u0446\u0456\u044F <strong>\u0443\u0432\u0456\u043C\u043A\u043D\u0435\u043D\u0430</strong>.</span>
          </div>

          @if (!showDisableForm()) {
            <button mat-stroked-button color="warn" (click)="showDisableForm.set(true)">
              <mat-icon>no_encryption</mat-icon>
              \u0412\u0438\u043C\u043A\u043D\u0443\u0442\u0438 2FA
            </button>
          } @else {
            <div style="padding:16px; background:#fff3e0; border-radius:8px; border:1px solid #ffe0b2;">
              <p style="margin:0 0 12px; font-size:14px;">
                <mat-icon style="font-size:16px; vertical-align:middle; color:#e65100; margin-right:4px;">warning</mat-icon>
                \u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043F\u043E\u0442\u043E\u0447\u043D\u0438\u0439 \u043F\u0430\u0440\u043E\u043B\u044C \u0434\u043B\u044F \u043F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F \u0432\u0438\u043C\u043A\u043D\u0435\u043D\u043D\u044F 2FA:
              </p>
              <mat-form-field appearance="outline" style="width:100%;">
                <mat-label>\u041F\u0430\u0440\u043E\u043B\u044C</mat-label>
                <input matInput [formControl]="passwordControl" type="password" />
              </mat-form-field>
              <div style="display:flex; gap:8px; margin-top:4px;">
                <button
                  mat-raised-button
                  color="warn"
                  [disabled]="passwordControl.invalid || isVerifying()"
                  (click)="disableTotp()"
                >
                  @if (isVerifying()) {
                    <mat-spinner diameter="18" style="display:inline-block; margin-right:6px;"></mat-spinner>
                  }
                  \u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0438 \u0432\u0438\u043C\u043A\u043D\u0435\u043D\u043D\u044F
                </button>
                <button mat-button (click)="cancelDisable()">\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438</button>
              </div>
            </div>
          }
        }
      }

    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>\u0417\u0430\u043A\u0440\u0438\u0442\u0438</button>
    </mat-dialog-actions>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TotpSetupDialogComponent, { className: "TotpSetupDialogComponent", filePath: "app/auth/TotpSetupDialog.component.ts", lineNumber: 225 });
})();

// src/Login/Users.page.ts
var _forTrack02 = ($index, $item) => $item.id;
function UsersPage_For_15_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 22);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getSoldierUnit(user_r2));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.getSoldierPosition(user_r2));
  }
}
function UsersPage_For_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275listener("click", function UsersPage_For_15_Template_div_click_0_listener() {
      const user_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectUser(user_r2));
    })("keydown.enter", function UsersPage_For_15_Template_div_keydown_enter_0_listener() {
      const user_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectUser(user_r2));
    });
    \u0275\u0275elementStart(1, "div", 15)(2, "mat-icon", 16);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 17)(5, "span", 18);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 19);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 20);
    \u0275\u0275conditionalCreate(10, UsersPage_For_15_Conditional_10_Template, 4, 2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_10_0;
    const user_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("selected", ((tmp_10_0 = ctx_r2.selectedUser()) == null ? null : tmp_10_0.id) === user_r2.id)("locked", user_r2.isLocked);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("locked", user_r2.isLocked);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", user_r2.isLocked ? "lock" : "person", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.getSoldierDisplayName(user_r2));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r2.userName);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(user_r2.soldier ? 10 : -1);
  }
}
function UsersPage_ForEmpty_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275text(1, "\u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0456\u0432 \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E");
    \u0275\u0275elementEnd();
  }
}
function UsersPage_Conditional_18_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 23);
    \u0275\u0275text(1, "\u0417\u0430\u0431\u043B\u043E\u043A\u043E\u0432\u0430\u043D\u043E");
    \u0275\u0275elementEnd();
  }
}
function UsersPage_Conditional_18_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 43);
    \u0275\u0275listener("click", function UsersPage_Conditional_18_Conditional_26_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onToggleLockout(false));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "lock_open");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0420\u043E\u0437\u0431\u043B\u043E\u043A\u0443\u0432\u0430\u0442\u0438 ");
    \u0275\u0275elementEnd();
  }
}
function UsersPage_Conditional_18_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275listener("click", function UsersPage_Conditional_18_Conditional_27_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onToggleLockout(true));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "lock");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0417\u0430\u0431\u043B\u043E\u043A\u0443\u0432\u0430\u0442\u0438 ");
    \u0275\u0275elementEnd();
  }
}
function UsersPage_Conditional_18_Conditional_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275element(1, "span", 31);
    \u0275\u0275elementStart(2, "mat-chip", 44);
    \u0275\u0275text(3, "\u041F\u043E\u0442\u0440\u0456\u0431\u043D\u0430 \u0437\u043C\u0456\u043D\u0430 \u043F\u0430\u0440\u043E\u043B\u044F");
    \u0275\u0275elementEnd()();
  }
}
function UsersPage_Conditional_18_Conditional_85_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 35)(1, "mat-icon", 45);
    \u0275\u0275text(2, "verified_user");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0423\u0432\u0456\u043C\u043A\u043D\u0435\u043D\u0430 ");
    \u0275\u0275elementEnd();
  }
}
function UsersPage_Conditional_18_Conditional_86_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip")(1, "mat-icon", 45);
    \u0275\u0275text(2, "no_encryption");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0412\u0438\u043C\u043A\u043D\u0435\u043D\u0430 ");
    \u0275\u0275elementEnd();
  }
}
function UsersPage_Conditional_18_For_98_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-chip-row", 46);
    \u0275\u0275listener("removed", function UsersPage_Conditional_18_For_98_Template_mat_chip_row_removed_0_listener() {
      const role_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.removeRole(role_r8));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 47)(3, "mat-icon");
    \u0275\u0275text(4, "cancel");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const role_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", role_r8, " ");
  }
}
function UsersPage_Conditional_18_ForEmpty_99_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 38);
    \u0275\u0275text(1, "\u0420\u043E\u043B\u0456 \u043D\u0435 \u043F\u0440\u0438\u0437\u043D\u0430\u0447\u0435\u043D\u043E");
    \u0275\u0275elementEnd();
  }
}
function UsersPage_Conditional_18_For_107_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 41);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r9 = ctx.$implicit;
    \u0275\u0275property("value", role_r9.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(role_r9.value);
  }
}
function UsersPage_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "mat-card")(2, "mat-card-header")(3, "mat-card-title")(4, "mat-icon");
    \u0275\u0275text(5, "person");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275conditionalCreate(7, UsersPage_Conditional_18_Conditional_7_Template, 2, 0, "mat-chip", 23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "mat-card-content")(9, "div", 24)(10, "button", 25);
    \u0275\u0275listener("click", function UsersPage_Conditional_18_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onChangePassword(false));
    });
    \u0275\u0275elementStart(11, "mat-icon");
    \u0275\u0275text(12, "key");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13, " \u0417\u043C\u0456\u043D\u0438\u0442\u0438 \u043F\u0430\u0440\u043E\u043B\u044C ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 25);
    \u0275\u0275listener("click", function UsersPage_Conditional_18_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onChangeLogin(false));
    });
    \u0275\u0275elementStart(15, "mat-icon");
    \u0275\u0275text(16, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275text(17, " \u0417\u043C\u0456\u043D\u0438\u0442\u0438 \u041B\u043E\u0433\u0456\u043D ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 25);
    \u0275\u0275listener("click", function UsersPage_Conditional_18_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onChangePassword(true));
    });
    \u0275\u0275elementStart(19, "mat-icon");
    \u0275\u0275text(20, "lock_reset");
    \u0275\u0275elementEnd();
    \u0275\u0275text(21, " \u0421\u043A\u0438\u043D\u0443\u0442\u0438 \u043F\u0430\u0440\u043E\u043B\u044C ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 25);
    \u0275\u0275listener("click", function UsersPage_Conditional_18_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onChangeLogin(true));
    });
    \u0275\u0275elementStart(23, "mat-icon");
    \u0275\u0275text(24, "manage_accounts");
    \u0275\u0275elementEnd();
    \u0275\u0275text(25, " \u0421\u043A\u0438\u043D\u0443\u0442\u0438 \u041B\u043E\u0433\u0456\u043D ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(26, UsersPage_Conditional_18_Conditional_26_Template, 4, 0, "button", 26)(27, UsersPage_Conditional_18_Conditional_27_Template, 4, 0, "button", 27);
    \u0275\u0275elementStart(28, "button", 28);
    \u0275\u0275listener("click", function UsersPage_Conditional_18_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onDeleteUser());
    });
    \u0275\u0275elementStart(29, "mat-icon");
    \u0275\u0275text(30, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275text(31, " \u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(32, "mat-card")(33, "mat-card-header")(34, "mat-card-title");
    \u0275\u0275text(35, "\u041E\u0431\u043B\u0456\u043A\u043E\u0432\u0438\u0439 \u0437\u0430\u043F\u0438\u0441");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "mat-card-content")(37, "div", 29)(38, "div", 30)(39, "span", 31);
    \u0275\u0275text(40, "\u041B\u043E\u0433\u0456\u043D:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "span", 32);
    \u0275\u0275text(42);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 30)(44, "span", 31);
    \u0275\u0275text(45, "Email:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "span", 32);
    \u0275\u0275text(47);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "div", 30)(49, "span", 31);
    \u0275\u0275text(50, "\u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "span", 32);
    \u0275\u0275text(52);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "div", 30)(54, "span", 31);
    \u0275\u0275text(55, "\u041F\u043E\u0441\u0430\u0434\u0430:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "span", 32);
    \u0275\u0275text(57);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(58, "div", 30)(59, "span", 31);
    \u0275\u0275text(60, "\u041E\u0441\u0442\u0430\u043D\u043D\u0456\u0439 \u0432\u0445\u0456\u0434:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "span", 32);
    \u0275\u0275text(62);
    \u0275\u0275pipe(63, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(64, "div", 30)(65, "span", 31);
    \u0275\u0275text(66, "\u0420\u0435\u0454\u0441\u0442\u0440\u0430\u0446\u0456\u044F:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "span", 32);
    \u0275\u0275text(68);
    \u0275\u0275pipe(69, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(70, "div", 30)(71, "span", 31);
    \u0275\u0275text(72, "\u041E\u0441\u0442\u0430\u043D\u043D\u044F \u0437\u043C\u0456\u043D\u0430 \u043F\u0430\u0440\u043E\u043B\u044F:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "span", 32);
    \u0275\u0275text(74);
    \u0275\u0275pipe(75, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(76, UsersPage_Conditional_18_Conditional_76_Template, 4, 0, "div", 30);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(77, "mat-card")(78, "mat-card-header")(79, "mat-card-title")(80, "mat-icon", 33);
    \u0275\u0275text(81, "security");
    \u0275\u0275elementEnd();
    \u0275\u0275text(82, " \u0414\u0432\u043E\u0444\u0430\u043A\u0442\u043E\u0440\u043D\u0430 \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0456\u043A\u0430\u0446\u0456\u044F ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(83, "mat-card-content")(84, "div", 34);
    \u0275\u0275conditionalCreate(85, UsersPage_Conditional_18_Conditional_85_Template, 4, 0, "mat-chip", 35)(86, UsersPage_Conditional_18_Conditional_86_Template, 4, 0, "mat-chip");
    \u0275\u0275elementStart(87, "button", 36);
    \u0275\u0275listener("click", function UsersPage_Conditional_18_Template_button_click_87_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onManage2FA());
    });
    \u0275\u0275elementStart(88, "mat-icon");
    \u0275\u0275text(89);
    \u0275\u0275elementEnd();
    \u0275\u0275text(90);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(91, "mat-card")(92, "mat-card-header")(93, "mat-card-title");
    \u0275\u0275text(94, "\u0420\u043E\u043B\u0456");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(95, "mat-card-content")(96, "div", 37);
    \u0275\u0275repeaterCreate(97, UsersPage_Conditional_18_For_98_Template, 5, 1, "mat-chip-row", null, \u0275\u0275repeaterTrackByIdentity, false, UsersPage_Conditional_18_ForEmpty_99_Template, 2, 0, "span", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(100, "div", 39)(101, "mat-form-field", 40)(102, "mat-label");
    \u0275\u0275text(103, "\u0414\u043E\u0434\u0430\u0442\u0438 \u0440\u043E\u043B\u044C");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(104, "mat-select", null, 0);
    \u0275\u0275repeaterCreate(106, UsersPage_Conditional_18_For_107_Template, 2, 2, "mat-option", 41, _forTrack02);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(108, "button", 42);
    \u0275\u0275listener("click", function UsersPage_Conditional_18_Template_button_click_108_listener() {
      \u0275\u0275restoreView(_r4);
      const roleSelect_r10 = \u0275\u0275reference(105);
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.addRole(roleSelect_r10.value);
      return \u0275\u0275resetView(roleSelect_r10.value = "");
    });
    \u0275\u0275elementStart(109, "mat-icon");
    \u0275\u0275text(110, "add_circle");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const user_r11 = ctx;
    const roleSelect_r10 = \u0275\u0275reference(105);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r2.getSoldierDisplayName(user_r11), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(user_r11.isLocked ? 7 : -1);
    \u0275\u0275advance(19);
    \u0275\u0275conditional(user_r11.isLocked ? 26 : 27);
    \u0275\u0275advance(16);
    \u0275\u0275textInterpolate(user_r11.userName);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(user_r11.email || "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.getSoldierUnit(user_r11));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.getSoldierPosition(user_r11));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(user_r11.lastLoginDate ? \u0275\u0275pipeBind2(63, 17, user_r11.lastLoginDate, "dd.MM.yyyy HH:mm") : "\u041D\u0456\u043A\u043E\u043B\u0438");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(69, 20, user_r11.registrationDate, "dd.MM.yyyy"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(user_r11.lastPasswordChangeDate ? \u0275\u0275pipeBind2(75, 23, user_r11.lastPasswordChangeDate, "dd.MM.yyyy HH:mm") : "\u041D\u0456\u043A\u043E\u043B\u0438");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(user_r11.requirePasswordChange ? 76 : -1);
    \u0275\u0275advance(9);
    \u0275\u0275conditional(user_r11.twoFactorEnabled ? 85 : 86);
    \u0275\u0275advance(2);
    \u0275\u0275property("color", user_r11.twoFactorEnabled ? "warn" : "primary");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r11.twoFactorEnabled ? "lock_open" : "qr_code_2");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", user_r11.twoFactorEnabled ? "\u041A\u0435\u0440\u0443\u0432\u0430\u0442\u0438 2FA" : "\u041D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u0442\u0438 2FA", " ");
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r2.userRoles());
    \u0275\u0275advance(9);
    \u0275\u0275repeater(ctx_r2.availableRoles());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !roleSelect_r10.value);
  }
}
function UsersPage_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "mat-icon");
    \u0275\u0275text(2, "person_search");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430 \u0437 \u043F\u0435\u0440\u0435\u043B\u0456\u043A\u0443");
    \u0275\u0275elementEnd()();
  }
}
var UsersPage = class _UsersPage {
  usersService = inject(UsersService);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);
  users = signal([], ...ngDevMode ? [{ debugName: "users" }] : []);
  selectedUser = signal(null, ...ngDevMode ? [{ debugName: "selectedUser" }] : []);
  allRoles = signal([], ...ngDevMode ? [{ debugName: "allRoles" }] : []);
  showInactive = signal(false, ...ngDevMode ? [{ debugName: "showInactive" }] : []);
  /** Ролі вибраного користувача */
  userRoles = signal([], ...ngDevMode ? [{ debugName: "userRoles" }] : []);
  /** Ролі, які ще можна додати */
  availableRoles = computed(() => {
    const assigned = new Set(this.userRoles());
    return this.allRoles().filter((r) => !assigned.has(r.value));
  }, ...ngDevMode ? [{ debugName: "availableRoles" }] : []);
  ngOnInit() {
    this.loadUsers();
    this.loadRoles();
  }
  loadUsers() {
    console.log("[DEBUG] Users list requested. Soldier included: true");
    this.usersService.getAll(this.showInactive()).subscribe({
      next: (list) => this.users.set(list),
      error: () => this.notify("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0456\u0432")
    });
  }
  selectUser(user) {
    this.selectedUser.set(user);
    this.loadUserRoles(user.id);
  }
  // ── Roles ─────────────────────────────
  loadRoles() {
    this.usersService.getAllRoles().subscribe({
      next: (roles) => this.allRoles.set(roles)
    });
  }
  loadUserRoles(userId) {
    this.usersService.getById(userId).subscribe({
      next: (detail) => {
        if (detail.roles) {
          this.userRoles.set(detail.roles);
        } else {
          this.userRoles.set([]);
        }
      }
    });
  }
  addRole(roleName) {
    const userId = this.selectedUser()?.id;
    if (!userId || !roleName) {
      return;
    }
    this.usersService.addUserToRole(userId, roleName).subscribe({
      next: () => {
        this.userRoles.update((roles) => [...roles, roleName]);
        this.notify(`\u0420\u043E\u043B\u044C "${roleName}" \u0434\u043E\u0434\u0430\u043D\u043E`);
      },
      error: () => this.notify("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0434\u043E\u0434\u0430\u0432\u0430\u043D\u043D\u044F \u0440\u043E\u043B\u0456")
    });
  }
  removeRole(roleName) {
    const userId = this.selectedUser()?.id;
    if (!userId) {
      return;
    }
    this.usersService.removeUserFromRole(userId, roleName).subscribe({
      next: () => {
        this.userRoles.update((roles) => roles.filter((r) => r !== roleName));
        this.notify(`\u0420\u043E\u043B\u044C "${roleName}" \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043E`);
      },
      error: () => this.notify("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0440\u043E\u043B\u0456")
    });
  }
  // ── Actions ───────────────────────────
  onCreateUser() {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: "480px",
      data: { roles: this.allRoles() }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.usersService.create(result).subscribe({
          next: () => {
            this.notify("\u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043E");
            this.loadUsers();
          },
          error: (err) => {
            const msg = err.error?.detail || "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430";
            this.notify(msg);
          }
        });
      }
    });
  }
  /** Зміна пароля користувача
   * Якщо adminChange = true, то це адміністративна зміна логіну без підтвердження поточного пароля.
   * Використовується для примусового скидання логіну користувача адміністратором.
   * Якщо false (за замовчуванням), то користувач повинен ввести свій поточний пароль для підтвердження зміни логіну.
   */
  onChangePassword(adminChange = false) {
    const user = this.selectedUser();
    if (!user) {
      return;
    }
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: "400px",
      data: { userName: user.userName, adminChange }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (adminChange) {
          this.usersService.adminResetPassword(user.id, result).subscribe({
            next: () => {
              this.notify("\u041F\u0430\u0440\u043E\u043B\u044C \u0437\u043C\u0456\u043D\u0435\u043D\u043E");
              this.loadUsers();
            },
            error: (err) => {
              const msg = err.error?.detail || "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u043C\u0456\u043D\u0438 \u043F\u0430\u0440\u043E\u043B\u044F";
              this.notify(msg);
            }
          });
        } else {
          this.usersService.changePassword(user.id, result).subscribe({
            next: () => this.notify("\u041F\u0430\u0440\u043E\u043B\u044C \u0437\u043C\u0456\u043D\u0435\u043D\u043E"),
            error: (err) => {
              const msg = err.error?.detail || "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u043C\u0456\u043D\u0438 \u043F\u0430\u0440\u043E\u043B\u044F";
              this.notify(msg);
            }
          });
        }
      }
    });
  }
  /** Зміна логіну користувача
   * Якщо adminChange = true, то це адміністративна зміна логіну без підтвердження поточного пароля.
   * Використовується для примусового скидання логіну користувача адміністратором.
   * Якщо false (за замовчуванням), то користувач повинен ввести свій поточний пароль для підтвердження зміни логіну.
   */
  onChangeLogin(adminChange = false) {
    const user = this.selectedUser();
    if (!user) {
      return;
    }
    const dialogRef = this.dialog.open(ChangeLoginDialogComponent, {
      width: "400px",
      data: { userId: user.id, userName: user.userName, adminChange }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (adminChange) {
          this.usersService.adminChangeUsername(user.id, { newUserName: result.newUserName }).subscribe({
            next: () => {
              this.notify("\u041B\u043E\u0433\u0456\u043D \u0437\u043C\u0456\u043D\u0435\u043D\u043E");
              this.loadUsers();
            },
            error: (err) => {
              const msg = err.error?.detail || "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u043C\u0456\u043D\u0438 \u043B\u043E\u0433\u0456\u043D\u0443";
              this.notify(msg);
            }
          });
        } else {
          this.usersService.changeUsername(user.id, result).subscribe({
            next: () => {
              this.notify("\u041B\u043E\u0433\u0456\u043D \u0437\u043C\u0456\u043D\u0435\u043D\u043E");
              this.loadUsers();
            },
            error: (err) => {
              const msg = err.error?.detail || "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u043C\u0456\u043D\u0438 \u043B\u043E\u0433\u0456\u043D\u0443";
              this.notify(msg);
            }
          });
        }
      }
    });
  }
  /** Блокування/розблокування користувача */
  onToggleLockout(lock) {
    const user = this.selectedUser();
    if (!user) {
      return;
    }
    const action = lock ? "\u0437\u0430\u0431\u043B\u043E\u043A\u0443\u0432\u0430\u0442\u0438" : "\u0440\u043E\u0437\u0431\u043B\u043E\u043A\u0443\u0432\u0430\u0442\u0438";
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: lock ? "\u0411\u043B\u043E\u043A\u0443\u0432\u0430\u043D\u043D\u044F" : "\u0420\u043E\u0437\u0431\u043B\u043E\u043A\u0443\u0432\u0430\u043D\u043D\u044F",
        message: `\u0412\u0438 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u0456, \u0449\u043E \u0445\u043E\u0447\u0435\u0442\u0435 ${action} \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430 "${user.userName}"?`
      }
    });
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.usersService.setLockout(user.id, { lock }).subscribe({
          next: () => {
            this.notify(lock ? "\u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430 \u0437\u0430\u0431\u043B\u043E\u043A\u043E\u0432\u0430\u043D\u043E" : "\u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430 \u0440\u043E\u0437\u0431\u043B\u043E\u043A\u043E\u0432\u0430\u043D\u043E");
            this.selectUser(this.selectedUser());
            this.loadUsers();
          },
          error: () => this.notify("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u043C\u0456\u043D\u0438 \u0441\u0442\u0430\u0442\u0443\u0441\u0443")
        });
      }
    });
  }
  /** Видалення користувача */
  onDeleteUser() {
    const user = this.selectedUser();
    if (!user) {
      return;
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "\u0412\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430",
        message: `\u0412\u0438 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u0456, \u0449\u043E \u0445\u043E\u0447\u0435\u0442\u0435 \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430 "${user.userName}"? \u0426\u044E \u0434\u0456\u044E \u043D\u0435\u043C\u043E\u0436\u043B\u0438\u0432\u043E \u0441\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438.`,
        color: "warn"
      }
    });
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.usersService.delete(user.id).subscribe({
          next: () => {
            this.notify("\u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043E");
            this.selectedUser.set(null);
            this.loadUsers();
          },
          error: () => this.notify("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F")
        });
      }
    });
  }
  /** Налаштування / керування 2FA для вибраного користувача */
  onManage2FA() {
    const user = this.selectedUser();
    if (!user)
      return;
    console.log("[DEBUG] Opening 2FA management dialog for user:", user.userName);
    const dialogRef = this.dialog.open(TotpSetupDialogComponent, {
      width: "460px",
      maxWidth: "96vw",
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadUsers();
    });
  }
  notify(msg) {
    this.snackBar.open(msg, "OK", { duration: 3e3 });
  }
  getSoldierDisplayName(user) {
    if (!user.soldier) {
      return "\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u0438\u0439 (\u0431\u0435\u0437 \u043F\u0440\u0438\u0432'\u044F\u0437\u043A\u0438)";
    }
    const s = user.soldier;
    const rank = s.rankShortValue ? s.rankShortValue + " " : "";
    const midle = s.midleName ? " " + s.midleName : "";
    return `${rank}${s.lastName} ${s.firstName}${midle}`;
  }
  getSoldierUnit(user) {
    return user.soldier?.unitShortName || "\u2014";
  }
  getSoldierPosition(user) {
    return user.soldier?.positionValue || "\u2014";
  }
  static \u0275fac = function UsersPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UsersPage)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UsersPage, selectors: [["app-users-page"]], decls: 20, vars: 3, consts: [["roleSelect", ""], ["storageKey", "usersPage"], ["leftPanel", ""], [1, "panel-header"], ["mat-icon-button", "", "matTooltip", "\u041E\u043D\u043E\u0432\u0438\u0442\u0438 \u043F\u0435\u0440\u0435\u043B\u0456\u043A", 3, "click"], ["matTooltip", "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0438 \u0437\u0430\u0431\u043B\u043E\u043A\u043E\u0432\u0430\u043D\u0438\u0445", 3, "change", "checked"], [1, "spacer"], ["mat-raised-button", "", "color", "primary", "matTooltip", "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438", 3, "click"], [1, "user-list"], ["tabindex", "0", 1, "user-card", 3, "selected", "locked"], [1, "empty-list"], ["rightPanel", "", 2, "display", "flex", "flex-direction", "column", "height", "100%"], [1, "detail-panel"], [1, "no-selection"], ["tabindex", "0", 1, "user-card", 3, "click", "keydown.enter"], [1, "user-card-main"], [1, "user-icon"], [1, "user-info"], [1, "user-name"], [1, "user-login"], [1, "user-card-meta"], [1, "user-unit"], [1, "user-position"], ["color", "warn", "highlighted", ""], [1, "actions-row"], ["mat-stroked-button", "", 3, "click"], ["mat-stroked-button", "", "color", "primary"], ["mat-stroked-button", "", "color", "warn"], ["mat-stroked-button", "", "color", "warn", 3, "click"], [1, "info-grid"], [1, "info-row"], [1, "info-label"], [1, "info-value"], [2, "vertical-align", "middle", "margin-right", "6px"], [2, "display", "flex", "align-items", "center", "gap", "16px", "flex-wrap", "wrap"], ["color", "primary", "highlighted", ""], ["mat-stroked-button", "", 3, "click", "color"], [1, "roles-section"], [1, "no-roles"], [1, "add-role"], ["appearance", "outline", 1, "role-select"], [3, "value"], ["mat-icon-button", "", "color", "primary", "matTooltip", "\u0414\u043E\u0434\u0430\u0442\u0438 \u0440\u043E\u043B\u044C", 3, "click", "disabled"], ["mat-stroked-button", "", "color", "primary", 3, "click"], ["color", "accent", "highlighted", ""], ["matChipAvatar", ""], [3, "removed"], ["matChipRemove", ""]], template: function UsersPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "app-master-detail-layout", 1)(1, "div", 2)(2, "div", 3)(3, "button", 4);
      \u0275\u0275listener("click", function UsersPage_Template_button_click_3_listener() {
        return ctx.loadUsers();
      });
      \u0275\u0275elementStart(4, "mat-icon");
      \u0275\u0275text(5, "refresh");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "mat-slide-toggle", 5);
      \u0275\u0275listener("change", function UsersPage_Template_mat_slide_toggle_change_6_listener($event) {
        ctx.showInactive.set($event.checked);
        return ctx.loadUsers();
      });
      \u0275\u0275text(7, " \u0417\u0430\u0431\u043B\u043E\u043A\u043E\u0432\u0430\u043D\u0456 ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(8, "span", 6);
      \u0275\u0275elementStart(9, "button", 7);
      \u0275\u0275listener("click", function UsersPage_Template_button_click_9_listener() {
        return ctx.onCreateUser();
      });
      \u0275\u0275elementStart(10, "mat-icon");
      \u0275\u0275text(11, "person_add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(12, " \u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "div", 8);
      \u0275\u0275repeaterCreate(14, UsersPage_For_15_Template, 11, 10, "div", 9, _forTrack02, false, UsersPage_ForEmpty_16_Template, 2, 0, "div", 10);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 11);
      \u0275\u0275conditionalCreate(18, UsersPage_Conditional_18_Template, 111, 26, "div", 12)(19, UsersPage_Conditional_19_Template, 5, 0, "div", 13);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_2_0;
      \u0275\u0275advance(6);
      \u0275\u0275property("checked", ctx.showInactive());
      \u0275\u0275advance(8);
      \u0275\u0275repeater(ctx.users());
      \u0275\u0275advance(4);
      \u0275\u0275conditional((tmp_2_0 = ctx.selectedUser()) ? 18 : 19, tmp_2_0);
    }
  }, dependencies: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatIconModule,
    MatIcon,
    MatTooltipModule,
    MatTooltip,
    MatCardModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatChipsModule,
    MatChip,
    MatChipAvatar,
    MatChipRemove,
    MatChipRow,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatSelectModule,
    MatSelect,
    MatOption,
    MatInputModule,
    MatSlideToggleModule,
    MatSlideToggle,
    MatDialogModule,
    MatSnackBarModule,
    MasterDetailLayoutComponent,
    DatePipe
  ], styles: ["\n\n.panel-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 12px;\n  border-bottom: 1px solid #e0e0e0;\n}\n.spacer[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.user-list[_ngcontent-%COMP%] {\n  overflow-y: auto;\n  flex: 1;\n}\n.user-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding: 10px 14px;\n  border-bottom: 1px solid #eee;\n  cursor: pointer;\n  transition: background 0.15s;\n}\n.user-card[_ngcontent-%COMP%]:hover {\n  background: #f0f7ff;\n}\n.user-card.selected[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  border-left: 3px solid #1976d2;\n}\n.user-card.locked[_ngcontent-%COMP%] {\n  opacity: 0.65;\n}\n.user-card-main[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.user-icon[_ngcontent-%COMP%] {\n  color: #616161;\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.user-icon.locked[_ngcontent-%COMP%] {\n  color: #f44336;\n}\n.user-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.user-name[_ngcontent-%COMP%] {\n  font-weight: 500;\n  font-size: 14px;\n}\n.user-login[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #757575;\n}\n.user-card-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-top: 4px;\n  padding-left: 30px;\n}\n.user-unit[_ngcontent-%COMP%], \n.user-position[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #9e9e9e;\n}\n.empty-list[_ngcontent-%COMP%] {\n  padding: 24px;\n  text-align: center;\n  color: #9e9e9e;\n}\n.detail-panel[_ngcontent-%COMP%] {\n  padding: 16px;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.detail-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.detail-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 0;\n  font-size: 18px;\n}\n.info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  gap: 6px 16px;\n  padding: 8px 0;\n}\n.info-row[_ngcontent-%COMP%] {\n  display: contents;\n}\n.info-label[_ngcontent-%COMP%] {\n  color: #757575;\n  font-size: 13px;\n  white-space: nowrap;\n}\n.info-value[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 500;\n}\n.roles-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-bottom: 12px;\n}\n.no-roles[_ngcontent-%COMP%] {\n  color: #9e9e9e;\n  font-size: 13px;\n}\n.add-role[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.role-select[_ngcontent-%COMP%] {\n  width: 200px;\n}\n.actions-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  padding: 8px 0;\n}\n.no-selection[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  color: #bdbdbd;\n}\n.no-selection[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  margin-bottom: 16px;\n}\n.no-selection[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n/*# sourceMappingURL=Users.page.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UsersPage, [{
    type: Component,
    args: [{ selector: "app-users-page", imports: [
      CommonModule,
      FormsModule,
      MatButtonModule,
      MatIconModule,
      MatTooltipModule,
      MatCardModule,
      MatChipsModule,
      MatFormFieldModule,
      MatSelectModule,
      MatInputModule,
      MatSlideToggleModule,
      MatDialogModule,
      MatSnackBarModule,
      MasterDetailLayoutComponent,
      TotpSetupDialogComponent
    ], template: `<app-master-detail-layout storageKey="usersPage">
  <!-- Left Panel: \u041F\u0435\u0440\u0435\u043B\u0456\u043A \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0456\u0432 -->
  <div leftPanel>
    <div class="panel-header">
      <button mat-icon-button (click)="loadUsers()" matTooltip="\u041E\u043D\u043E\u0432\u0438\u0442\u0438 \u043F\u0435\u0440\u0435\u043B\u0456\u043A">
        <mat-icon>refresh</mat-icon>
      </button>
      <mat-slide-toggle
        [checked]="showInactive()"
        (change)="showInactive.set($event.checked); loadUsers()"
        matTooltip="\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0438 \u0437\u0430\u0431\u043B\u043E\u043A\u043E\u0432\u0430\u043D\u0438\u0445"
      >
        \u0417\u0430\u0431\u043B\u043E\u043A\u043E\u0432\u0430\u043D\u0456
      </mat-slide-toggle>
      <span class="spacer"></span>
      <button mat-raised-button color="primary" (click)="onCreateUser()" matTooltip="\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438">
        <mat-icon>person_add</mat-icon>
        \u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438
      </button>
    </div>

    <div class="user-list">
      @for (user of users(); track user.id) {
        <div
          class="user-card"
          [class.selected]="selectedUser()?.id === user.id"
          [class.locked]="user.isLocked"
          (click)="selectUser(user)"
          (keydown.enter)="selectUser(user)"
          tabindex="0"
        >
          <div class="user-card-main">
            <mat-icon class="user-icon" [class.locked]="user.isLocked">
              {{ user.isLocked ? 'lock' : 'person' }}
            </mat-icon>
            <div class="user-info">
              <span class="user-name">{{ getSoldierDisplayName(user) }}</span>
              <span class="user-login">{{ user.userName }}</span>
            </div>
          </div>
          <div class="user-card-meta">
            @if (user.soldier) {
              <span class="user-unit">{{ getSoldierUnit(user) }}</span>
              <span class="user-position">{{ getSoldierPosition(user) }}</span>
            }
          </div>
        </div>
      } @empty {
        <div class="empty-list">\u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0456\u0432 \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E</div>
      }
    </div>
  </div>

  <!-- Right Panel: \u0414\u0435\u0442\u0430\u043B\u0456 \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430 -->
  <div rightPanel style="display: flex; flex-direction: column; height: 100%">
    @if (selectedUser(); as user) {
      <div class="detail-panel">
        <mat-card>
          <mat-card-header>
            <mat-card-title>
              <mat-icon>person</mat-icon>
              {{ getSoldierDisplayName(user) }}
              @if (user.isLocked) {
                <mat-chip color="warn" highlighted>\u0417\u0430\u0431\u043B\u043E\u043A\u043E\u0432\u0430\u043D\u043E</mat-chip>
              }
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="actions-row">
              <button mat-stroked-button (click)="onChangePassword(false)">
                <mat-icon>key</mat-icon>
                \u0417\u043C\u0456\u043D\u0438\u0442\u0438 \u043F\u0430\u0440\u043E\u043B\u044C
              </button>
              <button mat-stroked-button (click)="onChangeLogin(false)">
                <mat-icon>edit</mat-icon>
                \u0417\u043C\u0456\u043D\u0438\u0442\u0438 \u041B\u043E\u0433\u0456\u043D
              </button>

              <button mat-stroked-button (click)="onChangePassword(true)">
                <mat-icon>lock_reset</mat-icon>
                \u0421\u043A\u0438\u043D\u0443\u0442\u0438 \u043F\u0430\u0440\u043E\u043B\u044C
              </button>
              <button mat-stroked-button (click)="onChangeLogin(true)">
                <mat-icon>manage_accounts</mat-icon>
                \u0421\u043A\u0438\u043D\u0443\u0442\u0438 \u041B\u043E\u0433\u0456\u043D
              </button>

              @if (user.isLocked) {
                <button mat-stroked-button color="primary" (click)="onToggleLockout(false)">
                  <mat-icon>lock_open</mat-icon>
                  \u0420\u043E\u0437\u0431\u043B\u043E\u043A\u0443\u0432\u0430\u0442\u0438
                </button>
              } @else {
                <button mat-stroked-button color="warn" (click)="onToggleLockout(true)">
                  <mat-icon>lock</mat-icon>
                  \u0417\u0430\u0431\u043B\u043E\u043A\u0443\u0432\u0430\u0442\u0438
                </button>
              }
              <button mat-stroked-button color="warn" (click)="onDeleteUser()">
                <mat-icon>delete</mat-icon>
                \u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438
              </button>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- \u041E\u0441\u043D\u043E\u0432\u043D\u0430 \u0456\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044F -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>\u041E\u0431\u043B\u0456\u043A\u043E\u0432\u0438\u0439 \u0437\u0430\u043F\u0438\u0441</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="info-grid">
              <div class="info-row">
                <span class="info-label">\u041B\u043E\u0433\u0456\u043D:</span>
                <span class="info-value">{{ user.userName }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Email:</span>
                <span class="info-value">{{ user.email || '\u2014' }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">\u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B:</span>
                <span class="info-value">{{ getSoldierUnit(user) }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">\u041F\u043E\u0441\u0430\u0434\u0430:</span>
                <span class="info-value">{{ getSoldierPosition(user) }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">\u041E\u0441\u0442\u0430\u043D\u043D\u0456\u0439 \u0432\u0445\u0456\u0434:</span>
                <span class="info-value">{{
                  user.lastLoginDate ? (user.lastLoginDate | date: 'dd.MM.yyyy HH:mm') : '\u041D\u0456\u043A\u043E\u043B\u0438'
                }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">\u0420\u0435\u0454\u0441\u0442\u0440\u0430\u0446\u0456\u044F:</span>
                <span class="info-value">{{ user.registrationDate | date: 'dd.MM.yyyy' }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">\u041E\u0441\u0442\u0430\u043D\u043D\u044F \u0437\u043C\u0456\u043D\u0430 \u043F\u0430\u0440\u043E\u043B\u044F:</span>
                <span class="info-value">{{
                  user.lastPasswordChangeDate
                    ? (user.lastPasswordChangeDate | date: 'dd.MM.yyyy HH:mm')
                    : '\u041D\u0456\u043A\u043E\u043B\u0438'
                }}</span>
              </div>
              @if (user.requirePasswordChange) {
                <div class="info-row">
                  <span class="info-label"></span>
                  <mat-chip color="accent" highlighted>\u041F\u043E\u0442\u0440\u0456\u0431\u043D\u0430 \u0437\u043C\u0456\u043D\u0430 \u043F\u0430\u0440\u043E\u043B\u044F</mat-chip>
                </div>
              }
            </div>
          </mat-card-content>
        </mat-card>

        <!-- \u0414\u0432\u043E\u0444\u0430\u043A\u0442\u043E\u0440\u043D\u0430 \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0456\u043A\u0430\u0446\u0456\u044F -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>
              <mat-icon style="vertical-align: middle; margin-right: 6px;">security</mat-icon>
              \u0414\u0432\u043E\u0444\u0430\u043A\u0442\u043E\u0440\u043D\u0430 \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0456\u043A\u0430\u0446\u0456\u044F
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
              @if (user.twoFactorEnabled) {
                <mat-chip color="primary" highlighted>
                  <mat-icon matChipAvatar>verified_user</mat-icon>
                  \u0423\u0432\u0456\u043C\u043A\u043D\u0435\u043D\u0430
                </mat-chip>
              } @else {
                <mat-chip>
                  <mat-icon matChipAvatar>no_encryption</mat-icon>
                  \u0412\u0438\u043C\u043A\u043D\u0435\u043D\u0430
                </mat-chip>
              }
              <button mat-stroked-button [color]="user.twoFactorEnabled ? 'warn' : 'primary'" (click)="onManage2FA()">
                <mat-icon>{{ user.twoFactorEnabled ? 'lock_open' : 'qr_code_2' }}</mat-icon>
                {{ user.twoFactorEnabled ? '\u041A\u0435\u0440\u0443\u0432\u0430\u0442\u0438 2FA' : '\u041D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u0442\u0438 2FA' }}
              </button>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- \u0420\u043E\u043B\u0456 -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>\u0420\u043E\u043B\u0456</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="roles-section">
              @for (role of userRoles(); track role) {
                <mat-chip-row (removed)="removeRole(role)">
                  {{ role }}
                  <button matChipRemove>
                    <mat-icon>cancel</mat-icon>
                  </button>
                </mat-chip-row>
              } @empty {
                <span class="no-roles">\u0420\u043E\u043B\u0456 \u043D\u0435 \u043F\u0440\u0438\u0437\u043D\u0430\u0447\u0435\u043D\u043E</span>
              }
            </div>
            <div class="add-role">
              <mat-form-field appearance="outline" class="role-select">
                <mat-label>\u0414\u043E\u0434\u0430\u0442\u0438 \u0440\u043E\u043B\u044C</mat-label>
                <mat-select #roleSelect>
                  @for (role of availableRoles(); track role.id) {
                    <mat-option [value]="role.value">{{ role.value }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>
              <button
                mat-icon-button
                color="primary"
                (click)="addRole(roleSelect.value); roleSelect.value = ''"
                [disabled]="!roleSelect.value"
                matTooltip="\u0414\u043E\u0434\u0430\u0442\u0438 \u0440\u043E\u043B\u044C"
              >
                <mat-icon>add_circle</mat-icon>
              </button>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    } @else {
      <div class="no-selection">
        <mat-icon>person_search</mat-icon>
        <p>\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430 \u0437 \u043F\u0435\u0440\u0435\u043B\u0456\u043A\u0443</p>
      </div>
    }
  </div>
</app-master-detail-layout>
`, styles: ["/* src/Login/Users.page.scss */\n.panel-header {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 12px;\n  border-bottom: 1px solid #e0e0e0;\n}\n.spacer {\n  flex: 1;\n}\n.user-list {\n  overflow-y: auto;\n  flex: 1;\n}\n.user-card {\n  display: flex;\n  flex-direction: column;\n  padding: 10px 14px;\n  border-bottom: 1px solid #eee;\n  cursor: pointer;\n  transition: background 0.15s;\n}\n.user-card:hover {\n  background: #f0f7ff;\n}\n.user-card.selected {\n  background: #e3f2fd;\n  border-left: 3px solid #1976d2;\n}\n.user-card.locked {\n  opacity: 0.65;\n}\n.user-card-main {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.user-icon {\n  color: #616161;\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.user-icon.locked {\n  color: #f44336;\n}\n.user-info {\n  display: flex;\n  flex-direction: column;\n}\n.user-name {\n  font-weight: 500;\n  font-size: 14px;\n}\n.user-login {\n  font-size: 12px;\n  color: #757575;\n}\n.user-card-meta {\n  display: flex;\n  gap: 12px;\n  margin-top: 4px;\n  padding-left: 30px;\n}\n.user-unit,\n.user-position {\n  font-size: 11px;\n  color: #9e9e9e;\n}\n.empty-list {\n  padding: 24px;\n  text-align: center;\n  color: #9e9e9e;\n}\n.detail-panel {\n  padding: 16px;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.detail-header {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.detail-header h3 {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 0;\n  font-size: 18px;\n}\n.info-grid {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  gap: 6px 16px;\n  padding: 8px 0;\n}\n.info-row {\n  display: contents;\n}\n.info-label {\n  color: #757575;\n  font-size: 13px;\n  white-space: nowrap;\n}\n.info-value {\n  font-size: 13px;\n  font-weight: 500;\n}\n.roles-section {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-bottom: 12px;\n}\n.no-roles {\n  color: #9e9e9e;\n  font-size: 13px;\n}\n.add-role {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.role-select {\n  width: 200px;\n}\n.actions-row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  padding: 8px 0;\n}\n.no-selection {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  color: #bdbdbd;\n}\n.no-selection mat-icon {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  margin-bottom: 16px;\n}\n.no-selection p {\n  font-size: 16px;\n}\n/*# sourceMappingURL=Users.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UsersPage, { className: "UsersPage", filePath: "Login/Users.page.ts", lineNumber: 50 });
})();
export {
  UsersPage
};
//# sourceMappingURL=chunk-7EJG5JSI.js.map
