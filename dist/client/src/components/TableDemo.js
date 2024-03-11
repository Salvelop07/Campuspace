"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableDemo = void 0;
const table_1 = require("@/components/ui/table");
const data_json_1 = __importDefault(require("../../data.json"));
function TableDemo() {
    return (<>
    <h1 className="text-3xl text-center my-6">Vacant rooms</h1>
    <table_1.Table className="mx-auto md:w-3/5 w-4/5">
      <table_1.TableCaption>Rooms vacant in the college for extra classes.</table_1.TableCaption>
      <table_1.TableHeader>
        <table_1.TableRow>
          <table_1.TableHead>Room Number</table_1.TableHead>
          <table_1.TableHead>Capacity</table_1.TableHead>
          <table_1.TableHead>Location</table_1.TableHead>
        </table_1.TableRow>
      </table_1.TableHeader>
      <table_1.TableBody>
        {data_json_1.default.map((room, index) => (<table_1.TableRow key={index} className="w-full">
            <table_1.TableCell>{room.roomNumber}</table_1.TableCell>
            <table_1.TableCell>{room.capacity}</table_1.TableCell>
            <table_1.TableCell>{room.location}</table_1.TableCell>
          </table_1.TableRow>))}
      </table_1.TableBody>
      <table_1.TableFooter>
        <table_1.TableRow>
          <table_1.TableCell colSpan={2}>Total</table_1.TableCell>
          <table_1.TableCell>{data_json_1.default.length}</table_1.TableCell>
        </table_1.TableRow>
      </table_1.TableFooter>
    </table_1.Table>
    </>);
}
exports.TableDemo = TableDemo;
