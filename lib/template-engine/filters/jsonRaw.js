export default function jsonRaw(jsonStr) {
  return jsonStr.replace(/\"/g, '\'');
}
