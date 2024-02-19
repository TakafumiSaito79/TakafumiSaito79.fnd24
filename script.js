'use strict'

const button = document.querySelector("select");
const paragraph = document.querySelector("p");

// button.addEventListener("click", updateButton);

//使う変数一覧
const select = document.getElementsByName("prefecture");
let forms = document.getElementsByTagName("form");
const formTemprate = forms[0] // コピー元の最初のフォーム


// オブジェクトで都道府県ごとの座標をいれておく
const locations = [
  { name: "北海道", longitude: 43.06431, latitude: 141.346879},
  { name: "青森県", longitude: 40.824589, latitude: 140.740548},
  { name: "岩手県", longitude: 39.703526, latitude: 141.152696},
  { name: "宮城県", longitude: 38.268579, latitude: 140.872072},
  { name: "秋田県", longitude: 39.718626, latitude: 140.102381},
  { name: "山形県", longitude: 38.240434, latitude: 140.36369},
  { name: "福島県", longitude: 37.750029, latitude: 140.467771},
  { name: "茨城県", longitude: 36.341737, latitude: 140.446824},
  { name: "栃木県", longitude: 36.565912, latitude: 139.883592},
  { name: "群馬県", longitude: 36.390688, latitude: 139.060453},
  { name: "埼玉県", longitude: 35.857033, latitude: 139.649012},
  { name: "千葉県", longitude: 35.60456, latitude: 140.123154},
  { name: "東京都", longitude: 35.689501, latitude: 139.691722},
  { name: "神奈川県", longitude: 35.447734, latitude: 139.642537},
  { name: "新潟県", longitude: 37.902451, latitude: 139.023245},
  { name: "富山県", longitude: 36.695265, latitude: 137.211305},
  { name: "石川県", longitude: 36.594606, latitude: 136.625669},
  { name: "福井県", longitude: 36.065209, latitude: 136.22172},
  { name: "山梨県", longitude: 35.664108, latitude: 138.568455},
  { name: "長野県", longitude: 36.651306, latitude: 138.180904},
  { name: "岐阜県", longitude: 35.391174, latitude: 136.723657},
  { name: "静岡県", longitude: 34.976944, latitude: 138.383056},
  { name: "愛知県", longitude: 35.180209, latitude: 136.906582},
  { name: "三重県", longitude: 34.730278, latitude: 136.508611},
  { name: "滋賀県", longitude: 35.004513, latitude: 135.868568},
  { name: "京都府", longitude: 35.021242, latitude: 135.755613},
  { name: "大阪府", longitude: 34.686344, latitude: 135.520037},
  { name: "兵庫県", longitude: 34.691257, latitude: 135.183078},
  { name: "奈良県", longitude: 34.685274, latitude: 135.832861},
  { name: "和歌山県", longitude: 34.226111, latitude: 135.1675},
  { name: "鳥取県", longitude: 35.503449, latitude: 134.238261},
  { name: "島根県", longitude: 35.472293, latitude: 133.05052},
  { name: "岡山県", longitude: 34.661739, latitude: 133.935032},
  { name: "広島県", longitude: 34.396558, latitude: 132.459646},
  { name: "山口県", longitude: 34.186041, latitude: 131.470654},
  { name: "徳島県", longitude: 34.065761, latitude: 134.559286},
  { name: "香川県", longitude: 34.340112, latitude: 134.043291},
  { name: "愛媛県", longitude: 33.841642, latitude: 132.765682},
  { name: "高知県", longitude: 33.559722, latitude: 133.531111},
  { name: "福岡県", longitude: 33.606389, latitude: 130.417968},
  { name: "佐賀県", longitude: 33.249351, latitude: 130.298792},
  { name: "長崎県", longitude: 32.75004, latitude: 129.867251},
  { name: "熊本県", longitude: 32.7898, latitude: 130.741584},
  { name: "大分県", longitude: 33.23813, latitude: 131.612645},
  { name: "宮崎県", longitude: 31.911034, latitude: 131.423887},
  { name: "鹿児島県", longitude: 31.560171, latitude: 130.558025},
  { name: "沖縄県", longitude: 26.212445, latitude: 127.680922},  
];



// selectButton.addEventListener("click", function(){alert(select[0].selectedIndex);}); //注意  addEventLisner の第２引数は関数
// selectButton.addEventListener("click", function(){alert(select[0].value);}); // 決定ボタンを押すとalertに選択した値（県名）を出す
// selectButton.addEventListener("click", function(){alert(select[0].value);}); // 決定ボタンを押すとalertに選択した値（県名）を出す


// 全て選択完了した後に、ボタンを押すと選択された県名を配列に保存する

function startCalculation() {
  const prefName = [];
  for (let i = 0; i < forms.length; i++) {
    if (select[i].value !== "-選択してください-"){
      prefName.push(select[i].value);
    }
  }
  return prefName;
}


// 計算開始ボタンを押すと処理する
let startCalcBottun = document.getElementById("startCalc");
startCalcBottun.addEventListener("click", function(){
  const prefNames = startCalculation(); //prefNameに配列が入る
  alert(prefNames);
  const centerPoint = getCenterPoint(prefNames); //centerPointに中心座標が入る
  alert(centerPoint);

  // const centerPointOutput = document.createElement("h3");
  // centerPointOutput.innerText = centerPoint;
  // console.log(centerPointOutput);
  // console.log(document.getElementsByTagName("h3"));
  // console.log(typeof document.getElementsByTagName("h3"));
  const nearestPref = getNearestPref(centerPoint); //centerPointに一番近い県名を出す
  output(centerPoint, nearestPref["name"]);
  // document.getElementsByTagName("h3")[0].appendChild(centerPointOutput);
  // const nearestPref = getNearestPref(centerPoint); //centerPointに一番近い県名を出す
  // alert(nearestPref.name);
  console.log(nearestPref);

})



// 取得した座標から出力する
function output(centerPoint, nearestPref) {
   // alert(nearestPref.name);
  const centerPointOutput = document.createElement("p");
  const centerPrefOutput = document.createElement("h3");
  console.log(centerPointOutput)
  centerPointOutput.innerHTML =
    `<p>中心座標は... ${centerPoint} </p>
    <a href = https://www.google.com/maps/search/?api=1&query=${centerPoint}>GoogleMapで表示する</a>`;
  centerPrefOutput.innerText = `一番中心に近いのは... ${nearestPref}`
  document.getElementsByTagName("h3")[0].appendChild(centerPointOutput);
  document.getElementsByTagName("h3")[0].appendChild(centerPrefOutput);
}


// フォームを入れると下のフォームが増える formTemprateを使う
let i = 1;
function copyForm() {
  const newForm = forms[i].cloneNode(true); 
  forms[i].appendChild(newForm);
  i++;
  select[i].addEventListener("click", copyForm)
  select[i - 1].removeEventListener("click",copyForm)
  console.log(forms[i].getElementsByTagName("label")[0].innerText);
  forms[i].getElementsByTagName("label")[0].innerText = `${i + 1}人目`;
  console.log(select[i].value)
}



select[i].addEventListener("click", copyForm); //i番目のフォームを選択すると




// function copyForm() {
//   const newForm = formTemprate.cloneNode(true); 
//   console.log(newForm);
//   forms[i].appendChild(newForm);
// }
// console.log(forms[0].innerHTML);
// console.log(select[0].innerHTML);
// copyForm;



// 選択した都道府県を取得する
function selectPref() {
	const form1 = document.getElementsByTagName("form");
  console.log(form1[0]);

	// 値(数値)を取得
	const prefName = form1.selectedIndex;
	//const num = document.form1.color1.selectedIndex;

	// 値(数値)から値(value値)を取得
	const str = color1.options[num].value;
	//const str = document.form1.color1.options[num].value;

	document.getElementById("span1").textContent = str; 
}



// 入力された都道府県を配列として得る
const getPrefs = []; //[愛知県, 北海道] のイメージ 

// function updateButton() {
//   if (button.value === "愛知県") {
//     button.value = "愛知県";
//     paragraph.textContent = "愛知県";
//   } else {
//     button.value = "マシンを起動";
//     paragraph.textContent = "マシンが停止しています。";
//   }
// }



// 「クリック」のイベントリスナーをいずれかの要素に 1 つ追加してください。その要素がクリックされたら、window.alert で "Hello!" と表示されるようにしましょう。

// console.log(document.getElementsByClassName("inner-paragraph"));

// let innerParagraphA = document.getElementsByClassName("inner-paragraph")[0];
// console.log(innerParagraphA);

// innerParagraphA.addEventListener("click", function(){alert("Clicked");}); //注意  addEventLisner の第２引数は関数




// 狙う顧客
// 社会人になり、全国に分散した後で大学の同窓会をどこでやるか？を決める時の指標にする
// 困りごと
// 東京ばかりだと

// やりたいこと
// 都道府県リストを、locationsではなくエクセルから取る ⇒ 市町村レベルに持っていく
// HTMLで日本地図をクリックすると都道府県が取得できるようにする
// google mapで県Aから県Bまでの交通手段毎の所要時間を取得して、距離だけでなく所要時間で比較できるようにする



// サイトの選択項目から、都道府県の配列を得る
// ["愛知県", "大阪府"]みたいな
 


//都道府県の名前の配列から、それら都道府県の中心座標を得る getCenterPoint
/**
 * 
 * @param {array} prefNames 
 * @returns {Array<number>} 座標の配列[x, y]
 */
function getCenterPoint(prefNames) {
  let totalLongitude = 0;
  let totalLatitude= 0;
  let result = [];

  for (const prefName of prefNames) { // 引数の県名をループする
    
    for (const pref of locations){ // 県名に対して、locations配列をループする
      if (pref["name"] === prefName){
        totalLongitude = totalLongitude + pref["longitude"];
        totalLatitude = totalLatitude + pref["latitude"];    
      }
    }

  }
  result[0] = totalLongitude / prefNames.length;
  result[1] = totalLatitude / prefNames.length;
  return result;
}

//ある座標[x, y]と都道府県{name, longitude, latitude}の距離を得る getDistance
/**
 * 
 * @param {array} point [x, y] 
 * @param {object} pref {name, longitude, latitude}
 * @return {number} 距離
 */
function getDistance(point, pref) {
  return ((point[0] - pref["longitude"])**2 + (point[1] - pref["latitude"])**2)**0.5
}

//指定した座標に一番近い都道府県を出力する  getNearestPref
/**
 * 
 * @param {object} centerPoint 座標の配列 
 * @return {object} locationsから取り出した都道府県のオブジェクト 
 */
function getNearestPref(centerPoint) {
  let distance = 99999
  let nearestPref = {};
  console.log(locations);

  for (const pref of locations) {
    if (getDistance(centerPoint, pref) < distance){
      nearestPref = pref;
      distance = getDistance(centerPoint, pref);
    }
  }

  return nearestPref;
}







