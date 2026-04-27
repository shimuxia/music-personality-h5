import type { Question } from '../types/quiz'

export const questions: Question[] = [
  {
    id: 'night-room',
    prompt: '深夜终于安静下来，你最像会做哪件事？',
    scene: '在最松弛的时刻，情绪通常不会说谎。',
    options: [
      {
        id: 'night-room-order',
        label: 'A',
        text: '把灯调暗，慢慢整理房间和桌面，让一切回到顺序里。',
        weights: { C: 3, G: 1 },
      },
      {
        id: 'night-room-drift',
        label: 'B',
        text: '刷着手机发呆，任由思绪在没名字的地方漂流。',
        weights: { D: 2, A: 2 },
      },
      {
        id: 'night-room-write',
        label: 'C',
        text: '写下一小段只想留给自己的句子，像给情绪留底稿。',
        weights: { E: 2, F: 2 },
      },
      {
        id: 'night-room-still',
        label: 'D',
        text: '什么都不做，只安静坐着，等心里那阵波纹自己退去。',
        weights: { F: 3, A: 1 },
      },
    ],
  },
  {
    id: 'cancel-plan',
    prompt: '朋友突然取消见面，你的第一反应更接近哪一种？',
    scene: '计划被打断时，最能看见一个人的底层节奏。',
    options: [
      {
        id: 'cancel-plan-relief',
        label: 'A',
        text: '有点松一口气，终于把这段时间完整还给自己。',
        weights: { F: 2, C: 2 },
      },
      {
        id: 'cancel-plan-alternative',
        label: 'B',
        text: '立刻给今天换一个新去处，不想让情绪停在原地。',
        weights: { D: 2, E: 2 },
      },
      {
        id: 'cancel-plan-meaning',
        label: 'C',
        text: '短暂失落一下，然后开始猜这是不是另一种命运安排。',
        weights: { A: 2, B: 2 },
      },
      {
        id: 'cancel-plan-detached',
        label: 'D',
        text: '还好，计划本来就该能随时被改写。',
        weights: { B: 2, G: 2 },
      },
    ],
  },
  {
    id: 'moving-scene',
    prompt: '哪一种画面，会让你莫名其妙停下来多看几秒？',
    scene: '被打动的瞬间，往往最像你自己。',
    options: [
      {
        id: 'moving-scene-snow',
        label: 'A',
        text: '空旷街道上刚落完雪，城市像忽然学会了沉默。',
        weights: { F: 2, A: 2 },
      },
      {
        id: 'moving-scene-rain-run',
        label: 'B',
        text: '暴雨里有人迎着风跑，明明狼狈却很有生命力。',
        weights: { E: 3, B: 1 },
      },
      {
        id: 'moving-scene-window',
        label: 'C',
        text: '黄昏窗边的一杯温水，一切都很普通，却刚好让人鼻酸。',
        weights: { A: 3, C: 1 },
      },
      {
        id: 'moving-scene-workbench',
        label: 'D',
        text: '凌晨还亮着灯的工作台，像有人在认真修补自己的世界。',
        weights: { G: 3, C: 1 },
      },
    ],
  },
  {
    id: 'belief-line',
    prompt: '下面这句话里，你更愿意把哪一句留给自己？',
    scene: '偏爱的句子，通常比自我介绍更准确。',
    options: [
      {
        id: 'belief-line-stability',
        label: 'A',
        text: '稳定不是无聊，而是很少被说出口的力量。',
        weights: { C: 3, F: 1 },
      },
      {
        id: 'belief-line-journey',
        label: 'B',
        text: '没走过的路，才会带来真正的新鲜感。',
        weights: { D: 3, B: 1 },
      },
      {
        id: 'belief-line-expression',
        label: 'C',
        text: '如果情绪足够真实，它就值得被看见。',
        weights: { E: 3, A: 1 },
      },
      {
        id: 'belief-line-pattern',
        label: 'D',
        text: '把混乱整理出形状，本身就是一种浪漫。',
        weights: { G: 3, C: 1 },
      },
    ],
  },
  {
    id: 'film-score',
    prompt: '如果你的生活是一段电影配乐，它更像哪一种声音？',
    scene: '你不需要懂音乐，也会本能地选出自己的气质。',
    options: [
      {
        id: 'film-score-piano',
        label: 'A',
        text: '缓慢而克制的钢琴独白，像一句没说出口的话。',
        weights: { A: 2, F: 2 },
      },
      {
        id: 'film-score-pulse',
        label: 'B',
        text: '越来越近的电子脉冲，带一点危险感，也带一点上瘾。',
        weights: { B: 2, E: 2 },
      },
      {
        id: 'film-score-strings',
        label: 'C',
        text: '温暖的弦乐重奏，不喧哗，但总能稳稳托住情绪。',
        weights: { C: 3, A: 1 },
      },
      {
        id: 'film-score-improv',
        label: 'D',
        text: '不知道下一拍会去哪里的即兴段落，流动本身就是答案。',
        weights: { D: 2, G: 2 },
      },
    ],
  },
  {
    id: 'conflict-mode',
    prompt: '面对冲突时，你通常更接近哪种处理方式？',
    scene: '矛盾出现时，每个人的节拍都会暴露出来。',
    options: [
      {
        id: 'conflict-mode-reason',
        label: 'A',
        text: '先拆清问题，再一条一条谈，别让情绪吞掉重点。',
        weights: { G: 2, C: 2 },
      },
      {
        id: 'conflict-mode-delay',
        label: 'B',
        text: '先退开一点，等心里不那么乱了再开口。',
        weights: { A: 2, F: 2 },
      },
      {
        id: 'conflict-mode-direct',
        label: 'C',
        text: '直接说透，不想让真正的问题继续躲在表面下面。',
        weights: { E: 2, B: 2 },
      },
      {
        id: 'conflict-mode-detour',
        label: 'D',
        text: '不一定正面硬碰，但会在别的地方重新找回主动权。',
        weights: { D: 2, B: 2 },
      },
    ],
  },
  {
    id: 'nature-form',
    prompt: '如果要把自己比作一种自然现象，你更像什么？',
    scene: '有些比喻，天生就带着人格感。',
    options: [
      {
        id: 'nature-form-tectonic',
        label: 'A',
        text: '缓慢移动的地壳，表面安静，内部却一直在重组。',
        weights: { C: 2, G: 2 },
      },
      {
        id: 'nature-form-tide',
        label: 'B',
        text: '夜里的潮汐，看似平静，却总在更深处翻涌。',
        weights: { F: 3, A: 1 },
      },
      {
        id: 'nature-form-wind',
        label: 'C',
        text: '换季时的风，没有固定形状，但会让很多事开始变化。',
        weights: { D: 3, A: 1 },
      },
      {
        id: 'nature-form-voltage',
        label: 'D',
        text: '压低天空的雷暴，危险、锋利，也带着某种令人清醒的美。',
        weights: { B: 2, E: 2 },
      },
    ],
  },
  {
    id: 'fear-loss',
    prompt: '如果真要说一个最怕失去的东西，你觉得更像是？',
    scene: '失去什么最难受，某种程度上就说明你最在乎什么。',
    options: [
      {
        id: 'fear-loss-safety',
        label: 'A',
        text: '那种知道自己不会轻易坠落的安全感。',
        weights: { C: 3, F: 1 },
      },
      {
        id: 'fear-loss-freedom',
        label: 'B',
        text: '还能随时转身、随时改写方向的自由。',
        weights: { D: 3, B: 1 },
      },
      {
        id: 'fear-loss-recognition',
        label: 'C',
        text: '被真正理解和看见的机会，哪怕只被一个人看见。',
        weights: { A: 2, E: 2 },
      },
      {
        id: 'fear-loss-creation',
        label: 'D',
        text: '那股把混乱变成作品、把情绪变成形状的能力。',
        weights: { G: 3, E: 1 },
      },
    ],
  },
  {
    id: 'misunderstood',
    prompt: '当别人误解了你的意思，你更接近哪种反应？',
    scene: '被误解的瞬间，最能看见你如何保护自己的表达。',
    options: [
      {
        id: 'misunderstood-clarify',
        label: 'A',
        text: '先把话说清楚，至少别让误会继续扩散。',
        weights: { C: 2, G: 2 },
      },
      {
        id: 'misunderstood-stop',
        label: 'B',
        text: '如果对方不愿意听，我也不会一直解释。',
        weights: { B: 2, F: 2 },
      },
      {
        id: 'misunderstood-hurt',
        label: 'C',
        text: '会有点受伤，但更在意对方为什么会这样理解我。',
        weights: { A: 3, F: 1 },
      },
      {
        id: 'misunderstood-rephrase',
        label: 'D',
        text: '直接换一种表达方式，把真正想说的东西说出来。',
        weights: { E: 3, D: 1 },
      },
    ],
  },
  {
    id: 'start-well',
    prompt: '当你真的想把一件事做好时，你通常会先怎么开始？',
    scene: '认真投入之前，每个人都有自己进入状态的方式。',
    options: [
      {
        id: 'start-well-structure',
        label: 'A',
        text: '先把目标、步骤和边界整理清楚。',
        weights: { G: 3, C: 1 },
      },
      {
        id: 'start-well-move',
        label: 'B',
        text: '先动起来，在过程中慢慢找到感觉。',
        weights: { D: 2, E: 2 },
      },
      {
        id: 'start-well-meaning',
        label: 'C',
        text: '先确认这件事是不是和我真正想要的东西有关。',
        weights: { A: 2, F: 2 },
      },
      {
        id: 'start-well-spark',
        label: 'D',
        text: '先找一个能让我兴奋的切口，不然很难持续。',
        weights: { B: 2, E: 2 },
      },
    ],
  },
]
