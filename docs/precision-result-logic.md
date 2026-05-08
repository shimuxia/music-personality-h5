# V0.5 精确版结果解析逻辑

## 1. 评分输入

精确版评分工具接收一个答案对象：

```ts
Record<string, 'A' | 'B' | 'C' | 'D'>
```

其中 key 是精确版题目 id，例如 `Q1`、`Q2`、`Q36`；value 是用户选择的选项 id。

工具函数：

```ts
resolvePrecisionResult(answers)
```

当前阶段只负责解析数据，不接入页面、不触发跳转、不写入任何 UI 状态。

## 2. 总分如何计算

工具内部读取 `precisionQuestions`。

每一道已有效作答的题，会找到对应选项的 `scoreMap`，并把其中分数累加到 7 个音格总分里：

```ts
C、D、E、F、G、A、B
```

输出字段 `scores` 固定包含 7 个音格，即使某个音格没有得分，也会返回 `0`。

## 3. deepScores 如何计算

`deepScores` 只统计 `type === 'deep'` 的题目。

普通题只进入 `scores`，不进入 `deepScores`。深层题会同时进入 `scores` 和 `deepScores`。

`deepScores` 同样固定包含：

```ts
C、D、E、F、G、A、B
```

## 4. 主音符如何计算

工具会按总分从高到低排列所有音格，得到 `rankedNotes`。

`primaryNote` 取 `rankedNotes[0]`，也就是总分最高的音格。

对应报告从 `precisionReports` 中读取：

```ts
primaryReport = precisionReports[primaryNote]
```

## 5. 副音符如何计算

V0.5 起，精确版页面展示的副音符不再是另一个白键音格，而是钢琴黑键。

主音符 `primaryNote` 仍然从七个白键音格中产生：

```ts
C、D、E、F、G、A、B
```

副音符通过 `secondaryBlackKey` 返回，结构如下：

```ts
{
  key: 'C_SHARP_D_FLAT',
  label: 'C♯ / D♭',
  between: ['C', 'D'],
  sourceNote: 'D',
  description: '稳定与流动之间，说明你在秩序里保留改写路线的能力。',
}
```

其中：

- `label` 是页面展示的黑键名称。
- `between` 表示这个黑键位于哪两个白键之间。
- `sourceNote` 表示除了主音符外，参与形成这个黑键的相邻白键倾向。
- `description` 是黑键副音符的解释文案。

`secondaryNote` 和 `secondaryReport` 仍会保留在返回结构中，代表参与形成副音符的相邻白键倾向，主要用于调试或后续扩展；页面不应再把它作为“副音符：A「月影慢拍者」”这类白键结果展示。

## 6. 黑键副音符规则

钢琴黑键只存在于以下 5 组相邻白键之间：

```ts
C-D：C♯ / D♭
D-E：D♯ / E♭
F-G：F♯ / G♭
G-A：G♯ / A♭
A-B：A♯ / B♭
```

不存在：

```ts
E-F
B-C
```

根据主音符选择可形成黑键的相邻白键：

- primary C：只能和 D 形成 `C♯ / D♭`
- primary D：可以和 C 形成 `C♯ / D♭`，也可以和 E 形成 `D♯ / E♭`，取分数更高的相邻音
- primary E：只能和 D 形成 `D♯ / E♭`
- primary F：只能和 G 形成 `F♯ / G♭`
- primary G：可以和 F 形成 `F♯ / G♭`，也可以和 A 形成 `G♯ / A♭`，取分数更高的相邻音
- primary A：可以和 G 形成 `G♯ / A♭`，也可以和 B 形成 `A♯ / B♭`，取分数更高的相邻音
- primary B：只能和 A 形成 `A♯ / B♭`

如果候选相邻音同分，仍按固定白键顺序做 tie-breaker：

```ts
C、D、E、F、G、A、B
```

5 个黑键解释固定为：

- `C♯ / D♭`：稳定与流动之间，说明你在秩序里保留改写路线的能力。
- `D♯ / E♭`：探索与表达之间，说明你被新可能吸引，也希望把真实表达出来。
- `F♯ / G♭`：沉淀与结构之间，说明你的安静不是停滞，而是在内部搭建秩序。
- `G♯ / A♭`：结构与感知之间，说明你会用理性保护敏感，也会用结构安放情绪。
- `A♯ / B♭`：温柔与边界之间，说明你能照顾别人，也会在关键处保留自己的异质感。

## 7. 隐藏音格如何计算

隐藏音格优先看深层题得分：

1. 先按 `deepScores` 从高到低得到 `deepRankedNotes`。
2. 从 `deepRankedNotes` 中选择最高的、且不是 `primaryNote` / `secondaryNote` 的音格。
3. 如果深层题里无法选出有效隐藏音格，则回退到总分排序中的第三个音格。

这里的 `secondaryNote` 指参与形成黑键副音符的相邻白键倾向，不是页面展示的黑键 label。

对应报告：

```ts
hiddenReport = precisionReports[hiddenNote]
```

## 8. 同分如何处理

所有排序都使用固定 tie-breaker：

```ts
C、D、E、F、G、A、B
```

也就是说，当两个音格得分相同时，排在这个顺序更前面的音格优先。

这个规则同时适用于：

- `rankedNotes`
- `deepRankedNotes`
- `primaryNote`
- `secondaryBlackKey` 的相邻白键选择
- `hiddenNote`

## 9. 缺题 / 无效答案如何处理

如果某道题在 `answers` 中没有对应答案，会记录到：

```ts
missingQuestionIds
```

如果某道题传入的答案不是 `A`、`B`、`C`、`D`，例如传入 `E`，会记录到：

```ts
invalidAnswerIds
```

无效答案不会参与计分，也不会让函数直接崩溃。

`answeredCount` 只统计有效作答数量。

## 10. 返回结构

返回对象包含：

```ts
{
  scores,
  deepScores,
  rankedNotes,
  deepRankedNotes,
  primaryNote,
  secondaryNote,
  secondaryBlackKey,
  hiddenNote,
  primaryReport,
  secondaryReport,
  hiddenReport,
  answeredCount,
  missingQuestionIds,
  invalidAnswerIds,
}
```

页面展示副音符时应使用：

```ts
result.secondaryBlackKey.label
result.secondaryBlackKey.description
```

不要再直接展示：

```ts
result.secondaryNote
result.secondaryReport.title
```

## 11. 后续页面接入方式

后续接入精确版页面时，页面只需要把用户答案整理成题号到选项 id 的对象：

```ts
const result = resolvePrecisionResult({
  Q1: 'A',
  Q2: 'D',
  Q3: 'B',
})
```

页面可以使用：

- `result.primaryReport` 展示主音格报告
- `result.secondaryBlackKey` 展示黑键副音符
- `result.hiddenReport` 展示隐藏音格报告
- `result.missingQuestionIds` 判断是否还有题目未答
- `result.invalidAnswerIds` 排查异常答案输入

本阶段不接入页面，后续接入时再决定展示顺序、页面文案和状态流转。
