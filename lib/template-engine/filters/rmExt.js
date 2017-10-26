export default function rmExt(string) {
  return string.replace(/\.[^.]+$/g, '');
}
