# www_hw2
http://wwweb.csie.io:2010/hw2/index.html
Layout參考：https://freshman.tech/css-grid-calculator/

## JSON calculator
增加一個下拉選單，及一個Load button，以載入包含輸入數字和用於計算的運算符號之JSON檔。

## Standard calculator
使計算機具有四個基本運算：加、減、乘、除，使用者可以點選digit button以輸入數字。

## UI and UX
在點選下一個運算符號後計算機會在上方黑色區域顯示前一次操作的計算結果。
AC button可以將顯示區域的數字清除歸零。
+/- button可以反轉顯示區域的數字之正負，如：123 -> -123。

## Floating numbers
當計算結果為小數時，會自動在小數點第四位做四捨五入，如：3.14159 -> 3.1416, 3.14144 -> 3.1414 

## Error exception
1. 當0是除數時會顯示Err
2. 使用者無法在輸入小數後輸入"."
3. 當顯示區域的數字大於13位數，數字會自動縮小字體
