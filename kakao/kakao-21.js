// https://programmers.co.kr/learn/courses/30/lessons/72410
function solution(new_id) {
  let replaceId =
    new_id
      .toLowerCase()
      .replace(/[^a-z0-9-_.]/g, '')
      .replace(/\.{2,}/g, '.')
      .replace(/^\./, '')
      .replace(/\.$/, '')
      .slice(0, 15)
      .replace(/\.$/, '') || 'a';
  if (replaceId.length <= 2)
    replaceId += replaceId[replaceId.length - 1].repeat(3 - replaceId.length);
  return replaceId;
}
