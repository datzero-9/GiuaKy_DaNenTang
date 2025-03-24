B1: tạo 2 file này
 

{
    "appId": "io.ionic.todolist",
    "appName": "todolist",
    "webDir": "dist",
    "bundleWebRunTime": false,
    "npmClient": "npm",
    "server": {
      "androidScheme": "https"
    }
  }

{
    "name": "todolist",
    "intergrations": {
      "capacitor": {}
    },
    "type": "react"
  }

B2 : thực hiện
npm i @capacitor/core
npm i -D @capacitor/cli
npx cap init
npm i @capacitor/android @capacitor/ios
npx cap add android
npx cap add ios

sau khi sửa code hay gì đó thì phải chạy lại 3 lệnh này
npm run build
npx cap sync
npx cap open android
