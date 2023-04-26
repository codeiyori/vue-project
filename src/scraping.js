// const puppeteer = require('puppeteer');

// (async () => {
//   // Puppeteer 브라우저 실행
//   const browser = await puppeteer.launch();
//   // 새 페이지 생성
//   const page = await browser.newPage();
//   // 구글 검색 페이지 로딩
//   await page.goto('https://www.google.com/search?q=puppeteer');
//   // 검색 결과에서 타이틀과 링크 추출
//   const links = await page.evaluate(() => {
//     const results = [];
//     // 검색 결과 링크를 나타내는 태그들을 모두 선택
//     const searchResults = document.querySelectorAll('.g h3 a');
//     // 링크와 타이틀 추출하여 배열에 저장
//     searchResults.forEach((result) => {
//       const title = result.textContent;
//       const link = result.href;
//       results.push({title, link});
//     });
//     return results;
//   });
//   // 추출한 결과 출력
//   console.log(links);
//   // Puppeteer 브라우저 종료
//   await browser.close();
// })();

// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://www.marketwatch.com/investing/bond/tmubmusd10y?countrycode=bx&mod=home-page');

//   // 해당 XPath 요소가 로드되어 나타날 때까지 대기
//   await page.waitForXPath('/html/body/div[3]/div[2]/div[3]/div/div[2]/h2/bg-quote');

//   // XPath 요소의 텍스트 가져오기
//   const [elementHandle] = await page.$x('/html/body/div[3]/div[2]/div[3]/div/div[2]/h2/bg-quote');
//   const textContent = await page.evaluate(element => element.textContent, elementHandle);
//   console.log('출력된 텍스트:', textContent);

//   await browser.close();
// })();

// const axios = require("axios");

// const options = {
//   method: 'GET',
//   url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly',
//   params: {lat: '35.5', lon: '-78.5'},
//   headers: {
//     'X-RapidAPI-Key': '9d9b765f3fmsh7d1d6452f1819b8p1abb5cjsn355879a9bde9',
//     'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });
const axios = require('axios');
const cheerio = require('cheerio');

axios.get('https://www.marketwatch.com/investing/bond/tmubmusd10y?countrycode=bx&mod=home-page')
  .then(response => {
    // axios를 통해 웹 페이지의 HTML 데이터를 가져왔을 때의 처리 로직
    const html = response.data; // 가져온 HTML 데이터
    const $ = cheerio.load(html); // Cheerio를 이용하여 HTML 로드
    
    // class 속성이 "earnings-date__announcement"인 div 안에 있는 2번째 h2 태그를 선택
    const moduleHeader = $('.intraday__data bg-quote.value').text();
    
    // 추출한 텍스트 출력
    console.log(moduleHeader);
  })
  .catch(error => {
    // 에러 처리 로직
    console.error('Error occurred while fetching data:', error);
  });



  