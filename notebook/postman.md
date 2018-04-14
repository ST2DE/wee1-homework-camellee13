
# Postman Tutorial

Reference:
* [使開發API更方便的工具 Postman](https://xenby.com/b/151-%E6%8E%A8%E8%96%A6-%E4%BD%BF%E9%96%8B%E7%99%BCapi%E6%9B%B4%E6%96%B9%E4%BE%BF%E7%9A%84%E5%B7%A5%E5%85%B7-postman)
* [Postman - 測試Web Service的工具](https://medium.com/@mikru168/postman-%E6%B8%AC%E8%A9%A6web-service%E7%9A%84%E5%B7%A5%E5%85%B7-c7726997868a)

## Get started
在開發網頁或是網路應用程式的時候，往往都有可能會使用Web API來對伺服器溝通，而跟在撰寫API時可以用瀏覽器來確認API的結果，但是假如需要進行不同POST、GET、PUT或DELETE不同method，或是API流程上進行測試時，瀏覽器就不會是個方便工具，本篇介紹一個工具POSTMAN可以讓開發API更加容易。

* 軟體名稱: POSTMAN
* 官方下載點: https://www.getpostman.com/
* Chrome 擴充功能版: 至 [Chrome](https://chrome.google.com/webstore/category/extensions) 商店搜尋 postman 並將該功能加到 chrome


## Postman 工具簡介 (Chrome extention)
在開始使用任何一種工具時，必須先對工具有初步的了解，以下就來稍為先來介紹該工具的介面。

![Postman for Chrome extention](https://i.imgur.com/u3IVDlZ.png)


隱藏或顯示左邊的視窗。
1. Collection Runner 可用來批次執行 Collection Request。
2. 可匯入 Postman Collection、Run scope 等資料。
3. 另開 Postman 視窗。
4. 記錄執行過的請求。
5. 類我的最愛，可分群組並將執行過的請求儲存在群組內，方便日後相同的請求不需再重新輸入。
6. HTTP 請求的種類，舉凡我們常看到的 Get、Post、Put
7. Delete等等。
8. 請求的 URL。
9. 依 ket、value 的方式來夾帶請求的參數。
10. 可將執行過的請求儲存在 Collection 裡。
11. 可設定 Basic 驗證、Degest 驗證等等。
12. 依 key、value 的方式設定 Content-Type = text/html 或 Accept-charset = utf-8。
13. 回傳的結果區塊。
14. http 狀態和執行所花費的時間。
15. 回傳結果的格式，這邊有 JSON、XML、HTML 等等可選擇。
16. 依第15項的設定顯示結果的區塊。

## 實作 1 - 使用 Get 的方式發送請求給 Web Service
Web Service 的 URL => http://127.0.0.1:8090/esblab1/

Web Service 接受的參數傳遞方式 => 接在 URL 後，例如：http://127.0.0.1:8090/esblab1/Frank

1. 帶入 Web Service 的 URL 和參數
2. Web Service 回傳一個 XML 格式的資料結果

![](https://i.imgur.com/1UZ0dwW.png)


左邊 History 即為該次呼叫的記錄，下次要呼叫即不用再重新輸入，但 History 會有筆數的上限，若要永久保存起來則也可以選擇右邊的 Save 將該請求儲存起來。

## 實作 2 - 使用 Post 的方式並夾帶 JSON 格式的參數發送請求給 Web Service
Web Service 的 URL => http://127.0.0.1:8090/checkWebServiceAuth/

Web Service 接受的參數傳遞方式 => JSON 格式，例如：

```javascript=
{
  “esb”: 
  { 
   WS_NAME:”Test”,
   END_MK:”N”
  } 
}
```

▼打開 Postman 並點擊 Headers tab，輸入 key = Content-Type、value = application/json
![](https://i.imgur.com/XBYdARR.png)


▼點擊 Body tab，選擇 raw 再選擇 JSON，下方區塊則輸入 Web Service 要求的 JSON 格式後點擊 Send 送出請求
![](https://i.imgur.com/wXXWXho.png)


▼下方結果區塊則回傳該 Web Service 的結果
![](https://i.imgur.com/LhE3VJq.png)

