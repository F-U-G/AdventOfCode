"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mul = mul;
// Seperated this as its one funciton, should be useful for part 2 of day 3.
// accepts a string "(*,*)" where * is a int with 1 to 3 digits
// returns an int of the two numbers multiplied 
function mul(item) {
    // vars, changeVar is used to note when the next number starts in the string
    var x = "";
    var y = "";
    var changeVar = false;
    // iterate over string(item)
    for (var _i = 0, item_1 = item; _i < item_1.length; _i++) {
        var char = item_1[_i];
        if (char === '(' || char === ')') {
            continue;
        }
        else if (char === ',') {
            changeVar = true;
            continue;
        }
        ;
        if (changeVar) {
            y += char;
        }
        else {
            x += char;
        }
        ;
    }
    ;
    return Number(x) * Number(y);
}
function runDay3() {
    return __awaiter(this, void 0, void 0, function () {
        var regexmul, file, response, text, data, total;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    regexmul = /mul\(\d{1,3},\d{1,3}\)/g;
                    file = "/src/day3/day3Input.txt";
                    return [4 /*yield*/, fetch(file)];
                case 1:
                    response = _a.sent();
                    // Error check
                    if (!response.ok) {
                        alert("response is NOT ok");
                        return [2 /*return*/];
                    }
                    ;
                    return [4 /*yield*/, response.text()];
                case 2:
                    text = _a.sent();
                    data = text.match(regexmul);
                    total = 0;
                    data.map(function (item) {
                        // create substring that removes the "mul" out of each string
                        item = item.substring(3);
                        // use our mul function to do a basic calc and conversion
                        total += mul(item);
                    });
                    // This is it, Should work unless it was changed, Total should be 170068701
                    console.log(total);
                    return [2 /*return*/];
            }
        });
    });
}
runDay3();
