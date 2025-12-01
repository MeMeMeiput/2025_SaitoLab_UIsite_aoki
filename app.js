// ===== メニュー定義 =====
const menuData = {
  "おすすめ": [
    { name: "フレンチトースト", icon: "🍞", price: 800 },
    { name: "カフェラテ", icon: "☕", price: 550 },
    { name: "抹茶パフェ", icon: "🍨", price: 900 },
  ],
  "ドリンク": [
    { name: "オレンジジュース", icon: "🍊", price: 450 },
    { name: "アイスティー", icon: "🧊", price: 450 },
    { name: "コーラ", icon: "🥤", price: 450 },
  ],
  "コーヒー": [
    { name: "ブレンドコーヒー", icon: "☕", price: 600 },
    { name: "エスプレッソ", icon: "💥", price: 600 },
    { name: "カプチーノ", icon: "🌿", price: 600 },
    { name: "アメリカーノ", icon: "🥄", price: 600 },
    { name: "アイスコーヒー", icon: "🧊", price:600 },
    { name: "モカブレンド", icon: "🍫", price: 600 },
    { name: "カフェモカ", icon: "🍩", price: 600 },
  ],
  "紅茶": [
    { name: "アールグレイ", icon: "🍋", price: 550 },
    { name: "ダージリン", icon: "🍃", price: 550 },
    { name: "ミルクティー", icon: "🥛", price: 550 },
  ],
  "スイーツ": [
    { name: "チーズケーキ", icon: "🍰", price: 800 },
    { name: "チョコパフェ", icon: "🍫", price: 900 },
    { name: "プリン", icon: "🍮", price: 700 },
  ],
  "サンドイッチ": [
    { name: "BLTサンド", icon: "🥪", price: 750 },
    { name: "たまごサンド", icon: "🥚", price: 650 },
    { name: "ハムチーズサンド", icon: "🧀", price: 700 },
  ],
  "軽食": [
    { name: "クロワッサン", icon: "🥐", price: 500 },
    { name: "ホットドッグ", icon: "🌭", price: 650 },
    { name: "トースト", icon: "🍞", price: 400 },
    { name: "ピザトースト", icon: "🍕", price: 650 }
  ],
  "季節限定": [
    { name: "かぼちゃケーキ", icon: "🎃", price: 750 },
    { name: "贅沢イチゴのケーキ", icon: "🌸", price: 900},
  ],
  "モーニング": [
    { name: "モーニングプレート", icon: "🍳", price: 500 },
    { name: "モーニングトーストセット", icon: "🍞", price: 500 },
    { name: "ゆで卵", icon: "🥚", price: 50 },
  ]
};

// ===== 商品ごとのオプション設定 =====
const categoryOptions = {
  "ドリンク": {
    options: ["氷あり", "氷抜き"],
    sets: ["サイズS", "サイズM(+50円)", "サイズL(+100円)"]
  },

  "コーヒー": {
    options: ["ミルクあり", "砂糖あり", "ブラック"],
    sets: ["ケーキセット(+500円)"]
  },
  "紅茶": {
    options: ["ミルクあり", "砂糖あり", "レモンあり"],
    sets: ["サイズS", "サイズM(+50円)", "サイズL(+100円)"]
  },
  "スイーツ": {
    options: ["バニラアイス追加(+150円)", "生クリーム追加(+50円)"],
    sets: ["コーヒーセット(+450円)", "ドリンクセット(+350円)"]
  },
  "サンドイッチ": {
    options: ["食パン", "フランスパン", "コッペパン"],
    sets: ["コーヒーセット(+450円)", "ドリンクセット(+350円)"]
  },
  "軽食": {
    options: ["サラダ追加(+300円)"],
    sets: ["コーヒーセット(+450円)", "ドリンクセット(+350円)"]
  },
  "季節限定": {
    options: ["バニラアイス追加(+150円)", "生クリーム追加(+50円)"],
    sets: ["コーヒーセット(+450円)", "ドリンクセット(+350円)"]
  },
  "モーニング": {
    options: ["サラダ追加(+300円)"],
    sets: ["コーヒーセット(+450円)", "ドリンクセット(+350円)"]
  }
};

// ===== 商品描画共通関数(商品名　アイコン　値段) =====
function renderItem(i) {
  //商品写真を背景画像として使用
  return `
    <div class="menu-overlay">
      <p class="menu-name">${i.name}</p>
      <p class ="menu-price">￥${i.price}</p>
    </div>
  `;
}

// ===== カート機能 =====
let cartItems = [];

let totalAmount = 0;

// コーヒーカテゴリーは複数ページ実装
function renderMenu(category) {
  const menuArea = document.querySelector(".menu-area");

  // 👇 コーヒーページのクラスをリセット（これでコーヒー用のcssクラスリセット）
  menuArea.classList.remove("coffee");

  const items = menuData[category] || [];
  if (items.length === 0) return;

else if (category === "コーヒー") {
  menuArea.classList.add("coffee");   // ← CSS用にコーヒーページ専用クラスを付与
  let currentPage = 1;

  function renderCoffeePage() {
    const start = (currentPage - 1) * 4;
    const end = start + 4;
    const pageItems = items.slice(start, end);

    // メニューエリアを再描画
    menuArea.innerHTML = `
      <div class="menu-row">
        ${pageItems.slice(0, 2).map(i => `
          <div class="menu-item" data-name="${i.name}" style="background-image: url('images/${i.name}.png');">
            ${renderItem(i)}
          </div>
        `).join("")}
      </div>
      <div class="menu-row">
        ${pageItems.slice(2, 4).map(i => `
          <div class="menu-item" data-name="${i.name}" style="background-image: url('images/${i.name}.png');">
            ${renderItem(i)}
          </div>
        `).join("")}
      </div>
      <!-- ページ送り機能実装 -->
      <div class="pagination">
        <button id="prev-page" class="page-btn" ${currentPage === 1 ? "disabled" : ""}>← 前へ</button>
        <button id="next-page" class="page-btn" ${end >= items.length ? "disabled" : ""}>次へ →</button>
      </div>
    `;

    // ページ送り
    const nextBtn = document.getElementById("next-page");
    const prevBtn = document.getElementById("prev-page");

    if (nextBtn)
      nextBtn.addEventListener("click", e => {
        e.stopPropagation(); // ← ココが超重要
        currentPage++;
        renderCoffeePage();
      });

    if (prevBtn)
      prevBtn.addEventListener("click", e => {
        e.stopPropagation();
        currentPage--;
        renderCoffeePage();
      });
  }

  renderCoffeePage(); // 初回表示
}

  // 縦長2つ 季節限定
   else if (category === "季節限定") {
        menuArea.innerHTML = `
            <div class="menu-row">
                ${items.slice(0, 2).map(i => `
            <div class="menu-item vertical" data-name="${i.name}" style="background-image: url('images/${i.name}.png');">
            ${renderItem(i)}
          </div>
        `).join("")}
      </div>
    `;
    }
    // 横長2つ　スイーツ
   else if (category === "スイーツ") {
        menuArea.innerHTML = `
            ${items.slice(0, 2).map(i => `
        <div class="menu-item horizontal" data-name="${i.name}" style="background-image: url('images/${i.name}.png');">
           ${renderItem(i)}
        </div>
     `).join("")}
    `;
    }
    //縦長＆横長×３　軽食
   else if (category === "軽食") {
        menuArea.innerHTML = `
        <div class="menu-row">
          <div class="menu-item vertical small" data-name="${items[0].name}" style="background-image: url('images/${items[0].name}.png');">
            ${renderItem(items[0])}
          </div>
          <div class="menu-column">
            ${items.slice(1, 4).map(i => `
              <div class="menu-item horizontal small" data-name="${i.name}" style="background-image: url('images/${i.name}.png');">
                ${renderItem(i)}
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }
    //Largeが下
    else if (category === "紅茶") {
        menuArea.innerHTML = `
        <div class="menu-row">
          ${items.slice(0, 2).map(i => `
            <div class="menu-item" data-name="${i.name}" style="background-image: url('images/${i.name}.png');">
              ${renderItem(i)}
            </div>
          `).join("")}
        </div>
        <div class="menu-item large" data-name="${items[2].name}" style="background-image: url('images/${items[2].name}.png');">
          ${renderItem(items[2])}
        </div>
    `;
    }
    // 通常レイアウト（large + 下2つ）
   else {
        menuArea.innerHTML = `
        <div class="menu-item large" data-name="${items[0].name}" style="background-image: url('images/${items[0].name}.png');">
          ${renderItem(items[0])}
        </div>
        <div class="menu-row">
          ${items.slice(1).map(i => `
            <div class="menu-item" data-name="${i.name}" style="background-image: url('images/${i.name}.png');">
              ${renderItem(i)}
            </div>
          `).join("")}
        </div>
     `;
    }

  // // 新しく生成された要素にもクリックイベントを付与←これがあると重複でカートに入る
  // document.querySelectorAll(".menu-item").forEach(item => {
  //   item.addEventListener("click", () => {
  //     const name = item.dataset.name;
  //     cartItems.push(name);
  //     renderCart();
  //   });
  // });
}


// カート描画(通常)
// function renderCart() {
//   const list = document.getElementById("cart-list");
//   list.innerHTML = "";
//   cartItems.forEach(item => {
//     const li = document.createElement("li");
//     li.textContent = item;
//     list.appendChild(li);
//   });
// }

//カート描画(スワイプして削除）
// function renderCart() {
//   const list = document.getElementById("cart-list");
//   list.innerHTML = "";
//   cartItems.forEach((item, index) => {
//     const li = document.createElement("li");
//     li.classList.add("swipe-item");
//     li.innerHTML = `
//       <div class="swipe-content">${item}</div>
//       <button class="swipe-delete">削除</button>
//     `;

//     // 削除ボタン押したとき
//     li.querySelector(".swipe-delete").addEventListener("click", () => {
//       cartItems.splice(index, 1);
//       renderCart();
//     });

//     // スワイプ動作（PCでも擬似的に再現）
//     let startX = 0;
//     li.addEventListener("mousedown", e => (startX = e.pageX));
//     li.addEventListener("mouseup", e => {
//       if (startX - e.pageX > 50) li.classList.add("show-delete"); // 左にスワイプ
//       else if (e.pageX - startX > 50) li.classList.remove("show-delete"); // 右に戻す
//     });

//     list.appendChild(li);
//   });
// }

//カート描画(✖ボタン常設）
function renderCart() {
  const list = document.getElementById("cart-list");
  list.innerHTML = "";

  let total = 0; //合計金額リセット

  cartItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("cart-row");
    li.innerHTML = `
      <button class="remove-btn" data-index="${index}">✖</button>
      <span>${item}</span>
    `;
    list.appendChild(li);

    // 🧮 基本価格をmenuDataから検索
    for (const category in menuData) {
      const found = menuData[category].find(i => item.includes(i.name));
      if (found) {
        total += found.price;

        // 🧩 オプションに「(+数字円)」や「（+数字円）」が含まれていたら追加
        console.log(item); //1102_17:57追加(デバッグ用)
        const matches = item.match(/[（(]?\s*[＋+﹢]\s*(\d+)\s*円[)）]?/g);
        if (matches) {
          matches.forEach(m => {
          const num = m.match(/\d+/);
            if (num) total += parseInt(num[0]);
          });
        }
        break; //一致したらループおしまい
      }
    }
  });

  //合計金額を表示
  const totalElement = document.getElementById("total-amount");
  if (totalElement) totalElement.textContent =total.toLocaleString();

  // ❌ 削除ボタン処理（押されたら再計算）
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const index = e.target.dataset.index;
      cartItems.splice(index, 1);
      renderCart(); // ← 再計算して再描画
    });
  });
}

// 全取消（即時削除・アラートなし）
document.getElementById("clear-btn").addEventListener("click", () => {
  cartItems = [];
  renderCart();
});

// 注文
document.getElementById("order-btn").addEventListener("click", () => {
  if (cartItems.length === 0) {
    alert("カートに商品がありません。");
  } else {
    alert(`注文を受け付けました。\n\n${cartItems.join("\n")}`);

    //注文後はカートを空に
    cartItems = [];
    renderCart();
  }
});

//最初に戻る
document.getElementById("back-btn").addEventListener("click", () => {
  const activeCategory = document.querySelector(".category.active")?.textContent;

  //カートに商品が入っているか
  const hasItems = cartItems.length > 0;

  //おすすめ表示中の場合はカートを空にするのみ
  if (activeCategory === "おすすめ" && hasItems) {
    cartItems = [];
    renderCart();
   
  //それ以外のカテゴリーはカートを空にしておすすめへ
  } else {
    cartItems = [];
    renderCart();

    document.querySelectorAll(".category").forEach(btn => btn.classList.remove("active"));
    const osusumeBtn = [...document.querySelectorAll(".category")].find(btn => btn.textContent === "おすすめ");
    if(osusumeBtn) osusumeBtn.classList.add("active");

    renderMenu("おすすめ");
  }
});

// ===== カテゴリ切り替え =====
const categoryButtons = document.querySelectorAll(".category");
categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // active切り替え
    categoryButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.textContent;
    renderMenu(category);
  });
});

// 初期表示は「おすすめ」
renderMenu("おすすめ");


// ===== 商品オプションポップアップ（全商品対応） =====
const modal = document.getElementById("option-modal");
const closeModalBtn = document.getElementById("close-modal");
const nextPageBtn = document.getElementById("modal-next"); /*ポップアップの次へボタン*/
const addToCartBtn = document.getElementById("add-to-cart");
const optionTitle = document.getElementById("option-title");

let selectedOptions = [];
let currentItem = null;

// 商品クリック時（全カテゴリ共通）
document.addEventListener("click", e => {
  const target = e.target.closest(".menu-item");
  if (!target) return;

  const name = target.dataset.name;
  currentItem = name;

  //商品が属するカテゴリーを探す
  const category = Object.keys(menuData).find(cat =>
    menuData[cat].some(i => i.name ===name)
  );

  //カテゴリーに応じたオプション内容適用
  const optData = categoryOptions[category];
  if (optData) {
    const { options, sets } = optData;
    optionTitle.textContent = `${name}のオプション`;

    // 1ページ目（抜き項目）を動的生成(チェックボックス選択式)
    document.querySelector(".page1 .option-list").innerHTML = options.map(o =>`
        <div class="checkbox-option">
          <input type="checkbox" class="option-check" value="${o}">
          <span class=option-text">${o}</span>
        </div>
      `).join("");

    // 2ページ目（セット項目）を動的生成
    document.querySelector(".page2 .option-list").innerHTML = sets.map(s => `
      <button type="button" class="set-btn" data-value="${s}">${s}</button>
    `).join("");

    //イベント登録
    document.querySelectorAll(".set-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        e.stopPropagation();
        btn.classList.toggle("active");
      });
    });

    modal.style.display = "flex";
    selectedOptions = [];
    document.querySelector(".page1").classList.add("active");
    document.querySelector(".page2").classList.remove("active");
  } else {

  // カテゴリーの定義なしなら即カートへ
    cartItems.push(name);
    renderCart();
  }
});

// 「次へ」ボタン
nextPageBtn.addEventListener("click", () => {
  document.querySelector(".page1").classList.remove("active");
  document.querySelector(".page2").classList.add("active");
});

// 「カートに入れる」
addToCartBtn.addEventListener("click", () => {
  const selected1 = [...document.querySelectorAll(".option-check:checked")].map(c => c.value); // ←ここが変更点！
  const selected2 = [...document.querySelectorAll(".set-btn.active")].map(b => b.dataset.value);
  selectedOptions = [...selected1, ...selected2];

// 表示用テキストを追加（ここでは金額は計算しない）
  cartItems.push(`${currentItem}（${selectedOptions.join(", ")}）`);

//renderCart() 内で再計算
  renderCart();

  modal.style.display = "none";
});

// 「閉じる」
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
