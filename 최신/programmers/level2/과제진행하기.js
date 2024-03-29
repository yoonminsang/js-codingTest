// https://school.programmers.co.kr/learn/courses/30/lessons/176962

// 첫번째 시도 힘겹게 성공
// 성공은 했지만 굉장히 복잡하게 풀었음.

const timeToMinute = (time) => {
  const [hour, minute] = time.split(':').map(Number);
  return hour * 60 + minute;
};

const getFilteredPlans = (plans) => {
  const result = plans.map((plan) => {
    return { name: plan[0], startTime: timeToMinute(plan[1]), remainTime: Number(plan[2]) };
  });
  result.sort((a, b) => a.startTime - b.startTime);
  return result;
};

function solution(plans) {
  const result = [];
  const filteredPlans = getFilteredPlans(plans);
  const stoppedPlans = [];
  let currTime = filteredPlans[0].startTime;
  while (filteredPlans.length + stoppedPlans.length > 0) {
    if (filteredPlans.length + stoppedPlans.length === 1) {
      const nowPlan = filteredPlans[0] ?? stoppedPlans.at(-1);
      result.push(nowPlan.name);
      break;
    }
    const [nowPlan, nowPlanStatus, nextPlan, nextPlanStatus] = (() => {
      // s s
      if (filteredPlans.length === 0) {
        return [stoppedPlans.at(-1), 's', stoppedPlans.at(-2), 's'];
      }
      // f
      if (filteredPlans[0]?.startTime === currTime) {
        // f s
        if (
          filteredPlans.length === 1 ||
          (currTime + filteredPlans[0].remainTime <= filteredPlans[1].startTime && stoppedPlans.length > 0)
        ) {
          return [filteredPlans[0], 'f', stoppedPlans.at(-1), 's'];
        }
        // f f
        return [filteredPlans[0], 'f', filteredPlans[1], 'f'];
      }
      // s f
      if (stoppedPlans.length === 1 || currTime + stoppedPlans.at(-1).remainTime > filteredPlans[0].startTime) {
        return [stoppedPlans.at(-1), 's', filteredPlans[0], 'f'];
      }
      // s s
      return [stoppedPlans.at(-1), 's', stoppedPlans.at(-2), 's'];
    })();
    // 현재 plan을 완료할 수 있는 경우
    if (nextPlanStatus === 's' || currTime + nowPlan.remainTime <= nextPlan.startTime) {
      if (nowPlanStatus === 'f') result.push(filteredPlans.shift().name);
      else result.push(stoppedPlans.pop().name);
    }
    // 현재 plan을 완료할 수 없는 경우
    else {
      nowPlan.remainTime -= nextPlan.startTime - currTime;
      if (nowPlanStatus === 'f') stoppedPlans.push(filteredPlans.shift());
    }
    currTime = (() => {
      if (nextPlanStatus === 'f') return nextPlan.startTime;
      return currTime + nowPlan.remainTime;
    })();
  }
  return result;
}
// 두번째 시도. 정확히는 다른 사람의 풀이를 참고해서 품.

function solution(plans) {
  const result = [];
  const filteredPlans = getFilteredPlans(plans);
  const stoppedPlans = []; // stack
  let currTime = 0;
  filteredPlans.forEach((plan) => {
    let lastStoppedPlan = stoppedPlans.at(-1);
    while (lastStoppedPlan) {
      const diff = plan.startTime - currTime;
      if (diff < lastStoppedPlan.remainTime) {
        lastStoppedPlan.remainTime -= diff;
        break;
      }
      const temp = stoppedPlans.pop();
      currTime += temp.remainTime;
      result.push(temp.name);
      lastStoppedPlan = stoppedPlans.at(-1);
    }
    currTime = plan.startTime;
    stoppedPlans.push(plan);
  });
  return [...result, ...stoppedPlans.map(({ name }) => name).reverse()];
}
