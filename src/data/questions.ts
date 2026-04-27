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
        text: '有点失落，但转念一想也许今天本来就该是自己待着的。',
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
    id: 'uncomfortable-message',
    prompt: '你收到一条让你有点不舒服的消息，第一反应更像哪一种？',
    scene: '信息跳出来的那一秒，最容易看见你处理情绪的方式。',
    options: [
      {
        id: 'uncomfortable-message-cooldown',
        label: 'A',
        text: '深吸一口气，告诉自己先别在情绪上头的时候回。',
        weights: { F: 2, A: 1 },
      },
      {
        id: 'uncomfortable-message-direct',
        label: 'B',
        text: '直接把不舒服的地方说清楚，不想憋着。',
        weights: { E: 2, B: 1 },
      },
      {
        id: 'uncomfortable-message-analyze',
        label: 'C',
        text: '先分析对方为什么这么说，避免误会扩大。',
        weights: { C: 2, G: 1 },
      },
      {
        id: 'uncomfortable-message-pause',
        label: 'D',
        text: '先假装没看到，等自己想明白了再说。',
        weights: { A: 2, F: 1 },
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
    id: 'friend-venting',
    prompt: '朋友向你倾诉一件让他很难受的事，但你隐约觉得他也有问题，你会怎么做？',
    scene: '安慰一个人时，分寸感往往比态度更难。',
    options: [
      {
        id: 'friend-venting-hold',
        label: 'A',
        text: '先接住他的情绪，等他缓过来再慢慢说。',
        weights: { A: 2, F: 1 },
      },
      {
        id: 'friend-venting-direct',
        label: 'B',
        text: '直接说出我看到的问题，不想只做无效安慰。',
        weights: { E: 2, B: 1 },
      },
      {
        id: 'friend-venting-clarify',
        label: 'C',
        text: '先帮他把事情理清楚，看看问题卡在哪里。',
        weights: { C: 2, G: 2 },
      },
      {
        id: 'friend-venting-details',
        label: 'D',
        text: '不急着下判断，我会先问更多细节。',
        weights: { D: 1, F: 2 },
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
        text: '能把脑子里乱七八糟的东西整理成一个像样的东西的那种感觉。',
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
