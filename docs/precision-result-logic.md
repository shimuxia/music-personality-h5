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

`secondaryNote` 取 `rankedNotes[1]`，也就是总分第二高的音格。

对应报告：

```ts
secondaryReport = precisionReports[secondaryNote]
```

## 6. 隐藏音格如何计算

隐藏音格优先看深层题得分：

1. 先按 `deepScores` 从高到低得到 `deepRankedNotes`。
2. 从 `deepRankedNotes` 中选择最高的、且不是 `primaryNote` / `secondaryNote` 的音格。
3. 如果深层题里无法选出有效隐藏音格，则回退到总分排序中的第三个音格。

对应报告：

```ts
hiddenReport = precisionReports[hiddenNote]
```

## 7. 同分如何处理

所有排序都使用固定 tie-breaker：

```ts
C、D、E、F、G、A、B
```

也就是说，当两个音格得分相同时，排在这个顺序更前面的音格优先。

这个规则同时适用于：

- `rankedNotes`
- `deepRankedNotes`
- `primaryNote`
- `secondaryNote`
- `hiddenNote`

## 8. 缺题 / 无效答案如何处理

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

## 9. 返回结构

返回对象包含：

```ts
{
  scores,
  deepScores,
  rankedNotes,
  deepRankedNotes,
  primaryNote,
  secondaryNote,
  hiddenNote,
  primaryReport,
  secondaryReport,
  hiddenReport,
  answeredCount,
  missingQuestionIds,
  invalidAnswerIds,
}
```

## 10. 后续页面接入方式

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
- `result.secondaryReport` 展示副音格报告
- `result.hiddenReport` 展示隐藏音格报告
- `result.missingQuestionIds` 判断是否还有题目未答
- `result.invalidAnswerIds` 排查异常答案输入

本阶段不接入页面，后续接入时再决定展示顺序、页面文案和状态流转。
