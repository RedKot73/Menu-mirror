import {
  MatDivider,
  MatDividerModule
} from "./chunk-RWT4ZOKS.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-TBM54MBO.js";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-USFCJNJC.js";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from "./chunk-GK72CHMD.js";
import {
  DefaultValueAccessor,
  FormControl,
  FormControlDirective,
  MatFormField,
  MatFormFieldModule,
  MatIcon,
  MatIconModule,
  MatInput,
  MatInputModule,
  MatLabel,
  MaxLengthValidator,
  NgControlStatus,
  ReactiveFormsModule,
  Validators
} from "./chunk-GX6V5MPD.js";
import {
  Component,
  HttpClient,
  Injectable,
  MatButton,
  MatButtonModule,
  __async,
  __commonJS,
  __toESM,
  catchError,
  forkJoin,
  inject,
  map,
  of,
  setClassMetadata,
  signal,
  throwError,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-6223PFVC.js";

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
      return {
        sharedKey: data.manualEntryKey,
        authenticatorUri: data.qrUri,
        serverTimeIso: data.serverTimeIso
      };
    }), catchError((err) => {
      console.error("[ERROR] 2FA getSetup failed:", err?.message ?? err);
      if (err.error) {
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
      return { isTwoFactorEnabled: enabled };
    }), catchError((err) => {
      console.error("[ERROR] 2FA getStatus failed:", err);
      if (err.error) {
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
    \u0275\u0275elementStart(0, "div", 23)(1, "mat-icon", 36);
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
    \u0275\u0275elementStart(0, "button", 41);
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
    \u0275\u0275element(0, "mat-spinner", 48);
  }
}
function TotpSetupDialogComponent_Conditional_6_Conditional_3_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "p", 42)(2, "mat-icon", 43);
    \u0275\u0275text(3, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043F\u043E\u0442\u043E\u0447\u043D\u0438\u0439 \u043F\u0430\u0440\u043E\u043B\u044C \u0434\u043B\u044F \u043F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F \u0432\u0438\u043C\u043A\u043D\u0435\u043D\u043D\u044F 2FA: ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "mat-form-field", 44)(6, "mat-label");
    \u0275\u0275text(7, "\u041F\u0430\u0440\u043E\u043B\u044C");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "input", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 46)(10, "button", 47);
    \u0275\u0275listener("click", function TotpSetupDialogComponent_Conditional_6_Conditional_3_Conditional_9_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.disableTotp());
    });
    \u0275\u0275conditionalCreate(11, TotpSetupDialogComponent_Conditional_6_Conditional_3_Conditional_9_Conditional_11_Template, 1, 0, "mat-spinner", 48);
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
    \u0275\u0275elementStart(0, "div", 11)(1, "mat-icon", 37);
    \u0275\u0275text(2, "verified_user");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 38);
    \u0275\u0275text(4, "\u0414\u0432\u043E\u0444\u0430\u043A\u0442\u043E\u0440\u043D\u0430 \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0456\u043A\u0430\u0446\u0456\u044F ");
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6, "\u0443\u0432\u0456\u043C\u043A\u043D\u0435\u043D\u0430");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, ".");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, TotpSetupDialogComponent_Conditional_6_Conditional_3_Conditional_8_Template, 4, 0, "button", 39)(9, TotpSetupDialogComponent_Conditional_6_Conditional_3_Conditional_9_Template, 15, 3, "div", 40);
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
          width: 200,
          color: { dark: "#000000", light: "#ffffff" }
        });
        this.qrDataUrl.set(dataUrl);
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TotpSetupDialogComponent, selectors: [["app-totp-setup-dialog"]], decls: 10, vars: 1, consts: [["mat-dialog-title", ""], [2, "vertical-align", "middle", "margin-right", "8px"], [2, "min-width", "480px", "max-width", "560px"], [2, "display", "flex", "justify-content", "center", "padding", "24px"], ["align", "end"], ["mat-button", "", "mat-dialog-close", ""], ["diameter", "40"], [2, "color", "#c62828", "margin-bottom", "14px", "padding", "10px 14px", "background", "#ffebee", "border-radius", "6px", "font-size", "14px", "display", "flex", "align-items", "center", "gap", "8px"], [2, "color", "#e65100", "margin-bottom", "14px", "padding", "10px 14px", "background", "#fff3e0", "border", "1px solid #ffe0b2", "border-radius", "6px", "font-size", "13px", "display", "flex", "align-items", "center", "gap", "8px"], [2, "font-size", "18px"], [2, "font-size", "20px"], [2, "display", "flex", "align-items", "center", "gap", "10px", "margin-bottom", "10px"], [2, "color", "#757575", "font-size", "22px"], [2, "font-size", "14px"], ["mat-raised-button", "", "color", "primary"], [2, "border", "1px solid #e0e0e0", "border-radius", "8px", "padding", "12px"], ["mat-raised-button", "", "color", "primary", 3, "click"], [2, "display", "flex", "align-items", "center", "gap", "10px", "min-height", "56px"], [2, "display", "flex", "flex-direction", "row", "gap", "14px", "align-items", "flex-start"], ["diameter", "24", 2, "flex-shrink", "0"], [2, "font-size", "13px", "opacity", "0.7"], [2, "flex-shrink", "0"], ["alt", "QR Code", "width", "200", "height", "200", 2, "border", "1px solid #e0e0e0", "border-radius", "8px", "padding", "3px", "display", "block", 3, "src"], [2, "width", "200px", "height", "200px", "display", "flex", "align-items", "center", "justify-content", "center", "background", "#f5f5f5", "border-radius", "8px", "color", "#ef5350"], [2, "flex", "1", "display", "flex", "flex-direction", "column", "gap", "6px"], [2, "font-weight", "600", "margin", "0", "font-size", "12px", "line-height", "1.4"], [2, "font-size", "11px", "opacity", "0.65", "margin", "0"], [2, "font-family", "monospace", "font-size", "11px", "padding", "6px 8px", "background", "#f5f5f5", "border", "1px dashed #bdbdbd", "border-radius", "6px", "letter-spacing", "2px", "user-select", "all", "word-break", "break-all", "line-height", "1.5"], [2, "margin", "2px 0"], [2, "font-weight", "600", "margin", "0", "font-size", "12px"], ["appearance", "outline", "subscriptSizing", "dynamic", 2, "width", "100%"], ["matInput", "", "maxlength", "6", "inputmode", "numeric", "autocomplete", "one-time-code", "placeholder", "000000", 3, "formControl"], [2, "display", "flex", "gap", "8px", "flex-wrap", "wrap"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["diameter", "16", 2, "display", "inline-block", "margin-right", "4px"], ["mat-button", "", 3, "click"], [2, "font-size", "32px", "width", "32px", "height", "32px"], [2, "color", "#2e7d32", "font-size", "22px"], [2, "font-size", "14px", "color", "#2e7d32"], ["mat-stroked-button", "", "color", "warn"], [2, "padding", "16px", "background", "#fff3e0", "border-radius", "8px", "border", "1px solid #ffe0b2"], ["mat-stroked-button", "", "color", "warn", 3, "click"], [2, "margin", "0 0 12px", "font-size", "14px"], [2, "font-size", "16px", "vertical-align", "middle", "color", "#e65100", "margin-right", "4px"], ["appearance", "outline", 2, "width", "100%"], ["matInput", "", "type", "password", 3, "formControl"], [2, "display", "flex", "gap", "8px", "margin-top", "4px"], ["mat-raised-button", "", "color", "warn", 3, "click", "disabled"], ["diameter", "18", 2, "display", "inline-block", "margin-right", "6px"]], template: function TotpSetupDialogComponent_Template(rf, ctx) {
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

    <mat-dialog-content style="min-width: 480px; max-width: 560px;">

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

                  <div style="flex-shrink:0;">
                    @if (qrDataUrl()) {
                      <img
                        [src]="qrDataUrl()"
                        alt="QR Code"
                        width="200"
                        height="200"
                        style="border:1px solid #e0e0e0; border-radius:8px; padding:3px; display:block;"
                      />
                    } @else {
                      <div style="width:200px; height:200px; display:flex; align-items:center; justify-content:center; background:#f5f5f5; border-radius:8px; color:#ef5350;">
                        <mat-icon style="font-size:32px; width:32px; height:32px;">qr_code_2</mat-icon>
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TotpSetupDialogComponent, { className: "TotpSetupDialogComponent", filePath: "app/auth/TotpSetupDialog.component.ts", lineNumber: 224 });
})();

export {
  TotpSetupDialogComponent
};
//# sourceMappingURL=chunk-5T2AWAIE.js.map
