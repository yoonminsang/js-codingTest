function solution(genres, plays) {
  const obj = genres.reduce((acc, genre, index) => {
    const play = plays[index];
    const pushArr = [play, index];
    if (!acc[genre]) acc[genre] = [pushArr];
    else acc[genre].push(pushArr);
    return acc;
  });
  console.log(obj);
}

console.log(
  solution(
    ['classic', 'pop', 'classic', 'classic', 'pop'],
    [500, 600, 150, 800, 2500]
  )
);
